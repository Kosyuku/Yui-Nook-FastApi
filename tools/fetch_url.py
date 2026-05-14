"""网页抓取工具 — 抓取 URL 正文并返回纯文本"""
from __future__ import annotations

import json
import logging
import re

import httpx

logger = logging.getLogger(__name__)


def _html_to_text(html: str) -> str:
    """简单的 HTML → 纯文本转换"""
    # 移除 script / style
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", html, flags=re.DOTALL | re.IGNORECASE)
    # 移除 HTML 标签
    text = re.sub(r"<[^>]+>", " ", html)
    # 压缩空白
    text = re.sub(r"\s+", " ", text).strip()
    return text


async def execute_fetch_url(args: dict) -> str:
    """抓取 URL 正文"""
    url = args.get("url", "")
    if not url:
        return json.dumps({"status": "error", "message": "缺少 url 参数"}, ensure_ascii=False)

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (compatible; PyroGemini/1.0; +https://github.com/pyro-gemini)"
        }
        async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as client:
            resp = await client.get(url, headers=headers)
            if resp.status_code != 200:
                return json.dumps({"status": "error", "message": f"HTTP {resp.status_code}"}, ensure_ascii=False)

            content_type = resp.headers.get("content-type", "")
            if "text/html" in content_type:
                text = _html_to_text(resp.text)
            else:
                text = resp.text

        # 截断过长的内容
        max_len = 3000
        truncated = len(text) > max_len
        if truncated:
            text = text[:max_len] + "...(已截断)"

        return json.dumps({
            "status": "success",
            "url": url,
            "content": text,
            "truncated": truncated,
            "length": len(text),
        }, ensure_ascii=False)

    except Exception as e:
        logger.exception("URL 抓取失败")
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


def register():
    from tools import register_tool
    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "fetch_url",
                "description": "抓取指定网页的正文内容，返回纯文本。用于阅读文章、技术文档、新闻等。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "url": {"type": "string", "description": "要抓取的网页 URL"}
                    },
                    "required": ["url"]
                }
            }
        },
        executor=execute_fetch_url,
    )
    logger.info("已注册工具: fetch_url")
