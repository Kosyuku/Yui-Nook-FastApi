# iOS 快捷指令上报 activity_events

> 最后更新：2026-05-01

这个文档只负责把手机事件打进后端短期活动流。

当前链路：

1. iOS 快捷指令 POST 到 `/api/activity-events`
2. 后端写入 `activity_events`
3. 5 分钟内重复事件自动去重
4. `event_gate` 小模型判断这件事值不值得继续处理
5. 结果回写到同一条事件
6. consciousness / proactive / daily_loop 后续优先读取 gate 判定相关的事件

当前不会做：

- 不直接写长期记忆
- 不直接写日记
- 不直接发主动消息

---

## 后端接口

```text
POST http://你的后端地址/api/activity-events
Content-Type: application/json
```

本地调试时通常是：

```text
http://电脑局域网IP:8000/api/activity-events
```

不要用手机访问 `localhost`，那会指向手机自己，不是你的电脑。

---

## 请求字段

```json
{
  "eventType": "app",
  "eventValue": "小红书",
  "content": "在刷小红书",
  "url": "",
  "occurredAt": "2026-05-01T10:30:00+08:00",
  "source": "ios_shortcuts"
}
```

字段说明：

- `eventType`：必填，建议用 `app` / `url` / `shortcut` / `manual`
- `eventValue`：事件对象，比如 `小红书` / `微信` / `Safari` / `到家`
- `content`：人能读懂的一句话
- `url`：网页类事件可传
- `occurredAt`：可不传，不传后端用当前时间
- `source`：建议固定 `ios_shortcuts`

---

## 快捷指令配置步骤

1. 新建快捷指令。
2. 添加动作：`获取 URL 内容`。
3. URL 填：

```text
http://电脑局域网IP:8000/api/activity-events
```

4. 方法选 `POST`。
5. 请求体选 `JSON`。
6. 添加字段：

```json
{
  "eventType": "app",
  "eventValue": "小红书",
  "content": "在刷小红书",
  "source": "ios_shortcuts"
}
```

7. 跑一次，看返回里有没有：

```json
{
  "ok": true,
  "deduped": false,
  "gate": {
    "should_handle": true
  }
}
```

---

## 可直接抄的事件模板

### 打开 App

```json
{
  "eventType": "app",
  "eventValue": "小红书",
  "content": "在刷小红书",
  "source": "ios_shortcuts"
}
```

### 浏览网页

```json
{
  "eventType": "url",
  "eventValue": "Safari",
  "content": "浏览了一篇网页",
  "url": "https://example.com/article",
  "source": "ios_shortcuts"
}
```

### 到家

```json
{
  "eventType": "manual",
  "eventValue": "到家",
  "content": "已经到家，准备休息",
  "source": "ios_shortcuts"
}
```

### 睡前

```json
{
  "eventType": "shortcut",
  "eventValue": "睡前记录",
  "content": "准备睡觉",
  "source": "ios_shortcuts"
}
```

---

## 调试接口

看最近事件：

```text
GET /api/activity-events/recent?hours=6&limit=10
```

只看 gate 判定相关事件：

```text
GET /api/activity-events/recent?hours=6&limit=10&only_relevant=true
```

获取快捷指令模板：

```text
GET /api/activity-events/shortcut-template
```
