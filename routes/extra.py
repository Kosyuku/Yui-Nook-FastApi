"""新增 API 路由 — 待办/便签/主动消息/历史/意识循环"""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from urllib.parse import urljoin

import httpx
from typing import Any, Optional

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

import ai_runtime
from config import settings
import database as db
import consciousness
import memory_async
import voice as voice_service
from tools import TOOLS_SCHEMA

logger = logging.getLogger(__name__)
extra_api = APIRouter(prefix="/api")


# ── Pydantic Models ──

class TodoCreate(BaseModel):
    content: str
    due_date: str = ""
    tags: str = ""

class TodoUpdate(BaseModel):
    content: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None
    tags: Optional[str] = None

class NoteCreate(BaseModel):
    content: str
    tags: str = ""
    date: Optional[str] = None


class DiaryCreate(BaseModel):
    content: str
    title: str = ""
    tags: str = ""
    visibility: str = "private"
    source_agent_id: Optional[str] = None


class DiaryUpdate(BaseModel):
    content: Optional[str] = None
    title: Optional[str] = None
    tags: Optional[str] = None
    visibility: Optional[str] = None
    source_agent_id: Optional[str] = None


class DiaryNotebookUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    visibility: Optional[str] = None
    is_default: Optional[bool] = None


class DiaryNotebookCreate(BaseModel):
    agent_id: str
    name: str = ""
    description: str = ""
    visibility: str = "private"
    is_default: bool = False


class DiaryEntryCreate(BaseModel):
    title: str = ""
    content: str
    tags: str = ""


class DiaryEntryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[str] = None


class DiaryCommentCreate(BaseModel):
    content: str
    author_type: str = "user"
    author_id: str = "me"


class DiaryUnderlineCreate(BaseModel):
    start_offset: int
    end_offset: int
    author_type: str = "user"
    author_id: str = "me"
    note: str = ""


class MomentCreate(BaseModel):
    author_type: str = "user"
    author_id: str = "me"
    visibility: str = "public"
    content: str
    image: str = ""
    mood: str = ""


class MomentUpdate(BaseModel):
    author_type: str = "user"
    author_id: str = "me"
    visibility: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    mood: Optional[str] = None


class MomentLikePayload(BaseModel):
    actor_type: str = "user"
    actor_id: str = "me"
    actor_name: str = ""


class MomentCommentPayload(BaseModel):
    actor_type: str = "user"
    actor_id: str = "me"
    actor_name: str = ""
    text: str


class AISettingsPayload(BaseModel):
    settings: dict[str, Any]


class PhoneStatePayload(BaseModel):
    data: dict[str, Any]


class TranslatePayload(BaseModel):
    text: str
    sourceLanguage: Optional[str] = None
    targetLanguage: Optional[str] = None
    instruction: Optional[str] = None


class VisionAnalyzePayload(BaseModel):
    imageUrl: Optional[str] = None
    prompt: Optional[str] = None
    text: Optional[str] = None


class VoiceSpeakPayload(BaseModel):
    text: str
    agentId: Optional[str] = None
    sessionId: Optional[str] = None
    voiceId: Optional[str] = None
    emotion: Optional[str] = None
    speed: Optional[float] = None
    speaker: Optional[str] = None
    format: Optional[str] = None


class RPCreateRoomPayload(BaseModel):
    agent_id: Optional[str] = None
    name: str = "新房间"
    world_setting: str = ""
    user_role: str = ""
    ai_role: str = ""


class RPUpdateRoomPayload(BaseModel):
    name: Optional[str] = None
    world_setting: Optional[str] = None
    user_role: Optional[str] = None
    ai_role: Optional[str] = None


class CompanionStatePayload(BaseModel):
    recent_topics: list[str] = []
    current_mood: str = ""
    open_loops: list[str] = []
    proactive_cooldown_until: Optional[str] = None


class CompanionStateSummaryPayload(BaseModel):
    agentId: Optional[str] = None
    impression: Optional[str] = None
    relationshipProgress: Optional[str] = None
    likesSummary: Optional[str] = None


class AgentPersonaPayload(BaseModel):
    persona: str = ""


class ProviderDiscoverPayload(BaseModel):
    base_url: str
    api_key: str = ""

class HealthIngestPayload(BaseModel):
    steps: Optional[int] = None
    heart_rate: Optional[float] = None
    sleep_hours: Optional[float] = None
    calories: Optional[float] = None
    source: str = "apple_health"
    measured_at: Optional[str] = None
    raw: Optional[dict[str, Any]] = None


class SyncPushPayload(BaseModel):
    device_id: str
    payload: dict[str, Any]
    client_updated_at: Optional[str] = None


class ChatProfilePayload(BaseModel):
    avatar: Optional[str] = None
    nickname: Optional[str] = None
    signature: Optional[str] = None


class AgentProfilePayload(BaseModel):
    avatar: Optional[str] = None
    name: Optional[str] = None
    bio: Optional[str] = None
    theme: Optional[str] = None
    settings: Optional[dict[str, Any]] = None
    roomBackground: Optional[str] = None
    bubbleTheme: Optional[str] = None
    quickActions: Optional[list[dict[str, Any]]] = None


class AgentCreatePayload(BaseModel):
    agent_id: str
    display_name: str
    avatar: str = ""
    description: str = ""
    persona: str = ""
    source: str = "native"
    metadata: dict[str, Any] | str | None = None


