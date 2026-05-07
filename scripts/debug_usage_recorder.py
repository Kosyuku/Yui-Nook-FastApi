from __future__ import annotations

import asyncio
import json
import os
import sys
import tempfile
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ["DATABASE_BACKEND"] = "sqlite"
os.environ["MEMORY_BACKEND"] = "sqlite"
os.environ["DATABASE_PATH"] = str(Path(tempfile.gettempdir()) / "yui_usage_recorder_debug.sqlite3")

import database as db
import usage_recorder
from usage_recorder import parse_model_usage, record_model_usage


CHAT_USAGE = {
    "prompt_tokens": 100,
    "completion_tokens": 20,
    "total_tokens": 120,
    "prompt_tokens_details": {"cached_tokens": 60},
}

RESPONSES_USAGE = {
    "input_tokens": 200,
    "output_tokens": 50,
    "total_tokens": 250,
    "input_tokens_details": {"cached_tokens": 80},
}

DEBUG = {
    "prompt_builder_version": "debug-v2",
    "fixed_block_hash": "fixed-debug-hash",
    "block_order": ["fixed", "summary", "history_b", "dynamic"],
}


async def _table_rows() -> list[dict]:
    conn = await db.get_db()
    cursor = await conn.execute(
        """
        SELECT provider, model, prompt_tokens, completion_tokens, total_tokens,
               cached_tokens, cache_hit_ratio, fixed_block_hash, block_order, raw_usage
        FROM model_usage_events
        ORDER BY created_at ASC
        """
    )
    rows = await cursor.fetchall()
    return [dict(row) for row in rows]


async def _verify_failure_is_swallowed() -> bool:
    original_get_db = usage_recorder.db.get_db

    async def boom():
        raise RuntimeError("forced recorder failure")

    usage_recorder.db.get_db = boom
    try:
        result = await record_model_usage(
            agent_id="usage_agent",
            session_id="broken_session",
            mode="chat",
            provider="openai",
            model="debug",
            built_prompt_debug=DEBUG,
            raw_usage=CHAT_USAGE,
        )
        return result is None
    finally:
        usage_recorder.db.get_db = original_get_db


async def main() -> None:
    path = Path(os.environ["DATABASE_PATH"])
    if path.exists():
        path.unlink()

    chat_parsed = parse_model_usage(CHAT_USAGE)
    responses_parsed = parse_model_usage(RESPONSES_USAGE)
    assert chat_parsed["cached_tokens"] == 60
    assert chat_parsed["prompt_tokens"] == 100
    assert round(chat_parsed["cache_hit_ratio"], 4) == 0.6
    assert responses_parsed["cached_tokens"] == 80
    assert responses_parsed["prompt_tokens"] == 200
    assert responses_parsed["completion_tokens"] == 50
    assert round(responses_parsed["cache_hit_ratio"], 4) == 0.4

    chat_record = await record_model_usage(
        agent_id="usage_agent",
        session_id="chat_session",
        mode="chat",
        provider="openai",
        model="gpt-debug",
        built_prompt_debug=DEBUG,
        raw_usage=CHAT_USAGE,
    )
    responses_record = await record_model_usage(
        agent_id="usage_agent",
        rp_room_id="rp_room",
        mode="rp",
        provider="openai",
        model="gpt-responses-debug",
        built_prompt_debug={**DEBUG, "block_order": ["fixed", "rp_setting", "rp_history", "dynamic"]},
        raw_usage={"usage": RESPONSES_USAGE},
    )
    assert chat_record and chat_record["cached_tokens"] == 60
    assert responses_record and responses_record["cached_tokens"] == 80

    failure_swallowed = await _verify_failure_is_swallowed()
    assert failure_swallowed

    rows = await _table_rows()
    assert len(rows) == 2

    print(json.dumps({
        "ok": True,
        "chat_parsed": chat_parsed,
        "responses_parsed": responses_parsed,
        "rows": rows,
        "record_failure_swallowed": failure_swallowed,
    }, ensure_ascii=False, indent=2))
    await db.close_db()


if __name__ == "__main__":
    asyncio.run(main())
