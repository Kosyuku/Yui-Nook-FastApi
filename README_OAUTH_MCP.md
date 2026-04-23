# MCP OAuth 2.1 最小接入

当前远程 MCP 入口仍然是：

- `/sse`
- `/messages`

同时提供：

- `GET /.well-known/oauth-authorization-server`
- `GET /.well-known/oauth-protected-resource`
- `GET /oauth/authorize`
- `POST /oauth/authorize`
- `POST /oauth/token`

## 1. 依赖

```bash
pip install -r requirements.txt
```

新增依赖仍然只有：

- `Authlib`
- `python-multipart`

## 2. 环境变量

至少配置这些：

```env
MCP_HOST=0.0.0.0
MCP_PORT=8001
MCP_PUBLIC_BASE_URL=https://mcp.example.com

OAUTH_SESSION_SECRET=replace-with-a-long-random-secret
OAUTH_ADMIN_USERNAME=admin
OAUTH_ADMIN_PASSWORD_HASH=pbkdf2_sha256$600000$...$...

OAUTH_CLIENT_ID=claude-mcp
OAUTH_CLIENT_SECRET=replace-with-a-random-client-secret
OAUTH_CLIENT_NAME=Claude MCP Connector
OAUTH_REDIRECT_URIS=https://claude.ai/api/mcp/auth_callback,https://claude.com/api/mcp/auth_callback
OAUTH_DEFAULT_SCOPE=mcp
```

可选：

```env
OAUTH_ISSUER=https://mcp.example.com
OAUTH_AUTH_CODE_TTL_SECONDS=600
OAUTH_ACCESS_TOKEN_TTL_SECONDS=3600
OAUTH_REFRESH_TOKEN_TTL_SECONDS=2592000
```

如果 `OAUTH_ISSUER` 不填，默认使用 `MCP_PUBLIC_BASE_URL`。

注意：

- `OAUTH_SESSION_SECRET` 现在是必填。
- session cookie 现在固定为 `Secure`，`SameSite=Lax`，`max_age=3600`。
- `/oauth/authorize` 登录流程依赖 HTTPS。纯 HTTP 下浏览器不会保存这个安全 cookie。

## 3. 生成管理员密码哈希

```bash
python scripts/make_oauth_password_hash.py
```

或者：

```bash
python scripts/make_oauth_password_hash.py my-password
```

把输出填到：

```env
OAUTH_ADMIN_PASSWORD_HASH=...
```

## 4. OAuth 存储

OAuth 实际数据层在 `oauth_store.py`。

- `oauth_mcp.py` 只负责 OAuth 路由、校验和受保护资源响应。
- `oauth_store.py` 负责 OAuth 的 SQLite 连接、建表和读写。
- `database.py` 不再承载 OAuth 存储逻辑，避免职责冲突。

OAuth 仍然使用同一个 `DATABASE_PATH` SQLite 文件，`oauth_store.py` 会自动初始化这些表：

- `oauth_clients`
- `oauth_authorization_codes`
- `oauth_access_tokens`
- `oauth_refresh_tokens`

首次启动 `mcp_http_server.py` 时会：

1. 初始化 OAuth 表。
2. 写入默认 client。
3. 清理过期 code/token。

## 5. 启动

保持现有 Nginx / systemd 结构，不需要推翻：

```bash
python mcp_http_server.py
```

或者：

```bash
uvicorn mcp_http_server:app --host 0.0.0.0 --port 8001
```

## 6. 验证

### 6.1 查看 Metadata

```bash
curl https://mcp.example.com/.well-known/oauth-authorization-server
curl https://mcp.example.com/.well-known/oauth-protected-resource
```

预期：

- `code_challenge_methods_supported` 只包含 `S256`

### 6.2 测试未授权访问 `/sse`

```bash
curl -i https://mcp.example.com/sse
```

预期：

- `401 Unauthorized`
- `WWW-Authenticate: Bearer ... resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"`
- JSON 响应体包含 `resource_metadata`

### 6.3 授权码流程

`code_challenge` 必须是 `S256` 结果，不再接受 `plain`。

示例：

```text
https://mcp.example.com/oauth/authorize?response_type=code&client_id=claude-mcp&redirect_uri=https%3A%2F%2Fclaude.ai%2Fapi%2Fmcp%2Fauth_callback&code_challenge=N14YplG5N11t9gWhM1g0Bq0Nq8Vb5SxT5G8bK8b6J6A&code_challenge_method=S256&state=abc
```

流程：

1. 浏览器打开上面的授权地址。
2. 登录管理员账号。
3. 点击允许。
4. 检查回调地址里的 `code=...`。

### 6.4 用 code 换 token

```bash
curl -X POST https://mcp.example.com/oauth/token ^
  -H "Content-Type: application/x-www-form-urlencoded" ^
  -d "grant_type=authorization_code&client_id=claude-mcp&client_secret=your-secret&code=your-code&redirect_uri=https://claude.ai/api/mcp/auth_callback&code_verifier=your-original-verifier"
```

### 6.5 带 token 访问 `/sse`

```bash
curl -i https://mcp.example.com/sse -H "Authorization: Bearer your-access-token"
```

## 7. Claude Connector 填写

- Server URL: `https://mcp.example.com/sse`
- OAuth Client ID: `OAUTH_CLIENT_ID`
- OAuth Client Secret: `OAUTH_CLIENT_SECRET`

客户端会通过：

- `/.well-known/oauth-protected-resource`
- `/.well-known/oauth-authorization-server`

自动发现授权服务。

## 8. Nginx 注意点

至少保留这些：

```nginx
proxy_http_version 1.1;
proxy_set_header Connection '';
chunked_transfer_encoding off;
proxy_buffering off;
proxy_cache off;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

## 9. 当前范围

这版只做最小可用：

- 单管理员登录
- 单预注册 client
- Authorization Code + PKCE (`S256` only)
- refresh token
- 受保护的 `/sse` 和 `/messages`

还没做：

- DCR
- 多用户
- 第三方登录
- 更复杂的同意与权限管理
