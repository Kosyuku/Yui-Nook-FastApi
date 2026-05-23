import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "./apiBase.js";

const TOKENS = {
  paper: "#EFE9E2",
  paperDeep: "#E7DED3",
  cream: "#FBF7F2",
  ink: "#2B2420",
  inkSoft: "#6B5F58",
  inkFaint: "#A89C93",
  rule: "rgba(120,90,70,.18)",
  gold: "#B08458",
  stamp: "#B84A3E",
};

const FONTS = {
  serifCn: '"Noto Serif SC", serif',
  serifEn: '"Cormorant Garamond", serif',
  handEn: '"Caveat", cursive',
};

const TYPE_LABEL = {
  all: { cn: "全部", en: "all" },
  html: { cn: "网页", en: "html" },
  page: { cn: "惊喜", en: "page" },
  game: { cn: "游戏", en: "game" },
  widget: { cn: "组件", en: "widget" },
};

const TYPE_OPTIONS = ["html", "page", "game", "widget"];

const EMPTY_FORM = {
  title: "",
  description: "",
  type: "html",
  content: "<!doctype html>\n<html>\n  <body>\n    <button onclick=\"this.textContent='点到了'\">点我</button>\n  </body>\n</html>",
  storage_mode: "inline",
  cover_url: "",
  tags: "",
  agent_id: "",
  is_pinned: false,
};

