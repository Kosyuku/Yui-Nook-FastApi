"""Pyro-Gemini 网关配置"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from dotenv import load_dotenv

# 加载 .env
load_dotenv()


@dataclass
class ProviderConfig:
    """单个模型 Provider 的配置"""
    name: str
    base_url: str = ""
    api_path: str = ""
    api_key: str = ""
    model: str = ""

    @property
    def enabled(self) -> bool:
        return self.name == "echo" or bool(self.base_url and self.api_key and self.model)


@dataclass
class AppConfig:
    """应用全局配置"""
    host: str = "127.0.0.1"
    port: int = 8000
    database_path: str = "./data/gateway.db"
    cors_allow_origins: str = "*"
    internal_api_token: str = ""
    database_backend: str = "sqlite"
    memory_backend: str = "sqlite"
    supabase_url: str = ""
    supabase_key: str = ""
    supabase_sessions_table: str = "sessions"
    supabase_messages_table: str = "messages"
    supabase_memories_table: str = "memories"
    supabase_context_summaries_table: str = "context_summaries"
    supabase_todos_table: str = "todos"
    supabase_notes_table: str = "notes"
    supabase_diary_table: str = "diary"
    supabase_diary_notebooks_table: str = "diary_notebooks"
    supabase_diary_entries_table: str = "diary_entries"
    supabase_diary_comments_table: str = "diary_comments"
    supabase_moments_table: str = "moments"
    supabase_proactive_messages_table: str = "proactive_messages"
    supabase_memory_logs_table: str = "memory_logs"
    supabase_settings_table: str = "app_settings"
    supabase_companion_state_table: str = "companion_state"
    supabase_rp_rooms_table: str = "rp_rooms"
    supabase_rp_messages_table: str = "rp_messages"
    # 与 httpx trust_env 一致：默认 false（忽略 HTTP_PROXY，避免代理导致 TLS 失败）
    supabase_httpx_trust_env: bool = False

    # 聊天 Provider
    chat: ProviderConfig = field(default_factory=lambda: ProviderConfig(name="echo"))
    # 压缩/总结 Provider（可以用便宜模型）
    summary: ProviderConfig = field(default_factory=lambda: ProviderConfig(name="echo"))
    embedding_base_url: str = ""
    embedding_api_key: str = ""
    embedding_model: str = ""
    embedding_dimensions: int = 1536
    supabase_memory_match_rpc: str = "match_memories"

    # ── 人设 ──
    persona_name: str = "Pyro"
    persona_description: str = ""
    current_agent_id: str = "default"

    # ── 天气 ──
    weather_api_key: str = ""
    default_city: str = "Shanghai"

    # ── Web 搜索 ──
    search_engine: str = "searxng"
    search_api_key: str = ""
    searxng_url: str = ""
    voice_service_url: str = ""
    voice_service_api_key: str = ""
    voice_service_timeout: float = 15.0

    # ── 意识循环 ──
    consciousness_enabled: bool = True
    consciousness_interval_hours: float = 6.0
    proactive_max_daily: int = 5
    # 保留向后兼容，新逻辑改用 proactive_active_start/end_hour
    proactive_quiet_start: int = 23
    proactive_quiet_end: int = 7
    # 主动检查（轻任务）——v1 只用手动 trigger，字段保留供 v1.5 启动常驻循环
    proactive_check_interval_hours: float = 1.5
    # 全局消息冷却（小时），所有 style 共用硬底线
    proactive_message_cooldown_hours: float = 2.0
    # 活跃时段（本地时区整数小时，支持跨午夜）
    # 含起始不含结束；start=8, end=1 → 08:00 到次日 01:00
    proactive_active_start_hour: int = 8
    proactive_active_end_hour: int = 1

    # ── Token / Prompt 预算 ──
    chat_recent_messages_limit: int = 12
    tool_result_max_chars: int = 1200
    prompt_memory_items: int = 5
    prompt_memory_item_max_chars: int = 180
    prompt_memory_total_max_chars: int = 520
    prompt_memory_core_items: int = 2
    prompt_memory_recent_items: int = 2
    prompt_memory_deep_items: int = 2
    prompt_memory_ephemeral_items: int = 1
    prompt_memory_cross_agent_items: int = 2
    prompt_memory_core_max_chars: int = 180
    prompt_memory_recent_max_chars: int = 180
    prompt_memory_deep_max_chars: int = 120
    prompt_memory_ephemeral_max_chars: int = 80
    prompt_memory_cross_agent_max_chars: int = 120
    prompt_summary_items: int = 2
    prompt_summary_item_max_chars: int = 260
    prompt_companion_state_max_chars: int = 140
    prompt_tool_count_max: int = 8
    prompt_tool_desc_max_chars: int = 80
    summary_trigger_messages: int = 24
    summary_keep_recent_messages: int = 12
    summary_min_batch_messages: int = 8
    tool_timeout_seconds: float = 15.0
    tool_retry_count: int = 1
    tool_log_max_result_chars: int = 200
    memory_auto_extract_enabled: bool = True
    memory_auto_extract_min_chars: int = 8
    memory_auto_extract_max_chars: int = 220
    memory_retrieval_top_k: int = 6
    memory_retrieval_keyword_count: int = 4
    memory_vector_enabled: bool = True
    memory_vector_candidate_limit: int = 200
    memory_async_enabled: bool = True
    memory_async_startup_backfill_limit: int = 50
    allow_client_provider_override: bool = True

    @classmethod
    def from_env(cls) -> "AppConfig":
        """从环境变量加载配置"""
        config = cls(
            host=os.getenv("HOST", "127.0.0.1"),
            port=int(os.getenv("PORT", "8000")),
            database_path=os.getenv("DATABASE_PATH", "./data/gateway.db"),
            cors_allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*"),
            internal_api_token=os.getenv("INTERNAL_API_TOKEN", ""),
            database_backend=os.getenv("DATABASE_BACKEND", os.getenv("MEMORY_BACKEND", "sqlite")).lower(),
            memory_backend=os.getenv("MEMORY_BACKEND", "sqlite").lower(),
            supabase_url=os.getenv("SUPABASE_URL", "").rstrip("/"),
            supabase_key=os.getenv("SUPABASE_KEY", ""),
            supabase_sessions_table=os.getenv("SUPABASE_SESSIONS_TABLE", "sessions"),
            supabase_messages_table=os.getenv("SUPABASE_MESSAGES_TABLE", "messages"),
            supabase_memories_table=os.getenv("SUPABASE_MEMORIES_TABLE", "memories"),
            supabase_context_summaries_table=os.getenv("SUPABASE_CONTEXT_SUMMARIES_TABLE", "context_summaries"),
            supabase_todos_table=os.getenv("SUPABASE_TODOS_TABLE", "todos"),
            supabase_notes_table=os.getenv("SUPABASE_NOTES_TABLE", "notes"),
            supabase_diary_table=os.getenv("SUPABASE_DIARY_TABLE", "diary"),
            supabase_diary_notebooks_table=os.getenv("SUPABASE_DIARY_NOTEBOOKS_TABLE", "diary_notebooks"),
            supabase_diary_entries_table=os.getenv("SUPABASE_DIARY_ENTRIES_TABLE", "diary_entries"),
            supabase_diary_comments_table=os.getenv("SUPABASE_DIARY_COMMENTS_TABLE", "diary_comments"),
            supabase_moments_table=os.getenv("SUPABASE_MOMENTS_TABLE", "moments"),
            supabase_proactive_messages_table=os.getenv("SUPABASE_PROACTIVE_MESSAGES_TABLE", "proactive_messages"),
            supabase_memory_logs_table=os.getenv("SUPABASE_MEMORY_LOGS_TABLE", "memory_logs"),
            supabase_settings_table=os.getenv("SUPABASE_SETTINGS_TABLE", "app_settings"),
            supabase_companion_state_table=os.getenv("SUPABASE_COMPANION_STATE_TABLE", "companion_state"),
            supabase_rp_rooms_table=os.getenv("SUPABASE_RP_ROOMS_TABLE", "rp_rooms"),
            supabase_rp_messages_table=os.getenv("SUPABASE_RP_MESSAGES_TABLE", "rp_messages"),
            supabase_httpx_trust_env=os.getenv("SUPABASE_HTTP_TRUST_ENV", "0").lower()
            in ("1", "true", "yes"),
            chat=ProviderConfig(
                name=os.getenv("CHAT_PROVIDER", "echo"),
                base_url=os.getenv("CHAT_BASE_URL", ""),
                api_path=os.getenv("CHAT_API_PATH", ""),
                api_key=os.getenv("CHAT_API_KEY", ""),
                model=os.getenv("CHAT_MODEL", ""),
            ),
            summary=ProviderConfig(
                name=os.getenv("SUMMARY_PROVIDER", "echo"),
                base_url=os.getenv("SUMMARY_BASE_URL", ""),
                api_path=os.getenv("SUMMARY_API_PATH", ""),
                api_key=os.getenv("SUMMARY_API_KEY", ""),
                model=os.getenv("SUMMARY_MODEL", ""),
            ),
            embedding_base_url=os.getenv("EMBEDDING_BASE_URL", os.getenv("CHAT_BASE_URL", "")),
            embedding_api_key=os.getenv("EMBEDDING_API_KEY", os.getenv("CHAT_API_KEY", "")),
            embedding_model=os.getenv("EMBEDDING_MODEL", ""),
            embedding_dimensions=int(os.getenv("EMBEDDING_DIMENSIONS", "1536")),
            supabase_memory_match_rpc=os.getenv("SUPABASE_MEMORY_MATCH_RPC", "match_memories"),
            # 人设
            persona_name=os.getenv("PERSONA_NAME", "Pyro"),
            persona_description=os.getenv("PERSONA_DESCRIPTION", ""),
            current_agent_id=os.getenv("CURRENT_AGENT_ID", os.getenv("AGENT_ID", "default")).strip() or "default",
            # 天气
            weather_api_key=os.getenv("WEATHER_API_KEY", ""),
            default_city=os.getenv("DEFAULT_CITY", "Shanghai"),
            # 搜索
            search_engine=os.getenv("SEARCH_ENGINE", "searxng"),
            search_api_key=os.getenv("SEARCH_API_KEY", ""),
            searxng_url=os.getenv("SEARXNG_URL", ""),
            voice_service_url=os.getenv("VOICE_SERVICE_URL", "").strip(),
            voice_service_api_key=os.getenv("VOICE_SERVICE_API_KEY", "").strip(),
            voice_service_timeout=float(os.getenv("VOICE_SERVICE_TIMEOUT", "15")),
            # 意识循环
            consciousness_enabled=os.getenv("CONSCIOUSNESS_ENABLED", "true").lower() == "true",
            consciousness_interval_hours=float(os.getenv("CONSCIOUSNESS_INTERVAL_HOURS", "6.0")),
            proactive_max_daily=int(os.getenv("PROACTIVE_MAX_DAILY", "5")),
            proactive_quiet_start=int(os.getenv("PROACTIVE_QUIET_START", "23")),
            proactive_quiet_end=int(os.getenv("PROACTIVE_QUIET_END", "7")),
            proactive_check_interval_hours=float(os.getenv("PROACTIVE_CHECK_INTERVAL_HOURS", "1.5")),
            proactive_message_cooldown_hours=float(os.getenv("PROACTIVE_MESSAGE_COOLDOWN_HOURS", "2.0")),
            proactive_active_start_hour=int(os.getenv("PROACTIVE_ACTIVE_START_HOUR", "8")),
            proactive_active_end_hour=int(os.getenv("PROACTIVE_ACTIVE_END_HOUR", "1")),
            # Prompt / token 预算
            chat_recent_messages_limit=int(os.getenv("CHAT_RECENT_MESSAGES_LIMIT", "12")),
            tool_result_max_chars=int(os.getenv("TOOL_RESULT_MAX_CHARS", "1200")),
            prompt_memory_items=int(os.getenv("PROMPT_MEMORY_ITEMS", "5")),
            prompt_memory_item_max_chars=int(os.getenv("PROMPT_MEMORY_ITEM_MAX_CHARS", "180")),
            prompt_memory_total_max_chars=int(os.getenv("PROMPT_MEMORY_TOTAL_MAX_CHARS", "520")),
            prompt_memory_core_items=int(os.getenv("PROMPT_MEMORY_CORE_ITEMS", "2")),
            prompt_memory_recent_items=int(os.getenv("PROMPT_MEMORY_RECENT_ITEMS", "2")),
            prompt_memory_deep_items=int(os.getenv("PROMPT_MEMORY_DEEP_ITEMS", "2")),
            prompt_memory_ephemeral_items=int(os.getenv("PROMPT_MEMORY_EPHEMERAL_ITEMS", "1")),
            prompt_memory_cross_agent_items=int(os.getenv("PROMPT_MEMORY_CROSS_AGENT_ITEMS", "2")),
            prompt_memory_core_max_chars=int(os.getenv("PROMPT_MEMORY_CORE_MAX_CHARS", "180")),
            prompt_memory_recent_max_chars=int(os.getenv("PROMPT_MEMORY_RECENT_MAX_CHARS", "180")),
            prompt_memory_deep_max_chars=int(os.getenv("PROMPT_MEMORY_DEEP_MAX_CHARS", "120")),
            prompt_memory_ephemeral_max_chars=int(os.getenv("PROMPT_MEMORY_EPHEMERAL_MAX_CHARS", "80")),
            prompt_memory_cross_agent_max_chars=int(os.getenv("PROMPT_MEMORY_CROSS_AGENT_MAX_CHARS", "120")),
            prompt_summary_items=int(os.getenv("PROMPT_SUMMARY_ITEMS", "2")),
            prompt_summary_item_max_chars=int(os.getenv("PROMPT_SUMMARY_ITEM_MAX_CHARS", "260")),
            prompt_companion_state_max_chars=int(os.getenv("PROMPT_COMPANION_STATE_MAX_CHARS", "140")),
            prompt_tool_count_max=int(os.getenv("PROMPT_TOOL_COUNT_MAX", "8")),
            prompt_tool_desc_max_chars=int(os.getenv("PROMPT_TOOL_DESC_MAX_CHARS", "80")),
            summary_trigger_messages=int(os.getenv("SUMMARY_TRIGGER_MESSAGES", "24")),
            summary_keep_recent_messages=int(os.getenv("SUMMARY_KEEP_RECENT_MESSAGES", "12")),
            summary_min_batch_messages=int(os.getenv("SUMMARY_MIN_BATCH_MESSAGES", "8")),
            tool_timeout_seconds=float(os.getenv("TOOL_TIMEOUT_SECONDS", "15")),
            tool_retry_count=int(os.getenv("TOOL_RETRY_COUNT", "1")),
            tool_log_max_result_chars=int(os.getenv("TOOL_LOG_MAX_RESULT_CHARS", "200")),
            memory_auto_extract_enabled=os.getenv("MEMORY_AUTO_EXTRACT_ENABLED", "true").lower() == "true",
            memory_auto_extract_min_chars=int(os.getenv("MEMORY_AUTO_EXTRACT_MIN_CHARS", "8")),
            memory_auto_extract_max_chars=int(os.getenv("MEMORY_AUTO_EXTRACT_MAX_CHARS", "220")),
            memory_retrieval_top_k=int(os.getenv("MEMORY_RETRIEVAL_TOP_K", "6")),
            memory_retrieval_keyword_count=int(os.getenv("MEMORY_RETRIEVAL_KEYWORD_COUNT", "4")),
            memory_vector_enabled=os.getenv("MEMORY_VECTOR_ENABLED", "true").lower() == "true",
            memory_vector_candidate_limit=int(os.getenv("MEMORY_VECTOR_CANDIDATE_LIMIT", "200")),
            memory_async_enabled=os.getenv("MEMORY_ASYNC_ENABLED", "true").lower() == "true",
            memory_async_startup_backfill_limit=int(os.getenv("MEMORY_ASYNC_STARTUP_BACKFILL_LIMIT", "50")),
            allow_client_provider_override=os.getenv("ALLOW_CLIENT_PROVIDER_OVERRIDE", "true").lower() == "true",
        )

        # 确保数据目录存在
        Path(config.database_path).parent.mkdir(parents=True, exist_ok=True)

        return config


# 全局单例
settings = AppConfig.from_env()
