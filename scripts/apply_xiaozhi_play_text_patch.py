"""Apply StackChan self.audio.play_text server-side playback support.

Usage:
    python scripts/apply_xiaozhi_play_text_patch.py /opt/xiaozhi-esp32-server/main/xiaozhi-server
"""
from __future__ import annotations

import sys
from pathlib import Path


SERVER_TTS_SOURCE = r'''"""Server-side text playback helper for device tool calls."""
from __future__ import annotations

import asyncio
import base64
import os
import tempfile
import uuid
from typing import TYPE_CHECKING, Any

import httpx

from core.handle.sendAudioHandle import sendAudioMessage, send_tts_message
from core.providers.tts.dto.dto import SentenceType
from core.utils.dialogue import Message
from core.utils.util import audio_to_data

if TYPE_CHECKING:
    from core.connection import ConnectionHandler


async def _opus_from_voice_url(text: str) -> tuple[list[bytes] | None, str]:
    voice_url = os.getenv("STACKCHAN_VOICE_URL", "").strip()
    if not voice_url:
        return None, "not_configured"

    payload: dict[str, Any] = {"text": text}
    agent_id = os.getenv("STACKCHAN_AGENT_ID", "").strip()
    if agent_id:
        payload["agentId"] = agent_id

    headers = {"Content-Type": "application/json"}
    token = (
        os.getenv("STACKCHAN_VOICE_TOKEN", "").strip()
        or os.getenv("OPENAI_INBOUND_TOKEN", "").strip()
    )
    if token:
        headers["Authorization"] = f"Bearer {token}"

    timeout = float(os.getenv("STACKCHAN_VOICE_TIMEOUT", "20") or "20")
    async with httpx.AsyncClient(timeout=max(1.0, timeout)) as client:
        resp = await client.post(voice_url, json=payload, headers=headers)
        resp.raise_for_status()
        body = resp.json()

        audio_url = str(
            body.get("audioUrl") or body.get("audio_url") or body.get("url") or ""
        ).strip()
        if not audio_url:
            raise RuntimeError("voice endpoint returned no audioUrl")

        mime_type = str(body.get("mimeType") or "audio/mpeg").split(";")[0].strip()
        if audio_url.startswith("data:"):
            header, b64_data = audio_url.split(",", 1)
            if ";" in header:
                mime_type = header[5:].split(";", 1)[0] or mime_type
            audio_bytes = base64.b64decode(b64_data)
        else:
            audio_resp = await client.get(audio_url)
            audio_resp.raise_for_status()
            audio_bytes = audio_resp.content
            mime_type = (
                audio_resp.headers.get("content-type", "").split(";")[0].strip()
                or mime_type
            )

    ext = "mp3"
    if "wav" in mime_type:
        ext = "wav"
    elif "ogg" in mime_type or "opus" in mime_type:
        ext = "ogg"

    tmp_path = ""
    try:
        with tempfile.NamedTemporaryFile(suffix=f".{ext}", delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name
        return await audio_to_data(tmp_path, is_opus=True), "voice_url"
    finally:
        if tmp_path:
            try:
                os.remove(tmp_path)
            except OSError:
                pass


async def play_text_via_server_tts(
    conn: "ConnectionHandler", text: str
) -> dict[str, Any]:
    """Generate TTS on the server and stream it to the connected device."""
    text = (text or "").strip()
    if not text:
        raise ValueError("text is required")
    if not getattr(conn, "tts", None):
        raise RuntimeError("TTS is not ready")
    if not getattr(conn, "websocket", None):
        raise RuntimeError("device websocket is not connected")

    conn.client_abort = False
    conn.sentence_id = str(uuid.uuid4().hex)
    if hasattr(conn.tts, "tts_audio_first_sentence"):
        conn.tts.tts_audio_first_sentence = True

    await send_tts_message(conn, "start")

    source = "server_tts"
    try:
        opus_packets, source = await _opus_from_voice_url(text)
    except Exception as exc:
        conn.logger.bind(tag=__name__).warning(f"STACKCHAN_VOICE_URL failed: {exc}")
        opus_packets = None

    if opus_packets is None:
        tts_result = await asyncio.to_thread(conn.tts.to_tts, text)
        if not tts_result:
            raise RuntimeError("TTS generation failed")

        opus_packets = tts_result
        if isinstance(tts_result, str):
            if not os.path.exists(tts_result):
                raise RuntimeError(f"TTS file does not exist: {tts_result}")
            opus_packets = await audio_to_data(tts_result, is_opus=True)

    await sendAudioMessage(conn, SentenceType.FIRST, opus_packets, text)
    await sendAudioMessage(conn, SentenceType.LAST, [], None)

    try:
        conn.dialogue.put(Message(role="assistant", content=text))
    except Exception:
        pass

    return {"ok": True, "routed": source, "text": text}
'''


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def ensure_contains(path: Path, needle: str, insert_after: str) -> bool:
    text = read(path)
    if needle in text:
        return False
    if insert_after not in text:
        raise RuntimeError(f"anchor not found in {path}: {insert_after!r}")
    text = text.replace(insert_after, insert_after + "\n" + needle, 1)
    write(path, text)
    return True


