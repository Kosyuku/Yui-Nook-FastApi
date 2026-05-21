from __future__ import annotations

"""
Claude Code tmux bridge
-----------------------
在 VPS 上为每个对话维护一个交互式 `claude` tmux session。
消息通过 `tmux send-keys` 注入，回复通过 `tmux capture-pane` 读取。
走 Claude 订阅额度，不计 API 账单。

Session 命名规则：cc_<conversation_key>
所有 session 都在 tmux server 里，FastAPI 重启不影响。

Auto-compact：每隔 COMPACT_EVERY 条消息自动注入 /compact，
Claude Code 自动压缩上下文，session 不中断，用户无感知。
"""

import asyncio
import json
import os
import re
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path

# Claude Code 启动目录（VPS 上的项目根目录）
WORK_DIR = os.getenv("CLAUDE_TMUX_CWD", "/opt/Yui-Nook-FastApi")

# 等待回复的超时秒数
DEFAULT_TIMEOUT = int(os.getenv("CLAUDE_TMUX_TIMEOUT", "120"))

# 轮询间隔（秒）
POLL_INTERVAL = 0.4

# 输出稳定判定：连续 N 次 capture 内容相同则认为回复完毕
STABLE_ROUNDS = 4

# 每隔多少条消息自动 /compact（0 = 关闭）
COMPACT_EVERY = int(os.getenv("CLAUDE_TMUX_COMPACT_EVERY", "30"))

# /compact 后等待压缩完成的最长时间（秒）
COMPACT_TIMEOUT = int(os.getenv("CLAUDE_TMUX_COMPACT_TIMEOUT", "60"))

# session 元数据存储路径
META_PATH = Path(__file__).resolve().parent / "data" / "claude_tmux_meta.json"


@dataclass
class TmuxBridgeResult:
    conversation_key: str
    session_name: str
    reply: str
    raw_pane: str
    compacted: bool = False  # 这次是否触发了 /compact


@dataclass
class SessionMeta:
    session_name: str
    message_count: int = 0
    last_compact_at: int = 0  # compact 时的消息数


_locks_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


# ── 元数据持久化 ───────────────────────────────────────────────────────────────

