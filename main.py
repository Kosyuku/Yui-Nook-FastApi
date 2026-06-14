"""Pyro-Gemini gateway entrypoint."""
from __future__ import annotations

import asyncio
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

import consciousness
import conversation_summary
import database as db
import memory_async
import telegram_bot
from config import settings
from models import init_router
from routes import api
import routes
from routes.extra import extra_api
from routes.openai_compat import v1_api
from tools import init_external_tools

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Pyro-Gemini gateway starting")
    init_router()
    init_external_tools()
    if settings.database_backend == "sqlite":
        await db.get_db()
    consciousness.start_loop()
    conversation_summary.start_loop()
    await memory_async.start_worker()
    asyncio.create_task(routes._cc_keepalive_loop())
    asyncio.create_task(telegram_bot.start(settings.telegram_bot_token))
    logger.info("Gateway ready")
    yield
    consciousness.stop_loop()
    conversation_summary.stop_loop()
    await memory_async.stop_worker()
    await telegram_bot.stop()
    await db.close_db()
    logger.info("Pyro-Gemini gateway stopped")


app = FastAPI(
    title="Pyro-Gemini Gateway",
    description="Personal AI gateway with tools, memory, and background loops.",
    version="0.2.0",
    lifespan=lifespan,
)

cors_origins = [
    origin.strip()
    for origin in (settings.cors_allow_origins or "").split(",")
    if origin.strip()
]
allow_all_cors = not cors_origins or "*" in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=[] if allow_all_cors else cors_origins,
    allow_origin_regex=".*" if allow_all_cors else None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_GATEWAY_SECRET = os.getenv("GATEWAY_SECRET", "").strip()
# 不需要鉴权的路径前缀（健康检查、activity-events 来自 iOS 快捷指令）
_AUTH_EXEMPT = {"/api/health", "/api/activity-events"}

@app.middleware("http")
async def gateway_auth(request: Request, call_next):
    path = request.url.path
    if _GATEWAY_SECRET and path.startswith("/api") and path not in _AUTH_EXEMPT:
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer ") or auth[7:] != _GATEWAY_SECRET:
            return JSONResponse({"detail": "Unauthorized"}, status_code=401)
    return await call_next(request)

app.include_router(api)
app.include_router(extra_api)
app.include_router(v1_api)


@app.get("/api/health")
async def health():
    return {"status": "ok", "gateway": "pyro-gemini", "version": "0.2.0"}


frontend_dir = Path(__file__).parent.parent / "frontend"
if frontend_dir.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dir), html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn
    from config import settings

    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)