function shade(hex, amt) {
  const n = parseInt(String(hex || "#000000").slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function fallbackName(agentId = "") {
  if (!agentId) return "未知";
  const map = { azheng: "阿筝", zhansi: "湛思", ayan: "阿砚" };
  return map[agentId] || agentId;
}

function sealColor(agentId = "") {
  const colors = ["#B84A3E", "#5B7A6A", "#8B6788", "#B08458", "#6E6B8E"];
  let sum = 0;
  String(agentId || "curio").split("").forEach((ch) => { sum += ch.charCodeAt(0); });
  return colors[sum % colors.length];
}

function parseTags(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "")
    .split(/[,，\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sanitizeArtifactHtml(html) {
  return String(html || "")
    .replace(/^\s*```(?:html)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "");
}

function normalizeItem(row = {}) {
  const storageMode = String(row.storage_mode || "inline").toLowerCase();
  const content = String(row.content || "");
  const objectKey = String(row.object_key || (storageMode === "r2" ? content : "") || "");
  return {
    id: String(row.id || ""),
    title: String(row.title || "未命名 artifact"),
    description: String(row.description || ""),
    type: TYPE_OPTIONS.includes(String(row.type || "").toLowerCase()) ? String(row.type).toLowerCase() : "html",
    content,
    storage_mode: storageMode,
    object_key: objectKey,
    cover_url: String(row.cover_url || ""),
    tags: parseTags(row.tags),
    agent_id: String(row.agent_id || ""),
    is_pinned: Boolean(row.is_pinned),
    created_at: String(row.created_at || ""),
    updated_at: String(row.updated_at || ""),
  };
}

function itemToForm(item) {
  const normalized = normalizeItem(item);
  return {
    title: normalized.title,
    description: normalized.description,
    type: normalized.type,
    content: normalized.content,
    storage_mode: "inline",
    cover_url: normalized.cover_url,
    tags: normalized.tags.join("，"),
    agent_id: normalized.agent_id,
    is_pinned: normalized.is_pinned,
  };
}

function formToPayload(form) {
  return {
    title: String(form.title || "").trim(),
    description: String(form.description || "").trim(),
    type: String(form.type || "html").trim(),
    content: String(form.content || ""),
    storage_mode: "inline",
    cover_url: String(form.cover_url || "").trim(),
    tags: parseTags(form.tags),
    agent_id: String(form.agent_id || "").trim(),
    is_pinned: Boolean(form.is_pinned),
  };
}

async function requestJson(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.detail || data?.message || `HTTP ${response.status}`);
  return data;
}

function WaxSeal({ agentId, size = 28 }) {
  const color = sealColor(agentId);
  const text = (fallbackName(agentId).slice(0, 1) || "匣");
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 30%, ${color}EE 0%, ${color} 55%, ${shade(color, -20)} 100%)`,
      color: "#FFFBF4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONTS.serifCn,
      fontWeight: 600,
      fontSize: size * 0.42,
      boxShadow: "inset 0 -1px 2px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.25)",
      position: "relative",
      flex: `0 0 ${size}px`,
    }}>
      {text}
    </div>
  );
}

function CurioCard({ item, onOpen }) {
  const [hover, setHover] = useState(false);
  const color = sealColor(item.agent_id);
  const glyph = item.cover_url ? "" : (TYPE_LABEL[item.type]?.cn || "匣").slice(0, 1);
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        border: 0,
        padding: 0,
        textAlign: "left",
        background: "transparent",
        borderRadius: 7,
        transition: "transform .35s cubic-bezier(.2,.7,.2,1), filter .35s",
        transform: hover ? "translateY(-3px)" : "none",
        filter: hover ? "drop-shadow(0 14px 18px rgba(80,50,30,.18))" : "drop-shadow(0 3px 8px rgba(80,50,30,.07))",
        width: "100%",
      }}
    >
      {item.is_pinned && <div style={{ position: "absolute", top: -2, right: 16, width: 14, height: 30, background: color, zIndex: 5, clipPath: "polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)" }} />}
      <div style={{
        width: "100%",
        height: 104,
        background: item.cover_url ? `center / cover url("${item.cover_url}")` : "#FBF7F2",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: "6px 6px 0 0",
        transform: hover ? "perspective(400px) rotateX(-18deg) translateY(-2px)" : "none",
        transformOrigin: "top center",
        transition: "transform .45s cubic-bezier(.2,.7,.2,1)",
        overflow: "hidden",
      }}>
        {!item.cover_url && <div style={{ position: "absolute", inset: 0, opacity: 0.18, mixBlendMode: "overlay", backgroundImage: "repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,.18) 3px 4px)" }} />}
        <div style={{ fontFamily: FONTS.serifCn, fontSize: 40, fontWeight: 500, position: "relative", zIndex: 2 }}>{glyph}</div>
        <div style={{ position: "absolute", bottom: 6, right: 8, fontFamily: FONTS.serifEn, fontStyle: "italic", fontSize: 9, letterSpacing: 1.5, opacity: 0.72 }}>{TYPE_LABEL[item.type]?.en || item.type}</div>
      </div>
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 6, background: TOKENS.cream, borderRadius: "0 0 6px 6px", borderTop: `1px dashed ${TOKENS.rule}` }}>
        <div style={{ fontFamily: FONTS.serifCn, fontSize: 13, fontWeight: 600, color: TOKENS.ink, lineHeight: 1.4, letterSpacing: 0.3 }}>{item.title}</div>
        <div style={{ fontFamily: FONTS.serifCn, fontSize: 10, color: TOKENS.inkSoft, lineHeight: 1.6, letterSpacing: 0.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.description || "没有描述"}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, paddingTop: 6, borderTop: `0.5px solid ${TOKENS.rule}` }}>
          <WaxSeal agentId={item.agent_id} size={18} />
          <span style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkFaint, letterSpacing: 1 }}>{fallbackName(item.agent_id)}</span>
          <div style={{ flex: 1 }} />
          {item.tags.slice(0, 1).map((tag) => (
            <span key={tag} style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkSoft, letterSpacing: 1, padding: "2px 6px", borderRadius: 999, background: `${color}18` }}>{tag}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function EditorSheet({ mode, form, onChange, onCancel, onSave, saving }) {
  if (!mode) return null;
  const title = mode === "create" ? "new curio" : "edit curio";
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 120, background: "rgba(40,30,20,.48)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end" }} onClick={onCancel}>
      <section onClick={(event) => event.stopPropagation()} style={{ width: "100%", maxHeight: "92%", overflow: "auto", background: TOKENS.cream, borderRadius: "18px 18px 0 0", boxShadow: "0 -18px 42px rgba(40,30,20,.24)", padding: "18px 18px calc(18px + env(safe-area-inset-bottom))" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: FONTS.serifEn, fontSize: 30, fontStyle: "italic", color: TOKENS.ink }}>{title}</div>
          <button type="button" style={ghostBtn} onClick={onCancel}>取消</button>
        </div>
        <div style={formGrid}>
          <Field label="标题"><input style={inputStyle} value={form.title} onChange={(e) => onChange({ title: e.target.value })} /></Field>
          <Field label="描述"><input style={inputStyle} value={form.description} onChange={(e) => onChange({ description: e.target.value })} /></Field>
          <Field label="类型">
            <select style={inputStyle} value={form.type} onChange={(e) => onChange({ type: e.target.value })}>
              {TYPE_OPTIONS.map((type) => <option key={type} value={type}>{TYPE_LABEL[type].cn} / {type}</option>)}
            </select>
          </Field>
          <Field label="agent_id"><input style={inputStyle} value={form.agent_id} placeholder="azheng / zhansi / ayan" onChange={(e) => onChange({ agent_id: e.target.value })} /></Field>
          <Field label="封面 URL"><input style={inputStyle} value={form.cover_url} onChange={(e) => onChange({ cover_url: e.target.value })} /></Field>
          <Field label="标签"><input style={inputStyle} value={form.tags} placeholder="520，惊喜，游戏" onChange={(e) => onChange({ tags: e.target.value })} /></Field>
          <label style={{ ...fieldWrap, flexDirection: "row", alignItems: "center" }}>
            <input type="checkbox" checked={form.is_pinned} onChange={(e) => onChange({ is_pinned: e.target.checked })} />
            <span style={labelStyle}>置顶</span>
          </label>
          <Field label="HTML content">
            <textarea style={{ ...inputStyle, minHeight: 220, borderRadius: 10, fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace", fontSize: 11, lineHeight: 1.55 }} value={form.content} onChange={(e) => onChange({ content: e.target.value })} />
          </Field>
        </div>
        <button type="button" style={{ ...primaryBtn, width: "100%", marginTop: 14 }} disabled={saving} onClick={onSave}>{saving ? "保存中..." : "保存 artifact"}</button>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return <label style={fieldWrap}><span style={labelStyle}>{label}</span>{children}</label>;
}

function PreviewModal({ item, onClose, onEdit, onDelete, onTogglePin }) {
  if (!item) return null;
  const srcdoc = sanitizeArtifactHtml(item.content);
  const meta = [fallbackName(item.agent_id), ...item.tags].filter(Boolean).join(" · ");
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(40,30,20,.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} style={{ width: "100%", height: "92%", maxHeight: 760, background: TOKENS.cream, borderRadius: 8, overflow: "hidden", boxShadow: "0 30px 60px rgba(40,30,20,.4)", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ padding: "12px 14px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: `0.5px solid ${TOKENS.rule}`, background: TOKENS.paperDeep }}>
          <WaxSeal agentId={item.agent_id} size={26} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.serifCn, fontSize: 13, fontWeight: 600, color: TOKENS.ink, letterSpacing: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
            <div style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkFaint, letterSpacing: 1.5, marginTop: 1 }}>{meta || "inline artifact"}</div>
          </div>
          <button style={iconBtn} title="编辑" onClick={() => onEdit(item)}>✎</button>
          <button style={iconBtn} title="新窗口" onClick={() => window.open(`data:text/html;charset=utf-8,${encodeURIComponent(srcdoc)}`, "_blank", "noopener,noreferrer")}>↗</button>
          <button onClick={onClose} style={iconBtn} title="关闭">×</button>
        </div>
        <div style={{ padding: 10, background: TOKENS.paperDeep, display: "flex", flex: 1, minHeight: 0 }}>
          <iframe
            sandbox="allow-scripts allow-forms allow-popups"
            srcDoc={srcdoc}
            title={item.title}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: 4, background: "#fff", boxShadow: "0 4px 14px rgba(40,30,20,.12)", display: "block" }}
          />
        </div>
        <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: `0.5px solid ${TOKENS.rule}`, background: TOKENS.cream }}>
          <button type="button" style={pillBtn(item.is_pinned ? TOKENS.stamp : null)} onClick={() => onTogglePin(item)}>{item.is_pinned ? "已置顶" : "置顶"}</button>
          <button type="button" style={pillBtn()} onClick={() => onEdit(item)}>编辑</button>
          <button type="button" style={{ ...pillBtn(), color: TOKENS.stamp, borderColor: `${TOKENS.stamp}88` }} onClick={() => onDelete(item)}>删除</button>
          <div style={{ flex: 1 }} />
          <button type="button" style={{ ...pillBtn(), color: TOKENS.inkFaint }} onClick={onClose}>收起</button>
        </div>
      </div>
    </div>
  );
}

