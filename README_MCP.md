# YUI Nook MCP Server

本项目通过 Anthropic 官方 `mcp` SDK 集成了对 `Claude Desktop` 和支持 MCP 标准客户端的直连能力。

当前项目提供两种模式的 MCP Server：
1. **本地 Stdio 模式**（推荐客户端与服务在同一机器上时使用）
2. **远程 HTTP（SSE）模式**（推荐暴露给公网、使用远程 Connector 桥接时使用）

---

## 1. 本地 Stdio 模式玩法 (Claude Desktop 桌面直连)

在客户端机器上（需位于源码旁边），直接打开 Claude Desktop 的配置文件，一般路径在 `%APPDATA%\Claude\claude_desktop_config.json` 或 `~/Library/Application Support/Claude/claude_desktop_config.json`。

添加如下配置：
```json
{
  "mcpServers": {
    "yui_nook": {
      "command": "python",
      "args": ["/源码绝对路径/backend/mcp_server.py"]
    }
  }
}
```
**注意：** 如果你使用的是虚拟环境，必须将 `command` 改为虚拟环境内的 Python 完整路径，例如：
`"command": "D:/YUI Nook/backend/.venv/Scripts/python.exe"`。

---

## 2. 远程 HTTP 模式玩法 (Server 部署向)

当你把代码部署到自己的 VPS (例如局域网单机或云端实例) 并希望将能力远程暴露时，请启动 HTTP 版。

### 2.1 依赖与启动
环境依然依赖 `requirements.txt`。

必须配置一个环境 API Key。你能在项目根目录新建或修改 `.env` 并在末尾加入：
```env
MCP_API_KEY=your_super_secret_mcp_token_here
MCP_PORT=8001
MCP_HOST=0.0.0.0
```

运行服务：
```bash
python mcp_http_server.py
```
它会在指定的 8001 端口暴露 `/sse` 和 `/messages` 端点。

### 2.2 Nginx 反向代理配置示例
生产部署时，不推荐暴露 8001 端口裸奔。建议配一个域名加上 SSL 证书，挂接在 Nginx 后：

```nginx
server {
    listen 443 ssl;
    server_name my-mcp.example.com;

    # SSL 证书配置略...

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # 必须支持 SSE 与长连接
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
```

### 2.3 在远端 Claude 客户端配置
当 Nginx 配置妥当后，服务公网可用。要在客户端接入，需要按客户端的标准填写远程 MCP。
*   **SSE URL**: `https://my-mcp.example.com/sse`
*   **Authentication**: 选择 Bearer / Token
*   **Token Value**: 填入你在 `.env` 中设置的 `MCP_API_KEY` 的值 (`your_super_secret_mcp_token_here`)。

### 2.4 未来鉴权与安全性
当前使用的时 **最小可用网关 Token 认证机制**，所有进向 MCP 的 `/sse` 及 `/messages` API 的请求都会在 `mcp_http_server.py` 的 Starlette 中间件层被提取 Header `Authorization: Bearer <TOKEN>` 解析对比。
*   目前不对原生的前端与原本的 FastAPI REST 产生任何连带的路由影响。
*   如果后续希望对接正规 OAuth，可以直接重写 `mcp_http_server.py` 中的 `TokenAuthMiddleware` 分发鉴权逻辑至公网中心获取令牌。
