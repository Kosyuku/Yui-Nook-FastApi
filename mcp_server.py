import asyncio
import json
import logging
import sys
from typing import Any

from mcp.server.fastmcp import FastMCP

import database as db
from config import settings
from routes import chat, ChatRequest

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


@mcp.tool()
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


@mcp.tool()
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


@mcp.tool()
async def get_session(session_id: str) -> str:
    """
    Get details of a specific session.
    """
    session = await db.get_session(session_id)
    if not session:
        return json.dumps({"error": "Session not found"})
    return json.dumps(session, ensure_ascii=False)


@mcp.tool()
async def get_messages(session_id: str, limit: int = 50) -> str:
    """
    Get the history of messages for a given session.
    """
    # get_recent_messages limits fetching exactly as we want
    messages = await db.get_recent_messages(session_id, limit=limit)
    return json.dumps(messages, ensure_ascii=False)


@mcp.tool()
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


@mcp.tool()
async def create_diary_notebook(
    agent_id: str,
    name: str = "",
    description: str = "",
    visibility: str = "private",
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
            visibility=visibility or "private",
            is_default=is_default,
        )
        if not notebook or not notebook.get("id"):
            return json.dumps({"success": False, "error": "create_diary_notebook did not return a persisted notebook"}, ensure_ascii=False)
        return json.dumps({"success": True, "notebook": notebook}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


@mcp.tool()
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


@mcp.tool()
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


@mcp.tool()
async def create_diary_entry(agent_id: str, content: str, title: str = None, tags: list[str] = None, notebook_id: str = None) -> str:
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
            )
        diary_id = str((diary or {}).get("id") or "").strip()
        if not diary_id:
            return json.dumps({"success": False, "error": "create_diary_entry did not return a persisted entry"}, ensure_ascii=False)
        return json.dumps({"success": True, "diary_id": diary_id}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


@mcp.tool()
async def update_diary_entry(
    entry_id: str,
    agent_id: str,
    content: str | None = None,
    title: str | None = None,
    tags: list[str] | None = None,
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
        )
        if not entry:
            return json.dumps({"success": False, "error": "entry not found for agent"}, ensure_ascii=False)
        return json.dumps({"success": True, "entry": entry}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


@mcp.tool()
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


@mcp.tool()
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


@mcp.tool()
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


@mcp.tool()
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


@mcp.tool()
async def save_memory(
    content: str,
    agent_id: str,
    source: str = "claude_mcp",
    category: str = "core_profile",
    visibility: str = "private",
    source_agent_id: str | None = None,
) -> str:
    """
    Save an explicit observation or memory about the user.
    """
    try:
        backend_error = _backend_failure("memory")
        if backend_error:
            return backend_error
        # Standard function
        mem = await db.add_memory(
            content=content,
            agent_id=agent_id,
            category=category or "core_profile",
            visibility=visibility or "private",
            source=source or "claude_mcp",
            source_agent_id=source_agent_id or agent_id,
            raw_content=content,
        )
        memory_id = str(mem.get("id") or "").strip()
        if not memory_id:
            return json.dumps({"success": False, "error": "Save memory returned no memory id."}, ensure_ascii=False)
        return json.dumps({"success": True, "memory_id": memory_id}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)


@mcp.tool()
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

if __name__ == "__main__":
    # Start the fastMCP stdio server
    mcp.run()
