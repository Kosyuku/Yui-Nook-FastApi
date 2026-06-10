"""Shared stdio MCP bridge for YUI business tools.

This bridge exposes stable dotted tool names for takeover clients such as
Codex and Claude Code. It deliberately stays thin: all persistence goes
through the existing database and R2 helpers.
"""
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

from mcp.server.fastmcp import FastMCP

import database as db
import media_storage

logger = logging.getLogger(__name__)

mcp = FastMCP("yui_tool_bridge")

CURIO_INLINE_LIMIT_BYTES = 500 * 1024


def _json(payload: dict[str, Any]) -> str:
    return json.dumps(payload, ensure_ascii=False)


def _ok(**payload: Any) -> str:
    return _json({"success": True, **payload})


def _err(message: str, **payload: Any) -> str:
    return _json({"success": False, "error": message, **payload})


def _tags(value: list[str] | str | None) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    text = str(value).strip()
    if not text:
        return []
    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
    except Exception:
        pass
    return [item.strip() for item in text.split(",") if item.strip()]


def _tag_text(value: list[str] | str | None) -> str:
    return ",".join(_tags(value))


def _matches_entry(entry: dict[str, Any], query: str) -> bool:
    if not query:
        return True
    q = query.lower()
    haystack = " ".join(
        [
            str(entry.get("title") or ""),
            str(entry.get("content") or ""),
            " ".join(_tags(entry.get("tags"))),
            str(entry.get("notebook_name") or ""),
        ]
    ).lower()
    return q in haystack


def _artifact_storage_key(title: str) -> str:
    filename = media_storage.sanitize_filename(f"{title or 'curio'}.html")
    return f"curio/{db._new_id()}_{filename}"


def _artifact_should_use_r2(content: str, storage_mode: str) -> bool:
    text = str(content or "").lstrip().lower()
    looks_like_html = (
        text.startswith("<!doctype")
        or text.startswith("<html")
        or "<script" in text[:2048]
        or "<body" in text[:2048]
    )
    return bool(content) and (
        len(content.encode("utf-8")) >= CURIO_INLINE_LIMIT_BYTES
        or (str(storage_mode or "").lower() == "r2" and looks_like_html)
    )


def _updates(**values: Any) -> dict[str, Any]:
    return {key: value for key, value in values.items() if value is not None}


def _matches_grimoire_entry(entry: dict[str, Any], query: str) -> bool:
    if not query:
        return True
    q = query.lower()
    haystack = " ".join(
        [
            str(entry.get("title") or ""),
            str(entry.get("titleEn") or ""),
            str(entry.get("sub") or ""),
            str(entry.get("body") or ""),
            " ".join(_tags(entry.get("tags"))),
            json.dumps(entry.get("fields") or {}, ensure_ascii=False),
        ]
    ).lower()
    return q in haystack


@mcp.tool(name="diary.list_books")
async def diary_list_books(agent_id: str = "", include_user_books: bool = True) -> str:
    """List diary books/notebooks visible in YUI."""
    try:
        notebooks = await db.list_diary_notebooks()
        if agent_id:
            normalized = db.normalize_agent_id(agent_id)
            notebooks = [
                item
                for item in notebooks
                if (
                    item.get("author_type") == "agent"
                    and item.get("author_id") == normalized
                )
                or (include_user_books and item.get("author_type") == "user")
            ]
        elif not include_user_books:
            notebooks = [item for item in notebooks if item.get("author_type") != "user"]
        return _ok(books=notebooks, count=len(notebooks))
    except Exception as exc:
        logger.exception("diary.list_books failed")
        return _err(str(exc))


@mcp.tool(name="diary.search_entries")
async def diary_search_entries(
    query: str = "",
    agent_id: str = "",
    notebook_id: str = "",
    viewer_agent_id: str = "",
    limit: int = 20,
) -> str:
    """Search diary entries by title/content/tags, optionally inside one book."""
    try:
        limit = max(1, min(int(limit or 20), 100))
        notebooks = await db.list_diary_notebooks()
        if notebook_id:
            notebooks = [item for item in notebooks if item.get("id") == notebook_id]
        elif agent_id:
            normalized = db.normalize_agent_id(agent_id)
            notebooks = [
                item
                for item in notebooks
                if item.get("author_type") == "agent" and item.get("author_id") == normalized
            ]

        entries: list[dict[str, Any]] = []
        for notebook in notebooks:
            book_entries = await db.list_diary_entries(
                str(notebook.get("id") or ""),
                limit=max(limit * 2, 50),
                viewer_agent_id=viewer_agent_id or agent_id or None,
                enforce_visibility=True,
            )
            for entry in book_entries:
                entry = {**entry, "notebook_name": notebook.get("name") or ""}
                if _matches_entry(entry, query):
                    entries.append(entry)

        entries.sort(key=lambda item: item.get("updated_at") or item.get("created_at") or "", reverse=True)
        return _ok(entries=entries[:limit], count=min(len(entries), limit), total_matches=len(entries))
    except Exception as exc:
        logger.exception("diary.search_entries failed")
        return _err(str(exc))


