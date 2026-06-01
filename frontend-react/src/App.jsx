import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./legacy-chat/chat-app.css";
import legacyLockPageHtml from "./legacy-apps/lock-page.html?raw";
import legacyHomePageHtml from "./legacy-apps/home-page.html?raw";
import calendarPageHtml from "./legacy-apps/calendar-page.html?raw";
import photosPageHtml from "./legacy-apps/photos-page.html?raw";
import musicPageHtml from "./legacy-apps/music-page.html?raw";
import DaydreamDiaryApp from "./DaydreamDiaryApp.jsx";
import PerleApp from "./PerleApp.jsx";
import FolioApp from "./FolioApp.jsx";
import { apiBase, apiUrl } from "./apiBase.js";
import DriftCalendarApp from "./DriftCalendarApp.jsx";
import InboxApp from "./InboxApp.jsx";
import SettingsLoveApp from "./SettingsLoveApp.jsx";
import CurioApp from "./CurioApp.jsx";
import ParlorApp from "./ParlorApp.jsx";
import GrimoireApp from "./GrimoireApp.jsx";
import "./settings-love-stage/tokens.jsx";
import "./settings-love-stage/widgets.jsx";
import { listMediaItems, mediaUploadProvider, withMediaUrls } from "./mediaApi.js";

const RICH_TEXT_SELECTOR = 'input:not([type="file"]):not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="password"]):not([data-plain-input="true"]):not([readonly]), textarea:not([data-plain-input="true"]):not([readonly])';
const RICH_TEXT_SKIP_SELECTOR = [
  ".chat-app",
  ".custom-dialog-card",
].join(",");

function shouldEnhanceRichInput(input) {
  if (!input) return false;
  if (input.dataset?.plainInput === "true") return false;
  if (String(input.type || "").toLowerCase() === "password") return false;
  if (input.closest(".chat-app")) return false;
  return !input.closest(RICH_TEXT_SKIP_SELECTOR);
}

function restoreNativeInput(input) {
  if (!input || input.dataset.richEnhanced !== "true") return;
  const wrapper = input.closest(".rich-text-proxy-wrap");
  if (!wrapper) return;
  const proxy = wrapper.querySelector(".rich-text-proxy");
  input.classList.remove("rich-text-source");
  delete input.dataset.richEnhanced;
  delete input.dataset.richHtml;
  delete input.dataset.richPlain;
  proxy?.remove();
  wrapper.parentNode?.insertBefore(input, wrapper);
  wrapper.remove();
}

function setNativeInputValue(element, value) {
  const proto = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (setter) setter.call(element, value);
  else element.value = value;
}

function dispatchNativeInput(element) {
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function normalizeRichHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  template.content.querySelectorAll("script, style, iframe, object, embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value || "";
      if (name.startsWith("on")) node.removeAttribute(attr.name);
      if ((name === "href" || name === "src") && /^javascript:/i.test(value)) node.removeAttribute(attr.name);
    });
  });
  return template.innerHTML;
}

