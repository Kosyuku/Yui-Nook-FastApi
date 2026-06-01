import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  getMediaItemUrl,
  listMediaItems,
  mediaAgentId,
  mediaUploadProvider,
  uploadMediaFile,
  updateMediaItem,
  updateMediaItemLyrics,
  withMediaUrls,
  deleteMediaItem,
} from "./mediaApi.js";
import { apiUrl } from "./apiBase.js";

// ===== Tokens & Utilities =====
export const DD_TOKENS = {
  paper: '#FBF7F2',
  paperDeep: '#F3ECE2',
  cream: '#FFFBF4',
  ink: '#2B2420',
  inkSoft: '#6B5F58',
  inkFaint: '#A89C93',
  rule: 'rgba(120, 90, 70, 0.12)',
  rose: '#F5D6D1',
  peach: '#F4DCC4',
  mauve: '#E8D4DE',
  sage: '#D9E0D0',
  lilac: '#DDD6E6',
  butter: '#F1E4BD',
  dusk: '#D8C8D6',
  stamp: '#B84A3E',
  gold: '#B08458',
  ribbon: '#D9A5A0'
};

export const DD_FONTS = {
  serifEn: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  serifCn: '"Noto Serif SC", "Source Han Serif CN", "Songti SC", serif',
  handCn: '"Ma Shan Zheng", "Liu Jian Mao Cao", cursive',
  handEn: '"Caveat", "Homemade Apple", cursive',
  body: '"Noto Serif SC", "Source Han Serif CN", serif'
};

export function shade(hex, amt) {
  const n = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(n.slice(0, 2), 16) + amt));
  const g = Math.max(0, Math.min(255, parseInt(n.slice(2, 4), 16) + amt));
  const b = Math.max(0, Math.min(255, parseInt(n.slice(4, 6), 16) + amt));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export const PERLE_CATS = [
  { id: 'all', name: '全部', emoji: '', accent: '#C9A7BB' },
  { id: 'fav', name: '收藏', emoji: '💗', accent: '#D28BA8' },
];

function isUuidLike(value = "") {
  const text = String(value || "").trim();
  return /^[0-9a-f]{32}$/i.test(text) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(text);
}

function shortId(value = "") {
  const text = String(value || "").trim();
  return text ? text.slice(0, 8) : "photo";
}

function stripExtension(value = "") {
  return String(value || "").replace(/\.[^.]+$/, "").trim();
}

function originalNameFromStorageKey(storageKey = "") {
  const file = String(storageKey || "").split("/").pop() || "";
  return stripExtension(file.replace(/^[0-9a-f]{32}_/i, ""));
}

function normalizePhotoTags(meta = {}, cat = "all") {
  const source = Array.isArray(meta.tags) ? meta.tags : String(meta.tags || "").split(",");
  const tags = source.map((tag) => String(tag || "").trim()).filter(Boolean);
  if (cat && cat !== "all" && !tags.includes(cat)) tags.unshift(cat);
  return Array.from(new Set(tags));
}

function displayPhotoName({ id = "", title = "", label = "", originalName = "" }) {
  const custom = [title, label].map((item) => stripExtension(item)).find((item) => item && !isUuidLike(item));
  if (custom) return custom;
  const original = stripExtension(originalName);
  if (original && !isUuidLike(original)) return original;
  return shortId(id);
}