class AgentUpdatePayload(BaseModel):
    display_name: Optional[str] = None
    avatar: Optional[str] = None
    description: Optional[str] = None
    persona: Optional[str] = None
    source: Optional[str] = None
    metadata: dict[str, Any] | str | None = None
    is_active: Optional[bool] = None


class AgentResolvePayload(BaseModel):
    agent_id: Optional[str] = None
    session_id: Optional[str] = None
    room_id: Optional[str] = None
    source: Optional[str] = None
    external_id: Optional[str] = None
    external_name: Optional[str] = None
    oauth_client_id: Optional[str] = None


class AgentExternalLinkCreatePayload(BaseModel):
    source: str
    external_id: str
    agent_id: str
    external_name: str = ""
    metadata: dict[str, Any] | str | None = None


class AgentExternalLinkUpdatePayload(BaseModel):
    agent_id: Optional[str] = None
    external_name: Optional[str] = None
    metadata: dict[str, Any] | str | None = None


AI_SETTINGS_KEY = "ai_settings"
HEALTH_LATEST_KEY = "health_latest"
SYNC_GLOBAL_KEY = "sync_global_state"
CHAT_PROFILE_KEY = "chat_profile"


def _safe_profile_payload(data: Any) -> dict[str, Any]:
    return data if isinstance(data, dict) else {}


async def _load_setting_dict(key: str) -> tuple[dict[str, Any], Optional[str]]:
    row = await db.get_setting(key)
    if not row or not row.get("value"):
        return {}, None
    try:
        payload = json.loads(row["value"])
    except Exception:
        return {}, row.get("updated_at")
    return _safe_profile_payload(payload), row.get("updated_at")


async def _load_legacy_sync_payload() -> dict[str, Any]:
    data, _ = await _load_setting_dict(SYNC_GLOBAL_KEY)
    return _safe_profile_payload(data.get("payload"))


def _agent_profile_key(agent_id: str) -> str:
    safe_agent = db.normalize_agent_id(agent_id)
    return f"agent_profile_{safe_agent}"


def _compact_profile(data: dict[str, Any], fields: set[str]) -> dict[str, Any]:
    return {key: value for key, value in data.items() if key in fields and value not in (None, "")}


def _agent_http_error(exc: Exception) -> HTTPException:
    if isinstance(exc, db.AgentNeedsBinding):
        return HTTPException(status_code=409, detail=exc.payload())
    if isinstance(exc, db.AgentResolutionError):
        return HTTPException(status_code=400, detail=str(exc))
    return HTTPException(status_code=500, detail=str(exc))


@extra_api.get("/agents")
async def list_agents(include_inactive: bool = False):
    return {"agents": await db.list_agents(include_inactive=include_inactive)}


@extra_api.post("/agents")
async def create_agent(body: AgentCreatePayload):
    try:
        agent = await db.create_agent(**body.model_dump())
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"agent": agent}


@extra_api.post("/agents/resolve")
async def resolve_agent(body: AgentResolvePayload):
    try:
        context = await db.resolve_agent_context(
            agent_id=body.agent_id,
            session_id=body.session_id,
            room_id=body.room_id,
            source=body.source,
            external_id=body.external_id,
            external_name=body.external_name,
            oauth_client_id=body.oauth_client_id,
            allow_default=False,
        )
    except db.AgentNeedsBinding as exc:
        return exc.payload()
    except Exception as exc:
        raise _agent_http_error(exc)
    agent = context.get("agent") or {}
    return {
        "resolved": True,
        "agent_id": context["agent_id"],
        "display_name": agent.get("display_name") or context["agent_id"],
        "via": context.get("via"),
    }


@extra_api.get("/agents/{agent_id}")
async def get_agent(agent_id: str):
    try:
        agent = await db.get_agent(agent_id, include_inactive=True)
    except Exception as exc:
        raise _agent_http_error(exc)
    if not agent:
        raise HTTPException(status_code=404, detail="agent not found")
    return {"agent": agent}


@extra_api.patch("/agents/{agent_id}")
async def update_agent(agent_id: str, body: AgentUpdatePayload):
    try:
        agent = await db.update_agent(agent_id, **{k: v for k, v in body.model_dump().items() if v is not None})
    except Exception as exc:
        raise _agent_http_error(exc)
    if not agent:
        raise HTTPException(status_code=404, detail="agent not found")
    return {"ok": True, "agent": agent}


@extra_api.delete("/agents/{agent_id}")
async def delete_agent(agent_id: str):
    try:
        ok = await db.deactivate_agent(agent_id)
    except Exception as exc:
        raise _agent_http_error(exc)
    if not ok:
        raise HTTPException(status_code=404, detail="agent not found")
    return {"ok": True}


@extra_api.get("/agent-external-links")
async def list_agent_external_links(source: Optional[str] = None, agent_id: Optional[str] = None):
    try:
        links = await db.list_agent_external_links(source=source, agent_id=agent_id)
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"links": links}


@extra_api.post("/agent-external-links")
async def create_agent_external_link(body: AgentExternalLinkCreatePayload):
    try:
        link = await db.create_agent_external_link(**body.model_dump())
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"link": link}


