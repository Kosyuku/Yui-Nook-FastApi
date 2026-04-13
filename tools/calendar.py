"""日历/待办工具 — AI 可自主创建、查询和完成待办事项"""
from __future__ import annotations

import json
import logging

import database as db

logger = logging.getLogger(__name__)


async def execute_add_todo(args: dict) -> str:
    content = args.get("content", "")
    due_date = args.get("due_date", "")
    tags = args.get("tags", "")
    try:
        todo = await db.add_todo(content=content, due_date=due_date, tags=tags)
        return json.dumps({"status": "success", "todo": todo}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


async def execute_list_todos(args: dict) -> str:
    status = args.get("status")
    limit = args.get("limit", 20)
    try:
        todos = await db.list_todos(status=status, limit=limit)
        return json.dumps({"status": "success", "count": len(todos), "todos": todos}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


async def execute_complete_todo(args: dict) -> str:
    todo_id = args.get("todo_id", "")
    try:
        ok = await db.update_todo(todo_id, status="done")
        return json.dumps({"status": "success" if ok else "not_found"}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


def register():
    from tools import register_tool

    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "add_todo",
                "description": "创建一条待办事项。当用户提到需要做、要记得、别忘了之类的事情时使用。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "content": {"type": "string", "description": "待办内容"},
                        "due_date": {"type": "string", "description": "截止日期 (YYYY-MM-DD)，可选"},
                        "tags": {"type": "string", "description": "标签，逗号分隔"},
                    },
                    "required": ["content"]
                }
            }
        },
        executor=execute_add_todo,
    )

    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "list_todos",
                "description": "查询待办事项列表。可按状态过滤 (pending/done/cancelled)。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "status": {"type": "string", "enum": ["pending", "done", "cancelled"]},
                        "limit": {"type": "integer", "description": "最大返回数"}
                    },
                    "required": []
                }
            }
        },
        executor=execute_list_todos,
    )

    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "complete_todo",
                "description": "将一条待办标记为已完成。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "todo_id": {"type": "string", "description": "待办 ID"}
                    },
                    "required": ["todo_id"]
                }
            }
        },
        executor=execute_complete_todo,
    )

    logger.info("已注册工具: add_todo, list_todos, complete_todo")