const iconBtn = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "none",
  background: "transparent",
  color: TOKENS.inkSoft,
  cursor: "pointer",
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};

const pillBtn = (active) => ({
  fontFamily: FONTS.serifCn,
  fontSize: 10,
  letterSpacing: 1.5,
  padding: "6px 12px",
  borderRadius: 999,
  border: `0.5px solid ${active || TOKENS.rule}`,
  background: active ? `${active}18` : TOKENS.paperDeep,
  color: active || TOKENS.inkSoft,
  cursor: "pointer",
});

const primaryBtn = {
  ...pillBtn(TOKENS.ink),
  background: TOKENS.ink,
  color: TOKENS.cream,
  borderColor: TOKENS.ink,
  minHeight: 36,
};

const ghostBtn = {
  ...pillBtn(),
  background: "transparent",
};

const formGrid = {
  display: "grid",
  gap: 10,
};

const fieldWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle = {
  fontFamily: FONTS.serifCn,
  fontSize: 11,
  color: TOKENS.inkSoft,
  letterSpacing: 1,
};

const inputStyle = {
  width: "100%",
  border: `0.5px solid ${TOKENS.rule}`,
  borderRadius: 999,
  background: "#FFFCF8",
  padding: "10px 12px",
  fontFamily: FONTS.serifCn,
  fontSize: 12,
  color: TOKENS.ink,
  outline: "none",
};