@extra_api.patch("/agent-external-links/{link_id}")
async def update_agent_external_link(link_id: str, body: AgentExternalLinkUpdatePayload):
    try:
        link = await db.update_agent_external_link(
            link_id,
            **{k: v for k, v in body.model_dump().items() if v is not None},
        )
    except Exception as exc:
        raise _agent_http_error(exc)
    if not link:
        raise HTTPException(status_code=404, detail="external link not found")
    return {"ok": True, "link": link}


@extra_api.delete("/agent-external-links/{link_id}")
async def delete_agent_external_link(link_id: str):
    ok = await db.delete_agent_external_link(link_id)
    if not ok:
        raise HTTPException(status_code=404, detail="external link not found")
    return {"ok": True}


@extra_api.get("/chat/profile")
async def get_chat_profile():
    profile, updated_at = await _load_setting_dict(CHAT_PROFILE_KEY)
    if not profile:
        legacy = await _load_legacy_sync_payload()
        profile = _compact_profile(_safe_profile_payload(legacy.get("accountProfile")), {"avatar", "nickname", "signature"})
    return {"ok": True, "profile": profile, "updated_at": updated_at, "storage": "supabase"}


@extra_api.put("/chat/profile")
async def save_chat_profile(body: ChatProfilePayload):
    current, _ = await _load_setting_dict(CHAT_PROFILE_KEY)
    incoming = _compact_profile(body.dict(), {"avatar", "nickname", "signature"})
    profile = {**current, **incoming}
    row = await db.set_setting(CHAT_PROFILE_KEY, json.dumps(profile, ensure_ascii=False))
    return {"ok": True, "profile": profile, "updated_at": row.get("updated_at"), "storage": "supabase"}


@extra_api.get("/agents/{agent_id}/profile")
async def get_agent_profile(agent_id: str):
    try:
        safe_agent = await db.require_agent(agent_id)
    except Exception as exc:
        raise _agent_http_error(exc)
    profile, updated_at = await _load_setting_dict(_agent_profile_key(safe_agent))
    if not profile:
        legacy = await _load_legacy_sync_payload()
        contacts = legacy.get("contacts") if isinstance(legacy.get("contacts"), list) else []
        matched = next((item for item in contacts if str(item.get("id") or "") == safe_agent), {})
        profile = _compact_profile(
            _safe_profile_payload(matched),
            {"avatar", "name", "bio", "theme", "settings", "roomBackground", "bubbleTheme", "quickActions"},
        )
    return {"ok": True, "agent_id": safe_agent, "profile": profile, "updated_at": updated_at, "storage": "supabase"}


@extra_api.put("/agents/{agent_id}/profile")
async def save_agent_profile(agent_id: str, body: AgentProfilePayload):
    try:
        safe_agent = await db.require_agent(agent_id)
    except Exception as exc:
        raise _agent_http_error(exc)
    current, _ = await _load_setting_dict(_agent_profile_key(safe_agent))
    incoming = _compact_profile(
        body.dict(),
        {"avatar", "name", "bio", "theme", "settings", "roomBackground", "bubbleTheme", "quickActions"},
    )
    profile = {**current, **incoming}
    row = await db.set_setting(_agent_profile_key(safe_agent), json.dumps(profile, ensure_ascii=False))
    return {"ok": True, "agent_id": safe_agent, "profile": profile, "updated_at": row.get("updated_at"), "storage": "supabase"}



@extra_api.get("/settings/ai")
async def get_ai_settings():
    payload = await ai_runtime.load_ai_settings_container()
    return {
        "settings": payload,
        "consciousness": consciousness.get_status(),
        "storage": "supabase",
    }


@extra_api.put("/settings/ai")
async def save_ai_settings(body: AISettingsPayload):
    normalized = ai_runtime.normalize_ai_settings_container(body.settings)
    row = await db.set_setting(AI_SETTINGS_KEY, json.dumps(normalized, ensure_ascii=False))
    return {
        "ok": True,
        "updated_at": row.get("updated_at"),
        "settings": normalized,
        "storage": "supabase",
    }


@extra_api.get("/phone/state/{key}")
async def get_phone_state(key: str):
    safe_key = "".join(ch for ch in key if ch.isalnum() or ch in {"_", "-"}).strip()
    if not safe_key:
        raise HTTPException(status_code=400, detail="key is required")
    row = await db.get_setting(f"phone_state_{safe_key}")
    if not row or not row.get("value"):
        return {"key": safe_key, "data": {}, "updated_at": None}
    try:
        data = json.loads(row["value"])
    except Exception:
        data = {}
    return {"key": safe_key, "data": data if isinstance(data, dict) else {}, "updated_at": row.get("updated_at")}


@extra_api.put("/phone/state/{key}")
async def save_phone_state(key: str, body: PhoneStatePayload):
    safe_key = "".join(ch for ch in key if ch.isalnum() or ch in {"_", "-"}).strip()
    if not safe_key:
        raise HTTPException(status_code=400, detail="key is required")
    row = await db.set_setting(f"phone_state_{safe_key}", json.dumps(body.data, ensure_ascii=False))
    return {"ok": True, "key": safe_key, "data": body.data, "updated_at": row.get("updated_at")}


async def _collect_slot_text(
    slot_name: str,
    messages: list[dict[str, Any]],
    *,
    temperature: float = 0.2,
) -> tuple[str, dict[str, Any]]:
    adapter, info, kwargs = await ai_runtime.resolve_adapter_for_slot(
        slot_name,
        tools=[],
        tool_choice="none",
    )
    if adapter is None:
        return "", info
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=temperature, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return "".join(parts).strip(), info


