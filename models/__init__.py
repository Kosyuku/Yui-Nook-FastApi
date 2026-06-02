"""模型适配器 — 统一接口调用各种 LLM Provider"""
from __future__ import annotations

import asyncio
import json
import logging
from abc import ABC, abstractmethod
from typing import Any, AsyncIterator

import httpx

from config import ProviderConfig, settings
from tools import TOOLS_SCHEMA, TOOL_EXECUTORS

logger = logging.getLogger(__name__)


def _default_api_path(prefer_responses: bool = False) -> str:
    return "/responses" if prefer_responses else "/chat/completions"


def _normalize_api_path(api_path: str | None, prefer_responses: bool = False) -> str:
    value = str(api_path or "").strip()
    if not value:
        return _default_api_path(prefer_responses=prefer_responses)
    if not value.startswith("/"):
        value = f"/{value}"
    return value


def _join_base_url_and_path(base_url: str, api_path: str | None, prefer_responses: bool = False) -> str:
    base = str(base_url or "").strip().rstrip("/")
    explicit_path = str(api_path or "").strip()
    lowered = base.lower()
    if not explicit_path and (
        lowered.endswith("/chat/completions")
        or lowered.endswith("/responses")
        or lowered.endswith("/v1/chat/completions")
        or lowered.endswith("/v1/responses")
    ):
        return base
    return f"{base}{_normalize_api_path(explicit_path, prefer_responses=prefer_responses)}"


def _provider_kind(provider: str, base_url: str, model: str) -> str:
    haystack = " ".join([provider, base_url, model]).lower()
    if "generativelanguage.googleapis.com" in haystack or "gemini" in provider.lower():
        return "gemini"
    if "anthropic" in haystack or "claude" in provider.lower():
        return "anthropic"
    if "openrouter" in haystack:
        return "openrouter"
    if "openai" in haystack:
        return "openai"
    return "openai-compatible"


def _validate_provider_config(*, provider: str, base_url: str, model: str, final_url: str) -> str:
    provider_value = str(provider or "").strip()
    base_value = str(base_url or "").strip()
    model_value = str(model or "").strip()
    final_value = str(final_url or "").strip()
    lowered_base = base_value.lower()
    lowered_model = model_value.lower()
    kind = _provider_kind(provider_value, base_value, model_value)

    if not base_value:
        return "base_url is empty"
    if not model_value:
        return "model is empty"
    if "/models/" in lowered_base or ":generatecontent" in lowered_base:
        return "base_url looks like a provider-native model endpoint; OpenAICompatAdapter expects an OpenAI-compatible base URL"
    if lowered_model in lowered_base or lowered_model in final_value.lower():
        return "model appears to be embedded in base_url/final URL"
    if kind == "gemini" and any(marker in lowered_model for marker in ("claude", "anthropic/")):
        return "Gemini provider/base_url is configured with a Claude/Anthropic model"
    if kind == "anthropic" and ("generativelanguage.googleapis.com" in lowered_base or "gemini" in lowered_base):
        return "Claude/Anthropic provider is configured with a Gemini base_url"
    if kind == "gemini" and lowered_model.startswith(("openai/", "gpt-", "o1", "o3", "o4")):
        return "Gemini provider/base_url is configured with an OpenAI model"
    return ""


def _looks_like_stream_options_rejection(error_detail: str) -> bool:
    lowered = str(error_detail or "").lower()
    return (
        "stream_options" in lowered
        or "include_usage" in lowered
        or "unknown parameter" in lowered
        or "unrecognized" in lowered
        or "extra inputs are not permitted" in lowered
    )


