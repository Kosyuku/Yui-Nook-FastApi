import json
import logging
import re
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from difflib import SequenceMatcher

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
    topic_key: str = ""


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


@dataclass
class ProactiveLightReport:
    should_proactive: bool
    reason: str
    message_hint: str
    selected_source: str


def _is_active_hour(hour: int, start: int, end: int) -> bool:
    if start < end:
        return start <= hour < end
    else:
        return hour >= start or hour < end


def _is_template_message(text: str) -> bool:
    templates = [
        "好久不见",
        "你在吗",
        "最近怎么样",
        "最近好吗",
        "在吗",
        "有空吗",
        "还好吗",
        "一切都好吗",
        "hope everything is okay",
        "noticed it's been a while",
        "just checking in",
        "are you there",
        "how have you been",
        "how are you doing",
    ]
    lower_text = text.lower()
    for temp in templates:
        if temp in lower_text:
            return True
    return False


def _looks_like_model_failure(text: str) -> bool:
    normalized = str(text or "").strip().lower()
    if not normalized:
        return True
    failure_markers = (
        "model call failed",
        "request timed out",
        "connection failed",
        "missing api key",
        "provider error",
        "模型调用失败",
        "请求超时",
        "连接失败",
        "未知错误",
    )
    return any(marker in normalized for marker in failure_markers)


def _topic_key(text: str) -> str:
    normalized = str(text or "").lower()
    normalized = re.sub(r"https?://\S+", " ", normalized)
    normalized = re.sub(r"[^\w\u4e00-\u9fff]+", " ", normalized)
    replacements = {
        "\u4ee5\u540e": "",
        "\u53ef\u4ee5": "",
        "\u5e94\u8be5": "",
        "\u8bb0\u5f97": "",
        "\u7528\u6237": "",
        "\u5979": "",
        "\u4ed6": "",
        "\u6211": "",
        "\u4f60": "",
        "\u53eb": "\u79f0\u547c",
        "\u558a": "\u79f0\u547c",
    }
    for old, new in replacements.items():
        normalized = normalized.replace(old, new)
    stop_words = {"the", "and", "that", "this", "with", "about", "memory", "important"}
    parts = [p for p in normalized.split() if p and p not in stop_words]
    compact = "".join(parts)
    return compact[:80]


def _topic_similar(left: str, right: str) -> bool:
    left_key = _topic_key(left)
    right_key = _topic_key(right)
    if not left_key or not right_key:
        return False
    if left_key in right_key or right_key in left_key:
        return min(len(left_key), len(right_key)) >= 4
    return SequenceMatcher(None, left_key, right_key).ratio() >= 0.72


def _parse_dt(value: str, fallback_tz=None) -> datetime | None:
    try:
        dt = datetime.fromisoformat(str(value or ""))
        if dt.tzinfo is None and fallback_tz is not None:
            dt = dt.replace(tzinfo=fallback_tz)
        return dt
    except Exception:
        return None


def _proactive_source_memory_id(message: dict) -> str:
    direct = str(message.get("source_memory_id") or "").strip()
    if direct:
        return direct
    try:
        context = json.loads(str(message.get("reason_context") or "{}"))
        if str(context.get("source") or "") == "memory":
            return str(context.get("source_id") or "").strip()
    except Exception:
        return ""
    return ""


def _proactive_topic_key(message: dict) -> str:
    direct = str(message.get("topic_key") or message.get("similarity_key") or "").strip()
    if direct:
        return direct
    try:
        context = json.loads(str(message.get("reason_context") or "{}"))
        return _topic_key(f"{context.get('topic') or ''} {context.get('detail') or ''}")
    except Exception:
        return _topic_key(str(message.get("content") or ""))


def _memory_was_updated_after(memory: dict, proactive_message: dict, now: datetime) -> bool:
    memory_updated = _parse_dt(str(memory.get("updated_at") or memory.get("last_touched_at") or ""), now.tzinfo)
    used_at = _parse_dt(str(proactive_message.get("created_at") or ""), now.tzinfo)
    return bool(memory_updated and used_at and memory_updated > used_at)


async def _recent_proactive_usage(agent_id: str, limit: int = 100) -> list[dict]:
    return await db.list_proactive_messages(limit=limit, agent_id=agent_id)


