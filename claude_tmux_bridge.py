from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path

logger = logging.getLogger(__name__)

WORK_DIR: str = os.getenv('CLAUDE_TMUX_CWD', '/opt/Yui-Nook-FastApi')
DEFAULT_TIMEOUT: int = int(os.getenv('CLAUDE_TMUX_TIMEOUT', '300'))
POLL_INTERVAL: float = 0.4
STABLE_ROUNDS: int = 4
COMPACT_EVERY: int = int(os.getenv('CLAUDE_TMUX_COMPACT_EVERY', '30'))
COMPACT_TIMEOUT: int = int(os.getenv('CLAUDE_TMUX_COMPACT_TIMEOUT', '60'))
# 抓 capture-pane 时往回滚多少行（工具调用产生大量输出时 50 行可见区不够）
SCROLL_LINES: int = int(os.getenv('CLAUDE_TMUX_SCROLL_LINES', '300'))
META_PATH: Path = Path(__file__).resolve().parent / 'data' / 'claude_tmux_meta.json'


@dataclass
class TmuxBridgeResult:
    conversation_key: str
    session_name: str
    reply: str
    raw_pane: str
    compacted: bool


@dataclass
class SessionMeta:
    session_name: str
    message_count: int
    last_compact_at: int


_locks_guard = asyncio.Lock()
_locks: dict[str, asyncio.Lock] = {}


def _read_meta() -> dict[str, dict]:
    if not META_PATH.exists():
        return {}
    try:
        return json.loads(META_PATH.read_text(encoding='utf-8'))
    except Exception:
        return {}


