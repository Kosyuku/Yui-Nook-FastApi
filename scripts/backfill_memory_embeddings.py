"""Backfill memory embeddings for semantic retrieval.

Writes to whichever backend is configured: the local embedding cache on
sqlite, or memories.embedding on Supabase.

Usage:
  python scripts/backfill_memory_embeddings.py
"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import database as db  # noqa: E402


async def main() -> None:
    memories = await db.list_memories(limit=5000)
    print(f"Found {len(memories)} memories")

    indexed = 0
    skipped = 0
    for memory in memories:
        content = db.memory_embedding_source(memory)
        if not content:
            skipped += 1
            continue
        try:
            embedding = await db._ensure_memory_embedding(memory["id"], content)
        except Exception as exc:
            print(f"Failed: {memory.get('id')} -> {exc}")
            continue
        if embedding:
            indexed += 1
        else:
            skipped += 1

    await db.close_db()
    print(f"Indexed: {indexed}, skipped: {skipped}")


if __name__ == "__main__":
    asyncio.run(main())
