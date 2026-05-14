"""Smoke test memory related lookup, warming, and mixed retrieval ranking.

Usage (from backend/):
  python scripts/test_memory_retrieval_enhancement.py
  python scripts/test_memory_retrieval_enhancement.py --agent-id azheng

This script writes two clearly related test memories. It does not delete them,
so the database keeps an auditable trace with source=test_memory_retrieval.
"""
from __future__ import annotations

import argparse
import asyncio
import sys
import uuid
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import database as db  # noqa: E402


SOURCE = "test_memory_retrieval"


def _fmt(value: Any, default: str = "-") -> str:
    if value is None or value == "":
        return default
    if isinstance(value, float):
        return f"{value:.4f}"
    return str(value)


def _print_memory_line(prefix: str, memory: dict[str, Any]) -> None:
    print(
        f"{prefix} id={_fmt(memory.get('id'))} "
        f"temp={_fmt(memory.get('temperature'))} "
        f"touch_count={_fmt(memory.get('touch_count'))} "
        f"similarity={_fmt(memory.get('similarity'))} "
        f"final_score={_fmt(memory.get('final_score'))} "
        f"temp_factor={_fmt(memory.get('temp_factor'))} "
        f"recency_factor={_fmt(memory.get('recency_factor'))}"
    )


async def _find_memory(memory_id: str, agent_id: str | None) -> dict[str, Any] | None:
    rows = await db.list_memories(limit=200, agent_id=agent_id)
    for row in rows:
        if str(row.get("id") or "") == memory_id:
            return row
    return None


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--agent-id", default=None, help="Agent id to test. Defaults to backend fallback agent.")
    parser.add_argument("--threshold-note", action="store_true", help="Print threshold reminder only.")
    args = parser.parse_args()

    marker = f"memtest_{uuid.uuid4().hex[:8]}"
    agent_id = args.agent_id

    old_text = (
        f"{marker}: Memory retrieval smoke test. "
        "Amber is wiring Supabase pgvector memory search, prompt memory budget, "
        "temperature warming, and related memory lookup."
    )
    new_text = (
        f"{marker}: New related memory. "
        "Amber is still debugging pgvector related_memories, memory temperature, "
        "and prompt injection ranking."
    )
    query_text = (
        f"{marker}: pgvector related memories, temperature warming, "
        "and prompt memory ranking"
    )

    print("Creating old test memory...")
    old_memory = await db.add_memory(
        old_text,
        "recent_pending",
        tags=f"{marker},smoke-test",
        source=SOURCE,
        agent_id=agent_id,
        visibility="private",
        importance=3,
    )
    old_id = str(old_memory.get("id") or "")
    _print_memory_line("old-before", old_memory)

    print("\nCreating new related test memory...")
    new_memory = await db.add_memory(
        new_text,
        "recent_pending",
        tags=f"{marker},smoke-test",
        source=SOURCE,
        agent_id=agent_id,
        visibility="private",
        importance=3,
    )
    related = list(new_memory.get("related_memories") or [])
    _print_memory_line("new", new_memory)

    print(f"\nrelated_memories count={len(related)}")
    if related:
        for index, item in enumerate(related, start=1):
            _print_memory_line(f"related-{index}", item)
    else:
        print("No related memories returned.")
        print("Check embedding config, pgvector RPC/index, threshold, and agent_id scope.")

    old_after = await _find_memory(old_id, agent_id)
    print("\nOld memory after related lookup:")
    if old_after:
        _print_memory_line("old-after", old_after)
    else:
        print("old-after not found in list_memories(limit=200).")

    print("\nSemantic retrieval result:")
    results = await db.semantic_search_memories(query_text, limit=5, agent_id=agent_id, touch=False)
    for index, item in enumerate(results, start=1):
        _print_memory_line(f"rank-{index}", item)

    print("\nExpected:")
    print("- related_memories should include the old memory when embeddings/RPC are working.")
    print("- old-after temperature/touch_count should be higher than old-before.")
    print("- retrieval rows should show similarity/final_score/temp_factor/recency_factor.")
    print(f"- Test marker for manual cleanup/search: {marker}")

    await db.close_db()


if __name__ == "__main__":
    asyncio.run(main())
