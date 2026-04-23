from __future__ import annotations

import base64
import hashlib
import html
import hmac
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from typing import Any
from urllib.parse import urlencode

from authlib.common.security import generate_token
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.sessions import SessionMiddleware

from config import settings
import oauth_store as db

logger = logging.getLogger(__name__)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _iso_after(seconds: int) -> str:
    return (_now() + timedelta(seconds=max(1, int(seconds)))).isoformat()


def _hash_text(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def _verify_password(password: str, expected_hash: str) -> bool:
    try:
        algo, iterations_text, salt, digest = str(expected_hash or "").split("$", 3)
        if algo != "pbkdf2_sha256":
            return False
        check = hashlib.pbkdf2_hmac(
            "sha256",
            str(password or "").encode("utf-8"),
            salt.encode("utf-8"),
            int(iterations_text),
        ).hex()
        return hmac.compare_digest(check, digest)
    except Exception:
        return False


def _pkce_challenge(verifier: str) -> str:
    digest = hashlib.sha256(verifier.encode("utf-8")).digest()
    return base64.urlsafe_b64encode(digest).decode("utf-8").rstrip("=")


def _base_url(request: Request) -> str:
    configured = settings.mcp_public_base_url.strip()
    if configured:
        return configured.rstrip("/")
    return str(request.base_url).rstrip("/")


def _issuer_url(request: Request) -> str:
    configured = settings.oauth_issuer.strip()
    if configured:
        return configured.rstrip("/")
    return _base_url(request)


def _auth_server_metadata(request: Request) -> dict[str, Any]:
    issuer = _issuer_url(request)
    return {
        "issuer": issuer,
        "authorization_endpoint": f"{issuer}/oauth/authorize",
        "token_endpoint": f"{issuer}/oauth/token",
        "response_types_supported": ["code"],
        "grant_types_supported": ["authorization_code", "refresh_token"],
        "code_challenge_methods_supported": ["S256"],
        "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic"],
        "scopes_supported": [settings.oauth_default_scope],
    }


def _protected_resource_metadata(request: Request) -> dict[str, Any]:
    issuer = _issuer_url(request)
    base = _base_url(request)
    return {
        "resource": f"{base}/sse",
        "authorization_servers": [issuer],
        "bearer_methods_supported": ["header"],
        "scopes_supported": [settings.oauth_default_scope],
    }


def _unauthorized_response(request: Request, *, error: str = "invalid_token", description: str = "Missing or invalid access token.") -> JSONResponse:
    metadata_url = f"{_base_url(request)}/.well-known/oauth-protected-resource"
    headers = {
        "Cache-Control": "no-store",
        "WWW-Authenticate": (
            f'Bearer realm="mcp", error="{error}", error_description="{description}", '
            f'resource_metadata="{metadata_url}"'
        ),
    }
    return JSONResponse(
        {
            "error": error,
            "error_description": description,
            "resource_metadata": metadata_url,
        },
        status_code=401,
        headers=headers,
    )


def _validate_authorize_request(params: dict[str, str]) -> tuple[dict[str, str] | None, JSONResponse | RedirectResponse | None]:
    client_id = str(params.get("client_id") or "").strip()
    redirect_uri = str(params.get("redirect_uri") or "").strip()
    response_type = str(params.get("response_type") or "").strip()
    state_param = str(params.get("state") or "").strip()
    code_challenge = str(params.get("code_challenge") or "").strip()
    code_challenge_method = (str(params.get("code_challenge_method") or "S256").strip() or "S256").upper()
    scope = str(params.get("scope") or settings.oauth_default_scope).strip() or settings.oauth_default_scope

    if response_type != "code":
        return None, JSONResponse({"error": "unsupported_response_type"}, status_code=400)
    if not client_id or not redirect_uri or not code_challenge:
        return None, JSONResponse({"error": "invalid_request", "error_description": "Missing client_id, redirect_uri, or code_challenge."}, status_code=400)
    if code_challenge_method != "S256":
        return None, JSONResponse(
            {
                "error": "invalid_request",
                "error_description": "Unsupported code_challenge_method. Only S256 is allowed.",
            },
            status_code=400,
        )
    return {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "state": state_param,
        "code_challenge": code_challenge,
        "code_challenge_method": code_challenge_method,
        "scope": scope,
    }, None


