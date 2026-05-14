# Yui Nook 任务流程计划表

> 最后更新：2026-05-14
> 当前口径：聊天主链独立；意识侧拆为被动唤醒 / 主动消息检查 / 日循环整理三层；记忆提取已接入第三阶段。

## 当前主线

| 模块 | 当前状态 | 已完成 | 下一步 |
| --- | --- | --- | --- |
| 聊天主链 | ✅ 可用，持续稳定化 | 真实 session、发送、重试、基础模型参数链路已接；联系人 Supabase 同步、is_self 去重修复 | 收尾检查 thinking/reasoning 的 provider 差异，尤其 Qwen 输出清洗 |
| RP 模式 | ⚠️ 最小可用推进中 | RP 房间、房间消息、独立线程已建 | 完成 RP 幕布/暗色聊天样式和入梦跳转细节；RP prompt cache 隔离 |
| 记忆系统 | ✅ 后端完整 | temperature、last_touched_at、touch_count、温度排序；记忆提取（10 标签体系）已作为意识循环 Phase 3 运行 | 前端记忆面板补"最新 / 最重要 / 有温度"切换；memory candidate → 正式 memory 的自动升格 |
| companion_state | ✅ 基础读写已接 | 资料页可读状态 summary，状态表字段已明确；consciousness snapshot 已定期写入 | 跑稳"30 分钟无新消息后总结检查"，补自动写入链观察日志 |
| activity_events | ✅ 后端事件门已接 | 表、POST、recent 查询、5 分钟去重、event_gate 小模型筛选；consciousness/proactive/daily_loop 优先读取 gate 相关事件；iOS 快捷指令模板文档已补 | **在手机快捷指令里真实配置上报**；观察筛选结果，再做前端活动日志展示 |
| proactive 主动消息 | ✅ 小模型轻报告已接入 | recent activity 已作为短期上下文；`should_proactive / reason / message_hint` gate 已接；三档风格（restrained/normal/clingy）已接 | 用真实数据观察拒绝率和误触发，必要时调 prompt |
| consciousness 日循环 | ✅ 三阶段全接 | Phase 1 housekeeping → Phase 2 snapshot → **Phase 3 记忆提取**；Phase 3 使用 10 标签体系、检查点去重、直接写入 memory 表 | 观察真实提取质量；memory candidate → 正式 memory 自动升格流程待定 |
| Glean 拾遗（统一收件箱） | ✅ 已落地 | extracted_items 表、CRUD 端点、AI 工具 create_extracted_item；前端 InboxApp 管理页；DI（Dynamic Island）接入 | 后端重启后验证线上；观察 AI 实际抓取质量 |
| 设置页 / 恋爱组件 | ✅ 已重写 | SettingsLoveApp 替换旧 settings-app.js；Stage-Atelier 设计风格；主题色/字体/壁纸写入 phone state；AI 情话设置写入 Supabase | 伴侣信息（姓名/纪念日）编辑功能接线 |
| MCP 工具库 | ⚠️ 雏形可用 | 工具清单展示、快捷分类基础可用；活动日志统一只读接口已预留 cot/tool 日志 | 收口为"主动有用工具"，补中文名和真实调用日志 |
| 默认模型槽位 | ✅ 后端消费链已推进 | chat / summary / vision / translate / consciousness / voice 口径已定 | 补前端保存后的真实校验、移除旧 title/ocr 残留 |
| Folio 阅读器 | ✅ 翻页修复 | CSS position 修复（absolute inset-0）解决 clientHeight = scrollHeight 导致无法翻页；点按左右分区导航 | 大文件迁移 R2（LocalStorage 仍是主存储） |
| Perle 相册 | ✅ 基础可用 | 改名/标签保存修复（touch event 冲突）；media upload/list 端点已接 | 完善标签筛选和批量操作 |
| 前端 UI | ⚠️ 持续修补 | 聊天/设置/RP/Folio/Perle 多处修复；picsum 外链头像替换为纯 CSS 头像 | 不大改，优先修阻断交互和乱码，再补局部质感 |
| Prompt Cache 重构 | ❌ 计划中 | 方案已文档化（fixed/summary/history/dynamic 四区块） | 代码仍是单体 system prompt，Phase 1 重构待启动 |

## 意识侧三层进度

| 层级 | 定位 | 状态 | 备注 |
| --- | --- | --- | --- |
| 被动唤醒 / 事件注入 | 外部事件进入后先轻判断 | ✅ 已落地 | activity_events 存储、去重、event_gate 筛选，并被后续读取消费 |
| 主动消息检查 / 随机唤醒 | 定时判断要不要主动说话 | ✅ 已接 | 小模型轻报告，读取 companion_state、recent activity、cooldown；三档风格已生效 |
| 意识循环 / 日循环整理 | 低频整理、沉淀、写状态快照 | ✅ Phase 1-3 均已接 | Phase 3 记忆提取 = 10 标签 + 检查点 + hash 去重 → 直接写 memory 表 |

## 待做清单（优先级排序）

1. 📱 **iOS 快捷指令真实配置** — 在手机快捷指令里配置 `/api/activity-events` 上报，观察 event_gate 效果
2. 🔍 **真实数据观察** — proactive_gate 拒绝率、daily_loop 草稿质量、Phase 3 提取质量
3. 📝 **memory candidate 升格** — daily_loop 的 cot_log 候选如何自动或手动转为正式 memory
4. 💾 **Folio R2 迁移** — 大文件从 LocalStorage 迁移到 R2，前端切换
5. 🎨 **Prompt Cache Phase 1** — 拆分 system prompt 为 fixed / summary / history / dynamic 四区块
6. 🔗 **设置页伴侣信息接线** — 左右姓名、开始日期、纪念日真实保存
7. 📊 **Activity log 前端展示** — 活动日志和筛选分类的前端面板
