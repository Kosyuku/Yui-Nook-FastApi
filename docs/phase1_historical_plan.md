# 个人 AI 助手系统 — 第一步：打通基础链路（历史方案）

> 说明：本文件是阶段一实施方案与当时的变更记录，保留用于回溯。  
> 当前统一进度与现状请以 `pyro_gemini_full_flow_and_progress.md` 为准。  
> 当前任务看板请以 `docs/task.md` 为准。

搭建 **FastAPI 多模型网关** + **自制 Web 前端**，跑通"选模型 → 发消息 → 收回复"的基本对话链路。

> 参考了 [Aelios](https://github.com/wusaki0723/Aelios) 的优秀设计，融入其三核分离、多 provider 配置等理念。

## User Review Required

> [!IMPORTANT]
> 目前还没有 API Key。网关先做好多模型架构 + 内置 Echo 模拟模型，拿到 Key 后改 `.env` 即可接真实模型。推荐先申请 **Gemini API**（有免费额度）。

> [!NOTE]
> 不用 Docker，本地直接跑。主题支持 **跟随系统亮/暗色**，后续可让 AI 动态换主题。

---

## 系统架构（分区式双轨网关与多端入口）

```
┌────────────────────────────────────────────────────────┐
│            多端接入层 (解耦入口)                        │
│  📱 Web移动端SPA  |  💬 Telegram Bot  |  🤖 桌面客户端  │
└──────────────┬─────────────────────────────────────────┘
               │ HTTP API / SSE 流式 / Webhook
┌──────────────▼─────────────────────────────────────────┐
│         FastAPI 对话管理层 (Gateway)                     │
│                                                        │
│  ┌─ 模型路由 & 工具编排 ──────────────────────────────┐  │
│  │  聊天 Provider   (Gemini/Claude/..)              │  │
│  │  整理 Provider   (DeepSeek/Flash 等后台处理模型)    │  │
│  │  Echo Provider   (测试用)                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ 记忆管理层（双轨记忆结构） ─────────────────────────┐  │
│  │  A. 上下文轨 (Context)：连贯性缓存，自动滑动与摘要压缩  │  │
│  │  B. 语义记忆轨 (Semantic)：分类(深层/日常/日记/写文)    │  │
│  └─────────────┬────────────────────────────────────┘  │
│                │                                       │
│  ┌─ 业务功能层 & DB ─────────────────────────────────┐   │
│  │  SQLite: sessions(会话), messages(消息),            │   │
│  │          memories(语义记忆)                        │   │
│  │  MCP 工具集: 读写记忆/搜索记忆/定时触达 等             │   │
│  └───────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

> **架构亮点**：
> 1. **双轨记忆流**：上下文轨保持当下的对话顺畅，语义记忆轨保证长期认知不丢失。
> 2. **日常意识到深层记忆**：采用 `深层` (长期不变的规则设定)、`日常` (短期抛弃)、`日记` (情感备份)、`项目记录` 的四层结构。
> 3. **工具编排网关**：大语言模型可通过访问网关提供的 Tools (基于模型提供的 Function Calling 或 MCP) 来自主感知和写入。

---

## Proposed Changes

### 后端 — FastAPI 网关

借鉴 Aelios 的 provider 分离设计，按用途配置不同模型。

#### [NEW] [main.py](file:///D:/pyro-gemini/backend/main.py)
- FastAPI 入口，CORS，挂载路由，提供前端静态文件

#### [NEW] [config.py](file:///D:/pyro-gemini/backend/config.py)
- `.env` 配置加载
- 多 provider 配置结构（参考 Aelios 的 `chat_api` / `action_api` / `search_api` 分离思路）

#### [NEW] [models/base.py](file:///D:/pyro-gemini/backend/models/base.py)
- `ModelProvider` 基类：统一 OpenAI 兼容协议调用（和 Aelios 的 `llm.py` 类似）

#### [NEW] [models/providers.py](file:///D:/pyro-gemini/backend/models/providers.py)
- Gemini / Claude / DeepSeek / OpenAI 适配器
- 统一走 OpenAI 兼容的 `/chat/completions` 接口
- Echo 模拟 Provider（无需 API Key）

#### [NEW] [models/router.py](file:///D:/pyro-gemini/backend/models/router.py)
- 按用途（聊天/压缩/搜索）路由到不同 provider
- 前端可选择具体模型

#### [NEW] [routes/chat.py](file:///D:/pyro-gemini/backend/routes/chat.py)
- `POST /api/chat` — SSE 流式对话
- `GET /api/models` — 可用模型列表

#### [NEW] [routes/sessions.py](file:///D:/pyro-gemini/backend/routes/sessions.py)
- 会话 CRUD（列表、新建、删除、重命名、获取历史消息）

#### [NEW] [database.py](file:///D:/pyro-gemini/backend/database.py)
- SQLite（aiosqlite），`sessions` + `messages` 表

#### [NEW] [requirements.txt](file:///D:/pyro-gemini/backend/requirements.txt)
#### [NEW] [.env.example](file:///D:/pyro-gemini/backend/.env.example)

---

### 前端 — 自制 Web UI

原生 HTML + CSS + JS 单页应用，参考 Aelios `saki-phone/web` 的模块化结构。

#### [NEW] [index.html](file:///D:/pyro-gemini/frontend/index.html)
- SPA 入口，侧边栏 + 内容区布局

#### [NEW] [style.css](file:///D:/pyro-gemini/frontend/style.css)
- 设计系统：**跟随系统主题**（`prefers-color-scheme`）
- 暗色/亮色双主题 CSS 变量
- 现代感设计：圆角、阴影、渐变、微动画

#### [NEW] [app.js](file:///D:/pyro-gemini/frontend/app.js)
- SPA hash 路由（`#chat`, `#moments`, `#diary`, `#memory`）

#### [NEW] 页面模块
| 文件 | 页面 | 第一步完成度 |
|------|------|------------|
| `pages/chat.js` | 💬 聊天（模型切换+流式输出+Markdown渲染） | ✅ 完整 |
| `pages/sessions.js` | 📋 会话列表侧边栏 | ✅ 完整 |
| `pages/moments.js` | 🌟 朋友圈 | 🔲 骨架 |
| `pages/diary.js` | 📔 日记 | 🔲 骨架 |
| `pages/memory.js` | 🧠 记忆管理 | 🔲 骨架 |

#### [NEW] [components/sidebar.js](file:///D:/pyro-gemini/frontend/components/sidebar.js)
- 左侧导航
#### [NEW] [utils/api.js](file:///D:/pyro-gemini/frontend/utils/api.js)
- 封装 fetch + SSE 调用

---

## 和 Aelios 的关系

| 方面 | 借鉴 Aelios | 我们的差异 |
|------|-------------|-----------|
| 模型调用 | OpenAI 兼容协议统一 | ✅ 相同 |
| Provider 分离 | chat/action/search 分开配 | ✅ 采纳（聊天/压缩/搜索） |
| 记忆系统 | 四层记忆 L0-L3 | 第三步再实现，先跑通对话 |
| 前端 | 原生 JS SPA | ✅ 相同思路，加朋友圈/日记 |
| 渠道 | 飞书/QQ/Web | 暂只做 Web |

---

## Verification Plan

### 链路测试（用 Echo 模型，无需 API Key）
1. 启动后端 → 启动前端 → 浏览器打开
2. 新建会话 → 选择 Echo 模型 → 发消息 → 收到流式回复
3. 切换会话 → 历史消息正确加载
4. 侧边栏导航 → 各页面可切换

### 真实模型测试
- 拿到 API Key 后填入 `.env`，重启后端即可
