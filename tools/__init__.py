"""
Tool registry and execution guard.

This module exposes:
- TOOLS_SCHEMA
- TOOL_EXECUTORS
- register_tool
- execute_tool_with_guard
- init_external_tools
"""
from __future__ import annotations

import asyncio
import inspect
import json
import logging
import time
from datetime import datetime
from typing import Any, Callable

import database as db
import media_storage
from config import settings
from yui_app_tool_registry import register_app_tools

logger = logging.getLogger(__name__)


async def execute_get_current_time(args: dict) -> str:
    now = datetime.now()
    weekday_cn = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    return json.dumps(
        {
            "current_time": now.isoformat(),
            "weekday": weekday_cn[now.weekday()],
            "formatted": now.strftime("%Y年%m月%d日 %H:%M"),
        },
        ensure_ascii=False,
    )


async def execute_add_memory(args: dict) -> str:
    content = args.get("content")
    category = args.get("category")
    tags = args.get("tags", "")
    try:
        kwargs = {
            "content": content,
            "raw_content": args.get("raw_content") or content,
            "category": category,
            "tags": tags,
            "source": args.get("source") or "agent_tool",
            "agent_id": args.get("agent_id"),
            "visibility": args.get("visibility") or "private",
            "source_agent_id": args.get("source_agent_id") or args.get("agent_id"),
            "importance": args.get("importance"),
            "expires_at": args.get("expires_at"),
        }
        if "apply_filter" in inspect.signature(db.add_memory).parameters:
            kwargs["apply_filter"] = bool(args.get("apply_filter", True))
        res = await db.add_memory(**kwargs)
        return json.dumps({"status": "success", "memory_id": res["id"]}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_list_memories(args: dict) -> str:
    category = args.get("category")
    limit = args.get("limit", 10)
    try:
        memories = await db.list_memories(
            category=category,
            limit=limit,
            agent_id=args.get("agent_id"),
        )
        return json.dumps({"status": "success", "count": len(memories), "memories": memories}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_search_memories(args: dict) -> str:
    keyword = args.get("keyword", "")
    category = args.get("category")
    limit = args.get("limit", 10)
    try:
        memories = await db.search_memories(
            keyword=keyword,
            category=category,
            limit=limit,
            agent_id=args.get("agent_id"),
        )
        return json.dumps({"status": "success", "count": len(memories), "memories": memories}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_delete_memory(args: dict) -> str:
    memory_id = args.get("memory_id")
    try:
        ok = await db.delete_memory(memory_id)
        return json.dumps({"status": "success" if ok else "not_found"}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_update_memory(args: dict) -> str:
    memory_id = args.get("memory_id")
    updates: dict[str, Any] = {}
    if "content" in args:
        updates["content"] = args["content"]
    if "raw_content" in args:
        updates["raw_content"] = args["raw_content"]
    if "compressed_content" in args:
        updates["compressed_content"] = args["compressed_content"]
    if "category" in args:
        updates["category"] = args["category"]
    if "tags" in args:
        updates["tags"] = args["tags"]
    if "importance" in args:
        updates["importance"] = args["importance"]
    if "expires_at" in args:
        updates["expires_at"] = args["expires_at"]
    try:
        ok = await db.update_memory(memory_id, **updates)
        return json.dumps({"status": "success" if ok else "not_found"}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_get_memory_stats(args: dict) -> str:
    try:
        stats = await db.get_memory_stats()
        return json.dumps({"status": "success", "stats": stats}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_list_diary_notebooks(args: dict) -> str:
    agent_id = args.get("agent_id")
    try:
        notebooks = await db.list_diary_notebooks()
        if agent_id:
            normalized = db.normalize_agent_id(agent_id)
            notebooks = [
                item for item in notebooks
                if item.get("author_type") == "agent" and item.get("author_id") == normalized
            ]
        return json.dumps({"status": "success", "count": len(notebooks), "notebooks": notebooks}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_create_diary_notebook(args: dict) -> str:
    try:
        notebook = await db.create_agent_diary_notebook(
            args.get("agent_id"),
            name=args.get("name") or "",
            description=args.get("description") or "",
            visibility=args.get("visibility") or "private",
            is_default=bool(args.get("is_default", False)),
        )
        return json.dumps({"status": "success", "notebook": notebook}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_update_diary_notebook(args: dict) -> str:
    try:
        notebook = await db.update_agent_diary_notebook(
            args.get("notebook_id"),
            args.get("agent_id"),
            name=args.get("name"),
            description=args.get("description"),
            visibility=args.get("visibility"),
            is_default=args.get("is_default") if "is_default" in args else None,
        )
        if not notebook:
            return json.dumps({"status": "not_found"}, ensure_ascii=False)
        return json.dumps({"status": "success", "notebook": notebook}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_update_diary_entry(args: dict) -> str:
    try:
        entry = await db.update_agent_diary_entry(
            args.get("entry_id"),
            args.get("agent_id"),
            title=args.get("title"),
            content=args.get("content"),
            tags=args.get("tags"),
        )
        if not entry:
            return json.dumps({"status": "not_found"}, ensure_ascii=False)
        return json.dumps({"status": "success", "entry": entry}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_delete_diary_entry(args: dict) -> str:
    try:
        ok = await db.delete_agent_diary_entry(args.get("entry_id"), args.get("agent_id"))
        return json.dumps({"status": "success" if ok else "not_found"}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_comment_diary_entry(args: dict) -> str:
    try:
        comment = await db.add_diary_comment(
            args.get("entry_id"),
            content=args.get("content") or "",
            author_type="agent",
            author_id=args.get("agent_id"),
        )
        if not comment:
            return json.dumps({"status": "not_found"}, ensure_ascii=False)
        return json.dumps({"status": "success", "comment": comment}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_underline_diary_entry(args: dict) -> str:
    try:
        annotation = await db.add_diary_underline(
            args.get("entry_id"),
            start_offset=int(args.get("start_offset", 0)),
            end_offset=int(args.get("end_offset", 0)),
            author_type="agent",
            author_id=args.get("agent_id"),
            note=args.get("note") or "",
        )
        if not annotation:
            return json.dumps({"status": "not_found", "message": "invalid underline range or entry not found"}, ensure_ascii=False)
        return json.dumps({"status": "success", "annotation": annotation}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_create_diary_entry(args: dict) -> str:
    try:
        notebook_id = args.get("notebook_id")
        agent_id = args.get("agent_id")
        if notebook_id:
            entry = await db.create_agent_diary_entry(
                notebook_id,
                agent_id,
                title=args.get("title") or "",
                content=args.get("content") or "",
                tags=args.get("tags") or "",
            )
        else:
            entry = await db.add_diary(
                content=args.get("content") or "",
                title=args.get("title") or "",
                tags=args.get("tags") or "",
                visibility=args.get("visibility") or "private",
                agent_id=agent_id,
                source_agent_id=args.get("source_agent_id") or agent_id,
            )
        if not entry:
            return json.dumps({"status": "not_found"}, ensure_ascii=False)
        return json.dumps({"status": "success", "entry": entry}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "Get server local date/time and weekday.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "add_memory",
            "description": "Save one memory item.",
            "parameters": {
                "type": "object",
                "properties": {
                    "content": {"type": "string", "description": "memory content"},
                    "category": {
                        "type": "string",
                        "enum": ["core_profile", "recent_pending", "deep", "ephemeral"],
                    },
                    "tags": {"type": "string", "description": "comma separated tags"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                    "visibility": {"type": "string", "enum": ["private", "shared", "global"]},
                    "source_agent_id": {"type": "string", "description": "original source agent id"},
                    "source": {"type": "string", "description": "write source label"},
                    "apply_filter": {"type": "boolean", "description": "apply memory quality filter; defaults to true"},
                },
                "required": ["content", "category"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_memories",
            "description": "List memories by category.",
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "enum": ["core_profile", "recent_pending", "deep", "ephemeral"],
                    },
                    "limit": {"type": "integer", "description": "max rows, default 10"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_memories",
            "description": "Search memories by keyword.",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {"type": "string", "description": "keyword"},
                    "category": {
                        "type": "string",
                        "enum": ["core_profile", "recent_pending", "deep", "ephemeral"],
                    },
                    "limit": {"type": "integer", "description": "max rows, default 10"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                },
                "required": ["keyword"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "delete_memory",
            "description": "Delete memory by id.",
            "parameters": {
                "type": "object",
                "properties": {"memory_id": {"type": "string", "description": "memory id"}},
                "required": ["memory_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "update_memory",
            "description": "Update memory content or metadata.",
            "parameters": {
                "type": "object",
                "properties": {
                    "memory_id": {"type": "string", "description": "memory id"},
                    "content": {"type": "string"},
                    "category": {
                        "type": "string",
                        "enum": ["core_profile", "recent_pending", "deep", "ephemeral"],
                    },
                    "tags": {"type": "string"},
                },
                "required": ["memory_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_memory_stats",
            "description": "Get memory statistics grouped by category.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_diary_notebooks",
            "description": "List diary notebooks, optionally for one agent.",
            "parameters": {
                "type": "object",
                "properties": {
                    "agent_id": {"type": "string", "description": "owner agent id"},
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_diary_notebook",
            "description": "Create a diary notebook for one agent.",
            "parameters": {
                "type": "object",
                "properties": {
                    "agent_id": {"type": "string", "description": "owner agent id"},
                    "name": {"type": "string", "description": "notebook name"},
                    "description": {"type": "string", "description": "notebook description"},
                    "visibility": {"type": "string", "enum": ["private", "shared", "global"]},
                    "is_default": {"type": "boolean", "description": "make this the default notebook"},
                },
                "required": ["agent_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "update_diary_notebook",
            "description": "Rename or update an agent-owned diary notebook.",
            "parameters": {
                "type": "object",
                "properties": {
                    "notebook_id": {"type": "string", "description": "notebook id"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                    "name": {"type": "string", "description": "new notebook name"},
                    "description": {"type": "string", "description": "new notebook description"},
                    "visibility": {"type": "string", "enum": ["private", "shared", "global"]},
                    "is_default": {"type": "boolean", "description": "make this the default notebook"},
                },
                "required": ["notebook_id", "agent_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_diary_entry",
            "description": "Create a diary entry in an agent notebook, or the agent default notebook if notebook_id is omitted.",
            "parameters": {
                "type": "object",
                "properties": {
                    "agent_id": {"type": "string", "description": "owner agent id"},
                    "content": {"type": "string", "description": "diary body"},
                    "title": {"type": "string", "description": "diary title"},
                    "tags": {"type": "string", "description": "comma separated tags"},
                    "notebook_id": {"type": "string", "description": "optional target notebook id"},
                    "visibility": {"type": "string", "enum": ["private", "shared", "global"]},
                    "source_agent_id": {"type": "string", "description": "original source agent id"},
                },
                "required": ["agent_id", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "update_diary_entry",
            "description": "Update an agent-owned diary entry.",
            "parameters": {
                "type": "object",
                "properties": {
                    "entry_id": {"type": "string", "description": "diary entry id"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                    "content": {"type": "string", "description": "new diary body"},
                    "title": {"type": "string", "description": "new diary title"},
                    "tags": {"type": "string", "description": "comma separated tags"},
                },
                "required": ["entry_id", "agent_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "comment_diary_entry",
            "description": "Comment on a diary entry as the current agent.",
            "parameters": {
                "type": "object",
                "properties": {
                    "entry_id": {"type": "string", "description": "diary entry id"},
                    "agent_id": {"type": "string", "description": "comment author agent id"},
                    "content": {"type": "string", "description": "comment content"},
                },
                "required": ["entry_id", "agent_id", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "underline_diary_entry",
            "description": "Add an underline annotation to a diary entry without changing its text.",
            "parameters": {
                "type": "object",
                "properties": {
                    "entry_id": {"type": "string", "description": "diary entry id"},
                    "agent_id": {"type": "string", "description": "annotation author agent id"},
                    "start_offset": {"type": "integer", "description": "inclusive character offset"},
                    "end_offset": {"type": "integer", "description": "exclusive character offset"},
                    "note": {"type": "string", "description": "optional note for the underline"},
                },
                "required": ["entry_id", "agent_id", "start_offset", "end_offset"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "delete_diary_entry",
            "description": "Delete an agent-owned diary entry.",
            "parameters": {
                "type": "object",
                "properties": {
                    "entry_id": {"type": "string", "description": "diary entry id"},
                    "agent_id": {"type": "string", "description": "owner agent id"},
                },
                "required": ["entry_id", "agent_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_extracted_item",
            "description": (
                "当对话中出现明显的待办、笔记、想法或日程时，直接调用此工具写入统一收件箱。"
                "例如：'明天提醒我买猫粮'→todo，'想买香水'→todo/idea，"
                "'周五下午3点开会'→event，'这个设定以后可以用'→note/idea。"
                "同一句话重复说不会产生重复记录。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["todo", "note", "idea", "event"],
                        "description": "事项类型",
                    },
                    "title": {
                        "type": "string",
                        "description": "事项标题，简洁概括，10字以内最佳",
                    },
                    "content": {
                        "type": "string",
                        "description": "事项详细内容，可为空",
                    },
                    "source_excerpt": {
                        "type": "string",
                        "description": "触发写入的原始对话片段（关键词/句），用于去重和溯源",
                    },
                    "target_module": {
                        "type": "string",
                        "enum": ["inbox", "folio", "perle", "drift"],
                        "description": "目标模块，默认 inbox",
                    },
                },
                "required": ["type", "title"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "save_artifact",
            "description": "Save a generated HTML page, mini game, surprise page, or widget into Curio.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "artifact title"},
                    "description": {"type": "string", "description": "short card description"},
                    "type": {"type": "string", "enum": ["html", "game", "page", "widget"], "description": "artifact type"},
                    "content": {"type": "string", "description": "HTML source for inline artifacts, or an R2 object key"},
                    "storage_mode": {"type": "string", "enum": ["inline", "r2"], "description": "inline for small HTML, r2 for large artifacts"},
                    "cover_url": {"type": "string", "description": "optional cover image URL"},
                    "tags": {"type": "array", "items": {"type": "string"}, "description": "labels such as 520, surprise, game"},
                    "agent_id": {"type": "string", "description": "creator agent id"},
                    "session_id": {"type": "string", "description": "source chat session id"},
                    "is_pinned": {"type": "boolean", "description": "pin in Curio"},
                    "is_surprise": {"type": "boolean", "description": "mark as surprise page"},
                },
                "required": ["title", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_artifacts",
            "description": "List Curio artifacts, optionally filtered by type, creator, tag, pinned, or surprise state.",
            "parameters": {
                "type": "object",
                "properties": {
                    "type": {"type": "string", "enum": ["html", "game", "page", "widget"]},
                    "agent_id": {"type": "string"},
                    "tag": {"type": "string"},
                    "pinned": {"type": "boolean"},
                    "surprise": {"type": "boolean"},
                    "limit": {"type": "integer", "minimum": 1, "maximum": 100},
                },
            },
        },
    },
]


async def execute_create_extracted_item(args: dict) -> str:
    try:
        item = await db.create_extracted_item(
            type=args.get("type", "todo"),
            title=args.get("title", ""),
            content=args.get("content", ""),
            source_excerpt=args.get("source_excerpt", ""),
            target_module=args.get("target_module", "inbox"),
            agent_id=args.get("agent_id", ""),
            session_id=args.get("session_id", ""),
            message_id=args.get("message_id", ""),
            metadata=args.get("metadata") or {},
        )
        return json.dumps(
            {"status": "success", "item_id": item["id"], "title": item["title"]},
            ensure_ascii=False,
        )
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


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


async def execute_save_artifact(args: dict) -> str:
    try:
        metadata = args.get("metadata") if isinstance(args.get("metadata"), dict) else {}
        metadata = {**metadata, "source": args.get("source") or "agent_tool"}
        content = str(args.get("content") or "")
        storage_mode = str(args.get("storage_mode") or "inline")
        if _artifact_should_use_r2(content, storage_mode):
            data = content.encode("utf-8")
            storage_key = _artifact_storage_key(args.get("title") or "artifact")
            media_storage.r2_client.put_object(storage_key, data, mime_type="text/html; charset=utf-8")
            content = storage_key
            storage_mode = "r2"
            metadata.update({"size_bytes": len(data), "r2_mime_type": "text/html; charset=utf-8"})
        item = await db.create_artifact_item(
            title=args.get("title") or "",
            description=args.get("description") or "",
            type=args.get("type") or "page",
            content=content,
            storage_mode=storage_mode,
            cover_url=args.get("cover_url") or "",
            tags=args.get("tags") or [],
            agent_id=args.get("agent_id") or "",
            session_id=args.get("session_id") or "",
            is_pinned=bool(args.get("is_pinned")),
            is_surprise=bool(args.get("is_surprise")),
            metadata=metadata,
        )
        return json.dumps({"status": "success", "artifact_id": item["id"], "item": item}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


async def execute_list_artifacts(args: dict) -> str:
    try:
        items = await db.list_artifact_items(
            type=args.get("type"),
            agent_id=args.get("agent_id"),
            tag=args.get("tag"),
            pinned=args.get("pinned"),
            surprise=args.get("surprise"),
            limit=args.get("limit") or 20,
        )
        return json.dumps({"status": "success", "items": items, "count": len(items)}, ensure_ascii=False)
    except Exception as exc:
        return json.dumps({"status": "error", "message": str(exc)}, ensure_ascii=False)


TOOL_EXECUTORS: dict[str, Any] = {
    "get_current_time": execute_get_current_time,
    "add_memory": execute_add_memory,
    "list_memories": execute_list_memories,
    "search_memories": execute_search_memories,
    "delete_memory": execute_delete_memory,
    "update_memory": execute_update_memory,
    "get_memory_stats": execute_get_memory_stats,
    "list_diary_notebooks": execute_list_diary_notebooks,
    "create_diary_notebook": execute_create_diary_notebook,
    "update_diary_notebook": execute_update_diary_notebook,
    "create_diary_entry": execute_create_diary_entry,
    "update_diary_entry": execute_update_diary_entry,
    "delete_diary_entry": execute_delete_diary_entry,
    "comment_diary_entry": execute_comment_diary_entry,
    "underline_diary_entry": execute_underline_diary_entry,
    "create_extracted_item": execute_create_extracted_item,
    "save_artifact": execute_save_artifact,
    "list_artifacts": execute_list_artifacts,
}


def register_tool(schema: dict, executor: Callable):
    """Register one tool schema + executor."""
    TOOLS_SCHEMA.append(schema)
    name = schema["function"]["name"]
    TOOL_EXECUTORS[name] = executor
    logger.info("Tool registered: %s", name)


register_app_tools(register_tool, set(TOOL_EXECUTORS))


async def execute_tool_with_guard(name: str, args: dict) -> str:
    """
    Unified tool execution gateway:
    - timeout
    - retries
    - normalized error payload
    - execution logging
    """
    if name not in TOOL_EXECUTORS:
        return json.dumps({"status": "error", "type": "tool_not_found", "tool": name}, ensure_ascii=False)

    retries = max(0, settings.tool_retry_count)
    timeout_s = max(1.0, settings.tool_timeout_seconds)
    max_log_chars = max(60, settings.tool_log_max_result_chars)
    executor = TOOL_EXECUTORS[name]
    last_error = ""
    started = time.perf_counter()

    for attempt in range(retries + 1):
        try:
            result = await asyncio.wait_for(executor(args), timeout=timeout_s)
            elapsed_ms = int((time.perf_counter() - started) * 1000)
            preview = str(result)
            if len(preview) > max_log_chars:
                preview = preview[:max_log_chars] + "..."
            logger.info(
                "Tool call success: tool=%s attempt=%s elapsed_ms=%s result_preview=%s",
                name,
                attempt + 1,
                elapsed_ms,
                preview,
            )
            if isinstance(result, str):
                return result
            return json.dumps({"status": "success", "result": result}, ensure_ascii=False)
        except asyncio.TimeoutError:
            last_error = f"timeout after {timeout_s}s"
            logger.warning("Tool call timeout: tool=%s attempt=%s", name, attempt + 1)
        except Exception as exc:
            last_error = str(exc)
            logger.warning("Tool call failed: tool=%s attempt=%s error=%s", name, attempt + 1, last_error)

    elapsed_ms = int((time.perf_counter() - started) * 1000)
    return json.dumps(
        {
            "status": "error",
            "type": "tool_execution_failed",
            "tool": name,
            "message": last_error or "unknown_error",
            "elapsed_ms": elapsed_ms,
            "retries": retries,
        },
        ensure_ascii=False,
    )


def init_external_tools():
    """Register optional external tool modules."""
    try:
        from tools.weather import register as reg_weather

        reg_weather()
    except ImportError:
        logger.debug("weather tool not loaded")
    try:
        from tools.web_search import register as reg_search

        reg_search()
    except ImportError:
        logger.debug("web_search tool not loaded")
    try:
        from tools.fetch_url import register as reg_fetch

        reg_fetch()
    except ImportError:
        logger.debug("fetch_url tool not loaded")
    try:
        from tools.calendar import register as reg_cal

        reg_cal()
    except ImportError:
        logger.debug("calendar tool not loaded")
    try:
        from tools.notes import register as reg_notes

        reg_notes()
    except ImportError:
        logger.debug("notes tool not loaded")
    try:
        from tools.health import register as reg_health

        reg_health()
    except ImportError:
        logger.debug("health tool not loaded")

    logger.info("Tool bootstrap done. Total tools: %s", len(TOOL_EXECUTORS))