async def _select_memory_for_proactive(check_input: ProactiveCheckInput, now: datetime) -> dict | None:
    memories = list(check_input.high_importance_memories or [])
    if not memories:
        return None
    recent = await _recent_proactive_usage(check_input.agent_id, limit=100)
    recent_memory_ids = [_proactive_source_memory_id(item) for item in recent[:20]]
    recent_memory_ids = [item for item in recent_memory_ids if item]
    recent_topic_keys = [_proactive_topic_key(item) for item in recent[:20]]
    recent_topic_keys = [item for item in recent_topic_keys if item]
    cooldown_start = now - timedelta(days=7)

    for memory in memories:
        memory_id = str(memory.get("id") or "").strip()
        detail = db.memory_display_content(memory) or db.memory_raw_content(memory) or str(memory.get("content") or "")
        topic_key = _topic_key(detail)
        if not memory_id or not detail:
            continue
        prior_for_memory = [item for item in recent if _proactive_source_memory_id(item) == memory_id]
        if memory_id in recent_memory_ids and not any(_memory_was_updated_after(memory, item, now) for item in prior_for_memory):
            continue
        if prior_for_memory and not any(_memory_was_updated_after(memory, item, now) for item in prior_for_memory):
            continue
        latest_prior = prior_for_memory[0] if prior_for_memory else None
        latest_prior_at = _parse_dt(str((latest_prior or {}).get("created_at") or ""), now.tzinfo)
        if latest_prior_at and latest_prior_at >= cooldown_start and not _memory_was_updated_after(memory, latest_prior, now):
            continue
        if any(_topic_similar(topic_key, recent_key) for recent_key in recent_topic_keys):
            continue
        selected = dict(memory)
        selected["_proactive_detail"] = detail
        selected["_proactive_topic_key"] = topic_key
        return selected
    return None


async def should_send_proactive_message(
    agent_id: str,
    source_memory_id: str,
    content: str,
    now: datetime,
    *,
    topic_key: str = "",
    memory: dict | None = None,
) -> bool:
    if not str(content or "").strip():
        return False
    recent = await _recent_proactive_usage(agent_id, limit=100)
    source_memory_id = str(source_memory_id or "").strip()
    topic_key = str(topic_key or _topic_key(content)).strip()
    cooldown_start = now - timedelta(days=7)
    recent_20_ids = [_proactive_source_memory_id(item) for item in recent[:20]]
    if source_memory_id and source_memory_id in recent_20_ids:
        recent_items = [item for item in recent[:20] if _proactive_source_memory_id(item) == source_memory_id]
        if not (memory and any(_memory_was_updated_after(memory, item, now) for item in recent_items)):
            logger.info("proactive_check: source memory rejected by recent consumption: %s", source_memory_id)
            return False
    for item in recent:
        used_memory_id = _proactive_source_memory_id(item)
        used_at = _parse_dt(str(item.get("created_at") or ""), now.tzinfo)
        if source_memory_id and used_memory_id == source_memory_id:
            if memory and _memory_was_updated_after(memory, item, now):
                continue
            logger.info("proactive_check: source memory already used: %s", source_memory_id)
            return False
        if source_memory_id and used_memory_id == source_memory_id and used_at and used_at >= cooldown_start:
            return False
        recent_key = _proactive_topic_key(item)
        if source_memory_id and used_memory_id == source_memory_id and memory and _memory_was_updated_after(memory, item, now):
            continue
        if topic_key and recent_key and _topic_similar(topic_key, recent_key):
            logger.info("proactive_check: topic rejected by similarity: %s", topic_key)
            return False
    return True


