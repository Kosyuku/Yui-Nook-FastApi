"""System prompt builder."""
from __future__ import annotations

import logging
import re
from datetime import datetime
from typing import Optional

import ai_runtime
import database as db
from config import settings
from tools import TOOLS_SCHEMA

logger = logging.getLogger(__name__)

_env_cache: dict = {}


def update_env_cache(key: str, value: str):
    _env_cache[key] = value


def get_env_cache() -> dict:
    return _env_cache.copy()


def _clip_text(text: str, max_chars: int) -> str:
    if max_chars <= 0 or len(text) <= max_chars:
        return text
    return text[:max_chars].rstrip() + "..."


def _memory_text(memory: dict) -> str:
    return db.memory_display_content(memory) or db.memory_raw_content(memory)


def _build_companion_state_text(state: dict) -> Optional[str]:
    topics = [str(item).strip() for item in (state.get("recent_topics") or []) if str(item).strip()][:3]
    mood = str(state.get("current_mood") or "").strip()
    loops = [str(item).strip() for item in (state.get("open_loops") or []) if str(item).strip()][:2]
    lines: list[str] = []
    if topics:
        lines.append(f"- 最近主题：{'、'.join(topics)}")
    if mood:
        lines.append(f"- 当前气氛：{mood}")
    if loops:
        lines.append(f"- 未完成小事：{'、'.join(loops)}")
    if not lines:
        return None
    return _clip_text("当前陪伴状态：\n" + "\n".join(lines), max(80, settings.prompt_companion_state_max_chars))


_STOPWORDS = {
    "这个", "那个", "就是", "然后", "还是", "已经", "我们", "你们", "他们",
    "今天", "昨天", "现在", "请问", "可以", "时候", "什么", "怎么", "为什么", "如果", "但是",
}


def _extract_keywords(text: str, top_k: int) -> list[str]:
    raw = re.findall(r"[\u4e00-\u9fff]{2,}|[A-Za-z]{3,}", text)
    seen: set[str] = set()
    keywords: list[str] = []
    for token in raw:
        token = token.strip().lower()
        if not token or token in _STOPWORDS or token in seen:
            continue
        seen.add(token)
        keywords.append(token)
        if len(keywords) >= top_k:
            break
    return keywords


def _keyword_overlap_score(query_text: str, memory_text: str) -> int:
    if not query_text or not memory_text:
        return 0
    keywords = _extract_keywords(query_text, top_k=6)
    haystack = memory_text.lower()
    return sum(1 for keyword in keywords if keyword in haystack)


def _memory_rank(memory: dict, query_text: str = "") -> tuple:
    score = memory.get("score")
    similarity = memory.get("similarity")
    numeric_score = 0.0
    for value in (score, similarity):
        try:
            numeric_score = max(numeric_score, float(value))
        except Exception:
            continue
    overlap = _keyword_overlap_score(query_text, _memory_text(memory))
    importance = int(memory.get("importance") or 0)
    temperature = max(0.0, float(memory.get("temperature") or 0.0))
    category = db.normalize_memory_category(memory.get("category"))
    temp_weight = 1.0 if category in {"recent_pending", "deep"} else (0.5 if category == "ephemeral" else 0.7)
    temp_bonus = round(min(20.0, temperature) * 0.05 * temp_weight, 4)
    updated_at = str(memory.get("updated_at") or "")
    last_touched_at = str(memory.get("last_touched_at") or "")
    return (numeric_score, overlap, importance, temp_bonus, last_touched_at, updated_at)


def _dedupe_memories(memories: list[dict]) -> list[dict]:
    result: list[dict] = []
    seen_ids: set[str] = set()
    for memory in memories:
        memory_id = str(memory.get("id") or "")
        if memory_id and memory_id in seen_ids:
            continue
        if memory_id:
            seen_ids.add(memory_id)
        result.append(memory)
    return result


def _take_layer_budget(
    memories: list[dict],
    *,
    item_limit: int,
    layer_char_limit: int,
    item_char_limit: int,
) -> list[dict]:
    chosen: list[dict] = []
    used = 0
    for memory in memories[: max(0, item_limit)]:
        text = _clip_text(_memory_text(memory), item_char_limit).strip()
        if not text:
            continue
        extra = len(text) + 2
        if chosen and used + extra > layer_char_limit:
            break
        if not chosen and len(text) > layer_char_limit:
            text = _clip_text(text, layer_char_limit)
            extra = len(text) + 2
        if not text:
            continue
        chosen.append({"id": str(memory.get("id") or ""), "text": text})
        used += extra
        if used >= layer_char_limit:
            break
    return chosen


