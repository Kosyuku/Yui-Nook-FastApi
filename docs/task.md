# Yui Nook 任务流程计划表

> 最后更新：2026-05-01
> 当前口径：聊天主链独立；意识侧拆为被动唤醒 / 主动消息检查 / 日循环整理三层。

## 当前主线

| 模块 | 当前状态 | 已完成 | 下一步 |
| --- | --- | --- | --- |
| 聊天主链 | 可用，继续稳定化 | 真实 session、发送、重试、基础模型参数链路已接 | 收尾检查 thinking/reasoning 的 provider 差异，尤其 Qwen 输出清洗 |
| RP 模式 | 最小可用推进中 | RP 房间、房间消息、独立线程已建 | 完成 RP 幕布/暗色聊天样式和入梦跳转细节 |
| 记忆系统 | 后端增强完成一轮 | temperature、last_touched_at、touch_count、温度排序能力已接 | 前端记忆面板补“最新 / 最重要 / 有温度”切换和温度显示 |
| companion_state | 基础读写已接 | 资料页可读状态 summary，状态表字段已明确 | 跑稳“30 分钟无新消息后总结检查”，补自动写入链观察日志 |
| activity_events | 后端事件门已接 | 表、POST、recent 查询、5 分钟去重、event_gate 小模型筛选；consciousness/proactive/daily_loop 优先读取 gate 相关事件；iOS 快捷指令模板文档已补 | 在手机快捷指令里真实配置上报；观察筛选结果，再做前端活动日志展示 |
| proactive 主动消息 | 小模型轻报告已接入 | recent activity 已作为短期上下文；`should_proactive / reason / message_hint` gate 已接 | 后续跑真实数据观察拒绝率和误触发，必要时调 prompt |
| consciousness 日循环 | 安全二阶段已接 | 可手动触发 daily_loop，读取上下文生成报告；若明确需要，会写 private diary 草稿和 cot memory_candidate 候选日志 | 观察真实报告质量；暂不把候选直接写进正式 memory |
| MCP 工具库 | 后端/前端入口已有雏形 | 工具清单展示、快捷分类基础可用；活动日志统一只读接口已预留 cot/tool 日志 | 收口为“主动有用工具”，补中文名和真实调用日志 |
| 默认模型槽位 | 后端消费链已推进 | chat / summary / vision / translate / consciousness / voice 口径已定 | 补前端保存后的真实校验、移除旧 title/ocr 残留 |
| 前端 UI | 持续修补 | 聊天 / 设置 / 朋友圈 / RP 多处已调 | 不大改，优先修阻断交互和乱码，再补局部质感 |

## 意识侧三层进度

| 层级 | 定位 | 状态 | 备注 |
| --- | --- | --- | --- |
| 被动唤醒 / 事件注入 | 外部事件进入后先轻判断 | 第一阶段已落地 activity_events 存储、去重、event_gate 筛选，并被后续读取消费 | 目前只存短期活动流和 gate 结果，不直接写 memory |
| 主动消息检查 / 随机唤醒 | 定时判断要不要主动说话 | 已接小模型轻报告，读取 companion_state、recent activity、cooldown | 下一步用真实数据调拒绝率和误触发 |
| 意识循环 / 日循环整理 | 低频整理、沉淀、写状态快照 | 已有 snapshot 基础，daily_loop 报告接口已接 | 后续决定是否写 diary / memory，不能每条活动都沉淀 |

## 下一步建议

1. 在手机快捷指令里真实配置 `/api/activity-events` 上报。
2. 用真实数据观察 `event_gate` / `proactive_gate` 的拒绝率和误触发，必要时调 prompt。
3. 手动跑 `/api/consciousness/daily-loop/trigger` 看草稿/候选质量。
4. 继续收 activity log 前端细节和筛选分类。
