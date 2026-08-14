# Yui Nook 功能总览与待办

> 最后更新：2026-08-14
> 给自己看的简要版：这里看“现在已经有什么、这一轮改了什么、接下来做什么”。
> 想看系统为什么这样搭、数据怎么流，去 `gateway_technical_architecture.md`。

## 当前主线

| 模块 | 当前状态 | 已完成 | 下一步 |
| --- | --- | --- | --- |
| 聊天主链 | ✅ 稳定 | 真实 session、发送、重试、provider fallback；联系人 Supabase 同步、is_self 去重修复 | 观察 Qwen 等 provider 的 thinking 输出清洗 |
| RP 模式 | ⚠️ 最小可用 | RP 房间、消息、独立线程；Prompt Cache RP 路径已接 | RP prompt cache 隔离（rp_room_id 独立分区）|
| 记忆系统 | ✅ 写入链收紧 | temperature/touch/importance 排序；自动提取与空闲总结统一写入候选；候选升格 API + 前端；面板排序/热度显示 | 观察候选质量；清理历史低价值重复记忆；为星图补关系数据 |
| companion_state | ✅ 基础完整 | 状态读写、consciousness snapshot 定期写入 | 自动写入链观察日志 |
| activity_events | ✅ 后端完整 | 表、POST、去重、event_gate 筛选；iOS 快捷指令文档已备 | **手机上真实配置快捷指令上报** |
| proactive 主动消息 | ✅ 稳定运行 | 三档风格（restrained/normal/clingy）；小模型轻报告 gate | 用真实数据调 prompt，观察误触发率 |
| consciousness 日循环 | ✅ 三阶段全接 | Phase 1 housekeeping → Phase 2 snapshot → Phase 3 记忆候选提取 | 观察提取质量；Phase 3 checkpoint 与候选去重机制确保不重复 |
| Prompt Cache | ✅ 完整 | Fixed/Summary/History A/B/Dynamic 分块；`build_chat_prompt` + `build_rp_prompt` 已接入路由；`fixed_block_hash` debug；OpenAI 自动前缀缓存；Anthropic native `cache_control` 标记 + `AnthropicNativeAdapter`；对话分区写入开启（`CONVERSATION_PARTITIONS_ENABLED=true`）| 等数据积累后开 `CONVERSATION_PARTITIONS_READ_ENABLED=true` |
| Glean 拾遗 | ✅ 已落地 | extracted_items 表、CRUD 端点、AI 工具；前端 InboxApp；DI 接入 | 观察 AI 实际抓取质量 |
| 设置页 / 恋爱组件 | ✅ 完整 | Stage-Atelier 设计；组件样式/尺寸/AI 情话/文字 tab；伴侣信息（姓名/日期/头像）编辑并同步 Supabase；盖章保存接后端 (`/api/phone/state/love_widget_config`)；主题色/字体/壁纸写 phone state | 伴侣头像改为真实上传（已预留图片选择入口）|
| Folio 阅读器 | ✅ 完整 | 翻页修复（CSS position）；R2 上传（新导入）；R2 迁移（存量本地书一键同步到云端） | 大文件夹竞品：epub 解析支持 |
| Perle 相册 | ✅ 基础可用 | 改名/标签修复（touch event 冲突）；media upload/list 端点 | 批量操作、标签筛选 |
| 前端 UI | ⚠️ 持续修补 | 聊天/设置/RP/Folio/Perle 各处修复；外链头像替换为纯 CSS；记忆库已加入列表/星图切换 | 观察星图关系质量；不大改其余页面 |
| MCP 工具库 | ⚠️ 雏形 | 工具清单展示；cot_log 只读接口预留 | 收口为"主动有用工具"，补真实调用日志 |

## 意识侧三层进度

| 层级 | 定位 | 状态 | 备注 |
| --- | --- | --- | --- |
| 被动唤醒 / 事件注入 | 外部事件进入后先轻判断 | ✅ 完整 | activity_events + event_gate + 5 分钟去重；iOS 快捷指令端点就绪 |
| 主动消息检查 | 定时判断要不要主动说话 | ✅ 运行中 | 三档风格；presence_gap 触发；cooldown 保护 |
| 意识循环 / 日循环 | 低频整理 + 记忆提取 | ✅ 三阶段全接 | Phase 3 = 10 标签体系，checkpoint 去重，先写 memory candidate，人工采纳后才进入正式 memory 表 |

## 待做 / 观察清单（当前无 blockers）

1. ⏳ **开启分区读取** — 聊几轮后改 `.env` → `CONVERSATION_PARTITIONS_READ_ENABLED=true` 重启后端
2. 📱 **iOS 快捷指令真实配置** — 手机上接 `/api/activity-events`，端点就绪
3. 🔍 **真实数据调参** — proactive_gate 拒绝率、daily_loop 草稿质量、自动记忆候选质量；重点观察“重复行为 / 未回应 / 待观察”是否被拦下
4. 📊 **Activity log 前端** — 活动日志和筛选分类的前端展示面板（可选）
5. ✨ **记忆星图前端** — 第一版已完成：正式记忆为节点，按共同标签/分类连线，可查看/编辑/删除；后续再评估是否把向量关系持久化为边，候选保持独立审核
