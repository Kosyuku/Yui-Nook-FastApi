"""Idle conversation summarizer for companion_state + long-term memories."""
from __future__ import annotations

import asyncio
import json
import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import ai_runtime
import database as db
from config import ProviderConfig, settings
from models import EchoAdapter, OpenAICompatAdapter
from models import router as model_router

logger = logging.getLogger(__name__)

SUMMARY_IDLE_MINUTES = 30
SUMMARY_POLL_SECONDS = 300
MAX_SUMMARY_MESSAGES = 200
MAX_MEMORY_ITEMS = 3

_task: Optional[asyncio.Task] = None
_status = {
    "running": False,
    "last_run": None,
    "checked_sessions": 0,
    "updated_states": 0,
    "written_memories": 0,
    "failed": 0,
}


def get_status() -> dict[str, Any]:
    return _status.copy()


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _parse_dt(value: str | None) -> Optional[datetime]:
    raw = str(value or "").strip()
    if not raw:
        return None
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except Exception:
        return None


def _is_idle_enough(updated_at: str | None) -> bool:
    dt = _parse_dt(updated_at)
    if not dt:
        return False
    return dt <= (_utcnow() - timedelta(minutes=SUMMARY_IDLE_MINUTES))


def _clip_line(text: str, max_chars: int = 220) -> str:
    compact = " ".join(str(text or "").strip().split())
    if len(compact) <= max_chars:
        return compact
    return compact[:max_chars].rstrip() + "..."


def _render_messages(messages: list[dict[str, Any]]) -> str:
    lines: list[str] = []
    for msg in messages[-MAX_SUMMARY_MESSAGES:]:
        role = "user" if str(msg.get("role") or "") == "user" else "assistant"
        content = _clip_line(str(msg.get("content") or ""))
        if content:
            lines.append(f"[{role}] {content}")
    return "\n".join(lines)


def _normalize_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    lowered = str(value or "").strip().lower()
    return lowered in {"1", "true", "yes", "y"}


def _extract_json_payload(text: str) -> dict[str, Any] | None:
    raw = str(text or "").strip()
    if not raw:
        return None
    if raw.startswith("```"):
        raw = raw.strip("`")
        if "\n" in raw:
            raw = raw.split("\n", 1)[1]
        if raw.endswith("```"):
            raw = raw[:-3].strip()
    try:
        data = json.loads(raw)
        return data if isinstance(data, dict) else None
    except Exception:
        pass

    start = raw.find("{")
    end = raw.rfind("}")
    if start < 0 or end <= start:
        return None
    snippet = raw[start : end + 1]
    try:
        data = json.loads(snippet)
        return data if isinstance(data, dict) else None
    except Exception:
        return None


async def _resolve_summary_adapter() -> tuple[Any, dict[str, Any]]:
    adapter, info, kwargs = await ai_runtime.resolve_adapter_for_slot(
        "summary",
        tools=[],
        tool_choice="none",
    )
    if isinstance(adapter, EchoAdapter):
        chat_adapter = model_router.get("chat")
        if not isinstance(chat_adapter, EchoAdapter):
            return chat_adapter, {"tools": [], "tool_choice": "none"}
    merged_kwargs = {"tools": [], "tool_choice": "none"}
    merged_kwargs.update(kwargs)
    if info.get("model"):
        merged_kwargs.setdefault("model", info.get("model"))
    return adapter, merged_kwargs


async def _collect_model_text(messages: list[dict[str, str]], *, temperature: float = 0.2) -> str:
    adapter, kwargs = await _resolve_summary_adapter()
    if isinstance(adapter, EchoAdapter):
        logger.warning("Summary adapter is still echo; skip idle conversation summary")
        return ""
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=temperature, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return "".join(parts).strip()


async def _run_state_summarizer(old_state: dict[str, Any], new_messages: list[dict[str, Any]]) -> dict[str, Any] | None:
    transcript = _render_messages(new_messages)
    if not transcript:
        return None
    summary_prompt = await ai_runtime.resolve_prompt("summary")
    prompt_messages = [
        {
            "role": "system",
            "content": (
                f"{summary_prompt}\n\n" if summary_prompt else ""
            ) + (
                "You are a companion state summarizer. "
                "Update only durable profile summary fields based on newly added dialogue. "
                "Return strict JSON only with keys: state_update, should_write_memory, memory_hint. "
                "Do not include markdown, comments, or code fences."
            ),
        },
        {
            "role": "user",
            "content": (
                "旧 summary:\n"
                f"- impression: {old_state.get('impression') or ''}\n"
                f"- relationship_progress: {old_state.get('relationship_progress') or ''}\n"
                f"- likes_summary: {old_state.get('likes_summary') or ''}\n\n"
                "新增对话:\n"
                f"{transcript}\n\n"
                "请输出 JSON:\n"
                "{\n"
                '  "state_update": {\n'
                '    "impression": "...",\n'
                '    "relationship_progress": "...",\n'
                '    "likes_summary": "..."\n'
                "  },\n"
                '  "should_write_memory": true,\n'
                '  "memory_hint": "新增长期偏好 / 新设定 / 关键事件 / 无"\n'
                "}"
            ),
        },
    ]
    raw = await _collect_model_text(prompt_messages, temperature=0.2)
    payload = _extract_json_payload(raw)
    if not payload:
        logger.warning("State summarizer returned non-JSON payload: %s", raw[:300])
        return None
    update = payload.get("state_update") or {}
    if not isinstance(update, dict):
        return None
    return {
        "state_update": {
            "impression": str(update.get("impression") or "").strip(),
            "relationship_progress": str(update.get("relationship_progress") or "").strip(),
            "likes_summary": str(update.get("likes_summary") or "").strip(),
        },
        "should_write_memory": _normalize_bool(payload.get("should_write_memory")),
        "memory_hint": str(payload.get("memory_hint") or "").strip(),
    }


