from __future__ import annotations

"""
Claude Code tmux bridge
-----------------------
在 VPS 上为每个对话维护一个交互式 `claude` tmux session。
消息通过 `tmux send-keys` 注入，回复通过 `tmux capture-pane` 读取。
走 Claude 订阅额度，不计 API 账单。

Session 命名规则：cc_<conversation_key>
所有 session 都在 tmux server 里，FastAPI 重启不影响。
"""

import asyncio
import os
import re
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path

# Claude Code 启动目录（VPS 上的项目根目录）
WORK_DIR = os.getenv("CLAUDE_TMUX_CWD", "/opt/Yui-Nook-FastApi")

# 等待回复的超时秒数
DEFAULT_TIMEOUT = int(os.getenv("CLAUDE_TMUX_TIMEOUT", "120"))

# 轮询间隔（秒）
POLL_INTERVAL = 0.4

# 输出稳定判定：连续 N 次 capture 内容相同则认为回复完毕
STABLE_ROUNDS = 4

# Claude Code 交互式提示符特征（回复结束后 claude 会重新显示输入区）
# claude 的提示符是一个带颜色的 > 或者空行后的光标，用「esc[」ANSI 序列结尾
PROMPT_PATTERN = re.compile(r"(\$\s*|\>\s*)$", re.MULTILINE)


@dataclass
class TmuxBridgeResult:
    conversation_key: str
    session_name: str
    reply: str
    raw_pane: str


_locks_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


# ── tmux 工具函数 ──────────────────────────────────────────────────────────────

def _tmux(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["tmux", *args],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )


def _session_exists(name: str) -> bool:
    r = _tmux("has-session", "-t", name)
    return r.returncode == 0


def _create_session(name: str) -> None:
    """新建 tmux session，cd 到工作目录，启动 claude。"""
    _tmux(
        "new-session", "-d",
        "-s", name,
        "-x", "220", "-y", "50",
    )
    # cd 到项目目录
    _tmux("send-keys", "-t", name, f"cd {WORK_DIR}", "Enter")
    time.sleep(0.5)
    # 启动 claude 交互式
    _tmux("send-keys", "-t", name, "claude", "Enter")
    # 等 claude 启动（鉴权 + 加载需要几秒）
    time.sleep(6)


def _capture_pane(name: str) -> str:
    r = _tmux("capture-pane", "-t", name, "-p", "-e")
    return r.stdout or ""


def _send_message(name: str, message: str) -> None:
    """把消息注入 tmux session。多行消息逐行发送。"""
    lines = message.strip().splitlines()
    if not lines:
        return
    # 把多行合并成单行发送（用空格连接），避免 Enter 提前触发
    single = " ".join(lines)
    _tmux("send-keys", "-t", name, single, "Enter")


def _strip_ansi(text: str) -> str:
    ansi = re.compile(r"\x1b\[[0-9;]*[mGKHF]|\x1b\].*?\x07|\x1b[@-Z\\-_]")
    return ansi.sub("", text)


def _extract_reply(before: str, after: str) -> str:
    """
    从 capture-pane 前后内容的差异中提取 Claude 的回复。
    策略：取 after 中比 before 多出的部分，去掉 ANSI，清理空行。
    """
    after_clean = _strip_ansi(after)
    before_clean = _strip_ansi(before)

    # 找到 before 最后一行在 after 中的位置，取之后的内容
    before_lines = [l for l in before_clean.splitlines() if l.strip()]
    after_lines = after_clean.splitlines()

    if before_lines:
        last_before = before_lines[-1].strip()
        cut = 0
        for i, line in enumerate(after_lines):
            if last_before in line:
                cut = i + 1
        new_lines = after_lines[cut:]
    else:
        new_lines = after_lines

    # 过滤掉提示符行和空行
    reply_lines = []
    for line in new_lines:
        stripped = line.strip()
        if not stripped:
            continue
        # 跳过 claude 的输入提示符行
        if re.match(r"^[>\$]\s*$", stripped):
            continue
        reply_lines.append(stripped)

    return "\n".join(reply_lines).strip()


# ── 核心函数 ───────────────────────────────────────────────────────────────────

async def _lock_for(key: str) -> asyncio.Lock:
    async with _locks_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
        return lock


async def claude_tmux_chat(
    *,
    conversation_key: str,
    content: str,
    reset: bool = False,
    timeout_seconds: int = DEFAULT_TIMEOUT,
) -> TmuxBridgeResult:
    key = conversation_key.strip()
    if not key:
        raise ValueError("conversation_key is required")
    if not content.strip():
        raise ValueError("content is required")

    session_name = f"cc_{re.sub(r'[^a-zA-Z0-9_-]', '_', key)}"

    lock = await _lock_for(key)
    async with lock:
        # 如果要重置，先 kill session
        if reset and _session_exists(session_name):
            _tmux("kill-session", "-t", session_name)

        # 确保 session 存在
        if not _session_exists(session_name):
            await asyncio.to_thread(_create_session, session_name)

        # 记录发送消息前的 pane 内容
        before_pane = await asyncio.to_thread(_capture_pane, session_name)

        # 注入消息
        await asyncio.to_thread(_send_message, session_name, content)

        # 等待回复（轮询直到输出稳定）
        reply_pane = ""
        last_pane = ""
        stable_count = 0
        deadline = time.time() + timeout_seconds

        while time.time() < deadline:
            await asyncio.sleep(POLL_INTERVAL)
            current_pane = await asyncio.to_thread(_capture_pane, session_name)
            clean = _strip_ansi(current_pane)

            if clean == _strip_ansi(last_pane):
                stable_count += 1
                if stable_count >= STABLE_ROUNDS:
                    reply_pane = current_pane
                    break
            else:
                stable_count = 0
                last_pane = current_pane
        else:
            # 超时，取现有内容
            reply_pane = await asyncio.to_thread(_capture_pane, session_name)

        reply = _extract_reply(before_pane, reply_pane)
        if not reply:
            reply = "（Claude 没有回复，可能还在思考中）"

        return TmuxBridgeResult(
            conversation_key=key,
            session_name=session_name,
            reply=reply,
            raw_pane=reply_pane,
        )


async def claude_tmux_reset(conversation_key: str) -> None:
    """Kill 掉对应的 tmux session，下次重新开始。"""
    key = conversation_key.strip()
    session_name = f"cc_{re.sub(r'[^a-zA-Z0-9_-]', '_', key)}"
    lock = await _lock_for(key)
    async with lock:
        if _session_exists(session_name):
            _tmux("kill-session", "-t", session_name)


def list_active_sessions() -> list[str]:
    """列出所有活跃的 cc_* tmux sessions。"""
    r = _tmux("list-sessions", "-F", "#{session_name}")
    return [s for s in r.stdout.splitlines() if s.startswith("cc_")]
