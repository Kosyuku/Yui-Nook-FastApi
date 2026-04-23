"""OAuth persistence for the MCP HTTP server.

This module is the single OAuth data access layer used by ``oauth_mcp.py``.
The general ``database.py`` module does not own OAuth storage anymore.
"""

from __future__ import annotations

import hashlib
import json
import uuid
from datetime import datetime, timezone
from typing import Any

import aiosqlite

from config import settings

_db: aiosqlite.Connection | None = None

SCHEMA = """
CREATE TABLE IF NOT EXISTS oauth_clients (
    client_id           TEXT PRIMARY KEY,
    client_secret_hash  TEXT NOT NULL,
    client_name         TEXT NOT NULL DEFAULT '',
    redirect_uris_json  TEXT NOT NULL DEFAULT '[]',
    grant_types_json    TEXT NOT NULL DEFAULT '["authorization_code","refresh_token"]',
    scope               TEXT NOT NULL DEFAULT 'mcp',
    created_at          TEXT NOT NULL,
    updated_at          TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS oauth_authorization_codes (
    code_hash               TEXT PRIMARY KEY,
    client_id               TEXT NOT NULL REFERENCES oauth_clients(client_id) ON DELETE CASCADE,
    subject                 TEXT NOT NULL,
    redirect_uri            TEXT NOT NULL,
    scope                   TEXT NOT NULL DEFAULT 'mcp',
    code_challenge          TEXT NOT NULL,
    code_challenge_method   TEXT NOT NULL DEFAULT 'S256',
    created_at              TEXT NOT NULL,
    expires_at              TEXT NOT NULL,
    consumed_at             TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_oauth_codes_client_expires
    ON oauth_authorization_codes(client_id, expires_at DESC);

CREATE TABLE IF NOT EXISTS oauth_access_tokens (
    token_hash              TEXT PRIMARY KEY,
    client_id               TEXT NOT NULL REFERENCES oauth_clients(client_id) ON DELETE CASCADE,
    subject                 TEXT NOT NULL,
    scope                   TEXT NOT NULL DEFAULT 'mcp',
    created_at              TEXT NOT NULL,
    expires_at              TEXT NOT NULL,
    revoked_at              TEXT DEFAULT '',
    refresh_token_hash      TEXT DEFAULT '',
    authorization_code_hash TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_oauth_access_tokens_expires
    ON oauth_access_tokens(expires_at DESC);

CREATE TABLE IF NOT EXISTS oauth_refresh_tokens (
    token_hash          TEXT PRIMARY KEY,
    client_id           TEXT NOT NULL REFERENCES oauth_clients(client_id) ON DELETE CASCADE,
    subject             TEXT NOT NULL,
    scope               TEXT NOT NULL DEFAULT 'mcp',
    created_at          TEXT NOT NULL,
    expires_at          TEXT NOT NULL,
    revoked_at          TEXT DEFAULT '',
    access_token_hash   TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_oauth_refresh_tokens_expires
    ON oauth_refresh_tokens(expires_at DESC);
"""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _hash(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def _parse_iso_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    text = str(value).strip()
    if not text:
        return None
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _is_expired(expires_at: str | None) -> bool:
    parsed = _parse_iso_datetime(expires_at)
    return not parsed or parsed <= datetime.now(timezone.utc)


async def get_db() -> aiosqlite.Connection:
    global _db
    if _db is None:
        _db = await aiosqlite.connect(settings.database_path)
        _db.row_factory = aiosqlite.Row
        await _db.execute("PRAGMA journal_mode=WAL")
        await _db.execute("PRAGMA foreign_keys=ON")
        await _db.executescript(SCHEMA)
        await _db.commit()
    return _db


async def close_db() -> None:
    global _db
    if _db is not None:
        await _db.close()
        _db = None


async def cleanup_expired() -> None:
    db = await get_db()
    now = _now()
    await db.execute(
        "DELETE FROM oauth_authorization_codes WHERE expires_at <= ? OR COALESCE(consumed_at, '') != ''",
        (now,),
    )
    await db.execute(
        "DELETE FROM oauth_access_tokens WHERE expires_at <= ? OR COALESCE(revoked_at, '') != ''",
        (now,),
    )
    await db.execute(
        "DELETE FROM oauth_refresh_tokens WHERE expires_at <= ? OR COALESCE(revoked_at, '') != ''",
        (now,),
    )
    await db.commit()


async def upsert_client(
    *,
    client_id: str,
    client_secret: str,
    redirect_uris: list[str],
    client_name: str = "",
    scope: str = "mcp",
) -> dict[str, Any]:
    db = await get_db()
    now = _now()
    await db.execute(
        """
        INSERT INTO oauth_clients (
            client_id, client_secret_hash, client_name, redirect_uris_json, grant_types_json, scope, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(client_id) DO UPDATE SET
            client_secret_hash = excluded.client_secret_hash,
            client_name = excluded.client_name,
            redirect_uris_json = excluded.redirect_uris_json,
            grant_types_json = excluded.grant_types_json,
            scope = excluded.scope,
            updated_at = excluded.updated_at
        """,
        (
            str(client_id or "").strip(),
            _hash(client_secret),
            str(client_name or "").strip(),
            json.dumps(redirect_uris or [], ensure_ascii=False),
            json.dumps(["authorization_code", "refresh_token"], ensure_ascii=False),
            str(scope or "mcp").strip() or "mcp",
            now,
            now,
        ),
    )
    await db.commit()
    row = await get_client(client_id)
    return row or {}


async def get_client(client_id: str) -> dict[str, Any] | None:
    db = await get_db()
    cursor = await db.execute("SELECT * FROM oauth_clients WHERE client_id = ?", (str(client_id or "").strip(),))
    row = await cursor.fetchone()
    if not row:
        return None
    item = dict(row)
    item["redirect_uris"] = json.loads(item.get("redirect_uris_json") or "[]")
    item["grant_types"] = json.loads(item.get("grant_types_json") or "[]")
    return item


async def create_authorization_code(
    *,
    code: str,
    client_id: str,
    subject: str,
    redirect_uri: str,
    scope: str,
    code_challenge: str,
    code_challenge_method: str,
    expires_at: str,
) -> None:
    db = await get_db()
    await db.execute(
        """
        INSERT INTO oauth_authorization_codes (
            code_hash, client_id, subject, redirect_uri, scope, code_challenge, code_challenge_method, created_at, expires_at, consumed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '')
        """,
        (
            _hash(code),
            str(client_id or "").strip(),
            str(subject or "").strip(),
            str(redirect_uri or "").strip(),
            str(scope or "mcp").strip() or "mcp",
            str(code_challenge or "").strip(),
            str(code_challenge_method or "S256").strip() or "S256",
            _now(),
            expires_at,
        ),
    )
    await db.commit()


async def consume_authorization_code(code: str) -> dict[str, Any] | None:
    db = await get_db()
    code_hash = _hash(code)
    cursor = await db.execute("SELECT * FROM oauth_authorization_codes WHERE code_hash = ?", (code_hash,))
    row = await cursor.fetchone()
    if not row:
        return None
    item = dict(row)
    if item.get("consumed_at") or _is_expired(item.get("expires_at")):
        return None
    await db.execute("UPDATE oauth_authorization_codes SET consumed_at = ? WHERE code_hash = ?", (_now(), code_hash))
    await db.commit()
    return item


async def create_token_pair(
    *,
    access_token: str,
    refresh_token: str,
    client_id: str,
    subject: str,
    scope: str,
    access_expires_at: str,
    refresh_expires_at: str,
    authorization_code: str | None = None,
) -> None:
    db = await get_db()
    access_hash = _hash(access_token)
    refresh_hash = _hash(refresh_token)
    code_hash = _hash(authorization_code) if authorization_code else ""
    now = _now()
    await db.execute(
        """
        INSERT INTO oauth_access_tokens (
            token_hash, client_id, subject, scope, created_at, expires_at, revoked_at, refresh_token_hash, authorization_code_hash
        ) VALUES (?, ?, ?, ?, ?, ?, '', ?, ?)
        """,
        (access_hash, client_id, subject, scope, now, access_expires_at, refresh_hash, code_hash),
    )
    await db.execute(
        """
        INSERT INTO oauth_refresh_tokens (
            token_hash, client_id, subject, scope, created_at, expires_at, revoked_at, access_token_hash
        ) VALUES (?, ?, ?, ?, ?, ?, '', ?)
        """,
        (refresh_hash, client_id, subject, scope, now, refresh_expires_at, access_hash),
    )
    await db.commit()


async def get_valid_access_token(access_token: str) -> dict[str, Any] | None:
    db = await get_db()
    cursor = await db.execute("SELECT * FROM oauth_access_tokens WHERE token_hash = ?", (_hash(access_token),))
    row = await cursor.fetchone()
    if not row:
        return None
    item = dict(row)
    if item.get("revoked_at") or _is_expired(item.get("expires_at")):
        return None
    return item


async def get_valid_refresh_token(refresh_token: str) -> dict[str, Any] | None:
    db = await get_db()
    cursor = await db.execute("SELECT * FROM oauth_refresh_tokens WHERE token_hash = ?", (_hash(refresh_token),))
    row = await cursor.fetchone()
    if not row:
        return None
    item = dict(row)
    if item.get("revoked_at") or _is_expired(item.get("expires_at")):
        return None
    return item


async def revoke_refresh_token(refresh_token: str) -> None:
    db = await get_db()
    refresh_hash = _hash(refresh_token)
    cursor = await db.execute("SELECT access_token_hash FROM oauth_refresh_tokens WHERE token_hash = ?", (refresh_hash,))
    row = await cursor.fetchone()
    revoked_at = _now()
    await db.execute("UPDATE oauth_refresh_tokens SET revoked_at = ? WHERE token_hash = ?", (revoked_at, refresh_hash))
    if row and row["access_token_hash"]:
        await db.execute("UPDATE oauth_access_tokens SET revoked_at = ? WHERE token_hash = ?", (revoked_at, row["access_token_hash"]))
    await db.commit()