export default function CurioApp() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [agent, setAgent] = useState("all");
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [editorMode, setEditorMode] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    setError("");
    try {
      const data = await requestJson("/api/artifacts?limit=120");
      const rows = Array.isArray(data.items) ? data.items : [];
      setItems(rows.map(normalizeItem));
    } catch (err) {
      setItems([]);
      setError(`Curio 后端没回话：${err.message}`);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => { loadItems(); }, []);

  const tabs = useMemo(() => [
    { id: "all", cn: "全部", count: items.length },
    { id: "html", cn: "网页", count: items.filter((item) => item.type === "html").length },
    { id: "game", cn: "游戏", count: items.filter((item) => item.type === "game").length },
    { id: "page", cn: "惊喜", count: items.filter((item) => item.type === "page").length },
    { id: "widget", cn: "组件", count: items.filter((item) => item.type === "widget").length },
  ], [items]);

  const agentIds = useMemo(() => {
    const ids = items.map((item) => item.agent_id).filter(Boolean);
    return ["all", ...Array.from(new Set(ids))];
  }, [items]);

  const filtered = useMemo(() => {
    return items
      .filter((item) => filter === "all" || item.type === filter)
      .filter((item) => agent === "all" || item.agent_id === agent)
      .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned) || String(b.created_at).localeCompare(String(a.created_at)));
  }, [agent, filter, items]);

  const columns = [filtered.filter((_, index) => index % 2 === 0), filtered.filter((_, index) => index % 2 === 1)];

  function openCreate() {
    setEditingId("");
    setForm(EMPTY_FORM);
    setEditorMode("create");
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm(itemToForm(item));
    setEditorMode("edit");
  }

  async function saveForm() {
    const payload = formToPayload(form);
    if (!payload.title) {
      setError("标题不能为空。");
      return;
    }
    setSaving(true);
    try {
      const path = editorMode === "edit" && editingId
        ? `/api/artifacts/${encodeURIComponent(editingId)}`
        : "/api/artifacts";
      const method = editorMode === "edit" && editingId ? "PATCH" : "POST";
      const data = await requestJson(path, { method, body: JSON.stringify(payload) });
      await loadItems();
      if (data.item) setActive(normalizeItem(data.item));
      setEditorMode("");
      setEditingId("");
    } catch (err) {
      setError(`保存失败：${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(item) {
    if (!window.confirm(`删除「${item.title}」？`)) return;
    try {
      await requestJson(`/api/artifacts/${encodeURIComponent(item.id)}`, { method: "DELETE" });
      setActive(null);
      await loadItems();
    } catch (err) {
      setError(`删除失败：${err.message}`);
    }
  }

  async function togglePin(item) {
    try {
      await requestJson(`/api/artifacts/${encodeURIComponent(item.id)}/pin`, {
        method: item.is_pinned ? "DELETE" : "POST",
      });
      const next = { ...item, is_pinned: !item.is_pinned };
      setActive(next);
      setItems((current) => current.map((entry) => entry.id === item.id ? normalizeItem(next) : entry));
    } catch (err) {
      setError(`置顶失败：${err.message}`);
    }
  }

  return (
    <main style={{
      width: "100%",
      height: "100%",
      background: TOKENS.paper,
      backgroundImage: "radial-gradient(ellipse 700px 400px at 30% 5%, rgba(255,238,220,.5), transparent), radial-gradient(ellipse 500px 400px at 90% 95%, rgba(232,212,222,.35), transparent), repeating-linear-gradient(90deg, transparent 0 56px, rgba(160,120,85,.025) 56px 57px)",
      overflow: "auto",
      paddingTop: 14,
      position: "relative",
    }} className="phone-scroll">
      <div style={{ padding: "4px 20px 14px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontFamily: FONTS.serifEn, fontStyle: "italic", fontWeight: 400, fontSize: 32, color: TOKENS.ink, letterSpacing: 0.5, lineHeight: 1 }}>Curio</div>
          <div style={{ fontFamily: FONTS.serifCn, fontSize: 10, color: TOKENS.inkSoft, letterSpacing: 5, marginTop: 4, paddingLeft: 1 }}>奇 · 匣</div>
        </div>
        <button type="button" style={primaryBtn} onClick={openCreate}>＋ 新建</button>
      </div>

      <div style={{ padding: "0 20px 14px", display: "flex", gap: 16, overflowX: "auto", borderBottom: `0.5px solid ${TOKENS.rule}` }}>
        {tabs.map((tab) => {
          const on = filter === tab.id;
          return (
            <button key={tab.id} type="button" onClick={() => setFilter(tab.id)} style={{ cursor: "pointer", padding: "0 0 10px", position: "relative", display: "flex", alignItems: "baseline", gap: 4, flexShrink: 0, border: 0, background: "transparent" }}>
              <span style={{ fontFamily: FONTS.serifCn, fontSize: 13, fontWeight: on ? 600 : 400, color: on ? TOKENS.ink : TOKENS.inkSoft, letterSpacing: 1.5 }}>{tab.cn}</span>
              <span style={{ fontFamily: FONTS.serifEn, fontStyle: "italic", fontSize: 10, color: TOKENS.inkFaint, letterSpacing: 0.5 }}>{tab.count}</span>
              {on && <div style={{ position: "absolute", bottom: -0.5, left: 0, right: 0, height: 1.5, background: TOKENS.ink }} />}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: FONTS.handEn, fontSize: 16, color: TOKENS.gold }}>{filtered.length} kept</span>
        <span style={{ fontFamily: FONTS.serifCn, fontSize: 10, color: TOKENS.inkFaint, letterSpacing: 2 }}>· 真实 API</span>
        <div style={{ flex: 1 }} />
        {agentIds.length > 1 && (
          <select value={agent} onChange={(e) => setAgent(e.target.value)} style={{ ...inputStyle, width: 112, padding: "6px 9px", fontSize: 11 }}>
            {agentIds.map((id) => <option key={id} value={id}>{id === "all" ? "全部 agent" : fallbackName(id)}</option>)}
          </select>
        )}
      </div>

      {error && <div style={{ margin: "10px 20px 0", padding: "8px 10px", border: `0.5px solid ${TOKENS.rule}`, borderRadius: 6, background: TOKENS.cream, color: TOKENS.inkSoft, fontFamily: FONTS.serifCn, fontSize: 11 }}>{error}</div>}
      {!loaded && <div style={{ padding: 20, color: TOKENS.inkFaint, fontFamily: FONTS.serifCn, fontSize: 12 }}>翻匣子中...</div>}
      {loaded && !filtered.length && (
        <div style={{ margin: 20, padding: "28px 18px", border: `0.5px dashed ${TOKENS.rule}`, borderRadius: 8, background: "rgba(255,255,255,.28)", textAlign: "center", fontFamily: FONTS.serifCn, color: TOKENS.inkSoft, fontSize: 12, lineHeight: 1.8 }}>
          匣子是空的。<br />点右上角新建一个 HTML 小玩意。
        </div>
      )}

      <div style={{ padding: "16px 20px 64px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        {columns.map((column, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1, marginTop: index ? 22 : 0 }}>
            {column.map((item) => <CurioCard key={item.id} item={item} onOpen={setActive} />)}
          </div>
        ))}
      </div>

      <PreviewModal item={active} onClose={() => setActive(null)} onEdit={openEdit} onDelete={deleteItem} onTogglePin={togglePin} />
      <EditorSheet mode={editorMode} form={form} saving={saving} onChange={(patch) => setForm((current) => ({ ...current, ...patch }))} onCancel={() => setEditorMode("")} onSave={saveForm} />
    </main>
  );
}
