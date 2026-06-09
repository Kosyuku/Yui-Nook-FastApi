"""聊天 API 路由"""
from __future__ import annotations

import json as jsonlib
import logging
import os
import re
import asyncio
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

import ai_runtime
from codex_bridge import codex_bridge_chat
from claude_tmux_bridge import claude_tmux_chat, claude_tmux_reset, list_active_sessions, keepalive_all_sessions
import database as db
from models import router as model_router
from models import OpenAICompatAdapter, EchoAdapter, ADAPTER_MAP
from config import ProviderConfig, settings
from tools import execute_tool_with_guard, TOOL_EXECUTORS
from prompt_builder import build_chat_prompt, build_rp_prompt, build_system_prompt
from partition_manager import append_committed_turn
from usage_recorder import record_model_usage

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


_BRIDGE_META_MARKERS = (
    "我需要", "我应该", "我会", "让我", "我现在", "当前时间", "当前", "不需要工具",
    "工具调用", "我的印象", "关系处于", "核心身份", "我了解我的角色", "按理说",
    "原本靠", "听到这声", "用户", "模型", "系统提示", "上下文", "prompt",
    "现在时间", "她说的", "我需要确认", "如果是这样", "技术问题", "作为ai",
    "我可以理解", "自然地回应", "承认她说的问题", "保持", "语调", "微微",
    "皱眉", "从沙发", "坐直", "内心", "角色", "情绪",
    "i need", "i should", "i will", "let me", "the user", "current context",
    "tool call", "system prompt",
)

_BRIDGE_REPLY_CUES = (
    "来了", "过来", "嗯", "好", "啧", "行", "别", "笨", "傻", "小酒", "阿湛",
    "在", "听见", "收到",
)

_BRIDGE_META_MARKERS = _BRIDGE_META_MARKERS + (
    "我需要", "我应该", "我会", "让我", "当前时间", "当前", "不需要工具", "工具调用",
    "我的印象", "关系处于", "核心身份", "我了解我的角色", "按理说", "原本", "听到这",
    "用户", "模型", "系统提示", "上下文", "现在时间", "她说的是", "我需要确认",
    "如果是这样", "技术问题", "作为ai", "我可以理解", "自然地回应", "承认她说的问题",
    "保持", "语调", "微微", "带着", "从沙发", "坐直", "内心", "角色", "情绪",
    "小酒说", "语气里带着", "流式消息", "接受了现状", "让我慢慢来改",
    "我应该怎么回应", "首先", "不需要长篇大论",
)

_BRIDGE_REPLY_CUES = _BRIDGE_REPLY_CUES + (
    "来了", "过来", "嗯", "好", "嗳", "行", "别", "笑", "喏", "小酒", "阿湛",
    "在", "听见", "收到",
)


def _looks_like_leading_meta_text(reply: str) -> bool:
    text = str(reply or "").lstrip()
    if not text:
        return False
    if text.startswith(("（", "(")):
        return True
    first = re.split(r"\n\s*\n+", text, maxsplit=1)[0].strip().lower()
    if not first:
        return False
    marker_hits = sum(1 for marker in _BRIDGE_META_MARKERS if marker.lower() in first)
    if marker_hits >= 2:
        return True
    high_signal = (
        "现在时间是",
        "我需要确认",
        "让我自然地回应",
        "作为ai",
        "流式输出",
        "系统提示",
    )
    return any(marker in first for marker in high_signal)


def _strip_leading_reasoning_blocks(reply: str) -> tuple[str, str]:
    """Remove leading parenthetical self-analysis from a visible reply."""
    text = str(reply or "").strip()
    if not text:
        return "", ""
    removed: list[str] = []
    while text:
        stripped = text.lstrip()
        leading_ws_len = len(text) - len(stripped)
        if leading_ws_len:
            text = stripped
        opener = text[:1]
        closer = "）" if opener == "（" else ")" if opener == "(" else ""
        if not closer:
            break
        close_idx = text.find(closer, 1)
        if close_idx < 0:
            break
        block = text[1:close_idx].strip()
        compact = block.lower()
        marker_hits = sum(1 for marker in _BRIDGE_META_MARKERS if marker.lower() in compact)
        looks_meta = marker_hits >= 1 or len(block) >= 28
        if not looks_meta:
            break
        removed.append(text[:close_idx + 1].strip())
        text = text[close_idx + 1:].lstrip()
    return text.strip(), "\n\n".join(removed).strip()


