import json
import logging
from dataclasses import dataclass, asdict
from datetime import datetime
import copy

import database as db
from config import settings
import ai_runtime

logger = logging.getLogger(__name__)

@dataclass
class ReasonContext:
    topic: str
    detail: str
    source: str
    source_id: str
    timestamp: str


@dataclass
class ProactiveCheckInput:
    agent_id: str
    hours_since_last_user_message: float
    hours_since_last_proactive: float
    current_local_hour: int
    open_loops_summary: str
    open_loops_count: int
    high_importance_memories: list[dict]
    high_importance_memory_count: int
    background_activity_candidates: list[dict]
    presence_gap: str
    consciousness_updated_at: str
    agent_proactive_style: str
    current_activity: str = "unknown"


@dataclass
class ProactiveCheckResult:
    should_output: bool
    output_type: str
    reason_type: str
    reason_context: ReasonContext | None
    draft_message: str
    agent_id: str
    created_at: str


def _is_active_hour(hour: int, start: int, end: int) -> bool:
    if start < end:
        return start <= hour < end
    else:
        return hour >= start or hour < end


def _is_template_message(text: str) -> bool:
    templates = [
        "好久不见", "你在吗", "最近怎么样", "想你了", "在吗", "有空吗",
        "hope everything is okay", "noticed it's been a while", 
        "just checking in", "are you there", "how have you been"
    ]
    lower_text = text.lower()
    for temp in templates:
        if temp in lower_text:
            return True
    return False


async def _generate_draft_message(reason_context: ReasonContext) -> str:
    from consciousness import _collect_consciousness_text
    
    prompt = await ai_runtime.resolve_prompt("proactive") or ""
    
    if reason_context.source == "presence_gap":
        system_instruction = (
            f"{prompt}\n\n"
            "You are reaching out proactively because the user has been away for a while. "
            "CRITICAL RULES: \n"
            "1. You MUST generate the message ONLY in Chinese.\n"
            "2. Keep it extremely brief, natural, and human-like. NO customer-service tone.\n"
            "3. DO NOT use generic template greetings (e.g., 不要说'又见面了'、'最近好吗'、'好久不见').\n"
            "4. Express a tiny bit of natural care or share a random tiny thought."
        )
    else:
        system_instruction = (
            f"{prompt}\n\n"
            "You are reaching out proactively to the user. "
            "You MUST explicitly reference the topic and detail provided. "
            "You MUST generate the message in Chinese. "
            "DO NOT use generic greetings like 'are you there'."
        )

    prompt_messages = [
        {
            "role": "system",
            "content": system_instruction
        },
        {
            "role": "user",
            "content": f"Topic: {reason_context.topic}\nDetail: {reason_context.detail}\n\nPlease generate."
        }
    ]
    try:
        draft = await _collect_consciousness_text(prompt_messages, temperature=0.6)
        if not draft:
            return ""
        if _is_template_message(draft):
            logger.warning("Draft message rejected as template: %s", draft)
            return ""
        return draft
    except Exception as e:
        logger.warning("Failed to generate draft message: %s", e)
        return ""


