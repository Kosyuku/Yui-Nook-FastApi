"""Lightweight gate for passive activity events.

The gate only classifies whether an incoming event is worth later handling.
It does not write diary, memory, or proactive messages by itself.
"""
from __future__ import annotations

import json
import logging
from dataclasses import dataclass, asdict
from typing import Any

import ai_runtime
import database as db

logger = logging.getLogger(__name__)


@dataclass
class EventGateResult:
    should_handle: bool
    should_notify_llm: bool
    reason: str
    message_hint: str
    status: str = "screened"


def _extract_json_object(text: str) -> dict[str, Any]:
    raw = str(text or "").strip()
    if not raw:
        return {}
    if raw.startswith("```"):
        raw = raw.strip("`").strip()
        if raw.lower().startswith("json"):
            raw = raw[4:].strip()
    try:
        parsed = json.loads(raw)
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        pass
    start = raw.find("{")
    end = raw.rfind("}")
    if start >= 0 and end > start:
        try:
            parsed = json.loads(raw[start:end + 1])
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            return {}
    return {}


def _json_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    return str(value or "").strip().lower() in {"1", "true", "yes", "y", "on"}


def _rule_fallback(event: dict[str, Any], *, reason: str = "model_unavailable") -> EventGateResult:
    content = f"{event.get('event_value', '')} {event.get('content', '')}".lower()
    useful_markers = (
        "到家", "睡", "醒", "病", "难受", "哭", "开心", "生日", "纪念",
        "照片", "日记", "微信", "小红书", "health", "sleep", "heart",
    )
    should_handle = any(marker.lower() in content for marker in useful_markers)
    return EventGateResult(
        should_handle=should_handle,
        should_notify_llm=False,
        reason=reason if not should_handle else f"{reason}; keyword fallback marked as relevant",
        message_hint="",
        status="fallback",
    )


async def screen_activity_event(event: dict[str, Any]) -> EventGateResult:
    """Classify an activity event without causing side effects beyond storing gate fields."""
    event_id = str(event.get("id") or "").strip()
    payload = {
        "event_type": event.get("event_type") or "",
        "event_value": event.get("event_value") or "",
        "content": event.get("content") or "",
        "url": event.get("url") or "",
        "source": event.get("source") or "",
        "occurred_at": event.get("occurred_at") or event.get("created_at") or "",
    }
    system_prompt = (
        "You are the passive wake event gate for an AI companion.\n"
        "Decide whether this external activity event is worth later handling.\n"
        "Return ONLY JSON with keys: should_handle, should_notify_llm, reason, message_hint.\n"
        "Rules:\n"
        "- Be conservative. Most routine app-open events should be ignored.\n"
        "- should_handle means keep this event as useful short-term context.\n"
        "- should_notify_llm means it may deserve a later larger-model response.\n"
        "- Never write diary or memory here.\n"
        "- Write reason and message_hint in Chinese."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
    ]
    try:
        text = await ai_runtime.collect_text_response("consciousness", messages, temperature=0.1)
        data = _extract_json_object(text)
        if not data:
            logger.warning("event_gate: non-json response for event %s", event_id)
            return _rule_fallback(event, reason="non_json_response")
        result = EventGateResult(
            should_handle=_json_bool(data.get("should_handle")),
            should_notify_llm=_json_bool(data.get("should_notify_llm")),
            reason=str(data.get("reason") or "").strip(),
            message_hint=str(data.get("message_hint") or "").strip(),
            status="screened",
        )
        logger.info(
            "event_gate: event=%s handle=%s notify=%s reason=%s",
            event_id,
            result.should_handle,
            result.should_notify_llm,
            result.reason[:120],
        )
        return result
    except Exception as exc:
        logger.warning("event_gate: failed for event %s: %s", event_id, exc)
        return _rule_fallback(event, reason=str(exc))


async def screen_and_store_activity_event(event: dict[str, Any]) -> tuple[dict[str, Any], EventGateResult]:
    result = await screen_activity_event(event)
    updated = await db.update_activity_event_gate(
        str(event.get("id") or ""),
        gate_status=result.status,
        gate_should_handle=result.should_handle,
        gate_should_notify_llm=result.should_notify_llm,
        gate_message_hint=result.message_hint,
        gate_reason=result.reason,
    )
    return updated or event, result


def serialize_gate_result(result: EventGateResult) -> dict[str, Any]:
    return asdict(result)