def _usage_debug_payload(usage: dict[str, Any]) -> dict[str, Any]:
    prompt_tokens = int(usage.get("prompt_tokens") or usage.get("input_tokens") or 0)
    completion_tokens = int(usage.get("completion_tokens") or usage.get("output_tokens") or 0)
    total_tokens = int(usage.get("total_tokens") or prompt_tokens + completion_tokens)
    prompt_details = usage.get("prompt_tokens_details") if isinstance(usage.get("prompt_tokens_details"), dict) else {}
    input_details = usage.get("input_tokens_details") if isinstance(usage.get("input_tokens_details"), dict) else {}
    cached_tokens = int(
        prompt_details.get("cached_tokens")
        or input_details.get("cached_tokens")
        or usage.get("cached_tokens")
        or 0
    )
    return {
        "prompt_tokens": prompt_tokens,
        "input_tokens": int(usage.get("input_tokens") or 0),
        "completion_tokens": completion_tokens,
        "output_tokens": int(usage.get("output_tokens") or 0),
        "total_tokens": total_tokens,
        "cached_tokens": cached_tokens,
        "cache_hit_ratio": (cached_tokens / prompt_tokens) if prompt_tokens > 0 else 0.0,
    }


class ModelAdapter(ABC):
    """模型适配器基类"""

    def __init__(self, config: ProviderConfig):
        self.config = config

    @abstractmethod
    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        temperature: float = 0.7,
    ) -> AsyncIterator[str | dict[str, Any]]:
        """流式对话，逐 token 返回"""
        ...

    def get_model_info(self) -> dict[str, str]:
        return {"provider": self.config.name, "model": self.config.model or "echo"}


# ==================== Echo 模拟适配器 ====================

class EchoAdapter(ModelAdapter):
    """Echo 模拟模型 — 无需 API Key，用于测试链路"""

    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        temperature: float = 0.7,
    ) -> AsyncIterator[str | dict[str, Any]]:
        # 拿到最后一条用户消息
        user_msg = ""
        for msg in reversed(messages):
            if msg["role"] == "user":
                user_msg = msg["content"]
                break

        response = f"🤖 [Echo 模式] 收到你的消息：「{user_msg}」\n\n这是测试回复，真实模型接入后会替换。请在 `.env` 中配置 API Key。"

        # 模拟流式输出，每几个字符返回一次
        chunk_size = 4
        for i in range(0, len(response), chunk_size):
            yield response[i : i + chunk_size]
            await asyncio.sleep(0.03)


# ==================== OpenAI 兼容适配器 ====================