function insertHtmlAtSelection(html) {
  const selection = window.getSelection?.();
  if (!selection || !selection.rangeCount) return false;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const template = document.createElement("template");
  template.innerHTML = html;
  const fragment = template.content;
  const last = fragment.lastChild;
  range.insertNode(fragment);
  if (last) {
    range.setStartAfter(last);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  return true;
}

function insertTextAtSelection(text) {
  const selection = window.getSelection?.();
  if (!selection || !selection.rangeCount) return false;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

function plainTextFromHtml(html) {
  if (!html) return "";
  const template = document.createElement("template");
  template.innerHTML = html;
  return (template.content.textContent || "").replace(/\n{3,}/g, "\n\n");
}

function syncRichProxy(editor, input) {
  const plain = (editor.innerText || "").replace(/\u00a0/g, " ");
  const normalized = input.tagName === "INPUT" ? plain.replace(/\r?\n/g, " ") : plain;
  const previousValue = input.value;
  const previousHtml = input.dataset.richHtml || "";
  setNativeInputValue(input, normalized);
  input.dataset.richHtml = normalizeRichHtml(editor.innerHTML);
  input.dataset.richPlain = normalized;
  if (previousValue !== normalized || previousHtml !== input.dataset.richHtml) {
    dispatchNativeInput(input);
  }
  editor.classList.toggle("is-empty", !editor.textContent?.trim());
}

function flushRichTextInputs(rootNode = document) {
  rootNode.querySelectorAll?.(".rich-text-proxy-wrap").forEach((wrapper) => {
    const editor = wrapper.querySelector(".rich-text-proxy");
    const input = wrapper.querySelector(".rich-text-source");
    if (editor && input) syncRichProxy(editor, input);
  });
}

function flushActiveRichTextInput() {
  const editor = document.activeElement;
  if (!(editor instanceof HTMLElement) || !editor.classList.contains("rich-text-proxy")) return;
  const wrapper = editor.closest(".rich-text-proxy-wrap");
  const input = wrapper?.querySelector(".rich-text-source");
  if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
    syncRichProxy(editor, input);
  }
}

function paintRichProxy(editor, input) {
  const computed = window.getComputedStyle(input);
  const rect = input.getBoundingClientRect();
  editor.className = `rich-text-proxy ${input.tagName === "TEXTAREA" ? "is-textarea" : "is-input"}`;
  editor.contentEditable = String(!input.disabled);
  editor.dataset.placeholder = input.getAttribute("placeholder") || "";
  editor.style.font = computed.font;
  editor.style.color = computed.color;
  editor.style.background = computed.background;
  editor.style.border = computed.border;
  editor.style.borderRadius = computed.borderRadius;
  editor.style.padding = computed.padding;
  editor.style.lineHeight = computed.lineHeight;
  editor.style.letterSpacing = computed.letterSpacing;
  editor.style.textAlign = computed.textAlign;
  editor.style.boxSizing = computed.boxSizing;
  editor.style.minHeight = input.tagName === "TEXTAREA" ? computed.height : `${Math.max(rect.height || 0, 22)}px`;
  editor.style.width = "100%";
  editor.style.whiteSpace = input.tagName === "TEXTAREA" ? "pre-wrap" : "nowrap";
  editor.style.overflowX = input.tagName === "TEXTAREA" ? "hidden" : "auto";
  editor.style.overflowY = input.tagName === "TEXTAREA" ? "auto" : "hidden";
}

function enhanceRichInput(input) {
  if (!input || input.dataset.richEnhanced === "true") return;
  if (!shouldEnhanceRichInput(input)) return;
  const wrapper = document.createElement("div");
  const editor = document.createElement("div");
  const computed = window.getComputedStyle(input);
  wrapper.className = "rich-text-proxy-wrap";
  wrapper.style.display = computed.display === "block" || input.tagName === "TEXTAREA" ? "block" : "inline-block";
  wrapper.style.width = computed.width === "0px" ? "100%" : computed.width;
  wrapper.style.verticalAlign = computed.verticalAlign;
  input.parentNode?.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  wrapper.appendChild(editor);
  input.dataset.richEnhanced = "true";
  input.classList.add("rich-text-source");
  paintRichProxy(editor, input);
  editor.innerHTML = input.dataset.richHtml || input.value || "";
  editor.classList.toggle("is-empty", !editor.textContent?.trim());

  editor.addEventListener("input", () => syncRichProxy(editor, input));
  editor.addEventListener("paste", (event) => {
    event.preventDefault();
    const clipboard = event.clipboardData;
    const plain = clipboard?.getData("text/plain") || "";
    const html = clipboard?.getData("text/html") || "";
    insertTextAtSelection(plain || plainTextFromHtml(html));
    syncRichProxy(editor, input);
  });
  editor.addEventListener("focus", () => wrapper.classList.add("is-focused"));
  editor.addEventListener("blur", () => wrapper.classList.remove("is-focused"));
  editor.addEventListener("keydown", (event) => {
    syncRichProxy(editor, input);
    if (input.tagName === "INPUT" && event.key === "Enter") event.preventDefault();
    input.dispatchEvent(new KeyboardEvent("keydown", { key: event.key, code: event.code, bubbles: true }));
  });
  editor.addEventListener("keyup", (event) => {
    input.dispatchEvent(new KeyboardEvent("keyup", { key: event.key, code: event.code, bubbles: true }));
  });

  const syncFromSource = () => {
    if (document.activeElement === editor) return;
    const nextHtml = input.dataset.richHtml || input.value || "";
    if (editor.innerHTML !== nextHtml) editor.innerHTML = nextHtml;
    paintRichProxy(editor, input);
    editor.classList.toggle("is-empty", !editor.textContent?.trim());
  };

  input.addEventListener("input", syncFromSource);
  input.addEventListener("change", syncFromSource);
  window.requestAnimationFrame(syncFromSource);
  if (input.autofocus) window.requestAnimationFrame(() => editor.focus());
}

function installRichTextInputs(rootNode = document) {
  rootNode.querySelectorAll?.(".rich-text-source").forEach((input) => {
    if (!shouldEnhanceRichInput(input)) restoreNativeInput(input);
  });
  rootNode.querySelectorAll?.(RICH_TEXT_SELECTOR).forEach(enhanceRichInput);
}

const STORAGE_KEY = "yui_nook_react_phone_v1";
const API_BASE = apiBase;
const DEFAULT_AGENT_ID = "ayan";
const defaultWallpaper = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";
const defaultChatContacts = [
  { id: "ayan", name: "?", subtitle: "?", avatar: "?", tone: "?" },
  { id: "yui", name: "YUI", subtitle: "?", avatar: "Y", tone: "?" },
  { id: "default", name: "?", subtitle: "? agent", avatar: "?", tone: "?" },
];

const AGENT_ID_RE = /^[a-z0-9_-]+$/;

function normalizeAgentInput(value) {
  return String(value || "").trim().replace(/^@+/, "").toLowerCase();
}

function agentHandle(agentId) {
  const id = normalizeAgentInput(agentId);
  return id ? `@${id}` : "";
}

function agentToContact(agent) {
  const id = normalizeAgentInput(agent.agent_id || agent.id);
  const name = agent.display_name || agent.name || id;
  return {
    id,
    name,
    subtitle: agent.description || agent.subtitle || "AI ?",
    avatar: agent.avatar || String(name || id || "A").slice(0, 1),
    tone: agent.persona || agent.tone || "",
  };
}

const builtinApps = [
  { id: "chat", label: "聊天", glyph: "聊", type: "应用" },
  { id: "diary", label: "Daydream", glyph: "梦", type: "应用" },
  { id: "album", label: "Perle", glyph: "珠", type: "应用" },
  { id: "calendar", label: "日历", glyph: "历", type: "应用" },
  { id: "settings", label: "设置", glyph: "设", type: "应用" },
  { id: "wallpaper", label: "壁纸", glyph: "壁", type: "应用" },
  { id: "folio", label: "Folio", glyph: "书", type: "应用" },
  { id: "inbox", label: "Glean", glyph: "拾", type: "应用" },
  { id: "curio", label: "Curio", glyph: "匣", type: "应用" },
  { id: "parlor", label: "Parlor", glyph: "炉", type: "应用", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="#FEF0E4"/><path d="M30 12 C26 19 20 24 22 32 C23 37 26 41 30 41 C34 41 37 37 38 32 C40 24 34 19 30 12Z" stroke="#E07840" stroke-width="2.5" stroke-linejoin="round" fill="#FEF0E4"/><path d="M30 23 C28 26 27 30 28 33 C29 35 30 37 30 37" stroke="#E07840" stroke-width="2" stroke-linecap="round" fill="none"/><line x1="16" y1="46" x2="44" y2="44" stroke="#C4784A" stroke-width="3.5" stroke-linecap="round"/><line x1="19" y1="50" x2="41" y2="50" stroke="#C4784A" stroke-width="3.5" stroke-linecap="round"/></svg>` },
  { id: "grimoire", label: "魔典", glyph: "典", type: "应用", iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="#2C3E5C"/><rect x="10" y="11" width="34" height="42" rx="3" fill="#3A4D6F"/><rect x="10" y="11" width="5" height="42" rx="2" fill="#1F2A3E"/><rect x="14" y="15" width="26" height="0.8" fill="#C5A572" opacity="0.9"/><rect x="14" y="49" width="26" height="0.8" fill="#C5A572" opacity="0.9"/><rect x="14" y="17.5" width="26" height="0.4" fill="#C5A572" opacity="0.5"/><rect x="14" y="47" width="26" height="0.4" fill="#C5A572" opacity="0.5"/><text x="30" y="36" font-family="Georgia,serif" font-style="italic" font-size="18" fill="#C5A572" text-anchor="middle" dominant-baseline="middle" opacity="0.95">⊹</text></svg>` },
];

// Expose to settings/stage components
window.YUI_BUILTIN_APPS = builtinApps;

const appTitles = Object.fromEntries(builtinApps.map((app) => [app.id, app.label]));
const appAliases = {
  bubble: "chat",
  moments: "chat",
  wechat: "chat",
  notes: "diary",
  memo: "diary",
  photos: "album",
  music: "album",
  worldbook: "diary",
  love: "unsupported",
  mall: "unsupported",
  shop: "unsupported",
  decor: "unsupported",
  todo: "unsupported",
  weather: "unsupported",
};
const defaultDesktopApps = [
  { ...builtinApps[0], page: 0 },
  { ...builtinApps[1], page: 0 },
  { ...builtinApps[2], page: 0 },
  { ...builtinApps[3], page: 0 },
  { ...builtinApps[4], page: 0 },
  { ...builtinApps[5], page: 0 },
  { ...builtinApps[6], page: 0 },
  { ...builtinApps[7], page: 0 },
];
const defaultDockApps = [0, 1, 2, 3].map((index) => ({ ...defaultDesktopApps[index] }));
const iconPresets = [
  { id: "chat", label: "?", glyph: "?" },
  { id: "book", label: "?", glyph: "?" },
  { id: "album", label: "?", glyph: "?" },
  { id: "calendar", label: "?", glyph: "?" },
  { id: "settings", label: "?", glyph: "?" },
  { id: "shop", label: "?", glyph: "?" },
  { id: "memo", label: "?", glyph: "?" },
  { id: "spark", label: "?", glyph: "?" },
];

const wallpaperPresets = [
  { id: "sea", label: "?", value: defaultWallpaper },
  { id: "sakura", label: "?", value: "linear-gradient(135deg, #ffdce8 0%, #fff5f8 42%, #f1e6ff 100%)" },
  { id: "mist", label: "?", value: "linear-gradient(135deg, #f3d9ef 0%, #e6e1fb 46%, #dff0ff 100%)" },
];

function readSavedPhone() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function ensureDefaultApps(apps) {
  const required = ["inbox", "curio", "parlor"];
  let next = apps;
  required.forEach((id) => {
    if (next.some((app) => app.id === id)) return;
    const builtin = builtinApps.find((app) => app.id === id);
    if (builtin) next = [...next, { ...builtin, page: 0 }];
  });
  return next;
}

function createInitialPhone() {
  const saved = readSavedPhone();
  return {
    wallpaper: saved.wallpaper || defaultWallpaper,
    desktopApps: ensureDefaultApps(normalizeSavedApps(saved.desktopApps, defaultDesktopApps)),
    dockApps: normalizeSavedApps(saved.dockApps, defaultDockApps),
    layout: saved.layout || "鎭嬬埍缁勪欢 + 6 App",
    colorMode: saved.colorMode || "璺熼殢绯荤粺",
    appFont: saved.appFont || "Zen Maru Gothic",
    codeFont: saved.codeFont || "系统默认",
    fontScale: saved.fontScale || 100,
    accent: saved.accent || "#a087c4",
    widgetSize: saved.widgetSize || "4x2",
    mainPage: saved.mainPage || "第 1 页",
  };
}

function normalizeSavedApps(savedApps, fallbackApps) {
  if (!Array.isArray(savedApps) || !savedApps.length) return fallbackApps;
  const allowed = new Set(builtinApps.map((app) => app.id));
  const byBuiltin = Object.fromEntries(builtinApps.map((app) => [app.id, app]));
  const seen = new Set();
  const normalized = savedApps
    .map((app) => {
      const canonicalId = appAliases[app.id] || app.id;
      const builtin = byBuiltin[canonicalId] || {};
      return { ...builtin, ...app, id: canonicalId };
    })
    .filter((app) => {
      if (!allowed.has(app.id) || seen.has(app.id)) return false;
      seen.add(app.id);
      return true;
    });
  if (!normalized.some((app) => app.id === "chat")) return fallbackApps;
  return normalized;
}

async function apiJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const error = new Error(detail || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function loadPhoneState(key, fallback = {}) {
  const data = await apiJson(`/api/phone/state/${encodeURIComponent(key)}`);
  return data.data && typeof data.data === "object" ? data.data : fallback;
}

async function savePhoneState(key, data) {
  return apiJson(`/api/phone/state/${encodeURIComponent(key)}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });
}

function normalizeMessage(row) {
  return {
    id: row.id || `${row.role}-${row.created_at || Date.now()}`,
    from: row.role === "user" ? "me" : "ai",
    text: row.content || "",
  };
}

async function readChatStream(response, onEvent) {
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `HTTP ${response.status}`);
  }
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split(/\n\n/);
    buffer = parts.pop() || "";
    for (const part of parts) {
      let eventName = "message";
      const dataLines = [];
      for (const rawLine of part.split(/\n/)) {
        const line = rawLine.trimEnd();
        if (line.startsWith("event:")) eventName = line.slice(6).trim();
        if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
      }
      onEvent(eventName, dataLines.join("\n"));
    }
  }
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

function StatusBar({ dark = false }) {
  const now = useNow();
  return (
    <div className={`status-bar ${dark ? "status-bar--dark" : ""}`}>
      <span>{pad2(now.getHours())}:{pad2(now.getMinutes())}</span>
      <span className="status-icons"><i /><b /><em>89</em></span>
    </div>
  );
}

function HomeIndicator({ onUnlock, onHome }) {
  const startY = useRef(null);
  function handleStart(event) {
    startY.current = event.touches?.[0]?.clientY ?? event.clientY;
  }
  function handleEnd(event) {
    if (startY.current == null) return;
    const endY = event.changedTouches?.[0]?.clientY ?? event.clientY;
    const delta = startY.current - endY;
    startY.current = null;
    if (delta > 42) {
      onUnlock?.();
      onHome?.();
    }
  }
  return (
    <div className="home-gesture-zone" aria-label="上划返回">
      <div className="home-indicator-hit" onPointerDown={handleStart} onPointerUp={handleEnd} onTouchStart={handleStart} onTouchEnd={handleEnd}>
        <div className="home-indicator" />
      </div>
    </div>
  );
}

function WallpaperLayer({ wallpaper }) {
  const style = wallpaper.startsWith("linear-gradient") ? { background: wallpaper } : { backgroundImage: `url(${wallpaper})` };
  return <div className="wallpaper" style={style} />;
}

function LockScreen({ onUnlock, phone }) {
  const now = useNow();
  const startY = useRef(null);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const date = `${now.getMonth() + 1}月${now.getDate()}日 星期${weekdays[now.getDay()]}`;
  function handleStart(event) {
    startY.current = event.touches?.[0]?.clientY ?? event.clientY;
  }
  function handleEnd(event) {
    if (startY.current == null) return;
    const endY = event.changedTouches?.[0]?.clientY ?? event.clientY;
    const delta = startY.current - endY;
    startY.current = null;
    if (delta > 56) onUnlock?.();
  }
  return (
    <section
      className="phone-page lock-page"
      onPointerDown={handleStart}
      onPointerUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <WallpaperLayer wallpaper={phone.wallpaper} />
      <div className="wallpaper-veil" />
      <div className="lock-content">
        <StatusBar />
        <div className="lock-time-block">
          <div className="lock-date">{date}</div>
          <div className="lock-time">{pad2(now.getHours())}:{pad2(now.getMinutes())}</div>
        </div>
        <div className="lock-card liquid-card">
          <div className="lock-card-top">
            <span className="lock-avatar">Y</span>
            <div><strong>Silage</strong><p>一起的日子 · Jour 27</p></div>
          </div>
          <div className="lock-poem">随机出现一句话，像猫踩过密码锁。</div>
        </div>
        <div className="lock-bottom-copy">上划解锁</div>
      </div>
      <HomeIndicator onUnlock={onUnlock} />
    </section>
  );
}

function LegacyLockScreen({ onUnlock }) {
  useEffect(() => {
    ensureLegacyStylesheet("legacy-index-css", "/legacy-apps/legacy-index.css");
    const dateEl = document.getElementById("lock-date");
    const timeEl = document.getElementById("lock-time");
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const updateClock = () => {
      const now = new Date();
      if (dateEl) dateEl.textContent = `${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`;
      if (timeEl) timeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    const lock = document.getElementById("page-lock");
    let startY = 0;
    const touchStart = (event) => { startY = event.touches[0]?.clientY || 0; };
    const touchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY || startY;
      if (startY - endY > 42) onUnlock();
    };
    const clickUnlock = () => onUnlock();
    lock?.addEventListener("touchstart", touchStart, { passive: true });
    lock?.addEventListener("touchend", touchEnd, { passive: true });
    lock?.querySelector(".lock-indicator")?.addEventListener("click", clickUnlock);
    return () => {
      window.clearInterval(timer);
      lock?.removeEventListener("touchstart", touchStart);
      lock?.removeEventListener("touchend", touchEnd);
      lock?.querySelector(".lock-indicator")?.removeEventListener("click", clickUnlock);
    };
  }, [onUnlock]);
  return <div className="legacy-home-root" dangerouslySetInnerHTML={{ __html: legacyLockPageHtml }} />;
}

function HomeInboxWidget({ onOpen }) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [checking, setChecking] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const r = await fetch(apiUrl("/api/extracted-items?status=accepted&limit=4"));
        if (!r.ok) return;
        const data = await r.json();
        if (!alive) return;
        const list = data.items || [];
        setItems(list.slice(0, 3));
        setCount(list.length);
      } catch { /* silent */ }
    }
    load();
    return () => { alive = false; };
  }, []);

  async function handleCheck(id) {
    setChecking(id);
    try {
      await fetch(apiUrl(`/api/extracted-items/${id}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });
      setItems(prev => prev.filter(i => i.id !== id));
      setCount(c => Math.max(0, c - 1));
    } catch { /* silent */ }
    setChecking(null);
  }

  const typeIcon = { todo: "✓", note: "✎", idea: "✦", event: "◷" };

  return (
    <div className="home-inbox-widget" style={{ position: "absolute", left: 0, right: 0, bottom: 88, zIndex: 15, padding: "0 14px" }}>
      <div className="home-inbox-card">
        <div className="home-inbox-head">
          <span className="home-inbox-title">收件箱</span>
          {count > 0 && <span className="home-inbox-badge">{count}</span>}
          <button className="home-inbox-more" onClick={() => onOpen("inbox")}>全部 ›</button>
        </div>
        {items.length === 0 && (
          <div className="home-inbox-empty-row">暂无未处理事项</div>
        )}
        {items.map(item => (
          <div key={item.id} className="home-inbox-row">
            <span className="home-inbox-icon">{typeIcon[item.type] || "•"}</span>
            <span className="home-inbox-item-title">{item.title}</span>
            <button
              className="home-inbox-check"
              disabled={checking === item.id}
              onClick={() => handleCheck(item.id)}
              title="标为完成"
            >
              {checking === item.id ? "…" : "✓"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const LOVE_WIDGET_STORAGE_KEY = "yui_nook_love_widget_config_v1";
const DEFAULT_LOVE_WIDGET_CONFIG = {
  widgetId: "twinmoon",
  size: "M",
  aiId: "yui",
  glass: 84,
  info: {
    startDate: "2026-03-01",
    leftName: "小酒",
    rightName: "夏彦",
    title: "私たちの永遠の幸福",
    aiMessage: "今天也想见你呢",
    leftAvatar: "",
    rightAvatar: "",
  },
};

function readLoveWidgetConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOVE_WIDGET_STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return DEFAULT_LOVE_WIDGET_CONFIG;
    return {
      ...DEFAULT_LOVE_WIDGET_CONFIG,
      ...saved,
      info: { ...DEFAULT_LOVE_WIDGET_CONFIG.info, ...(saved.info || {}) },
    };
  } catch {
    return DEFAULT_LOVE_WIDGET_CONFIG;
  }
}

function calcLoveDays(startDate) {
  const start = new Date(`${startDate || DEFAULT_LOVE_WIDGET_CONFIG.info.startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.floor((today - start) / 86400000) + 1);
}

function LoveWidget() {
  const [config, setConfig] = useState(() => readLoveWidgetConfig());
  const [showWhisper, setShowWhisper] = useState(false);
  const [whisperAnchor, setWhisperAnchor] = useState(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const update = (event) => setConfig(event?.detail || readLoveWidgetConfig());
    window.addEventListener("storage", update);
    window.addEventListener("yui-love-widget-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("yui-love-widget-updated", update);
    };
  }, []);
  const renderers = window.WIDGET_RENDERERS || {};
  const Widget = renderers[config.widgetId] || renderers.twinmoon;
  const info = config.info || DEFAULT_LOVE_WIDGET_CONFIG.info;
  const aiLabel = String(config.aiLabel || info.rightName || "彦").slice(0, 1);
  const whisperText = info.aiMessage || "偷偷说：今天也想你。";
  function handleLoveWidgetClick(event) {
    const avatar = event.target.closest?.('[data-love-avatar="right"]');
    if (!avatar) return;
    const wrap = wrapRef.current;
    // Use offsetLeft/offsetTop traversal — unaffected by CSS transforms (click animations)
    let el = avatar;
    let left = 0;
    let top = 0;
    while (el && el !== wrap) {
      left += el.offsetLeft;
      top += el.offsetTop;
      el = el.offsetParent;
    }
    const avatarCenterX = left + avatar.offsetWidth / 2;
    const avatarCenterY = top + avatar.offsetHeight / 2;
    const placeLeft = wrap ? avatarCenterX > wrap.offsetWidth / 2 : true;
    setWhisperAnchor({
      side: placeLeft ? "left" : "right",
      left: placeLeft ? left - 10 : left + avatar.offsetWidth + 10,
      top: avatarCenterY,
    });
    setShowWhisper((value) => !value);
  }
  if (Widget) {
    return (
      <div
        className="love-widget love-widget-rendered"
        role="button"
        ref={wrapRef}
        tabIndex={0}
        aria-label="恋爱小组件"
        onClick={handleLoveWidgetClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setShowWhisper((value) => !value);
          }
        }}
      >
        {showWhisper && (
          <div
            className="love-widget-whisper"
            style={whisperAnchor ? {
              left: whisperAnchor.left,
              top: whisperAnchor.top,
              right: "auto",
              width: 192,
              transform: whisperAnchor.side === "left" ? "translate(-100%, -50%)" : "translateY(-50%)",
            } : undefined}
          >
            {whisperText}
          </div>
        )}
        <Widget
          size={config.size || "M"}
          days={calcLoveDays(info.startDate)}
          leftLabel={String(info.leftName || "小").slice(0, 1)}
          rightLabel={aiLabel}
          leftName={info.leftName || "小酒"}
          rightName={info.rightName || "夏彦"}
          title={info.title || DEFAULT_LOVE_WIDGET_CONFIG.info.title}
          message={info.aiMessage || DEFAULT_LOVE_WIDGET_CONFIG.info.aiMessage}
          leftAvatar={info.leftAvatar || ""}
          rightAvatar={info.rightAvatar || ""}
          leftTone="butter"
          rightTone={config.aiTone || "lilac"}
          glass={Number(config.glass || 84)}
        />
      </div>
    );
  }
  return (
    <button className="love-widget liquid-card" type="button" aria-label="恋爱小组件">
      <img alt="" src="https://images.unsplash.com/photo-1528459105426-b9548367069b?w=240&q=80" />
      <div className="love-center">
        <span>HEARTBEAT</span><strong>33</strong><em>DAYS TOGETHER</em><small>私たちの永远の幸せ</small>
      </div>
      <img alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=240&q=80&grayscale" />
    </button>
  );
}

function AppIcon({ app, onOpen }) {
  return (
    <button className="app-icon" type="button" onClick={() => onOpen(app.id)}>
      <span>
        {app.iconImage ? <img alt="" src={app.iconImage} /> : app.iconSvg ? <span dangerouslySetInnerHTML={{ __html: app.iconSvg }} /> : app.glyph}
      </span>
      <small>{app.label}</small>
    </button>
  );
}

function HomePlayerWidget({ onOpen }) {
  const now = useNow();
  const day = now.getDate();
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return (
    <button className="home-player-widget liquid-card" type="button" onClick={() => onOpen("music")} aria-label="音乐小组件">
      <div className="home-player-date">
        <small>今日</small>
        <span>{weekdays[now.getDay()]}</span>
        <strong>{day}日</strong>
        <em>今天也是元气满满 ❀</em>
      </div>
      <div className="home-player-main">
        <small>恋恋恋落ちて</small>
        <div className="home-player-controls" aria-hidden="true">
          <i>◀</i>
          <b>♥</b>
          <i>▶</i>
        </div>
      </div>
    </button>
  );
}

function buildDesktopPages(items) {
  const maxPage = Math.max(0, ...items.map((item) => item.page || 0));
  const pages = Array.from({ length: Math.max(2, maxPage + 2) }, () => []);
  for (const item of items) pages[item.page || 0].push(item);
  return pages;
}

function HomePage({ pageIndex, setPageIndex, onOpenApp, phone }) {
  const startX = useRef(null);
  const desktopPages = buildDesktopPages(phone.desktopApps);
  useEffect(() => {
    setPageIndex((current) => Math.min(current, desktopPages.length - 1));
  }, [desktopPages.length, setPageIndex]);
  function handleStart(event) {
    startX.current = event.touches?.[0]?.clientX ?? event.clientX;
  }
  function handleEnd(event) {
    if (startX.current == null) return;
    const endX = event.changedTouches?.[0]?.clientX ?? event.clientX;
    const delta = startX.current - endX;
    startX.current = null;
    if (Math.abs(delta) < 44) return;
    setPageIndex((current) => delta > 0 ? Math.min(current + 1, desktopPages.length - 1) : Math.max(current - 1, 0));
  }
  return (
    <section className="phone-page home-page">
      <WallpaperLayer wallpaper={phone.wallpaper} />
      <div className="wallpaper-veil" />
      <StatusBar />
      <div className="tiny-island" />
      <div className="desktop-viewport" onPointerDown={handleStart} onPointerUp={handleEnd} onTouchStart={handleStart} onTouchEnd={handleEnd}>
        <div className="desktop-track" style={{ transform: `translateX(${-pageIndex * 100}%)` }}>
          {desktopPages.map((pageApps, index) => (
            <div className="desktop-page" key={index}>
              {index === 0 ? <LoveWidget /> : <AddPageCard page={index + 1} />}
              <div className="home-main-grid">
                <div className="app-grid">
                  {pageApps.map((app) => <AppIcon app={app} key={app.id} onOpen={onOpenApp} />)}
                </div>
                {index === 0 && <HomePlayerWidget onOpen={onOpenApp} />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="page-dots" aria-label="妗岄潰鍒嗛〉">
        {desktopPages.map((_, index) => <button className={index === pageIndex ? "is-active" : ""} key={index} type="button" onClick={() => setPageIndex(index)} />)}
      </div>
      <nav className="dock liquid-card" aria-label="Dock">
        {phone.dockApps.map((app) => <AppIcon app={app} key={app.id} onOpen={onOpenApp} />)}
      </nav>
      <HomeIndicator />
    </section>
  );
}

function LegacyHomePage({ onOpenApp, phone }) {
  useEffect(() => {
    ensureLegacyStylesheet("legacy-index-css", "/legacy-apps/legacy-index.css");
    let loveWidgetRoot = null;
    const previous = {
      toggleDI: window.toggleDI,
      openPage: window.openPage,
      closePage: window.closePage,
      delApp: window.delApp,
      exitEditMode: window.exitEditMode,
      toggleWhisper: window.toggleWhisper,
      openMusicLibrary: window.openMusicLibrary,
      closeMusicLibrary: window.closeMusicLibrary,
      pickMusicFiles: window.pickMusicFiles,
      playPrevTrack: window.playPrevTrack,
      playNextTrack: window.playNextTrack,
      togglePlay: window.togglePlay,
      onMusicFiles: window.onMusicFiles,
      onPhotoFiles: window.onPhotoFiles,
      onWpFile: window.onWpFile,
      onIconFile: window.onIconFile,
    };
    const pageMap = {
      "page-chat": "chat",
      "page-diary": "diary",
      "page-calendar": "calendar",
      "page-photos": "album",
      "page-music": "album",
      "page-settings": "settings",
      "page-folio": "folio",
      "page-inbox": "inbox",
      "page-curio": "curio",
      "page-parlor": "parlor",
      "page-grimoire": "grimoire",
    };
    const getHomeAppTarget = (app) => {
      const id = app?.id || "";
      if (id === "chat" || id === "bubble" || id === "wechat" || id === "moments") return { page: "page-chat" };
      if (id === "diary" || id === "notes" || id === "memo" || id === "worldbook") return { page: "page-diary" };
      if (id === "music" || id === "photos" || id === "album") return { page: "page-photos" };
      if (id === "calendar") return { page: "page-calendar" };
      if (id === "settings") return { page: "page-settings", settingsView: "main" };
      if (id === "wallpaper") return { page: "page-settings", settingsView: "wallpaper" };
      if (id === "folio") return { page: "page-folio" };
      if (id === "inbox") return { page: "page-inbox" };
      if (id === "curio") return { page: "page-curio" };
      if (id === "parlor") return { page: "page-parlor" };
      if (id === "grimoire") return { page: "page-grimoire" };
      return null;
    };
    const legacyAppElementIds = {
      chat: "app-chat",
      diary: "app-diary",
      album: "app-photos",
      calendar: "app-calendar",
      settings: "app-settings",
      wallpaper: "app-wallpaper",
      folio: "app-folio",
      inbox: "app-inbox",
      curio: "app-curio",
      parlor: "app-parlor",
      grimoire: "app-grimoire",
    };
    const appIdByElementId = Object.fromEntries(Object.entries(legacyAppElementIds).map(([id, elementId]) => [elementId, id]));
    const escapeHomeText = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
    const renderSyncedAppIcon = (app, className = "app-icon-svg") => {
      if (typeof app?.iconImage === "string" && app.iconImage) {
        return `<img src="${String(app.iconImage).replace(/"/g, "&quot;")}" alt="" class="${className} w-full h-full rounded-[inherit] object-cover block" />`;
      }
      if (typeof app?.iconSvg === "string" && app.iconSvg.includes("<svg")) {
        return app.iconSvg.replace("<svg ", `<svg class="${className}" `);
      }
      return `<span class="text-[22px] font-semibold text-stone-600/90">${app?.icon || app?.glyph || "路"}</span>`;
    };
    const createLegacyTemplateMaps = () => {
      const doc = new DOMParser().parseFromString(legacyHomePageHtml, "text/html");
      const appCells = {};
      Object.entries(legacyAppElementIds).forEach(([id, elementId]) => {
        const cell = doc.getElementById(elementId);
        if (cell) appCells[id] = cell.outerHTML;
      });
      const dockButtons = {};
      doc.querySelectorAll("nav .glass button[onclick*='openPage']").forEach((button) => {
        const originId = String(button.getAttribute("onclick") || "").match(/,\s*'([^']+)'/)?.[1];
        const id = appIdByElementId[originId];
        if (id) dockButtons[id] = button.outerHTML;
      });
      return {
        appCells,
        dockButtons,
        widgetCell: doc.querySelector(".home-widget-cell")?.outerHTML || "",
      };
    };
    const legacyTemplates = createLegacyTemplateMaps();
    const updateCellTarget = (cell, app) => {
      const target = getHomeAppTarget(app);
      const elementId = legacyAppElementIds[app.id] || `app-${app.id}`;
      cell.id = elementId;
      if (target?.page) cell.dataset.page = target.page;
      else cell.removeAttribute("data-page");
      if (target?.settingsView) cell.dataset.settingsView = target.settingsView;
      else cell.removeAttribute("data-settings-view");
      const label = Array.from(cell.querySelectorAll("span")).at(-1);
      if (label) label.textContent = app.label || app.name || app.id;
      const wrap = cell.querySelector(".app-icon-wrap");
      if (wrap && (app.iconImage || app.iconSvg)) wrap.innerHTML = renderSyncedAppIcon(app);
      return cell.outerHTML;
    };
    const renderLegacyHomeCell = (app) => {
      const template = legacyTemplates.appCells[app.id];
      if (template) {
        const doc = new DOMParser().parseFromString(template, "text/html");
        const cell = doc.body.firstElementChild;
        if (cell) return updateCellTarget(cell, app);
      }
      const target = getHomeAppTarget(app);
      const attrs = target ? `data-page="${target.page}"${target.settingsView ? ` data-settings-view="${target.settingsView}"` : ""}` : "";
      const id = legacyAppElementIds[app.id] || `app-${escapeHomeText(app.id)}`;
      return `
        <div class="app-cell flex flex-col items-center gap-1.5 cursor-pointer relative" id="${id}" ${attrs}>
          <div class="relative">
            <div class="app-icon-wrap" style="background: linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.48));">
              ${renderSyncedAppIcon(app)}
            </div>
            <button class="del-badge" onclick="delApp(event,'${id}')">×</button>
          </div>
          <span class="text-[11px] text-stone-600 font-medium tracking-wide">${escapeHomeText(app.label || app.name || app.id)}</span>
        </div>
      `;
    };
    const renderLegacyDockButton = (app) => {
      const template = legacyTemplates.dockButtons[app.id];
      const target = getHomeAppTarget(app);
      const originId = legacyAppElementIds[app.id] || `app-${app.id}`;
      if (template) {
        const doc = new DOMParser().parseFromString(template, "text/html");
        const button = doc.body.firstElementChild;
        if (button) {
          if (target?.page) button.setAttribute("onclick", `openPage('${target.page}','${originId}')`);
          const icon = Array.from(button.children).find((child) => child.tagName === "DIV");
          if (icon && (app.iconImage || app.iconSvg)) icon.innerHTML = renderSyncedAppIcon(app, "w-full h-full rounded-[inherit] object-cover block");
          return button.outerHTML;
        }
      }
      return `
        <button onclick="${target?.page ? `openPage('${target.page}','${originId}')` : ""}" class="app-cell active:scale-[0.92] transition-transform p-0.5 flex flex-col items-center">
          <div class="w-[46px] h-[46px] rounded-[14px] bg-white/70 shadow-sm border border-white/50 flex items-center justify-center text-stone-500">
            ${renderSyncedAppIcon(app, "w-6 h-6")}
          </div>
          <div class="w-1 h-1 rounded-full bg-rose-400 mt-1.5 opacity-0"></div>
        </button>
      `;
    };
    const getConfiguredHomePages = () => {
      const chunkSize = String(phone.layout || "").includes("4 App") ? 4 : 12;
      const items = Array.isArray(phone.desktopApps) ? [...phone.desktopApps] : [];
      const pages = [];
      while (items.length) pages.push(items.splice(0, chunkSize));
      if (!pages.length) pages.push([]);
      const mainIndex = Math.max(0, (parseInt(String(phone.mainPage || "第 1 页").match(/\d+/)?.[0] || "1", 10) || 1) - 1);
      while (pages.length <= mainIndex) pages.push([]);
      return { pages, mainIndex };
    };
    const renderHomeMainPage = () => {
      const grid = document.getElementById("app-grid");
      const dockBar = document.querySelector("#page-home nav .glass");
      const { pages } = getConfiguredHomePages();
      const mainApps = pages[0] || [];
      if (grid) {
        const cells = mainApps.map((app) => renderLegacyHomeCell(app));
        const insertAt = Math.min(2, cells.length);
        if (legacyTemplates.widgetCell) cells.splice(insertAt, 0, legacyTemplates.widgetCell);
        grid.innerHTML = cells.join("");
      }
      if (dockBar) {
        const dockApps = Array.isArray(phone.dockApps) ? phone.dockApps.slice(0, 4) : [];
        dockBar.innerHTML = dockApps.map((app) => renderLegacyDockButton(app)).join("");
      }
    };
    const renderHomeAltPage = () => {
      const { pages, mainIndex } = getConfiguredHomePages();
      window.__yuiHomePageIndex = Math.min(Math.max(0, window.__yuiHomePageIndex || mainIndex), pages.length - 1);
      const currentIndex = window.__yuiHomePageIndex;
      const apps = pages[currentIndex] || [];
      const loveSection = document.getElementById("home-love-section");
      const appSection = document.getElementById("home-app-section");
      const spacer = document.getElementById("home-spacer");
      const altSection = document.getElementById("home-alt-section");
      const altGrid = document.getElementById("home-alt-grid");
      const altSubtitle = document.getElementById("home-alt-subtitle");
      const altEmpty = document.getElementById("home-alt-empty");
      const altChip = document.getElementById("home-alt-main-chip");
      const dots = document.getElementById("home-page-dots");
      if (!loveSection || !appSection || !spacer || !altSection || !altGrid || !altSubtitle || !altEmpty || !altChip || !dots) return;

      const useAltPage = currentIndex > 0;
      loveSection.classList.toggle("hidden", useAltPage);
      appSection.classList.toggle("hidden", useAltPage);
      spacer.classList.toggle("hidden", useAltPage);
      altSection.classList.toggle("hidden", !useAltPage);
      altChip.classList.toggle("hidden", !useAltPage || currentIndex !== mainIndex);
      dots.innerHTML = pages.map((_, index) => `<button class="home-page-dot ${index === currentIndex ? "active" : ""}" type="button" data-home-page-dot="${index}" aria-label="切换到第 ${index + 1} 页"></button>`).join("");
      if (!useAltPage) return;

      altSubtitle.textContent = apps.length ? `这页同步了 ${apps.length} 个桌面入口。` : "这一页现在还是空白页，可以继续从设置里添加。";
      altEmpty.classList.toggle("hidden", apps.length > 0);
      altGrid.innerHTML = apps.map((app) => {
        const target = getHomeAppTarget(app);
        const attrs = target ? `data-home-target="${target.page}"${target.settingsView ? ` data-settings-view="${target.settingsView}"` : ""}` : "";
        return `
          <button class="app-cell flex flex-col items-center gap-1.5 cursor-pointer relative" type="button" ${attrs}>
            <div class="app-icon-wrap" style="background: linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.48));">
              <span class="text-[22px] font-semibold text-stone-600/90">${app.icon || app.glyph || "路"}</span>
            </div>
            <span class="text-[11px] text-stone-600 font-medium tracking-wide">${app.label || "App"}</span>
          </button>
        `;
      }).join("");
      altGrid.querySelectorAll(".app-cell").forEach((cell, index) => {
        const wrap = cell.querySelector(".app-icon-wrap");
        if (wrap && (apps[index]?.iconImage || apps[index]?.iconSvg)) wrap.innerHTML = renderSyncedAppIcon(apps[index]);
      });
    };
    const setHomePage = (index, options = {}) => {
      const { pages } = getConfiguredHomePages();
      const nextIndex = Math.min(Math.max(0, index), pages.length - 1);
      if (nextIndex === window.__yuiHomePageIndex) return;
      const shell = document.getElementById("home-pages-shell");
      const direction = options.direction ?? (nextIndex > (window.__yuiHomePageIndex || 0) ? -1 : 1);
      const fromOffset = options.fromOffset ?? 0;
      if (!shell || !shell.animate) {
        window.__yuiHomePageIndex = nextIndex;
        renderHomeAltPage();
        return;
      }
      shell.style.pointerEvents = "none";
      shell.style.transform = "";
      shell.style.opacity = "";
      shell.style.filter = "";
      const outgoing = shell.animate(
        [
          { transform: `translateX(${fromOffset}px)`, opacity: 1, filter: "blur(0px)" },
          { transform: `translateX(${direction * 42}px)`, opacity: 0.42, filter: "blur(3px)" },
        ],
        { duration: 180, easing: "cubic-bezier(.32,.72,0,1)", fill: "forwards" },
      );
      outgoing.onfinish = () => {
        window.__yuiHomePageIndex = nextIndex;
        renderHomeAltPage();
        const nextShell = document.getElementById("home-pages-shell");
        if (!nextShell || !nextShell.animate) return;
        nextShell.style.pointerEvents = "none";
        const incoming = nextShell.animate(
          [
            { transform: `translateX(${direction * -54}px)`, opacity: 0.34, filter: "blur(4px)" },
            { transform: "translateX(0px)", opacity: 1, filter: "blur(0px)" },
          ],
          { duration: 260, easing: "cubic-bezier(.2,1,.22,1)", fill: "forwards" },
        );
        incoming.onfinish = () => {
          nextShell.style.pointerEvents = "";
          nextShell.style.transform = "";
          nextShell.style.opacity = "";
          nextShell.style.filter = "";
        };
      };
    };
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    const days = Math.max(0, Math.floor((Date.now() - new Date("2023-03-22").getTime()) / 86400000));
    const now = new Date();
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    setText("love-days-big", days);
    setText("glance-date", `${now.getDate()}日`);
    const weekday = document.querySelector(".home-overview-weekday");
    if (weekday) weekday.textContent = weekdays[now.getDay()];
    const wallpaper = document.getElementById("wallpaper");
    if (wallpaper && phone.wallpaper) wallpaper.style.backgroundImage = `url("${phone.wallpaper}")`;
    window.__yuiHomePageIndex = Math.max(0, (parseInt(String(phone.mainPage || "第 1 页").match(/\d+/)?.[0] || "1", 10) || 1) - 1);
    const loveSection = document.getElementById("home-love-section");
    if (loveSection) {
      loveSection.innerHTML = '<div id="legacy-love-widget-react-root"></div>';
      const mount = document.getElementById("legacy-love-widget-react-root");
      if (mount) {
        loveWidgetRoot = createRoot(mount);
        loveWidgetRoot.render(<LoveWidget />);
      }
    }
    renderHomeMainPage();
    renderHomeAltPage();

    // ── Glean 拾遗 DI helpers ──
    const TYPE_ICONS_DI = { todo: "✓", note: "✎", idea: "✦", event: "◷" };
    async function gleanFetchAndRender() {
      const itemsEl  = document.getElementById("di-glean-items");
      const emptyEl  = document.getElementById("di-glean-empty");
      if (!itemsEl) return;
      itemsEl.innerHTML = '<div style="color:rgba(255,255,255,0.35);font-size:11.5px;text-align:center;padding:8px 0;">加载中…</div>';
      if (emptyEl) emptyEl.style.display = "none";
      try {
        const r = await fetch(`${API_BASE}/api/extracted-items?status=accepted&limit=5`);
        if (!r.ok) throw new Error("fetch failed");
        const data = await r.json();
        const items = data.items || [];
        // update collapsed badge
        const badge = document.getElementById("di-count-badge");
        if (badge) {
          badge.textContent = items.length > 0 ? String(items.length) : "";
          badge.style.display = items.length > 0 ? "block" : "none";
        }
        if (items.length === 0) {
          itemsEl.innerHTML = "";
          if (emptyEl) emptyEl.style.display = "block";
          return;
        }
        itemsEl.innerHTML = items.map(item => `
          <div style="display:flex;align-items:center;gap:9px;padding:3px 0;">
            <span style="font-size:10px;color:rgba(255,255,255,0.45);width:13px;text-align:center;flex-shrink:0;">${TYPE_ICONS_DI[item.type] || "•"}</span>
            <span style="flex:1;font-size:12.5px;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.title.replace(/</g,"&lt;")}</span>
            <button data-glean-id="${item.id}" onclick="event.stopPropagation();window.__gleanCheck&&window.__gleanCheck(this,'${item.id}')"
              style="width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.7);font-size:10px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;">✓</button>
          </div>`).join("");
      } catch {
        itemsEl.innerHTML = '<div style="color:rgba(255,255,255,0.25);font-size:11px;text-align:center;padding:6px 0;">暂时无法加载</div>';
      }
    }
    window.__gleanOpenAll = () => { onOpenApp("inbox"); };
    window.__gleanCheck = async (btn, id) => {
      btn.disabled = true;
      btn.textContent = "…";
      try {
        await fetch(`${API_BASE}/api/extracted-items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "done" }),
        });
        btn.closest("div[style]")?.remove();
        const remaining = document.querySelectorAll("[data-glean-id]").length;
        const badge = document.getElementById("di-count-badge");
        if (badge) {
          const newCount = Math.max(0, parseInt(badge.textContent || "0") - 1);
          badge.textContent = newCount > 0 ? String(newCount) : "";
          badge.style.display = newCount > 0 ? "block" : "none";
        }
        if (remaining <= 1) {
          const emptyEl = document.getElementById("di-glean-empty");
          const itemsEl = document.getElementById("di-glean-items");
          if (itemsEl) itemsEl.innerHTML = "";
          if (emptyEl) emptyEl.style.display = "block";
        }
      } catch { btn.disabled = false; btn.textContent = "✓"; }
    };
    // Initial badge load
    fetch(`${API_BASE}/api/extracted-items?status=accepted&limit=1`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        fetch(`${API_BASE}/api/extracted-items?status=accepted&limit=99`)
          .then(r => r.ok ? r.json() : null)
          .then(d => {
            const cnt = d?.items?.length || 0;
            const badge = document.getElementById("di-count-badge");
            if (badge) {
              badge.textContent = cnt > 0 ? String(cnt) : "";
              badge.style.display = cnt > 0 ? "block" : "none";
            }
            const pill = document.getElementById("di-pill");
            if (pill && cnt > 0) pill.classList.add("has-notif");
          }).catch(() => {});
      }).catch(() => {});

    window.toggleDI = (event) => {
      event?.stopPropagation?.();
      const pill = document.getElementById("di-pill");
      if (!pill) return;
      const expanded = pill.classList.contains("expanded");
      pill.classList.toggle("expanded", !expanded);
      pill.classList.toggle("collapsed", expanded);
      pill.classList.remove("has-notif");
      if (!expanded) gleanFetchAndRender();
    };
    window.openPage = (pageId, originId) => {
      const appId = originId === "app-wallpaper" ? "wallpaper" : pageMap[pageId];
      if (appId) onOpenApp(appId);
    };
    window.closePage = () => {};
    window.delApp = (event, id) => {
      event?.stopPropagation?.();
      document.getElementById(id)?.remove();
    };
    window.exitEditMode = () => document.getElementById("btn-done")?.classList.remove("show");
    window.toggleWhisper = () => {
      const bubble = document.getElementById("whisper-bubble");
      const text = document.getElementById("whisper-text");
      if (!bubble || !text) return;
      text.textContent = "偷偷说：今天也想你。";
      bubble.classList.toggle("show");
    };
    const homeMusicState = { queue: [], index: 0, playing: false };
    const homeAudio = document.getElementById("home-audio");
    const formatHomeTrack = (item = {}) => {
      const meta = item.metadata && typeof item.metadata === "object" ? item.metadata : {};
      return {
        id: item.id || item.url || item.title,
        title: item.title || meta.title || "Perle",
        artist: item.artist || meta.artist || "",
        url: item.url || "",
      };
    };
    const renderHomeMusic = () => {
      const current = homeMusicState.queue[homeMusicState.index];
      const title = document.getElementById("home-player-title");
      const playButton = document.getElementById("home-mini-play");
      if (title) title.textContent = current ? current.title : "打开 Perle";
      playButton?.classList.toggle("is-playing", !!homeMusicState.playing);
    };
    const loadHomeMusicLibrary = async () => {
      try {
        let tracks = [];
        if (mediaUploadProvider === "r2") {
          const items = await listMediaItems({ type: "music" });
          tracks = (await withMediaUrls(items)).map(formatHomeTrack);
        } else {
          const response = await fetch(apiUrl("/api/perle/tracks"));
          const data = await response.json();
          tracks = Array.isArray(data.tracks) ? data.tracks.map(formatHomeTrack) : [];
        }
        homeMusicState.queue = tracks.filter((track) => track.url);
        if (homeMusicState.index >= homeMusicState.queue.length) homeMusicState.index = 0;
        renderHomeMusic();
      } catch (error) {
        console.warn("[home music] load failed", error);
        renderHomeMusic();
      }
    };
    const openPerleMusic = () => onOpenApp("music");
    const playHomeTrack = (index = homeMusicState.index) => {
      const track = homeMusicState.queue[index];
      if (!track || !homeAudio) {
        openPerleMusic();
        return;
      }
      homeMusicState.index = index;
      if (homeAudio.src !== track.url) homeAudio.src = track.url;
      homeAudio.play()
        .then(() => {
          homeMusicState.playing = true;
          renderHomeMusic();
        })
        .catch(() => {
          homeMusicState.playing = false;
          renderHomeMusic();
        });
      renderHomeMusic();
    };
    const playRelativeHomeTrack = (step) => {
      if (!homeMusicState.queue.length) {
        openPerleMusic();
        return;
      }
      const nextIndex = (homeMusicState.index + step + homeMusicState.queue.length) % homeMusicState.queue.length;
      playHomeTrack(nextIndex);
    };
    window.openMusicLibrary = openPerleMusic;
    window.closeMusicLibrary = (event) => {
      if (event && event.target !== event.currentTarget) return;
      document.getElementById("music-library-modal")?.classList.remove("open");
    };
    window.pickMusicFiles = openPerleMusic;
    window.playPrevTrack = () => playRelativeHomeTrack(-1);
    window.playNextTrack = () => playRelativeHomeTrack(1);
    window.togglePlay = () => {
      if (!homeMusicState.queue.length || !homeAudio) {
        openPerleMusic();
        return;
      }
      if (homeAudio.paused) playHomeTrack(homeMusicState.index);
      else {
        homeAudio.pause();
        homeMusicState.playing = false;
        renderHomeMusic();
      }
    };
    window.onMusicFiles = (event) => {
      const file = event.target.files?.[0];
      if (file) setText("home-player-title", file.name.replace(/\.[^.]+$/, ""));
      event.target.value = "";
    };
    const handleHomeAudioPlay = () => {
      homeMusicState.playing = true;
      renderHomeMusic();
    };
    const handleHomeAudioPause = () => {
      homeMusicState.playing = false;
      renderHomeMusic();
    };
    const handleHomeAudioEnded = () => playRelativeHomeTrack(1);
    homeAudio?.addEventListener("play", handleHomeAudioPlay);
    homeAudio?.addEventListener("pause", handleHomeAudioPause);
    homeAudio?.addEventListener("ended", handleHomeAudioEnded);
    loadHomeMusicLibrary();
    window.onPhotoFiles = (event) => {
      event.target.value = "";
    };
    window.onWpFile = (event) => {
      const file = event.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const wp = document.getElementById("wallpaper");
        if (wp) wp.style.backgroundImage = `url("${reader.result}")`;
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    };
    window.onIconFile = (event) => {
      event.target.value = "";
    };
    const grid = document.getElementById("app-grid");
    const handleGridClick = (event) => {
      const cell = event.target.closest(".app-cell");
      if (!cell || event.target.closest(".del-badge")) return;
      const pageId = cell.dataset.page;
      if (pageId) window.openPage(pageId, cell.id);
    };
    const handleHomeClick = (event) => {
      const dot = event.target.closest("[data-home-page-dot]");
      if (dot) {
        setHomePage(Number(dot.dataset.homePageDot));
        return;
      }
      const target = event.target.closest("[data-home-target]");
      if (target) window.openPage(target.dataset.homeTarget, target.id);
    };
    const homePage = document.getElementById("page-home");
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let dragging = false;
    const clampDrag = (value) => Math.max(-58, Math.min(58, value * 0.22));
    const resetShell = () => {
      const shell = document.getElementById("home-pages-shell");
      if (!shell) return;
      shell.style.transform = "";
      shell.style.opacity = "";
      shell.style.filter = "";
      shell.style.transition = "";
    };
    const touchStart = (event) => {
      if (event.touches.length !== 1 || event.target.closest("button, a, input, textarea, select, label")) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      tracking = true;
      dragging = false;
    };
    const touchMove = (event) => {
      if (!tracking || event.touches.length !== 1) return;
      const deltaX = event.touches[0].clientX - startX;
      const deltaY = event.touches[0].clientY - startY;
      if (Math.abs(deltaX) < 8 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      dragging = true;
      const shell = document.getElementById("home-pages-shell");
      if (!shell) return;
      shell.style.transition = "none";
      shell.style.transform = `translateX(${clampDrag(deltaX)}px)`;
      shell.style.opacity = "0.92";
      shell.style.filter = "blur(.8px)";
    };
    const touchEnd = (event) => {
      if (!tracking) return;
      tracking = false;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      if (!dragging || Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) {
        const shell = document.getElementById("home-pages-shell");
        if (shell?.animate) {
          const currentX = clampDrag(deltaX);
          const rebound = shell.animate(
            [
              { transform: `translateX(${currentX}px)`, opacity: 0.92, filter: "blur(.8px)" },
              { transform: "translateX(0px)", opacity: 1, filter: "blur(0px)" },
            ],
            { duration: 220, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" },
          );
          rebound.onfinish = resetShell;
        } else {
          resetShell();
        }
        dragging = false;
        return;
      }
      dragging = false;
      if (deltaX < 0) setHomePage((window.__yuiHomePageIndex || 0) + 1, { direction: -1, fromOffset: clampDrag(deltaX) });
      else setHomePage((window.__yuiHomePageIndex || 0) - 1, { direction: 1, fromOffset: clampDrag(deltaX) });
    };
    const touchCancel = () => {
      tracking = false;
      dragging = false;
      resetShell();
    };
    grid?.addEventListener("click", handleGridClick);
    homePage?.addEventListener("click", handleHomeClick);
    homePage?.addEventListener("touchstart", touchStart, { passive: true });
    homePage?.addEventListener("touchmove", touchMove, { passive: true });
    homePage?.addEventListener("touchend", touchEnd, { passive: true });
    homePage?.addEventListener("touchcancel", touchCancel, { passive: true });
    return () => {
      grid?.removeEventListener("click", handleGridClick);
      homePage?.removeEventListener("click", handleHomeClick);
      homePage?.removeEventListener("touchstart", touchStart);
      homePage?.removeEventListener("touchmove", touchMove);
      homePage?.removeEventListener("touchend", touchEnd);
      homePage?.removeEventListener("touchcancel", touchCancel);
      homeAudio?.removeEventListener("play", handleHomeAudioPlay);
      homeAudio?.removeEventListener("pause", handleHomeAudioPause);
      homeAudio?.removeEventListener("ended", handleHomeAudioEnded);
      loveWidgetRoot?.unmount();
      Object.assign(window, previous);
    };
  }, [onOpenApp, phone.desktopApps, phone.layout, phone.mainPage, phone.wallpaper]);
  return <div className="legacy-home-root" dangerouslySetInnerHTML={{ __html: legacyHomePageHtml }} />;
}

function AddPageCard({ page }) {
  return <button className="add-page-card liquid-card" type="button"><span>＋</span><strong>添加这一页</strong><small>把内容 App 放到第 {page} 页</small></button>;
}

function LegacyChatApp() {
  useEffect(() => {
    const bootLegacyChat = () => {
      window.setTimeout(() => {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }, 0);
    };

    import("./legacy-chat/chat-app.js")
      .then(bootLegacyChat)
      .catch((error) => console.warn("[legacy chat] load failed", error));
  }, []);

  return <div id="chat-app-root" className="legacy-chat-root" />;
}

function ensureLegacyStylesheet(id, href) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${src}?v=${Date.now()}`;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function LegacyDiaryApp() {
  return <DaydreamDiaryApp apiBase={API_BASE} />;
}

// LegacySettingsApp replaced by SettingsLoveApp (React component)

function LegacyCalendarApp() {
  useEffect(() => {
    ensureLegacyStylesheet("legacy-index-css", "/legacy-apps/legacy-index.css");
    const previousState = window.state;
    const now = new Date();
    window.state = {
      ...(previousState && typeof previousState === "object" ? previousState : {}),
      calYear: previousState?.calYear || now.getFullYear(),
      calMonth: Number.isInteger(previousState?.calMonth) ? previousState.calMonth : now.getMonth(),
      calendarEvents: previousState?.calendarEvents || {},
    };
    loadLegacyScript("/legacy-apps/calendar-app.js")
      .then(() => window.initCalendar?.())
      .catch((error) => console.warn("[legacy calendar] load failed", error));
    return () => {
      window.state = previousState;
    };
  }, []);
  const html = calendarPageHtml.replace(/class="page\s+hidden\s+sub-page"/, 'class="page sub-page"');
  return <div className="legacy-calendar-root" dangerouslySetInnerHTML={{ __html: html }} />;
}

function LegacyMediaApp({ page, setPage }) {
  const sourceHtml = page === "music" ? musicPageHtml : photosPageHtml;
  const html = sourceHtml.replace(/class="page\s+hidden\s+sub-page"/, 'class="page sub-page"');
  useEffect(() => {
    ensureLegacyStylesheet("legacy-index-css", "/legacy-apps/legacy-index.css");
    const previous = {
      switchMediaPage: window.switchMediaPage,
      onPhotoFiles: window.onPhotoFiles,
      pickMusicFiles: window.pickMusicFiles,
      playPrevTrack: window.playPrevTrack,
      playNextTrack: window.playNextTrack,
      togglePlay: window.togglePlay,
      playCurrentOrFirstTrack: window.playCurrentOrFirstTrack,
    };
    window.switchMediaPage = (target) => setPage(target === "music" ? "music" : "photos");
    window.onPhotoFiles = (event) => {
      const grid = document.getElementById("photo-grid");
      const files = Array.from(event.target.files || []);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const item = document.createElement("div");
          item.className = "photo-item";
          item.innerHTML = `<img src="${reader.result}" />`;
          grid?.prepend(item);
        };
        reader.readAsDataURL(file);
      });
      event.target.value = "";
    };
    const musicState = { queue: [], index: -1, playing: false };
    const audio = document.getElementById("home-audio");
    const formatTitle = (name = "") => name.replace(/\.[^.]+$/, "").trim() || "打开 Perle";
    const renderMusic = () => {
      const current = musicState.queue[musicState.index];
      const title = document.getElementById("music-page-current-title");
      const subtitle = document.getElementById("music-page-current-subtitle");
      const list = document.getElementById("music-page-list");
      if (title) title.textContent = current ? current.title : "打开 Perle";
      if (subtitle) subtitle.textContent = current ? (musicState.playing ? "正在播放这首歌。" : "已经选中这首歌。") : "从本地文件导入后，就会一直保存在这个浏览器里。";
      if (list) {
        list.innerHTML = musicState.queue.length
          ? musicState.queue.map((track, index) => `
              <div class="music-library-item ${index === musicState.index ? "active" : ""}">
                <button class="music-library-item-main" type="button" data-music-index="${index}">
                  <span class="music-library-item-title">${track.title}</span>
                  <span class="music-library-item-meta">${index === musicState.index ? "当前歌曲" : "点一下播放"}</span>
                </button>
              </div>
            `).join("")
          : '<div class="music-library-empty">这里还没有歌。<br/>点上面的“导入本地音乐”把文件加进来。</div>>';
        list.querySelectorAll("[data-music-index]").forEach((button) => {
          button.addEventListener("click", () => playTrack(Number(button.dataset.musicIndex)));
        });
      }
    };
    const playTrack = (index) => {
      const track = musicState.queue[index];
      if (!track || !audio) return;
      musicState.index = index;
      audio.src = track.url;
      audio.play().catch(() => {});
      renderMusic();
    };
    window.pickMusicFiles = () => document.getElementById("music-input")?.click();
    window.onMusicFiles = (event) => {
      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("audio/"));
      if (!files.length) return;
      musicState.queue.forEach((track) => URL.revokeObjectURL(track.url));
      musicState.queue = files.map((file) => ({ title: formatTitle(file.name), url: URL.createObjectURL(file) }));
      playTrack(0);
      event.target.value = "";
    };
    window.playPrevTrack = () => {
      if (!musicState.queue.length) return window.pickMusicFiles();
      playTrack(musicState.index <= 0 ? musicState.queue.length - 1 : musicState.index - 1);
    };
    window.playNextTrack = () => {
      if (!musicState.queue.length) return window.pickMusicFiles();
      playTrack(musicState.index >= musicState.queue.length - 1 ? 0 : musicState.index + 1);
    };
    window.togglePlay = () => {
      if (!audio || !musicState.queue.length) return window.pickMusicFiles();
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    };
    window.playCurrentOrFirstTrack = () => {
      if (!musicState.queue.length) return window.pickMusicFiles();
      if (musicState.index < 0) playTrack(0);
      else window.togglePlay();
    };
    audio?.addEventListener("play", () => { musicState.playing = true; renderMusic(); });
    audio?.addEventListener("pause", () => { musicState.playing = false; renderMusic(); });
    audio?.addEventListener("ended", () => window.playNextTrack());
    window.setTimeout(renderMusic, 0);
    return () => Object.assign(window, previous);
  }, [setPage]);
  return (
    <div className="legacy-media-root" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function AppShell({ appId, onHome, phone, setPhone }) {
  const canonicalAppId = appAliases[appId] || appId;
  const title = appTitles[canonicalAppId] || appTitles[appId] || "App";
  const isSettings = canonicalAppId === "settings";
  const isWallpaper = canonicalAppId === "wallpaper";
  const isChat = canonicalAppId === "chat" || canonicalAppId === "wechat";
  const isDiary = canonicalAppId === "diary";
  const isAlbum = canonicalAppId === "album";
  const isFolio = canonicalAppId === "folio";
  const isInbox = canonicalAppId === "inbox";
  const isCurio = canonicalAppId === "curio";
  const isParlor = canonicalAppId === "parlor";
  const isCalendar = canonicalAppId === "calendar";
  const isGrimoire = canonicalAppId === "grimoire";
  const isUnsupportedLegacyApp = canonicalAppId === "unsupported";
  const isLegacyMedia = isAlbum;
  const [legacyMediaPage, setLegacyMediaPage] = useState("photos");
  const isLegacyShell = isChat || isDiary || isCalendar || isSettings || isWallpaper || isLegacyMedia || isFolio || isInbox || isCurio || isParlor || isGrimoire;
  useEffect(() => {
    if (isLegacyMedia) setLegacyMediaPage("photos");
  }, [canonicalAppId, isLegacyMedia]);
  useEffect(() => {
    const previousClosePage = window.closePage;
    window.closePage = () => onHome();
    return () => {
      window.closePage = previousClosePage;
    };
  }, [onHome]);
  return (
    <section className={`phone-page app-page ${isLegacyShell ? "legacy-shell-page" : ""} ${isChat ? "chat-shell-page" : ""}`}>
      {!isLegacyShell && (
        <div className="app-topbar">
          <button type="button" onClick={onHome} aria-label="返回桌面">‹</button>
          <strong>{title}</strong>
          <span />
        </div>
      )}
      {isSettings || isWallpaper ? (
        <SettingsLoveApp phone={phone} setPhone={setPhone} onClose={onHome} />
      ) : isChat ? (
        <LegacyChatApp />
      ) : isDiary ? (
        <LegacyDiaryApp />
      ) : isLegacyMedia ? (
        <PerleApp initialPage={legacyMediaPage} setPage={setLegacyMediaPage} onHome={onHome} />
      ) : isCalendar ? (
        <DriftCalendarApp onClose={onHome} />
      ) : isFolio ? (
        <FolioApp onClose={onHome} agents={[]} />
      ) : isInbox ? (
        <InboxApp onClose={onHome} />
      ) : isCurio ? (
        <CurioApp />
      ) : isParlor ? (
        <ParlorApp />
      ) : isGrimoire ? (
        <GrimoireApp onClose={onHome} />
      ) : isUnsupportedLegacyApp ? (
        <main className="app-placeholder">
          <div className="liquid-card app-placeholder-card">
            <span>{title.slice(0, 1)}</span>
            <h1>{title}</h1>
            <p>旧版没有给这个入口单独做页面。</p>
          </div>
        </main>
      ) : (
        <main className="app-placeholder">
          <div className="liquid-card app-placeholder-card">
            <span>{title.slice(0, 1)}</span>
            <h1>{title}</h1>
            <p>这个入口还没绑定具体页面。</p>
          </div>
        </main>
      )}
      <HomeIndicator onHome={onHome} />
    </section>
  );
}

function ChatApp({ onHome }) {
  return <LegacyChatApp onHome={onHome} />;
}

function DiaryApp() {
  const [mode, setMode] = useState("diary");
  const [notebooks, setNotebooks] = useState([]);
  const [notebookId, setNotebookId] = useState("");
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editDraft, setEditDraft] = useState({ title: "", content: "" });
  const [comments, setComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [memories, setMemories] = useState([]);
  const [memoryDraft, setMemoryDraft] = useState("");
  const [memoryCategory, setMemoryCategory] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [renameDraft, setRenameDraft] = useState(null);
  const currentNotebook = notebooks.find((item) => item.id === notebookId);

  async function loadEntries(targetNotebookId = notebookId) {
    if (!targetNotebookId) return;
    const data = await apiJson(`/api/diary/notebooks/${encodeURIComponent(targetNotebookId)}/entries`);
    setEntries(Array.isArray(data.entries) ? data.entries : []);
  }

  async function loadMemories() {
    setError("");
    try {
      const data = await apiJson(`/api/memories?agent_id=${encodeURIComponent(DEFAULT_AGENT_ID)}&sort_by=updated_at&order=desc&limit=80`);
      setMemories(Array.isArray(data.memories) ? data.memories : []);
    } catch (err) {
      setError(`记忆后端没连上：${err.message}`);
    }
  }

  useEffect(() => {
    let alive = true;
    async function loadDiary() {
      setLoading(true);
      setError("");
      try {
        const data = await apiJson("/api/diary/notebooks");
        const nextNotebooks = Array.isArray(data.notebooks) ? data.notebooks : [];
        const preferred = nextNotebooks.find((item) => item.author_id === DEFAULT_AGENT_ID) || nextNotebooks.find((item) => item.owner_type === "agent") || nextNotebooks[0];
        if (!alive) return;
        setNotebooks(nextNotebooks);
        setNotebookId(preferred?.id || "");
        if (preferred?.id) {
          const entryData = await apiJson(`/api/diary/notebooks/${encodeURIComponent(preferred.id)}/entries`);
          if (!alive) return;
          setEntries(Array.isArray(entryData.entries) ? entryData.entries : []);
        }
      } catch (err) {
        if (alive) setError(`日记后端没连上：${err.message}`);
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadDiary();
    return () => { alive = false; };
  }, []);

  async function saveEntry(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || !notebookId) return;
    const title = new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
    setError("");
    try {
      await apiJson(`/api/diary/notebooks/${encodeURIComponent(notebookId)}/entries`, {
        method: "POST",
        body: JSON.stringify({ title, content, tags: "react-phone" }),
      });
      setDraft("");
      await loadEntries(notebookId);
    } catch (err) {
      setError(`保存失败�?{err.message}`);
    }
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setEditDraft({ title: entry.title || formatDate(entry.created_at), content: entry.content || entry.body || "" });
  }

  async function updateEntry(entryId) {
    const title = editDraft.title.trim() || "未命名";
    const content = editDraft.content.trim();
    if (!content) return;
    setError("");
    try {
      await apiJson(`/api/diary/entries/${encodeURIComponent(entryId)}`, {
        method: "PATCH",
        body: JSON.stringify({ title, content, tags: "react-phone" }),
      });
      setEditingId("");
      await loadEntries(notebookId);
    } catch (err) {
      setError(`更新失败�?{err.message}`);
    }
  }

  async function deleteEntry(entryId) {
    setError("");
    try {
      await apiJson(`/api/diary/entries/${encodeURIComponent(entryId)}`, { method: "DELETE" });
      if (editingId === entryId) setEditingId("");
      await loadEntries(notebookId);
    } catch (err) {
      setError(`删除失败�?{err.message}`);
    }
  }

  async function renameNotebook() {
    if (!currentNotebook?.id || !currentNotebook.can_rename) return;
    setRenameDraft(currentNotebook.name || "");
  }

  async function submitRenameNotebook() {
    if (!currentNotebook?.id || !currentNotebook.can_rename) return;
    const nextName = renameDraft;
    if (!nextName?.trim()) return;
    setError("");
    try {
      await apiJson(`/api/diary/notebooks/${encodeURIComponent(currentNotebook.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ name: nextName.trim() }),
      });
      const data = await apiJson("/api/diary/notebooks");
      setNotebooks(Array.isArray(data.notebooks) ? data.notebooks : []);
      setRenameDraft(null);
    } catch (err) {
      setError(`日记本改名失败：${err.message}`);
    }
  }

  async function loadComments(entryId) {
    if (!entryId) return;
    try {
      const data = await apiJson(`/api/diary/entries/${encodeURIComponent(entryId)}/comments`);
      setComments((current) => ({ ...current, [entryId]: Array.isArray(data.comments) ? data.comments : [] }));
    } catch (err) {
      setError(`评论加载失败�?{err.message}`);
    }
  }

  async function saveComment(entryId) {
    const content = (commentDrafts[entryId] || "").trim();
    if (!content) return;
    setError("");
    try {
      await apiJson(`/api/diary/entries/${encodeURIComponent(entryId)}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      setCommentDrafts((current) => ({ ...current, [entryId]: "" }));
      await loadComments(entryId);
    } catch (err) {
      setError(`评论失败�?{err.message}`);
    }
  }

  async function saveMemory(event) {
    event.preventDefault();
    const content = memoryDraft.trim();
    if (!content) return;
    setError("");
    try {
      await apiJson("/api/memories", {
        method: "POST",
        body: JSON.stringify({
          agent_id: DEFAULT_AGENT_ID,
          source_agent_id: DEFAULT_AGENT_ID,
          visibility: "private",
          category: memoryCategory,
          content,
          source: "react_phone",
        }),
      });
      setMemoryDraft("");
      await loadMemories();
    } catch (err) {
      setError(`记忆保存失败�?{err.message}`);
    }
  }

  async function deleteMemory(memoryId) {
    setError("");
    try {
      await apiJson(`/api/memories/${encodeURIComponent(memoryId)}`, { method: "DELETE" });
      await loadMemories();
    } catch (err) {
      setError(`记忆删除失败�?{err.message}`);
    }
  }

  return (
    <main className="diary-app">
      <div className="diary-tabs liquid-card">
        <button className={mode === "diary" ? "active" : ""} type="button" onClick={() => setMode("diary")}>日记</button>
        <button className={mode === "memory" ? "active" : ""} type="button" onClick={() => { setMode("memory"); loadMemories(); }}>记忆</button>
      </div>
      {mode === "diary" && (
        <>
          <form className="diary-editor liquid-card" onSubmit={saveEntry}>
            <p className="section-label">New Note</p>
            {loading && <div className="chat-system-note">正在�?Supabase/后端加载日记...</div>}
            {error && <div className="chat-system-note error">{error}</div>}
            {notebooks.length > 0 && (
              <div className="diary-notebook-bar">
                <select className="diary-notebook-select" value={notebookId} onChange={async (event) => {
                  const nextId = event.target.value;
                  setNotebookId(nextId);
                  try { await loadEntries(nextId); } catch (err) { setError(`切换日记本失败：${err.message}`); }
                }}>
                  {notebooks.map((notebook) => <option key={notebook.id} value={notebook.id}>{notebook.name || notebook.id}</option>)}
                </select>
                {currentNotebook?.can_rename && <button className="soft-button compact" type="button" onClick={renameNotebook}>鏀瑰悕</button>}
              </div>
            )}
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="今天发生了什么？" disabled={!notebookId} />
            <button className="soft-button" type="submit" disabled={!notebookId}>淇濆瓨</button>
          </form>
          <div className="diary-list">
            {entries.map((entry) => (
              <article className="diary-card liquid-card" key={entry.id}>
                {editingId === entry.id ? (
                  <div className="diary-edit-panel">
                    <input value={editDraft.title} onChange={(event) => setEditDraft((current) => ({ ...current, title: event.target.value }))} />
                    <textarea value={editDraft.content} onChange={(event) => setEditDraft((current) => ({ ...current, content: event.target.value }))} />
                    <div className="diary-actions">
                      <button type="button" onClick={() => updateEntry(entry.id)}>淇濆瓨淇敼</button>
                      <button type="button" onClick={() => setEditingId("")}>取消</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{entry.title || formatDate(entry.created_at)}</span>
                    <p>{entry.content || entry.body || ""}</p>
                    <div className="diary-actions">
                      <button type="button" onClick={() => startEdit(entry)}>编辑</button>
                      <button type="button" onClick={() => loadComments(entry.id)}>璇勮</button>
                      <button type="button" onClick={() => deleteEntry(entry.id)}>删除</button>
                    </div>
                    {comments[entry.id] && (
                      <div className="diary-comments">
                        {comments[entry.id].map((comment) => <p key={comment.id}>{comment.content}</p>)}
                        <div className="diary-comment-form">
                          <input value={commentDrafts[entry.id] || ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [entry.id]: event.target.value }))} placeholder="补一句评论" />
                          <button type="button" onClick={() => saveComment(entry.id)}>发送</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        </>
      )}
      {mode === "memory" && (
        <>
          <form className="diary-editor liquid-card memory-editor" onSubmit={saveMemory}>
            <p className="section-label">Memory</p>
            {error && <div className="chat-system-note error">{error}</div>}
            <select className="diary-notebook-select" value={memoryCategory} onChange={(event) => setMemoryCategory(event.target.value)}>
              <option value="daily">daily</option>
              <option value="deep">deep</option>
              <option value="preference">preference</option>
              <option value="project">project</option>
            </select>
            <textarea value={memoryDraft} onChange={(event) => setMemoryDraft(event.target.value)} placeholder="写给当前 agent 的一条记忆。默认 private，不会乱灌给别人。" />
            <button className="soft-button" type="submit">保存记忆</button>
          </form>
          <div className="memory-list">
            {memories.map((memory) => (
              <article className="memory-card liquid-card" key={memory.id}>
                <div>
                  <strong>{memory.category || "memory"}</strong>
                  <small>{memory.visibility || "private"} 路 {memory.agent_id || DEFAULT_AGENT_ID}</small>
                </div>
                <p>{memory.content || memory.compressed_content || memory.raw_content || ""}</p>
                <button type="button" onClick={() => deleteMemory(memory.id)}>删除</button>
              </article>
            ))}
            {!memories.length && <div className="chat-system-note">还没拉到记忆。要么后端空，要么它在装死。</div>}
          </div>
        </>
      )}
      {renameDraft !== null && (
        <div className="modal-backdrop">
          <div className="liquid-card diary-editor">
            <p className="section-label">日记本新名字</p>
            <input value={renameDraft} onChange={(event) => setRenameDraft(event.target.value)} autoFocus />
            <div className="diary-card-actions">
              <button type="button" onClick={() => setRenameDraft(null)}>取消</button>
              <button type="button" onClick={submitRenameNotebook}>钀界瑪</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function formatDate(value) {
  if (!value) return "未命名";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
}

function AlbumApp() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function loadAlbum() {
      try {
        const data = await loadPhoneState("album", { items: [] });
        if (!alive) return;
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        setError(`相册后端没连上：${err.message}`);
      } finally {
        if (alive) setLoaded(true);
      }
    }
    loadAlbum();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    savePhoneState("album", { items }).catch((err) => setError(`相册保存失败�?{err.message}`));
  }, [items, loaded]);

  function handlePhotoFiles(event) {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setItems((current) => [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: file.name,
            src: String(reader.result),
            createdAt: new Date().toISOString(),
          },
          ...current,
        ]);
      };
      reader.readAsDataURL(file);
    });
    input.value = "";
  }

  return (
    <main className="album-app">
      <section className="album-hero liquid-card">
        <div>
          <p className="section-label">Photo Library</p>
          <h2>相册</h2>
          <span>{items.length ? `${items.length} 张照片` : "还没有照片"}</span>
        </div>
        <label className="soft-button file-pick-button">
          上传图片
          <input type="file" accept="image/*" multiple onChange={handlePhotoFiles} />
        </label>
      </section>
      {error && <div className="chat-system-note error">{error}</div>}
      <section className="album-grid-panel">
        {items.length === 0 && <div className="empty-note liquid-card">点上传。别让相册空得像刚装修完。</div>}
        {items.map((item) => (
          <article className="album-card liquid-card" key={item.id}>
            <img alt={item.name || "photo"} src={item.src} />
            <div>
              <span>{item.name || "未命名"}</span>
              <button type="button" onClick={() => setItems((current) => current.filter((photo) => photo.id !== item.id))}>删除</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

const defaultCalendarEvents = {
  "2026-03-10": [{ id: "anniversary-2026", title: "恋爱周年纪念", detail: "一起回看刚认识时的聊天记录。", tag: "纪念日" }],
  "2026-03-22": [{ id: "date-2026-03-22", title: "视频约会", detail: "隔着屏幕一起吃小蛋糕。", tag: "约会" }],
  "2026-03-30": [{ id: "birthday-2026", title: "阿延生日", detail: "把准备好的惊喜塞进这一天。", tag: "生日" }],
};

function CalendarApp() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(today));
  const [events, setEvents] = useState(defaultCalendarEvents);
  const [customTags, setCustomTags] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ title: "", detail: "", tag: "日常" });
  const [editingEventId, setEditingEventId] = useState("");
  const [tagDraft, setTagDraft] = useState("");

  useEffect(() => {
    let alive = true;
    async function loadCalendar() {
      try {
        const data = await loadPhoneState("calendar", { events: defaultCalendarEvents });
        if (!alive) return;
        setEvents(data.events && typeof data.events === "object" ? data.events : defaultCalendarEvents);
        setCustomTags(Array.isArray(data.customTags) ? data.customTags : []);
      } catch (err) {
        setError(`日历后端没连上：${err.message}`);
      } finally {
        if (alive) setLoaded(true);
      }
    }
    loadCalendar();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    savePhoneState("calendar", { events, customTags }).catch((err) => setError(`日历保存失败：${err.message}`));
  }, [events, customTags, loaded]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = monthCells(year, month);
  const selectedEvents = events[selectedDate] || [];
  const allTags = [...new Set(["日常", "纪念日", "约会", "生日", "旅行", ...customTags, ...Object.values(events).flat().map((item) => item.tag).filter(Boolean)])];

  function addEvent(event) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;
    setEvents((current) => {
      const next = { ...current };
      const nextItem = { id: editingEventId || `${Date.now()}`, title, detail: draft.detail.trim(), tag: draft.tag };
      next[selectedDate] = editingEventId
        ? (next[selectedDate] || []).map((item) => item.id === editingEventId ? nextItem : item)
        : [...(next[selectedDate] || []), nextItem];
      return next;
    });
    setEditingEventId("");
    setDraft({ title: "", detail: "", tag: draft.tag });
  }

  function removeEvent(eventId) {
    setEvents((current) => ({
      ...current,
      [selectedDate]: (current[selectedDate] || []).filter((item) => item.id !== eventId),
    }));
    if (editingEventId === eventId) {
      setEditingEventId("");
      setDraft({ title: "", detail: "", tag: "日常" });
    }
  }

  function editEvent(item) {
    setEditingEventId(item.id);
    setDraft({ title: item.title || "", detail: item.detail || "", tag: item.tag || "日常" });
  }

  function addCustomTag(event) {
    event.preventDefault();
    const nextTag = tagDraft.trim();
    if (!nextTag) return;
    setCustomTags((current) => current.includes(nextTag) ? current : [...current, nextTag]);
    setDraft((current) => ({ ...current, tag: nextTag }));
    setTagDraft("");
  }

  return (
    <main className="calendar-app">
      <section className="calendar-panel liquid-card">
        <div className="calendar-head">
          <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))}>‹</button>
          <strong>{year}年{month + 1}月</strong>
          <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))}>›</button>
        </div>
        <div className="calendar-weekdays">{["日", "一", "二", "三", "四", "五", "六"].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid">
          {cells.map((cell) => {
            const key = toDateKey(cell.date);
            const hasEvent = Boolean(events[key]?.length);
            return (
              <button
                className={`${cell.inMonth ? "" : "muted"} ${key === selectedDate ? "active" : ""}`}
                key={key}
                type="button"
                onClick={() => setSelectedDate(key)}
              >
                <span>{cell.date.getDate()}</span>
                {hasEvent && <i />}
              </button>
            );
          })}
        </div>
      </section>
      <section className="calendar-detail liquid-card">
        <p className="section-label">{selectedDate}</p>
        {error && <div className="chat-system-note error">{error}</div>}
        <form className="calendar-form" onSubmit={addEvent}>
          <input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="事件标题" />
          <input value={draft.detail} onChange={(event) => setDraft((current) => ({ ...current, detail: event.target.value }))} placeholder="补充说明" />
          <select value={draft.tag} onChange={(event) => setDraft((current) => ({ ...current, tag: event.target.value }))}>
            {allTags.map((tag) => <option key={tag}>{tag}</option>)}
          </select>
          <button className="soft-button" type="submit">{editingEventId ? "更新" : "添加"}</button>
          {editingEventId && <button className="soft-button pale" type="button" onClick={() => { setEditingEventId(""); setDraft({ title: "", detail: "", tag: "日常" }); }}>取消编辑</button>}
        </form>
        <form className="calendar-tag-form" onSubmit={addCustomTag}>
          <input value={tagDraft} onChange={(event) => setTagDraft(event.target.value)} placeholder="自定义标签" />
          <button type="submit">＋</button>
        </form>
        <div className="calendar-event-list">
          {selectedEvents.length === 0 && <span className="empty-inline">这天还空着。</span>}
          {selectedEvents.map((item) => (
            <article key={item.id}>
              <b>{item.title}</b>
              <small>{item.tag}</small>
              {item.detail && <p>{item.detail}</p>}
              <button type="button" onClick={() => editEvent(item)}>编辑</button>
              <button type="button" onClick={() => removeEvent(item.id)}>删除</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function monthCells(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date, inMonth: date.getMonth() === month };
  });
}

function useLocalList(key, fallback = []) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);
  return [items, setItems];
}

function MemoApp() { return <SimpleAppFrame eyebrow="Memo" title="???"><p className="chat-system-note">??????? legacy ???</p></SimpleAppFrame>; }
function TodoApp() { return <SimpleAppFrame eyebrow="Todo" title="??"><p className="chat-system-note">??????? legacy ???</p></SimpleAppFrame>; }
function ShopApp() { return <SimpleAppFrame eyebrow="Shop" title="??"><p className="chat-system-note">??????? legacy ???</p></SimpleAppFrame>; }
function DecorApp() { return <SimpleAppFrame eyebrow="Decor" title="??"><p className="chat-system-note">??????? legacy ???</p></SimpleAppFrame>; }
function MusicApp() { return <SimpleAppFrame eyebrow="Music" title="??"><p className="chat-system-note">??????? Perle?</p></SimpleAppFrame>; }
function MomentsApp() { return <SimpleAppFrame eyebrow="Whisper" title="???"><p className="chat-system-note">????????? legacy ???</p></SimpleAppFrame>; }
function BubbleApp() { return <SimpleAppFrame eyebrow="Bubble" title="????"><p className="chat-system-note">????????? legacy ???</p></SimpleAppFrame>; }
function WeatherApp() { return <SimpleAppFrame eyebrow="Weather" title="??"><p className="chat-system-note">?????????</p></SimpleAppFrame>; }

function SimpleAppFrame({ eyebrow, title, children }) {
  return (
    <main className="simple-app">
      <section className="simple-hero liquid-card">
        <p className="section-label">{eyebrow}</p>
        <h2>{title}</h2>
      </section>
      {children}
    </main>
  );
}

function SettingsApp() {
  return <SimpleAppFrame eyebrow="Settings" title="??"><p className="chat-system-note">??????? legacy ???</p></SimpleAppFrame>;
}
function BackendSettingsPanel() { return null; }
function SettingsSection({ label, children }) { return <section className="settings-section liquid-card"><p className="section-label">{label}</p>{children}</section>; }
function Segmented({ value, options, onChange }) { return <div className="settings-segmented">{options.map((option) => <button className={value === option ? "active" : ""} key={option} type="button" onClick={() => onChange(option)}>{option}</button>)}</div>; }
function GlassSelect({ label, value, options, onChange }) { return <label className="glass-select"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function HomeMiniPreview() { return null; }
function AppEditorList() { return null; }
function IconPicker() { return null; }
function ColorPicker() { return null; }

function normalizeLegacyPhoneApp(app, page = 0) {
  const canonicalId = appAliases[app.id] || app.id;
  const builtin = builtinApps.find((item) => item.id === canonicalId) || {};
  return {
    ...builtin,
    ...app,
    id: canonicalId,
    label: app.label || builtin.label || canonicalId,
    glyph: app.icon || app.glyph || builtin.glyph || (app.label || canonicalId).slice(0, 1),
    type: app.type || builtin.type || "应用",
    page,
  };
}

export default function App() {
  const [screen, setScreen] = useState("lock");
  const [activeApp, setActiveApp] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [phone, setPhone] = useState(createInitialPhone);
  const [phoneLoaded, setPhoneLoaded] = useState(false);
  const [screenMotion, setScreenMotion] = useState("idle");
  const unlockGuardUntil = useRef(0);

  useEffect(() => {
    let alive = true;
    async function loadPhoneConfig() {
      try {
        const data = await loadPhoneState("phone_config", {});
        if (!alive || !data.phone) return;
        setPhone((current) => ({
          ...current,
          ...data.phone,
          desktopApps: ensureDefaultApps(normalizeSavedApps(data.phone.desktopApps, current.desktopApps)),
        }));
      } catch {
        // Local state still works when backend is unavailable.
      } finally {
        if (alive) setPhoneLoaded(true);
      }
    }
    loadPhoneConfig();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phone));
    document.documentElement.style.setProperty("--accent", phone.accent);
    document.documentElement.style.setProperty("--font-scale", `${phone.fontScale}%`);
    if (phoneLoaded) savePhoneState("phone_config", { phone }).catch(() => {});
  }, [phone, phoneLoaded]);

  // settings-app-sync removed — new SettingsLoveApp writes directly to phone state via setPhone

  // Live-sync layout changes from stage-atelier settings
  useEffect(() => {
    const handler = (event) => {
      const detail = event?.detail;
      if (!detail || typeof detail !== "object") return;
      setPhone((current) => ({
        ...current,
        ...(Array.isArray(detail.desktopApps) && detail.desktopApps.length
          ? { desktopApps: ensureDefaultApps(normalizeSavedApps(detail.desktopApps, current.desktopApps)) }
          : {}),
        ...(Array.isArray(detail.dockApps) && detail.dockApps.length
          ? { dockApps: normalizeSavedApps(detail.dockApps, current.dockApps) }
          : {}),
      }));
    };
    window.addEventListener("yui-phone-layout-updated", handler);
    return () => window.removeEventListener("yui-phone-layout-updated", handler);
  }, []);

  useEffect(() => {
    installRichTextInputs(document);
    const flushBeforeAction = (event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("button, [role='button'], input[type='submit'], input[type='button']")) return;
      flushActiveRichTextInput();
    };
    document.addEventListener("pointerdown", flushBeforeAction, true);
    document.addEventListener("click", flushBeforeAction, true);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.(RICH_TEXT_SELECTOR)) enhanceRichInput(node);
          installRichTextInputs(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.removeEventListener("pointerdown", flushBeforeAction, true);
      document.removeEventListener("click", flushBeforeAction, true);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const tapTargets = [
      "button",
      "[role='button']",
      ".app-cell",
      ".bottom-tab",
      ".dock-item",
      "[data-home-target]",
      "[data-action]",
    ].join(",");
    const handleTap = (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("input, textarea, select, option")) return;
      const target = event.target.closest(tapTargets);
      if (!(target instanceof HTMLElement)) return;
      target.classList.remove("tap-motion");
      void target.offsetWidth;
      target.classList.add("tap-motion");
      window.setTimeout(() => target.classList.remove("tap-motion"), 260);
    };
    document.addEventListener("pointerdown", handleTap, true);
    return () => document.removeEventListener("pointerdown", handleTap, true);
  }, []);

  useEffect(() => {
    if (screenMotion === "idle") return;
    const timer = window.setTimeout(() => setScreenMotion("idle"), 420);
    return () => window.clearTimeout(timer);
  }, [screenMotion]);

  function openApp(appId) {
    if (Date.now() < unlockGuardUntil.current) return;
    setScreenMotion("open");
    setActiveApp(appId);
    setScreen("app");
  }

  function unlockToHome() {
    unlockGuardUntil.current = Date.now() + 650;
    setScreenMotion("unlock");
    setActiveApp(null);
    setPageIndex(0);
    setScreen("home");
  }

  function goHome() {
    setScreenMotion("home");
    setActiveApp(null);
    setScreen("home");
  }

  return (
    <div className={`phone-root screen-motion-${screenMotion}`} style={{ fontSize: `calc(16px * ${phone.fontScale / 100})` }}>
      {screen === "lock" && <LegacyLockScreen onUnlock={unlockToHome} />}
      {screen === "home" && <LegacyHomePage onOpenApp={openApp} phone={phone} />}
      {screen === "app" && <AppShell appId={activeApp} onHome={goHome} phone={phone} setPhone={setPhone} />}
    </div>
  );
}


