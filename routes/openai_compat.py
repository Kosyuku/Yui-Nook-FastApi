"""OpenAI-compatible inbound chat routes for self-hosted 小智 services."""
from __future__ import annotations

import json
import time
import uuid
from typing import Any, Optional

from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel

from config import settings
import database as db
from routes import ChatRequest, chat

v1_api = APIRouter(prefix="/v1")


class OpenAIChatMessage(BaseModel):
    role: str
    content: Any = ""


class OpenAIChatCompletionRequest(BaseModel):
    model: str = ""
    messages: list[OpenAIChatMessage]
    temperature: Optional[float] = None
    stream: bool = False
    user: Optional[str] = None
    session_id: Optional[str] = None
    agent_id: Optional[str] = None


def _require_bearer(authorization: str | None) -> None:
    expected = (settings.openai_inbound_token or "").strip()
    if not expected:
        raise HTTPException(status_code=503, detail="OPENAI_INBOUND_TOKEN is not configured")
    prefix = "Bearer "
    if not authorization or not authorization.startswith(prefix) or authorization[len(prefix):] != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


def _content_to_text(content: Any) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, dict):
                if item.get("type") in (None, "text"):
                    text = item.get("text")
                    if isinstance(text, dict):
                        text = text.get("value") or text.get("text")
                    if text is not None:
                        parts.append(str(text))
                elif "text" in item:
                    parts.append(str(item.get("text") or ""))
            elif item is not None:
                parts.append(str(item))
        return "\n".join(part for part in parts if part).strip()
    if content is None:
        return ""
    return str(content)


def _latest_user_text(messages: list[OpenAIChatMessage]) -> str:
    for message in reversed(messages):
        if (message.role or "").lower() == "user":
            text = _content_to_text(message.content).strip()
            if text:
                return text
    raise HTTPException(status_code=400, detail="messages must include a non-empty user message")


async def _resolve_stackchan_session(body: OpenAIChatCompletionRequest) -> tuple[str, str]:
    agent_id = db.normalize_agent_id_value(body.agent_id or settings.stackchan_agent_id or settings.current_agent_id)
    external_id = (body.session_id or body.user or "stackchan").strip() or "stackchan"
    title = f"StackChan OpenAI inbound: {external_id}"
    session = await db.get_latest_session_for_agent_source(
        agent_id=agent_id,
        source_app="stackchan_openai",
        title=title,
    )
    if not session:
        session = await db.create_session(
            title=title,
            model=body.model or "openai-inbound",
            source_app="stackchan_openai",
            agent_id=agent_id,
        )
    return str(session["id"]), agent_id


async def _yui_chat_events(body: OpenAIChatCompletionRequest):
    session_id, agent_id = await _resolve_stackchan_session(body)
    response = await chat(
        ChatRequest(
            session_id=session_id,
            content=_latest_user_text(body.messages),
            agent_id=agent_id,
            temperature=body.temperature,
        )
    )
    async for item in response.body_iterator:
        yield item


def _openai_chunk(chat_id: str, model: str, delta: dict[str, Any], finish_reason: str | None = None) -> dict[str, Any]:
    return {
        "id": chat_id,
        "object": "chat.completion.chunk",
        "created": int(time.time()),
        "model": model,
        "choices": [
            {
                "index": 0,
                "delta": delta,
                "finish_reason": finish_reason,
            }
        ],
    }


@v1_api.post("/chat/completions")
async def openai_chat_completions(
    body: OpenAIChatCompletionRequest,
    authorization: Optional[str] = Header(default=None),
):
    _require_bearer(authorization)
    model = body.model or "yui"
    chat_id = f"chatcmpl-{uuid.uuid4().hex}"

    if body.stream:
        async def stream():
            yield f"data: {json.dumps(_openai_chunk(chat_id, model, {'role': 'assistant'}), ensure_ascii=False)}\n\n"
            async for event in _yui_chat_events(body):
                event_name = str(event.get("event") or "")
                raw_data = event.get("data")
                if event_name == "message":
                    try:
                        payload = json.loads(raw_data)
                    except Exception:
                        payload = {"content": str(raw_data or "")}
                    content = str(payload.get("content") or "")
                    if content:
                        yield f"data: {json.dumps(_openai_chunk(chat_id, model, {'content': content}), ensure_ascii=False)}\n\n"
                elif event_name == "error":
                    error_chunk = _openai_chunk(chat_id, model, {"content": str(raw_data or "")}, "stop")
                    yield f"data: {json.dumps(error_chunk, ensure_ascii=False)}\n\n"
                    yield "data: [DONE]\n\n"
                    return
            yield f"data: {json.dumps(_openai_chunk(chat_id, model, {}, 'stop'), ensure_ascii=False)}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(stream(), media_type="text/event-stream")

    content_parts: list[str] = []
    async for event in _yui_chat_events(body):
        event_name = str(event.get("event") or "")
        raw_data = event.get("data")
        if event_name == "message":
            try:
                payload = json.loads(raw_data)
            except Exception:
                payload = {"content": str(raw_data or "")}
            content_parts.append(str(payload.get("content") or ""))
        elif event_name == "error":
            raise HTTPException(status_code=502, detail=str(raw_data or "YUI chat failed"))

    return JSONResponse(
        {
            "id": chat_id,
            "object": "chat.completion",
            "created": int(time.time()),
            "model": model,
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": "".join(content_parts),
                    },
                    "finish_reason": "stop",
                }
            ],
        }
    )
