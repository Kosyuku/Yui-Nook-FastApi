"""Telegram bot — 手动 polling，消息转发给 claude_tmux_bridge。"""
from __future__ import annotations

import asyncio
import logging
import os

import httpx

import database as db
from claude_tmux_bridge import claude_tmux_chat

PROACTIVE_PUSH_INTERVAL = 30  # 秒

logger = logging.getLogger(__name__)

_task: asyncio.Task | None = None
_proactive_task: asyncio.Task | None = None


def _token() -> str:
    return os.getenv("TELEGRAM_BOT_TOKEN", "").strip()


def _allowed_ids() -> set[int]:
    raw = os.getenv("TELEGRAM_ALLOWED_CHAT_IDS", "").strip()
    if not raw:
        return set()
    ids = set()
    for part in raw.split(","):
        part = part.strip()
        if part:
            try:
                ids.add(int(part))
            except ValueError:
                pass
    return ids


def _fmt(text: str) -> str:
    """段落间加空行，让多段回复在 TG 里更好读。"""
    lines = text.split('\n')
    return '\n\n'.join(line for line in lines if line.strip()) if len(lines) > 1 else text


async def _send(client: httpx.AsyncClient, token: str, chat_id: int, text: str) -> int | None:
    """发送消息，返回 message_id（失败返回 None）。"""
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        r = await client.post(url, json={"chat_id": chat_id, "text": text}, timeout=10)
        data = r.json()
        if data.get("ok"):
            return data["result"]["message_id"]
    except Exception as e:
        logger.error("sendMessage failed: %s", e)
    return None


async def _edit(client: httpx.AsyncClient, token: str, chat_id: int, message_id: int, text: str) -> None:
    url = f"https://api.telegram.org/bot{token}/editMessageText"
    try:
        await client.post(url, json={"chat_id": chat_id, "message_id": message_id, "text": text}, timeout=10)
    except Exception as e:
        logger.error("editMessageText failed: %s", e)


async def _handle(client: httpx.AsyncClient, token: str, message: dict) -> None:
    chat_id = message.get("chat", {}).get("id")
    text = message.get("text", "").strip()
    if not chat_id or not text:
        return

    allowed = _allowed_ids()
    if allowed and chat_id not in allowed:
        await _send(client, token, chat_id, "不认识你。")
        return

    if text.startswith("/"):
        return

    # 先发占位消息，拿到 message_id 用于后续 edit
    placeholder_id = await _send(client, token, chat_id, "…")

    last_partial: dict = {"text": ""}

    async def on_progress(partial: str) -> None:
        if partial == last_partial["text"] or placeholder_id is None:
            return
        last_partial["text"] = partial
        await _edit(client, token, chat_id, placeholder_id, partial + "\n▌")

    conversation_key = f"tg_{chat_id}"
    try:
        result = await claude_tmux_chat(
            conversation_key=conversation_key,
            content=text,
            on_progress=on_progress,
        )
        reply = result.reply or "……"
    except Exception as e:
        logger.exception("claude_tmux_chat failed for %s", conversation_key)
        reply = f"出错了：{e}"

    if placeholder_id:
        await _edit(client, token, chat_id, placeholder_id, _fmt(reply))
    else:
        await _send(client, token, chat_id, _fmt(reply))


async def _poll_loop(token: str) -> None:
    base = f"https://api.telegram.org/bot{token}"
    offset: int | None = None

    async with httpx.AsyncClient() as client:
        # 先清空 pending updates
        try:
            r = await client.post(f"{base}/getUpdates", json={"offset": -1, "timeout": 0}, timeout=10)
            data = r.json()
            if data.get("result"):
                offset = data["result"][-1]["update_id"] + 1
        except Exception:
            pass

        logger.info("Telegram bot 开始 polling")

        while True:
            try:
                params: dict = {"timeout": 20, "allowed_updates": ["message"]}
                if offset is not None:
                    params["offset"] = offset

                r = await client.post(f"{base}/getUpdates", json=params, timeout=30)
                data = r.json()

                if not data.get("ok"):
                    logger.error("getUpdates error: %s", data)
                    await asyncio.sleep(5)
                    continue

                for update in data.get("result", []):
                    offset = update["update_id"] + 1
                    if "message" in update:
                        asyncio.create_task(_handle(client, token, update["message"]))

            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error("Telegram polling error: %s", e)
                await asyncio.sleep(5)

    logger.info("Telegram bot 已停止")


async def _proactive_push_loop(token: str) -> None:
    """定期查 pending 意识消息，有的话推送到 Telegram。"""
    allowed = _allowed_ids()
    if not allowed:
        logger.warning("TELEGRAM_ALLOWED_CHAT_IDS 未配置，意识循环推送不知道发给谁")
        return

    async with httpx.AsyncClient() as client:
        while True:
            try:
                await asyncio.sleep(PROACTIVE_PUSH_INTERVAL)
                messages = await db.get_pending_proactive(limit=5)
                for msg in messages:
                    content = msg.get("content", "").strip()
                    msg_id = msg.get("id", "")
                    if not content or not msg_id:
                        continue
                    for chat_id in allowed:
                        await _send(client, token, chat_id, content)
                    await db.mark_proactive_read(msg_id)
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error("proactive push error: %s", e)


async def start(token: str) -> None:
    global _task, _proactive_task
    if not token:
        logger.warning("TELEGRAM_BOT_TOKEN 未配置，跳过 Telegram bot")
        return
    _task = asyncio.create_task(_poll_loop(token))
    _proactive_task = asyncio.create_task(_proactive_push_loop(token))


async def stop() -> None:
    global _task, _proactive_task
    for t in (_task, _proactive_task):
        if t:
            t.cancel()
            try:
                await asyncio.wait_for(t, timeout=5)
            except Exception:
                pass
    _task = None
    _proactive_task = None
