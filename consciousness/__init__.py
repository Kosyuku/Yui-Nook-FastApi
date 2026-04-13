"""Consciousness loop with configurable model + prompt fallbacks."""
from __future__ import annotations

import asyncio
import json
import logging
from datetime import datetime, timedelta
from typing import Any, Optional

import ai_runtime
import database as db
from config import settings
from models import EchoAdapter

logger = logging.getLogger(__name__)

_loop_task: Optional[asyncio.Task] = None
_status = {
    "running": False,
    "last_run_at": None,
    "total_wakes": 0,
    "last_proactive_check_at": None,
    "next_run_at": None,
}


def get_status() -> dict:
    return _status.copy()


async def _collect_consciousness_text(messages: list[dict[str, str]], *, temperature: float = 0.3) -> str:
    adapter, _, kwargs = await ai_runtime.resolve_adapter_for_slot(
        "consciousness",
        tools=[],
        tool_choice="none",
    )
    if adapter is None or isinstance(adapter, EchoAdapter):
        return ""
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=temperature, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return "".join(parts).strip()


async def run_once():
    logger.info("Consciousness loop: manual trigger")
    _status["last_run_at"] = datetime.now().astimezone().isoformat()
    _status["total_wakes"] = _status.get("total_wakes", 0) + 1

    await phase1_housekeeping()
    await phase2_produce_snapshot()

    logger.info("Consciousness loop: finished")


async def phase1_housekeeping():
    logger.info("  Phase 1: housekeeping")

    sessions = await db.list_sessions()
    for session in sessions[:5]:
        messages = await db.get_messages(session["id"], limit=50)
        if len(messages) > 20:
            old_msgs = messages[:15]
            summary_text = _quick_summarize(old_msgs)
            if summary_text:
                await db.add_context_summary(
                    session_id=session["id"],
                    summary=summary_text,
                    msg_start=old_msgs[0]["id"] if old_msgs else "",
                    msg_end=old_msgs[-1]["id"] if old_msgs else "",
                )
                logger.info("  -> summarized session %s (%s messages)", session["id"], len(old_msgs))

    stats = await db.get_memory_stats()
    logger.info("  -> memory stats: %s", stats)


def _quick_summarize(messages: list[dict]) -> str:
    lines = []
    for msg in messages:
        role = "user" if msg["role"] == "user" else "ai"
        content = str(msg["content"])[:80]
        lines.append(f"[{role}] {content}")
    return "Conversation summary:\n" + "\n".join(lines)


def _safe_importance(val: Any) -> int:
    try:
        res = int(val)
        return res
    except (TypeError, ValueError):
        return 3

async def phase2_produce_snapshot():
    logger.info("  Phase 2: produce snapshot")
    state = await db.get_companion_state()

    # a. high_importance_memories
    memories = await db.list_memories(limit=200)
    high_importance_memories = [
        {
            "id": m["id"],
            "content": m["content"],
            "category": m.get("category", ""),
            "importance": _safe_importance(m.get("importance")),
            "created_at": m.get("created_at", "")
        }
        for m in memories if _safe_importance(m.get("importance")) >= 4
    ]

    # b. open_loops_summary
    open_loops = state.get("open_loops", [])
    open_loops_summary = ""
    if open_loops:
        prompt_messages = [
            {
                "role": "system",
                "content": (
                    "You are a summarization assistant. Summarize the following unresolved thoughts "
                    "(open loops) of the AI companion into a short, cohesive paragraph. Focus on the core topics."
                )
            },
            {"role": "user", "content": "\n".join(open_loops)}
        ]
        open_loops_summary = await _collect_consciousness_text(prompt_messages)

    # c. presence_gap
    presence_gap = ""
    last_activity = await db.get_recent_activity_time()
    if last_activity:
        try:
            last_time = datetime.fromisoformat(last_activity)
            if last_time.tzinfo is None:
                last_time = last_time.replace(tzinfo=datetime.now().astimezone().tzinfo)
            hours_ago = (datetime.now(last_time.tzinfo) - last_time).total_seconds() / 3600
            if hours_ago > 24:
                # 简单记录离开状态
                presence_gap = f"The user has been away for {hours_ago:.1f} hours."
        except Exception as e:
            logger.warning("Failed to calculate presence_gap: %s", e)

    # d. background_activity_candidates
    background_activity_candidates = []  # Reserved for v2

    # e. write back
    await db.set_consciousness_snapshot(
        open_loops_summary=open_loops_summary,
        open_loops_count=len(open_loops),
        high_importance_memories=high_importance_memories,
        high_importance_memory_count=len(high_importance_memories),
        background_activity_candidates=background_activity_candidates,
        presence_gap=presence_gap,
    )

    interval_hours = getattr(settings, "consciousness_interval_hours", 6.0)
    _status["next_run_at"] = (datetime.now().astimezone() + timedelta(hours=interval_hours)).isoformat()
    logger.info("  -> snapshot produced and saved to db.")


async def _loop():
    interval = getattr(settings, "consciousness_interval_hours", 6.0) * 3600
    _status["running"] = True
    logger.info("Consciousness loop started, interval=%.1f hours", interval / 3600)
    while _status["running"]:
        try:
            await asyncio.sleep(interval)
            await run_once()
        except asyncio.CancelledError:
            break
        except Exception:
            logger.exception("Consciousness loop error")
            await asyncio.sleep(60)


def start_loop():
    global _loop_task
    if not getattr(settings, "consciousness_enabled", True):
        logger.info("Consciousness loop disabled")
        return
    if _loop_task and not _loop_task.done():
        logger.warning("Consciousness loop already running")
        return
    _loop_task = asyncio.create_task(_loop())


def stop_loop():
    global _loop_task
    _status["running"] = False
    if _loop_task:
        _loop_task.cancel()
        _loop_task = None
    logger.info("Consciousness loop stopped")
