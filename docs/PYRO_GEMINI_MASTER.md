# Pyro-Gemini | 项目总控文档

> 最后更新：2026-05-01  
> 数据后端：Supabase（Cloud PostgreSQL）

---

## 0. 当前最新状态 - 2026-05-01

- 聊天主链：真实 session 链路已通，继续收 provider 差异和 Qwen 清洗。
- 记忆系统：temperature / last_touched_at / touch_count 已接入，支持按温度排序。
- 被动唤醒：`activity_events` 已接，`event_gate` 会对新事件做小模型筛选并回写结果；后续读取优先消费 gate 判定相关的事件。
- 主动消息：`proactive_gate` 已接，先由小模型判断 `should_proactive / reason / message_hint`。
- 日循环：`daily_loop` 安全二阶段已接，可手动生成报告；仅在模型明确判断时写 private diary 草稿和 cot memory_candidate 候选日志，不直接写正式 memory。
- 活动日志：已有统一只读接口 `/api/activity-log/recent`，前端 COT 日志页已开始读取真实数据。
- 默认模型槽位：后端消费口径已收为 chat / summary / vision / translate / consciousness / voice。

---

## 13. Memory retrieval enhancement - 2026-04-29

This backend now uses memory association + temperature + recency as the current memory retrieval policy.

Implemented behavior:

- New memory writes generate an embedding immediately when embedding config is available.
- After writing a new memory, the backend searches old memories by vector similarity and returns `related_memories`.
- `related_memories` only includes old memories above `MEMORY_RELATED_SIMILARITY_THRESHOLD` and never includes the new memory itself.
- Related old memories are touched automatically.
- Touching increases `temperature`, updates `last_touched_at`, and increments `touch_count`.
- Touch warming is capped by `MEMORY_TEMPERATURE_CAP` and uses diminishing gain near the cap.
- Semantic retrieval now ranks by:

```text
final_score = similarity * (0.6 + 0.25 * temp_factor + 0.15 * recency_factor)
```

- `temp_factor` uses naturally cooled effective temperature, based on `last_touched_at`.
- `recency_factor` uses smooth time decay from `created_at`.
- The active policy is "used memories warm up + unused memories naturally cool down".
- The system does not use "used memories decay faster" and does not delete cold memories.

Config knobs:

- `MEMORY_RELATED_SIMILARITY_THRESHOLD`, default `0.7`
- `MEMORY_RELATED_TOP_K`, default `3`
- `MEMORY_TEMPERATURE_CAP`, default `100`
- `MEMORY_TEMPERATURE_HALF_LIFE_DAYS`, default `30`
- `MEMORY_RECENCY_HALF_LIFE_DAYS`, default `14`

---

## 1. 当前总状态

- [x] 聊天主链：已通
- [x] Supabase 持久化：已通
- [x] Session / SSE / MCP 基础链路：已通
- [x] 记忆系统温度机制：后端已接入，前端展示待继续补
- [~] companion_state 总结链：基础读写已接，自动总结仍需跑稳
- [~] 意识侧三层结构：event_gate / proactive_gate / daily_loop 均有入口，沉淀链未自动落笔
- [~] 前端移动端 UI：持续迭代中

---

## 2. 项目结构一句话

这个项目现在的核心，不再是“一个单聊天页”。

它是：

- 一个以聊天为主入口的陪伴系统
- 一个以 Supabase 为中心的数据后端
- 一个逐步拆分为“聊天主链 + 意识侧三层”的运行架构

---

## 3. 当前统一架构口径

## A. 聊天主链

定位：

- 用户发消息
- 大模型直接回复
- 无条件响应

规则：

- 不经过小模型判断
- 不做值不值得回复的筛选
- 日常聊天与 RP 聊天都属于这一层

---

## B. 被动唤醒 / 事件注入

定位：

- 外部事件进入系统后的第一层网关

事件来源示例：

- iOS 快捷指令
- 上传照片
- 发动态 / 朋友圈
- 打开某个 App
- Telegram / 外部 webhook

规则：

- 先交给小模型判断
- 判断这件事值不值得继续处理
- 判断要不要通知大模型
- 不值得就静默丢弃

这层不是聊天，不必每次说话。

---

## C. 主动消息检查 / 随机唤醒

定位：

- 定时轻量扫描状态
- 判断现在要不要主动说话

输入：

