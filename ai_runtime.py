"""Unified AI settings normalization and runtime slot resolution."""
from __future__ import annotations

import json
from copy import deepcopy
from typing import Any, Optional

import database as db
from config import ProviderConfig, settings
from models import EchoAdapter, OpenAICompatAdapter, router as model_router

MODEL_SLOTS = ("chat", "summary", "vision", "translate", "consciousness", "voice")
PROMPT_SLOTS = ("chat", "summary", "vision", "translate", "consciousness")
LEGACY_SLOT_ALIASES = {"ocr": "vision"}

MODEL_FALLBACKS: dict[str, tuple[str, ...]] = {
    "chat": ("chat",),
    "summary": ("summary", "chat"),
    "vision": ("vision", "chat"),
    "translate": ("translate", "chat"),
    "consciousness": ("consciousness", "summary", "chat"),
    "voice": ("voice",),
}

PROMPT_FALLBACKS: dict[str, tuple[str, ...]] = {
    "chat": ("chat",),
    "summary": ("summary", "chat"),
    "vision": ("vision", "chat"),
    "translate": ("translate", "chat"),
    "consciousness": ("consciousness", "summary", "chat"),
}


def _default_slot(slot_name: str) -> dict[str, Any]:
    if slot_name == "voice":
        return {
            "provider": "",
            "service_url": "",
            "base_url": "",
            "voice_id": "",
            "speaker": "",
            "emotion": "",
            "speed": 1.0,
            "format": "",
        }
    return {
        "providerId": "",
        "model": "",
        "useChatModel": False,
    }


def _normalize_prompt_value(value: Any) -> str:
    return str(value or "").strip()


def _normalize_model_slot(slot_name: str, value: Any) -> dict[str, Any]:
    normalized = _default_slot(slot_name)
    if isinstance(value, dict):
        normalized.update(deepcopy(value))
    return normalized


def normalize_ai_settings(ai: dict[str, Any] | None) -> dict[str, Any]:
    source = deepcopy(ai) if isinstance(ai, dict) else {}
    providers = source.get("providers")
    default_models_raw = source.get("defaultModels") or {}
    default_prompts_raw = source.get("defaultPrompts") or {}

    if not isinstance(providers, list):
        providers = []
    if not isinstance(default_models_raw, dict):
        default_models_raw = {}
    if not isinstance(default_prompts_raw, dict):
        default_prompts_raw = {}

    if "vision" not in default_models_raw and "ocr" in default_models_raw:
        default_models_raw["vision"] = deepcopy(default_models_raw.get("ocr"))
    if "vision" not in default_prompts_raw and "ocr" in default_prompts_raw:
        default_prompts_raw["vision"] = default_prompts_raw.get("ocr")

    normalized_models = {
        slot_name: _normalize_model_slot(slot_name, default_models_raw.get(slot_name))
        for slot_name in MODEL_SLOTS
    }
    for key, value in default_models_raw.items():
        if key in MODEL_SLOTS or key == "ocr":
            continue
        normalized_models[key] = deepcopy(value)
    normalized_prompts = {
        slot_name: _normalize_prompt_value(default_prompts_raw.get(slot_name))
        for slot_name in PROMPT_SLOTS
    }
    for key, value in default_prompts_raw.items():
        if key in PROMPT_SLOTS or key == "ocr":
            continue
        normalized_prompts[key] = _normalize_prompt_value(value)

    result = deepcopy(source)
    result["providers"] = providers
    result["defaultModels"] = normalized_models
    result["defaultPrompts"] = normalized_prompts
    return result


def normalize_ai_settings_container(payload: dict[str, Any] | None) -> dict[str, Any]:
    source = deepcopy(payload) if isinstance(payload, dict) else {}
    if isinstance(source.get("aiSettings"), dict):
        source["aiSettings"] = normalize_ai_settings(source.get("aiSettings"))
        return source
    if isinstance(source.get("ai"), dict):
        source["ai"] = normalize_ai_settings(source.get("ai"))
        return source
    return normalize_ai_settings(source)


async def load_ai_settings_container() -> dict[str, Any]:
    row = await db.get_setting("ai_settings")
    payload: dict[str, Any] = {}
    if row and row.get("value"):
        try:
            payload = json.loads(row["value"])
        except Exception:
            payload = {}
    return normalize_ai_settings_container(payload)


async def load_ai_settings() -> dict[str, Any]:
    container = await load_ai_settings_container()
    if isinstance(container.get("aiSettings"), dict):
        return normalize_ai_settings(container.get("aiSettings"))
    if isinstance(container.get("ai"), dict):
        return normalize_ai_settings(container.get("ai"))
    return normalize_ai_settings(container)


def _system_config_for_slot(slot_name: str) -> ProviderConfig | None:
    if slot_name == "chat":
        return settings.chat
    if slot_name == "summary":
        return settings.summary
    return None


def _provider_from_slot(ai: dict[str, Any], slot_name: str) -> dict[str, Any] | None:
    slot = (ai.get("defaultModels") or {}).get(slot_name) or {}
    if not isinstance(slot, dict):
        return None
    provider_id = str(slot.get("providerId") or slot.get("provider_id") or "").strip()
    if not provider_id:
        return None
    providers = ai.get("providers") or []
    for item in providers:
        if str(item.get("id") or "").strip() == provider_id:
            return item
    return None


