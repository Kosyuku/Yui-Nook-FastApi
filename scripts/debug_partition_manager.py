from __future__ import annotations

import argparse
import asyncio
import json
import os
from pathlib import Path
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Inspect or locally validate conversation partitions.")
    parser.add_argument("--live-db", action="store_true", help="Read the configured real DB. Default uses temp SQLite.")
    parser.add_argument("--agent-id", default="azheng")
    parser.add_argument("--session-id", default="")
    parser.add_argument("--rp-room-id", default="")
    parser.add_argument("--mode", choices=("chat", "rp"), default="chat")
    parser.add_argument("--limit", type=int, default=10)
    return parser.parse_args()


ARGS = _parse_args()
if not ARGS.live_db:
    os.environ["DATABASE_BACKEND"] = "sqlite"
    os.environ["MEMORY_BACKEND"] = "sqlite"
    os.environ["CONVERSATION_PARTITIONS_ENABLED"] = "false"
    os.environ["DATABASE_PATH"] = str(Path(tempfile.gettempdir()) / "yui_nook_debug_partition_manager.db")

import database as db
from partition_manager import (
    append_committed_turn,
    get_or_create_partition,
    inspect_partition,
    should_rotate,
    update_partition_summary,
)


def _dump(title: str, payload: object) -> None:
    print(f"\n## {title}")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def _turn(index: int) -> tuple[dict[str, str], dict[str, str]]:
    return (
        {"id": f"u{index}", "role": "user", "content": f"user turn {index}", "created_at": f"t{index}u"},
        {"id": f"a{index}", "role": "assistant", "content": f"assistant turn {index}", "created_at": f"t{index}a"},
    )


async def _run_live_inspect() -> None:
    result = await inspect_partition(
        agent_id=ARGS.agent_id,
        session_id=ARGS.session_id,
        rp_room_id=ARGS.rp_room_id,
        mode=ARGS.mode,
    )
    if result and ARGS.limit >= 0:
        result["history_b_recent"] = result["history_b_recent"][-max(0, min(ARGS.limit, 10)) :]
    _dump("live_inspect", result)
    await db.close_db()


async def _run_local_checks() -> None:
    db_path = Path(os.environ["DATABASE_PATH"])
    if db_path.exists():
        db_path.unlink()

    chat_s1 = await get_or_create_partition(
        agent_id="azheng",
        session_id="session-one",
        mode="chat",
        rotate_every=2,
    )
    chat_s1_again = await get_or_create_partition(
        agent_id="azheng",
        session_id="session-one",
        mode="chat",
        rotate_every=2,
    )
    chat_s2 = await get_or_create_partition(
        agent_id="azheng",
        session_id="session-two",
        mode="chat",
        rotate_every=2,
    )
    rp_r1 = await get_or_create_partition(
        agent_id="azheng",
        rp_room_id="room-one",
        mode="rp",
        rotate_every=2,
    )
    rp_r2 = await get_or_create_partition(
        agent_id="azheng",
        rp_room_id="room-two",
        mode="rp",
        rotate_every=2,
    )

    # TODO: replace this placeholder with a real summary revision once the
    # summarizer owns partition updates.
    chat_s1 = await update_partition_summary(
        chat_s1,
        summary_text="TODO: partition summary placeholder",
        summary_revision="debug-placeholder",
    )

    user_1, assistant_1 = _turn(1)
    before_rotate_first = should_rotate(chat_s1)
    chat_s1 = await append_committed_turn(
        chat_s1,
        user_message=user_1,
        assistant_message=assistant_1,
    )
    user_2, assistant_2 = _turn(2)
    before_rotate_second = should_rotate(chat_s1)
    history_b_before_rotate = list(chat_s1.history_b)
    chat_s1 = await append_committed_turn(
        chat_s1,
        user_message=user_2,
        assistant_message=assistant_2,
    )

    inspected_chat_s1 = await inspect_partition(agent_id="azheng", session_id="session-one", mode="chat")
    inspected_missing = await inspect_partition(agent_id="azheng", session_id="missing", mode="chat")

    checks = {
        "chat_partition_created": chat_s1.mode == "chat" and chat_s1.session_id == "session-one",
        "rp_partition_created": rp_r1.mode == "rp" and rp_r1.rp_room_id == "room-one",
        "different_chat_sessions_isolated": chat_s1.id != chat_s2.id,
        "different_rp_rooms_isolated": rp_r1.id != rp_r2.id,
        "get_or_create_reuses_existing": chat_s1_again.id == chat_s1.id,
        "history_b_increased_after_append": len(history_b_before_rotate) == 2,
        "should_rotate_false_before_first_turn": before_rotate_first is False,
        "should_rotate_true_before_second_turn": before_rotate_second is True,
        "history_b_cleared_after_rotate": len(chat_s1.history_b) == 0,
        "old_history_b_moved_to_history_a": len(chat_s1.history_a) == 4
        and [item["content"] for item in chat_s1.history_a[:2]]
        == [item["content"] for item in history_b_before_rotate],
        "history_a_cycle_incremented": chat_s1.history_a_cycle_id == "a1",
        "history_b_cycle_incremented": chat_s1.history_b_cycle_id == "b1",
        "summary_placeholder_retained": chat_s1.summary_text == "TODO: partition summary placeholder",
        "inspect_existing_returns_dict": isinstance(inspected_chat_s1, dict),
        "inspect_missing_returns_none": inspected_missing is None,
        "local_sqlite_only": os.environ["DATABASE_BACKEND"] == "sqlite" and str(db_path).startswith(tempfile.gettempdir()),
    }

    _dump(
        "partitions",
        {
            "chat_s1": chat_s1.debug_metadata(),
            "chat_s2": chat_s2.debug_metadata(),
            "rp_r1": rp_r1.debug_metadata(),
            "rp_r2": rp_r2.debug_metadata(),
            "inspect_chat_s1": inspected_chat_s1,
        },
    )
    _dump("checks", checks)

    await db.close_db()

    failed = [name for name, ok in checks.items() if not ok]
    if failed:
        raise SystemExit(f"FAILED: {', '.join(failed)}")
    print("\nOK: partition_manager checks passed.")


async def main() -> None:
    if ARGS.live_db:
        await _run_live_inspect()
    else:
        await _run_local_checks()


if __name__ == "__main__":
    asyncio.run(main())
