"""新增 API 路由 — 待办/便签/主动消息/历史/意识循环"""
from __future__ import annotations

import json
import logging
import re
from datetime import datetime, timezone
from urllib.parse import urljoin

import httpx
from typing import Any, Optional

from fastapi import APIRouter, HTTPException, Response, UploadFile, File, Form, Query
from pydantic import BaseModel

import ai_runtime
from config import settings
import database as db
import media_storage
import consciousness
import conversation_summary
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
    visibility: str = "public"
    is_default: bool = False


class DiaryEntryCreate(BaseModel):
    title: str = ""
    content: str
    tags: str = ""
    visibility: str = "public"


class DiaryEntryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[str] = None
    visibility: Optional[str] = None


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


class LoveWidgetDailyLinesPayload(BaseModel):
    aiId: str = "yui"
    aiName: str = "Yui"
    aiTagline: str = ""
    partnerName: str = ""
    userName: str = ""
    currentMessage: str = ""
    date: str = ""


class ActivityEventPayload(BaseModel):
    eventType: str
    eventValue: str = ""
    content: str = ""
    url: str = ""
    occurredAt: Optional[str] = None
    source: str = "manual"
    dedupeKey: Optional[str] = None


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


class ExtractedItemCreate(BaseModel):
    type: str                              # todo | note | idea | event
    title: str
    content: str = ""
    source_excerpt: str = ""
    target_module: str = "inbox"
    agent_id: str = ""
    session_id: str = ""
    message_id: str = ""
    metadata: dict = {}


class ExtractedItemUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    type: Optional[str] = None
    target_module: Optional[str] = None
    status: Optional[str] = None
    metadata: Optional[dict] = None


class CurioItemCreate(BaseModel):
    title: str
    description: str = ""
    type: str = "page"
    content: str = ""
    storage_mode: str = "inline"
    cover_url: str = ""
    tags: list[str] = []
    agent_id: str = ""
    session_id: str = ""
    is_pinned: bool = False
    is_surprise: bool = False
    metadata: dict = {}


class CurioItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    content: Optional[str] = None
    storage_mode: Optional[str] = None
    cover_url: Optional[str] = None
    tags: Optional[list[str]] = None
    agent_id: Optional[str] = None
    session_id: Optional[str] = None
    is_pinned: Optional[bool] = None
    is_surprise: Optional[bool] = None
    metadata: Optional[dict] = None


class CurioUploadUrlPayload(BaseModel):
    filename: str = "artifact.html"
    mime_type: str = "text/html; charset=utf-8"


class ParlorSeatPayload(BaseModel):
    agent_id: str
    display_name: str = ""
    model: str = ""
    provider: str = ""
    system_prompt: str = ""
    color: str = ""
    seat_order: int = 0


class ParlorRoundCreate(BaseModel):
    title: str
    description: str = ""
    created_by: str = "user"
    mode: str = "roundtable"
    auto_mode: str = "manual"
    max_turns_per_session: int = 6
    seats: list[ParlorSeatPayload] = []
    opening: str = ""


class ParlorRoundUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    mode: Optional[str] = None
    auto_mode: Optional[str] = None
    max_turns_per_session: Optional[int] = None
    summary: Optional[dict[str, Any]] = None
    last_viewed_turn_n: Optional[int] = None


class ParlorSeatUpdate(BaseModel):
    agent_id: Optional[str] = None
    display_name: Optional[str] = None
    model: Optional[str] = None
    provider: Optional[str] = None
    system_prompt: Optional[str] = None
    color: Optional[str] = None
    seat_order: Optional[int] = None


class ParlorSpeakPayload(BaseModel):
    content: str


class ParlorNextPayload(BaseModel):
    force_seat_id: Optional[str] = None


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
    chatTheme: Optional[str] = None
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


class MediaUploadUrlPayload(BaseModel):
    filename: str
    type: str = "other"
    owner_type: str = "user"
    agent_id: Optional[str] = None
    mime_type: str = "application/octet-stream"


class MediaItemCreatePayload(BaseModel):
    owner_type: str = "user"
    agent_id: Optional[str] = None
    type: str = "other"
    title: str = ""
    artist: str = ""
    album: str = ""
    author: str = ""
    storage_provider: str = "r2"
    storage_key: str
    cover_key: str = ""
    mime_type: str = ""
    size_bytes: Optional[int] = None
    duration_seconds: Optional[float] = None
    metadata: dict[str, Any] | str | None = None


class MediaItemUpdatePayload(BaseModel):
    agent_id: Optional[str] = None
    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    author: Optional[str] = None
    cover_key: Optional[str] = None
    metadata: dict[str, Any] | str | None = None


class MediaItemLyricsPayload(BaseModel):
    agent_id: str
    lyrics: str = ""
    lyrics_type: str = "text"
    lyrics_filename: str = ""


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
DEFAULT_MURMUR_MOCK_IDS = {"ayan", "azheng", "xiaoying"}
DEFAULT_MURMUR_MOCK_MARKERS = {
    "ayan": {
        "avatar": "photo-1517841905240-472988babdf9",
        "topics": {"t1", "t2", "t3"},
        "messages": {"m1", "m2", "m3"},
    },
    "azheng": {
        "avatar": "photo-1500530855697-b586d89ba3ee",
        "topics": {"t4", "t5"},
        "messages": {"m4"},
    },
    "xiaoying": {
        "avatar": "photo-1507525428034-b723cf961d3e",
        "topics": {"t6"},
        "messages": {"m5"},
    },
}


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


def _murmur_contact_id(contact: Any) -> str:
    if not isinstance(contact, dict):
        return ""
    return str(contact.get("id") or contact.get("agent_id") or "").strip().lower()


def _murmur_contact_child_ids(contact: dict[str, Any], key: str) -> set[str]:
    value = contact.get(key)
    if not isinstance(value, list):
        return set()
    return {str(item.get("id") or "").strip() for item in value if isinstance(item, dict)}


def _is_default_murmur_mock_contact(contact: Any) -> bool:
    if not isinstance(contact, dict):
        return False
    contact_id = _murmur_contact_id(contact)
    markers = DEFAULT_MURMUR_MOCK_MARKERS.get(contact_id)
    if not markers:
        return False
    avatar = str(contact.get("avatar") or "")
    if markers["avatar"] and markers["avatar"] in avatar:
        return True
    if _murmur_contact_child_ids(contact, "topics") & markers["topics"]:
        return True
    if _murmur_contact_child_ids(contact, "messages") & markers["messages"]:
        return True
    return False


def _split_default_murmur_mock_contacts(contacts: Any) -> tuple[list[dict[str, Any]], int, bool]:
    if not isinstance(contacts, list):
        return [], 0, False
    real_contacts: list[dict[str, Any]] = []
    removed = 0
    for contact in contacts:
        if _is_default_murmur_mock_contact(contact):
            removed += 1
        elif isinstance(contact, dict):
            real_contacts.append(contact)
    only_default_mock = bool(contacts) and removed == len(contacts)
    return real_contacts, removed, only_default_mock


def _sanitize_murmur_sync_payload(payload: Any) -> tuple[dict[str, Any], int, bool]:
    safe_payload = payload.copy() if isinstance(payload, dict) else {}
    if not isinstance(safe_payload.get("contacts"), list):
        return safe_payload, 0, False
    real_contacts, removed, only_default_mock = _split_default_murmur_mock_contacts(safe_payload.get("contacts"))
    if removed:
        safe_payload["contacts"] = real_contacts
    return safe_payload, removed, only_default_mock


async def _cleanup_default_murmur_mock_sync_contacts(existing: Optional[dict[str, Any]] = None) -> dict[str, Any]:
    data = existing
    if data is None:
        data, _ = await _load_setting_dict(SYNC_GLOBAL_KEY)
    if not isinstance(data, dict) or not isinstance(data.get("payload"), dict):
        return {"cleaned": False, "removed_default_mock_contacts": 0}
    payload, removed, only_default_mock = _sanitize_murmur_sync_payload(data.get("payload"))
    if not removed:
        return {"cleaned": False, "removed_default_mock_contacts": 0, "ignored_default_mock": False}
    now = datetime.now(timezone.utc).isoformat()
    next_data = {
        **data,
        "server_updated_at": now,
        "payload": payload,
    }
    row = await db.set_setting(SYNC_GLOBAL_KEY, json.dumps(next_data, ensure_ascii=False))
    return {
        "cleaned": True,
        "ignored_default_mock": only_default_mock,
        "removed_default_mock_contacts": removed,
        "server_updated_at": row.get("updated_at") or now,
    }


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