def _read_meta() -> dict[str, dict]:
    if not META_PATH.exists():
        return {}
    try:
        return json.loads(META_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _write_meta(data: dict[str, dict]) -> None:
    META_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = META_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(META_PATH)


def _get_session_meta(key: str) -> SessionMeta:
    data = _read_meta()
    raw = data.get(key, {})
    return SessionMeta(
        session_name=raw.get("session_name", f"cc_{re.sub(r'[^a-zA-Z0-9_-]', '_', key)}"),
        message_count=int(raw.get("message_count", 0)),
        last_compact_at=int(raw.get("last_compact_at", 0)),
    )


def _save_session_meta(key: str, meta: SessionMeta) -> None:
    data = _read_meta()
    data[key] = {
        "session_name": meta.session_name,
        "message_count": meta.message_count,
        "last_compact_at": meta.last_compact_at,
    }
    _write_meta(data)


def _delete_session_meta(key: str) -> None:
    data = _read_meta()
    data.pop(key, None)
    _write_meta(data)


# ── tmux 工具函数 ──────────────────────────────────────────────────────────────

def _tmux(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["tmux", *args],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )


def _session_exists(name: str) -> bool:
    r = _tmux("has-session", "-t", name)
    return r.returncode == 0


def _create_session(name: str) -> None:
    """新建 tmux session，cd 到工作目录，启动 claude。"""
    _tmux(
        "new-session", "-d",
        "-s", name,
        "-x", "220", "-y", "50",
    )
    _tmux("send-keys", "-t", name, f"cd {WORK_DIR}", "Enter")
    time.sleep(0.5)
    _tmux("send-keys", "-t", name, "claude", "Enter")
    # 等 claude 启动（鉴权 + 加载需要几秒）
    time.sleep(6)


def _capture_pane(name: str) -> str:
    r = _tmux("capture-pane", "-t", name, "-p", "-e")
    return r.stdout or ""


def _send_message(name: str, message: str) -> None:
    """把消息注入 tmux session（多行合并成单行）。"""
    lines = message.strip().splitlines()
    if not lines:
        return
    single = " ".join(lines)
    _tmux("send-keys", "-t", name, single, "Enter")


def _strip_ansi(text: str) -> str:
    ansi = re.compile(r"\x1b\[[0-9;]*[mGKHF]|\x1b\].*?\x07|\x1b[@-Z\\-_]")
    return ansi.sub("", text)


def _extract_reply(before: str, after: str) -> str:
    """从 capture-pane 前后差异中提取 Claude 的回复。"""
    after_clean = _strip_ansi(after)
    before_clean = _strip_ansi(before)

    before_lines = [l for l in before_clean.splitlines() if l.strip()]
    after_lines = after_clean.splitlines()

    if before_lines:
        last_before = before_lines[-1].strip()
        cut = 0
        for i, line in enumerate(after_lines):
            if last_before in line:
                cut = i + 1
                break  # 用第一个匹配，避免把回复内容截掉
        new_lines = after_lines[cut:]
    else:
        new_lines = after_lines

    # 优先提取 ● 开头的行（Claude Code 回复标记）
    bullet_lines = []
    for line in new_lines:
        stripped = line.strip()
        if re.match(r"^●\s*", stripped):
            bullet_lines.append(re.sub(r"^●\s*", "", stripped))

    if bullet_lines:
        return "\n".join(bullet_lines).strip()

    # fallback：过滤提示符和状态行
    reply_lines = []
    for line in new_lines:
        stripped = line.strip()
        if not stripped:
            continue
        if re.match(r"^[>\$]\s*$", stripped):
            continue
        # 跳过状态行（* Worked for Xs、* Sautéed for Xs 等）
        if re.match(r"^\*\s+\w", stripped):
            continue
        reply_lines.append(stripped)

    return "\n".join(reply_lines).strip()


def _wait_stable(session_name: str, timeout: int) -> str:
    """轮询 capture-pane 直到输出稳定，返回最终 pane 内容。"""
    last_pane = ""
    stable_count = 0
    deadline = time.time() + timeout

    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        current = _capture_pane(session_name)
        if _strip_ansi(current) == _strip_ansi(last_pane):
            stable_count += 1
            if stable_count >= STABLE_ROUNDS:
                return current
        else:
            stable_count = 0
            last_pane = current

    return _capture_pane(session_name)


# ── auto-compact ───────────────────────────────────────────────────────────────

def _should_compact(meta: SessionMeta) -> bool:
    if COMPACT_EVERY <= 0:
        return False
    messages_since_last = meta.message_count - meta.last_compact_at
    return messages_since_last >= COMPACT_EVERY


def _do_compact(session_name: str) -> None:
    """注入 /compact 并等待 Claude Code 完成压缩。"""
    _tmux("send-keys", "-t", session_name, "/compact", "Enter")
    # /compact 需要一段时间处理，等待输出稳定
    time.sleep(2)
    _wait_stable(session_name, COMPACT_TIMEOUT)


# ── 核心函数 ───────────────────────────────────────────────────────────────────

async def _lock_for(key: str) -> asyncio.Lock:
    async with _locks_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
        return lock


async def claude_tmux_chat(
    *,
    conversation_key: str,
    content: str,
    reset: bool = False,
    timeout_seconds: int = DEFAULT_TIMEOUT,
) -> TmuxBridgeResult:
    key = conversation_key.strip()
    if not key:
        raise ValueError("conversation_key is required")
    if not content.strip():
        raise ValueError("content is required")

    lock = await _lock_for(key)
    async with lock:
        meta = _get_session_meta(key)
        session_name = meta.session_name

        # 重置：kill session + 清元数据
        if reset and _session_exists(session_name):
            _tmux("kill-session", "-t", session_name)
            meta.message_count = 0
            meta.last_compact_at = 0

        # 确保 session 存在
        if not _session_exists(session_name):
            await asyncio.to_thread(_create_session, session_name)

        # ── auto-compact 检查 ──────────────────────────────────────────────────
        compacted = False
        if _should_compact(meta):
            await asyncio.to_thread(_do_compact, session_name)
            meta.last_compact_at = meta.message_count
            compacted = True

        # 记录发送前的 pane 内容
        before_pane = await asyncio.to_thread(_capture_pane, session_name)

        # 注入消息
        await asyncio.to_thread(_send_message, session_name, content)

        # 等待回复稳定
        reply_pane = await asyncio.to_thread(_wait_stable, session_name, timeout_seconds)

        reply = _extract_reply(before_pane, reply_pane)
        if not reply:
            reply = "（Claude 没有回复，可能还在思考中）"

        # 更新消息计数
        meta.message_count += 1
        _save_session_meta(key, meta)

        return TmuxBridgeResult(
            conversation_key=key,
            session_name=session_name,
            reply=reply,
            raw_pane=reply_pane,
            compacted=compacted,
        )


async def claude_tmux_reset(conversation_key: str) -> None:
    """Kill 掉对应的 tmux session 并清除元数据。"""
    key = conversation_key.strip()
    lock = await _lock_for(key)
    async with lock:
        meta = _get_session_meta(key)
        if _session_exists(meta.session_name):
            _tmux("kill-session", "-t", meta.session_name)
        _delete_session_meta(key)


def _claude_is_alive(session_name: str) -> bool:
    """检查 tmux session 里 claude 是否还在等待输入（有 > 提示符）。"""
    pane = _strip_ansi(_capture_pane(session_name))
    lines = [l.strip() for l in pane.splitlines() if l.strip()]
    # claude 等待输入时最后几行会有 > 提示符
    recent = lines[-5:] if len(lines) >= 5 else lines
    return any(re.match(r"^>\s*$", l) for l in recent)


def keepalive_all_sessions() -> dict:
    """
    检查所有 cc_* session 里 claude 是否还活着。
    如果 session 存在但 claude 已退出，重新启动 claude。
    不发任何消息给 claude，不耗费额度。
    """
    meta_all = _read_meta()
    results = {}
    for key, raw in meta_all.items():
        sname = raw.get("session_name", "")
        if not sname or not _session_exists(sname):
            results[key] = "session_missing"
            continue
        if _claude_is_alive(sname):
            results[key] = "alive"
        else:
            # claude 挂了，重新启动
            _tmux("send-keys", "-t", sname, "", "")  # 清空可能的残留输入
            _tmux("send-keys", "-t", sname, f"cd {WORK_DIR} && claude", "Enter")
            time.sleep(6)
            results[key] = "restarted"
    return results


def list_active_sessions() -> list[dict]:
    """列出所有活跃的 cc_* tmux sessions 及其消息计数。"""
    r = _tmux("list-sessions", "-F", "#{session_name}")
    active = {s for s in r.stdout.splitlines() if s.startswith("cc_")}
    meta_all = _read_meta()

    result = []
    for key, raw in meta_all.items():
        sname = raw.get("session_name", "")
        if sname in active:
            result.append({
                "conversation_key": key,
                "session_name": sname,
                "message_count": raw.get("message_count", 0),
                "last_compact_at": raw.get("last_compact_at", 0),
                "messages_since_compact": raw.get("message_count", 0) - raw.get("last_compact_at", 0),
            })
    return result