@mcp.tool(name="diary.get_entry")
async def diary_get_entry(entry_id: str) -> str:
    """Get one diary entry with its notebook, comments, and annotations."""
    try:
        entry_id = str(entry_id or "").strip()
        if not entry_id:
            return _err("entry_id is required")

        row = await db._get_diary_entry_row(entry_id)
        if not row:
            return _err("entry not found")

        notebook = await db._get_diary_notebook_row(str(row.get("notebook_id") or ""))
        comments = await db.list_diary_comments(entry_id)
        annotations = await db.list_diary_annotations(entry_id)
        entry = db._normalize_diary_entry_row(
            row,
            notebook=notebook,
            comments=comments,
            annotations=annotations,
        )
        if not entry:
            return _err("entry not found")
        return _ok(entry=entry, book=notebook)
    except Exception as exc:
        logger.exception("diary.get_entry failed")
        return _err(str(exc))


@mcp.tool(name="diary.create_entry")
async def diary_create_entry(
    agent_id: str,
    content: str,
    title: str = "",
    tags: list[str] | str | None = None,
    notebook_id: str = "",
    visibility: str = "public",
) -> str:
    """Create a diary entry in an agent book, or the agent default book."""
    try:
        if not str(content or "").strip():
            return _err("content is required")
        if notebook_id:
            entry = await db.create_agent_diary_entry(
                notebook_id,
                agent_id,
                title=title or "",
                content=content,
                tags=_tag_text(tags),
                visibility=visibility or "public",
            )
        else:
            entry = await db.add_diary(
                content=content,
                title=title or "",
                tags=_tag_text(tags),
                visibility=visibility or "public",
                agent_id=agent_id,
                source_agent_id=agent_id,
            )
        if not entry:
            return _err("entry not created; notebook may not belong to agent")
        return _ok(entry=entry, entry_id=entry.get("id"))
    except Exception as exc:
        logger.exception("diary.create_entry failed")
        return _err(str(exc))


@mcp.tool(name="diary.update_entry")
async def diary_update_entry(
    entry_id: str,
    agent_id: str,
    content: str | None = None,
    title: str | None = None,
    tags: list[str] | str | None = None,
    visibility: str | None = None,
) -> str:
    """Update an agent-owned diary entry."""
    try:
        tag_value = None if tags is None else _tag_text(tags)
        entry = await db.update_agent_diary_entry(
            entry_id,
            agent_id,
            content=content,
            title=title,
            tags=tag_value,
            visibility=visibility,
        )
        if not entry:
            return _err("entry not found for agent")
        return _ok(entry=entry)
    except Exception as exc:
        logger.exception("diary.update_entry failed")
        return _err(str(exc))


