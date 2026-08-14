# Yui Nook 框架与搭建思路

> 文档性质：内部技术架构说明  
> 最后更新：2026-08-14
> 这一份解释“为什么这样搭、模块怎么分、数据怎么流”。
> 只想看功能和待办时，去 `task.md`；不用每次都翻这本。

---

## Memory write gate - 2026-08-14

This section supersedes the automatic-write parts of the older memory policy below.

Automatic sources no longer write straight into `memories`:

```text
automatic extraction / idle-session summary
  -> write gate
  -> memory_candidate in cot_logs (30-day review window)
  -> promote or dismiss
  -> formal memory in memories
```

- `consciousness.memory_extraction.run_memory_extraction` and
  `conversation_summary._run_memory_summarizer` now stage candidates.
- The gate rejects tool output, model process text, filler, unsupported URLs,
  and repeated app/page actions paired with no response or a request to keep
  observing the reaction.
- Candidate creation deduplicates against formal memories and pending
  candidates for the same agent, and records source, reason, normalized text,
  and source message IDs.
- The existing `/api/consciousness/memory-candidates` panel lists candidates
  from every automatic source, not only `daily_loop`. Formal memory is created
  only by manual creation or candidate promotion.
- Existing formal memories are deliberately untouched; historical cleanup is a
  separate review task.

### Star map dependency

The first memory star-map front-end is now available in the memory service:
formal memories are nodes, node size uses importance and temperature, and
shared tags/categories create lightweight visual edges. Candidates stay in the
separate review list. Selecting a node exposes its existing edit/delete
actions. A later iteration may persist vector-similarity edges when the data
quality proves it is worth the additional backend model.

---

## Memory retrieval policy - 2026-04-29

这一段说明“记忆写入、关联、升温、召回”到底怎么运作，不只是摆几个参数。

### 1. 整体模型

长期记忆现在不是简单的“存进去、搜出来”。它分成两条链：

1. 写入链：新记忆入库后，顺手找出相关旧记忆，并让旧记忆升温。
2. 读取链：聊天构建 prompt 时，不只看向量相似度，还会混入温度和新鲜度。

核心目标是让系统像这样工作：

```text
用户说了新信息
  -> 后端判断值得记忆
  -> 写入 memories
  -> 生成新记忆 embedding
  -> 用 embedding 找相似旧记忆
  -> 命中的旧记忆 touch 升温
  -> 返回 new memory + related_memories

下次聊天需要记忆
  -> 当前消息生成查询
  -> 向量召回候选记忆
  -> similarity + temperature + recency 混合排序
  -> prompt_builder 按预算注入最该出现的记忆
```

所以它解决的是两件事：

- 新记忆写入时，自动知道它和哪些旧记忆有关。
- 旧记忆不是“用完就衰减”，而是“被用到就变热，长期不用自然变冷”。

### 2. 写入链路

当调用 `add_memory` 或 `POST /api/memories` 写入一条新记忆时，后端按这个顺序走：

1. 先把新记忆正常写进 `memories` 表。
2. 保留原来的异步流程，继续做 `compressed_content`、embedding backfill 等后台任务。
3. 如果当前 embedding 配置可用，立刻用新记忆文本生成一份 embedding。
4. 用这份 embedding 走 pgvector 相似度检索，查旧记忆。
5. 排除刚写进去的新记忆本身。
6. 只保留相似度超过 `MEMORY_RELATED_SIMILARITY_THRESHOLD` 的旧记忆。
7. 最多返回 `MEMORY_RELATED_TOP_K` 条，默认 top 3。
8. 对这些命中的旧记忆执行 touch 升温。
9. 接口返回新记忆和 `related_memories`。

这里有个重点：新记忆不会 touch 自己。升温只给“被新记忆关联到的旧记忆”。

返回结构示例：

```json
{
  "memory": {
    "id": "new_memory_id",
    "content": "她说最近在补 Supabase 后端记忆检索"
  },
  "related_memories": [
    {
      "id": "old_memory_id",
      "content": "她之前在做 pgvector 和 memory prompt 注入预算",
      "similarity": 0.83,
      "final_score": 0.71
    }
  ]
}
```

如果 embedding 没配好、embedding 请求失败、pgvector 没查到过阈值的旧记忆，写入仍然成功，只是：

```json
{
  "memory": { "...": "..." },
  "related_memories": []
}
```

### 3. 关联旧记忆

