import { useMemo, useState } from "react";

const STORAGE_KEY = "yui_drift_events_v1";

const DEFAULT_EVENTS = [
  { id: "e1", date: "2026-03-30", title: "阿延生日", detail: "想把准备好的惊喜和祝福都塞进这一天里。", tag: "生日", owner: "@阿筝" },
  { id: "e2", date: "2026-03-22", title: "视频约会", detail: "隔着屏幕一起吃小蛋糕，也算认真过节。", tag: "约会", owner: "@小樱" },
  { id: "e3", date: "2026-03-10", title: "恋爱周年纪念", detail: "一起回看刚认识时的聊天记录，还是会偷偷心动。", tag: "纪念日", owner: "@阿妍" },
  { id: "e4", date: "2026-02-17", title: "春天的信", detail: "把没说完的话折好，夹进日历最暖的一页。", tag: "日常", owner: "@结衣" },
];

const TAG_META = {
  生日: { color: "#b8792b", bg: "#fff3de" },
  约会: { color: "#7653b6", bg: "#f3edff" },
  纪念日: { color: "#bc5d8c", bg: "#fff0f6" },
  日常: { color: "#697f8e", bg: "#edf6fb" },
  旅行: { color: "#568367", bg: "#eef8ef" },
};

function readEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(saved) && saved.length ? saved : DEFAULT_EVENTS;
  } catch {
    return DEFAULT_EVENTS;
  }
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateLabel(key) {
  const date = fromDateKey(key);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function monthCells(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { key: toDateKey(date), day: date.getDate(), current: date.getMonth() === month };
  });
}

