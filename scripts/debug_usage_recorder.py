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
import models
import usage_recorder
from config import ProviderConfig
from models import OpenAICompatAdapter
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

CAPTURED_PAYLOADS: list[dict] = []


class FakeStreamResponse:
    def __init__(self, lines: list[str], status_code: int = 200, error_body: str = ""):
        self.lines = lines
        self.status_code = status_code
        self.error_body = error_body

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def aread(self) -> bytes:
        return self.error_body.encode("utf-8")

    async def aiter_lines(self):
        for line in self.lines:
            yield line


class FakeAsyncClient:
    lines: list[str] = []
    status_code: int = 200
    error_body: str = ""

    def __init__(self, *args, **kwargs):
        pass

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    def stream(self, method: str, url: str, json: dict, headers: dict):
        CAPTURED_PAYLOADS.append(json)
        return FakeStreamResponse(self.lines, self.status_code, self.error_body)


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


async def _verify_adapter_usage_stream() -> dict:
    original_client = models.httpx.AsyncClient
    CAPTURED_PAYLOADS.clear()
    usage_line = {
        "id": "debug",
        "choices": [],
        "usage": CHAT_USAGE,
    }
    FakeAsyncClient.lines = [
        'data: {"choices":[{"delta":{"content":"hi"}}]}',
        "data: " + json.dumps(usage_line),
        "data: [DONE]",
    ]
    models.httpx.AsyncClient = FakeAsyncClient
    try:
        adapter = OpenAICompatAdapter(
            ProviderConfig(
                name="openai",
                base_url="https://example.invalid/v1",
                api_key="debug-key",
                model="gpt-debug",
            )
        )
        chunks = [chunk async for chunk in adapter.chat_stream([{"role": "user", "content": "hello"}])]
    finally:
        models.httpx.AsyncClient = original_client

    frontend_events: list[str] = []
    usage_info = {"status": "not available"}
    for chunk in chunks:
        if isinstance(chunk, dict) and chunk.get("type") == "usage":
            usage_info = {"raw_usage": chunk.get("usage"), "usage_chunk_received": True}
        elif isinstance(chunk, str):
            frontend_events.append(chunk)

    usage_record = await record_model_usage(
        agent_id="usage_agent",
        session_id="adapter_session",
        mode="chat",
        provider="openai",
        model="gpt-debug",
        built_prompt_debug=DEBUG,
        raw_usage=usage_info.get("raw_usage"),
    )
    return {
        "payload_stream_options": CAPTURED_PAYLOADS[0].get("stream_options") if CAPTURED_PAYLOADS else None,
        "chunks": chunks,
        "frontend_events": frontend_events,
        "usage_record": usage_record,
    }


async def _verify_adapter_without_usage_still_streams() -> dict:
    original_client = models.httpx.AsyncClient
    CAPTURED_PAYLOADS.clear()
    FakeAsyncClient.lines = [
        'data: {"choices":[{"delta":{"content":"plain"}}]}',
        "data: [DONE]",
    ]
    models.httpx.AsyncClient = FakeAsyncClient
    try:
        adapter = OpenAICompatAdapter(
            ProviderConfig(
                name="openai",
                base_url="https://example.invalid/v1",
                api_key="debug-key",
                model="gpt-debug",
            )
        )
        chunks = [chunk async for chunk in adapter.chat_stream([{"role": "user", "content": "hello"}])]
    finally:
        models.httpx.AsyncClient = original_client
    return {
        "chunks": chunks,
        "has_usage": any(isinstance(chunk, dict) and chunk.get("type") == "usage" for chunk in chunks),
    }


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

    adapter_usage = await _verify_adapter_usage_stream()
    assert adapter_usage["payload_stream_options"] == {"include_usage": True}
    assert any(isinstance(chunk, dict) and chunk.get("type") == "usage" for chunk in adapter_usage["chunks"])
    assert adapter_usage["frontend_events"] == ["hi"]
    assert adapter_usage["usage_record"] and adapter_usage["usage_record"]["cached_tokens"] == 60

    adapter_no_usage = await _verify_adapter_without_usage_still_streams()
    assert adapter_no_usage["chunks"] == ["plain"]
    assert adapter_no_usage["has_usage"] is False

    failure_swallowed = await _verify_failure_is_swallowed()
    assert failure_swallowed

    rows = await _table_rows()
    assert len(rows) == 3

    print(json.dumps({
        "ok": True,
        "chat_parsed": chat_parsed,
        "responses_parsed": responses_parsed,
        "rows": rows,
        "adapter_usage": adapter_usage,
        "adapter_no_usage": adapter_no_usage,
        "record_failure_swallowed": failure_swallowed,
    }, ensure_ascii=False, indent=2))
    await db.close_db()


if __name__ == "__main__":
    asyncio.run(main())
