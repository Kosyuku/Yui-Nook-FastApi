"""Memory 脏数据 dry-run 报告（只读，绝不删除任何记忆）。

列出三类问题供人工确认：
  1. 重复项     —— 同一 agent 下归一化内容相同的记忆
  2. 过程废话   —— should_store_memory 判定不该入库的记忆（带原因）
  3. 跨 agent 错挂 —— source_agent_id 与 agent_id 不一致，或内容疑似挂错 persona

用法：
  python scripts/memory_dryrun.py                # 全部 agent
  python scripts/memory_dryrun.py --agent azheng # 指定 agent
  python scripts/memory_dryrun.py --limit 8000   # 调整拉取上限

本脚本不执行任何写入/删除。确认结果后再单独做清理脚本。
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

# Windows 控制台默认可能是 GBK，强制 UTF-8 输出避免中文/«» 报错。
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

import database as db  # noqa: E402
from consciousness.memory_filter import normalize_memory_text, should_store_memory  # noqa: E402


def _truncate(text: str, n: int = 70) -> str:
    text = " ".join(str(text or "").split())
    return text if len(text) <= n else text[: n - 1] + "…"


async def _fetch_all_memories(limit: int, agent_filter: str | None) -> list[dict[str, Any]]:
    if db._use_supabase_memory():
        rows = await db._supabase_list_memories(limit=limit, all_agents=True)
    else:
        conn = await db.get_db()
        cursor = await conn.execute("SELECT * FROM memories ORDER BY updated_at DESC LIMIT ?", (limit,))
        rows = [dict(r) for r in await cursor.fetchall()]
    if agent_filter:
        target = db.normalize_agent_id(agent_filter)
        rows = [r for r in rows if db.normalize_agent_id(r.get("agent_id")) == target]
    return rows


def _report_duplicates(memories: list[dict[str, Any]]) -> int:
    groups: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    for m in memories:
        owner = db.normalize_agent_id(m.get("agent_id"))
        norm = normalize_memory_text(db.memory_raw_content(m))
        if not norm:
            continue
        groups[(owner, norm)].append(m)

    dup_groups = {k: v for k, v in groups.items() if len(v) > 1}
    extra = sum(len(v) - 1 for v in dup_groups.values())
    print("\n" + "=" * 72)
    print(f"1) 重复项：{len(dup_groups)} 组，多余 {extra} 条（建议每组保留最新 1 条）")
    print("=" * 72)
    for (owner, _norm), items in sorted(dup_groups.items(), key=lambda kv: -len(kv[1]))[:30]:
        items_sorted = sorted(items, key=lambda m: str(m.get("updated_at") or ""), reverse=True)
        keep = items_sorted[0]
        print(f"\n  [{owner}] x{len(items)}  «{_truncate(db.memory_raw_content(keep))}»")
        print(f"     保留: {keep.get('id')}  ({keep.get('updated_at')})")
        for d in items_sorted[1:]:
            print(f"     多余: {d.get('id')}  ({d.get('updated_at')})  source={d.get('source')}")
    if len(dup_groups) > 30:
        print(f"\n  …还有 {len(dup_groups) - 30} 组未展示")
    return extra


def _report_process_junk(memories: list[dict[str, Any]]) -> int:
    flagged: list[tuple[dict[str, Any], str]] = []
    for m in memories:
        text = db.memory_raw_content(m)
        ok, reason = should_store_memory(text, tag=str(m.get("tags") or ""), source=str(m.get("source") or ""))
        if not ok:
            flagged.append((m, reason))
    by_reason: dict[str, int] = defaultdict(int)
    for _m, reason in flagged:
        by_reason[reason] += 1
    print("\n" + "=" * 72)
    print(f"2) 过程废话 / 不该入库：{len(flagged)} 条")
    print("=" * 72)
    if by_reason:
        print("   原因分布: " + ", ".join(f"{r}={c}" for r, c in sorted(by_reason.items(), key=lambda kv: -kv[1])))
    for m, reason in flagged[:40]:
        owner = db.normalize_agent_id(m.get("agent_id"))
        print(f"\n  [{owner}] ({reason}) src={m.get('source')}  id={m.get('id')}")
        print(f"     «{_truncate(db.memory_raw_content(m))}»")
    if len(flagged) > 40:
        print(f"\n  …还有 {len(flagged) - 40} 条未展示")
    return len(flagged)


def _report_cross_agent(memories: list[dict[str, Any]], agent_names: dict[str, str]) -> int:
    mismatched: list[dict[str, Any]] = []
    suspicious: list[tuple[dict[str, Any], str]] = []

    # 反查：persona 显示名 -> agent_id（用于检测内容疑似挂错 persona）
    name_to_agent = {name: aid for aid, name in agent_names.items() if name}

    for m in memories:
        owner = db.normalize_agent_id(m.get("agent_id"))
        src = db.normalize_agent_id(m.get("source_agent_id")) if m.get("source_agent_id") else owner
        if src and src != owner:
            mismatched.append(m)

        text = db.memory_raw_content(m)
        for name, other_agent in name_to_agent.items():
            if other_agent == owner:
                continue
            # 内容里明显是「另一个 persona 的自述/第一人称」却挂在当前 agent 名下
            if f"我是{name}" in text or f"{name}：" in text or f"{name}:" in text:
                suspicious.append((m, f"提及 persona「{name}」(={other_agent}) 但挂在 {owner}"))
                break

    print("\n" + "=" * 72)
    print(f"3) 跨 agent 错挂：source≠scope {len(mismatched)} 条；persona 疑似错挂 {len(suspicious)} 条")
    print("=" * 72)
    if agent_names:
        print("   已知 agent: " + ", ".join(f"{aid}={name}" for aid, name in agent_names.items()))
    for m in mismatched[:30]:
        print(
            f"\n  scope={db.normalize_agent_id(m.get('agent_id'))} "
            f"source={db.normalize_agent_id(m.get('source_agent_id'))} "
            f"vis={m.get('visibility')} id={m.get('id')}"
        )
        print(f"     «{_truncate(db.memory_raw_content(m))}»")
    if len(mismatched) > 30:
        print(f"\n  …还有 {len(mismatched) - 30} 条 source≠scope 未展示")
    for m, why in suspicious[:30]:
        print(f"\n  [疑似] {why}  id={m.get('id')}")
        print(f"     «{_truncate(db.memory_raw_content(m))}»")
    return len(mismatched) + len(suspicious)


async def main() -> None:
    parser = argparse.ArgumentParser(description="Memory 脏数据 dry-run（只读）")
    parser.add_argument("--agent", default=None, help="只检查指定 agent_id")
    parser.add_argument("--limit", type=int, default=5000, help="拉取记忆上限")
    args = parser.parse_args()

    backend = "supabase" if db._use_supabase_memory() else "sqlite"
    print(f"Memory dry-run（只读，不删除）  backend={backend}")

    try:
        agents = await db.list_agents(include_inactive=True)
        agent_names = {db.normalize_agent_id(a.get("agent_id")): str(a.get("display_name") or "") for a in agents}
    except Exception as exc:
        print(f"  （读取 agents 失败，跳过 persona 启发式: {exc}）")
        agent_names = {}

    memories = await _fetch_all_memories(args.limit, args.agent)
    print(f"共拉取 {len(memories)} 条记忆" + (f"（agent={args.agent}）" if args.agent else "（全部 agent）"))

    per_agent: dict[str, int] = defaultdict(int)
    for m in memories:
        per_agent[db.normalize_agent_id(m.get("agent_id"))] += 1
    print("按 agent 分布: " + ", ".join(f"{a}={c}" for a, c in sorted(per_agent.items())))

    extra_dups = _report_duplicates(memories)
    junk = _report_process_junk(memories)
    cross = _report_cross_agent(memories, agent_names)

    print("\n" + "#" * 72)
    print(f"汇总: 重复多余 {extra_dups} 条 | 过程废话 {junk} 条 | 跨 agent 问题 {cross} 条")
    print("本脚本只读，未删除任何数据。请确认以上结果后再决定清理方案。")
    print("#" * 72)

    try:
        await db.close_db()
    except Exception:
        pass


if __name__ == "__main__":
    asyncio.run(main())
