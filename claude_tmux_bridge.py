from __future__ import annotations

import asyncio
import datetime
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
SCROLL_LINES: int = int(os.getenv('CLAUDE_TMUX_SCROLL_LINES', '300'))
META_PATH: Path = Path(__file__).resolve().parent / 'data' / 'claude_tmux_meta.json'

# ~/.claude/projects/<encoded-WORK_DIR>  e.g. /opt/Yui-Nook-FastApi -> -opt-Yui-Nook-FastApi
_PROJECT_DIR: Path = Path.home() / '.claude' / 'projects' / WORK_DIR.replace('/', '-')


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
    jsonl_path: str = ''
    last_uuid: str = ''


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
        jsonl_path=raw.get('jsonl_path', ''),
        last_uuid=raw.get('last_uuid', ''),
    )


def _save_session_meta(key: str, meta: SessionMeta) -> None:
    data = _read_meta()
    data[key] = {
        'session_name': meta.session_name,
        'message_count': meta.message_count,
        'last_compact_at': meta.last_compact_at,
        'jsonl_path': meta.jsonl_path,
        'last_uuid': meta.last_uuid,
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


def _detect_new_jsonl(before_files: set[str]) -> str:
    """Return path of a JSONL in _PROJECT_DIR not present in before_files."""
    if not _PROJECT_DIR.exists():
        return ''
    for f in sorted(_PROJECT_DIR.glob('*.jsonl'), key=lambda p: p.stat().st_mtime, reverse=True):
        if f.name not in before_files:
            return str(f)
    return ''


def _read_transcript_text(jsonl_path: str, after_uuid: str, after_time: float = 0.0) -> tuple[str, str]:
    """
    Extract new assistant text blocks from JSONL transcript.

    Uses after_uuid as the bookmark when set; falls back to after_time (UTC epoch).
    Skips thinking / tool_use / tool_result blocks — returns only type=text content.
    Returns (combined_text, last_uuid_seen).
    """
    p = Path(jsonl_path) if jsonl_path else None

    if p is None or not p.exists():
        if not _PROJECT_DIR.exists():
            return '', after_uuid
        candidates = sorted(_PROJECT_DIR.glob('*.jsonl'), key=lambda f: f.stat().st_mtime, reverse=True)
        if not candidates:
            return '', after_uuid
        p = candidates[0]

    try:
        raw = p.read_text(encoding='utf-8', errors='replace')
    except Exception:
        return '', after_uuid

    entries = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            entries.append(json.loads(line))
        except Exception:
            continue

    start_idx = 0
    if after_uuid:
        found = False
        for i, entry in enumerate(entries):
            if entry.get('uuid') == after_uuid:
                start_idx = i + 1
                found = True
                break
        if not found:
            # UUID gone (e.g. session compacted) — fall back to time filtering
            after_uuid = ''

    texts: list[str] = []
    last_uuid = after_uuid
    for entry in entries[start_idx:]:
        if entry.get('type') != 'assistant':
            continue
        # Time-based filter when we have no uuid anchor
        if not after_uuid and after_time > 0:
            ts = entry.get('timestamp', '')
            try:
                entry_ts = datetime.datetime.fromisoformat(ts.replace('Z', '+00:00')).timestamp()
                if entry_ts <= after_time:
                    continue
            except Exception:
                pass
        for block in entry.get('message', {}).get('content', []):
            if block.get('type') == 'text':
                text = block.get('text', '').strip()
                if text:
                    texts.append(text)
        last_uuid = entry.get('uuid', last_uuid)

    return '\n'.join(texts), last_uuid


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
    thinking_fallback_at = time.time() + 12
    last_pane = ''
    stable_count = 0
    thinking_seen = False
    t0 = time.time()

    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        current = _capture_pane(session_name)
        current_clean = _strip_ansi(current)

        if any(p in current_clean for p in _RATING_PROMPTS):
            logger.info('[%s] rating prompt detected, dismissing', session_name)
            _tmux('send-keys', '-t', session_name, '0', 'Enter')
            time.sleep(1.0)
            stable_count = 0
            continue

        if not thinking_seen:
            for line in current_clean.splitlines():
                stripped = line.strip()
                if re.match(r'^[✻✽]\s+', stripped) and stripped not in before_status:
                    thinking_seen = True
                    logger.info('[%s] thinking_seen via spinner (%.1fs)', session_name, time.time() - t0)
                    break
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
    jsonl_path: str,
    after_uuid: str,
    after_time: float,
    stop: asyncio.Event,
    callback,
    interval: float = 3.0,
) -> None:
    """每 interval 秒从 JSONL 读一次，把当前部分回复交给 callback。"""
    last_sent = ''
    while not stop.is_set():
        try:
            await asyncio.wait_for(asyncio.shield(stop.wait()), timeout=interval)
        except asyncio.TimeoutError:
            pass
        if stop.is_set():
            break
        partial, _ = await asyncio.to_thread(_read_transcript_text, jsonl_path, after_uuid, after_time)
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
            meta.jsonl_path = ''
            meta.last_uuid = ''

        if not _session_exists(session_name):
            before_files = {f.name for f in _PROJECT_DIR.glob('*.jsonl')} if _PROJECT_DIR.exists() else set()
            await asyncio.to_thread(_create_session, session_name)
            jsonl = await asyncio.to_thread(_detect_new_jsonl, before_files)
            if jsonl:
                meta.jsonl_path = jsonl
                meta.last_uuid = ''
                logger.info('[%s] tracking transcript %s', session_name, jsonl)

        compacted = False
        if _should_compact(meta):
            await asyncio.to_thread(_do_compact, session_name)
            meta.last_compact_at = meta.message_count
            compacted = True

        await asyncio.to_thread(_dismiss_prompts, session_name)
        before_pane = await asyncio.to_thread(_capture_pane, session_name)
        before_send_time = time.time()
        logger.info('[%s] sending msg #%d (len=%d)', session_name, meta.message_count + 1, len(content))
        await asyncio.to_thread(_send_message, session_name, content)

        stop_event = asyncio.Event()
        progress_task = None
        if on_progress is not None:
            progress_task = asyncio.create_task(
                _progress_loop(
                    session_name, meta.jsonl_path, meta.last_uuid,
                    before_send_time, stop_event, on_progress,
                )
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

        reply, meta.last_uuid = _read_transcript_text(
            meta.jsonl_path, meta.last_uuid, before_send_time
        )
        logger.info('[%s] transcript reply len=%d last_uuid=%s', session_name, len(reply), meta.last_uuid)
        if not reply:
            logger.warning('[%s] empty transcript reply — sending fallback', session_name)
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
