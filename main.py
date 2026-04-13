"""Pyro-Gemini gateway entrypoint."""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import consciousness
import conversation_summary
import database as db
import memory_async
from config import settings
from models import init_router
from routes import api
from routes.extra import extra_api
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
    logger.info("Gateway ready")
    yield
    consciousness.stop_loop()
    conversation_summary.stop_loop()
    await memory_async.stop_worker()
    await db.close_db()
    logger.info("Pyro-Gemini gateway stopped")


app = FastAPI(
    title="Pyro-Gemini Gateway",
    description="Personal AI gateway with tools, memory, and background loops.",
    version="0.2.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api)
app.include_router(extra_api)

frontend_dir = Path(__file__).parent.parent / "frontend"
if frontend_dir.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dir), html=True), name="frontend")


@app.get("/api/health")
async def health():
    return {"status": "ok", "gateway": "pyro-gemini", "version": "0.2.0"}


if __name__ == "__main__":
    import uvicorn
    from config import settings

    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)