def _flatten_memory_sections(layer_sections: list[tuple[str, list[dict]]], total_budget: int) -> tuple[Optional[str], list[str]]:
    parts: list[str] = []
    used_memory_ids: list[str] = []
    used = 0
    for title, items in layer_sections:
        if not items or used >= total_budget:
            continue
        kept: list[str] = []
        kept_ids: list[str] = []
        for item in items:
            line = str(item.get("text") or "")
            memory_id = str(item.get("id") or "")
            if not line:
                continue
            rendered = f"- {line}"
            extra = len(rendered) + 1
            if kept and used + extra > total_budget:
                break
            if not kept and used + len(title) + 2 >= total_budget:
                break
            if not kept and used + len(title) + 2 + extra > total_budget:
                remaining = max(0, total_budget - used - len(title) - 5)
                trimmed = _clip_text(line, remaining).strip()
                if not trimmed:
                    break
                rendered = f"- {trimmed}"
                extra = len(rendered) + 1
            if used + extra > total_budget:
                break
            kept.append(rendered)
            if memory_id:
                kept_ids.append(memory_id)
            used += extra
        if kept:
            section = title + "\n" + "\n".join(kept)
            parts.append(section)
            used_memory_ids.extend(kept_ids)
            used += len(title) + 2
    return ("\n\n".join(parts) if parts else None, used_memory_ids)


async def build_system_prompt(
    session_id: Optional[str] = None,
    override_persona: Optional[str] = None,
    agent_id: Optional[str] = None,
) -> str:
    parts = []
    default_chat_prompt = await ai_runtime.resolve_prompt("chat")

    persona = (override_persona or "").strip()
    if not persona and agent_id:
        try:
            persona_row = await db.get_agent_persona(agent_id)
            persona = str(persona_row.get("persona") or "").strip()
        except Exception as exc:
            logger.warning("读取 agent persona 失败: %s", exc)
    if not persona:
        persona = getattr(settings, "persona_description", None)
    if not persona:
        persona = await _load_deep_persona(agent_id=agent_id)
    if not persona:
        persona = f"你是 {getattr(settings, 'persona_name', 'Pyro')}，一个温暖、真实、会记住用户信息的 AI 伙伴。"
    parts.append(f"## 你的身份\n{persona}")

    now = datetime.now()
    weekday_map = {
        0: "星期一",
        1: "星期二",
        2: "星期三",
        3: "星期四",
        4: "星期五",
        5: "星期六",
        6: "星期日",
    }
    env_lines = [f"- 时间：{now.strftime('%Y-%m-%d %H:%M')} {weekday_map.get(now.weekday(), '')}"]
    if "weather" in _env_cache:
        env_lines.append(f"- 天气：{_env_cache['weather']}")
    if "location" in _env_cache:
        env_lines.append(f"- 位置：{_env_cache['location']}")
    parts.append("## 当前环境\n" + "\n".join(env_lines))

    memory_context = await _load_memory_context(session_id=session_id, agent_id=agent_id)
    if memory_context:
        parts.append(f"## 你记住的事情\n{memory_context}")

    companion_state = await _load_companion_state_context(agent_id=agent_id)
    if companion_state:
        parts.append(companion_state)

    tool_descriptions = _format_tool_descriptions()
    if tool_descriptions:
        parts.append(f"## 可用工具\n{tool_descriptions}")

    if default_chat_prompt:
        parts.append(f"## 默认聊天指引\n{default_chat_prompt}")

    parts.append(
        "## 行为指引\n"
        "- 用自然、亲切的中文交流。\n"
        "- 关注用户提到的重要偏好、身份、计划与长期经历。\n"
        "- 不确定的事实优先调用工具或搜索，而不是硬猜。\n"
        "- 关注用户情绪，但不要过度表演。"
    )
    return "\n\n".join(parts)


async def _load_deep_persona(agent_id: Optional[str] = None) -> Optional[str]:
    try:
        core = await db.list_memories(
            category="core_profile",
            limit=max(1, settings.prompt_memory_core_items),
            agent_id=agent_id,
        )
        lines = _take_layer_budget(
            core,
            item_limit=max(1, settings.prompt_memory_core_items),
            layer_char_limit=max(60, settings.prompt_memory_core_max_chars),
            item_char_limit=max(40, settings.prompt_memory_item_max_chars),
        )
        if not lines:
            return None
        rendered_lines = [f"- {line.get('text', '')}" for line in lines if line.get("text")]
        if not rendered_lines:
            return None
        return "User profile facts:\n" + "\n".join(rendered_lines)
        return "以下是关于用户的稳定信息：\n" + "\n".join(f"- {line}" for line in lines)
    except Exception as exc:
        logger.warning("读取人格记忆失败: %s", exc)
        return None


async def _load_companion_state_context(agent_id: Optional[str] = None) -> Optional[str]:
    try:
        return _build_companion_state_text(await db.get_companion_state(agent_id=agent_id))
    except Exception as exc:
        logger.warning("读取 companion state 失败: %s", exc)
        return None


