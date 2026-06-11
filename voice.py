"""Direct voice service integration."""
from __future__ import annotations

import asyncio
import base64
import logging
import uuid
from typing import Any, Optional

import httpx

import ai_runtime
from config import settings

logger = logging.getLogger(__name__)

ELEVENLABS_DEFAULT_BASE = "https://api.elevenlabs.io"


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
        raise VoiceConfigError("语音模型未配置。请在系统设置中指定默认的 Voice 模型。")

    provider = str(slot.get("provider") or "").strip().lower()
    service_url = _pick_url(slot)
    # ElevenLabs 不强制填 service_url：缺省走官方 API。
    if not service_url and provider == "elevenlabs":
        service_url = ELEVENLABS_DEFAULT_BASE
    if not service_url:
        raise VoiceConfigError(f"语音模型配置缺失: 未找到 service_url。如果你使用的是 {provider or '自定义'} 服务，请填写基础 URL 或配置环境变量 VOICE_SERVICE_URL。")

    resolved_voice_id = str(voice_id or slot.get("voice_id") or slot.get("voiceId") or "").strip()
    if not resolved_voice_id:
        raise VoiceConfigError("语音模型配置缺失: 未指定 voice_id。请在模型设定或者系统默认配置中指定一个音色 ID。")

    api_key = str(slot.get("api_key") or settings.voice_service_api_key or "").strip()
    if provider and provider not in ("local", "system") and not api_key:
        raise VoiceConfigError(f"语音模型配置缺失: 供应商 '{provider}' 需要填写 API 密钥 (API Key)。请在安全设置或环境变量中配置。")

    # 模型 id：槽位优先，回退到全局默认（ElevenLabs 默认 eleven_v3，可切换）。
    model_id = str(
        slot.get("model_id") or slot.get("model") or slot.get("model_name") or settings.voice_model_id or ""
    ).strip()
    output_mode = str(slot.get("output_mode") or settings.voice_output_mode or "inline").strip().lower()
    if output_mode not in ("inline", "r2"):
        output_mode = "inline"

    return {
        "provider": str(slot.get("provider") or "").strip(),
        "service_url": service_url,
        "voice_id": resolved_voice_id,
        "api_key": api_key,
        "model_id": model_id,
        "output_mode": output_mode,
        "speaker": str(speaker or slot.get("speaker") or "").strip(),
        "emotion": str(emotion or slot.get("emotion") or "").strip(),
        "speed": speed if speed is not None else slot.get("speed"),
        "format": str(output_format or slot.get("format") or "").strip(),
    }


async def _emit_audio(data: bytes, mime_type: str, output_mode: str, agent_id: Optional[str]) -> dict[str, Any]:
    """把 TTS 返回的原始音频字节转成 audioUrl：inline=base64 data URL（不落 R2）；r2=存桶返回 URL。"""
    if not data:
        raise VoiceServiceError("TTS service returned empty audio")
    mime_type = mime_type or "audio/mpeg"
    if output_mode == "r2":
        import media_storage

        owner = str(agent_id or "").strip() or "user"
        ext = "mp3" if "mpeg" in mime_type or "mp3" in mime_type else (mime_type.split("/")[-1] or "bin")
        storage_key = f"tts/{owner}/{uuid.uuid4().hex}.{ext}"
        try:
            await asyncio.to_thread(
                media_storage.r2_client.put_object, storage_key, data, mime_type=mime_type
            )
        except Exception as exc:
            raise VoiceServiceError(f"TTS audio R2 upload failed: {exc}") from exc
        if settings.r2_public_base:
            audio_url = f"{settings.r2_public_base}/{storage_key}"
        else:
            audio_url = await asyncio.to_thread(
                media_storage.r2_client.presigned_download_url, storage_key
            )
        return {"audioUrl": audio_url, "mimeType": mime_type}
    # inline：base64 data URL，前端可直接播放，不持久化
    b64 = base64.b64encode(data).decode("ascii")
    return {"audioUrl": f"data:{mime_type};base64,{b64}", "mimeType": mime_type}


async def _elevenlabs_speak(
    config: dict[str, Any], text: str, *, agent_id: Optional[str] = None
) -> dict[str, Any]:
    base = str(config.get("service_url") or ELEVENLABS_DEFAULT_BASE).rstrip("/")
    url = f"{base}/v1/text-to-speech/{config['voice_id']}"
    headers = {
        "xi-api-key": config["api_key"],
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
    }
    payload: dict[str, Any] = {"text": text}
    if config.get("model_id"):
        payload["model_id"] = config["model_id"]
    voice_settings: dict[str, Any] = {}
    if config.get("speed") not in (None, ""):
        try:
            voice_settings["speed"] = float(config["speed"])
        except (TypeError, ValueError):
            pass
    if voice_settings:
        payload["voice_settings"] = voice_settings

    timeout = max(1.0, float(settings.voice_service_timeout or 15.0))
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(url, json=payload, headers=headers)
    except Exception as exc:
        logger.warning("elevenlabs request failed: %s", exc)
        raise VoiceServiceError(f"elevenlabs request failed: {exc}") from exc
    if response.status_code >= 300:
        raise VoiceServiceError(f"elevenlabs returned {response.status_code}: {response.text[:300]}")

    mime_type = response.headers.get("content-type", "").split(";")[0].strip() or "audio/mpeg"
    return await _emit_audio(response.content, mime_type, config["output_mode"], agent_id)


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

    # ElevenLabs：voice_id 在 URL 路径、xi-api-key 鉴权、返回原始音频字节。
    if str(config.get("provider") or "").strip().lower() == "elevenlabs":
        return await _elevenlabs_speak(config, text, agent_id=agent_id)

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