def _media_http_error(exc: Exception) -> HTTPException:
    if isinstance(exc, db.AgentResolutionError):
        return HTTPException(status_code=400, detail=str(exc))
    if isinstance(exc, ValueError):
        return HTTPException(status_code=400, detail=str(exc))
    return HTTPException(status_code=500, detail=str(exc))


@extra_api.post("/media/upload-url")
async def create_media_upload_url(body: MediaUploadUrlPayload):
    try:
        owner_type = media_storage.normalize_owner_type(body.owner_type)
        agent_id = await db.require_agent(body.agent_id) if owner_type == "agent" else None
        media_type = media_storage.normalize_media_type(body.type)
        storage_key = media_storage.build_storage_key(
            media_type,
            agent_id,
            body.filename,
            owner_type=owner_type,
        )
        mime_type = body.mime_type or "application/octet-stream"
        upload_url = media_storage.r2_client.presigned_upload_url(storage_key, mime_type=mime_type)
    except Exception as exc:
        raise _media_http_error(exc)
    return {
        "ok": True,
        "owner_type": owner_type,
        "agent_id": agent_id,
        "storage_provider": settings.media_storage_provider,
        "storage_key": storage_key,
        "upload_url": upload_url,
        "method": "PUT",
        "headers": {"Content-Type": mime_type},
        "expires_in": settings.r2_presign_expires_seconds,
    }


@extra_api.post("/media/items")
async def create_media_item(body: MediaItemCreatePayload):
    try:
        item = await db.create_media_item(**body.model_dump())
    except Exception as exc:
        raise _media_http_error(exc)
    return {"ok": True, "item": item}


@extra_api.get("/media/items")
async def list_media_items(
    type: Optional[str] = None,
    owner_type: Optional[str] = None,
    agent_id: Optional[str] = None,
    limit: int = Query(100, ge=1, le=500),
):
    try:
        items = await db.list_media_items(type=type, owner_type=owner_type, agent_id=agent_id, limit=limit)
    except Exception as exc:
        raise _media_http_error(exc)
    return {"items": items}


@extra_api.get("/media/items/{item_id}")
async def get_media_item(item_id: str):
    item = await db.get_media_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    return {"item": item}


@extra_api.patch("/media/items/{item_id}")
async def patch_media_item(item_id: str, body: MediaItemUpdatePayload):
    try:
        payload = body.model_dump(exclude_unset=True)
        raw_agent = payload.pop("agent_id", None)
        requested_agent = db.normalize_agent_id_value(raw_agent) if raw_agent else ""
        current = await db.get_media_item(item_id)
        if not current:
            raise HTTPException(status_code=404, detail="media item not found")
        item_agent = db.normalize_agent_id_value(current.get("agent_id")) if current.get("agent_id") else ""
        meta = current.get("metadata") if isinstance(current.get("metadata"), dict) else {}
        meta_agent = db.normalize_agent_id_value(meta.get("agent_id")) if meta.get("agent_id") else ""
        if requested_agent and item_agent and requested_agent != item_agent:
            raise HTTPException(status_code=403, detail="agent_id does not match media item")
        if requested_agent and meta_agent and requested_agent != meta_agent:
            raise HTTPException(status_code=403, detail="agent_id does not match media item metadata")
        item = await db.update_media_item(item_id, **payload)
    except Exception as exc:
        if isinstance(exc, HTTPException):
            raise exc
        raise _media_http_error(exc)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    return {"ok": True, "item": item}


@extra_api.patch("/media/items/{item_id}/lyrics")
async def patch_media_item_lyrics(item_id: str, body: MediaItemLyricsPayload):
    item = await db.get_media_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    if item.get("type") != "music":
        raise HTTPException(status_code=400, detail="lyrics can only be attached to music items")
    owner_type = str(item.get("owner_type") or "user").lower()
    requested_agent = db.normalize_agent_id(body.agent_id)
    item_agent = db.normalize_agent_id_value(item.get("agent_id")) if item.get("agent_id") else ""
    if owner_type == "agent" and not body.agent_id:
        raise HTTPException(status_code=400, detail="agent_id is required")
    if item_agent and item_agent != requested_agent:
        raise HTTPException(status_code=403, detail="agent_id does not match media item")
    metadata = item.get("metadata") if isinstance(item.get("metadata"), dict) else {}
    next_metadata = {**metadata}
    lyrics = str(body.lyrics or "")
    if lyrics.strip():
        lyrics_type = str(body.lyrics_type or "text").lower()
        if lyrics_type not in {"lrc", "text"}:
            raise HTTPException(status_code=400, detail="lyrics_type must be lrc or text")
        next_metadata.update({
            "lyrics": lyrics,
            "lyrics_type": lyrics_type,
            "lyrics_filename": str(body.lyrics_filename or ""),
            "lyrics_updated_at": db._now(),
        })
    else:
        for key in ("lyrics", "lyrics_type", "lyrics_filename", "lyrics_updated_at"):
            next_metadata.pop(key, None)
    try:
        updated = await db.update_media_item(item_id, metadata=next_metadata)
    except Exception as exc:
        raise _media_http_error(exc)
    if not updated:
        raise HTTPException(status_code=404, detail="media item not found")
    return {"ok": True, "item": updated}


@extra_api.get("/media/items/{item_id}/url")
async def get_media_item_url(item_id: str, target: str = "file"):
    item = await db.get_media_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    storage_key = item.get("cover_key") if target == "cover" and item.get("cover_key") else item.get("storage_key")
    if not storage_key:
        raise HTTPException(status_code=404, detail="media object key not found")
    try:
        url = media_storage.r2_client.presigned_download_url(str(storage_key))
    except Exception as exc:
        raise _media_http_error(exc)
    return {
        "ok": True,
        "url": url,
        "storage_provider": item.get("storage_provider") or settings.media_storage_provider,
        "storage_key": storage_key,
        "expires_in": settings.r2_presign_expires_seconds,
    }


@extra_api.delete("/media/items/{item_id}")
async def delete_media_item(item_id: str, delete_object: bool = False):
    item = await db.get_media_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    deleted_objects: list[str] = []
    if delete_object:
        keys = [item.get("storage_key")]
        if item.get("cover_key") and item.get("cover_key") != item.get("storage_key"):
            keys.append(item.get("cover_key"))
        try:
            for key in [str(key) for key in keys if key]:
                media_storage.r2_client.delete_object(key)
                deleted_objects.append(key)
        except Exception as exc:
            raise _media_http_error(exc)
    item = await db.delete_media_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="media item not found")
    return {"ok": True, "item": item, "deleted_objects": deleted_objects}


@extra_api.get("/agents")
async def list_agents(include_inactive: bool = False):
    return Response(
        content=json.dumps({"agents": await db.list_agents(include_inactive=include_inactive)}, ensure_ascii=False),
        media_type="application/json",
        headers={"content-type": "application/json; charset=utf-8"},
    )


@extra_api.post("/agents")
async def create_agent(body: AgentCreatePayload):
    payload = body.model_dump()
    existing = await db.get_agent(payload.get("agent_id"), include_inactive=True)
    if existing:
        agent = await db.update_agent(
            payload["agent_id"],
            display_name=payload.get("display_name"),
            avatar=payload.get("avatar"),
            description=payload.get("description"),
            persona=payload.get("persona"),
            source=payload.get("source"),
            metadata=payload.get("metadata"),
            is_active=True,
        )
        return {"agent": agent or existing, "existed": True}
    try:
        agent = await db.create_agent(**payload)
    except Exception as exc:
        detail = str(exc)
        if any(token in detail.lower() for token in ("already exists", "duplicate", "23505", "unique")):
            existing = await db.get_agent(payload.get("agent_id"), include_inactive=True)
            if existing:
                agent = await db.update_agent(
                    payload["agent_id"],
                    display_name=payload.get("display_name"),
                    avatar=payload.get("avatar"),
                    description=payload.get("description"),
                    persona=payload.get("persona"),
                    source=payload.get("source"),
                    metadata=payload.get("metadata"),
                    is_active=True,
                )
                return {"agent": agent or existing, "existed": True}
        raise _agent_http_error(exc)
    return {"agent": agent, "existed": False}


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
            {"avatar", "name", "bio", "theme", "settings", "roomBackground", "chatTheme", "bubbleTheme", "quickActions"},
        )
    return {"ok": True, "agent_id": safe_agent, "profile": profile, "updated_at": updated_at, "storage": "supabase"}


