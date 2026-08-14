#!/usr/bin/env python3
"""claude_stream_bridge 冒烟测试 —— 在 VPS 上跑，验通再接线上路由。

    cd /opt/Yui-Nook-FastApi
    python scripts/claude_stream_smoke.py

逐项检查（对应教程 §2 / §13 排错表）：
  1. claude 在 PATH 上
  2. 环境里没有 ANTHROPIC_API_KEY（有的话会静默走 API 计费而非订阅）
  3. 常驻进程起得来、能收到 result
  4. 逐字 text_delta 非空
  5. thinking_delta 非空（验证 --thinking-display 这个隐藏 flag 在你的版本上还活着）
  6. 进程真的常驻（第二条消息不重开进程，且能记住上一条）
  7. usage / cost 拿得到（token pill 的数据源）
"""
from __future__ import annotations

import asyncio
import os
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import claude_stream_bridge as bridge  # noqa: E402

KEY = "smoke:test"
OK = "\033[32m✓\033[0m"
BAD = "\033[31m✗\033[0m"
WARN = "\033[33m!\033[0m"

failures: list[str] = []


def check(passed: bool, label: str, detail: str = "", fatal: bool = False) -> bool:
    print(f"  {OK if passed else BAD} {label}" + (f"  — {detail}" if detail else ""))
    if not passed:
        failures.append(label)
        if fatal:
            print(f"\n{BAD} 致命失败，中止。")
            sys.exit(1)
    return passed


async def main() -> None:
    print("\n=== 1. 环境 ===")
    claude = shutil.which("claude")
    check(bool(claude), "claude 在 PATH 上", claude or "未找到，先 npm i -g @anthropic-ai/claude-code", fatal=True)

    has_key = bool(os.getenv("ANTHROPIC_API_KEY") or os.getenv("ANTHROPIC_AUTH_TOKEN"))
    if has_key:
        print(f"  {WARN} 环境里有 ANTHROPIC_API_KEY —— bridge 会在 spawn 时删掉它，")
        print("      但请确认这不是你有意配的（有 key 会无条件压过订阅登录）")
    else:
        check(True, "环境干净（无 API key，走订阅）")

    check(Path(bridge.WORK_DIR).exists(), f"工作目录存在", bridge.WORK_DIR)
    print(f"    model={bridge.DEFAULT_MODEL}  thinking={bridge.THINKING_DISPLAY}")
    print(f"    persona={bridge.SYSTEM_PROMPT_FILE or '(默认)'}  mcp={bridge.MCP_CONFIG or '(未挂)'}")

    tier = bridge.PERMISSION_TIER
    if tier == "bypass":
        print(f"  {WARN} 权限档位 = bypass（全部工具免审批）—— 确认这台机器不对公网暴露")
    elif tier == "prompt":
        check(bool(bridge.PERMISSION_PROMPT_TOOL), "权限档位 = prompt", bridge.PERMISSION_PROMPT_TOOL)
    else:
        check(True, "权限档位 = locked（白名单外拒绝）", bridge.ALLOWED_TOOLS)

    print("\n=== 2. 第一轮：起进程 + 收事件 ===")
    text = thinking = ""
    tools: list[str] = []
    done: dict = {}

    # 必须用**真的需要动脑**的问题：adaptive thinking 会对简单问题直接跳过思考，
    # 那时 thinking_delta 为空是正确行为，用简单题测会误报成 flag 失效。
    # 顺便问 17×23 用于第二轮验上下文连续。
    prompt = (
        "农夫要把狼、羊、白菜运过河，船一次只能带一样；狼羊不能独处，羊菜也不能独处。"
        "请给出完整步骤。另外顺便算一下 17 乘 23 等于几。"
    )

    try:
        async for ev in bridge.chat_events(KEY, prompt, reset=True):
            t = ev["type"]
            if t == "text":
                text += ev["text"]
            elif t == "thinking":
                thinking += ev["text"]
            elif t == "tool":
                tools.append(ev["name"])
            elif t == "notice":
                print(f"    {WARN} notice: {ev}")
            elif t == "done":
                done = ev
    except Exception as exc:
        check(False, "第一轮跑通", f"{type(exc).__name__}: {exc}", fatal=True)

    check(bool(done), "收到 result 事件", done.get("subtype", ""), fatal=True)
    check(bool(text.strip()), "逐字 text_delta 非空", f"{len(text)} 字")
    check(
        bool(thinking.strip()),
        "thinking_delta 非空",
        f"{len(thinking)} 字" if thinking.strip()
        else "空 —— 跑 claude_stream_thinking_probe.py 分诊："
             "是没思考(adaptive)还是被吞(flag 失效)",
    )
    if tools:
        print(f"    工具调用: {', '.join(tools)}")

    print("\n=== 3. usage / 计费 ===")
    usage = done.get("usage") or {}
    check(bool(usage), "result 带 usage", str(usage)[:120])
    for field in ("input_tokens", "output_tokens", "cache_read_input_tokens"):
        if field in usage:
            print(f"    {field}: {usage[field]}")
    print(f"    total_cost_usd: {done.get('cost_usd')}  （本地估算，非账单）")

    print("\n=== 4. 第二轮：验证进程常驻 + 上下文连续 ===")
    procs_before = bridge.list_active_processes()
    pid_before = procs_before[0]["pid"] if procs_before else None
    check(bool(pid_before), "进程仍在", f"pid={pid_before}")

    result = await bridge.claude_stream_chat(KEY, "我刚才让你算的那个乘法，答案是多少？只回数字。")
    procs_after = bridge.list_active_processes()
    pid_after = procs_after[0]["pid"] if procs_after else None

    check(pid_before == pid_after, "进程没有重开（常驻生效）", f"{pid_before} -> {pid_after}")
    check("391" in result.reply, "记住了上一轮上下文", result.reply.strip()[:80])
    check(bool(result.session_id), "拿到 session_id", result.session_id)

    print("\n=== 5. 清理 ===")
    await bridge.claude_stream_reset(KEY)
    check(not bridge.list_active_processes(), "进程已回收")

    print()
    if failures:
        print(f"{BAD} {len(failures)} 项未通过：")
        for f in failures:
            print(f"    - {f}")
        sys.exit(1)
    print(f"{OK} 全部通过 —— 可以接线上路由了。")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
