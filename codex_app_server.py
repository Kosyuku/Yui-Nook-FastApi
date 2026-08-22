from __future__ import annotations

import asyncio
import json
import os
import shutil
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


class CodexAppServerError(RuntimeError):
    pass


@dataclass
class CodexTurnResult:
    thread_id: str
    turn_id: str
    reply: str
    events: list[dict[str, Any]]
    stderr: str


def _codex_command_prefix() -> list[str]:
    codex_cmd = shutil.which("codex.cmd") or shutil.which("codex")
    node_bin = shutil.which("node")
    if codex_cmd and node_bin:
        codex_js = (
            Path(codex_cmd).resolve().parent
            / "node_modules"
            / "@openai"
            / "codex"
            / "bin"
            / "codex.js"
        )
        if codex_js.exists():
            return [node_bin, str(codex_js)]
    return [codex_cmd or "codex"]


def _workspace_root() -> str:
    return os.getenv("CODEX_BRIDGE_CWD") or str(Path(__file__).resolve().parent)


def _codex_model() -> str:
    return os.getenv("CODEX_BRIDGE_MODEL", "gpt-5.4").strip()


def _approval_policy() -> str:
    value = os.getenv("CODEX_BRIDGE_APPROVAL_POLICY", "never").strip()
    allowed = {"untrusted", "on-failure", "on-request", "never"}
    return value if value in allowed else "never"