async def resolve_model_slot(slot_name: str, _visited: Optional[set[str]] = None) -> dict[str, Any] | None:
    canonical_slot = LEGACY_SLOT_ALIASES.get(slot_name, slot_name)
    if canonical_slot not in MODEL_FALLBACKS:
        return None

    visited = set(_visited or set())
    if canonical_slot in visited:
        return None
    visited.add(canonical_slot)

    ai = await load_ai_settings()
    default_models = ai.get("defaultModels") or {}

    for candidate in MODEL_FALLBACKS[canonical_slot]:
        slot = default_models.get(candidate) or {}
        if candidate == "voice":
            if not isinstance(slot, dict):
                slot = {}
            service_url = str(slot.get("service_url") or slot.get("base_url") or settings.voice_service_url or "").strip()
            voice_id = str(slot.get("voice_id") or slot.get("voiceId") or "").strip()
            provider = str(slot.get("provider") or slot.get("providerId") or "").strip()
            if service_url or voice_id or provider:
                merged = _default_slot("voice")
                merged.update(slot if isinstance(slot, dict) else {})
                merged["service_url"] = service_url
                merged["base_url"] = str(merged.get("base_url") or service_url or "").strip()
                merged["voice_id"] = voice_id
                merged["provider"] = provider
                return merged
            continue

        if isinstance(slot, dict) and slot.get("useChatModel") and candidate != "chat":
            resolved = await resolve_model_slot("chat", visited)
            if resolved:
                return resolved
            continue

        provider = _provider_from_slot(ai, candidate)
        if provider:
            base_url = str(provider.get("baseUrl") or provider.get("base_url") or "").strip()
            api_key = str(provider.get("apiKey") or provider.get("api_key") or "").strip()
            model = str(slot.get("model") or provider.get("defaultModel") or "").strip()
            if base_url and api_key and model:
                return {
                    "slot": candidate,
                    "provider_id": str(provider.get("id") or "").strip(),
                    "provider": str(provider.get("name") or provider.get("id") or candidate).strip(),
                    "model": model,
                    "base_url": base_url,
                    "api_path": str(provider.get("apiPath") or provider.get("api_path") or "").strip(),
                    "api_key": api_key,
                    "raw_slot": deepcopy(slot),
                    "raw_provider": deepcopy(provider),
                }

        system_config = _system_config_for_slot(candidate)
        if system_config and system_config.enabled:
            return {
                "slot": candidate,
                "provider_id": candidate,
                "provider": system_config.name,
                "model": system_config.model,
                "base_url": system_config.base_url,
                "api_path": system_config.api_path,
                "api_key": system_config.api_key,
                "raw_slot": deepcopy(slot) if isinstance(slot, dict) else {},
                "raw_provider": {},
            }
    return None


async def resolve_prompt(slot_name: str) -> str:
    canonical_slot = LEGACY_SLOT_ALIASES.get(slot_name, slot_name)
    if canonical_slot not in PROMPT_FALLBACKS:
        return ""
    ai = await load_ai_settings()
    prompts = ai.get("defaultPrompts") or {}
    for candidate in PROMPT_FALLBACKS[canonical_slot]:
        text = _normalize_prompt_value(prompts.get(candidate))
        if text:
            return text
    return ""


async def resolve_adapter_for_slot(
    slot_name: str,
    *,
    tools: Any | None = None,
    tool_choice: Any | None = None,
    prefer_responses_api: bool = False,
) -> tuple[Any | None, dict[str, Any], dict[str, Any]]:
    resolved = await resolve_model_slot(slot_name)
    if resolved and slot_name != "voice":
        config = ProviderConfig(
            name=str(resolved.get("provider") or resolved.get("provider_id") or slot_name),
            base_url=str(resolved.get("base_url") or ""),
            api_path=str(resolved.get("api_path") or ""),
            api_key=str(resolved.get("api_key") or ""),
            model=str(resolved.get("model") or ""),
        )
        kwargs: dict[str, Any] = {"model": config.model}
        if tools is not None:
            kwargs["tools"] = tools
        if tool_choice is not None:
            kwargs["tool_choice"] = tool_choice
        if prefer_responses_api:
            kwargs["prefer_responses_api"] = True
        return OpenAICompatAdapter(config), {"provider": config.name, "model": config.model}, kwargs

    if slot_name == "summary":
        adapter = model_router.get("summary")
    else:
        adapter = model_router.get("chat")
    kwargs = {}
    if tools is not None:
        kwargs["tools"] = tools
    if tool_choice is not None:
        kwargs["tool_choice"] = tool_choice
    if prefer_responses_api:
        kwargs["prefer_responses_api"] = True
    return adapter, adapter.get_model_info(), kwargs


async def collect_text_response(
    slot_name: str,
    messages: list[dict[str, Any]],
    *,
    temperature: float = 0.2,
    tools: Any | None = None,
    tool_choice: Any | None = None,
    prefer_responses_api: bool = False,
) -> str:
    adapter, _, kwargs = await resolve_adapter_for_slot(
        slot_name,
        tools=tools,
        tool_choice=tool_choice,
        prefer_responses_api=prefer_responses_api,
    )
    if adapter is None or isinstance(adapter, EchoAdapter):
        return ""
    parts: list[str] = []
    async for chunk in adapter.chat_stream(messages, temperature=temperature, **kwargs):
        if isinstance(chunk, str) and chunk:
            parts.append(chunk)
    return "".join(parts).strip()