`related_memories` 不是随便凑三条。它必须同时满足：

- 是旧记忆，不是刚写入的新记忆。
- 和新记忆向量相似。
- 相似度超过阈值，默认 `0.7`。
- 同样遵守当前 agent 的记忆隔离。
- 过期的 ephemeral 记忆不会被当作有效候选。

这意味着如果只有一条够相关，就只返回一条。没有就返回空数组。不会为了好看硬塞三条，别搞假繁荣。

### 4. Touch 升温

被 `related_memories` 命中的旧记忆会被 touch。touch 做三件事：

- 更新 `last_touched_at`。
- 增加 `touch_count`。
- 增加 `temperature`。

升温不是无限加。默认温度上限是 `100`，越接近上限，实际涨幅越小：

```text
actual_delta = base_delta * (1 - current_temperature / MEMORY_TEMPERATURE_CAP)
```

默认基础涨幅按命中排名分配：

```text
top 1: +3
top 2: +2
top 3: +1
```

举例：

```text
旧记忆 A 当前 temperature = 10，top1 命中
actual_delta = 3 * (1 - 10 / 100) = 2.7
新 temperature = 12.7

旧记忆 B 当前 temperature = 90，top1 命中
actual_delta = 3 * (1 - 90 / 100) = 0.3
新 temperature = 90.3
```

所以冷记忆被重新想起时会明显升温；已经很热的记忆不会无限膨胀。

### 5. 读取链路

聊天构建 prompt 时，memory 召回不是“谁 similarity 高谁赢到底”。现在会先拿到一批候选，再重新计算混合分：

```text
final_score = similarity * (0.6 + 0.25 * temp_factor + 0.15 * recency_factor)
```

三个信号分别负责：

- `similarity`：这条记忆和当前问题像不像，仍然是主导。
- `temp_factor`：这条记忆最近是不是活跃，活跃就更容易浮上来。
- `recency_factor`：这条记忆是不是新记忆，新记忆短期有一点优势。

权重含义：

```text
0.6  similarity 基础权重
0.25 temperature 活跃度加成
0.15 recency 新鲜度加成
```

也就是说，相似度差太远的记忆不会靠温度硬挤上来；但两条记忆相似度接近时，近期被反复关联、或者刚创建的那条，会更容易进入 prompt。

### 6. 温度因子

`temp_factor` 来自 `temperature`，但不是直接拿数据库里的温度裸用。

计算逻辑是：

1. 先把 `temperature` 按 `MEMORY_TEMPERATURE_CAP` 归一化到 `0~1`。
2. 再看 `last_touched_at` 距离现在多久。
3. 时间越久，温度影响越弱。
4. 默认半衰期是 `MEMORY_TEMPERATURE_HALF_LIFE_DAYS = 30`。

简单理解：

```text
刚被 touch 的高温记忆：temp_factor 高
很久没被 touch 的高温记忆：temp_factor 会慢慢掉
从没被 touch 的普通记忆：temp_factor 低
```

这里的“冷却”不是定时批量改数据库。它是在排序时动态计算的。数据库里的 `temperature` 可以还在，但如果 `last_touched_at` 很久以前，排序时它的有效温度会变低。

### 7. 新鲜度因子

`recency_factor` 来自 `created_at`。

它的作用是防止老高温记忆长期霸榜，让新记忆刚写入后有一段短期曝光机会。

计算方式是平滑衰减，不是硬档位：

```text
刚创建：recency_factor 接近 1
时间变久：recency_factor 平滑下降
很旧：recency_factor 接近 0
```

默认半衰期是：

```env
MEMORY_RECENCY_HALF_LIFE_DAYS=14
```

没有“7 天一档、30 天一档”这种粗暴规则。它是连续下降。

### 8. 为什么不用“被用就衰减”

当前策略明确不是：

```text
记忆被用越多 -> weight 越低 -> 越快退役
```

我们采用的是：

```text
记忆被用到 -> 升温
长期不用 -> 自然冷却
冷了也不删 -> 只是排序靠后
```

这样更适合轻陪伴场景。常被提起的东西本来就该更容易被想起；不用的东西慢慢沉下去就行，不需要惩罚。

### 9. 失败回退

这套增强不能影响主写入和主聊天。

失败策略如下：

