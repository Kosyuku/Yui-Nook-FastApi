"""StackChan bridge adapter.

Run this as a small VPS-side service:

    XIAOZHI_MCP_ENDPOINT=ws://.../mcp_endpoint/mcp/?token=...
    STACKCHAN_TOKEN=...
    uvicorn stackchan_bridge_adapter:app --host 0.0.0.0 --port 8010

YUI points STACKCHAN_ENDPOINT at this service and POSTs /call.
"""
from __future__ import annotations

import asyncio
import json
import os
from typing import Any

import websockets
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel


class ToolCallPayload(BaseModel):
    tool: str
    arguments: dict[str, Any] = {}


class XiaozhiMcpClient:
    def __init__(self, endpoint: str):
        self.endpoint = endpoint
        self.websocket = None
        self.next_id = 10
        self.pending: dict[int, asyncio.Future] = {}
        self.tools: set[str] = set()
        self.ready = False
        self.lock = asyncio.Lock()
        self.listener_task: asyncio.Task | None = None

    async def ensure_ready(self) -> None:
        async with self.lock:
            if self.ready and self.websocket:
                return
            await self._connect_locked()

    async def _connect_locked(self) -> None:
        await self.close()
        if not self.endpoint:
            raise RuntimeError("XIAOZHI_MCP_ENDPOINT is not configured")
        self.websocket = await websockets.connect(self.endpoint)
        self.listener_task = asyncio.create_task(self._listen())
        await self._send(
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "initialize",
                "params": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"roots": {"listChanged": True}, "sampling": {}},
                    "clientInfo": {"name": "YUIStackChanBridge", "version": "1.0.0"},
                },
            }
        )
        await self._send({"jsonrpc": "2.0", "method": "notifications/initialized", "params": {}})
        tools = await self._request({"method": "tools/list"}, request_id=2)
        self.tools = {
            str(tool.get("name") or "")
            for tool in (tools.get("tools") or [])
            if isinstance(tool, dict) and tool.get("name")
        }
        self.ready = True

    async def _listen(self) -> None:
        try:
            async for message in self.websocket:
                payload = json.loads(message)
                msg_id = payload.get("id")
                if msg_id in self.pending:
                    future = self.pending.pop(msg_id)
                    if "error" in payload:
                        future.set_exception(RuntimeError(json.dumps(payload["error"], ensure_ascii=False)))
                    else:
                        future.set_result(payload.get("result"))
        finally:
            self.ready = False

    async def _send(self, payload: dict[str, Any]) -> None:
        if not self.websocket:
            raise RuntimeError("MCP websocket is not connected")
        await self.websocket.send(json.dumps(payload, ensure_ascii=False))

    async def _request(self, payload: dict[str, Any], request_id: int | None = None, timeout: float = 30.0) -> dict[str, Any]:
        if request_id is None:
            request_id = self.next_id
            self.next_id += 1
        payload = {"jsonrpc": "2.0", "id": request_id, **payload}
        loop = asyncio.get_running_loop()
        future = loop.create_future()
        self.pending[request_id] = future
        await self._send(payload)
        result = await asyncio.wait_for(future, timeout=timeout)
        return result if isinstance(result, dict) else {"result": result}

    async def call_tool(self, name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        await self.ensure_ready()
        if self.tools and name not in self.tools:
            raise KeyError(f"tool not found: {name}")
        return await self._request(
            {
                "method": "tools/call",
                "params": {"name": name, "arguments": arguments or {}},
            }
        )

    async def close(self) -> None:
        self.ready = False
        if self.listener_task:
            self.listener_task.cancel()
            self.listener_task = None
        if self.websocket:
            await self.websocket.close()
            self.websocket = None
        for future in self.pending.values():
            if not future.done():
                future.cancel()
        self.pending.clear()


app = FastAPI(title="YUI StackChan Bridge Adapter")
client = XiaozhiMcpClient(os.getenv("XIAOZHI_MCP_ENDPOINT", "").strip())


def _check_bearer(authorization: str | None) -> None:
    expected = os.getenv("STACKCHAN_TOKEN", "").strip()
    if not expected:
        raise HTTPException(status_code=503, detail="STACKCHAN_TOKEN is not configured")
    if not authorization or not authorization.startswith("Bearer ") or authorization[7:] != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
async def health():
    return {"ok": True, "mcp_endpoint_configured": bool(client.endpoint), "ready": client.ready}


@app.post("/call")
async def call_tool(payload: ToolCallPayload, authorization: str | None = Header(default=None)):
    _check_bearer(authorization)
    try:
        return await client.call_tool(payload.tool, payload.arguments)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        await client.close()
        raise HTTPException(status_code=502, detail=str(exc)) from exc