def _sandbox_mode() -> str:
    value = os.getenv("CODEX_BRIDGE_SANDBOX", "read-only").strip()
    allowed = {"read-only", "workspace-write", "danger-full-access"}
    return value if value in allowed else "read-only"


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class CodexAppServerClient:
    """One long-lived Codex app-server process speaking JSON-RPC over stdio."""

    def __init__(self) -> None:
        self._process: asyncio.subprocess.Process | None = None
        self._reader_task: asyncio.Task | None = None
        self._stderr_task: asyncio.Task | None = None
        self._start_lock = asyncio.Lock()
        self._write_lock = asyncio.Lock()
        self._next_id = 1
        self._pending: dict[int, asyncio.Future] = {}
        self._pending_server_requests: dict[str, dict[str, Any]] = {}
        self._thread_subscribers: dict[str, set[asyncio.Queue]] = defaultdict(set)
        self._global_subscribers: set[asyncio.Queue] = set()
        self._loaded_threads: set[str] = set()
        self._active_turns: dict[str, str] = {}
        self._stderr_lines: deque[str] = deque(maxlen=100)
        self._started_at: str | None = None
        self._last_error = ""
        self._stopping = False

    @property
    def is_running(self) -> bool:
        return self._process is not None and self._process.returncode is None

    async def start(self) -> None:
        if self.is_running:
            return
        async with self._start_lock:
            if self.is_running:
                return
            await self._stop_process()
            self._stopping = False
            command = [*_codex_command_prefix(), "app-server", "--listen", "stdio://"]
            try:
                self._process = await asyncio.create_subprocess_exec(
                    *command,
                    cwd=_workspace_root(),
                    stdin=asyncio.subprocess.PIPE,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                )
            except Exception as exc:
                self._last_error = str(exc)
                raise CodexAppServerError(f"failed to start codex app-server: {exc}") from exc

            self._started_at = _utc_now()
            self._last_error = ""
            self._reader_task = asyncio.create_task(self._read_stdout())
            self._stderr_task = asyncio.create_task(self._read_stderr())
            try:
                await asyncio.wait_for(
                    self.request(
                        "initialize",
                        {"clientInfo": {"name": "yui-nook", "version": "0.1.0"}},
                        ensure_started=False,
                    ),
                    timeout=15,
                )
                await self.notify("initialized", {}, ensure_started=False)
            except Exception:
                await self._stop_process()
                raise

    async def stop(self) -> None:
        async with self._start_lock:
            await self._stop_process()

    async def _stop_process(self) -> None:
        process = self._process
        self._process = None
        self._stopping = True
        tasks = [task for task in (self._reader_task, self._stderr_task) if task]
        self._reader_task = None
        self._stderr_task = None

        if process and process.returncode is None:
            process.terminate()
            try:
                await asyncio.wait_for(process.wait(), timeout=5)
            except asyncio.TimeoutError:
                process.kill()
                await process.wait()

        current = asyncio.current_task()
        for task in tasks:
            if task is not current and not task.done():
                task.cancel()
        for task in tasks:
            if task is current:
                continue
            try:
                await task
            except (asyncio.CancelledError, Exception):
                pass

        error = CodexAppServerError("codex app-server stopped")
        for future in list(self._pending.values()):
            if not future.done():
                future.set_exception(error)
        self._pending.clear()
        self._pending_server_requests.clear()
        self._loaded_threads.clear()
        self._active_turns.clear()
        if process:
            self._last_error = ""

    async def _read_stdout(self) -> None:
        process = self._process
        if not process or not process.stdout:
            return
        try:
            while True:
                raw = await process.stdout.readline()
                if not raw:
                    break
                try:
                    message = json.loads(raw.decode("utf-8", errors="replace"))
                except json.JSONDecodeError:
                    continue
                if isinstance(message, dict):
                    await self._handle_message(message)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            self._last_error = str(exc)
        finally:
            if process.returncode is None:
                await process.wait()
            exit_message = {
                "method": "bridge/processExited",
                "params": {"returncode": process.returncode},
            }
            await self._publish(exit_message)
            error = CodexAppServerError(f"codex app-server exited with code {process.returncode}")
            if not self._stopping:
                self._last_error = str(error)
            for future in list(self._pending.values()):
                if not future.done():
                    future.set_exception(error)
            self._pending.clear()

    async def _read_stderr(self) -> None:
        process = self._process
        if not process or not process.stderr:
            return
        try:
            while True:
                raw = await process.stderr.readline()
                if not raw:
                    break
                line = raw.decode("utf-8", errors="replace").rstrip()
                if line:
                    self._stderr_lines.append(line)
        except asyncio.CancelledError:
            raise

    async def _handle_message(self, message: dict[str, Any]) -> None:
        request_id = message.get("id")
        method = message.get("method")
        if request_id is not None and not method:
            future = self._pending.pop(request_id, None)
            if not future or future.done():
                return
            if "error" in message:
                error = message.get("error") or {}
                detail = error.get("message") if isinstance(error, dict) else str(error)
                future.set_exception(CodexAppServerError(detail or "app-server request failed"))
            else:
                future.set_result(message.get("result"))
            return

        if request_id is not None and method:
            self._pending_server_requests[str(request_id)] = message
        await self._publish(message)

    async def _publish(self, message: dict[str, Any]) -> None:
        params = message.get("params")
        thread_id = ""
        if isinstance(params, dict):
            thread_id = str(params.get("threadId") or "")
            if not thread_id and isinstance(params.get("thread"), dict):
                thread_id = str(params["thread"].get("id") or "")

        subscribers = set(self._global_subscribers)
        if thread_id:
            subscribers.update(self._thread_subscribers.get(thread_id, set()))
        for queue in subscribers:
            try:
                queue.put_nowait(message)
            except asyncio.QueueFull:
                try:
                    queue.get_nowait()
                    queue.put_nowait(message)
                except (asyncio.QueueEmpty, asyncio.QueueFull):
                    pass

    async def _send(self, payload: dict[str, Any]) -> None:
        process = self._process
        if not process or process.returncode is not None or not process.stdin:
            raise CodexAppServerError("codex app-server is not running")
        data = (json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8")
        async with self._write_lock:
            process.stdin.write(data)
            await process.stdin.drain()

    async def request(
        self,
        method: str,
        params: dict[str, Any] | None = None,
        *,
        ensure_started: bool = True,
    ) -> Any:
        if ensure_started:
            await self.start()
        request_id = self._next_id
        self._next_id += 1
        future = asyncio.get_running_loop().create_future()
        self._pending[request_id] = future
        try:
            await self._send({"id": request_id, "method": method, "params": params or {}})
            return await future
        except Exception:
            self._pending.pop(request_id, None)
            raise

    async def notify(
        self,
        method: str,
        params: dict[str, Any] | None = None,
        *,
        ensure_started: bool = True,
    ) -> None:
        if ensure_started:
            await self.start()
        await self._send({"method": method, "params": params or {}})

    def subscribe(self, thread_id: str | None = None) -> asyncio.Queue:
        queue: asyncio.Queue = asyncio.Queue(maxsize=500)
        if thread_id:
            self._thread_subscribers[thread_id].add(queue)
        else:
            self._global_subscribers.add(queue)
        return queue

    def unsubscribe(self, queue: asyncio.Queue, thread_id: str | None = None) -> None:
        if thread_id:
            subscribers = self._thread_subscribers.get(thread_id)
            if subscribers:
                subscribers.discard(queue)
                if not subscribers:
                    self._thread_subscribers.pop(thread_id, None)
        else:
            self._global_subscribers.discard(queue)

    async def _open_thread(self, thread_id: str = "") -> str:
        if thread_id and thread_id in self._loaded_threads:
            return thread_id

        common: dict[str, Any] = {
            "cwd": _workspace_root(),
            "approvalPolicy": _approval_policy(),
            "sandbox": _sandbox_mode(),
        }
        model = _codex_model()
        if model:
            common["model"] = model

        if thread_id:
            try:
                result = await self.request(
                    "thread/resume",
                    {**common, "threadId": thread_id},
                )
            except CodexAppServerError:
                result = await self.request("thread/start", common)
        else:
            result = await self.request("thread/start", common)

        thread = result.get("thread") if isinstance(result, dict) else None
        opened_id = str(thread.get("id") or "") if isinstance(thread, dict) else ""
        if not opened_id:
            raise CodexAppServerError("app-server did not return a thread id")
        self._loaded_threads.add(opened_id)
        return opened_id

    async def run_turn(
        self,
        *,
        prompt: str,
        thread_id: str = "",
        timeout_seconds: int = 180,
    ) -> CodexTurnResult:
        await self.start()
        opened_thread_id = await self._open_thread(thread_id)
        queue = self.subscribe(opened_thread_id)
        events: list[dict[str, Any]] = []
        completed_messages: list[str] = []
        deltas: dict[str, list[str]] = defaultdict(list)
        turn_id = ""

        try:
            response = await self.request(
                "turn/start",
                {
                    "threadId": opened_thread_id,
                    "input": [{"type": "text", "text": prompt}],
                },
            )
            turn = response.get("turn") if isinstance(response, dict) else None
            turn_id = str(turn.get("id") or "") if isinstance(turn, dict) else ""
            if not turn_id:
                raise CodexAppServerError("app-server did not return a turn id")
            self._active_turns[opened_thread_id] = turn_id

            async def wait_for_completion() -> None:
                while True:
                    event = await queue.get()
                    events.append(event)
                    method = str(event.get("method") or "")
                    params = event.get("params")
                    if not isinstance(params, dict):
                        params = {}
                    event_turn_id = str(params.get("turnId") or "")
                    event_turn = params.get("turn")
                    if not event_turn_id and isinstance(event_turn, dict):
                        event_turn_id = str(event_turn.get("id") or "")
                    if event_turn_id and event_turn_id != turn_id:
                        continue
                    if method == "item/agentMessage/delta":
                        item_id = str(params.get("itemId") or "agent")
                        deltas[item_id].append(str(params.get("delta") or ""))
                    elif method == "item/completed":
                        item = params.get("item")
                        if isinstance(item, dict) and item.get("type") == "agentMessage":
                            text = str(item.get("text") or "").strip()
                            if text:
                                completed_messages.append(text)
                    elif method == "turn/completed":
                        completed_turn = params.get("turn")
                        status = completed_turn.get("status") if isinstance(completed_turn, dict) else ""
                        if status == "failed":
                            error = completed_turn.get("error") or {}
                            detail = error.get("message") if isinstance(error, dict) else str(error)
                            raise CodexAppServerError(detail or "Codex turn failed")
                        if status == "interrupted":
                            raise CodexAppServerError("Codex turn was interrupted")
                        return
                    elif method == "bridge/processExited":
                        raise CodexAppServerError("codex app-server exited during the turn")

            try:
                await asyncio.wait_for(wait_for_completion(), timeout=max(1, timeout_seconds))
            except asyncio.TimeoutError as exc:
                await self.interrupt(opened_thread_id, turn_id)
                raise TimeoutError("codex app-server turn timed out") from exc

            reply = "\n".join(completed_messages).strip()
            if not reply:
                reply = "".join("".join(parts) for parts in deltas.values()).strip()
            return CodexTurnResult(
                thread_id=opened_thread_id,
                turn_id=turn_id,
                reply=reply,
                events=events,
                stderr="\n".join(self._stderr_lines),
            )
        finally:
            self.unsubscribe(queue, opened_thread_id)
            if self._active_turns.get(opened_thread_id) == turn_id:
                self._active_turns.pop(opened_thread_id, None)

    async def list_threads(self, limit: int = 50) -> dict[str, Any]:
        result = await self.request(
            "thread/list",
            {"limit": max(1, min(int(limit), 200)), "sortKey": "updated_at"},
        )
        return result if isinstance(result, dict) else {"data": []}

    async def interrupt(self, thread_id: str, turn_id: str | None = None) -> dict[str, Any]:
        resolved_turn_id = (turn_id or self._active_turns.get(thread_id) or "").strip()
        if not thread_id.strip() or not resolved_turn_id:
            raise CodexAppServerError("thread_id and an active turn_id are required")
        result = await self.request(
            "turn/interrupt",
            {"threadId": thread_id.strip(), "turnId": resolved_turn_id},
        )
        return result if isinstance(result, dict) else {}

    async def respond_to_server_request(
        self,
        request_id: str,
        result: dict[str, Any],
    ) -> None:
        pending = self._pending_server_requests.pop(str(request_id), None)
        if not pending:
            raise CodexAppServerError("server request is no longer pending")
        await self._send({"id": pending.get("id"), "result": result})

    def status(self) -> dict[str, Any]:
        process = self._process
        return {
            "running": self.is_running,
            "pid": process.pid if process and self.is_running else None,
            "started_at": self._started_at,
            "cwd": _workspace_root(),
            "model": _codex_model(),
            "sandbox": _sandbox_mode(),
            "approval_policy": _approval_policy(),
            "active_turns": dict(self._active_turns),
            "pending_requests": list(self._pending_server_requests.values()),
            "last_error": self._last_error,
            "stderr_tail": list(self._stderr_lines)[-20:],
        }


codex_app_server = CodexAppServerClient()