def _looks_like_model_failure(text: str) -> bool:
    normalized = str(text or "").strip()
    if not normalized:
        return True
    failure_markers = (
        "❌",
        "模型调用失败",
        "请求超时",
        "连接失败",
        "未知错误",
        "missing api key",
        "provider",
    )
    return any(marker.lower() in normalized.lower() for marker in failure_markers)


@extra_api.post("/translate")
async def translate_text(body: TranslatePayload):
    text = str(body.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")
    prompt = await ai_runtime.resolve_prompt("translate")
    target_language = str(body.targetLanguage or "").strip() or "中文"
    source_language = str(body.sourceLanguage or "").strip() or "auto"
    instruction = str(body.instruction or "").strip()
    system_prompt = prompt or "Translate the content accurately while preserving tone and useful formatting."
    if instruction:
        system_prompt = f"{system_prompt}\nAdditional instruction: {instruction}"
    content = (
        f"Source language: {source_language}\n"
        f"Target language: {target_language}\n\n"
        f"Text:\n{text}"
    )
    translated, model_info = await _collect_slot_text(
        "translate",
        [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": content},
        ],
        temperature=0.2,
    )
    if _looks_like_model_failure(translated):
        raise HTTPException(
            status_code=502,
            detail=translated or "translate model is not available",
        )
    return {"success": True, "text": translated, "model": model_info}


@extra_api.post("/vision/analyze")
async def analyze_vision(body: VisionAnalyzePayload):
    image_url = str(body.imageUrl or "").strip()
    prompt = str(body.prompt or "").strip()
    text_hint = str(body.text or "").strip()
    if not image_url and not text_hint:
        raise HTTPException(status_code=400, detail="imageUrl or text is required")
    system_prompt = await ai_runtime.resolve_prompt("vision")
    system_prompt = system_prompt or "Analyze the image or OCR text and answer concisely."
    user_content: list[dict[str, Any]] = []
    if prompt:
        user_content.append({"type": "text", "text": prompt})
    if text_hint:
        user_content.append({"type": "text", "text": f"Input text:\n{text_hint}"})
    if image_url:
        user_content.append({"type": "image_url", "image_url": {"url": image_url}})
    if not user_content:
        user_content.append({"type": "text", "text": "Analyze the provided image."})
    analyzed, model_info = await _collect_slot_text(
        "vision",
        [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ],
        temperature=0.2,
    )
    if _looks_like_model_failure(analyzed):
        raise HTTPException(
            status_code=502,
            detail=analyzed or "vision model is not available",
        )
    return {"success": True, "text": analyzed, "model": model_info}


@extra_api.post("/voice/speak")
async def speak_voice(body: VoiceSpeakPayload):
    text = str(body.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")
    try:
        result = await voice_service.speak_text(
            text=text,
            agent_id=body.agentId,
            session_id=body.sessionId,
            voice_id=body.voiceId,
            emotion=body.emotion,
            speed=body.speed,
            speaker=body.speaker,
            output_format=body.format,
        )
    except voice_service.VoiceConfigError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except voice_service.VoiceServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
    return {"success": True, **result}


@extra_api.get("/rp/rooms")
async def list_rp_rooms(agent_id: Optional[str] = None):
    rooms = await db.list_rp_rooms(agent_id=agent_id)
    return {"rooms": rooms}


@extra_api.post("/rp/rooms")
async def create_rp_room(body: RPCreateRoomPayload):
    room = await db.create_rp_room(
        agent_id=body.agent_id,
        name=body.name,
        world_setting=body.world_setting,
        user_role=body.user_role,
        ai_role=body.ai_role,
    )
    return {"room": room}


@extra_api.get("/rp/rooms/{room_id}")
async def get_rp_room(room_id: str):
    room = await db.get_rp_room(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")
    return {"room": room}


@extra_api.patch("/rp/rooms/{room_id}")
async def update_rp_room(room_id: str, body: RPUpdateRoomPayload):
    room = await db.update_rp_room(room_id, **{k: v for k, v in body.model_dump().items() if v is not None})
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")
    return {"ok": True, "room": room}


@extra_api.delete("/rp/rooms/{room_id}")
async def delete_rp_room(room_id: str):
    ok = await db.delete_rp_room(room_id)
    if not ok:
        raise HTTPException(status_code=404, detail="房间不存在")
    return {"ok": True}


@extra_api.get("/rp/rooms/{room_id}/messages")
async def get_rp_room_messages(room_id: str, limit: int = 200):
    room = await db.get_rp_room(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在")
    messages = await db.get_rp_messages(room_id, limit=max(1, min(limit, 500)))
    return {"room": room, "messages": messages}


@extra_api.get("/companion-state")
async def get_companion_state(agent_id: Optional[str] = None):
    state = await db.get_companion_state(agent_id=agent_id)
    return {"state": state}


@extra_api.put("/companion-state")
async def save_companion_state(body: CompanionStatePayload, agent_id: Optional[str] = None):
    try:
        state = await db.set_companion_state(
            agent_id=agent_id,
            recent_topics=body.recent_topics,
            current_mood=body.current_mood,
            open_loops=body.open_loops,
            proactive_cooldown_until=body.proactive_cooldown_until,
        )
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"ok": True, "state": state}


@extra_api.put("/companion-state/summary")
async def update_companion_state_summary(body: CompanionStateSummaryPayload):
    try:
        state = await db.set_companion_state_summary(
            agent_id=body.agentId,
            impression=body.impression,
            relationship_progress=body.relationshipProgress,
            likes_summary=body.likesSummary,
        )
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"ok": True, "state": state}


@extra_api.get("/agents/{agent_id}/persona")
async def get_agent_persona(agent_id: str):
    return {"ok": True, **await db.get_agent_persona(agent_id)}


@extra_api.put("/agents/{agent_id}/persona")
async def save_agent_persona(agent_id: str, body: AgentPersonaPayload):
    return {"ok": True, **await db.set_agent_persona(agent_id, body.persona)}


@extra_api.delete("/agents/{agent_id}/safe-delete")
async def safe_delete_agent(agent_id: str):
    # 1. Cascade delete all linked states
    result = await db.safe_delete_agent(agent_id)
    
    # 2. Remove the agent from ai_settings list
    try:
        from ai_runtime import load_ai_settings_container
        settings_payload = await load_ai_settings_container()
        agents = settings_payload.get("agents", [])
        original_count = len(agents)
        settings_payload["agents"] = [a for a in agents if a.get("id") != agent_id]
        if len(settings_payload["agents"]) < original_count:
            await db.set_setting(AI_SETTINGS_KEY, json.dumps(settings_payload, ensure_ascii=False))
            result["agent_record_deleted"] = True
        else:
            result["agent_record_deleted"] = False
    except Exception as exc:
        logger.error(f"failed to remove agent from config: {exc}")
        result["agent_record_deleted"] = False

    return {"ok": True, **result}


@extra_api.post("/settings/ai/discover-models")
async def discover_provider_models(body: ProviderDiscoverPayload):
    base_url = (body.base_url or "").strip()
    if not base_url:
        raise HTTPException(status_code=400, detail="?? Base URL")

    endpoint = base_url.rstrip("/")
    if not endpoint.endswith("/models"):
        endpoint = f"{endpoint}/models"

    headers = {"Accept": "application/json"}
    if body.api_key:
        headers["Authorization"] = f"Bearer {body.api_key.strip()}"

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(endpoint, headers=headers)
    except Exception as exc:
        logger.warning("discover models request failed: %s", exc)
        raise HTTPException(status_code=502, detail="????????????????????????????")

    if resp.status_code >= 300:
        detail = "????????????????"
        try:
            payload = resp.json()
            if isinstance(payload, dict):
                detail = payload.get("error", {}).get("message") or payload.get("message") or detail
        except Exception:
            pass
        raise HTTPException(status_code=resp.status_code, detail=detail)

    try:
        payload = resp.json()
    except Exception as exc:
        logger.warning("discover models invalid json: %s", exc)
        raise HTTPException(status_code=502, detail="?????????? JSON?????????")

    items = payload.get("data") if isinstance(payload, dict) else payload
    if not isinstance(items, list):
        raise HTTPException(status_code=502, detail="?????????????????????")

    models: list[str] = []
    for item in items:
        model_id = None
        if isinstance(item, dict):
            model_id = item.get("id") or item.get("name") or item.get("model") or item.get("slug")
        elif isinstance(item, str):
            model_id = item
        if model_id and model_id not in models:
            models.append(model_id)

    return {"models": models, "count": len(models), "endpoint": endpoint}


def _tool_icon_for_mcp(name: str) -> str:
    n = (name or "").lower()
    if "health" in n:
        return "health"
    if "weather" in n:
        return "weather"
    if "calendar" in n or "time" in n:
        return "calendar"
    if "note" in n or "memory" in n:
        return "file"
    if "search" in n or "fetch" in n:
        return "quote"
    return "more"


@extra_api.get("/mcp/library")
async def get_mcp_library():
    tools: list[dict[str, Any]] = []
    for idx, item in enumerate(TOOLS_SCHEMA):
        fn = item.get("function", {}) if isinstance(item, dict) else {}
        name = str(fn.get("name") or "").strip()
        if not name:
            continue
        desc = str(fn.get("description") or "").strip()
        tools.append(
            {
                "id": name,
                "label": name.replace("_", " "),
                "icon": _tool_icon_for_mcp(name),
                "description": desc,
                "enabled": True,
                "order": idx,
            }
        )
    return {"tools": tools, "count": len(tools)}


@extra_api.get("/health/latest")
async def get_health_latest():
    row = await db.get_setting(HEALTH_LATEST_KEY)
    payload: dict[str, Any] = {}
    if row and row.get("value"):
        try:
            payload = json.loads(row["value"])
        except Exception:
            payload = {}
    return {"health": payload}


@extra_api.post("/health/ingest")
async def ingest_health_data(body: HealthIngestPayload):
    measured_at = (body.measured_at or "").strip() or datetime.now(timezone.utc).isoformat()
    payload = {
        "steps": body.steps,
        "heart_rate": body.heart_rate,
        "sleep_hours": body.sleep_hours,
        "calories": body.calories,
        "source": body.source,
        "measured_at": measured_at,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "raw": body.raw or {},
    }
    row = await db.set_setting(HEALTH_LATEST_KEY, json.dumps(payload, ensure_ascii=False))
    return {"ok": True, "health": payload, "updated_at": row.get("updated_at")}


@extra_api.post("/sync/push")
async def sync_push(body: SyncPushPayload):
    device_id = (body.device_id or "").strip()
    if not device_id:
        raise HTTPException(status_code=400, detail="device_id is required")
    if not isinstance(body.payload, dict):
        raise HTTPException(status_code=400, detail="payload must be an object")

    now = datetime.now(timezone.utc).isoformat()
    data = {
        "device_id": device_id,
        "client_updated_at": body.client_updated_at,
        "server_updated_at": now,
        "payload": body.payload,
    }
    try:
        row = await db.set_setting(SYNC_GLOBAL_KEY, json.dumps(data, ensure_ascii=False))
        return {"ok": True, "server_updated_at": row.get("updated_at") or now}
    except Exception as exc:
        logger.exception("sync push failed")
        raise HTTPException(status_code=502, detail=f"Database sync failed: {exc}")


@extra_api.get("/sync/pull")
async def sync_pull(device_id: str, since: Optional[str] = None):
    row = await db.get_setting(SYNC_GLOBAL_KEY)
    if not row or not row.get("value"):
        return {"has_update": False, "server_updated_at": None}

    try:
        data = json.loads(row["value"])
    except Exception:
        return {"has_update": False, "server_updated_at": None}

    server_updated_at = str(data.get("server_updated_at") or row.get("updated_at") or "")
    if since and server_updated_at and server_updated_at <= since:
        return {"has_update": False, "server_updated_at": server_updated_at}

    return {
        "has_update": True,
        "server_updated_at": server_updated_at,
        "source_device_id": data.get("device_id") or "",
        "payload": data.get("payload") or {},
        "is_self": (data.get("device_id") or "") == (device_id or ""),
    }


# ══════════ 待办 ══════════

@extra_api.get("/todos")
async def list_todos(status: Optional[str] = None, limit: int = 50):
    todos = await db.list_todos(status=status, limit=limit)
    return {"todos": todos}

@extra_api.post("/todos")
async def create_todo(body: TodoCreate):
    todo = await db.add_todo(content=body.content, due_date=body.due_date, tags=body.tags)
    return {"todo": todo}

@extra_api.patch("/todos/{todo_id}")
async def update_todo(todo_id: str, body: TodoUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    ok = await db.update_todo(todo_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="待办不存在")
    return {"ok": True}

@extra_api.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str):
    ok = await db.delete_todo(todo_id)
    if not ok:
        raise HTTPException(status_code=404, detail="待办不存在")
    return {"ok": True}


# ══════════ 便签 ══════════

@extra_api.get("/notes")
async def list_notes(date: Optional[str] = None, tags: Optional[str] = None, limit: int = 50):
    notes = await db.list_notes(date=date, tags=tags, limit=limit)
    return {"notes": notes}

@extra_api.post("/notes")
async def create_note(body: NoteCreate):
    note = await db.add_note(content=body.content, tags=body.tags, date=body.date)
    return {"note": note}

@extra_api.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    ok = await db.delete_note(note_id)
    if not ok:
        raise HTTPException(status_code=404, detail="便签不存在")
    return {"ok": True}


# Diary

@extra_api.get("/diary/notebooks")
async def get_diary_notebooks():
    return {"notebooks": await db.list_diary_notebooks()}


@extra_api.post("/diary/notebooks")
async def create_diary_notebook(body: DiaryNotebookCreate):
    try:
        notebook = await db.create_agent_diary_notebook(
            body.agent_id,
            name=body.name,
            description=body.description,
            visibility=body.visibility,
            is_default=body.is_default,
        )
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"notebook": notebook}


@extra_api.patch("/diary/notebooks/{notebook_id}")
async def patch_diary_notebook(notebook_id: str, body: DiaryNotebookUpdate):
    notebook = await db.update_diary_notebook(
        notebook_id,
        name=body.name,
        description=body.description,
        visibility=body.visibility,
        is_default=body.is_default,
    )
    if not notebook:
        raise HTTPException(status_code=404, detail="日记本不存在或无权限")
    return {"notebook": notebook}


@extra_api.get("/diary/notebooks/{notebook_id}/entries")
async def get_diary_notebook_entries(notebook_id: str, limit: int = 100):
    entries = await db.list_diary_entries(notebook_id, limit=limit)
    return {"entries": entries}


@extra_api.post("/diary/notebooks/{notebook_id}/entries")
async def create_diary_notebook_entry(notebook_id: str, body: DiaryEntryCreate):
    entry = await db.create_diary_entry(
        notebook_id,
        title=body.title,
        content=body.content,
        tags=body.tags,
    )
    if not entry:
        raise HTTPException(status_code=404, detail="日记本不存在或无权限")
    return {"entry": entry}


@extra_api.patch("/diary/entries/{entry_id}")
async def patch_diary_entry(entry_id: str, body: DiaryEntryUpdate):
    entry = await db.update_diary_entry(
        entry_id,
        title=body.title,
        content=body.content,
        tags=body.tags,
    )
    if not entry:
        raise HTTPException(status_code=404, detail="日记条目不存在或无权限")
    return {"entry": entry}


@extra_api.delete("/diary/entries/{entry_id}")
async def remove_diary_entry(entry_id: str):
    ok = await db.delete_diary_entry(entry_id)
    if not ok:
        raise HTTPException(status_code=404, detail="日记条目不存在或无权限")
    return {"ok": True}


@extra_api.get("/diary/entries/{entry_id}/comments")
async def get_diary_entry_comments(entry_id: str):
    return {"comments": await db.list_diary_comments(entry_id)}


@extra_api.post("/diary/entries/{entry_id}/comments")
async def create_diary_entry_comment(entry_id: str, body: DiaryCommentCreate):
    if not body.content.strip():
        raise HTTPException(status_code=400, detail="评论内容不能为空")
    comment = await db.add_diary_comment(
        entry_id,
        content=body.content.strip(),
        author_type=body.author_type,
        author_id=body.author_id,
    )
    if not comment:
        raise HTTPException(status_code=404, detail="该条目不可评论或不存在")
    return {"comment": comment}


@extra_api.get("/diary/entries/{entry_id}/annotations")
async def get_diary_entry_annotations(entry_id: str):
    return {"annotations": await db.list_diary_annotations(entry_id)}


@extra_api.post("/diary/entries/{entry_id}/annotations")
async def create_diary_entry_annotation(entry_id: str, body: DiaryUnderlineCreate):
    annotation = await db.add_diary_underline(
        entry_id,
        start_offset=body.start_offset,
        end_offset=body.end_offset,
        author_type=body.author_type,
        author_id=body.author_id,
        note=body.note,
    )
    if not annotation:
        raise HTTPException(status_code=404, detail="underline range invalid or diary entry not found")
    return {"annotation": annotation}

@extra_api.get("/diary")
async def get_diary(agent_id: Optional[str] = None, limit: int = 50):
    return {"entries": await db.list_diary(agent_id=agent_id, limit=limit)}


@extra_api.post("/diary")
async def create_diary(body: DiaryCreate, agent_id: Optional[str] = None):
    try:
        entry = await db.add_diary(
            content=body.content,
            title=body.title,
            tags=body.tags,
            visibility=body.visibility,
            source_agent_id=body.source_agent_id,
            agent_id=agent_id,
        )
    except Exception as exc:
        raise _agent_http_error(exc)
    return {"entry": entry}


@extra_api.patch("/diary/{diary_id}")
async def patch_diary(diary_id: str, body: DiaryUpdate, agent_id: Optional[str] = None):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    ok = await db.update_diary(diary_id, agent_id=agent_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="日记不存在")
    return {"ok": True}


@extra_api.delete("/diary/{diary_id}")
async def remove_diary(diary_id: str, agent_id: Optional[str] = None):
    ok = await db.delete_diary(diary_id, agent_id=agent_id)
    if not ok:
        raise HTTPException(status_code=404, detail="日记不存在")
    return {"ok": True}


@extra_api.get("/moments")
async def get_moments(limit: int = 100, viewer_type: str = "user", viewer_id: str = "me"):
    try:
        return {"moments": await db.list_moments(limit=limit, viewer_type=viewer_type, viewer_id=viewer_id)}
    except Exception:
        logger.exception("load moments failed")
        return {"moments": []}


@extra_api.post("/moments")
async def create_moment(body: MomentCreate):
    return {
        "moment": await db.add_moment(
            author_type=body.author_type,
            author_id=body.author_id,
            visibility=body.visibility,
            content=body.content,
            image=body.image,
            mood=body.mood,
        )
    }


@extra_api.patch("/moments/{moment_id}")
async def patch_moment(moment_id: str, body: MomentUpdate):
    ok = await db.update_moment(
        moment_id,
        author_type=body.author_type,
        author_id=body.author_id,
        visibility=body.visibility,
        content=body.content,
        image=body.image,
        mood=body.mood,
    )
    if not ok:
        raise HTTPException(status_code=404, detail="朋友圈不存在或无权限")
    return {"ok": True}


@extra_api.delete("/moments/{moment_id}")
async def remove_moment(moment_id: str, author_type: str, author_id: str):
    ok = await db.delete_moment(moment_id, author_type=author_type, author_id=author_id)
    if not ok:
        raise HTTPException(status_code=404, detail="朋友圈不存在或无权限")
    return {"ok": True}


@extra_api.post("/moments/{moment_id}/like")
async def like_moment(moment_id: str, body: MomentLikePayload):
    moment = await db.toggle_moment_like(
        moment_id,
        actor_type=body.actor_type,
        actor_id=body.actor_id,
        actor_name=body.actor_name,
    )
    if not moment:
        raise HTTPException(status_code=404, detail="朋友圈不存在")
    return {"moment": moment}


@extra_api.post("/moments/{moment_id}/comments")
async def comment_moment(moment_id: str, body: MomentCommentPayload):
    moment = await db.add_moment_comment(
        moment_id,
        actor_type=body.actor_type,
        actor_id=body.actor_id,
        actor_name=body.actor_name,
        text=body.text,
    )
    if not moment:
        raise HTTPException(status_code=404, detail="朋友圈不存在")
    return {"moment": moment}


# ══════════ 主动消息 ══════════

@extra_api.get("/proactive")
async def get_proactive(limit: int = 10):
    """前端定时轮询此接口读取主动消息"""
    messages = await db.get_pending_proactive(limit=limit)
    return {"messages": messages}

@extra_api.post("/proactive/{msg_id}/read")
async def mark_proactive_read(msg_id: str):
    ok = await db.mark_proactive_read(msg_id)
    if not ok:
        raise HTTPException(status_code=404, detail="消息不存在")
    return {"ok": True}


# ══════════ 历史记录 ══════════

@extra_api.get("/history")
async def get_history(date: Optional[str] = None, limit: int = 100):
    """按日期获取聊天历史"""
    if not date:
        from datetime import datetime
        date = datetime.now().strftime("%Y-%m-%d")
    messages = await db.get_messages_by_date(date=date, limit=limit)
    return {"date": date, "messages": messages}


# ══════════ 意识循环 ══════════

@extra_api.get("/consciousness/status")
async def consciousness_status():
    return consciousness.get_status()

@extra_api.post("/consciousness/trigger")
async def consciousness_trigger():
    """手动触发一次意识循环"""
    await consciousness.run_once()
    return {"ok": True, "status": consciousness.get_status()}


@extra_api.post("/proactive/check/trigger")
async def proactive_check_trigger():
    """手动触发一次核心主动消息检查"""
    from consciousness.proactive import run_proactive_check
    from dataclasses import asdict
    import logging
    
    logger = logging.getLogger(__name__)
    agent_id = getattr(settings, "current_agent_id", "default")
    try:
        result = await run_proactive_check(agent_id)
        return {"ok": True, "result": asdict(result)}
    except Exception as e:
        logger.exception("Proactive check failed manually")
        return {"ok": False, "error": str(e)}


@extra_api.get("/memory-async/status")
async def memory_async_status():
    return memory_async.get_status()


# ── Amber (记忆库) Stats & Labels ──

class AmberLabelCreate(BaseModel):
    name: str
    color: str = "#a78ec7"


class AmberLabelUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None


class AmberLabelMemoryAdd(BaseModel):
    memory_id: str


@extra_api.get("/amber/stats")
async def amber_stats():
    """综合统计：agent 链接 + 记忆总量分类 + 标签分组。"""
    return await db.get_amber_stats()


@extra_api.get("/amber/labels")
async def amber_list_labels():
    labels = await db.list_memory_labels()
    return {"labels": labels}


@extra_api.post("/amber/labels")
async def amber_create_label(payload: AmberLabelCreate):
    if not payload.name.strip():
        raise HTTPException(status_code=400, detail="name required")
    label = await db.create_memory_label(payload.name, payload.color)
    return label


@extra_api.patch("/amber/labels/{label_id}")
async def amber_update_label(label_id: str, payload: AmberLabelUpdate):
    await db.update_memory_label(label_id, name=payload.name, color=payload.color)
    return {"ok": True}


@extra_api.delete("/amber/labels/{label_id}")
async def amber_delete_label(label_id: str):
    await db.delete_memory_label(label_id)
    return {"ok": True}


@extra_api.get("/amber/labels/{label_id}/memories")
async def amber_label_memories(label_id: str, limit: int = 60):
    memories = await db.get_label_memories(label_id, limit)
    return {"memories": memories}


@extra_api.post("/amber/labels/{label_id}/memories")
async def amber_add_memory_to_label(label_id: str, payload: AmberLabelMemoryAdd):
    await db.assign_memory_to_label(label_id, payload.memory_id)
    return {"ok": True}


@extra_api.delete("/amber/labels/{label_id}/memories/{memory_id}")
async def amber_remove_memory_from_label(label_id: str, memory_id: str):
    await db.remove_memory_from_label(label_id, memory_id)
    return {"ok": True}


# ── Perle Media API ──

@extra_api.post("/perle/upload")
async def perle_upload_file(bucket: str = Form(...), file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="no file")
    ext = file.filename.split(".")[-1] if "." in file.filename else "bin"
    file_path = f"{db._new_id()}.{ext}"
    bytes_data = await file.read()
    
    url = await db._supabase_upload_storage(bucket, file_path, bytes_data, file.content_type or "application/octet-stream")
    return {"url": url}

class PerlePhoto(BaseModel):
    cat: str = "all"
    tint: str = "#e2d5d8"
    url: str
    label: str = ""

@extra_api.post("/perle/photos")
async def add_perle_photo(photo: PerlePhoto):
    payload = {
        "id": db._new_id(),
        "cat": photo.cat,
        "tint": photo.tint,
        "url": photo.url,
        "label": photo.label,
        "created_at": db._now()
    }
    await db._supabase_insert("perle_photos", payload)
    return {"ok": True, "photo": payload}

@extra_api.get("/perle/photos")
async def get_perle_photos():
    rows = await db._supabase_select("perle_photos", order="created_at.desc", limit=500)
    return {"photos": rows}

class PerleTrack(BaseModel):
    title: str
    title_en: str = ""
    artist: str = "Unknown"
    album: str = "Unknown"
    duration: int = 0
    accent: str = "#C9A7BB"
    url: str

@extra_api.post("/perle/tracks")
async def add_perle_track(track: PerleTrack):
    payload = {
        "id": db._new_id(),
        "title": track.title,
        "title_en": track.title_en,
        "artist": track.artist,
        "album": track.album,
        "duration": track.duration,
        "accent": track.accent,
        "url": track.url,
        "created_at": db._now()
    }
    await db._supabase_insert("perle_tracks", payload)
    return {"ok": True, "track": payload}

@extra_api.get("/perle/tracks")
async def get_perle_tracks():
    rows = await db._supabase_select("perle_tracks", order="created_at.desc", limit=500)
    return {"tracks": rows}
