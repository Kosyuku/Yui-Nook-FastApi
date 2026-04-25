from __future__ import annotations

import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from config import settings
from mcp_server import mcp
from oauth_mcp import install_oauth_routes, oauth_mcp_lifespan

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


mcp.settings.streamable_http_path = "/mcp"
mcp_streamable_app = mcp.streamable_http_app()
mcp_sse_app = mcp.sse_app()


@asynccontextmanager
async def mcp_http_lifespan(app: FastAPI):
    async with oauth_mcp_lifespan(app):
        async with mcp.session_manager.run():
            yield

app = FastAPI(
    title="YUI Nook MCP HTTP Server",
    version="0.1.0",
    lifespan=mcp_http_lifespan,
)

install_oauth_routes(app)


@app.get("/healthz")
async def healthz():
    return JSONResponse(
        {
            "status": "ok",
            "service": "mcp_http_server",
            "mcp_url": f"{settings.mcp_public_base_url.rstrip('/')}/mcp" if settings.mcp_public_base_url else "/mcp",
            "sse_url": f"{settings.mcp_public_base_url.rstrip('/')}/sse" if settings.mcp_public_base_url else "/sse",
        }
    )


app.router.routes.extend(mcp_streamable_app.routes)
app.mount("/", mcp_sse_app)


if __name__ == "__main__":
    logger.info("Starting MCP HTTP server with OAuth on %s:%s", settings.mcp_host, settings.mcp_port)
    if settings.mcp_public_base_url:
        logger.info("Public MCP Streamable HTTP endpoint: %s/mcp", settings.mcp_public_base_url.rstrip("/"))
        logger.info("Public SSE endpoint: %s/sse", settings.mcp_public_base_url.rstrip("/"))
    uvicorn.run(app, host=settings.mcp_host, port=settings.mcp_port)
