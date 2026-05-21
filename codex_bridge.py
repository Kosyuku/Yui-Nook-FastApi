from __future__ import annotations

import asyncio
import json
import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any


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


def _codex_command_prefix() -> list[str]:
    codex_cmd = shutil.which("codex.cmd") or shutil.which("codex")
    node_bin = shutil.which("node")
    if codex_cmd and node_bin:
        codex_js = Path(codex_cmd).resolve().parent / "node_modules" / "@openai" / "codex" / "bin" / "codex.js"
        if codex_js.exists():
            return [node_bin, str(codex_js)]
    return [codex_cmd or "codex"]


def _workspace_root() -> str:
    return os.getenv("CODEX_BRIDGE_CWD") or str(Path(__file__).resolve().parent)


def _codex_model() -> str:
    return os.getenv("CODEX_BRIDGE_MODEL", "gpt-5.4").strip()


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


def _parse_json_events(stdout: str) -> tuple[list[dict[str, Any]], str, str]:
    events: list[dict[str, Any]] = []
    thread_id = ""
    reply_parts: list[str] = []

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
        events.append(event)
        if event.get("type") == "thread.started":
            thread_id = str(event.get("thread_id") or thread_id)
        item = event.get("item")
        if isinstance(item, dict) and item.get("type") == "agent_message":
            text = str(item.get("text") or "")
            if text:
                reply_parts.append(text)

    return events, thread_id, "\n".join(reply_parts).strip()


async def _run_codex(args: list[str], prompt: str, timeout_seconds: int) -> tuple[str, str, int]:
    def _run_blocking() -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [*_codex_command_prefix(), *args],
            input=prompt,
            text=True,
            encoding="utf-8",
            errors="replace",
            capture_output=True,
            timeout=max(1, timeout_seconds),
        )

    try:
        completed = await asyncio.to_thread(_run_blocking)
    except subprocess.TimeoutExpired as exc:
        raise TimeoutError("codex bridge timed out") from exc

    return completed.stdout or "", completed.stderr or "", int(completed.returncode or 0)


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

        with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False, suffix=".txt") as tmp:
            output_path = tmp.name

        model = _codex_model()
        model_args = ["-m", model] if model else []
        if existing_thread_id:
            args = [
                "exec",
                "resume",
                "--json",
                *model_args,
                "-o",
                output_path,
                existing_thread_id,
                "-",
            ]
        else:
            args = [
                "exec",
                "--json",
                "--cd",
                _workspace_root(),
                "--sandbox",
                os.getenv("CODEX_BRIDGE_SANDBOX", "read-only"),
                *model_args,
                "-o",
                output_path,
                "-",
            ]

        stdout, stderr, returncode = await _run_codex(args, prompt if prompt is not None else content, timeout_seconds)
        events, new_thread_id, parsed_reply = _parse_json_events(stdout)

        reply = parsed_reply
        try:
            file_reply = Path(output_path).read_text(encoding="utf-8").strip()
            if file_reply:
                reply = file_reply
        except Exception:
            pass
        finally:
            try:
                Path(output_path).unlink(missing_ok=True)
            except Exception:
                pass

        thread_id = new_thread_id or existing_thread_id
        if returncode != 0 and not reply:
            raise RuntimeError((stderr or stdout or "codex bridge failed").strip())
        if not thread_id:
            raise RuntimeError("codex bridge did not return a thread id")
        if not reply:
            reply = "没吐字。Codex 这次空回了。"

        mapping[key] = thread_id
        _write_mapping(mapping)

        return CodexBridgeResult(
            conversation_key=key,
            thread_id=thread_id,
            reply=reply,
            raw_events=events,
            stderr=stderr,
        )