class OpenAICompatAdapter(ModelAdapter):
    """
    OpenAI 兼容协议适配器
    可用于: Gemini, Claude(OpenRouter), DeepSeek, OpenAI, 及任何兼容 API
    """

    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        temperature: float = 0.7,
        **kwargs,
    ) -> AsyncIterator[str | dict[str, Any]]:
        # 支持动态覆盖：前端设置页的 api_key / base_url / model 优先
        actual_api_key = kwargs.get("api_key") or self.config.api_key
        actual_base_url = (kwargs.get("base_url") or self.config.base_url).rstrip("/")
        actual_api_path = kwargs.get("api_path") or self.config.api_path
        actual_model = kwargs.get("model") or self.config.model
        prefer_responses_api = bool(kwargs.get("prefer_responses_api"))

        if not actual_base_url or not actual_api_key:
            yield "\n\n❌ 缺少 API Key 或 Base URL，请在「系统设置」中配置。"
            return

        # 自动补全 endpoint
        url = _join_base_url_and_path(
            actual_base_url,
            actual_api_path,
            prefer_responses=prefer_responses_api,
        )

        safe_debug = {
            "provider": self.config.name,
            "base_url": actual_base_url,
            "model": actual_model,
            "final_request_url": url,
            "adapter_class": self.__class__.__name__,
        }
        logger.info("Provider request config: %s", safe_debug)
        config_error = _validate_provider_config(
            provider=self.config.name,
            base_url=actual_base_url,
            model=str(actual_model or ""),
            final_url=url,
        )
        if config_error:
            logger.error("Provider config sanity check failed: %s config=%s", config_error, safe_debug)
            yield f"\n\n? Provider ????: {config_error}"
            return

        payload = {
            "model": actual_model,
            "messages": messages,
            "stream": True,
            "temperature": temperature,
            "tools": kwargs.get("tools", TOOLS_SCHEMA),
            "tool_choice": kwargs.get("tool_choice", "auto"),
        }
        include_usage = bool(kwargs.get("include_usage", True))
        if include_usage and not prefer_responses_api:
            payload["stream_options"] = {"include_usage": True}

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {actual_api_key}",
        }

        async def _stream_payload(request_payload: dict[str, Any]) -> AsyncIterator[str | dict[str, Any]]:
            usage_chunk_received = False
            async with httpx.AsyncClient(timeout=90.0) as client:
                async with client.stream("POST", url, json=request_payload, headers=headers) as response:
                    if response.status_code != 200:
                        body = await response.aread()
                        error_detail = body.decode("utf-8", errors="replace")
                        if "stream_options" in request_payload and _looks_like_stream_options_rejection(error_detail):
                            logger.warning(
                                "Provider %s rejected stream_options.include_usage; retrying without it",
                                self.config.name,
                            )
                            retry_payload = dict(request_payload)
                            retry_payload.pop("stream_options", None)
                            async for retry_chunk in _stream_payload(retry_payload):
                                yield retry_chunk
                            return
                        logger.error(f"Provider {self.config.name} error: {response.status_code} {error_detail}")
                        yield f"\n\n❌ 模型调用失败 ({response.status_code}): {error_detail[:200]}"
                        return

                    async for line in response.aiter_lines():
                        if not line or not line.startswith("data:"):
                            continue
                        data = line[5:].strip()
                        if data == "[DONE]":
                            break
                        try:
                            event = json.loads(data)
                            for chunk in self._extract_deltas(event, model_name=str(actual_model or "")):
                                if not chunk:
                                    continue
                                if isinstance(chunk, dict) and chunk.get("type") == "usage":
                                    usage_chunk_received = True
                                    if settings.prompt_debug:
                                        logger.info(
                                            "Provider usage chunk: %s",
                                            {
                                                "usage_chunk_received": True,
                                                "provider": self.config.name,
                                                "model": str(actual_model or ""),
                                                **_usage_debug_payload(chunk.get("usage") or {}),
                                            },
                                        )
                                yield chunk
                        except json.JSONDecodeError:
                            continue
            if settings.prompt_debug and not usage_chunk_received:
                logger.info(
                    "Provider usage chunk: %s",
                    {
                        "usage_chunk_received": False,
                        "provider": self.config.name,
                        "model": str(actual_model or ""),
                    },
                )

        try:
            async for chunk in _stream_payload(payload):
                yield chunk
        except httpx.TimeoutException:
            yield "\n\n❌ 请求超时，请检查网络或 API 配置"
        except httpx.ConnectError as e:
            yield f"\n\n❌ 连接失败: {e}"
        except Exception as e:
            logger.exception(f"Provider {self.config.name} unexpected error")
            yield f"\n\n❌ 未知错误: {e}"

    @staticmethod
    def _extract_delta(event: dict[str, Any]) -> str | dict:
        """从 SSE 事件中提取增量文本，或提取 Tool Call"""
        choices = event.get("choices") or []
        if not choices:
            return ""
        
        delta = choices[0].get("delta") or {}

        # 1. 尝试解析是否有工具调用 (OpenAI 原生兼容格式)
        tool_calls = delta.get("tool_calls")
        if tool_calls:
            # 流式返回 tool_calls 虽然很碎，这里我们返回 dict 给外层组装
            return {"type": "tool_call", "tool_calls": tool_calls}
            
        # 2. 正常文本
        content = delta.get("content", "")
        if isinstance(content, str):
            return content
        if isinstance(content, list):
            parts = []
            for item in content:
                if isinstance(item, dict) and item.get("type") == "text":
                    parts.append(str(item.get("text", "")))
            return "".join(parts)
        return ""

    @staticmethod
    def _model_allows_reasoning(model_name: str) -> bool:
        normalized = str(model_name or "").lower()
        if not normalized:
            return False
        reasoning_markers = (
            "deepseek-r1",
            "deepseek-reasoner",
            "qvq",
            "qwq",
            "thinking",
            "reasoning",
            "o1",
            "o3",
            "o4",
        )
        return any(marker in normalized for marker in reasoning_markers)

    @classmethod
    def _extract_deltas(cls, event: dict[str, Any], *, model_name: str = "") -> list[str | dict[str, Any]]:
        """Extract text deltas, reasoning deltas, and tool calls from one SSE event."""
        outputs: list[str | dict[str, Any]] = []
        usage = event.get("usage")
        if isinstance(usage, dict) and usage:
            outputs.append({"type": "usage", "usage": usage})

        choices = event.get("choices") or []
        if not choices:
            return outputs

        allow_reasoning = cls._model_allows_reasoning(model_name)
        delta = choices[0].get("delta") or {}
        tool_calls = delta.get("tool_calls")
        if tool_calls:
            outputs.append({"type": "tool_call", "tool_calls": tool_calls})

        content = delta.get("content", "")
        text_outputs: list[str] = []
        reasoning_outputs: list[str] = []
        if isinstance(content, str) and content:
            text_outputs.append(content)
        elif isinstance(content, list):
            text_parts: list[str] = []
            reasoning_parts: list[str] = []
            for item in content:
                if not isinstance(item, dict):
                    continue
                item_type = str(item.get("type") or "").lower()
                text = str(item.get("text") or item.get("content") or "")
                if not text.strip():
                    continue
                if item_type in {"reasoning", "reasoning_text", "thinking", "thought", "summary_text"}:
                    reasoning_parts.append(text)
                elif item_type == "text":
                    text_parts.append(text)
            if reasoning_parts:
                reasoning_outputs.append("".join(reasoning_parts).strip())
            if text_parts:
                text_outputs.append("".join(text_parts))

        for key in ("reasoning", "reasoning_content", "reasoningContent", "thinking", "thought"):
            value = delta.get(key)
            reasoning_text = ""
            if isinstance(value, str):
                reasoning_text = value.strip()
            elif isinstance(value, list):
                parts: list[str] = []
                for item in value:
                    if isinstance(item, str) and item.strip():
                        parts.append(item)
                    elif isinstance(item, dict):
                        text = item.get("text") or item.get("content") or item.get("summary")
                        if isinstance(text, str) and text.strip():
                            parts.append(text)
                reasoning_text = "".join(parts).strip()
            elif isinstance(value, dict):
                text = value.get("text") or value.get("content") or value.get("summary")
                if isinstance(text, str):
                    reasoning_text = text.strip()
            if reasoning_text:
                reasoning_outputs.append(reasoning_text)

        seen_text: set[str] = set()
        for text in text_outputs:
            normalized = str(text or "").strip()
            if not normalized or normalized in seen_text:
                continue
            seen_text.add(normalized)
            outputs.append(text)

        seen_reasoning: set[str] = set()
        normalized_text_outputs = [str(item or "").strip() for item in text_outputs if str(item or "").strip()]
        for reasoning_text in reasoning_outputs:
            normalized = str(reasoning_text or "").strip()
            if not normalized or normalized in seen_reasoning:
                continue
            if any(
                normalized == text_value
                or (len(normalized) >= 8 and normalized in text_value)
                or (len(text_value) >= 8 and text_value in normalized)
                for text_value in normalized_text_outputs
            ):
                continue
            seen_reasoning.add(normalized)
            outputs.append({"type": "reasoning", "thinking": reasoning_text})

        return outputs