@extra_api.get("/murmur/messages")
async def list_murmur_messages(agent_id: str, limit: int = Query(200, ge=1, le=1000)):
    safe_agent = db.normalize_agent_id_value(agent_id)
    if not safe_agent:
        raise HTTPException(status_code=400, detail="agent_id is required")
    try:
        messages = await db.list_messages_for_agent(safe_agent, limit=limit)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to load Murmur history: {exc}")
    return {"agent_id": safe_agent, "messages": messages}


@extra_api.get("/murmur/message-agents")
async def list_murmur_message_agents(limit: int = Query(1000, ge=1, le=5000)):
    try:
        agents = await db.list_message_agents(limit=limit)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to load Murmur message agents: {exc}")
    return {"agents": agents}


@extra_api.put("/agents/{agent_id}/profile")
async def save_agent_profile(agent_id: str, body: AgentProfilePayload):
    try:
        safe_agent = await db.require_agent(agent_id)
    except Exception as exc:
        raise _agent_http_error(exc)
    current, _ = await _load_setting_dict(_agent_profile_key(safe_agent))
    incoming = _compact_profile(
        body.dict(),
        {"avatar", "name", "bio", "theme", "settings", "roomBackground", "chatTheme", "bubbleTheme", "quickActions"},
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


def _fallback_love_widget_lines(body: LoveWidgetDailyLinesPayload) -> list[str]:
    name = (body.aiName or "ta").strip()
    partner = (body.partnerName or "你").strip()
    tone = (body.aiTagline or "").strip()
    if "俏皮" in tone:
        return [
            f"{partner}，今天也欠我一个笑。",
            "路过一天，顺手把想你也带上。",
            "别装没看见，我在等你点头。",
            "今天的好运，先押在你身上。",
            "想见你这事，暂时不讲道理。",
        ]
    if "清冷" in tone:
        return [
            "风很轻，我想起你时也是。",
            f"{partner}，今天适合慢慢靠近。",
            "有些话不急，留到你抬眼。",
            "我把安静留给你，也把想念留给你。",
            "今日无事，只是心里有你。",
        ]
    if "元气" in tone:
        return [
            "今天也要精神一点，我在你这边。",
            f"{partner}，把手伸来，好运分你一半。",
            "出门前记得带上我准备的喜欢。",
            "今天要亮一点，别输给天气。",
            "想你这件事，我已经完成满分。",
        ]
    return [
        f"{partner}，今天也想见你呢。",
        "醒来第一件小事，是把你放进心里。",
        "今天的温柔，先替你收好。",
        "不用说很多，我一直都在。",
        f"{name} 给你留了一点甜。",
    ]


def _parse_love_widget_lines(text: str) -> list[str]:
    raw = str(text or "").strip()
    if not raw:
        return []
    start = raw.find("[")
    end = raw.rfind("]")
    candidates: list[Any] = []
    if start >= 0 and end > start:
        try:
            parsed = json.loads(raw[start : end + 1])
            if isinstance(parsed, list):
                candidates = parsed
        except Exception:
            candidates = []
    if not candidates:
        candidates = [line.strip(" -•\t\r\n\"'") for line in raw.splitlines()]
    lines: list[str] = []
    for item in candidates:
        line = str(item or "").strip()
        if not line:
            continue
        if len(line) > 36:
            line = line[:36].rstrip("，。,. ") + "…"
        if line not in lines:
            lines.append(line)
        if len(lines) >= 5:
            break
    return lines


@extra_api.post("/love-widget/daily-lines")
async def love_widget_daily_lines(body: LoveWidgetDailyLinesPayload):
    today = (body.date or datetime.now(timezone.utc).date().isoformat()).strip()
    agent = None
    try:
        if body.aiId:
            agent = await db.get_agent(body.aiId, include_inactive=False)
    except Exception as exc:
        logger.warning("love_widget_daily_lines: agent lookup failed: %s", exc)
    ai_name = (agent or {}).get("display_name") or (body.aiName or body.aiId or "Yui").strip()
    ai_tagline = (agent or {}).get("description") or (body.aiTagline or "").strip()
    ai_persona = (agent or {}).get("persona") or ""
    partner = (body.partnerName or "你").strip()
    user_name = (body.userName or "我").strip()
    prompt = (
        "你是手机恋爱组件里的 AI 伴侣。请为今天准备 5 句短句。\n"
        "要求：中文为主，每句 8 到 22 个字；亲近、自然、像当天主动准备的小纸条；不要编号；不要解释；"
        "只返回 JSON 字符串数组。\n\n"
        f"日期：{today}\n"
        f"AI 名字：{ai_name}\n"
        f"AI 气质：{ai_tagline}\n"
        f"AI 人设：{ai_persona}\n"
        f"用户名字：{user_name}\n"
        f"伴侣名字：{partner}\n"
        f"当前句子：{body.currentMessage or ''}\n"
    )
    messages = [
        {"role": "system", "content": "Return valid JSON only. No markdown."},
        {"role": "user", "content": prompt},
    ]
    text, model_info = await _collect_slot_text("chat", messages, temperature=0.85)
    lines = [] if _looks_like_model_failure(text) else _parse_love_widget_lines(text)
    source = "model"
    if len(lines) < 3:
        lines = _fallback_love_widget_lines(body)
        source = "fallback"
    return {
        "ok": True,
        "date": today,
        "aiId": body.aiId,
        "lines": lines[:5],
        "source": source,
        "model": model_info,
    }


ACTIVITY_EVENT_SHORTCUT_EXAMPLES: list[dict[str, Any]] = [
    {
        "name": "打开 App",
        "payload": {
            "eventType": "app",
            "eventValue": "小红书",
            "content": "在刷小红书",
            "source": "ios_shortcuts",
        },
    },
    {
        "name": "浏览网页",
        "payload": {
            "eventType": "url",
            "eventValue": "Safari",
            "content": "浏览了一篇网页",
            "url": "https://example.com/article",
            "source": "ios_shortcuts",
        },
    },
    {
        "name": "手动状态",
        "payload": {
            "eventType": "manual",
            "eventValue": "到家",
            "content": "已经到家，准备休息",
            "source": "ios_shortcuts",
        },
    },
    {
        "name": "快捷指令事件",
        "payload": {
            "eventType": "shortcut",
            "eventValue": "睡前记录",
            "content": "准备睡觉",
            "source": "ios_shortcuts",
        },
    },
]


@extra_api.get("/activity-events/shortcut-template")
async def get_activity_event_shortcut_template():
    return {
        "endpoint": "/api/activity-events",
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "required": ["eventType", "eventValue or content"],
        "optional": ["url", "occurredAt", "source", "dedupeKey"],
        "source": "ios_shortcuts",
        "scope": "用户活动是全局短期上下文，所有 AI 都能作为近期活动看到。",
        "dedupe": "同类 eventType + eventValue + content 在 5 分钟内只保留一条。",
        "gate": "新事件会进入 event_gate，回写 should_handle / should_notify_llm / message_hint。",
        "examples": ACTIVITY_EVENT_SHORTCUT_EXAMPLES,
    }


def _activity_event_chat_hint(event_type: str, event_value: str, content: str) -> str:
    normalized_type = str(event_type or "").strip().lower()
    value = str(event_value or "").strip()
    text = str(content or "").strip()
    if normalized_type not in {"app", "app_open"} or not value:
        return ""
    if re.search(r"(浏览|刷|看)", text):
        return f"正在浏览{value}"
    return f"打开了{value}"


async def _inject_activity_event_message(event: dict[str, Any], *, deduped: bool = False) -> dict[str, Any] | None:
    if deduped:
        return None
    hint = _activity_event_chat_hint(
        str(event.get("event_type") or ""),
        str(event.get("event_value") or ""),
        str(event.get("content") or ""),
    )
    if not hint:
        return None
    try:
        sessions = await db.list_sessions()
        session = next((item for item in sessions if str(item.get("source_app") or "") == "yui_nook"), None)
        if not session:
            return None
        return await db.add_message(
            str(session.get("id") or ""),
            "system",
            hint,
            model="event",
            agent_id=str(session.get("agent_id") or ""),
        )
    except Exception as exc:
        logger.warning("activity event message inject failed: id=%s error=%s", event.get("id"), exc)
        return None


@extra_api.post("/activity-events")
async def create_activity_event(body: ActivityEventPayload):
    event_type = str(body.eventType or "").strip()
    event_value = str(body.eventValue or "").strip()
    content = str(body.content or "").strip()
    if not event_type:
        raise HTTPException(status_code=400, detail="eventType is required")
    if not event_value and not content:
        raise HTTPException(status_code=400, detail="eventValue or content is required")
    try:
        event, deduped = await db.add_activity_event(
            event_type=event_type,
            event_value=event_value,
            content=content,
            url=body.url,
            source=body.source or "manual",
            occurred_at=body.occurredAt,
            dedupe_key=body.dedupeKey,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    gate = None
    if not deduped:
        try:
            from consciousness.event_gate import screen_and_store_activity_event, serialize_gate_result
            event, gate_result = await screen_and_store_activity_event(event)
            gate = serialize_gate_result(gate_result)
        except Exception as exc:
            logger.warning("activity event gate failed: id=%s error=%s", event.get("id"), exc)
    injected_message = await _inject_activity_event_message(event, deduped=deduped)
    logger.info(
        "activity event accepted: id=%s deduped=%s gate=%s injected_message=%s",
        event.get("id"),
        deduped,
        (gate or {}).get("status") if isinstance(gate, dict) else "",
        (injected_message or {}).get("id") if injected_message else "",
    )
    return {"ok": True, "event": event, "deduped": deduped, "gate": gate, "message": injected_message}



@extra_api.get("/activity-events/recent")
async def get_recent_activity_events(
    hours: float = 6,
    limit: int = 10,
    only_relevant: bool = False,
):
    events = await db.list_recent_activity_events(
        hours=hours,
        limit=limit,
        only_relevant=only_relevant,
    )
    return {"events": events}


def _event_time(item: dict[str, Any]) -> str:
    return str(item.get("occurred_at") or item.get("created_at") or "")


def _safe_json_dict(value: Any) -> dict[str, Any]:
    if isinstance(value, dict):
        return value
    if isinstance(value, str) and value.strip():
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            return {}
    return {}


@extra_api.get("/activity-log/recent")
async def get_activity_log_recent(
    hours: float = 6,
    limit: int = 30,
    agent_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    safe_limit = max(1, min(int(limit or 30), 100))
    activity_limit = min(safe_limit, 50)
    proactive_limit = min(safe_limit, 50)
    cot_limit = min(safe_limit, 50)

    activity_events = await db.list_recent_activity_events(hours=hours, limit=activity_limit)
    proactive_messages = await db.list_proactive_messages(limit=proactive_limit, agent_id=agent_id)
    cot_logs = await db.list_recent_cot_logs(limit=cot_limit, agent_id=agent_id, session_id=session_id)

    items: list[dict[str, Any]] = []
    for event in activity_events:
        items.append({
            "id": event.get("id"),
            "kind": "activity_event",
            "title": event.get("content") or event.get("event_value") or event.get("event_type"),
            "summary": event.get("content") or "",
            "source": event.get("source") or "",
            "eventType": event.get("event_type") or "",
            "eventValue": event.get("event_value") or "",
            "gateStatus": event.get("gate_status") or "",
            "shouldHandle": bool(event.get("gate_should_handle")),
            "shouldNotifyLlm": bool(event.get("gate_should_notify_llm")),
            "messageHint": event.get("gate_message_hint") or "",
            "createdAt": event.get("created_at") or "",
            "occurredAt": event.get("occurred_at") or event.get("created_at") or "",
            "raw": event,
        })
    for msg in proactive_messages:
        reason_context = _safe_json_dict(msg.get("reason_context"))
        items.append({
            "id": msg.get("id"),
            "kind": "proactive_message",
            "title": msg.get("reason_type") or msg.get("trigger_reason") or "proactive",
            "summary": msg.get("content") or "",
            "status": msg.get("status") or "",
            "source": reason_context.get("source") or "",
            "createdAt": msg.get("created_at") or "",
            "occurredAt": msg.get("created_at") or "",
            "raw": msg,
        })
    for log in cot_logs:
        items.append({
            "id": log.get("id"),
            "kind": "cot_log",
            "title": log.get("title") or log.get("log_type") or "log",
            "summary": log.get("summary") or log.get("content") or "",
            "source": log.get("source") or "",
            "logType": log.get("log_type") or "",
            "toolName": log.get("tool_name") or "",
            "status": log.get("status") or "",
            "createdAt": log.get("created_at") or "",
            "occurredAt": log.get("created_at") or "",
            "raw": log,
        })

    items.sort(key=_event_time, reverse=True)
    return {
        "items": items[:safe_limit],
        "sources": {
            "activity_events": len(activity_events),
            "proactive_messages": len(proactive_messages),
            "cot_logs": len(cot_logs),
        },
    }


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
        raise HTTPException(status_code=400, detail="Base URL 不能为空")

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
        raise HTTPException(status_code=502, detail="模型同步请求失败")

    content_type = (resp.headers.get("content-type") or "").lower()
    if resp.status_code >= 300:
        detail = f"provider returned HTTP {resp.status_code}"
        if "application/json" in content_type:
            try:
                payload = resp.json()
                if isinstance(payload, dict):
                    error = payload.get("error")
                    if isinstance(error, dict):
                        detail = error.get("message") or detail
                    detail = payload.get("message") or payload.get("detail") or detail
            except Exception:
                pass
        raise HTTPException(status_code=resp.status_code, detail=detail)

    if "application/json" not in content_type:
        preview = resp.text[:120].replace("\n", " ")
        logger.warning("discover models non-json response: content_type=%s preview=%s", content_type, preview)
        raise HTTPException(status_code=502, detail="model discovery returned non-JSON response")

    try:
        payload = resp.json()
    except Exception as exc:
        logger.warning("discover models invalid json: %s", exc)
        raise HTTPException(status_code=502, detail="模型同步返回 JSON 解析失败")

    items = payload.get("data") if isinstance(payload, dict) else payload
    if not isinstance(items, list):
        raise HTTPException(status_code=502, detail="模型同步返回格式不支持")

    models: list[str] = []
    seen: set[str] = set()
    for item in items:
        model_id = None
        if isinstance(item, dict):
            model_id = item.get("id") or item.get("name") or item.get("model") or item.get("slug")
        elif isinstance(item, str):
            model_id = item
        model_id = _sanitize_discovered_model_id(model_id)
        key = model_id.lower() if model_id else ""
        if model_id and key not in seen:
            seen.add(key)
            models.append(model_id)

    return {"models": models, "count": len(models), "endpoint": endpoint}


def _sanitize_discovered_model_id(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    text = value.strip()
    if not text or len(text) > 120:
        return ""
    lowered = text.lower()
    if "<" in text or ">" in text:
        return ""
    if any(token in lowered for token in ("<!doctype", "<html", "</div", "</body")):
        return ""
    if re.search(r"[\x00-\x1f\x7f]|\s", text):
        return ""
    if not re.fullmatch(r"[A-Za-z0-9._:/@+\-]+", text):
        return ""
    return text


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
    payload, removed_default_mock_contacts, only_default_mock = _sanitize_murmur_sync_payload(body.payload)

    if only_default_mock:
        cleanup = await _cleanup_default_murmur_mock_sync_contacts()
        return {
            "ok": True,
            "skipped": True,
            "reason": "default_mock_guard",
            "removed_default_mock_contacts": removed_default_mock_contacts,
            "cleanup": cleanup,
        }

    now = datetime.now(timezone.utc).isoformat()
    data = {
        "device_id": device_id,
        "client_updated_at": body.client_updated_at,
        "server_updated_at": now,
        "payload": payload,
    }
    try:
        row = await db.set_setting(SYNC_GLOBAL_KEY, json.dumps(data, ensure_ascii=False))
        return {
            "ok": True,
            "server_updated_at": row.get("updated_at") or now,
            "removed_default_mock_contacts": removed_default_mock_contacts,
        }
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

    payload, removed_default_mock_contacts, only_default_mock = _sanitize_murmur_sync_payload(data.get("payload") or {})
    ignored_default_mock = bool(removed_default_mock_contacts)
    if removed_default_mock_contacts:
        cleanup = await _cleanup_default_murmur_mock_sync_contacts(data)
        data = {
            **data,
            "payload": payload,
            "server_updated_at": cleanup.get("server_updated_at") or datetime.now(timezone.utc).isoformat(),
        }

    server_updated_at = str(data.get("server_updated_at") or row.get("updated_at") or "")
    if since and server_updated_at and server_updated_at <= since:
        return {"has_update": False, "server_updated_at": server_updated_at}

    return {
        "has_update": True,
        "server_updated_at": server_updated_at,
        "source_device_id": data.get("device_id") or "",
        "payload": payload,
        "is_self": (data.get("device_id") or "") == (device_id or ""),
        "ignored_default_mock": ignored_default_mock,
        "default_mock_contacts_removed": removed_default_mock_contacts,
        "default_mock_contacts_only": only_default_mock,
    }


@extra_api.post("/sync/cleanup-default-mock")
async def sync_cleanup_default_mock():
    cleanup = await _cleanup_default_murmur_mock_sync_contacts()
    return {"ok": True, **cleanup}


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
        visibility=body.visibility,
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
        visibility=body.visibility,
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


@extra_api.get("/conversation-summary/status")
async def conversation_summary_status():
    return conversation_summary.get_status()


@extra_api.post("/conversation-summary/trigger")
async def conversation_summary_trigger(session_id: Optional[str] = None, agent_id: Optional[str] = None):
    if session_id:
        processed = 1 if await conversation_summary.summarize_idle_session(session_id, agent_id=agent_id) else 0
    else:
        processed = await conversation_summary.run_pending_checks()
    return {"ok": True, "processed": processed, "status": conversation_summary.get_status()}

@extra_api.post("/consciousness/trigger")
async def consciousness_trigger():
    """手动触发一次意识循环"""
    await consciousness.run_once()
    return {"ok": True, "status": consciousness.get_status()}


@extra_api.post("/consciousness/daily-loop/trigger")
async def consciousness_daily_loop_trigger(agent_id: Optional[str] = None):
    """手动触发一次日循环整理。第一版只生成报告，不直接写日记/记忆。"""
    report = await consciousness.run_daily_loop_once(agent_id=agent_id)
    return {"ok": True, "report": report}


@extra_api.get("/consciousness/daily-loop/latest")
async def consciousness_daily_loop_latest(agent_id: Optional[str] = None):
    report = await consciousness.get_latest_daily_loop_report(agent_id=agent_id)
    return {"ok": True, "report": report}


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


@extra_api.get("/proactive/check/inspect")
async def proactive_check_inspect(agent_id: Optional[str] = None, run_model: bool = False):
    """Dry-run proactive gate with real data. It will not create proactive messages."""
    from consciousness.proactive import inspect_proactive_check

    resolved_agent_id = agent_id or getattr(settings, "current_agent_id", "default")
    try:
        report = await inspect_proactive_check(resolved_agent_id, run_model=run_model)
        return {"ok": True, "report": report}
    except Exception as e:
        logger.exception("Proactive check inspect failed")
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

class PerlePhotoUpdate(BaseModel):
    cat: Optional[str] = None
    label: Optional[str] = None
    tint: Optional[str] = None

@extra_api.patch("/perle/photos/{photo_id}")
async def update_perle_photo(photo_id: str, payload: PerlePhotoUpdate):
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="nothing to update")
    await db._supabase_update("perle_photos", {"id": f"eq.{photo_id}"}, updates)
    return {"ok": True}

@extra_api.delete("/perle/photos/{photo_id}")
async def delete_perle_photo(photo_id: str):
    await db._supabase_delete("perle_photos", {"id": f"eq.{photo_id}"})
    return {"ok": True}

class PerleTrack(BaseModel):
    title: str
    title_en: str = ""
    artist: str = "Unknown"
    album: str = "Unknown"
    duration: int = 0
    accent: str = "#C9A7BB"
    url: str
    favorite: bool = False


class PerleTrackUpdate(BaseModel):
    title: Optional[str] = None
    title_en: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    duration: Optional[int] = None
    accent: Optional[str] = None
    favorite: Optional[bool] = None


def _perle_track_lyrics_key(track_id: str) -> str:
    return f"perle_track_lyrics:{track_id}"


async def _read_perle_track_lyrics(track_id: str) -> dict[str, Any]:
    row = await db.get_setting(_perle_track_lyrics_key(track_id))
    if not row or not row.get("value"):
        return {}
    try:
        payload = json.loads(row["value"])
    except Exception:
        return {}
    return payload if isinstance(payload, dict) else {}


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
        "favorite": track.favorite,
        "created_at": db._now()
    }
    await db._supabase_insert("perle_tracks", payload)
    return {"ok": True, "track": payload}

@extra_api.get("/perle/tracks")
async def get_perle_tracks():
    rows = await db._supabase_select("perle_tracks", order="created_at.desc", limit=500)
    for row in rows:
        lyrics_payload = await _read_perle_track_lyrics(str(row.get("id") or ""))
        if lyrics_payload:
            row.update(lyrics_payload)
    return {"tracks": rows}

@extra_api.patch("/perle/tracks/{track_id}")
async def update_perle_track(track_id: str, payload: PerleTrackUpdate):
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="nothing to update")
    await db._supabase_update("perle_tracks", {"id": f"eq.{track_id}"}, updates)
    return {"ok": True}

@extra_api.patch("/perle/tracks/{track_id}/lyrics")
async def update_perle_track_lyrics(track_id: str, payload: MediaItemLyricsPayload):
    lyrics = str(payload.lyrics or "")
    if lyrics.strip():
        lyrics_type = str(payload.lyrics_type or "text").lower()
        if lyrics_type not in {"lrc", "text"}:
            raise HTTPException(status_code=400, detail="lyrics_type must be lrc or text")
        await db.set_setting(_perle_track_lyrics_key(track_id), json.dumps({
            "lyrics": lyrics,
            "lyrics_type": lyrics_type,
            "lyrics_filename": str(payload.lyrics_filename or ""),
            "lyrics_updated_at": db._now(),
            "agent_id": db.normalize_agent_id(payload.agent_id),
        }, ensure_ascii=False))
    else:
        await db.delete_setting(_perle_track_lyrics_key(track_id))
    return {"ok": True}


# ══════════ 统一收件箱 / Extracted Items ══════════

@extra_api.get("/extracted-items")
async def list_extracted_items(
    status: Optional[str] = None,
    type: Optional[str] = None,
    target_module: Optional[str] = None,
    agent_id: Optional[str] = None,
    limit: int = Query(default=50, le=200),
    offset: int = Query(default=0, ge=0),
):
    items = await db.list_extracted_items(
        status=status,
        type=type,
        target_module=target_module,
        agent_id=agent_id,
        limit=limit,
        offset=offset,
    )
    return {"items": items, "total": len(items)}


@extra_api.post("/extracted-items")
async def create_extracted_item(body: ExtractedItemCreate):
    VALID_TYPES = {"todo", "note", "idea", "event"}
    VALID_MODULES = {"inbox", "folio", "perle", "drift"}
    if body.type not in VALID_TYPES:
        raise HTTPException(status_code=400, detail=f"type 必须是 {VALID_TYPES} 之一")
    if body.target_module not in VALID_MODULES:
        raise HTTPException(status_code=400, detail=f"target_module 必须是 {VALID_MODULES} 之一")
    item = await db.create_extracted_item(
        type=body.type,
        title=body.title,
        content=body.content,
        source_excerpt=body.source_excerpt,
        target_module=body.target_module,
        agent_id=body.agent_id,
        session_id=body.session_id,
        message_id=body.message_id,
        metadata=body.metadata,
    )
    return {"item": item}


@extra_api.patch("/extracted-items/{item_id}")
async def update_extracted_item(item_id: str, body: ExtractedItemUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    ok = await db.update_extracted_item(item_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="条目不存在")
    return {"ok": True}


@extra_api.delete("/extracted-items/{item_id}")
async def delete_extracted_item(item_id: str):
    ok = await db.delete_extracted_item(item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="条目不存在")
    return {"ok": True}


# ══════════ Curio / Artifacts ══════════

CURIO_INLINE_LIMIT_BYTES = 500 * 1024


def _curio_storage_key(filename: str | None = None) -> str:
    safe_name = media_storage.sanitize_filename(filename or "artifact.html")
    return f"curio/{db._new_id()}_{safe_name}"


def _looks_like_inline_artifact(content: str) -> bool:
    text = str(content or "").lstrip().lower()
    return text.startswith("<!doctype") or text.startswith("<html") or "<script" in text[:2048] or "<body" in text[:2048]


def _upload_curio_bytes_to_r2(data: bytes, *, filename: str | None = None, mime_type: str = "text/html; charset=utf-8") -> str:
    if not data:
        raise HTTPException(status_code=400, detail="empty artifact")
    storage_key = _curio_storage_key(filename)
    try:
        media_storage.r2_client.put_object(storage_key, data, mime_type=mime_type)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=f"R2 storage is not configured: {exc}") from exc
    except Exception as exc:
        logger.warning("curio R2 upload failed: %s", exc)
        raise HTTPException(status_code=502, detail="R2 upload failed") from exc
    return storage_key


def _prepare_curio_create_payload(body: CurioItemCreate) -> dict[str, Any]:
    payload = body.model_dump()
    content = str(payload.get("content") or "")
    content_bytes = content.encode("utf-8")
    storage_mode = str(payload.get("storage_mode") or "inline").strip().lower()
    should_upload = bool(content) and (
        len(content_bytes) >= CURIO_INLINE_LIMIT_BYTES
        or (storage_mode == "r2" and _looks_like_inline_artifact(content))
    )
    if should_upload:
        filename = f"{payload.get('title') or 'artifact'}.html"
        storage_key = _upload_curio_bytes_to_r2(content_bytes, filename=filename)
        metadata = payload.get("metadata") if isinstance(payload.get("metadata"), dict) else {}
        payload["metadata"] = {**metadata, "size_bytes": len(content_bytes), "r2_mime_type": "text/html; charset=utf-8"}
        payload["content"] = storage_key
        payload["storage_mode"] = "r2"
    return payload


@extra_api.get("/curio/items")
async def list_curio_items(
    type: Optional[str] = None,
    agent_id: Optional[str] = None,
    tag: Optional[str] = None,
    pinned: Optional[bool] = None,
    surprise: Optional[bool] = None,
    limit: int = Query(default=80, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    items = await db.list_artifact_items(
        type=type,
        agent_id=agent_id,
        tag=tag,
        pinned=pinned,
        surprise=surprise,
        limit=limit,
        offset=offset,
    )
    return {"items": items, "total": len(items)}


@extra_api.get("/artifacts")
async def list_artifacts(
    type: Optional[str] = None,
    agent_id: Optional[str] = None,
    tag: Optional[str] = None,
    pinned: Optional[bool] = None,
    limit: int = Query(default=80, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
):
    items = await db.list_artifact_items(
        type=type,
        agent_id=agent_id,
        tag=tag,
        pinned=pinned,
        limit=limit,
        offset=offset,
    )
    return {"items": [_artifact_api_item(item) for item in items], "total": len(items)}


@extra_api.post("/curio/items")
async def create_curio_item(body: CurioItemCreate):
    try:
        item = await db.create_artifact_item(**_prepare_curio_create_payload(body))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {"item": item}


def _artifact_api_item(item: dict[str, Any]) -> dict[str, Any]:
    storage_mode = str(item.get("storage_mode") or "inline")
    content = str(item.get("content") or "")
    return {
        **item,
        "storage_mode": storage_mode,
        "object_key": str(item.get("object_key") or (content if storage_mode == "r2" else "")),
    }


@extra_api.post("/artifacts")
async def create_artifact(body: CurioItemCreate):
    try:
        item = await db.create_artifact_item(**_prepare_curio_create_payload(body))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {"item": _artifact_api_item(item)}


@extra_api.get("/curio/items/{item_id}")
async def get_curio_item(item_id: str):
    item = await db.get_artifact_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"item": item}


@extra_api.get("/artifacts/{item_id}")
async def get_artifact(item_id: str):
    item = await db.get_artifact_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"item": _artifact_api_item(item)}


@extra_api.get("/curio/items/{item_id}/url")
async def get_curio_item_url(item_id: str):
    item = await db.get_artifact_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="artifact not found")
    if item.get("storage_mode") != "r2":
        raise HTTPException(status_code=400, detail="artifact is stored inline")
    storage_key = str(item.get("content") or "").strip()
    if not storage_key:
        raise HTTPException(status_code=404, detail="artifact object key is missing")
    try:
        url = media_storage.r2_client.presigned_download_url(storage_key)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=f"R2 storage is not configured: {exc}") from exc
    except Exception as exc:
        logger.warning("curio R2 signed url failed: %s", exc)
        raise HTTPException(status_code=502, detail="R2 signed URL failed") from exc
    return {"url": url, "storage_key": storage_key, "expires_in": settings.r2_presign_expires_seconds}