- 新记忆入库成功，但 embedding 失败：记忆保留，`related_memories = []`。
- pgvector 查询失败：记忆保留，`related_memories = []`。
- touch 某条旧记忆失败：不回滚新记忆。
- final_score 缺字段：对应因子按安全默认值计算。
- 没有 `agent_id`：走现有 fallback agent 策略，不扩大成全库乱读。

一句话：关联和升温是增强，不是主链路炸弹。

### 10. 验证方式

可以用下面的方式确认它真的在跑：

1. 写入一条和旧记忆明显相关的新记忆。
2. 看 `POST /api/memories` 返回里有没有 `related_memories`。
3. 查看命中的旧记忆，确认 `temperature` 上升。
4. 查看命中的旧记忆，确认 `last_touched_at` 更新。
5. 用相似问题触发 memory retrieval，确认返回结果里有 `similarity`、`final_score`、`temp_factor`、`recency_factor`。
6. 对比两条相似度接近的记忆，温度高或更新的记忆应该更容易排前。

如果 `related_memories` 一直为空，优先检查：

- embedding provider 是否配置。
- `memories.embedding` 是否有值。
- pgvector RPC / index 是否已创建。
- 相似度阈值是否太高。
- 当前 `agent_id` 下是否真的有旧记忆。

### 11. Config knobs

```env
MEMORY_RELATED_SIMILARITY_THRESHOLD=0.7
MEMORY_RELATED_TOP_K=3
MEMORY_TEMPERATURE_CAP=100
MEMORY_TEMPERATURE_HALF_LIFE_DAYS=30
MEMORY_RECENCY_HALF_LIFE_DAYS=14
```

## 1. 核心结论

现在网关层必须按下面这个结构理解，别再把“意识循环”“主动消息”“事件注入”混成一个东西。

系统分为两大域：

1. 聊天主链
2. 意识侧三层

完整结构如下：

- `chat_mainline`
- `event_gate`
- `proactive_gate`
- `daily_loop`

其中真正属于“意识侧三层”的是：

- 被动唤醒 / 事件注入
- 主动消息检查 / 随机唤醒
- 意识循环 / 日循环整理

---

## 2. 分层架构

## Layer 1. Frontend / Transport

职责：

- 前端发起 HTTP 请求
- 接收 SSE 流
- 把用户输入、外部事件、页面动作送到后端

当前通信方式：

- REST：控制类接口
- SSE：聊天流式输出

主要特征：

- `thinking`
- `message`
- `tool_call`

这些事件通道属于聊天主链输出，不属于意识侧三层本身。

---

## Layer 2. Routing / Runtime

职责：

- 根据任务类型选择模型槽位
- 分发到对应 provider
- 统一处理 adapter 调用

当前默认模型槽位口径：

- `chat`
- `summary`
- `vision`
- `translate`
- `consciousness`
- `voice`

这里要注意：

- 聊天主链优先走 `chat`
- 主动消息检查、日循环整理这类意识任务优先走 `consciousness` 或 `summary`
- 不是所有任务都该拿大模型直接硬跑

---

## Layer 3. Data / Memory

后端数据中心当前以 Supabase 为主。

核心表包括：

- `sessions`
- `messages`
- `memories`
- `memory_logs`
- `context_summaries`
- `companion_state`
- `proactive_messages`
- `app_settings`
- `rp_rooms`
- `rp_messages`

这一层提供的，不只是存储。

它还提供：

- 聊天历史
- companion_state 快照
- 长期记忆检索
- 主动消息记录
- RP 房间与消息线程

---

## Layer 4. Prompt / Orchestration

职责：

- 组装聊天 prompt
- 组装总结 prompt
- 组装意识任务 prompt
- 注入记忆、summary、recent activity

这里是“任务被组织起来”的地方。

后续如果要继续收口，推荐把这些读取逻辑往统一 resolver 靠：

- 当前显式设置
- agent_settings
- ai_settings.defaultModels / defaultPrompts
- 系统默认值

---

## Layer 5. Background Cognition

这一层就是意识侧。

它不是单循环，而是三层结构。

### 5.1 event_gate

定位：

- 外部事件进入系统后的第一层判断器

事件来源：

- iOS 快捷指令
- 上传照片
- 发动态
- 打开某个 App
- 外部 webhook

处理逻辑：

- 先给小模型
- 判断：
  - 值不值得处理
  - 要不要通知大模型
  - 还是静默丢掉

输出建议：

```json
{
  "should_handle": true,
  "should_notify_llm": false,
  "reason": "普通事件，无需回应",
  "message_hint": ""
}
```