def _split_bridge_reply(reply: str, *, fallback_to_original: bool = True) -> tuple[str, str]:
    """Split obvious bridge self-analysis away from the visible chat reply.

    Codex/CC bridge outputs are plain text, so this is intentionally conservative:
    strip only leading paragraphs that look like meta reasoning, and keep the rest
    visible. Removed text is logged as COT instead of being lost.
    """
    text = str(reply or "").strip()
    if not text:
        return "", ""
    paragraphs = [part.strip() for part in re.split(r"\n\s*\n+", text) if part.strip()]
    if len(paragraphs) <= 1:
        visible, thinking = _strip_leading_reasoning_blocks(text)
        if visible:
            return visible, thinking
        return (text, "") if fallback_to_original else ("", thinking or text)

    removed: list[str] = []
    kept = list(paragraphs)
    for idx, paragraph in enumerate(paragraphs):
        compact = paragraph.strip().lower()
        marker_hits = sum(1 for marker in _BRIDGE_META_MARKERS if marker.lower() in compact)
        starts_like_reply = any(paragraph.startswith(cue) for cue in _BRIDGE_REPLY_CUES)
        if paragraph.startswith(("小酒说", "阿湛想", "用户", "她说")):
            starts_like_reply = False
        next_starts_like_reply = idx + 1 < len(paragraphs) and any(
            paragraphs[idx + 1].startswith(cue) for cue in _BRIDGE_REPLY_CUES
        )
        looks_meta = marker_hits >= 2 or (idx == 0 and marker_hits >= 1 and len(paragraph) >= 80)
        looks_meta = looks_meta or (idx == 0 and len(paragraph) >= 180 and next_starts_like_reply)
        if looks_meta and not starts_like_reply:
            removed.append(paragraph)
            kept = paragraphs[idx + 1:]
            continue
        break

    visible = "\n\n".join(kept).strip()
    thinking = "\n\n".join(removed).strip()
    stripped_visible, inline_thinking = _strip_leading_reasoning_blocks(visible)
    if inline_thinking:
        visible = stripped_visible
        thinking = "\n\n".join(part for part in [thinking, inline_thinking] if part).strip()
    if visible:
        return visible, thinking
    if fallback_to_original:
        return text, thinking
    return "", thinking or text


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


def _prompt_debug_payload(debug: dict) -> dict:
    keys = (
        "block_order",
        "fixed_block_hash",
        "history_message_count",
        "history_source",
        "rp_history_message_count",
        "rp_history_source",
        "rp_history_token_estimate",
        "rp_room_id",
        "partition_read_enabled",
        "partition_read_attempted",
        "partition_read_hit",
        "partition_read_source",
        "partition_id",
        "partition_history_a_count",
        "partition_history_b_count",
        "partition_fallback_reason",
        "summary_enabled",
        "summary_source",
        "summary_char_count",
        "summary_updated",
        "summary_error",
        "dynamic_sources",
        "provider",
        "model",
    )
    return {key: debug.get(key) for key in keys}


def _usage_payload_from_chunk(chunk: dict) -> dict:
    raw_usage = chunk.get("raw_usage") or chunk.get("usage") or {
        "prompt_tokens": chunk.get("prompt_tokens"),
        "completion_tokens": chunk.get("completion_tokens"),
        "total_tokens": chunk.get("total_tokens"),
        "cached_tokens": chunk.get("cached_tokens"),
    }
    return {
        "usage_chunk_received": True,
        "raw_usage": raw_usage,
        "cached_tokens": chunk.get("cached_tokens"),
        "prompt_tokens": chunk.get("prompt_tokens"),
        "completion_tokens": chunk.get("completion_tokens"),
        "total_tokens": chunk.get("total_tokens"),
    }


async def _record_usage_if_available(
    *,
    mode: str,
    agent_id: str,
    session_id: str = "",
    rp_room_id: str = "",
    provider: str,
    model: str,
    built_prompt_debug: dict | None,
    usage_info: dict,
) -> None:
    if str(usage_info.get("status") or "").lower() == "not available":
        if settings.prompt_debug:
            logger.info(
                "Model usage debug(%s): provider=%s model=%s usage_chunk_received=false status=not_available fixed_block_hash=%s block_order=%s",
                mode,
                provider,
                model,
                (built_prompt_debug or {}).get("fixed_block_hash", ""),
                (built_prompt_debug or {}).get("block_order", []),
            )
        return

    usage_record = await record_model_usage(
        agent_id=agent_id,
        session_id=session_id,
        rp_room_id=rp_room_id,
        mode=mode,
        provider=provider,
        model=model,
        built_prompt_debug=built_prompt_debug,
        raw_usage=usage_info.get("raw_usage") if isinstance(usage_info, dict) else usage_info,
    )
    if settings.prompt_debug:
        logger.info(
            "Model usage debug(%s): %s",
            mode,
            {
                "usage_chunk_received": True,
                **(usage_record or {"status": "record_failed"}),
            },
        )


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

    try:
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
            apply_filter=True,
        )
    except db.MemoryRejected as exc:
        logger.info("Auto memory filtered (%s): %s", exc.reason, text[:80])
        return
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
    client_message_id: Optional[str] = None
    agent_id: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    persona: Optional[str] = None
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    api_path: Optional[str] = None


