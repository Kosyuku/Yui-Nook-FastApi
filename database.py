"""SQLite database layer - Sessions + Messages"""
from __future__ import annotations

import logging
import hashlib
import json
import math
import re
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

import aiosqlite
import httpx

from config import settings

_db: aiosqlite.Connection | None = None
logger = logging.getLogger(__name__)
_supabase_settings_table_missing = False

MEMORY_CATEGORY_ALIASES = {
    "core": "core_profile",
    "profile": "core_profile",
    "core/profile": "core_profile",
    "core_profile": "core_profile",
    "recent": "recent_pending",
    "pending": "recent_pending",
    "recent/pending": "recent_pending",
    "recent_pending": "recent_pending",
    "daily": "recent_pending",
    "deep": "deep",
    "diary": "deep",
    "writing": "deep",
    "ephemeral": "ephemeral",
}

AGENT_ID_RE = re.compile(r"^[a-z0-9_-]+$")
AGENTS_TABLE = "agents"
AGENT_EXTERNAL_LINKS_TABLE = "agent_external_links"
DEFAULT_AGENT_ID = "azheng"

SCHEMA = """
CREATE TABLE IF NOT EXISTS agents (
    agent_id     TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    avatar       TEXT DEFAULT '',
    description  TEXT DEFAULT '',
    persona      TEXT DEFAULT '',
    source       TEXT DEFAULT 'native',
    metadata     TEXT DEFAULT '{}',
    is_active    INTEGER NOT NULL DEFAULT 1,
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_agents_active
    ON agents(is_active, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_source
    ON agents(source, updated_at DESC);

CREATE TABLE IF NOT EXISTS agent_external_links (
    id            TEXT PRIMARY KEY,
    source        TEXT NOT NULL,
    external_id   TEXT NOT NULL,
    external_name TEXT DEFAULT '',
    agent_id      TEXT NOT NULL REFERENCES agents(agent_id),
    metadata      TEXT DEFAULT '{}',
    created_at    TEXT NOT NULL,
    updated_at    TEXT NOT NULL,
    UNIQUE(source, external_id)
);
CREATE INDEX IF NOT EXISTS idx_agent_external_links_agent
    ON agent_external_links(agent_id);

CREATE TABLE IF NOT EXISTS sessions (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL DEFAULT 'new session',
    model       TEXT NOT NULL DEFAULT 'echo',
    source_app  TEXT NOT NULL DEFAULT 'yui_nook',
    agent_id    TEXT NOT NULL DEFAULT 'default',
    last_summarized_message_id TEXT DEFAULT '',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id          TEXT PRIMARY KEY,
    session_id  TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    role        TEXT NOT NULL,
    content     TEXT NOT NULL,
    model       TEXT DEFAULT '',
    created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_session
    ON messages(session_id, created_at);

CREATE TABLE IF NOT EXISTS cot_logs (
    id          TEXT PRIMARY KEY,
    session_id  TEXT NOT NULL,
    agent_id    TEXT NOT NULL DEFAULT 'default',
    source      TEXT NOT NULL DEFAULT 'chat',
    log_type    TEXT NOT NULL,
    title       TEXT NOT NULL DEFAULT '',
    summary     TEXT NOT NULL DEFAULT '',
    content     TEXT NOT NULL DEFAULT '',
    tool_name   TEXT NOT NULL DEFAULT '',
    status      TEXT NOT NULL DEFAULT '',
    token_count INTEGER NOT NULL DEFAULT 0,
    pinned      INTEGER NOT NULL DEFAULT 0,
    expires_at  TEXT NOT NULL DEFAULT '',
    created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cot_logs_session_time
    ON cot_logs(session_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cot_logs_agent_time
    ON cot_logs(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cot_logs_cleanup
    ON cot_logs(session_id, pinned, created_at);
CREATE INDEX IF NOT EXISTS idx_cot_logs_expires
    ON cot_logs(expires_at);

CREATE TABLE IF NOT EXISTS rp_rooms (
    room_id        TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    world_setting  TEXT NOT NULL DEFAULT '',
    user_role      TEXT NOT NULL DEFAULT '',
    ai_role        TEXT NOT NULL DEFAULT '',
    agent_id       TEXT NOT NULL DEFAULT 'default',
    created_at     TEXT NOT NULL,
    last_active_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rp_rooms_agent_last_active
    ON rp_rooms(agent_id, last_active_at DESC);

CREATE TABLE IF NOT EXISTS rp_messages (
    id         TEXT PRIMARY KEY,
    room_id    TEXT NOT NULL REFERENCES rp_rooms(room_id) ON DELETE CASCADE,
    role       TEXT NOT NULL,
    content    TEXT NOT NULL,
    model      TEXT DEFAULT '',
    timestamp  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rp_messages_room_time
    ON rp_messages(room_id, timestamp);

CREATE TABLE IF NOT EXISTS memories (
    id          TEXT PRIMARY KEY,
    agent_id    TEXT NOT NULL DEFAULT 'default',
    visibility  TEXT NOT NULL DEFAULT 'private',
    source_agent_id TEXT NOT NULL DEFAULT 'default',
    content     TEXT NOT NULL,
    raw_content TEXT NOT NULL DEFAULT '',
    compressed_content TEXT DEFAULT '',
    category    TEXT NOT NULL,
    tags        TEXT DEFAULT '',
    source      TEXT DEFAULT '',
    importance  INTEGER NOT NULL DEFAULT 3,
    temperature REAL NOT NULL DEFAULT 0,
    last_touched_at TEXT DEFAULT '',
    touch_count INTEGER NOT NULL DEFAULT 0,
    expires_at  TEXT DEFAULT '',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_memories_category
    ON memories(category, updated_at);
CREATE INDEX IF NOT EXISTS idx_memories_agent_category
    ON memories(agent_id, category);
CREATE INDEX IF NOT EXISTS idx_memories_agent_visibility
    ON memories(agent_id, visibility);
CREATE INDEX IF NOT EXISTS idx_memories_agent_created_at
    ON memories(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_agent_updated_at
    ON memories(agent_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_visibility_updated
    ON memories(visibility, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_temperature
    ON memories(temperature DESC, last_touched_at DESC);

-- ========== new tables ==========

CREATE TABLE IF NOT EXISTS context_summaries (
    id              TEXT PRIMARY KEY,
    session_id      TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    summary         TEXT NOT NULL,
    msg_range_start TEXT,
    msg_range_end   TEXT,
    created_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id          TEXT PRIMARY KEY,
    content     TEXT NOT NULL,
    due_date    TEXT DEFAULT '',
    status      TEXT NOT NULL DEFAULT 'pending',  -- pending | done | cancelled
    tags        TEXT DEFAULT '',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id          TEXT PRIMARY KEY,
    content     TEXT NOT NULL,
    tags        TEXT DEFAULT '',
    date        TEXT NOT NULL,  -- YYYY-MM-DD
    created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notes_date ON notes(date);

CREATE TABLE IF NOT EXISTS moments (
    id          TEXT PRIMARY KEY,
    author_type TEXT NOT NULL,
    author_id   TEXT NOT NULL,
    visibility  TEXT NOT NULL DEFAULT 'public',
    content     TEXT NOT NULL,
    image       TEXT DEFAULT '',
    mood        TEXT DEFAULT '',
    likes_json  TEXT NOT NULL DEFAULT '[]',
    comments_json TEXT NOT NULL DEFAULT '[]',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_moments_author
    ON moments(author_type, author_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_moments_created_at
    ON moments(created_at DESC);

CREATE TABLE IF NOT EXISTS proactive_messages (
    id              TEXT PRIMARY KEY,
    content         TEXT NOT NULL,
    trigger_reason  TEXT DEFAULT '',  -- care | share | diary | silent
    status          TEXT NOT NULL DEFAULT 'pending',  -- pending | delivered | read
    created_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS memory_logs (
    id          TEXT PRIMARY KEY,
    memory_id   TEXT,
    action      TEXT NOT NULL,  -- create | update | delete | access
    detail      TEXT DEFAULT '',
    created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_settings (
    key         TEXT PRIMARY KEY,
    value       TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS companion_state (
    id                      TEXT PRIMARY KEY,
    agent_id                TEXT NOT NULL DEFAULT 'default',
    recent_topics           TEXT NOT NULL DEFAULT '[]',
    current_mood            TEXT DEFAULT '',
    open_loops              TEXT NOT NULL DEFAULT '[]',
    proactive_cooldown_until TEXT,
    impression              TEXT,
    relationship_progress   TEXT,
    likes_summary           TEXT,
    summary_updated_at      TEXT,
    updated_at              TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_companion_state_agent_id
    ON companion_state(agent_id);

CREATE TABLE IF NOT EXISTS diary (
    id              TEXT PRIMARY KEY,
    agent_id        TEXT NOT NULL DEFAULT 'default',
    visibility      TEXT NOT NULL DEFAULT 'private',
    source_agent_id TEXT NOT NULL DEFAULT 'default',
    title           TEXT NOT NULL DEFAULT '',
    content         TEXT NOT NULL,
    tags            TEXT DEFAULT '',
    created_at      TEXT NOT NULL,
    updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_agent_created_at
    ON diary(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diary_agent_updated_at
    ON diary(agent_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_diary_agent_visibility
    ON diary(agent_id, visibility);

CREATE TABLE IF NOT EXISTS diary_notebooks (
    id          TEXT PRIMARY KEY,
    author_type TEXT NOT NULL,
    author_id   TEXT NOT NULL,
    name        TEXT NOT NULL,
    description TEXT DEFAULT '',
    visibility  TEXT NOT NULL DEFAULT 'private',
    is_default  INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_notebooks_author
    ON diary_notebooks(author_type, author_id);
CREATE INDEX IF NOT EXISTS idx_diary_notebooks_author_updated
    ON diary_notebooks(author_type, author_id, updated_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_diary_notebooks_default_author
    ON diary_notebooks(author_type, author_id)
    WHERE is_default = 1;

CREATE TABLE IF NOT EXISTS diary_entries (
    id          TEXT PRIMARY KEY,
    notebook_id TEXT NOT NULL REFERENCES diary_notebooks(id) ON DELETE CASCADE,
    title       TEXT NOT NULL DEFAULT '',
    content     TEXT NOT NULL,
    tags        TEXT DEFAULT '',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_entries_notebook_updated
    ON diary_entries(notebook_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS diary_comments (
    id          TEXT PRIMARY KEY,
    entry_id     TEXT NOT NULL REFERENCES diary_entries(id) ON DELETE CASCADE,
    author_type TEXT NOT NULL,
    author_id   TEXT NOT NULL,
    content     TEXT NOT NULL,
    created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_comments_entry_created
    ON diary_comments(entry_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_diary_comments_author
    ON diary_comments(author_type, author_id);

CREATE TABLE IF NOT EXISTS diary_annotations (
    id          TEXT PRIMARY KEY,
    entry_id    TEXT NOT NULL REFERENCES diary_entries(id) ON DELETE CASCADE,
    author_type TEXT NOT NULL,
    author_id   TEXT NOT NULL,
    kind        TEXT NOT NULL DEFAULT 'underline',
    start_offset INTEGER NOT NULL DEFAULT 0,
    end_offset   INTEGER NOT NULL DEFAULT 0,
    text        TEXT NOT NULL DEFAULT '',
    note        TEXT DEFAULT '',
    created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_annotations_entry
    ON diary_annotations(entry_id, start_offset ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_diary_annotations_author
    ON diary_annotations(author_type, author_id);

CREATE TABLE IF NOT EXISTS memory_embeddings (
    memory_id     TEXT PRIMARY KEY,
    content_hash  TEXT NOT NULL,
    embedding_json TEXT NOT NULL,
    dimensions    INTEGER NOT NULL DEFAULT 0,
    updated_at    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS memory_labels (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    color       TEXT NOT NULL DEFAULT '#a78ec7',
    created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS memory_label_items (
    label_id    TEXT NOT NULL,
    memory_id   TEXT NOT NULL,
    created_at  TEXT NOT NULL,
    PRIMARY KEY (label_id, memory_id)
);
CREATE INDEX IF NOT EXISTS idx_memory_label_items_lid ON memory_label_items(label_id);
CREATE INDEX IF NOT EXISTS idx_memory_label_items_mid ON memory_label_items(memory_id);
"""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id() -> str:
    return uuid.uuid4().hex[:12]


class AgentResolutionError(ValueError):
    """Raised when an agent context cannot be resolved safely."""


class AgentNeedsBinding(AgentResolutionError):
    def __init__(self, *, source: str, external_id: str, external_name: str = ""):
        super().__init__(f"external role needs binding: {source}/{external_id}")
        self.source = source
        self.external_id = external_id
        self.external_name = external_name

    def payload(self) -> dict[str, Any]:
        return {
            "resolved": False,
            "needs_binding": True,
            "source": self.source,
            "external_id": self.external_id,
            "external_name": self.external_name,
        }


def _configured_default_agent_id() -> str:
    value = (
        getattr(settings, "default_agent_id", "")
        or getattr(settings, "current_agent_id", "")
        or DEFAULT_AGENT_ID
    )
    return normalize_agent_id_value(value)


def normalize_agent_id_value(agent_id: str | None) -> str:
    value = str(agent_id or "").strip().lower()
    if value.startswith("@"):
        value = value[1:]
    if not value:
        raise AgentResolutionError("agent_id is required")
    if not AGENT_ID_RE.fullmatch(value):
        raise AgentResolutionError("agent_id must use lowercase letters, digits, underscore, or dash")
    return value


def normalize_agent_id(agent_id: str | None) -> str:
    value = str(agent_id or "").strip()
    if not value:
        value = _configured_default_agent_id()
    return normalize_agent_id_value(value)


def normalize_visibility(visibility: str | None) -> str:
    value = str(visibility or "private").strip().lower()
    aliases = {
        "restricted": "shared",
    }
    value = aliases.get(value, value)
    return value if value in {"private", "shared", "global", "public"} else "private"


def resolve_source_agent_id(agent_id: str | None, source_agent_id: str | None) -> str:
    owner = normalize_agent_id(agent_id)
    source = normalize_agent_id(source_agent_id) if source_agent_id else owner
    return source or owner


async def resolve_source_agent_id_checked(agent_id: str | None, source_agent_id: str | None) -> str:
    owner = await require_agent(agent_id)
    source = await require_agent(source_agent_id) if source_agent_id else owner
    return source or owner


def normalize_memory_category(category: str | None) -> str:
    value = (category or "").strip().lower()
    if not value:
        return "deep"
    return MEMORY_CATEGORY_ALIASES.get(value, value.replace("/", "_"))


def memory_tier_label(category: str | None) -> str:
    normalized = normalize_memory_category(category)
    return {
        "core_profile": "core/profile",
        "recent_pending": "recent/pending",
        "deep": "deep",
        "ephemeral": "ephemeral",
    }.get(normalized, normalized)


def memory_raw_content(memory: dict[str, Any]) -> str:
    return str(memory.get("raw_content") or memory.get("content") or "").strip()


def memory_display_content(memory: dict[str, Any]) -> str:
    return str(memory.get("compressed_content") or memory.get("content") or memory.get("raw_content") or "").strip()


def memory_embedding_source(memory: dict[str, Any]) -> str:
    return memory_raw_content(memory) or memory_display_content(memory)


def memory_owner_label(memory: dict[str, Any], current_agent_id: str | None = None) -> str:
    current = normalize_agent_id(current_agent_id)
    owner = normalize_agent_id(memory.get("agent_id"))
    source_agent = normalize_agent_id(memory.get("source_agent_id"))
    if owner == current and source_agent == owner:
        return "current persona record"
    if source_agent != owner:
        return f"{owner} processed / source {source_agent}"
    return f"{owner} record"


def format_memory_with_source(memory: dict[str, Any], current_agent_id: str | None = None) -> str:
    text = memory_display_content(memory) or memory_raw_content(memory)
    if not text:
        return ""
    return f"[{memory_owner_label(memory, current_agent_id)}] {text}"


def _active_memory_filters(now: str | None = None) -> dict[str, str]:
    now_value = now or _now()
    return {"or": f"(expires_at.is.null,expires_at.gt.{now_value})"}


def _memory_active_where_clause() -> str:
    return "(expires_at IS NULL OR expires_at > ?)"


def _memory_visibility_where_clause(include_cross_agent: bool) -> str:
    if include_cross_agent:
        return "((agent_id = ?) OR (agent_id != ? AND visibility IN ('shared','global','public')))"
    return "(agent_id = ?)"


def _memory_scope_params(agent_id: str, include_cross_agent: bool) -> tuple[Any, ...]:
    normalized = normalize_agent_id(agent_id)
    return (normalized, normalized) if include_cross_agent else (normalized,)


def _memory_scope_post_filter(
    rows: list[dict[str, Any]],
    *,
    agent_id: str,
    include_cross_agent: bool,
    cross_agent_limit: int | None = None,
) -> list[dict[str, Any]]:
    current = normalize_agent_id(agent_id)
    own: list[dict[str, Any]] = []
    shared: list[dict[str, Any]] = []
    for row in rows:
        owner = normalize_agent_id(row.get("agent_id"))
        visibility = normalize_visibility(row.get("visibility"))
        if owner == current:
            own.append(row)
            continue
        if include_cross_agent and visibility in {"shared", "global", "public"}:
            shared.append(row)
    if include_cross_agent:
        limit_value = max(0, int(cross_agent_limit if cross_agent_limit is not None else len(shared)))
        return own + shared[:limit_value]
    return own


def _memory_compact_fallback(raw_content: str) -> str:
    text = re.sub(r"\s+", " ", (raw_content or "").strip())
    if len(text) <= 80:
        return text
    return text[:80].rstrip() + "..."


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except Exception:
        return default


def _safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
    except Exception:
        return default


def _memory_temperature(memory: dict[str, Any]) -> float:
    return max(0.0, _safe_float(memory.get("temperature"), 0.0))


def _memory_importance(memory: dict[str, Any]) -> int:
    return max(0, _safe_int(memory.get("importance"), 0))


def _normalize_memory_sort(sort_by: str | None, order: str | None) -> tuple[str, str]:
    field = (sort_by or "updated_at").strip().lower()
    if field not in {"updated_at", "created_at", "importance", "temperature", "last_touched_at"}:
        field = "updated_at"
    direction = (order or "desc").strip().lower()
    if direction not in {"asc", "desc"}:
        direction = "desc"
    return field, direction


def _temperature_weight_for_category(category: str | None) -> float:
    normalized = normalize_memory_category(category)
    if normalized in {"recent_pending", "deep"}:
        return 1.0
    if normalized == "core_profile":
        return 0.8
    if normalized == "ephemeral":
        return 0.45
    return 0.7


def _keyword_match_score(memory: dict[str, Any], needle: str) -> float:
    n = (needle or "").strip().lower()
    if not n:
        return 0.0
    raw = str(memory.get("raw_content") or "").lower()
    compressed = str(memory.get("compressed_content") or "").lower()
    content = str(memory.get("content") or "").lower()
    text_score = 0.0
    if n in raw:
        text_score += 1.0
    if n in compressed:
        text_score += 0.8
    if n in content:
        text_score += 0.6
    if text_score <= 0:
        return 0.0
    importance_bonus = min(5, _memory_importance(memory)) * 0.08
    temp_bonus = min(20.0, _memory_temperature(memory)) * 0.03 * _temperature_weight_for_category(memory.get("category"))
    return text_score + importance_bonus + temp_bonus


def _semantic_rank_score(memory: dict[str, Any], similarity: float) -> float:
    importance_bonus = min(5, _memory_importance(memory)) * 0.03
    temp_bonus = min(20.0, _memory_temperature(memory)) * 0.01 * _temperature_weight_for_category(memory.get("category"))
    return float(similarity) + importance_bonus + temp_bonus


def _default_companion_state() -> dict[str, Any]:
    default_agent_id = normalize_agent_id(getattr(settings, "current_agent_id", "default"))
    return {
        "id": default_agent_id,
        "agent_id": default_agent_id,
        "recent_topics": [],
        "current_mood": "",
        "open_loops": [],
        "proactive_cooldown_until": None,
        "impression": None,
        "relationship_progress": None,
        "likes_summary": None,
        "summary_updated_at": None,
        "updated_at": "",
        # consciousness snapshot
        "open_loops_summary": "",
        "open_loops_count": 0,
        "high_importance_memories": [],
        "high_importance_memory_count": 0,
        "background_activity_candidates": [],
        "presence_gap": "",
        "consciousness_updated_at": "",
    }


def _normalize_companion_state(row: dict[str, Any] | None) -> dict[str, Any]:
    state = _default_companion_state()
    if not row:
        return state
    state["id"] = str(row.get("id") or "main")
    state["agent_id"] = normalize_agent_id(row.get("agent_id"))
    for key in ("recent_topics", "open_loops"):
        value = row.get(key, [])
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except Exception:
                value = []
        if not isinstance(value, list):
            value = []
        state[key] = [str(item).strip() for item in value if str(item).strip()]
    mood = str(row.get("current_mood") or "").strip()
    state["current_mood"] = mood
    cooldown = row.get("proactive_cooldown_until")
    state["proactive_cooldown_until"] = str(cooldown).strip() if cooldown else None
    for text_field in ("impression", "relationship_progress", "likes_summary", "summary_updated_at"):
        val = row.get(text_field)
        state[text_field] = str(val).strip() if val is not None else None
    state["updated_at"] = str(row.get("updated_at") or "")
    # -- consciousness snapshot cols --
    state["open_loops_summary"] = str(row.get("open_loops_summary") or "")
    state["open_loops_count"] = int(row.get("open_loops_count") or 0)
    state["presence_gap"] = str(row.get("presence_gap") or "")
    state["consciousness_updated_at"] = str(row.get("consciousness_updated_at") or "")
    for json_field in ("high_importance_memories", "background_activity_candidates"):
        raw = row.get(json_field, "[]")
        if isinstance(raw, str):
            try:
                parsed = json.loads(raw)
            except Exception:
                parsed = []
        elif isinstance(raw, list):
            parsed = raw
        else:
            parsed = []
        state[json_field] = parsed if isinstance(parsed, list) else []
    state["high_importance_memory_count"] = int(row.get("high_importance_memory_count") or len(state["high_importance_memories"]))
    return state



