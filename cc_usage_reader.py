"""从 Claude Code 自己的 transcript 读真实 token 用量（滚动窗口）。

为什么要读它而不是只统计 YUI 自己的调用：订阅额度是**整个账号**共享的——
你在终端直接跟 claude 聊的、Codex 跑的、YUI bridge 走的，都吃同一份 5h 额度。
只统计 YUI 这一路，pill 上的数字没有意义。

数据源：~/.claude/projects/<项目路径编码>/<session-id>.jsonl
每条 assistant 行带完整 usage：
    input_tokens / output_tokens
    cache_creation_input_tokens / cache_read_input_tokens

两个必须处理的坑（实测 transcript 得出）：

1. `model` 为 `<synthetic>` 的行是 CC 本地合成的，**不计费**，必须排除。
2. 有 `retryAttempt` / `requestId` 字段 —— 同一次请求重试会在文件里出现多条，
   直接累加会虚高。按 messageId 去重。

本模块不依赖 database，纯只读，失败一律返回空而不抛。
"""
from __future__ import annotations

import glob
import json
import logging
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterator

logger = logging.getLogger(__name__)

TRANSCRIPT_GLOB = os.getenv(
    "CLAUDE_TRANSCRIPT_GLOB",
    str(Path.home() / ".claude" / "projects" / "*" / "*.jsonl"),
)

# 单次扫描的文件大小上限，避免个别超大 transcript 拖慢接口
MAX_FILE_BYTES = int(os.getenv("CLAUDE_TRANSCRIPT_MAX_BYTES", str(32 * 1024 * 1024)))

# 本地合成条目的 model 值，不计费
SYNTHETIC_MODEL = "<synthetic>"


def _parse_ts(value: Any) -> datetime | None:
    text = str(value or "").strip()
    if not text:
        return None
    try:
        # transcript 用 ISO8601 Z
        return datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError:
        return None


def _iter_recent_lines(cutoff: datetime) -> Iterator[dict]:
    """遍历窗口内可能有数据的 transcript 行。

    先用 mtime 粗筛掉整个文件，再逐行按 timestamp 精筛。
    """
    try:
        paths = glob.glob(TRANSCRIPT_GLOB)
    except Exception:
        logger.debug("transcript glob failed", exc_info=True)
        return

    cutoff_ts = cutoff.timestamp()
    for path in paths:
        try:
            stat = os.stat(path)
        except OSError:
            continue
        # 文件最后修改早于窗口起点 → 里面不可能有窗口内的行
        if stat.st_mtime < cutoff_ts:
            continue
        if stat.st_size > MAX_FILE_BYTES:
            logger.debug("skipping oversized transcript %s (%d bytes)", path, stat.st_size)
            continue
        try:
            with open(path, encoding="utf-8", errors="replace") as handle:
                for line in handle:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        yield json.loads(line)
                    except json.JSONDecodeError:
                        continue
        except OSError:
            continue


def read_rolling_usage(hours: float = 5.0) -> dict[str, Any]:
    """统计最近 `hours` 小时内的真实 token 用量。

    返回 {input, output, cache_read, cache_creation, total, billable_total,
          messages, since, until}；出错时各项为 0。
    """
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(hours=max(0.1, hours))

    totals = {
        "input": 0,
        "output": 0,
        "cache_read": 0,
        "cache_creation": 0,
    }
    seen: set[str] = set()
    messages = 0

    try:
        for entry in _iter_recent_lines(cutoff):
            if entry.get("type") != "assistant":
                continue

            ts = _parse_ts(entry.get("timestamp"))
            if ts is None or ts < cutoff:
                continue

            message = entry.get("message")
            if not isinstance(message, dict):
                continue

            # 本地合成条目不计费
            if str(message.get("model") or "") == SYNTHETIC_MODEL:
                continue

            usage = message.get("usage")
            if not isinstance(usage, dict):
                continue

            # 重试会让同一条 message 出现多次，按 id 去重
            dedup_key = str(
                message.get("id")
                or entry.get("messageId")
                or entry.get("requestId")
                or entry.get("uuid")
                or ""
            )
            if dedup_key:
                if dedup_key in seen:
                    continue
                seen.add(dedup_key)

            totals["input"] += _as_int(usage.get("input_tokens"))
            totals["output"] += _as_int(usage.get("output_tokens"))
            totals["cache_read"] += _as_int(usage.get("cache_read_input_tokens"))
            totals["cache_creation"] += _as_int(usage.get("cache_creation_input_tokens"))
            messages += 1
    except Exception:
        logger.debug("rolling usage scan failed", exc_info=True)

    total = sum(totals.values())
    return {
        **totals,
        "total": total,
        # 缓存读取的计价远低于新 input，单独给一个"不含缓存读"的口径，
        # 用来估算额度消耗比按 total 更接近实际。
        "billable_total": total - totals["cache_read"],
        "messages": messages,
        "since": cutoff.isoformat(),
        "until": now.isoformat(),
    }


def _as_int(value: Any) -> int:
    try:
        return max(0, int(value or 0))
    except (TypeError, ValueError):
        return 0
