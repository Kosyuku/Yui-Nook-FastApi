"""Background memory indexing worker."""
from __future__ import annotations

import asyncio
import logging
from typing import Optional

import database as db
from config import settings

logger = logging.getLogger(__name__)

_worker_task: Optional[asyncio.Task] = None
_queue: asyncio.Queue[tuple[str, str]] = asyncio.Queue()
_pending_ids: set[str] = set()
_status = {
    "running": False,
    "queued": 0,
    "processed": 0,
    "compressed": 0,
    "embedded": 0,
    "failed": 0,
}


def get_status() -> dict:
    data = _status.copy()
    data["queued"] = _queue.qsize()
    return data


async def enqueue_memory_processing(memory_id: str, raw_content: str) -> bool:
    if not settings.memory_async_enabled:
        return False
    if not memory_id or not (raw_content or "").strip():
        return False
    if memory_id in _pending_ids:
        return False
    _pending_ids.add(memory_id)
    await _queue.put((memory_id, raw_content))
    _status["queued"] = _queue.qsize()
    return True


async def enqueue_memory_embedding(memory_id: str, content: str) -> bool:
    return await enqueue_memory_processing(memory_id, content)


async def _process_one(memory_id: str, raw_content: str) -> None:
    try:
        compressed = await db.ensure_memory_compression(memory_id, raw_content)
        if compressed:
            _status["compressed"] += 1
        embedding = await db._ensure_memory_embedding(memory_id, raw_content)
        if embedding is not None:
            _status["embedded"] += 1
        _status["processed"] += 1
    except Exception as exc:
        _status["failed"] += 1
        logger.warning("Async memory processing failed: %s %s", memory_id, exc)
    finally:
        _pending_ids.discard(memory_id)
        _status["queued"] = _queue.qsize()


async def _worker() -> None:
    _status["running"] = True
    logger.info("Memory async worker started")
    try:
        while _status["running"]:
            memory_id, raw_content = await _queue.get()
            try:
                await _process_one(memory_id, raw_content)
            finally:
                _queue.task_done()
    except asyncio.CancelledError:
        raise
    finally:
        _status["running"] = False
        logger.info("Memory async worker stopped")


async def _startup_backfill() -> None:
    limit = max(0, settings.memory_async_startup_backfill_limit)
    if limit <= 0:
        return
    try:
        memories = await db.list_memories(limit=limit)
        for memory in memories:
            await enqueue_memory_processing(memory.get("id", ""), db.memory_embedding_source(memory))
    except Exception as exc:
        logger.warning("Memory async startup backfill failed: %s", exc)


async def start_worker() -> None:
    global _worker_task
    if not settings.memory_async_enabled:
        logger.info("Memory async worker disabled by config")
        return
    if _worker_task and not _worker_task.done():
        return
    _worker_task = asyncio.create_task(_worker())
    await _startup_backfill()


async def stop_worker() -> None:
    global _worker_task
    _status["running"] = False
    if _worker_task:
        _worker_task.cancel()
        try:
            await _worker_task
        except asyncio.CancelledError:
            pass
        _worker_task = None
