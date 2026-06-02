"""Shared stdio MCP bridge for YUI business tools.

This bridge exposes stable dotted tool names for takeover clients such as
Codex and Claude Code. It deliberately stays thin: all persistence goes
through the existing database and R2 helpers.
"""
from __future__ import annotations

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
            media_storage.r2_client.put_object(storage_key, data, mime_type="text/html; charset=utf-8")
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


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    mcp.run()
