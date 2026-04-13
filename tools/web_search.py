"""Web 搜索工具 — 预留多引擎支持（SearXNG / Google / Bing）"""
from __future__ import annotations

import json
import logging

import httpx

from config import settings

logger = logging.getLogger(__name__)


async def execute_web_search(args: dict) -> str:
    """执行 Web 搜索"""
    query = args.get("query", "")
    max_results = args.get("max_results", 5)

    engine = getattr(settings, "search_engine", "searxng")
    searxng_url = getattr(settings, "searxng_url", "")

    if engine == "searxng" and searxng_url:
        return await _search_searxng(query, max_results, searxng_url)
    else:
        # 没有配置搜索引擎时返回提示
        return json.dumps({
            "status": "error",
            "message": "未配置搜索引擎。请在 .env 中设置 SEARXNG_URL 或 SEARCH_API_KEY",
        }, ensure_ascii=False)


async def _search_searxng(query: str, max_results: int, base_url: str) -> str:
    """SearXNG 搜索"""
    try:
        url = f"{base_url.rstrip('/')}/search"
        params = {
            "q": query,
            "format": "json",
            "categories": "general",
        }
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(url, params=params)
            if resp.status_code != 200:
                return json.dumps({"status": "error", "message": f"SearXNG 返回 {resp.status_code}"}, ensure_ascii=False)
            data = resp.json()

        results = []
        for item in data.get("results", [])[:max_results]:
            results.append({
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "content": item.get("content", "")[:200],
            })

        return json.dumps({
            "status": "success",
            "query": query,
            "count": len(results),
            "results": results,
        }, ensure_ascii=False)

    except Exception as e:
        logger.exception("Web 搜索失败")
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


def register():
    from tools import register_tool
    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "web_search",
                "description": "联网搜索实时信息。在需要查询最新新闻、技术文档、百科知识等时使用。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "搜索关键词"},
                        "max_results": {"type": "integer", "description": "最大结果数，默认5"}
                    },
                    "required": ["query"]
                }
            }
        },
        executor=execute_web_search,
    )
    logger.info("已注册工具: web_search")