# ==================== Anthropic Native Adapter ====================

def _is_native_anthropic_url(base_url: str) -> bool:
    """True only for the real Anthropic API, not OpenRouter/proxies."""
    return "api.anthropic.com" in str(base_url or "").lower()


class AnthropicNativeAdapter(ModelAdapter):
    """Native Anthropic Messages API adapter with prompt-cache support.

    Differences from OpenAICompatAdapter:
    - POSTs to /v1/messages (Anthropic format, not OpenAI-compat).
    - Accepts optional `_blocks` kwarg (list[PromptBlock]) to build the
      payload with cache_control markers via to_anthropic_payload().
    - Falls back to flat messages when no blocks are provided.
    - Sends anthropic-beta: prompt-caching-2024-07-31 header.
    - Parses Anthropic SSE events (content_block_delta, message_delta).
    - Records cached_tokens from message_delta usage.
    """

    async def chat_stream(
        self,
        messages: list[dict[str, Any]],
        temperature: float = 0.7,
        **kwargs,
    ) -> AsyncIterator[str | dict[str, Any]]:
        from prompt_builder import to_anthropic_payload, PromptBlock

        actual_api_key = kwargs.get("api_key") or self.config.api_key
        actual_base_url = (kwargs.get("base_url") or self.config.base_url).rstrip("/")
        actual_model = kwargs.get("model") or self.config.model

        if not actual_base_url or not actual_api_key:
            yield "\n\n❌ 缺少 API Key 或 Base URL，请在「系统设置」中配置。"
            return

        url = f"{actual_base_url}/v1/messages"

        # Build Anthropic payload
        blocks: list[PromptBlock] | None = kwargs.get("_blocks")
        if blocks:
            anthr = to_anthropic_payload(blocks)
            system_payload = anthr["system"]
            msg_payload = anthr["messages"]
        else:
            # Fallback: pull system out of the first system-role message
            system_payload = []
            msg_payload = []
            for m in messages:
                if m.get("role") == "system" and not system_payload:
                    system_payload = [{"type": "text", "text": m["content"]}]
                else:
                    msg_payload.append(m)

        # Anthropic requires at least one user message
        if not msg_payload:
            msg_payload = [{"role": "user", "content": "(no user message)"}]

        payload: dict[str, Any] = {
            "model": actual_model,
            "max_tokens": kwargs.get("max_tokens", 4096),
            "temperature": temperature,
            "stream": True,
            "messages": msg_payload,
        }
        if system_payload:
            payload["system"] = system_payload

        headers = {
            "Content-Type": "application/json",
            "x-api-key": actual_api_key,
            "anthropic-version": "2023-06-01",
            "anthropic-beta": "prompt-caching-2024-07-31",
        }

        logger.info(
            "AnthropicNativeAdapter: model=%s system_blocks=%d messages=%d cache_control=%s",
            actual_model,
            len(system_payload),
            len(msg_payload),
            any("cache_control" in b for b in system_payload),
        )

        async with httpx.AsyncClient(timeout=90.0) as client:
            async with client.stream("POST", url, json=payload, headers=headers) as response:
                if response.status_code != 200:
                    body = await response.aread()
                    error_text = body.decode("utf-8", errors="replace")
                    logger.error("AnthropicNativeAdapter: HTTP %s: %s", response.status_code, error_text[:300])
                    yield f"\n\n❌ Anthropic API 错误 {response.status_code}: {error_text[:200]}"
                    return

                async for line in response.aiter_lines():
                    line = line.strip()
                    if not line or not line.startswith("data:"):
                        continue
                    data_str = line[5:].strip()
                    if data_str in ("", "[DONE]"):
                        continue
                    try:
                        data = json.loads(data_str)
                    except Exception:
                        continue

                    event_type = data.get("type", "")

                    # Text delta
                    if event_type == "content_block_delta":
                        delta = data.get("delta", {})
                        if delta.get("type") == "text_delta":
                            text = delta.get("text", "")
                            if text:
                                yield text

                    # Usage (including cached_tokens)
                    elif event_type == "message_delta":
                        usage = data.get("usage", {})
                        if usage:
                            input_tokens = int(usage.get("input_tokens") or 0)
                            output_tokens = int(usage.get("output_tokens") or 0)
                            cache_creation = int(usage.get("cache_creation_input_tokens") or 0)
                            cache_read = int(usage.get("cache_read_input_tokens") or 0)
                            yield {
                                "type": "usage",
                                "usage": {
                                    "prompt_tokens": input_tokens,
                                    "completion_tokens": output_tokens,
                                    "total_tokens": input_tokens + output_tokens,
                                    "cached_tokens": cache_read,
                                    "prompt_tokens_details": {
                                        "cached_tokens": cache_read,
                                        "cache_creation_tokens": cache_creation,
                                    },
                                },
                            }

                    elif event_type == "message_start":
                        # Initial usage before streaming
                        usage = data.get("message", {}).get("usage", {})
                        if usage:
                            cache_read = int(usage.get("cache_read_input_tokens") or 0)
                            if cache_read:
                                logger.info(
                                    "AnthropicNativeAdapter: cache_read_input_tokens=%d (prefix cache HIT)",
                                    cache_read,
                                )

    def get_model_info(self) -> dict[str, str]:
        return {
            "provider": self.config.name,
            "model": self.config.model or "",
            "adapter": "AnthropicNativeAdapter",
        }


