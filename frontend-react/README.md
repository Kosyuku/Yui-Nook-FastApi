# YUI Nook React Frontend

这是静态小手机前端的 React 迁移入口。旧版 `frontend -latest` 暂时不动，新功能先在这里拆组件、迁状态。

## Run

```powershell
npm install
npm run dev
```

## Media Upload

Default media upload provider is the backend R2 media API:

```env
VITE_API_BASE=
VITE_MEDIA_UPLOAD_PROVIDER=r2
VITE_MEDIA_OWNER_TYPE=user
```

The frontend never uses R2 access keys. Personal shelf/music uploads default to `owner_type=user` and do not attach to a chat agent. Upload flow is `POST /api/media/upload-url`, direct `PUT` to the returned URL, then `POST /api/media/items`. Set `VITE_MEDIA_UPLOAD_PROVIDER` to another value only to use the old backend fallback paths.

## Current Scope

- 锁屏页
- 首页桌面
- App 占位页
- 底部上划返回桌面