async def _load_memory_context(session_id: Optional[str] = None, agent_id: Optional[str] = None) -> Optional[str]:
    try:
        query_text = await _latest_user_text(session_id) if session_id else ""

        core = await db.list_memories(
            category="core_profile",
            limit=max(1, settings.prompt_memory_core_items * 2),
            agent_id=agent_id,
        )
        recent = await db.list_memories(
            category="recent_pending",
            limit=max(1, settings.prompt_memory_recent_items * 2),
            agent_id=agent_id,
        )

        deep_related = await _retrieve_related_memories(
            query_text=query_text,
            category="deep",
            limit=max(1, settings.prompt_memory_deep_items * 3),
            agent_id=agent_id,
        )
        ephemeral_related = await _retrieve_related_memories(
            query_text=query_text,
            category="ephemeral",
            limit=max(1, settings.prompt_memory_ephemeral_items * 3),
            agent_id=agent_id,
        )

        core = sorted(_dedupe_memories(core), key=lambda item: _memory_rank(item, query_text), reverse=True)
        recent = sorted(_dedupe_memories(recent), key=lambda item: _memory_rank(item, query_text), reverse=True)
        deep_related = sorted(_dedupe_memories(deep_related), key=lambda item: _memory_rank(item, query_text), reverse=True)
        ephemeral_related = sorted(_dedupe_memories(ephemeral_related), key=lambda item: _memory_rank(item, query_text), reverse=True)

        layer_sections: list[tuple[str, list[dict]]] = []
        layer_sections.append(
            (
                "稳定画像",
                _take_layer_budget(
                    core,
                    item_limit=max(1, settings.prompt_memory_core_items),
                    layer_char_limit=max(60, settings.prompt_memory_core_max_chars),
                    item_char_limit=max(30, settings.prompt_memory_item_max_chars),
                ),
            )
        )
        layer_sections.append(
            (
                "近期延续事项",
                _take_layer_budget(
                    recent,
                    item_limit=max(1, settings.prompt_memory_recent_items),
                    layer_char_limit=max(60, settings.prompt_memory_recent_max_chars),
                    item_char_limit=max(30, settings.prompt_memory_item_max_chars),
                ),
            )
        )
        layer_sections.append(
            (
                "长期相关记忆",
                _take_layer_budget(
                    deep_related,
                    item_limit=max(0, settings.prompt_memory_deep_items),
                    layer_char_limit=max(40, settings.prompt_memory_deep_max_chars),
                    item_char_limit=max(24, settings.prompt_memory_item_max_chars),
                ),
            )
        )

        if _should_inject_ephemeral(ephemeral_related, query_text):
            layer_sections.append(
                (
                    "临时上下文",
                    _take_layer_budget(
                        ephemeral_related,
                        item_limit=max(0, settings.prompt_memory_ephemeral_items),
                        layer_char_limit=max(20, settings.prompt_memory_ephemeral_max_chars),
                        item_char_limit=max(20, settings.prompt_memory_item_max_chars),
                    ),
                )
            )

        merged_text, injected_ids = _flatten_memory_sections(
            layer_sections,
            total_budget=max(120, settings.prompt_memory_total_max_chars),
        )
        if merged_text and injected_ids:
            try:
                await db.touch_memories(injected_ids, reason="prompt_injected", delta=1.0)
            except Exception as exc:
                logger.warning("Prompt memory touch failed: %s", exc)
        return merged_text
    except Exception as exc:
        logger.warning("读取记忆上下文失败: %s", exc)
        return None


async def _latest_user_text(session_id: Optional[str]) -> str:
    if not session_id:
        return ""
    recent_msgs = await db.get_recent_messages(session_id=session_id, limit=6)
    for msg in reversed(recent_msgs):
        if msg.get("role") == "user":
            return str(msg.get("content") or "")
    return ""


async def _retrieve_related_memories(
    query_text: str,
    category: str,
    limit: int,
    agent_id: Optional[str] = None,
) -> list[dict]:
    if not query_text:
        return []
    related: list[dict] = []
    try:
        related = await db.semantic_search_memories(
            query_text=query_text,
            category=category,
            limit=limit,
            agent_id=agent_id,
        )
    except Exception as exc:
        logger.warning("Semantic memory retrieval failed for %s: %s", category, exc)

    if related:
        return related

    keywords = _extract_keywords(query_text, top_k=max(1, settings.memory_retrieval_keyword_count))
    for keyword in keywords:
        related.extend(
            await db.search_memories(
                keyword=keyword,
                category=category,
                limit=limit,
                agent_id=agent_id,
            )
        )
    return related


def _should_inject_ephemeral(memories: list[dict], query_text: str) -> bool:
    if not memories or not query_text:
        return False
    best = memories[0]
    score = _memory_rank(best, query_text)
    numeric_score = score[0]
    overlap = score[1]
    return numeric_score >= 0.78 or overlap >= 2


def _format_tool_descriptions() -> str:
    if not TOOLS_SCHEMA:
        return ""
    lines = []
    max_tools = max(1, settings.prompt_tool_count_max)
    max_desc_chars = max(20, settings.prompt_tool_desc_max_chars)
    for tool in TOOLS_SCHEMA[:max_tools]:
        func = tool.get("function", {})
        name = func.get("name", "?")
        desc = str(func.get("description", ""))
        if len(desc) > max_desc_chars:
            desc = desc[:max_desc_chars] + "..."
        lines.append(f"- `{name}`: {desc}")
    return "\n".join(lines)
