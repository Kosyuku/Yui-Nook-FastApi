"""Consciousness loop with configurable model + prompt fallbacks."""
from __future__ import annotations

import asyncio
import hashlib
import json
import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import ai_runtime
import database as db
from config import settings
from models import EchoAdapter

logger = logging.getLogger(__name__)

_loop_task: Optional[asyncio.Task] = None
_status = {
    "running": False,
    "last_run_at": None,
    "total_wakes": 0,
    "last_proactive_check_at": None,
    "next_run_at": None,
}

DAILY_LOOP_REPORT_KEY_PREFIX = "daily_loop_report"
DAILY_LOOP_DIARY_DIGEST_KEY_PREFIX = "daily_loop_diary_digest"
DAILY_LOOP_MEMORY_CANDIDATE_DIGESTS_KEY_PREFIX = "daily_loop_memory_candidate_digests"


def get_status() -> dict:
    return _status.copy()


async def _collect_consciousness_text(messages: list[dict[str, str]], *, temperature: float = 0.3) -> str:
    adapter, _, kwargs = await ai_runtime.resolve_adapter_for_slot(
        "consciousness",
        tools=[],
        tool_choice="none",
    )
    if adapter is None or isinstance(adapter, EchoAdapter):
        return ""
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=temperature, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return "".join(parts).strip()


async def run_once(agent_id: str | None = None):
    resolved_agent_id = await db.resolve_agent_id(agent_id=agent_id, purpose="consciousness_run_once")
    logger.info("Consciousness loop: manual trigger for agent %s", resolved_agent_id)
    _status["last_run_at"] = datetime.now().astimezone().isoformat()
    _status["total_wakes"] = _status.get("total_wakes", 0) + 1

    await phase1_housekeeping()
    await phase2_produce_snapshot(agent_id=resolved_agent_id)

    logger.info("Consciousness loop: finished")


async def phase1_housekeeping():
    logger.info("  Phase 1: housekeeping")

    sessions = await db.list_sessions()
    for session in sessions[:5]:
        messages = await db.get_messages(session["id"], limit=50)
        if len(messages) > 20:
            old_msgs = messages[:15]
            summary_text = _quick_summarize(old_msgs)
            if summary_text:
                await db.add_context_summary(
                    session_id=session["id"],
                    summary=summary_text,
                    msg_start=old_msgs[0]["id"] if old_msgs else "",
                    msg_end=old_msgs[-1]["id"] if old_msgs else "",
                )
                logger.info("  -> summarized session %s (%s messages)", session["id"], len(old_msgs))

    stats = await db.get_memory_stats()
    logger.info("  -> memory stats: %s", stats)


def _quick_summarize(messages: list[dict]) -> str:
    lines = []
    for msg in messages:
        role = "user" if msg["role"] == "user" else "ai"
        content = str(msg["content"])[:80]
        lines.append(f"[{role}] {content}")
    return "Conversation summary:\n" + "\n".join(lines)


def _safe_importance(val: Any) -> int:
    try:
        res = int(val)
        return res
    except (TypeError, ValueError):
        return 3


def _extract_json_object(text: str) -> dict[str, Any]:
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


def _json_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    return str(value or "").strip().lower() in {"1", "true", "yes", "y", "on"}


def _daily_loop_report_key(agent_id: str) -> str:
    return f"{DAILY_LOOP_REPORT_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _daily_loop_diary_digest_key(agent_id: str) -> str:
    return f"{DAILY_LOOP_DIARY_DIGEST_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _daily_loop_memory_candidate_digests_key(agent_id: str) -> str:
    return f"{DAILY_LOOP_MEMORY_CANDIDATE_DIGESTS_KEY_PREFIX}:{db.normalize_agent_id(agent_id)}"


def _daily_loop_digest(value: Any) -> str:
    text = json.dumps(value, ensure_ascii=False, sort_keys=True) if isinstance(value, (dict, list)) else str(value or "")
    return hashlib.sha1(text.strip().encode("utf-8")).hexdigest()


async def _load_digest_list(key: str) -> list[str]:
    row = await db.get_setting(key)
    if not row or not row.get("value"):
        return []
    try:
        data = json.loads(row["value"])
    except Exception:
        return []
    if not isinstance(data, list):
        return []
    return [str(item) for item in data if str(item or "").strip()]


