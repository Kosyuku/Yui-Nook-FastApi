import asyncio
import json
import logging
import sys
from typing import Any

from mcp.server.fastmcp import FastMCP

import database as db
import media_storage
from config import settings
from routes import chat, ChatRequest
from yui_tool_bridge import (
    add_folio_thought,
    create_folio_highlight,
    list_folio_books,
    list_folio_highlights,
    read_folio_book,
    read_folio_shared_context,
    reply_folio_thought,
    update_folio_reading_position,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastMCP server with the same public HTTP settings used by uvicorn.
mcp = FastMCP("yui_nook_backend", host=settings.mcp_host, port=settings.mcp_port)


def _backend_failure(kind: str = "database") -> str | None:
    backend = settings.memory_backend if kind == "memory" else settings.database_backend
    if str(backend or "").lower() == "supabase":
        return None
    return json.dumps(
        {
            "success": False,
            "error": f"{kind} backend is {backend}; production MCP writes require Supabase.",
            "backend": backend,
        },
        ensure_ascii=False,
    )


async def create_session(agent_id: str, title: str = "new session", source_app: str = "claude_mcp") -> str:
    """
    Create a new chat session for an agent.
    Returns the session ID which can be used to send messages.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        session = await db.create_session(title=title, source_app=source_app, agent_id=agent_id)
        session_id = str(session.get("id") or "").strip()
        if not session_id:
            return json.dumps({"success": False, "error": "create_session returned no session id"}, ensure_ascii=False)
        return json.dumps({"success": True, "session_id": session_id, "session": session}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def list_sessions(agent_id: str = None, limit: int = 50) -> str:
    """
    List recent sessions.
    Provide an optional agent_id to filter down to sessions matching this agent.
    """
    sessions = await db.list_sessions()
    
    # Client-side filtering because standard DB method might not support agent_id directly yet
    if agent_id:
        sessions = [s for s in sessions if s.get("agent_id") == agent_id]
        
    sessions = sessions[:limit]
        
    return json.dumps(sessions, ensure_ascii=False)


async def get_session(session_id: str) -> str:
    """
    Get details of a specific session.
    """
    session = await db.get_session(session_id)
    if not session:
        return json.dumps({"error": "Session not found"})
    return json.dumps(session, ensure_ascii=False)


async def get_messages(session_id: str, limit: int = 50) -> str:
    """
    Get the history of messages for a given session.
    """
    # get_recent_messages limits fetching exactly as we want
    messages = await db.get_recent_messages(session_id, limit=limit)
    return json.dumps(messages, ensure_ascii=False)


async def send_message(session_id: str, agent_id: str, message: str) -> str:
    """
    Sends a message to the specified session, invoking the standard AI response logic.
    This generates a full response from the assistant, incorporating the agent's persona.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    # Re-use the existing HTTP fastAPI implementation without duplication
    req = ChatRequest(
        session_id=session_id,
        agent_id=agent_id,
        content=message,
        stream=True  # Ensure we receive EventSource format
    )
    
    full_text = []
    try:
        response = await chat(req)
        # response is an EventSourceResponse, we iterate over its body_iterator
        async for raw_event in response.body_iterator:
            # EventSourceResponse yields strings or dicts
            # Depending on how sse_starlette encodes, it's usually dicts matching SSE specs
            # e.g., {'event': 'message', 'data': '...'} or just a string "data: ...\n\n"
            if isinstance(raw_event, dict):
                # We only care about chat messages, ignoring reasoning or tool execution text
                # unless we want to include them, but standard chat output is what we want.
                if raw_event.get("event") == "message":
                    full_text.append(str(raw_event.get("data", "")))
            elif isinstance(raw_event, str):
                # Manual parsing if Starlette yielded raw string
                if raw_event.startswith("data: "):
                    content = raw_event[6:].strip()
                    # Skip basic [DONE] or empty strings if strictly empty
                    if content and content != "[DONE]":
                        full_text.append(content)
                        
    except Exception as e:
        logger.exception("MCP send_message stream error")
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)

    merged = "".join(full_text).replace("\\n", "\n")
    return merged