class CodexChatRequest(BaseModel):
    conversation_key: str
    content: str
    reset: bool = False
    timeout_seconds: Optional[int] = None
    agent_id: Optional[str] = None
    persona: Optional[str] = None


class ClaudeCodeChatRequest(BaseModel):
    conversation_key: str
    content: str
    reset: bool = False
    timeout_seconds: Optional[int] = None
    agent_id: Optional[str] = None


def _codex_prompt_from_built_messages(messages: list[dict]) -> str:
    parts: list[str] = [
        "You are answering inside YUI Nook through the Codex bridge.",
        "Use the context below as your active chat prompt. Reply only to the latest user message.",
        "Return only the final visible chat reply. Do not include analysis, hidden reasoning, tool decisions, self-checks, or descriptions of how you will respond.",
        "Do not mention implementation details unless the user asks.",
    ]
    for message in messages:
        role = str(message.get("role") or "user").strip() or "user"
        content = str(message.get("content") or "").strip()
        if content:
            parts.append(f"\n\n<{role}>\n{content}\n</{role}>")
    return "\n".join(parts).strip()


async def _run_codex_aftercare(
    *,
    session_id: str,
    agent_id: str,
    user_message_row: dict,
    assistant_message_row: dict,
) -> None:
    try:
        if settings.conversation_partitions_enabled:
            try:
                await append_committed_turn(
                    agent_id=agent_id,
                    session_id=session_id,
                    rp_room_id="",
                    mode="chat",
                    user_message=user_message_row,
                    assistant_message=assistant_message_row,
                )
            except Exception as exc:
                logger.warning("Conversation partition write failed(codex): %s", exc)

        try:
            await db.ensure_context_summary(
                session_id=session_id,
                trigger_messages=max(8, settings.summary_trigger_messages),
                keep_recent_messages=max(4, settings.summary_keep_recent_messages),
                min_batch_messages=max(2, settings.summary_min_batch_messages),
                agent_id=agent_id,
            )
        except Exception as exc:
            logger.warning("Codex context summary failed: %s", exc)

        try:
            import consciousness
            await consciousness.phase2_produce_snapshot(agent_id=agent_id)
            await consciousness.phase3_extract_memories(agent_id=agent_id)
            await consciousness.run_daily_loop_once(agent_id=agent_id)
        except Exception as exc:
            logger.warning("Codex consciousness aftercare failed: %s", exc)
    except Exception:
        logger.exception("Codex aftercare crashed")


class RPChatRequest(BaseModel):
    room_id: str
    content: str
    client_message_id: Optional[str] = None
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


@api.delete("/messages/{message_id}")
async def delete_message(message_id: str):
    ok = await db.delete_message(message_id)
    if not ok:
        raise HTTPException(status_code=404, detail="消息不存在")
    return {"ok": True}


# ==================== 记忆相关 (Memories) ====================

@api.get("/memories")
async def list_memories(
    category: Optional[str] = None,
    limit: int = 50,
    sort_by: str = "updated_at",
    order: str = "desc",
    agent_id: Optional[str] = None,
    include_cross_agent: bool = False,
    cross_agent_limit: Optional[int] = None,
):
    memories = await db.list_memories(
        category=category,
        limit=limit,
        sort_by=sort_by,
        order=order,
        agent_id=agent_id,
        include_cross_agent=include_cross_agent,
        cross_agent_limit=cross_agent_limit,
    )
    return {"memories": memories}