async def _build_check_input(agent_id: str, now: datetime | None = None) -> ProactiveCheckInput:
    now = now or datetime.now().astimezone()
    state = await db.get_companion_state(agent_id)
    style = await db.get_agent_proactive_style(agent_id)

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

    return ProactiveCheckInput(
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


async def _generate_draft_message(reason_context: ReasonContext) -> str:
    from consciousness import _collect_consciousness_text
    
    prompt = await ai_runtime.resolve_prompt("proactive") or ""
    
    if reason_context.source == "presence_gap":
        system_instruction = (
            f"{prompt}\n\n"
            "你要因为用户暂时没有新的互动而主动发一句话。\n"
            "硬规则：\n"
            "1. 只能写中文。\n"
            "2. 最多 28 个中文字符，像熟人随口一句，不要客服腔。\n"
            "3. 禁止模板问候：好久不见、你在吗、最近怎么样、最近好吗、在吗、希望你一切都好。\n"
            "4. 如果没有更具体上下文，只能给一句很短的自然关心或小念头，不要追问。"
        )
        user_content = (
            f"触发原因：用户离开间隔\n"
            f"上下文：{reason_context.detail}\n\n"
            "生成一句可直接发送的中文。"
        )
    else:
        system_instruction = (
            f"{prompt}\n\n"
            "You are reaching out proactively to the user. "
            "You MUST explicitly reference the topic and detail provided. "
            "You MUST generate the message in Chinese. "
            "DO NOT use generic greetings like 'are you there'."
        )
        user_content = f"Topic: {reason_context.topic}\nDetail: {reason_context.detail}\n\nPlease generate."

    prompt_messages = [
        {
            "role": "system",
            "content": system_instruction
        },
        {
            "role": "user",
            "content": user_content
        }
    ]
    try:
        draft = await _collect_consciousness_text(prompt_messages, temperature=0.6)
        if not draft:
            return ""
        if _looks_like_model_failure(draft):
            logger.warning("Draft message rejected as model failure: %s", draft)
            return ""
        if _is_template_message(draft):
            logger.warning("Draft message rejected as template: %s", draft)
            return ""
        return draft
    except Exception as e:
        logger.warning("Failed to generate draft message: %s", e)
        return ""


async def _build_context_candidates(check_input: ProactiveCheckInput, now: datetime) -> list[tuple[str, str, ReasonContext, dict | None]]:
    candidates: list[tuple[str, str, ReasonContext, dict | None]] = []
    if check_input.open_loops_count > 0 and check_input.open_loops_summary:
        candidates.append((
            "open_loop_followup",
            "open_loop",
            ReasonContext(
                topic="Pending Thoughts",
                detail=check_input.open_loops_summary,
                source="open_loop",
                source_id="",
                timestamp=check_input.consciousness_updated_at,
                topic_key=_topic_key(check_input.open_loops_summary),
            ),
            None,
        ))
    if check_input.high_importance_memory_count > 0 and check_input.high_importance_memories:
        mem = await _select_memory_for_proactive(check_input, now)
        if mem:
            candidates.append((
                "important_memory_followup",
                "memory",
                ReasonContext(
                    topic="Important Memory",
                    detail=mem.get("_proactive_detail", "") or mem.get("content", ""),
                    source="memory",
                    source_id=mem.get("id", ""),
                    timestamp=check_input.consciousness_updated_at,
                    topic_key=mem.get("_proactive_topic_key", "") or _topic_key(mem.get("content", "")),
                ),
                mem,
            ))
    if check_input.background_activity_candidates:
        events = check_input.background_activity_candidates[:3]
        candidates.append((
            "recent_activity_followup",
            "recent_activity",
            ReasonContext(
                topic="Recent Activity",
                detail=db.format_recent_activity_block(events),
                source="recent_activity",
                source_id=str(events[0].get("id", "")),
                timestamp=str(events[0].get("occurred_at") or events[0].get("created_at") or check_input.consciousness_updated_at),
                topic_key=_topic_key(db.format_recent_activity_block(events)),
            ),
            None,
        ))
    if check_input.presence_gap:
        candidates.append((
            "presence_gap_check",
            "presence_gap",
            ReasonContext(
                topic="User Absence",
                detail=check_input.presence_gap,
                source="presence_gap",
                source_id="",
                timestamp=check_input.consciousness_updated_at,
                topic_key=_topic_key(check_input.presence_gap),
            ),
            None,
        ))
    return candidates


def _extract_json_object(text: str) -> dict:
    raw = str(text or "").strip()
    if not raw:
        return {}
    if raw.startswith("```"):
        raw = raw.strip("`").strip()
        if raw.lower().startswith("json"):
            raw = raw[4:].strip()
    try:
        parsed = json.loads(raw)
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        pass
    start = raw.find("{")
    end = raw.rfind("}")
    if start >= 0 and end > start:
        try:
            parsed = json.loads(raw[start:end + 1])
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            return {}
    return {}


def _json_bool(value: object) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    text = str(value or "").strip().lower()
    return text in {"1", "true", "yes", "y", "on"}


async def _run_proactive_light_report(
    check_input: ProactiveCheckInput,
    candidates: list[tuple[str, str, ReasonContext, dict | None]],
) -> ProactiveLightReport | None:
    if not candidates:
        return ProactiveLightReport(False, "no usable context", "", "")

    candidate_payload = [
        {
            "reason_type": reason_type,
            "source": source,
            "topic": context.topic,
            "detail": context.detail[:1200],
            "timestamp": context.timestamp,
        }
        for reason_type, source, context, _memory in candidates
    ]
    system_prompt = (
        "You are the lightweight proactive gate for an AI companion.\n"
        "Decide whether the assistant should proactively send one short message now.\n"
        "Return ONLY JSON with keys: should_proactive, reason, message_hint, selected_source.\n"
        "Rules:\n"
        "- Be conservative. Do not speak just because an event exists.\n"
        "- Use recent activity only when it is emotionally/socially relevant or naturally followable.\n"
        "- Avoid spam, generic greetings, and repeated check-ins.\n"
        "- selected_source must be one of the provided candidate source values, or empty when false."
    )
    user_payload = {
        "agent_id": check_input.agent_id,
        "style": check_input.agent_proactive_style,
        "hours_since_last_user_message": check_input.hours_since_last_user_message,
        "hours_since_last_proactive": check_input.hours_since_last_proactive,
        "local_hour": check_input.current_local_hour,
        "candidates": candidate_payload,
    }
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False)},
    ]
    try:
        text = await ai_runtime.collect_text_response("consciousness", messages, temperature=0.1)
        data = _extract_json_object(text)
        if not data:
            logger.warning("proactive_gate: light report returned non-json: %s", text[:200])
            return None
        report = ProactiveLightReport(
            should_proactive=_json_bool(data.get("should_proactive")),
            reason=str(data.get("reason") or "").strip(),
            message_hint=str(data.get("message_hint") or "").strip(),
            selected_source=str(data.get("selected_source") or "").strip(),
        )
        logger.info(
            "proactive_gate: report should=%s source=%s reason=%s",
            report.should_proactive,
            report.selected_source,
            report.reason[:120],
        )
        return report
    except Exception as exc:
        logger.warning("proactive_gate: light report failed: %s", exc)
        return None