# ==================== 模型路由器 ====================

# Provider 类型 → 适配器类 映射
ADAPTER_MAP: dict[str, type[ModelAdapter]] = {
    "echo": EchoAdapter,
    # 以下全部走 OpenAI 兼容协议
    "gemini": OpenAICompatAdapter,
    "openrouter": OpenAICompatAdapter,
    "claude": OpenAICompatAdapter,
    "deepseek": OpenAICompatAdapter,
    "openai": OpenAICompatAdapter,
    "custom": OpenAICompatAdapter,
    # 原生 Anthropic API（api.anthropic.com）— 自动检测，不需要手动填
    "anthropic_native": AnthropicNativeAdapter,
}


class ModelRouter:
    """模型路由器 — 按用途分发到不同 Provider"""

    def __init__(self):
        self._adapters: dict[str, ModelAdapter] = {}

    def register(self, purpose: str, config: ProviderConfig):
        """注册一个 Provider（用途：chat / summary）"""
        # Native Anthropic API 自动检测：base_url 包含 api.anthropic.com
        if _is_native_anthropic_url(config.base_url):
            adapter_cls = AnthropicNativeAdapter
        else:
            adapter_cls = ADAPTER_MAP.get(config.name, OpenAICompatAdapter)
        self._adapters[purpose] = adapter_cls(config)
        logger.info(
            "已注册 [%s] provider: %s adapter: %s (model=%s)",
            purpose, config.name, adapter_cls.__name__, config.model or "echo",
        )

    def get(self, purpose: str = "chat") -> ModelAdapter:
        """获取指定用途的适配器"""
        adapter = self._adapters.get(purpose)
        if adapter is None:
            # fallback 到 echo
            adapter = EchoAdapter(ProviderConfig(name="echo"))
        return adapter

    def list_providers(self) -> list[dict[str, str]]:
        """列出所有已注册的 Provider"""
        result = []
        for purpose, adapter in self._adapters.items():
            info = adapter.get_model_info()
            info["purpose"] = purpose
            info["enabled"] = str(adapter.config.enabled)
            result.append(info)
        return result


# 全局路由器单例
router = ModelRouter()


def init_router():
    """从配置初始化路由器"""
    from config import settings
    router.register("chat", settings.chat)
    router.register("summary", settings.summary)
    logger.info(f"模型路由器初始化完成，已注册 {len(router._adapters)} 个 provider")
