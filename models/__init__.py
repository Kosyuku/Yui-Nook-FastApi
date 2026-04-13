"""模型适配器 — 统一接口调用各种 LLM Provider"""
from __future__ import annotations

import asyncio
import json
import logging
from abc import ABC, abstractmethod
from typing import Any, AsyncIterator

import httpx

from config import ProviderConfig
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
    return f"{str(base_url or '').strip().rstrip('/')}{_normalize_api_path(api_path, prefer_responses=prefer_responses)}"


class ModelAdapter(ABC):
    """模型适配器基类"""

    def __init__(self, config: ProviderConfig):
        self.config = config

    @abstractmethod
    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        temperature: float = 0.7,
    ) -> AsyncIterator[str]:
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
    ) -> AsyncIterator[str]:
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
    ) -> AsyncIterator[str]:
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

        logger.info(f"调用模型: {actual_model} @ {url}")

        payload = {
            "model": actual_model,
            "messages": messages,
            "stream": True,
            "temperature": temperature,
            "tools": kwargs.get("tools", TOOLS_SCHEMA),
            "tool_choice": kwargs.get("tool_choice", "auto"),
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {actual_api_key}",
        }

        try:
            async with httpx.AsyncClient(timeout=90.0) as client:
                async with client.stream("POST", url, json=payload, headers=headers) as response:
                    if response.status_code != 200:
                        body = await response.aread()
                        error_detail = body.decode("utf-8", errors="replace")
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
                            for chunk in self._extract_deltas(event):
                                if chunk:
                                    yield chunk
                        except json.JSONDecodeError:
                            continue

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
    def _extract_deltas(event: dict[str, Any]) -> list[str | dict[str, Any]]:
        """Extract text deltas, reasoning deltas, and tool calls from one SSE event."""
        outputs: list[str | dict[str, Any]] = []
        choices = event.get("choices") or []
        if not choices:
            return outputs

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
}


class ModelRouter:
    """模型路由器 — 按用途分发到不同 Provider"""

    def __init__(self):
        self._adapters: dict[str, ModelAdapter] = {}

    def register(self, purpose: str, config: ProviderConfig):
        """注册一个 Provider（用途：chat / summary）"""
        adapter_cls = ADAPTER_MAP.get(config.name, OpenAICompatAdapter)
        self._adapters[purpose] = adapter_cls(config)
        logger.info(f"已注册 [{purpose}] provider: {config.name} (model={config.model or 'echo'})")

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