@extra_api.patch("/curio/items/{item_id}")
async def update_curio_item(item_id: str, body: CurioItemUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    try:
        ok = await db.update_artifact_item(item_id, **updates)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"ok": True}


@extra_api.patch("/artifacts/{item_id}")
async def update_artifact(item_id: str, body: CurioItemUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="没有需要更新的字段")
    try:
        ok = await db.update_artifact_item(item_id, **updates)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    item = await db.get_artifact_item(item_id)
    return {"ok": True, "item": _artifact_api_item(item) if item else None}


@extra_api.delete("/curio/items/{item_id}")
async def delete_curio_item(item_id: str):
    ok = await db.delete_artifact_item(item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"ok": True}


@extra_api.delete("/artifacts/{item_id}")
async def delete_artifact(item_id: str):
    ok = await db.delete_artifact_item(item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"ok": True}


@extra_api.post("/curio/items/{item_id}/pin")
async def pin_curio_item(item_id: str):
    ok = await db.update_artifact_item(item_id, is_pinned=True)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"ok": True}


@extra_api.post("/artifacts/{item_id}/pin")
async def pin_artifact(item_id: str):
    ok = await db.update_artifact_item(item_id, is_pinned=True)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    item = await db.get_artifact_item(item_id)
    return {"ok": True, "item": _artifact_api_item(item) if item else None}


