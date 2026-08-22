from __future__ import annotations

import asyncio
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from codex_app_server import codex_app_server


BRIDGE_PATH = Path(__file__).resolve().parent / "data" / "codex_bridge_sessions.json"
DEFAULT_TIMEOUT_SECONDS = 180


@dataclass
class CodexBridgeResult:
    conversation_key: str
    thread_id: str
    reply: str
    raw_events: list[dict[str, Any]]
    stderr: str


_locks_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


def _read_mapping() -> dict[str, str]:
    if not BRIDGE_PATH.exists():
        return {}
    try:
        raw = json.loads(BRIDGE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if not isinstance(raw, dict):
        return {}
    return {str(key): str(value) for key, value in raw.items() if key and value}


def _write_mapping(mapping: dict[str, str]) -> None:
    BRIDGE_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = BRIDGE_PATH.with_suffix(".tmp")
    tmp_path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp_path.replace(BRIDGE_PATH)


async def _lock_for(key: str) -> asyncio.Lock:
    async with _locks_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
        return lock


async def codex_bridge_chat(
    *,
    conversation_key: str,
    content: str,
    prompt: str | None = None,
    reset: bool = False,
    timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS,
) -> CodexBridgeResult:
    key = conversation_key.strip()
    if not key:
        raise ValueError("conversation_key is required")
    if not content.strip():
        raise ValueError("content is required")

    lock = await _lock_for(key)
    async with lock:
        mapping = _read_mapping()
        existing_thread_id = "" if reset else mapping.get(key, "")
        result = await codex_app_server.run_turn(
            prompt=prompt if prompt is not None else content,
            thread_id=existing_thread_id,
            timeout_seconds=timeout_seconds,
        )

        mapping[key] = result.thread_id
        _write_mapping(mapping)
        return CodexBridgeResult(
            conversation_key=key,
            thread_id=result.thread_id,
            reply=result.reply or "没吐字。Codex 这次空回了。",
            raw_events=result.events,
            stderr=result.stderr,
        )


async def codex_bridge_shutdown() -> None:
    await codex_app_server.stop()


async def codex_bridge_start() -> dict[str, Any]:
    await codex_app_server.start()
    return codex_bridge_status()


def codex_bridge_status() -> dict[str, Any]:
    status = codex_app_server.status()
    status["conversation_threads"] = _read_mapping()
    return status


async def codex_bridge_threads(limit: int = 50) -> dict[str, Any]:
    return await codex_app_server.list_threads(limit)


async def codex_bridge_interrupt(thread_id: str, turn_id: str | None = None) -> dict[str, Any]:
    return await codex_app_server.interrupt(thread_id, turn_id)


async def codex_bridge_respond(request_id: str, result: dict[str, Any]) -> None:
    await codex_app_server.respond_to_server_request(request_id, result)


def codex_bridge_subscribe(thread_id: str | None = None) -> asyncio.Queue:
    return codex_app_server.subscribe(thread_id)


def codex_bridge_unsubscribe(queue: asyncio.Queue, thread_id: str | None = None) -> None:
    codex_app_server.unsubscribe(queue, thread_id)