def _compact_memory_for_daily_loop(memory: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": memory.get("id"),
        "content": str(memory.get("content") or "")[:600],
        "category": memory.get("category") or "",
        "importance": _safe_importance(memory.get("importance")),
        "temperature": memory.get("temperature") or 0,
        "last_touched_at": memory.get("last_touched_at") or "",
        "updated_at": memory.get("updated_at") or "",
    }


def _normalize_daily_loop_report(data: dict[str, Any], *, agent_id: str, counts: dict[str, int], status: str) -> dict[str, Any]:
    memory_candidates = data.get("memory_candidates")
    if not isinstance(memory_candidates, list):
        memory_candidates = []
    report = {
        "agent_id": db.normalize_agent_id(agent_id),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": status,
        "summary": str(data.get("summary") or "").strip(),
        "activity_digest": str(data.get("activity_digest") or "").strip(),
        "state_digest": str(data.get("state_digest") or "").strip(),
        "should_write_diary": _json_bool(data.get("should_write_diary")),
        "diary_candidate": str(data.get("diary_candidate") or "").strip(),
        "should_write_memory": _json_bool(data.get("should_write_memory")),
        "memory_candidates": [
            item for item in memory_candidates
            if isinstance(item, dict) and str(item.get("content") or "").strip()
        ][:8],
        "reason": str(data.get("reason") or "").strip(),
        "counts": counts,
    }
    if not report["summary"]:
        report["summary"] = "本轮日循环没有生成可用总结。"
    if status != "ok" and not report["reason"]:
        report["reason"] = "daily loop model unavailable or returned non-json"
    return report


async def get_latest_daily_loop_report(agent_id: str | None = None) -> dict[str, Any] | None:
    resolved_agent_id = await db.resolve_agent_id(agent_id=agent_id, purpose="daily_loop_latest")
    row = await db.get_setting(_daily_loop_report_key(resolved_agent_id))
    if not row or not row.get("value"):
        return None
    try:
        payload = json.loads(row["value"])
    except Exception:
        return None
    return payload if isinstance(payload, dict) else None


