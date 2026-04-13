import asyncio
import json
import logging
import sys
from typing import Any

from mcp.server.fastmcp import FastMCP

import database as db
from config import settings
from routes.__init__ import chat, ChatRequest

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastMCP server
mcp = FastMCP("yui_nook_backend")

@mcp.tool()
async def create_session(agent_id: str, title: str = "new session", source_app: str = "claude_mcp") -> str:
    """
    Create a new chat session for an agent.
    Returns the session ID which can be used to send messages.
    """
    session = await db.create_session(title=title, source_app=source_app)
    # The default database schema currently might lack agent_id at creation,
    # but we can call bind immediately.
    session_id = session.get("id")
    if session_id and agent_id:
        try:
            await db.bind_session_agent(session_id, agent_id)
        except Exception as e:
            logger.warning("Agent bind failed during session creation: %s", e)
    return session_id


@mcp.tool()
async def list_sessions(agent_id: str = None, limit: int = 50) -> str:
    """
    List recent sessions.
    Provide an optional agent_id to filter down to sessions matching this agent.
    """
    sessions = await db.list_sessions(limit=limit * 2 if agent_id else limit)
    
    # Client-side filtering because standard DB method might not support agent_id directly yet
    if agent_id:
        filtered = [s for s in sessions if s.get("agent_id") == agent_id]
        sessions = filtered[:limit]
        
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
        return json.dumps({"error": str(e)})

    merged = "".join(full_text).replace("\\n", "\n")
    return merged


@mcp.tool()
async def create_diary_entry(agent_id: str, content: str, title: str = None, tags: list[str] = None) -> str:
    """
    Create a new diary entry.
    """
    try:
        import datetime
        now = datetime.datetime.now().astimezone().isoformat()
        diary_id = await db.create_diary(
            content=content,
            mood="日常",
            author_type="user", 
            topic_id="",
            author_id="user",
            source_agent_id=agent_id,
            agent_id=agent_id
        )
        return json.dumps({"success": True, "diary_id": diary_id}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"error": str(e)})


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
async def save_memory(content: str, agent_id: str, source: str = "claude_mcp") -> str:
    """
    Save an explicit observation or memory about the user.
    """
    try:
        # Standard function
        mem_id = await db.add_memory(
            content=content,
            agent_id=agent_id,
            category="core_profile"  # Default generic
        )
        # We can also add specifically to the memory_log if needed 
        # but add_memory does all the job.
        return json.dumps({"success": True, "memory_id": mem_id}, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"error": str(e)})


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
