"""Verify Supabase REST connectivity (write + read + delete one test row).

Usage (from backend/):
  python scripts/test_supabase_connection.py

Requires in .env:
  MEMORY_BACKEND=supabase
  SUPABASE_URL
  SUPABASE_KEY
  SUPABASE_MEMORIES_TABLE (optional, default: memories)
"""
from __future__ import annotations

import os
import time
import uuid

import httpx
from dotenv import load_dotenv


def main() -> None:
    load_dotenv()
    url = os.getenv("SUPABASE_URL", "").rstrip("/")
    key = os.getenv("SUPABASE_KEY", "").strip()
    table = os.getenv("SUPABASE_MEMORIES_TABLE", "memories")

    if not url or not key:
        raise SystemExit("Missing SUPABASE_URL or SUPABASE_KEY in .env")

    endpoint = f"{url}/rest/v1/{table}"
    test_id = f"conn_{uuid.uuid4().hex[:10]}"
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    payload = {
        "id": test_id,
        "content": "supabase connectivity test (safe to delete)",
        "category": "daily",
        "tags": "test,connectivity",
        "source": "test_supabase_connection",
        "created_at": now,
        "updated_at": now,
    }

    # 默认 SUPABASE_HTTP_TRUST_ENV=0：不走系统代理（与 backend/config.py 一致）
    trust_env = os.getenv("SUPABASE_HTTP_TRUST_ENV", "0").lower() in ("1", "true", "yes")

    with httpx.Client(timeout=30.0, trust_env=trust_env) as client:
        # 1) INSERT
        r = client.post(endpoint, headers=headers, json=payload)
        if r.status_code >= 300:
            raise SystemExit(f"INSERT failed: {r.status_code} {r.text[:400]}")
        print("OK INSERT:", r.status_code, test_id)

        # 2) SELECT by id
        r2 = client.get(
            endpoint,
            headers={**headers, "Prefer": "return=representation"},
            params={"id": f"eq.{test_id}", "select": "*"},
        )
        if r2.status_code >= 300:
            raise SystemExit(f"SELECT failed: {r2.status_code} {r2.text[:400]}")
        rows = r2.json()
        print("OK SELECT rows:", len(rows))

        # 3) DELETE
        r3 = client.delete(endpoint, headers=headers, params={"id": f"eq.{test_id}"})
        if r3.status_code >= 300:
            raise SystemExit(f"DELETE failed: {r3.status_code} {r3.text[:400]}")
        print("OK DELETE:", r3.status_code)

    print("Supabase connection test passed.")


if __name__ == "__main__":
    main()
