"""清理被污染的 memories.compressed_content。

summary 模型有时把推理旁白（"Let me first search…"/"让我先看看…"）当输出流出来，
被存进了 compressed_content。前端优先显示 compressed_content，于是卡片上显示的是
过程旁白而非真正的事实。

本脚本找出 compressed_content 过不了 should_store_memory gate 的记忆，**只清空
compressed_content**（content/raw_content 不动）→ 前端自动回退显示干净的 content。

默认 dry-run；加 --apply 才真正置空。

用法：
  python scripts/memory_compressed_cleanup.py            # dry-run
  python scripts/memory_compressed_cleanup.py --apply    # 执行
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

import database as db  # noqa: E402
from consciousness.memory_filter import should_store_memory  # noqa: E402


def _trunc(text: str, n: int = 70) -> str:
    text = " ".join(str(text or "").split())
    return text if len(text) <= n else text[: n - 1] + "…"


async def _fetch_all() -> list[dict[str, Any]]:
    if db._use_supabase_memory():
        return await db._supabase_list_memories(limit=5000, all_agents=True)
    conn = await db.get_db()
    cur = await conn.execute("SELECT * FROM memories")
    return [dict(r) for r in await cur.fetchall()]


async def main() -> None:
    parser = argparse.ArgumentParser(description="清空被污染的 compressed_content（只读除非 --apply）")
    parser.add_argument("--apply", action="store_true", help="真正执行置空（默认只 dry-run）")
    args = parser.parse_args()

    backend = "supabase" if db._use_supabase_memory() else "sqlite"
    mode = "APPLY（将置空）" if args.apply else "DRY-RUN（只看，不改）"
    print(f"memory compressed_content cleanup  backend={backend}  mode={mode}\n")

    rows = await _fetch_all()
    flagged: list[dict[str, Any]] = []
    for m in rows:
        comp = (m.get("compressed_content") or "").strip()
        if not comp:
            continue
        ok, _reason = should_store_memory(comp)
        if not ok:
            flagged.append(m)

    by_agent: dict[str, int] = defaultdict(int)
    for m in flagged:
        by_agent[db.normalize_agent_id(m.get("agent_id"))] += 1

    print(f"共 {len(rows)} 条记忆，其中 compressed_content 被污染 {len(flagged)} 条")
    print("按 agent:", ", ".join(f"{a}={c}" for a, c in sorted(by_agent.items())), "\n")
    for m in flagged[:15]:
        print(f"  id={m.get('id')} [{db.normalize_agent_id(m.get('agent_id'))}]")
        print(f"    清空(脏): «{_trunc(m.get('compressed_content'))}»")
        print(f"    回退(净): «{_trunc(m.get('content') or m.get('raw_content'))}»")
    if len(flagged) > 15:
        print(f"  …还有 {len(flagged) - 15} 条")

    if not args.apply:
        print("\nDRY-RUN：未修改任何数据。确认后加 --apply 执行。")
        await db.close_db()
        return

    print(f"\n开始置空 {len(flagged)} 条的 compressed_content…")
    ok = fail = 0
    for m in flagged:
        mid = str(m.get("id") or "")
        try:
            if await db.update_memory(mid, compressed_content=""):
                ok += 1
            else:
                fail += 1
        except Exception as exc:
            fail += 1
            print(f"  ⚠ 失败 {mid}: {exc}")
    print(f"\n完成：置空 {ok} 条，失败 {fail} 条。content/raw_content 未改动。")
    await db.close_db()


if __name__ == "__main__":
    asyncio.run(main())