@api.get("/memories/search")
async def search_memories(
    q: str,
    category: Optional[str] = None,
    limit: int = 10,
    mode: str = "auto",
    agent_id: Optional[str] = None,
    include_cross_agent: bool = False,
    cross_agent_limit: Optional[int] = None,
):
    query = (q or "").strip()
    if not query:
        raise HTTPException(status_code=400, detail="query is required")

    search_mode = (mode or "auto").strip().lower()
    if search_mode == "keyword":
        memories = await db.search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit)
    elif search_mode == "semantic":
        memories = await db.semantic_search_memories(query_text=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit)
    else:
        memories = await db.semantic_search_memories(query_text=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit)
        if not memories:
            memories = await db.search_memories(keyword=query, category=category, limit=limit, agent_id=agent_id, include_cross_agent=include_cross_agent, cross_agent_limit=cross_agent_limit)
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
    user_message_row = await db.add_message(body.session_id, "user", body.content, agent_id=resolved_agent_id)
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
    # 3. 解析适配器
    resolved = await _resolve_adapter(body)
    if len(resolved) == 3:
        adapter, model_info, override_kwargs = resolved
    else:
        adapter, model_info = resolved
        override_kwargs = {}

    logger.info(
        "Chat request provider debug: %s",
        {
            "provider": str(model_info.get("provider") or ""),
            "model": str(model_info.get("model") or ""),
            "adapter_class": adapter.__class__.__name__,
            "override_keys": [key for key in override_kwargs.keys() if key != "api_key"],
        },
    )

    # 4. SSE 流式返回
    async def event_generator():
        # 构建系统提示词
        built_prompt = None
        if settings.prompt_builder_v2_enabled:
            built_prompt = await build_chat_prompt(
                session_id=body.session_id,
                agent_id=resolved_agent_id,
                latest_user_text=body.content,
                override_persona=(body.persona or "").strip() or None,
                provider=str(model_info.get("provider") or ""),
                model=str(model_info.get("model") or ""),
                tool_profile="chat",
            )
            if settings.prompt_debug:
                logger.info("Chat prompt debug: %s", _prompt_debug_payload(built_prompt.debug))
        
        # 将系统消息插在最前面
            current_messages = [dict(message) for message in built_prompt.messages]
        else:
            system_prompt = await build_system_prompt(
                session_id=body.session_id,
                override_persona=(body.persona or "").strip() or None,
                agent_id=resolved_agent_id,
            )
            recent = await db.get_recent_messages(
                body.session_id,
                limit=max(1, settings.chat_recent_messages_limit),
            )
            if settings.prompt_debug:
                logger.info(
                    "Chat prompt debug: %s",
                    {
                        "block_order": ["legacy_system", "legacy_recent"],
                        "fixed_block_hash": "",
                        "history_message_count": len(recent),
                        "history_source": "legacy_recent_messages",
                        "dynamic_sources": [],
                        "provider": str(model_info.get("provider") or ""),
                        "model": str(model_info.get("model") or ""),
                    },
                )
            current_messages = [{"role": "system", "content": system_prompt}] + recent.copy()
        reasoning_buffer: list[str] = []
        usage_info = {"status": "not available"}

        while True:
            full_response = []
            sent_visible_text = ""
            sent_inline_reasoning = ""
            tool_calls_buffer = {}

            try:
                # 透传 blocks 给原生 Anthropic 适配器用于 cache_control 注入
                if built_prompt is not None:
                    override_kwargs.setdefault("_blocks", built_prompt.blocks)
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
                    elif isinstance(chunk, dict) and chunk.get("type") == "usage":
                        usage_info = _usage_payload_from_chunk(chunk)
                    elif isinstance(chunk, str):
                        full_response.append(chunk)
                        raw_visible_source = "".join(full_response)
                        starts_with_reasoning = _looks_like_leading_meta_text(raw_visible_source)
                        visible_text, inline_reasoning = _split_bridge_reply(
                            raw_visible_source,
                            fallback_to_original=not starts_with_reasoning,
                        )
                        if inline_reasoning and inline_reasoning != sent_inline_reasoning:
                            thinking_delta = (
                                inline_reasoning[len(sent_inline_reasoning):]
                                if inline_reasoning.startswith(sent_inline_reasoning)
                                else inline_reasoning
                            )
                            sent_inline_reasoning = inline_reasoning
                            if thinking_delta:
                                yield {
                                    "event": "thinking",
                                    "data": jsonlib.dumps({"thinking": thinking_delta}, ensure_ascii=False),
                                }
                        if visible_text and visible_text != sent_visible_text:
                            delta = visible_text[len(sent_visible_text):] if visible_text.startswith(sent_visible_text) else visible_text
                            sent_visible_text = visible_text
                            if delta:
                                yield {"event": "message", "data": jsonlib.dumps({"content": delta}, ensure_ascii=False)}

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

            raw_complete_text = "".join(full_response)
            complete_text, inline_reasoning_text = _split_bridge_reply(raw_complete_text, fallback_to_original=True)
            reasoning_used_as_text = False
            reasoning_cot_text = "\n\n".join(part for part in ["\n".join(reasoning_buffer), inline_reasoning_text] if part)
            if not complete_text.strip() and reasoning_buffer:
                fallback_text = _reasoning_as_visible_fallback(reasoning_buffer)
                visible_fallback, filtered_reasoning = _split_bridge_reply(
                    fallback_text,
                    fallback_to_original=False,
                )
                if filtered_reasoning:
                    reasoning_cot_text = filtered_reasoning
                if visible_fallback:
                    complete_text = visible_fallback
                    reasoning_used_as_text = True
                    logger.info("Chat stream used filtered reasoning fallback for provider=%s", model_info)
                    yield {"event": "message", "data": jsonlib.dumps({"content": complete_text}, ensure_ascii=False)}
                else:
                    logger.info("Chat stream suppressed reasoning-only fallback for provider=%s", model_info)

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
                assistant_message_row = await db.add_message(
                    body.session_id,
                    "assistant",
                    complete_text,
                    model=f"{model_info.get('provider', '?')}/{model_info.get('model', '?')}",
                    agent_id=resolved_agent_id,
                )
                if settings.conversation_partitions_enabled:
                    try:
                        await append_committed_turn(
                            agent_id=resolved_agent_id,
                            session_id=body.session_id,
                            rp_room_id="",
                            mode="chat",
                            user_message=user_message_row,
                            assistant_message=assistant_message_row,
                        )
                    except Exception as e:
                        logger.warning("Conversation partition write failed(chat): %s", e)
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

            if reasoning_buffer:
                await db.add_cot_log(
                    body.session_id,
                    agent_id=resolved_agent_id,
                    log_type="reasoning",
                    title="模型思考摘要",
                    summary=reasoning_cot_text,
                    content=reasoning_cot_text,
                    status="done" if not reasoning_used_as_text else "filtered",
                )

            if complete_text:
                await db.add_cot_log(
                    body.session_id,
                    agent_id=resolved_agent_id,
                    log_type="assistant",
                    title="回复摘要",
                    summary=complete_text,
                    content=complete_text,
                    status="done",
                )
                logger.info(
                    "Chat usage/cache tokens: provider=%s model=%s usage=%s",
                    model_info.get("provider", "?"),
                    model_info.get("model", "?"),
                    usage_info,
                )

            await _record_usage_if_available(
                mode="chat",
                agent_id=resolved_agent_id,
                session_id=body.session_id,
                provider=str(model_info.get("provider") or ""),
                model=str(model_info.get("model") or ""),
                built_prompt_debug=built_prompt.debug if built_prompt else None,
                usage_info=usage_info,
            )

            yield {"event": "done", "data": "[DONE]"}
            break

    return EventSourceResponse(event_generator())


