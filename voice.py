"""Direct voice service integration."""
from __future__ import annotations

import logging
from typing import Any, Optional

import httpx

import ai_runtime
from config import settings

logger = logging.getLogger(__name__)


class VoiceConfigError(RuntimeError):
    pass


class VoiceServiceError(RuntimeError):
    pass


def _pick_url(slot: dict[str, Any]) -> str:
    return str(
        slot.get("service_url")
        or slot.get("base_url")
        or settings.voice_service_url
        or ""
    ).strip()


async def _resolve_voice_config(
    *,
    voice_id: Optional[str] = None,
    emotion: Optional[str] = None,
    speed: Optional[float] = None,
    speaker: Optional[str] = None,
    output_format: Optional[str] = None,
) -> dict[str, Any]:
    slot = await ai_runtime.resolve_model_slot("voice")
    if not slot:
        raise VoiceConfigError("voice default model is not configured")
    service_url = _pick_url(slot)
    if not service_url:
        raise VoiceConfigError("voice service_url is not configured")
    resolved_voice_id = str(voice_id or slot.get("voice_id") or slot.get("voiceId") or "").strip()
    if not resolved_voice_id:
        raise VoiceConfigError("voice_id is not configured")
    return {
        "provider": str(slot.get("provider") or "").strip(),
        "service_url": service_url,
        "voice_id": resolved_voice_id,
        "speaker": str(speaker or slot.get("speaker") or "").strip(),
        "emotion": str(emotion or slot.get("emotion") or "").strip(),
        "speed": speed if speed is not None else slot.get("speed"),
        "format": str(output_format or slot.get("format") or "").strip(),
    }


async def speak_text(
    *,
    text: str,
    agent_id: Optional[str] = None,
    session_id: Optional[str] = None,
    voice_id: Optional[str] = None,
    emotion: Optional[str] = None,
    speed: Optional[float] = None,
    speaker: Optional[str] = None,
    output_format: Optional[str] = None,
) -> dict[str, Any]:
    config = await _resolve_voice_config(
        voice_id=voice_id,
        emotion=emotion,
        speed=speed,
        speaker=speaker,
        output_format=output_format,
    )
    payload = {
        "text": text,
        "voiceId": config["voice_id"],
        "voice_id": config["voice_id"],
    }
    if agent_id:
        payload["agentId"] = agent_id
    if session_id:
        payload["sessionId"] = session_id
    if config.get("emotion"):
        payload["emotion"] = config["emotion"]
    if config.get("speaker"):
        payload["speaker"] = config["speaker"]
    if config.get("format"):
        payload["format"] = config["format"]
    if config.get("speed") not in (None, ""):
        payload["speed"] = config["speed"]

    headers = {"Accept": "application/json"}
    if settings.voice_service_api_key:
        headers["Authorization"] = f"Bearer {settings.voice_service_api_key}"

    timeout = max(1.0, float(settings.voice_service_timeout or 15.0))
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(config["service_url"], json=payload, headers=headers)
    except Exception as exc:
        logger.warning("voice service request failed: %s", exc)
        raise VoiceServiceError(f"voice service request failed: {exc}") from exc

    if response.status_code >= 300:
        detail = response.text[:300]
        raise VoiceServiceError(f"voice service returned {response.status_code}: {detail}")

    mime_type = response.headers.get("content-type", "").split(";")[0].strip() or "audio/mpeg"
    if mime_type.startswith("application/json"):
        try:
            data = response.json()
        except Exception as exc:
            raise VoiceServiceError(f"voice service returned invalid JSON: {exc}") from exc
        audio_url = str(data.get("audioUrl") or data.get("audio_url") or data.get("url") or "").strip()
        if not audio_url:
            raise VoiceServiceError("voice service JSON response does not contain audioUrl")
        return {"audioUrl": audio_url, "mimeType": str(data.get("mimeType") or mime_type or "audio/mpeg")}

    raise VoiceServiceError("voice service must return JSON with audioUrl in this version")
