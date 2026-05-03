"""聊天 API 路由"""
from __future__ import annotations

import json as jsonlib
import logging
import re
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

import ai_runtime
import database as db
from models import router as model_router
from models import OpenAICompatAdapter, EchoAdapter, ADAPTER_MAP
from config import ProviderConfig, settings
from tools import execute_tool_with_guard, TOOL_EXECUTORS
from prompt_builder import build_system_prompt

logger = logging.getLogger(__name__)
api = APIRouter(prefix="/api")


def _normalize_memory_text(text: str) -> str:
    return re.sub(r"\s+", "", text.strip().lower())


def _reasoning_as_visible_fallback(reasoning_parts: list[str]) -> str:
    """Some providers put final content into reasoning; keep replies visible if content is empty."""
    text = "".join(str(part or "") for part in reasoning_parts).strip()
    if not text:
        return ""
    return re.sub(r"\s+", " ", text).strip()


def _looks_like_memory_candidate(text: str) -> bool:
    stripped = (text or "").strip()
    if not stripped:
        return False
    lowered = stripped.lower()
    if len(stripped) < max(1, settings.memory_auto_extract_min_chars):
        return False
    if lowered in {"hi", "hello", "hey", "ok", "okay", "thanks", "lol"}:
        return False
    if stripped.endswith(("?", "\uFF1F")) and len(stripped) < 80:
        return False
    if re.fullmatch(r"[\W_]+", stripped):
        return False
    return True


def _infer_memory_tier(text: str) -> Optional[str]:
    lowered = (text or "").lower()
    core_markers = [
        "i am", "i'm", "my name is", "i like", "i love", "i prefer", "i work", "my job",
        "我叫", "我是", "我来自", "我喜欢", "我不喜欢", "我讨厌",
        "我习惯", "我更喜欢", "我通常", "我的职业", "我的工作",
    ]
    recent_markers = [
        "today", "tomorrow", "this week", "next week", "plan", "planning", "deadline", "ddl",
        "今天", "明天", "这周", "本周", "最近", "正在", "打算",
        "计划", "准备", "下周", "截止", "要做", "要去", "待会", "稍后",
    ]
    deep_markers = [
        "always", "for years", "important", "goal", "dream", "family", "childhood", "experience",
        "一直", "多年", "难忘", "重要", "目标", "梦想",
        "害怕", "焦虑", "家庭", "童年", "经历", "价值观",
    ]
    ephemeral_markers = [
        "right now", "on the way", "battery", "network", "signal", "temporarily",
        "现在在", "刚刚", "刚才", "路上", "马上", "临时",
        "一会儿", "没电", "网络不好", "信号差", "排队", "开会前",
    ]
    if any(marker in lowered for marker in core_markers):
        return "core_profile"
    if any(marker in lowered for marker in recent_markers):
        return "recent_pending"
    if any(marker in lowered for marker in deep_markers):
        return "deep"
    if any(marker in lowered for marker in ephemeral_markers):
        return "ephemeral"
    return None


def _score_memory_importance(tier: str, text: str) -> int:
    lowered = (text or "").lower()
    if tier == "core_profile":
        if any(marker in lowered for marker in ["my name is", "i am", "i'm", "我叫", "我是", "我的职业", "我来自"]):
            return 5
        return 4
    if tier == "recent_pending":
        if any(marker in lowered for marker in ["deadline", "ddl", "tomorrow", "this week", "明天", "本周", "要做", "截止"]):
            return 4
        return 3
    if tier == "deep":
        if any(marker in lowered for marker in ["family", "childhood", "goal", "dream", "important", "experience", "家庭", "童年", "目标", "梦想", "重要", "经历"]):
            return 5
        return 4
    return 1 if len((text or "").strip()) < 40 else 2


def _ephemeral_expires_at() -> str:
    return (datetime.now(timezone.utc) + timedelta(days=3)).isoformat()


def _classify_memory_from_text(text: str) -> Optional[dict[str, str | int]]:
    if not _looks_like_memory_candidate(text):
        return None
    tier = _infer_memory_tier(text)
    if not tier:
        return None
    result: dict[str, str | int] = {
        "category": tier,
        "importance": _score_memory_importance(tier, text),
    }
    if tier == "ephemeral":
        result["expires_at"] = _ephemeral_expires_at()
    return result