@extra_api.delete("/curio/items/{item_id}/pin")
async def unpin_curio_item(item_id: str):
    ok = await db.update_artifact_item(item_id, is_pinned=False)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    return {"ok": True}


@extra_api.delete("/artifacts/{item_id}/pin")
async def unpin_artifact(item_id: str):
    ok = await db.update_artifact_item(item_id, is_pinned=False)
    if not ok:
        raise HTTPException(status_code=404, detail="artifact 不存在")
    item = await db.get_artifact_item(item_id)
    return {"ok": True, "item": _artifact_api_item(item) if item else None}


@extra_api.post("/curio/upload")
async def upload_curio_artifact(file: UploadFile = File(...)):
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="empty file")
    key = _upload_curio_bytes_to_r2(
        content,
        filename=file.filename or "artifact.html",
        mime_type=file.content_type or "text/html; charset=utf-8",
    )
    return {"storage_mode": "r2", "object_key": key, "storage_key": key, "size_bytes": len(content)}


@extra_api.post("/curio/upload-url")
async def create_curio_upload_url(body: CurioUploadUrlPayload):
    mime_type = body.mime_type or "text/html; charset=utf-8"
    storage_key = _curio_storage_key(body.filename)
    try:
        upload_url = media_storage.r2_client.presigned_upload_url(storage_key, mime_type=mime_type)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=f"R2 storage is not configured: {exc}") from exc
    except Exception as exc:
        logger.warning("curio R2 upload url failed: %s", exc)
        raise HTTPException(status_code=502, detail="R2 upload URL failed") from exc
    return {
        "storage_mode": "r2",
        "object_key": storage_key,
        "storage_key": storage_key,
        "upload_url": upload_url,
        "headers": {"Content-Type": mime_type},
        "expires_in": settings.r2_presign_expires_seconds,
    }

