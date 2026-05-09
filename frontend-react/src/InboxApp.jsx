import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "./apiBase.js";
import "./InboxApp.css";

// ── 常量 ────────────────────────────────────────────────────
const TYPE_LABELS = { todo: "待办", note: "笔记", idea: "想法", event: "日程" };
const TYPE_ICONS  = { todo: "✓", note: "✎", idea: "✦", event: "◷" };
const STATUS_LABELS = { accepted: "收件箱", done: "已完成", dismissed: "已忽略", pending: "待确认" };
const MODULE_LABELS = { inbox: "收件箱", folio: "Folio", perle: "Perle", drift: "日历" };
const TYPE_COLORS = {
  todo:  { bg: "rgba(200,160,120,0.12)", border: "rgba(200,160,120,0.35)", text: "#a07848" },
  note:  { bg: "rgba(120,160,200,0.12)", border: "rgba(120,160,200,0.35)", text: "#4878a0" },
  idea:  { bg: "rgba(160,120,200,0.12)", border: "rgba(160,120,200,0.35)", text: "#7848a0" },
  event: { bg: "rgba(120,200,160,0.12)", border: "rgba(120,200,160,0.35)", text: "#489070" },
};
const VALID_TYPES   = ["todo", "note", "idea", "event"];
const VALID_MODULES = ["inbox", "folio", "perle", "drift"];
const FILTER_STATUSES = ["all", "accepted", "done", "dismissed"];
const FILTER_TYPES    = ["all", "todo", "note", "idea", "event"];

function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "刚刚";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  } catch { return ""; }
}

// ── API 层 ──────────────────────────────────────────────────
async function apiFetchItems(params = {}) {
  const q = new URLSearchParams();
  if (params.status && params.status !== "all") q.set("status", params.status);
  if (params.type   && params.type   !== "all") q.set("type",   params.type);
  if (params.limit)  q.set("limit",  params.limit);
  if (params.offset) q.set("offset", params.offset);
  const r = await fetch(apiUrl(`/api/extracted-items?${q}`));
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).items || [];
}