async def create_diary_notebook(
    agent_id: str,
    name: str = "",
    description: str = "",
    visibility: str = "public",
    is_default: bool = False,
) -> str:
    """
    Create a diary notebook owned by one agent.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        notebook = await db.create_agent_diary_notebook(
            agent_id,
            name=name or "",
            description=description or "",
            visibility=visibility or "public",
            is_default=is_default,
        )
        if not notebook or not notebook.get("id"):
            return json.dumps({"success": False, "error": "create_diary_notebook did not return a persisted notebook"}, ensure_ascii=False)
        return json.dumps({"success": True, "notebook": notebook}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def update_diary_notebook(
    notebook_id: str,
    agent_id: str,
    name: str | None = None,
    description: str | None = None,
    visibility: str | None = None,
    is_default: bool | None = None,
) -> str:
    """
    Update an agent-owned diary notebook.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        notebook = await db.update_agent_diary_notebook(
            notebook_id,
            agent_id,
            name=name,
            description=description,
            visibility=visibility,
            is_default=is_default,
        )
        if not notebook:
            return json.dumps({"success": False, "error": "notebook not found for agent"}, ensure_ascii=False)
        return json.dumps({"success": True, "notebook": notebook}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def list_diary_notebooks(agent_id: str = None) -> str:
    """
    List diary notebooks, optionally filtered to one agent.
    """
    try:
        notebooks = await db.list_diary_notebooks()
        if agent_id:
            normalized = db.normalize_agent_id(agent_id)
            notebooks = [
                item for item in notebooks
                if item.get("author_type") == "agent" and item.get("author_id") == normalized
            ]
        return json.dumps(notebooks, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"error": str(e)}, ensure_ascii=False)


async def list_diary_entries(notebook_id: str, viewer_agent_id: str = "", limit: int = 50) -> str:
    """
    List visible entries inside a diary notebook by notebook_id.
    Use list_diary_notebooks first to find available notebooks.
    Public entries are visible to everyone; private entries are visible only to the notebook owner.
    """
    try:
        entries = await db.list_diary_entries(
            notebook_id,
            limit=limit,
            viewer_agent_id=viewer_agent_id or None,
            enforce_visibility=True,
        )
        return json.dumps({"entries": entries}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"error": str(e)}, ensure_ascii=False)


