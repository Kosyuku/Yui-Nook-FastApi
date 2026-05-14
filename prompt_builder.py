"""Cache-aware prompt builder."""
from __future__ import annotations

import hashlib
import json
import logging
import re
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional

import ai_runtime
import database as db
from config import settings
from partition_manager import ConversationPartition, get_partition
from tools import TOOLS_SCHEMA

logger = logging.getLogger(__name__)

PROMPT_BUILDER_VERSION = "prompt-cache-v1"

_env_cache: dict[str, str] = {}


@dataclass
class PromptBlock:
    name: str
    role: str
    content: str
    cache_scope: str
    cache_key_parts: dict[str, str] = field(default_factory=dict)


@dataclass
class BuiltPrompt:
    blocks: list[PromptBlock]
    messages: list[dict[str, Any]]
    debug: dict[str, Any]


def update_env_cache(key: str, value: str):
    _env_cache[key] = value


def get_env_cache() -> dict:
    return _env_cache.copy()


def _clip_text(text: str, max_chars: int) -> str:
    if max_chars <= 0 or len(text) <= max_chars:
        return text
    return text[:max_chars].rstrip() + "..."


def _hash_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _estimate_tokens(text: str) -> int:
    if not text:
        return 0
    return max(1, (len(text) + 3) // 4)


def _memory_text(memory: dict) -> str:
    return db.memory_display_content(memory) or db.memory_raw_content(memory)


def _build_companion_state_text(state: dict) -> Optional[str]:
    topics = [str(item).strip() for item in (state.get("recent_topics") or []) if str(item).strip()][:3]
    mood = str(state.get("current_mood") or "").strip()
    loops = [str(item).strip() for item in (state.get("open_loops") or []) if str(item).strip()][:2]
    impression = str(state.get("impression") or "").strip()
    relationship = str(state.get("relationship_progress") or "").strip()
    likes = str(state.get("likes_summary") or "").strip()

    lines: list[str] = []
    if topics:
        lines.append(f"- recent_topics: {', '.join(topics)}")
    if mood:
        lines.append(f"- current_mood: {mood}")
    if loops:
        lines.append(f"- open_loops: {', '.join(loops)}")
    if impression:
        lines.append(f"- impression: {_clip_text(impression, 80)}")
    if relationship:
        lines.append(f"- relationship_progress: {_clip_text(relationship, 80)}")
    if likes:
        lines.append(f"- likes_summary: {_clip_text(likes, 80)}")
    if not lines:
        return None
    return _clip_text("Companion state:\n" + "\n".join(lines), max(80, settings.prompt_companion_state_max_chars))


_STOPWORDS = {
    "this",
    "that",
    "then",
    "already",
    "today",
    "yesterday",
    "now",
    "what",
    "why",
    "how",
    "if",
    "but",
}


def _extract_keywords(text: str, top_k: int) -> list[str]:
    raw = re.findall(r"[\u4e00-\u9fff]{2,}|[A-Za-z]{3,}", text)
    seen: set[str] = set()
    keywords: list[str] = []
    for token in raw:
        token = token.strip().lower()
        if not token or token in _STOPWORDS or token in seen:
            continue
        seen.add(token)
        keywords.append(token)
        if len(keywords) >= top_k:
            break
    return keywords


def _keyword_overlap_score(query_text: str, memory_text: str) -> int:
    if not query_text or not memory_text:
        return 0
    keywords = _extract_keywords(query_text, top_k=6)
    haystack = memory_text.lower()
    return sum(1 for keyword in keywords if keyword in haystack)


def _memory_rank(memory: dict, query_text: str = "") -> tuple:
    score = memory.get("score")
    similarity = memory.get("similarity")
    numeric_score = 0.0
    for value in (score, similarity):
        try:
            numeric_score = max(numeric_score, float(value))
        except Exception:
            continue
    overlap = _keyword_overlap_score(query_text, _memory_text(memory))
    importance = int(memory.get("importance") or 0)
    temperature = max(0.0, float(memory.get("temperature") or 0.0))
    category = db.normalize_memory_category(memory.get("category"))
    temp_weight = 1.0 if category in {"recent_pending", "deep"} else (0.5 if category == "ephemeral" else 0.7)
    temp_bonus = round(min(20.0, temperature) * 0.05 * temp_weight, 4)
    updated_at = str(memory.get("updated_at") or "")
    last_touched_at = str(memory.get("last_touched_at") or "")
    return (numeric_score, overlap, importance, temp_bonus, last_touched_at, updated_at)


def _dedupe_memories(memories: list[dict]) -> list[dict]:
    result: list[dict] = []
    seen_ids: set[str] = set()
    for memory in memories:
        memory_id = str(memory.get("id") or "")
        if memory_id and memory_id in seen_ids:
            continue
        if memory_id:
            seen_ids.add(memory_id)
        result.append(memory)
    return result


def _take_layer_budget(
    memories: list[dict],
    *,
    item_limit: int,
    layer_char_limit: int,
    item_char_limit: int,
    current_agent_id: Optional[str] = None,
) -> list[dict]:
    chosen: list[dict] = []
    used = 0
    for memory in memories[: max(0, item_limit)]:
        owner = db.normalize_agent_id(memory.get("agent_id"))
        current = db.normalize_agent_id(current_agent_id)
        raw_text = db.format_memory_with_source(memory, current_agent_id) if owner != current else _memory_text(memory)
        text = _clip_text(raw_text, item_char_limit).strip()
        if not text:
            continue
        extra = len(text) + 2
        if chosen and used + extra > layer_char_limit:
            break
        if not chosen and len(text) > layer_char_limit:
            text = _clip_text(text, layer_char_limit)
            extra = len(text) + 2
        if not text:
            continue
        chosen.append({"id": str(memory.get("id") or ""), "text": text})
        used += extra
        if used >= layer_char_limit:
            break
    return chosen


def _flatten_memory_sections(layer_sections: list[tuple[str, list[dict]]], total_budget: int) -> tuple[Optional[str], list[str]]:
    parts: list[str] = []
    used_memory_ids: list[str] = []
    used = 0
    for title, items in layer_sections:
        if not items or used >= total_budget:
            continue
        kept: list[str] = []
        kept_ids: list[str] = []
        for item in items:
            line = str(item.get("text") or "")
            memory_id = str(item.get("id") or "")
            if not line:
                continue
            rendered = f"- {line}"
            extra = len(rendered) + 1
            if kept and used + extra > total_budget:
                break
            if not kept and used + len(title) + 2 >= total_budget:
                break
            if not kept and used + len(title) + 2 + extra > total_budget:
                remaining = max(0, total_budget - used - len(title) - 5)
                trimmed = _clip_text(line, remaining).strip()
                if not trimmed:
                    break
                rendered = f"- {trimmed}"
                extra = len(rendered) + 1
            if used + extra > total_budget:
                break
            kept.append(rendered)
            if memory_id:
                kept_ids.append(memory_id)
            used += extra
        if kept:
            section = title + "\n" + "\n".join(kept)
            parts.append(section)
            used_memory_ids.extend(kept_ids)
            used += len(title) + 2
    return ("\n\n".join(parts) if parts else None, used_memory_ids)


async def build_chat_prompt(
    *,
    session_id: str,
    agent_id: str,
    latest_user_text: str,
    override_persona: Optional[str] = None,
    provider: Optional[str] = None,
    model: Optional[str] = None,
    tool_profile: str = "chat",
) -> BuiltPrompt:
    fixed = await _load_fixed_block(
        agent_id=agent_id,
        override_persona=override_persona,
        provider=provider,
        model=model,
        tool_profile=tool_profile,
    )
    partition, partition_debug = await _read_partition(
        agent_id=agent_id,
        session_id=session_id,
        mode="chat",
    )
    if partition:
        summary = _load_partition_summary_block(partition)
        history_a = _load_partition_history_block(
            partition,
            name="history_a",
            latest_user_text=latest_user_text,
        )
        history = _load_partition_history_block(
            partition,
            name="history_b",
            latest_user_text=latest_user_text,
        )
    else:
        summary = await _load_summary_block(session_id=session_id, agent_id=agent_id)
        history_a = None
        history = await _load_history_block(
            session_id=session_id,
            agent_id=agent_id,
            latest_user_text=latest_user_text,
        )
    dynamic = await _load_dynamic_block(
        session_id=session_id,
        agent_id=agent_id,
        latest_user_text=latest_user_text,
        provider=provider,
        model=model,
        room_id=None,
    )
    blocks = [block for block in [fixed, summary, history_a, history, dynamic] if block and block.content.strip()]
    return _build_prompt_result(blocks, provider=provider, model=model, partition_debug=partition_debug)


async def build_rp_prompt(
    *,
    room_id: str,
    agent_id: str,
    latest_user_text: str,
    override_persona: Optional[str] = None,
    provider: Optional[str] = None,
    model: Optional[str] = None,
    tool_profile: str = "rp",
) -> BuiltPrompt:
    fixed = await _load_fixed_block(
        agent_id=agent_id,
        override_persona=override_persona,
        provider=provider,
        model=model,
        tool_profile=tool_profile,
    )
    rp = await _load_rp_setting_block(room_id=room_id, agent_id=agent_id)
    partition, partition_debug = await _read_partition(
        agent_id=agent_id,
        rp_room_id=room_id,
        mode="rp",
    )
    if partition:
        rp_history = _load_partition_rp_history_block(partition, latest_user_text=latest_user_text)
    else:
        rp_history = await _load_rp_history_block(
            room_id=room_id,
            agent_id=agent_id,
            latest_user_text=latest_user_text,
        )
    dynamic = await _load_dynamic_block(
        session_id=None,
        agent_id=agent_id,
        latest_user_text=latest_user_text,
        provider=provider,
        model=model,
        room_id=room_id,
    )
    blocks = [block for block in [fixed, rp, rp_history, dynamic] if block and block.content.strip()]
    return _build_prompt_result(blocks, provider=provider, model=model, partition_debug=partition_debug)


async def build_system_prompt(
    session_id: Optional[str] = None,
    override_persona: Optional[str] = None,
    agent_id: Optional[str] = None,
) -> str:
    """Compatibility wrapper for existing routes.

    Existing callers still receive one string. Internally this now uses the
    separated fixed and dynamic loaders so the cache-safe structure can evolve
    without route migration.
    """
    resolved_agent = db.normalize_agent_id(agent_id)
    latest_user_text = await _latest_user_text(session_id) if session_id else ""
    if session_id:
        built = await build_chat_prompt(
            session_id=session_id,
            agent_id=resolved_agent,
            latest_user_text=latest_user_text,
            override_persona=override_persona,
            tool_profile="chat",
        )
        return "\n\n".join(block.content for block in built.blocks if block.content.strip())

    fixed = await _load_fixed_block(
        agent_id=resolved_agent,
        override_persona=override_persona,
        provider=None,
        model=None,
        tool_profile="chat",
    )
    dynamic = await _load_dynamic_block(
        session_id=None,
        agent_id=resolved_agent,
        latest_user_text=latest_user_text,
        provider=None,
        model=None,
        room_id=None,
    )
    return "\n\n".join(block.content for block in [fixed, dynamic] if block and block.content.strip())


async def _load_fixed_block(
    *,
    agent_id: str,
    override_persona: Optional[str],
    provider: Optional[str],
    model: Optional[str],
    tool_profile: str,
) -> PromptBlock:
    resolved_agent = db.normalize_agent_id(agent_id)
    parts: list[str] = []

    default_chat_prompt = await ai_runtime.resolve_prompt("chat")
    if default_chat_prompt:
        parts.append("## Base system instruction\n" + default_chat_prompt)

    persona = await _resolve_persona(agent_id=resolved_agent, override_persona=override_persona)
    parts.append("## Agent persona\n" + persona)

    static_format_rules = (
        "## Static format rules\n"
        "- Reply in the user's primary language unless the task needs another language.\n"
        "- Keep continuity with the committed conversation context.\n"
        "- Use tools only when the active tool profile allows them."
    )
    parts.append(static_format_rules)

    tool_descriptions = _format_tool_descriptions(tool_profile=tool_profile)
    if tool_descriptions:
        parts.append("## Available tools\n" + tool_descriptions)

    fixed_rules = (
        "## Fixed behavior rules\n"
        "- Be natural, direct, and context-aware.\n"
        "- Respect stable user preferences, identity, plans, and long-running context.\n"
        "- If facts are uncertain and tools are available, use tools instead of guessing.\n"
        "- Do not treat dynamic state as fixed identity."
    )
    parts.append(fixed_rules)

    content = "\n\n".join(part for part in parts if part.strip())
    return PromptBlock(
        name="fixed",
        role="system",
        content=content,
        cache_scope="fixed",
        cache_key_parts={
            "prompt_builder_version": PROMPT_BUILDER_VERSION,
            "agent_id": resolved_agent,
            "provider": str(provider or ""),
            "model": str(model or ""),
            "tool_profile": _normalize_tool_profile(tool_profile),
            "tool_schema_revision": _tool_schema_revision(tool_profile),
        },
    )


async def _load_dynamic_block(
    *,
    session_id: Optional[str],
    agent_id: str,
    latest_user_text: str,
    provider: Optional[str],
    model: Optional[str],
    room_id: Optional[str] = None,
    tool_results: Optional[list[Any]] = None,
    runtime_hints: Optional[list[str]] = None,
) -> PromptBlock:
    resolved_agent = db.normalize_agent_id(agent_id)
    parts: list[str] = []
    sources: list[str] = []

    env_text = _build_environment_text()
    if env_text:
        parts.append(env_text)
        sources.append("current_time")
        if "weather" in _env_cache:
            sources.append("weather")
        if "location" in _env_cache:
            sources.append("location")

    memory_context = await _load_memory_context(
        session_id=session_id,
        agent_id=resolved_agent,
        query_text=latest_user_text,
    )
    if memory_context:
        parts.append("## Retrieved memory\n" + memory_context)
        sources.append("memory")

    diary_context = await _load_diary_context(agent_id=resolved_agent)
    if diary_context:
        parts.append("## Diary snippets\n" + diary_context)
        sources.append("diary")

    companion_state = await _load_companion_state_context(agent_id=resolved_agent)
    if companion_state:
        parts.append("## Dynamic companion state\n" + companion_state)
        sources.append("companion_state")

    if runtime_hints:
        hints = [str(item).strip() for item in runtime_hints if str(item).strip()]
        if hints:
            parts.append("## Runtime hints\n" + "\n".join(f"- {item}" for item in hints))
            sources.append("runtime_hints")

    if tool_results:
        rendered = _render_tool_results(tool_results)
        if rendered:
            parts.append("## Tool results\n" + rendered)
            sources.append("tool_results")

    latest = str(latest_user_text or "").strip()
    if latest:
        parts.append("## Latest user message\n" + latest)
        sources.append("latest_user_text")

    return PromptBlock(
        name="dynamic",
        role="user",
        content="\n\n".join(part for part in parts if part.strip()),
        cache_scope="dynamic",
        cache_key_parts={
            "agent_id": resolved_agent,
            "session_id": str(session_id or ""),
            "rp_room_id": str(room_id or ""),
            "provider": str(provider or ""),
            "model": str(model or ""),
            "dynamic_sources": ",".join(sources),
        },
    )


async def _load_summary_block(session_id: str, agent_id: str) -> Optional[PromptBlock]:
    try:
        summaries = await db.get_context_summaries(
            session_id=session_id,
            limit=max(1, settings.prompt_summary_items),
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.warning("Read context summaries failed: %s", exc)
        summaries = []

    lines: list[str] = []
    latest_revision = ""
    for item in reversed(summaries):
        summary = _clip_text(str(item.get("summary") or "").strip(), max(80, settings.prompt_summary_item_max_chars))
        if not summary:
            continue
        lines.append(f"- {summary}")
        latest_revision = str(item.get("created_at") or item.get("updated_at") or item.get("id") or latest_revision)

    if not lines:
        return None

    return PromptBlock(
        name="summary",
        role="system",
        content="## Conversation summary\n" + "\n".join(lines),
        cache_scope="summary",
        cache_key_parts={
            "session_id": str(session_id or ""),
            "agent_id": db.normalize_agent_id(agent_id),
            "summary_revision": latest_revision,
        },
    )


async def _read_partition(
    *,
    agent_id: str,
    session_id: str = "",
    rp_room_id: str = "",
    mode: str,
) -> tuple[Optional[ConversationPartition], dict[str, Any]]:
    debug = {
        "partition_read_enabled": bool(settings.conversation_partitions_read_enabled),
        "partition_read_attempted": False,
        "partition_read_hit": False,
        "partition_read_source": "",
        "partition_id": "",
        "partition_history_a_count": 0,
        "partition_history_b_count": 0,
        "partition_fallback_reason": "",
    }
    if not settings.conversation_partitions_read_enabled:
        return None, debug
    debug["partition_read_attempted"] = True
    try:
        partition = await get_partition(
            agent_id=agent_id,
            session_id=session_id,
            rp_room_id=rp_room_id,
            mode=mode,
        )
        if partition is None:
            debug["partition_fallback_reason"] = "partition_not_found"
            return None, debug
        debug.update({
            "partition_read_hit": True,
            "partition_read_source": "conversation_partitions",
            "partition_id": partition.id,
            "partition_history_a_count": len(partition.history_a),
            "partition_history_b_count": len(partition.history_b),
        })
        return partition, debug
    except Exception as exc:
        logger.warning("Read conversation partition failed: %s", exc)
        debug["partition_fallback_reason"] = "partition_read_failed"
        return None, debug


def _render_partition_messages(messages: list[dict[str, Any]], *, latest_user_text: str) -> list[dict[str, str]]:
    latest = str(latest_user_text or "").strip()
    rendered: list[dict[str, str]] = []
    for item in messages:
        role = str(item.get("role") or "").strip()
        content = str(item.get("content") or "").strip()
        if role not in {"user", "assistant"} or not content:
            continue
        if latest and role == "user" and content == latest:
            continue
        rendered.append({"role": role, "content": content})
    return rendered


def _format_history_lines(messages: list[dict[str, str]]) -> str:
    return "\n".join(
        f"[{item['role']}] {_clip_text(item['content'], max(80, settings.prompt_summary_item_max_chars))}"
        for item in messages
    )


def _partition_cache_parts(partition: ConversationPartition, *, source: str) -> dict[str, str]:
    return {
        "partition_read_enabled": "true",
        "partition_read_attempted": "true",
        "partition_read_hit": "true",
        "partition_read_source": source,
        "partition_id": partition.id,
        "partition_history_a_count": str(len(partition.history_a)),
        "partition_history_b_count": str(len(partition.history_b)),
        "partition_fallback_reason": "",
        "history_a_cycle_id": partition.history_a_cycle_id,
        "history_b_cycle_id": partition.history_b_cycle_id,
    }


def _load_partition_summary_block(partition: ConversationPartition) -> Optional[PromptBlock]:
    summary = _clip_text(str(partition.summary_text or "").strip(), max(80, settings.prompt_summary_item_max_chars))
    if not summary:
        return None
    cache_parts = _partition_cache_parts(partition, source="conversation_partitions")
    cache_parts.update({
        "summary_revision": partition.summary_revision,
        "summary_source": "conversation_partitions",
        "summary_enabled": str(settings.conversation_partition_summary_enabled).lower(),
        "summary_char_count": str(len(partition.summary_text or "")),
        "summary_updated": "true" if partition.summary_revision else "false",
        "summary_error": "",
    })
    return PromptBlock(
        name="summary",
        role="system",
        content="## Conversation summary\n- " + summary,
        cache_scope="summary",
        cache_key_parts=cache_parts,
    )


def _load_partition_history_block(
    partition: ConversationPartition,
    *,
    name: str,
    latest_user_text: str,
) -> Optional[PromptBlock]:
    source_messages = partition.history_a if name == "history_a" else partition.history_b
    messages = _render_partition_messages(source_messages, latest_user_text=latest_user_text)
    if not messages and name != "history_b":
        return None
    cache_parts = _partition_cache_parts(partition, source="conversation_partitions")
    cache_parts.update({
        "history_source": "conversation_partitions",
        "history_message_count": str(len(messages)),
    })
    rendered = _format_history_lines(messages) if messages else "(no newer committed turns)"
    return PromptBlock(
        name=name,
        role="system",
        content=f"## Committed {name.replace('_', ' ').title()}\n" + rendered,
        cache_scope=name,
        cache_key_parts=cache_parts,
    )


def _load_partition_rp_history_block(
    partition: ConversationPartition,
    *,
    latest_user_text: str,
) -> Optional[PromptBlock]:
    messages = _render_partition_messages(
        [*partition.history_a, *partition.history_b],
        latest_user_text=latest_user_text,
    )
    if not messages:
        return None
    cache_parts = _partition_cache_parts(partition, source="conversation_partitions")
    cache_parts.update({
        "rp_room_id": partition.rp_room_id,
        "rp_history_source": "conversation_partitions",
        "rp_history_message_count": str(len(messages)),
    })
    return PromptBlock(
        name="rp_history",
        role="system",
        content="## Recent committed RP history\n" + _format_history_lines(messages),
        cache_scope="rp_history",
        cache_key_parts=cache_parts,
    )


async def _load_history_block(
    *,
    session_id: str,
    agent_id: str,
    latest_user_text: str,
) -> Optional[PromptBlock]:
    try:
        rows = await db.get_recent_messages(
            session_id=session_id,
            limit=max(1, settings.chat_recent_messages_limit),
        )
    except Exception as exc:
        logger.warning("Read legacy recent history failed: %s", exc)
        rows = []

    latest = str(latest_user_text or "").strip()
    messages: list[dict[str, str]] = []
    for row in rows:
        role = str(row.get("role") or "").strip()
        content = str(row.get("content") or "").strip()
        if role not in {"user", "assistant"} or not content:
            continue
        if latest and role == "user" and content == latest:
            continue
        messages.append({"role": role, "content": content})

    if not messages:
        return None

    rendered = "\n".join(
        f"[{item['role']}] {_clip_text(item['content'], max(80, settings.prompt_summary_item_max_chars))}"
        for item in messages
    )
    return PromptBlock(
        name="history_b",
        role="system",
        content="## Recent committed history\n" + rendered,
        cache_scope="history",
        cache_key_parts={
            "session_id": str(session_id or ""),
            "agent_id": db.normalize_agent_id(agent_id),
            "history_b_cycle_id": "legacy",
            "history_source": "legacy_recent_messages",
            "history_message_count": str(len(messages)),
        },
    )


async def _load_rp_setting_block(room_id: str, agent_id: str) -> Optional[PromptBlock]:
    try:
        room = await db.get_rp_room(room_id)
    except Exception as exc:
        logger.warning("Read RP room failed: %s", exc)
        room = None
    if not room:
        return None

    content = (
        "## RP room setting\n"
        f"- world_setting: {room.get('world_setting', '')}\n"
        f"- user_role: {room.get('user_role', '')}\n"
        f"- assistant_role: {room.get('ai_role', '')}\n\n"
        "## RP rules\n"
        "- Stay in the room setting.\n"
        "- Do not call tools unless the RP tool profile is explicitly changed.\n"
        "- Keep normal chat history separate from RP room history."
    )
    return PromptBlock(
        name="rp_setting",
        role="system",
        content=content,
        cache_scope="rp_room",
        cache_key_parts={
            "rp_room_id": str(room_id or ""),
            "agent_id": db.normalize_agent_id(agent_id),
            "updated_at": str(room.get("updated_at") or room.get("created_at") or ""),
        },
    )


async def _load_rp_history_block(
    *,
    room_id: str,
    agent_id: str,
    latest_user_text: str,
) -> Optional[PromptBlock]:
    try:
        rows = await db.get_recent_rp_messages(
            room_id=room_id,
            limit=max(1, settings.chat_recent_messages_limit),
        )
    except Exception as exc:
        logger.warning("Read RP history failed: %s", exc)
        rows = []

    latest = str(latest_user_text or "").strip()
    messages: list[dict[str, str]] = []
    for row in rows:
        role = str(row.get("role") or "").strip()
        content = str(row.get("content") or "").strip()
        if role not in {"user", "assistant"} or not content:
            continue
        if latest and role == "user" and content == latest:
            continue
        messages.append({"role": role, "content": content})

    if not messages:
        return None

    rendered = "\n".join(
        f"[{item['role']}] {_clip_text(item['content'], max(80, settings.prompt_summary_item_max_chars))}"
        for item in messages
    )
    return PromptBlock(
        name="rp_history",
        role="system",
        content="## Recent committed RP history\n" + rendered,
        cache_scope="rp_history",
        cache_key_parts={
            "rp_room_id": str(room_id or ""),
            "agent_id": db.normalize_agent_id(agent_id),
            "rp_history_source": "rp_messages",
            "rp_history_message_count": str(len(messages)),
        },
    )


def _build_prompt_result(
    blocks: list[PromptBlock],
    *,
    provider: Optional[str],
    model: Optional[str],
    partition_debug: Optional[dict[str, Any]] = None,
) -> BuiltPrompt:
    fixed_content = "\n\n".join(block.content for block in blocks if block.name == "fixed")
    fixed_block_hash = _hash_text(fixed_content)
    messages = [{"role": block.role, "content": block.content} for block in blocks if block.content.strip()]
    summary_block = next((block for block in blocks if block.name == "summary"), None)
    history_a_block = next((block for block in blocks if block.name == "history_a"), None)
    history_block = next((block for block in blocks if block.name == "history_b"), None)
    rp_setting_block = next((block for block in blocks if block.name == "rp_setting"), None)
    rp_history_block = next((block for block in blocks if block.name == "rp_history"), None)
    dynamic_block = next((block for block in blocks if block.name == "dynamic"), None)
    debug = {
        "prompt_builder_version": PROMPT_BUILDER_VERSION,
        "block_order": [block.name for block in blocks],
        "block_token_estimates": {block.name: _estimate_tokens(block.content) for block in blocks},
        "fixed_block_hash": fixed_block_hash,
        "summary_revision": (summary_block.cache_key_parts.get("summary_revision", "") if summary_block else ""),
        "summary_enabled": (
            (summary_block.cache_key_parts.get("summary_enabled", str(settings.conversation_partition_summary_enabled).lower()) == "true")
            if summary_block else bool(settings.conversation_partition_summary_enabled)
        ),
        "summary_source": (summary_block.cache_key_parts.get("summary_source", "") if summary_block else ""),
        "summary_char_count": int(summary_block.cache_key_parts.get("summary_char_count", "0")) if summary_block else 0,
        "summary_updated": (summary_block.cache_key_parts.get("summary_updated", "false") == "true" if summary_block else False),
        "summary_error": (summary_block.cache_key_parts.get("summary_error", "") if summary_block else ""),
        "history_a_cycle_id": (history_a_block.cache_key_parts.get("history_a_cycle_id", "") if history_a_block else ""),
        "history_b_cycle_id": (history_block.cache_key_parts.get("history_b_cycle_id", "") if history_block else ""),
        "history_message_count": (
            (int(history_a_block.cache_key_parts.get("history_message_count", "0")) if history_a_block else 0)
            + (int(history_block.cache_key_parts.get("history_message_count", "0")) if history_block else 0)
        ),
        "history_source": (
            (history_block.cache_key_parts.get("history_source", "") if history_block else "")
            or (history_a_block.cache_key_parts.get("history_source", "") if history_a_block else "")
        ),
        "history_token_estimate": (
            (_estimate_tokens(history_a_block.content) if history_a_block else 0)
            + (_estimate_tokens(history_block.content) if history_block else 0)
        ),
        "rp_history_message_count": int(rp_history_block.cache_key_parts.get("rp_history_message_count", "0")) if rp_history_block else 0,
        "rp_history_source": (rp_history_block.cache_key_parts.get("rp_history_source", "") if rp_history_block else ""),
        "rp_history_token_estimate": _estimate_tokens(rp_history_block.content) if rp_history_block else 0,
        "rp_room_id": (
            (rp_history_block.cache_key_parts.get("rp_room_id", "") if rp_history_block else "")
            or (rp_setting_block.cache_key_parts.get("rp_room_id", "") if rp_setting_block else "")
            or (dynamic_block.cache_key_parts.get("rp_room_id", "") if dynamic_block else "")
        ),
        "dynamic_sources": (
            dynamic_block.cache_key_parts.get("dynamic_sources", "").split(",")
            if dynamic_block and dynamic_block.cache_key_parts.get("dynamic_sources")
            else []
        ),
        "provider": str(provider or ""),
        "model": str(model or ""),
    }
    debug.update(partition_debug or {
        "partition_read_enabled": bool(settings.conversation_partitions_read_enabled),
        "partition_read_attempted": False,
        "partition_read_hit": False,
        "partition_read_source": "",
        "partition_id": "",
        "partition_history_a_count": 0,
        "partition_history_b_count": 0,
        "partition_fallback_reason": "",
    })
    return BuiltPrompt(blocks=blocks, messages=messages, debug=debug)


async def _resolve_persona(agent_id: str, override_persona: Optional[str] = None) -> str:
    persona = (override_persona or "").strip()
    if not persona and agent_id:
        try:
            persona_row = await db.get_agent_persona(agent_id)
            persona = str(persona_row.get("persona") or "").strip()
        except Exception as exc:
            logger.warning("Read agent persona failed: %s", exc)
    if not persona:
        persona = str(getattr(settings, "persona_description", "") or "").strip()
    if not persona:
        persona = await _load_deep_persona(agent_id=agent_id) or ""
    if not persona:
        persona = (
            f"You are {getattr(settings, 'persona_name', 'Pyro')}, "
            "a warm, direct companion who remembers useful user context."
        )
    return persona


async def _load_deep_persona(agent_id: Optional[str] = None) -> Optional[str]:
    try:
        core = await db.list_memories(
            category="core_profile",
            limit=max(1, settings.prompt_memory_core_items),
            agent_id=agent_id,
        )
        lines = _take_layer_budget(
            core,
            item_limit=max(1, settings.prompt_memory_core_items),
            layer_char_limit=max(60, settings.prompt_memory_core_max_chars),
            item_char_limit=max(40, settings.prompt_memory_item_max_chars),
        )
        rendered_lines = [f"- {line.get('text', '')}" for line in lines if line.get("text")]
        if not rendered_lines:
            return None
        return "User profile facts:\n" + "\n".join(rendered_lines)
    except Exception as exc:
        logger.warning("Read persona memory failed: %s", exc)
        return None


async def _load_companion_state_context(agent_id: Optional[str] = None) -> Optional[str]:
    try:
        return _build_companion_state_text(await db.get_companion_state(agent_id=agent_id))
    except Exception as exc:
        logger.warning("Read companion state failed: %s", exc)
        return None


async def _load_diary_context(agent_id: str) -> Optional[str]:
    try:
        entries = await db.list_diary(agent_id=agent_id, limit=3)
    except Exception as exc:
        logger.warning("Read diary snippets failed: %s", exc)
        return None
    lines: list[str] = []
    for entry in entries[:3]:
        title = str(entry.get("title") or "").strip()
        content = _clip_text(str(entry.get("content") or "").strip(), 120)
        if not title and not content:
            continue
        prefix = f"{title}: " if title else ""
        lines.append(f"- {prefix}{content}")
    return "\n".join(lines) if lines else None


async def _load_memory_context(
    session_id: Optional[str] = None,
    agent_id: Optional[str] = None,
    query_text: Optional[str] = None,
) -> Optional[str]:
    try:
        if query_text is None:
            query_text = await _latest_user_text(session_id) if session_id else ""

        core = await db.list_memories(
            category="core_profile",
            limit=max(1, settings.prompt_memory_core_items * 2),
            agent_id=agent_id,
            include_cross_agent=True,
            cross_agent_limit=max(0, settings.prompt_memory_cross_agent_items),
        )
        recent = await db.list_memories(
            category="recent_pending",
            limit=max(1, settings.prompt_memory_recent_items * 2),
            agent_id=agent_id,
            include_cross_agent=True,
            cross_agent_limit=max(0, settings.prompt_memory_cross_agent_items),
        )

        deep_related = await _retrieve_related_memories(
            query_text=query_text or "",
            category="deep",
            limit=max(1, settings.prompt_memory_deep_items * 3),
            agent_id=agent_id,
        )
        ephemeral_related = await _retrieve_related_memories(
            query_text=query_text or "",
            category="ephemeral",
            limit=max(1, settings.prompt_memory_ephemeral_items * 3),
            agent_id=agent_id,
        )

        core = sorted(_dedupe_memories(core), key=lambda item: _memory_rank(item, query_text or ""), reverse=True)
        recent = sorted(_dedupe_memories(recent), key=lambda item: _memory_rank(item, query_text or ""), reverse=True)
        deep_related = sorted(_dedupe_memories(deep_related), key=lambda item: _memory_rank(item, query_text or ""), reverse=True)
        ephemeral_related = sorted(_dedupe_memories(ephemeral_related), key=lambda item: _memory_rank(item, query_text or ""), reverse=True)

        layer_sections: list[tuple[str, list[dict]]] = [
            (
                "Stable profile",
                _take_layer_budget(
                    core,
                    item_limit=max(1, settings.prompt_memory_core_items),
                    layer_char_limit=max(60, settings.prompt_memory_core_max_chars),
                    item_char_limit=max(30, settings.prompt_memory_item_max_chars),
                    current_agent_id=agent_id,
                ),
            ),
            (
                "Recent pending",
                _take_layer_budget(
                    recent,
                    item_limit=max(1, settings.prompt_memory_recent_items),
                    layer_char_limit=max(60, settings.prompt_memory_recent_max_chars),
                    item_char_limit=max(30, settings.prompt_memory_item_max_chars),
                    current_agent_id=agent_id,
                ),
            ),
            (
                "Related long-term memory",
                _take_layer_budget(
                    deep_related,
                    item_limit=max(0, settings.prompt_memory_deep_items),
                    layer_char_limit=max(40, settings.prompt_memory_deep_max_chars),
                    item_char_limit=max(24, settings.prompt_memory_item_max_chars),
                    current_agent_id=agent_id,
                ),
            ),
        ]

        if _should_inject_ephemeral(ephemeral_related, query_text or ""):
            layer_sections.append(
                (
                    "Ephemeral context",
                    _take_layer_budget(
                        ephemeral_related,
                        item_limit=max(0, settings.prompt_memory_ephemeral_items),
                        layer_char_limit=max(20, settings.prompt_memory_ephemeral_max_chars),
                        item_char_limit=max(20, settings.prompt_memory_item_max_chars),
                        current_agent_id=agent_id,
                    ),
                )
            )

        merged_text, injected_ids = _flatten_memory_sections(
            layer_sections,
            total_budget=max(120, settings.prompt_memory_total_max_chars),
        )
        if merged_text and injected_ids:
            try:
                await db.touch_memories(injected_ids, reason="prompt_injected", delta=1.0)
            except Exception as exc:
                logger.warning("Prompt memory touch failed: %s", exc)
        return merged_text
    except Exception as exc:
        logger.warning("Read memory context failed: %s", exc)
        return None


async def _latest_user_text(session_id: Optional[str]) -> str:
    if not session_id:
        return ""
    recent_msgs = await db.get_recent_messages(session_id=session_id, limit=6)
    for msg in reversed(recent_msgs):
        if msg.get("role") == "user":
            return str(msg.get("content") or "")
    return ""


async def _retrieve_related_memories(
    query_text: str,
    category: str,
    limit: int,
    agent_id: Optional[str] = None,
) -> list[dict]:
    if not query_text:
        return []
    related: list[dict] = []
    try:
        related = await db.semantic_search_memories(
            query_text=query_text,
            category=category,
            limit=limit,
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.warning("Semantic memory retrieval failed for %s: %s", category, exc)

    if related:
        return related

    keywords = _extract_keywords(query_text, top_k=max(1, settings.memory_retrieval_keyword_count))
    for keyword in keywords:
        related.extend(
            await db.search_memories(
                keyword=keyword,
                category=category,
                limit=limit,
                agent_id=agent_id,
            )
        )
    return related


def _should_inject_ephemeral(memories: list[dict], query_text: str) -> bool:
    if not memories or not query_text:
        return False
    best = memories[0]
    score = _memory_rank(best, query_text)
    numeric_score = score[0]
    overlap = score[1]
    return numeric_score >= 0.78 or overlap >= 2


def _build_environment_text() -> str:
    now = datetime.now()
    env_lines = [f"- time: {now.strftime('%Y-%m-%d %H:%M')}, weekday={now.strftime('%A')}"]
    if "weather" in _env_cache:
        env_lines.append(f"- weather: {_env_cache['weather']}")
    if "location" in _env_cache:
        env_lines.append(f"- location: {_env_cache['location']}")
    return "## Current environment\n" + "\n".join(env_lines)


def _render_tool_results(tool_results: list[Any]) -> str:
    lines: list[str] = []
    max_chars = max(80, settings.tool_result_max_chars)
    for index, result in enumerate(tool_results, start=1):
        if isinstance(result, str):
            text = result
        else:
            try:
                text = json.dumps(result, ensure_ascii=False)
            except Exception:
                text = str(result)
        text = _clip_text(text.strip(), max_chars)
        if text:
            lines.append(f"- tool_result_{index}: {text}")
    return "\n".join(lines)


def _normalize_tool_profile(tool_profile: str) -> str:
    value = str(tool_profile or "chat").strip().lower()
    if value not in {"chat", "rp", "summary", "proactive"}:
        return "chat"
    return value


def _tools_for_profile(tool_profile: str) -> list[dict]:
    profile = _normalize_tool_profile(tool_profile)
    if profile == "rp":
        return []
    if profile == "summary":
        return []
    if profile == "proactive":
        allowed = {"get_current_time", "list_memories", "search_memories", "get_memory_stats"}
        return [tool for tool in TOOLS_SCHEMA if (tool.get("function") or {}).get("name") in allowed]
    if len(TOOLS_SCHEMA) <= 1:
        return TOOLS_SCHEMA[:]
    max_chat_tools = min(max(1, settings.prompt_tool_count_max), len(TOOLS_SCHEMA) - 1)
    return TOOLS_SCHEMA[:max_chat_tools]


def _tool_schema_revision(tool_profile: str) -> str:
    names = [(tool.get("function") or {}).get("name", "") for tool in _tools_for_profile(tool_profile)]
    return _hash_text("|".join(sorted(str(name) for name in names if name)))[:16]


def _format_tool_descriptions(tool_profile: str = "chat") -> str:
    tools = _tools_for_profile(tool_profile)
    if not tools:
        return ""
    lines = []
    max_desc_chars = max(20, settings.prompt_tool_desc_max_chars)
    for tool in tools:
        func = tool.get("function", {})
        name = func.get("name", "?")
        desc = str(func.get("description", ""))
        if len(desc) > max_desc_chars:
            desc = desc[:max_desc_chars] + "..."
        lines.append(f"- `{name}`: {desc}")
    return "\n".join(lines)


# ── Anthropic native cache-control payload ─────────────────────────────────

def to_anthropic_payload(blocks: list[PromptBlock]) -> dict:
    """Convert BuiltPrompt blocks to Anthropic Messages API payload format.

    Anthropic native API differences vs OpenAI-compat:
    - System prompt lives in a top-level "system" array, NOT as a message.
    - Content blocks can carry "cache_control": {"type": "ephemeral"} to mark
      prefix-cache breakpoints.
    - cache_control is injected at the end of the Fixed Block (most stable
      prefix) and optionally at the end of the Summary Block.

    Returns:
        {
            "system": [{"type": "text", "text": ..., "cache_control": ...}, ...],
            "messages": [{"role": "user"|"assistant", "content": ...}, ...],
        }
    The caller merges this into the Anthropic /v1/messages request payload.
    """
    system_blocks: list[dict] = []
    messages: list[dict] = []

    # Blocks that should receive a cache breakpoint after them
    CACHE_BREAKPOINT_NAMES = {"fixed", "summary"}

    for block in blocks:
        if not block.content.strip():
            continue
        if block.role == "system":
            cb: dict = {"type": "text", "text": block.content}
            if block.name in CACHE_BREAKPOINT_NAMES:
                cb["cache_control"] = {"type": "ephemeral"}
            system_blocks.append(cb)
        else:
            # user / assistant messages
            messages.append({"role": block.role, "content": block.content})

    # Anthropic requires at least one user message
    if not messages:
        messages.append({"role": "user", "content": "(no user message)"})

    return {"system": system_blocks, "messages": messages}
