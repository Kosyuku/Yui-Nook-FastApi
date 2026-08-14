#!/usr/bin/env python3
"""thinking 为空的分诊脚本。

冒烟测试里 thinking_delta 为空，有两种完全不同的原因，修法相反：

  A. 模型压根没思考（adaptive thinking —— 问题太简单）
     → flag 是好的，换个难问题 / 提 --effort 就有
  B. 思考发生了但文本被抑制（API 的 display 字段 = omitted）
     → --thinking-display 在此版本失效，走教程 §A.6 的官方新路

判据:原始事件里有没有 `content_block_start` type=thinking。
  有 block 但 delta 空文本  → B（思考发生了，文本被吞）
  连 block 都没有            → A（压根没思考）

    python3 scripts/claude_stream_thinking_probe.py
"""
from __future__ import annotations

import asyncio
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import claude_stream_bridge as bridge  # noqa: E402

# 足够难、必须动脑的问题，避开 adaptive thinking 直接秒答
HARD_PROMPT = (
    "一个农夫要把狼、羊、白菜运过河，船一次只能带一样。"
    "狼和羊不能单独留，羊和白菜也不能单独留。"
    "请给出完整步骤，并说明为什么第二趟必须把羊带回来。"
)


async def probe(label: str, extra_args: list[str], prompt: str) -> dict:
    """直接 spawn，不走 bridge，这样能看到未经处理的原始事件。"""
    args = [
        "-p",
        "--input-format", "stream-json",
        "--output-format", "stream-json",
        "--verbose",
        "--include-partial-messages",
        "--model", bridge.DEFAULT_MODEL,
        "--permission-mode", "dontAsk",
        "--allowedTools", "",
        *extra_args,
    ]
    print(f"\n{'='*70}\n{label}\n  flags: {' '.join(extra_args) or '(无额外 flag)'}\n{'='*70}")

    env = dict(os.environ)
    env.pop("ANTHROPIC_API_KEY", None)
    env.pop("ANTHROPIC_AUTH_TOKEN", None)

    proc = await asyncio.create_subprocess_exec(
        shutil.which("claude") or "claude", *args,
        cwd=bridge.WORK_DIR, env=env,
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    proc.stdin.write((json.dumps(
        {"type": "user", "message": {"role": "user", "content": prompt}},
        ensure_ascii=False,
    ) + "\n").encode())
    await proc.stdin.drain()

    stats = {
        "thinking_block_started": 0,   # content_block_start type=thinking
        "thinking_delta_events": 0,    # thinking_delta 事件数
        "thinking_chars": 0,           # 实际拿到的思考文本长度
        "text_chars": 0,
        "signature_bytes": 0,          # 签名占位长度(教程 §A.1)
        "block_types": set(),
        "delta_types": set(),
    }

    buf = ""
    try:
        while True:
            chunk = await asyncio.wait_for(proc.stdout.read(65536), timeout=180)
            if not chunk:
                break
            buf += chunk.decode("utf-8", errors="replace")
            lines = buf.split("\n")
            buf = lines.pop()
            finished = False
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                try:
                    ev = json.loads(line)
                except json.JSONDecodeError:
                    continue

                if ev.get("type") == "stream_event":
                    inner = ev.get("event") or {}
                    itype = inner.get("type")

                    if itype == "content_block_start":
                        block = inner.get("content_block") or {}
                        btype = block.get("type", "")
                        stats["block_types"].add(btype)
                        if btype == "thinking":
                            stats["thinking_block_started"] += 1
                            sig = block.get("signature") or ""
                            stats["signature_bytes"] += len(sig)

                    elif itype == "content_block_delta":
                        delta = inner.get("delta") or {}
                        dtype = delta.get("type", "")
                        stats["delta_types"].add(dtype)
                        if dtype == "thinking_delta":
                            stats["thinking_delta_events"] += 1
                            stats["thinking_chars"] += len(delta.get("thinking") or delta.get("text") or "")
                        elif dtype == "text_delta":
                            stats["text_chars"] += len(delta.get("text") or "")
                        elif dtype == "signature_delta":
                            stats["signature_bytes"] += len(delta.get("signature") or "")

                elif ev.get("type") == "assistant":
                    for block in (ev.get("message") or {}).get("content") or []:
                        if isinstance(block, dict) and block.get("type") == "thinking":
                            stats["signature_bytes"] += len(block.get("signature") or "")
                            stats["thinking_chars"] = max(
                                stats["thinking_chars"], len(block.get("thinking") or "")
                            )

                elif ev.get("type") == "result":
                    finished = True
            if finished:
                break
    except asyncio.TimeoutError:
        print("  ! 超时")
    finally:
        try:
            proc.stdin.close()
            proc.kill()
            await asyncio.wait_for(proc.wait(), timeout=5)
        except Exception:
            pass

    print(f"  正文             : {stats['text_chars']} 字")
    print(f"  thinking block   : {stats['thinking_block_started']} 个")
    print(f"  thinking_delta   : {stats['thinking_delta_events']} 个事件 / {stats['thinking_chars']} 字")
    print(f"  signature 占位   : {stats['signature_bytes']} 字节")
    print(f"  block 类型       : {sorted(stats['block_types']) or '—'}")
    print(f"  delta 类型       : {sorted(stats['delta_types']) or '—'}")

    # 分诊
    if stats["thinking_chars"] > 0:
        verdict = "OK      思考文本拿到了"
    elif stats["thinking_block_started"] or stats["signature_bytes"]:
        verdict = "症状 B  思考发生了但文本被吞 —— display=omitted，flag 未生效"
    else:
        verdict = "症状 A  压根没思考 —— adaptive thinking 判定不需要"
    print(f"  → {verdict}")

    stats["verdict"] = verdict
    stats["block_types"] = sorted(stats["block_types"])
    stats["delta_types"] = sorted(stats["delta_types"])
    return stats


async def main() -> None:
    print("=== CC 版本 ===")
    try:
        out = subprocess.run(
            [shutil.which("claude") or "claude", "--version"],
            capture_output=True, text=True, timeout=30,
        )
        print(" ", (out.stdout or out.stderr).strip())
    except Exception as exc:
        print("  取版本失败:", exc)

    print("\n=== --thinking-display 是不是真 flag ===")
    for flag in ("--thinking-display", "--totally-fake-flag-xyz"):
        try:
            out = subprocess.run(
                [shutil.which("claude") or "claude", "--print", flag, "summarized", "hi"],
                capture_output=True, text=True, timeout=60,
            )
            rejected = "unknown option" in (out.stderr or "").lower()
            print(f"  {flag}: {'被拒(unknown option)' if rejected else '被接受'}")
        except Exception as exc:
            print(f"  {flag}: 测试失败 {exc}")

    results = {}
    # 对照组:同一个难问题，三种配置
    results["无 flag"] = await probe(
        "对照组 1 — 难题 + 不带 thinking flag", [], HARD_PROMPT)
    results["thinking-display"] = await probe(
        "对照组 2 — 难题 + --thinking-display summarized",
        ["--thinking-display", "summarized"], HARD_PROMPT)
    results["effort high"] = await probe(
        "对照组 3 — 难题 + --thinking-display + --effort high",
        ["--thinking-display", "summarized", "--effort", "high"], HARD_PROMPT)

    print(f"\n{'='*70}\n结论\n{'='*70}")
    for name, st in results.items():
        print(f"  {name:22} thinking={st['thinking_chars']:5} 字   {st['verdict']}")

    best = max(results.values(), key=lambda s: s["thinking_chars"])
    print()
    if best["thinking_chars"] > 0:
        winner = [k for k, v in results.items() if v is best][0]
        print(f"  ✓ 「{winner}」这组拿到了思考文本 —— 按它配 bridge 即可。")
    elif any(s["thinking_block_started"] or s["signature_bytes"] for s in results.values()):
        print("  ✗ 三组都只有签名占位、没有文本 = 服务端把 thinking 抑制了。")
        print("    下一步:试官方新路 `/config thinking=` (教程 §A.6，需 v2.1.181+)。")
    else:
        print("  ? 三组都没有 thinking block —— 连难题都不思考，可能此模型/账号下")
        print("    thinking 整个没启用。试试 --model opus 显式指定，或换 --effort max。")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