async def run_proactive_check(agent_id: str) -> ProactiveCheckResult:
    now = datetime.now().astimezone()
    check_input = await _build_check_input(agent_id, now)
    recent_activity_count = len(check_input.background_activity_candidates or [])
    logger.info("proactive_check: recent activity candidates=%s", recent_activity_count)

    # 2. 硬底线：不受风格影响，防止过度打扰
    base_cooldown = max(float(getattr(settings, "proactive_message_cooldown_hours", 2.0)), 0.0)
    hard_user_silence = 0.5
    hard_cooldown_floor = min(base_cooldown, 1.0) if base_cooldown > 0 else 0.0
    if not _is_active_hour(
        check_input.current_local_hour, 
        getattr(settings, "proactive_active_start_hour", 8),
        getattr(settings, "proactive_active_end_hour", 1)
    ):
        logger.info("proactive_check: outside active hours")
        return _reject(agent_id)
        
    if check_input.hours_since_last_user_message < hard_user_silence:
        logger.info("proactive_check: user active recently")
        return _reject(agent_id)
        
    if check_input.hours_since_last_proactive < hard_cooldown_floor:
        logger.info("proactive_check: anti-spam cooldown floor")
        return _reject(agent_id)

    # 3. 风格修正：硬底线之外，三档真的拉开差异
    req_user_silence = hard_user_silence
    req_cooldown = base_cooldown
    style = check_input.agent_proactive_style
    if style == "restrained":
        req_user_silence = 1.0
        req_cooldown = max(base_cooldown, 3.0)
    elif style == "clingy":
        req_cooldown = max(hard_cooldown_floor, min(base_cooldown, 1.0))

    if check_input.hours_since_last_user_message < req_user_silence:
        logger.info("proactive_check: style %s rejected by user silence", style)
        return _reject(agent_id)
    if check_input.hours_since_last_proactive < req_cooldown:
        logger.info("proactive_check: style %s rejected by cooldown", style)
        return _reject(agent_id)

    # 4. proactive_gate: build candidates, then let the lightweight model decide whether to speak.
    candidates = await _build_context_candidates(check_input, now)
    if not candidates:
        logger.info("proactive_check: no content available to discuss")
        return _reject(agent_id)

    report = await _run_proactive_light_report(check_input, candidates)
    if report and not report.should_proactive:
        logger.info("proactive_check: light gate rejected: %s", report.reason)
        return _reject(agent_id)

    reason_type, _, context, selected_memory = candidates[0]
    if report and report.selected_source:
        selected = next((item for item in candidates if item[1] == report.selected_source), None)
        if selected:
            reason_type, _, context, selected_memory = selected
    elif report is None:
        logger.info("proactive_check: light gate unavailable, using rule fallback")

    if report and report.message_hint:
        context = ReasonContext(
            topic=context.topic,
            detail=f"{context.detail}\n\nMessage hint: {report.message_hint}",
            source=context.source,
            source_id=context.source_id,
            timestamp=context.timestamp,
        )

    # note: recent activity is short-lived context only; it is not written to long-term memory here.
    draft = await _generate_draft_message(context)
    if not draft:
        logger.info("proactive_check: failed to generate draft")
        return _reject(agent_id)

    source_memory_id = context.source_id if context.source == "memory" else ""
    topic_key = context.topic_key or _topic_key(f"{context.topic} {context.detail}")
    if not await should_send_proactive_message(
        agent_id,
        source_memory_id,
        draft,
        now,
        topic_key=topic_key,
        memory=selected_memory,
    ):
        return _reject(agent_id)

    ctx_json = json.dumps(asdict(context), ensure_ascii=False)
    await db.add_proactive_message(
        content=draft,
        trigger_reason=reason_type,
        agent_id=agent_id,
        output_type="direct_message",
        reason_type=reason_type,
        reason_context=ctx_json,
        source_snapshot_at=check_input.consciousness_updated_at,
        source_memory_id=source_memory_id,
        topic_key=topic_key,
        similarity_key=topic_key,
    )

    from consciousness import _status
    _status["last_proactive_check_at"] = now.isoformat()

    return ProactiveCheckResult(
        should_output=True,
        output_type="direct_message",
        reason_type=reason_type,
        reason_context=context,
        draft_message=draft,
        agent_id=agent_id,
        created_at=now.isoformat(),
    )


