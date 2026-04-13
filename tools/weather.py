"""天气查询工具 — 对接 OpenWeatherMap / 和风天气"""
from __future__ import annotations

import json
import logging

import httpx

from config import settings
from prompt_builder import update_env_cache

logger = logging.getLogger(__name__)


async def execute_get_weather(args: dict) -> str:
    """查询天气"""
    city = args.get("city") or getattr(settings, "default_city", "Shanghai")
    api_key = getattr(settings, "weather_api_key", "")

    if not api_key:
        return json.dumps({"status": "error", "message": "未配置 WEATHER_API_KEY，请在 .env 中设置"}, ensure_ascii=False)

    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=zh_cn"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                return json.dumps({"status": "error", "message": f"天气 API 返回 {resp.status_code}"}, ensure_ascii=False)
            data = resp.json()

        weather_desc = data.get("weather", [{}])[0].get("description", "未知")
        temp = data.get("main", {}).get("temp", "?")
        feels_like = data.get("main", {}).get("feels_like", "?")
        humidity = data.get("main", {}).get("humidity", "?")

        result = f"{city}: {weather_desc}, {temp}°C (体感 {feels_like}°C), 湿度 {humidity}%"
        # 更新环境缓存供 prompt_builder 使用
        update_env_cache("weather", result)

        return json.dumps({
            "status": "success",
            "city": city,
            "weather": weather_desc,
            "temperature": temp,
            "feels_like": feels_like,
            "humidity": humidity,
            "summary": result,
        }, ensure_ascii=False)

    except Exception as e:
        logger.exception("天气查询失败")
        return json.dumps({"status": "error", "message": str(e)}, ensure_ascii=False)


def register():
    """注册到工具中心"""
    from tools import register_tool
    register_tool(
        schema={
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "查询指定城市的当前天气信息。可以了解温度、天气状况、湿度等。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "city": {"type": "string", "description": "城市名（英文或中文拼音），默认 Shanghai"}
                    },
                    "required": []
                }
            }
        },
        executor=execute_get_weather,
    )
    logger.info("已注册工具: get_weather")
