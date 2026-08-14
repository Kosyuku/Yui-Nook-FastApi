"""Model usage and prompt-cache telemetry recorder."""
from __future__ import annotations

import json
import logging
from typing import Any

import database as db

TABLE_NAME = "model_usage_events"
logger = logging.getLogger(__name__)


def _as_dict(value: Any) -> dict[str, Any]:
    if value is None:
        return {}
    if isinstance(value, dict):
        return value
    if hasattr(value, "model_dump"):
        try:
            return value.model_dump()
        except Exception:
            return {}
    if hasattr(value, "dict"):
        try:
            return value.dict()
        except Exception:
            return {}
    return {}


def _as_int(value: Any) -> int:
    try:
        if value is None or value == "":
            return 0
        return int(value)
    except Exception:
        return 0


def _json_text(value: Any) -> str:
    try:
        return json.dumps(value, ensure_ascii=False)
    except Exception:
        return "{}"


def _usage_payload(raw_usage: dict[str, Any] | None) -> dict[str, Any]:
    raw = _as_dict(raw_usage)
    nested = _as_dict(raw.get("usage"))
    return nested or raw


def parse_model_usage(raw_usage: dict[str, Any] | None) -> dict[str, Any]:
    usage = _usage_payload(raw_usage)
    prompt_tokens = _as_int(usage.get("prompt_tokens"))
    completion_tokens = _as_int(usage.get("completion_tokens"))

    if prompt_tokens <= 0:
        prompt_tokens = _as_int(usage.get("input_tokens"))
    if completion_tokens <= 0:
        completion_tokens = _as_int(usage.get("output_tokens"))

    total_tokens = _as_int(usage.get("total_tokens"))
    if total_tokens <= 0:
        total_tokens = prompt_tokens + completion_tokens

    prompt_details = _as_dict(usage.get("prompt_tokens_details"))
    input_details = _as_dict(usage.get("input_tokens_details"))
    cached_tokens = _as_int(
        prompt_details.get("cached_tokens")
        or input_details.get("cached_tokens")
        or usage.get("cached_tokens")
        # Claude Code 的 stream-json 用 Anthropic 原生键名
        or usage.get("cache_read_input_tokens")
    )

    # CC 的 input_tokens 不含缓存部分（一次 6 + 缓存 17570），直接算命中率会
    # 得到 >100%。缓存读取本质上也是 prompt，补进去才能和其他 provider 可比。
    if usage.get("cache_read_input_tokens") is not None and cached_tokens > prompt_tokens:
        prompt_tokens += cached_tokens
        if total_tokens < prompt_tokens + completion_tokens:
            total_tokens = prompt_tokens + completion_tokens

    cache_hit_ratio = (cached_tokens / prompt_tokens) if prompt_tokens > 0 else 0.0

    return {
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": total_tokens,
        "cached_tokens": cached_tokens,
        "cache_hit_ratio": cache_hit_ratio,
    }


async def record_model_usage(
    *,
    agent_id: str = "",
    session_id: str = "",
    rp_room_id: str = "",
    mode: str,
    provider: str = "",
    model: str = "",
    built_prompt_debug: dict | None = None,
    raw_usage: dict | None = None,
) -> dict[str, Any] | None:
    try:
        raw = _as_dict(raw_usage)
        if not raw or str(raw.get("status") or "").lower() == "not available":
            return None

        parsed = parse_model_usage(raw)
        debug = _as_dict(built_prompt_debug)
        block_order = debug.get("block_order") if isinstance(debug.get("block_order"), list) else []
        payload = {
            "id": db._new_id(),
            "agent_id": db.normalize_agent_id(agent_id) if agent_id else "",
            "session_id": str(session_id or ""),
            "rp_room_id": str(rp_room_id or ""),
            "mode": "rp" if str(mode or "").lower() == "rp" else "chat",
            "provider": str(provider or ""),
            "model": str(model or ""),
            "prompt_builder_version": str(debug.get("prompt_builder_version") or ""),
            "fixed_block_hash": str(debug.get("fixed_block_hash") or ""),
            "block_order": block_order,
            "prompt_tokens": parsed["prompt_tokens"],
            "completion_tokens": parsed["completion_tokens"],
            "total_tokens": parsed["total_tokens"],
            "cached_tokens": parsed["cached_tokens"],
            "cache_hit_ratio": parsed["cache_hit_ratio"],
            "raw_usage": raw,
            "created_at": db._now(),
        }

        if db._use_supabase_data():
            await db._supabase_insert_verified(TABLE_NAME, payload)
        else:
            conn = await db.get_db()
            await conn.execute(
                """
                INSERT INTO model_usage_events
                (id, agent_id, session_id, rp_room_id, mode, provider, model,
                 prompt_builder_version, fixed_block_hash, block_order,
                 prompt_tokens, completion_tokens, total_tokens, cached_tokens,
                 cache_hit_ratio, raw_usage, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload["id"],
                    payload["agent_id"],
                    payload["session_id"],
                    payload["rp_room_id"],
                    payload["mode"],
                    payload["provider"],
                    payload["model"],
                    payload["prompt_builder_version"],
                    payload["fixed_block_hash"],
                    _json_text(payload["block_order"]),
                    payload["prompt_tokens"],
                    payload["completion_tokens"],
                    payload["total_tokens"],
                    payload["cached_tokens"],
                    payload["cache_hit_ratio"],
                    _json_text(payload["raw_usage"]),
                    payload["created_at"],
                ),
            )
            await conn.commit()

        return {
            "provider": payload["provider"],
            "model": payload["model"],
            "prompt_tokens": payload["prompt_tokens"],
            "completion_tokens": payload["completion_tokens"],
            "total_tokens": payload["total_tokens"],
            "cached_tokens": payload["cached_tokens"],
            "cache_hit_ratio": payload["cache_hit_ratio"],
            "fixed_block_hash": payload["fixed_block_hash"],
            "block_order": payload["block_order"],
        }
    except Exception as exc:
        logger.warning("Record model usage failed: %s", exc)
        return None
