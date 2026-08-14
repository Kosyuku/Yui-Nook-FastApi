"""Claude Code bridge 的传输层选择器。

两条通道，同一个接口，环境变量切换：

    CLAUDE_BRIDGE_TRANSPORT=tmux     （默认）抓 tmux 终端画面 —— 现役
    CLAUDE_BRIDGE_TRANSPORT=stream   常驻 `claude -p` + stream-json —— 新路

为什么保留 tmux：官方曾计划把 programmatic 用量（点名 `claude -p`）切出订阅
额度，后来暂缓。真恢复的话改这一个环境变量就能退回去，前端无感。

上层（routes）只认本模块，不直接 import 任何一个 bridge。
"""
from __future__ import annotations

import asyncio
import logging
import os
from dataclasses import dataclass, field
from typing import Any, Callable

logger = logging.getLogger(__name__)

TMUX = "tmux"
STREAM = "stream"


def current_transport() -> str:
    """每次读环境变量，方便运行时切换后无需重启（配合 /claude-code/sessions 自检）。"""
    value = os.getenv("CLAUDE_BRIDGE_TRANSPORT", TMUX).strip().lower()
    return STREAM if value == STREAM else TMUX


@dataclass
class BridgeResult:
    """两条通道的统一返回形状。"""

    conversation_key: str
    reply: str
    session_name: str = ""          # tmux 侧的 session 名 / stream 侧的 session_id
    thinking: str = ""
    tools: list[dict[str, Any]] = field(default_factory=list)
    usage: dict[str, Any] = field(default_factory=dict)
    cost_usd: float = 0.0
    compacted: bool = False
    transport: str = TMUX


async def bridge_chat(
    *,
    conversation_key: str,
    content: str,
    reset: bool = False,
    timeout_seconds: float = 120,
    on_progress: Callable[[str], Any] | None = None,
) -> BridgeResult:
    """发一条消息拿完整回复。

    `on_progress` 统一成 tmux 的语义：收到的是**累计正文**（不是增量），
    这样 routes 里现有的 diff 逻辑不用动。stream 侧内部累加后再回调。
    """
    transport = current_transport()

    if transport == STREAM:
        import claude_stream_bridge as sb

        accumulated: list[str] = []

        async def _relay(event: dict) -> None:
            if on_progress is None or event.get("type") != "text":
                return
            accumulated.append(event["text"])
            await _maybe_await(on_progress("".join(accumulated)))

        result = await sb.claude_stream_chat(
            conversation_key,
            content,
            reset=reset,
            timeout_seconds=timeout_seconds,
            on_progress=_relay,
        )
        return BridgeResult(
            conversation_key=result.conversation_key,
            reply=result.reply,
            session_name=result.session_id,
            thinking=result.thinking,
            tools=result.tools,
            usage=result.usage,
            cost_usd=result.cost_usd,
            compacted=result.compacted,
            transport=STREAM,
        )

    from claude_tmux_bridge import claude_tmux_chat

    result = await claude_tmux_chat(
        conversation_key=conversation_key,
        content=content,
        reset=reset,
        timeout_seconds=timeout_seconds,
        on_progress=on_progress,
    )
    return BridgeResult(
        conversation_key=result.conversation_key,
        reply=result.reply,
        session_name=result.session_name,
        compacted=result.compacted,
        transport=TMUX,
    )


async def bridge_reset(conversation_key: str) -> None:
    if current_transport() == STREAM:
        import claude_stream_bridge as sb

        await sb.claude_stream_reset(conversation_key)
        return

    from claude_tmux_bridge import claude_tmux_reset

    await claude_tmux_reset(conversation_key)


def bridge_sessions() -> dict[str, Any]:
    if current_transport() == STREAM:
        import claude_stream_bridge as sb

        return {
            "transport": STREAM,
            "sessions": sb.list_active_processes(),
            "model": sb.DEFAULT_MODEL,
            "permission_tier": sb.PERMISSION_TIER,
        }

    from claude_tmux_bridge import list_active_sessions

    return {
        "transport": TMUX,
        "sessions": list_active_sessions(),
        "compact_every": int(os.getenv("CLAUDE_TMUX_COMPACT_EVERY", "30")),
    }


async def bridge_keepalive() -> dict[str, Any]:
    """tmux 侧是"挂了就重启"；stream 侧是"回收空闲进程"。"""
    if current_transport() == STREAM:
        import claude_stream_bridge as sb

        reaped = await sb.reap_idle()
        return {"transport": STREAM, "reaped": reaped}

    from claude_tmux_bridge import keepalive_all_sessions

    results = await asyncio.to_thread(keepalive_all_sessions)
    return {"transport": TMUX, "results": results}


async def bridge_shutdown() -> None:
    """应用关停时调用，别留孤儿进程（只有 stream 侧需要）。"""
    try:
        import claude_stream_bridge as sb

        await sb.shutdown_all()
    except Exception:
        logger.debug("stream bridge shutdown skipped", exc_info=True)


async def _maybe_await(value: Any) -> None:
    if asyncio.iscoroutine(value):
        await value