- summary
- recent activity
- cooldown
- companion_state
- 最近聊天时间
- 最近主动消息时间

规则：

- 先由小模型输出轻报告
- 只有 `should_proactive=true` 时才叫大模型生成真正消息

这层是“要不要说”，不是“直接说”。

---

## D. 意识循环 / 日循环整理

定位：

- 低频、重整理、偏沉淀

小模型先做：

- 清理 ephemeral
- 整理 recent activity
- 汇总 memory 候选
- 生成状态快照
- 更新 companion_state summary

然后再决定要不要把整理结果交给大模型：

- 写 diary
- 写更完整总结
- 做更深层整理输出

这层不是高频巡逻，一天一次就够。

---

## 4. 为什么要这样拆

因为聊天一定要回。

但：

- 被动事件不一定值得回应
- 主动消息不一定每次都要发
- 意识循环不一定每次都要写大段

所以必须拆成：

- 聊天：大模型直上
- 其余三层：先小模型筛，再决定是否叫大模型

这不是花活，是省 token，也是防止系统越来越吵。

---

## 5. 当前数据中心

当前核心表：

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

### 重点说明

#### sessions

- 已支持 `source_app`
- 可区分 `yui_nook / telegram / claude_mcp / other_frontend`

#### memories

- 已增加温度机制字段：
  - `temperature`
  - `last_touched_at`
  - `touch_count`

#### companion_state

现在承担：

- 当前状态快照
- 最近话题
- 关系进展摘要
- 印象摘要
- 喜好摘要

后续会继续作为主动消息检查和日循环整理的主要输入之一。

---

## 6. 目前已明确的后端消费规则

### 默认模型槽位

当前全局默认模型口径：

- `chat`
- `summary`
- `vision`
- `translate`
- `consciousness`
- `voice`

已停用：

- `title`

兼容规则：

- 旧 `ocr` 兼容映射到 `vision`
- `title` 可保留存量数据，但后端不再消费

---

## 7. 记忆系统当前口径

### companion_state 和 memory 分工

#### companion_state

- 偏当前 / 短中期状态
- 更新频率可以更高
- 给主动消息检查直接用

#### memory

- 偏长期沉淀
- 只保留稳定偏好、关键事件、核心印象
- 不能和 state 一样频繁写入

### 温度机制

记忆已支持“温度”概念：

- 被检索命中：轻 touch
- 真正注入 prompt：强 touch

用于后续：

- 按温度排序
- 识别“最近常被提起、仍然活着”的记忆

---

## 8. 当前意识侧实现阶段

### 已确定

- 聊天主链永远直连大模型
- 被动唤醒先小模型筛
- 主动消息先小模型判
- 日循环先小模型整理

### 仍在推进

- 被动事件入口统一化
- 主动消息检查稳定调度
- 日循环整理与 diary / summary 联动
- companion_state 自动总结链彻底跑稳

---

## 9. 建议实施顺序

按优先级：

1. 跑稳 `daily_loop`
2. 补齐 `proactive_gate`
3. 最后接 `event_gate`

原因很简单：

- 日循环边界最清楚
- 主动消息只是消费 state
- 事件注入来源最散，最容易烂尾

---

## 10. 前端当前定位

前端不是只画 UI。

它现在已经承担：

- 会话创建与真实 session 对齐
- 联系人 / RP 房间入口
- AI 设置页
- MCP 工具展示入口
- companion_state / memory / consciousness 只读入口

但：

- 活动日志还没彻底打通真实后端流
- MCP 调用日志还没做统一展示
- 意识侧很多入口还在“可看，不够全自动”的阶段

---

## 11. 近期明确不做的事

当前先不做：

- title 全局模型恢复
- voice 统一纳入 MCP tool registry
- 复杂 agent 生命周期引擎
- memory touch 独立历史事件表
- 活动日志全面 UI 重构
- 大规模 CSS 重写

先把主链和意识侧分层跑稳，别到处撒。

---

## 14. Activity events 接入状态 - 2026-05-01

`activity_events` 后端最小可用版已完成。

已落地：

- 新增 `activity_events` 短期活动流表。
- 支持 SQLite schema 和 Supabase schema。
- 新增 `POST /api/activity-events`，供 iOS 快捷指令 / web / manual 上报。
- 新增 `GET /api/activity-events/recent`，用于调试和后续前端展示。
- 5 分钟内同类事件按 `event_type + event_value + content` 去重。
- consciousness snapshot 会读取近 6 小时 recent activity。
- proactive check 会把 recent activity 作为短期上下文参与主动消息判断。
- activity_events 默认不写 memory，不改 companion_state 长期字段，不直接注入主聊天 prompt。