async def _load_saved_chat_provider() -> dict[str, str] | None:
    resolved = await ai_runtime.resolve_model_slot("chat")
    if not resolved:
        return None
    return {
        "provider": str(resolved.get("provider") or resolved.get("provider_id") or "saved"),
        "model": str(resolved.get("model") or ""),
        "base_url": str(resolved.get("base_url") or ""),
        "api_path": str(resolved.get("api_path") or ""),
        "api_key": str(resolved.get("api_key") or ""),
    }


async def _auto_capture_memory_from_user_text(user_text: str, agent_id: str | None = None):
    if not settings.memory_auto_extract_enabled:
        return
    text = (user_text or "").strip()
    if not text:
        return
    if len(text) < max(1, settings.memory_auto_extract_min_chars):
        return
    if len(text) > max(settings.memory_auto_extract_min_chars + 1, settings.memory_auto_extract_max_chars):
        return

    memory_meta = _classify_memory_from_text(text)
    if not memory_meta:
        return
    category = str(memory_meta["category"])

    # 去重：用前缀关键词检索，再做归一化精确比对
    probe = text[:12]
    try:
        candidates = await db.search_memories(
            keyword=probe,
            category=category,
            limit=10,
            agent_id=agent_id,
            touch=False,
        )
    except Exception:
        candidates = []
    normalized = _normalize_memory_text(text)
    for m in candidates:
        if _normalize_memory_text(db.memory_raw_content(m)) == normalized:
            return

    await db.add_memory(
        content=text,
        raw_content=text,
        category=category,
        tags="auto",
        source="auto_rule",
        agent_id=agent_id,
        visibility="private",
        source_agent_id=agent_id,
        importance=int(memory_meta["importance"]),
        expires_at=str(memory_meta.get("expires_at") or ""),
    )
    logger.info("Auto memory captured: category=%s content=%s", category, text[:80])


class MemoryCreate(BaseModel):
    content: str
    category: str
    tags: str = ""
    source: str = ""
    agent_id: Optional[str] = None
    visibility: str = "private"
    source_agent_id: Optional[str] = None
    raw_content: Optional[str] = None
    compressed_content: Optional[str] = None
    importance: Optional[int] = None
    expires_at: Optional[str] = None


class MemoryUpdate(BaseModel):
    content: Optional[str] = None
    raw_content: Optional[str] = None
    compressed_content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    source: Optional[str] = None
    agent_id: Optional[str] = None
    visibility: Optional[str] = None
    source_agent_id: Optional[str] = None
    importance: Optional[int] = None
    expires_at: Optional[str] = None


class ChatRequest(BaseModel):
    session_id: str
    content: str
    agent_id: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    persona: Optional[str] = None
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    api_path: Optional[str] = None


class RPChatRequest(BaseModel):
    room_id: str
    content: str
    agent_id: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    persona: Optional[str] = None
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    api_path: Optional[str] = None


class SessionCreate(BaseModel):
    title: str = "新对话"
    model: str = "echo"
    source_app: Optional[str] = "yui_nook"
    agent_id: Optional[str] = None
    source: Optional[str] = None
    external_id: Optional[str] = None
    external_name: Optional[str] = None
    oauth_client_id: Optional[str] = None


class SessionUpdate(BaseModel):
    title: Optional[str] = None
    model: Optional[str] = None


# ==================== 模型相关 ====================

@api.get("/models")
async def list_models():
    """获取所有已注册的模型 Provider"""
    return {"providers": model_router.list_providers()}


# ==================== 会话相关 ====================

@api.get("/sessions")
async def list_sessions():
    sessions = await db.list_sessions()
    return {"sessions": sessions}


@api.post("/sessions")
async def create_session(body: SessionCreate):
    try:
        session = await db.create_session(
            title=body.title,
            model=body.model,
            source_app=body.source_app,
            agent_id=body.agent_id,
            source=body.source,
            external_id=body.external_id,
            external_name=body.external_name,
            oauth_client_id=body.oauth_client_id,
        )
    except db.AgentNeedsBinding as exc:
        raise HTTPException(status_code=409, detail=exc.payload())
    except db.AgentResolutionError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {"session": session}