async def run_proactive_check(agent_id: str) -> ProactiveCheckResult:
    now = datetime.now().astimezone()
    state = await db.get_companion_state(agent_id)
    style = await db.get_agent_proactive_style(agent_id)
    
    # 1. 组装 Input
    last_user_time = await db.get_recent_activity_time()
    hours_since_user = 999.0
    if last_user_time:
        try:
            last_dt = datetime.fromisoformat(last_user_time)
            if last_dt.tzinfo is None:
                last_dt = last_dt.replace(tzinfo=now.tzinfo)
            hours_since_user = (now - last_dt).total_seconds() / 3600
        except Exception:
            pass

    last_proactive = await db.get_last_proactive_time(agent_id=agent_id, output_type="direct_message")
    hours_since_proactive = 999.0
    if last_proactive:
        try:
            p_dt = datetime.fromisoformat(last_proactive)
            if p_dt.tzinfo is None:
                p_dt = p_dt.replace(tzinfo=now.tzinfo)
            hours_since_proactive = (now - p_dt).total_seconds() / 3600
        except Exception:
            pass

    check_input = ProactiveCheckInput(
        agent_id=agent_id,
        hours_since_last_user_message=hours_since_user,
        hours_since_last_proactive=hours_since_proactive,
        current_local_hour=now.hour,
        open_loops_summary=state.get("open_loops_summary", ""),
        open_loops_count=state.get("open_loops_count", 0),
        high_importance_memories=state.get("high_importance_memories", []),
        high_importance_memory_count=state.get("high_importance_memory_count", 0),
        background_activity_candidates=state.get("background_activity_candidates", []),
        presence_gap=state.get("presence_gap", ""),
        consciousness_updated_at=state.get("consciousness_updated_at", ""),
        agent_proactive_style=style,
    )

    # 2. 判断硬门槛
    global_cooldown = getattr(settings, "proactive_message_cooldown_hours", 2.0)
    if not _is_active_hour(
        check_input.current_local_hour, 
        getattr(settings, "proactive_active_start_hour", 8),
        getattr(settings, "proactive_active_end_hour", 1)
    ):
        logger.info("proactive_check: outside active hours")
        return _reject(agent_id)
        
    if check_input.hours_since_last_user_message < 0.5:
        logger.info("proactive_check: user active recently")
        return _reject(agent_id)
        
    if check_input.hours_since_last_proactive < global_cooldown:
        logger.info("proactive_check: global cooldown")
        return _reject(agent_id)

    # 3. 风格修正
    req_user_silence = 0.5
    req_cooldown = global_cooldown
    if style == "restrained":
        req_user_silence = 1.0
        req_cooldown = max(global_cooldown, 3.0)
    elif style == "clingy":
        req_cooldown = min(global_cooldown, 1.0)
        
    if check_input.hours_since_last_user_message < req_user_silence:
        logger.info("proactive_check: style %s rejected by user silence", style)
        return _reject(agent_id)
    if check_input.hours_since_last_proactive < req_cooldown:
        logger.info("proactive_check: style %s rejected by cooldown", style)
        return _reject(agent_id)

    # 4. 内容门槛
    context = None
    reason_type = ""
    # 优先用 presence_gap (只是作为一种话题切入，但本轮 presence_gap 本身不作为独立消息抛出，如果它确实有值，这里可转换为 followup，但根据修正1，这里优先看 open_loops)
    if check_input.open_loops_count > 0 and check_input.open_loops_summary:
        context = ReasonContext(
            topic="Pending Thoughts",
            detail=check_input.open_loops_summary,
            source="open_loop",
            source_id="",
            timestamp=check_input.consciousness_updated_at
        )
        reason_type = "open_loop_followup"
    elif check_input.high_importance_memory_count > 0:
        mem = check_input.high_importance_memories[0]
        context = ReasonContext(
            topic="Important Memory",
            detail=mem.get("content", ""),
            source="memory",
            source_id=mem.get("id", ""),
            timestamp=check_input.consciousness_updated_at
        )
        reason_type = "important_memory_followup"
    elif check_input.presence_gap:
        context = ReasonContext(
            topic="User Absence",
            detail=check_input.presence_gap,
            source="presence_gap",
            source_id="",
            timestamp=check_input.consciousness_updated_at
        )
        reason_type = "presence_gap_check"
    
    # note: background_activity_candidates 本轮跳过，不在 direct_message 内直接使用
    
    if not context:
        logger.info("proactive_check: no content available to discuss")
        return _reject(agent_id)

    # 5. 生成 Draft
    draft = await _generate_draft_message(context)
    if not draft:
        logger.info("proactive_check: failed to generate draft")
        return _reject(agent_id)
        
    # 6. 写库
    ctx_json = json.dumps(asdict(context), ensure_ascii=False)
    await db.add_proactive_message(
        content=draft,
        trigger_reason=reason_type,
        agent_id=agent_id,
        output_type="direct_message",
        reason_type=reason_type,
        reason_context=ctx_json,
        source_snapshot_at=check_input.consciousness_updated_at
    )
    
    # 更新 consciousness status
    from consciousness import _status
    _status["last_proactive_check_at"] = now.isoformat()
    
    return ProactiveCheckResult(
        should_output=True,
        output_type="direct_message",
        reason_type=reason_type,
        reason_context=context,
        draft_message=draft,
        agent_id=agent_id,
        created_at=now.isoformat()
    )


def _reject(agent_id: str) -> ProactiveCheckResult:
    return ProactiveCheckResult(
        should_output=False,
        output_type="",
        reason_type="",
        reason_context=None,
        draft_message="",
        agent_id=agent_id,
        created_at=datetime.now().astimezone().isoformat()
    )