当前边界：

- 这只是被动唤醒 / 事件注入的第一阶段。
- 它现在提供“最近在干嘛”的短期信号。
- 是否写 diary / memory，后续交给 daily_loop 或 summary 判断。

下一步：

1. 给 iOS 快捷指令配置真实 POST 上报。
2. 观察 proactive_gate 小模型轻报告的真实拒绝率和误触发。
3. 再做前端活动日志展示。

### Proactive gate 更新 - 2026-05-01

`proactive_gate` 已从纯规则挑上下文，改成两段式：

1. 后端先组装候选上下文：open loop / important memory / recent activity / presence gap。
2. consciousness 槽位的小模型先输出轻报告：
   - `should_proactive`
   - `reason`
   - `message_hint`
   - `selected_source`
3. 只有 `should_proactive=true` 时，才继续调用大模型生成真正主动消息。
4. 如果轻报告模型不可用，会保留旧规则作为兜底，避免系统直接哑掉。

---

### Daily loop 安全二阶段 - 2026-05-01

`daily_loop` 已补成后端可手动触发的整理报告，并接入安全二阶段写入。

写入边界：

- `should_write_diary=true` 且有 `diary_candidate` 时，写入 private diary 草稿。
- `should_write_memory=true` 且有 `memory_candidates` 时，只写入 `cot_logs` 的 `memory_candidate` 候选日志。
- 不直接写正式 `memories`。
- 同内容用 digest 去重，避免手动重复触发时刷屏。

接口：

- `POST /api/consciousness/daily-loop/trigger`
- `GET /api/consciousness/daily-loop/latest`

读取上下文：

- `companion_state`
- 近 24 小时 `activity_events`
- 当前 agent 的高温记忆
- 最近主动消息

输出报告包含：

- `summary`
- `activity_digest`
- `state_digest`
- `should_write_diary`
- `diary_candidate`
- `should_write_memory`
- `memory_candidates`
- `reason`

当前边界：

- 不自动写 diary。
- 不自动写 memory。
- 模型失败时保存 fallback 报告，不推进沉淀链路。

下一步：

- 用真实 activity 跑几轮，调小模型判断口径。
- 再接 diary / memory 的二阶段写入。

---

## 12. 现在这份文档约束什么

### Event gate 更新 - 2026-05-01

`activity_events` 现在不只是存事件，还会在新事件写入后跑一层轻量筛选。

新增字段：

- `gate_status`
- `gate_should_handle`
- `gate_should_notify_llm`
- `gate_message_hint`
- `gate_reason`
- `screened_at`

链路：

1. `POST /api/activity-events` 写入事件。
2. 5 分钟内重复事件 dedupe，不重复筛选。
3. 新事件调用 consciousness 槽位的小模型做 `event_gate` 判断。
4. 判断结果回写到同一条 `activity_events`。
5. 不写 diary，不写 memory，不直接发 proactive message。

返回会包含：

- `gate.should_handle`
- `gate.should_notify_llm`
- `gate.reason`
- `gate.message_hint`

Supabase 补充 SQL：

- `backend/scripts/20260501_01_activity_event_gate.sql`

---

以后再加后台能力，先问自己它属于哪层：

- 聊天必回：`chat_mainline`
- 外部事件注入：`event_gate`
- 主动说不说话：`proactive_gate`
- 整理沉淀写日记：`daily_loop`

不要再把它们全塞进一个“意识循环”黑盒里。

那种写法省事一时，后面全是屎。
## 2026-05-05 Media storage update

- External media storage now uses Cloudflare R2.
- Books, music, covers, images, and other original files are stored as R2 objects.
- Supabase/SQLite only stores metadata in `media_items`, including `storage_provider`, `storage_key`, optional `cover_key`, mime type, size, duration, and descriptive fields.
- Backend upload flow is presigned URL based: `POST /api/media/upload-url` -> direct `PUT` to R2 -> `POST /api/media/items`.
- Backend read flow is temporary URL based: `GET /api/media/items` -> `GET /api/media/items/{id}/url`.
- Do not store large media file bodies in Supabase tables.
- Detailed backend doc: `backend/README_MEDIA.md`.