async def _load_client_or_error(authorize_params: dict[str, str]) -> tuple[dict[str, Any] | None, JSONResponse | RedirectResponse | None]:
    client = await db.get_client(authorize_params["client_id"])
    if not client:
        return None, JSONResponse({"error": "invalid_client"}, status_code=400)
    if authorize_params["redirect_uri"] not in client.get("redirect_uris", []):
        return None, JSONResponse({"error": "invalid_request", "error_description": "redirect_uri is not registered."}, status_code=400)
    return client, None


def _render_page(title: str, body: str) -> HTMLResponse:
    return HTMLResponse(
        f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{html.escape(title)}</title>
  <style>
    :root {{
      color-scheme: light;
      --bg: #f7f7fb;
      --panel: rgba(255,255,255,.92);
      --line: rgba(35,30,48,.08);
      --text: #2b2434;
      --muted: #887f93;
      --accent: #8f76c2;
      --shadow: 0 24px 60px rgba(70,55,90,.12);
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background:
        radial-gradient(circle at top, rgba(255,255,255,.92), rgba(244,239,248,.94) 54%, rgba(239,235,244,.98));
      color: var(--text);
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Noto Sans SC", sans-serif;
    }}
    .card {{
      width: min(100%, 420px);
      border-radius: 24px;
      background: var(--panel);
      border: 1px solid var(--line);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      padding: 22px;
    }}
    h1 {{ margin: 0 0 6px; font-size: 24px; }}
    p {{ margin: 0 0 18px; color: var(--muted); }}
    label {{ display: block; margin: 12px 0 6px; font-size: 12px; color: var(--muted); }}
    input {{
      width: 100%;
      border: 1px solid rgba(143,118,194,.18);
      border-radius: 14px;
      padding: 12px 14px;
      background: rgba(255,255,255,.88);
      font: inherit;
    }}
    .row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 0;
      border-top: 1px solid rgba(35,30,48,.06);
    }}
    .row:first-of-type {{ border-top: 0; }}
    .name {{ font-weight: 700; }}
    .sub {{ font-size: 12px; color: var(--muted); }}
    .actions {{
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }}
    button {{
      border: 0;
      border-radius: 999px;
      padding: 10px 16px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }}
    .primary {{
      color: white;
      background: linear-gradient(180deg, #a48be0, #8f76c2);
      box-shadow: 0 12px 24px rgba(143,118,194,.28);
    }}
    .ghost {{
      color: var(--text);
      background: rgba(120,100,150,.08);
    }}
    .error {{
      margin-top: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255,240,243,.94);
      color: #b04962;
      font-size: 12px;
    }}
    code {{
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 8px;
      background: rgba(120,100,150,.08);
    }}
  </style>