def normalize_subject_type(author_type: str | None) -> str:
    value = str(author_type or "user").strip().lower()
    return value if value in {"user", "agent"} else "user"


def normalize_subject_id(author_type: str | None, author_id: str | None) -> str:
    subject_type = normalize_subject_type(author_type)
    value = str(author_id or "").strip()
    if subject_type == "agent":
        return normalize_agent_id(value)
    return value or "me"


def _current_user_subject() -> tuple[str, str]:
    return "user", "me"


def _default_diary_notebook_id(author_type: str, author_id: str) -> str:
    normalized_type = normalize_subject_type(author_type)
    normalized_id = normalize_subject_id(normalized_type, author_id)
    return f"diary_{normalized_type}_{normalized_id}_default"


def _default_diary_notebook_name(author_type: str, author_id: str) -> str:
    normalized_type = normalize_subject_type(author_type)
    normalized_id = normalize_subject_id(normalized_type, author_id)
    if normalized_type == "user":
        return "my notebook"
    return f"{normalized_id} notebook"


def _diary_notebook_is_editable(notebook: dict[str, Any] | None) -> bool:
    if not notebook:
        return False
    return normalize_subject_type(notebook.get("author_type")) == "user" and normalize_subject_id("user", notebook.get("author_id")) == "me"


def _diary_notebook_can_comment(notebook: dict[str, Any] | None) -> bool:
    if not notebook:
        return False
    return normalize_subject_type(notebook.get("author_type")) == "agent"


def _normalize_diary_notebook_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    notebook = dict(row)
    notebook["author_type"] = normalize_subject_type(row.get("author_type"))
    notebook["author_id"] = normalize_subject_id(notebook["author_type"], row.get("author_id"))
    notebook["description"] = str(row.get("description") or "")
    notebook["visibility"] = normalize_visibility(row.get("visibility") or "private")
    notebook["is_default"] = bool(row.get("is_default"))
    notebook["entry_count"] = _safe_int(row.get("entry_count"), 0)
    notebook["can_rename"] = _diary_notebook_is_editable(notebook)
    notebook["can_create_entry"] = _diary_notebook_is_editable(notebook)
    notebook["can_edit_entries"] = _diary_notebook_is_editable(notebook)
    notebook["can_delete_entries"] = _diary_notebook_is_editable(notebook)
    notebook["can_comment_entries"] = _diary_notebook_can_comment(notebook)
    return notebook


def _normalize_diary_comment_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    author_type = normalize_subject_type(row.get("author_type"))
    author_id = normalize_subject_id(author_type, row.get("author_id"))
    return {
        "id": str(row.get("id") or ""),
        "entry_id": str(row.get("entry_id") or ""),
        "author_type": author_type,
        "author_id": author_id,
        "author_name": ("\u6211" if author_type == "user" and author_id == "me" else author_id),
        "content": str(row.get("content") or "").strip(),
        "created_at": str(row.get("created_at") or ""),
    }


def _normalize_diary_annotation_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    author_type = normalize_subject_type(row.get("author_type"))
    author_id = normalize_subject_id(author_type, row.get("author_id"))
    start_offset = max(0, _safe_int(row.get("start_offset"), 0))
    end_offset = max(start_offset, _safe_int(row.get("end_offset"), start_offset))
    return {
        "id": str(row.get("id") or ""),
        "entry_id": str(row.get("entry_id") or ""),
        "author_type": author_type,
        "author_id": author_id,
        "author_name": ("\u6211" if author_type == "user" and author_id == "me" else author_id),
        "kind": str(row.get("kind") or "underline"),
        "start_offset": start_offset,
        "end_offset": end_offset,
        "text": str(row.get("text") or ""),
        "note": str(row.get("note") or ""),
        "created_at": str(row.get("created_at") or ""),
    }


def _normalize_diary_entry_row(
    row: dict[str, Any] | None,
    *,
    notebook: dict[str, Any] | None = None,
    comments: list[dict[str, Any]] | None = None,
    annotations: list[dict[str, Any]] | None = None,
) -> dict[str, Any] | None:
    if not row:
        return None
    entry = dict(row)
    entry["title"] = str(row.get("title") or "").strip()
    entry["content"] = str(row.get("content") or "")
    entry["tags"] = str(row.get("tags") or "")
    entry["comments"] = comments or []
    entry["annotations"] = annotations or []
    entry["comment_count"] = len(entry["comments"])
    entry["annotation_count"] = len(entry["annotations"])
    if notebook:
        entry["notebook"] = notebook
        entry["can_edit"] = bool(notebook.get("can_edit_entries"))
        entry["can_delete"] = bool(notebook.get("can_delete_entries"))
        entry["can_comment"] = bool(notebook.get("can_comment_entries"))
    else:
        entry["can_edit"] = False
        entry["can_delete"] = False
        entry["can_comment"] = False
    return entry


def _normalize_moment_actor(row: Any) -> dict[str, Any]:
    if isinstance(row, str):
        try:
            row = json.loads(row)
        except Exception:
            row = {}
    if not isinstance(row, dict):
        row = {}
    actor_type = normalize_subject_type(row.get("author_type"))
    actor_id = normalize_subject_id(actor_type, row.get("author_id"))
    return {
        "author_type": actor_type,
        "author_id": actor_id,
        "author_name": str(row.get("author_name") or "").strip(),
    }


def _normalize_moment_comments(value: Any) -> list[dict[str, Any]]:
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except Exception:
            value = []
    if not isinstance(value, list):
        return []
    comments: list[dict[str, Any]] = []
    for item in value:
        if not isinstance(item, dict):
            continue
        actor = _normalize_moment_actor(item)
        comments.append(
            {
                "id": str(item.get("id") or _new_id()),
                "author_type": actor["author_type"],
                "author_id": actor["author_id"],
                "author_name": actor["author_name"],
                "text": str(item.get("text") or "").strip(),
                "created_at": str(item.get("created_at") or ""),
            }
        )
    return comments


def _normalize_moment_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    normalized = dict(row)
    normalized["author_type"] = normalize_subject_type(row.get("author_type"))
    normalized["author_id"] = normalize_subject_id(normalized["author_type"], row.get("author_id"))
    normalized["visibility"] = normalize_visibility(row.get("visibility") or "public")
    likes = row.get("likes_json") if "likes_json" in row else row.get("likes")
    comments = row.get("comments_json") if "comments_json" in row else row.get("comments")
    if isinstance(likes, str):
        try:
            likes = json.loads(likes)
        except Exception:
            likes = []
    if not isinstance(likes, list):
        likes = []
    normalized["likes"] = [_normalize_moment_actor(item) for item in likes]
    normalized["comments"] = _normalize_moment_comments(comments)
    normalized.pop("likes_json", None)
    normalized.pop("comments_json", None)
    return normalized


def _use_supabase_memory() -> bool:
    return getattr(settings, "memory_backend", "sqlite").lower() == "supabase"


def _use_supabase_data() -> bool:
    return bool(
        getattr(settings, "database_backend", getattr(settings, "memory_backend", "sqlite")).lower() == "supabase"
        and settings.supabase_url
        and settings.supabase_key
    )


def _can_use_embeddings() -> bool:
    return bool(
        getattr(settings, "memory_vector_enabled", True)
        and settings.embedding_base_url
        and settings.embedding_api_key
        and settings.embedding_model
    )


def _embedding_endpoint() -> str:
    base_url = settings.embedding_base_url.rstrip("/")
    if base_url.endswith("/embeddings"):
        return base_url
    return f"{base_url}/embeddings"


def _embedding_headers() -> dict[str, str]:
    return {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {settings.embedding_api_key}",
    }


def _hash_text(text: str) -> str:
    return hashlib.sha256((text or "").encode("utf-8")).hexdigest()


def _vector_literal(values: list[float]) -> str:
    return "[" + ",".join(f"{float(v):.10f}".rstrip("0").rstrip(".") for v in values) + "]"


def _cosine_similarity(left: list[float], right: list[float]) -> float:
    if not left or not right or len(left) != len(right):
        return 0.0
    dot = sum(a * b for a, b in zip(left, right))
    left_norm = math.sqrt(sum(a * a for a in left))
    right_norm = math.sqrt(sum(b * b for b in right))
    if left_norm == 0.0 or right_norm == 0.0:
        return 0.0
    return dot / (left_norm * right_norm)


def _supabase_headers(prefer_representation: bool = False) -> dict[str, str]:
    key = settings.supabase_key.strip()
    if not settings.supabase_url or not key:
        raise RuntimeError("Supabase memories backend is enabled but SUPABASE_URL/SUPABASE_KEY is missing")
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }
    if prefer_representation:
        headers["Prefer"] = "return=representation"
    return headers


def _supabase_memories_endpoint() -> str:
    return f"{settings.supabase_url}/rest/v1/{settings.supabase_memories_table}"


def _supabase_settings_endpoint() -> str:
    return f"{settings.supabase_url}/rest/v1/{settings.supabase_settings_table}"


def _supabase_endpoint(table: str) -> str:
    return f"{settings.supabase_url}/rest/v1/{table}"


def _supabase_rpc_endpoint(name: str) -> str:
    return f"{settings.supabase_url}/rest/v1/rpc/{name}"


_SUPABASE_COLUMN_CACHE: dict[tuple[str, str], bool] = {}


def _use_supabase_settings() -> bool:
    return bool(settings.supabase_url and settings.supabase_key)


def _is_supabase_missing_table_error(exc: Exception, table_name: str) -> bool:
    text = str(exc or "")
    return "PGRST205" in text and table_name in text