async def _run_memory_summarizer(
    *,
    agent_id: str,
    new_messages: list[dict[str, Any]],
    memory_hint: str = "",
) -> int:
    transcript = _render_messages(new_messages)
    if not transcript:
        return 0
    summary_prompt = await ai_runtime.resolve_prompt("summary")
    prompt_messages = [
        {
            "role": "system",
            "content": (
                f"{summary_prompt}\n\n" if summary_prompt else ""
            ) + (
                "You extract only durable long-term memories from dialogue. "
                "Ignore transient emotions, one-off chatter, and unstable details. "
                "Return strict JSON only: {\"memories\": [...]}."
            ),
        },
        {
            "role": "user",
            "content": (
                f"memory_hint: {memory_hint or '无'}\n\n"
                "新增对话:\n"
                f"{transcript}\n\n"
                "输出格式:\n"
                "{\n"
                '  "memories": [\n'
                "    {\n"
                '      "content": "...",\n'
                '      "category": "core_profile|recent_pending|deep|ephemeral",\n'
                '      "importance": 1,\n'
                '      "tags": "comma,separated"\n'
                "    }\n"
                "  ]\n"
                "}\n"
                f"最多输出 {MAX_MEMORY_ITEMS} 条，宁缺毋滥。"
            ),
        },
    ]
    raw = await _collect_model_text(prompt_messages, temperature=0.2)
    payload = _extract_json_payload(raw)
    if not payload:
        logger.warning("Memory summarizer returned non-JSON payload: %s", raw[:300])
        return 0

    items = payload.get("memories") or []
    if not isinstance(items, list):
        return 0

    created = 0
    for item in items[:MAX_MEMORY_ITEMS]:
        if not isinstance(item, dict):
            continue
        content = str(item.get("content") or "").strip()
        category = db.normalize_memory_category(item.get("category"))
        if not content or category not in {"core_profile", "recent_pending", "deep", "ephemeral"}:
            continue
        probe = content[:12]
        try:
            candidates = await db.search_memories(
                keyword=probe,
                category=category,
                limit=10,
                agent_id=agent_id,
                touch=False,
            )
        except Exception:
            candidates = []
        normalized = content.lower().strip()
        if any(str(db.memory_raw_content(row) or "").strip().lower() == normalized for row in candidates):
            continue
        importance = item.get("importance")
        try:
            importance_value = max(1, min(5, int(importance)))
        except Exception:
            importance_value = 3
        await db.add_memory(
            content=content,
            raw_content=content,
            category=category,
            tags=str(item.get("tags") or "").strip(),
            source="state_summary_auto",
            agent_id=agent_id,
            source_agent_id=agent_id,
            importance=importance_value,
        )
        created += 1
    return created


async def summarize_idle_session(session_id: str, *, agent_id: str | None = None) -> bool:
    session = await db.get_session(session_id)
    if not session:
        return False
    if not _is_idle_enough(session.get("updated_at")):
        return False

    resolved_agent_id = db.normalize_agent_id(agent_id or session.get("agent_id"))
    messages = await db.get_messages_after(
        session_id,
        str(session.get("last_summarized_message_id") or ""),
        limit=1000,
    )
    if not messages:
        return False

    last_message_id = str(messages[-1].get("id") or "").strip()
    if not last_message_id:
        return False

    old_state = await db.get_companion_state(agent_id=resolved_agent_id)
    result = await _run_state_summarizer(old_state, messages)
    if not result:
        _status["failed"] += 1
        return False

    state_update = result.get("state_update") or {}
    merged_impression = state_update.get("impression") or old_state.get("impression") or ""
    merged_progress = state_update.get("relationship_progress") or old_state.get("relationship_progress") or ""
    merged_likes = state_update.get("likes_summary") or old_state.get("likes_summary") or ""

    await db.set_companion_state_summary(
        agent_id=resolved_agent_id,
        impression=merged_impression,
        relationship_progress=merged_progress,
        likes_summary=merged_likes,
    )
    await db.mark_session_summarized(
        session_id,
        last_message_id,
        agent_id=resolved_agent_id,
    )
    _status["updated_states"] += 1

    if result.get("should_write_memory"):
        try:
            created = await _run_memory_summarizer(
                agent_id=resolved_agent_id,
                new_messages=messages,
                memory_hint=str(result.get("memory_hint") or "").strip(),
            )
            _status["written_memories"] += created
        except Exception:
            logger.exception("Memory summarizer failed: session=%s agent=%s", session_id, resolved_agent_id)
    return True


async def run_pending_checks() -> int:
    sessions = await db.list_sessions()
    processed = 0
    for session in sessions:
        session_id = str(session.get("id") or "").strip()
        if not session_id:
            continue
        _status["checked_sessions"] += 1
        try:
            if await summarize_idle_session(session_id, agent_id=session.get("agent_id")):
                processed += 1
        except Exception:
            _status["failed"] += 1
            logger.exception("Idle summary check failed for session=%s", session_id)
    _status["last_run"] = _utcnow().isoformat()
    return processed


async def _loop() -> None:
    _status["running"] = True
    logger.info("Conversation summary loop started")
    try:
        await run_pending_checks()
        while _status["running"]:
            await asyncio.sleep(SUMMARY_POLL_SECONDS)
            await run_pending_checks()
    except asyncio.CancelledError:
        raise
    finally:
        _status["running"] = False
        logger.info("Conversation summary loop stopped")


def start_loop() -> None:
    global _task
    if _task and not _task.done():
        return
    _task = asyncio.create_task(_loop())


def stop_loop() -> None:
    global _task
    _status["running"] = False
    if _task:
        _task.cancel()
        _task = None
