from __future__ import annotations

import asyncio
import json
import os
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any

BRIDGE_PATH = Path(__file__).resolve().parent / "data" / "claude_bridge_sessions.json"
DEFAULT_TIMEOUT_SECONDS = 180


@dataclass
class ClaudeBridgeResult:
    conversation_key: str
    session_id: str
    reply: str
    raw_output: str
    stderr: str


_locks_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


def _claude_command() -> str:
    return shutil.which("claude") or "claude"


def _claude_model() -> str:
    return os.getenv("CLAUDE_BRIDGE_MODEL", "claude-sonnet-4-5").strip()


def _system_prompt() -> str:
    """读取 CLAUDE.md 作为系统 prompt，或者用环境变量 CLAUDE_BRIDGE_SYSTEM。"""
    env_prompt = os.getenv("CLAUDE_BRIDGE_SYSTEM", "").strip()
    if env_prompt:
        return env_prompt
    claude_md = Path(__file__).resolve().parent / "CLAUDE.md"
    if claude_md.exists():
        return claude_md.read_text(encoding="utf-8").strip()
    return ""


def _read_mapping() -> dict[str, str]:
    if not BRIDGE_PATH.exists():
        return {}
    try:
        raw = json.loads(BRIDGE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if not isinstance(raw, dict):
        return {}
    return {str(k): str(v) for k, v in raw.items() if k and v}


def _write_mapping(mapping: dict[str, str]) -> None:
    BRIDGE_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = BRIDGE_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(BRIDGE_PATH)


async def _lock_for(key: str) -> asyncio.Lock:
    async with _locks_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
        return lock


def _parse_output(stdout: str) -> tuple[str, str]:
    """从 Claude Code 的 JSON 输出中提取 reply 和 session_id。"""
    reply_parts: list[str] = []
    session_id = ""

    for line in stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if not isinstance(event, dict):
            continue

        # 提取 session_id
        if event.get("session_id"):
            session_id = str(event["session_id"])

        # 提取回复文本
        event_type = event.get("type", "")
        if event_type == "result":
            text = event.get("result", "") or event.get("content", "")
            if text:
                reply_parts.append(str(text))
        elif event_type == "assistant":
            content = event.get("message", {}).get("content", [])
            if isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        reply_parts.append(block.get("text", ""))
            elif isinstance(content, str):
                reply_parts.append(content)

    reply = "\n".join(p for p in reply_parts if p).strip()
    return reply, session_id


async def _run_claude(args: list[str], timeout_seconds: int) -> tuple[str, str, int]:
    def _blocking() -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [_claude_command(), *args],
            text=True,
            encoding="utf-8",
            errors="replace",
            capture_output=True,
            timeout=max(1, timeout_seconds),
        )

    try:
        completed = await asyncio.to_thread(_blocking)
    except subprocess.TimeoutExpired as exc:
        raise TimeoutError("claude bridge timed out") from exc

    return completed.stdout or "", completed.stderr or "", int(completed.returncode or 0)


async def claude_bridge_chat(
    *,
    conversation_key: str,
    content: str,
    system_prompt: str | None = None,
    reset: bool = False,
    timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS,
) -> ClaudeBridgeResult:
    key = conversation_key.strip()
    if not key:
        raise ValueError("conversation_key is required")
    if not content.strip():
        raise ValueError("content is required")

    lock = await _lock_for(key)
    async with lock:
        mapping = _read_mapping()
        existing_session = "" if reset else mapping.get(key, "")

        model = _claude_model()
        sys_prompt = system_prompt if system_prompt is not None else _system_prompt()

        if existing_session:
            # 续上之前的对话
            args = [
                "-p", content,
                "--resume", existing_session,
                "--output-format", "json",
                "--model", model,
            ]
        else:
            # 新对话
            args = [
                "-p", content,
                "--output-format", "json",
                "--model", model,
            ]
            if sys_prompt:
                args += ["--system-prompt", sys_prompt]

        stdout, stderr, returncode = await _run_claude(args, timeout_seconds)
        reply, new_session_id = _parse_output(stdout)

        session_id = new_session_id or existing_session

        if returncode != 0 and not reply:
            raise RuntimeError((stderr or stdout or "claude bridge failed").strip())

        if not reply:
            reply = "（Claude 这次空回了）"

        if session_id:
            mapping[key] = session_id
            _write_mapping(mapping)

        return ClaudeBridgeResult(
            conversation_key=key,
            session_id=session_id,
            reply=reply,
            raw_output=stdout,
            stderr=stderr,
        )


async def claude_bridge_reset(conversation_key: str) -> None:
    """清除某个对话的 session，下次重新开始。"""
    key = conversation_key.strip()
    lock = await _lock_for(key)
    async with lock:
        mapping = _read_mapping()
        mapping.pop(key, None)
        _write_mapping(mapping)