def ensure_before(path: Path, block: str, anchor: str) -> bool:
    text = read(path)
    if block.strip() in text:
        return False
    if anchor not in text:
        raise RuntimeError(f"anchor not found in {path}: {anchor!r}")
    text = text.replace(anchor, block + "\n" + anchor, 1)
    write(path, text)
    return True


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    changed: list[str] = []

    helper = root / "core" / "handle" / "serverTtsPlayHandle.py"
    if not helper.exists() or read(helper) != SERVER_TTS_SOURCE:
        write(helper, SERVER_TTS_SOURCE)
        changed.append(str(helper))

    device_call = root / "core" / "api" / "device_call_handler.py"
    if ensure_contains(
        device_call,
        "from core.handle.serverTtsPlayHandle import play_text_via_server_tts",
        "from core.device_registry import get_connection, list_device_ids",
    ):
        changed.append(str(device_call))

    device_call_block = '''        tool_name = sanitize_tool_name(tool)
        if tool_name == "self_audio_play_text":
            try:
                result = await play_text_via_server_tts(
                    conn, str(arguments.get("text") or "")
                )
            except ValueError as exc:
                raise web.HTTPBadRequest(text=str(exc)) from exc
            except RuntimeError as exc:
                raise web.HTTPConflict(text=str(exc)) from exc
            except Exception as exc:
                self.logger.bind(tag=TAG).error(f"Server TTS playback failed: {exc}")
                raise web.HTTPBadGateway(text=str(exc)) from exc
            return web.json_response(
                {"ok": True, "device_id": conn.device_id, "result": result}
            )

'''
    if ensure_before(
        device_call,
        device_call_block,
        '        mcp_client = getattr(conn, "mcp_client", None)',
    ):
        changed.append(str(device_call))
    text = read(device_call)
    text = text.replace(
        "\n        tool_name = sanitize_tool_name(tool)\n        try:\n",
        "\n        try:\n",
        1,
    )
    write(device_call, text)

    mcp_executor = root / "core" / "providers" / "tools" / "device_mcp" / "mcp_executor.py"
    if ensure_contains(
        mcp_executor,
        "from core.handle.serverTtsPlayHandle import play_text_via_server_tts",
        "if TYPE_CHECKING:\n    from core.connection import ConnectionHandler",
    ):
        changed.append(str(mcp_executor))

    mcp_block = '''        if tool_name == "self_audio_play_text":
            try:
                result = await play_text_via_server_tts(
                    conn, str(arguments.get("text") or "")
                )
                return ActionResponse(action=Action.RESPONSE, response=str(result))
            except Exception as e:
                return ActionResponse(action=Action.ERROR, response=str(e))

'''
    if ensure_before(
        mcp_executor,
        mcp_block,
        '        if not hasattr(conn, "mcp_client") or not conn.mcp_client:',
    ):
        changed.append(str(mcp_executor))

    print("changed:" if changed else "already patched")
    for item in dict.fromkeys(changed):
        print(item)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
