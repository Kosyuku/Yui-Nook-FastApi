# YUI Nook MCP Server

项目现在提供两种 MCP 方式：

1. 本地 `stdio` 模式，给 Claude Desktop 直连。
2. 远程 HTTP(SSE) 模式，给远程 MCP Connector 走 OAuth。

## 1. 本地 stdio

在 Claude Desktop 配置里指向：

```json
{
  "mcpServers": {
    "yui_nook": {
      "command": "python",
      "args": ["D:/YUI Nook/backend/mcp_server.py"]
    }
  }
}
```

如果你走虚拟环境，就把 `command` 改成虚拟环境里的 Python。

## 2. 远程 HTTP(SSE)

安装依赖：

```bash
pip install -r requirements.txt
```

至少准备这些环境变量：

```env
MCP_HOST=0.0.0.0
MCP_PORT=8001
MCP_PUBLIC_BASE_URL=https://my-mcp.example.com

OAUTH_SESSION_SECRET=your-long-random-session-secret
OAUTH_ADMIN_USERNAME=admin
OAUTH_ADMIN_PASSWORD_HASH=pbkdf2_sha256$600000$...$...
OAUTH_CLIENT_ID=claude-mcp
OAUTH_CLIENT_SECRET=your-random-client-secret
OAUTH_REDIRECT_URIS=https://claude.ai/api/mcp/auth_callback,https://claude.com/api/mcp/auth_callback
```

启动：

```bash
python mcp_http_server.py
```

服务会暴露：

- `/sse`
- `/messages`
- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
- `/oauth/authorize`
- `/oauth/token`

## 3. 远程接入方式

在远程 MCP 客户端里填写：

- SSE URL: `https://my-mcp.example.com/sse`
- OAuth Client ID: `OAUTH_CLIENT_ID`
- OAuth Client Secret: `OAUTH_CLIENT_SECRET`

未带 token 或 token 无效时，`/sse` 和 `/messages` 会返回：

- `401 Unauthorized`
- `WWW-Authenticate: Bearer ... resource_metadata=".../.well-known/oauth-protected-resource"`
- JSON 体中的 `resource_metadata`

客户端可以靠这套响应自动发现授权服务器。

## 4. Nginx

保留 SSE 所需配置：

```nginx
server {
    listen 443 ssl;
    server_name my-mcp.example.com;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
```

## 5. 说明

- 远程 HTTP 模式现在走最小 OAuth 实现，不再是旧的固定 Bearer API Key 方案。
- PKCE 只接受 `S256`。
- OAuth 存储层在 `oauth_store.py`，和业务数据库逻辑分开。
