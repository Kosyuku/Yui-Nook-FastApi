"""Persistent History A/B partition state.

This module prepares the formal prompt-cache history rotation model. It is not
wired into chat or RP routes yet; current production paths still use their
legacy recent-message loaders.
"""
from __future__ import annotations

from dataclasses import dataclass, field
import json
from typing import Any, Literal

import database as db
from config import settings

PartitionMode = Literal["chat", "rp"]
TABLE_NAME = "conversation_partitions"


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