function toInputValue(value = "") {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function mediaPhotoToPerlePhoto(item) {
  const meta = item.metadata && typeof item.metadata === "object" ? item.metadata : {};
  const originalName = meta.original_filename || meta.filename || originalNameFromStorageKey(item.storage_key);
  const cat = meta.cat || "all";
  const label = displayPhotoName({ id: item.id, title: item.title || meta.title || meta.name, label: meta.label, originalName });
  return {
    id: item.id,
    cat,
    tint: meta.tint || "#e2d5d8",
    url: item.url || "",
    label,
    title: item.title || "",
    originalName,
    tags: normalizePhotoTags(meta, cat),
    storage_key: item.storage_key,
    media_item: item,
  };
}

function mergeMediaItemResponse(oldItem = {}, responseItem = {}) {
  const oldMeta = oldItem.metadata && typeof oldItem.metadata === "object" ? oldItem.metadata : {};
  const nextMeta = responseItem?.metadata && typeof responseItem.metadata === "object" ? responseItem.metadata : {};
  return {
    ...oldItem,
    ...(responseItem || {}),
    id: responseItem?.id || oldItem.id,
    owner_type: responseItem?.owner_type || oldItem.owner_type,
    agent_id: responseItem?.agent_id || oldItem.agent_id || oldMeta.agent_id || mediaAgentId,
    type: responseItem?.type || oldItem.type,
    storage_provider: responseItem?.storage_provider || oldItem.storage_provider,
    storage_key: responseItem?.storage_key || oldItem.storage_key,
    cover_key: responseItem?.cover_key ?? oldItem.cover_key,
    mime_type: responseItem?.mime_type || oldItem.mime_type,
    size_bytes: responseItem?.size_bytes ?? oldItem.size_bytes,
    duration_seconds: responseItem?.duration_seconds ?? oldItem.duration_seconds,
    created_at: responseItem?.created_at || oldItem.created_at,
    updated_at: responseItem?.updated_at || oldItem.updated_at,
    url: oldItem.url || responseItem?.url || "",
    src: oldItem.src || responseItem?.src || "",
    previewUrl: oldItem.previewUrl || responseItem?.previewUrl || "",
    signedUrl: oldItem.signedUrl || responseItem?.signedUrl || "",
    metadata: { ...oldMeta, ...nextMeta },
  };
}

function mergePhotoFromMediaResponse(photo, responseItem, patch = {}) {
  const mediaItem = mergeMediaItemResponse(photo?.media_item || {}, responseItem);
  return {
    ...photo,
    ...mediaPhotoToPerlePhoto(mediaItem),
    ...patch,
    url: photo?.url || mediaItem.url || "",
    media_item: mediaItem,
  };
}

function mediaTrackToPerleTrack(item) {
  const meta = item.metadata && typeof item.metadata === "object" ? item.metadata : {};
  const favorite = Boolean(meta.favorite || meta.liked || meta.pinned || meta.heart);
  const lyrics = String(meta.lyrics || item.lyrics || "");
  return {
    id: item.id,
    title: item.title || meta.title || "Unknown Title",
    titleEn: meta.title_en || "",
    artist: item.artist || meta.artist || "Local Track",
    album: item.album || meta.album || "Imported",
    duration: Number(item.duration_seconds || meta.duration || 0),
    favorite,
    lyrics,
    lyricsType: String(meta.lyrics_type || item.lyrics_type || (lyrics ? "text" : "")),
    lyricsFilename: String(meta.lyrics_filename || item.lyrics_filename || ""),
    lyricsUpdatedAt: String(meta.lyrics_updated_at || item.lyrics_updated_at || ""),
    accent: meta.accent || "#C9A7BB",
    url: item.url || "",
    storage_key: item.storage_key,
    media_item: item,
  };
}

function validSeconds(value) {
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
}

function formatDuration(value) {
  const seconds = Math.round(validSeconds(value));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}

function isFavoriteTrack(track) {
  return Boolean(track?.favorite || track?.liked || track?.pinned || track?.heart);
}

function detectLyricsType(text = "") {
  return /^\s*\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/m.test(String(text || "")) ? "lrc" : "text";
}

function parseLrc(text = "") {
  const rows = [];
  const stampPattern = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
  String(text || "").split(/\r?\n/).forEach((line) => {
    stampPattern.lastIndex = 0;
    const stamps = [...line.matchAll(stampPattern)];
    if (!stamps.length) return;
    const lyric = line.replace(stampPattern, "").trim();
    stamps.forEach((match) => {
      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
      const time = minutes * 60 + seconds + fraction;
      if (Number.isFinite(time)) rows.push({ time, text: lyric || " " });
    });
  });
  return rows.sort((a, b) => a.time - b.time);
}

function currentLrcIndex(rows, currentTime) {
  const time = validSeconds(currentTime);
  let index = -1;
  rows.forEach((row, rowIndex) => {
    if (row.time <= time) index = rowIndex;
  });
  return index;
}

function PerleScopedStyles() {
  return (
    <style>{`
      .perle-root .perle-soft-button,
      .perle-root .perle-primary-button,
      .perle-root .perle-ghost-button,
      .perle-root .perle-danger-button,
      .perle-root .perle-icon-button {
        appearance: none;
        -webkit-appearance: none;
        border-radius: 999px;
        font-family: ${DD_FONTS.serifCn};
        letter-spacing: 1px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0.5px solid rgba(150,120,130,0.22);
        box-shadow: 0 6px 16px rgba(120,80,110,0.08);
        cursor: pointer;
      }
      .perle-root .perle-soft-button {
        background: rgba(255,253,248,0.74);
        color: #6E5264;
        padding: 8px 13px;
        font-size: 12px;
      }
      .perle-root .perle-primary-button {
        background: linear-gradient(135deg, #D8A5BF, #C9A7BB);
        color: #fff;
        border-color: rgba(216,165,191,0.44);
        padding: 8px 16px;
        font-size: 12px;
      }
      .perle-root .perle-ghost-button {
        background: rgba(255,255,255,0.28);
        color: #7B6874;
        padding: 8px 13px;
        font-size: 12px;
      }
      .perle-root .perle-danger-button {
        background: rgba(184,74,62,0.07);
        color: ${DD_TOKENS.stamp};
        border-color: rgba(184,74,62,0.24);
        padding: 8px 13px;
        font-size: 12px;
      }
      .perle-root .perle-icon-button {
        width: 34px;
        height: 34px;
        padding: 0;
        background: rgba(255,253,248,0.68);
        color: #6E5264;
      }
      .perle-root .perle-soft-button:disabled,
      .perle-root .perle-primary-button:disabled,
      .perle-root .perle-danger-button:disabled {
        opacity: 0.55;
        cursor: default;
      }
      .perle-root .perle-field,
      .perle-root .perle-textarea {
        border-radius: 16px;
        border: 0.5px solid rgba(150,120,130,0.24);
        background: rgba(251,247,242,0.74);
        color: #2B2420;
        outline: none;
        font-family: ${DD_FONTS.serifCn};
        letter-spacing: 1px;
        box-sizing: border-box;
      }
      .perle-root .perle-field {
        min-height: 36px;
        padding: 8px 14px;
        font-size: 12px;
      }
      .perle-root .perle-textarea {
        padding: 12px;
        font-size: 13px;
        line-height: 1.65;
      }
      .perle-root .perle-dark-field {
        border-radius: 999px;
        background: rgba(255,255,255,0.12);
        border: 0.5px solid rgba(255,255,255,0.24);
        color: #fff;
      }
      .perle-root .perle-dark-button {
        border-color: rgba(255,255,255,0.22);
        background: rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.78);
        box-shadow: none;
      }
    `}</style>
  );
}

export function Tape({ color = 'rgba(246, 220, 196, 0.75)', width = 64, height = 20, rotate = -6, style = {} }) {
  return (
    <div style={{
      width, height, backgroundColor: color,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 1px 2px rgba(100, 70, 50, 0.08)',
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(255,255,255,0.25) 3px, rgba(255,255,255,0.25) 6px)`,
      ...style
    }} />
  );
}

// ===== Photo Viewer (fullscreen black) =====
function PhotoViewer({ photos, startIdx, onClose, onTagUpdate, onRename, onDelete, globalTags }) {
  const [idx, setIdx] = useState(startIdx);
  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState('');
  const [renameDraft, setRenameDraft] = useState('');
  const [renameError, setRenameError] = useState('');
  const [renaming, setRenaming] = useState(false);
  const [savingTag, setSavingTag] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const touchStartX = useRef(0);
  const renameInputRef = useRef(null);
  const photo = photos[idx];
  if (!photo) return null;
  const go = (dir) => setIdx(i => Math.max(0, Math.min(photos.length - 1, i + dir)));
  const stopControlEvent = (event) => { event.stopPropagation(); };

  const submitTag = async (tag) => {
    const nextTag = toInputValue(tag).trim();
    if (savingTag || !nextTag || !photo.id) return;
    setSavingTag(true);
    setTagError('');
    try {
      await onTagUpdate(photo.id, nextTag, idx);
      setTagInput('');
    } catch (error) {
      setTagError(error?.message || "Tag save failed.");
    } finally {
      setSavingTag(false);
    }
  };
  const handleAddTagClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    submitTag(tagInput);
  };

  // ---- Rename: input is always mounted so focus() works within the touch gesture ----
  const startRename = () => {
    const draft = toInputValue(displayPhotoName({
      id: photo.id, title: photo.title, label: photo.label, originalName: photo.originalName,
    }));
    setRenameDraft(draft);
    setRenameError('');
    setRenaming(true);
    // Call focus synchronously inside the click handler so iOS opens the keyboard
    if (renameInputRef.current) {
      renameInputRef.current.focus();
    }
  };

  const submitRename = async () => {
    const nextName = toInputValue(renameDraft).trim();
    if (savingName) return;
    if (!nextName) { setRenameError("不能为空"); return; }
    setSavingName(true);
    setRenameError('');
    try {
      await onRename(photo.id, nextName);
      setRenaming(false);
    } catch (error) {
      setRenameError(error?.message || "保存失败");
    } finally {
      setSavingName(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setMenuOpen(false);
    try {
      await onDelete(photo.id);
      onClose();
    } catch (error) {
      console.error('Delete failed:', error);
      setDeleting(false);
    }
  };

  // Always-mounted style for rename input when hidden — keeps it focusable
  const inputHiddenStyle = {
    position: 'absolute', left: '-200%', width: '100%', display: 'flex',
    alignItems: 'center', gap: 8, opacity: 0, pointerEvents: 'none',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 500, display: 'flex', flexDirection: 'column', touchAction: 'pan-y' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', flexShrink: 0 }}>
        <div onClick={onClose} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
        <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{idx + 1} / {photos.length}</div>
        <div onClick={() => setMenuOpen(true)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}>
          <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
            <circle cx="2" cy="2" r="1.6" fill="rgba(255,255,255,0.7)"/>
            <circle cx="8" cy="2" r="1.6" fill="rgba(255,255,255,0.7)"/>
            <circle cx="14" cy="2" r="1.6" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </div>
      </div>

      {/* Photo area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}
      >
        <img src={photo.url} alt={photo.label || ''} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        {idx > 0 && (
          <div onClick={() => go(-1)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
        {idx < photos.length - 1 && (
          <div onClick={() => go(1)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div onPointerDown={stopControlEvent} onTouchStart={stopControlEvent} style={{ flexShrink: 0, position: 'relative', zIndex: 5, background: 'rgba(0,0,0,0.75)', padding: '12px 18px calc(28px + env(safe-area-inset-bottom, 0px))', backdropFilter: 'blur(12px)', touchAction: 'manipulation' }}>
        {/* Rename row — input always mounted for mobile keyboard */}
        <div style={{ marginBottom: 10, position: 'relative' }}>
          <div style={renaming ? { display: 'flex', alignItems: 'center', gap: 8 } : inputHiddenStyle} aria-hidden={!renaming}>
            <input
              ref={renameInputRef}
              value={toInputValue(renameDraft)}
              onChange={(e) => setRenameDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submitRename(); if (e.key === 'Escape') setRenaming(false); }}
              className="perle-field perle-dark-field"
              style={{ flex: 1, minWidth: 0 }}
              autoComplete="off"
            />
            <button type="button" className="perle-primary-button" onClick={submitRename} disabled={savingName} style={{ minHeight: 34, opacity: savingName ? 0.65 : 1, flexShrink: 0 }}>保存</button>
            <button type="button" className="perle-ghost-button perle-dark-button" onClick={() => { setRenameDraft(''); setRenameError(''); setRenaming(false); }} style={{ minHeight: 34, flexShrink: 0 }}>取消</button>
          </div>
          {!renaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: DD_FONTS.handCn, fontSize: 15, color: 'rgba(255,255,255,0.75)', letterSpacing: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayPhotoName({ id: photo.id, title: photo.title, label: photo.label, originalName: photo.originalName })}
              </div>
              <button type="button" onClick={startRename} aria-label="重命名" style={{ width: 28, height: 28, border: '0.5px solid rgba(255,255,255,0.18)', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 18 18" fill="none"><path d="M2.5 15.5h3.1L14.7 6.4 11.6 3.3 2.5 12.4v3.1Z" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.8 4.1 13.9 7.2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" /></svg>
              </button>
            </div>
          )}
          {renameError && <div role="alert" style={{ color: '#F0A3A3', fontFamily: DD_FONTS.serifEn, fontSize: 11, marginTop: 6 }}>{renameError}</div>}
        </div>

        {/* Tag chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10 }}>
          {globalTags.map(tag => {
            const active = (photo.tags || []).includes(tag) || photo.cat === tag;
            return (
              <div key={tag} onClick={() => submitTag(tag)}
                style={{ padding: '4px 13px', borderRadius: 999, cursor: 'pointer', fontFamily: DD_FONTS.serifCn, fontSize: 12, letterSpacing: 1,
                  background: active ? '#D8A5BF' : 'rgba(255,255,255,0.12)',
                  color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                  border: active ? 'none' : '0.5px solid rgba(255,255,255,0.2)' }}
              >{tag}</div>
            );
          })}
        </div>

        {/* Tag input */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <input value={toInputValue(tagInput)} onChange={(e) => setTagInput(e.target.value)} placeholder="+ 新标签"
            className="perle-field perle-dark-field"
            style={{ flex: 1 }}
            onKeyDown={e => { if (e.key === 'Enter') submitTag(tagInput); }}
          />
          <button type="button" disabled={savingTag} onClick={handleAddTagClick}
            className="perle-primary-button"
            style={{ flexShrink: 0, minHeight: 36, opacity: savingTag ? 0.65 : 1, pointerEvents: savingTag ? 'none' : 'auto' }}>添加</button>
        </div>
        {tagError && <div role="alert" style={{ color: '#F0A3A3', fontFamily: DD_FONTS.serifEn, fontSize: 11, marginTop: 7 }}>{tagError}</div>}
      </div>

      {/* ··· More menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: '18px 18px 0 0', padding: '8px 0 calc(16px + env(safe-area-inset-bottom, 0px))', zIndex: 1 }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.18)', margin: '6px auto 14px' }} />
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{ width: '100%', padding: '14px 22px', background: 'transparent', border: 'none', textAlign: 'left', fontFamily: DD_FONTS.serifCn, fontSize: 15, letterSpacing: 1, color: '#FF6B6B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, opacity: deleting ? 0.5 : 1 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M7 5V3.5h4V5M7.5 8v6M10.5 8v6M4 5l.8 9.5c0 .6.5 1 1 1h6.4c.6 0 1-.4 1-1L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              删除照片
            </button>
            <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{ width: '100%', padding: '14px 22px', background: 'transparent', border: 'none', textAlign: 'center', fontFamily: DD_FONTS.serifCn, fontSize: 15, letterSpacing: 1, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Perle Gallery =====

function PerleGalleryA({ photos, onAddPhotos, onHome, onTagUpdate, onRename, onDelete }) {
  const [active, setActive] = useState('all');
  const [viewerIdx, setViewerIdx] = useState(null);

  // Dynamic cats: always "全部" + all unique non-'all' tags used by photos
  const tagSet = Array.from(new Set(photos.flatMap(p => (p.tags && p.tags.length ? p.tags : [p.cat]).filter(c => c && c !== 'all'))));
  const dynamicCats = [
    { id: 'all', name: '全部', accent: '#C9A7BB' },
    ...tagSet.map(tag => ({ id: tag, name: tag, accent: '#D28BA8' }))
  ];
  const globalTags = tagSet;
  const visible = photos.filter(p => active === 'all' || p.cat === active || (p.tags || []).includes(active));

  const handleTagUpdate = async (photoId, tag) => {
    await onTagUpdate(photoId, tag);
  };

  return (
    <>
      {viewerIdx !== null && (
        <PhotoViewer
          photos={visible}
          startIdx={viewerIdx}
          onClose={() => setViewerIdx(null)}
          onTagUpdate={handleTagUpdate}
          onRename={onRename}
          onDelete={onDelete}
          globalTags={globalTags}
        />
      )}
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        backgroundColor: '#F7F1EF',
        backgroundImage: `radial-gradient(ellipse 700px 400px at 20% 0%, rgba(233,210,220,0.55), transparent), radial-gradient(ellipse 600px 400px at 100% 70%, rgba(220,205,230,0.4), transparent)`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
          <div onClick={onHome} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: -6 }}>
            <svg viewBox="0 0 24 24" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" stroke="#2B2420" strokeWidth="1.5" fill="none" d="M15 18l-6-6 6-6" /></svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 22, color: '#2B2420', letterSpacing: 0.5, lineHeight: 1 }}>Perle</div>
            <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 10, color: '#8B7E88', letterSpacing: 4, marginTop: 2, paddingLeft: 4 }}>珍 珠 集</div>
          </div>
          <div onClick={onAddPhotos} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: -6 }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2 V16 M2 9 H16" stroke="#2B2420" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
        </div>

        <Hero photos={photos} />

        <div style={{ padding: '22px 16px 14px', display: 'flex', gap: 8, overflowX: 'auto', overflowY: 'hidden' }}>
          {dynamicCats.map(c => (
            <ChipTag key={c.id} cat={c} active={c.id === active} onClick={() => setActive(c.id)} />
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 'calc(104px + env(safe-area-inset-bottom, 0px))' }}>
          {visible.length > 0 ? (
            <BrickGrid photos={visible} onPhotoClick={(i) => setViewerIdx(i)} />
          ) : (
            <div style={{ padding: '40px 12px', textAlign: 'center', fontFamily: DD_FONTS.serifCn, fontSize: 12, color: '#B5A4AB', letterSpacing: 2 }}>这里还是空的，点右上角添加图片。</div>
          )}
        </div>
      </div>
    </>
  );
}

function Hero({ photos }) {
  const hasPhotos = photos.length > 0;
  const main = photos[0] || { tint: '#D28BA822', url: '' };
  const sub = photos[1] || photos[0] || { tint: '#C9A7BB22', url: '' };
  
  return (
    <div aria-hidden={!hasPhotos} style={{ position: 'relative', height: 180, margin: '4px 16px 0', opacity: hasPhotos ? 1 : 0.45 }}>
      <div style={{
        position: 'absolute', left: 6, top: 10, width: 160, height: 160,
        backgroundColor: main.tint, backgroundImage: main.url ? `url(${main.url})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: 'rotate(-3deg)', boxShadow: 'inset 0 0 0 6px #FFFDF8'
      }}>
        <Tape style={{ position: 'absolute', top: -8, left: 20 }} />
      </div>
      <div style={{
        position: 'absolute', right: 4, top: 0, width: 118, height: 118,
        backgroundColor: sub.tint, backgroundImage: sub.url ? `url(${sub.url})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: 'rotate(5deg)', boxShadow: 'inset 0 0 0 5px #FFFDF8'
      }} />
      <div style={{
        position: 'absolute', right: 8, bottom: -2,
        fontFamily: DD_FONTS.handCn, fontSize: 16, color: '#8A6E82',
        transform: 'rotate(-2deg)'
      }}>回忆 · {photos.length} 张</div>
      <div style={{
        position: 'absolute', left: 150, top: 130,
        fontFamily: DD_FONTS.handEn, fontSize: 22, color: '#D28BA8',
        transform: 'rotate(10deg)', lineHeight: 1
      }}>♡</div>
    </div>
  );
}

function ChipTag({ cat, active, onClick }) {
  const bg = active ? '#fff' : 'rgba(255,255,255,0.55)';
  const border = active ? cat.accent : 'rgba(150,120,130,0.25)';
  return (
    <div onClick={onClick} style={{
      flexShrink: 0, padding: '5px 10px', background: bg, border: `0.8px solid ${border}`,
      fontFamily: DD_FONTS.serifCn, color: active ? '#2B2420' : '#6B5F68',
      letterSpacing: 1, fontWeight: active ? 600 : 400, transform: active ? 'rotate(-0.5deg)' : 'none', fontSize: 11
    }}>
      {cat.emoji && <span style={{ fontSize: 11 }}>{cat.emoji}</span>}
      {cat.name}
      {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: cat.accent, marginLeft: 2 }} />}
    </div>
  );
}

function BrickGrid({ photos, onPhotoClick }) {
  const chunks = [];
  let i = 0;
  let flip = false;
  while (i < photos.length) {
    if (flip && i + 3 <= photos.length) {
      chunks.push({ kind: 'wide', items: photos.slice(i, i + 3), offset: i });
      i += 3;
    } else {
      chunks.push({ kind: 'tri', items: photos.slice(i, i + 3), offset: i });
      i += 3;
    }
    flip = !flip;
  }
  return (
    <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {chunks.map((c, idx) => c.kind === 'tri'
        ? <TriRow key={idx} items={c.items} offset={idx} baseIdx={c.offset} onPhotoClick={onPhotoClick} />
        : <WideRow key={idx} items={c.items} offset={idx} baseIdx={c.offset} onPhotoClick={onPhotoClick} />)}
    </div>
  );
}

function TriRow({ items, offset, baseIdx, onPhotoClick }) {
  const heights = offset % 2 === 0 ? [132, 112, 124] : [116, 128, 116];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(30%, 1fr))', gap: 8 }}>
      {items.map((p, i) => <PhotoCell key={p.id} p={p} h={heights[i]} onClick={() => onPhotoClick(baseIdx + i)} />)}
    </div>
  );
}

function WideRow({ items, offset, baseIdx, onPhotoClick }) {
  const [a, b, c] = items;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
      <PhotoCell p={a} h={176} wide onClick={() => onPhotoClick(baseIdx)} />
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 8 }}>
        {b && <PhotoCell p={b} h={84} onClick={() => onPhotoClick(baseIdx + 1)} />}
        {c && <PhotoCell p={c} h={84} onClick={() => onPhotoClick(baseIdx + 2)} />}
      </div>
    </div>
  );
}

function PhotoCell({ p, h, wide, onClick }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative', height: h, backgroundColor: p.tint || '#e2d5d8',
      backgroundImage: p.url ? `url(${p.url})` : 'none',
      backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 2, overflow: 'hidden', cursor: 'pointer'
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 0 3px #FFFDF8, inset 0 0 0 4px rgba(0,0,0,0.06)' }} />
      {wide && p.label && (
        <div style={{ position: 'absolute', left: 10, bottom: 10, padding: '3px 8px', background: 'rgba(255,253,248,0.86)', fontFamily: DD_FONTS.handCn, fontSize: 12, color: '#2B2420', letterSpacing: 1 }}>
          {p.label}
        </div>
      )}
    </div>
  );
}


// ===== Perle Music =====
function PerleMusicLibrary({ tracks, activeIdx, playing, playerOpen, onPick, onOpenPlayer, onNext, onAddMusic, onHome, onToggleFavorite }) {
  const [filter, setFilter] = useState('all');
  const [miniExpanded, setMiniExpanded] = useState(false);
  const buckets = {
    all: tracks.map((_, i) => i),
    fav: tracks.map((track, i) => isFavoriteTrack(track) ? i : -1).filter((i) => i >= 0),
    recent: tracks.map((_, i) => i),
    imp: tracks.map((_, i) => i)
  };
  const visibleIdx = buckets[filter] || [];
  const visibleTracks = visibleIdx.map((i) => ({ tr: tracks[i], origIdx: i }));
  const totalDuration = tracks.reduce((sum, track) => sum + validSeconds(track.duration), 0);
  const totalMinutes = Math.round(totalDuration / 60);
  const statsText = totalDuration > 0 ? `${tracks.length} 首　·　${Math.max(1, totalMinutes)} 分钟` : `${tracks.length} 首`;
  const active = tracks[activeIdx];

  return (
    <div style={{
      width: '100%', height: '100%', backgroundColor: '#FBF6F4',
      backgroundImage: `radial-gradient(ellipse 700px 400px at 90% 0%, rgba(230,210,225,0.5), transparent), radial-gradient(ellipse 600px 400px at 0% 90%, rgba(210,200,225,0.35), transparent)`,
      overflow: 'auto', position: 'relative', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
        <div onClick={onHome} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: -6 }}>
           <svg viewBox="0 0 24 24" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" stroke="#2B2420" strokeWidth="1.5" fill="none" d="M15 18l-6-6 6-6" /></svg>
        </div>
        <div style={{ fontFamily: DD_FONTS.handEn, fontSize: 16, color: '#9E8894' }}>music</div>
        <div onClick={onAddMusic} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: -6 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2 V12 M5 8 L9 12 L13 8 M3 15 H15" stroke="#2B2420" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>

      <div style={{ padding: '6px 24px 8px' }}>
        <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 16, color: '#A48BA0', letterSpacing: 1 }}>my music</div>
        <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 32, fontWeight: 700, letterSpacing: 4, marginTop: 4, lineHeight: 1.1, color: "rgb(72, 45, 63)" }}>拾 音 匣</div>
        <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 11, color: '#9E8894', letterSpacing: 2, marginTop: 6 }}>{statsText}</div>
      </div>

      <div style={{ padding: '14px 20px 6px', display: 'flex', gap: 18, overflowX: 'auto' }}>
        {[{ id: 'all', name: '全部' }, { id: 'fav', name: '心选' }, { id: 'recent', name: '最近播放' }, { id: 'imp', name: '本机导入' }].map((c) => {
          const isOn = c.id === filter;
          return (
            <div key={c.id} onClick={() => setFilter(c.id)} style={{ flexShrink: 0, position: 'relative', paddingBottom: 8, cursor: 'pointer' }}>
              <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 13, fontWeight: isOn ? 600 : 400, color: isOn ? '#2B2420' : '#9E8894', letterSpacing: 1 }}>
                {c.name}　<span style={{ fontSize: 11, color: '#B5A4AB', fontFamily: DD_FONTS.serifEn, fontStyle: 'italic' }}>{(buckets[c.id] || []).length}</span>
              </div>
              {isOn && <div style={{ position: 'absolute', left: 0, right: 30, bottom: 0, height: 2, background: '#D8A5BF' }} />}
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1, padding: '6px 16px 160px' }}>
        {visibleTracks.length === 0 && <div style={{ padding: '40px 12px', textAlign: 'center', fontFamily: DD_FONTS.serifCn, fontSize: 12, color: '#B5A4AB', letterSpacing: 2 }}>这里还是空的</div>}
        {visibleTracks.map(({ tr, origIdx }) => {
          const i = origIdx;
          const isActive = i === activeIdx;
          return (
            <div key={tr.id} onClick={() => onPick(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', cursor: 'pointer', borderRadius: 8, background: isActive ? `${tr.accent}22` : 'transparent' }}>
              <div style={{ width: 22, flexShrink: 0, textAlign: 'center', fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 12, color: isActive ? tr.accent : '#B5A4AB' }}>
                {isActive ? <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: tr.accent }} /> : String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 6, background: `linear-gradient(135deg, ${tr.accent}, ${tr.accent}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DD_FONTS.handEn, fontSize: 18, color: '#FFFDF8' }}>♪</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: DD_FONTS.serifCn, fontWeight: isActive ? 700 : 500, color: '#2B2420', letterSpacing: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14 }}>{tr.title}</div>
                <div style={{ fontFamily: DD_FONTS.serifCn, color: '#9E8894', letterSpacing: 1, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10 }}>{tr.artist}　·　{tr.album}</div>
              </div>
              <button type="button" onClick={(event) => { event.stopPropagation(); onToggleFavorite?.(tr.id); }} aria-label={isFavoriteTrack(tr) ? "取消心选" : "加入心选"} style={{ width: 30, height: 30, border: 0, background: 'transparent', color: isFavoriteTrack(tr) ? '#D28BA8' : '#B5A4AB', cursor: 'pointer', flexShrink: 0, fontSize: 16, lineHeight: 1 }}>{isFavoriteTrack(tr) ? '♥' : '♡'}</button>
              <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 12, color: '#A89C93', flexShrink: 0 }}>{formatDuration(tr.duration)}</div>
            </div>
          );
        })}
      </div>

      {active && !playerOpen && (
        <div onClick={() => setMiniExpanded(true)} title={miniExpanded ? '点击圆形进入全屏播放器' : '展开迷你播放器'} style={{
          position: 'fixed', right: 18, bottom: 96, zIndex: 120, width: miniExpanded ? 198 : 52, height: 52, margin: 0, padding: miniExpanded ? '6px 8px 6px 6px' : 0, background: 'rgba(255,253,248,0.92)',
          backdropFilter: 'blur(18px)', boxShadow: '0 10px 28px rgba(100,70,90,0.16), inset 0 0 0 0.5px rgba(150,120,130,0.18)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: miniExpanded ? 'flex-start' : 'center', gap: 8, cursor: 'pointer', overflow: 'hidden', transition: 'width 0.28s cubic-bezier(.22,1,.36,1), padding 0.28s cubic-bezier(.22,1,.36,1), transform .2s ease'
        }}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (miniExpanded) onOpenPlayer();
              else setMiniExpanded(true);
            }}
            aria-label={miniExpanded ? '打开全屏播放器' : '展开迷你播放器'}
            style={{ width: 40, height: 40, border: 'none', borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, #FFFDF8, ${active.accent})`, flexShrink: 0, boxShadow: `0 0 12px ${active.accent}66`, cursor: 'pointer' }}
          />
          {miniExpanded && <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 12, fontWeight: 600, color: '#2B2420', letterSpacing: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{active.title}</div>
            <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 9, color: '#9E8894', letterSpacing: 1, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{playing ? '正在播放' : '已暂停'}　·　{active.artist}</div>
          </div>}
          {miniExpanded && <button type="button" onClick={(event) => { event.stopPropagation(); onNext(); }} aria-label="下一首" style={{ width: 28, height: 28, border: 'none', borderRadius: '50%', background: 'rgba(120,90,110,0.09)', color: '#6E5264', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M4 4l6 5-6 5V4Zm8 0v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>}
        </div>
      )}
    </div>
  );
}

