from __future__ import annotations

import json
from datetime import datetime, timezone
from typing import Any

import database as db
from tools import register_tool

HEALTH_LATEST_KEY = "health_latest"


def _to_float(value: Any) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except Exception:
        return None


async def execute_get_health_summary(args: dict[str, Any]) -> str:
    row = await db.get_setting(HEALTH_LATEST_KEY)
    if not row or not row.get("value"):
        return json.dumps(
            {
                "status": "empty",
                "message": "No health data yet. Ask user to sync Apple Health first.",
            },
            ensure_ascii=False,
        )

    try:
        payload = json.loads(row["value"])
    except Exception:
        return json.dumps(
            {
                "status": "error",
                "message": "Stored health payload is invalid JSON.",
            },
            ensure_ascii=False,
        )

    steps = _to_float(payload.get("steps"))
    heart_rate = _to_float(payload.get("heart_rate"))
    sleep_hours = _to_float(payload.get("sleep_hours"))
    calories = _to_float(payload.get("calories"))
    measured_at = payload.get("measured_at") or payload.get("updated_at") or datetime.now(timezone.utc).isoformat()

    summary_parts: list[str] = []
    if steps is not None:
        summary_parts.append(f"steps: {int(steps)}")
    if heart_rate is not None:
        summary_parts.append(f"heart_rate: {heart_rate:.0f} bpm")
    if sleep_hours is not None:
        summary_parts.append(f"sleep_hours: {sleep_hours:.1f} h")
    if calories is not None:
        summary_parts.append(f"calories: {calories:.0f}")
    summary = ", ".join(summary_parts) if summary_parts else "No numeric metrics"

    return json.dumps(
        {
            "status": "success",
            "measured_at": measured_at,
            "source": payload.get("source") or "apple_health",
            "summary": summary,
            "health": {
                "steps": steps,
                "heart_rate": heart_rate,
                "sleep_hours": sleep_hours,
                "calories": calories,
            },
        },
        ensure_ascii=False,
    )


def register():
    schema = {
        "type": "function",
        "function": {
            "name": "get_health_summary",
            "description": "Get latest Apple Health summary (steps, heart rate, sleep, calories).",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    }
    register_tool(schema, execute_get_health_summary)