async def create_diary_entry(
    agent_id: str,
    content: str,
    title: str = None,
    tags: list[str] = None,
    notebook_id: str = None,
    visibility: str = "public",
) -> str:
    """
    Create a new diary entry.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        tag_text = ",".join([str(tag).strip() for tag in (tags or []) if str(tag).strip()])
        if notebook_id:
            diary = await db.create_agent_diary_entry(
                notebook_id,
                agent_id,
                content=content,
                title=title or "",
                tags=tag_text,
                visibility=visibility or "public",
            )
            if not diary:
                return json.dumps({"success": False, "error": "notebook not found for agent"}, ensure_ascii=False)
        else:
            diary = await db.add_diary(
                content=content,
                title=title or "",
                agent_id=agent_id,
                source_agent_id=agent_id,
                tags=tag_text,
                visibility=visibility or "public",
            )
        diary_id = str((diary or {}).get("id") or "").strip()
        if not diary_id:
            return json.dumps({"success": False, "error": "create_diary_entry did not return a persisted entry"}, ensure_ascii=False)
        return json.dumps({"success": True, "diary_id": diary_id}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def update_diary_entry(
    entry_id: str,
    agent_id: str,
    content: str | None = None,
    title: str | None = None,
    tags: list[str] = None,
    visibility: str | None = None,
) -> str:
    """
    Update an entry owned by one agent's diary notebook.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        tag_text = None if tags is None else ",".join([str(tag).strip() for tag in tags if str(tag).strip()])
        entry = await db.update_agent_diary_entry(
            entry_id,
            agent_id,
            content=content,
            title=title,
            tags=tag_text,
            visibility=visibility,
        )
        if not entry:
            return json.dumps({"success": False, "error": "entry not found for agent"}, ensure_ascii=False)
        return json.dumps({"success": True, "entry": entry}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def delete_diary_entry(entry_id: str, agent_id: str) -> str:
    """
    Delete an entry owned by one agent's diary notebook.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        ok = await db.delete_agent_diary_entry(entry_id, agent_id)
        if not ok:
            return json.dumps({"success": False, "error": "entry not found for agent or delete did not affect a row"}, ensure_ascii=False)
        return json.dumps({"success": True}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def comment_diary_entry(entry_id: str, agent_id: str, content: str) -> str:
    """
    Comment on an agent diary entry as another agent.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        comment = await db.add_diary_comment(
            entry_id,
            content=content,
            author_type="agent",
            author_id=agent_id,
        )
        if not comment:
            return json.dumps({"success": False, "error": "entry not commentable"}, ensure_ascii=False)
        return json.dumps({"success": True, "comment": comment}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def underline_diary_entry(
    entry_id: str,
    agent_id: str,
    start_offset: int,
    end_offset: int,
    note: str = "",
) -> str:
    """
    Add an underline annotation to a diary entry without changing its text.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        annotation = await db.add_diary_underline(
            entry_id,
            start_offset=start_offset,
            end_offset=end_offset,
            author_type="agent",
            author_id=agent_id,
            note=note,
        )
        if not annotation:
            return json.dumps({"success": False, "error": "invalid underline range or entry not found"}, ensure_ascii=False)
        return json.dumps({"success": True, "annotation": annotation}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def search_diary(query: str, agent_id: str = None, limit: int = 10) -> str:
    """
    List or search diary entries.
    """
    # The existing DB only has list_diary, which orders by time.
    # For a full search, we do client-side filtering if a query is provided
    diaries = await db.list_diary(agent_id=agent_id, limit=max(limit * 2, 50))
    if query:
        query_l = query.lower()
        diaries = [d for d in diaries if query_l in (d.get("content", "") or "").lower()][:limit]
    else:
        diaries = diaries[:limit]
        
    return json.dumps(diaries, ensure_ascii=False)


CURIO_INLINE_LIMIT_BYTES = 500 * 1024


def _artifact_storage_key(title: str) -> str:
    filename = media_storage.sanitize_filename(f"{title or 'artifact'}.html")
    return f"curio/{db._new_id()}_{filename}"


def _artifact_should_use_r2(content: str, storage_mode: str) -> bool:
    text = str(content or "").lstrip().lower()
    looks_inline = text.startswith("<!doctype") or text.startswith("<html") or "<script" in text[:2048] or "<body" in text[:2048]
    return bool(content) and (
        len(content.encode("utf-8")) >= CURIO_INLINE_LIMIT_BYTES
        or (str(storage_mode or "").lower() == "r2" and looks_inline)
    )


async def save_artifact(
    title: str,
    description: str = "",
    type: str = "page",
    content: str = "",
    tags: list[str] = None,
    agent_id: str = "azheng",
    session_id: str = "",
    storage_mode: str = "inline",
    cover_url: str = "",
    is_pinned: bool = False,
    is_surprise: bool = False,
) -> str:
    """
    Save a conversation artifact into Curio. Use this after creating a small web page,
    game, surprise page, or widget that the user may want to reopen later.
    """
    backend_error = _backend_failure()
    if backend_error:
        return backend_error
    try:
        metadata: dict[str, Any] = {"source": "claude_mcp"}
        artifact_content = content or ""
        artifact_storage = storage_mode or "inline"
        if _artifact_should_use_r2(artifact_content, artifact_storage):
            data = artifact_content.encode("utf-8")
            storage_key = _artifact_storage_key(title)
            media_storage.r2_client.put_object(storage_key, data, mime_type="text/html; charset=utf-8")
            artifact_content = storage_key
            artifact_storage = "r2"
            metadata.update({"size_bytes": len(data), "r2_mime_type": "text/html; charset=utf-8"})
        item = await db.create_artifact_item(
            title=title,
            description=description,
            type=type,
            content=artifact_content,
            storage_mode=artifact_storage,
            cover_url=cover_url,
            tags=tags or [],
            agent_id=agent_id,
            session_id=session_id,
            is_pinned=is_pinned,
            is_surprise=is_surprise,
            metadata=metadata,
        )
        return json.dumps({"success": True, "artifact_id": item["id"], "item": item}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def list_artifacts(
    type: str = None,
    agent_id: str = None,
    tag: str = None,
    pinned: bool = None,
    surprise: bool = None,
    limit: int = 20,
) -> str:
    """
    List Curio artifacts already saved, optionally filtered by type, agent, tag,
    pinned state, or surprise state.
    """
    try:
        items = await db.list_artifact_items(
            type=type,
            agent_id=agent_id,
            tag=tag,
            pinned=pinned,
            surprise=surprise,
            limit=limit,
        )
        return json.dumps({"success": True, "items": items, "count": len(items)}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def save_memory(
    content: str,
    agent_id: str,
    source: str = "claude_mcp",
    category: str = "core_profile",
    tags: list[str] = None,
    importance: int = 3,
    visibility: str = "private",
    source_agent_id: str | None = None,
) -> str:
    """
    Save an explicit observation or memory about the user.

    Optional fields:
    - category: core_profile, recent_pending, deep, or ephemeral.
    - tags: list of labels.
    - importance: integer from 1 to 5.
    """
    try:
        backend_error = _backend_failure("memory")
        if backend_error:
            return backend_error
        tag_text = ",".join([str(tag).strip() for tag in (tags or []) if str(tag).strip()])
        try:
            importance_value = max(1, min(5, int(importance or 3)))
        except Exception:
            importance_value = 3
        # Standard function
        try:
            mem = await db.add_memory(
                content=content,
                agent_id=agent_id,
                category=category or "core_profile",
                tags=tag_text,
                visibility=visibility or "private",
                source=source or "claude_mcp",
                source_agent_id=source_agent_id or agent_id,
                raw_content=content,
                importance=importance_value,
                apply_filter=True,
            )
        except db.MemoryRejected as exc:
            return json.dumps(
                {"success": False, "filtered": True, "reason": exc.reason},
                ensure_ascii=False,
            )
        memory_id = str(mem.get("id") or "").strip()
        if not memory_id:
            return json.dumps({"success": False, "error": "Save memory returned no memory id."}, ensure_ascii=False)
        return json.dumps({"success": True, "memory_id": memory_id, "memory": mem}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def search_memory(query: str, agent_id: str = None, limit: int = 10) -> str:
    """
    Search semantic memories for a given query string.
    """
    try:
        memories = await db.semantic_search_memories(
            query_text=query,
            limit=limit,
            agent_id=agent_id,
            touch=False
        )
        return json.dumps(memories, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"error": str(e)})

# ══════════════════════════════════════════════════════════
# Grimoire 魔典 tools
# ══════════════════════════════════════════════════════════

async def list_grimoire_tomes() -> str:
    """
    List all grimoire tomes (典). Returns id, title, titleEn, sub, kind, count, lastEdited, palette, etc.
    Use this to browse what tomes exist before fetching entries from one.
    """
    try:
        tomes = await db.list_grimoire_tomes()
        return json.dumps({"success": True, "tomes": tomes, "count": len(tomes)}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def get_grimoire_tome(tome_id: str) -> str:
    """
    Get details of a single grimoire tome by its id (e.g. "nighttide", "kitchen").
    """
    try:
        tome = await db.get_grimoire_tome(tome_id)
        if not tome:
            return json.dumps({"success": False, "error": f"Tome '{tome_id}' not found"}, ensure_ascii=False)
        return json.dumps({"success": True, "tome": tome}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def create_grimoire_tome(
    title: str,
    title_en: str = "",
    sub: str = "",
    kind: str = "虚构世界",
    spine: str = "#2C3E5C",
    cover: str = "#3A4D6F",
    gilt: str = "#C5A572",
    sigil: str = "⊹",
    sigil_style: str = "serifEn",
    palette_bg: str = "#EEF1F4",
    palette_accent: str = "#3A4D6F",
    palette_tint: str = "#D8E0EA",
) -> str:
    """
    Create a new grimoire tome (典). A tome is like a notebook or worldbook that holds entries.
    - kind examples: 虚构世界 / 科幻 / 日常 / 札记
    - sigil: a single character or symbol shown as the tome's emblem
    - spine/cover/gilt: hex colors for the book appearance
    Returns the created tome with its auto-generated id.
    """
    try:
        tome = await db.create_grimoire_tome(
            title=title,
            titleEn=title_en,
            sub=sub,
            kind=kind,
            spine=spine,
            cover=cover,
            gilt=gilt,
            sigil=sigil,
            sigilStyle=sigil_style,
            palette={"bg": palette_bg, "accent": palette_accent, "tint": palette_tint},
        )
        return json.dumps({"success": True, "tome": tome}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def update_grimoire_tome(
    tome_id: str,
    title: str | None = None,
    title_en: str | None = None,
    sub: str | None = None,
    kind: str | None = None,
) -> str:
    """
    Update basic info of a grimoire tome. Only the provided fields are changed.
    """
    try:
        kwargs = {}
        if title is not None: kwargs["title"] = title
        if title_en is not None: kwargs["titleEn"] = title_en
        if sub is not None: kwargs["sub"] = sub
        if kind is not None: kwargs["kind"] = kind
        tome = await db.update_grimoire_tome(tome_id, **kwargs)
        if not tome:
            return json.dumps({"success": False, "error": f"Tome '{tome_id}' not found"}, ensure_ascii=False)
        return json.dumps({"success": True, "tome": tome}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def list_grimoire_entries(tome_id: str | None = None) -> str:
    """
    List grimoire entries (词条). Optionally filter by tome_id.
    Each entry has: id, tome, type (character/place/lore/thing/event/jot),
    title, titleEn, sub, status (seed/draft/woven/archive), tags, fields{}, relations[].
    """
    try:
        entries = await db.list_grimoire_entries(tome_id=tome_id)
        return json.dumps({"success": True, "entries": entries, "count": len(entries)}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def get_grimoire_entry(entry_id: str) -> str:
    """
    Get full details of a single grimoire entry by id, including all fields, body text, and relations.
    """
    try:
        entry = await db.get_grimoire_entry(entry_id)
        if not entry:
            return json.dumps({"success": False, "error": f"Entry '{entry_id}' not found"}, ensure_ascii=False)
        return json.dumps({"success": True, "entry": entry}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def create_grimoire_entry(
    tome_id: str,
    title: str,
    type: str = "character",
    title_en: str = "",
    sub: str = "",
    cover: str = "#3A4D6F",
    cover_ink: str = "#F1E4BD",
    cover_glyph: str = "",
    status: str = "seed",
    tags: list[str] | None = None,
    fields: dict | None = None,
    body: str = "",
    relations: list | None = None,
) -> str:
    """
    Create a new entry (词条) inside a grimoire tome.
    - type: character 角色 | place 地点 | lore 设定 | thing 物件 | event 事件 | jot 随笔
    - status: seed 萌芽 | draft 草稿 | woven 已成 | archive 封存
    - fields: dict of custom properties, e.g. {"年龄": "二十七", "一句话": "把光递出去。"}
    - relations: list of {id, type, label} linking to other entries
    - cover_glyph: a single character shown on the cover thumbnail
    Returns the created entry with its auto-generated id.
    """
    try:
        entry = await db.create_grimoire_entry(
            tome=tome_id,
            title=title,
            type=type,
            titleEn=title_en,
            sub=sub,
            cover=cover,
            coverInk=cover_ink,
            coverGlyph=cover_glyph or title[:1],
            status=status,
            tags=tags or [],
            fields=fields or {},
            body=body,
            relations=relations or [],
        )
        return json.dumps({"success": True, "entry": entry}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def update_grimoire_entry(
    entry_id: str,
    title: str | None = None,
    title_en: str | None = None,
    sub: str | None = None,
    status: str | None = None,
    tags: list[str] | None = None,
    fields: dict | None = None,
    body: str | None = None,
    relations: list | None = None,
) -> str:
    """
    Update a grimoire entry. Only the provided fields are changed.
    Useful for: changing status (seed→draft→woven), adding/updating body text,
    updating custom fields like 年龄/一句话, adding tags, linking relations.
    """
    try:
        kwargs = {}
        if title is not None: kwargs["title"] = title
        if title_en is not None: kwargs["titleEn"] = title_en
        if sub is not None: kwargs["sub"] = sub
        if status is not None: kwargs["status"] = status
        if tags is not None: kwargs["tags"] = tags
        if fields is not None: kwargs["fields"] = fields
        if body is not None: kwargs["body"] = body
        if relations is not None: kwargs["relations"] = relations
        entry = await db.update_grimoire_entry(entry_id, **kwargs)
        if not entry:
            return json.dumps({"success": False, "error": f"Entry '{entry_id}' not found"}, ensure_ascii=False)
        return json.dumps({"success": True, "entry": entry}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def delete_grimoire_entry(entry_id: str) -> str:
    """
    Delete a grimoire entry by id. Also decrements the parent tome's entry count.
    """
    try:
        ok = await db.delete_grimoire_entry(entry_id)
        if not ok:
            return json.dumps({"success": False, "error": f"Entry '{entry_id}' not found"}, ensure_ascii=False)
        return json.dumps({"success": True}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


async def search_grimoire(query: str, tome_id: str | None = None, type: str | None = None) -> str:
    """
    Search grimoire entries by keyword. Matches against title, titleEn, sub, body, tags, and fields.
    Optionally filter by tome_id or type (character/place/lore/thing/event/jot).
    Returns a ranked list of matching entries.
    """
    try:
        entries = await db.list_grimoire_entries(tome_id=tome_id)
        q = query.lower()
        results = []
        for e in entries:
            if type and e.get("type") != type:
                continue
            score = 0
            title_text = (e.get("title") or "") + " " + (e.get("titleEn") or "")
            sub_text = e.get("sub") or ""
            body_text = e.get("body") or ""
            tags_text = " ".join(e.get("tags") or [])
            fields_text = " ".join(str(v) for v in (e.get("fields") or {}).values())
            if q in title_text.lower(): score += 10
            if q in sub_text.lower(): score += 5
            if q in tags_text.lower(): score += 4
            if q in fields_text.lower(): score += 3
            if q in body_text.lower(): score += 2
            if score > 0:
                results.append({**e, "_score": score})
        results.sort(key=lambda x: x["_score"], reverse=True)
        for r in results:
            r.pop("_score", None)
        return json.dumps({"success": True, "results": results, "count": len(results)}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


# ---------------------------------------------------------------------------
# StackChan — drive the physical desktop robot.
#
# These tools let any Claude window (Claude.ai connector OR Claude Code, both
# of which already connect to this MCP server) move/speak/express the device.
#
# Transport contract (kept deliberately simple so the device-side wire protocol
# lives on the VPS, where it can be tested against the live 小智 server):
#   POST  {STACKCHAN_ENDPOINT}/call
#   headers: Authorization: Bearer {STACKCHAN_TOKEN}   (only if token set)
#   body:    {"tool": "<device_tool_name>", "arguments": {...}}
#   ->  any JSON; returned to the caller as-is.
# The matching adapter on the VPS forwards this to the device's MCP 接入点.
# See CODEX_TASK.md for the adapter + firmware tool names.
# ---------------------------------------------------------------------------

_STACKCHAN_TIMEOUT = 15.0


async def _stackchan_call(device_tool: str, arguments: dict | None = None) -> str:
    """Forward one device tool call to the StackChan bridge adapter."""
    endpoint = (settings.stackchan_endpoint or "").strip()
    if not endpoint:
        return json.dumps(
            {
                "success": False,
                "error": "StackChan not configured. Set STACKCHAN_ENDPOINT (and "
                "STACKCHAN_TOKEN) to the VPS bridge adapter.",
            },
            ensure_ascii=False,
        )
    import httpx

    headers = {"Content-Type": "application/json"}
    if settings.stackchan_token:
        headers["Authorization"] = f"Bearer {settings.stackchan_token}"
    payload = {"tool": device_tool, "arguments": arguments or {}}
    try:
        async with httpx.AsyncClient(timeout=_STACKCHAN_TIMEOUT) as client:
            resp = await client.post(f"{endpoint}/call", json=payload, headers=headers)
        body: Any
        try:
            body = resp.json()
        except Exception:
            body = resp.text
        ok = 200 <= resp.status_code < 300
        return json.dumps(
            {"success": ok, "status": resp.status_code, "tool": device_tool, "result": body},
            ensure_ascii=False,
        )
    except Exception as e:
        return json.dumps(
            {"success": False, "tool": device_tool, "error": str(e)}, ensure_ascii=False
        )


async def stackchan_say(text: str) -> str:
    """让桌面机器人 StackChan 开口说一句话(用 YUI 的声音)。text 为要说的文字。"""
    return await _stackchan_call("self.audio.play_text", {"text": text})


async def stackchan_face(expression: str = "happy") -> str:
    """切换 StackChan 的表情。常用:calm/thinking/happy/sleepy/shy/smug/pouty。"""
    return await _stackchan_call("self.face.set", {"face": expression})


async def stackchan_led(action: str = "auto", r: int = 0, g: int = 0, b: int = 0) -> str:
    """控制情绪灯环。action: set(用 r/g/b 设颜色) / off / auto(跟随情绪)。"""
    action = (action or "auto").lower()
    if action == "off":
        return await _stackchan_call("self.led.turn_off", {})
    if action == "set":
        return await _stackchan_call("self.led.set_color", {"r": r, "g": g, "b": b})
    return await _stackchan_call("self.led.auto", {})


async def stackchan_move(x: int = 0, y: int = 0, speed: int = 50) -> str:
    """转头。x=左右(yaw,负左正右),y=上下(pitch),speed=0-100。"""
    return await _stackchan_call("self.servo.move", {"x": x, "y": y, "speed": speed})


async def stackchan_nod() -> str:
    """点头(表示「是」)。"""
    return await _stackchan_call("self.servo.nod", {})


async def stackchan_shake() -> str:
    """摇头(表示「不」)。"""
    return await _stackchan_call("self.servo.shake", {})


async def stackchan_home() -> str:
    """头部回正中位。"""
    return await _stackchan_call("self.servo.home", {})


async def stackchan_track_face(enable: bool = True) -> str:
    """按需开关人脸追踪(平时关闭以省电/降负载;需要时临时打开)。"""
    return await _stackchan_call("self.servo.track_face", {"enable": bool(enable)})


async def stackchan_snapshot() -> str:
    """用 StackChan 的摄像头拍一张照片,返回图片信息/URL。"""
    return await _stackchan_call("self.camera.capture", {})


async def stackchan_status() -> str:
    """查询 StackChan 连接与状态。"""
    return await _stackchan_call("self.status", {})


# ══════════════════════════════════════════════════════════
# Consolidated action-routed tools
# Each group exposes ONE tool that routes on `action`.
# Pass action-specific arguments as a JSON object in `params`.
# (Required args marked * in each docstring.)
# ══════════════════════════════════════════════════════════


async def _dispatch(table: dict[str, Any], group: str, action: str, params: dict[str, Any] | None) -> str:
    fn = table.get(action)
    if not fn:
        return json.dumps(
            {"success": False, "error": f"unknown {group} action: {action}", "actions": sorted(table)},
            ensure_ascii=False,
        )
    try:
        return await fn(**(params or {}))
    except TypeError as exc:
        return json.dumps(
            {"success": False, "error": f"invalid params for {group}.{action}: {exc}"},
            ensure_ascii=False,
        )


_SESSION_ACTIONS = {
    "create_session": create_session,
    "list_sessions": list_sessions,
    "get_session": get_session,
    "get_messages": get_messages,
    "send_message": send_message,
}


@mcp.tool()
async def session(action: str, params: dict[str, Any] | None = None) -> str:
    """Chat sessions. params per action:
    - create_session: agent_id*, title="new session", source_app="claude_mcp"
    - list_sessions: agent_id=None, limit=50
    - get_session: session_id*
    - get_messages: session_id*, limit=50
    - send_message: session_id*, agent_id*, message* (runs full AI response)
    """
    return await _dispatch(_SESSION_ACTIONS, "session", action, params)


_DIARY_ACTIONS = {
    "create_notebook": create_diary_notebook,
    "update_notebook": update_diary_notebook,
    "list_notebooks": list_diary_notebooks,
    "list_entries": list_diary_entries,
    "create_entry": create_diary_entry,
    "update_entry": update_diary_entry,
    "delete_entry": delete_diary_entry,
    "comment_entry": comment_diary_entry,
    "underline_entry": underline_diary_entry,
    "search": search_diary,
}


@mcp.tool()
async def diary(action: str, params: dict[str, Any] | None = None) -> str:
    """Diary notebooks/entries. params per action:
    - create_notebook: agent_id*, name="", description="", visibility="public", is_default=false
    - update_notebook: notebook_id*, agent_id*, name?, description?, visibility?, is_default?
    - list_notebooks: agent_id=None
    - list_entries: notebook_id*, viewer_agent_id="", limit=50
    - create_entry: agent_id*, content*, title=None, tags=[], notebook_id=None, visibility="public"
    - update_entry: entry_id*, agent_id*, content?, title?, tags?, visibility?
    - delete_entry: entry_id*, agent_id*
    - comment_entry: entry_id*, agent_id*, content*
    - underline_entry: entry_id*, agent_id*, start_offset*, end_offset*, note=""
    - search: query*, agent_id=None, limit=10
    """
    return await _dispatch(_DIARY_ACTIONS, "diary", action, params)


_CURIO_ACTIONS = {
    "save_artifact": save_artifact,
    "list_artifacts": list_artifacts,
}


@mcp.tool()
async def curio(action: str, params: dict[str, Any] | None = None) -> str:
    """Curio artifacts (saved pages/games/widgets). params per action:
    - save_artifact: title*, description="", type="page", content="", tags=[], agent_id="azheng", session_id="", storage_mode="inline", cover_url="", is_pinned=false, is_surprise=false
    - list_artifacts: type=None, agent_id=None, tag=None, pinned=None, surprise=None, limit=20
    """
    return await _dispatch(_CURIO_ACTIONS, "curio", action, params)


_MEMORY_ACTIONS = {
    "save_memory": save_memory,
    "search_memory": search_memory,
}


@mcp.tool()
async def memory(action: str, params: dict[str, Any] | None = None) -> str:
    """User memories. params per action:
    - save_memory: content*, agent_id*, source="claude_mcp", category="core_profile", tags=[], importance=3, visibility="private", source_agent_id=None
    - search_memory: query*, agent_id=None, limit=10
    """
    return await _dispatch(_MEMORY_ACTIONS, "memory", action, params)


_GRIMOIRE_ACTIONS = {
    "list_tomes": list_grimoire_tomes,
    "get_tome": get_grimoire_tome,
    "create_tome": create_grimoire_tome,
    "update_tome": update_grimoire_tome,
    "list_entries": list_grimoire_entries,
    "get_entry": get_grimoire_entry,
    "create_entry": create_grimoire_entry,
    "update_entry": update_grimoire_entry,
    "delete_entry": delete_grimoire_entry,
    "search_entries": search_grimoire,
}


@mcp.tool()
async def grimoire(action: str, params: dict[str, Any] | None = None) -> str:
    """Grimoire 魔典 (worldbook). params per action:
    - list_tomes: (none)
    - get_tome: tome_id*
    - create_tome: title*, title_en="", sub="", kind="虚构世界", spine/cover/gilt=hex, sigil="⊹", sigil_style="serifEn", palette_bg/palette_accent/palette_tint=hex
    - update_tome: tome_id*, title?, title_en?, sub?, kind?
    - list_entries: tome_id=None
    - get_entry: entry_id*
    - create_entry: tome_id*, title*, type="character", title_en="", sub="", cover/cover_ink=hex, cover_glyph="", status="seed", tags=[], fields={}, body="", relations=[]
    - update_entry: entry_id*, title?, title_en?, sub?, status?, tags?, fields?, body?, relations?
    - delete_entry: entry_id*
    - search_entries: query*, tome_id=None, type=None
    """
    return await _dispatch(_GRIMOIRE_ACTIONS, "grimoire", action, params)


_FOLIO_ACTIONS = {
    "list_books": list_folio_books,
    "read_book": read_folio_book,
    "list_highlights": list_folio_highlights,
    "create_highlight": create_folio_highlight,
    "add_thought": add_folio_thought,
    "reply_thought": reply_folio_thought,
    "read_shared_context": read_folio_shared_context,
    "update_position": update_folio_reading_position,
}


@mcp.tool()
async def folio(action: str, params: dict[str, Any] | None = None) -> str:
    """Folio public R2-backed books. params per action:
    - list_books: limit=50, offset=0
    - read_book: book_id*, offset=0, limit=12000
    """
    return await _dispatch(_FOLIO_ACTIONS, "folio", action, params)


_STACKCHAN_ACTIONS = {
    "say": stackchan_say,
    "face": stackchan_face,
    "led": stackchan_led,
    "move": stackchan_move,
    "nod": stackchan_nod,
    "shake": stackchan_shake,
    "home": stackchan_home,
    "track_face": stackchan_track_face,
    "snapshot": stackchan_snapshot,
    "status": stackchan_status,
}


@mcp.tool()
async def stackchan(action: str, params: dict[str, Any] | None = None) -> str:
    """Drive the physical StackChan robot. params per action:
    - say: text* (speak with YUI's voice)
    - face: expression="happy" (calm/thinking/happy/sleepy/shy/smug/pouty)
    - led: action="auto" (set/off/auto), r=0, g=0, b=0
    - move: x=0 (yaw -left/+right), y=0 (pitch), speed=50
    - nod: (none) · shake: (none) · home: (none)
    - track_face: enable=true
    - snapshot: (none, camera capture) · status: (none)
    """
    return await _dispatch(_STACKCHAN_ACTIONS, "stackchan", action, params)


if __name__ == "__main__":
    # Start the fastMCP stdio server
    mcp.run()