function BreathOrb({ accent, playing, title }) {
  return (
    <div style={{ width: 240, height: 240, position: 'relative' }}>
      <style>{`
        @keyframes perleBreath { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes perleSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: `radial-gradient(circle at 50% 50%, ${accent}, ${accent}00 70%)`, animation: playing ? 'perleBreath 3.5s ease-in-out infinite' : 'none', opacity: 0.65 }} />
      <div style={{ position: 'absolute', inset: 24, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, #FFFDF8, ${accent} 100%)`, boxShadow: `inset 0 0 30px ${accent}80` }} />
      <div style={{ position: 'absolute', inset: 36, borderRadius: '50%', background: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 4px, rgba(255,255,255,0.18) 4px, rgba(255,255,255,0.18) 5px)`, animation: playing ? 'perleSpin 18s linear infinite' : 'none' }} />
      <div style={{ position: 'absolute', inset: '46%', borderRadius: '50%', background: '#FFFDF8' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: -6, textAlign: 'center', fontFamily: DD_FONTS.handEn, fontSize: 18, color: accent, letterSpacing: 1, margin: "5px 0px 0px" }}>♪ {title}</div>
    </div>
  );
}

function LyricsDisplay({ track, currentTime }) {
  const activeLineRef = useRef(null);
  const parsed = useMemo(() => parseLrc(track?.lyrics || ""), [track?.lyrics]);
  const useLrc = track?.lyrics && track?.lyricsType === "lrc" && parsed.length > 0;
  const activeIndex = useLrc ? currentLrcIndex(parsed, currentTime) : -1;

  useEffect(() => {
    activeLineRef.current?.scrollIntoView?.({ block: "center", behavior: "smooth" });
  }, [activeIndex]);

  if (!track) {
    return <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 13, color: '#C2B5BC', letterSpacing: 1.5, lineHeight: 1.5 }}>暂无音乐</div>;
  }
  if (!track.lyrics) {
    return <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 13, color: '#C2B5BC', letterSpacing: 1.5, lineHeight: 1.5 }}>暂无歌词</div>;
  }
  if (!useLrc) {
    return <div style={{ maxHeight: 118, overflowY: 'auto', WebkitOverflowScrolling: 'touch', whiteSpace: 'pre-wrap', fontFamily: DD_FONTS.serifCn, fontSize: 13, color: '#8F7F88', letterSpacing: 1.2, lineHeight: 1.75, textAlign: 'left' }}>{track.lyrics}</div>;
  }
  return (
    <div style={{ maxHeight: 132, overflowY: 'auto', WebkitOverflowScrolling: 'touch', textAlign: 'center', padding: '2px 0' }}>
      {parsed.map((line, index) => {
        const active = index === activeIndex;
        return (
          <div key={`${line.time}-${index}`} ref={active ? activeLineRef : null} style={{ padding: '4px 0', fontFamily: DD_FONTS.serifCn, fontSize: active ? 15 : 12, color: active ? '#2B2420' : '#B9ABB3', fontWeight: active ? 700 : 400, letterSpacing: 1.2, lineHeight: 1.45, transition: 'color .2s ease, font-size .2s ease' }}>
            {line.text}
          </div>
        );
      })}
    </div>
  );
}

function LyricsEditorPanel({ track, open, saving, error, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState("");
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setDraft(track?.lyrics || "");
    setFilename(track?.lyricsFilename || "");
  }, [open, track?.id, track?.lyrics, track?.lyricsFilename]);

  if (!open || !track) return null;
  const type = detectLyricsType(draft);
  const readFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setDraft(text);
    setFilename(file.name);
    event.target.value = "";
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(43,36,42,0.32)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxHeight: '78%', background: '#FFFDF8', borderRadius: '18px 18px 0 0', boxShadow: '0 -18px 42px rgba(80,50,70,0.18)', padding: '16px 18px calc(18px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 16, fontWeight: 700, color: '#2B2420', letterSpacing: 2 }}>歌词</div>
            <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 11, color: '#9E8894', marginTop: 2 }}>{type}</div>
          </div>
          <button type="button" onClick={onClose} style={{ border: 0, background: 'transparent', color: '#7B6874', fontFamily: DD_FONTS.serifCn, fontSize: 13, cursor: 'pointer' }}>取消</button>
        </div>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="粘贴歌词，或上传 .lrc / .txt" className="perle-textarea" style={{ width: '100%', minHeight: 170, maxHeight: 260, resize: 'vertical' }} />
        {filename && <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 11, color: '#9E8894', letterSpacing: 1 }}>{filename}</div>}
        {error && <div role="alert" style={{ fontFamily: DD_FONTS.serifCn, fontSize: 12, color: DD_TOKENS.stamp, letterSpacing: 1 }}>{error}</div>}
        <input ref={fileInputRef} type="file" accept=".lrc,.txt,text/plain" hidden onChange={readFile} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="button" className="perle-soft-button" onClick={() => fileInputRef.current?.click()}>上传文件</button>
          <button type="button" className="perle-danger-button" onClick={() => onDelete(track)} disabled={saving || !track.lyrics} style={{ opacity: saving || !track.lyrics ? 0.48 : 1 }}>删除歌词</button>
          <div style={{ flex: 1 }} />
          <button type="button" className="perle-primary-button" onClick={() => onSave(track, draft, filename)} disabled={saving} style={{ opacity: saving ? 0.65 : 1 }}>保存</button>
        </div>
      </div>
    </div>
  );
}

function PerleMusicB({ tracks, initialTrack, playing, togglePlay, setTrackIdx, progress, duration, onBack, setQueueOpen, onSaveLyrics, onDeleteLyrics, lyricsSaving, lyricsError }) {
  const track = tracks[initialTrack];
  const safeDuration = validSeconds(duration);
  const progressPercent = safeDuration > 0 ? Math.min(100, Math.max(0, (validSeconds(progress) / safeDuration) * 100)) : 0;
  const [lyricsOpen, setLyricsOpen] = useState(false);

  return (
    <div style={{
      width: '100%', height: '100%', backgroundColor: '#F8F4F8',
      backgroundImage: `radial-gradient(ellipse 800px 600px at 50% 30%, ${track?.accent || '#aaa'}40, transparent 60%), radial-gradient(ellipse 600px 400px at 50% 80%, rgba(170,150,200,0.22), transparent)`,
      overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 4px', flexShrink: 0 }}>
        <div onClick={onBack} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: -6 }}>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10 2 L2 10 L10 18" stroke="#2B2420" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ fontFamily: DD_FONTS.handEn, fontSize: 16, color: '#9E8894' }}>now playing</div>
        <div onClick={() => setQueueOpen(true)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: -6 }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M2 2 H18 M2 7 H18 M2 12 H12" stroke="#2B2420" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
      </div>

      <div style={{ padding: '20px 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {track && <BreathOrb accent={track.accent} playing={playing} title={track.title} />}
      </div>

      <div style={{ padding: '4px 24px 0', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 14, color: track?.accent || '#aaa', letterSpacing: 1, marginBottom: 4 }}>{track?.titleEn || ""}</div>
        <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 11, color: '#9E8894', letterSpacing: 3 }}>{track?.artist || 'Unknown'}　·　{track?.album || 'Unknown'}</div>
      </div>

      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 28px 6px' }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <LyricsDisplay track={track} currentTime={progress} />
          {track && <button type="button" className="perle-soft-button" onClick={() => setLyricsOpen(true)} style={{ marginTop: 10, padding: '6px 12px' }}>歌词</button>}
        </div>
      </div>

      <div style={{ flex: '1 1 auto', minHeight: 12 }} />

      <div style={{ padding: '8px 28px 6px', flexShrink: 0 }}>
        <div style={{ height: 2, background: 'rgba(150,120,130,0.18)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progressPercent}%`, background: track?.accent || '#aaa', transition: 'width 0.2s linear' }} />
          <div style={{ position: 'absolute', top: -3, left: `${progressPercent}%`, transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: track?.accent || '#aaa' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: DD_FONTS.serifEn, fontSize: 11, fontStyle: 'italic', color: '#A89C93' }}>
          <span>{formatDuration(progress)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      <div style={{ padding: '8px 24px calc(22px + env(safe-area-inset-bottom, 0px))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexShrink: 0 }}>
        <div onClick={() => setTrackIdx((i) => (i - 1 + tracks.length) % tracks.length)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M16 4 L8 11 L16 18 M6 4 V18" stroke="#2B2420" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div onClick={togglePlay} style={{ width: 56, height: 56, borderRadius: '50%', background: track?.accent || '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {playing ? <svg width="18" height="20" viewBox="0 0 18 20"><rect x="2" y="2" width="4.5" height="16" fill="#FFFDF8" /><rect x="11.5" y="2" width="4.5" height="16" fill="#FFFDF8" /></svg> : <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 3 L17 10 L5 17 Z" fill="#FFFDF8" /></svg>}
        </div>
        <div onClick={() => setTrackIdx((i) => (i + 1) % tracks.length)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M6 4 L14 11 L6 18 M16 4 V18" stroke="#2B2420" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <LyricsEditorPanel track={track} open={lyricsOpen} saving={lyricsSaving} error={lyricsError} onClose={() => setLyricsOpen(false)} onSave={async (...args) => { await onSaveLyrics?.(...args); setLyricsOpen(false); }} onDelete={async (...args) => { await onDeleteLyrics?.(...args); setLyricsOpen(false); }} />
    </div>
  );
}

function QueueDrawer({ open, onClose, tracks, activeIdx, onPick }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(60,40,55,0.18)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.3s', zIndex: 20 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FFFDF8', height: '72%', transform: open ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)', zIndex: 21, borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -10px 30px rgba(80,50,70,0.12)' }}>
        <div onClick={onClose} style={{ padding: '10px 0 6px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ width: 38, height: 4, borderRadius: 999, background: 'rgba(150,120,130,0.28)' }} />
        </div>
        <div style={{ padding: '6px 24px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(150,120,130,0.15)' }}>
          <div>
            <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 18, fontWeight: 700, color: '#2B2420', letterSpacing: 3 }}>歌 单</div>
            <div style={{ fontFamily: DD_FONTS.handEn, fontSize: 13, color: '#9E8894', marginTop: 2 }}>{tracks.length} tracks ♪</div>
          </div>
          <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 12, color: '#9E8894', cursor: 'pointer' }} onClick={onClose}>close</div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px 24px' }}>
          {tracks.map((tr, i) => {
            const active = i === activeIdx;
            return (
              <div key={tr.id} onClick={() => onPick(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 10px', cursor: 'pointer', borderRadius: 8, background: active ? `${tr.accent}22` : 'transparent' }}>
                <div style={{ width: 28, flexShrink: 0, textAlign: 'center', fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 14, color: active ? tr.accent : '#B5A4AB' }}>
                  {active ? <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: tr.accent }} /> : String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 6, background: `linear-gradient(135deg, ${tr.accent || '#aaa'}, ${tr.accent || '#aaa'}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DD_FONTS.handEn, fontSize: 18, color: '#FFFDF8' }}>♪</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 15, fontWeight: active ? 700 : 500, color: '#2B2420', letterSpacing: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tr.title}</div>
                  <div style={{ fontFamily: DD_FONTS.serifCn, fontSize: 11, color: '#9E8894', letterSpacing: 1, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tr.artist}　·　{tr.album}</div>
                </div>
                <div style={{ fontFamily: DD_FONTS.serifEn, fontStyle: 'italic', fontSize: 12, color: '#A89C93', flexShrink: 0 }}>{formatDuration(tr.duration)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ===== Main App Shell =====
export default function PerleApp({ initialPage = 'photos', setPage, onHome }) {
  const [photos, setPhotos] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [screen, setScreen] = useState('library');
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queueOpen, setQueueOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lyricsSaving, setLyricsSaving] = useState(false);
  const [lyricsError, setLyricsError] = useState("");

  const audioRef = useRef(null);

  const loadR2MediaLibrary = async () => {
    const [imageItems, musicItems] = await Promise.all([
      listMediaItems({ type: "image" }),
      listMediaItems({ type: "music" }),
    ]);
    const [imagesWithUrls, musicWithUrls] = await Promise.all([
      withMediaUrls(imageItems),
      withMediaUrls(musicItems),
    ]);
    setPhotos(imagesWithUrls.map(mediaPhotoToPerlePhoto));
    setTracks(musicWithUrls.map(mediaTrackToPerleTrack));
  };

  // Load existing data
  useEffect(() => {
    if (mediaUploadProvider === "r2") {
      loadR2MediaLibrary().catch(console.warn);
      return;
    }

    fetch(apiUrl('/api/perle/photos'))
      .then(r => r.json())
      .then(data => { if (data.photos) setPhotos(data.photos); })
      .catch(console.warn);

    fetch(apiUrl('/api/perle/tracks'))
      .then(r => r.json())
      .then(data => { if (data.tracks) setTracks(data.tracks); })
      .catch(console.warn);
  }, []);

  // Hook up audio player
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => {
      const nextDuration = validSeconds(audio.duration);
      setDuration(nextDuration);
      if (nextDuration > 0) {
        setTracks((prev) => prev.map((track, index) => index === trackIdx && !validSeconds(track.duration) ? { ...track, duration: nextDuration } : track));
      }
      if (playing) audio.play().catch(() => setPlaying(false));
    };
    const handleEnded = () => {
      if (tracks.length > 0) {
        setTrackIdx((prev) => (prev + 1) % tracks.length);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playing, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = tracks[trackIdx];
    if (track && track.url) {
      if (audio.src !== track.url) {
        audio.src = track.url;
        audio.load();
        if (playing) audio.play().catch(() => setPlaying(false));
      }
    } else {
      audio.src = "";
      setPlaying(false);
    }
  }, [trackIdx, tracks, playing]);

  const ensureTrackUrl = async (index) => {
    const track = tracks[index];
    if (!track?.id) return track;
    if (track.url) return track;
    const url = await getMediaItemUrl(track.id);
    const nextTrack = { ...track, url };
    setTracks(prev => prev.map((item, itemIndex) => itemIndex === index ? nextTrack : item));
    return nextTrack;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) {
      document.getElementById("music-input")?.click();
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await ensureTrackUrl(trackIdx).catch(console.warn);
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const openPlayer = async (i) => {
    if (i !== undefined) {
      await ensureTrackUrl(i).catch(console.warn);
      setTrackIdx(i);
      setPlaying(true);
    }
    setScreen('player');
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShown(true));
    });
  };
  const closePlayer = () => {
    setShown(false);
    setScreen('library');
    setTimeout(() => setMounted(false), 480);
  };

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    
    try {
      for (const file of files) {
        if (mediaUploadProvider === "r2") {
          const item = await uploadMediaFile(file, {
            type: "image",
            title: file.name.replace(/\.[^.]+$/, "").trim(),
            metadata: { cat: "all", tags: [], tint: "#e2d5d8", label: file.name.replace(/\.[^.]+$/, "").trim(), original_filename: file.name, agent_id: mediaAgentId },
          });
          const url = await getMediaItemUrl(item.id);
          setPhotos(prev => [mediaPhotoToPerlePhoto({ ...item, url }), ...prev]);
          continue;
        }

        const formData = new FormData();
        formData.append('bucket', 'perle_media');
        formData.append('file', file);
        
        const uploadRes = await fetch(apiUrl('/api/perle/upload'), { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        
        const photoMeta = {
          cat: 'all',
          tint: '#e2d5d8',
          url: uploadData.url,
          label: file.name.replace(/\.[^.]+$/, "").trim()
        };
        
        const dbRes = await fetch(apiUrl('/api/perle/photos'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(photoMeta)
        });
        const dbData = await dbRes.json();
        if (dbData.ok) {
          setPhotos(prev => [dbData.photo, ...prev]);
        }
      }
    } catch (err) {
      console.error('Photo upload failed:', err);
      window.alert?.(err.storage_key ? `文件已上传但登记失败：${err.storage_key}` : "图片上传失败");
    } finally {
      if (mediaUploadProvider === "r2") await loadR2MediaLibrary().catch(console.warn);
      setUploading(false);
    }
    event.target.value = "";
  };

  const formatTitle = (name = "") => name.replace(/\.[^.]+$/, "").trim() || "Unknown Title";

  const handleMusicUpload = async (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("audio/"));
    if (!files.length) return;
    setUploading(true);
    
    try {
      for (const file of files) {
        if (mediaUploadProvider === "r2") {
          const item = await uploadMediaFile(file, {
            type: "music",
            title: formatTitle(file.name),
            artist: "Local Track",
            album: "Imported",
            metadata: { accent: "#C9A7BB", title_en: "", favorite: false, agent_id: mediaAgentId },
          });
          const url = await getMediaItemUrl(item.id);
          setTracks(prev => {
            const merged = [mediaTrackToPerleTrack({ ...item, url }), ...prev];
            if (prev.length === 0) {
              setTrackIdx(0);
              setPlaying(true);
            }
            return merged;
          });
          continue;
        }

        const formData = new FormData();
        formData.append('bucket', 'perle_media');
        formData.append('file', file);
        
        const uploadRes = await fetch(apiUrl('/api/perle/upload'), { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        
        const trackMeta = {
          title: formatTitle(file.name),
          title_en: "",
          artist: "Local Track",
          album: "Imported",
          duration: 0,
          accent: '#C9A7BB',
          url: uploadData.url
        };
        
        const dbRes = await fetch(apiUrl('/api/perle/tracks'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackMeta)
        });
        const dbData = await dbRes.json();
        if (dbData.ok) {
          setTracks(prev => {
            const merged = [dbData.track, ...prev];
            if (prev.length === 0) {
              setTrackIdx(0);
              setPlaying(true);
            }
            return merged;
          });
        }
      }
    } catch (err) {
      console.error('Music upload failed:', err);
      window.alert?.(err.storage_key ? `文件已上传但登记失败：${err.storage_key}` : "音乐上传失败");
    } finally {
      if (mediaUploadProvider === "r2") await loadR2MediaLibrary().catch(console.warn);
      setUploading(false);
    }
    event.target.value = "";
  };

  const handleToggleFavoriteTrack = async (trackId) => {
    const track = tracks.find((item) => item.id === trackId);
    if (!track) return;
    const nextFavorite = !isFavoriteTrack(track);
    const prevTracks = tracks;
    setTracks(prev => prev.map(item => item.id === trackId ? { ...item, favorite: nextFavorite } : item));
    try {
      if (mediaUploadProvider === "r2") {
        const currentMeta = track.media_item?.metadata && typeof track.media_item.metadata === "object" ? track.media_item.metadata : {};
        const item = await updateMediaItem(trackId, {
          metadata: { ...currentMeta, favorite: nextFavorite, liked: nextFavorite, heart: nextFavorite, agent_id: currentMeta.agent_id || mediaAgentId },
        });
        setTracks(prev => prev.map(itemTrack => itemTrack.id === trackId ? mediaTrackToPerleTrack({ ...item, url: itemTrack.url }) : itemTrack));
        return;
      }
      const response = await fetch(apiUrl(`/api/perle/tracks/${trackId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: nextFavorite })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      setTracks(prevTracks);
      console.error('Favorite update failed:', error);
      window.alert?.("心选保存失败");
    }
  };

  const patchTrackLyricsState = (trackId, patch) => {
    setTracks(prev => prev.map(track => track.id === trackId ? { ...track, ...patch } : track));
  };

  const saveTrackLyrics = async (track, lyrics, filename = "") => {
    if (!track?.id) return;
    const cleanLyrics = String(lyrics || "");
    const lyricsType = detectLyricsType(cleanLyrics);
    const prevTracks = tracks;
    setLyricsSaving(true);
    setLyricsError("");
    patchTrackLyricsState(track.id, { lyrics: cleanLyrics, lyricsType, lyricsFilename: filename });
    try {
      if (mediaUploadProvider === "r2") {
        const item = await updateMediaItemLyrics(track.id, {
          agent_id: mediaAgentId,
          lyrics: cleanLyrics,
          lyrics_type: lyricsType,
          lyrics_filename: filename,
        });
        setTracks(prev => prev.map(itemTrack => itemTrack.id === track.id ? mediaTrackToPerleTrack({ ...item, url: itemTrack.url }) : itemTrack));
        return;
      }
      const response = await fetch(apiUrl(`/api/perle/tracks/${encodeURIComponent(track.id)}/lyrics`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: mediaAgentId, lyrics: cleanLyrics, lyrics_type: lyricsType, lyrics_filename: filename }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      setTracks(prevTracks);
      setLyricsError(error?.message || "歌词保存失败");
      throw error;
    } finally {
      setLyricsSaving(false);
    }
  };

  const deleteTrackLyrics = async (track) => {
    if (!track?.id) return;
    await saveTrackLyrics(track, "", "");
  };

  const handleTagUpdate = async (photoId, tag) => {
    const photo = photos.find((p) => p.id === photoId);
    if (!photo) throw new Error("Photo not found.");
    const nextTag = String(tag || "").trim();
    if (!nextTag) return;
    const prevPhotos = photos;
    const nextTags = Array.from(new Set([...(photo.tags || []), nextTag]));
    const nextPhoto = { ...photo, cat: nextTag, tags: nextTags };
    setPhotos(prev => prev.map(p => p.id === photoId ? nextPhoto : p));
    try {
      if (mediaUploadProvider === "r2") {
        const currentMeta = photo.media_item?.metadata && typeof photo.media_item.metadata === "object" ? photo.media_item.metadata : {};
        const item = await updateMediaItem(photoId, {
          agent_id: mediaAgentId,
          metadata: { ...currentMeta, cat: nextTag, tags: nextTags, label: photo.label, original_filename: photo.originalName || currentMeta.original_filename || "", agent_id: currentMeta.agent_id || mediaAgentId },
        });
        setPhotos(prev => prev.map(p => p.id === photoId ? mergePhotoFromMediaResponse(p, item, { cat: nextTag, tags: nextTags }) : p));
        return;
      }
      const response = await fetch(apiUrl(`/api/perle/photos/${photoId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cat: nextTag, agent_id: mediaAgentId })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      setPhotos(prevPhotos);
      console.error('Tag update failed:', err);
      throw err;
    }
  };

  const handlePhotoDelete = async (photoId) => {
    const prevPhotos = photos;
    setPhotos(prev => prev.filter(p => p.id !== photoId));
    try {
      if (mediaUploadProvider === "r2") {
        await deleteMediaItem(photoId, false);
        return;
      }
      const response = await fetch(apiUrl(`/api/perle/photos/${photoId}`), { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      setPhotos(prevPhotos);
      console.error('Photo delete failed:', err);
      throw err;
    }
  };

  const handlePhotoRename = async (photoId, name) => {
    const photo = photos.find((p) => p.id === photoId);
    if (!photo) throw new Error("Photo not found.");
    const nextName = String(name || "").trim();
    if (!nextName) throw new Error("Name cannot be empty.");
    const prevPhotos = photos;
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, title: nextName, label: nextName } : p));
    try {
      if (mediaUploadProvider === "r2") {
        const currentMeta = photo.media_item?.metadata && typeof photo.media_item.metadata === "object" ? photo.media_item.metadata : {};
        const item = await updateMediaItem(photoId, {
          agent_id: mediaAgentId,
          title: nextName,
          metadata: { ...currentMeta, title: nextName, label: nextName, name: nextName, tags: photo.tags || [], cat: photo.cat || "all", original_filename: photo.originalName || currentMeta.original_filename || "", agent_id: currentMeta.agent_id || mediaAgentId },
        });
        setPhotos(prev => prev.map(p => p.id === photoId ? mergePhotoFromMediaResponse(p, item, { title: nextName, label: nextName }) : p));
        return;
      }
      const response = await fetch(apiUrl(`/api/perle/photos/${photoId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: nextName, agent_id: mediaAgentId })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      setPhotos(prevPhotos);
      console.error('Photo rename failed:', err);
      throw err;
    }
  };

  // Setup window callbacks for legacy triggers if necessary
  useEffect(() => {
    window.onPhotoFiles = handlePhotoUpload;
    window.onMusicFiles = handleMusicUpload;
    window.pickMusicFiles = () => document.getElementById("music-input")?.click();
    window.togglePlay = togglePlay;
    window.playNextTrack = () => {
      if (!tracks.length) return document.getElementById("music-input")?.click();
      setTrackIdx((prev) => (prev + 1) % tracks.length);
    };
    window.playPrevTrack = () => {
      if (!tracks.length) return document.getElementById("music-input")?.click();
      setTrackIdx((prev) => (prev - 1 + tracks.length) % tracks.length);
    };
  }, [tracks.length, playing]);

  useEffect(() => {
    function ensureLegacyStylesheet(id, href) {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
    ensureLegacyStylesheet("legacy-index-css", "/legacy-apps/legacy-index.css");
  }, []);

  return (
    <div className="perle-root" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PerleScopedStyles />
      <input id="photo-input" type="file" accept="image/*" multiple hidden onChange={handlePhotoUpload} />
      <input id="music-input" type="file" accept="audio/*" multiple hidden onChange={handleMusicUpload} />
      <audio ref={audioRef} id="home-audio" preload="metadata" hidden />
      
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        {initialPage === 'photos' ? (
          <PerleGalleryA
            photos={photos}
            onAddPhotos={() => document.getElementById("photo-input")?.click()}
            onHome={onHome}
            onTagUpdate={handleTagUpdate}
            onRename={handlePhotoRename}
            onDelete={handlePhotoDelete}
          />
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <PerleMusicLibrary
              tracks={tracks}
              activeIdx={trackIdx}
              playing={playing}
              playerOpen={mounted}
              onPick={openPlayer}
              onOpenPlayer={() => openPlayer()}
              onNext={() => setTrackIdx((current) => tracks.length ? (current + 1) % tracks.length : current)}
              onAddMusic={() => document.getElementById("music-input")?.click()}
              onHome={onHome}
              onToggleFavorite={handleToggleFavoriteTrack}
            />
          </div>
        )}
      </div>

      <div className="media-page-tabbar" style={{ position: 'relative', bottom: 'auto', flexShrink: 0, margin: '0 16px calc(12px + env(safe-area-inset-bottom, 0px))' }}>
        <button className={`media-page-tab ${initialPage === 'photos' ? 'active' : ''}`} type="button" onClick={() => setPage('photos')}>
          <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </button>
        <button className={`media-page-tab ${initialPage === 'music' ? 'active' : ''}`} type="button" onClick={() => setPage('music')}>
          <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18V7.8l9-1.8v10.4"/><circle cx="7.4" cy="18" r="2.2"/><circle cx="16.4" cy="16.2" r="2.2"/></svg>
        </button>
      </div>

      {mounted && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.94)',
          opacity: shown ? 1 : 0.4, transformOrigin: 'center bottom',
          transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
          boxShadow: shown ? '0 -20px 60px rgba(80,50,80,0.18)' : 'none', background: '#F8F4F8'
        }}>
          <PerleMusicB
            tracks={tracks}
            initialTrack={trackIdx}
            playing={playing}
            togglePlay={togglePlay}
            setTrackIdx={setTrackIdx}
            progress={progress}
            duration={duration}
            onBack={closePlayer}
            setQueueOpen={setQueueOpen}
            onSaveLyrics={saveTrackLyrics}
            onDeleteLyrics={deleteTrackLyrics}
            lyricsSaving={lyricsSaving}
            lyricsError={lyricsError}
          />
          <QueueDrawer
            open={queueOpen}
            onClose={() => setQueueOpen(false)}
            tracks={tracks}
            activeIdx={trackIdx}
            onPick={(i) => { setTrackIdx(i); setPlaying(true); setQueueOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}
