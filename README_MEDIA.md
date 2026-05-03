# Yui Nook Media Library

媒体库只把文件本体放到 Cloudflare R2。Supabase/SQLite 只保存 `media_items` 元数据和 R2 `storage_key`，不要把电子书、音乐、封面、图片原文件塞进数据库。

## Storage

- Object storage: Cloudflare R2 bucket, default `yui-media`.
- Metadata table: `media_items`.
- Storage provider: `MEDIA_STORAGE_PROVIDER=r2`.

## Environment

```env
MEDIA_STORAGE_PROVIDER=r2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=yui-media
R2_ENDPOINT=
R2_REGION=auto
R2_PRESIGN_EXPIRES_SECONDS=3600
SUPABASE_MEDIA_ITEMS_TABLE=media_items
```

`R2_ENDPOINT` 可以直接填 Cloudflare R2 的 S3 API endpoint。若不填，后端会用 `R2_ACCOUNT_ID` 组装 `https://{account_id}.r2.cloudflarestorage.com`。

## Upload Flow

1. 前端调用 `POST /api/media/upload-url`，传 `filename`、`type`、可选 `agent_id`、`mime_type`。
2. 后端返回 `upload_url` 和 `storage_key`。
3. 前端用 `PUT` 把文件直接上传到 `upload_url`，`Content-Type` 要和返回的 headers 保持一致。
4. 上传成功后，前端调用 `POST /api/media/items` 保存元数据。

示例：

```bash
curl -X POST http://127.0.0.1:8000/api/media/upload-url \
  -H "Content-Type: application/json" \
  -d '{"type":"music","filename":"song.mp3","agent_id":"azheng","mime_type":"audio/mpeg"}'
```

## Read Flow

1. 前端调用 `GET /api/media/items?agent_id=azheng&type=music` 获取媒体列表。
2. 用户点开某条媒体时，调用 `GET /api/media/items/{id}/url`。
3. 后端返回临时 read URL，前端用它播放音乐或打开电子书。

封面 URL 可用：

```bash
curl "http://127.0.0.1:8000/api/media/items/{id}/url?target=cover"
```

## Metadata

`media_items` 至少包含：

- `id`
- `agent_id`
- `type`: `book` / `music` / `image` / `cover` / `other`
- `title`, `artist`, `album`, `author`
- `storage_provider`
- `storage_key`
- `cover_key`
- `mime_type`
- `size_bytes`
- `duration_seconds`
- `metadata`
- `created_at`, `updated_at`

`storage_key` 由后端生成，类似：

- `books/{agent_id}/{uuid}_{filename}`
- `music/{agent_id}/{uuid}_{filename}`
- `covers/{agent_id}/{uuid}_{filename}`
- `images/{agent_id}/{uuid}_{filename}`

文件名会被清理，避免路径穿越、空格和奇怪符号。
