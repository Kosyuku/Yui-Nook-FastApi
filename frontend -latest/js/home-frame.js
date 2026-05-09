/**
 * 主屏幕框架：电量、时钟、日期、气温占位、App 图 URL、本地草稿
 */

const STORAGE_KEY = "pyro_home_frame_v1";

const DEFAULT_APP_ICONS = {
  top: [
    "https://picsum.photos/seed/appA1/256/256",
    "https://picsum.photos/seed/appA2/256/256",
    "https://picsum.photos/seed/appA3/256/256",
    "https://picsum.photos/seed/appA4/256/256",
  ],
  bottom: [
    "https://picsum.photos/seed/appB1/256/256",
    "https://picsum.photos/seed/appB2/256/256",
    "https://picsum.photos/seed/appB3/256/256",
    "https://picsum.photos/seed/appB4/256/256",
  ],
};

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveState(partial) {
  const next = { ...loadState(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function tickClock() {
  const el = document.getElementById("clock-text");
  if (!el) return;
  const now = new Date();
  el.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
}

function tickDatePill() {
  const el = document.getElementById("date-pill");
  if (!el) return;
  const now = new Date();
  const w = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  el.textContent = `${now.getMonth() + 1}月${now.getDate()}日 星期${w}`;
}

async function tickBattery() {
  const el = document.getElementById("battery-text");
  if (!el) return;
  const nav = navigator;
  if (nav.getBattery) {
    try {
      const b = await nav.getBattery();
      const pct = Math.round(b.level * 100);
      el.textContent = `${pct}%`;
      b.addEventListener("levelchange", () => {
        el.textContent = `${Math.round(b.level * 100)}%`;
      });
      return;
    } catch {
      /* fallthrough */
    }
  }
  el.textContent = "—%";
}

function setTempPlaceholder() {
  const el = document.getElementById("hero-temp");
  if (!el) return;
  const s = loadState();
  if (s.tempText) {
    el.textContent = s.tempText;
    return;
  }
  // 占位：可后续接天气 API
  el.textContent = "22°";
}

function bindAppGrids() {
  const top = document.getElementById("apps-top");
  const bottom = document.getElementById("apps-bottom");
  const state = loadState();
  const urlsTop = state.appUrlsTop || DEFAULT_APP_ICONS.top;
  const urlsBot = state.appUrlsBottom || DEFAULT_APP_ICONS.bottom;

  top?.querySelectorAll(".app-tile img").forEach((img, i) => {
    img.src = urlsTop[i] || DEFAULT_APP_ICONS.top[i];
    img.alt = `应用 ${i + 1}`;
  });
  bottom?.querySelectorAll(".app-tile img").forEach((img, i) => {
    img.src = urlsBot[i] || DEFAULT_APP_ICONS.bottom[i];
    img.alt = `应用 ${i + 1}`;
  });

  // 阻止默认跳转（框架阶段）
  top?.querySelectorAll(".app-tile").forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
  bottom?.querySelectorAll(".app-tile").forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
}

function restoreFields() {
  const s = loadState();
  const map = [
    ["hero-title", "heroTitle"],
    ["bubble-note", "bubbleNote"],
    ["wide-text", "wideText"],
    ["wand-line", "wandLine"],
    ["square-caption", "squareCaption"],
  ];
  for (const [id, key] of map) {
    const el = document.getElementById(id);
    if (el && s[key] != null) el.value = s[key];
  }
  if (s.squareImageData) {
    const prev = document.getElementById("square-preview");
    const ph = document.getElementById("square-ph");
    if (prev) {
      prev.src = s.squareImageData;
      prev.hidden = false;
      if (ph) ph.hidden = true;
    }
  }
}

function bindAutosave() {
  const on = (id, key) => {
    const el = document.getElementById(id);
    el?.addEventListener("input", () => saveState({ [key]: el.value }));
  };
  on("hero-title", "heroTitle");
  on("bubble-note", "bubbleNote");
  on("wide-text", "wideText");
  on("wand-line", "wandLine");
  on("square-caption", "squareCaption");

  document.getElementById("bubble-save")?.addEventListener("click", () => {
    const ta = document.getElementById("bubble-note");
    if (ta) saveState({ bubbleNote: ta.value });
    ta?.blur();
  });

  const file = document.getElementById("square-file");
  const prev = document.getElementById("square-preview");
  const ph = document.getElementById("square-ph");
  file?.addEventListener("change", () => {
    const f = file.files?.[0];
    if (!f || !prev) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      prev.src = data;
      prev.hidden = false;
      if (ph) ph.hidden = true;
      saveState({ squareImageData: data });
    };
    reader.readAsDataURL(f);
  });
}

function init() {
  tickClock();
  tickDatePill();
  tickBattery();
  setTempPlaceholder();
  bindAppGrids();
  restoreFields();
  bindAutosave();

  setInterval(tickClock, 1000);
  setInterval(tickDatePill, 60_000);
}

init();
