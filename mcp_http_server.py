import os
import uvicorn
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

# 引入已注册好 tools 的 mcp 实例（最大化复用 tools 与路由背后的逻辑）
from mcp_server import mcp

class TokenAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        # 如果配置了 MCP_API_KEY，进行校验
        expected_token = os.environ.get("MCP_API_KEY")
        if expected_token:
            auth_header = request.headers.get("Authorization")
            # 格式预期：Bearer <YOUR_TOKEN>
            if not auth_header or auth_header != f"Bearer {expected_token}":
                return JSONResponse(
                    {"detail": "Unauthorized: Invalid or missing Bearer token."}, 
                    status_code=401
                )
        return await call_next(request)

# mcp.sse_app() 自动生成包含 /sse 与 /messages 端点的 Starlette 应用实例
mcp_app = mcp.sse_app()

# 添加认证鉴权层
mcp_app.add_middleware(TokenAuthMiddleware)

if __name__ == "__main__":
    # 配置从环境变量获取，适合部署并支持反代
    host = os.environ.get("MCP_HOST", "0.0.0.0")
    port = int(os.environ.get("MCP_PORT", "8001"))
    
    print("-" * 50)
    print(f"🚀 Starting Remote HTTP MCP Server")
    print(f"🔗 Endpoint URL: http://{host}:{port}/sse")
    print(f"🔒 Authenticated: {'Yes (Using MCP_API_KEY)' if os.environ.get('MCP_API_KEY') else 'No (Warning: Publicly Accessible)'}")
    print("-" * 50)
    
    # 启动 ASGI 服务器
    uvicorn.run(mcp_app, host=host, port=port)