async def _supabase_get_setting_from_table(key: str) -> dict[str, Any] | None:
    params = {"select": "key,value,updated_at", "key": f"eq.{key}", "limit": "1"}
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.get(_supabase_settings_endpoint(), headers=_supabase_headers(), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase get_setting(table) failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
        return rows[0] if rows else None


async def _supabase_set_setting_to_table(key: str, value: str) -> dict[str, Any]:
    now = _now()
    payload = {"key": key, "value": value, "updated_at": now}
    headers = _supabase_headers(True)
    headers["Prefer"] = "resolution=merge-duplicates,return=representation"
    params = {"on_conflict": "key"}
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.post(_supabase_settings_endpoint(), headers=headers, params=params, json=payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase set_setting(table) failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
    if rows:
        return rows[0]
    verified_rows = await _supabase_select(settings.supabase_settings_table, filters={"key": f"eq.{key}"}, limit=1)
    if verified_rows:
        return verified_rows[0]
    raise RuntimeError(f"Supabase set_setting(table) failed: key {key} could not be verified")


async def _supabase_get_setting_from_memory(key: str) -> dict[str, Any] | None:
    memory_id = f"cfg_{key}"
    params = {"select": "id,content,updated_at", "id": f"eq.{memory_id}", "limit": "1"}
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.get(_supabase_memories_endpoint(), headers=_supabase_headers(), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase get_setting(memory) failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
        if not rows:
            return None
        row = rows[0]
        return {"key": key, "value": row.get("content", ""), "updated_at": row.get("updated_at", "")}


async def _supabase_set_setting_to_memory(key: str, value: str) -> dict[str, Any]:
    memory_id = f"cfg_{key}"
    now = _now()
    payload = {
        "id": memory_id,
        "content": value,
        "category": "system_config",
        "tags": f"settings,{key}",
        "source": "app_settings",
        "created_at": now,
        "updated_at": now,
    }
    headers = _supabase_headers(True)
    headers["Prefer"] = "resolution=merge-duplicates,return=representation"
    params = {"on_conflict": "id"}
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.post(_supabase_memories_endpoint(), headers=headers, params=params, json=payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase set_setting(memory) failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
    if rows:
        row = rows[0]
    else:
        verified_rows = await _supabase_select(settings.supabase_memories_table, filters={"id": f"eq.{memory_id}"}, limit=1)
        if not verified_rows:
            raise RuntimeError(f"Supabase set_setting(memory) failed: key {key} could not be verified")
        row = verified_rows[0]
    return {"key": key, "value": row.get("content", value), "updated_at": row.get("updated_at", now)}


async def _supabase_get_setting(key: str) -> dict[str, Any] | None:
    global _supabase_settings_table_missing
    if _supabase_settings_table_missing:
        return await _supabase_get_setting_from_memory(key)
    try:
        return await _supabase_get_setting_from_table(key)
    except Exception as exc:
        if _is_supabase_missing_table_error(exc, settings.supabase_settings_table):
            _supabase_settings_table_missing = True
            logger.info("Supabase settings table missing, fallback to memories store")
        else:
            logger.warning("Supabase settings table unavailable, fallback to memories: %s", exc)
        return await _supabase_get_setting_from_memory(key)


async def _supabase_set_setting(key: str, value: str) -> dict[str, Any]:
    global _supabase_settings_table_missing
    if _supabase_settings_table_missing:
        return await _supabase_set_setting_to_memory(key, value)
    try:
        return await _supabase_set_setting_to_table(key, value)
    except Exception as exc:
        if _is_supabase_missing_table_error(exc, settings.supabase_settings_table):
            _supabase_settings_table_missing = True
            logger.info("Supabase settings table missing, fallback to memories store")
        else:
            logger.warning("Supabase settings table unavailable, fallback to memories: %s", exc)
        return await _supabase_set_setting_to_memory(key, value)


async def _supabase_add_memory(
    *,
    agent_id: str,
    visibility: str,
    source_agent_id: str,
    content: str,
    raw_content: str,
    compressed_content: str,
    category: str,
    tags: str = "",
    source: str = "",
    importance: int = 3,
    expires_at: str | None = None,
) -> dict[str, Any]:
    mid = _new_id()
    now = _now()
    payload = {
        "id": mid,
        "content": content,
        "category": category,
        "tags": tags,
        "source": source,
        "created_at": now,
        "updated_at": now,
    }
    optional_payload = {
        "agent_id": normalize_agent_id(agent_id),
        "visibility": normalize_visibility(visibility),
        "source_agent_id": resolve_source_agent_id(agent_id, source_agent_id),
        "raw_content": raw_content,
        "compressed_content": compressed_content,
        "importance": importance,
        "temperature": 0,
        "last_touched_at": None,
        "touch_count": 0,
        "expires_at": expires_at,
    }
    for column, value in optional_payload.items():
        if await _supabase_table_has_column(settings.supabase_memories_table, column):
            payload[column] = value
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.post(_supabase_memories_endpoint(), headers=_supabase_headers(True), json=payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase add_memory failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
    if rows and str(rows[0].get("id") or "") == mid:
        return rows[0]
    verified_rows = await _supabase_select(
        settings.supabase_memories_table,
        filters={"id": f"eq.{mid}"},
        limit=1,
    )
    if verified_rows:
        return verified_rows[0]
    raise RuntimeError(f"Supabase add_memory failed: inserted memory {mid} could not be verified")


async def _supabase_list_memories(
    category: str = None,
    limit: int = 50,
    *,
    agent_id: str | None = None,
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    all_agents: bool = False,
    sort_by: str = "updated_at",
    order: str = "desc",
) -> list[dict[str, Any]]:
    field, direction = _normalize_memory_sort(sort_by, order)
    order_value = (
        "temperature.desc.nullslast,last_touched_at.desc.nullslast,importance.desc,updated_at.desc"
        if field == "temperature" and direction == "desc"
        else f"{field}.{direction}"
    )
    params = {"select": "*", "order": order_value, "limit": str(limit)}
    params.update(_active_memory_filters())
    normalized_agent = normalize_agent_id(agent_id)
    if not all_agents:
        if include_cross_agent:
            active_or = params["or"]
            params["or"] = (
                f"and({active_or},agent_id.eq.{normalized_agent}),"
                f"and({active_or},agent_id.neq.{normalized_agent},visibility.in.(shared,global,public))"
            )
        else:
            params["agent_id"] = f"eq.{normalized_agent}"
    if category:
        params["category"] = f"eq.{normalize_memory_category(category)}"
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.get(_supabase_memories_endpoint(), headers=_supabase_headers(), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase list_memories failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
        if all_agents:
            return rows if isinstance(rows, list) else []
        return _memory_scope_post_filter(
            rows if isinstance(rows, list) else [],
            agent_id=normalized_agent,
            include_cross_agent=include_cross_agent,
            cross_agent_limit=cross_agent_limit,
        )


async def _supabase_update_memory(memory_id: str, **kwargs) -> bool:
    if not kwargs:
        return False
    payload = dict(kwargs)
    payload["updated_at"] = _now()
    params = {"id": f"eq.{memory_id}"}
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.patch(
            _supabase_memories_endpoint(),
            headers=_supabase_headers(True),
            params=params,
            json=payload,
        )
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase update_memory failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
        return len(rows) > 0


async def _supabase_delete_memory(memory_id: str) -> bool:
    params = {"id": f"eq.{memory_id}"}
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.delete(_supabase_memories_endpoint(), headers=_supabase_headers(True), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase delete_memory failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
        return len(rows) > 0


async def _supabase_search_memories(
    keyword: str,
    category: str = None,
    limit: int = 10,
    *,
    agent_id: str | None = None,
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    all_agents: bool = False,
) -> list[dict[str, Any]]:
    rows = await _supabase_list_memories(
        category=category,
        limit=max(limit * 20, 200),
        agent_id=agent_id,
        include_cross_agent=include_cross_agent,
        cross_agent_limit=cross_agent_limit,
        all_agents=all_agents,
    )
    needle = (keyword or "").strip().lower()
    if not needle:
        return rows[:limit]
    scored: list[tuple[float, dict[str, Any]]] = []
    for row in rows:
        score = _keyword_match_score(row, needle)
        if score <= 0:
            continue
        scored.append((score, row))
    scored.sort(
        key=lambda item: (
            item[0],
            _memory_importance(item[1]),
            _memory_temperature(item[1]),
            str(item[1].get("last_touched_at") or ""),
            str(item[1].get("updated_at") or ""),
        ),
        reverse=True,
    )
    return [item[1] for item in scored[:limit]]


async def _supabase_get_memory_stats(
    *,
    agent_id: str | None = None,
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    all_agents: bool = False,
) -> dict[str, int]:
    params = {"select": "category", "limit": "5000"}
    params.update(_active_memory_filters())
    normalized_agent = normalize_agent_id(agent_id)
    if not all_agents:
        if include_cross_agent:
            active_or = params["or"]
            params["or"] = (
                f"and({active_or},agent_id.eq.{normalized_agent}),"
                f"and({active_or},agent_id.neq.{normalized_agent},visibility.in.(shared,global,public))"
            )
        else:
            params["agent_id"] = f"eq.{normalized_agent}"
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.get(_supabase_memories_endpoint(), headers=_supabase_headers(), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase get_memory_stats failed: {resp.status_code} {resp.text[:200]}")
        rows = resp.json()
    if not all_agents:
        rows = _memory_scope_post_filter(
            rows if isinstance(rows, list) else [],
            agent_id=normalized_agent,
            include_cross_agent=include_cross_agent,
            cross_agent_limit=cross_agent_limit,
        )
    stats: dict[str, int] = {}
    for row in rows:
        cat = row.get("category", "unknown")
        stats[cat] = stats.get(cat, 0) + 1
    return stats


async def _supabase_select(
    table: str,
    *,
    filters: dict[str, str] | None = None,
    select: str = "*",
    order: str | None = None,
    limit: int | None = None,
) -> list[dict[str, Any]]:
    params: dict[str, str] = {"select": select}
    if filters:
        params.update(filters)
    if order:
        params["order"] = order
    if limit is not None:
        params["limit"] = str(limit)
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.get(_supabase_endpoint(table), headers=_supabase_headers(), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase select({table}) failed: {resp.status_code} {resp.text[:200]}")
        return resp.json()


async def _supabase_table_has_column(table: str, column: str) -> bool:
    cache_key = (table, column)
    if cache_key in _SUPABASE_COLUMN_CACHE:
        return _SUPABASE_COLUMN_CACHE[cache_key]
    try:
        await _supabase_select(table, select=column, limit=0)
    except RuntimeError as exc:
        message = str(exc)
        if column in message and ("PGRST" in message or "column" in message.lower()):
            _SUPABASE_COLUMN_CACHE[cache_key] = False
            return False
        raise
    _SUPABASE_COLUMN_CACHE[cache_key] = True
    return True


async def _supabase_insert(
    table: str,
    payload: dict[str, Any],
    *,
    on_conflict: str | None = None,
) -> list[dict[str, Any]]:
    headers = _supabase_headers(True)
    params: dict[str, str] = {}
    if on_conflict:
        headers["Prefer"] = "resolution=merge-duplicates,return=representation"
        params["on_conflict"] = on_conflict
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.post(_supabase_endpoint(table), headers=headers, params=params, json=payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase insert({table}) failed: {resp.status_code} {resp.text[:200]}")
        return resp.json()


async def _supabase_update(
    table: str,
    filters: dict[str, str],
    payload: dict[str, Any],
) -> list[dict[str, Any]]:
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.patch(
            _supabase_endpoint(table),
            headers=_supabase_headers(True),
            params=filters,
            json=payload,
        )
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase update({table}) failed: {resp.status_code} {resp.text[:200]}")
        return resp.json()


async def _supabase_delete(table: str, filters: dict[str, str]) -> list[dict[str, Any]]:
    async with httpx.AsyncClient(timeout=20.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.delete(_supabase_endpoint(table), headers=_supabase_headers(True), params=filters)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase delete({table}) failed: {resp.status_code} {resp.text[:200]}")
        return resp.json()


async def _supabase_insert_verified(
    table: str,
    payload: dict[str, Any],
    *,
    on_conflict: str | None = None,
    id_column: str = "id",
    verify_filters: dict[str, str] | None = None,
) -> dict[str, Any]:
    rows = await _supabase_insert(table, payload, on_conflict=on_conflict)
    if rows:
        return rows[0]
    filters = verify_filters
    if filters is None and id_column in payload:
        filters = {id_column: f"eq.{payload[id_column]}"}
    if filters:
        verified_rows = await _supabase_select(table, filters=filters, limit=1)
        if verified_rows:
            return verified_rows[0]
    raise RuntimeError(f"Supabase insert({table}) did not return or verify a row")


async def _supabase_update_verified(
    table: str,
    filters: dict[str, str],
    payload: dict[str, Any],
) -> dict[str, Any] | None:
    rows = await _supabase_update(table, filters, payload)
    return rows[0] if rows else None


async def _supabase_delete_verified(table: str, filters: dict[str, str]) -> bool:
    rows = await _supabase_delete(table, filters)
    return len(rows) > 0


async def _supabase_upload_storage(bucket: str, file_path: str, file_bytes: bytes, content_type: str) -> str:
    url = f"{settings.supabase_url}/storage/v1/object/{bucket}/{file_path}"
    headers = {
        "Authorization": f"Bearer {settings.supabase_key}",
        "Content-Type": content_type,
    }
    async with httpx.AsyncClient(timeout=60.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.post(url, headers=headers, content=file_bytes)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase storage upload failed: {resp.status_code} {resp.text[:200]}")
    return f"{settings.supabase_url}/storage/v1/object/public/{bucket}/{file_path}"


async def _supabase_rpc(function_name: str, payload: dict[str, Any]) -> Any:
    async with httpx.AsyncClient(timeout=30.0, trust_env=settings.supabase_httpx_trust_env) as client:
        resp = await client.post(
            _supabase_rpc_endpoint(function_name),
            headers=_supabase_headers(),
            json=payload,
        )
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase rpc({function_name}) failed: {resp.status_code} {resp.text[:200]}")
        return resp.json()


async def _fetch_embedding(text: str) -> list[float]:
    if not _can_use_embeddings():
        raise RuntimeError("Embedding model is not configured")

    payload = {
        "model": settings.embedding_model,
        "input": text,
    }
    async with httpx.AsyncClient(timeout=45.0) as client:
        resp = await client.post(_embedding_endpoint(), headers=_embedding_headers(), json=payload)
        if resp.status_code >= 300:
            raise RuntimeError(f"Embedding request failed: {resp.status_code} {resp.text[:200]}")
        data = resp.json()

    items = data.get("data") if isinstance(data, dict) else None
    if not isinstance(items, list) or not items:
        raise RuntimeError("Embedding response does not contain data")

    embedding = items[0].get("embedding")
    if not isinstance(embedding, list) or not embedding:
        raise RuntimeError("Embedding response does not contain a valid vector")

    return [float(x) for x in embedding]


async def _supabase_memory_embedding_is_fresh(memory_id: str, content: str) -> bool:
    rows = await _supabase_select(
        settings.supabase_memories_table,
        filters={"id": f"eq.{memory_id}"},
        select="id,embedding_content_hash",
        limit=1,
    )
    if not rows:
        return False
    return rows[0].get("embedding_content_hash") == _hash_text(content)


async def _supabase_store_memory_embedding(memory_id: str, content: str, embedding: list[float]) -> None:
    await _supabase_update(
        settings.supabase_memories_table,
        {"id": f"eq.{memory_id}"},
        {
            "embedding": _vector_literal(embedding),
            "embedding_content_hash": _hash_text(content),
        },
    )


async def _supabase_match_memories(
    query_embedding: list[float],
    category: str = None,
    limit: int = 10,
    *,
    agent_id: str | None = None,
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    all_agents: bool = False,
) -> list[dict[str, Any]]:
    payload: dict[str, Any] = {
        "query_embedding": _vector_literal(query_embedding),
        "match_count": limit,
        "filter_category": normalize_memory_category(category) if category else None,
    }
    rows = await _supabase_rpc(settings.supabase_memory_match_rpc, payload)
    data = rows if isinstance(rows, list) else []
    if all_agents:
        return data
    return _memory_scope_post_filter(
        data,
        agent_id=normalize_agent_id(agent_id),
        include_cross_agent=include_cross_agent,
        cross_agent_limit=cross_agent_limit,
    )


async def _get_cached_embedding(memory_id: str, content: str) -> list[float] | None:
    db = await get_db()
    content_hash = _hash_text(content)
    cursor = await db.execute(
        "SELECT embedding_json FROM memory_embeddings WHERE memory_id = ? AND content_hash = ?",
        (memory_id, content_hash),
    )
    row = await cursor.fetchone()
    if not row:
        return None
    try:
        data = json.loads(row["embedding_json"])
    except Exception:
        return None
    if not isinstance(data, list):
        return None
    return [float(x) for x in data]


async def _store_embedding(memory_id: str, content: str, embedding: list[float]) -> None:
    db = await get_db()
    now = _now()
    await db.execute(
        """
        INSERT INTO memory_embeddings (memory_id, content_hash, embedding_json, dimensions, updated_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(memory_id) DO UPDATE SET
            content_hash = excluded.content_hash,
            embedding_json = excluded.embedding_json,
            dimensions = excluded.dimensions,
            updated_at = excluded.updated_at
        """,
        (
            memory_id,
            _hash_text(content),
            json.dumps(embedding),
            len(embedding),
            now,
        ),
    )
    await db.commit()


async def _delete_embedding(memory_id: str) -> None:
    db = await get_db()
    await db.execute("DELETE FROM memory_embeddings WHERE memory_id = ?", (memory_id,))
    await db.commit()


async def _ensure_memory_embedding(memory_id: str, content: str) -> list[float] | None:
    if _use_supabase_memory():
        if await _supabase_memory_embedding_is_fresh(memory_id, content):
            return []
        if not _can_use_embeddings():
            return None
        embedding = await _fetch_embedding(content)
        await _supabase_store_memory_embedding(memory_id, content, embedding)
        return embedding
    cached = await _get_cached_embedding(memory_id, content)
    if cached is not None:
        return cached
    if not _can_use_embeddings():
        return None
    embedding = await _fetch_embedding(content)
    await _store_embedding(memory_id, content, embedding)
    return embedding


async def _generate_memory_compressed_content(raw_content: str) -> str | None:
    text = (raw_content or "").strip()
    if not text:
        return None
    try:
        from models import router as model_router
        from models import EchoAdapter

        adapter = model_router.get("summary")
        if isinstance(adapter, EchoAdapter):
            return None
        if not getattr(adapter.config, "base_url", "") or not getattr(adapter.config, "api_key", ""):
            return None
        chunks: list[str] = []
        messages = [
            {
                "role": "system",
                "content": (
                    "Compress the user memory into one short line. "
                    "Keep concrete facts, remove filler, no markdown, no prefixes, no explanation."
                ),
            },
            {"role": "user", "content": text},
        ]
        async for chunk in adapter.chat_stream(messages=messages, temperature=0.2):
            if isinstance(chunk, str):
                chunks.append(chunk)
        compressed = re.sub(r"\s+", " ", "".join(chunks)).strip()
        if not compressed:
            return None
        if len(compressed) > 240:
            compressed = compressed[:240].rstrip()
        return compressed
    except Exception as exc:
        logger.warning("Async memory compression generation failed: %s", exc)
        return None


async def ensure_memory_compression(memory_id: str, raw_content: str) -> str | None:
    compressed = await _generate_memory_compressed_content(raw_content)
    if not compressed:
        return None
    await update_memory(
        memory_id,
        compressed_content=compressed,
        content=compressed,
    )
    return compressed


async def _schedule_memory_processing(memory_id: str, raw_content: str) -> None:
    if not (settings.memory_async_enabled or _can_use_embeddings()):
        return
    raw_text = (raw_content or "").strip()
    if not raw_text:
        return
    try:
        from memory_async import enqueue_memory_processing

        queued = await enqueue_memory_processing(memory_id, raw_text)
        if not queued:
            if _can_use_embeddings():
                await _ensure_memory_embedding(memory_id, raw_text)
    except Exception as exc:
        logger.warning("Failed to schedule async memory processing %s: %s", memory_id, exc)


async def _schedule_memory_embedding(memory_id: str, content: str) -> None:
    await _schedule_memory_processing(memory_id, content)


async def _sqlite_column_exists(db: aiosqlite.Connection, table: str, column: str) -> bool:
    cursor = await db.execute(f"PRAGMA table_info({table})")
    rows = await cursor.fetchall()
    names = {str(row["name"]) for row in rows}
    return column in names


async def _ensure_sqlite_memory_schema(db: aiosqlite.Connection) -> None:
    now = _now()
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS agents (
            agent_id     TEXT PRIMARY KEY,
            display_name TEXT NOT NULL,
            avatar       TEXT DEFAULT '',
            description  TEXT DEFAULT '',
            persona      TEXT DEFAULT '',
            source       TEXT DEFAULT 'native',
            metadata     TEXT DEFAULT '{}',
            is_active    INTEGER NOT NULL DEFAULT 1,
            created_at   TEXT NOT NULL,
            updated_at   TEXT NOT NULL
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_agents_active ON agents(is_active, updated_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_agents_source ON agents(source, updated_at DESC)")
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS agent_external_links (
            id            TEXT PRIMARY KEY,
            source        TEXT NOT NULL,
            external_id   TEXT NOT NULL,
            external_name TEXT DEFAULT '',
            agent_id      TEXT NOT NULL REFERENCES agents(agent_id),
            metadata      TEXT DEFAULT '{}',
            created_at    TEXT NOT NULL,
            updated_at    TEXT NOT NULL,
            UNIQUE(source, external_id)
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_agent_external_links_agent ON agent_external_links(agent_id)")
    await db.execute(
        """
        INSERT INTO agents (agent_id, display_name, avatar, description, persona, source, metadata, is_active, created_at, updated_at)
        VALUES ('azheng', '阿筝', '', '', '', 'native', '{}', 1, ?, ?)
        ON CONFLICT(agent_id) DO UPDATE SET
            display_name = CASE WHEN COALESCE(display_name, '') = '' THEN excluded.display_name ELSE display_name END,
            source = CASE WHEN COALESCE(source, '') = '' THEN excluded.source ELSE source END,
            is_active = 1,
            updated_at = excluded.updated_at
        """,
        (now, now),
    )
    alter_statements: list[str] = []
    if not await _sqlite_column_exists(db, "sessions", "source_app"):
        await db.execute("ALTER TABLE sessions ADD COLUMN source_app TEXT NOT NULL DEFAULT 'yui_nook'")
    if not await _sqlite_column_exists(db, "sessions", "agent_id"):
        await db.execute("ALTER TABLE sessions ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    if not await _sqlite_column_exists(db, "sessions", "last_summarized_message_id"):
        await db.execute("ALTER TABLE sessions ADD COLUMN last_summarized_message_id TEXT DEFAULT ''")
    await db.execute("UPDATE sessions SET source_app = 'yui_nook' WHERE COALESCE(source_app, '') = ''")
    await db.execute("UPDATE sessions SET agent_id = 'default' WHERE COALESCE(agent_id, '') = ''")
    if not await _sqlite_column_exists(db, "memories", "agent_id"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    if not await _sqlite_column_exists(db, "memories", "visibility"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN visibility TEXT NOT NULL DEFAULT 'private'")
    if not await _sqlite_column_exists(db, "memories", "source_agent_id"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN source_agent_id TEXT NOT NULL DEFAULT 'default'")
    if not await _sqlite_column_exists(db, "memories", "temperature"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN temperature REAL NOT NULL DEFAULT 0")
    if not await _sqlite_column_exists(db, "memories", "last_touched_at"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN last_touched_at TEXT DEFAULT ''")
    if not await _sqlite_column_exists(db, "memories", "touch_count"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN touch_count INTEGER NOT NULL DEFAULT 0")
    for stmt in alter_statements:
        await db.execute(stmt)
    if not await _sqlite_column_exists(db, "companion_state", "agent_id"):
        await db.execute("ALTER TABLE companion_state ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    await db.execute("UPDATE companion_state SET agent_id = 'default' WHERE COALESCE(agent_id, '') = ''")
    for _col, _ddl in [
        ("impression",            "ALTER TABLE companion_state ADD COLUMN impression TEXT"),
        ("relationship_progress", "ALTER TABLE companion_state ADD COLUMN relationship_progress TEXT"),
        ("likes_summary",         "ALTER TABLE companion_state ADD COLUMN likes_summary TEXT"),
        ("summary_updated_at",    "ALTER TABLE companion_state ADD COLUMN summary_updated_at TEXT"),
    ]:
        if not await _sqlite_column_exists(db, "companion_state", _col):
            await db.execute(_ddl)
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS diary (
            id              TEXT PRIMARY KEY,
            agent_id        TEXT NOT NULL DEFAULT 'default',
            visibility      TEXT NOT NULL DEFAULT 'private',
            source_agent_id TEXT NOT NULL DEFAULT 'default',
            title           TEXT NOT NULL DEFAULT '',
            content         TEXT NOT NULL,
            tags            TEXT DEFAULT '',
            created_at      TEXT NOT NULL,
            updated_at      TEXT NOT NULL
        )
        """
    )
    await db.execute("UPDATE memories SET agent_id = 'default' WHERE COALESCE(agent_id, '') = ''")
    await db.execute("UPDATE memories SET visibility = 'private' WHERE COALESCE(visibility, '') = ''")
    await db.execute("UPDATE memories SET visibility = 'shared' WHERE visibility = 'restricted'")
    await db.execute("UPDATE memories SET source_agent_id = agent_id WHERE COALESCE(source_agent_id, '') = ''")
    await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_memories_temperature ON memories(temperature DESC, last_touched_at DESC)"
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memories_agent_category ON memories(agent_id, category)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memories_agent_visibility ON memories(agent_id, visibility)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memories_agent_created_at ON memories(agent_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memories_agent_updated_at ON memories(agent_id, updated_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memories_visibility_updated ON memories(visibility, updated_at DESC)")
    await db.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_companion_state_agent_id ON companion_state(agent_id)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_created_at ON diary(agent_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_updated_at ON diary(agent_id, updated_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_visibility ON diary(agent_id, visibility)")
    if not await _sqlite_column_exists(db, "diary_notebooks", "description"):
        await db.execute("ALTER TABLE diary_notebooks ADD COLUMN description TEXT DEFAULT ''")
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS diary_annotations (
            id          TEXT PRIMARY KEY,
            entry_id    TEXT NOT NULL REFERENCES diary_entries(id) ON DELETE CASCADE,
            author_type TEXT NOT NULL,
            author_id   TEXT NOT NULL,
            kind        TEXT NOT NULL DEFAULT 'underline',
            start_offset INTEGER NOT NULL DEFAULT 0,
            end_offset   INTEGER NOT NULL DEFAULT 0,
            text        TEXT NOT NULL DEFAULT '',
            note        TEXT DEFAULT '',
            created_at  TEXT NOT NULL
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_annotations_entry ON diary_annotations(entry_id, start_offset ASC, created_at ASC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_annotations_author ON diary_annotations(author_type, author_id)")
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS rp_rooms (
            room_id        TEXT PRIMARY KEY,
            name           TEXT NOT NULL,
            world_setting  TEXT NOT NULL DEFAULT '',
            user_role      TEXT NOT NULL DEFAULT '',
            ai_role        TEXT NOT NULL DEFAULT '',
            agent_id       TEXT NOT NULL DEFAULT 'default',
            created_at     TEXT NOT NULL,
            last_active_at TEXT NOT NULL
        )
        """
    )
    await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_rp_rooms_agent_last_active ON rp_rooms(agent_id, last_active_at DESC)"
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS rp_messages (
            id         TEXT PRIMARY KEY,
            room_id    TEXT NOT NULL REFERENCES rp_rooms(room_id) ON DELETE CASCADE,
            role       TEXT NOT NULL,
            content    TEXT NOT NULL,
            model      TEXT DEFAULT '',
            timestamp  TEXT NOT NULL
        )
        """
    )
    await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_rp_messages_room_time ON rp_messages(room_id, timestamp)"
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS moments (
            id          TEXT PRIMARY KEY,
            author_type TEXT NOT NULL,
            author_id   TEXT NOT NULL,
            visibility  TEXT NOT NULL DEFAULT 'public',
            content     TEXT NOT NULL,
            image       TEXT DEFAULT '',
            mood        TEXT DEFAULT '',
            likes_json  TEXT NOT NULL DEFAULT '[]',
            comments_json TEXT NOT NULL DEFAULT '[]',
            created_at  TEXT NOT NULL,
            updated_at  TEXT NOT NULL
        )
        """
    )
    if not await _sqlite_column_exists(db, "moments", "visibility"):
        await db.execute("ALTER TABLE moments ADD COLUMN visibility TEXT NOT NULL DEFAULT 'public'")
    await db.execute("UPDATE moments SET visibility = 'public' WHERE COALESCE(visibility, '') = ''")
    await db.execute("UPDATE moments SET visibility = 'public' WHERE visibility = 'global'")
    await db.execute("UPDATE moments SET visibility = 'shared' WHERE visibility = 'restricted'")
    await db.execute("UPDATE diary SET visibility = 'private' WHERE COALESCE(visibility, '') = ''")
    await db.execute("UPDATE diary SET visibility = 'shared' WHERE visibility = 'restricted'")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_moments_author ON moments(author_type, author_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_moments_created_at ON moments(created_at DESC)")
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS rp_rooms (
            room_id        TEXT PRIMARY KEY,
            name           TEXT NOT NULL,
            world_setting  TEXT NOT NULL DEFAULT '',
            user_role      TEXT NOT NULL DEFAULT '',
            ai_role        TEXT NOT NULL DEFAULT '',
            agent_id       TEXT NOT NULL DEFAULT 'default',
            created_at     TEXT NOT NULL,
            last_active_at TEXT NOT NULL
        )
        """
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS rp_messages (
            id         TEXT PRIMARY KEY,
            room_id    TEXT NOT NULL REFERENCES rp_rooms(room_id) ON DELETE CASCADE,
            role       TEXT NOT NULL,
            content    TEXT NOT NULL,
            model      TEXT DEFAULT '',
            timestamp  TEXT NOT NULL
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_rp_rooms_agent_last_active ON rp_rooms(agent_id, last_active_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_rp_messages_room_time ON rp_messages(room_id, timestamp)")
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS cot_logs (
            id          TEXT PRIMARY KEY,
            session_id  TEXT NOT NULL,
            agent_id    TEXT NOT NULL DEFAULT 'default',
            source      TEXT NOT NULL DEFAULT 'chat',
            log_type    TEXT NOT NULL,
            title       TEXT NOT NULL DEFAULT '',
            summary     TEXT NOT NULL DEFAULT '',
            content     TEXT NOT NULL DEFAULT '',
            tool_name   TEXT NOT NULL DEFAULT '',
            status      TEXT NOT NULL DEFAULT '',
            token_count INTEGER NOT NULL DEFAULT 0,
            pinned      INTEGER NOT NULL DEFAULT 0,
            expires_at  TEXT NOT NULL DEFAULT '',
            created_at  TEXT NOT NULL
        )
        """
    )
    if not await _sqlite_column_exists(db, "cot_logs", "source"):
        await db.execute("ALTER TABLE cot_logs ADD COLUMN source TEXT NOT NULL DEFAULT 'chat'")
    if not await _sqlite_column_exists(db, "cot_logs", "content"):
        await db.execute("ALTER TABLE cot_logs ADD COLUMN content TEXT NOT NULL DEFAULT ''")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_cot_logs_session_time ON cot_logs(session_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_cot_logs_agent_time ON cot_logs(agent_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_cot_logs_cleanup ON cot_logs(session_id, pinned, created_at)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_cot_logs_expires ON cot_logs(expires_at)")
    # memory_labels + memory_label_items migration
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS memory_labels (
            id          TEXT PRIMARY KEY,
            name        TEXT NOT NULL,
            color       TEXT NOT NULL DEFAULT '#a78ec7',
            created_at  TEXT NOT NULL
        )
        """
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS memory_label_items (
            label_id    TEXT NOT NULL,
            memory_id   TEXT NOT NULL,
            created_at  TEXT NOT NULL,
            PRIMARY KEY (label_id, memory_id)
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memory_label_items_lid ON memory_label_items(label_id)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memory_label_items_mid ON memory_label_items(memory_id)")

        # -- consciousness snapshot cols (v1) --
    _companion_new_cols = [
        ("open_loops_summary",             "TEXT    DEFAULT ''"),
        ("open_loops_count",               "INTEGER DEFAULT 0"),
        ("high_importance_memories",       "TEXT    DEFAULT '[]'"),
        ("high_importance_memory_count",   "INTEGER DEFAULT 0"),
        ("background_activity_candidates", "TEXT    DEFAULT '[]'"),
        ("presence_gap",                   "TEXT    DEFAULT ''"),
        ("consciousness_updated_at",       "TEXT    DEFAULT ''"),
    ]
    for _col, _ddl in _companion_new_cols:
        if not await _sqlite_column_exists(db, "companion_state", _col):
            await db.execute(f"ALTER TABLE companion_state ADD COLUMN {_col} {_ddl}")

        # -- proactive_messages new cols (v1) --
    _proactive_new_cols = [
        ("agent_id",           "TEXT    DEFAULT 'default'"),
        ("output_type",        "TEXT    DEFAULT 'direct_message'"),
        ("reason_type",        "TEXT    DEFAULT ''"),
        ("reason_context",     "TEXT    DEFAULT ''"),
        ("source_snapshot_at", "TEXT    DEFAULT ''"),
        ("is_read",            "INTEGER NOT NULL DEFAULT 0"),
    ]
    for _col, _ddl in _proactive_new_cols:
        if not await _sqlite_column_exists(db, "proactive_messages", _col):
            await db.execute(f"ALTER TABLE proactive_messages ADD COLUMN {_col} {_ddl}")


async def get_db() -> aiosqlite.Connection:
    """Get the shared database connection."""
    global _db
    if _db is None:
        _db = await aiosqlite.connect(settings.database_path)
        _db.row_factory = aiosqlite.Row
        await _db.execute("PRAGMA journal_mode=WAL")
        await _db.execute("PRAGMA foreign_keys=ON")
        await _db.executescript(SCHEMA)
        await _ensure_sqlite_memory_schema(_db)
        await _db.commit()
    return _db


async def close_db():
    global _db
    if _db:
        await _db.close()
        _db = None


# ==================== Agents ====================

def _agent_metadata_value(metadata: Any) -> str:
    if metadata in (None, ""):
        return "{}"
    if isinstance(metadata, str):
        return metadata
    try:
        return json.dumps(metadata, ensure_ascii=False)
    except Exception:
        return "{}"


def _normalize_agent_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["agent_id"] = normalize_agent_id_value(item.get("agent_id"))
    item["display_handle"] = f"@{item['agent_id']}"
    item["display_name"] = str(item.get("display_name") or item["agent_id"])
    item["avatar"] = str(item.get("avatar") or "")
    item["description"] = str(item.get("description") or "")
    item["persona"] = str(item.get("persona") or "")
    item["source"] = str(item.get("source") or "")
    item["metadata"] = item.get("metadata") or "{}"
    item["is_active"] = bool(item.get("is_active", True))
    item["created_at"] = str(item.get("created_at") or "")
    item["updated_at"] = str(item.get("updated_at") or "")
    return item


async def ensure_default_agents() -> None:
    now = _now()
    payload = {
        "agent_id": "azheng",
        "display_name": "阿筝",
        "avatar": "",
        "description": "",
        "persona": "",
        "source": "native",
        "metadata": "{}",
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        try:
            await _supabase_insert_verified(AGENTS_TABLE, payload, on_conflict="agent_id", id_column="agent_id")
        except Exception as exc:
            logger.warning("Failed to seed default Supabase agent azheng: %s", exc)
        return
    db = await get_db()
    await db.execute(
        """
        INSERT INTO agents (agent_id, display_name, avatar, description, persona, source, metadata, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        ON CONFLICT(agent_id) DO UPDATE SET
            display_name = CASE WHEN COALESCE(display_name, '') = '' THEN excluded.display_name ELSE display_name END,
            source = CASE WHEN COALESCE(source, '') = '' THEN excluded.source ELSE source END,
            is_active = 1,
            updated_at = excluded.updated_at
        """,
        (
            payload["agent_id"],
            payload["display_name"],
            payload["avatar"],
            payload["description"],
            payload["persona"],
            payload["source"],
            payload["metadata"],
            now,
            now,
        ),
    )
    await db.commit()


async def get_agent(agent_id: str | None, *, include_inactive: bool = False) -> dict[str, Any] | None:
    normalized = normalize_agent_id_value(agent_id)
    await ensure_default_agents()
    if _use_supabase_data():
        filters = {"agent_id": f"eq.{normalized}"}
        if not include_inactive:
            filters["is_active"] = "eq.true"
        rows = await _supabase_select(AGENTS_TABLE, filters=filters, limit=1)
        return _normalize_agent_row(rows[0] if rows else None)
    db = await get_db()
    sql = "SELECT * FROM agents WHERE agent_id = ?"
    params: list[Any] = [normalized]
    if not include_inactive:
        sql += " AND is_active = 1"
    cursor = await db.execute(sql + " LIMIT 1", params)
    row = await cursor.fetchone()
    return _normalize_agent_row(dict(row) if row else None)


async def agent_exists(agent_id: str | None) -> bool:
    return bool(await get_agent(agent_id))


async def require_agent(agent_id: str | None) -> str:
    normalized = normalize_agent_id_value(agent_id)
    if not await agent_exists(normalized):
        raise AgentResolutionError(f"agent_id not found: {normalized}")
    return normalized


async def list_agents(*, include_inactive: bool = False) -> list[dict[str, Any]]:
    await ensure_default_agents()
    if _use_supabase_data():
        filters = {} if include_inactive else {"is_active": "eq.true"}
        rows = await _supabase_select(AGENTS_TABLE, filters=filters, order="updated_at.desc")
        return [item for item in (_normalize_agent_row(row) for row in rows) if item]
    db = await get_db()
    sql = "SELECT * FROM agents"
    if not include_inactive:
        sql += " WHERE is_active = 1"
    sql += " ORDER BY updated_at DESC"
    cursor = await db.execute(sql)
    rows = await cursor.fetchall()
    return [item for item in (_normalize_agent_row(dict(row)) for row in rows) if item]


async def create_agent(
    *,
    agent_id: str,
    display_name: str,
    avatar: str = "",
    description: str = "",
    persona: str = "",
    source: str = "native",
    metadata: Any = None,
) -> dict[str, Any]:
    normalized = normalize_agent_id_value(agent_id)
    now = _now()
    payload = {
        "agent_id": normalized,
        "display_name": str(display_name or "").strip() or normalized,
        "avatar": str(avatar or ""),
        "description": str(description or ""),
        "persona": str(persona or ""),
        "source": str(source or "native").strip() or "native",
        "metadata": _agent_metadata_value(metadata),
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(AGENTS_TABLE, payload, id_column="agent_id")
        return _normalize_agent_row(row) or row
    db = await get_db()
    await db.execute(
        """
        INSERT INTO agents (agent_id, display_name, avatar, description, persona, source, metadata, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        """,
        (
            payload["agent_id"],
            payload["display_name"],
            payload["avatar"],
            payload["description"],
            payload["persona"],
            payload["source"],
            payload["metadata"],
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    return _normalize_agent_row(payload) or payload


async def update_agent(agent_id: str, **updates: Any) -> dict[str, Any] | None:
    normalized = await require_agent(agent_id)
    allowed = {"display_name", "avatar", "description", "persona", "source", "metadata", "is_active"}
    payload = {k: v for k, v in updates.items() if k in allowed and v is not None}
    if "metadata" in payload:
        payload["metadata"] = _agent_metadata_value(payload["metadata"])
    if not payload:
        return await get_agent(normalized, include_inactive=True)
    payload["updated_at"] = _now()
    if _use_supabase_data():
        rows = await _supabase_update(AGENTS_TABLE, {"agent_id": f"eq.{normalized}"}, payload)
        return _normalize_agent_row(rows[0] if rows else None)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = list(payload.values()) + [normalized]
    await db.execute(f"UPDATE agents SET {sets} WHERE agent_id = ?", values)
    await db.commit()
    return await get_agent(normalized, include_inactive=True)


async def deactivate_agent(agent_id: str) -> bool:
    updated = await update_agent(agent_id, is_active=False)
    return bool(updated)


def _normalize_external_link_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["id"] = str(item.get("id") or "")
    item["source"] = str(item.get("source") or "")
    item["external_id"] = str(item.get("external_id") or "")
    item["external_name"] = str(item.get("external_name") or "")
    item["agent_id"] = normalize_agent_id_value(item.get("agent_id"))
    item["metadata"] = item.get("metadata") or "{}"
    item["created_at"] = str(item.get("created_at") or "")
    item["updated_at"] = str(item.get("updated_at") or "")
    return item


async def list_agent_external_links(source: str | None = None, agent_id: str | None = None) -> list[dict[str, Any]]:
    filters: dict[str, str] = {}
    if source:
        filters["source"] = f"eq.{source}"
    if agent_id:
        filters["agent_id"] = f"eq.{await require_agent(agent_id)}"
    if _use_supabase_data():
        rows = await _supabase_select(AGENT_EXTERNAL_LINKS_TABLE, filters=filters or None, order="updated_at.desc")
        return [item for item in (_normalize_external_link_row(row) for row in rows) if item]
    db = await get_db()
    clauses: list[str] = []
    params: list[Any] = []
    if source:
        clauses.append("source = ?")
        params.append(source)
    if agent_id:
        clauses.append("agent_id = ?")
        params.append(await require_agent(agent_id))
    sql = "SELECT * FROM agent_external_links"
    if clauses:
        sql += " WHERE " + " AND ".join(clauses)
    sql += " ORDER BY updated_at DESC"
    cursor = await db.execute(sql, params)
    rows = await cursor.fetchall()
    return [item for item in (_normalize_external_link_row(dict(row)) for row in rows) if item]


async def get_agent_external_link(source: str, external_id: str) -> dict[str, Any] | None:
    src = str(source or "").strip()
    ext = str(external_id or "").strip()
    if not src or not ext:
        return None
    if _use_supabase_data():
        rows = await _supabase_select(
            AGENT_EXTERNAL_LINKS_TABLE,
            filters={"source": f"eq.{src}", "external_id": f"eq.{ext}"},
            limit=1,
        )
        return _normalize_external_link_row(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM agent_external_links WHERE source = ? AND external_id = ? LIMIT 1",
        (src, ext),
    )
    row = await cursor.fetchone()
    return _normalize_external_link_row(dict(row) if row else None)


async def create_agent_external_link(
    *,
    source: str,
    external_id: str,
    agent_id: str,
    external_name: str = "",
    metadata: Any = None,
) -> dict[str, Any]:
    normalized_agent = await require_agent(agent_id)
    now = _now()
    payload = {
        "id": _new_id(),
        "source": str(source or "").strip(),
        "external_id": str(external_id or "").strip(),
        "external_name": str(external_name or "").strip(),
        "agent_id": normalized_agent,
        "metadata": _agent_metadata_value(metadata),
        "created_at": now,
        "updated_at": now,
    }
    if not payload["source"] or not payload["external_id"]:
        raise AgentResolutionError("source and external_id are required")
    if _use_supabase_data():
        row = await _supabase_insert_verified(
            AGENT_EXTERNAL_LINKS_TABLE,
            payload,
            on_conflict="source,external_id",
            verify_filters={"source": f"eq.{payload['source']}", "external_id": f"eq.{payload['external_id']}"},
        )
        return _normalize_external_link_row(row) or row
    db = await get_db()
    await db.execute(
        """
        INSERT INTO agent_external_links (id, source, external_id, external_name, agent_id, metadata, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(source, external_id) DO UPDATE SET
            external_name = excluded.external_name,
            agent_id = excluded.agent_id,
            metadata = excluded.metadata,
            updated_at = excluded.updated_at
        """,
        (
            payload["id"],
            payload["source"],
            payload["external_id"],
            payload["external_name"],
            payload["agent_id"],
            payload["metadata"],
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    link = await get_agent_external_link(payload["source"], payload["external_id"])
    return link or payload


async def update_agent_external_link(link_id: str, **updates: Any) -> dict[str, Any] | None:
    allowed = {"external_name", "agent_id", "metadata"}
    payload = {k: v for k, v in updates.items() if k in allowed and v is not None}
    if "agent_id" in payload:
        payload["agent_id"] = await require_agent(payload["agent_id"])
    if "metadata" in payload:
        payload["metadata"] = _agent_metadata_value(payload["metadata"])
    if not payload:
        return None
    payload["updated_at"] = _now()
    if _use_supabase_data():
        rows = await _supabase_update(AGENT_EXTERNAL_LINKS_TABLE, {"id": f"eq.{link_id}"}, payload)
        return _normalize_external_link_row(rows[0] if rows else None)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = list(payload.values()) + [link_id]
    await db.execute(f"UPDATE agent_external_links SET {sets} WHERE id = ?", values)
    await db.commit()
    cursor = await db.execute("SELECT * FROM agent_external_links WHERE id = ?", (link_id,))
    row = await cursor.fetchone()
    return _normalize_external_link_row(dict(row) if row else None)


async def delete_agent_external_link(link_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_delete(AGENT_EXTERNAL_LINKS_TABLE, {"id": f"eq.{link_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM agent_external_links WHERE id = ?", (link_id,))
    await db.commit()
    return result.rowcount > 0


async def resolve_agent_context(
    *,
    agent_id: str | None = None,
    session_id: str | None = None,
    room_id: str | None = None,
    source: str | None = None,
    external_id: str | None = None,
    external_name: str | None = None,
    oauth_client_id: str | None = None,
    allow_default: bool = True,
    purpose: str = "",
) -> dict[str, Any]:
    await ensure_default_agents()
    if agent_id:
        normalized = await require_agent(agent_id)
        agent = await get_agent(normalized)
        return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "agent_id"}

    if session_id:
        session = await get_session(session_id)
        if not session:
            raise AgentResolutionError(f"session not found: {session_id}")
        normalized = await require_agent(session.get("agent_id"))
        agent = await get_agent(normalized)
        return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "session_id"}

    if room_id:
        room = await get_rp_room(room_id)
        if not room:
            raise AgentResolutionError(f"rp room not found: {room_id}")
        normalized = await require_agent(room.get("agent_id"))
        agent = await get_agent(normalized)
        return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "room_id"}

    if source and external_id:
        link = await get_agent_external_link(source, external_id)
        if not link:
            raise AgentNeedsBinding(
                source=str(source or "").strip(),
                external_id=str(external_id or "").strip(),
                external_name=str(external_name or "").strip(),
            )
        normalized = await require_agent(link.get("agent_id"))
        agent = await get_agent(normalized)
        return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "external_link", "link": link}

    if oauth_client_id:
        if str(oauth_client_id or "").strip() in {"claude-mcp", getattr(settings, "oauth_client_id", "")}:
            normalized = await require_agent(_configured_default_agent_id())
            agent = await get_agent(normalized)
            return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "oauth_client_id_default"}
        try:
            import oauth_store

            client = await oauth_store.get_client(str(oauth_client_id or "").strip())
        except Exception as exc:
            logger.warning("resolve_agent_context oauth client lookup failed: %s", exc)
            client = None
        if client and client.get("default_agent_id"):
            normalized = await require_agent(client.get("default_agent_id"))
            agent = await get_agent(normalized)
            return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "oauth_client_id"}
        raise AgentResolutionError(f"oauth client has no valid default agent: {oauth_client_id}")

    if allow_default:
        normalized = await require_agent(_configured_default_agent_id())
        if purpose:
            logger.warning("Agent context fallback to DEFAULT_AGENT_ID=%s for %s", normalized, purpose)
        agent = await get_agent(normalized)
        return {"resolved": True, "agent_id": normalized, "agent": agent, "via": "default"}

    raise AgentResolutionError("agent context is required")


async def resolve_agent_id(**kwargs: Any) -> str:
    context = await resolve_agent_context(**kwargs)
    return str(context["agent_id"])


# ==================== ???? ====================

async def get_setting(key: str) -> dict[str, Any] | None:
    if _use_supabase_settings():
        return await _supabase_get_setting(key)
    db = await get_db()
    cursor = await db.execute("SELECT key, value, updated_at FROM app_settings WHERE key = ?", (key,))
    row = await cursor.fetchone()
    if not row:
        return None
    return dict(row)


async def set_setting(key: str, value: str) -> dict[str, Any]:
    if _use_supabase_settings():
        return await _supabase_set_setting(key, value)
    db = await get_db()
    now = _now()
    await db.execute(
        """
        INSERT INTO app_settings (key, value, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = excluded.updated_at
        """,
        (key, value, now),
    )
    await db.commit()
    return {"key": key, "value": value, "updated_at": now}


async def delete_setting(key: str) -> bool:
    if _use_supabase_settings():
        return await _supabase_delete_verified(settings.supabase_settings_table, {"key": f"eq.{key}"})
    db = await get_db()
    cursor = await db.execute("DELETE FROM app_settings WHERE key = ?", (key,))
    await db.commit()
    return cursor.rowcount > 0


def _parse_iso_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    text = str(value).strip()
    if not text:
        return None
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _agent_persona_setting_key(agent_id: str | None) -> str:
    return f"agent_persona:{normalize_agent_id(agent_id)}"


async def get_agent_persona(agent_id: str | None) -> dict[str, Any]:
    normalized_agent_id = normalize_agent_id(agent_id)
    row = await get_setting(_agent_persona_setting_key(normalized_agent_id))
    persona = ""
    updated_at = ""
    if row and row.get("value") is not None:
        persona = str(row.get("value") or "")
        updated_at = str(row.get("updated_at") or "")
    return {
        "agent_id": normalized_agent_id,
        "persona": persona,
        "updated_at": updated_at,
    }


async def set_agent_persona(agent_id: str | None, persona: str) -> dict[str, Any]:
    normalized_agent_id = normalize_agent_id(agent_id)
    row = await set_setting(_agent_persona_setting_key(normalized_agent_id), str(persona or ""))
    return {
        "agent_id": normalized_agent_id,
        "persona": str(row.get("value") or ""),
        "updated_at": str(row.get("updated_at") or ""),
    }


def _agent_proactive_style_setting_key(agent_id: str | None) -> str:
    return f"agent_proactive_style:{normalize_agent_id(agent_id)}"


async def get_agent_proactive_style(agent_id: str | None) -> str:
    normalized_agent_id = normalize_agent_id(agent_id)
    row = await get_setting(_agent_proactive_style_setting_key(normalized_agent_id))
    style = str(row.get("value") or "") if row else ""
    return style if style in {"restrained", "normal", "clingy"} else "normal"


async def set_agent_proactive_style(agent_id: str | None, style: str) -> dict[str, Any]:
    normalized_agent_id = normalize_agent_id(agent_id)
    style = style if style in {"restrained", "normal", "clingy"} else "normal"
    row = await set_setting(_agent_proactive_style_setting_key(normalized_agent_id), style)
    return {
        "agent_id": normalized_agent_id,
        "style": str(row.get("value") or "normal"),
        "updated_at": str(row.get("updated_at") or ""),
    }


async def safe_delete_agent(agent_id: str | None) -> dict[str, Any]:
    normalized_agent_id = normalize_agent_id(agent_id)
    orphan_agent_id = f"orphan_{normalized_agent_id}"
    result = {
        "agent_id": normalized_agent_id,
        "companion_state_deleted": 0,
        "proactive_deleted": 0,
        "sessions_detached": 0,
        "memories_detached": 0,
        "memories_source_detached": 0,
        "persona_deleted": False,
        "proactive_style_deleted": False,
    }

    if _use_supabase_data():
        companion_rows = await _supabase_delete(
            settings.supabase_companion_state_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
        )
        proactive_rows = await _supabase_delete(
            settings.supabase_proactive_messages_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
        )
        session_rows = await _supabase_update(
            settings.supabase_sessions_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
            {"agent_id": orphan_agent_id},
        )
        memory_rows = await _supabase_update(
            settings.supabase_memories_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
            {"agent_id": orphan_agent_id},
        )
        memory_source_rows = await _supabase_update(
            settings.supabase_memories_table,
            {"source_agent_id": f"eq.{normalized_agent_id}"},
            {"source_agent_id": orphan_agent_id},
        )
        result.update({
            "companion_state_deleted": len(companion_rows or []),
            "proactive_deleted": len(proactive_rows or []),
            "sessions_detached": len(session_rows or []),
            "memories_detached": len(memory_rows or []),
            "memories_source_detached": len(memory_source_rows or []),
        })
    else:
        db = await get_db()
        companion_cursor = await db.execute(
            "DELETE FROM companion_state WHERE agent_id = ?",
            (normalized_agent_id,),
        )
        proactive_cursor = await db.execute(
            "DELETE FROM proactive_messages WHERE agent_id = ?",
            (normalized_agent_id,),
        )
        sessions_cursor = await db.execute(
            "UPDATE sessions SET agent_id = ? WHERE agent_id = ?",
            (orphan_agent_id, normalized_agent_id),
        )
        memories_cursor = await db.execute(
            "UPDATE memories SET agent_id = ? WHERE agent_id = ?",
            (orphan_agent_id, normalized_agent_id),
        )
        memories_source_cursor = await db.execute(
            "UPDATE memories SET source_agent_id = ? WHERE source_agent_id = ?",
            (orphan_agent_id, normalized_agent_id),
        )
        await db.commit()
        result.update({
            "companion_state_deleted": companion_cursor.rowcount,
            "proactive_deleted": proactive_cursor.rowcount,
            "sessions_detached": sessions_cursor.rowcount,
            "memories_detached": memories_cursor.rowcount,
            "memories_source_detached": memories_source_cursor.rowcount,
        })

    result["persona_deleted"] = await delete_setting(_agent_persona_setting_key(normalized_agent_id))
    result["proactive_style_deleted"] = await delete_setting(_agent_proactive_style_setting_key(normalized_agent_id))
    return result


async def get_companion_state(agent_id: str | None = None) -> dict[str, Any]:
    normalized_agent_id = normalize_agent_id(agent_id)
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_companion_state_table,
            filters={"agent_id": f"eq.{normalized_agent_id}"},
            limit=1,
        )
        return _normalize_companion_state(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT id, agent_id, recent_topics, current_mood, open_loops, proactive_cooldown_until,
               impression, relationship_progress, likes_summary, summary_updated_at, updated_at,
               open_loops_summary, open_loops_count, high_importance_memories, high_importance_memory_count,
               background_activity_candidates, presence_gap, consciousness_updated_at
        FROM companion_state
        WHERE agent_id = ?
        LIMIT 1
        """,
        (normalized_agent_id,),
    )
    row = await cursor.fetchone()
    return _normalize_companion_state(dict(row) if row else None)


async def set_companion_state(
    *,
    agent_id: str | None = None,
    recent_topics: list[str] | None = None,
    current_mood: str | None = None,
    open_loops: list[str] | None = None,
    proactive_cooldown_until: str | None = None,
) -> dict[str, Any]:
    now = _now()
    normalized_agent_id = await resolve_agent_id(agent_id=agent_id, purpose="set_companion_state")
    payload = {
        "id": normalized_agent_id,
        "agent_id": normalized_agent_id,
        "recent_topics": [str(item).strip() for item in (recent_topics or []) if str(item).strip()],
        "current_mood": (current_mood or "").strip(),
        "open_loops": [str(item).strip() for item in (open_loops or []) if str(item).strip()],
        "proactive_cooldown_until": proactive_cooldown_until,
        "updated_at": now,
    }
    if _use_supabase_data():
        rows = await _supabase_update(
            settings.supabase_companion_state_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
            payload,
        )
        if rows:
            return _normalize_companion_state(rows[0])
        row = await _supabase_insert_verified(
            settings.supabase_companion_state_table,
            payload,
            on_conflict="agent_id",
        )
        return _normalize_companion_state(row)
    db = await get_db()
    await db.execute(
        """
        INSERT INTO companion_state (
            id, agent_id, recent_topics, current_mood, open_loops, proactive_cooldown_until, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(agent_id) DO UPDATE SET
            id = excluded.id,
            recent_topics = excluded.recent_topics,
            current_mood = excluded.current_mood,
            open_loops = excluded.open_loops,
            proactive_cooldown_until = excluded.proactive_cooldown_until,
            updated_at = excluded.updated_at
        """,
        (
            payload["id"],
            payload["agent_id"],
            json.dumps(payload["recent_topics"], ensure_ascii=False),
            payload["current_mood"],
            json.dumps(payload["open_loops"], ensure_ascii=False),
            proactive_cooldown_until,
            now,
        ),
    )
    await db.commit()
    return _normalize_companion_state(payload)


def normalize_source_app(value: str | None) -> str:
        # session source flag
    return (str(value or "").strip() or "yui_nook")


def _normalize_session_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    normalized = dict(row)
    normalized["source_app"] = normalize_source_app(normalized.get("source_app"))
    normalized["agent_id"] = normalize_agent_id(normalized.get("agent_id"))
    normalized["last_summarized_message_id"] = str(normalized.get("last_summarized_message_id") or "")
    return normalized


async def set_companion_state_summary(
    *,
    agent_id: str | None = None,
    impression: str | None = None,
    relationship_progress: str | None = None,
    likes_summary: str | None = None,
) -> dict[str, Any]:
    now = _now()
    normalized_agent_id = await resolve_agent_id(agent_id=agent_id, purpose="set_companion_state_summary")
    if _use_supabase_data():
        summary_payload = {
            "impression": impression,
            "relationship_progress": relationship_progress,
            "likes_summary": likes_summary,
            "summary_updated_at": now,
        }
        rows = await _supabase_update(
            settings.supabase_companion_state_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
            summary_payload,
        )
        if rows:
            return _normalize_companion_state(rows[0])
        base_payload = {
            "id": normalized_agent_id,
            "agent_id": normalized_agent_id,
            "recent_topics": [],
            "open_loops": [],
            "updated_at": now,
        }
        await _supabase_insert_verified(
            settings.supabase_companion_state_table,
            base_payload,
            on_conflict="agent_id",
        )
        rows = await _supabase_update(
            settings.supabase_companion_state_table,
            {"agent_id": f"eq.{normalized_agent_id}"},
            summary_payload,
        )
        row = rows[0] if rows else None
        if not row:
            raise RuntimeError(f"Supabase companion_state summary update failed for agent {normalized_agent_id}")
        return _normalize_companion_state(row)
    db_conn = await get_db()
    # Ensure the row exists (no-op if already present)
    await db_conn.execute(
        """
        INSERT INTO companion_state (id, agent_id, recent_topics, open_loops, updated_at)
        VALUES (?, ?, '[]', '[]', ?)
        ON CONFLICT(agent_id) DO NOTHING
        """,
        (normalized_agent_id, normalized_agent_id, now),
    )
    await db_conn.execute(
        """
        UPDATE companion_state
        SET impression          = ?,
            relationship_progress = ?,
            likes_summary       = ?,
            summary_updated_at  = ?
        WHERE agent_id = ?
        """,
        (impression, relationship_progress, likes_summary, now, normalized_agent_id),
    )
    await db_conn.commit()
    return await get_companion_state(agent_id=agent_id)


async def set_consciousness_snapshot(
    *,
    agent_id: str | None = None,
    open_loops_summary: str = "",
    open_loops_count: int = 0,
    high_importance_memories: list[dict[str, Any]] = None,
    high_importance_memory_count: int = 0,
    background_activity_candidates: list[dict[str, Any]] = None,
    presence_gap: str = "",
) -> dict[str, Any]:
    """Update the companion consciousness snapshot."""
    now = _now()
    normalized_agent_id = await resolve_agent_id(agent_id=agent_id, purpose="set_consciousness_snapshot")
    high_importance_memories = high_importance_memories or []
    background_activity_candidates = background_activity_candidates or []

    if _use_supabase_data():
        payload = {
            "open_loops_summary": open_loops_summary,
            "open_loops_count": open_loops_count,
            "high_importance_memories": json.dumps(high_importance_memories, ensure_ascii=False),
            "high_importance_memory_count": high_importance_memory_count,
            "background_activity_candidates": json.dumps(background_activity_candidates, ensure_ascii=False),
            "presence_gap": presence_gap,
            "consciousness_updated_at": now,
            "updated_at": now,
        }
        rows = await _supabase_update(
            settings.supabase_companion_state_table,
            filters={"agent_id": f"eq.{normalized_agent_id}"},
            payload=payload,
        )
        if not rows:
            payload["id"] = normalized_agent_id
            payload["agent_id"] = normalized_agent_id
            payload["recent_topics"] = "[]"
            payload["open_loops"] = "[]"
            await _supabase_insert_verified(
                settings.supabase_companion_state_table,
                payload,
                on_conflict="agent_id"
            )
        return await get_companion_state(agent_id=agent_id)

    db_conn = await get_db()
    # Ensure the row exists (no-op if already present)
    await db_conn.execute(
        """
        INSERT INTO companion_state (id, agent_id, recent_topics, open_loops, updated_at)
        VALUES (?, ?, '[]', '[]', ?)
        ON CONFLICT(agent_id) DO NOTHING
        """,
        (normalized_agent_id, normalized_agent_id, now),
    )
    await db_conn.execute(
        """
        UPDATE companion_state
        SET open_loops_summary = ?,
            open_loops_count = ?,
            high_importance_memories = ?,
            high_importance_memory_count = ?,
            background_activity_candidates = ?,
            presence_gap = ?,
            consciousness_updated_at = ?,
            updated_at = ?
        WHERE agent_id = ?
        """,
        (
            open_loops_summary,
            open_loops_count,
            json.dumps(high_importance_memories, ensure_ascii=False),
            high_importance_memory_count,
            json.dumps(background_activity_candidates, ensure_ascii=False),
            presence_gap,
            now,
            now,
            normalized_agent_id,
        ),
    )
    await db_conn.commit()
    return await get_companion_state(agent_id=agent_id)


# ==================== Sessions ====================


async def create_session(
    title: str = "\u65b0\u5bf9\u8bdd",
    model: str = "echo",
    source_app: str | None = "yui_nook",
    *,
    agent_id: str | None = None,
    source: str | None = None,
    external_id: str | None = None,
    external_name: str | None = None,
    oauth_client_id: str | None = None,
) -> dict[str, Any]:
    resolved_agent_id = await resolve_agent_id(
        agent_id=agent_id,
        source=source,
        external_id=external_id,
        external_name=external_name,
        oauth_client_id=oauth_client_id,
        purpose="create_session",
    )
    if _use_supabase_data():
        sid = _new_id()
        now = _now()
        payload = {
            "id": sid,
            "title": title,
            "model": model,
            "source_app": normalize_source_app(source_app),
            "agent_id": resolved_agent_id,
            "last_summarized_message_id": "",
            "created_at": now,
            "updated_at": now,
        }
        row = await _supabase_insert_verified(settings.supabase_sessions_table, payload)
        return _normalize_session_row(row)
    db = await get_db()
    sid = _new_id()
    now = _now()
    normalized_source_app = normalize_source_app(source_app)
    await db.execute(
        "INSERT INTO sessions (id, title, model, source_app, agent_id, last_summarized_message_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (sid, title, model, normalized_source_app, resolved_agent_id, "", now, now),
    )
    await db.commit()
    return _normalize_session_row(
        {
            "id": sid,
            "title": title,
            "model": model,
            "source_app": normalized_source_app,
            "agent_id": resolved_agent_id,
            "last_summarized_message_id": "",
            "created_at": now,
            "updated_at": now,
        }
    )


async def list_sessions() -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select(settings.supabase_sessions_table, order="updated_at.desc")
        return [_normalize_session_row(row) for row in rows]
    db = await get_db()
    cursor = await db.execute("SELECT * FROM sessions ORDER BY updated_at DESC")
    rows = await cursor.fetchall()
    return [_normalize_session_row(dict(row)) for row in rows]


async def get_session(session_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_sessions_table,
            filters={"id": f"eq.{session_id}"},
            limit=1,
        )
        return _normalize_session_row(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute("SELECT * FROM sessions WHERE id = ?", (session_id,))
    row = await cursor.fetchone()
    return _normalize_session_row(dict(row) if row else None)


async def update_session(session_id: str, **kwargs) -> bool:
    if "source_app" in kwargs:
        kwargs["source_app"] = normalize_source_app(kwargs.get("source_app"))
    if "agent_id" in kwargs:
        kwargs["agent_id"] = await require_agent(kwargs.get("agent_id"))
    if _use_supabase_data():
        payload = dict(kwargs)
        payload["updated_at"] = _now()
        rows = await _supabase_update(settings.supabase_sessions_table, {"id": f"eq.{session_id}"}, payload)
        return len(rows) > 0
    db = await get_db()
    kwargs["updated_at"] = _now()
    sets = ", ".join(f"{k} = ?" for k in kwargs)
    vals = list(kwargs.values()) + [session_id]
    result = await db.execute(f"UPDATE sessions SET {sets} WHERE id = ?", vals)
    await db.commit()
    return result.rowcount > 0


async def delete_session(session_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_delete(settings.supabase_sessions_table, {"id": f"eq.{session_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM sessions WHERE id = ?", (session_id,))
    await db.commit()
    return result.rowcount > 0


# ==================== Messages ====================

async def add_message(session_id: str, role: str, content: str, model: str = "") -> dict[str, Any]:
    if _use_supabase_data():
        mid = _new_id()
        now = _now()
        payload = {
            "id": mid,
            "session_id": session_id,
            "role": role,
            "content": content,
            "model": model,
            "created_at": now,
        }
        row = await _supabase_insert_verified(settings.supabase_messages_table, payload)
        await _supabase_update(settings.supabase_sessions_table, {"id": f"eq.{session_id}"}, {"updated_at": now})
        return row
    db = await get_db()
    mid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO messages (id, session_id, role, content, model, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (mid, session_id, role, content, model, now),
    )
    # update session time
    await db.execute("UPDATE sessions SET updated_at = ? WHERE id = ?", (now, session_id))
    await db.commit()
    return {"id": mid, "session_id": session_id, "role": role, "content": content, "model": model, "created_at": now}


async def get_messages(session_id: str, limit: int = 50) -> list[dict[str, Any]]:
    if _use_supabase_data():
        return await _supabase_select(
            settings.supabase_messages_table,
            filters={"session_id": f"eq.{session_id}"},
            order="created_at.asc",
            limit=limit,
        )
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?",
        (session_id, limit),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def get_recent_messages(session_id: str, limit: int = 12) -> list[dict[str, str]]:
    """Get top N messages in OpenAI format"""
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_messages_table,
            filters={"session_id": f"eq.{session_id}"},
            select="role,content",
            order="created_at.desc",
            limit=limit,
        )
        return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]
    db = await get_db()
    cursor = await db.execute(
        "SELECT role, content FROM messages WHERE session_id = ? ORDER BY created_at DESC LIMIT ?",
        (session_id, limit),
    )
    rows = await cursor.fetchall()
    return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]


COT_LOG_MAX_CONTENT_CHARS = 1200
COT_LOG_MAX_SUMMARY_CHARS = 260
COT_LOG_MAX_PER_SESSION = 160
COT_LOG_TTL_DAYS = 14


def _compact_log_text(value: str, max_chars: int) -> str:
    text = re.sub(r"\s+", " ", str(value or "")).strip()
    if len(text) <= max_chars:
        return text
    return f"{text[:max_chars].rstrip()}..."


async def prune_cot_logs(session_id: str | None = None, *, max_per_session: int = COT_LOG_MAX_PER_SESSION) -> None:
    """Keep COT logs useful instead of letting them grow forever."""
    now = _now()
    if _use_supabase_data():
        try:
            await _supabase_delete("cot_logs", {"expires_at": f"lt.{now}", "pinned": "eq.0"})
        except Exception as exc:
            logger.debug("Supabase cot_logs cleanup skipped: %s", exc)
        return

    db = await get_db()
    await db.execute(
        "DELETE FROM cot_logs WHERE pinned = 0 AND expires_at <> '' AND expires_at < ?",
        (now,),
    )
    if session_id:
        cursor = await db.execute(
            """
            SELECT id FROM cot_logs
            WHERE session_id = ? AND pinned = 0
            ORDER BY created_at DESC
            LIMIT -1 OFFSET ?
            """,
            (session_id, max_per_session),
        )
        stale = [row["id"] for row in await cursor.fetchall()]
        if stale:
            placeholders = ",".join("?" for _ in stale)
            await db.execute(f"DELETE FROM cot_logs WHERE id IN ({placeholders})", stale)
    await db.commit()


async def add_cot_log(
    session_id: str,
    *,
    agent_id: str | None = None,
    source: str = "chat",
    log_type: str = "event",
    title: str = "",
    summary: str = "",
    content: str = "",
    tool_name: str = "",
    status: str = "",
    pinned: bool = False,
    ttl_days: int = COT_LOG_TTL_DAYS,
) -> dict[str, Any]:
    now = _now()
    compact_content = _compact_log_text(content, COT_LOG_MAX_CONTENT_CHARS)
    compact_summary = _compact_log_text(summary or compact_content, COT_LOG_MAX_SUMMARY_CHARS)
    expires_at = (
        datetime.now(timezone.utc) + timedelta(days=max(1, ttl_days))
    ).isoformat()
    payload = {
        "id": _new_id(),
        "session_id": session_id,
        "agent_id": normalize_agent_id(agent_id),
        "source": source or "chat",
        "log_type": log_type or "event",
        "title": _compact_log_text(title or log_type or "log", 80),
        "summary": compact_summary,
        "content": compact_content,
        "tool_name": _compact_log_text(tool_name, 80),
        "status": _compact_log_text(status, 40),
        "token_count": max(0, len(compact_content) // 4),
        "pinned": 1 if pinned else 0,
        "expires_at": expires_at,
        "created_at": now,
    }
    if _use_supabase_data():
        try:
            row = await _supabase_insert_verified("cot_logs", payload)
            await prune_cot_logs(session_id)
            return row
        except Exception as exc:
            logger.debug("Supabase cot_logs insert skipped: %s", exc)
            return payload

    db = await get_db()
    await db.execute(
        """
        INSERT INTO cot_logs (
            id, session_id, agent_id, source, log_type, title, summary, content,
            tool_name, status, token_count, pinned, expires_at, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["session_id"],
            payload["agent_id"],
            payload["source"],
            payload["log_type"],
            payload["title"],
            payload["summary"],
            payload["content"],
            payload["tool_name"],
            payload["status"],
            payload["token_count"],
            payload["pinned"],
            payload["expires_at"],
            payload["created_at"],
        ),
    )
    await db.commit()
    await prune_cot_logs(session_id)
    return payload


async def list_cot_logs(session_id: str, *, limit: int = 40, before: str | None = None) -> list[dict[str, Any]]:
    safe_limit = min(max(int(limit or 40), 1), 100)
    filters = {"session_id": f"eq.{session_id}"}
    if _use_supabase_data():
        try:
            if before:
                filters["created_at"] = f"lt.{before}"
            return await _supabase_select(
                "cot_logs",
                filters=filters,
                order="created_at.desc",
                limit=safe_limit,
            )
        except Exception as exc:
            logger.debug("Supabase cot_logs select skipped: %s", exc)
            return []

    db = await get_db()
    if before:
        cursor = await db.execute(
            "SELECT * FROM cot_logs WHERE session_id = ? AND created_at < ? ORDER BY created_at DESC LIMIT ?",
            (session_id, before, safe_limit),
        )
    else:
        cursor = await db.execute(
            "SELECT * FROM cot_logs WHERE session_id = ? ORDER BY created_at DESC LIMIT ?",
            (session_id, safe_limit),
        )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


def _normalize_rp_room_row(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "room_id": str(row.get("room_id") or row.get("id") or ""),
        "name": str(row.get("name") or "\u65b0\u623f\u95f4"),
        "world_setting": str(row.get("world_setting") or ""),
        "user_role": str(row.get("user_role") or ""),
        "ai_role": str(row.get("ai_role") or ""),
        "agent_id": normalize_agent_id(row.get("agent_id")),
        "created_at": str(row.get("created_at") or _now()),
        "last_active_at": str(row.get("last_active_at") or row.get("updated_at") or _now()),
    }


async def list_rp_rooms(agent_id: str | None = None) -> list[dict[str, Any]]:
    normalized_agent = normalize_agent_id(agent_id)
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_rp_rooms_table,
            filters={"agent_id": f"eq.{normalized_agent}"},
            order="last_active_at.desc",
        )
        return [_normalize_rp_room_row(row) for row in rows]
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM rp_rooms WHERE agent_id = ? ORDER BY last_active_at DESC",
        (normalized_agent,),
    )
    rows = await cursor.fetchall()
    return [_normalize_rp_room_row(dict(row)) for row in rows]


async def get_rp_room(room_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_rp_rooms_table,
            filters={"room_id": f"eq.{room_id}"},
            limit=1,
        )
        return _normalize_rp_room_row(rows[0]) if rows else None
    db = await get_db()
    cursor = await db.execute("SELECT * FROM rp_rooms WHERE room_id = ?", (room_id,))
    row = await cursor.fetchone()
    return _normalize_rp_room_row(dict(row)) if row else None


async def create_rp_room(
    *,
    agent_id: str | None = None,
    name: str = "\u65b0\u623f\u95f4",
    world_setting: str = "",
    user_role: str = "",
    ai_role: str = "",
) -> dict[str, Any]:
    now = _now()
    normalized_agent = await resolve_agent_id(agent_id=agent_id, purpose="create_rp_room")
    payload = {
        "room_id": _new_id(),
        "name": (name or "").strip() or "\u65b0\u623f\u95f4",
        "world_setting": (world_setting or "").strip(),
        "user_role": (user_role or "").strip(),
        "ai_role": (ai_role or "").strip(),
        "agent_id": normalized_agent,
        "created_at": now,
        "last_active_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_rp_rooms_table, payload, id_column="room_id")
        return _normalize_rp_room_row(row)
    db = await get_db()
    await db.execute(
        """
        INSERT INTO rp_rooms (room_id, name, world_setting, user_role, ai_role, agent_id, created_at, last_active_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["room_id"],
            payload["name"],
            payload["world_setting"],
            payload["user_role"],
            payload["ai_role"],
            payload["agent_id"],
            payload["created_at"],
            payload["last_active_at"],
        ),
    )
    await db.commit()
    return payload


async def update_rp_room(room_id: str, **kwargs) -> dict[str, Any] | None:
    updates = {
        key: value
        for key, value in kwargs.items()
        if key in {"name", "world_setting", "user_role", "ai_role", "agent_id", "last_active_at"}
        and value is not None
    }
    if not updates:
        return await get_rp_room(room_id)
    if "agent_id" in updates:
        updates["agent_id"] = await require_agent(updates["agent_id"])
    if "name" in updates:
        updates["name"] = str(updates["name"]).strip() or "\u65b0\u623f\u95f4"
    if _use_supabase_data():
        rows = await _supabase_update(
            settings.supabase_rp_rooms_table,
            {"room_id": f"eq.{room_id}"},
            updates,
        )
        return _normalize_rp_room_row(rows[0]) if rows else None
    db = await get_db()
    sets = ", ".join(f"{k} = ?" for k in updates)
    vals = list(updates.values()) + [room_id]
    result = await db.execute(f"UPDATE rp_rooms SET {sets} WHERE room_id = ?", vals)
    await db.commit()
    if result.rowcount <= 0:
        return None
    return await get_rp_room(room_id)


async def delete_rp_room(room_id: str) -> bool:
    if _use_supabase_data():
        await _supabase_delete(settings.supabase_rp_messages_table, {"room_id": f"eq.{room_id}"})
        rows = await _supabase_delete(settings.supabase_rp_rooms_table, {"room_id": f"eq.{room_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM rp_rooms WHERE room_id = ?", (room_id,))
    await db.commit()
    return result.rowcount > 0


async def add_rp_message(room_id: str, role: str, content: str, model: str = "") -> dict[str, Any]:
    now = _now()
    payload = {
        "id": _new_id(),
        "room_id": room_id,
        "role": role,
        "content": content,
        "model": model,
        "timestamp": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_rp_messages_table, payload)
        await _supabase_update(
            settings.supabase_rp_rooms_table,
            {"room_id": f"eq.{room_id}"},
            {"last_active_at": now},
        )
        return row
    db = await get_db()
    await db.execute(
        "INSERT INTO rp_messages (id, room_id, role, content, model, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (payload["id"], payload["room_id"], payload["role"], payload["content"], payload["model"], payload["timestamp"]),
    )
    await db.execute("UPDATE rp_rooms SET last_active_at = ? WHERE room_id = ?", (now, room_id))
    await db.commit()
    return payload


async def get_rp_messages(room_id: str, limit: int = 200) -> list[dict[str, Any]]:
    if _use_supabase_data():
        return await _supabase_select(
            settings.supabase_rp_messages_table,
            filters={"room_id": f"eq.{room_id}"},
            order="timestamp.asc",
            limit=limit,
        )
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM rp_messages WHERE room_id = ? ORDER BY timestamp ASC LIMIT ?",
        (room_id, limit),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def get_recent_rp_messages(room_id: str, limit: int = 12) -> list[dict[str, str]]:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_rp_messages_table,
            filters={"room_id": f"eq.{room_id}"},
            select="role,content",
            order="timestamp.desc",
            limit=limit,
        )
        return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]
    db = await get_db()
    cursor = await db.execute(
        "SELECT role, content FROM rp_messages WHERE room_id = ? ORDER BY timestamp DESC LIMIT ?",
        (room_id, limit),
    )
    rows = await cursor.fetchall()
    return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]


async def bind_session_agent(session_id: str, agent_id: str | None) -> bool:
    return await update_session(session_id, agent_id=await require_agent(agent_id))


async def mark_session_summarized(session_id: str, message_id: str, *, agent_id: str | None = None) -> bool:
    updates: dict[str, Any] = {
        "last_summarized_message_id": str(message_id or "").strip(),
    }
    if agent_id is not None:
        updates["agent_id"] = normalize_agent_id(agent_id)
    return await update_session(session_id, **updates)


async def get_messages_after(session_id: str, after_message_id: str = "", limit: int = 1000) -> list[dict[str, Any]]:
    messages = await get_messages(session_id=session_id, limit=limit)
    checkpoint = str(after_message_id or "").strip()
    if not checkpoint:
        return messages
    for index, item in enumerate(messages):
        if str(item.get("id") or "") == checkpoint:
            return messages[index + 1 :]
    return messages


# ==================== Semantic Memory ====================

async def add_memory(
    content: str,
    category: str,
    tags: str = "",
    source: str = "",
    *,
    agent_id: str | None = None,
    visibility: str = "private",
    source_agent_id: str | None = None,
    raw_content: str | None = None,
    compressed_content: str | None = None,
    importance: int | None = None,
    expires_at: str | None = None,
    session_id: str | None = None,
    room_id: str | None = None,
    external_source: str | None = None,
    external_id: str | None = None,
    oauth_client_id: str | None = None,
) -> dict[str, Any]:
    normalized_agent = await resolve_agent_id(
        agent_id=agent_id,
        session_id=session_id,
        room_id=room_id,
        source=external_source,
        external_id=external_id,
        oauth_client_id=oauth_client_id,
        purpose="add_memory",
    )
    normalized_category = normalize_memory_category(category)
    raw_text = (raw_content or content or "").strip()
    compressed_text = (compressed_content or "").strip()
    stored_content = compressed_text or raw_text
    importance_value = max(1, min(5, int(importance or 3)))
    if _use_supabase_memory():
        memory = await _supabase_add_memory(
            agent_id=normalized_agent,
            visibility=normalize_visibility(visibility),
            source_agent_id=await resolve_source_agent_id_checked(normalized_agent, source_agent_id),
            content=stored_content,
            raw_content=raw_text,
            compressed_content=compressed_text,
            category=normalized_category,
            tags=tags,
            source=source,
            importance=importance_value,
            expires_at=expires_at,
        )
        try:
            await _schedule_memory_processing(memory["id"], raw_text)
        except Exception as exc:
            logger.warning("Failed to schedule memory processing %s: %s", memory.get("id"), exc)
        return memory
    db = await get_db()
    mid = _new_id()
    now = _now()
    await db.execute(
        """
        INSERT INTO memories (
            id, agent_id, visibility, source_agent_id, content, raw_content, compressed_content, category, tags, source, importance, expires_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            mid,
            normalized_agent,
            normalize_visibility(visibility),
            await resolve_source_agent_id_checked(normalized_agent, source_agent_id),
            stored_content,
            raw_text,
            compressed_text,
            normalized_category,
            tags,
            source,
            importance_value,
            expires_at or "",
            now,
            now,
        ),
    )
    await db.commit()
    memory = {
        "id": mid,
        "agent_id": normalized_agent,
        "visibility": normalize_visibility(visibility),
        "source_agent_id": await resolve_source_agent_id_checked(normalized_agent, source_agent_id),
        "content": stored_content,
        "raw_content": raw_text,
        "compressed_content": compressed_text,
        "category": normalized_category,
        "tags": tags,
        "source": source,
        "importance": importance_value,
        "temperature": 0.0,
        "last_touched_at": "",
        "touch_count": 0,
        "expires_at": expires_at or "",
        "created_at": now,
        "updated_at": now,
    }
    try:
        await _schedule_memory_processing(memory["id"], raw_text)
    except Exception as exc:
        logger.warning("Failed to schedule memory processing %s: %s", memory.get("id"), exc)
    return memory


async def list_memories(
    category: str = None,
    limit: int = 50,
    *,
    agent_id: str | None = None,
    sort_by: str = "updated_at",
    order: str = "desc",
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
) -> list[dict[str, Any]]:
    field, direction = _normalize_memory_sort(sort_by, order)
    if _use_supabase_memory():
        return await _supabase_list_memories(
            category=category,
            limit=limit,
            agent_id=agent_id,
            include_cross_agent=include_cross_agent,
            cross_agent_limit=cross_agent_limit,
            sort_by=field,
            order=direction,
        )
    db = await get_db()
    active_where = _memory_active_where_clause()
    scope_where = _memory_visibility_where_clause(include_cross_agent)
    scope_params = _memory_scope_params(normalize_agent_id(agent_id), include_cross_agent)
    now = _now()
    sqlite_order = {
        "updated_at": f"updated_at {direction.upper()}",
        "created_at": f"created_at {direction.upper()}",
        "importance": f"importance {direction.upper()}, updated_at DESC",
        "temperature": (
            f"temperature {direction.upper()}, last_touched_at {direction.upper()}, importance DESC, updated_at DESC"
        ),
        "last_touched_at": f"last_touched_at {direction.upper()}, temperature DESC, updated_at DESC",
    }[field]
    if category:
        cursor = await db.execute(
            f"SELECT * FROM memories WHERE category = ? AND {scope_where} AND {active_where} ORDER BY {sqlite_order} LIMIT ?",
            (normalize_memory_category(category), *scope_params, now, limit),
        )
    else:
        cursor = await db.execute(
            f"SELECT * FROM memories WHERE {scope_where} AND {active_where} ORDER BY {sqlite_order} LIMIT ?",
            (*scope_params, now, limit),
        )
    rows = await cursor.fetchall()
    result = [dict(row) for row in rows]
    return _memory_scope_post_filter(
        result,
        agent_id=normalize_agent_id(agent_id),
        include_cross_agent=include_cross_agent,
        cross_agent_limit=cross_agent_limit,
    )


async def update_memory(memory_id: str, **kwargs) -> bool:
    if "category" in kwargs:
        kwargs["category"] = normalize_memory_category(kwargs["category"])
    if "agent_id" in kwargs:
        kwargs["agent_id"] = await require_agent(kwargs["agent_id"])
    if "visibility" in kwargs:
        kwargs["visibility"] = normalize_visibility(kwargs["visibility"])
    if "source_agent_id" in kwargs:
        kwargs["source_agent_id"] = await require_agent(kwargs["source_agent_id"])
    schedule_raw_text = ""
    if "raw_content" in kwargs:
        raw_text = (kwargs.get("raw_content") or "").strip()
        kwargs["raw_content"] = raw_text
        if "compressed_content" not in kwargs:
            kwargs["compressed_content"] = ""
        kwargs["content"] = (kwargs.get("compressed_content") or "").strip() or raw_text
        schedule_raw_text = raw_text
    elif "content" in kwargs and "compressed_content" not in kwargs:
        raw_text = (kwargs.get("content") or "").strip()
        kwargs["content"] = raw_text
        kwargs["raw_content"] = raw_text
        kwargs["compressed_content"] = ""
        schedule_raw_text = raw_text
    elif "compressed_content" in kwargs:
        compressed = (kwargs.get("compressed_content") or "").strip()
        kwargs["compressed_content"] = compressed
        if compressed:
            kwargs["content"] = compressed
    if "importance" in kwargs and kwargs["importance"] is not None:
        kwargs["importance"] = max(1, min(5, int(kwargs["importance"])))
    if "expires_at" in kwargs and kwargs["expires_at"] is None:
        kwargs["expires_at"] = ""
    if _use_supabase_memory():
        ok = await _supabase_update_memory(memory_id, **kwargs)
        if ok and schedule_raw_text:
            try:
                await _schedule_memory_processing(memory_id, schedule_raw_text)
            except Exception as exc:
                logger.warning("Failed to refresh memory processing %s: %s", memory_id, exc)
        return ok
    db = await get_db()
    kwargs["updated_at"] = _now()
    sets = ", ".join(f"{k} = ?" for k in kwargs)
    vals = list(kwargs.values()) + [memory_id]
    result = await db.execute(f"UPDATE memories SET {sets} WHERE id = ?", vals)
    await db.commit()
    if result.rowcount > 0 and schedule_raw_text:
        try:
            await _schedule_memory_processing(memory_id, schedule_raw_text)
        except Exception as exc:
            logger.warning("Failed to refresh memory processing %s: %s", memory_id, exc)
    return result.rowcount > 0


async def delete_memory(memory_id: str) -> bool:
    if _use_supabase_memory():
        ok = await _supabase_delete_memory(memory_id)
        if ok:
            await _delete_embedding(memory_id)
        return ok
    db = await get_db()
    result = await db.execute("DELETE FROM memories WHERE id = ?", (memory_id,))
    await db.commit()
    if result.rowcount > 0:
        await _delete_embedding(memory_id)
    return result.rowcount > 0


async def search_memories(
    keyword: str,
    category: str = None,
    limit: int = 10,
    *,
    agent_id: str | None = None,
    touch: bool = True,
) -> list[dict[str, Any]]:
    """Keyword search memories"""
    if _use_supabase_memory():
        rows = await _supabase_search_memories(keyword=keyword, category=category, limit=limit, agent_id=agent_id)
        if touch and rows:
            await touch_memories([str(row.get("id") or "") for row in rows], reason="retrieval_hit", delta=0.5)
        return rows
    db = await get_db()
    query = f"SELECT * FROM memories WHERE {_memory_visibility_where_clause(False)} AND {_memory_active_where_clause()}"
    params: list[Any] = [*_memory_scope_params(normalize_agent_id(agent_id), False), _now()]
    if category:
        query += " AND category = ?"
        params.append(normalize_memory_category(category))
    query += " ORDER BY updated_at DESC LIMIT ?"
    params.append(max(limit * 20, 200))
    cursor = await db.execute(query, params)
    rows = await cursor.fetchall()
    candidates = [dict(row) for row in rows]
    needle = (keyword or "").strip().lower()
    scored: list[tuple[float, dict[str, Any]]] = []
    for memory in candidates:
        score = _keyword_match_score(memory, needle)
        if score <= 0:
            continue
        scored.append((score, memory))
    scored.sort(
        key=lambda item: (
            item[0],
            _memory_importance(item[1]),
            _memory_temperature(item[1]),
            str(item[1].get("last_touched_at") or ""),
            str(item[1].get("updated_at") or ""),
        ),
        reverse=True,
    )
    results = [item[1] for item in scored[:limit]]
    if touch and results:
        await touch_memories([str(row.get("id") or "") for row in results], reason="retrieval_hit", delta=0.5)
    return results


async def semantic_search_memories(
    query_text: str,
    category: str = None,
    limit: int = 10,
    *,
    agent_id: str | None = None,
    touch: bool = True,
) -> list[dict[str, Any]]:
    query = (query_text or "").strip()
    if not query:
        return []

    if not _can_use_embeddings():
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, touch=touch)

    if _use_supabase_memory():
        try:
            query_embedding = await _fetch_embedding(query)
            rows = await _supabase_match_memories(query_embedding, category=category, limit=limit, agent_id=agent_id)
            if rows:
                rows.sort(
                    key=lambda item: (
                        _semantic_rank_score(item, _safe_float(item.get("similarity"), 0.0)),
                        _safe_float(item.get("similarity"), 0.0),
                        _memory_importance(item),
                        _memory_temperature(item),
                    ),
                    reverse=True,
                )
                rows = rows[:limit]
                if touch:
                    await touch_memories(
                        [str(row.get("id") or "") for row in rows],
                        reason="retrieval_hit",
                        delta=0.5,
                    )
                return rows
        except Exception as exc:
            logger.warning("Supabase semantic rpc failed, fallback to keyword search: %s", exc)
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, touch=touch)

    candidate_limit = max(limit, getattr(settings, "memory_vector_candidate_limit", 200))
    candidates = await list_memories(category=category, limit=candidate_limit, agent_id=agent_id)
    if not candidates:
        return []

    try:
        query_embedding = await _fetch_embedding(query)
    except Exception as exc:
        logger.warning("Semantic memory query failed, fallback to keyword search: %s", exc)
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, touch=touch)

    scored: list[tuple[float, float, dict[str, Any]]] = []
    for memory in candidates:
        content = memory_embedding_source(memory)
        if not content:
            continue
        try:
            embedding = await _ensure_memory_embedding(memory["id"], content)
        except Exception as exc:
            logger.warning("Failed to embed memory %s during retrieval: %s", memory.get("id"), exc)
            continue
        if not embedding:
            continue
        score = _cosine_similarity(query_embedding, embedding)
        if score <= 0:
            continue
        enriched = dict(memory)
        enriched["score"] = round(score, 6)
        blended = _semantic_rank_score(enriched, score)
        scored.append((blended, score, enriched))

    scored.sort(key=lambda item: (item[0], item[1]), reverse=True)
    results = [item[2] for item in scored[:limit]]
    if results:
        if touch:
            await touch_memories([str(row.get("id") or "") for row in results], reason="retrieval_hit", delta=0.5)
        return results
    return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, touch=touch)


async def touch_memories(
    memory_ids: list[str],
    *,
    reason: str = "touch",
    delta: float = 1.0,
    cap: float = 100.0,
) -> int:
    unique_ids = []
    seen: set[str] = set()
    for memory_id in memory_ids:
        mid = str(memory_id or "").strip()
        if not mid or mid in seen:
            continue
        seen.add(mid)
        unique_ids.append(mid)
    if not unique_ids:
        return 0

    now = _now()
    delta_value = max(0.0, float(delta))
    cap_value = max(0.0, float(cap))

    if _use_supabase_memory():
        touched = 0
        for mid in unique_ids:
            rows = await _supabase_select(
                settings.supabase_memories_table,
                filters={"id": f"eq.{mid}"},
                select="id,temperature,touch_count",
                limit=1,
            )
            if not rows:
                continue
            row = rows[0]
            next_temp = min(cap_value, _memory_temperature(row) + delta_value)
            next_count = _safe_int(row.get("touch_count"), 0) + 1
            updated = await _supabase_update(
                settings.supabase_memories_table,
                {"id": f"eq.{mid}"},
                {
                    "temperature": round(next_temp, 4),
                    "last_touched_at": now,
                    "touch_count": next_count,
                },
            )
            if updated:
                touched += 1
                try:
                    await add_memory_log(mid, "touch", f"{reason}|delta={delta_value}")
                except Exception:
                    pass
        return touched

    db = await get_db()
    touched = 0
    for mid in unique_ids:
        result = await db.execute(
            """
            UPDATE memories
            SET temperature = MIN(?, COALESCE(temperature, 0) + ?),
                last_touched_at = ?,
                touch_count = COALESCE(touch_count, 0) + 1
            WHERE id = ?
            """,
            (cap_value, delta_value, now, mid),
        )
        if result.rowcount > 0:
            touched += 1
            try:
                await add_memory_log(mid, "touch", f"{reason}|delta={delta_value}")
            except Exception:
                pass
    if touched:
        await db.commit()
    return touched


async def get_memory_stats() -> dict[str, int]:
    """Get memory count per category"""
    if _use_supabase_memory():
        return await _supabase_get_memory_stats()
    db = await get_db()
    cursor = await db.execute(
        f"SELECT category, COUNT(*) as count FROM memories WHERE {_memory_active_where_clause()} GROUP BY category",
        (_now(),),
    )
    rows = await cursor.fetchall()
    return {row["category"]: row["count"] for row in rows}


# ==================== Amber Labels ====================

async def list_memory_labels() -> list[dict[str, Any]]:
    """List memory labels with count"""
    if _use_supabase_data():
        label_rows = await _supabase_select("memory_labels", order="created_at.desc")
        item_rows = await _supabase_select("memory_label_items", select="label_id")
        counts: dict[str, int] = {}
        for item in item_rows:
            lid = item.get("label_id", "")
            counts[lid] = counts.get(lid, 0) + 1
        return [{**r, "count": counts.get(r["id"], 0)} for r in label_rows]
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT ml.id, ml.name, ml.color, ml.created_at,
               COUNT(mli.memory_id) AS count
        FROM memory_labels ml
        LEFT JOIN memory_label_items mli ON ml.id = mli.label_id
        GROUP BY ml.id
        ORDER BY ml.created_at DESC
        """
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def create_memory_label(name: str, color: str = "#a78ec7") -> dict[str, Any]:
    lid = _new_id()
    now = _now()
    payload = {"id": lid, "name": name.strip()[:64], "color": color, "created_at": now}
    if _use_supabase_data():
        row = await _supabase_insert_verified("memory_labels", payload)
        return {**row, "count": 0}
    db = await get_db()
    await db.execute(
        "INSERT INTO memory_labels (id, name, color, created_at) VALUES (?,?,?,?)",
        (lid, name.strip()[:64], color, now),
    )
    await db.commit()
    return {"id": lid, "name": name.strip(), "color": color, "created_at": now, "count": 0}


async def update_memory_label(label_id: str, name: str | None = None, color: str | None = None) -> bool:
    updates: dict[str, Any] = {}
    if name is not None:
        updates["name"] = name.strip()[:64]
    if color is not None:
        updates["color"] = color
    if not updates:
        return False
    if _use_supabase_data():
        row = await _supabase_update_verified("memory_labels", {"id": f"eq.{label_id}"}, updates)
        return row is not None
    db = await get_db()
    fields = [f"{k} = ?" for k in updates]
    values = list(updates.values()) + [label_id]
    await db.execute(f"UPDATE memory_labels SET {', '.join(fields)} WHERE id = ?", values)
    await db.commit()
    return True


async def delete_memory_label(label_id: str) -> bool:
    if _use_supabase_data():
        await _supabase_delete("memory_label_items", {"label_id": f"eq.{label_id}"})
        return await _supabase_delete_verified("memory_labels", {"id": f"eq.{label_id}"})
    db = await get_db()
    await db.execute("DELETE FROM memory_label_items WHERE label_id = ?", (label_id,))
    await db.execute("DELETE FROM memory_labels WHERE id = ?", (label_id,))
    await db.commit()
    return True


async def assign_memory_to_label(label_id: str, memory_id: str) -> bool:
    now = _now()
    if _use_supabase_data():
        try:
            await _supabase_insert_verified(
                "memory_label_items",
                {"label_id": label_id, "memory_id": memory_id, "created_at": now},
                on_conflict="label_id,memory_id",
                verify_filters={"label_id": f"eq.{label_id}", "memory_id": f"eq.{memory_id}"},
            )
        except Exception:
            return False
        return True
    db = await get_db()
    await db.execute(
        "INSERT OR IGNORE INTO memory_label_items (label_id, memory_id, created_at) VALUES (?,?,?)",
        (label_id, memory_id, now),
    )
    await db.commit()
    return True


async def remove_memory_from_label(label_id: str, memory_id: str) -> bool:
    if _use_supabase_data():
        return await _supabase_delete_verified(
            "memory_label_items",
            {"label_id": f"eq.{label_id}", "memory_id": f"eq.{memory_id}"},
        )
    db = await get_db()
    await db.execute(
        "DELETE FROM memory_label_items WHERE label_id = ? AND memory_id = ?",
        (label_id, memory_id),
    )
    await db.commit()
    return True


async def get_label_memories(label_id: str, limit: int = 60) -> list[dict[str, Any]]:
    if _use_supabase_data():
        item_rows = await _supabase_select(
            "memory_label_items",
            filters={"label_id": f"eq.{label_id}"},
            order="created_at.desc",
            limit=limit,
        )
        memory_ids = [r["memory_id"] for r in item_rows if r.get("memory_id")]
        if not memory_ids:
            return []
        ids_csv = ",".join(memory_ids)
        return await _supabase_select(
            settings.supabase_memories_table,
            filters={"id": f"in.({ids_csv})"},
        )
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT m.* FROM memories m
        JOIN memory_label_items mli ON m.id = mli.memory_id
        WHERE mli.label_id = ?
        ORDER BY mli.created_at DESC
        LIMIT ?
        """,
        (label_id, limit),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def get_amber_stats() -> dict[str, Any]:
    """Global stats: agent links + memories + categories + labels"""
    from datetime import datetime as _dt

    now_str = _now()
    now_dt = _dt.fromisoformat(now_str.replace("Z", "+00:00"))

    if _use_supabase_data():
        # Mem stats logic
        by_category = await _supabase_get_memory_stats(all_agents=True)
        total = sum(by_category.values())

        # Per-agent links stats
        mem_rows = await _supabase_select(
            settings.supabase_memories_table,
            select="agent_id,created_at",
            limit=5000,
        )
        agent_data: dict[str, dict] = {}
        for row in mem_rows:
            aid = row.get("agent_id") or "default"
            ts = row.get("created_at") or now_str
            if aid not in agent_data:
                agent_data[aid] = {"agent_id": aid, "first_at": ts, "last_at": ts, "total": 0}
            agent_data[aid]["total"] += 1
            if ts < agent_data[aid]["first_at"]:
                agent_data[aid]["first_at"] = ts
            if ts > agent_data[aid]["last_at"]:
                agent_data[aid]["last_at"] = ts
        agent_links = []
        for link in sorted(agent_data.values(), key=lambda x: x["first_at"]):
            try:
                first_dt = _dt.fromisoformat(link["first_at"].replace("Z", "+00:00"))
                days = max(0, (now_dt - first_dt).days)
            except Exception:
                days = 0
            agent_links.append({**link, "days": days})

        # Label stats
        label_rows = await _supabase_select("memory_labels", order="created_at.desc")
        item_rows = await _supabase_select("memory_label_items", select="label_id")
        label_counts: dict[str, int] = {}
        for item in item_rows:
            lid = item.get("label_id", "")
            label_counts[lid] = label_counts.get(lid, 0) + 1
        labels = [{**r, "count": label_counts.get(r["id"], 0)} for r in label_rows]

        return {"agent_links": agent_links, "total": total, "by_category": by_category, "labels": labels}

    # SQLite path
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT agent_id,
               MIN(created_at) AS first_at,
               MAX(created_at) AS last_at,
               COUNT(*) AS total
        FROM memories
        GROUP BY agent_id
        ORDER BY MIN(created_at) ASC
        """
    )
    rows = await cursor.fetchall()
    agent_links = []
    for row in rows:
        first_at = row["first_at"] or now_str
        try:
            first_dt = _dt.fromisoformat(first_at.replace("Z", "+00:00"))
            days = max(0, (now_dt - first_dt).days)
        except Exception:
            days = 0
        agent_links.append(
            {"agent_id": row["agent_id"], "first_at": first_at, "last_at": row["last_at"] or first_at,
             "days": days, "total": row["total"]}
        )

    cursor = await db.execute(
        "SELECT category, COUNT(*) AS count FROM memories GROUP BY category ORDER BY count DESC"
    )
    rows = await cursor.fetchall()
    by_category = {row["category"]: row["count"] for row in rows}
    total = sum(by_category.values())

    cursor = await db.execute(
        """
        SELECT ml.id, ml.name, ml.color, ml.created_at,
               COUNT(mli.memory_id) AS count
        FROM memory_labels ml
        LEFT JOIN memory_label_items mli ON ml.id = mli.label_id
        GROUP BY ml.id
        ORDER BY ml.created_at DESC
        """
    )
    rows = await cursor.fetchall()
    labels = [dict(row) for row in rows]

    return {"agent_links": agent_links, "total": total, "by_category": by_category, "labels": labels}


# ==================== Context Summaries ====================

async def add_context_summary(session_id: str, summary: str, msg_start: str = "", msg_end: str = "") -> dict[str, Any]:
    if _use_supabase_data():
        sid = _new_id()
        now = _now()
        payload = {
            "id": sid,
            "session_id": session_id,
            "summary": summary,
            "msg_range_start": msg_start,
            "msg_range_end": msg_end,
            "created_at": now,
        }
        return await _supabase_insert_verified(settings.supabase_context_summaries_table, payload)
    db = await get_db()
    sid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO context_summaries (id, session_id, summary, msg_range_start, msg_range_end, created_at) VALUES (?,?,?,?,?,?)",
        (sid, session_id, summary, msg_start, msg_end, now),
    )
    await db.commit()
    return {"id": sid, "session_id": session_id, "summary": summary, "created_at": now}


async def get_context_summaries(session_id: str, limit: int = 5) -> list[dict[str, Any]]:
    if _use_supabase_data():
        return await _supabase_select(
            settings.supabase_context_summaries_table,
            filters={"session_id": f"eq.{session_id}"},
            order="created_at.desc",
            limit=limit,
        )
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM context_summaries WHERE session_id = ? ORDER BY created_at DESC LIMIT ?",
        (session_id, limit),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


def _quick_summarize_messages(messages: list[dict[str, Any]], max_chars_per_line: int = 120) -> str:
    lines: list[str] = []
    for msg in messages:
        role = msg.get("role", "")
        role_cn = "user" if role == "user" else "AI"
        content = (msg.get("content") or "").replace("\n", " ").strip()
        if len(content) > max_chars_per_line:
            content = content[:max_chars_per_line].rstrip() + "..."
        lines.append(f"[{role_cn}] {content}")
    return "Session summary:\n" + "\n".join(lines)


async def ensure_context_summary(
    session_id: str,
    trigger_messages: int = 24,
    keep_recent_messages: int = 12,
    min_batch_messages: int = 8,
) -> bool:
    """Generate incremental summary for long session"""
    messages = await get_messages(session_id=session_id, limit=1000)
    if len(messages) < max(trigger_messages, keep_recent_messages + min_batch_messages):
        return False

    last_end_id = ""
    summaries = await get_context_summaries(session_id=session_id, limit=1)
    if summaries and summaries[0].get("msg_range_end"):
        last_end_id = summaries[0]["msg_range_end"]

    start_idx = 0
    if last_end_id:
        for i, msg in enumerate(messages):
            if msg["id"] == last_end_id:
                start_idx = i + 1
                break

    new_messages = messages[start_idx:]
    if len(new_messages) <= keep_recent_messages:
        return False

    to_summarize = new_messages[:-keep_recent_messages]
    if len(to_summarize) < min_batch_messages:
        return False

    summary_text = _quick_summarize_messages(to_summarize)
    await add_context_summary(
        session_id=session_id,
        summary=summary_text,
        msg_start=to_summarize[0]["id"],
        msg_end=to_summarize[-1]["id"],
    )
    logger.info(
        "Context summary created: session=%s batch=%s keep_recent=%s",
        session_id,
        len(to_summarize),
        keep_recent_messages,
    )
    return True


# ==================== Todos ====================

async def add_todo(content: str, due_date: str = "", tags: str = "") -> dict[str, Any]:
    if _use_supabase_data():
        tid = _new_id()
        now = _now()
        payload = {
            "id": tid,
            "content": content,
            "due_date": due_date,
            "status": "pending",
            "tags": tags,
            "created_at": now,
            "updated_at": now,
        }
        return await _supabase_insert_verified(settings.supabase_todos_table, payload)
    db = await get_db()
    tid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO todos (id, content, due_date, status, tags, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
        (tid, content, due_date, "pending", tags, now, now),
    )
    await db.commit()
    return {"id": tid, "content": content, "due_date": due_date, "status": "pending", "tags": tags, "created_at": now}


async def list_todos(status: str = None, limit: int = 50) -> list[dict[str, Any]]:
    if _use_supabase_data():
        filters = {"status": f"eq.{status}"} if status else None
        return await _supabase_select(settings.supabase_todos_table, filters=filters, order="created_at.desc", limit=limit)
    db = await get_db()
    if status:
        cursor = await db.execute("SELECT * FROM todos WHERE status = ? ORDER BY created_at DESC LIMIT ?", (status, limit))
    else:
        cursor = await db.execute("SELECT * FROM todos ORDER BY created_at DESC LIMIT ?", (limit,))
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def update_todo(todo_id: str, **kwargs) -> bool:
    if _use_supabase_data():
        payload = dict(kwargs)
        payload["updated_at"] = _now()
        rows = await _supabase_update(settings.supabase_todos_table, {"id": f"eq.{todo_id}"}, payload)
        return len(rows) > 0
    db = await get_db()
    kwargs["updated_at"] = _now()
    sets = ", ".join(f"{k} = ?" for k in kwargs)
    vals = list(kwargs.values()) + [todo_id]
    result = await db.execute(f"UPDATE todos SET {sets} WHERE id = ?", vals)
    await db.commit()
    return result.rowcount > 0


async def delete_todo(todo_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_delete(settings.supabase_todos_table, {"id": f"eq.{todo_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    await db.commit()
    return result.rowcount > 0


# ==================== Notes ====================

async def add_note(content: str, tags: str = "", date: str = None) -> dict[str, Any]:
    if _use_supabase_data():
        nid = _new_id()
        now = _now()
        if not date:
            date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        payload = {"id": nid, "content": content, "tags": tags, "date": date, "created_at": now}
        return await _supabase_insert_verified(settings.supabase_notes_table, payload)
    db = await get_db()
    nid = _new_id()
    now = _now()
    if not date:
        date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    await db.execute(
        "INSERT INTO notes (id, content, tags, date, created_at) VALUES (?,?,?,?,?)",
        (nid, content, tags, date, now),
    )
    await db.commit()
    return {"id": nid, "content": content, "tags": tags, "date": date, "created_at": now}


async def list_notes(date: str = None, tags: str = None, limit: int = 50) -> list[dict[str, Any]]:
    if _use_supabase_data():
        filters: dict[str, str] = {}
        if date:
            filters["date"] = f"eq.{date}"
        if tags:
            filters["tags"] = f"ilike.*{tags}*"
        return await _supabase_select(
            settings.supabase_notes_table,
            filters=filters or None,
            order="created_at.desc",
            limit=limit,
        )
    db = await get_db()
    query = "SELECT * FROM notes"
    params = []
    conditions = []
    if date:
        conditions.append("date = ?")
        params.append(date)
    if tags:
        conditions.append("tags LIKE ?")
        params.append(f"%{tags}%")
    if conditions:
        query += " WHERE " + " AND ".join(conditions)
    query += " ORDER BY created_at DESC LIMIT ?"
    params.append(limit)
    cursor = await db.execute(query, params)
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def delete_note(note_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_delete(settings.supabase_notes_table, {"id": f"eq.{note_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    await db.commit()
    return result.rowcount > 0


# ==================== Diary ====================

async def _list_legacy_diary_rows() -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select(settings.supabase_diary_table, order="created_at.asc", limit=1000)
        for row in rows:
            row["agent_id"] = normalize_agent_id(row.get("agent_id"))
            row["visibility"] = normalize_visibility(row.get("visibility") or "private")
        return rows
    db = await get_db()
    cursor = await db.execute("SELECT * FROM diary ORDER BY created_at ASC")
    rows = await cursor.fetchall()
    result = [dict(row) for row in rows]
    for row in result:
        row["agent_id"] = normalize_agent_id(row.get("agent_id"))
        row["visibility"] = normalize_visibility(row.get("visibility") or "private")
    return result


async def _get_diary_notebook_row(notebook_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_diary_notebooks_table,
            filters={"id": f"eq.{notebook_id}"},
            limit=1,
        )
        return _normalize_diary_notebook_row(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT n.*, COUNT(e.id) AS entry_count
        FROM diary_notebooks n
        LEFT JOIN diary_entries e ON e.notebook_id = n.id
        WHERE n.id = ?
        GROUP BY n.id
        LIMIT 1
        """,
        (notebook_id,),
    )
    row = await cursor.fetchone()
    return _normalize_diary_notebook_row(dict(row) if row else None)


async def _create_diary_notebook_record(
    *,
    notebook_id: str,
    author_type: str,
    author_id: str,
    name: str,
    description: str = "",
    visibility: str = "private",
    is_default: bool = False,
) -> dict[str, Any]:
    now = _now()
    payload = {
        "id": notebook_id,
        "author_type": normalize_subject_type(author_type),
        "author_id": normalize_subject_id(author_type, author_id),
        "name": (name or "").strip() or _default_diary_notebook_name(author_type, author_id),
        "description": str(description or "").strip(),
        "visibility": normalize_visibility(visibility),
        "is_default": bool(is_default),
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(
            settings.supabase_diary_notebooks_table,
            payload,
            on_conflict="id",
        )
        return _normalize_diary_notebook_row(row) or row
    db = await get_db()
    await db.execute(
        """
        INSERT OR IGNORE INTO diary_notebooks
        (id, author_type, author_id, name, description, visibility, is_default, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["author_type"],
            payload["author_id"],
            payload["name"],
            payload["description"],
            payload["visibility"],
            1 if payload["is_default"] else 0,
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    return (await _get_diary_notebook_row(notebook_id)) or payload


async def _create_diary_entry_record(
    *,
    entry_id: str,
    notebook_id: str,
    title: str,
    content: str,
    tags: str = "",
    created_at: str | None = None,
    updated_at: str | None = None,
) -> dict[str, Any]:
    created = created_at or _now()
    updated = updated_at or created
    payload = {
        "id": entry_id,
        "notebook_id": notebook_id,
        "title": (title or "").strip(),
        "content": content,
        "tags": tags,
        "created_at": created,
        "updated_at": updated,
    }
    if _use_supabase_data():
        return await _supabase_insert_verified(settings.supabase_diary_entries_table, payload, on_conflict="id")
    db = await get_db()
    await db.execute(
        """
        INSERT OR IGNORE INTO diary_entries
        (id, notebook_id, title, content, tags, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["notebook_id"],
            payload["title"],
            payload["content"],
            payload["tags"],
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    return payload


async def _ensure_default_user_diary_notebook() -> dict[str, Any]:
    author_type, author_id = _current_user_subject()
    notebook_id = _default_diary_notebook_id(author_type, author_id)
    existing = await _get_diary_notebook_row(notebook_id)
    if existing:
        return existing
    return await _create_diary_notebook_record(
        notebook_id=notebook_id,
        author_type=author_type,
        author_id=author_id,
        name=_default_diary_notebook_name(author_type, author_id),
        visibility="private",
        is_default=True,
    )


async def _ensure_diary_bootstrap() -> None:
    await _ensure_default_user_diary_notebook()
    legacy_rows = await _list_legacy_diary_rows()
    if not legacy_rows:
        return
    grouped: dict[str, list[dict[str, Any]]] = {}
    for row in legacy_rows:
        grouped.setdefault(normalize_agent_id(row.get("agent_id")), []).append(row)
    for agent_id, rows in grouped.items():
        notebook_id = _default_diary_notebook_id("agent", agent_id)
        visibility = normalize_visibility(rows[0].get("visibility") or "private")
        await _create_diary_notebook_record(
            notebook_id=notebook_id,
            author_type="agent",
            author_id=agent_id,
            name=_default_diary_notebook_name("agent", agent_id),
            visibility=visibility,
            is_default=True,
        )
        for row in rows:
            await _create_diary_entry_record(
                entry_id=str(row.get("id") or _new_id()),
                notebook_id=notebook_id,
                title=str(row.get("title") or ""),
                content=str(row.get("content") or ""),
                tags=str(row.get("tags") or ""),
                created_at=str(row.get("created_at") or _now()),
                updated_at=str(row.get("updated_at") or row.get("created_at") or _now()),
            )


async def list_diary_notebooks() -> list[dict[str, Any]]:
    await _ensure_diary_bootstrap()
    if _use_supabase_data():
        notebooks = [
            _normalize_diary_notebook_row(row)
            for row in await _supabase_select(settings.supabase_diary_notebooks_table, order="updated_at.desc", limit=200)
        ]
        notebooks = [row for row in notebooks if row]
        if notebooks:
            counts = await _supabase_select(settings.supabase_diary_entries_table, select="id,notebook_id", limit=1000)
            count_map: dict[str, int] = {}
            for row in counts:
                notebook_id = str(row.get("notebook_id") or "")
                count_map[notebook_id] = count_map.get(notebook_id, 0) + 1
            for notebook in notebooks:
                notebook["entry_count"] = count_map.get(str(notebook.get("id") or ""), 0)
        notebooks.sort(key=lambda item: item.get("updated_at") or "", reverse=True)
        notebooks.sort(key=lambda item: 0 if item.get("is_default") else 1)
        notebooks.sort(key=lambda item: 0 if item["author_type"] == "user" else 1)
        return notebooks
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT n.*, COUNT(e.id) AS entry_count
        FROM diary_notebooks n
        LEFT JOIN diary_entries e ON e.notebook_id = n.id
        GROUP BY n.id
        ORDER BY CASE WHEN n.author_type = 'user' THEN 0 ELSE 1 END ASC,
                 n.is_default DESC,
                 n.updated_at DESC
        """
    )
    rows = await cursor.fetchall()
    return [row for row in (_normalize_diary_notebook_row(dict(item)) for item in rows) if row]


async def update_diary_notebook(
    notebook_id: str,
    *,
    name: str | None = None,
    description: str | None = None,
    visibility: str | None = None,
    is_default: bool | None = None,
) -> dict[str, Any] | None:
    notebook = await _get_diary_notebook_row(notebook_id)
    if not notebook or not _diary_notebook_is_editable(notebook):
        return None
    payload: dict[str, Any] = {"updated_at": _now()}
    if name is not None:
        payload["name"] = str(name or "").strip() or notebook["name"]
    if description is not None:
        payload["description"] = str(description or "").strip()
    if visibility is not None:
        payload["visibility"] = normalize_visibility(visibility)
    if is_default is not None:
        payload["is_default"] = bool(is_default)
    if bool(is_default):
        author_type = notebook["author_type"]
        author_id = notebook["author_id"]
        if _use_supabase_data():
            await _supabase_update(
                settings.supabase_diary_notebooks_table,
                {"author_type": f"eq.{author_type}", "author_id": f"eq.{author_id}", "is_default": "eq.true"},
                {"is_default": False, "updated_at": payload["updated_at"]},
            )
        else:
            db = await get_db()
            await db.execute(
                "UPDATE diary_notebooks SET is_default = 0, updated_at = ? WHERE author_type = ? AND author_id = ? AND is_default = 1",
                (payload["updated_at"], author_type, author_id),
            )
            await db.commit()
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook_id}"}, payload)
        return _normalize_diary_notebook_row(row)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = [1 if value is True else 0 if value is False and key == "is_default" else value for key, value in payload.items()]
    values.append(notebook_id)
    await db.execute(f"UPDATE diary_notebooks SET {sets} WHERE id = ?", values)
    await db.commit()
    return await _get_diary_notebook_row(notebook_id)


def _diary_notebook_belongs_to_agent(notebook: dict[str, Any] | None, agent_id: str | None) -> bool:
    if not notebook:
        return False
    return (
        normalize_subject_type(notebook.get("author_type")) == "agent"
        and normalize_subject_id("agent", notebook.get("author_id")) == normalize_agent_id(agent_id)
    )


async def create_agent_diary_notebook(
    agent_id: str | None,
    *,
    name: str = "",
    description: str = "",
    visibility: str = "private",
    is_default: bool = False,
) -> dict[str, Any]:
    normalized_agent = await resolve_agent_id(agent_id=agent_id, purpose="create_agent_diary_notebook")
    now = _now()
    notebook_id = _default_diary_notebook_id("agent", normalized_agent) if is_default else _new_id()
    if is_default:
        if _use_supabase_data():
            await _supabase_update(
                settings.supabase_diary_notebooks_table,
                {"author_type": "eq.agent", "author_id": f"eq.{normalized_agent}", "is_default": "eq.true"},
                {"is_default": False, "updated_at": now},
            )
        else:
            db = await get_db()
            await db.execute(
                "UPDATE diary_notebooks SET is_default = 0, updated_at = ? WHERE author_type = 'agent' AND author_id = ? AND is_default = 1",
                (now, normalized_agent),
            )
            await db.commit()
    return await _create_diary_notebook_record(
        notebook_id=notebook_id,
        author_type="agent",
        author_id=normalized_agent,
        name=name or _default_diary_notebook_name("agent", normalized_agent),
        description=description,
        visibility=visibility,
        is_default=is_default,
    )


async def update_agent_diary_notebook(
    notebook_id: str,
    agent_id: str | None,
    *,
    name: str | None = None,
    description: str | None = None,
    visibility: str | None = None,
    is_default: bool | None = None,
) -> dict[str, Any] | None:
    await require_agent(agent_id)
    notebook = await _get_diary_notebook_row(notebook_id)
    if not _diary_notebook_belongs_to_agent(notebook, agent_id):
        return None
    payload: dict[str, Any] = {"updated_at": _now()}
    if name is not None:
        payload["name"] = str(name or "").strip() or notebook["name"]
    if description is not None:
        payload["description"] = str(description or "").strip()
    if visibility is not None:
        payload["visibility"] = normalize_visibility(visibility)
    if is_default is not None:
        payload["is_default"] = bool(is_default)
    if bool(is_default):
        normalized_agent = normalize_agent_id(agent_id)
        if _use_supabase_data():
            await _supabase_update(
                settings.supabase_diary_notebooks_table,
                {"author_type": "eq.agent", "author_id": f"eq.{normalized_agent}", "is_default": "eq.true"},
                {"is_default": False, "updated_at": payload["updated_at"]},
            )
        else:
            db = await get_db()
            await db.execute(
                "UPDATE diary_notebooks SET is_default = 0, updated_at = ? WHERE author_type = 'agent' AND author_id = ? AND is_default = 1",
                (payload["updated_at"], normalized_agent),
            )
            await db.commit()
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook_id}"}, payload)
        return _normalize_diary_notebook_row(row)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = [1 if value is True else 0 if value is False and key == "is_default" else value for key, value in payload.items()]
    values.append(notebook_id)
    await db.execute(f"UPDATE diary_notebooks SET {sets} WHERE id = ?", values)
    await db.commit()
    return await _get_diary_notebook_row(notebook_id)


async def _get_diary_entry_row(entry_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select(settings.supabase_diary_entries_table, filters={"id": f"eq.{entry_id}"}, limit=1)
        return rows[0] if rows else None
    db = await get_db()
    cursor = await db.execute("SELECT * FROM diary_entries WHERE id = ? LIMIT 1", (entry_id,))
    row = await cursor.fetchone()
    return dict(row) if row else None


async def list_diary_comments(entry_id: str) -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_diary_comments_table,
            filters={"entry_id": f"eq.{entry_id}"},
            order="created_at.asc",
            limit=200,
        )
        return [row for row in (_normalize_diary_comment_row(item) for item in rows) if row]
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM diary_comments WHERE entry_id = ? ORDER BY created_at ASC",
        (entry_id,),
    )
    rows = await cursor.fetchall()
    return [row for row in (_normalize_diary_comment_row(dict(item)) for item in rows) if row]


async def list_diary_annotations(entry_id: str) -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_diary_annotations_table,
            filters={"entry_id": f"eq.{entry_id}"},
            order="start_offset.asc,created_at.asc",
            limit=300,
        )
        return [row for row in (_normalize_diary_annotation_row(item) for item in rows) if row]
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM diary_annotations WHERE entry_id = ? ORDER BY start_offset ASC, created_at ASC",
        (entry_id,),
    )
    rows = await cursor.fetchall()
    return [row for row in (_normalize_diary_annotation_row(dict(item)) for item in rows) if row]


async def list_diary_entries(notebook_id: str, limit: int = 100) -> list[dict[str, Any]]:
    await _ensure_diary_bootstrap()
    notebook = await _get_diary_notebook_row(notebook_id)
    if not notebook:
        return []
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_diary_entries_table,
            filters={"notebook_id": f"eq.{notebook_id}"},
            order="updated_at.desc",
            limit=limit,
        )
    else:
        db = await get_db()
        cursor = await db.execute(
            "SELECT * FROM diary_entries WHERE notebook_id = ? ORDER BY updated_at DESC LIMIT ?",
            (notebook_id, limit),
        )
        rows = [dict(row) for row in await cursor.fetchall()]
    entries: list[dict[str, Any]] = []
    for row in rows:
        entry_id = str(row.get("id") or "")
        comments = await list_diary_comments(entry_id)
        annotations = await list_diary_annotations(entry_id)
        normalized = _normalize_diary_entry_row(row, notebook=notebook, comments=comments, annotations=annotations)
        if normalized:
            entries.append(normalized)
    return entries


async def create_diary_entry(notebook_id: str, *, title: str = "", content: str, tags: str = "") -> dict[str, Any] | None:
    notebook = await _get_diary_notebook_row(notebook_id)
    if not notebook or not _diary_notebook_is_editable(notebook):
        return None
    now = _now()
    payload = {
        "id": _new_id(),
        "notebook_id": notebook_id,
        "title": (title or "").strip(),
        "content": content,
        "tags": tags,
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_diary_entries_table, payload)
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook_id}"}, {"updated_at": now})
        return _normalize_diary_entry_row(row, notebook=notebook, comments=[], annotations=[])
    db = await get_db()
    await db.execute(
        """
        INSERT INTO diary_entries (id, notebook_id, title, content, tags, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["notebook_id"],
            payload["title"],
            payload["content"],
            payload["tags"],
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook_id))
    await db.commit()
    return _normalize_diary_entry_row(payload, notebook=notebook, comments=[], annotations=[])


async def create_agent_diary_entry(
    notebook_id: str,
    agent_id: str | None,
    *,
    title: str = "",
    content: str,
    tags: str = "",
) -> dict[str, Any] | None:
    await require_agent(agent_id)
    notebook = await _get_diary_notebook_row(notebook_id)
    if not _diary_notebook_belongs_to_agent(notebook, agent_id):
        return None
    now = _now()
    entry = await _create_diary_entry_record(
        entry_id=_new_id(),
        notebook_id=notebook_id,
        title=title,
        content=content,
        tags=tags,
        created_at=now,
        updated_at=now,
    )
    if _use_supabase_data():
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook_id}"}, {"updated_at": now})
    else:
        db = await get_db()
        await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook_id))
        await db.commit()
    return _normalize_diary_entry_row(entry, notebook=notebook, comments=[], annotations=[]) or entry


async def update_agent_diary_entry(
    entry_id: str,
    agent_id: str | None,
    *,
    title: str | None = None,
    content: str | None = None,
    tags: str | None = None,
) -> dict[str, Any] | None:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return None
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not _diary_notebook_belongs_to_agent(notebook, agent_id):
        return None
    payload: dict[str, Any] = {"updated_at": _now()}
    if title is not None:
        payload["title"] = (title or "").strip()
    if content is not None:
        payload["content"] = content
    if tags is not None:
        payload["tags"] = tags
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_diary_entries_table, {"id": f"eq.{entry_id}"}, payload)
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": payload["updated_at"]})
        comments = await list_diary_comments(entry_id)
        annotations = await list_diary_annotations(entry_id)
        return _normalize_diary_entry_row(row, notebook=notebook, comments=comments, annotations=annotations)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = list(payload.values()) + [entry_id]
    await db.execute(f"UPDATE diary_entries SET {sets} WHERE id = ?", values)
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (payload["updated_at"], notebook["id"]))
    await db.commit()
    updated_row = await _get_diary_entry_row(entry_id)
    comments = await list_diary_comments(entry_id)
    annotations = await list_diary_annotations(entry_id)
    return _normalize_diary_entry_row(updated_row, notebook=notebook, comments=comments, annotations=annotations)


async def delete_agent_diary_entry(entry_id: str, agent_id: str | None) -> bool:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return False
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not _diary_notebook_belongs_to_agent(notebook, agent_id):
        return False
    now = _now()
    if _use_supabase_data():
        await _supabase_delete(settings.supabase_diary_annotations_table, {"entry_id": f"eq.{entry_id}"})
        await _supabase_delete(settings.supabase_diary_comments_table, {"entry_id": f"eq.{entry_id}"})
        deleted = await _supabase_delete_verified(settings.supabase_diary_entries_table, {"id": f"eq.{entry_id}"})
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": now})
        return deleted
    db = await get_db()
    await db.execute("DELETE FROM diary_annotations WHERE entry_id = ?", (entry_id,))
    await db.execute("DELETE FROM diary_comments WHERE entry_id = ?", (entry_id,))
    result = await db.execute("DELETE FROM diary_entries WHERE id = ?", (entry_id,))
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook["id"]))
    await db.commit()
    return result.rowcount > 0


async def update_diary_entry(entry_id: str, *, title: str | None = None, content: str | None = None, tags: str | None = None) -> dict[str, Any] | None:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return None
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not notebook or not _diary_notebook_is_editable(notebook):
        return None
    payload: dict[str, Any] = {"updated_at": _now()}
    if title is not None:
        payload["title"] = (title or "").strip()
    if content is not None:
        payload["content"] = content
    if tags is not None:
        payload["tags"] = tags
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_diary_entries_table, {"id": f"eq.{entry_id}"}, payload)
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": payload["updated_at"]})
        comments = await list_diary_comments(entry_id)
        return _normalize_diary_entry_row(row, notebook=notebook, comments=comments)
    db = await get_db()
    sets = ", ".join(f"{key} = ?" for key in payload)
    values = list(payload.values()) + [entry_id]
    await db.execute(f"UPDATE diary_entries SET {sets} WHERE id = ?", values)
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (payload["updated_at"], notebook["id"]))
    await db.commit()
    updated_row = await _get_diary_entry_row(entry_id)
    comments = await list_diary_comments(entry_id)
    return _normalize_diary_entry_row(updated_row, notebook=notebook, comments=comments)


async def delete_diary_entry(entry_id: str) -> bool:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return False
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not notebook or not _diary_notebook_is_editable(notebook):
        return False
    now = _now()
    if _use_supabase_data():
        await _supabase_delete(settings.supabase_diary_comments_table, {"entry_id": f"eq.{entry_id}"})
        deleted = await _supabase_delete_verified(settings.supabase_diary_entries_table, {"id": f"eq.{entry_id}"})
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": now})
        return deleted
    db = await get_db()
    await db.execute("DELETE FROM diary_comments WHERE entry_id = ?", (entry_id,))
    result = await db.execute("DELETE FROM diary_entries WHERE id = ?", (entry_id,))
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook["id"]))
    await db.commit()
    return result.rowcount > 0


async def add_diary_comment(
    entry_id: str,
    *,
    content: str,
    author_type: str | None = None,
    author_id: str | None = None,
) -> dict[str, Any] | None:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return None
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not notebook or not _diary_notebook_can_comment(notebook):
        return None
    fallback_author_type, fallback_author_id = _current_user_subject()
    author_type = normalize_subject_type(author_type or fallback_author_type)
    author_id = normalize_subject_id(author_type, author_id or fallback_author_id)
    if author_type == "agent":
        author_id = await require_agent(author_id)
    now = _now()
    payload = {
        "id": _new_id(),
        "entry_id": entry_id,
        "author_type": author_type,
        "author_id": author_id,
        "content": content,
        "created_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_diary_comments_table, payload)
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": now})
        return _normalize_diary_comment_row(row)
    db = await get_db()
    await db.execute(
        """
        INSERT INTO diary_comments (id, entry_id, author_type, author_id, content, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["entry_id"],
            payload["author_type"],
            payload["author_id"],
            payload["content"],
            payload["created_at"],
        ),
    )
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook["id"]))
    await db.commit()
    return _normalize_diary_comment_row(payload)


async def add_diary_underline(
    entry_id: str,
    *,
    start_offset: int,
    end_offset: int,
    author_type: str | None = None,
    author_id: str | None = None,
    note: str = "",
) -> dict[str, Any] | None:
    row = await _get_diary_entry_row(entry_id)
    if not row:
        return None
    notebook = await _get_diary_notebook_row(str(row.get("notebook_id") or ""))
    if not notebook:
        return None
    content = str(row.get("content") or "")
    start = max(0, min(len(content), int(start_offset)))
    end = max(start, min(len(content), int(end_offset)))
    if end <= start:
        return None
    fallback_author_type, fallback_author_id = _current_user_subject()
    normalized_author_type = normalize_subject_type(author_type or fallback_author_type)
    normalized_author_id = normalize_subject_id(normalized_author_type, author_id or fallback_author_id)
    if normalized_author_type == "agent":
        normalized_author_id = await require_agent(normalized_author_id)
    now = _now()
    payload = {
        "id": _new_id(),
        "entry_id": entry_id,
        "author_type": normalized_author_type,
        "author_id": normalized_author_id,
        "kind": "underline",
        "start_offset": start,
        "end_offset": end,
        "text": content[start:end],
        "note": str(note or "").strip(),
        "created_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_diary_annotations_table, payload)
        await _supabase_update(settings.supabase_diary_notebooks_table, {"id": f"eq.{notebook['id']}"}, {"updated_at": now})
        return _normalize_diary_annotation_row(row)
    db = await get_db()
    await db.execute(
        """
        INSERT INTO diary_annotations
        (id, entry_id, author_type, author_id, kind, start_offset, end_offset, text, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["entry_id"],
            payload["author_type"],
            payload["author_id"],
            payload["kind"],
            payload["start_offset"],
            payload["end_offset"],
            payload["text"],
            payload["note"],
            payload["created_at"],
        ),
    )
    await db.execute("UPDATE diary_notebooks SET updated_at = ? WHERE id = ?", (now, notebook["id"]))
    await db.commit()
    return _normalize_diary_annotation_row(payload)


# compatibility wrappers
async def add_diary(
    content: str,
    *,
    agent_id: str | None = None,
    title: str = "",
    tags: str = "",
    visibility: str = "private",
    source_agent_id: str | None = None,
) -> dict[str, Any]:
    await _ensure_diary_bootstrap()
    normalized_agent = await resolve_agent_id(agent_id=agent_id, purpose="add_diary")
    notebook_id = _default_diary_notebook_id("agent", normalized_agent)
    notebook = await _get_diary_notebook_row(notebook_id)
    if not notebook:
        notebook = await _create_diary_notebook_record(
            notebook_id=notebook_id,
            author_type="agent",
            author_id=normalized_agent,
            name=_default_diary_notebook_name("agent", normalized_agent),
            visibility=visibility,
            is_default=True,
        )
    entry = await _create_diary_entry_record(
        entry_id=_new_id(),
        notebook_id=notebook_id,
        title=title,
        content=content,
        tags=tags,
    )
    return _normalize_diary_entry_row(entry, notebook=notebook, comments=[]) or entry


async def list_diary(agent_id: str | None = None, limit: int = 50) -> list[dict[str, Any]]:
    await _ensure_diary_bootstrap()
    notebook_id = _default_diary_notebook_id("agent", normalize_agent_id(agent_id))
    return await list_diary_entries(notebook_id, limit=limit)


async def update_diary(diary_id: str, *, agent_id: str | None = None, **kwargs) -> bool:
    entry = await update_diary_entry(
        diary_id,
        title=kwargs.get("title"),
        content=kwargs.get("content"),
        tags=kwargs.get("tags"),
    )
    return entry is not None


async def delete_diary(diary_id: str, *, agent_id: str | None = None) -> bool:
    return await delete_diary_entry(diary_id)


# ==================== Moments ====================

async def list_moments(
    limit: int = 100,
    *,
    viewer_type: str | None = None,
    viewer_id: str | None = None,
) -> list[dict[str, Any]]:
    normalized_viewer_type = normalize_subject_type(viewer_type or "user")
    normalized_viewer_id = normalize_subject_id(normalized_viewer_type, viewer_id)
    if _use_supabase_data():
        filters = {
            "or": (
                f"visibility.eq.public,"
                f"and(visibility.eq.private,author_type.eq.{normalized_viewer_type},author_id.eq.{normalized_viewer_id}),"
                f"and(visibility.eq.shared,author_type.eq.{normalized_viewer_type},author_id.eq.{normalized_viewer_id})"
            )
        }
        rows = await _supabase_select(settings.supabase_moments_table, filters=filters, order="created_at.desc", limit=limit)
        return [item for item in (_normalize_moment_row(row) for row in rows) if item]
    db = await get_db()
    cursor = await db.execute(
        """
        SELECT * FROM moments
        WHERE visibility = 'public'
           OR (visibility IN ('private', 'shared') AND author_type = ? AND author_id = ?)
        ORDER BY created_at DESC
        LIMIT ?
        """,
        (normalized_viewer_type, normalized_viewer_id, limit),
    )
    rows = await cursor.fetchall()
    return [item for item in (_normalize_moment_row(dict(row)) for row in rows) if item]


async def get_moment(moment_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select(settings.supabase_moments_table, filters={"id": f"eq.{moment_id}"}, limit=1)
        return _normalize_moment_row(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute("SELECT * FROM moments WHERE id = ? LIMIT 1", (moment_id,))
    row = await cursor.fetchone()
    return _normalize_moment_row(dict(row) if row else None)


async def add_moment(
    *,
    author_type: str,
    author_id: str,
    visibility: str = "public",
    content: str,
    image: str = "",
    mood: str = "",
) -> dict[str, Any]:
    now = _now()
    payload = {
        "id": _new_id(),
        "author_type": normalize_subject_type(author_type),
        "author_id": normalize_subject_id(author_type, author_id),
        "visibility": normalize_visibility(visibility or "public"),
        "content": content,
        "image": image,
        "mood": mood,
        "likes_json": [],
        "comments_json": [],
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(settings.supabase_moments_table, payload)
        return _normalize_moment_row(row) or row
    db = await get_db()
    await db.execute(
        """
        INSERT INTO moments (id, author_type, author_id, visibility, content, image, mood, likes_json, comments_json, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["author_type"],
            payload["author_id"],
            payload["visibility"],
            payload["content"],
            payload["image"],
            payload["mood"],
            json.dumps(payload["likes_json"], ensure_ascii=False),
            json.dumps(payload["comments_json"], ensure_ascii=False),
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    return _normalize_moment_row(payload) or payload


async def update_moment(
    moment_id: str,
    *,
    author_type: str,
    author_id: str,
    visibility: str | None = None,
    content: str | None = None,
    image: str | None = None,
    mood: str | None = None,
) -> bool:
    subject_type = normalize_subject_type(author_type)
    subject_id = normalize_subject_id(subject_type, author_id)
    payload: dict[str, Any] = {"updated_at": _now()}
    if visibility is not None:
        payload["visibility"] = normalize_visibility(visibility)
    if content is not None:
        payload["content"] = content
    if image is not None:
        payload["image"] = image
    if mood is not None:
        payload["mood"] = mood
    if _use_supabase_data():
        row = await _supabase_update_verified(
            settings.supabase_moments_table,
            {"id": f"eq.{moment_id}", "author_type": f"eq.{subject_type}", "author_id": f"eq.{subject_id}"},
            payload,
        )
        return row is not None
    db = await get_db()
    sets = ", ".join(f"{k} = ?" for k in payload)
    vals = list(payload.values()) + [moment_id, subject_type, subject_id]
    result = await db.execute(
        f"UPDATE moments SET {sets} WHERE id = ? AND author_type = ? AND author_id = ?",
        vals,
    )
    await db.commit()
    return result.rowcount > 0


async def delete_moment(moment_id: str, *, author_type: str, author_id: str) -> bool:
    subject_type = normalize_subject_type(author_type)
    subject_id = normalize_subject_id(subject_type, author_id)
    if _use_supabase_data():
        return await _supabase_delete_verified(
            settings.supabase_moments_table,
            {"id": f"eq.{moment_id}", "author_type": f"eq.{subject_type}", "author_id": f"eq.{subject_id}"},
        )
    db = await get_db()
    result = await db.execute(
        "DELETE FROM moments WHERE id = ? AND author_type = ? AND author_id = ?",
        (moment_id, subject_type, subject_id),
    )
    await db.commit()
    return result.rowcount > 0


async def toggle_moment_like(moment_id: str, *, actor_type: str, actor_id: str, actor_name: str = "") -> dict[str, Any] | None:
    moment = await get_moment(moment_id)
    if not moment:
        return None
    subject_type = normalize_subject_type(actor_type)
    subject_id = normalize_subject_id(subject_type, actor_id)
    actor = {
        "author_type": subject_type,
        "author_id": subject_id,
        "author_name": str(actor_name or "").strip(),
    }
    likes = list(moment.get("likes") or [])
    existing = next((idx for idx, item in enumerate(likes) if item.get("author_type") == subject_type and item.get("author_id") == subject_id), None)
    if existing is None:
        likes.insert(0, actor)
    else:
        likes.pop(existing)
    payload = {"likes_json": likes, "updated_at": _now()}
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_moments_table, {"id": f"eq.{moment_id}"}, payload)
        return _normalize_moment_row(row)
    db = await get_db()
    await db.execute(
        "UPDATE moments SET likes_json = ?, updated_at = ? WHERE id = ?",
        (json.dumps(likes, ensure_ascii=False), payload["updated_at"], moment_id),
    )
    await db.commit()
    return await get_moment(moment_id)


async def add_moment_comment(
    moment_id: str,
    *,
    actor_type: str,
    actor_id: str,
    actor_name: str = "",
    text: str,
) -> dict[str, Any] | None:
    moment = await get_moment(moment_id)
    if not moment:
        return None
    comments = list(moment.get("comments") or [])
    comments.insert(
        0,
        {
            "id": _new_id(),
            "author_type": normalize_subject_type(actor_type),
            "author_id": normalize_subject_id(actor_type, actor_id),
            "author_name": str(actor_name or "").strip(),
            "text": str(text or "").strip(),
            "created_at": _now(),
        },
    )
    payload = {"comments_json": comments, "updated_at": _now()}
    if _use_supabase_data():
        row = await _supabase_update_verified(settings.supabase_moments_table, {"id": f"eq.{moment_id}"}, payload)
        return _normalize_moment_row(row)
    db = await get_db()
    await db.execute(
        "UPDATE moments SET comments_json = ?, updated_at = ? WHERE id = ?",
        (json.dumps(comments, ensure_ascii=False), payload["updated_at"], moment_id),
    )
    await db.commit()
    return await get_moment(moment_id)


# ==================== Proactive Messages ====================

async def add_proactive_message(
    content: str,
    trigger_reason: str = "",
    agent_id: str = "default",
    output_type: str = "direct_message",
    reason_type: str = "",
    reason_context: str = "",
    source_snapshot_at: str = "",
) -> dict[str, Any]:
    if _use_supabase_data():
        pid = _new_id()
        now = _now()
        payload = {
            "id": pid,
            "content": content,
            "trigger_reason": trigger_reason,
            "status": "pending",
            "created_at": now,
            "agent_id": agent_id,
            "output_type": output_type,
            "reason_type": reason_type,
            "reason_context": reason_context,
            "source_snapshot_at": source_snapshot_at,
            "is_read": 0,
        }
        return await _supabase_insert_verified(settings.supabase_proactive_messages_table, payload)
    db = await get_db()
    pid = _new_id()
    now = _now()
    await db.execute(
        """
        INSERT INTO proactive_messages (
            id, content, trigger_reason, status, created_at,
            agent_id, output_type, reason_type, reason_context, source_snapshot_at, is_read
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
        """,
        (
            pid, content, trigger_reason, "pending", now,
            agent_id, output_type, reason_type, reason_context, source_snapshot_at, 0
        ),
    )
    await db.commit()
    return {
        "id": pid, "content": content, "trigger_reason": trigger_reason, "status": "pending", "created_at": now,
        "agent_id": agent_id, "output_type": output_type, "reason_type": reason_type,
        "reason_context": reason_context, "source_snapshot_at": source_snapshot_at, "is_read": 0,
    }


async def get_last_proactive_time(agent_id: str = "default", output_type: str = "direct_message") -> str:
    """Get last proactive message generation time"""
    normalized_agent_id = normalize_agent_id(agent_id)
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_proactive_messages_table,
            filters={"agent_id": f"eq.{normalized_agent_id}", "output_type": f"eq.{output_type}"},
            select="created_at",
            order="created_at.desc",
            limit=1,
        )
        return rows[0]["created_at"] if rows else ""
    db = await get_db()
    cursor = await db.execute(
        "SELECT created_at FROM proactive_messages WHERE agent_id = ? AND output_type = ? ORDER BY created_at DESC LIMIT 1",
        (normalized_agent_id, output_type)
    )
    row = await cursor.fetchone()
    return row["created_at"] if row else ""


async def get_pending_proactive(limit: int = 10) -> list[dict[str, Any]]:
    if _use_supabase_data():
        return await _supabase_select(
            settings.supabase_proactive_messages_table,
            filters={"status": "eq.pending"},
            order="created_at.desc",
            limit=limit,
        )
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM proactive_messages WHERE status = 'pending' ORDER BY created_at DESC LIMIT ?",
        (limit,),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def mark_proactive_read(msg_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_update(
            settings.supabase_proactive_messages_table,
            {"id": f"eq.{msg_id}"},
            {"status": "read"},
        )
        return len(rows) > 0
    db = await get_db()
    result = await db.execute(
        "UPDATE proactive_messages SET status = 'read' WHERE id = ?",
        (msg_id,),
    )
    await db.commit()
    return result.rowcount > 0


async def count_today_proactive() -> int:
    """Count today proactive messages"""
    if _use_supabase_data():
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        rows = await _supabase_select(
            settings.supabase_proactive_messages_table,
            select="id,created_at",
            order="created_at.desc",
            limit=5000,
        )
        return sum(1 for row in rows if str(row.get("created_at", "")).startswith(today))
    db = await get_db()
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    cursor = await db.execute(
        "SELECT COUNT(*) as cnt FROM proactive_messages WHERE created_at LIKE ?",
        (f"{today}%",),
    )
    row = await cursor.fetchone()
    return row["cnt"] if row else 0


# ==================== Memory Logs ====================

async def add_memory_log(memory_id: str, action: str, detail: str = ""):
    if _use_supabase_data():
        lid = _new_id()
        now = _now()
        await _supabase_insert_verified(
            settings.supabase_memory_logs_table,
            {"id": lid, "memory_id": memory_id, "action": action, "detail": detail, "created_at": now},
        )
        return
    db = await get_db()
    lid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO memory_logs (id, memory_id, action, detail, created_at) VALUES (?,?,?,?,?)",
        (lid, memory_id, action, detail, now),
    )
    await db.commit()


# ==================== Historical Messages ====================

async def get_messages_by_date(date: str, limit: int = 100) -> list[dict[str, Any]]:
    """Get messages by date (YYYY-MM-DD)"""
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_messages_table,
            order="created_at.asc",
            limit=5000,
        )
        sessions = {item["id"]: item for item in await list_sessions()}
        result: list[dict[str, Any]] = []
        for row in rows:
            created_at = str(row.get("created_at", ""))
            if not created_at.startswith(date):
                continue
            item = dict(row)
            item["session_title"] = sessions.get(row.get("session_id"), {}).get("title", "")
            result.append(item)
            if len(result) >= limit:
                break
        return result
    db = await get_db()
    cursor = await db.execute(
        "SELECT m.*, s.title as session_title FROM messages m "
        "LEFT JOIN sessions s ON m.session_id = s.id "
        "WHERE m.created_at LIKE ? ORDER BY m.created_at ASC LIMIT ?",
        (f"{date}%", limit),
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def get_recent_activity_time() -> str:
    """Get recent user activity time"""
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_messages_table,
            filters={"role": "eq.user"},
            select="created_at",
            order="created_at.desc",
            limit=1,
        )
        return rows[0]["created_at"] if rows else ""
    db = await get_db()
    cursor = await db.execute(
        "SELECT created_at FROM messages WHERE role = 'user' ORDER BY created_at DESC LIMIT 1"
    )
    row = await cursor.fetchone()
    return row["created_at"] if row else ""