function groupedEvents(events) {
  return events
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .reduce((groups, event) => {
      const month = `${fromDateKey(event.date).getMonth() + 1}月`;
      groups[month] ||= [];
      groups[month].push(event);
      return groups;
    }, {});
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18 9 12l6-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DriftCalendarApp({ onClose }) {
  const today = toDateKey(new Date());
  const [tab, setTab] = useState("calendar");
  const [events, setEvents] = useState(readEvents);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [editing, setEditing] = useState(null);

  const cells = useMemo(() => monthCells(viewDate), [viewDate]);
  const eventDates = useMemo(() => new Set(events.map((event) => event.date)), [events]);
  const dayEvents = events.filter((event) => event.date === selectedDate);
  const groups = useMemo(() => groupedEvents(events), [events]);

  function changeMonth(offset) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function openEditor(event) {
    setEditing(event || { id: "", date: selectedDate, title: "", detail: "", tag: "纪念日", owner: "@我" });
  }

  function commitEvent(next) {
    const clean = {
      ...next,
      id: next.id || `drift-${Date.now()}`,
      title: next.title.trim() || "未命名事件",
      detail: next.detail.trim(),
      owner: next.owner.trim() || "@我",
    };
    const updated = events.some((event) => event.id === clean.id)
      ? events.map((event) => (event.id === clean.id ? clean : event))
      : [clean, ...events];
    setEvents(updated);
    saveEvents(updated);
    setSelectedDate(clean.date);
    setEditing(null);
  }

  function removeEvent(id) {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    saveEvents(updated);
    setEditing(null);
  }

  return (
    <main className="drift-app">
      <header className="drift-header">
        <span className="drift-glass" />
        <button className="drift-back" type="button" onClick={onClose} aria-label="返回">
          <BackIcon />
        </button>
        <div className="drift-title">
          <h1>Drift</h1>
          <p>流转</p>
        </div>
        <span />
      </header>

      <div className="drift-scroll">
        <section className="drift-shell">
          <div className="drift-tabrow">
            <div className="drift-tabs">
              <button type="button" className={tab === "calendar" ? "active" : ""} onClick={() => setTab("calendar")}>
                日历
              </button>
              <button type="button" className={tab === "timeline" ? "active" : ""} onClick={() => setTab("timeline")}>
                时间线
              </button>
            </div>
            <button className="drift-add" type="button" onClick={() => openEditor()} aria-label="添加事件">
              <span />
            </button>
          </div>

          {tab === "calendar" ? (
            <section className="drift-calendar">
              <div className="drift-month">
                <button type="button" onClick={() => changeMonth(-1)}>← 上月</button>
                <b>{viewDate.getFullYear()}年{viewDate.getMonth() + 1}月</b>
                <button type="button" onClick={() => changeMonth(1)}>下月 →</button>
              </div>
              <div className="drift-week">
                {["日", "一", "二", "三", "四", "五", "六"].map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className="drift-card drift-grid">
                {cells.map((cell) => (
                  <button
                    key={cell.key}
                    type="button"
                    className={[cell.current ? "" : "dim", cell.key === today ? "today" : "", cell.key === selectedDate ? "selected" : ""].filter(Boolean).join(" ")}
                    onClick={() => setSelectedDate(cell.key)}
                  >
                    {cell.day}
                    {eventDates.has(cell.key) ? <i /> : null}
                  </button>
                ))}
              </div>
              <div className="drift-card drift-day-list">
                <div className="drift-day-head">
                  <b>{dateLabel(selectedDate)}</b>
                  <button type="button" onClick={() => openEditor()}>+ 写下</button>
                </div>
                {dayEvents.length ? dayEvents.map((event) => <EventRow key={event.id} event={event} onClick={() => openEditor(event)} />) : <p className="drift-empty">这天空着。行，给你留白。</p>}
              </div>
            </section>
          ) : (
            <section className="drift-timeline">
              <div className="drift-timeline-head">
                <p>大事记时间线</p>
                <span>按时间倒序收好你们的重要时刻。</span>
                <em>{events.length} 条记录</em>
              </div>
              {Object.entries(groups).map(([month, list]) => (
                <div className="drift-timeline-month" key={month}>
                  <h2>{month}</h2>
                  <div className="drift-line">
                    {list.map((event) => (
                      <button className="drift-timeline-item" type="button" key={event.id} onClick={() => openEditor(event)}>
                        <span className="drift-dot">{fromDateKey(event.date).getDate()}</span>
                        <EventRow event={event} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </section>
      </div>

      {editing ? <EventSheet event={editing} onClose={() => setEditing(null)} onSave={commitEvent} onDelete={removeEvent} /> : null}
    </main>
  );
}

function EventRow({ event, onClick }) {
  const meta = TAG_META[event.tag] || TAG_META["日常"];
  return (
    <article className="drift-event" onClick={onClick}>
      <div className="drift-event-top">
        <span>{dateLabel(event.date)}</span>
        <b style={{ color: meta.color, backgroundColor: meta.bg }}>{event.tag}</b>
        <em>{event.owner}</em>
      </div>
      <h3>{event.title}</h3>
      <p>{event.detail}</p>
    </article>
  );
}

function EventSheet({ event, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(event);
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  return (
    <div className="drift-sheet-backdrop" onClick={onClose}>
      <form
        className="drift-sheet"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          onSave(draft);
        }}
      >
        <div className="drift-sheet-handle" />
        <div className="drift-sheet-title">
          <b>{draft.id ? "编辑大事记" : "新建大事记"}</b>
          <button type="button" onClick={onClose}>×</button>
        </div>
        <input type="date" value={draft.date} onChange={(event) => update("date", event.target.value)} />
        <input value={draft.title} placeholder="给这件事起个标题…" onChange={(event) => update("title", event.target.value)} />
        <input value={draft.owner} placeholder="@阿筝" onChange={(event) => update("owner", event.target.value)} />
        <select value={draft.tag} onChange={(event) => update("tag", event.target.value)}>
          {Object.keys(TAG_META).map((tag) => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <textarea rows="3" value={draft.detail} placeholder="写下一点细节。" onChange={(event) => update("detail", event.target.value)} />
        <div className="drift-sheet-actions">
          {draft.id ? <button className="danger" type="button" onClick={() => onDelete(draft.id)}>删除</button> : null}
          <button type="button" onClick={onClose}>取消</button>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}
