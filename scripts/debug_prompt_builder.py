"""Debug prompt_builder block output and cache boundaries.

Run from backend:
    python scripts/debug_prompt_builder.py

Optional:
    python scripts/debug_prompt_builder.py --session-id <id> --agent-id <id> --room-id <id>
"""
from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path
from typing import Any

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import database as db  # noqa: E402
import prompt_builder as pb  # noqa: E402
from tools import TOOLS_SCHEMA  # noqa: E402


DEBUG_KEYS = [
    "block_order",
    "block_token_estimates",
    "fixed_block_hash",
    "summary_revision",
    "history_a_cycle_id",
    "history_b_cycle_id",
    "history_message_count",
    "history_source",
    "history_token_estimate",
    "rp_history_message_count",
    "rp_history_source",
    "rp_history_token_estimate",
    "rp_room_id",
    "dynamic_sources",
    "provider",
    "model",
]

DYNAMIC_MARKERS = [
    "Current environment",
    "Retrieved memory",
    "Diary snippets",
    "Dynamic companion state",
    "Latest user message",
    "Tool results",
]


def _debug_subset(prompt) -> dict[str, Any]:
    return {key: prompt.debug.get(key) for key in DEBUG_KEYS}


def _block_content(prompt, name: str) -> str:
    block = next((item for item in prompt.blocks if item.name == name), None)
    return block.content if block else ""


def _print_json(label: str, payload: Any):
    print(f"\n## {label}")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


async def _resolve_default_agent(agent_id: str | None) -> str:
    if agent_id:
        return db.normalize_agent_id(agent_id)
    return db.normalize_agent_id(None)


