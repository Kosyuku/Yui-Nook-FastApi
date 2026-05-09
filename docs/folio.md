# Folio 阅读器 — 功能文档

> Folio 是 YUI Nook 内置的本地 TXT/MD 阅读器，专为移动端设计，采用莫兰迪低饱和配色体系和日杂设计语言。

---

## 📚 核心功能

### 1. 书架（Shelf）
- **导入书籍**：点击右上角 `＋` 按钮，从设备本地选择 `.txt` 或 `.md` 文件导入。
- **三列网格**：书架以每行三本书的网格布局展示，封面统一为 3:4 竖向比例，高度一致不随书名长短变形。
- **封面配色**：封面颜色根据书名哈希自动分配莫兰迪色系（雾灰绿、烟紫、暖沙等），无需手动设置。
- **书名显示**：封皮内显示完整书名，超出 4 行时自动截断为省略号；底部元数据区展示简洁的书名与作者。
- **星标书（AI 主推位）**：带有星标的书始终置顶显示，并带有暖橘色发光边框和星形徽章，作为「推荐给 AI 当前阅读的书籍」唯一锚点。

### 2. 分类标签（Tabs）
- 书架顶部有一行可横向滑动的分类标签栏。
- 标签内容**完全动态**：只展示`全部`、`未分类`，以及**用户实际在书籍页手动打上的标签**。
- 操作方式：进入书籍详情页 → 点击「分类」旁的文字或铅笔图标 → 输入分类名称（如"末世"）→ 立即同步到书架顶部标签栏。
- 自定义标签一经创建，即持久化保存在本地存储中。

### 3. 书籍详情页（Cover）
进入书籍详情页后，可以进行以下操作：
| 操作 | 位置 | 说明 |
|------|------|------|
| 修改书名 | 右上角铅笔图标 | 就地编辑，不需要重新导入 |
| 删除书籍 | 右上角垃圾桶图标 | 连同所有划线、笔记一并清除 |
| 设置分类 | 封面信息区「分类」旁 | 点击文字或铅笔，输入分类标签 |
| 设置星标 | 「开始阅读」旁星星按钮 | 全局唯一，设置新的会清除旧的 |
| 章节目录 | 页面中下部 | 带划线标记的章节会显示紫色圆点 |

### 4. 阅读视图（Reading）
- 支持上下滑动阅读正文，底部有「上一章 / 下一章」翻章按钮。
- 右上角可展开**抽屉式章节目录侧边栏**，点击章节可直接跳转。
- 换章时自动滚回顶部。

### 5. 划线与感想（Highlights & Thoughts）
- 长按/拖拽选中文字后，会弹出「✦ 划线留念」浮窗，点击即可保存。
- 划线保存后，自动打开**感想面板（HighlightPanel）**，可以为该段文字写下笔记。
- 支持在感想下方回复，形成对话串结构。
- 选中文字的高亮色为莫兰迪灰咖色（`rgba(180,152,140,0.4)`），不刺眼。

---

## 🔍 章节识别算法详解

Folio 使用自研的**两趟扫描启发式（Two-pass Heuristic）章节检测算法**，对导入的纯文本进行智能章节分割。

### 第一趟：全文扫描，分类候选行

```
CHAPTER_STRONG（强规则）：
  - 第X章 / 第X节 / 第X卷 / 第X话 / 第X回
  - Chapter X（英文，数字或罗马数字）
  - 序言 / 前言 / 后记 / 楔子 / 尾声 / 番外 等

CHAPTER_WEAK（弱规则）：
  - 一、二、三… 开头的中文序号行（如 "一、序幕"）
  - 1. 2. 3. 开头的数字序号行（如 "1. 把它当成甜宠看"）
```

- 所有行被标记为 `strongLines`（强匹配行集合）或 `weakLines`（弱匹配行集合）。

### 第二趟：决策逻辑

```
if (strongLines 数量 > 2):
    # 这本书使用标准章节格式（如 第1章、第2章…）
    # 强匹配行作为章节标题，弱匹配行全部忽略（视为正文）
    
elif (strongLines 数量 <= 2 且 weakLines 存在):
    # 强弱规则同时使用（书籍章节数量极少时兜底）
    
else:
    # 完全没有任何序号标记时，启用"视觉排版"软检测
    # 判定条件：字数在 2~40 字之间 + 上一行为空行 + 下一行为空行
    # 符合条件的行被认为是章节标题（作者习惯用空行分隔标题）
```

### 为什么这样设计？

| 场景 | 处理方式 |
|------|---------|
| 正常网文（第1章、第2章…） | 强规则命中，弱规则忽略 |
| 倒计时文本（九、八、七…一） | 书中有大量强规则章节，弱规则被自动排除，不误判 |
| 作者前言的编号列表（1. 2. 3.） | 同上，被强规则压制 |
| 无序号只有标题（"雨夜"、"邂逅"） | 软检测视觉排版，依赖上下空行识别 |
| 无任何章节标记（面条式长文） | 启动自动按段切分（~3000 字为一段），防止浏览器卡死 |

### 编码兼容性

导入时先以严格 UTF-8 解码（`fatal: true`），解码失败则自动回退 GBK（`GB2312`）编码，兼容国内主流 TXT 小说。

---

## 💾 数据存储

当前版本使用 **浏览器 LocalStorage** 存储所有数据，键名为 `folio_data_v1`，结构如下：

```json
{
  "books": [
    {
      "id": "唯一ID",
      "title": "书名",
      "author": "作者",
      "categoryId": "言情",
      "isStarred": false,
      "addedAt": "ISO时间戳",
      "chapters": [
        { "index": 0, "title": "第一章 xxx", "content": "正文..." }
      ],
      "highlights": [
        {
          "id": "唯一ID",
          "chapterIndex": 0,
          "startOffset": 123,
          "endOffset": 145,
          "text": "选中的文字",
          "thoughts": [ ... ],
          "createdAt": "ISO时间戳"
        }
      ]
    }
  ]
}
```

> **注意**：旧版书本正文曾存储在 LocalStorage 中，有 5~10MB 容量上限。新版大文件应迁移到后端媒体库：文件本体放 Cloudflare R2，Supabase/SQLite 只保存 `media_items` 元数据和 `storage_key`。
## Media storage update - 2026-05-05

Folio/book file storage should use the backend media library instead of storing large book bodies in browser LocalStorage or Supabase rows.

- Original ebooks, covers, images, and audio files live in Cloudflare R2.
- Supabase/SQLite keeps only `media_items` metadata and R2 `storage_key`.
- Upload flow: request `POST /api/media/upload-url`, upload file directly to R2 with `PUT`, then save metadata with `POST /api/media/items`.
- Read flow: list metadata with `GET /api/media/items`, then request a temporary file URL with `GET /api/media/items/{id}/url`.
- Detailed backend doc: `backend/README_MEDIA.md`.