async def run_daily_loop_once(agent_id: str | None = None) -> dict[str, Any]:
    """Run one low-frequency daily organization pass.

    This first version only produces a report/candidate list. It does not write
    diary entries or long-term memories directly.
    """
    resolved_agent_id = await db.resolve_agent_id(agent_id=agent_id, purpose="daily_loop_once")
    logger.info("daily_loop: start for agent %s", resolved_agent_id)

    state = await db.get_companion_state(agent_id=resolved_agent_id)
    activity_events = await db.get_recent_activity(hours=24, limit=20)
    relevant_activity_events = await db.get_recent_activity(hours=24, limit=20, only_relevant=True)
    memories = await db.list_memories(
        limit=20,
        agent_id=resolved_agent_id,
        sort_by="temperature",
        order="desc",
        include_cross_agent=False,
    )
    proactive_messages = await db.list_proactive_messages(limit=10, agent_id=resolved_agent_id)

    counts = {
        "activity_events": len(activity_events),
        "relevant_activity_events": len(relevant_activity_events),
        "memories": len(memories),
        "proactive_messages": len(proactive_messages),
    }
    logger.info(
        "daily_loop: context loaded activity=%s memories=%s proactive=%s",
        counts["activity_events"],
        counts["memories"],
        counts["proactive_messages"],
    )

    system_prompt = (
        "You are the lightweight daily loop organizer for an AI companion.\n"
        "Produce a compact report for later diary/memory decisions.\n"
        "Return ONLY JSON with keys: summary, activity_digest, state_digest, "
        "should_write_diary, diary_candidate, should_write_memory, memory_candidates, reason.\n"
        "Rules:\n"
        "- Write all user-facing report fields in Chinese.\n"
        "- Do not write diary entries now.\n"
        "- Do not write memories now.\n"
        "- Only mark memory_candidates for stable preferences, user facts, relationship milestones, or key events.\n"
        "- Do not mark one-off chatter, temporary mood, or low-value app activity as memory.\n"
        "- Keep the report short and useful."
    )
    payload = {
        "agent_id": resolved_agent_id,
        "companion_state": {
            "impression": state.get("impression", ""),
            "relationship_progress": state.get("relationship_progress", ""),
            "likes_summary": state.get("likes_summary", ""),
            "open_loops_summary": state.get("open_loops_summary", ""),
            "presence_gap": state.get("presence_gap", ""),
        },
        "recent_activity_block": db.format_recent_activity_block(relevant_activity_events or activity_events),
        "activity_gate_summary": {
            "total_recent": len(activity_events),
            "relevant_recent": len(relevant_activity_events),
            "policy": "Use gate-relevant events first; fallback to all recent events only when no gate-relevant event exists.",
        },
        "high_temperature_memories": [_compact_memory_for_daily_loop(item) for item in memories[:12]],
        "recent_proactive_messages": [
            {
                "content": item.get("content") or "",
                "reason_type": item.get("reason_type") or item.get("trigger_reason") or "",
                "created_at": item.get("created_at") or "",
            }
            for item in proactive_messages[:8]
        ],
    }
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
    ]

    status = "ok"
    try:
        text = await _collect_consciousness_text(messages, temperature=0.1)
        data = _extract_json_object(text)
        if not data:
            status = "fallback"
            data = {
                "summary": "日循环模型没有返回可解析 JSON，已保留上下文计数。",
                "reason": "non_json_response",
            }
            logger.warning("daily_loop: model returned non-json")
    except Exception as exc:
        status = "fallback"
        data = {
            "summary": "日循环模型调用失败，未推进写 diary/memory。",
            "reason": str(exc),
        }
        logger.warning("daily_loop: model failed: %s", exc)

    report = _normalize_daily_loop_report(data, agent_id=resolved_agent_id, counts=counts, status=status)
    report["draft_writes"] = await _apply_daily_loop_second_stage(report)
    await db.set_setting(_daily_loop_report_key(resolved_agent_id), json.dumps(report, ensure_ascii=False))
    logger.info(
        "daily_loop: saved report status=%s diary=%s memory=%s",
        report["status"],
        report["should_write_diary"],
        report["should_write_memory"],
    )
    return report


async def _apply_daily_loop_second_stage(report: dict[str, Any]) -> dict[str, Any]:
    """Persist safe daily-loop drafts without writing formal long-term memories."""
    agent_id = db.normalize_agent_id(report.get("agent_id"))
    writes: dict[str, Any] = {
        "diary": None,
        "memory_candidates": [],
        "skipped": [],
    }

    diary_candidate = str(report.get("diary_candidate") or "").strip()
    if report.get("should_write_diary") and diary_candidate:
        digest = _daily_loop_digest(diary_candidate)
        digest_key = _daily_loop_diary_digest_key(agent_id)
        prev = await db.get_setting(digest_key)
        if prev and str(prev.get("value") or "") == digest:
            writes["skipped"].append("duplicate_diary_candidate")
        else:
            title_date = datetime.now().astimezone().strftime("%Y-%m-%d")
            entry = await db.add_diary(
                diary_candidate,
                agent_id=agent_id,
                title=f"日循环草稿 {title_date}",
                tags="daily_loop,draft",
                visibility="private",
                source_agent_id=agent_id,
            )
            await db.set_setting(digest_key, digest)
            writes["diary"] = {
                "id": entry.get("id"),
                "title": entry.get("title"),
                "visibility": entry.get("visibility"),
                "tags": entry.get("tags"),
            }

    candidates = report.get("memory_candidates")
    if isinstance(candidates, list) and candidates:
        digest_key = _daily_loop_memory_candidate_digests_key(agent_id)
        seen = await _load_digest_list(digest_key)
        seen_set = set(seen)
        for candidate in candidates[:8]:
            if not isinstance(candidate, dict):
                continue
            content = str(candidate.get("content") or "").strip()
            if not content:
                continue
            digest = _daily_loop_digest(candidate)
            if digest in seen_set:
                writes["skipped"].append("duplicate_memory_candidate")
                continue
            log = await db.add_cot_log(
                f"daily_loop:{agent_id}",
                agent_id=agent_id,
                source="daily_loop",
                log_type="memory_candidate",
                title="记忆候选",
                summary=content,
                content=json.dumps(candidate, ensure_ascii=False),
                status="candidate",
                ttl_days=30,
            )
            writes["memory_candidates"].append({
                "id": log.get("id"),
                "content": content[:240],
            })
            seen.append(digest)
            seen_set.add(digest)
        await db.set_setting(digest_key, json.dumps(seen[-80:], ensure_ascii=False))

    return writes

