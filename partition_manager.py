"""Persistent History A/B partition state.

This module prepares the formal prompt-cache history rotation model. It is not
wired into chat or RP routes yet; current production paths still use their
legacy recent-message loaders.
"""
from __future__ import annotations

from dataclasses import dataclass, field
import json
import logging
from typing import Any, Literal

import database as db
from config import settings

PartitionMode = Literal["chat", "rp"]
TABLE_NAME = "conversation_partitions"
SUMMARY_MAX_CHARS = 1600
logger = logging.getLogger(__name__)


@dataclass(slots=True)
class ConversationPartition:
    id: str
    agent_id: str
    session_id: str = ""
    rp_room_id: str = ""
    mode: PartitionMode = "chat"
    summary_text: str = ""
    summary_revision: str = ""
    history_a: list[dict[str, Any]] = field(default_factory=list)
    history_b: list[dict[str, Any]] = field(default_factory=list)
    history_a_cycle_id: str = "a0"
    history_b_cycle_id: str = "b0"
    turn_count: int = 0
    rotate_every: int = 15
    created_at: str = ""
    updated_at: str = ""

    @classmethod
    def from_row(cls, row: dict[str, Any]) -> "ConversationPartition":
        return cls(
            id=str(row.get("id") or ""),
            agent_id=db.normalize_agent_id(row.get("agent_id")),
            session_id=str(row.get("session_id") or ""),
            rp_room_id=str(row.get("rp_room_id") or ""),
            mode=_normalize_mode(row.get("mode")),
            summary_text=str(row.get("summary_text") or ""),
            summary_revision=str(row.get("summary_revision") or ""),
            history_a=_json_list(row.get("history_a")),
            history_b=_json_list(row.get("history_b")),
            history_a_cycle_id=str(row.get("history_a_cycle_id") or "a0"),
            history_b_cycle_id=str(row.get("history_b_cycle_id") or "b0"),
            turn_count=int(row.get("turn_count") or 0),
            rotate_every=max(1, int(row.get("rotate_every") or 15)),
            created_at=str(row.get("created_at") or ""),
            updated_at=str(row.get("updated_at") or ""),
        )

    def to_payload(self, *, include_id: bool = True) -> dict[str, Any]:
        payload = {
            "agent_id": db.normalize_agent_id(self.agent_id),
            "session_id": str(self.session_id or ""),
            "rp_room_id": str(self.rp_room_id or ""),
            "mode": _normalize_mode(self.mode),
            "summary_text": str(self.summary_text or ""),
            "summary_revision": str(self.summary_revision or ""),
            "history_a": self.history_a,
            "history_b": self.history_b,
            "history_a_cycle_id": str(self.history_a_cycle_id or "a0"),
            "history_b_cycle_id": str(self.history_b_cycle_id or "b0"),
            "turn_count": int(self.turn_count or 0),
            "rotate_every": max(1, int(self.rotate_every or 15)),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
        if include_id:
            payload["id"] = self.id
        return payload

    def debug_metadata(self) -> dict[str, Any]:
        return {
            "partition_id": self.id,
            "mode": self.mode,
            "agent_id": self.agent_id,
            "session_id": self.session_id,
            "rp_room_id": self.rp_room_id,
            "summary_revision": self.summary_revision,
            "summary_char_count": len(self.summary_text or ""),
            "history_a_cycle_id": self.history_a_cycle_id,
            "history_b_cycle_id": self.history_b_cycle_id,
            "history_a_message_count": len(self.history_a),
            "history_b_message_count": len(self.history_b),
            "turn_count": self.turn_count,
            "rotate_every": self.rotate_every,
        }


def _normalize_mode(value: Any) -> PartitionMode:
    mode = str(value or "chat").strip().lower()
    return "rp" if mode == "rp" else "chat"


def _normalize_identity(
    *,
    agent_id: str | None,
    session_id: str | None = "",
    rp_room_id: str | None = "",
    mode: str = "chat",
) -> dict[str, str]:
    normalized_mode = _normalize_mode(mode)
    return {
        "agent_id": db.normalize_agent_id(agent_id),
        "session_id": "" if normalized_mode == "rp" else str(session_id or ""),
        "rp_room_id": str(rp_room_id or "") if normalized_mode == "rp" else "",
        "mode": normalized_mode,
    }


def _json_list(value: Any) -> list[dict[str, Any]]:
    if value in (None, ""):
        return []
    if isinstance(value, list):
        items = value
    else:
        try:
            items = json.loads(str(value))
        except Exception:
            return []
    return [item for item in items if isinstance(item, dict)]


def _json_text(value: Any) -> str:
    return json.dumps(value if isinstance(value, list) else [], ensure_ascii=False)


def _next_cycle_id(current: str, prefix: str) -> str:
    current = str(current or f"{prefix}0")
    suffix = current[1:] if current.startswith(prefix) else current
    try:
        number = int(suffix)
    except ValueError:
        number = 0
    return f"{prefix}{number + 1}"


def should_rotate(partition: ConversationPartition) -> bool:
    return int(partition.turn_count or 0) + 1 >= max(1, int(partition.rotate_every or 15))


def _clip_text(text: str, max_chars: int = 220) -> str:
    compact = " ".join(str(text or "").strip().split())
    if len(compact) <= max_chars:
        return compact
    return compact[:max_chars].rstrip() + "..."


def _render_messages(messages: list[dict[str, Any]], *, max_messages: int = 80) -> str:
    lines: list[str] = []
    for item in messages[-max_messages:]:
        role = "user" if str(item.get("role") or "") == "user" else "assistant"
        content = _clip_text(str(item.get("content") or ""))
        if content:
            lines.append(f"[{role}] {content}")
    return "\n".join(lines)


def _merge_summary_text(old_summary: str, new_summary: str, *, max_chars: int = SUMMARY_MAX_CHARS) -> str:
    old_summary = " ".join(str(old_summary or "").split())
    new_summary = " ".join(str(new_summary or "").split())
    if old_summary and new_summary:
        merged = f"{old_summary}\n{new_summary}"
    else:
        merged = old_summary or new_summary
    if len(merged) <= max_chars:
        return merged
    return merged[-max_chars:].lstrip()


def _extractive_partition_summary(partition: ConversationPartition) -> str:
    transcript = _render_messages(partition.history_a)
    if not transcript:
        return ""
    prefix = "Summary of earlier committed turns:"
    return _clip_text(f"{prefix} {transcript}", max_chars=900)


async def _model_partition_summary(partition: ConversationPartition, *, provider: str | None, model: str | None) -> str:
    import ai_runtime
    from models import EchoAdapter

    transcript = _render_messages(partition.history_a)
    if not transcript:
        return ""

    adapter, info, kwargs = await ai_runtime.resolve_adapter_for_slot(
        "summary",
        tools=[],
        tool_choice="none",
    )
    if model or settings.conversation_partition_summary_model:
        kwargs["model"] = model or settings.conversation_partition_summary_model
    if isinstance(adapter, EchoAdapter):
        return ""

    messages = [
        {
            "role": "system",
            "content": (
                "Compress old committed History A into a concise durable conversation summary. "
                "Preserve stable facts, decisions, preferences, unresolved tasks, and roleplay continuity. "
                "Do not include markdown headings. Keep it short."
            ),
        },
        {
            "role": "user",
            "content": (
                f"Existing summary:\n{partition.summary_text or '(none)'}\n\n"
                f"Old History A to compress:\n{transcript}\n\n"
                "Return the updated compact summary only."
            ),
        },
    ]
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=0.2, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return _clip_text("".join(parts).strip(), max_chars=SUMMARY_MAX_CHARS)


async def summarize_partition_history_a(
    *,
    partition: ConversationPartition,
    provider: str | None = None,
    model: str | None = None,
) -> str:
    if not partition.history_a:
        return ""
    model_summary = ""
    try:
        model_summary = await _model_partition_summary(partition, provider=provider, model=model)
    except Exception as exc:
        logger.warning("Partition summary model failed: %s", exc)
    new_summary = model_summary or _extractive_partition_summary(partition)
    return _merge_summary_text(partition.summary_text, new_summary)


async def get_partition(
    *,
    agent_id: str | None,
    session_id: str | None = "",
    rp_room_id: str | None = "",
    mode: str = "chat",
) -> ConversationPartition | None:
    identity = _normalize_identity(
        agent_id=agent_id,
        session_id=session_id,
        rp_room_id=rp_room_id,
        mode=mode,
    )
    if db._use_supabase_data():
        rows = await db._supabase_select(
            TABLE_NAME,
            filters={
                "agent_id": f"eq.{identity['agent_id']}",
                "session_id": f"eq.{identity['session_id']}",
                "rp_room_id": f"eq.{identity['rp_room_id']}",
                "mode": f"eq.{identity['mode']}",
            },
            limit=1,
        )
        return ConversationPartition.from_row(rows[0]) if rows else None

    conn = await db.get_db()
    cursor = await conn.execute(
        """
        SELECT * FROM conversation_partitions
        WHERE agent_id = ? AND session_id = ? AND rp_room_id = ? AND mode = ?
        LIMIT 1
        """,
        (identity["agent_id"], identity["session_id"], identity["rp_room_id"], identity["mode"]),
    )
    row = await cursor.fetchone()
    return ConversationPartition.from_row(dict(row)) if row else None


async def inspect_partition(
    *,
    agent_id: str,
    session_id: str = "",
    rp_room_id: str = "",
    mode: str = "chat",
) -> dict[str, Any] | None:
    partition = await get_partition(
        agent_id=agent_id,
        session_id=session_id,
        rp_room_id=rp_room_id,
        mode=mode,
    )
    if partition is None:
        return None
    recent_history_b = [
        {
            "role": str(item.get("role") or ""),
            "content": str(item.get("content") or "")[:160],
        }
        for item in partition.history_b[-2:]
    ]
    return {
        "id": partition.id,
        "agent_id": partition.agent_id,
        "session_id": partition.session_id,
        "rp_room_id": partition.rp_room_id,
        "mode": partition.mode,
        "turn_count": partition.turn_count,
        "rotate_every": partition.rotate_every,
        "history_a_cycle_id": partition.history_a_cycle_id,
        "history_b_cycle_id": partition.history_b_cycle_id,
        "history_a_message_count": len(partition.history_a),
        "history_b_message_count": len(partition.history_b),
        "summary_revision": partition.summary_revision,
        "summary_char_count": len(partition.summary_text or ""),
        "updated_at": partition.updated_at,
        "history_b_recent": recent_history_b,
    }


async def get_or_create_partition(
    *,
    agent_id: str | None,
    session_id: str | None = "",
    rp_room_id: str | None = "",
    mode: str = "chat",
    rotate_every: int = 15,
) -> ConversationPartition:
    existing = await get_partition(
        agent_id=agent_id,
        session_id=session_id,
        rp_room_id=rp_room_id,
        mode=mode,
    )
    if existing:
        return existing

    identity = _normalize_identity(
        agent_id=agent_id,
        session_id=session_id,
        rp_room_id=rp_room_id,
        mode=mode,
    )
    now = db._now()
    partition = ConversationPartition(
        id=db._new_id(),
        agent_id=identity["agent_id"],
        session_id=identity["session_id"],
        rp_room_id=identity["rp_room_id"],
        mode=_normalize_mode(identity["mode"]),
        rotate_every=max(1, int(rotate_every or 15)),
        created_at=now,
        updated_at=now,
    )

    if db._use_supabase_data():
        row = await db._supabase_insert_verified(
            TABLE_NAME,
            partition.to_payload(),
            on_conflict="agent_id,session_id,rp_room_id,mode",
            verify_filters={
                "agent_id": f"eq.{partition.agent_id}",
                "session_id": f"eq.{partition.session_id}",
                "rp_room_id": f"eq.{partition.rp_room_id}",
                "mode": f"eq.{partition.mode}",
            },
        )
        return ConversationPartition.from_row(row)

    conn = await db.get_db()
    await conn.execute(
        """
        INSERT OR IGNORE INTO conversation_partitions
        (id, agent_id, session_id, rp_room_id, mode, summary_text, summary_revision,
         history_a, history_b, history_a_cycle_id, history_b_cycle_id,
         turn_count, rotate_every, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            partition.id,
            partition.agent_id,
            partition.session_id,
            partition.rp_room_id,
            partition.mode,
            partition.summary_text,
            partition.summary_revision,
            _json_text(partition.history_a),
            _json_text(partition.history_b),
            partition.history_a_cycle_id,
            partition.history_b_cycle_id,
            partition.turn_count,
            partition.rotate_every,
            partition.created_at,
            partition.updated_at,
        ),
    )
    await conn.commit()
    created = await get_partition(
        agent_id=partition.agent_id,
        session_id=partition.session_id,
        rp_room_id=partition.rp_room_id,
        mode=partition.mode,
    )
    if created is None:
        raise RuntimeError("failed to create conversation partition")
    return created


async def save_partition(partition: ConversationPartition) -> ConversationPartition:
    partition.updated_at = db._now()
    if db._use_supabase_data():
        row = await db._supabase_update_verified(
            TABLE_NAME,
            {"id": f"eq.{partition.id}"},
            partition.to_payload(include_id=False),
        )
        return ConversationPartition.from_row(row) if row else partition

    conn = await db.get_db()
    await conn.execute(
        """
        UPDATE conversation_partitions
        SET summary_text = ?,
            summary_revision = ?,
            history_a = ?,
            history_b = ?,
            history_a_cycle_id = ?,
            history_b_cycle_id = ?,
            turn_count = ?,
            rotate_every = ?,
            updated_at = ?
        WHERE id = ?
        """,
        (
            partition.summary_text,
            partition.summary_revision,
            _json_text(partition.history_a),
            _json_text(partition.history_b),
            partition.history_a_cycle_id,
            partition.history_b_cycle_id,
            partition.turn_count,
            partition.rotate_every,
            partition.updated_at,
            partition.id,
        ),
    )
    await conn.commit()
    return partition


async def append_committed_turn(
    partition: ConversationPartition | None = None,
    *,
    agent_id: str | None = None,
    session_id: str | None = "",
    rp_room_id: str | None = "",
    mode: str = "chat",
    rotate_every: int | None = None,
    user_message: dict[str, Any],
    assistant_message: dict[str, Any],
) -> ConversationPartition:
    if partition is None:
        partition = await get_or_create_partition(
            agent_id=agent_id,
            session_id=session_id,
            rp_room_id=rp_room_id,
            mode=mode,
            rotate_every=rotate_every or settings.conversation_partition_rotate_every,
        )
    partition.history_b.extend([
        _message_snapshot(user_message),
        _message_snapshot(assistant_message),
    ])
    partition.turn_count += 1
    if partition.turn_count >= partition.rotate_every:
        old_history_a = list(partition.history_a)
        if old_history_a and settings.conversation_partition_summary_enabled:
            summary_candidate = ConversationPartition(
                id=partition.id,
                agent_id=partition.agent_id,
                session_id=partition.session_id,
                rp_room_id=partition.rp_room_id,
                mode=partition.mode,
                summary_text=partition.summary_text,
                summary_revision=partition.summary_revision,
                history_a=old_history_a,
                history_b=list(partition.history_b),
                history_a_cycle_id=partition.history_a_cycle_id,
                history_b_cycle_id=partition.history_b_cycle_id,
                turn_count=partition.turn_count,
                rotate_every=partition.rotate_every,
                created_at=partition.created_at,
                updated_at=partition.updated_at,
            )
            try:
                summary_text = await summarize_partition_history_a(
                    partition=summary_candidate,
                    model=settings.conversation_partition_summary_model,
                )
                if summary_text:
                    partition.summary_text = summary_text
                    partition.summary_revision = db._now()
            except Exception as exc:
                logger.warning("Partition History A summary failed: %s", exc)
        partition.history_a = partition.history_b
        partition.history_b = []
        partition.history_a_cycle_id = _next_cycle_id(partition.history_a_cycle_id, "a")
        partition.history_b_cycle_id = _next_cycle_id(partition.history_b_cycle_id, "b")
        partition.turn_count = 0
    return await save_partition(partition)


async def update_partition_summary(
    partition: ConversationPartition,
    *,
    summary_text: str,
    summary_revision: str,
) -> ConversationPartition:
    partition.summary_text = str(summary_text or "")
    partition.summary_revision = str(summary_revision or "")
    return await save_partition(partition)


def _message_snapshot(message: dict[str, Any]) -> dict[str, Any]:
    return {
        "role": str(message.get("role") or ""),
        "content": str(message.get("content") or ""),
        "created_at": str(message.get("created_at") or message.get("timestamp") or ""),
        "message_id": str(message.get("id") or ""),
    }