# -- Parlor / Roundtable ----------------------------------------------------

DEFAULT_PARLOR_SEATS: list[dict[str, Any]] = [
    {"agent_id": "azheng", "display_name": "阿正", "color": "#9b5b3d", "seat_order": 0},
    {"agent_id": "zhansi", "display_name": "斩思", "color": "#5d6f82", "seat_order": 1},
    {"agent_id": "ayan", "display_name": "阿砚", "color": "#8b6f47", "seat_order": 2},
]


def _parlor_turn_prompt(round_info: dict[str, Any], seat: dict[str, Any], turns: list[dict[str, Any]]) -> list[dict[str, str]]:
    history = "\n".join(
        f"{item.get('agent_id') or 'user'}: {item.get('content') or ''}"
        for item in turns[-18:]
    )
    persona = seat.get("system_prompt") or f"You are {seat.get('display_name') or seat.get('agent_id')}, one seat in Parlor."
    return [
        {"role": "system", "content": f"{persona}\nSpeak warmly, briefly, and stay in character. Keep it under 120 Chinese characters."},
        {"role": "user", "content": f"Room: {round_info.get('title')}\nTopic: {round_info.get('description')}\nRecent turns:\n{history}\nYour turn now."},
    ]


async def _pick_parlor_seat(round_id: str, force_seat_id: str | None = None) -> dict[str, Any] | None:
    seats = await db.list_parlor_seats(round_id)
    if force_seat_id:
        return next((seat for seat in seats if seat.get("id") == force_seat_id), None)
    if not seats:
        return None
    turns = await db.list_parlor_turns(round_id, limit=50)
    last_agent = next((turn.get("agent_id") for turn in reversed(turns) if not turn.get("is_user")), "")
    ordered = sorted(seats, key=lambda item: int(item.get("seat_order") or 0))
    if not last_agent:
        return ordered[0]
    for index, seat in enumerate(ordered):
        if seat.get("agent_id") == last_agent:
            return ordered[(index + 1) % len(ordered)]
    return ordered[0]


