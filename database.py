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
_supabase_artifact_items_table_missing = False

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
MEDIA_TYPES = {"book", "music", "image", "cover", "other"}

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
    agent_id    TEXT NOT NULL DEFAULT 'default',
    role        TEXT NOT NULL,
    content     TEXT NOT NULL,
    voice_url   TEXT DEFAULT '',
    model       TEXT DEFAULT '',
    created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_session
    ON messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_agent_session
    ON messages(agent_id, session_id, created_at);

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
    normalized_content TEXT NOT NULL DEFAULT '',
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
CREATE INDEX IF NOT EXISTS idx_memories_agent_normalized
    ON memories(agent_id, normalized_content);
CREATE INDEX IF NOT EXISTS idx_memories_agent_created_at
    ON memories(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_agent_updated_at
    ON memories(agent_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_visibility_updated
    ON memories(visibility, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_memories_temperature
    ON memories(temperature DESC, last_touched_at DESC);

CREATE TABLE IF NOT EXISTS media_items (
    id               TEXT PRIMARY KEY,
    owner_type       TEXT NOT NULL DEFAULT 'user',
    agent_id         TEXT REFERENCES agents(agent_id),
    type             TEXT NOT NULL DEFAULT 'other',
    title            TEXT NOT NULL DEFAULT '',
    artist           TEXT NOT NULL DEFAULT '',
    album            TEXT NOT NULL DEFAULT '',
    author           TEXT NOT NULL DEFAULT '',
    storage_provider TEXT NOT NULL DEFAULT 'r2',
    storage_key      TEXT NOT NULL,
    cover_key        TEXT NOT NULL DEFAULT '',
    mime_type        TEXT NOT NULL DEFAULT '',
    size_bytes       INTEGER,
    duration_seconds REAL,
    metadata         TEXT NOT NULL DEFAULT '{}',
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_items_agent_type
    ON media_items(agent_id, type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_items_owner_type
    ON media_items(owner_type, type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_items_type_created
    ON media_items(type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_items_storage_key
    ON media_items(storage_key);

-- ========== new tables ==========

CREATE TABLE IF NOT EXISTS context_summaries (
    id              TEXT PRIMARY KEY,
    session_id      TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    agent_id        TEXT NOT NULL DEFAULT 'default',
    summary         TEXT NOT NULL,
    msg_range_start TEXT,
    msg_range_end   TEXT,
    created_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conversation_partitions (
    id                 TEXT PRIMARY KEY,
    agent_id           TEXT NOT NULL,
    session_id         TEXT NOT NULL DEFAULT '',
    rp_room_id         TEXT NOT NULL DEFAULT '',
    mode               TEXT NOT NULL DEFAULT 'chat',
    summary_text       TEXT NOT NULL DEFAULT '',
    summary_revision   TEXT NOT NULL DEFAULT '',
    history_a          TEXT NOT NULL DEFAULT '[]',
    history_b          TEXT NOT NULL DEFAULT '[]',
    history_a_cycle_id TEXT NOT NULL DEFAULT 'a0',
    history_b_cycle_id TEXT NOT NULL DEFAULT 'b0',
    turn_count         INTEGER NOT NULL DEFAULT 0,
    rotate_every       INTEGER NOT NULL DEFAULT 15,
    created_at         TEXT NOT NULL,
    updated_at         TEXT NOT NULL,
    UNIQUE(agent_id, session_id, rp_room_id, mode)
);
CREATE INDEX IF NOT EXISTS idx_conversation_partitions_lookup
    ON conversation_partitions(agent_id, session_id, rp_room_id, mode);

CREATE TABLE IF NOT EXISTS model_usage_events (
    id                     TEXT PRIMARY KEY,
    agent_id               TEXT DEFAULT '',
    session_id             TEXT DEFAULT '',
    rp_room_id             TEXT DEFAULT '',
    mode                   TEXT NOT NULL DEFAULT 'chat',
    provider               TEXT DEFAULT '',
    model                  TEXT DEFAULT '',
    prompt_builder_version TEXT DEFAULT '',
    fixed_block_hash       TEXT DEFAULT '',
    block_order            TEXT NOT NULL DEFAULT '[]',
    prompt_tokens          INTEGER NOT NULL DEFAULT 0,
    completion_tokens      INTEGER NOT NULL DEFAULT 0,
    total_tokens           INTEGER NOT NULL DEFAULT 0,
    cached_tokens          INTEGER NOT NULL DEFAULT 0,
    cache_hit_ratio        REAL NOT NULL DEFAULT 0,
    raw_usage              TEXT NOT NULL DEFAULT '{}',
    created_at             TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_model_usage_events_lookup
    ON model_usage_events(agent_id, session_id, rp_room_id, mode, created_at DESC);

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

CREATE TABLE IF NOT EXISTS activity_events (
    id           TEXT PRIMARY KEY,
    event_type   TEXT NOT NULL,
    event_value  TEXT DEFAULT '',
    content      TEXT DEFAULT '',
    url          TEXT DEFAULT '',
    source       TEXT NOT NULL DEFAULT 'manual',
    created_at   TEXT NOT NULL,
    occurred_at  TEXT NOT NULL,
    dedupe_key   TEXT DEFAULT '',
    consumed     INTEGER NOT NULL DEFAULT 0,
    consumed_at  TEXT DEFAULT '',
    gate_status  TEXT DEFAULT 'pending',
    gate_should_handle INTEGER NOT NULL DEFAULT 0,
    gate_should_notify_llm INTEGER NOT NULL DEFAULT 0,
    gate_message_hint TEXT DEFAULT '',
    gate_reason TEXT DEFAULT '',
    screened_at TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_activity_events_recent
    ON activity_events(occurred_at DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_events_dedupe
    ON activity_events(dedupe_key, created_at DESC);

CREATE TABLE IF NOT EXISTS proactive_messages (
    id              TEXT PRIMARY KEY,
    content         TEXT NOT NULL,
    trigger_reason  TEXT DEFAULT '',  -- care | share | diary | silent
    status          TEXT NOT NULL DEFAULT 'pending',  -- pending | delivered | read
    source_memory_id TEXT DEFAULT '',
    topic_key       TEXT DEFAULT '',
    similarity_key  TEXT DEFAULT '',
    created_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS memory_logs (
    id          TEXT PRIMARY KEY,
    memory_id   TEXT,
    agent_id    TEXT NOT NULL DEFAULT 'default',
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
    visibility  TEXT NOT NULL DEFAULT 'public',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_diary_entries_notebook_updated
    ON diary_entries(notebook_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_diary_entries_notebook_visibility
    ON diary_entries(notebook_id, visibility, updated_at DESC);

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

CREATE TABLE IF NOT EXISTS extracted_items (
    id             TEXT PRIMARY KEY,
    agent_id       TEXT NOT NULL DEFAULT '',
    session_id     TEXT NOT NULL DEFAULT '',
    message_id     TEXT NOT NULL DEFAULT '',
    type           TEXT NOT NULL,                          -- todo | note | idea | event
    title          TEXT NOT NULL,
    content        TEXT NOT NULL DEFAULT '',
    source_excerpt TEXT NOT NULL DEFAULT '',
    target_module  TEXT NOT NULL DEFAULT 'inbox',          -- inbox | folio | perle | drift
    status         TEXT NOT NULL DEFAULT 'accepted',       -- accepted | done | dismissed | pending
    metadata       TEXT NOT NULL DEFAULT '{}',
    dedupe_key     TEXT UNIQUE,
    created_at     TEXT NOT NULL,
    updated_at     TEXT NOT NULL,
    handled_at     TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_extracted_items_status
    ON extracted_items(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_extracted_items_type
    ON extracted_items(type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_extracted_items_agent
    ON extracted_items(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_extracted_items_module
    ON extracted_items(target_module, status, created_at DESC);

CREATE TABLE IF NOT EXISTS artifact_items (
    id           TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL DEFAULT '',
    type         TEXT NOT NULL DEFAULT 'page',
    content      TEXT NOT NULL DEFAULT '',
    storage_mode TEXT NOT NULL DEFAULT 'inline',
    cover_url    TEXT NOT NULL DEFAULT '',
    tags         TEXT NOT NULL DEFAULT '[]',
    agent_id     TEXT NOT NULL DEFAULT '',
    session_id   TEXT NOT NULL DEFAULT '',
    is_pinned    INTEGER NOT NULL DEFAULT 0,
    is_surprise  INTEGER NOT NULL DEFAULT 0,
    metadata     TEXT NOT NULL DEFAULT '{}',
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_artifact_items_agent_id
    ON artifact_items(agent_id);
CREATE INDEX IF NOT EXISTS idx_artifact_items_type
    ON artifact_items(type);
CREATE INDEX IF NOT EXISTS idx_artifact_items_is_pinned
    ON artifact_items(is_pinned);
CREATE INDEX IF NOT EXISTS idx_artifact_items_created_at
    ON artifact_items(created_at DESC);

CREATE TABLE IF NOT EXISTS parlor_rounds (
    id                    TEXT PRIMARY KEY,
    title                 TEXT NOT NULL,
    description           TEXT NOT NULL DEFAULT '',
    status                TEXT NOT NULL DEFAULT 'active',
    created_by            TEXT NOT NULL DEFAULT 'user',
    mode                  TEXT NOT NULL DEFAULT 'free',
    auto_mode             TEXT NOT NULL DEFAULT 'manual',
    max_turns_per_session INTEGER NOT NULL DEFAULT 20,
    summary               TEXT NOT NULL DEFAULT '{}',
    last_viewed_turn_n    INTEGER NOT NULL DEFAULT 0,
    left_at               TEXT NOT NULL DEFAULT '',
    created_at            TEXT NOT NULL,
    updated_at            TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_parlor_rounds_status
    ON parlor_rounds(status, created_at DESC);

CREATE TABLE IF NOT EXISTS parlor_seats (
    id            TEXT PRIMARY KEY,
    round_id      TEXT NOT NULL,
    agent_id      TEXT NOT NULL,
    display_name  TEXT NOT NULL DEFAULT '',
    model         TEXT NOT NULL DEFAULT '',
    provider      TEXT NOT NULL DEFAULT '',
    system_prompt TEXT NOT NULL DEFAULT '',
    color         TEXT NOT NULL DEFAULT '',
    seat_order    INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT NOT NULL,
    updated_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_parlor_seats_round_id
    ON parlor_seats(round_id, seat_order);

CREATE TABLE IF NOT EXISTS parlor_turns (
    id          TEXT PRIMARY KEY,
    round_id    TEXT NOT NULL,
    seat_id     TEXT NOT NULL DEFAULT '',
    agent_id    TEXT NOT NULL DEFAULT '',
    content     TEXT NOT NULL DEFAULT '',
    turn_number INTEGER NOT NULL DEFAULT 0,
    is_user     INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_parlor_turns_round_id
    ON parlor_turns(round_id, turn_number);

CREATE TABLE IF NOT EXISTS grimoire_tomes (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL DEFAULT '',
    title_en    TEXT NOT NULL DEFAULT '',
    sub         TEXT NOT NULL DEFAULT '',
    spine       TEXT NOT NULL DEFAULT '#2C3E5C',
    cover       TEXT NOT NULL DEFAULT '#3A4D6F',
    gilt        TEXT NOT NULL DEFAULT '#C5A572',
    sigil       TEXT NOT NULL DEFAULT '⊹',
    sigil_style TEXT NOT NULL DEFAULT 'serifEn',
    kind        TEXT NOT NULL DEFAULT '虚构世界',
    count       INTEGER NOT NULL DEFAULT 0,
    palette     TEXT NOT NULL DEFAULT '{}',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_grimoire_tomes_updated_at
    ON grimoire_tomes(updated_at DESC);

CREATE TABLE IF NOT EXISTS grimoire_entries (
    id           TEXT PRIMARY KEY,
    tome_id      TEXT NOT NULL,
    type         TEXT NOT NULL DEFAULT 'lore',
    title        TEXT NOT NULL DEFAULT '',
    title_en     TEXT NOT NULL DEFAULT '',
    sub          TEXT NOT NULL DEFAULT '',
    cover        TEXT NOT NULL DEFAULT '#3A4D6F',
    cover_ink    TEXT NOT NULL DEFAULT '#F1E4BD',
    cover_glyph  TEXT NOT NULL DEFAULT '·',
    status       TEXT NOT NULL DEFAULT 'seed',
    tags         TEXT NOT NULL DEFAULT '[]',
    fields       TEXT NOT NULL DEFAULT '{}',
    body         TEXT NOT NULL DEFAULT '',
    relations    TEXT NOT NULL DEFAULT '[]',
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_grimoire_entries_tome_id
    ON grimoire_entries(tome_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_grimoire_entries_status
    ON grimoire_entries(status);
CREATE INDEX IF NOT EXISTS idx_grimoire_entries_type
    ON grimoire_entries(type);
"""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id() -> str:
    return uuid.uuid4().hex[:12]


class MemoryRejected(Exception):
    """Raised when a candidate memory is filtered out before storage.

    Only triggered for automatic sources (add_memory(..., apply_filter=True)).
    """

    def __init__(self, reason: str):
        super().__init__(f"memory rejected: {reason}")
        self.reason = reason


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
    return str(memory.get("raw_content") or memory.get("content") or memory.get("compressed_content") or "").strip()


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


def _parse_dt(value: Any) -> datetime | None:
    text = str(value or "").strip()
    if not text:
        return None
    try:
        return datetime.fromisoformat(text.replace("Z", "+00:00"))
    except Exception:
        return None


def _age_days(value: Any, *, now: datetime | None = None) -> float | None:
    parsed = _parse_dt(value)
    if not parsed:
        return None
    current = now or datetime.now(timezone.utc)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return max(0.0, (current - parsed).total_seconds() / 86400.0)


def _exp_decay_factor(age_days: float | None, half_life_days: float) -> float:
    if age_days is None:
        return 0.0
    half_life = max(0.001, float(half_life_days or 1.0))
    return max(0.0, min(1.0, math.exp(-math.log(2) * age_days / half_life)))


def _memory_temp_factor(memory: dict[str, Any], *, now: datetime | None = None) -> float:
    cap = max(1.0, float(getattr(settings, "memory_temperature_cap", 100.0)))
    raw_temp = min(cap, _memory_temperature(memory))
    age = _age_days(memory.get("last_touched_at") or memory.get("updated_at"), now=now)
    cooling = _exp_decay_factor(age, getattr(settings, "memory_temperature_half_life_days", 30.0))
    return max(0.0, min(1.0, (raw_temp / cap) * cooling))


def _memory_recency_factor(memory: dict[str, Any], *, now: datetime | None = None) -> float:
    age = _age_days(memory.get("created_at") or memory.get("updated_at"), now=now)
    return _exp_decay_factor(age, getattr(settings, "memory_recency_half_life_days", 14.0))


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
    temp_factor = _memory_temp_factor(memory) * _temperature_weight_for_category(memory.get("category"))
    recency_factor = _memory_recency_factor(memory)
    blended = text_score * (0.6 + 0.25 * temp_factor + 0.15 * recency_factor)
    return blended + importance_bonus


def _semantic_rank_score(memory: dict[str, Any], similarity: float) -> float:
    temp_factor = _memory_temp_factor(memory)
    recency_factor = _memory_recency_factor(memory)
    return float(similarity) * (0.6 + 0.25 * temp_factor + 0.15 * recency_factor)


def _attach_memory_rank_fields(memory: dict[str, Any], similarity: float) -> dict[str, Any]:
    enriched = dict(memory)
    temp_factor = _memory_temp_factor(enriched)
    recency_factor = _memory_recency_factor(enriched)
    final_score = float(similarity) * (0.6 + 0.25 * temp_factor + 0.15 * recency_factor)
    enriched["similarity"] = round(float(similarity), 6)
    enriched["final_score"] = round(final_score, 6)
    enriched["temp_factor"] = round(temp_factor, 6)
    enriched["recency_factor"] = round(recency_factor, 6)
    return enriched


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


def _diary_notebook_owned_by_agent(notebook: dict[str, Any] | None, agent_id: str | None) -> bool:
    if not notebook:
        return False
    return (
        normalize_subject_type(notebook.get("author_type")) == "agent"
        and normalize_subject_id("agent", notebook.get("author_id")) == normalize_agent_id(agent_id)
    )


def _diary_entry_visible_to_agent(
    entry: dict[str, Any] | None,
    notebook: dict[str, Any] | None,
    viewer_agent_id: str | None,
) -> bool:
    if not entry:
        return False
    visibility = normalize_visibility(entry.get("visibility") or "public")
    if visibility in {"public", "global", "shared"}:
        return True
    return _diary_notebook_owned_by_agent(notebook, viewer_agent_id)


def _diary_entry_can_comment(
    entry: dict[str, Any] | None,
    notebook: dict[str, Any] | None,
    commenter_agent_id: str | None,
) -> bool:
    return _diary_notebook_can_comment(notebook) and _diary_entry_visible_to_agent(entry, notebook, commenter_agent_id)


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
    entry["visibility"] = normalize_visibility(row.get("visibility") or "public")
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
    normalized_content: str = "",
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
        "normalized_content": normalized_content,
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
    memory_id = str(memory_id or "").strip()
    if not memory_id:
        return False
    params = {"id": f"eq.{memory_id}"}
    existing = await _supabase_select(
        settings.supabase_memories_table,
        filters=params,
        select="id",
        limit=1,
    )
    if not existing:
        return False
    try:
        await _supabase_delete("memory_label_items", {"memory_id": f"eq.{memory_id}"})
    except Exception as exc:
        logger.warning("Supabase memory label cleanup failed for %s: %s", memory_id, exc)
    try:
        await _supabase_delete(settings.supabase_memory_logs_table, {"memory_id": f"eq.{memory_id}"})
    except Exception as exc:
        logger.warning("Supabase memory log cleanup failed for %s: %s", memory_id, exc)
    try:
        await _supabase_update(
            settings.supabase_proactive_messages_table,
            {"source_memory_id": f"eq.{memory_id}"},
            {"source_memory_id": ""},
        )
    except Exception as exc:
        logger.warning("Supabase proactive source cleanup failed for %s: %s", memory_id, exc)
    async with httpx.AsyncClient(
        timeout=20.0,
        trust_env=settings.supabase_httpx_trust_env,
    ) as client:
        resp = await client.delete(_supabase_memories_endpoint(), headers=_supabase_headers(True), params=params)
        if resp.status_code >= 300:
            raise RuntimeError(f"Supabase delete_memory failed: {resp.status_code} {resp.text[:200]}")
    remaining = await _supabase_select(
        settings.supabase_memories_table,
        filters=params,
        select="id",
        limit=1,
    )
    return not remaining


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
        "filter_agent_id": None if all_agents else (normalize_agent_id(agent_id) if agent_id else None),
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


async def _related_memories_from_embedding(
    *,
    new_memory_id: str,
    query_embedding: list[float],
    agent_id: str | None,
    category: str | None = None,
    threshold: float | None = None,
    limit: int | None = None,
) -> list[dict[str, Any]]:
    min_similarity = float(
        threshold if threshold is not None else getattr(settings, "memory_related_similarity_threshold", 0.7)
    )
    top_k = max(0, int(limit if limit is not None else getattr(settings, "memory_related_top_k", 3)))
    if top_k <= 0 or not query_embedding:
        return []
    candidate_limit = max(top_k * 6, 12)
    rows = await _supabase_match_memories(
        query_embedding,
        category=category,
        limit=candidate_limit,
        agent_id=agent_id,
    )
    related: list[dict[str, Any]] = []
    for row in rows:
        if str(row.get("id") or "") == str(new_memory_id):
            continue
        similarity = _safe_float(row.get("similarity"), 0.0)
        if similarity < min_similarity:
            continue
        item = _attach_memory_rank_fields(row, similarity)
        related.append(
            {
                "id": item.get("id"),
                "content": memory_display_content(item) or memory_raw_content(item),
                "similarity": item["similarity"],
                "final_score": item["final_score"],
                "category": item.get("category"),
                "temperature": item.get("temperature"),
                "last_touched_at": item.get("last_touched_at"),
            }
        )
        if len(related) >= top_k:
            break
    return related


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
    # 本地 embedding 缓存清理是 best-effort：失败也不能让记忆删除本身报错。
    try:
        db = await get_db()
        await db.execute("DELETE FROM memory_embeddings WHERE memory_id = ?", (memory_id,))
        await db.commit()
    except Exception as exc:
        logger.warning("Failed to delete local embedding cache for %s: %s", memory_id, exc)


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


async def _find_related_memories_for_new_memory(
    memory: dict[str, Any],
    *,
    embedding: list[float] | None,
    source_text: str,
) -> list[dict[str, Any]]:
    if not embedding:
        return []
    memory_id = str(memory.get("id") or "")
    agent_id = str(memory.get("agent_id") or "")
    threshold = float(getattr(settings, "memory_related_similarity_threshold", 0.7))
    top_k = max(0, int(getattr(settings, "memory_related_top_k", 3)))
    if top_k <= 0:
        return []
    if _use_supabase_memory():
        return await _related_memories_from_embedding(
            new_memory_id=memory_id,
            query_embedding=embedding,
            agent_id=agent_id,
            category=None,
            threshold=threshold,
            limit=top_k,
        )

    candidates = await list_memories(
        category=None,
        limit=max(getattr(settings, "memory_vector_candidate_limit", 200), top_k * 20),
        agent_id=agent_id,
    )
    scored: list[tuple[float, dict[str, Any]]] = []
    for candidate in candidates:
        candidate_id = str(candidate.get("id") or "")
        if not candidate_id or candidate_id == memory_id:
            continue
        content = memory_embedding_source(candidate)
        if not content:
            continue
        try:
            candidate_embedding = await _ensure_memory_embedding(candidate_id, content)
        except Exception as exc:
            logger.warning("Failed to embed related memory candidate %s: %s", candidate_id, exc)
            continue
        if not candidate_embedding:
            continue
        similarity = _cosine_similarity(embedding, candidate_embedding)
        if similarity < threshold:
            continue
        enriched = _attach_memory_rank_fields(candidate, similarity)
        scored.append((_safe_float(enriched.get("final_score"), 0.0), enriched))

    scored.sort(key=lambda item: item[0], reverse=True)
    related: list[dict[str, Any]] = []
    for _, item in scored[:top_k]:
        related.append(
            {
                "id": item.get("id"),
                "content": memory_display_content(item) or memory_raw_content(item),
                "similarity": item["similarity"],
                "final_score": item["final_score"],
                "category": item.get("category"),
                "temperature": item.get("temperature"),
                "last_touched_at": item.get("last_touched_at"),
            }
        )
    return related


async def _touch_related_memories(related_memories: list[dict[str, Any]]) -> int:
    touched = 0
    deltas = [3.0, 2.0, 1.0]
    cap = float(getattr(settings, "memory_temperature_cap", 100.0))
    for index, memory in enumerate(related_memories[:3]):
        memory_id = str(memory.get("id") or "").strip()
        if not memory_id:
            continue
        delta = deltas[index] if index < len(deltas) else 1.0
        touched += await touch_memories([memory_id], reason="related_memory_hit", delta=delta, cap=cap)
    return touched


async def _attach_related_memories_after_write(memory: dict[str, Any], raw_text: str) -> dict[str, Any]:
    memory["related_memories"] = []
    source_text = (raw_text or memory_embedding_source(memory) or "").strip()
    if not source_text or not _can_use_embeddings():
        return memory
    try:
        embedding = await _ensure_memory_embedding(str(memory.get("id") or ""), source_text)
        related = await _find_related_memories_for_new_memory(memory, embedding=embedding, source_text=source_text)
        if related:
            touched = await _touch_related_memories(related)
            logger.info(
                "Memory related hit: memory=%s related=%s touched=%s",
                memory.get("id"),
                [(item.get("id"), item.get("similarity")) for item in related],
                touched,
            )
        memory["related_memories"] = related
    except Exception as exc:
        logger.warning("Memory related lookup failed for %s: %s", memory.get("id"), exc)
        memory["related_memories"] = []
    return memory


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
        # summary 模型可能把推理旁白（"Let me first search…"）当输出流出来；
        # 用统一 gate 兜底，过程/自我解释文本一律丢弃，让前端回退显示干净的 content。
        from consciousness.memory_filter import should_store_memory
        ok, reason = should_store_memory(compressed)
        if not ok:
            logger.info("memory compression rejected (%s): %s", reason, compressed[:80])
            return None
        return compressed
    except Exception as exc:
        logger.warning("Async memory compression generation failed: %s", exc)
        return None


async def ensure_memory_compression(memory_id: str, raw_content: str) -> str | None:
    compressed = await _generate_memory_compressed_content(raw_content)
    if not compressed:
        return None
    await update_memory(memory_id, compressed_content=compressed)
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


async def _sqlite_column_notnull(db: aiosqlite.Connection, table: str, column: str) -> bool:
    cursor = await db.execute(f"PRAGMA table_info({table})")
    rows = await cursor.fetchall()
    for row in rows:
        if str(row["name"]) == column:
            return bool(row["notnull"])
    return False


async def _ensure_sqlite_media_items_schema(db: aiosqlite.Connection) -> None:
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS media_items (
            id               TEXT PRIMARY KEY,
            owner_type       TEXT NOT NULL DEFAULT 'user',
            agent_id         TEXT REFERENCES agents(agent_id),
            type             TEXT NOT NULL DEFAULT 'other',
            title            TEXT NOT NULL DEFAULT '',
            artist           TEXT NOT NULL DEFAULT '',
            album            TEXT NOT NULL DEFAULT '',
            author           TEXT NOT NULL DEFAULT '',
            storage_provider TEXT NOT NULL DEFAULT 'r2',
            storage_key      TEXT NOT NULL,
            cover_key        TEXT NOT NULL DEFAULT '',
            mime_type        TEXT NOT NULL DEFAULT '',
            size_bytes       INTEGER,
            duration_seconds REAL,
            metadata         TEXT NOT NULL DEFAULT '{}',
            created_at       TEXT NOT NULL,
            updated_at       TEXT NOT NULL
        )
        """
    )
    if not await _sqlite_column_exists(db, "media_items", "owner_type"):
        await db.execute("ALTER TABLE media_items ADD COLUMN owner_type TEXT NOT NULL DEFAULT 'user'")
    if await _sqlite_column_notnull(db, "media_items", "agent_id"):
        await db.execute("ALTER TABLE media_items RENAME TO media_items_legacy_agent_notnull")
        await db.execute(
            """
            CREATE TABLE media_items (
                id               TEXT PRIMARY KEY,
                owner_type       TEXT NOT NULL DEFAULT 'user',
                agent_id         TEXT REFERENCES agents(agent_id),
                type             TEXT NOT NULL DEFAULT 'other',
                title            TEXT NOT NULL DEFAULT '',
                artist           TEXT NOT NULL DEFAULT '',
                album            TEXT NOT NULL DEFAULT '',
                author           TEXT NOT NULL DEFAULT '',
                storage_provider TEXT NOT NULL DEFAULT 'r2',
                storage_key      TEXT NOT NULL,
                cover_key        TEXT NOT NULL DEFAULT '',
                mime_type        TEXT NOT NULL DEFAULT '',
                size_bytes       INTEGER,
                duration_seconds REAL,
                metadata         TEXT NOT NULL DEFAULT '{}',
                created_at       TEXT NOT NULL,
                updated_at       TEXT NOT NULL
            )
            """
        )
        await db.execute(
            """
            INSERT INTO media_items (
                id, owner_type, agent_id, type, title, artist, album, author, storage_provider,
                storage_key, cover_key, mime_type, size_bytes, duration_seconds, metadata, created_at, updated_at
            )
            SELECT
                id,
                COALESCE(NULLIF(owner_type, ''), 'user'),
                NULLIF(agent_id, ''),
                COALESCE(NULLIF(type, ''), 'other'),
                COALESCE(title, ''),
                COALESCE(artist, ''),
                COALESCE(album, ''),
                COALESCE(author, ''),
                COALESCE(NULLIF(storage_provider, ''), 'r2'),
                COALESCE(storage_key, ''),
                COALESCE(cover_key, ''),
                COALESCE(mime_type, ''),
                size_bytes,
                duration_seconds,
                COALESCE(metadata, '{}'),
                COALESCE(created_at, ''),
                COALESCE(updated_at, '')
            FROM media_items_legacy_agent_notnull
            """
        )
        await db.execute("DROP TABLE media_items_legacy_agent_notnull")
    for _col, _ddl in [
        ("owner_type", "TEXT NOT NULL DEFAULT 'user'"),
        ("agent_id", "TEXT"),
        ("type", "TEXT NOT NULL DEFAULT 'other'"),
        ("title", "TEXT NOT NULL DEFAULT ''"),
        ("artist", "TEXT NOT NULL DEFAULT ''"),
        ("album", "TEXT NOT NULL DEFAULT ''"),
        ("author", "TEXT NOT NULL DEFAULT ''"),
        ("storage_provider", "TEXT NOT NULL DEFAULT 'r2'"),
        ("storage_key", "TEXT NOT NULL DEFAULT ''"),
        ("cover_key", "TEXT NOT NULL DEFAULT ''"),
        ("mime_type", "TEXT NOT NULL DEFAULT ''"),
        ("size_bytes", "INTEGER"),
        ("duration_seconds", "REAL"),
        ("metadata", "TEXT NOT NULL DEFAULT '{}'"),
        ("created_at", "TEXT NOT NULL DEFAULT ''"),
        ("updated_at", "TEXT NOT NULL DEFAULT ''"),
    ]:
        if not await _sqlite_column_exists(db, "media_items", _col):
            await db.execute(f"ALTER TABLE media_items ADD COLUMN {_col} {_ddl}")
    await db.execute("UPDATE media_items SET owner_type = 'user' WHERE COALESCE(owner_type, '') = ''")
    await db.execute("UPDATE media_items SET owner_type = 'user' WHERE owner_type NOT IN ('user', 'global', 'agent')")
    await db.execute("UPDATE media_items SET agent_id = NULL WHERE owner_type IN ('user', 'global') AND COALESCE(agent_id, '') = ''")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_media_items_agent_type ON media_items(agent_id, type, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_media_items_owner_type ON media_items(owner_type, type, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_media_items_type_created ON media_items(type, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_media_items_storage_key ON media_items(storage_key)")


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
    if not await _sqlite_column_exists(db, "messages", "agent_id"):
        await db.execute("ALTER TABLE messages ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    if not await _sqlite_column_exists(db, "messages", "voice_url"):
        await db.execute("ALTER TABLE messages ADD COLUMN voice_url TEXT DEFAULT ''")
    await db.execute(
        """
        UPDATE messages
        SET agent_id = COALESCE((SELECT agent_id FROM sessions WHERE sessions.id = messages.session_id), 'default')
        WHERE COALESCE(agent_id, '') = ''
        """
    )
    if not await _sqlite_column_exists(db, "context_summaries", "agent_id"):
        await db.execute("ALTER TABLE context_summaries ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    await db.execute(
        """
        UPDATE context_summaries
        SET agent_id = COALESCE((SELECT agent_id FROM sessions WHERE sessions.id = context_summaries.session_id), 'default')
        WHERE COALESCE(agent_id, '') = ''
        """
    )
    if not await _sqlite_column_exists(db, "memory_logs", "agent_id"):
        await db.execute("ALTER TABLE memory_logs ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'")
    # memories 的列要先补齐：下面 memory_logs 的回填 UPDATE 会读 memories.agent_id，
    # 必须保证该列已存在（否则旧库会报 "no such column: agent_id"）。
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
    if not await _sqlite_column_exists(db, "memories", "normalized_content"):
        alter_statements.append("ALTER TABLE memories ADD COLUMN normalized_content TEXT NOT NULL DEFAULT ''")
    for stmt in alter_statements:
        await db.execute(stmt)
    await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_memories_agent_normalized ON memories(agent_id, normalized_content)"
    )
    await db.execute(
        """
        UPDATE memory_logs
        SET agent_id = COALESCE((SELECT agent_id FROM memories WHERE memories.id = memory_logs.memory_id), 'default')
        WHERE COALESCE(agent_id, '') = ''
        """
    )
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
    await db.execute("CREATE INDEX IF NOT EXISTS idx_messages_agent_session ON messages(agent_id, session_id, created_at)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_context_summaries_agent_session ON context_summaries(agent_id, session_id, created_at)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memory_logs_agent_created ON memory_logs(agent_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_memory_logs_memory_created ON memory_logs(memory_id, created_at DESC)")
    await db.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_companion_state_agent_id ON companion_state(agent_id)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_created_at ON diary(agent_id, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_updated_at ON diary(agent_id, updated_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_agent_visibility ON diary(agent_id, visibility)")
    if not await _sqlite_column_exists(db, "diary_notebooks", "description"):
        await db.execute("ALTER TABLE diary_notebooks ADD COLUMN description TEXT DEFAULT ''")
    if not await _sqlite_column_exists(db, "diary_entries", "visibility"):
        await db.execute("ALTER TABLE diary_entries ADD COLUMN visibility TEXT NOT NULL DEFAULT 'public'")
    await db.execute("UPDATE diary_entries SET visibility = 'public' WHERE COALESCE(visibility, '') = ''")
    await db.execute("UPDATE diary_entries SET visibility = 'shared' WHERE visibility = 'restricted'")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_diary_entries_notebook_visibility ON diary_entries(notebook_id, visibility, updated_at DESC)")
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
    await _ensure_sqlite_media_items_schema(db)
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS activity_events (
            id           TEXT PRIMARY KEY,
            event_type   TEXT NOT NULL,
            event_value  TEXT DEFAULT '',
            content      TEXT DEFAULT '',
            url          TEXT DEFAULT '',
            source       TEXT NOT NULL DEFAULT 'manual',
            created_at   TEXT NOT NULL,
            occurred_at  TEXT NOT NULL,
            dedupe_key   TEXT DEFAULT '',
            consumed     INTEGER NOT NULL DEFAULT 0,
            consumed_at  TEXT DEFAULT '',
            gate_status  TEXT DEFAULT 'pending',
            gate_should_handle INTEGER NOT NULL DEFAULT 0,
            gate_should_notify_llm INTEGER NOT NULL DEFAULT 0,
            gate_message_hint TEXT DEFAULT '',
            gate_reason TEXT DEFAULT '',
            screened_at TEXT DEFAULT ''
        )
        """
    )
    await db.execute("CREATE INDEX IF NOT EXISTS idx_activity_events_recent ON activity_events(occurred_at DESC, created_at DESC)")
    await db.execute("CREATE INDEX IF NOT EXISTS idx_activity_events_dedupe ON activity_events(dedupe_key, created_at DESC)")
    _activity_gate_cols = [
        ("gate_status", "TEXT DEFAULT 'pending'"),
        ("gate_should_handle", "INTEGER NOT NULL DEFAULT 0"),
        ("gate_should_notify_llm", "INTEGER NOT NULL DEFAULT 0"),
        ("gate_message_hint", "TEXT DEFAULT ''"),
        ("gate_reason", "TEXT DEFAULT ''"),
        ("screened_at", "TEXT DEFAULT ''"),
    ]
    for _col, _ddl in _activity_gate_cols:
        if not await _sqlite_column_exists(db, "activity_events", _col):
            await db.execute(f"ALTER TABLE activity_events ADD COLUMN {_col} {_ddl}")
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
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS conversation_partitions (
            id                 TEXT PRIMARY KEY,
            agent_id           TEXT NOT NULL,
            session_id         TEXT NOT NULL DEFAULT '',
            rp_room_id         TEXT NOT NULL DEFAULT '',
            mode               TEXT NOT NULL DEFAULT 'chat',
            summary_text       TEXT NOT NULL DEFAULT '',
            summary_revision   TEXT NOT NULL DEFAULT '',
            history_a          TEXT NOT NULL DEFAULT '[]',
            history_b          TEXT NOT NULL DEFAULT '[]',
            history_a_cycle_id TEXT NOT NULL DEFAULT 'a0',
            history_b_cycle_id TEXT NOT NULL DEFAULT 'b0',
            turn_count         INTEGER NOT NULL DEFAULT 0,
            rotate_every       INTEGER NOT NULL DEFAULT 15,
            created_at         TEXT NOT NULL,
            updated_at         TEXT NOT NULL,
            UNIQUE(agent_id, session_id, rp_room_id, mode)
        )
        """
    )
    await db.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_conversation_partitions_lookup
        ON conversation_partitions(agent_id, session_id, rp_room_id, mode)
        """
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS model_usage_events (
            id                     TEXT PRIMARY KEY,
            agent_id               TEXT DEFAULT '',
            session_id             TEXT DEFAULT '',
            rp_room_id             TEXT DEFAULT '',
            mode                   TEXT NOT NULL DEFAULT 'chat',
            provider               TEXT DEFAULT '',
            model                  TEXT DEFAULT '',
            prompt_builder_version TEXT DEFAULT '',
            fixed_block_hash       TEXT DEFAULT '',
            block_order            TEXT NOT NULL DEFAULT '[]',
            prompt_tokens          INTEGER NOT NULL DEFAULT 0,
            completion_tokens      INTEGER NOT NULL DEFAULT 0,
            total_tokens           INTEGER NOT NULL DEFAULT 0,
            cached_tokens          INTEGER NOT NULL DEFAULT 0,
            cache_hit_ratio        REAL NOT NULL DEFAULT 0,
            raw_usage              TEXT NOT NULL DEFAULT '{}',
            created_at             TEXT NOT NULL
        )
        """
    )
    await db.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_model_usage_events_lookup
        ON model_usage_events(agent_id, session_id, rp_room_id, mode, created_at DESC)
        """
    )

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
        ("source_memory_id",   "TEXT    DEFAULT ''"),
        ("topic_key",          "TEXT    DEFAULT ''"),
        ("similarity_key",     "TEXT    DEFAULT ''"),
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


def _looks_mojibake(value: str) -> bool:
    return any(
        "\u0080" <= ch <= "\u00ff" or ch in {"Ã", "Â", "å", "ç", "é", "è", "æ", "闃"}
        for ch in value
    )


def _contains_cjk(value: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in value)


def repair_mojibake_text(value: Any) -> str:
    text = str(value or "")
    if not text or not _looks_mojibake(text):
        return text
    candidates: list[str] = []
    for codec in ("latin-1", "gbk", "cp936"):
        try:
            candidate = text.encode(codec).decode("utf-8")
        except Exception:
            continue
        if candidate and candidate != text:
            candidates.append(candidate)
    for candidate in candidates:
        if _contains_cjk(candidate):
            return candidate
    return candidates[0] if candidates else text


def _normalize_agent_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["agent_id"] = normalize_agent_id_value(item.get("agent_id"))
    item["display_handle"] = f"@{item['agent_id']}"
    item["display_name"] = repair_mojibake_text(item.get("display_name") or item["agent_id"])
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


async def repair_agent_display_name_mojibake() -> list[dict[str, Any]]:
    await ensure_default_agents()
    repaired: list[dict[str, Any]] = []
    if _use_supabase_data():
        rows = await _supabase_select(AGENTS_TABLE, select="agent_id,display_name", order="updated_at.desc")
        for row in rows:
            agent_id = normalize_agent_id_value(row.get("agent_id"))
            current = str(row.get("display_name") or "")
            fixed = repair_mojibake_text(current).strip()
            if agent_id and fixed and fixed != current:
                updated = await update_agent(agent_id, display_name=fixed)
                if updated:
                    repaired.append(updated)
        return repaired
    db = await get_db()
    cursor = await db.execute("SELECT agent_id, display_name FROM agents")
    rows = await cursor.fetchall()
    for row in rows:
        item = dict(row)
        agent_id = normalize_agent_id_value(item.get("agent_id"))
        current = str(item.get("display_name") or "")
        fixed = repair_mojibake_text(current).strip()
        if agent_id and fixed and fixed != current:
            await db.execute(
                "UPDATE agents SET display_name = ?, updated_at = ? WHERE agent_id = ?",
                (fixed, _now(), agent_id),
            )
            repaired.append({"agent_id": agent_id, "display_name": fixed})
    if repaired:
        await db.commit()
    return repaired


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
        "display_name": repair_mojibake_text(display_name).strip() or normalized,
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
    if "display_name" in payload:
        payload["display_name"] = repair_mojibake_text(payload["display_name"]).strip()
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


# ==================== Media library ====================

def normalize_media_type(value: str | None) -> str:
    media_type = str(value or "other").strip().lower()
    return media_type if media_type in MEDIA_TYPES else "other"


def _media_metadata_for_storage(metadata: Any, *, supabase: bool) -> Any:
    if metadata in (None, ""):
        return {} if supabase else "{}"
    if isinstance(metadata, str):
        if supabase:
            try:
                return json.loads(metadata)
            except Exception:
                return {"value": metadata}
        return metadata
    try:
        return metadata if supabase else json.dumps(metadata, ensure_ascii=False)
    except Exception:
        return {} if supabase else "{}"


def _media_metadata_dict(metadata: Any) -> dict[str, Any]:
    if metadata in (None, ""):
        return {}
    if isinstance(metadata, dict):
        return dict(metadata)
    if isinstance(metadata, str):
        try:
            data = json.loads(metadata)
            return data if isinstance(data, dict) else {}
        except Exception:
            return {}
    return {}


def _normalize_media_item(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["id"] = str(item.get("id") or "")
    item["owner_type"] = str(item.get("owner_type") or "user").strip().lower()
    if item["owner_type"] not in {"user", "global", "agent"}:
        item["owner_type"] = "user"
    item["agent_id"] = normalize_agent_id_value(item.get("agent_id")) if item.get("agent_id") else ""
    item["type"] = normalize_media_type(item.get("type"))
    for key in ("title", "artist", "album", "author", "storage_provider", "storage_key", "cover_key", "mime_type"):
        item[key] = str(item.get(key) or "")
    item["metadata"] = item.get("metadata") if item.get("metadata") not in (None, "") else {}
    if isinstance(item["metadata"], str):
        try:
            item["metadata"] = json.loads(item["metadata"])
        except Exception:
            item["metadata"] = {}
    if not item["agent_id"] and isinstance(item["metadata"], dict) and item["metadata"].get("agent_id"):
        item["agent_id"] = normalize_agent_id_value(item["metadata"].get("agent_id"))
    item["created_at"] = str(item.get("created_at") or "")
    item["updated_at"] = str(item.get("updated_at") or "")
    return item


async def create_media_item(
    *,
    owner_type: str = "user",
    agent_id: str | None = None,
    type: str = "other",
    title: str = "",
    artist: str = "",
    album: str = "",
    author: str = "",
    storage_provider: str = "r2",
    storage_key: str,
    cover_key: str = "",
    mime_type: str = "",
    size_bytes: int | None = None,
    duration_seconds: float | None = None,
    metadata: Any = None,
) -> dict[str, Any]:
    normalized_owner = str(owner_type or "user").strip().lower()
    if normalized_owner not in {"user", "global", "agent"}:
        normalized_owner = "user"
    normalized_agent = await require_agent(agent_id) if normalized_owner == "agent" else None
    normalized_type = normalize_media_type(type)
    provider = str(storage_provider or "r2").strip().lower() or "r2"
    key = str(storage_key or "").strip().lstrip("/")
    if not key or ".." in key.split("/"):
        raise ValueError("storage_key is required and must not contain path traversal")
    now = _now()
    supabase = _use_supabase_data()
    payload = {
        "id": _new_id(),
        "owner_type": normalized_owner,
        "agent_id": normalized_agent,
        "type": normalized_type,
        "title": str(title or "").strip(),
        "artist": str(artist or "").strip(),
        "album": str(album or "").strip(),
        "author": str(author or "").strip(),
        "storage_provider": provider,
        "storage_key": key,
        "cover_key": str(cover_key or "").strip().lstrip("/"),
        "mime_type": str(mime_type or "").strip(),
        "size_bytes": int(size_bytes) if size_bytes is not None else None,
        "duration_seconds": float(duration_seconds) if duration_seconds is not None else None,
        "metadata": _media_metadata_for_storage(metadata, supabase=supabase),
        "created_at": now,
        "updated_at": now,
    }
    if supabase:
        row = await _supabase_insert_verified(settings.supabase_media_items_table, payload)
        return _normalize_media_item(row) or row
    db = await get_db()
    await db.execute(
        """
        INSERT INTO media_items (
            id, owner_type, agent_id, type, title, artist, album, author, storage_provider, storage_key,
            cover_key, mime_type, size_bytes, duration_seconds, metadata, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["owner_type"],
            payload["agent_id"],
            payload["type"],
            payload["title"],
            payload["artist"],
            payload["album"],
            payload["author"],
            payload["storage_provider"],
            payload["storage_key"],
            payload["cover_key"],
            payload["mime_type"],
            payload["size_bytes"],
            payload["duration_seconds"],
            payload["metadata"],
            payload["created_at"],
            payload["updated_at"],
        ),
    )
    await db.commit()
    row = await get_media_item(payload["id"])
    if not row:
        raise RuntimeError("SQLite insert(media_items) did not verify a row")
    return row


async def list_media_items(
    *,
    type: str | None = None,
    owner_type: str | None = None,
    agent_id: str | None = None,
    limit: int = 100,
) -> list[dict[str, Any]]:
    filters: dict[str, str] = {}
    if type:
        filters["type"] = f"eq.{normalize_media_type(type)}"
    if owner_type:
        owner = str(owner_type or "").strip().lower()
        if owner in {"user", "global", "agent"}:
            filters["owner_type"] = f"eq.{owner}"
    if agent_id:
        filters["agent_id"] = f"eq.{await require_agent(agent_id)}"
    safe_limit = max(1, min(int(limit or 100), 500))
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_media_items_table,
            filters=filters or None,
            order="created_at.desc",
            limit=safe_limit,
        )
        return [item for item in (_normalize_media_item(row) for row in rows) if item]
    db = await get_db()
    clauses: list[str] = []
    params: list[Any] = []
    if type:
        clauses.append("type = ?")
        params.append(normalize_media_type(type))
    if owner_type:
        owner = str(owner_type or "").strip().lower()
        if owner in {"user", "global", "agent"}:
            clauses.append("owner_type = ?")
            params.append(owner)
    if agent_id:
        clauses.append("agent_id = ?")
        params.append(await require_agent(agent_id))
    sql = "SELECT * FROM media_items"
    if clauses:
        sql += " WHERE " + " AND ".join(clauses)
    sql += " ORDER BY created_at DESC LIMIT ?"
    params.append(safe_limit)
    cursor = await db.execute(sql, params)
    rows = await cursor.fetchall()
    return [item for item in (_normalize_media_item(dict(row)) for row in rows) if item]


async def get_media_item(item_id: str) -> dict[str, Any] | None:
    media_id = str(item_id or "").strip()
    if not media_id:
        return None
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_media_items_table,
            filters={"id": f"eq.{media_id}"},
            limit=1,
        )
        return _normalize_media_item(rows[0] if rows else None)
    db = await get_db()
    cursor = await db.execute("SELECT * FROM media_items WHERE id = ? LIMIT 1", (media_id,))
    row = await cursor.fetchone()
    return _normalize_media_item(dict(row) if row else None)


async def update_media_item(
    item_id: str,
    *,
    title: str | None = None,
    artist: str | None = None,
    album: str | None = None,
    author: str | None = None,
    cover_key: str | None = None,
    metadata: Any = None,
) -> dict[str, Any] | None:
    media_id = str(item_id or "").strip()
    if not media_id:
        return None
    current = await get_media_item(media_id)
    if not current:
        return None
    supabase = _use_supabase_data()
    updates: dict[str, Any] = {}
    if title is not None:
        updates["title"] = str(title or "").strip()
    if artist is not None:
        updates["artist"] = str(artist or "").strip()
    if album is not None:
        updates["album"] = str(album or "").strip()
    if author is not None:
        updates["author"] = str(author or "").strip()
    if cover_key is not None:
        updates["cover_key"] = str(cover_key or "").strip().lstrip("/")
    if metadata is not None:
        next_metadata = {
            **_media_metadata_dict(current.get("metadata")),
            **_media_metadata_dict(metadata),
        }
        updates["metadata"] = _media_metadata_for_storage(next_metadata, supabase=supabase)
    if not updates:
        return current
    updates["updated_at"] = _now()
    if supabase:
        row = await _supabase_update_verified(settings.supabase_media_items_table, {"id": f"eq.{media_id}"}, updates)
        if row:
            return _normalize_media_item(row)
        return await get_media_item(media_id)
    db = await get_db()
    columns = ", ".join(f"{key} = ?" for key in updates)
    await db.execute(f"UPDATE media_items SET {columns} WHERE id = ?", (*updates.values(), media_id))
    await db.commit()
    return await get_media_item(media_id)


async def delete_media_item(item_id: str) -> dict[str, Any] | None:
    item = await get_media_item(item_id)
    if not item:
        return None
    if _use_supabase_data():
        deleted = await _supabase_delete_verified(settings.supabase_media_items_table, {"id": f"eq.{item['id']}"})
        return item if deleted else None
    db = await get_db()
    result = await db.execute("DELETE FROM media_items WHERE id = ?", (item["id"],))
    await db.commit()
    return item if result.rowcount > 0 else None


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


async def get_latest_session_for_agent_source(
    *,
    agent_id: str | None,
    source_app: str | None,
    title: str | None = None,
) -> dict[str, Any] | None:
    normalized_agent_id = normalize_agent_id_value(agent_id)
    normalized_source_app = normalize_source_app(source_app)
    if not normalized_agent_id:
        return None
    if _use_supabase_data():
        filters = {
            "agent_id": f"eq.{normalized_agent_id}",
            "source_app": f"eq.{normalized_source_app}",
        }
        if title is not None:
            filters["title"] = f"eq.{title}"
        rows = await _supabase_select(
            settings.supabase_sessions_table,
            filters=filters,
            order="updated_at.desc",
            limit=1,
        )
        return _normalize_session_row(rows[0] if rows else None)
    db = await get_db()
    if title is None:
        cursor = await db.execute(
            "SELECT * FROM sessions WHERE agent_id = ? AND source_app = ? ORDER BY updated_at DESC LIMIT 1",
            (normalized_agent_id, normalized_source_app),
        )
    else:
        cursor = await db.execute(
            "SELECT * FROM sessions WHERE agent_id = ? AND source_app = ? AND title = ? ORDER BY updated_at DESC LIMIT 1",
            (normalized_agent_id, normalized_source_app, title),
        )
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

async def add_message(
    session_id: str,
    role: str,
    content: str,
    model: str = "",
    *,
    agent_id: str | None = None,
    voice_url: str = "",
) -> dict[str, Any]:
    session = await get_session(session_id)
    resolved_agent_id = normalize_agent_id(agent_id or (session or {}).get("agent_id"))
    clean_voice_url = str(voice_url or "").strip()
    if _use_supabase_data():
        mid = _new_id()
        now = _now()
        payload = {
            "id": mid,
            "session_id": session_id,
            "agent_id": resolved_agent_id,
            "role": role,
            "content": content,
            "model": model,
            "created_at": now,
        }
        if clean_voice_url:
            payload["voice_url"] = clean_voice_url
        row = await _supabase_insert_verified(settings.supabase_messages_table, payload)
        await _supabase_update(settings.supabase_sessions_table, {"id": f"eq.{session_id}"}, {"updated_at": now})
        if clean_voice_url:
            row.setdefault("voice_url", clean_voice_url)
            row.setdefault("voiceUrl", clean_voice_url)
        return row
    db = await get_db()
    mid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO messages (id, session_id, agent_id, role, content, voice_url, model, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (mid, session_id, resolved_agent_id, role, content, clean_voice_url, model, now),
    )
    # update session time
    await db.execute("UPDATE sessions SET updated_at = ? WHERE id = ?", (now, session_id))
    await db.commit()
    return {
        "id": mid,
        "session_id": session_id,
        "agent_id": resolved_agent_id,
        "role": role,
        "content": content,
        "voice_url": clean_voice_url,
        "voiceUrl": clean_voice_url,
        "model": model,
        "created_at": now,
    }


async def get_messages(session_id: str, limit: int = 50) -> list[dict[str, Any]]:
    def expose_voice_url(row: dict[str, Any]) -> dict[str, Any]:
        voice_url = str(row.get("voiceUrl") or row.get("voice_url") or "").strip()
        if voice_url:
            row["voiceUrl"] = voice_url
        return row

    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_messages_table,
            filters={"session_id": f"eq.{session_id}"},
            order="created_at.asc",
            limit=limit,
        )
        return [expose_voice_url(dict(row)) for row in rows]
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?",
        (session_id, limit),
    )
    rows = await cursor.fetchall()
    return [expose_voice_url(dict(row)) for row in rows]


async def delete_message(message_id: str) -> bool:
    message_id = str(message_id or "").strip()
    if not message_id:
        return False
    if _use_supabase_data():
        rows = await _supabase_delete(settings.supabase_messages_table, {"id": f"eq.{message_id}"})
        return len(rows) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM messages WHERE id = ?", (message_id,))
    await db.commit()
    return result.rowcount > 0


async def list_messages_for_agent(agent_id: str | None, limit: int = 200) -> list[dict[str, Any]]:
    normalized = normalize_agent_id_value(agent_id)
    if not normalized:
        return []
    safe_limit = max(1, min(int(limit or 200), 1000))
    aliases = {normalized}
    if normalized.startswith("orphan_"):
        aliases.add(normalized.removeprefix("orphan_"))
    else:
        aliases.add(f"orphan_{normalized}")

    by_id: dict[str, dict[str, Any]] = {}

    def add_rows(rows: list[dict[str, Any]]) -> None:
        for row in rows or []:
            message_id = str(row.get("id") or "").strip()
            fallback_id = "|".join([
                str(row.get("agent_id") or ""),
                str(row.get("session_id") or ""),
                str(row.get("role") or ""),
                str(row.get("created_at") or ""),
                str(row.get("content") or ""),
            ])
            by_id[message_id or fallback_id] = dict(row)

    if _use_supabase_data():
        for alias in aliases:
            add_rows(await _supabase_select(
                settings.supabase_messages_table,
                filters={"agent_id": f"eq.{alias}"},
                order="created_at.asc",
                limit=safe_limit,
            ))
            sessions = await _supabase_select(
                settings.supabase_sessions_table,
                filters={"agent_id": f"eq.{alias}"},
                order="updated_at.desc",
                limit=safe_limit,
            )
            for session in sessions:
                session_id = str(session.get("id") or "").strip()
                if not session_id:
                    continue
                add_rows(await _supabase_select(
                    settings.supabase_messages_table,
                    filters={"session_id": f"eq.{session_id}"},
                    order="created_at.asc",
                    limit=safe_limit,
                ))
    else:
        db = await get_db()
        for alias in aliases:
            cursor = await db.execute(
                "SELECT * FROM messages WHERE agent_id = ? ORDER BY created_at ASC LIMIT ?",
                (alias, safe_limit),
            )
            add_rows([dict(row) for row in await cursor.fetchall()])
            cursor = await db.execute(
                "SELECT id FROM sessions WHERE agent_id = ? ORDER BY updated_at DESC LIMIT ?",
                (alias, safe_limit),
            )
            for session in await cursor.fetchall():
                cursor2 = await db.execute(
                    "SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?",
                    (session["id"], safe_limit),
                )
                add_rows([dict(row) for row in await cursor2.fetchall()])

    messages = sorted(by_id.values(), key=lambda row: str(row.get("created_at") or ""))
    return messages[-safe_limit:]


async def list_message_agents(limit: int = 1000) -> list[dict[str, Any]]:
    safe_limit = max(1, min(int(limit or 1000), 5000))
    rows: list[dict[str, Any]] = []
    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_messages_table,
            select="id,session_id,agent_id,role,content,created_at",
            order="created_at.desc",
            limit=safe_limit,
        )
    else:
        db = await get_db()
        cursor = await db.execute(
            "SELECT id, session_id, agent_id, role, content, created_at FROM messages ORDER BY created_at DESC LIMIT ?",
            (safe_limit,),
        )
        rows = [dict(row) for row in await cursor.fetchall()]

    agents: dict[str, dict[str, Any]] = {}
    for row in rows:
        try:
            agent_id = normalize_agent_id_value(row.get("agent_id")) if row.get("agent_id") else ""
        except AgentResolutionError:
            agent_id = ""
        if not agent_id:
            continue
        current = agents.get(agent_id)
        if current:
            current["message_count"] += 1
            continue
        agents[agent_id] = {
            "agent_id": agent_id,
            "last_message": str(row.get("content") or ""),
            "last_message_at": str(row.get("created_at") or ""),
            "message_count": 1,
            "session_id": str(row.get("session_id") or ""),
        }
    return sorted(agents.values(), key=lambda item: str(item.get("last_message_at") or ""), reverse=True)


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


async def list_recent_cot_logs(
    *,
    limit: int = 20,
    agent_id: str | None = None,
    session_id: str | None = None,
) -> list[dict[str, Any]]:
    safe_limit = max(1, min(int(limit or 20), 100))
    normalized_agent_id = normalize_agent_id(agent_id) if agent_id else ""
    safe_session_id = str(session_id or "").strip()
    if _use_supabase_data():
        filters: dict[str, str] = {}
        if normalized_agent_id:
            filters["agent_id"] = f"eq.{normalized_agent_id}"
        if safe_session_id:
            filters["session_id"] = f"eq.{safe_session_id}"
        try:
            return await _supabase_select(
                "cot_logs",
                filters=filters or None,
                order="created_at.desc",
                limit=safe_limit,
            )
        except Exception as exc:
            logger.debug("Supabase recent cot_logs select skipped: %s", exc)
            return []

    db = await get_db()
    where: list[str] = []
    params: list[Any] = []
    if normalized_agent_id:
        where.append("agent_id = ?")
        params.append(normalized_agent_id)
    if safe_session_id:
        where.append("session_id = ?")
        params.append(safe_session_id)
    query = "SELECT * FROM cot_logs"
    if where:
        query += " WHERE " + " AND ".join(where)
    query += " ORDER BY created_at DESC LIMIT ?"
    params.append(safe_limit)
    cursor = await db.execute(query, params)
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def list_memory_candidates(
    *,
    agent_id: str | None = None,
    status: str = "candidate",
    limit: int = 30,
) -> list[dict[str, Any]]:
    """List daily_loop memory_candidate cot_log entries."""
    safe_limit = max(1, min(int(limit or 30), 100))
    normalized_agent = normalize_agent_id(agent_id) if agent_id else ""
    if _use_supabase_data():
        filters: dict[str, str] = {
            "source": "eq.daily_loop",
            "log_type": "eq.memory_candidate",
            "status": f"eq.{status}",
        }
        if normalized_agent:
            filters["agent_id"] = f"eq.{normalized_agent}"
        try:
            return await _supabase_select(
                "cot_logs",
                filters=filters,
                order="created_at.desc",
                limit=safe_limit,
            )
        except Exception as exc:
            logger.debug("Supabase list_memory_candidates skipped: %s", exc)
            return []
    conn = await get_db()
    where = ["source = ?", "log_type = ?", "status = ?"]
    params: list[Any] = ["daily_loop", "memory_candidate", status]
    if normalized_agent:
        where.append("agent_id = ?")
        params.append(normalized_agent)
    query = "SELECT * FROM cot_logs WHERE " + " AND ".join(where) + " ORDER BY created_at DESC LIMIT ?"
    params.append(safe_limit)
    cursor = await conn.execute(query, params)
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def update_cot_log_status(log_id: str, status: str) -> bool:
    """Update status field of a cot_log row."""
    safe_id = str(log_id or "").strip()
    safe_status = str(status or "").strip()[:40]
    if not safe_id:
        return False
    now = _now()
    if _use_supabase_data():
        try:
            rows = await _supabase_update_verified(
                "cot_logs",
                {"status": safe_status, "expires_at": now},
                {"id": f"eq.{safe_id}"},
            )
            return bool(rows)
        except Exception as exc:
            logger.warning("Supabase update_cot_log_status failed: %s", exc)
            return False
    conn = await get_db()
    cursor = await conn.execute(
        "UPDATE cot_logs SET status = ? WHERE id = ?",
        (safe_status, safe_id),
    )
    await conn.commit()
    return cursor.rowcount > 0


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

def _memory_normalize_content(text: str) -> str:
    """Canonical form of memory text for exact dedup (lazy import to avoid cycle)."""
    from consciousness.memory_filter import normalize_memory_text
    return normalize_memory_text(text)


def _sanitize_memory_role_labels(text: str) -> str:
    value = re.sub(r"\s+", " ", str(text or "").strip())
    if not value:
        return ""
    replacements = [
        (r"(?:用户|使用者|User)\s*(?:和|与|及|、|/)\s*(?:助手|助理|Assistant)", "双方"),
        (r"(?:助手|助理|Assistant)\s*(?:和|与|及|、|/)\s*(?:用户|使用者|User)", "双方"),
        (r"用户\s*对\s*助手", "对当前角色"),
        (r"用户\s*称呼\s*助手", "称呼当前角色"),
        (r"用户\s*希望\s*助手", "希望当前角色"),
        (r"用户\s*要求\s*助手", "要求当前角色"),
    ]
    for pattern, replacement in replacements:
        value = re.sub(pattern, replacement, value, flags=re.IGNORECASE)
    value = re.sub(r"^(?:用户|使用者|User|助手|助理|Assistant)\s*[：:，,、-]\s*", "", value, flags=re.IGNORECASE)
    value = re.sub(r"^(?:用户|使用者|User)\s*", "", value, flags=re.IGNORECASE)
    value = re.sub(r"^(?:助手|助理|Assistant)\s*", "当前角色", value, flags=re.IGNORECASE)
    value = re.sub(r"(?:用户|使用者|User)", "对方", value, flags=re.IGNORECASE)
    value = re.sub(r"(?:助手|助理|Assistant)", "当前角色", value, flags=re.IGNORECASE)
    return value.strip(" ，,。")


def _memory_filter_candidate(content: str, *, tag: str = "", source: str = "") -> None:
    """Raise MemoryRejected if an automatic-source candidate should not be stored."""
    from consciousness.memory_filter import should_store_memory
    ok, reason = should_store_memory(content, tag=tag, source=source)
    if not ok:
        raise MemoryRejected(reason)


async def _find_duplicate_memory(agent_id: str, normalized_content: str) -> dict[str, Any] | None:
    """Find an existing active memory for this agent with identical normalized content."""
    normalized = (normalized_content or "").strip()
    if not normalized:
        return None
    owner = normalize_agent_id(agent_id)
    if _use_supabase_memory():
        if await _supabase_table_has_column(settings.supabase_memories_table, "normalized_content"):
            rows = await _supabase_select(
                settings.supabase_memories_table,
                filters={
                    "agent_id": f"eq.{owner}",
                    "normalized_content": f"eq.{normalized}",
                },
                order="updated_at.desc",
                limit=1,
            )
            return rows[0] if rows else None
        # Column not migrated yet — fall back to in-memory comparison.
        rows = await _supabase_list_memories(limit=2000, agent_id=owner, include_cross_agent=False)
        for row in rows:
            if _memory_normalize_content(memory_raw_content(row)) == normalized:
                return row
        return None
    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM memories WHERE agent_id = ? AND normalized_content = ? "
        "ORDER BY updated_at DESC LIMIT 1",
        (owner, normalized),
    )
    row = await cursor.fetchone()
    return dict(row) if row else None


async def _merge_duplicate_memory(existing: dict[str, Any], importance_value: int) -> dict[str, Any]:
    """Merge a duplicate write into an existing memory: bump importance, warm it up."""
    mid = str(existing.get("id") or "").strip()
    if not mid:
        return existing
    new_importance = max(_memory_importance(existing), int(importance_value or 0)) or 3
    try:
        if new_importance != _memory_importance(existing):
            await update_memory(mid, importance=new_importance)
            existing["importance"] = new_importance
        await touch_memories([mid], reason="dedup_merge", delta=0.5)
    except Exception as exc:
        logger.warning("memory dedup merge failed for %s: %s", mid, exc)
    logger.info("add_memory: merged duplicate into %s (importance=%d)", mid, new_importance)
    return existing


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
    apply_filter: bool = False,
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
    stored_content = _sanitize_memory_role_labels(content)
    raw_text = _sanitize_memory_role_labels(raw_content if raw_content is not None else stored_content)
    compressed_text = _sanitize_memory_role_labels(compressed_content)
    if not stored_content:
        stored_content = raw_text or compressed_text
    importance_value = max(1, min(5, int(importance or 3)))
    # 无到期时间统一存 NULL（而非 ''），否则 active 过滤会把空串当成已过期而隐藏记忆。
    expires_value = (expires_at or "").strip() or None

    # 自动来源统一过滤：过程文本/工具说明/报错/临时状态/自我解释一律拒绝。
    candidate_text = raw_text or stored_content
    if apply_filter:
        _memory_filter_candidate(candidate_text, tag=tags or "", source=source or "")

    # 精确去重：同 agent 下归一化内容相同则 merge 既有记忆，不插新行。
    normalized_content = _memory_normalize_content(candidate_text)
    duplicate = await _find_duplicate_memory(normalized_agent, normalized_content)
    if duplicate is not None:
        return await _merge_duplicate_memory(duplicate, importance_value)

    resolved_source_agent = await resolve_source_agent_id_checked(normalized_agent, source_agent_id)
    if _use_supabase_memory():
        memory = await _supabase_add_memory(
            agent_id=normalized_agent,
            visibility=normalize_visibility(visibility),
            source_agent_id=resolved_source_agent,
            content=stored_content,
            normalized_content=normalized_content,
            raw_content=raw_text,
            compressed_content=compressed_text,
            category=normalized_category,
            tags=tags,
            source=source,
            importance=importance_value,
            expires_at=expires_value,
        )
        try:
            await _schedule_memory_processing(memory["id"], raw_text)
        except Exception as exc:
            logger.warning("Failed to schedule memory processing %s: %s", memory.get("id"), exc)
        memory = await _attach_related_memories_after_write(memory, raw_text)
        return memory
    db = await get_db()
    mid = _new_id()
    now = _now()
    await db.execute(
        """
        INSERT INTO memories (
            id, agent_id, visibility, source_agent_id, content, normalized_content, raw_content, compressed_content, category, tags, source, importance, expires_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            mid,
            normalized_agent,
            normalize_visibility(visibility),
            resolved_source_agent,
            stored_content,
            normalized_content,
            raw_text,
            compressed_text,
            normalized_category,
            tags,
            source,
            importance_value,
            expires_value,
            now,
            now,
        ),
    )
    await db.commit()
    memory = {
        "id": mid,
        "agent_id": normalized_agent,
        "visibility": normalize_visibility(visibility),
        "source_agent_id": resolved_source_agent,
        "content": stored_content,
        "normalized_content": normalized_content,
        "raw_content": raw_text,
        "compressed_content": compressed_text,
        "category": normalized_category,
        "tags": tags,
        "source": source,
        "importance": importance_value,
        "temperature": 0.0,
        "last_touched_at": "",
        "touch_count": 0,
        "expires_at": expires_value or "",
        "created_at": now,
        "updated_at": now,
    }
    try:
        await _schedule_memory_processing(memory["id"], raw_text)
    except Exception as exc:
        logger.warning("Failed to schedule memory processing %s: %s", memory.get("id"), exc)
    memory = await _attach_related_memories_after_write(memory, raw_text)
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
    schedule_source_text = ""
    content_changed = False
    if "raw_content" in kwargs:
        raw_text = (kwargs.get("raw_content") or "").strip()
        kwargs["raw_content"] = raw_text
        schedule_source_text = raw_text
        content_changed = True
    if "content" in kwargs:
        content_text = (kwargs.get("content") or "").strip()
        kwargs["content"] = content_text
        if not schedule_source_text:
            schedule_source_text = content_text
        content_changed = True
    if "compressed_content" in kwargs:
        compressed = (kwargs.get("compressed_content") or "").strip()
        kwargs["compressed_content"] = compressed
    elif content_changed:
        kwargs["compressed_content"] = ""
    if "importance" in kwargs and kwargs["importance"] is not None:
        kwargs["importance"] = max(1, min(5, int(kwargs["importance"])))
    if "expires_at" in kwargs and kwargs["expires_at"] is None:
        kwargs["expires_at"] = ""
    if _use_supabase_memory():
        ok = await _supabase_update_memory(memory_id, **kwargs)
        if ok and schedule_source_text:
            try:
                await _schedule_memory_processing(memory_id, schedule_source_text)
            except Exception as exc:
                logger.warning("Failed to refresh memory processing %s: %s", memory_id, exc)
        return ok
    db = await get_db()
    kwargs["updated_at"] = _now()
    sets = ", ".join(f"{k} = ?" for k in kwargs)
    vals = list(kwargs.values()) + [memory_id]
    result = await db.execute(f"UPDATE memories SET {sets} WHERE id = ?", vals)
    await db.commit()
    if result.rowcount > 0 and schedule_source_text:
        try:
            await _schedule_memory_processing(memory_id, schedule_source_text)
        except Exception as exc:
            logger.warning("Failed to refresh memory processing %s: %s", memory_id, exc)
    return result.rowcount > 0


async def delete_memory(memory_id: str) -> bool:
    memory_id = str(memory_id or "").strip()
    if not memory_id:
        return False
    if _use_supabase_memory():
        ok = await _supabase_delete_memory(memory_id)
        if ok:
            await _delete_embedding(memory_id)
        return ok
    db = await get_db()
    await db.execute("DELETE FROM memory_label_items WHERE memory_id = ?", (memory_id,))
    await db.execute("DELETE FROM memory_logs WHERE memory_id = ?", (memory_id,))
    await db.execute("UPDATE proactive_messages SET source_memory_id = '' WHERE source_memory_id = ?", (memory_id,))
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
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    touch: bool = True,
) -> list[dict[str, Any]]:
    """Keyword search memories"""
    if _use_supabase_memory():
        rows = await _supabase_search_memories(
            keyword=keyword,
            category=category,
            limit=limit,
            agent_id=agent_id,
            include_cross_agent=include_cross_agent,
            cross_agent_limit=cross_agent_limit,
        )
        if touch and rows:
            await touch_memories([str(row.get("id") or "") for row in rows], reason="retrieval_hit", delta=0.5)
        return rows
    db = await get_db()
    query = f"SELECT * FROM memories WHERE {_memory_visibility_where_clause(include_cross_agent)} AND {_memory_active_where_clause()}"
    params: list[Any] = [*_memory_scope_params(normalize_agent_id(agent_id), include_cross_agent), _now()]
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
    results = _memory_scope_post_filter(
        [item[1] for item in scored],
        agent_id=normalize_agent_id(agent_id),
        include_cross_agent=include_cross_agent,
        cross_agent_limit=cross_agent_limit,
    )[:limit]
    if touch and results:
        await touch_memories([str(row.get("id") or "") for row in results], reason="retrieval_hit", delta=0.5)
    return results


async def semantic_search_memories(
    query_text: str,
    category: str = None,
    limit: int = 10,
    *,
    agent_id: str | None = None,
    include_cross_agent: bool = False,
    cross_agent_limit: int | None = None,
    touch: bool = True,
) -> list[dict[str, Any]]:
    query = (query_text or "").strip()
    if not query:
        return []

    if not _can_use_embeddings():
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit, touch=touch)

    if _use_supabase_memory():
        try:
            query_embedding = await _fetch_embedding(query)
            rows = await _supabase_match_memories(
                query_embedding,
                category=category,
                limit=max(limit * 4, 20),
                agent_id=agent_id,
                include_cross_agent=include_cross_agent,
                cross_agent_limit=cross_agent_limit,
            )
            if rows:
                rows = [
                    _attach_memory_rank_fields(item, _safe_float(item.get("similarity"), 0.0))
                    for item in rows
                ]
                rows.sort(
                    key=lambda item: (
                        _safe_float(item.get("final_score"), 0.0),
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
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit, touch=touch)

    candidate_limit = max(limit, getattr(settings, "memory_vector_candidate_limit", 200))
    candidates = await list_memories(category=category, limit=candidate_limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit)
    if not candidates:
        return []

    try:
        query_embedding = await _fetch_embedding(query)
    except Exception as exc:
        logger.warning("Semantic memory query failed, fallback to keyword search: %s", exc)
        return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit, touch=touch)

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
        enriched = _attach_memory_rank_fields(memory, score)
        enriched["score"] = enriched["final_score"]
        blended = _safe_float(enriched.get("final_score"), 0.0)
        scored.append((blended, score, enriched))

    scored.sort(key=lambda item: (item[0], item[1]), reverse=True)
    results = [item[2] for item in scored[:limit]]
    if results:
        if touch:
            await touch_memories([str(row.get("id") or "") for row in results], reason="retrieval_hit", delta=0.5)
        return results
    return await search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit, touch=touch)


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
            current_temp = min(cap_value, _memory_temperature(row))
            effective_delta = delta_value * max(0.0, 1.0 - (current_temp / cap_value)) if cap_value > 0 else 0.0
            next_temp = min(cap_value, current_temp + effective_delta)
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
                    await add_memory_log(mid, "touch", f"{reason}|delta={round(effective_delta, 4)}")
                except Exception:
                    pass
        return touched

    db = await get_db()
    touched = 0
    for mid in unique_ids:
        cursor = await db.execute("SELECT temperature FROM memories WHERE id = ? LIMIT 1", (mid,))
        row = await cursor.fetchone()
        if not row:
            continue
        current_temp = min(cap_value, _safe_float(row["temperature"], 0.0))
        effective_delta = delta_value * max(0.0, 1.0 - (current_temp / cap_value)) if cap_value > 0 else 0.0
        result = await db.execute(
            """
            UPDATE memories
            SET temperature = MIN(?, COALESCE(temperature, 0) + ?),
                last_touched_at = ?,
                touch_count = COALESCE(touch_count, 0) + 1
            WHERE id = ?
            """,
            (cap_value, effective_delta, now, mid),
        )
        if result.rowcount > 0:
            touched += 1
            try:
                await add_memory_log(mid, "touch", f"{reason}|delta={round(effective_delta, 4)}")
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

async def add_context_summary(
    session_id: str,
    summary: str,
    msg_start: str = "",
    msg_end: str = "",
    *,
    agent_id: str | None = None,
) -> dict[str, Any]:
    session = await get_session(session_id)
    resolved_agent_id = normalize_agent_id(agent_id or (session or {}).get("agent_id"))
    if _use_supabase_data():
        sid = _new_id()
        now = _now()
        payload = {
            "id": sid,
            "session_id": session_id,
            "agent_id": resolved_agent_id,
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
        "INSERT INTO context_summaries (id, session_id, agent_id, summary, msg_range_start, msg_range_end, created_at) VALUES (?,?,?,?,?,?,?)",
        (sid, session_id, resolved_agent_id, summary, msg_start, msg_end, now),
    )
    await db.commit()
    return {"id": sid, "session_id": session_id, "agent_id": resolved_agent_id, "summary": summary, "created_at": now}


async def get_context_summaries(
    session_id: str,
    limit: int = 5,
    *,
    agent_id: str | None = None,
) -> list[dict[str, Any]]:
    resolved_agent_id = normalize_agent_id(agent_id) if agent_id else None
    if _use_supabase_data():
        filters = {"session_id": f"eq.{session_id}"}
        if resolved_agent_id:
            filters["agent_id"] = f"eq.{resolved_agent_id}"
        return await _supabase_select(
            settings.supabase_context_summaries_table,
            filters=filters,
            order="created_at.desc",
            limit=limit,
        )
    db = await get_db()
    if resolved_agent_id:
        cursor = await db.execute(
            "SELECT * FROM context_summaries WHERE session_id = ? AND agent_id = ? ORDER BY created_at DESC LIMIT ?",
            (session_id, resolved_agent_id, limit),
        )
    else:
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
    *,
    agent_id: str | None = None,
) -> bool:
    """Generate incremental summary for long session"""
    messages = await get_messages(session_id=session_id, limit=1000)
    if len(messages) < max(trigger_messages, keep_recent_messages + min_batch_messages):
        return False

    last_end_id = ""
    summaries = await get_context_summaries(session_id=session_id, limit=1, agent_id=agent_id)
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
        agent_id=agent_id,
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
    visibility: str = "public",
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
    visibility: str = "public",
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
        "visibility": normalize_visibility(visibility or "public"),
        "created_at": created,
        "updated_at": updated,
    }
    if _use_supabase_data():
        return await _supabase_insert_verified(settings.supabase_diary_entries_table, payload, on_conflict="id")
    db = await get_db()
    await db.execute(
        """
        INSERT OR IGNORE INTO diary_entries
        (id, notebook_id, title, content, tags, visibility, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["notebook_id"],
            payload["title"],
            payload["content"],
            payload["tags"],
            payload["visibility"],
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
                visibility=str(row.get("visibility") or "public"),
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
    visibility: str = "public",
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


async def list_diary_entries(
    notebook_id: str,
    limit: int = 100,
    *,
    viewer_agent_id: str | None = None,
    enforce_visibility: bool = False,
) -> list[dict[str, Any]]:
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
        if enforce_visibility and not _diary_entry_visible_to_agent(row, notebook, viewer_agent_id):
            continue
        entry_id = str(row.get("id") or "")
        comments = await list_diary_comments(entry_id)
        annotations = await list_diary_annotations(entry_id)
        normalized = _normalize_diary_entry_row(row, notebook=notebook, comments=comments, annotations=annotations)
        if normalized:
            entries.append(normalized)
    return entries


async def create_diary_entry(
    notebook_id: str,
    *,
    title: str = "",
    content: str,
    tags: str = "",
    visibility: str = "public",
) -> dict[str, Any] | None:
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
        "visibility": normalize_visibility(visibility or "public"),
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
        INSERT INTO diary_entries (id, notebook_id, title, content, tags, visibility, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"],
            payload["notebook_id"],
            payload["title"],
            payload["content"],
            payload["tags"],
            payload["visibility"],
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
    visibility: str = "public",
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
        visibility=visibility,
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
    visibility: str | None = None,
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
    if visibility is not None:
        payload["visibility"] = normalize_visibility(visibility)
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


async def update_diary_entry(
    entry_id: str,
    *,
    title: str | None = None,
    content: str | None = None,
    tags: str | None = None,
    visibility: str | None = None,
) -> dict[str, Any] | None:
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
    if visibility is not None:
        payload["visibility"] = normalize_visibility(visibility)
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
    fallback_author_type, fallback_author_id = _current_user_subject()
    author_type = normalize_subject_type(author_type or fallback_author_type)
    author_id = normalize_subject_id(author_type, author_id or fallback_author_id)
    if author_type == "agent":
        author_id = await require_agent(author_id)
    if not notebook or not _diary_entry_can_comment(row, notebook, author_id if author_type == "agent" else None):
        return None
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
    if not _diary_entry_can_comment(row, notebook, normalized_author_id if normalized_author_type == "agent" else None):
        return None
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
    visibility: str = "public",
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
        visibility=visibility,
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
        visibility=kwargs.get("visibility"),
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
    source_memory_id: str = "",
    topic_key: str = "",
    similarity_key: str = "",
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
            "source_memory_id": str(source_memory_id or "").strip(),
            "topic_key": str(topic_key or "").strip(),
            "similarity_key": str(similarity_key or topic_key or "").strip(),
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
            agent_id, output_type, reason_type, reason_context, source_snapshot_at,
            source_memory_id, topic_key, similarity_key, is_read
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """,
        (
            pid, content, trigger_reason, "pending", now,
            agent_id, output_type, reason_type, reason_context, source_snapshot_at,
            str(source_memory_id or "").strip(), str(topic_key or "").strip(),
            str(similarity_key or topic_key or "").strip(), 0
        ),
    )
    await db.commit()
    return {
        "id": pid, "content": content, "trigger_reason": trigger_reason, "status": "pending", "created_at": now,
        "agent_id": agent_id, "output_type": output_type, "reason_type": reason_type,
        "reason_context": reason_context, "source_snapshot_at": source_snapshot_at,
        "source_memory_id": str(source_memory_id or "").strip(), "topic_key": str(topic_key or "").strip(),
        "similarity_key": str(similarity_key or topic_key or "").strip(), "is_read": 0,
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


async def list_proactive_messages(limit: int = 20, agent_id: str | None = None) -> list[dict[str, Any]]:
    safe_limit = max(1, min(int(limit or 20), 100))
    normalized_agent_id = normalize_agent_id(agent_id) if agent_id else ""
    if _use_supabase_data():
        filters = {"agent_id": f"eq.{normalized_agent_id}"} if normalized_agent_id else None
        rows = await _supabase_select(
            settings.supabase_proactive_messages_table,
            filters=filters,
            order="created_at.desc",
            limit=safe_limit,
        )
        return [dict(row) for row in rows]
    db = await get_db()
    if normalized_agent_id:
        cursor = await db.execute(
            "SELECT * FROM proactive_messages WHERE agent_id = ? ORDER BY created_at DESC LIMIT ?",
            (normalized_agent_id, safe_limit),
        )
    else:
        cursor = await db.execute(
            "SELECT * FROM proactive_messages ORDER BY created_at DESC LIMIT ?",
            (safe_limit,),
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

async def add_memory_log(memory_id: str, action: str, detail: str = "", *, agent_id: str | None = None):
    resolved_agent_id = normalize_agent_id(agent_id) if agent_id else ""
    if _use_supabase_data():
        if not resolved_agent_id and memory_id:
            rows = await _supabase_select(
                settings.supabase_memories_table,
                filters={"id": f"eq.{memory_id}"},
                select="agent_id",
                limit=1,
            )
            resolved_agent_id = normalize_agent_id((rows[0] if rows else {}).get("agent_id"))
        if not resolved_agent_id:
            resolved_agent_id = normalize_agent_id(None)
        lid = _new_id()
        now = _now()
        await _supabase_insert_verified(
            settings.supabase_memory_logs_table,
            {
                "id": lid,
                "memory_id": memory_id,
                "agent_id": resolved_agent_id,
                "action": action,
                "detail": detail,
                "created_at": now,
            },
        )
        return
    db = await get_db()
    if not resolved_agent_id and memory_id:
        cursor = await db.execute("SELECT agent_id FROM memories WHERE id = ? LIMIT 1", (memory_id,))
        row = await cursor.fetchone()
        resolved_agent_id = normalize_agent_id(row["agent_id"] if row else None)
    if not resolved_agent_id:
        resolved_agent_id = normalize_agent_id(None)
    lid = _new_id()
    now = _now()
    await db.execute(
        "INSERT INTO memory_logs (id, memory_id, agent_id, action, detail, created_at) VALUES (?,?,?,?,?,?)",
        (lid, memory_id, resolved_agent_id, action, detail, now),
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


# ==================== Activity Events ====================

def _parse_iso_datetime(value: Any) -> datetime | None:
    text = str(value or "").strip()
    if not text:
        return None
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
    except Exception:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def _activity_dedupe_key(
    event_type: str,
    event_value: str,
    content: str,
    explicit: str | None = None,
) -> str:
    raw = str(explicit or "").strip()
    if raw:
        return raw
    parts = [
        re.sub(r"\s+", " ", str(event_type or "").strip().lower()),
        re.sub(r"\s+", " ", str(event_value or "").strip().lower()),
        re.sub(r"\s+", " ", str(content or "").strip().lower()),
    ]
    return hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()


def _normalize_activity_event(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["event_type"] = str(item.get("event_type") or "").strip()
    item["event_value"] = str(item.get("event_value") or "").strip()
    item["content"] = str(item.get("content") or "").strip()
    item["url"] = str(item.get("url") or "").strip()
    item["source"] = str(item.get("source") or "").strip() or "manual"
    item["dedupe_key"] = str(item.get("dedupe_key") or "").strip()
    item["consumed"] = bool(item.get("consumed"))
    item["consumed_at"] = str(item.get("consumed_at") or "").strip()
    item["gate_status"] = str(item.get("gate_status") or "pending").strip() or "pending"
    item["gate_should_handle"] = bool(item.get("gate_should_handle"))
    item["gate_should_notify_llm"] = bool(item.get("gate_should_notify_llm"))
    item["gate_message_hint"] = str(item.get("gate_message_hint") or "").strip()
    item["gate_reason"] = str(item.get("gate_reason") or "").strip()
    item["screened_at"] = str(item.get("screened_at") or "").strip()
    item["created_at"] = str(item.get("created_at") or "").strip()
    item["occurred_at"] = str(item.get("occurred_at") or item.get("created_at") or "").strip()
    return item


async def update_activity_event_gate(
    event_id: str,
    *,
    gate_status: str = "screened",
    gate_should_handle: bool = False,
    gate_should_notify_llm: bool = False,
    gate_message_hint: str = "",
    gate_reason: str = "",
) -> dict[str, Any] | None:
    event_id = str(event_id or "").strip()
    if not event_id:
        return None
    payload = {
        "gate_status": str(gate_status or "screened").strip() or "screened",
        "gate_should_handle": bool(gate_should_handle),
        "gate_should_notify_llm": bool(gate_should_notify_llm),
        "gate_message_hint": str(gate_message_hint or "").strip(),
        "gate_reason": str(gate_reason or "").strip(),
        "screened_at": datetime.now(timezone.utc).isoformat(),
    }
    if _use_supabase_data():
        row = await _supabase_update_verified(
            settings.supabase_activity_events_table,
            {"id": f"eq.{event_id}"},
            payload,
        )
        return _normalize_activity_event(row)
    db = await get_db()
    await db.execute(
        """
        UPDATE activity_events
        SET gate_status = ?,
            gate_should_handle = ?,
            gate_should_notify_llm = ?,
            gate_message_hint = ?,
            gate_reason = ?,
            screened_at = ?
        WHERE id = ?
        """,
        (
            payload["gate_status"],
            1 if payload["gate_should_handle"] else 0,
            1 if payload["gate_should_notify_llm"] else 0,
            payload["gate_message_hint"],
            payload["gate_reason"],
            payload["screened_at"],
            event_id,
        ),
    )
    await db.commit()
    cursor = await db.execute("SELECT * FROM activity_events WHERE id = ?", (event_id,))
    row = await cursor.fetchone()
    return _normalize_activity_event(dict(row)) if row else None


async def add_activity_event(
    *,
    event_type: str,
    event_value: str = "",
    content: str = "",
    url: str = "",
    source: str = "manual",
    occurred_at: str | None = None,
    dedupe_key: str | None = None,
) -> tuple[dict[str, Any], bool]:
    """Insert a short-lived activity event with a five-minute dedupe window."""
    normalized_type = str(event_type or "").strip()
    normalized_value = str(event_value or "").strip()
    normalized_content = str(content or "").strip()
    if not normalized_type:
        raise ValueError("event_type is required")
    if not normalized_value and not normalized_content:
        raise ValueError("event_value or content is required")

    now_dt = datetime.now(timezone.utc)
    now = now_dt.isoformat()
    occurred = str(occurred_at or "").strip() or now
    key = _activity_dedupe_key(normalized_type, normalized_value, normalized_content, dedupe_key)
    window_start = now_dt - timedelta(minutes=5)

    if _use_supabase_data():
        rows = await _supabase_select(
            settings.supabase_activity_events_table,
            filters={"dedupe_key": f"eq.{key}"},
            order="created_at.desc",
            limit=1,
        )
        if rows:
            recent = _normalize_activity_event(rows[0])
            recent_created = _parse_iso_datetime(recent.get("created_at") if recent else "")
            if recent and recent_created and recent_created >= window_start:
                logger.info("activity_event deduped: key=%s id=%s", key, recent.get("id"))
                return recent, True
        payload = {
            "id": _new_id(),
            "event_type": normalized_type,
            "event_value": normalized_value,
            "content": normalized_content,
            "url": str(url or "").strip(),
            "source": str(source or "").strip() or "manual",
            "created_at": now,
            "occurred_at": occurred,
            "dedupe_key": key,
            "consumed": False,
            "consumed_at": None,
        }
        row = await _supabase_insert_verified(settings.supabase_activity_events_table, payload)
        logger.info("activity_event inserted: id=%s type=%s value=%s", row.get("id"), normalized_type, normalized_value)
        return _normalize_activity_event(row), False

    db = await get_db()
    cursor = await db.execute(
        "SELECT * FROM activity_events WHERE dedupe_key = ? ORDER BY created_at DESC LIMIT 1",
        (key,),
    )
    row = await cursor.fetchone()
    if row:
        recent = _normalize_activity_event(dict(row))
        recent_created = _parse_iso_datetime(recent.get("created_at") if recent else "")
        if recent and recent_created and recent_created >= window_start:
            logger.info("activity_event deduped: key=%s id=%s", key, recent.get("id"))
            return recent, True

    payload = {
        "id": _new_id(),
        "event_type": normalized_type,
        "event_value": normalized_value,
        "content": normalized_content,
        "url": str(url or "").strip(),
        "source": str(source or "").strip() or "manual",
        "created_at": now,
        "occurred_at": occurred,
        "dedupe_key": key,
        "consumed": 0,
        "consumed_at": "",
    }
    await db.execute(
        """
        INSERT INTO activity_events (
            id, event_type, event_value, content, url, source,
            created_at, occurred_at, dedupe_key, consumed, consumed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"], payload["event_type"], payload["event_value"], payload["content"],
            payload["url"], payload["source"], payload["created_at"], payload["occurred_at"],
            payload["dedupe_key"], payload["consumed"], payload["consumed_at"],
        ),
    )
    await db.commit()
    logger.info("activity_event inserted: id=%s type=%s value=%s", payload["id"], normalized_type, normalized_value)
    return _normalize_activity_event(payload), False


async def list_recent_activity_events(
    hours: float = 6,
    limit: int = 10,
    *,
    only_relevant: bool = False,
) -> list[dict[str, Any]]:
    hours = max(0.1, float(hours or 6))
    limit = max(1, min(int(limit or 10), 100))
    since = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
    if _use_supabase_data():
        fetch_limit = min(limit * 4, 100) if only_relevant else limit
        rows = await _supabase_select(
            settings.supabase_activity_events_table,
            filters={"occurred_at": f"gte.{since}"},
            order="occurred_at.desc",
            limit=fetch_limit,
        )
        items = [item for item in (_normalize_activity_event(row) for row in rows) if item]
        if only_relevant:
            items = [item for item in items if item.get("gate_should_handle") or item.get("gate_should_notify_llm")]
        return items[:limit]
    db = await get_db()
    where = "occurred_at >= ?"
    params: list[Any] = [since]
    if only_relevant:
        where += " AND (gate_should_handle = 1 OR gate_should_notify_llm = 1)"
    cursor = await db.execute(
        f"""
        SELECT * FROM activity_events
        WHERE {where}
        ORDER BY occurred_at DESC, created_at DESC
        LIMIT ?
        """,
        (*params, limit),
    )
    rows = await cursor.fetchall()
    return [item for item in (_normalize_activity_event(dict(row)) for row in rows) if item]


async def get_recent_activity(
    hours: float = 6,
    limit: int = 8,
    *,
    only_relevant: bool = False,
) -> list[dict[str, Any]]:
    return await list_recent_activity_events(
        hours=hours,
        limit=limit,
        only_relevant=only_relevant,
    )


def format_recent_activity_block(events: list[dict[str, Any]]) -> str:
    if not events:
        return "Dream's recent activity: none"
    lines = ["Dream's recent activity:"]
    for event in sorted(events, key=lambda item: str(item.get("occurred_at") or item.get("created_at") or "")):
        ts = _parse_iso_datetime(event.get("occurred_at") or event.get("created_at"))
        hhmm = ts.astimezone().strftime("%H:%M") if ts else "--:--"
        kind = str(event.get("event_type") or "event").strip()
        value = str(event.get("event_value") or "").strip()
        label = f"{kind}/{value}" if value else kind
        content = str(event.get("content") or event.get("url") or "").strip()
        lines.append(f"- {hhmm} {label}: {content}")
    return "\n".join(lines)


# ==================== Extracted Items (Unified Inbox) ====================

def _make_dedupe_key(item_type: str, source_excerpt: str, content: str) -> str:
    """Generate a deduplication key based on type + normalized text content."""
    text = (source_excerpt or content or "")[:100]
    text = text.strip().lower()
    text = re.sub(r"\s+", " ", text)
    raw = f"{item_type}:{text}"
    return hashlib.md5(raw.encode("utf-8")).hexdigest()[:16]


async def create_extracted_item(
    *,
    type: str,
    title: str,
    content: str = "",
    source_excerpt: str = "",
    target_module: str = "inbox",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict | None = None,
    dedupe_key: str | None = None,
) -> dict[str, Any]:
    item_id = _new_id()
    now = _now()
    meta_str = json.dumps(metadata or {}, ensure_ascii=False)
    dk = dedupe_key or _make_dedupe_key(type, source_excerpt, content or title)

    if _use_supabase_data():
        payload = {
            "id": item_id,
            "agent_id": agent_id,
            "session_id": session_id,
            "message_id": message_id,
            "type": type,
            "title": title,
            "content": content,
            "source_excerpt": source_excerpt,
            "target_module": target_module,
            "status": status,
            "metadata": metadata or {},
            "dedupe_key": dk,
            "created_at": now,
            "updated_at": now,
            "handled_at": "",
        }
        try:
            return await _supabase_insert_verified(
                settings.supabase_extracted_items_table,
                payload,
                on_conflict="dedupe_key",
            )
        except Exception as exc:
            # dedupe conflict — fetch existing
            try:
                rows = await _supabase_select(
                    settings.supabase_extracted_items_table,
                    filters={"dedupe_key": f"eq.{dk}"},
                    limit=1,
                )
                if rows:
                    return rows[0]
            except Exception:
                pass
            fallback_payloads = []
            plain_payload = dict(payload)
            fallback_payloads.append(plain_payload)
            compat_payload = dict(payload)
            compat_payload.pop("dedupe_key", None)
            compat_payload.pop("handled_at", None)
            fallback_payloads.append(compat_payload)
            minimal_payload = {
                "id": item_id,
                "type": type,
                "title": title,
                "content": content,
                "target_module": target_module,
                "status": status,
                "created_at": now,
                "updated_at": now,
            }
            fallback_payloads.append(minimal_payload)
            last_error = exc
            for fallback_payload in fallback_payloads:
                try:
                    return await _supabase_insert_verified(
                        settings.supabase_extracted_items_table,
                        fallback_payload,
                    )
                except Exception as retry_exc:
                    last_error = retry_exc
            raise last_error

    db = await get_db()
    try:
        await db.execute(
            """INSERT INTO extracted_items
               (id, agent_id, session_id, message_id, type, title, content,
                source_excerpt, target_module, status, metadata, dedupe_key,
                created_at, updated_at, handled_at)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (item_id, agent_id, session_id, message_id, type, title, content,
             source_excerpt, target_module, status, meta_str, dk,
             now, now, ""),
        )
        await db.commit()
    except Exception as exc:
        if "UNIQUE" in str(exc).upper():
            cursor = await db.execute(
                "SELECT * FROM extracted_items WHERE dedupe_key = ?", (dk,)
            )
            row = await cursor.fetchone()
            if row:
                return dict(row)
        raise
    return {
        "id": item_id, "agent_id": agent_id, "session_id": session_id,
        "message_id": message_id, "type": type, "title": title, "content": content,
        "source_excerpt": source_excerpt, "target_module": target_module,
        "status": status, "metadata": metadata or {}, "dedupe_key": dk,
        "created_at": now, "updated_at": now, "handled_at": "",
    }


async def list_extracted_items(
    *,
    status: str | None = None,
    type: str | None = None,
    target_module: str | None = None,
    agent_id: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> list[dict[str, Any]]:
    if _use_supabase_data():
        filters: dict[str, str] = {}
        if status:
            filters["status"] = f"eq.{status}"
        if type:
            filters["type"] = f"eq.{type}"
        if target_module:
            filters["target_module"] = f"eq.{target_module}"
        if agent_id:
            filters["or"] = f"(agent_id.eq.{agent_id},agent_id.is.null,agent_id.eq.)"
        rows = await _supabase_select(
            settings.supabase_extracted_items_table,
            filters=filters or None,
            order="created_at.desc",
            limit=limit,
        )
        return rows

    db = await get_db()
    clauses: list[str] = []
    params: list[Any] = []
    if status:
        clauses.append("status = ?")
        params.append(status)
    if type:
        clauses.append("type = ?")
        params.append(type)
    if target_module:
        clauses.append("target_module = ?")
        params.append(target_module)
    if agent_id:
        clauses.append("(agent_id = ? OR agent_id IS NULL OR agent_id = '')")
        params.append(agent_id)
    where = ("WHERE " + " AND ".join(clauses)) if clauses else ""
    params += [limit, offset]
    cursor = await db.execute(
        f"SELECT * FROM extracted_items {where} ORDER BY created_at DESC LIMIT ? OFFSET ?",
        params,
    )
    rows = await cursor.fetchall()
    result = []
    for row in rows:
        d = dict(row)
        try:
            d["metadata"] = json.loads(d.get("metadata") or "{}")
        except Exception:
            d["metadata"] = {}
        result.append(d)
    return result


async def update_extracted_item(item_id: str, **kwargs) -> bool:
    now = _now()
    terminal_statuses = {"done", "dismissed"}
    if "status" in kwargs and kwargs["status"] in terminal_statuses:
        kwargs.setdefault("handled_at", now)
    kwargs["updated_at"] = now
    if "metadata" in kwargs and isinstance(kwargs["metadata"], dict):
        kwargs["metadata"] = json.dumps(kwargs["metadata"], ensure_ascii=False)

    if _use_supabase_data():
        payload = dict(kwargs)
        rows = await _supabase_update(
            settings.supabase_extracted_items_table,
            {"id": f"eq.{item_id}"},
            payload,
        )
        return len(rows) > 0

    db = await get_db()
    sets = ", ".join(f"{k} = ?" for k in kwargs)
    vals = list(kwargs.values()) + [item_id]
    result = await db.execute(
        f"UPDATE extracted_items SET {sets} WHERE id = ?", vals
    )
    await db.commit()
    return result.rowcount > 0


async def delete_extracted_item(item_id: str) -> bool:
    if _use_supabase_data():
        rows = await _supabase_delete(
            settings.supabase_extracted_items_table,
            {"id": f"eq.{item_id}"},
        )
        return len(rows) > 0

    db = await get_db()
    result = await db.execute(
        "DELETE FROM extracted_items WHERE id = ?", (item_id,)
    )
    await db.commit()
    return result.rowcount > 0


# ==================== Curio Artifacts ====================

ARTIFACT_TYPES = {"html", "game", "page", "widget"}
ARTIFACT_STORAGE_MODES = {"inline", "r2"}


def _use_supabase_artifacts() -> bool:
    # Curio can run locally even while the Supabase artifact_items migration is not applied yet.
    return False


CURIO_ARTIFACTS_SETTING_KEY = "curio_artifact_items"


async def _load_artifact_setting_items() -> list[dict[str, Any]]:
    row = await get_setting(CURIO_ARTIFACTS_SETTING_KEY)
    if not row:
        return []
    try:
        data = json.loads(row.get("value") or "[]")
    except Exception:
        data = []
    if not isinstance(data, list):
        return []
    return [item for item in (_normalize_artifact(row) for row in data if isinstance(row, dict)) if item]


async def _save_artifact_setting_items(items: list[dict[str, Any]]) -> None:
    await set_setting(CURIO_ARTIFACTS_SETTING_KEY, json.dumps(items, ensure_ascii=False))


def _json_list(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return []
        try:
            parsed = json.loads(text)
            if isinstance(parsed, list):
                return [str(item).strip() for item in parsed if str(item).strip()]
        except Exception:
            pass
        return [item.strip() for item in text.split(",") if item.strip()]
    return []


def _normalize_artifact(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["tags"] = _json_list(item.get("tags"))
    try:
        item["metadata"] = json.loads(item.get("metadata") or "{}")
    except Exception:
        item["metadata"] = {}
    item["is_pinned"] = bool(item.get("is_pinned"))
    item["is_surprise"] = bool(item.get("is_surprise"))
    return item


def _artifact_payload(
    *,
    title: str,
    description: str = "",
    type: str = "page",
    content: str = "",
    storage_mode: str = "inline",
    cover_url: str = "",
    tags: list[str] | str | None = None,
    agent_id: str = "",
    session_id: str = "",
    is_pinned: bool = False,
    is_surprise: bool = False,
    metadata: dict | None = None,
    item_id: str | None = None,
) -> dict[str, Any]:
    normalized_type = str(type or "page").strip().lower()
    if normalized_type not in ARTIFACT_TYPES:
        raise ValueError("type must be html, game, page, or widget")
    normalized_storage = str(storage_mode or "inline").strip().lower()
    if normalized_storage not in ARTIFACT_STORAGE_MODES:
        raise ValueError("storage_mode must be inline or r2")
    normalized_title = str(title or "").strip()
    if not normalized_title:
        raise ValueError("title is required")
    now = _now()
    return {
        "id": item_id or _new_id(),
        "title": normalized_title,
        "description": str(description or "").strip(),
        "type": normalized_type,
        "content": str(content or ""),
        "storage_mode": normalized_storage,
        "cover_url": str(cover_url or "").strip(),
        "tags": _json_list(tags),
        "agent_id": str(agent_id or "").strip(),
        "session_id": str(session_id or "").strip(),
        "is_pinned": bool(is_pinned),
        "is_surprise": bool(is_surprise),
        "metadata": metadata or {},
        "created_at": now,
        "updated_at": now,
    }


async def create_artifact_item(**kwargs) -> dict[str, Any]:
    global _supabase_artifact_items_table_missing
    payload = _artifact_payload(**kwargs)
    if _use_supabase_data():
        items = await _load_artifact_setting_items()
        items.insert(0, payload)
        await _save_artifact_setting_items(items)
        return payload
    if _use_supabase_artifacts() and not _supabase_artifact_items_table_missing:
        try:
            row = await _supabase_insert_verified(
                settings.supabase_artifact_items_table,
                payload,
            )
            return _normalize_artifact(row) or payload
        except Exception as exc:
            if not _is_supabase_missing_table_error(exc, settings.supabase_artifact_items_table):
                raise
            _supabase_artifact_items_table_missing = True

    db = await get_db()
    await db.execute(
        """
        INSERT INTO artifact_items (
            id, title, description, type, content, storage_mode, cover_url,
            tags, agent_id, session_id, is_pinned, is_surprise, metadata,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["id"], payload["title"], payload["description"], payload["type"],
            payload["content"], payload["storage_mode"], payload["cover_url"],
            json.dumps(payload["tags"], ensure_ascii=False), payload["agent_id"],
            payload["session_id"], 1 if payload["is_pinned"] else 0,
            1 if payload["is_surprise"] else 0,
            json.dumps(payload["metadata"], ensure_ascii=False),
            payload["created_at"], payload["updated_at"],
        ),
    )
    await db.commit()
    return payload


async def list_artifact_items(
    *,
    type: str | None = None,
    agent_id: str | None = None,
    tag: str | None = None,
    pinned: bool | None = None,
    surprise: bool | None = None,
    limit: int = 50,
    offset: int = 0,
) -> list[dict[str, Any]]:
    global _supabase_artifact_items_table_missing
    limit = max(1, min(int(limit or 50), 200))
    offset = max(0, int(offset or 0))
    if _use_supabase_data():
        items = await _load_artifact_setting_items()
        def keep(item: dict[str, Any]) -> bool:
            if type and item.get("type") != type:
                return False
            if agent_id and item.get("agent_id") != agent_id:
                return False
            if pinned is not None and bool(item.get("is_pinned")) is not pinned:
                return False
            if surprise is not None and bool(item.get("is_surprise")) is not surprise:
                return False
            if tag and tag not in item.get("tags", []):
                return False
            return True
        return sorted([item for item in items if keep(item)], key=lambda item: (bool(item.get("is_pinned")), str(item.get("created_at") or "")), reverse=True)[offset:offset + limit]
    if _use_supabase_artifacts() and not _supabase_artifact_items_table_missing:
        filters: dict[str, str] = {}
        if type:
            filters["type"] = f"eq.{type}"
        if agent_id:
            filters["agent_id"] = f"eq.{agent_id}"
        if pinned is not None:
            filters["is_pinned"] = f"eq.{str(bool(pinned)).lower()}"
        if surprise is not None:
            filters["is_surprise"] = f"eq.{str(bool(surprise)).lower()}"
        try:
            rows = await _supabase_select(
                settings.supabase_artifact_items_table,
                filters=filters or None,
                order="is_pinned.desc,created_at.desc",
                limit=limit,
            )
            items = [item for item in (_normalize_artifact(row) for row in rows) if item]
            if tag:
                items = [item for item in items if tag in item.get("tags", [])]
            return items
        except Exception as exc:
            if not _is_supabase_missing_table_error(exc, settings.supabase_artifact_items_table):
                raise
            _supabase_artifact_items_table_missing = True

    clauses: list[str] = []
    params: list[Any] = []
    if type:
        clauses.append("type = ?")
        params.append(type)
    if agent_id:
        clauses.append("agent_id = ?")
        params.append(agent_id)
    if pinned is not None:
        clauses.append("is_pinned = ?")
        params.append(1 if pinned else 0)
    if surprise is not None:
        clauses.append("is_surprise = ?")
        params.append(1 if surprise else 0)
    if tag:
        clauses.append("tags LIKE ?")
        params.append(f"%{tag}%")
    where = ("WHERE " + " AND ".join(clauses)) if clauses else ""
    params.extend([limit, offset])
    db = await get_db()
    cursor = await db.execute(
        f"SELECT * FROM artifact_items {where} ORDER BY is_pinned DESC, created_at DESC LIMIT ? OFFSET ?",
        params,
    )
    rows = await cursor.fetchall()
    return [item for item in (_normalize_artifact(dict(row)) for row in rows) if item]


async def get_artifact_item(item_id: str) -> dict[str, Any] | None:
    global _supabase_artifact_items_table_missing
    item_id = str(item_id or "").strip()
    if not item_id:
        return None
    if _use_supabase_data():
        return next((item for item in await _load_artifact_setting_items() if item.get("id") == item_id), None)
    if _use_supabase_artifacts() and not _supabase_artifact_items_table_missing:
        try:
            rows = await _supabase_select(
                settings.supabase_artifact_items_table,
                filters={"id": f"eq.{item_id}"},
                limit=1,
            )
            return _normalize_artifact(rows[0]) if rows else None
        except Exception as exc:
            if not _is_supabase_missing_table_error(exc, settings.supabase_artifact_items_table):
                raise
            _supabase_artifact_items_table_missing = True
    db = await get_db()
    cursor = await db.execute("SELECT * FROM artifact_items WHERE id = ?", (item_id,))
    row = await cursor.fetchone()
    return _normalize_artifact(dict(row)) if row else None


async def update_artifact_item(item_id: str, **kwargs) -> bool:
    global _supabase_artifact_items_table_missing
    allowed = {
        "title", "description", "type", "content", "storage_mode", "cover_url",
        "tags", "agent_id", "session_id", "is_pinned", "is_surprise", "metadata",
    }
    updates = {key: value for key, value in kwargs.items() if key in allowed and value is not None}
    if not updates:
        return False
    if _use_supabase_data():
        items = await _load_artifact_setting_items()
        changed = False
        for index, item in enumerate(items):
            if item.get("id") != item_id:
                continue
            next_item = {**item, **updates, "updated_at": _now()}
            if "tags" in next_item:
                next_item["tags"] = _json_list(next_item["tags"])
            if "metadata" in next_item and not isinstance(next_item["metadata"], dict):
                next_item["metadata"] = {}
            items[index] = next_item
            changed = True
            break
        if changed:
            await _save_artifact_setting_items(items)
        return changed
    if "type" in updates and str(updates["type"]).lower() not in ARTIFACT_TYPES:
        raise ValueError("type must be html, game, page, or widget")
    if "storage_mode" in updates and str(updates["storage_mode"]).lower() not in ARTIFACT_STORAGE_MODES:
        raise ValueError("storage_mode must be inline or r2")
    if "tags" in updates:
        updates["tags"] = _json_list(updates["tags"])
    if "metadata" in updates and not isinstance(updates["metadata"], dict):
        updates["metadata"] = {}
    updates["updated_at"] = _now()

    if _use_supabase_artifacts() and not _supabase_artifact_items_table_missing:
        try:
            row = await _supabase_update_verified(
                settings.supabase_artifact_items_table,
                {"id": f"eq.{item_id}"},
                updates,
            )
            return bool(row)
        except Exception as exc:
            if not _is_supabase_missing_table_error(exc, settings.supabase_artifact_items_table):
                raise
            _supabase_artifact_items_table_missing = True

    sqlite_updates = dict(updates)
    if "tags" in sqlite_updates:
        sqlite_updates["tags"] = json.dumps(sqlite_updates["tags"], ensure_ascii=False)
    if "metadata" in sqlite_updates:
        sqlite_updates["metadata"] = json.dumps(sqlite_updates["metadata"], ensure_ascii=False)
    for key in ("is_pinned", "is_surprise"):
        if key in sqlite_updates:
            sqlite_updates[key] = 1 if sqlite_updates[key] else 0
    sets = ", ".join(f"{key} = ?" for key in sqlite_updates)
    db = await get_db()
    result = await db.execute(
        f"UPDATE artifact_items SET {sets} WHERE id = ?",
        [*sqlite_updates.values(), item_id],
    )
    await db.commit()
    return result.rowcount > 0


async def delete_artifact_item(item_id: str) -> bool:
    global _supabase_artifact_items_table_missing
    if _use_supabase_data():
        items = await _load_artifact_setting_items()
        next_items = [item for item in items if item.get("id") != item_id]
        if len(next_items) == len(items):
            return False
        await _save_artifact_setting_items(next_items)
        return True
    if _use_supabase_artifacts() and not _supabase_artifact_items_table_missing:
        try:
            return await _supabase_delete_verified(
                settings.supabase_artifact_items_table,
                {"id": f"eq.{item_id}"},
            )
        except Exception as exc:
            if not _is_supabase_missing_table_error(exc, settings.supabase_artifact_items_table):
                raise
            _supabase_artifact_items_table_missing = True
    db = await get_db()
    result = await db.execute("DELETE FROM artifact_items WHERE id = ?", (item_id,))
    await db.commit()
    return result.rowcount > 0

# ==================== Parlor ====================

PARLOR_ROUND_STATUSES = {"active", "paused", "ended"}
PARLOR_MODES = {"free", "round-robin"}
PARLOR_AUTO_MODES = {"manual", "interval-2h", "interval-6h"}


def _parlor_summary(value: Any) -> dict[str, Any]:
    if isinstance(value, dict):
        return value
    if isinstance(value, str) and value.strip():
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            return {}
    return {}


def _normalize_parlor_round(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    item["summary"] = _parlor_summary(item.get("summary"))
    for key in ("max_turns_per_session", "last_viewed_turn_n"):
        try:
            item[key] = int(item.get(key) or 0)
        except Exception:
            item[key] = 0
    return item


def _normalize_parlor_seat(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    try:
        item["seat_order"] = int(item.get("seat_order") or item.get("order") or 0)
    except Exception:
        item["seat_order"] = 0
    item["order"] = item["seat_order"]
    return item


def _normalize_parlor_turn(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return None
    item = dict(row)
    try:
        item["turn_number"] = int(item.get("turn_number") or 0)
    except Exception:
        item["turn_number"] = 0
    item["is_user"] = bool(item.get("is_user"))
    return item


def _parlor_round_payload(
    *,
    title: str,
    description: str = "",
    status: str = "active",
    created_by: str = "user",
    mode: str = "free",
    auto_mode: str = "manual",
    max_turns_per_session: int = 20,
    summary: dict | None = None,
    last_viewed_turn_n: int = 0,
    left_at: str = "",
    item_id: str | None = None,
) -> dict[str, Any]:
    title = str(title or "").strip()
    if not title:
        raise ValueError("title is required")
    status = str(status or "active").strip().lower()
    if status not in PARLOR_ROUND_STATUSES:
        raise ValueError("status must be active, paused, or ended")
    mode = str(mode or "free").strip().lower()
    if mode not in PARLOR_MODES:
        mode = "free"
    auto_mode = str(auto_mode or "manual").strip().lower()
    if auto_mode not in PARLOR_AUTO_MODES:
        auto_mode = "manual"
    try:
        max_turns = max(5, min(50, int(max_turns_per_session or 20)))
    except Exception:
        max_turns = 20
    now = _now()
    return {
        "id": item_id or _new_id(),
        "title": title,
        "description": str(description or "").strip(),
        "status": status,
        "created_by": str(created_by or "user").strip() or "user",
        "mode": mode,
        "auto_mode": auto_mode,
        "max_turns_per_session": max_turns,
        "summary": summary or {},
        "last_viewed_turn_n": int(last_viewed_turn_n or 0),
        "left_at": str(left_at or ""),
        "created_at": now,
        "updated_at": now,
    }


async def create_parlor_round(**kwargs) -> dict[str, Any]:
    payload = _parlor_round_payload(**kwargs)
    db_payload = {**payload, "summary": json.dumps(payload["summary"], ensure_ascii=False)}
    if _use_supabase_data():
        supabase_payload = {**payload, "left_at": payload["left_at"] or None}
        row = await _supabase_insert_verified("parlor_rounds", supabase_payload)
        return _normalize_parlor_round(row) or payload
    db = await get_db()
    await db.execute(
        """INSERT INTO parlor_rounds
        (id, title, description, status, created_by, mode, auto_mode, max_turns_per_session, summary, last_viewed_turn_n, left_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            db_payload["id"], db_payload["title"], db_payload["description"], db_payload["status"],
            db_payload["created_by"], db_payload["mode"], db_payload["auto_mode"],
            db_payload["max_turns_per_session"], db_payload["summary"], db_payload["last_viewed_turn_n"],
            db_payload["left_at"], db_payload["created_at"], db_payload["updated_at"],
        ),
    )
    await db.commit()
    return payload


async def list_parlor_rounds(status: str | None = None, limit: int = 50, offset: int = 0) -> list[dict[str, Any]]:
    limit = max(1, min(int(limit or 50), 100))
    offset = max(0, int(offset or 0))
    if _use_supabase_data():
        filters = {"status": f"eq.{status}"} if status else None
        rows = await _supabase_select("parlor_rounds", filters=filters, order="updated_at.desc", limit=limit)
        return [item for item in (_normalize_parlor_round(row) for row in rows[offset:]) if item]
    clauses: list[str] = []
    params: list[Any] = []
    if status:
        clauses.append("status = ?")
        params.append(status)
    where = ("WHERE " + " AND ".join(clauses)) if clauses else ""
    params.extend([limit, offset])
    db = await get_db()
    cursor = await db.execute(f"SELECT * FROM parlor_rounds {where} ORDER BY updated_at DESC LIMIT ? OFFSET ?", params)
    rows = await cursor.fetchall()
    return [item for item in (_normalize_parlor_round(dict(row)) for row in rows) if item]


async def get_parlor_round(round_id: str, *, include_children: bool = False) -> dict[str, Any] | None:
    round_id = str(round_id or "").strip()
    if not round_id:
        return None
    if _use_supabase_data():
        rows = await _supabase_select("parlor_rounds", filters={"id": f"eq.{round_id}"}, limit=1)
        item = _normalize_parlor_round(rows[0]) if rows else None
    else:
        db = await get_db()
        cursor = await db.execute("SELECT * FROM parlor_rounds WHERE id = ?", (round_id,))
        row = await cursor.fetchone()
        item = _normalize_parlor_round(dict(row)) if row else None
    if item and include_children:
        item["seats"] = await list_parlor_seats(round_id)
        item["turns"] = await list_parlor_turns(round_id, limit=200)
    return item


async def update_parlor_round(round_id: str, **kwargs) -> bool:
    allowed = {"title", "description", "status", "mode", "auto_mode", "max_turns_per_session", "summary", "last_viewed_turn_n", "left_at"}
    updates = {key: value for key, value in kwargs.items() if key in allowed and value is not None}
    if not updates:
        return False
    if "summary" in updates and not isinstance(updates["summary"], dict):
        updates["summary"] = {}
    updates["updated_at"] = _now()
    if _use_supabase_data():
        if "left_at" in updates and not updates["left_at"]:
            updates["left_at"] = None
        rows = await _supabase_update("parlor_rounds", {"id": f"eq.{round_id}"}, updates)
        return len(rows) > 0
    if "summary" in updates:
        updates["summary"] = json.dumps(updates["summary"], ensure_ascii=False)
    sets = ", ".join(f"{key} = ?" for key in updates)
    db = await get_db()
    result = await db.execute(f"UPDATE parlor_rounds SET {sets} WHERE id = ?", [*updates.values(), round_id])
    await db.commit()
    return result.rowcount > 0


async def delete_parlor_round(round_id: str) -> bool:
    if _use_supabase_data():
        await _supabase_delete("parlor_turns", {"round_id": f"eq.{round_id}"})
        await _supabase_delete("parlor_seats", {"round_id": f"eq.{round_id}"})
        return len(await _supabase_delete("parlor_rounds", {"id": f"eq.{round_id}"})) > 0
    db = await get_db()
    await db.execute("DELETE FROM parlor_turns WHERE round_id = ?", (round_id,))
    await db.execute("DELETE FROM parlor_seats WHERE round_id = ?", (round_id,))
    result = await db.execute("DELETE FROM parlor_rounds WHERE id = ?", (round_id,))
    await db.commit()
    return result.rowcount > 0


async def create_parlor_seat(round_id: str, **kwargs) -> dict[str, Any]:
    now = _now()
    payload = {
        "id": kwargs.get("id") or _new_id(),
        "round_id": round_id,
        "agent_id": str(kwargs.get("agent_id") or "").strip(),
        "display_name": str(kwargs.get("display_name") or "").strip(),
        "model": str(kwargs.get("model") or "").strip(),
        "provider": str(kwargs.get("provider") or "").strip(),
        "system_prompt": str(kwargs.get("system_prompt") or "").strip(),
        "color": str(kwargs.get("color") or "").strip(),
        "seat_order": int(kwargs.get("seat_order", kwargs.get("order", 0)) or 0),
        "created_at": now,
        "updated_at": now,
    }
    if not payload["agent_id"]:
        raise ValueError("agent_id is required")
    if _use_supabase_data():
        return _normalize_parlor_seat(await _supabase_insert_verified("parlor_seats", payload)) or payload
    db = await get_db()
    await db.execute(
        """INSERT INTO parlor_seats (id, round_id, agent_id, display_name, model, provider, system_prompt, color, seat_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        tuple(payload[key] for key in ("id", "round_id", "agent_id", "display_name", "model", "provider", "system_prompt", "color", "seat_order", "created_at", "updated_at")),
    )
    await db.commit()
    return payload


async def list_parlor_seats(round_id: str) -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select("parlor_seats", filters={"round_id": f"eq.{round_id}"}, order="seat_order.asc")
        return [item for item in (_normalize_parlor_seat(row) for row in rows) if item]
    db = await get_db()
    cursor = await db.execute("SELECT * FROM parlor_seats WHERE round_id = ? ORDER BY seat_order ASC", (round_id,))
    rows = await cursor.fetchall()
    return [item for item in (_normalize_parlor_seat(dict(row)) for row in rows) if item]


async def update_parlor_seat(seat_id: str, **kwargs) -> bool:
    allowed = {"display_name", "model", "provider", "system_prompt", "color", "seat_order"}
    updates = {key: value for key, value in kwargs.items() if key in allowed and value is not None}
    if not updates:
        return False
    updates["updated_at"] = _now()
    if _use_supabase_data():
        return len(await _supabase_update("parlor_seats", {"id": f"eq.{seat_id}"}, updates)) > 0
    sets = ", ".join(f"{key} = ?" for key in updates)
    db = await get_db()
    result = await db.execute(f"UPDATE parlor_seats SET {sets} WHERE id = ?", [*updates.values(), seat_id])
    await db.commit()
    return result.rowcount > 0


async def delete_parlor_seat(seat_id: str) -> bool:
    if _use_supabase_data():
        return len(await _supabase_delete("parlor_seats", {"id": f"eq.{seat_id}"})) > 0
    db = await get_db()
    result = await db.execute("DELETE FROM parlor_seats WHERE id = ?", (seat_id,))
    await db.commit()
    return result.rowcount > 0


async def create_parlor_turn(round_id: str, *, seat_id: str = "", agent_id: str = "", content: str = "", is_user: bool = False, turn_number: int | None = None) -> dict[str, Any]:
    if turn_number is None:
        turns = await list_parlor_turns(round_id, limit=1, reverse=True)
        turn_number = (turns[0]["turn_number"] + 1) if turns else 0
    payload = {
        "id": _new_id(),
        "round_id": round_id,
        "seat_id": seat_id,
        "agent_id": agent_id or ("user" if is_user else ""),
        "content": str(content or ""),
        "turn_number": int(turn_number or 0),
        "is_user": bool(is_user),
        "created_at": _now(),
    }
    if _use_supabase_data():
        supabase_payload = {**payload, "seat_id": payload["seat_id"] or None}
        row = await _supabase_insert_verified("parlor_turns", supabase_payload)
        await update_parlor_round(round_id)
        return _normalize_parlor_turn(row) or payload
    db = await get_db()
    await db.execute(
        "INSERT INTO parlor_turns (id, round_id, seat_id, agent_id, content, turn_number, is_user, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (payload["id"], payload["round_id"], payload["seat_id"], payload["agent_id"], payload["content"], payload["turn_number"], 1 if payload["is_user"] else 0, payload["created_at"]),
    )
    await db.commit()
    await update_parlor_round(round_id)
    return payload


async def list_parlor_turns(round_id: str, limit: int = 100, offset: int = 0, reverse: bool = False) -> list[dict[str, Any]]:
    order = "turn_number.desc" if reverse else "turn_number.asc"
    limit = max(1, min(int(limit or 100), 300))
    if _use_supabase_data():
        rows = await _supabase_select("parlor_turns", filters={"round_id": f"eq.{round_id}"}, order=order, limit=limit)
        return [item for item in (_normalize_parlor_turn(row) for row in rows[offset:]) if item]
    direction = "DESC" if reverse else "ASC"
    db = await get_db()
    cursor = await db.execute(f"SELECT * FROM parlor_turns WHERE round_id = ? ORDER BY turn_number {direction} LIMIT ? OFFSET ?", (round_id, limit, offset))
    rows = await cursor.fetchall()
    return [item for item in (_normalize_parlor_turn(dict(row)) for row in rows) if item]


# ==================== Grimoire ====================

def _normalize_grimoire_tome(row: dict[str, Any]) -> dict[str, Any] | None:
    if not row:
        return None
    palette = row.get("palette") or "{}"
    if isinstance(palette, str):
        try:
            palette = json.loads(palette)
        except Exception:
            palette = {}
    return {
        "id": str(row.get("id") or ""),
        "title": str(row.get("title") or ""),
        "titleEn": str(row.get("title_en") or ""),
        "sub": str(row.get("sub") or ""),
        "spine": str(row.get("spine") or "#2C3E5C"),
        "cover": str(row.get("cover") or "#3A4D6F"),
        "gilt": str(row.get("gilt") or "#C5A572"),
        "sigil": str(row.get("sigil") or "⊹"),
        "sigilStyle": str(row.get("sigil_style") or "serifEn"),
        "kind": str(row.get("kind") or ""),
        "count": int(row.get("count") or 0),
        "palette": palette if isinstance(palette, dict) else {},
        "lastEdited": str(row.get("updated_at") or ""),
        "created_at": str(row.get("created_at") or ""),
        "updated_at": str(row.get("updated_at") or ""),
    }


def _normalize_grimoire_entry(row: dict[str, Any]) -> dict[str, Any] | None:
    if not row:
        return None
    for field in ("tags", "fields", "relations"):
        val = row.get(field) or ("[]" if field != "fields" else "{}")
        if isinstance(val, str):
            try:
                val = json.loads(val)
            except Exception:
                val = [] if field != "fields" else {}
        row[field] = val
    return {
        "id": str(row.get("id") or ""),
        "tome": str(row.get("tome_id") or ""),
        "type": str(row.get("type") or "lore"),
        "title": str(row.get("title") or ""),
        "titleEn": str(row.get("title_en") or ""),
        "sub": str(row.get("sub") or ""),
        "cover": str(row.get("cover") or "#3A4D6F"),
        "coverInk": str(row.get("cover_ink") or "#F1E4BD"),
        "coverGlyph": str(row.get("cover_glyph") or "·"),
        "status": str(row.get("status") or "seed"),
        "tags": row["tags"],
        "fields": row["fields"],
        "body": str(row.get("body") or ""),
        "relations": row["relations"],
        "updated": str(row.get("updated_at") or ""),
        "created_at": str(row.get("created_at") or ""),
        "updated_at": str(row.get("updated_at") or ""),
    }


async def list_grimoire_tomes() -> list[dict[str, Any]]:
    if _use_supabase_data():
        rows = await _supabase_select("grimoire_tomes", order="updated_at.desc")
        return [item for item in (_normalize_grimoire_tome(row) for row in rows) if item]
    conn = await get_db()
    cursor = await conn.execute("SELECT * FROM grimoire_tomes ORDER BY updated_at DESC")
    rows = await cursor.fetchall()
    return [item for item in (_normalize_grimoire_tome(dict(row)) for row in rows) if item]


async def get_grimoire_tome(tome_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select("grimoire_tomes", filters={"id": f"eq.{tome_id}"}, limit=1)
        return _normalize_grimoire_tome(rows[0]) if rows else None
    conn = await get_db()
    cursor = await conn.execute("SELECT * FROM grimoire_tomes WHERE id = ?", (tome_id,))
    row = await cursor.fetchone()
    if not row:
        return None
    return _normalize_grimoire_tome(dict(row))


async def create_grimoire_tome(**kwargs) -> dict[str, Any]:
    now = _now()
    tome_id = kwargs.get("id") or _new_id()
    palette = kwargs.get("palette") or {}
    payload = {
        "id": tome_id,
        "title": str(kwargs.get("title") or ""),
        "title_en": str(kwargs.get("titleEn") or kwargs.get("title_en") or ""),
        "sub": str(kwargs.get("sub") or ""),
        "spine": str(kwargs.get("spine") or "#2C3E5C"),
        "cover": str(kwargs.get("cover") or "#3A4D6F"),
        "gilt": str(kwargs.get("gilt") or "#C5A572"),
        "sigil": str(kwargs.get("sigil") or "⊹"),
        "sigil_style": str(kwargs.get("sigilStyle") or kwargs.get("sigil_style") or "serifEn"),
        "kind": str(kwargs.get("kind") or ""),
        "count": int(kwargs.get("count") or 0),
        "palette": json.dumps(palette, ensure_ascii=False) if isinstance(palette, dict) else "{}",
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        row = await _supabase_insert_verified(
            "grimoire_tomes",
            {**payload, "palette": palette if isinstance(palette, dict) else {}},
        )
        return _normalize_grimoire_tome(row) or payload
    conn = await get_db()
    await conn.execute(
        "INSERT INTO grimoire_tomes (id, title, title_en, sub, spine, cover, gilt, sigil, sigil_style, kind, count, palette, created_at, updated_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (payload["id"], payload["title"], payload["title_en"], payload["sub"], payload["spine"],
         payload["cover"], payload["gilt"], payload["sigil"], payload["sigil_style"],
         payload["kind"], payload["count"], payload["palette"], payload["created_at"], payload["updated_at"]),
    )
    await conn.commit()
    return _normalize_grimoire_tome(payload) or payload


async def update_grimoire_tome(tome_id: str, **kwargs) -> dict[str, Any] | None:
    now = _now()
    row = await get_grimoire_tome(tome_id)
    if not row:
        return None
    updatable = ["title", "titleEn", "sub", "spine", "cover", "gilt", "sigil", "sigilStyle", "kind", "count", "palette"]
    db_key_map = {"titleEn": "title_en", "sigilStyle": "sigil_style"}
    sets, vals = [], []
    for key in updatable:
        if key in kwargs:
            db_key = db_key_map.get(key, key.lower())
            val = kwargs[key]
            if key == "palette" and isinstance(val, dict):
                val = json.dumps(val, ensure_ascii=False)
            sets.append(f"{db_key} = ?")
            vals.append(val)
    if not sets:
        return row
    if _use_supabase_data():
        updates: dict[str, Any] = {}
        for key in updatable:
            if key in kwargs:
                db_key = db_key_map.get(key, key.lower())
                updates[db_key] = kwargs[key]
        updates["updated_at"] = now
        updated = await _supabase_update_verified("grimoire_tomes", {"id": f"eq.{tome_id}"}, updates)
        return _normalize_grimoire_tome(updated) if updated else await get_grimoire_tome(tome_id)
    vals += [now, tome_id]
    conn = await get_db()
    await conn.execute(f"UPDATE grimoire_tomes SET {', '.join(sets)}, updated_at = ? WHERE id = ?", vals)
    await conn.commit()
    return await get_grimoire_tome(tome_id)


async def delete_grimoire_tome(tome_id: str) -> bool:
    if _use_supabase_data():
        await _supabase_delete("grimoire_entries", {"tome_id": f"eq.{tome_id}"})
        return await _supabase_delete_verified("grimoire_tomes", {"id": f"eq.{tome_id}"})
    conn = await get_db()
    result = await conn.execute("DELETE FROM grimoire_tomes WHERE id = ?", (tome_id,))
    await conn.execute("DELETE FROM grimoire_entries WHERE tome_id = ?", (tome_id,))
    await conn.commit()
    return result.rowcount > 0


async def list_grimoire_entries(tome_id: str | None = None) -> list[dict[str, Any]]:
    if _use_supabase_data():
        filters = {"tome_id": f"eq.{tome_id}"} if tome_id else None
        rows = await _supabase_select("grimoire_entries", filters=filters, order="updated_at.desc")
        return [item for item in (_normalize_grimoire_entry(row) for row in rows) if item]
    conn = await get_db()
    if tome_id:
        cursor = await conn.execute("SELECT * FROM grimoire_entries WHERE tome_id = ? ORDER BY updated_at DESC", (tome_id,))
    else:
        cursor = await conn.execute("SELECT * FROM grimoire_entries ORDER BY updated_at DESC")
    rows = await cursor.fetchall()
    return [item for item in (_normalize_grimoire_entry(dict(row)) for row in rows) if item]


async def get_grimoire_entry(entry_id: str) -> dict[str, Any] | None:
    if _use_supabase_data():
        rows = await _supabase_select("grimoire_entries", filters={"id": f"eq.{entry_id}"}, limit=1)
        return _normalize_grimoire_entry(rows[0]) if rows else None
    conn = await get_db()
    cursor = await conn.execute("SELECT * FROM grimoire_entries WHERE id = ?", (entry_id,))
    row = await cursor.fetchone()
    if not row:
        return None
    return _normalize_grimoire_entry(dict(row))


async def create_grimoire_entry(**kwargs) -> dict[str, Any]:
    now = _now()
    entry_id = kwargs.get("id") or _new_id()
    tags = kwargs.get("tags") or []
    fields = kwargs.get("fields") or {}
    relations = kwargs.get("relations") or []
    payload = {
        "id": entry_id,
        "tome_id": str(kwargs.get("tome") or kwargs.get("tome_id") or ""),
        "type": str(kwargs.get("type") or "lore"),
        "title": str(kwargs.get("title") or ""),
        "title_en": str(kwargs.get("titleEn") or kwargs.get("title_en") or ""),
        "sub": str(kwargs.get("sub") or ""),
        "cover": str(kwargs.get("cover") or "#3A4D6F"),
        "cover_ink": str(kwargs.get("coverInk") or kwargs.get("cover_ink") or "#F1E4BD"),
        "cover_glyph": str(kwargs.get("coverGlyph") or kwargs.get("cover_glyph") or "·"),
        "status": str(kwargs.get("status") or "seed"),
        "tags": json.dumps(tags, ensure_ascii=False),
        "fields": json.dumps(fields, ensure_ascii=False),
        "body": str(kwargs.get("body") or ""),
        "relations": json.dumps(relations, ensure_ascii=False),
        "created_at": now,
        "updated_at": now,
    }
    if _use_supabase_data():
        supabase_payload = {**payload, "tags": tags, "fields": fields, "relations": relations}
        row = await _supabase_insert_verified("grimoire_entries", supabase_payload)
        if payload["tome_id"]:
            rows = await _supabase_select("grimoire_entries", select="id", filters={"tome_id": f"eq.{payload['tome_id']}"}, limit=1000)
            await _supabase_update("grimoire_tomes", {"id": f"eq.{payload['tome_id']}"}, {"count": len(rows), "updated_at": now})
        return _normalize_grimoire_entry(row) or _normalize_grimoire_entry(supabase_payload) or supabase_payload
    conn = await get_db()
    await conn.execute(
        "INSERT INTO grimoire_entries (id, tome_id, type, title, title_en, sub, cover, cover_ink, cover_glyph, status, tags, fields, body, relations, created_at, updated_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (payload["id"], payload["tome_id"], payload["type"], payload["title"], payload["title_en"],
         payload["sub"], payload["cover"], payload["cover_ink"], payload["cover_glyph"],
         payload["status"], payload["tags"], payload["fields"], payload["body"],
         payload["relations"], payload["created_at"], payload["updated_at"]),
    )
    # Update tome count
    await conn.execute(
        "UPDATE grimoire_tomes SET count = (SELECT COUNT(*) FROM grimoire_entries WHERE tome_id = ?), updated_at = ? WHERE id = ?",
        (payload["tome_id"], now, payload["tome_id"]),
    )
    await conn.commit()
    result = {**payload, "tags": tags, "fields": fields, "relations": relations}
    return _normalize_grimoire_entry(result) or result


async def update_grimoire_entry(entry_id: str, **kwargs) -> dict[str, Any] | None:
    now = _now()
    row = await get_grimoire_entry(entry_id)
    if not row:
        return None
    key_map = {
        "titleEn": "title_en", "coverInk": "cover_ink", "coverGlyph": "cover_glyph",
        "tome": "tome_id",
    }
    sets, vals = [], []
    for key, val in kwargs.items():
        db_key = key_map.get(key, key.lower())
        if key in ("tags", "fields", "relations") and (isinstance(val, list) or isinstance(val, dict)):
            val = json.dumps(val, ensure_ascii=False)
        sets.append(f"{db_key} = ?")
        vals.append(val)
    if not sets:
        return row
    if _use_supabase_data():
        updates: dict[str, Any] = {}
        for key, val in kwargs.items():
            db_key = key_map.get(key, key.lower())
            updates[db_key] = val
        updates["updated_at"] = now
        updated = await _supabase_update_verified("grimoire_entries", {"id": f"eq.{entry_id}"}, updates)
        tome_id = updates.get("tome_id") or row.get("tome")
        if tome_id:
            rows = await _supabase_select("grimoire_entries", select="id", filters={"tome_id": f"eq.{tome_id}"}, limit=1000)
            await _supabase_update("grimoire_tomes", {"id": f"eq.{tome_id}"}, {"count": len(rows), "updated_at": now})
        return _normalize_grimoire_entry(updated) if updated else await get_grimoire_entry(entry_id)
    vals += [now, entry_id]
    conn = await get_db()
    await conn.execute(f"UPDATE grimoire_entries SET {', '.join(sets)}, updated_at = ? WHERE id = ?", vals)
    # Update tome count
    if "tome_id" in [key_map.get(k, k.lower()) for k in kwargs]:
        tome_id = kwargs.get("tome") or kwargs.get("tome_id") or row.get("tome")
    else:
        tome_id = row.get("tome")
    if tome_id:
        await conn.execute(
            "UPDATE grimoire_tomes SET count = (SELECT COUNT(*) FROM grimoire_entries WHERE tome_id = ?), updated_at = ? WHERE id = ?",
            (tome_id, now, tome_id),
        )
    await conn.commit()
    return await get_grimoire_entry(entry_id)


async def delete_grimoire_entry(entry_id: str) -> bool:
    row = await get_grimoire_entry(entry_id)
    if not row:
        return False
    tome_id = row.get("tome")
    now = _now()
    if _use_supabase_data():
        deleted = await _supabase_delete_verified("grimoire_entries", {"id": f"eq.{entry_id}"})
        if deleted and tome_id:
            rows = await _supabase_select("grimoire_entries", select="id", filters={"tome_id": f"eq.{tome_id}"}, limit=1000)
            await _supabase_update("grimoire_tomes", {"id": f"eq.{tome_id}"}, {"count": len(rows), "updated_at": now})
        return deleted
    conn = await get_db()
    result = await conn.execute("DELETE FROM grimoire_entries WHERE id = ?", (entry_id,))
    if tome_id:
        await conn.execute(
            "UPDATE grimoire_tomes SET count = (SELECT COUNT(*) FROM grimoire_entries WHERE tome_id = ?), updated_at = ? WHERE id = ?",
            (tome_id, now, tome_id),
        )
    await conn.commit()
    return result.rowcount > 0