@mcp.tool(name="diary.delete_entry")
async def diary_delete_entry(entry_id: str, agent_id: str) -> str:
    """Delete an agent-owned diary entry."""
    try:
        ok = await db.delete_agent_diary_entry(entry_id, agent_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("diary.delete_entry failed")
        return _err(str(exc))


@mcp.tool(name="diary.comment_entry")
async def diary_comment_entry(
    entry_id: str,
    content: str,
    author_id: str,
    author_type: str = "agent",
) -> str:
    """Add a comment to a visible diary entry."""
    try:
        comment = await db.add_diary_comment(
            entry_id,
            content=content,
            author_type=author_type,
            author_id=author_id,
        )
        if not comment:
            return _err("entry not found or not commentable")
        return _ok(comment=comment, comment_id=comment.get("id"))
    except Exception as exc:
        logger.exception("diary.comment_entry failed")
        return _err(str(exc))


@mcp.tool(name="diary.underline_entry")
async def diary_underline_entry(
    entry_id: str,
    start_offset: int,
    end_offset: int,
    author_id: str,
    author_type: str = "agent",
    note: str = "",
) -> str:
    """Underline a text span in a visible diary entry."""
    try:
        annotation = await db.add_diary_underline(
            entry_id,
            start_offset=start_offset,
            end_offset=end_offset,
            author_type=author_type,
            author_id=author_id,
            note=note or "",
        )
        if not annotation:
            return _err("entry not found or span not annotatable")
        return _ok(annotation=annotation, annotation_id=annotation.get("id"))
    except Exception as exc:
        logger.exception("diary.underline_entry failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.list_tomes")
async def grimoire_list_tomes() -> str:
    """List all Grimoire tomes."""
    try:
        tomes = await db.list_grimoire_tomes()
        return _ok(tomes=tomes, count=len(tomes))
    except Exception as exc:
        logger.exception("grimoire.list_tomes failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.get_tome")
async def grimoire_get_tome(tome_id: str) -> str:
    """Get one Grimoire tome."""
    try:
        tome = await db.get_grimoire_tome(tome_id)
        if not tome:
            return _err("tome not found")
        return _ok(tome=tome)
    except Exception as exc:
        logger.exception("grimoire.get_tome failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.create_tome")
async def grimoire_create_tome(
    title: str,
    title_en: str = "",
    sub: str = "",
    kind: str = "",
    spine: str = "#2C3E5C",
    cover: str = "#3A4D6F",
    gilt: str = "#C5A572",
    sigil: str = "",
    sigil_style: str = "serifEn",
    palette: dict[str, Any] | None = None,
) -> str:
    """Create a Grimoire tome."""
    try:
        tome = await db.create_grimoire_tome(
            title=title,
            titleEn=title_en or "",
            sub=sub or "",
            kind=kind or "lore",
            spine=spine or "#2C3E5C",
            cover=cover or "#3A4D6F",
            gilt=gilt or "#C5A572",
            sigil=sigil or (title[:1] if title else ""),
            sigilStyle=sigil_style or "serifEn",
            palette=palette or {},
        )
        return _ok(tome=tome, tome_id=tome.get("id"))
    except Exception as exc:
        logger.exception("grimoire.create_tome failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.update_tome")
async def grimoire_update_tome(
    tome_id: str,
    title: str | None = None,
    title_en: str | None = None,
    sub: str | None = None,
    kind: str | None = None,
) -> str:
    """Update a Grimoire tome."""
    try:
        tome = await db.update_grimoire_tome(
            tome_id,
            **_updates(title=title, titleEn=title_en, sub=sub, kind=kind),
        )
        if not tome:
            return _err("tome not found")
        return _ok(tome=tome)
    except Exception as exc:
        logger.exception("grimoire.update_tome failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.list_entries")
async def grimoire_list_entries(tome_id: str = "") -> str:
    """List Grimoire entries, optionally by tome."""
    try:
        entries = await db.list_grimoire_entries(tome_id=tome_id or None)
        return _ok(entries=entries, count=len(entries))
    except Exception as exc:
        logger.exception("grimoire.list_entries failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.get_entry")
async def grimoire_get_entry(entry_id: str) -> str:
    """Get one Grimoire entry."""
    try:
        entry = await db.get_grimoire_entry(entry_id)
        if not entry:
            return _err("entry not found")
        return _ok(entry=entry)
    except Exception as exc:
        logger.exception("grimoire.get_entry failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.create_entry")
async def grimoire_create_entry(
    tome_id: str,
    title: str,
    type: str = "lore",
    title_en: str = "",
    sub: str = "",
    body: str = "",
    status: str = "seed",
    tags: list[str] | str | None = None,
    fields: dict[str, Any] | None = None,
    relations: list[dict[str, Any]] | None = None,
    cover: str = "#3A4D6F",
    cover_ink: str = "#F1E4BD",
    cover_glyph: str = "",
) -> str:
    """Create a grimoire entry in a tome."""
    try:
        if not str(tome_id or "").strip():
            return _err("tome_id is required")
        if not str(title or "").strip():
            return _err("title is required")
        entry = await db.create_grimoire_entry(
            tome=tome_id,
            title=title,
            type=type or "lore",
            titleEn=title_en or "",
            sub=sub or "",
            cover=cover or "#3A4D6F",
            coverInk=cover_ink or "#F1E4BD",
            coverGlyph=cover_glyph or title[:1],
            status=status or "seed",
            tags=_tags(tags),
            fields=fields or {},
            body=body or "",
            relations=relations or [],
        )
        return _ok(entry=entry, entry_id=entry.get("id"))
    except Exception as exc:
        logger.exception("grimoire.create_entry failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.update_entry")
async def grimoire_update_entry(
    entry_id: str,
    title: str | None = None,
    type: str | None = None,
    title_en: str | None = None,
    sub: str | None = None,
    body: str | None = None,
    status: str | None = None,
    tags: list[str] | str | None = None,
    fields: dict[str, Any] | None = None,
    relations: list[dict[str, Any]] | None = None,
) -> str:
    """Update a Grimoire entry."""
    try:
        entry = await db.update_grimoire_entry(
            entry_id,
            **_updates(
                title=title,
                type=type,
                titleEn=title_en,
                sub=sub,
                body=body,
                status=status,
                tags=None if tags is None else _tags(tags),
                fields=fields,
                relations=relations,
            ),
        )
        if not entry:
            return _err("entry not found")
        return _ok(entry=entry)
    except Exception as exc:
        logger.exception("grimoire.update_entry failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.delete_entry")
async def grimoire_delete_entry(entry_id: str) -> str:
    """Delete a Grimoire entry."""
    try:
        ok = await db.delete_grimoire_entry(entry_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("grimoire.delete_entry failed")
        return _err(str(exc))


@mcp.tool(name="grimoire.search_entries")
async def grimoire_search_entries(query: str, tome_id: str = "", type: str = "", limit: int = 20) -> str:
    """Search Grimoire entries by keyword."""
    try:
        entries = await db.list_grimoire_entries(tome_id=tome_id or None)
        if type:
            entries = [entry for entry in entries if entry.get("type") == type]
        matches = [entry for entry in entries if _matches_grimoire_entry(entry, query)]
        limit = max(1, min(int(limit or 20), 100))
        return _ok(entries=matches[:limit], count=min(len(matches), limit), total_matches=len(matches))
    except Exception as exc:
        logger.exception("grimoire.search_entries failed")
        return _err(str(exc))


@mcp.tool(name="curio.list_items")
async def curio_list_items(
    type: str = "",
    agent_id: str = "",
    tag: str = "",
    pinned: bool | None = None,
    surprise: bool | None = None,
    limit: int = 50,
    offset: int = 0,
) -> str:
    """List Curio items."""
    try:
        items = await db.list_artifact_items(
            type=type or None,
            agent_id=agent_id or None,
            tag=tag or None,
            pinned=pinned,
            surprise=surprise,
            limit=limit,
            offset=offset,
        )
        return _ok(items=items, count=len(items))
    except Exception as exc:
        logger.exception("curio.list_items failed")
        return _err(str(exc))


@mcp.tool(name="curio.get_item")
async def curio_get_item(item_id: str) -> str:
    """Get one Curio item."""
    try:
        item = await db.get_artifact_item(item_id)
        if not item:
            return _err("item not found")
        return _ok(item=item)
    except Exception as exc:
        logger.exception("curio.get_item failed")
        return _err(str(exc))


@mcp.tool(name="curio.save_item")
async def curio_save_item(
    title: str,
    content: str,
    description: str = "",
    type: str = "page",
    tags: list[str] | str | None = None,
    agent_id: str = "",
    session_id: str = "",
    storage_mode: str = "inline",
    cover_url: str = "",
    is_pinned: bool = False,
    is_surprise: bool = False,
) -> str:
    """Save a Curio item; large/forced HTML content is uploaded to R2."""
    try:
        if not str(title or "").strip():
            return _err("title is required")
        item_content = content or ""
        item_storage = storage_mode or "inline"
        metadata: dict[str, Any] = {"source": "yui_tool_bridge"}
        if _artifact_should_use_r2(item_content, item_storage):
            data = item_content.encode("utf-8")
            storage_key = _artifact_storage_key(title)
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(
                None, lambda: media_storage.r2_client.put_object(storage_key, data, mime_type="text/html; charset=utf-8")
            )
            item_content = storage_key
            item_storage = "r2"
            metadata.update({"size_bytes": len(data), "r2_mime_type": "text/html; charset=utf-8"})

        item = await db.create_artifact_item(
            title=title,
            description=description or "",
            type=type or "page",
            content=item_content,
            storage_mode=item_storage,
            cover_url=cover_url or "",
            tags=_tags(tags),
            agent_id=agent_id or "",
            session_id=session_id or "",
            is_pinned=is_pinned,
            is_surprise=is_surprise,
            metadata=metadata,
        )
        return _ok(item=item, item_id=item.get("id"))
    except Exception as exc:
        logger.exception("curio.save_item failed")
        return _err(str(exc))


@mcp.tool(name="curio.update_item")
async def curio_update_item(
    item_id: str,
    title: str | None = None,
    description: str | None = None,
    type: str | None = None,
    content: str | None = None,
    tags: list[str] | str | None = None,
    agent_id: str | None = None,
    session_id: str | None = None,
    storage_mode: str | None = None,
    cover_url: str | None = None,
    is_pinned: bool | None = None,
    is_surprise: bool | None = None,
    metadata: dict[str, Any] | None = None,
) -> str:
    """Update a Curio item."""
    try:
        ok = await db.update_artifact_item(
            item_id,
            **_updates(
                title=title,
                description=description,
                type=type,
                content=content,
                tags=None if tags is None else _tags(tags),
                agent_id=agent_id,
                session_id=session_id,
                storage_mode=storage_mode,
                cover_url=cover_url,
                is_pinned=is_pinned,
                is_surprise=is_surprise,
                metadata=metadata,
            ),
        )
        if not ok:
            return _err("item not found or no fields changed")
        return _ok(item=await db.get_artifact_item(item_id))
    except Exception as exc:
        logger.exception("curio.update_item failed")
        return _err(str(exc))


@mcp.tool(name="curio.delete_item")
async def curio_delete_item(item_id: str) -> str:
    """Delete a Curio item."""
    try:
        ok = await db.delete_artifact_item(item_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("curio.delete_item failed")
        return _err(str(exc))


@mcp.tool(name="glean.list_items")
async def glean_list_items(
    status: str = "",
    type: str = "",
    target_module: str = "",
    agent_id: str = "",
    limit: int = 50,
    offset: int = 0,
) -> str:
    """List extracted Inbox/Glean/Folio/Perle/Drift items."""
    try:
        items = await db.list_extracted_items(
            status=status or None,
            type=type or None,
            target_module=target_module or None,
            agent_id=agent_id or None,
            limit=limit,
            offset=offset,
        )
        return _ok(items=items, count=len(items))
    except Exception as exc:
        logger.exception("glean.list_items failed")
        return _err(str(exc))


@mcp.tool(name="glean.create_item")
async def glean_create_item(
    title: str,
    type: str = "note",
    content: str = "",
    source_excerpt: str = "",
    target_module: str = "inbox",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict[str, Any] | None = None,
) -> str:
    """Create an extracted item for Glean, Folio, Perle, or Drift."""
    try:
        item = await db.create_extracted_item(
            type=type,
            title=title,
            content=content or "",
            source_excerpt=source_excerpt or "",
            target_module=target_module or "inbox",
            status=status or "accepted",
            agent_id=agent_id or "",
            session_id=session_id or "",
            message_id=message_id or "",
            metadata=metadata or {},
        )
        return _ok(item=item, item_id=item.get("id"))
    except Exception as exc:
        logger.exception("glean.create_item failed")
        return _err(str(exc))


@mcp.tool(name="glean.update_item")
async def glean_update_item(
    item_id: str,
    title: str | None = None,
    content: str | None = None,
    type: str | None = None,
    target_module: str | None = None,
    status: str | None = None,
    metadata: dict[str, Any] | None = None,
) -> str:
    """Update an extracted item."""
    try:
        ok = await db.update_extracted_item(
            item_id,
            **_updates(
                title=title,
                content=content,
                type=type,
                target_module=target_module,
                status=status,
                metadata=metadata,
            ),
        )
        return _ok(updated=ok)
    except Exception as exc:
        logger.exception("glean.update_item failed")
        return _err(str(exc))


@mcp.tool(name="glean.delete_item")
async def glean_delete_item(item_id: str) -> str:
    """Delete an extracted item."""
    try:
        ok = await db.delete_extracted_item(item_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("glean.delete_item failed")
        return _err(str(exc))


async def _module_list_items(module: str, status: str, type: str, agent_id: str, limit: int, offset: int) -> str:
    items = await db.list_extracted_items(
        status=status or None,
        type=type or None,
        target_module=module,
        agent_id=agent_id or None,
        limit=limit,
        offset=offset,
    )
    return _ok(items=items, count=len(items))


async def _module_create_item(
    module: str,
    title: str,
    type: str,
    content: str,
    source_excerpt: str,
    status: str,
    agent_id: str,
    session_id: str,
    message_id: str,
    metadata: dict[str, Any] | None,
) -> str:
    item = await db.create_extracted_item(
        type=type,
        title=title,
        content=content or "",
        source_excerpt=source_excerpt or "",
        target_module=module,
        status=status or "accepted",
        agent_id=agent_id or "",
        session_id=session_id or "",
        message_id=message_id or "",
        metadata=metadata or {},
    )
    return _ok(item=item, item_id=item.get("id"))


@mcp.tool(name="inbox.list_items")
async def inbox_list_items(status: str = "", type: str = "", agent_id: str = "", limit: int = 50, offset: int = 0) -> str:
    """List extracted items routed to Inbox/Glean."""
    try:
        return await _module_list_items("inbox", status, type, agent_id, limit, offset)
    except Exception as exc:
        logger.exception("inbox.list_items failed")
        return _err(str(exc))


@mcp.tool(name="inbox.create_item")
async def inbox_create_item(
    title: str,
    type: str = "note",
    content: str = "",
    source_excerpt: str = "",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict[str, Any] | None = None,
) -> str:
    """Create an extracted item routed to Inbox/Glean."""
    try:
        return await _module_create_item("inbox", title, type, content, source_excerpt, status, agent_id, session_id, message_id, metadata)
    except Exception as exc:
        logger.exception("inbox.create_item failed")
        return _err(str(exc))


@mcp.tool(name="folio.list_items")
async def folio_list_items(status: str = "", type: str = "", agent_id: str = "", limit: int = 50, offset: int = 0) -> str:
    """List extracted items routed to Folio."""
    try:
        return await _module_list_items("folio", status, type, agent_id, limit, offset)
    except Exception as exc:
        logger.exception("folio.list_items failed")
        return _err(str(exc))


@mcp.tool(name="folio.create_item")
async def folio_create_item(
    title: str,
    type: str = "note",
    content: str = "",
    source_excerpt: str = "",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict[str, Any] | None = None,
) -> str:
    """Create an extracted item routed to Folio."""
    try:
        return await _module_create_item("folio", title, type, content, source_excerpt, status, agent_id, session_id, message_id, metadata)
    except Exception as exc:
        logger.exception("folio.create_item failed")
        return _err(str(exc))


@mcp.tool(name="perle.list_items")
async def perle_list_items(status: str = "", type: str = "", agent_id: str = "", limit: int = 50, offset: int = 0) -> str:
    """List extracted items routed to Perle."""
    try:
        return await _module_list_items("perle", status, type, agent_id, limit, offset)
    except Exception as exc:
        logger.exception("perle.list_items failed")
        return _err(str(exc))


@mcp.tool(name="perle.create_item")
async def perle_create_item(
    title: str,
    type: str = "note",
    content: str = "",
    source_excerpt: str = "",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict[str, Any] | None = None,
) -> str:
    """Create an extracted item routed to Perle."""
    try:
        return await _module_create_item("perle", title, type, content, source_excerpt, status, agent_id, session_id, message_id, metadata)
    except Exception as exc:
        logger.exception("perle.create_item failed")
        return _err(str(exc))


@mcp.tool(name="drift.list_items")
async def drift_list_items(status: str = "", type: str = "", agent_id: str = "", limit: int = 50, offset: int = 0) -> str:
    """List extracted items routed to Drift/Calendar."""
    try:
        return await _module_list_items("drift", status, type, agent_id, limit, offset)
    except Exception as exc:
        logger.exception("drift.list_items failed")
        return _err(str(exc))


@mcp.tool(name="drift.create_item")
async def drift_create_item(
    title: str,
    type: str = "event",
    content: str = "",
    source_excerpt: str = "",
    status: str = "accepted",
    agent_id: str = "",
    session_id: str = "",
    message_id: str = "",
    metadata: dict[str, Any] | None = None,
) -> str:
    """Create an extracted item routed to Drift/Calendar."""
    try:
        return await _module_create_item("drift", title, type, content, source_excerpt, status, agent_id, session_id, message_id, metadata)
    except Exception as exc:
        logger.exception("drift.create_item failed")
        return _err(str(exc))


@mcp.tool(name="media.list_items")
async def media_list_items(type: str = "", owner_type: str = "", agent_id: str = "", limit: int = 100) -> str:
    """List media items used by Perle/Folio-style apps."""
    try:
        items = await db.list_media_items(
            type=type or None,
            owner_type=owner_type or None,
            agent_id=agent_id or None,
            limit=limit,
        )
        return _ok(items=items, count=len(items))
    except Exception as exc:
        logger.exception("media.list_items failed")
        return _err(str(exc))


@mcp.tool(name="media.create_item")
async def media_create_item(
    storage_key: str,
    type: str = "other",
    title: str = "",
    owner_type: str = "user",
    agent_id: str = "",
    artist: str = "",
    album: str = "",
    author: str = "",
    storage_provider: str = "r2",
    cover_key: str = "",
    mime_type: str = "",
    size_bytes: int | None = None,
    duration_seconds: float | None = None,
    metadata: dict[str, Any] | None = None,
) -> str:
    """Register an already-uploaded media item."""
    try:
        item = await db.create_media_item(
            owner_type=owner_type,
            agent_id=agent_id or None,
            type=type,
            title=title,
            artist=artist,
            album=album,
            author=author,
            storage_provider=storage_provider,
            storage_key=storage_key,
            cover_key=cover_key,
            mime_type=mime_type,
            size_bytes=size_bytes,
            duration_seconds=duration_seconds,
            metadata=metadata or {},
        )
        return _ok(item=item, item_id=item.get("id"))
    except Exception as exc:
        logger.exception("media.create_item failed")
        return _err(str(exc))


@mcp.tool(name="media.update_item")
async def media_update_item(
    item_id: str,
    title: str | None = None,
    artist: str | None = None,
    album: str | None = None,
    author: str | None = None,
    cover_key: str | None = None,
    metadata: dict[str, Any] | None = None,
) -> str:
    """Update media metadata."""
    try:
        item = await db.update_media_item(
            item_id,
            title=title,
            artist=artist,
            album=album,
            author=author,
            cover_key=cover_key,
            metadata=metadata,
        )
        if not item:
            return _err("item not found")
        return _ok(item=item)
    except Exception as exc:
        logger.exception("media.update_item failed")
        return _err(str(exc))


@mcp.tool(name="media.delete_item")
async def media_delete_item(item_id: str) -> str:
    """Delete media metadata. This does not delete the R2 object."""
    try:
        item = await db.delete_media_item(item_id)
        return _ok(deleted=bool(item), item=item)
    except Exception as exc:
        logger.exception("media.delete_item failed")
        return _err(str(exc))


@mcp.tool(name="moments.list_posts")
async def moments_list_posts(limit: int = 100, viewer_id: str = "", viewer_type: str = "user") -> str:
    """List visible Moments posts."""
    try:
        posts = await db.list_moments(limit=limit, viewer_type=viewer_type, viewer_id=viewer_id or None)
        return _ok(posts=posts, count=len(posts))
    except Exception as exc:
        logger.exception("moments.list_posts failed")
        return _err(str(exc))


@mcp.tool(name="moments.get_post")
async def moments_get_post(post_id: str) -> str:
    """Get one Moments post."""
    try:
        post = await db.get_moment(post_id)
        if not post:
            return _err("post not found")
        return _ok(post=post)
    except Exception as exc:
        logger.exception("moments.get_post failed")
        return _err(str(exc))


@mcp.tool(name="moments.create_post")
async def moments_create_post(
    content: str,
    author_id: str,
    author_type: str = "agent",
    visibility: str = "public",
    image: str = "",
    mood: str = "",
) -> str:
    """Create a Moments post. image should be an existing URL or R2 key."""
    try:
        if not str(content or "").strip() and not str(image or "").strip():
            return _err("content or image is required")
        post = await db.add_moment(
            author_type=author_type or "agent",
            author_id=author_id,
            visibility=visibility or "public",
            content=content or "",
            image=image or "",
            mood=mood or "",
        )
        return _ok(post=post, post_id=post.get("id"))
    except Exception as exc:
        logger.exception("moments.create_post failed")
        return _err(str(exc))


@mcp.tool(name="moments.update_post")
async def moments_update_post(
    post_id: str,
    author_id: str,
    author_type: str = "agent",
    visibility: str | None = None,
    content: str | None = None,
    image: str | None = None,
    mood: str | None = None,
) -> str:
    """Update a Moments post owned by the author."""
    try:
        ok = await db.update_moment(
            post_id,
            author_type=author_type,
            author_id=author_id,
            visibility=visibility,
            content=content,
            image=image,
            mood=mood,
        )
        return _ok(updated=ok, post=await db.get_moment(post_id) if ok else None)
    except Exception as exc:
        logger.exception("moments.update_post failed")
        return _err(str(exc))


@mcp.tool(name="moments.delete_post")
async def moments_delete_post(post_id: str, author_id: str, author_type: str = "agent") -> str:
    """Delete a Moments post owned by the author."""
    try:
        ok = await db.delete_moment(post_id, author_type=author_type, author_id=author_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("moments.delete_post failed")
        return _err(str(exc))


@mcp.tool(name="moments.like_post")
async def moments_like_post(post_id: str, actor_id: str, actor_type: str = "agent", actor_name: str = "") -> str:
    """Toggle a like on a Moments post."""
    try:
        post = await db.toggle_moment_like(post_id, actor_type=actor_type, actor_id=actor_id, actor_name=actor_name)
        if not post:
            return _err("post not found")
        return _ok(post=post)
    except Exception as exc:
        logger.exception("moments.like_post failed")
        return _err(str(exc))


@mcp.tool(name="moments.comment_post")
async def moments_comment_post(
    post_id: str,
    text: str,
    actor_id: str,
    actor_type: str = "agent",
    actor_name: str = "",
) -> str:
    """Comment on a Moments post."""
    try:
        post = await db.add_moment_comment(
            post_id,
            actor_type=actor_type,
            actor_id=actor_id,
            actor_name=actor_name,
            text=text,
        )
        if not post:
            return _err("post not found")
        return _ok(post=post)
    except Exception as exc:
        logger.exception("moments.comment_post failed")
        return _err(str(exc))


@mcp.tool(name="parlor.list_rounds")
async def parlor_list_rounds(status: str = "", limit: int = 50, offset: int = 0) -> str:
    """List Parlor rounds."""
    try:
        rounds = await db.list_parlor_rounds(status=status or None, limit=limit, offset=offset)
        return _ok(rounds=rounds, count=len(rounds))
    except Exception as exc:
        logger.exception("parlor.list_rounds failed")
        return _err(str(exc))


@mcp.tool(name="parlor.create_round")
async def parlor_create_round(
    title: str,
    description: str = "",
    created_by: str = "agent",
    mode: str = "roundtable",
    auto_mode: bool = False,
    max_turns_per_session: int = 8,
    seats: list[dict[str, Any]] | None = None,
    opening: str = "",
) -> str:
    """Create a Parlor round with optional seats and opening user turn."""
    try:
        round_info = await db.create_parlor_round(
            title=title,
            description=description,
            created_by=created_by,
            mode=mode,
            auto_mode=auto_mode,
            max_turns_per_session=max_turns_per_session,
        )
        for index, seat in enumerate(seats or []):
            await db.create_parlor_seat(round_info["id"], seat_order=index, **seat)
        if str(opening or "").strip():
            await db.create_parlor_turn(round_info["id"], agent_id="user", content=opening.strip(), is_user=True)
        return _ok(round=await db.get_parlor_round(round_info["id"], include_children=True), round_id=round_info.get("id"))
    except Exception as exc:
        logger.exception("parlor.create_round failed")
        return _err(str(exc))


@mcp.tool(name="parlor.get_round")
async def parlor_get_round(round_id: str, include_children: bool = True) -> str:
    """Get a Parlor round."""
    try:
        round_info = await db.get_parlor_round(round_id, include_children=include_children)
        if not round_info:
            return _err("round not found")
        return _ok(round=round_info)
    except Exception as exc:
        logger.exception("parlor.get_round failed")
        return _err(str(exc))


@mcp.tool(name="parlor.update_round")
async def parlor_update_round(
    round_id: str,
    title: str | None = None,
    description: str | None = None,
    status: str | None = None,
    mode: str | None = None,
    auto_mode: bool | None = None,
    max_turns_per_session: int | None = None,
    summary: dict[str, Any] | None = None,
) -> str:
    """Update a Parlor round."""
    try:
        ok = await db.update_parlor_round(
            round_id,
            **_updates(
                title=title,
                description=description,
                status=status,
                mode=mode,
                auto_mode=auto_mode,
                max_turns_per_session=max_turns_per_session,
                summary=summary,
            ),
        )
        return _ok(updated=ok, round=await db.get_parlor_round(round_id, include_children=True) if ok else None)
    except Exception as exc:
        logger.exception("parlor.update_round failed")
        return _err(str(exc))


@mcp.tool(name="parlor.delete_round")
async def parlor_delete_round(round_id: str) -> str:
    """Delete a Parlor round."""
    try:
        ok = await db.delete_parlor_round(round_id)
        return _ok(deleted=ok)
    except Exception as exc:
        logger.exception("parlor.delete_round failed")
        return _err(str(exc))


@mcp.tool(name="parlor.add_seat")
async def parlor_add_seat(
    round_id: str,
    agent_id: str,
    display_name: str = "",
    model: str = "",
    provider: str = "",
    system_prompt: str = "",
    color: str = "",
    seat_order: int = 0,
) -> str:
    """Add a seat to a Parlor round."""
    try:
        seat = await db.create_parlor_seat(
            round_id,
            agent_id=agent_id,
            display_name=display_name,
            model=model,
            provider=provider,
            system_prompt=system_prompt,
            color=color,
            seat_order=seat_order,
        )
        return _ok(seat=seat, seat_id=seat.get("id"))
    except Exception as exc:
        logger.exception("parlor.add_seat failed")
        return _err(str(exc))


@mcp.tool(name="parlor.speak")
async def parlor_speak(round_id: str, content: str, agent_id: str = "user", seat_id: str = "", is_user: bool = True) -> str:
    """Add a Parlor turn."""
    try:
        turn = await db.create_parlor_turn(
            round_id,
            seat_id=seat_id,
            agent_id=agent_id,
            content=content,
            is_user=is_user,
        )
        return _ok(turn=turn, turn_id=turn.get("id"))
    except Exception as exc:
        logger.exception("parlor.speak failed")
        return _err(str(exc))


@mcp.tool(name="parlor.list_turns")
async def parlor_list_turns(round_id: str, limit: int = 100, offset: int = 0) -> str:
    """List turns in a Parlor round."""
    try:
        turns = await db.list_parlor_turns(round_id, limit=limit, offset=offset)
        return _ok(turns=turns, count=len(turns))
    except Exception as exc:
        logger.exception("parlor.list_turns failed")
        return _err(str(exc))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    mcp.run()