async def phase2_produce_snapshot(agent_id: str | None = None):
    resolved_agent_id = await db.resolve_agent_id(agent_id=agent_id, purpose="phase2_produce_snapshot")
    logger.info("  Phase 2: produce snapshot for agent %s", resolved_agent_id)
    state = await db.get_companion_state(agent_id=resolved_agent_id)

    # a. high_importance_memories
    memories = await db.list_memories(limit=200, agent_id=resolved_agent_id)
    high_importance_memories = [
        {
            "id": m["id"],
            "content": m["content"],
            "category": m.get("category", ""),
            "importance": _safe_importance(m.get("importance")),
            "created_at": m.get("created_at", "")
        }
        for m in memories if _safe_importance(m.get("importance")) >= 4
    ]

    # b. open_loops_summary
    open_loops = state.get("open_loops", [])
    open_loops_summary = ""
    if open_loops:
        prompt_messages = [
            {
                "role": "system",
                "content": (
                    "You are a summarization assistant. Summarize the following unresolved thoughts "
                    "(open loops) of the AI companion into a short, cohesive paragraph. Focus on the core topics."
                )
            },
            {"role": "user", "content": "\n".join(open_loops)}
        ]
        open_loops_summary = await _collect_consciousness_text(prompt_messages)

    # c. presence_gap
    presence_gap = ""
    last_activity = await db.get_recent_activity_time()
    if last_activity:
        try:
            last_time = datetime.fromisoformat(last_activity)
            if last_time.tzinfo is None:
                last_time = last_time.replace(tzinfo=datetime.now().astimezone().tzinfo)
            hours_ago = (datetime.now(last_time.tzinfo) - last_time).total_seconds() / 3600
            if hours_ago > 24:
                # 简单记录离开状态
                presence_gap = f"用户已经有 {hours_ago:.1f} 小时没有新的互动。"
        except Exception as e:
            logger.warning("Failed to calculate presence_gap: %s", e)

    # d. background_activity_candidates
    background_activity_candidates = await db.get_recent_activity(hours=6, limit=8, only_relevant=True)
    logger.info("  -> recent activity events loaded: %s", len(background_activity_candidates))

    # e. write back
    await db.set_consciousness_snapshot(
        agent_id=resolved_agent_id,
        open_loops_summary=open_loops_summary,
        open_loops_count=len(open_loops),
        high_importance_memories=high_importance_memories,
        high_importance_memory_count=len(high_importance_memories),
        background_activity_candidates=background_activity_candidates,
        presence_gap=presence_gap,
    )

    interval_hours = getattr(settings, "consciousness_interval_hours", 6.0)
    _status["next_run_at"] = (datetime.now().astimezone() + timedelta(hours=interval_hours)).isoformat()
    logger.info("  -> snapshot produced and saved to db.")


async def _loop():
    interval = getattr(settings, "consciousness_interval_hours", 6.0) * 3600
    _status["running"] = True
    logger.info("Consciousness loop started, interval=%.1f hours", interval / 3600)
    while _status["running"]:
        try:
            await asyncio.sleep(interval)
            await run_once()
        except asyncio.CancelledError:
            break
        except Exception:
            logger.exception("Consciousness loop error")
            await asyncio.sleep(60)


def start_loop():
    global _loop_task
    if not getattr(settings, "consciousness_enabled", True):
        logger.info("Consciousness loop disabled")
        return
    if _loop_task and not _loop_task.done():
        logger.warning("Consciousness loop already running")
        return
    _loop_task = asyncio.create_task(_loop())


def stop_loop():
    global _loop_task
    _status["running"] = False
    if _loop_task:
        _loop_task.cancel()
        _loop_task = None
    logger.info("Consciousness loop stopped")