@api.get("/sessions/{session_id}")
async def get_session(session_id: str):
    session = await db.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")
    messages = await db.get_messages(session_id)
    return {"session": session, "messages": messages}


@api.get("/sessions/{session_id}/cot-logs")
async def get_session_cot_logs(session_id: str, limit: int = 40, before: Optional[str] = None):
    session = await db.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")
    logs = await db.list_cot_logs(session_id, limit=limit, before=before)
    return {"logs": logs}


@api.patch("/sessions/{session_id}")
async def update_session(session_id: str, body: SessionUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    ok = await db.update_session(session_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="会话不存在")
    return {"ok": True}


@api.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    ok = await db.delete_session(session_id)
    if not ok:
        raise HTTPException(status_code=404, detail="会话不存在")
    return {"ok": True}


# ==================== 记忆相关 (Memories) ====================

@api.get("/memories")
async def list_memories(
    category: Optional[str] = None,
    limit: int = 50,
    sort_by: str = "updated_at",
    order: str = "desc",
    agent_id: Optional[str] = None,
):
    memories = await db.list_memories(
        category=category,
        limit=limit,
        sort_by=sort_by,
        order=order,
        agent_id=agent_id,
    )
    return {"memories": memories}


@api.get("/memories/search")
async def search_memories(
    q: str,
    category: Optional[str] = None,
    limit: int = 10,
    mode: str = "auto",
    agent_id: Optional[str] = None,
):
    query = (q or "").strip()
    if not query:
        raise HTTPException(status_code=400, detail="query is required")

    search_mode = (mode or "auto").strip().lower()
    if search_mode == "keyword":
        memories = await db.search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id)
    elif search_mode == "semantic":
        memories = await db.semantic_search_memories(query_text=query, category=category, limit=limit, agent_id=agent_id)
    else:
        memories = await db.semantic_search_memories(query_text=query, category=category, limit=limit, agent_id=agent_id)
        if not memories:
            memories = await db.search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id)
    return {"memories": memories, "mode": search_mode}


@api.post("/memories")
async def create_memory(body: MemoryCreate):
    try:
        memory = await db.add_memory(
            content=body.content,
            category=body.category,
            tags=body.tags,
            source=body.source,
            agent_id=body.agent_id,
            visibility=body.visibility,
            source_agent_id=body.source_agent_id,
            raw_content=body.raw_content,
            compressed_content=body.compressed_content,
            importance=body.importance,
            expires_at=body.expires_at,
        )
    except db.AgentNeedsBinding as exc:
        raise HTTPException(status_code=409, detail=exc.payload())
    except db.AgentResolutionError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    related_memories = memory.pop("related_memories", []) if isinstance(memory, dict) else []
    return {"memory": memory, "related_memories": related_memories}