async def _create_parlor_ai_turn(round_id: str, force_seat_id: str | None = None) -> dict[str, Any]:
    round_info = await db.get_parlor_round(round_id)
    if not round_info:
        raise HTTPException(status_code=404, detail="round not found")
    if round_info.get("status") == "ended":
        raise HTTPException(status_code=409, detail="round has ended")
    seat = await _pick_parlor_seat(round_id, force_seat_id)
    if not seat:
        raise HTTPException(status_code=400, detail="no parlor seats")
    turns = await db.list_parlor_turns(round_id, limit=200)
    text, _model_info = await _collect_slot_text("chat", _parlor_turn_prompt(round_info, seat, turns), temperature=0.75)
    content = text.strip() if text and not _looks_like_model_failure(text) else "我先坐这儿听一会儿。你继续。"
    return await db.create_parlor_turn(
        round_id,
        seat_id=seat.get("id") or "",
        agent_id=seat.get("agent_id") or "",
        content=content,
        is_user=False,
    )


@extra_api.get("/parlor/rounds")
async def list_parlor_rounds(status: Optional[str] = None, limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0)):
    rounds = await db.list_parlor_rounds(status=status, limit=limit, offset=offset)
    for item in rounds:
        item["seats"] = await db.list_parlor_seats(item["id"])
        item["turns_count"] = len(await db.list_parlor_turns(item["id"], limit=300))
    return {"items": rounds}


@extra_api.post("/parlor/rounds")
async def create_parlor_round(body: ParlorRoundCreate):
    try:
        round_info = await db.create_parlor_round(
            title=body.title,
            description=body.description,
            created_by=body.created_by,
            mode=body.mode,
            auto_mode=body.auto_mode,
            max_turns_per_session=body.max_turns_per_session,
        )
        seats = body.seats or [ParlorSeatPayload(**seat) for seat in DEFAULT_PARLOR_SEATS]
        for index, seat in enumerate(seats):
            data = seat.model_dump()
            data["seat_order"] = data.get("seat_order") or index
            await db.create_parlor_seat(round_info["id"], **data)
        if body.opening.strip():
            await db.create_parlor_turn(round_info["id"], agent_id="user", content=body.opening.strip(), is_user=True)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"round": await db.get_parlor_round(round_info["id"], include_children=True)}


@extra_api.get("/parlor/rounds/{round_id}")
async def get_parlor_round(round_id: str):
    item = await db.get_parlor_round(round_id, include_children=True)
    if not item:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": item}


@extra_api.patch("/parlor/rounds/{round_id}")
async def update_parlor_round(round_id: str, body: ParlorRoundUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    ok = await db.update_parlor_round(round_id, **updates)
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.delete("/parlor/rounds/{round_id}")
async def delete_parlor_round(round_id: str):
    ok = await db.delete_parlor_round(round_id)
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"ok": True}


@extra_api.post("/parlor/rounds/{round_id}/seats")
async def add_parlor_seat(round_id: str, body: ParlorSeatPayload):
    if not await db.get_parlor_round(round_id):
        raise HTTPException(status_code=404, detail="round not found")
    return {"seat": await db.create_parlor_seat(round_id, **body.model_dump())}


