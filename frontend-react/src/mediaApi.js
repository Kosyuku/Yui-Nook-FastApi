import { apiBase } from "./apiBase.js";

const API_BASE = apiBase;

export const mediaUploadProvider = import.meta.env.VITE_MEDIA_UPLOAD_PROVIDER || "r2";
export const mediaOwnerType = import.meta.env.VITE_MEDIA_OWNER_TYPE || "user";
export const mediaAgentId =
  import.meta.env.VITE_MEDIA_AGENT_ID ||
  import.meta.env.VITE_DEFAULT_AGENT_ID ||
  "azheng";

async function jsonRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `HTTP ${response.status}`);
  }
  return response.json();
}

function mediaItemTitle(file, fallback = "Untitled") {
  return (file?.name || fallback).replace(/\.[^.]+$/, "").trim() || fallback;
}

export async function uploadMediaFile(file, options = {}) {
  if (!file) throw new Error("file is required");
  const type = options.type || "other";
  const ownerType = options.owner_type || mediaOwnerType;
  const agentId = ownerType === "agent" ? (options.agent_id || mediaAgentId) : "";
  const mimeType = file.type || options.mime_type || "application/octet-stream";
  const uploadData = await jsonRequest("/api/media/upload-url", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      type,
      owner_type: ownerType,
      ...(agentId ? { agent_id: agentId } : {}),
      mime_type: mimeType,
    }),
  });
  const storageKey = uploadData.storage_key;
  const putResponse = await fetch(uploadData.upload_url, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: file,
  });
  if (!putResponse.ok) {
    throw new Error(`R2 upload failed: HTTP ${putResponse.status}`);
  }
  try {
    const itemData = await jsonRequest("/api/media/items", {
      method: "POST",
      body: JSON.stringify({
        owner_type: ownerType,
        ...(agentId ? { agent_id: agentId } : {}),
        type,
        title: options.title || mediaItemTitle(file),
        artist: options.artist || "",
        album: options.album || "",
        author: options.author || "",
        storage_provider: "r2",
        storage_key: storageKey,
        cover_key: options.cover_key || "",
        mime_type: mimeType,
        size_bytes: file.size,
        duration_seconds: options.duration_seconds,
        metadata: options.metadata || {},
      }),
    });
    return itemData.item;
  } catch (error) {
    const wrapped = new Error(`文件已上传但登记失败。storage_key=${storageKey}; ${error.message}`);
    wrapped.storage_key = storageKey;
    throw wrapped;
  }
}

export async function listMediaItems({ type, owner_type = mediaOwnerType, agent_id, limit = 200 } = {}) {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (owner_type) params.set("owner_type", owner_type);
  if (agent_id) params.set("agent_id", agent_id);
  if (limit) params.set("limit", String(limit));
  const data = await jsonRequest(`/api/media/items?${params.toString()}`);
  return Array.isArray(data.items) ? data.items : [];
}

export async function getMediaItemUrl(id, target = "file") {
  const params = new URLSearchParams();
  if (target) params.set("target", target);
  const data = await jsonRequest(`/api/media/items/${encodeURIComponent(id)}/url?${params.toString()}`);
  return data.url || "";
}

export async function updateMediaItem(id, payload) {
  const data = await jsonRequest(`/api/media/items/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload || {}),
  });
  return data.item;
}

export async function updateMediaItemLyrics(id, payload) {
  const data = await jsonRequest(`/api/media/items/${encodeURIComponent(id)}/lyrics`, {
    method: "PATCH",
    body: JSON.stringify(payload || {}),
  });
  return data.item;
}

export async function deleteMediaItem(id, deleteObject = false) {
  const params = new URLSearchParams({ delete_object: String(deleteObject) });
  const data = await jsonRequest(`/api/media/items/${encodeURIComponent(id)}?${params}`, {
    method: 'DELETE',
  });
  return data;
}

export async function withMediaUrls(items, target = "file") {
  return Promise.all(
    (items || []).map(async (item) => {
      try {
        return { ...item, url: await getMediaItemUrl(item.id, target) };
      } catch (error) {
        console.warn("[media] signed url failed", item.id, error);
        return { ...item, url: "" };
      }
    }),
  );
}