async def inspect_proactive_check(agent_id: str, *, run_model: bool = False) -> dict:
    """Run the proactive gate in dry-run mode without creating a proactive message."""
    now = datetime.now().astimezone()
    check_input = await _build_check_input(agent_id, now)
    recent_activity_count = len(check_input.background_activity_candidates or [])
    logger.info("proactive_inspect: recent activity candidates=%s", recent_activity_count)

    base_cooldown = max(float(getattr(settings, "proactive_message_cooldown_hours", 2.0)), 0.0)
    hard_user_silence = 0.5
    hard_cooldown_floor = min(base_cooldown, 1.0) if base_cooldown > 0 else 0.0
    hard_reject_reason = ""

    if not _is_active_hour(
        check_input.current_local_hour,
        getattr(settings, "proactive_active_start_hour", 8),
        getattr(settings, "proactive_active_end_hour", 1),
    ):
        hard_reject_reason = "outside active hours"
    elif check_input.hours_since_last_user_message < hard_user_silence:
        hard_reject_reason = "user active recently"
    elif check_input.hours_since_last_proactive < hard_cooldown_floor:
        hard_reject_reason = "anti-spam cooldown floor"

    style_reject_reason = ""
    req_user_silence = hard_user_silence
    req_cooldown = base_cooldown
    if check_input.agent_proactive_style == "restrained":
        req_user_silence = 1.0
        req_cooldown = max(base_cooldown, 3.0)
    elif check_input.agent_proactive_style == "clingy":
        req_cooldown = max(hard_cooldown_floor, min(base_cooldown, 1.0))

    if not hard_reject_reason:
        if check_input.hours_since_last_user_message < req_user_silence:
            style_reject_reason = f"style {check_input.agent_proactive_style} rejected by user silence"
        elif check_input.hours_since_last_proactive < req_cooldown:
            style_reject_reason = f"style {check_input.agent_proactive_style} rejected by cooldown"

    candidates = await _build_context_candidates(check_input, now)
    report = None
    if run_model and not hard_reject_reason and not style_reject_reason and candidates:
        report = await _run_proactive_light_report(check_input, candidates)

    selected = None
    if report and report.selected_source:
        selected = next((item for item in candidates if item[1] == report.selected_source), None)
    if selected is None and candidates:
        selected = candidates[0]

    return {
        "agent_id": agent_id,
        "created_at": now.isoformat(),
        "check_input": asdict(check_input),
        "candidate_count": len(candidates),
        "candidates": [
            {
                "reason_type": reason_type,
                "source": source,
                "context": asdict(context),
            }
            for reason_type, source, context, _memory in candidates
        ],
        "hard_reject_reason": hard_reject_reason,
        "style_reject_reason": style_reject_reason,
        "light_report": asdict(report) if report else None,
        "light_report_skipped": bool(not run_model),
        "selected": {
            "reason_type": selected[0],
            "source": selected[1],
            "context": asdict(selected[2]),
        } if selected else None,
        "would_send": bool(
            not hard_reject_reason
            and not style_reject_reason
            and candidates
            and (report is None or report.should_proactive)
        ),
    }

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