@extra_api.patch("/parlor/rounds/{round_id}/seats/{seat_id}")
async def update_parlor_seat(round_id: str, seat_id: str, body: ParlorSeatUpdate):
    ok = await db.update_parlor_seat(seat_id, **{k: v for k, v in body.model_dump().items() if v is not None})
    if not ok:
        raise HTTPException(status_code=404, detail="seat not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.delete("/parlor/rounds/{round_id}/seats/{seat_id}")
async def delete_parlor_seat(round_id: str, seat_id: str):
    ok = await db.delete_parlor_seat(seat_id)
    if not ok:
        raise HTTPException(status_code=404, detail="seat not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.get("/parlor/rounds/{round_id}/turns")
async def list_parlor_turns(round_id: str, limit: int = Query(100, ge=1, le=300), offset: int = Query(0, ge=0)):
    return {"turns": await db.list_parlor_turns(round_id, limit=limit, offset=offset)}


@extra_api.post("/parlor/rounds/{round_id}/speak")
async def speak_parlor_turn(round_id: str, body: ParlorSpeakPayload):
    if not await db.get_parlor_round(round_id):
        raise HTTPException(status_code=404, detail="round not found")
    return {"turn": await db.create_parlor_turn(round_id, agent_id="user", content=body.content, is_user=True)}


@extra_api.post("/parlor/rounds/{round_id}/next")
async def next_parlor_turn(round_id: str, body: ParlorNextPayload | None = None):
    return {"turn": await _create_parlor_ai_turn(round_id, body.force_seat_id if body else None)}


@extra_api.post("/parlor/rounds/{round_id}/run")
async def run_parlor_round(round_id: str):
    round_info = await db.get_parlor_round(round_id)
    if not round_info:
        raise HTTPException(status_code=404, detail="round not found")
    seats = await db.list_parlor_seats(round_id)
    turns = []
    for seat in seats[: max(1, min(int(round_info.get("max_turns_per_session") or 6), 12))]:
        turns.append(await _create_parlor_ai_turn(round_id, seat.get("id")))
    return {"turns": turns}


@extra_api.post("/parlor/rounds/{round_id}/pause")
async def pause_parlor_round(round_id: str):
    ok = await db.update_parlor_round(round_id, status="paused")
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.post("/parlor/rounds/{round_id}/resume")
async def resume_parlor_round(round_id: str):
    ok = await db.update_parlor_round(round_id, status="active")
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.post("/parlor/rounds/{round_id}/end")
async def end_parlor_round(round_id: str):
    turns = await db.list_parlor_turns(round_id, limit=300)
    summary = {
        "turns": len(turns),
        "last_turn": turns[-1].get("content", "") if turns else "",
        "ended_at": datetime.now(timezone.utc).isoformat(),
    }
    ok = await db.update_parlor_round(round_id, status="ended", summary=summary)
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.post("/parlor/rounds/{round_id}/leave")
async def leave_parlor_round(round_id: str):
    turns = await db.list_parlor_turns(round_id, limit=1, reverse=True)
    last_n = int(turns[0].get("turn_number") or 0) if turns else 0
    ok = await db.update_parlor_round(round_id, last_viewed_turn_n=last_n, left_at=db._now())
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}


@extra_api.post("/parlor/rounds/{round_id}/visit")
async def visit_parlor_round(round_id: str):
    ok = await db.update_parlor_round(round_id, left_at="")
    if not ok:
        raise HTTPException(status_code=404, detail="round not found")
    return {"round": await db.get_parlor_round(round_id, include_children=True)}

# ── Memory Candidates (daily_loop → formal memory) ────────────────────────

class PromoteCandidateBody(BaseModel):
    category: Optional[str] = None
    importance: Optional[int] = None
    tags: Optional[str] = None

@extra_api.get("/consciousness/memory-candidates")
async def list_memory_candidates_endpoint(
    agent_id: Optional[str] = Query(None),
    status: str = Query("candidate"),
    limit: int = Query(20, ge=1, le=100),
):
    """列出 daily_loop 产出的记忆候选（等待人工或自动采纳）。"""
    candidates = await db.list_memory_candidates(
        agent_id=agent_id,
        status=status,
        limit=limit,
    )
    # 解析 content JSON，提取 candidate 字段
    result = []
    for row in candidates:
        parsed: dict = {}
        try:
            parsed = json.loads(row.get("content") or "{}")
        except Exception:
            parsed = {}
        result.append({
            "id": row.get("id"),
            "agent_id": row.get("agent_id"),
            "status": row.get("status"),
            "created_at": row.get("created_at"),
            "summary": row.get("summary") or parsed.get("content", ""),
            "content": parsed.get("content") or row.get("summary") or "",
            "category": parsed.get("category") or parsed.get("tag") or "",
            "importance": parsed.get("importance") or 3,
        })
    return {"candidates": result, "total": len(result)}


@extra_api.post("/consciousness/memory-candidates/{log_id}/promote")
async def promote_memory_candidate(
    log_id: str,
    body: PromoteCandidateBody = None,
    agent_id: Optional[str] = Query(None),
):
    """采纳候选：写入正式 memory 表，标记 cot_log status=promoted。"""
    body = body or PromoteCandidateBody()
    rows = await db.list_memory_candidates(agent_id=agent_id, status="candidate", limit=100)
    row = next((r for r in rows if str(r.get("id") or "") == log_id), None)
    if not row:
        raise HTTPException(status_code=404, detail="候选不存在或已处理")

    parsed: dict = {}
    try:
        parsed = json.loads(row.get("content") or "{}")
    except Exception:
        pass

    content = str(parsed.get("content") or row.get("summary") or "").strip()
    if not content:
        raise HTTPException(status_code=400, detail="候选内容为空，无法写入")

    category = body.category or parsed.get("category") or parsed.get("tag") or "recent_pending"
    importance = body.importance or int(parsed.get("importance") or 3)
    tags = body.tags or parsed.get("tag") or category

    memory = await db.add_memory(
        content=content,
        category=category,
        importance=importance,
        tags=tags,
        source="daily_loop_promoted",
        agent_id=row.get("agent_id") or agent_id,
    )
    await db.update_cot_log_status(log_id, "promoted")
    return {"ok": True, "memory": memory}


@extra_api.delete("/consciousness/memory-candidates/{log_id}")
async def dismiss_memory_candidate(log_id: str):
    """忽略候选：标记 cot_log status=dismissed，不写入 memory。"""
    ok = await db.update_cot_log_status(log_id, "dismissed")
    if not ok:
        raise HTTPException(status_code=404, detail="候选不存在")
    return {"ok": True}


# ==================== Grimoire 魔典 ====================

class GrimTomeCreate(BaseModel):
    title: str
    titleEn: str = ""
    sub: str = ""
    spine: str = "#2C3E5C"
    cover: str = "#3A4D6F"
    gilt: str = "#C5A572"
    sigil: str = "⊹"
    sigilStyle: str = "serifEn"
    kind: str = "虚构世界"
    palette: dict = {}


class GrimTomeUpdate(BaseModel):
    title: Optional[str] = None
    titleEn: Optional[str] = None
    sub: Optional[str] = None
    spine: Optional[str] = None
    cover: Optional[str] = None
    gilt: Optional[str] = None
    sigil: Optional[str] = None
    sigilStyle: Optional[str] = None
    kind: Optional[str] = None
    palette: Optional[dict] = None


class GrimEntryCreate(BaseModel):
    tome: str
    type: str = "lore"
    title: str
    titleEn: str = ""
    sub: str = ""
    cover: str = "#3A4D6F"
    coverInk: str = "#F1E4BD"
    coverGlyph: str = "·"
    status: str = "seed"
    tags: list = []
    fields: dict = {}
    body: str = ""
    relations: list = []


class GrimEntryUpdate(BaseModel):
    type: Optional[str] = None
    title: Optional[str] = None
    titleEn: Optional[str] = None
    sub: Optional[str] = None
    cover: Optional[str] = None
    coverInk: Optional[str] = None
    coverGlyph: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[list] = None
    fields: Optional[dict] = None
    body: Optional[str] = None
    relations: Optional[list] = None


@extra_api.get("/grimoire/tomes")
async def grim_list_tomes():
    tomes = await db.list_grimoire_tomes()
    return {"tomes": tomes}


@extra_api.post("/grimoire/tomes")
async def grim_create_tome(body: GrimTomeCreate):
    tome = await db.create_grimoire_tome(**body.model_dump())
    return {"tome": tome}


@extra_api.get("/grimoire/tomes/{tome_id}")
async def grim_get_tome(tome_id: str):
    tome = await db.get_grimoire_tome(tome_id)
    if not tome:
        raise HTTPException(status_code=404, detail="典不存在")
    return {"tome": tome}


@extra_api.patch("/grimoire/tomes/{tome_id}")
async def grim_update_tome(tome_id: str, body: GrimTomeUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    tome = await db.update_grimoire_tome(tome_id, **updates)
    if not tome:
        raise HTTPException(status_code=404, detail="典不存在")
    return {"tome": tome}


@extra_api.delete("/grimoire/tomes/{tome_id}")
async def grim_delete_tome(tome_id: str):
    ok = await db.delete_grimoire_tome(tome_id)
    if not ok:
        raise HTTPException(status_code=404, detail="典不存在")
    return {"ok": True}


@extra_api.get("/grimoire/entries")
async def grim_list_entries(tome_id: Optional[str] = None):
    entries = await db.list_grimoire_entries(tome_id=tome_id)
    return {"entries": entries}


@extra_api.post("/grimoire/entries")
async def grim_create_entry(body: GrimEntryCreate):
    entry = await db.create_grimoire_entry(**body.model_dump())
    return {"entry": entry}


@extra_api.get("/grimoire/entries/{entry_id}")
async def grim_get_entry(entry_id: str):
    entry = await db.get_grimoire_entry(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="词条不存在")
    return {"entry": entry}


@extra_api.patch("/grimoire/entries/{entry_id}")
async def grim_update_entry(entry_id: str, body: GrimEntryUpdate):
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    entry = await db.update_grimoire_entry(entry_id, **updates)
    if not entry:
        raise HTTPException(status_code=404, detail="词条不存在")
    return {"entry": entry}


@extra_api.delete("/grimoire/entries/{entry_id}")
async def grim_delete_entry(entry_id: str):
    ok = await db.delete_grimoire_entry(entry_id)
    if not ok:
        raise HTTPException(status_code=404, detail="词条不存在")
    return {"ok": True}
