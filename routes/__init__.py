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
        "\u6211\u53EB", "\u6211\u662F", "\u6211\u6765\u81EA", "\u6211\u559C\u6B22", "\u6211\u4E0D\u559C\u6B22", "\u6211\u8BA8\u538C",
        "\u6211\u4E60\u60EF", "\u6211\u66F4\u559C\u6B22", "\u6211\u901A\u5E38", "\u6211\u7684\u804C\u4E1A", "\u6211\u7684\u5DE5\u4F5C",
    ]
    recent_markers = [
        "today", "tomorrow", "this week", "next week", "plan", "planning", "deadline", "ddl",
        "\u4ECA\u5929", "\u660E\u5929", "\u8FD9\u5468", "\u672C\u5468", "\u6700\u8FD1", "\u6B63\u5728", "\u6253\u7B97",
        "\u8BA1\u5212", "\u51C6\u5907", "\u4E0B\u5468", "\u622A\u6B62", "\u8981\u505A", "\u8981\u53BB", "\u5F85\u4F1A", "\u7A0D\u540E",
    ]
    deep_markers = [
        "always", "for years", "important", "goal", "dream", "family", "childhood", "experience",
        "\u4E00\u76F4", "\u591A\u5E74", "\u96BE\u5FD8", "\u91CD\u8981", "\u76EE\u6807", "\u68A6\u60F3",
        "\u5BB3\u6015", "\u7126\u8651", "\u5BB6\u5EAD", "\u7AE5\u5E74", "\u7ECF\u5386", "\u4EF7\u503C\u89C2",
    ]
    ephemeral_markers = [
        "right now", "on the way", "battery", "network", "signal", "temporarily",
        "\u73B0\u5728\u5728", "\u521A\u521A", "\u521A\u624D", "\u8DEF\u4E0A", "\u9A6C\u4E0A", "\u4E34\u65F6",
        "\u4E00\u4F1A\u513F", "\u6CA1\u7535", "\u7F51\u7EDC\u4E0D\u597D", "\u4FE1\u53F7\u5DEE", "\u6392\u961F", "\u5F00\u4F1A\u524D",
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
        if any(marker in lowered for marker in ["my name is", "i am", "i'm", "\u6211\u53EB", "\u6211\u662F", "\u6211\u7684\u804C\u4E1A", "\u6211\u6765\u81EA"]):
            return 5
        return 4
    if tier == "recent_pending":
        if any(marker in lowered for marker in ["deadline", "ddl", "tomorrow", "this week", "\u660E\u5929", "\u672C\u5468", "\u8981\u505A", "\u622A\u6B62"]):
            return 4
        return 3
    if tier == "deep":
        if any(marker in lowered for marker in ["family", "childhood", "goal", "dream", "important", "experience", "\u5BB6\u5EAD", "\u7AE5\u5E74", "\u76EE\u6807", "\u68A6\u60F3", "\u91CD\u8981", "\u7ECF\u5386"]):
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


async def _auto_capture_memory_from_user_text(user_text: str):
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
        candidates = await db.search_memories(keyword=probe, category=category, limit=10, touch=False)
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
    session = await db.create_session(
        title=body.title,
        model=body.model,
        source_app=body.source_app,
    )
    return {"session": session}


@api.get("/sessions/{session_id}")
async def get_session(session_id: str):
    session = await db.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")
    messages = await db.get_messages(session_id)
    return {"session": session, "messages": messages}


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
    return {"memory": memory}


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

    # 1. 保存用户消息
    await db.add_message(body.session_id, "user", body.content)
    try:
        await _auto_capture_memory_from_user_text(body.content)
    except Exception as e:
        logger.warning(f"自动记忆提取失败: {e}")

    # 1.1 长会话摘要触发（增量摘要）
    try:
        await db.ensure_context_summary(
            session_id=body.session_id,
            trigger_messages=max(8, settings.summary_trigger_messages),
            keep_recent_messages=max(4, settings.summary_keep_recent_messages),
            min_batch_messages=max(2, settings.summary_min_batch_messages),
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
            agent_id=body.agent_id,
        )
        
        # 将系统消息插在最前面
        current_messages = [{"role": "system", "content": system_prompt}] + recent.copy()

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
                yield {"event": "error", "data": str(e)}
                return

            complete_text = "".join(full_response)

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
                            yield {"event": "message", "data": f"\n\n> 🔧 正在调用工具 `{func_name}`...\n"}
                            result = await execute_tool_with_guard(func_name, args)
                        else:
                            result = jsonlib.dumps({"error": f"Tool {func_name} not found"})
                    except Exception as ex:
                        result = jsonlib.dumps({"error": str(ex)})

                    # 控制工具返回长度，避免工具输出污染上下文并拉高 token 成本
                    if isinstance(result, str):
                        max_chars = max(80, settings.tool_result_max_chars)
                        if len(result) > max_chars:
                            result = result[:max_chars].rstrip() + "...(truncated)"

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
                )
                # 回复落库后再尝试一次摘要，避免对话越聊越长
                try:
                    await db.ensure_context_summary(
                        session_id=body.session_id,
                        trigger_messages=max(8, settings.summary_trigger_messages),
                        keep_recent_messages=max(4, settings.summary_keep_recent_messages),
                        min_batch_messages=max(2, settings.summary_min_batch_messages),
                    )
                except Exception as e:
                    logger.warning(f"上下文摘要触发失败(assistant): {e}")

            yield {"event": "done", "data": "[DONE]"}
            break

    return EventSourceResponse(event_generator())


@api.post("/rp/chat")
async def rp_chat(body: RPChatRequest):
    room = await db.get_rp_room(body.room_id)
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")

    agent_id = body.agent_id or room.get("agent_id")
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

        complete_text = "".join(full_response)
        if complete_text:
            await db.add_rp_message(
                body.room_id,
                "assistant",
                complete_text,
                model=f"{model_info.get('provider', '?')}/{model_info.get('model', '?')}",
            )
        yield {"event": "done", "data": "[DONE]"}

    return EventSourceResponse(event_generator())