@api.patch("/memories/{memory_id}")
async def update_memory(memory_id: str, body: MemoryUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    ok = await db.update_memory(memory_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="记忆不存在")
    return {"ok": True}


@api.delete("/memories/{memory_id}")
async def delete_memory(memory_id: str):
    ok = await db.delete_memory(memory_id)
    if not ok:
        raise HTTPException(status_code=404, detail="记忆不存在")
    return {"ok": True}


# ==================== 聊天核心 ====================

async def _resolve_adapter(body: ChatRequest):
    """
    ???????????????
    ????
    1. ????? api_key + base_url
    2. Supabase ???????????
    3. ?????????? chat adapter
    """
    allow_override = bool(settings.allow_client_provider_override)
    has_override = allow_override and bool(body.api_key and body.base_url)

    if has_override:
        config = ProviderConfig(
            name="custom_override",
            base_url=body.base_url,
            api_path=body.api_path or "",
            api_key=body.api_key,
            model=body.model or "",
        )
        return OpenAICompatAdapter(config), {
            "provider": "custom",
            "model": body.model or "unknown"
        }, {}

    if body.model and body.model == "echo":
        config = ProviderConfig(name="echo")
        return EchoAdapter(config), {"provider": "echo", "model": "echo"}, {}

    saved_provider = await _load_saved_chat_provider()
    if allow_override and saved_provider:
        config = ProviderConfig(
            name="saved_settings",
            base_url=saved_provider.get("base_url", ""),
            api_path=saved_provider.get("api_path", ""),
            api_key=saved_provider.get("api_key", ""),
            model=saved_provider.get("model", ""),
        )
        override_kwargs = {}
        if body.model:
            override_kwargs["model"] = body.model
        if body.api_path:
            override_kwargs["api_path"] = body.api_path
        return OpenAICompatAdapter(config), {
            "provider": saved_provider.get("provider", "saved"),
            "model": body.model or saved_provider.get("model", ""),
        }, override_kwargs

    adapter = model_router.get("chat")
    override_kwargs = {}
    if body.model:
        override_kwargs["model"] = body.model
    if allow_override and body.api_key:
        override_kwargs["api_key"] = body.api_key
    if allow_override and body.base_url:
        override_kwargs["base_url"] = body.base_url
    if allow_override and body.api_path:
        override_kwargs["api_path"] = body.api_path

    model_info = adapter.get_model_info()
    if body.model:
        model_info["model"] = body.model

    return adapter, model_info, override_kwargs



@api.post("/chat")
async def chat(body: ChatRequest):
    """
    核心聊天接口 —— SSE 流式返回

    流程:
    1. 保存用户消息到数据库
    2. 获取最近上下文
    3. 根据请求动态选择模型适配器
    4. 流式返回 + 保存完整回复
    """
    # 检查会话
    session = await db.get_session(body.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")

    if body.agent_id:
        try:
            await db.bind_session_agent(body.session_id, body.agent_id)
            session = await db.get_session(body.session_id)
        except Exception as exc:
            logger.warning("Failed to bind session agent: session=%s agent=%s err=%s", body.session_id, body.agent_id, exc)
    resolved_agent_id = str(session.get("agent_id") or "")

    # 1. 保存用户消息
    await db.add_message(body.session_id, "user", body.content, agent_id=resolved_agent_id)
    try:
        await _auto_capture_memory_from_user_text(body.content, resolved_agent_id)
    except Exception as e:
        logger.warning(f"自动记忆提取失败: {e}")

    # 1.1 长会话摘要触发（增量摘要）
    try:
        await db.ensure_context_summary(
            session_id=body.session_id,
            trigger_messages=max(8, settings.summary_trigger_messages),
            keep_recent_messages=max(4, settings.summary_keep_recent_messages),
            min_batch_messages=max(2, settings.summary_min_batch_messages),
            agent_id=resolved_agent_id,
        )
    except Exception as e:
        logger.warning(f"上下文摘要触发失败: {e}")

    # 2. 获取最近上下文
    recent = await db.get_recent_messages(
        body.session_id,
        limit=max(1, settings.chat_recent_messages_limit),
    )

    # 3. 解析适配器
    resolved = await _resolve_adapter(body)
    if len(resolved) == 3:
        adapter, model_info, override_kwargs = resolved
    else:
        adapter, model_info = resolved
        override_kwargs = {}

    logger.info(f"Chat request → adapter={model_info}, overrides={list(override_kwargs.keys())}")

    # 4. SSE 流式返回
    async def event_generator():
        # 构建系统提示词
        system_prompt = await build_system_prompt(
            session_id=body.session_id,
            override_persona=(body.persona or "").strip() or None,
            agent_id=resolved_agent_id,
        )
        
        # 将系统消息插在最前面
        current_messages = [{"role": "system", "content": system_prompt}] + recent.copy()
        reasoning_buffer: list[str] = []

        while True:
            full_response = []
            tool_calls_buffer = {}

            try:
                async for chunk in adapter.chat_stream(
                    current_messages,
                    temperature=body.temperature if body.temperature is not None else 0.7,
                    **override_kwargs,
                ):
                    if isinstance(chunk, dict) and chunk.get("type") == "tool_call":
                        for tc in chunk["tool_calls"]:
                            idx = tc["index"]
                            if idx not in tool_calls_buffer:
                                tool_calls_buffer[idx] = {
                                    "id": tc.get("id"),
                                    "type": "function",
                                    "function": {"name": tc.get("function", {}).get("name", ""), "arguments": ""}
                                }
                            if "function" in tc and "arguments" in tc["function"]:
                                tool_calls_buffer[idx]["function"]["arguments"] += tc["function"]["arguments"]
                    elif isinstance(chunk, dict) and chunk.get("type") == "reasoning":
                        thinking_text = str(chunk.get("thinking") or "").strip()
                        if thinking_text:
                            reasoning_buffer.append(thinking_text)
                            import json as _json
                            yield {
                                "event": "thinking",
                                "data": _json.dumps({"thinking": thinking_text}, ensure_ascii=False),
                            }
                    elif isinstance(chunk, str):
                        full_response.append(chunk)
                        yield {"event": "message", "data": chunk}

            except Exception as e:
                logger.exception("Chat stream error")
                await db.add_cot_log(
                    body.session_id,
                    agent_id=resolved_agent_id,
                    log_type="error",
                    title="聊天流错误",
                    summary=str(e),
                    content=str(e),
                    status="error",
                )
                yield {"event": "error", "data": str(e)}
                return

            complete_text = "".join(full_response)
            reasoning_used_as_text = False
            if not complete_text.strip() and reasoning_buffer:
                complete_text = _reasoning_as_visible_fallback(reasoning_buffer)
                if complete_text:
                    reasoning_used_as_text = True
                    logger.info("Chat stream used reasoning as visible fallback for provider=%s", model_info)
                    yield {"event": "message", "data": complete_text}

            if not tool_calls_buffer and b"<execute>" in complete_text.encode('utf-8'):
                import re as regex
                # Find all <execute>func(args)</execute> patterns
                matches = regex.finditer(r'<execute>\s*([a-zA-Z0-9_]+)\((.*?)\)\s*</execute>', complete_text, regex.DOTALL)
                for idx, m in enumerate(matches):
                    func_name = m.group(1)
                    raw_args = m.group(2)
                    # Convert pseudo args like key="val" or just plain JSON to JSON dict if possible
                    # Sometimes the model writes get_current_time() so raw_args is empty.
                    args_json = raw_args
                    if not args_json.strip():
                        args_json = "{}"
                    
                    # Store it into tool_calls_buffer to re-use the existing logic below
                    tool_calls_buffer[idx] = {
                        "id": f"call_exec_{idx}",
                        "type": "function",
                        "function": {"name": func_name, "arguments": args_json}
                    }
                if tool_calls_buffer:
                    # Remove the execute tags from the visible text so it doesn't stay in the chat
                    complete_text = regex.sub(r'<execute>.*?</execute>', '', complete_text, flags=regex.DOTALL).strip()


            if tool_calls_buffer:
                assistant_msg = {"role": "assistant", "content": complete_text, "tool_calls": list(tool_calls_buffer.values())}
                current_messages.append(assistant_msg)

                import json as jsonlib
                for tc in tool_calls_buffer.values():
                    func_name = tc["function"]["name"]
                    raw_args = tc["function"]["arguments"]
                    call_id = tc["id"]

                    try:
                        args = jsonlib.loads(raw_args) if raw_args else {}
                        if func_name in TOOL_EXECUTORS:
                            yield {
                                "event": "tool_call",
                                "data": jsonlib.dumps({"name": func_name, "status": "running"}, ensure_ascii=False),
                            }
                            result = await execute_tool_with_guard(func_name, args)
                            yield {
                                "event": "tool_call",
                                "data": jsonlib.dumps({"name": func_name, "status": "done"}, ensure_ascii=False),
                            }
                        else:
                            result = jsonlib.dumps({"error": f"Tool {func_name} not found"})
                    except Exception as ex:
                        result = jsonlib.dumps({"error": str(ex)})

                    # 控制工具返回长度，避免工具输出污染上下文并拉高 token 成本
                    if isinstance(result, str):
                        max_chars = max(80, settings.tool_result_max_chars)
                        if len(result) > max_chars:
                            result = result[:max_chars].rstrip() + "...(truncated)"

                    await db.add_cot_log(
                        body.session_id,
                        agent_id=resolved_agent_id,
                        log_type="tool_call",
                        title=f"工具调用：{func_name}",
                        summary=result if isinstance(result, str) else jsonlib.dumps(result, ensure_ascii=False),
                        content=jsonlib.dumps({"arguments": raw_args, "result": result}, ensure_ascii=False),
                        tool_name=func_name,
                        status="done" if func_name in TOOL_EXECUTORS else "missing",
                    )

                    current_messages.append({
                        "role": "tool",
                        "tool_call_id": call_id,
                        "content": result
                    })

                continue

            if complete_text:
                await db.add_message(
                    body.session_id,
                    "assistant",
                    complete_text,
                    model=f"{model_info.get('provider', '?')}/{model_info.get('model', '?')}",
                    agent_id=resolved_agent_id,
                )
                # 回复落库后再尝试一次摘要，避免对话越聊越长
                try:
                    await db.ensure_context_summary(
                        session_id=body.session_id,
                        trigger_messages=max(8, settings.summary_trigger_messages),
                        keep_recent_messages=max(4, settings.summary_keep_recent_messages),
                        min_batch_messages=max(2, settings.summary_min_batch_messages),
                        agent_id=resolved_agent_id,
                    )
                except Exception as e:
                    logger.warning(f"上下文摘要触发失败(assistant): {e}")

            if complete_text:
                if reasoning_buffer and not reasoning_used_as_text:
                    await db.add_cot_log(
                        body.session_id,
                        agent_id=resolved_agent_id,
                        log_type="reasoning",
                        title="模型思考摘要",
                        summary=" ".join(reasoning_buffer),
                        content="\n".join(reasoning_buffer),
                        status="done",
                    )
                await db.add_cot_log(
                    body.session_id,
                    agent_id=resolved_agent_id,
                    log_type="assistant",
                    title="回复摘要",
                    summary=complete_text,
                    content=complete_text,
                    status="done",
                )

            yield {"event": "done", "data": "[DONE]"}
            break

    return EventSourceResponse(event_generator())


@api.post("/rp/chat")
async def rp_chat(body: RPChatRequest):
    room = await db.get_rp_room(body.room_id)
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")

    try:
        agent_id = await db.resolve_agent_id(agent_id=body.agent_id, room_id=body.room_id, purpose="rp_chat")
    except db.AgentResolutionError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    await db.add_rp_message(body.room_id, "user", body.content)

    recent = await db.get_recent_rp_messages(
        body.room_id,
        limit=max(1, settings.chat_recent_messages_limit),
    )

    chat_like_body = ChatRequest(
        session_id="rp",
        content=body.content,
        agent_id=agent_id,
        model=body.model,
        temperature=body.temperature,
        persona=body.persona,
        api_key=body.api_key,
        base_url=body.base_url,
        api_path=body.api_path,
    )
    resolved = await _resolve_adapter(chat_like_body)
    if len(resolved) == 3:
        adapter, model_info, override_kwargs = resolved
    else:
        adapter, model_info = resolved
        override_kwargs = {}
    override_kwargs["tools"] = []
    override_kwargs["tool_choice"] = "none"

    async def event_generator():
        base_prompt = await build_system_prompt(
            session_id=None,
            override_persona=(body.persona or "").strip() or None,
            agent_id=agent_id,
        )
        rp_prompt = (
            "## RP房间设定\n"
            f"- 世界设定：{room.get('world_setting', '')}\n"
            f"- 用户角色：{room.get('user_role', '')}\n"
            f"- 你的角色：{room.get('ai_role', '')}\n\n"
            "## RP规则\n"
            "- 你正在这个房间设定中与用户进行角色扮演。\n"
            "- 回复时保持设定一致，不要跳出角色和世界观。\n"
            "- 不要调用工具，不要转成普通助手口吻。\n"
        )
        current_messages = [{"role": "system", "content": f"{base_prompt}\n\n{rp_prompt}"}] + recent.copy()
        full_response: list[str] = []
        try:
            async for chunk in adapter.chat_stream(
                current_messages,
                temperature=body.temperature if body.temperature is not None else 0.7,
                **override_kwargs,
            ):
                if isinstance(chunk, dict) and chunk.get("type") == "reasoning":
                    thinking_text = str(chunk.get("thinking") or "").strip()
                    if thinking_text:
                        yield {
                            "event": "thinking",
                            "data": jsonlib.dumps({"thinking": thinking_text}, ensure_ascii=False),
                        }
                elif isinstance(chunk, str):
                    full_response.append(chunk)
                    yield {"event": "message", "data": chunk}
        except Exception as e:
            logger.exception("RP chat stream error")
            yield {"event": "error", "data": str(e)}
            return

        