</head>
<body>{body}</body>
</html>"""
    )


def _render_login_page(request: Request, authorize_params: dict[str, str], error: str = "") -> HTMLResponse:
    query_string = urlencode(authorize_params)
    error_html = f'<div class="error">{html.escape(error)}</div>' if error else ""
    return _render_page(
        "MCP 登录",
        f"""
        <form class="card" method="post" action="/oauth/authorize">
          <h1>登录管理员账号</h1>
          <p>授权 Claude 访问当前 MCP 资源前，请先完成管理员登录。</p>
          <input type="hidden" name="action" value="login" />
          <input type="hidden" name="query_string" value="{html.escape(query_string)}" />
          <label>用户名</label>
          <input name="username" autocomplete="username" />
          <label>密码</label>
          <input name="password" type="password" autocomplete="current-password" />
          <div class="actions">
            <button class="primary" type="submit">继续</button>
          </div>
          {error_html}
        </form>
        """,
    )


def _render_consent_page(authorize_params: dict[str, str], client: dict[str, Any]) -> HTMLResponse:
    hidden_inputs = "".join(
        f'<input type="hidden" name="{html.escape(key)}" value="{html.escape(value)}" />'
        for key, value in authorize_params.items()
    )
    redirect_uri = authorize_params["redirect_uri"]
    return _render_page(
        "MCP 授权确认",
        f"""
        <form class="card" method="post" action="/oauth/authorize">
          <h1>授权访问</h1>
          <p><strong>{html.escape(client.get("client_name") or client["client_id"])}</strong> 将通过 OAuth 访问你的 MCP SSE 资源。</p>
          <div class="row">
            <div>
              <div class="name">Client ID</div>
              <div class="sub"><code>{html.escape(client["client_id"])}</code></div>
            </div>
          </div>
          <div class="row">
            <div>
              <div class="name">回调地址</div>
              <div class="sub">{html.escape(redirect_uri)}</div>
            </div>
          </div>
          <div class="row">
            <div>
              <div class="name">Scope</div>
              <div class="sub">{html.escape(authorize_params["scope"])}</div>
            </div>
          </div>
          {hidden_inputs}
          <div class="actions">
            <button class="ghost" type="submit" name="action" value="deny">拒绝</button>
            <button class="primary" type="submit" name="action" value="approve">允许</button>
          </div>
        </form>
        """,
    )


def _redirect_with_error(redirect_uri: str, *, error: str, state_param: str = "") -> RedirectResponse:
    params = {"error": error}
    if state_param:
        params["state"] = state_param
    return RedirectResponse(url=f"{redirect_uri}?{urlencode(params)}", status_code=303)


def _extract_client_credentials(request: Request, form_data: Any) -> tuple[str, str]:
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Basic "):
        encoded = auth_header[6:].strip()
        try:
            decoded = base64.b64decode(encoded).decode("utf-8")
            client_id, client_secret = decoded.split(":", 1)
            return client_id.strip(), client_secret
        except Exception:
            return "", ""
    return str(form_data.get("client_id") or "").strip(), str(form_data.get("client_secret") or "")


async def _validate_client_credentials(request: Request, form_data: Any) -> tuple[dict[str, Any] | None, JSONResponse | None]:
    client_id, client_secret = _extract_client_credentials(request, form_data)
    if not client_id or not client_secret:
        return None, JSONResponse({"error": "invalid_client"}, status_code=401)
    client = await db.get_client(client_id)
    if not client:
        return None, JSONResponse({"error": "invalid_client"}, status_code=401)
    if client.get("client_secret_hash") != _hash_text(client_secret):
        return None, JSONResponse({"error": "invalid_client"}, status_code=401)
    return client, None


class OAuthProtectedResourceMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.protected_paths = ("/sse", "/messages")

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if not any(path == item or path.startswith(f"{item}/") for item in self.protected_paths):
            return await call_next(request)
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return _unauthorized_response(request, error="invalid_token", description="Bearer access token required.")
        token = auth_header[7:].strip()
        record = await db.get_valid_access_token(token)
        if not record:
            return _unauthorized_response(request)
        request.state.oauth_token = record
        return await call_next(request)


def install_oauth_routes(app: FastAPI) -> None:
    session_secret = settings.oauth_session_secret.strip()
    if not session_secret:
        raise RuntimeError("OAUTH_SESSION_SECRET must be configured for secure OAuth session cookies.")
    app.add_middleware(
        SessionMiddleware,
        secret_key=session_secret,
        session_cookie="mcp_oauth_session",
        same_site="lax",
        https_only=True,
        max_age=3600,
    )
    app.add_middleware(OAuthProtectedResourceMiddleware)

    @app.get("/.well-known/oauth-authorization-server")
    async def oauth_authorization_server_metadata(request: Request):
        return JSONResponse(_auth_server_metadata(request))

    @app.get("/.well-known/oauth-protected-resource")
    async def oauth_protected_resource_metadata(request: Request):
        return JSONResponse(_protected_resource_metadata(request))

    @app.get("/oauth/authorize")
    async def oauth_authorize(request: Request):
        authorize_params, error = _validate_authorize_request({key: str(value) for key, value in request.query_params.items()})
        if error:
            return error
        client, client_error = await _load_client_or_error(authorize_params)
        if client_error:
            return client_error
        if request.session.get("oauth_admin") != settings.oauth_admin_username:
            return _render_login_page(request, authorize_params)
        return _render_consent_page(authorize_params, client)

    @app.post("/oauth/authorize")
    async def oauth_authorize_submit(
        request: Request,
        action: str = Form(...),
        query_string: str = Form(""),
        username: str = Form(""),
        password: str = Form(""),
        client_id: str = Form(""),
        redirect_uri: str = Form(""),
        state_param: str = Form("", alias="state"),
        code_challenge: str = Form(""),
        code_challenge_method: str = Form("S256"),
        scope: str = Form(settings.oauth_default_scope),
    ):
        if action == "login":
            if username != settings.oauth_admin_username or not _verify_password(password, settings.oauth_admin_password_hash):
                params = {key: value for key, value in request.query_params.items()}
                if not params and query_string:
                    from urllib.parse import parse_qsl

                    params = {key: value for key, value in parse_qsl(query_string, keep_blank_values=True)}
                authorize_params, _ = _validate_authorize_request(params)
                return _render_login_page(request, authorize_params or {}, "用户名或密码不正确。")
            request.session["oauth_admin"] = settings.oauth_admin_username
            target = "/oauth/authorize"
            if query_string:
                target = f"{target}?{query_string}"
            return RedirectResponse(url=target, status_code=303)

        authorize_params = {
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "state": state_param,
            "code_challenge": code_challenge,
            "code_challenge_method": code_challenge_method,
            "scope": scope,
        }
        authorize_params, error = _validate_authorize_request(authorize_params)
        if error:
            return error
        client, client_error = await _load_client_or_error(authorize_params)
        if client_error:
            return client_error
        if action == "deny":
            return _redirect_with_error(authorize_params["redirect_uri"], error="access_denied", state_param=authorize_params["state"])
        if request.session.get("oauth_admin") != settings.oauth_admin_username:
            return _render_login_page(request, authorize_params, "请先登录。")
        code = generate_token(48)
        await db.create_authorization_code(
            code=code,
            client_id=client["client_id"],
            subject=settings.oauth_admin_username,
            redirect_uri=authorize_params["redirect_uri"],
            scope=authorize_params["scope"],
            code_challenge=authorize_params["code_challenge"],
            code_challenge_method=authorize_params["code_challenge_method"],
            expires_at=_iso_after(settings.oauth_auth_code_ttl_seconds),
        )
        params = {"code": code}
        if authorize_params["state"]:
            params["state"] = authorize_params["state"]
        return RedirectResponse(url=f'{authorize_params["redirect_uri"]}?{urlencode(params)}', status_code=303)

    @app.post("/oauth/token")
    async def oauth_token(request: Request):
        form_data = await request.form()
        grant_type = str(form_data.get("grant_type") or "").strip()
        client, client_error = await _validate_client_credentials(request, form_data)
        if client_error:
            return client_error

        if grant_type == "authorization_code":
            code = str(form_data.get("code") or "").strip()
            redirect_uri = str(form_data.get("redirect_uri") or "").strip()
            code_verifier = str(form_data.get("code_verifier") or "").strip()
            if not code or not redirect_uri or not code_verifier:
                return JSONResponse({"error": "invalid_request"}, status_code=400)
            code_row = await db.consume_authorization_code(code)
            if not code_row:
                return JSONResponse({"error": "invalid_grant"}, status_code=400)
            if code_row["client_id"] != client["client_id"] or code_row["redirect_uri"] != redirect_uri:
                return JSONResponse({"error": "invalid_grant"}, status_code=400)
            if _pkce_challenge(code_verifier) != code_row["code_challenge"]:
                return JSONResponse(
                    {
                        "error": "invalid_grant",
                        "error_description": "PKCE verification failed. Only S256 code challenges are supported.",
                    },
                    status_code=400,
                )
            access_token = generate_token(48)
            refresh_token = generate_token(64)
            await db.create_token_pair(
                access_token=access_token,
                refresh_token=refresh_token,
                client_id=client["client_id"],
                subject=code_row["subject"],
                scope=code_row.get("scope") or settings.oauth_default_scope,
                access_expires_at=_iso_after(settings.oauth_access_token_ttl_seconds),
                refresh_expires_at=_iso_after(settings.oauth_refresh_token_ttl_seconds),
                authorization_code=code,
            )
            return JSONResponse(
                {
                    "access_token": access_token,
                    "token_type": "Bearer",
                    "expires_in": settings.oauth_access_token_ttl_seconds,
                    "refresh_token": refresh_token,
                    "scope": code_row.get("scope") or settings.oauth_default_scope,
                },
                headers={"Cache-Control": "no-store"},
            )

        if grant_type == "refresh_token":
            refresh_token = str(form_data.get("refresh_token") or "").strip()
            if not refresh_token:
                return JSONResponse({"error": "invalid_request"}, status_code=400)
            refresh_row = await db.get_valid_refresh_token(refresh_token)
            if not refresh_row or refresh_row["client_id"] != client["client_id"]:
                return JSONResponse({"error": "invalid_grant"}, status_code=400)
            await db.revoke_refresh_token(refresh_token)
            access_token = generate_token(48)
            new_refresh_token = generate_token(64)
            await db.create_token_pair(
                access_token=access_token,
                refresh_token=new_refresh_token,
                client_id=client["client_id"],
                subject=refresh_row["subject"],
                scope=refresh_row.get("scope") or settings.oauth_default_scope,
                access_expires_at=_iso_after(settings.oauth_access_token_ttl_seconds),
                refresh_expires_at=_iso_after(settings.oauth_refresh_token_ttl_seconds),
            )
            return JSONResponse(
                {
                    "access_token": access_token,
                    "token_type": "Bearer",
                    "expires_in": settings.oauth_access_token_ttl_seconds,
                    "refresh_token": new_refresh_token,
                    "scope": refresh_row.get("scope") or settings.oauth_default_scope,
                },
                headers={"Cache-Control": "no-store"},
            )

        return JSONResponse({"error": "unsupported_grant_type"}, status_code=400)


async def seed_default_oauth_client() -> None:
    if not settings.oauth_session_secret:
        raise RuntimeError("OAUTH_SESSION_SECRET must be configured for MCP OAuth.")
    if not settings.oauth_client_id or not settings.oauth_client_secret:
        raise RuntimeError("OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET must be configured for MCP OAuth.")
    if not settings.oauth_admin_password_hash:
        raise RuntimeError("OAUTH_ADMIN_PASSWORD_HASH must be configured for MCP OAuth.")
    await db.upsert_client(
        client_id=settings.oauth_client_id,
        client_secret=settings.oauth_client_secret,
        redirect_uris=settings.oauth_redirect_uris,
        client_name=settings.oauth_client_name,
        scope=settings.oauth_default_scope,
    )
    await db.cleanup_expired()


@asynccontextmanager
async def oauth_mcp_lifespan(_app: FastAPI):
    await db.get_db()
    await seed_default_oauth_client()
    logger.info("MCP OAuth ready")
    yield
    await db.close_db()
