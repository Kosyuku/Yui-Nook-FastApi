"""清理 memories 表里的精确重复（同 agent + 归一化内容完全相同）。

每组保留 updated_at 最新的一条，删除其余。默认 dry-run（只打印计划，不删除）；
加 --apply 才真正删除。删除走 db.delete_memory（同时清理 label/log/embedding/
proactive 引用）。

用法：
  python scripts/memory_dedup_cleanup.py            # dry-run，只看计划
  python scripts/memory_dedup_cleanup.py --apply    # 执行删除
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
from consciousness.memory_filter import normalize_memory_text  # noqa: E402


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
    parser = argparse.ArgumentParser(description="清理精确重复记忆（只读除非 --apply）")
    parser.add_argument("--apply", action="store_true", help="真正执行删除（默认只 dry-run）")
    args = parser.parse_args()

    backend = "supabase" if db._use_supabase_memory() else "sqlite"
    mode = "APPLY（将删除）" if args.apply else "DRY-RUN（只看，不删）"
    print(f"memory dedup cleanup  backend={backend}  mode={mode}\n")

    rows = await _fetch_all()
    groups: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    for m in rows:
        owner = db.normalize_agent_id(m.get("agent_id"))
        norm = (m.get("normalized_content") or "").strip() or normalize_memory_text(db.memory_raw_content(m))
        if not norm:
            continue
        groups[(owner, norm)].append(m)

    dup_groups = {k: v for k, v in groups.items() if len(v) > 1}
    to_delete: list[dict[str, Any]] = []

    print(f"共 {len(rows)} 条记忆，发现 {len(dup_groups)} 组精确重复\n")
    for (owner, _norm), items in sorted(dup_groups.items(), key=lambda kv: -len(kv[1])):
        items_sorted = sorted(items, key=lambda m: str(m.get("updated_at") or ""), reverse=True)
        keep, drop = items_sorted[0], items_sorted[1:]
        to_delete.extend(drop)
        print(f"  [{owner}] x{len(items)}  «{_trunc(db.memory_raw_content(keep))}»")
        print(f"     保留 {keep.get('id')} ({keep.get('updated_at')})")
        for d in drop:
            print(f"     删除 {d.get('id')} ({d.get('updated_at')})  src={d.get('source')}")

    print(f"\n计划删除 {len(to_delete)} 条，保留 {len(dup_groups)} 条（每组最新）。")

    if not args.apply:
        print("\nDRY-RUN：未删除任何数据。确认无误后加 --apply 执行。")
        await db.close_db()
        return

    print("\n开始删除…")
    ok = fail = 0
    for d in to_delete:
        mid = str(d.get("id") or "")
        try:
            if await db.delete_memory(mid):
                ok += 1
            else:
                fail += 1
                print(f"  ⚠ 未删除（不存在?）{mid}")
        except Exception as exc:
            fail += 1
            print(f"  ⚠ 删除失败 {mid}: {exc}")
    print(f"\n完成：删除 {ok} 条，失败 {fail} 条。")
    await db.close_db()


if __name__ == "__main__":
    asyncio.run(main())