这一层不是聊天，不保证说话。

### 5.2 proactive_gate

定位：

- 定时检查“要不要主动说话”

输入：

- `companion_state`
- `summary`
- `recent activity`
- `cooldown`
- 最近用户消息时间
- 最近主动消息时间

流程：

1. 小模型先扫状态
2. 输出轻报告
3. 只有需要说话时才交给大模型生成正文

输出建议：

```json
{
  "should_proactive": true,
  "reason": "存在未闭合话题且沉默时间足够长",
  "message_hint": "可以轻轻接上次的话题"
}
```

### 5.3 daily_loop

定位：

- 低频深整理，不负责高频互动

小模型先做：

- 清 `ephemeral`
- 整理 `recent activity`
- 汇总 memory 候选
- 生成 state snapshot
- 更新 companion_state summary

然后再决定要不要把整理结果交给大模型去写：

- diary
- 更完整总结
- 更深层状态文本

频率建议：

- 一天一次

---

## 3. 四块主链路怎么分

## A. 聊天主链

入口：

- `POST /api/chat`

规则：

- 用户发消息
- 大模型直连
- 无条件回复

这条链不需要先小模型判。

## B. 被动唤醒

入口形态：

- 事件注入接口
- 前端动作上报
- 外部 webhook

规则：

- 小模型先筛
- 不值得就静默
- 值得才继续

## C. 主动消息检查

入口形态：

- 定时任务
- 手动 trigger

规则：

- 小模型先判断要不要说
- 大模型只负责成文

## D. 日循环整理

入口形态：

- 定时任务
- 手动 trigger

规则：

- 小模型先整理
- 大模型只在需要时做深输出

---

## 4. 为什么这样分

因为四件事根本不是一回事：

- 聊天：一定得回
- 事件：不一定值得理
- 主动消息：不一定该发
- 日循环：不一定要写长文

所以必须是：

- 聊天直上大模型
- 其余三层先走小模型筛选 / 整理

这既省 token，也省噪音。

不然系统迟早变成一个逮着什么都乱说的话痨。

---

## 5. 当前推荐调度频率

### chat_mainline

- 实时

### event_gate

- 事件触发即跑

### proactive_gate

- 30 分钟到 2 小时一次

### daily_loop

- 1 天 1 次

---

## 6. 当前实施顺序

推荐顺序：

1. 先把 `daily_loop` 跑稳
2. 再补 `proactive_gate`
3. 最后接 `event_gate`

原因：

- `daily_loop` 最收敛
- `proactive_gate` 只是消费状态
- `event_gate` 入口最多，最容易做散

---

## 7. 对现有模块的要求

### 聊天模块

- 继续保持大模型直连
- 不受意识侧三层影响

### companion_state

- 继续作为状态快照中心
- 给 `proactive_gate` 和 `daily_loop` 提供输入

### memories

- 继续作为长期沉淀
- 不和 `companion_state` 混成一锅

### proactive_messages

- 继续作为主动消息输出记录
- 不要被误用成所有后台事件日志

---

## 8. 后续新增功能该挂哪层

以后有新需求时，先按这个表判断：

| 需求类型 | 应挂层 |
|---|---|
| 用户发来聊天 | `chat_mainline` |
| 上传照片 / 打开 App / 发动态 | `event_gate` |
| AI 要不要主动来一句 | `proactive_gate` |
| 写 diary / 清 ephemeral / 更新状态快照 | `daily_loop` |

别乱塞。

乱塞的后果你已经见过了，就是后来自己都说不清系统到底在干嘛。
## Media Storage Boundary - 2026-05-05

Gateway media storage is split deliberately:

- File bodies live in Cloudflare R2.
- Supabase/SQLite stores only metadata in `media_items`.
- The database record keeps `storage_key`, optional `cover_key`, media type, title/artist/album/author, mime type, size, duration, and metadata.
- Uploads use presigned R2 URLs. The frontend asks the gateway for an upload URL, uploads directly to R2, then saves metadata through the gateway.
- Reads use temporary R2 URLs. The frontend lists `media_items`, then asks the gateway for a short-lived URL before playback or reading.
- `agent_id` still follows the existing agent system. Explicit `agent_id` must exist; missing `agent_id` is resolved by backend agent context.
- Do not route large files through Supabase rows or gateway database columns.

Operational reference: `backend/README_MEDIA.md`.
