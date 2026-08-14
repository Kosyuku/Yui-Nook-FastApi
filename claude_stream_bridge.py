"""常驻 `claude -p` + stream-json 双向管道。

对比 claude_tmux_bridge（抓终端画面）：本模块拿到的是**结构化事件**——
工具调用、思考链、逐字 delta、token usage 全部原生带类型，不需要从 UI 抠文本。

架构（一聊天一进程）:

    conversation_key ──► ClaudeProcess（常驻子进程）
                            stdin  ← JSON 行（用户消息）
                            stdout → NDJSON 事件流

    chat_events(key, text) 是主入口，产出规范化事件:
        {"type": "text",     "text": "..."}          逐字正文
        {"type": "thinking", "text": "..."}          思考链
        {"type": "tool",     "name": ..., "input": ...}  工具调用
        {"type": "tool_result", "content": ...}      工具返回
        {"type": "notice",   "kind": "retry"|"compact", ...}
        {"type": "done",     "reply": ..., "usage": {...}, "cost_usd": ...}

关键设计依据（见 docs/PRD/p模式教程）:
- stdin 不关进程就不退 → 常驻的钥匙是 `--input-format stream-json`
- spawn 前必须删 ANTHROPIC_API_KEY，否则无条件压过订阅登录，静默走 API 计费
- `--thinking-display summarized` 是隐藏 flag，无 isInteractive 闸门；
  settings 里的 showThinkingSummaries 在 -p 下不生效
- flag 出生烤死：换 model / 人格 = 杀进程重开
- 按行解析 + 尾巴 buffer：chunk 边界可能切在 JSON 中间

权限：默认**锁死档**（白名单外一律拒绝）。教程示例里用的是
`--dangerously-skip-permissions`，但那是"自己电脑、不上公网"的档位；本 bridge
挂在公网聊天入口后面，进来的消息会驱动一个能读文件的 agent，所以不采用。
见 PERMISSION_TIER。
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import shutil
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, AsyncIterator, Callable

logger = logging.getLogger(__name__)

WORK_DIR: str = os.getenv("CLAUDE_STREAM_CWD", os.getenv("CLAUDE_TMUX_CWD", "/opt/Yui-Nook-FastApi"))
DEFAULT_MODEL: str = os.getenv("CLAUDE_STREAM_MODEL", "opus")
DEFAULT_TIMEOUT: float = float(os.getenv("CLAUDE_STREAM_TIMEOUT", "300"))
SYSTEM_PROMPT_FILE: str = os.getenv("CLAUDE_STREAM_SYSTEM_PROMPT_FILE", "")
MCP_CONFIG: str = os.getenv("CLAUDE_STREAM_MCP_CONFIG", "")
THINKING_DISPLAY: str = os.getenv("CLAUDE_STREAM_THINKING", "summarized")
# 推理量 low|medium|high|xhigh|max（§5）。空 = 用 CC 默认（adaptive）。
# 注意：默认的 adaptive thinking 会对简单问题直接跳过思考，此时 thinking_delta
# 为空是**正确行为**，不代表 --thinking-display 失效。
EFFORT: str = os.getenv("CLAUDE_STREAM_EFFORT", "").strip().lower()
IDLE_REAP_SECONDS: float = float(os.getenv("CLAUDE_STREAM_IDLE_REAP", "3600"))

# ── 权限（教程 §9 三档）────────────────────────────────────────────────────
#
# 这个 bridge 挂在公网聊天入口后面：进来的消息驱动一个能跑 Bash / 读写文件的
# agent。所以默认走**锁死档** —— 白名单外的调用直接拒绝（不挂起、不崩溃），
# 而不是教程示例里的 `--dangerously-skip-permissions`（那是"自己电脑自己用、
# 不暴露公网"的档位，与本部署形态不符）。
#
#   locked  (默认) --permission-mode dontAsk + --allowedTools 白名单
#   prompt          --permission-prompt-tool <MCP工具>，审批弹窗做进聊天 UI
#   bypass          --dangerously-skip-permissions —— 仅限本机调试，勿上公网
#
PERMISSION_TIER: str = os.getenv("CLAUDE_STREAM_PERMISSION_TIER", "locked").strip().lower()

# 陪伴场景实际需要的最小集合：读文件、搜索、以及自己那套 MCP 工具（记忆/日记/
# 相册等，通过 --mcp-config 挂进来的不受 --allowedTools 限制）。
# 默认**不含** Bash / Write / Edit —— 要开自己在环境变量里显式加。
DEFAULT_ALLOWED_TOOLS = "Read,Grep,Glob,WebFetch,WebSearch"
ALLOWED_TOOLS: str = os.getenv("CLAUDE_STREAM_ALLOWED_TOOLS", DEFAULT_ALLOWED_TOOLS).strip()
PERMISSION_PROMPT_TOOL: str = os.getenv("CLAUDE_STREAM_PERMISSION_PROMPT_TOOL", "").strip()

# stdin 单条上限 10MB（官方），留出 JSON 包装余量
MAX_STDIN_BYTES = 9 * 1024 * 1024


class ClaudeStreamError(RuntimeError):
    """管道层面的错误（进程起不来 / 超时 / 认证失效）。"""


@dataclass
class StreamBridgeResult:
    """与 TmuxBridgeResult 形状兼容，便于上层无缝切换。"""

    conversation_key: str
    session_id: str
    reply: str
    thinking: str = ""
    tools: list[dict[str, Any]] = field(default_factory=list)
    usage: dict[str, Any] = field(default_factory=dict)
    cost_usd: float = 0.0
    compacted: bool = False


# ── 进程 ────────────────────────────────────────────────────────────────────


@dataclass
class ClaudeProcess:
    key: str
    proc: asyncio.subprocess.Process
    model: str
    persona: str
    session_id: str = ""
    buffer: str = ""
    listeners: list[Callable[[dict], None]] = field(default_factory=list)
    reader: asyncio.Task | None = None
    last_used: float = 0.0

    @property
    def alive(self) -> bool:
        return self.proc.returncode is None


_procs: dict[str, ClaudeProcess] = {}
_procs_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


def _claude_command() -> str:
    return shutil.which("claude") or "claude"


def _permission_args() -> list[str]:
    """把 PERMISSION_TIER 翻成 flag。默认锁死档。"""
    if PERMISSION_TIER == "bypass":
        logger.warning(
            "claude_stream_bridge running with --dangerously-skip-permissions: "
            "every tool call is auto-approved. Local debugging only — do not "
            "expose this deployment to the public internet."
        )
        return ["--dangerously-skip-permissions"]

    if PERMISSION_TIER == "prompt":
        if not PERMISSION_PROMPT_TOOL:
            raise ClaudeStreamError(
                "CLAUDE_STREAM_PERMISSION_TIER=prompt requires "
                "CLAUDE_STREAM_PERMISSION_PROMPT_TOOL to name an MCP tool"
            )
        return ["--permission-prompt-tool", PERMISSION_PROMPT_TOOL]

    # locked（默认）：白名单外一律拒绝，不挂起
    args = ["--permission-mode", "dontAsk"]
    if ALLOWED_TOOLS:
        args += ["--allowedTools", ALLOWED_TOOLS]
    return args


def _build_args(model: str, persona: str) -> list[str]:
    """附录 B.1（常驻三件套）+ B.2（thinking）+ B.4（全生态）。"""
    args = [
        "-p",
        # ── B.1 常驻管道三件套 ──
        "--input-format", "stream-json",    # stdin 不关进程不退
        "--output-format", "stream-json",
        "--verbose",                        # 不带只有 result，拿不到逐轮事件
        "--include-partial-messages",       # token 级 delta
        # ── B.2 思考链（隐藏 flag，见附录 A）──
        "--thinking-display", THINKING_DISPLAY,
        "--model", model,
    ]
    if EFFORT:
        args += ["--effort", EFFORT]
    args += _permission_args()
    if persona:
        args += ["--system-prompt-file", persona]
    if MCP_CONFIG:
        # B.4 全生态：挂自己的 MCP，并屏蔽机器上其他 MCP
        args += ["--mcp-config", MCP_CONFIG, "--strict-mcp-config"]
    return args


def _child_env() -> dict[str, str]:
    env = dict(os.environ)
    # §13 排错表第一条：环境里有 API key 会无条件压过订阅登录，
    # 结果是你以为在烧订阅额度、实际在烧 API 钱。必须删。
    env.pop("ANTHROPIC_API_KEY", None)
    env.pop("ANTHROPIC_AUTH_TOKEN", None)
    return env


async def _lock_for(key: str) -> asyncio.Lock:
    async with _procs_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
        return lock


async def _pump_stdout(handle: ClaudeProcess) -> None:
    """按行解析 + 尾巴 buffer —— chunk 边界可能切在 JSON 中间。"""
    stream = handle.proc.stdout
    assert stream is not None
    try:
        while True:
            chunk = await stream.read(65536)
            if not chunk:
                break
            handle.buffer += chunk.decode("utf-8", errors="replace")
            lines = handle.buffer.split("\n")
            handle.buffer = lines.pop()  # 不完整的最后一段留到下一批
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                try:
                    event = json.loads(line)
                except json.JSONDecodeError:
                    logger.debug("[%s] unparsable line: %.120s", handle.key, line)
                    continue
                if not isinstance(event, dict):
                    continue
                if event.get("session_id"):
                    handle.session_id = str(event["session_id"])
                for listener in list(handle.listeners):
                    try:
                        listener(event)
                    except Exception:
                        logger.exception("[%s] listener failed", handle.key)
    except asyncio.CancelledError:
        raise
    except Exception:
        logger.exception("[%s] stdout pump crashed", handle.key)
    finally:
        logger.info("[%s] stdout closed", handle.key)
        # 进程没了要立刻叫醒等在队列上的消费者，否则会挂到 timeout 才发现
        for listener in list(handle.listeners):
            try:
                listener({"type": "__closed__"})
            except Exception:
                pass


async def _drain_stderr(handle: ClaudeProcess) -> None:
    stream = handle.proc.stderr
    if stream is None:
        return
    try:
        while True:
            line = await stream.readline()
            if not line:
                break
            text = line.decode("utf-8", errors="replace").strip()
            if text:
                logger.warning("[%s] stderr: %.200s", handle.key, text)
    except asyncio.CancelledError:
        raise
    except Exception:
        pass


async def _spawn(key: str, model: str, persona: str) -> ClaudeProcess:
    args = _build_args(model, persona)
    logger.info("[%s] spawning claude %s", key, " ".join(args))
    try:
        proc = await asyncio.create_subprocess_exec(
            _claude_command(),
            *args,
            cwd=WORK_DIR,
            env=_child_env(),
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
    except FileNotFoundError as exc:
        raise ClaudeStreamError("claude CLI not found on PATH") from exc

    handle = ClaudeProcess(key=key, proc=proc, model=model, persona=persona)
    handle.reader = asyncio.create_task(_pump_stdout(handle))
    asyncio.create_task(_drain_stderr(handle))
    handle.last_used = asyncio.get_running_loop().time()
    return handle


async def _kill(handle: ClaudeProcess) -> None:
    if handle.reader:
        handle.reader.cancel()
    try:
        if handle.proc.stdin and not handle.proc.stdin.is_closing():
            handle.proc.stdin.close()
    except Exception:
        pass
    try:
        handle.proc.kill()
    except ProcessLookupError:
        pass
    except Exception:
        logger.exception("[%s] kill failed", handle.key)
    try:
        await asyncio.wait_for(handle.proc.wait(), timeout=5)
    except Exception:
        pass


async def _get_process(key: str, model: str, persona: str, reset: bool) -> ClaudeProcess:
    """取或建常驻进程。flag 出生烤死 → model/人格变了就重开（§3.4）。"""
    async with _procs_guard:
        handle = _procs.get(key)

        stale = handle is not None and (
            not handle.alive
            or handle.model != model
            or handle.persona != persona
            or reset
        )
        if handle is not None and stale:
            reason = (
                "reset" if reset
                else "dead" if not handle.alive
                else "model/persona changed"
            )
            logger.info("[%s] respawning (%s)", key, reason)
            await _kill(handle)
            _procs.pop(key, None)
            handle = None

        if handle is None:
            handle = await _spawn(key, model, persona)
            _procs[key] = handle

        return handle


def _write_user_message(handle: ClaudeProcess, content: Any) -> None:
    """content 可以是字符串，也可以是 [{type:text},{type:image}] 数组（§3.2）。"""
    payload = json.dumps(
        {"type": "user", "message": {"role": "user", "content": content}},
        ensure_ascii=False,
    ) + "\n"
    raw = payload.encode("utf-8")
    if len(raw) > MAX_STDIN_BYTES:
        raise ClaudeStreamError(
            f"message too large ({len(raw)} bytes); stdin caps at 10MB — pass a file path instead"
        )
    stdin = handle.proc.stdin
    if stdin is None or stdin.is_closing():
        raise ClaudeStreamError("claude stdin is closed")
    stdin.write(raw)


# ── 事件规范化 ──────────────────────────────────────────────────────────────


def _normalize(event: dict) -> list[dict]:
    """把 CC 原始事件翻译成前端消费的规范事件。一条原始事件可能产出 0..n 条。"""
    etype = event.get("type", "")

    if etype == "stream_event":
        inner = event.get("event") or {}
        if inner.get("type") != "content_block_delta":
            return []
        delta = inner.get("delta") or {}
        dtype = delta.get("type")
        if dtype == "text_delta":
            text = delta.get("text") or ""
            return [{"type": "text", "text": text}] if text else []
        if dtype == "thinking_delta":
            text = delta.get("thinking") or delta.get("text") or ""
            return [{"type": "thinking", "text": text}] if text else []
        return []

    if etype == "assistant":
        out: list[dict] = []
        content = (event.get("message") or {}).get("content") or []
        if isinstance(content, list):
            for block in content:
                if not isinstance(block, dict):
                    continue
                if block.get("type") == "tool_use":
                    out.append({
                        "type": "tool",
                        "id": block.get("id", ""),
                        "name": block.get("name", ""),
                        "input": block.get("input") or {},
                    })
        return out

    if etype == "user":
        # 工具执行结果回填
        out = []
        content = (event.get("message") or {}).get("content") or []
        if isinstance(content, list):
            for block in content:
                if isinstance(block, dict) and block.get("type") == "tool_result":
                    out.append({
                        "type": "tool_result",
                        "id": block.get("tool_use_id", ""),
                        "content": block.get("content"),
                        "is_error": bool(block.get("is_error")),
                    })
        return out

    if etype == "system":
        subtype = event.get("subtype", "")
        if subtype == "api_retry":
            return [{
                "type": "notice",
                "kind": "retry",
                "error": event.get("error", ""),
                "attempt": event.get("attempt"),
                "max_retries": event.get("max_retries"),
            }]
        if subtype == "compact_boundary":
            return [{"type": "notice", "kind": "compact"}]
        return []

    if etype == "result":
        return [{
            "type": "done",
            "subtype": event.get("subtype", "success"),
            "reply": event.get("result") or "",
            "usage": event.get("usage") or {},
            "cost_usd": event.get("total_cost_usd") or 0.0,
            "num_turns": event.get("num_turns"),
            "session_id": event.get("session_id", ""),
        }]

    return []


# ── 主入口 ──────────────────────────────────────────────────────────────────


async def chat_events(
    conversation_key: str,
    content: Any,
    *,
    model: str = "",
    persona_file: str = "",
    reset: bool = False,
    timeout_seconds: float = DEFAULT_TIMEOUT,
) -> AsyncIterator[dict]:
    """发一条消息，产出规范化事件流，直到本轮 `result` 为止。

    注意：客户端断开**不要** kill 进程（§10）——让 CC 跑完、回复落盘，
    重连后从自己的存储里补发。所以本函数被取消时只摘 listener，不动进程。
    """
    key = conversation_key.strip()
    if not key:
        raise ValueError("conversation_key is required")
    if isinstance(content, str) and not content.strip():
        raise ValueError("content is required")

    model = (model or DEFAULT_MODEL).strip()
    persona = (persona_file or SYSTEM_PROMPT_FILE).strip()
    if persona and not Path(persona).exists():
        logger.warning("persona file %s missing — falling back to default prompt", persona)
        persona = ""

    lock = await _lock_for(key)
    async with lock:
        handle = await _get_process(key, model, persona, reset)

        queue: asyncio.Queue[dict | None] = asyncio.Queue()

        def listener(event: dict) -> None:
            queue.put_nowait(event)

        handle.listeners.append(listener)
        try:
            _write_user_message(handle, content)
            await handle.proc.stdin.drain()  # type: ignore[union-attr]

            loop = asyncio.get_running_loop()
            deadline = loop.time() + timeout_seconds

            while True:
                remaining = deadline - loop.time()
                if remaining <= 0:
                    raise ClaudeStreamError(f"claude stream timed out after {timeout_seconds}s")
                if not handle.alive:
                    raise ClaudeStreamError("claude process exited mid-turn")

                try:
                    raw = await asyncio.wait_for(queue.get(), timeout=remaining)
                except asyncio.TimeoutError:
                    raise ClaudeStreamError(f"claude stream timed out after {timeout_seconds}s")

                if raw is None or raw.get("type") == "__closed__":
                    raise ClaudeStreamError(
                        "claude process exited mid-turn (check login: `claude login`)"
                    )

                for normalized in _normalize(raw):
                    yield normalized
                    if normalized["type"] == "done":
                        handle.last_used = loop.time()
                        return
        finally:
            try:
                handle.listeners.remove(listener)
            except ValueError:
                pass


async def claude_stream_chat(
    conversation_key: str,
    content: Any,
    *,
    model: str = "",
    persona_file: str = "",
    reset: bool = False,
    timeout_seconds: float = DEFAULT_TIMEOUT,
    on_progress: Callable[[dict], Any] | None = None,
) -> StreamBridgeResult:
    """一次性接口：内部消费事件流，攒出完整回复。

    形状与 claude_tmux_chat 对齐，方便上层切换。想要流式就直接用 chat_events。
    """
    text_parts: list[str] = []
    thinking_parts: list[str] = []
    tools: list[dict[str, Any]] = []
    usage: dict[str, Any] = {}
    cost = 0.0
    compacted = False
    final_reply = ""

    async for event in chat_events(
        conversation_key,
        content,
        model=model,
        persona_file=persona_file,
        reset=reset,
        timeout_seconds=timeout_seconds,
    ):
        if on_progress is not None:
            try:
                result = on_progress(event)
                if asyncio.iscoroutine(result):
                    await result
            except Exception:
                logger.debug("on_progress failed", exc_info=True)

        etype = event["type"]
        if etype == "text":
            text_parts.append(event["text"])
        elif etype == "thinking":
            thinking_parts.append(event["text"])
        elif etype == "tool":
            tools.append({"name": event["name"], "input": event["input"]})
        elif etype == "notice" and event.get("kind") == "compact":
            compacted = True
        elif etype == "done":
            final_reply = event["reply"]
            usage = event["usage"]
            cost = event["cost_usd"]

    reply = final_reply or "".join(text_parts)
    handle = _procs.get(conversation_key.strip())

    return StreamBridgeResult(
        conversation_key=conversation_key.strip(),
        session_id=handle.session_id if handle else "",
        reply=reply.strip() or "（Claude 这次空回了）",
        thinking="".join(thinking_parts).strip(),
        tools=tools,
        usage=usage,
        cost_usd=cost,
        compacted=compacted,
    )


async def claude_stream_reset(conversation_key: str) -> None:
    """杀掉该会话的常驻进程，下次发消息重开。"""
    key = conversation_key.strip()
    lock = await _lock_for(key)
    async with lock:
        async with _procs_guard:
            handle = _procs.pop(key, None)
        if handle is not None:
            await _kill(handle)
            logger.info("[%s] reset — process killed", key)


def list_active_processes() -> list[dict[str, Any]]:
    return [
        {
            "conversation_key": key,
            "session_id": handle.session_id,
            "model": handle.model,
            "alive": handle.alive,
            "pid": handle.proc.pid,
        }
        for key, handle in _procs.items()
    ]


async def shutdown_all() -> None:
    """FastAPI 关停时调用，别留孤儿进程。"""
    async with _procs_guard:
        handles = list(_procs.values())
        _procs.clear()
    for handle in handles:
        await _kill(handle)


async def reap_idle(max_idle_seconds: float = IDLE_REAP_SECONDS) -> int:
    """回收长期空闲的进程。每个常驻 CC 都占内存，聊天多了要清。"""
    loop = asyncio.get_running_loop()
    now = loop.time()
    reaped = 0
    async with _procs_guard:
        stale = [
            key for key, handle in _procs.items()
            if not handle.alive or (now - handle.last_used) > max_idle_seconds
        ]
        handles = [(key, _procs.pop(key)) for key in stale]
    for key, handle in handles:
        await _kill(handle)
        logger.info("[%s] reaped (idle)", key)
        reaped += 1
    return reaped
