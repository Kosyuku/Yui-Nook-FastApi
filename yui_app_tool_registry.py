"""Shared YUI app tool registry for model function-calling clients.

The MCP bridge owns the concrete app operations. This module exposes the same
operations as OpenAI-compatible function tools with underscore names, because
function names cannot reliably use dotted MCP names.
"""
from __future__ import annotations

import inspect
import logging
from types import UnionType
from typing import Any, Callable, get_args, get_origin

logger = logging.getLogger(__name__)

APP_TOOL_ALIASES = [
    "diary_list_books",
    "diary_search_entries",
    "diary_get_entry",
    "diary_create_entry",
    "diary_update_entry",
    "diary_delete_entry",
    "diary_comment_entry",
    "diary_underline_entry",
    "grimoire_list_tomes",
    "grimoire_get_tome",
    "grimoire_create_tome",
    "grimoire_update_tome",
    "grimoire_list_entries",
    "grimoire_get_entry",
    "grimoire_create_entry",
    "grimoire_update_entry",
    "grimoire_delete_entry",
    "grimoire_search_entries",
    "curio_list_items",
    "curio_get_item",
    "curio_save_item",
    "curio_update_item",
    "curio_delete_item",
    "glean_list_items",
    "glean_create_item",
    "glean_update_item",
    "glean_delete_item",
    "inbox_list_items",
    "inbox_create_item",
    "folio_list_items",
    "folio_create_item",
    "list_folio_books",
    "read_folio_book",
    "list_folio_highlights",
    "create_folio_highlight",
    "add_folio_thought",
    "reply_folio_thought",
    "read_folio_shared_context",
    "update_folio_reading_position",
    "perle_list_items",
    "perle_create_item",
    "drift_list_items",
    "drift_create_item",
    "media_list_items",
    "media_create_item",
    "media_update_item",
    "media_delete_item",
    "voice_speak",
    "send_voice",
    "moments_list_posts",
    "moments_get_post",
    "moments_create_post",
    "moments_update_post",
    "moments_delete_post",
    "moments_like_post",
    "moments_comment_post",
    "parlor_list_rounds",
    "parlor_create_round",
    "parlor_get_round",
    "parlor_update_round",
    "parlor_delete_round",
    "parlor_add_seat",
    "parlor_speak",
    "parlor_list_turns",
]


def _json_type_for_annotation(annotation: Any) -> dict[str, Any]:
    if annotation is inspect.Signature.empty:
        return {"type": "string"}
    origin = get_origin(annotation)
    args = get_args(annotation)
    if origin in {list, tuple}:
        item_annotation = args[0] if args else Any
        return {"type": "array", "items": _json_type_for_annotation(item_annotation)}
    if origin is dict:
        return {"type": "object"}
    if origin in {UnionType, getattr(__import__("typing"), "Union", object)}:
        non_none = [arg for arg in args if arg is not type(None)]
        return _json_type_for_annotation(non_none[0]) if non_none else {"type": "string"}
    if annotation in {str, "str"}:
        return {"type": "string"}
    if annotation in {int, "int"}:
        return {"type": "integer"}
    if annotation in {float, "float"}:
        return {"type": "number"}
    if annotation in {bool, "bool"}:
        return {"type": "boolean"}
    return {"type": "object"} if annotation in {dict, Any} else {"type": "string"}


def schema_from_callable(name: str, func: Callable) -> dict[str, Any]:
    signature = inspect.signature(func)
    properties: dict[str, Any] = {}
    required: list[str] = []
    for param_name, param in signature.parameters.items():
        if param.kind in {inspect.Parameter.VAR_POSITIONAL, inspect.Parameter.VAR_KEYWORD}:
            continue
        properties[param_name] = _json_type_for_annotation(param.annotation)
        if param.default is inspect.Signature.empty:
            required.append(param_name)
    return {
        "type": "function",
        "function": {
            "name": name,
            "description": (inspect.getdoc(func) or f"YUI app tool: {name}")[:300],
            "parameters": {
                "type": "object",
                "properties": properties,
                "required": required,
            },
        },
    }


async def invoke_app_tool(alias: str, args: dict | None = None) -> str:
    import yui_tool_bridge

    func = getattr(yui_tool_bridge, alias)
    return await func(**(args or {}))


def bridge_executor(alias: str) -> Callable:
    async def _execute(args: dict) -> str:
        return await invoke_app_tool(alias, args)

    return _execute


def register_app_tools(register_tool: Callable[[dict, Callable], None], existing_names: set[str] | None = None) -> None:
    try:
        import yui_tool_bridge
    except Exception as exc:
        logger.warning("YUI app tools not loaded: %s", exc)
        return

    existing = set(existing_names or set())
    for alias in APP_TOOL_ALIASES:
        if alias in existing:
            continue
        func = getattr(yui_tool_bridge, alias, None)
        if not callable(func):
            logger.warning("YUI app bridge function missing: %s", alias)
            continue
        register_tool(schema_from_callable(alias, func), bridge_executor(alias))
        existing.add(alias)