def _install_mock_context():
    async def fake_resolve_prompt(slot_name: str) -> str:
        return f"mock {slot_name} base prompt"

    async def fake_get_agent_persona(agent_id: str) -> dict[str, Any]:
        return {"agent_id": agent_id, "persona": "Mock stable persona for prompt cache debugging."}

    async def fake_get_context_summaries(session_id: str, limit: int = 5, *, agent_id: str | None = None) -> list[dict[str, Any]]:
        return [
            {
                "id": "summary-debug-1",
                "session_id": session_id,
                "agent_id": agent_id or "azheng",
                "summary": "Mock low-frequency summary.",
                "created_at": "2026-05-06T00:00:00+08:00",
            }
        ][:limit]

    async def fake_list_memories(*args, **kwargs) -> list[dict[str, Any]]:
        category = kwargs.get("category") or (args[0] if args else "deep")
        agent_id = kwargs.get("agent_id") or "azheng"
        return [
            {
                "id": f"memory-{category}-1",
                "agent_id": agent_id,
                "source_agent_id": agent_id,
                "category": category,
                "content": f"Mock {category} memory.",
                "raw_content": f"Mock {category} raw memory.",
                "compressed_content": f"Mock {category} compressed memory.",
                "importance": 3,
                "temperature": 10,
                "updated_at": "2026-05-06T00:00:00+08:00",
                "last_touched_at": "2026-05-06T00:00:00+08:00",
            }
        ]

    async def fake_search_memories(*args, **kwargs) -> list[dict[str, Any]]:
        return []

    async def fake_touch_memories(*args, **kwargs):
        return None

    async def fake_get_companion_state(agent_id: str | None = None) -> dict[str, Any]:
        return {
            "agent_id": agent_id or "azheng",
            "recent_topics": ["cache boundary", "prompt builder"],
            "current_mood": "focused",
            "open_loops": ["verify debug output"],
            "impression": "Mock state should stay dynamic.",
            "relationship_progress": "Mock relationship state.",
            "likes_summary": "Mock preference state.",
        }

    async def fake_list_diary(agent_id: str | None = None, limit: int = 50) -> list[dict[str, Any]]:
        return [
            {
                "id": "diary-debug-1",
                "title": "Mock diary",
                "content": "Mock diary snippet should stay dynamic.",
                "agent_id": agent_id or "azheng",
            }
        ][:limit]

    async def fake_get_rp_room(room_id: str) -> dict[str, Any] | None:
        return {
            "id": room_id,
            "agent_id": "azheng",
            "world_setting": "Mock RP world.",
            "user_role": "Mock user role.",
            "ai_role": "Mock assistant role.",
            "updated_at": "2026-05-06T00:00:00+08:00",
        }

    async def fake_get_recent_messages(session_id: str, limit: int = 12) -> list[dict[str, Any]]:
        return [
            {"role": "user", "content": "Mock normal chat previous committed user message."},
            {"role": "assistant", "content": "Mock normal chat previous committed assistant reply."},
            {"role": "user", "content": "Mock normal chat older user context."},
            {"role": "assistant", "content": "Mock normal chat older assistant context."},
        ][:limit]

    async def fake_get_recent_rp_messages(room_id: str, limit: int = 12) -> list[dict[str, Any]]:
        return [
            {"role": "user", "content": f"Mock RP room {room_id} previous user line."},
            {"role": "assistant", "content": f"Mock RP room {room_id} previous assistant line."},
            {"role": "user", "content": f"Mock RP room {room_id} older user line."},
            {"role": "assistant", "content": f"Mock RP room {room_id} older assistant line."},
        ][:limit]

    pb.ai_runtime.resolve_prompt = fake_resolve_prompt
    pb.db.get_agent_persona = fake_get_agent_persona
    pb.db.get_context_summaries = fake_get_context_summaries
    pb.db.list_memories = fake_list_memories
    pb.db.semantic_search_memories = fake_search_memories
    pb.db.search_memories = fake_search_memories
    pb.db.touch_memories = fake_touch_memories
    pb.db.get_companion_state = fake_get_companion_state
    pb.db.list_diary = fake_list_diary
    pb.db.get_rp_room = fake_get_rp_room
    pb.db.get_recent_messages = fake_get_recent_messages
    pb.db.get_recent_rp_messages = fake_get_recent_rp_messages


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--session-id", default="debug_prompt_cache_session")
    parser.add_argument("--agent-id", default="")
    parser.add_argument("--room-id", default="debug_prompt_cache_room")
    parser.add_argument("--provider", default="debug-provider")
    parser.add_argument("--model", default="debug-model")
    parser.add_argument("--live-db", action="store_true", help="Use real DB/provider settings instead of mock debug data.")
    args = parser.parse_args()

    if not args.live_db:
        _install_mock_context()

    agent_id = await _resolve_default_agent(args.agent_id)
    latest_a = "debug latest text A: cache boundary check"
    latest_b = "debug latest text B: dynamic block should change"

    chat_a1 = await pb.build_chat_prompt(
        session_id=args.session_id,
        agent_id=agent_id,
        latest_user_text=latest_a,
        provider=args.provider,
        model=args.model,
        tool_profile="chat",
    )
    await asyncio.sleep(1.1)
    chat_a2 = await pb.build_chat_prompt(
        session_id=args.session_id,
        agent_id=agent_id,
        latest_user_text=latest_a,
        provider=args.provider,
        model=args.model,
        tool_profile="chat",
    )
    chat_b = await pb.build_chat_prompt(
        session_id=args.session_id,
        agent_id=agent_id,
        latest_user_text=latest_b,
        provider=args.provider,
        model=args.model,
        tool_profile="chat",
    )
    rp_prompt = await pb.build_rp_prompt(
        room_id=args.room_id,
        agent_id=agent_id,
        latest_user_text=latest_a,
        provider=args.provider,
        model=args.model,
        tool_profile="rp",
    )
    summary_like = await pb.build_chat_prompt(
        session_id=args.session_id,
        agent_id=agent_id,
        latest_user_text=latest_a,
        provider=args.provider,
        model=args.model,
        tool_profile="summary",
    )
    system_prompt = await pb.build_system_prompt(session_id=args.session_id, agent_id=agent_id)

    chat_fixed = _block_content(chat_a1, "fixed")
    history_a = _block_content(chat_a1, "history_b")
    rp_history = _block_content(rp_prompt, "rp_history")
    rp_dynamic = _block_content(rp_prompt, "dynamic")
    dynamic_a = _block_content(chat_a1, "dynamic")
    dynamic_b = _block_content(chat_b, "dynamic")

    checks = {
        "same_agent_session_fixed_hash_consistent": chat_a1.debug["fixed_block_hash"] == chat_a2.debug["fixed_block_hash"],
        "same_agent_session_block_order_consistent": chat_a1.debug["block_order"] == chat_a2.debug["block_order"],
        "chat_history_between_summary_and_dynamic": chat_a1.debug["block_order"] == ["fixed", "summary", "history_b", "dynamic"],
        "history_source_is_legacy": chat_a1.debug.get("history_source") == "legacy_recent_messages",
        "history_b_cycle_is_legacy": chat_a1.debug.get("history_b_cycle_id") == "legacy",
        "history_has_mock_messages": chat_a1.debug.get("history_message_count") == 4,
        "latest_text_absent_from_history": latest_a not in history_a and latest_b not in history_a,
        "latest_text_present_in_dynamic": latest_a in dynamic_a,
        "rp_history_between_setting_and_dynamic": rp_prompt.debug["block_order"] == ["fixed", "rp_setting", "rp_history", "dynamic"],
        "rp_history_source_is_rp_messages": rp_prompt.debug.get("rp_history_source") == "rp_messages",
        "rp_history_has_mock_messages": rp_prompt.debug.get("rp_history_message_count") == 4,
        "rp_room_id_recorded": rp_prompt.debug.get("rp_room_id") == args.room_id,
        "rp_latest_text_absent_from_history": latest_a not in rp_history and latest_b not in rp_history,
        "rp_latest_text_present_in_dynamic": latest_a in rp_dynamic,
        "rp_history_does_not_read_normal_chat": "Mock normal chat" not in rp_history,
        "rp_different_latest_fixed_hash_unchanged": rp_prompt.debug["fixed_block_hash"] == (
            await pb.build_rp_prompt(
                room_id=args.room_id,
                agent_id=agent_id,
                latest_user_text=latest_b,
                provider=args.provider,
                model=args.model,
                tool_profile="rp",
            )
        ).debug["fixed_block_hash"],
        "different_latest_text_dynamic_changed": dynamic_a != dynamic_b,
        "different_latest_text_fixed_hash_unchanged": chat_a1.debug["fixed_block_hash"] == chat_b.debug["fixed_block_hash"],
        "dynamic_markers_absent_from_fixed": not any(marker in chat_fixed for marker in DYNAMIC_MARKERS),
        "latest_text_absent_from_fixed": latest_a not in chat_fixed and latest_b not in chat_fixed,
        "build_system_prompt_returns_string": isinstance(system_prompt, str) and len(system_prompt) > 0,
        "chat_profile_not_full_registry": len(pb._tools_for_profile("chat")) < len(TOOLS_SCHEMA) if len(TOOLS_SCHEMA) > 1 else True,
        "rp_profile_tools_disabled": len(pb._tools_for_profile("rp")) == 0 and "Available tools" not in _block_content(rp_prompt, "fixed"),
        "summary_profile_tools_disabled": len(pb._tools_for_profile("summary")) == 0
        and pb._format_tool_descriptions("summary") == ""
        and "Available tools" not in _block_content(summary_like, "fixed"),
    }

    _print_json("inputs", {
        "session_id": args.session_id,
        "agent_id": agent_id,
        "room_id": args.room_id,
        "provider": args.provider,
        "model": args.model,
    })
    _print_json("chat_debug_first", _debug_subset(chat_a1))
    _print_json("chat_debug_second", _debug_subset(chat_a2))
    _print_json("chat_debug_different_latest", _debug_subset(chat_b))
    _print_json("rp_debug", _debug_subset(rp_prompt))
    _print_json("tool_profile_counts", {
        "total_registry": len(TOOLS_SCHEMA),
        "chat": len(pb._tools_for_profile("chat")),
        "rp": len(pb._tools_for_profile("rp")),
        "summary": len(pb._tools_for_profile("summary")),
        "proactive": len(pb._tools_for_profile("proactive")),
    })
    _print_json("checks", checks)

    failed = [name for name, ok in checks.items() if not ok]
    if failed:
        _print_json("failed_checks", failed)
        raise SystemExit(1)

    print("\nOK: prompt_builder cache boundary checks passed.")


if __name__ == "__main__":
    asyncio.run(main())