async function apiCreate(body) {
  const r = await fetch(apiUrl("/api/extracted-items"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).item;
}

async function apiUpdate(id, body) {
  const r = await fetch(apiUrl(`/api/extracted-items/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function apiDelete(id) {
  const r = await fetch(apiUrl(`/api/extracted-items/${id}`), { method: "DELETE" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

// ── TypeBadge ────────────────────────────────────────────────
function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || TYPE_COLORS.todo;
  return (
    <span className="inbox-type-badge" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
      {TYPE_ICONS[type]} {TYPE_LABELS[type]}
    </span>
  );
}

// ── ItemCard ─────────────────────────────────────────────────
function ItemCard({ item, onDone, onDismiss, onDelete, onEdit }) {
  const isDone      = item.status === "done";
  const isDismissed = item.status === "dismissed";
  const isTerminal  = isDone || isDismissed;

  return (
    <div className={`inbox-card ${isTerminal ? "inbox-card-terminal" : ""}`}>
      <div className="inbox-card-top">
        <TypeBadge type={item.type} />
        <span className="inbox-card-time">{formatDate(item.updated_at || item.created_at)}</span>
      </div>

      <div className="inbox-card-title" style={{ opacity: isTerminal ? 0.5 : 1 }}>
        {isDone && <span className="inbox-done-mark">✓ </span>}
        {item.title}
      </div>

      {item.content && (
        <div className="inbox-card-content">{item.content}</div>
      )}

      {item.source_excerpt && (
        <div className="inbox-card-excerpt">💬 {item.source_excerpt}</div>
      )}

      <div className="inbox-card-meta">
        {item.agent_id && (
          <span className="inbox-meta-tag">来自 {item.agent_id}</span>
        )}
        {item.target_module && item.target_module !== "inbox" && (
          <span className="inbox-meta-tag">{MODULE_LABELS[item.target_module] || item.target_module}</span>
        )}
        {isDone      && <span className="inbox-meta-tag inbox-tag-done">已完成</span>}
        {isDismissed && <span className="inbox-meta-tag inbox-tag-dismissed">已忽略</span>}
      </div>

      <div className="inbox-card-actions">
        {!isTerminal && (
          <>
            <button className="inbox-btn inbox-btn-done" onClick={() => onDone(item.id)} title="标为完成">✓ 完成</button>
            <button className="inbox-btn inbox-btn-dismiss" onClick={() => onDismiss(item.id)} title="忽略">× 忽略</button>
            <button className="inbox-btn inbox-btn-edit" onClick={() => onEdit(item)} title="编辑">编辑</button>
          </>
        )}
        <button className="inbox-btn inbox-btn-delete" onClick={() => onDelete(item.id)} title="删除">删除</button>
      </div>
    </div>
  );
}

// ── AddModal ──────────────────────────────────────────────────
function AddModal({ onSave, onClose }) {
  const [type, setType]     = useState("todo");
  const [title, setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [module, setModule] = useState("inbox");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  async function handleSave() {
    if (!title.trim()) { setError("请填写标题"); return; }
    setSaving(true); setError("");
    try {
      await onSave({ type, title: title.trim(), content: content.trim(), target_module: module });
      onClose();
    } catch (e) {
      setError(e.message || "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="inbox-modal-backdrop" onClick={onClose}>
      <div className="inbox-modal" onClick={e => e.stopPropagation()}>
        <div className="inbox-modal-head">
          <strong>新建事项</strong>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="inbox-modal-body">
          <div className="inbox-form-row">
            <label>类型</label>
            <div className="inbox-type-picker">
              {VALID_TYPES.map(t => (
                <button key={t} className={`inbox-type-opt ${type === t ? "active" : ""}`} onClick={() => setType(t)}>
                  {TYPE_ICONS[t]} {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <div className="inbox-form-row">
            <label>标题 *</label>
            <input
              className="inbox-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="事项标题"
              autoFocus
              onKeyDown={e => e.key === "Enter" && handleSave()}
            />
          </div>

          <div className="inbox-form-row">
            <label>内容</label>
            <textarea
              className="inbox-input inbox-textarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="详细内容（可选）"
              rows={3}
            />
          </div>

          <div className="inbox-form-row">
            <label>目标模块</label>
            <select className="inbox-select" value={module} onChange={e => setModule(e.target.value)}>
              {VALID_MODULES.map(m => (
                <option key={m} value={m}>{MODULE_LABELS[m]}</option>
              ))}
            </select>
          </div>

          {error && <div className="inbox-error">{error}</div>}
        </div>

        <div className="inbox-modal-footer">
          <button className="inbox-btn-cancel" onClick={onClose}>取消</button>
          <button className="inbox-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "保存中…" : "保存"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── EditModal ─────────────────────────────────────────────────
function EditModal({ item, onSave, onClose }) {
  const [title, setTitle]     = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");
  const [type, setType]       = useState(item.type || "todo");
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  async function handleSave() {
    if (!title.trim()) { setError("标题不能为空"); return; }
    setSaving(true); setError("");
    try {
      await onSave(item.id, { title: title.trim(), content: content.trim(), type });
      onClose();
    } catch (e) {
      setError(e.message || "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="inbox-modal-backdrop" onClick={onClose}>
      <div className="inbox-modal" onClick={e => e.stopPropagation()}>
        <div className="inbox-modal-head">
          <strong>编辑事项</strong>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="inbox-modal-body">
          <div className="inbox-form-row">
            <label>类型</label>
            <div className="inbox-type-picker">
              {VALID_TYPES.map(t => (
                <button key={t} className={`inbox-type-opt ${type === t ? "active" : ""}`} onClick={() => setType(t)}>
                  {TYPE_ICONS[t]} {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <div className="inbox-form-row">
            <label>标题</label>
            <input className="inbox-input" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          </div>
          <div className="inbox-form-row">
            <label>内容</label>
            <textarea className="inbox-input inbox-textarea" value={content} onChange={e => setContent(e.target.value)} rows={3} />
          </div>
          {error && <div className="inbox-error">{error}</div>}
        </div>
        <div className="inbox-modal-footer">
          <button className="inbox-btn-cancel" onClick={onClose}>取消</button>
          <button className="inbox-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "保存中…" : "保存"}</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function InboxApp({ onClose }) {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filterStatus, setFilterStatus] = useState("accepted");
  const [filterType, setFilterType] = useState("all");
  const [showAdd, setShowAdd]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [error, setError]           = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await apiFetchItems({ status: filterStatus, type: filterType, limit: 100 });
      setItems(data);
    } catch (e) {
      setError("加载失败：" + e.message);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function handleDone(id) {
    try {
      await apiUpdate(id, { status: "done" });
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "done" } : i));
    } catch (e) { setError(e.message); }
  }

  async function handleDismiss(id) {
    try {
      await apiUpdate(id, { status: "dismissed" });
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "dismissed" } : i));
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    if (!window.confirm("确认删除这条事项？")) return;
    try {
      await apiDelete(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (e) { setError(e.message); }
  }

  async function handleAdd(body) {
    const item = await apiCreate(body);
    if (filterStatus === "accepted" || filterStatus === "all") {
      setItems(prev => [item, ...prev]);
    }
  }

  async function handleEditSave(id, body) {
    await apiUpdate(id, body);
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...body } : i));
  }

  const pendingCount = items.filter(i => i.status === "accepted").length;

  return (
    <div className="inbox-shell">
      {/* Header */}
      <header className="inbox-header">
        <button className="inbox-back" onClick={onClose}>‹</button>
        <div className="inbox-header-center">
          <span className="inbox-header-title">✦ Glean 拾遗</span>
          {filterStatus === "accepted" && pendingCount > 0 && (
            <span className="inbox-count-badge">{pendingCount}</span>
          )}
        </div>
        <button className="inbox-add-btn" onClick={() => setShowAdd(true)} title="新建事项">＋</button>
      </header>

      {/* Status Filter */}
      <div className="inbox-filter-row">
        {FILTER_STATUSES.map(s => (
          <button
            key={s}
            className={`inbox-filter-tab ${filterStatus === s ? "active" : ""}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "all" ? "全部" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Type Filter */}
      <div className="inbox-type-filter-row">
        {FILTER_TYPES.map(t => (
          <button
            key={t}
            className={`inbox-type-filter ${filterType === t ? "active" : ""}`}
            onClick={() => setFilterType(t)}
          >
            {t === "all" ? "所有类型" : `${TYPE_ICONS[t]} ${TYPE_LABELS[t]}`}
          </button>
        ))}
      </div>

      {error && <div className="inbox-error-bar">{error}</div>}

      {/* List */}
      <div className="inbox-list">
        {loading && (
          <div className="inbox-empty">
            <div className="inbox-spinner" />
          </div>
        )}
        {!loading && items.length === 0 && (
          <div className="inbox-empty">
            <p className="inbox-empty-text">
              {filterStatus === "accepted" ? "Glean 是空的" : "没有符合条件的事项"}
            </p>
            {filterStatus === "accepted" && (
              <button className="inbox-empty-btn" onClick={() => setShowAdd(true)}>新建事项</button>
            )}
          </div>
        )}
        {!loading && items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onDone={handleDone}
            onDismiss={handleDismiss}
            onDelete={handleDelete}
            onEdit={setEditItem}
          />
        ))}
      </div>

      {showAdd && <AddModal onSave={handleAdd} onClose={() => setShowAdd(false)} />}
      {editItem && (
        <EditModal
          item={editItem}
          onSave={handleEditSave}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
