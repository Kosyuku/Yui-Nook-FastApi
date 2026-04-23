from __future__ import annotations

import logging

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


mcp_app = mcp.sse_app()

app = FastAPI(
    title="YUI Nook MCP HTTP Server",
    version="0.1.0",
    lifespan=oauth_mcp_lifespan,
)

install_oauth_routes(app)


@app.get("/healthz")
async def healthz():
    return JSONResponse(
        {
            "status": "ok",
            "service": "mcp_http_server",
            "sse_url": f"{settings.mcp_public_base_url.rstrip('/')}/sse" if settings.mcp_public_base_url else "/sse",
        }
    )


app.mount("/", mcp_app)


if __name__ == "__main__":
    logger.info("Starting MCP HTTP server with OAuth on %s:%s", settings.mcp_host, settings.mcp_port)
    if settings.mcp_public_base_url:
        logger.info("Public SSE endpoint: %s/sse", settings.mcp_public_base_url.rstrip("/"))
    uvicorn.run(app, host=settings.mcp_host, port=settings.mcp_port)