def _write_meta(data: dict[str, dict]) -> None:
    META_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = META_PATH.with_suffix('.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(META_PATH)


def _get_session_meta(key: str) -> SessionMeta:
    data = _read_meta()
    raw = data.get(key, {})
    return SessionMeta(
        session_name=raw.get('session_name', f'cc_{re.sub("[^a-zA-Z0-9_-]", "_", key)}'),
        message_count=int(raw.get('message_count', 0)),
        last_compact_at=int(raw.get('last_compact_at', 0)),
    )


def _save_session_meta(key: str, meta: SessionMeta) -> None:
    data = _read_meta()
    data[key] = {
        'session_name': meta.session_name,
        'message_count': meta.message_count,
        'last_compact_at': meta.last_compact_at,
    }
    _write_meta(data)


def _delete_session_meta(key: str) -> None:
    data = _read_meta()
    data.pop(key, None)
    _write_meta(data)


def _tmux(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ['tmux'] + list(args),
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )


def _session_exists(name: str) -> bool:
    r = _tmux('has-session', '-t', name)
    return r.returncode == 0


def _create_session(name: str) -> None:
    """新建 tmux session，cd 到工作目录，启动 claude。"""
    _tmux('new-session', '-d', '-s', name, '-x', '220', '-y', '50')
    _tmux('send-keys', '-t', name, f'cd {WORK_DIR}', 'Enter')
    time.sleep(0.5)
    _tmux('send-keys', '-t', name, 'claude', 'Enter')
    time.sleep(6)


def _capture_pane(name: str) -> str:
    r = _tmux('capture-pane', '-t', name, '-p', '-e', '-S', f'-{SCROLL_LINES}')
    return r.stdout or ''


_RATING_PROMPTS = (
    'How is Claude doing this session',
    'How are you enjoying Claude',
    'Rate your experience',
)


def _dismiss_prompts(name: str) -> bool:
    """清掉可能拦截输入的交互式对话框（评分、确认等）。返回是否触发了关闭。"""
    pane = _strip_ansi(_capture_pane(name))
    if any(p in pane for p in _RATING_PROMPTS):
        _tmux('send-keys', '-t', name, '0', 'Enter')
        time.sleep(1.0)
        return True
    return False


def _send_message(name: str, message: str) -> None:
    """把消息注入 tmux session（多行合并成单行）。"""
    lines = message.strip().splitlines()
    if not lines:
        return
    single = ' '.join(lines)
    _tmux('send-keys', '-t', name, single, 'Enter')


def _strip_ansi(text: str) -> str:
    ansi = re.compile(r'\x1b\[[0-9;]*[mGKHF]|\x1b\].*?\x07|\x1b[@-Z\\-_]')
    return ansi.sub('', text)


def _has_prompt(text: str) -> bool:
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    recent = lines[-5:] if len(lines) >= 5 else lines
    return any(re.match(r'^[>❯]\s*$', l) for l in recent)


def _parse_bullet_blocks(text: str) -> list:
    """提取所有 ● 块（包含 ● 行及其后的缩进续行），返回每块合并后的文本。"""
    blocks = []
    current: list[str] = []
    for line in text.splitlines():
        stripped = line.strip()
        if re.match(r'^●\s*', stripped):
            if current:
                blocks.append('\n'.join(current).strip())
            current = [re.sub(r'^●\s*', '', stripped)]
        elif current and line.startswith('  ') and stripped:
            current.append(stripped)
        elif current and not stripped:
            continue
        elif not current:
            continue
        else:
            blocks.append('\n'.join(current).strip())
            current = []
    if current:
        blocks.append('\n'.join(current).strip())
    return [b for b in blocks if b]


def _extract_after_user_prompt(after_lines: list[str]) -> list[str]:
    """When before/after diff fails, find the first '>content' line (user input) and return what follows."""
    for i, line in enumerate(after_lines):
        stripped = line.strip()
        # "> message text" — prompt + actual user content (not a bare prompt)
        if re.match(r'^[>❯]\s+\S', stripped):
            return after_lines[i + 1:]
    return []


def _extract_reply(before: str, after: str) -> str:
    """从 capture-pane 前后差异中提取 Claude 的回复。"""
    after_clean = _strip_ansi(after)
    before_clean = _strip_ansi(before)

    # Strategy 1: bullet block diff
    before_blocks = _parse_bullet_blocks(before_clean)
    after_blocks = _parse_bullet_blocks(after_clean)
    new_blocks = after_blocks[len(before_blocks):]
    if new_blocks:
        return '\n'.join(new_blocks).strip()

    # Strategy 2: line-based diff anchored on the last visible before-line
    before_lines = [l for l in before_clean.splitlines() if l.strip()]
    after_lines = after_clean.splitlines()

    if before_lines:
        last_before = before_lines[-1].strip()
        cut = 0
        found = False
        for i, line in enumerate(after_lines):
            if last_before in line:
                cut = i + 1
                found = True
                break
        if found:
            new_lines = after_lines[cut:]
        else:
            # last_before not in after_pane — pane scrolled significantly.
            # Fall back to finding user's input prompt as anchor.
            new_lines = _extract_after_user_prompt(after_lines)
    else:
        # before_pane was empty — anchor on user input line.
        new_lines = _extract_after_user_prompt(after_lines)

    reply_lines = []
    for line in new_lines:
        stripped = line.strip()
        if not stripped:
            continue
        if re.match(r'^[>❯$]\s*$', stripped):
            continue
        if re.match(r'^\*\s+\w', stripped):
            continue
        # 过滤工具调用提示行和打分框（对用户不可见的内部状态）
        if re.match(r'^Called\s+.+\(ctrl\+o', stripped):
            continue
        if re.match(r'^\(ctrl\+o', stripped):
            continue
        if any(p in stripped for p in _RATING_PROMPTS):
            continue
        if re.match(r'^\d+\.\s+(😞|😐|😊|Don\'t ask)', stripped):
            continue
        reply_lines.append(stripped)

    return '\n'.join(reply_lines).strip()


def _wait_stable(session_name: str, timeout: float) -> str:
    """轮询 capture-pane 直到输出稳定且 Claude 在等待输入，返回最终 pane 内容。"""
    last_pane = ''
    stable_count = 0
    deadline = time.time() + timeout
    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        current = _capture_pane(session_name)
        current_clean = _strip_ansi(current)
        if current_clean == _strip_ansi(last_pane):
            stable_count += 1
            if stable_count >= STABLE_ROUNDS and _has_prompt(current_clean):
                return current
        else:
            stable_count = 0
        last_pane = current
    return _capture_pane(session_name)


def _wait_for_reply(session_name: str, before_pane: str, timeout: float) -> str:
    """等 Claude 开始处理（✻ 状态行出现）后再等稳定，不被输入回显骗到。"""
    before_clean = _strip_ansi(before_pane)
    before_status: set[str] = {
        l.strip()
        for l in before_clean.splitlines()
        if re.match(r'^[✻✽]\s+', l.strip())
    }

    # 如果 Claude 已经在我们开始等之前就回复完了，直接返回
    _early = _capture_pane(session_name)
    _early_clean = _strip_ansi(_early)
    if _early_clean != before_clean and _has_prompt(_early_clean):
        logger.info('[%s] early-done detected, returning immediately', session_name)
        return _early

    deadline = time.time() + timeout
    # spinner 未出现时的兜底：消息发出 N 秒后若 pane 有变化就不再等 ✻
    thinking_fallback_at = time.time() + 12
    last_pane = ''
    stable_count = 0
    thinking_seen = False
    t0 = time.time()

    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        current = _capture_pane(session_name)
        current_clean = _strip_ansi(current)

        # 随时检测打分框/确认框，立即关掉
        if any(p in current_clean for p in _RATING_PROMPTS):
            logger.info('[%s] rating prompt detected, dismissing', session_name)
            _tmux('send-keys', '-t', session_name, '0', 'Enter')
            time.sleep(1.0)
            stable_count = 0
            continue

        if not thinking_seen:
            # 正常路径：看到 ✻ 状态行
            for line in current_clean.splitlines():
                stripped = line.strip()
                if re.match(r'^[✻✽]\s+', stripped) and stripped not in before_status:
                    thinking_seen = True
                    logger.info('[%s] thinking_seen via spinner (%.1fs)', session_name, time.time() - t0)
                    break
            # 兜底路径：超过等待时间后只要 pane 发生变化就认为开始处理了
            if not thinking_seen and time.time() > thinking_fallback_at:
                if current_clean != before_clean:
                    thinking_seen = True
                    logger.info('[%s] thinking_seen via fallback (%.1fs)', session_name, time.time() - t0)

            if thinking_seen:
                stable_count = 0
                last_pane = current
            continue

        if current_clean == _strip_ansi(last_pane):
            stable_count += 1
            if stable_count >= STABLE_ROUNDS and _has_prompt(current_clean):
                logger.info('[%s] stable+prompt after %.1fs', session_name, time.time() - t0)
                return current
        else:
            stable_count = 0
        last_pane = current

    elapsed = time.time() - t0
    logger.warning('[%s] timed out after %.1fs (thinking_seen=%s)', session_name, elapsed, thinking_seen)
    return _capture_pane(session_name)


def _should_compact(meta: SessionMeta) -> bool:
    if COMPACT_EVERY <= 0:
        return False
    messages_since_last = meta.message_count - meta.last_compact_at
    return messages_since_last >= COMPACT_EVERY


def _do_compact(session_name: str) -> None:
    """注入 /compact 并等待 Claude Code 完成压缩。"""
    _tmux('send-keys', '-t', session_name, '/compact', 'Enter')
    time.sleep(2)
    _wait_stable(session_name, COMPACT_TIMEOUT)


async def _lock_for(key: str) -> asyncio.Lock:
    async with _locks_guard:
        lock = _locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            _locks[key] = lock
    return lock


async def _progress_loop(
    session_name: str,
    before_pane: str,
    stop: asyncio.Event,
    callback,
    interval: float = 3.0,
) -> None:
    """每 interval 秒抓一次 pane，把当前部分回复交给 callback。"""
    last_sent = ''
    while not stop.is_set():
        try:
            await asyncio.wait_for(asyncio.shield(stop.wait()), timeout=interval)
        except asyncio.TimeoutError:
            pass
        if stop.is_set():
            break
        current = await asyncio.to_thread(_capture_pane, session_name)
        partial = _extract_reply(before_pane, current)
        if partial and partial != last_sent:
            last_sent = partial
            try:
                await callback(partial)
            except Exception:
                pass


async def claude_tmux_chat(
    conversation_key: str,
    content: str,
    reset: bool = False,
    timeout_seconds: float = DEFAULT_TIMEOUT,
    on_progress=None,
) -> TmuxBridgeResult:
    key = conversation_key.strip()
    if not key:
        raise ValueError('conversation_key is required')
    if not content.strip():
        raise ValueError('content is required')

    lock = await _lock_for(key)
    async with lock:
        meta = _get_session_meta(key)
        session_name = meta.session_name

        if reset and _session_exists(session_name):
            _tmux('kill-session', '-t', session_name)
            meta.message_count = 0
            meta.last_compact_at = 0

        if not _session_exists(session_name):
            await asyncio.to_thread(_create_session, session_name)

        compacted = False
        if _should_compact(meta):
            await asyncio.to_thread(_do_compact, session_name)
            meta.last_compact_at = meta.message_count
            compacted = True

        await asyncio.to_thread(_dismiss_prompts, session_name)
        before_pane = await asyncio.to_thread(_capture_pane, session_name)
        logger.info('[%s] sending msg #%d (len=%d)', session_name, meta.message_count + 1, len(content))
        await asyncio.to_thread(_send_message, session_name, content)

        stop_event = asyncio.Event()
        progress_task = None
        if on_progress is not None:
            progress_task = asyncio.create_task(
                _progress_loop(session_name, before_pane, stop_event, on_progress)
            )

        try:
            reply_pane = await asyncio.to_thread(
                _wait_for_reply, session_name, before_pane, timeout_seconds
            )
        finally:
            stop_event.set()
            if progress_task:
                try:
                    await asyncio.wait_for(progress_task, timeout=2)
                except Exception:
                    pass

        reply = _extract_reply(before_pane, reply_pane)
        logger.info('[%s] extract_reply len=%d before_lines=%d after_lines=%d',
                    session_name, len(reply),
                    len([l for l in _strip_ansi(before_pane).splitlines() if l.strip()]),
                    len([l for l in _strip_ansi(reply_pane).splitlines() if l.strip()]))
        if not reply:
            logger.warning('[%s] empty reply — sending fallback', session_name)
            reply = '（Claude 没有回复，可能还在思考中）'

        meta.message_count += 1
        _save_session_meta(key, meta)

        return TmuxBridgeResult(
            conversation_key=key,
            session_name=session_name,
            reply=reply,
            raw_pane=reply_pane,
            compacted=compacted,
        )


async def claude_tmux_reset(conversation_key: str) -> None:
    key = conversation_key.strip()
    lock = await _lock_for(key)
    async with lock:
        meta = _get_session_meta(key)
        if _session_exists(meta.session_name):
            _tmux('kill-session', '-t', meta.session_name)
        _delete_session_meta(key)


def _claude_is_alive(session_name: str) -> bool:
    pane = _strip_ansi(_capture_pane(session_name))
    lines = [l.strip() for l in pane.splitlines() if l.strip()]
    recent = lines[-5:] if len(lines) >= 5 else lines
    return any(re.match(r'^[>❯]\s*$', l) for l in recent)


def keepalive_all_sessions() -> dict[str, str]:
    """
    检查所有 cc_* session 里 claude 是否还活着。
    如果 session 存在但 claude 已退出，重新启动 claude。
    不发任何消息给 claude，不耗费额度。
    """
    meta_all = _read_meta()
    results: dict[str, str] = {}

    for key, raw in meta_all.items():
        sname = raw.get('session_name', '')
        if not sname or not _session_exists(sname):
            results[key] = 'session_missing'
            continue
        if _claude_is_alive(sname):
            results[key] = 'alive'
            continue
        _tmux('send-keys', '-t', sname, '', '')
        _tmux('send-keys', '-t', sname, f'cd {WORK_DIR} && claude', 'Enter')
        time.sleep(6)
        results[key] = 'restarted'

    return results


def list_active_sessions() -> list[dict]:
    """列出所有活跃的 cc_* tmux sessions 及其消息计数。"""
    r = _tmux('list-sessions', '-F', '#{session_name}')
    active = {s for s in r.stdout.splitlines() if s.startswith('cc_')}

    meta_all = _read_meta()
    result = []
    for key, raw in meta_all.items():
        sname = raw.get('session_name', '')
        if sname not in active:
            continue
        message_count = raw.get('message_count', 0)
        last_compact_at = raw.get('last_compact_at', 0)
        result.append({
            'conversation_key': key,
            'session_name': sname,
            'message_count': message_count,
            'last_compact_at': last_compact_at,
            'messages_since_compact': message_count - last_compact_at,
        })
    return result
