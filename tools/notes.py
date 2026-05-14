"""Daily Notes 便签工具 — AI 可自主记录和查询便签"""
from __future__ import annotations

import json
import logging

import database as db

logger = logging.getLogger(__name__)


async def execute_add_note(args: dict) -> str:
    content = args.get("content", "")
    tags = args.get("tags", "")
    date = args.get("date")
    try:
        note = await db.add_note(content=content, tags=tags, date=date)
        return json.dumps({"status": "success", "note": note}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


async def execute_list_notes(args: dict) -> str:
    date = args.get("date")
    tags = args.get("tags")
    limit = args.get("limit", 20)
    try:
        notes = await db.list_notes(date=date, tags=tags, limit=limit)
        return json.dumps({"status": "success", "count": len(notes), "notes": notes}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


def register():
    from tools import register_tool

    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "add_note",
                "description": "记录一条便签（Daily Note）。用于记录关于用户的重要小事、灵感、或者意识循环中的探索笔记。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "content": {"type": "string", "description": "便签内容"},
                        "tags": {"type": "string", "description": "标签，逗号分隔"},
                        "date": {"type": "string", "description": "日期 (YYYY-MM-DD)，默认今天"},
                    },
                    "required": ["content"]
                }
            }
        },
        executor=execute_add_note,
    )

    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "list_notes",
                "description": "查询便签列表。可按日期或标签过滤。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "date": {"type": "string", "description": "日期 (YYYY-MM-DD)"},
                        "tags": {"type": "string", "description": "标签关键词"},
                        "limit": {"type": "integer"}
                    },
                    "required": []
                }
            }
        },
        executor=execute_list_notes,
    )

    logger.info("已注册工具: add_note, list_notes")