@api.post("/codex/chat")
async def codex_chat(body: CodexChatRequest):
    """
    Bridge a client conversation into a persistent Codex CLI thread.

    Same conversation_key from YUI Nook and Discord resumes the same Codex thread.
    """
    raw_agent_id = (body.agent_id or body.conversation_key.rsplit(":", 1)[-1] or "").strip()
    agent_id = db.normalize_agent_id_value(raw_agent_id)
    session_title = f"Codex bridge: {body.conversation_key.strip()}"

    try:
        session = await db.get_latest_session_for_agent_source(
            agent_id=agent_id,
            source_app="codex_bridge",
            title=session_title,
        )
        if not session:
            session = await db.create_session(
                title=session_title,
                model="codex",
                source_app="codex_bridge",
                agent_id=agent_id,
            )
        if body.reset:
            await db.update_session(session["id"], last_summarized_message_id="")
    except Exception as exc:
        logger.exception("Codex bridge session setup failed")
        raise HTTPException(status_code=502, detail=f"Codex session setup failed: {exc}") from exc

    try:
        user_message = await db.add_message(
            session["id"],
            "user",
            body.content,
            model="codex",
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.exception("Codex bridge user persistence failed")
        raise HTTPException(status_code=502, detail=f"Codex failed to save user message: {exc}") from exc

    try:
        await _auto_capture_memory_from_user_text(body.content, agent_id)
    except Exception as exc:
        logger.warning("Codex auto memory capture failed: %s", exc)
    try:
        await db.ensure_context_summary(
            session_id=session["id"],
            trigger_messages=max(8, settings.summary_trigger_messages),
            keep_recent_messages=max(4, settings.summary_keep_recent_messages),
            min_batch_messages=max(2, settings.summary_min_batch_messages),
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.warning("Codex context summary before prompt failed: %s", exc)

    built_prompt = None
    try:
        built_prompt = await build_chat_prompt(
            session_id=session["id"],
            agent_id=agent_id,
            latest_user_text=body.content,
            override_persona=(body.persona or "").strip() or None,
            provider="codex",
            model="codex",
            tool_profile="chat",
        )
        if settings.prompt_debug:
            logger.info("Codex prompt debug: %s", _prompt_debug_payload(built_prompt.debug))
        result = await codex_bridge_chat(
            conversation_key=body.conversation_key,
            content=body.content,
            prompt=_codex_prompt_from_built_messages(built_prompt.messages),
            reset=body.reset,
            timeout_seconds=body.timeout_seconds or 180,
        )
    except Exception as exc:
        logger.exception("Codex bridge failed")
        raise HTTPException(status_code=502, detail=str(exc) or repr(exc)) from exc

    visible_reply, bridge_thinking = _split_bridge_reply(result.reply)

    try:
        assistant_message = await db.add_message(
            session["id"],
            "assistant",
            visible_reply,
            model="codex",
            agent_id=agent_id,
        )
        if bridge_thinking:
            await db.add_cot_log(
                session["id"],
                agent_id=agent_id,
                source="codex_bridge",
                log_type="reasoning",
                title="Codex bridge reasoning",
                summary=bridge_thinking,
                content=bridge_thinking,
                status="filtered",
            )
    except Exception as exc:
        logger.exception("Codex bridge persistence failed")
        raise HTTPException(status_code=502, detail=f"Codex replied but failed to save messages: {exc}") from exc

    asyncio.create_task(_run_codex_aftercare(
        session_id=session["id"],
        agent_id=agent_id,
        user_message_row=user_message,
        assistant_message_row=assistant_message,
    ))

    return {
        "conversation_key": result.conversation_key,
        "thread_id": result.thread_id,
        "reply": visible_reply,
        "user_message": user_message,
        "assistant_message": assistant_message,
        "prompt_debug": built_prompt.debug if (settings.prompt_debug and built_prompt) else None,
    }


@api.post("/claude-code/chat")
async def claude_code_chat(body: ClaudeCodeChatRequest):
    """
    Bridge a client conversation into a persistent interactive Claude Code tmux session.
    Uses Claude subscription quota (not API billing).
    Each conversation_key gets its own tmux session on the VPS.
    """
    raw_agent_id = (body.agent_id or body.conversation_key.rsplit(":", 1)[-1] or "").strip()
    agent_id = db.normalize_agent_id_value(raw_agent_id)
    session_title = f"Claude Code bridge: {body.conversation_key.strip()}"

    try:
        session = await db.get_latest_session_for_agent_source(
            agent_id=agent_id,
            source_app="claude_code_bridge",
            title=session_title,
        )
        if not session:
            session = await db.create_session(
                title=session_title,
                model="claude-code",
                source_app="claude_code_bridge",
                agent_id=agent_id,
            )
        if body.reset:
            await db.update_session(session["id"], last_summarized_message_id="")
    except Exception as exc:
        logger.exception("Claude Code bridge session setup failed")
        raise HTTPException(status_code=502, detail=f"Claude Code session setup failed: {exc}") from exc

    try:
        user_message = await db.add_message(
            session["id"],
            "user",
            body.content,
            model="claude-code",
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.exception("Claude Code bridge user persistence failed")
        raise HTTPException(status_code=502, detail=f"Claude Code failed to save user message: {exc}") from exc

    try:
        await _auto_capture_memory_from_user_text(body.content, agent_id)
    except Exception as exc:
        logger.warning("Claude Code auto memory capture failed: %s", exc)

    try:
        result = await claude_tmux_chat(
            conversation_key=body.conversation_key,
            content=body.content,
            reset=body.reset,
            timeout_seconds=body.timeout_seconds or 120,
        )
    except Exception as exc:
        logger.exception("Claude Code tmux bridge failed")
        raise HTTPException(status_code=502, detail=str(exc) or repr(exc)) from exc

    visible_reply, bridge_thinking = _split_bridge_reply(result.reply)

    try:
        assistant_message = await db.add_message(
            session["id"],
            "assistant",
            visible_reply,
            model="claude-code",
            agent_id=agent_id,
        )
        if bridge_thinking:
            await db.add_cot_log(
                session["id"],
                agent_id=agent_id,
                source="claude_code_bridge",
                log_type="reasoning",
                title="Claude Code bridge reasoning",
                summary=bridge_thinking,
                content=bridge_thinking,
                status="filtered",
            )
    except Exception as exc:
        logger.exception("Claude Code bridge persistence failed")
        raise HTTPException(status_code=502, detail=f"Claude Code replied but failed to save messages: {exc}") from exc

    return {
        "conversation_key": result.conversation_key,
        "session_name": result.session_name,
        "reply": visible_reply,
        "user_message": user_message,
        "assistant_message": assistant_message,
    }


@api.post("/claude-code/chat/stream")
async def claude_code_chat_stream(body: ClaudeCodeChatRequest):
    """
    Stream Claude Code tmux transcript progress as SSE while keeping the same
    persistence behavior as /claude-code/chat.
    """
    raw_agent_id = (body.agent_id or body.conversation_key.rsplit(":", 1)[-1] or "").strip()
    agent_id = db.normalize_agent_id_value(raw_agent_id)
    session_title = f"Claude Code bridge: {body.conversation_key.strip()}"

    async def event_generator():
        try:
            session = await db.get_latest_session_for_agent_source(
                agent_id=agent_id,
                source_app="claude_code_bridge",
                title=session_title,
            )
            if not session:
                session = await db.create_session(
                    title=session_title,
                    model="claude-code",
                    source_app="claude_code_bridge",
                    agent_id=agent_id,
                )
            if body.reset:
                await db.update_session(session["id"], last_summarized_message_id="")
        except Exception as exc:
            logger.exception("Claude Code stream session setup failed")
            yield {"event": "error", "data": f"Claude Code session setup failed: {exc}"}
            return

        try:
            await db.add_message(
                session["id"],
                "user",
                body.content,
                model="claude-code",
                agent_id=agent_id,
            )
        except Exception as exc:
            logger.exception("Claude Code stream user persistence failed")
            yield {"event": "error", "data": f"Claude Code failed to save user message: {exc}"}
            return

        try:
            await _auto_capture_memory_from_user_text(body.content, agent_id)
        except Exception as exc:
            logger.warning("Claude Code stream auto memory capture failed: %s", exc)

        progress_queue: asyncio.Queue = asyncio.Queue()

        async def on_progress(partial: str):
            await progress_queue.put(("progress", partial))

        async def run_bridge():
            try:
                result = await claude_tmux_chat(
                    conversation_key=body.conversation_key,
                    content=body.content,
                    reset=body.reset,
                    timeout_seconds=body.timeout_seconds or 120,
                    on_progress=on_progress,
                )
                await progress_queue.put(("done", result))
            except Exception as exc:
                await progress_queue.put(("error", exc))

        task = asyncio.create_task(run_bridge())
        sent_visible = ""

        while True:
            kind, payload = await progress_queue.get()
            if kind == "progress":
                visible, _thinking = _split_bridge_reply(str(payload or ""))
                if not visible or visible == sent_visible:
                    continue
                delta = visible[len(sent_visible):] if visible.startswith(sent_visible) else ""
                if not delta and not sent_visible:
                    delta = visible
                if delta:
                    sent_visible = visible
                    yield {"event": "message", "data": jsonlib.dumps({"content": delta}, ensure_ascii=False)}
                continue

            if kind == "error":
                task.cancel()
                logger.error(
                    "Claude Code stream bridge failed",
                    exc_info=(type(payload), payload, payload.__traceback__),
                )
                yield {"event": "error", "data": str(payload) or repr(payload)}
                return

            result = payload
            visible_reply, bridge_thinking = _split_bridge_reply(result.reply)
            if visible_reply and visible_reply != sent_visible:
                delta = visible_reply[len(sent_visible):] if visible_reply.startswith(sent_visible) else ""
                if not delta and not sent_visible:
                    delta = visible_reply
                if delta:
                    sent_visible = visible_reply
                    yield {"event": "message", "data": jsonlib.dumps({"content": delta}, ensure_ascii=False)}

            try:
                await db.add_message(
                    session["id"],
                    "assistant",
                    visible_reply,
                    model="claude-code",
                    agent_id=agent_id,
                )
                if bridge_thinking:
                    await db.add_cot_log(
                        session["id"],
                        agent_id=agent_id,
                        source="claude_code_bridge",
                        log_type="reasoning",
                        title="Claude Code bridge reasoning",
                        summary=bridge_thinking,
                        content=bridge_thinking,
                        status="filtered",
                    )
            except Exception as exc:
                logger.exception("Claude Code stream persistence failed")
                yield {"event": "error", "data": f"Claude Code replied but failed to save messages: {exc}"}
                return

            yield {"event": "done", "data": "[DONE]"}
            return

    return EventSourceResponse(event_generator())


@api.get("/claude-code/sessions")
async def claude_code_sessions():
    """列出所有活跃的 Claude Code tmux sessions 及消息计数。"""
    return {"sessions": list_active_sessions(), "compact_every": int(os.getenv("CLAUDE_TMUX_COMPACT_EVERY", "30"))}


@api.post("/claude-code/reset")
async def claude_code_reset_session(body: ClaudeCodeChatRequest):
    """Kill 掉对应的 tmux session，下次重新开始。"""
    await claude_tmux_reset(body.conversation_key)
    return {"ok": True, "conversation_key": body.conversation_key}


@api.post("/claude-code/keepalive")
async def claude_code_keepalive():
    """检查所有 session 里 claude 是否还活着，挂了就重启。不耗额度。"""
    results = await asyncio.to_thread(keepalive_all_sessions)
    return {"results": results}


async def _cc_keepalive_loop():
    """后台每 10 分钟检查一次所有 session。"""
    while True:
        await asyncio.sleep(600)
        try:
            await asyncio.to_thread(keepalive_all_sessions)
        except Exception as exc:
            logger.warning("CC keepalive failed: %s", exc)


@api.post("/rp/chat")
async def rp_chat(body: RPChatRequest):
    room = await db.get_rp_room(body.room_id)
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")

    try:
        agent_id = await db.resolve_agent_id(agent_id=body.agent_id, room_id=body.room_id, purpose="rp_chat")
    except db.AgentResolutionError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    user_message_row = await db.add_rp_message(body.room_id, "user", body.content)

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
    if not isinstance(adapter, EchoAdapter):
        override_kwargs["tools"] = []
        override_kwargs["tool_choice"] = "none"
    logger.info(
        "RP request provider debug: %s",
        {
            "provider": str(model_info.get("provider") or ""),
            "model": str(model_info.get("model") or ""),
            "adapter_class": adapter.__class__.__name__,
            "override_keys": [key for key in override_kwargs.keys() if key != "api_key"],
        },
    )

    async def event_generator():
        built_prompt = None
        if settings.rp_prompt_builder_v2_enabled:
            built_prompt = await build_rp_prompt(
                room_id=body.room_id,
                agent_id=agent_id,
                latest_user_text=body.content,
                override_persona=(body.persona or "").strip() or None,
                provider=str(model_info.get("provider") or ""),
                model=str(model_info.get("model") or ""),
                tool_profile="rp",
            )
            if settings.prompt_debug:
                logger.info("RP prompt debug: %s", _prompt_debug_payload(built_prompt.debug))
            current_messages = [dict(message) for message in built_prompt.messages]
        else:
            base_prompt = await build_system_prompt(
                session_id=None,
                override_persona=(body.persona or "").strip() or None,
                agent_id=agent_id,
            )
            recent = await db.get_recent_rp_messages(
                body.room_id,
                limit=max(1, settings.chat_recent_messages_limit),
            )
            rp_prompt = (
                "## RP room setting\n"
                f"- World setting: {room.get('world_setting', '')}\n"
                f"- User role: {room.get('user_role', '')}\n"
                f"- Assistant role: {room.get('ai_role', '')}\n\n"
                "## RP rules\n"
                "- Stay inside this room setting and roleplay with the user.\n"
                "- Keep the reply consistent with the role and world setting.\n"
                "- Do not call tools or switch into normal assistant mode.\n"
            )
            if settings.prompt_debug:
                logger.info(
                    "RP prompt debug: %s",
                    {
                        "block_order": ["legacy_system", "legacy_rp_setting", "legacy_recent"],
                        "fixed_block_hash": "",
                        "history_message_count": 0,
                        "history_source": "",
                        "rp_history_message_count": len(recent),
                        "rp_history_source": "legacy_recent_rp_messages",
                        "rp_history_token_estimate": 0,
                        "rp_room_id": body.room_id,
                        "dynamic_sources": [],
                        "provider": str(model_info.get("provider") or ""),
                        "model": str(model_info.get("model") or ""),
                    },
                )
            current_messages = [{"role": "system", "content": f"{base_prompt}\n\n{rp_prompt}"}] + recent.copy()
        full_response: list[str] = []
        usage_info = {"status": "not available"}
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
                elif isinstance(chunk, dict) and chunk.get("type") == "usage":
                    usage_info = _usage_payload_from_chunk(chunk)
                elif isinstance(chunk, str):
                    full_response.append(chunk)
                    yield {"event": "message", "data": jsonlib.dumps({"content": chunk}, ensure_ascii=False)}
        except Exception as e:
            logger.exception("RP chat stream error")
            yield {"event": "error", "data": str(e)}
            return

        complete_text = "".join(full_response).strip()
        if complete_text:
            assistant_message_row = await db.add_rp_message(
                body.room_id,
                "assistant",
                complete_text,
                model=f"{model_info.get('provider', '?')}/{model_info.get('model', '?')}",
            )
            if settings.conversation_partitions_enabled:
                try:
                    await append_committed_turn(
                        agent_id=agent_id,
                        session_id="",
                        rp_room_id=body.room_id,
                        mode="rp",
                        user_message=user_message_row,
                        assistant_message=assistant_message_row,
                    )
                except Exception as e:
                    logger.warning("Conversation partition write failed(rp): %s", e)

        await _record_usage_if_available(
            mode="rp",
            agent_id=agent_id,
            session_id="",
            rp_room_id=body.room_id,
            provider=str(model_info.get("provider") or ""),
            model=str(model_info.get("model") or ""),
            built_prompt_debug=built_prompt.debug if built_prompt else None,
            usage_info=usage_info,
        )

        yield {"event": "done", "data": "[DONE]"}
        return
        

    return EventSourceResponse(event_generator())
