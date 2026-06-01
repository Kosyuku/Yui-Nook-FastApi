/**
 * Grimoire 魔典 — Yui Nook App
 * 原样移植自 grimoire-bundle/
 * 数据：先加载 API，为空时用内置样本数据
 */
import { useEffect, useMemo, useState, useCallback } from "react";
import { apiUrl } from "./apiBase.js";
import { uploadMediaFile } from "./mediaApi.js";

// ═══════════════════════════════════════════════════════════════
// Design Tokens & Fonts  (= components/tokens.jsx)
// ═══════════════════════════════════════════════════════════════
const C = {
  paper: "#FBF7F2",
  paperDeep: "#F3ECE2",
  cream: "#FFFBF4",
  ink: "#2B2420",
  inkSoft: "#6B5F58",
  inkFaint: "#A89C93",
  rule: "rgba(120, 90, 70, 0.12)",
  rose: "#F5D6D1",
  peach: "#F4DCC4",
  mauve: "#E8D4DE",
  sage: "#D9E0D0",
  lilac: "#DDD6E6",
  butter: "#F1E4BD",
  dusk: "#D8C8D6",
  stamp: "#B84A3E",
  gold: "#B08458",
  ribbon: "#D9A5A0",
};
const F = {
  serifEn: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  serifCn: '"Noto Serif SC", "Source Han Serif CN", "Songti SC", serif',
  handCn: '"Ma Shan Zheng", "Liu Jian Mao Cao", cursive',
  handEn: '"Caveat", "Homemade Apple", cursive',
  body: '"Noto Serif SC", "Source Han Serif CN", serif',
};

// ═══════════════════════════════════════════════════════════════
// Sample Data  (= grimoire/data.jsx)  — used as fallback
// ═══════════════════════════════════════════════════════════════
const SAMPLE_TOMES = [
  { id: "nighttide", title: "夜潮", titleEn: "Night Tide", sub: "海雾里那座灯塔城邦", spine: "#2C3E5C", cover: "#3A4D6F", gilt: "#C5A572", sigil: "⊹", sigilStyle: "serifEn", kind: "虚构世界", count: 14, lastEdited: "今天 · 02:14", palette: { bg: "#EEF1F4", accent: "#3A4D6F", tint: "#D8E0EA" } },
  { id: "kitchen", title: "庚子小馆", titleEn: "Kengzi Inn", sub: "巷尾那家只开晚上的店", spine: "#7A3D2F", cover: "#8B4A38", gilt: "#E2C28C", sigil: "馆", sigilStyle: "serifCn", kind: "日常", count: 9, lastEdited: "昨天 · 23:08", palette: { bg: "#F6EFE6", accent: "#7A3D2F", tint: "#E8D4C8" } },
  { id: "glasscity", title: "玻璃城", titleEn: "Glass City", sub: "没有夜的城市，所有楼都是玻璃", spine: "#3D5A52", cover: "#4D6E64", gilt: "#B8C7B0", sigil: "◇", sigilStyle: "serifEn", kind: "科幻", count: 7, lastEdited: "上周", palette: { bg: "#EEF1EE", accent: "#3D5A52", tint: "#D2DED5" } },
  { id: "reads", title: "读", titleEn: "Reads", sub: "看完的书与电影的私人札记", spine: "#5B4A6E", cover: "#6E5B82", gilt: "#D4C2E0", sigil: "读", sigilStyle: "serifCn", kind: "札记", count: 23, lastEdited: "5·12", palette: { bg: "#F1EDF3", accent: "#5B4A6E", tint: "#DDD2E5" } },
  { id: "recipe", title: "食谱", titleEn: "Recipes", sub: "能复现的、忘了的、想试的", spine: "#6B7A3D", cover: "#7C8B4D", gilt: "#D8E0AA", sigil: "食", sigilStyle: "serifCn", kind: "札记", count: 11, lastEdited: "5·09", palette: { bg: "#F0F1E6", accent: "#6B7A3D", tint: "#DDE2C8" } },
];
const TYPES = {
  character: { cn: "角色", en: "character", glyph: "人", color: "#B84A3E" },
  place:     { cn: "地点", en: "place",     glyph: "◐", color: "#5B7A6A" },
  lore:      { cn: "设定", en: "lore",      glyph: "◇", color: "#8B6788" },
  thing:     { cn: "物件", en: "thing",     glyph: "◧", color: "#B08458" },
  event:     { cn: "事件", en: "event",     glyph: "✦", color: "#3A4D6F" },
  jot:       { cn: "随笔", en: "jot",       glyph: "✎", color: "#A89C93" },
};
const STATUS = {
  seed:    { cn: "萌芽", en: "seed",    color: "#A89C93" },
  draft:   { cn: "草稿", en: "draft",   color: "#B08458" },
  woven:   { cn: "已成", en: "woven",   color: "#5B7A6A" },
  archive: { cn: "封存", en: "archive", color: "#6B5F58" },
};
const BOARD_COLS = [
  { id: "seed",    ...STATUS.seed },
  { id: "draft",   ...STATUS.draft },
  { id: "woven",   ...STATUS.woven },
  { id: "archive", ...STATUS.archive },
];
const SAMPLE_ENTRIES = [
  { id: "n-mira",    tome: "nighttide", type: "character", title: "弥拉",     titleEn: "Mira",       sub: "灯塔的最后一位守人",               cover: "#2C3E5C", coverInk: "#F1E4BD", coverGlyph: "弥", status: "woven",   tags: ["守夜","银发","不会笑"],  fields: { 性别:"女", 年龄:"看不出 · 大约二十七岁", 身高:"171", 生日:"雾月初九", MBTI:"INFJ", 一句话:"把光递出去，自己永远是黑的那个。" }, updated: "今天 · 02:14", relations: [{ id: "n-shio", type: "CP", label: "羁绊" }, { id: "n-old", type: "师徒", label: "徒弟" }], body: "她从十四岁开始守这座塔，没下过山。海雾来的那几日，她坐在七层最高的窗台上，把一只白色的小灯一遍遍点亮、熄灭、点亮——像在跟海里那个谁打着只有他们才懂的暗号。\n\n老灯说，弥拉天生不会笑。她想了想，觉得他说错了。她只是不在塔里笑。" },
  { id: "n-shio",    tome: "nighttide", type: "character", title: "汐",       titleEn: "Shio",       sub: "海里捞起来的不知道是不是人",          cover: "#4F6B7A", coverInk: "#E4ECF1", coverGlyph: "汐", status: "draft",   tags: ["不语","咸味","会哭"],   fields: { 性别:"难以判断", 年龄:"？", 身高:"178", 一句话:"名字是弥拉给的，他自己不记得。" }, updated: "今天 · 01:40", relations: [{ id: "n-mira", type: "CP", label: "羁绊" }] },
  { id: "n-old",     tome: "nighttide", type: "character", title: "老灯",     titleEn: "Old Lamp",   sub: "前任守人，已故",                    cover: "#5B4A3E", coverInk: "#E8D8C0", coverGlyph: "灯", status: "woven",   tags: ["亡者","严苛","会发光"], fields: { 性别:"男", 年龄:"?", 一句话:"没死透，常在塔上层咳嗽。" }, updated: "5·24", relations: [{ id: "n-mira", type: "师徒", label: "师父" }] },
  { id: "n-tower",   tome: "nighttide", type: "place",     title: "北壁灯塔", titleEn: "North Wall", sub: "凿在悬崖里的螺旋塔，七层",            cover: "#1F2A3E", coverInk: "#C5D4E0", coverGlyph: "塔", status: "woven",   tags: ["主舞台","七层","雾"],   fields: { 建于:"雾历前三百年", 一句话:"光不为照路，是给海里那个回信。" }, updated: "5·22", relations: [] },
  { id: "n-fog",     tome: "nighttide", type: "lore",      title: "低吟雾",   titleEn: "Murmur Fog", sub: "会用海里的人声说话的那种雾",           cover: "#6E7A82", coverInk: "#EAF0F2", coverGlyph: "雾", status: "woven",   tags: ["设定核心","禁忌","世界观"], fields: { 所属:"夜潮 · 海域现象", 出现:"每年雾月初九前后，约九日", 形态:"及人之高，半透明，咸味重", 规则:"听见自己名字千万别答", 起源:"雾历前传说，来自海里的“忘名族”", 一句话:"它不是雾，是海在讲话。" }, updated: "5·20", relations: [{ id: "n-eclipse", type: "相关事件", label: "相关" }, { id: "n-tower", type: "常出之地", label: "相关" }], body: "低吟雾不是气象学意义上的雾。它有体温，重量略大于海风，能从灯塔七层的窗缝里挤进来，在屋里停留半刻钟。北壁灯塔历代的守人都被叮嘱过：它在喊你名字的时候，无论它喊得多像你母亲，你都不要应。\n\n雾历前的渔民相信，海里有一族失去名字的人，他们用别人的名字交换上岸的可能。每当雾月将近，他们会在岸边轻轻地唤——只要有人答一声，就替他们走进海里。\n\n雾消散后，岸上偶尔会留下一枚半边的银币。" },
  { id: "n-coin",    tome: "nighttide", type: "thing",     title: "半枚银币", titleEn: "Half Coin",  sub: "汐被捞起时握在手里的",               cover: "#9AA5B0", coverInk: "#2C3E5C", coverGlyph: "⌾", status: "draft",   tags: ["信物","半枚"],          fields: { 来历:"另一半在哪没人知道", 一句话:"边缘磨损得几乎认不出字。" }, updated: "5·18", relations: [] },
  { id: "n-eclipse", tome: "nighttide", type: "event",     title: "雾月初九", titleEn: "Fogfall",    sub: "汐被冲上岸的那个早晨",               cover: "#3E4F6E", coverInk: "#F1E4BD", coverGlyph: "九", status: "woven",   tags: ["故事起点"],              fields: { 时间:"雾历 1207 · 雾月初九", 一句话:"弥拉那天违规没点灯，海把汐送了过来。" }, updated: "5·14", relations: [] },
  { id: "n-keeper",  tome: "nighttide", type: "lore",      title: "守人制",   titleEn: "Keeper Rite",sub: "一座塔，一位守人，终身",              cover: "#42526B", coverInk: "#D8E0EA", coverGlyph: "守", status: "draft",   tags: ["制度"],                  fields: { 一句话:"退役的方式只有一种 — 死。" }, updated: "5·10" },
  { id: "n-yan",     tome: "nighttide", type: "character", title: "阎信使",   titleEn: "Yan",        sub: "替灯塔议会跑腿的少年",               cover: "#6B4A2A", coverInk: "#F4DCC4", coverGlyph: "阎", status: "seed",    tags: ["少年","话多"],           fields: { 年龄:"十六", 一句话:"走得比海鸥还快。" }, updated: "5·09" },
  { id: "k-jiu",     tome: "kitchen",   type: "character", title: "九姨",     titleEn: "Auntie Jiu", sub: "老板娘，凶但煮的汤甜",               cover: "#7A3D2F", coverInk: "#F4E8D8", coverGlyph: "九", status: "woven",   tags: ["老板娘","凶"],           fields: { 一句话:"\"今天卖完了，明天再来。\"" }, updated: "昨天", relations: [] },
  { id: "k-recipe1", tome: "kitchen",   type: "thing",     title: "糖醋小排谱",titleEn: "Sweet & Sour",sub: "九姨家代表菜",                    cover: "#B84A3E", coverInk: "#F4E8D8", coverGlyph: "排", status: "draft",   tags: ["代表菜"],                fields: {}, updated: "昨天" },
  { id: "g-alta",    tome: "glasscity", type: "character", title: "Alta",     titleEn: "Alta",       sub: "玻璃城里唯一不透明的人",             cover: "#3D5A52", coverInk: "#E8F0E8", coverGlyph: "A",  status: "draft",   tags: ["不透明"],                fields: { 一句话:"所有人都看不进她。" }, updated: "上周" },
  { id: "r-letter",  tome: "reads",     type: "lore",      title: "《不能承受的生命之轻》", titleEn: "Unbearable", sub: "5·12 重读", cover: "#5B4A6E", coverInk: "#E0D2EC", coverGlyph: "轻", status: "archive", tags: ["重读"], fields: {}, updated: "5·12" },
  { id: "j-night",   tome: "nighttide", type: "jot",       title: "关于灯的一个问题",       titleEn: "",           sub: "",             cover: "#FBF7F2", coverInk: "#6B5F58", coverGlyph: "✎",  status: "seed",    tags: ["中途"],                  fields: {}, updated: "今早", body: "如果灯不是为了照路，是为了给海里那个人回信——那弥拉每晚点灯，到底是在等回信，还是只是不想让那边觉得被忘了？\n\n…这个得想想。可能是后者。后者更像她。" },
  { id: "j-rain",    tome: "reads",     type: "jot",       title: "昨夜下雨的时候",         titleEn: "",           sub: "",             cover: "#FBF7F2", coverInk: "#6B5F58", coverGlyph: "✎",  status: "seed",    tags: [],                        fields: {}, updated: "今早 · 8:02", body: "昨夜下雨。突然很想写点什么，但又不知道写什么。\n\n就只是——雨打在空调外机上的声音很像某种节拍。记下来，不然天一亮就忘了。" },
  { id: "j-name",    tome: "reads",     type: "jot",       title: "不知道该叫什么",          titleEn: "",           sub: "",             cover: "#FBF7F2", coverInk: "#6B5F58", coverGlyph: "✎",  status: "seed",    tags: ["未完"],                  fields: {}, updated: "5·24 深夜", body: "想起一个设定，可以放进夜潮，也可以放进玻璃城，还没想好放哪。\n\n“一个人只要不被叫名字，就不会死。”——但这跟低吟雾是不是重了？待定。" },
];

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════
function shade(hex, amt) {
  const n = parseInt(String(hex || "#000000").slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
const isCn = (s) => /[一-鿿]/.test(String(s || ""));

function coverTitleStyle(title, width) {
  const len = Array.from(String(title || "")).length;
  const base = width && width > 140 ? 32 : 26;
  return {
    fontSize: Math.max(17, base - Math.max(0, len - 4) * 2.4),
    letterSpacing: len >= 6 ? 3 : len >= 5 ? 5 : 8,
    lineHeight: len >= 6 ? 1.02 : 1.15,
  };
}

function BackLink({ onClick, children = "grimoire" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        minHeight: 28,
        padding: "0 4px",
        fontFamily: F.serifEn,
        fontStyle: "italic",
        fontSize: 12,
        color: C.inkFaint,
        letterSpacing: "1.2px",
      }}
    >
      <span style={{ fontFamily: F.serifCn, fontStyle: "normal", fontSize: 16, lineHeight: 1 }}>‹</span>
      <span>{children}</span>
    </button>
  );
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(apiUrl(path), {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`);
  return data;
}

// ═══════════════════════════════════════════════════════════════
// Shared style objects
// ═══════════════════════════════════════════════════════════════
const miniBtn = {
  fontFamily: F.serifCn, fontSize: 11, letterSpacing: "1.5px",
  padding: "5px 10px", borderRadius: 999,
  border: `0.5px solid ${C.rule}`, background: C.cream,
  color: C.inkSoft, cursor: "pointer",
};

// ═══════════════════════════════════════════════════════════════
// Shared sub-components  (= grimoire/components.jsx)
// ═══════════════════════════════════════════════════════════════
function Sigil({ tome, tomes, size = 28 }) {
  const t = (tomes || SAMPLE_TOMES).find((x) => x.id === tome) || (tomes || SAMPLE_TOMES)[0];
  if (!t) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 32% 28%, ${t.gilt}EE, ${t.gilt} 50%, ${t.spine} 100%)`,
      color: t.spine,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: isCn(t.sigil) ? F.serifCn : F.serifEn,
      fontStyle: isCn(t.sigil) ? "normal" : "italic",
      fontWeight: 600, fontSize: size * 0.5,
      boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.25)",
      position: "relative", flexShrink: 0,
    }}>
      {t.sigil}
      <svg width={size + 4} height={size + 4} style={{ position: "absolute", inset: -2, pointerEvents: "none" }}>
        <circle cx={(size + 4) / 2} cy={(size + 4) / 2} r={size / 2 + 0.5}
          fill="none" stroke={t.spine} strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity="0.5" />
      </svg>
    </div>
  );
}

function GiltRule({ color }) {
  return (
    <div style={{
      height: 1, background: color, opacity: 0.55,
      boxShadow: `0 2px 0 ${color}55, 0 -2px 0 ${color}55`,
      margin: "6px 0",
    }} />
  );
}

function TomeSpine({ tome, height = 220, onClick }) {
  const len = Array.from(String(tome.title || "")).length;
  return (
    <div onClick={onClick} style={{
      width: 56, height, position: "relative", cursor: "pointer",
      background: `linear-gradient(90deg, ${shade(tome.spine, -25)} 0%, ${tome.spine} 8%, ${shade(tome.spine, 8)} 50%, ${tome.spine} 92%, ${shade(tome.spine, -35)} 100%)`,
      borderRadius: "2px 3px 3px 2px",
      boxShadow: "0 14px 22px -10px rgba(40,30,20,0.45), inset 0 0 0 0.5px rgba(0,0,0,0.25)",
      flexShrink: 0, transition: "transform .25s, box-shadow .25s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
      <div style={{ position: "absolute", top: 12, left: 6, right: 6, height: 1, background: tome.gilt, opacity: 0.85 }} />
      <div style={{ position: "absolute", top: 16, left: 6, right: 6, height: 0.5, background: tome.gilt, opacity: 0.55 }} />
      <div style={{ position: "absolute", bottom: 12, left: 6, right: 6, height: 1, background: tome.gilt, opacity: 0.85 }} />
      <div style={{ position: "absolute", bottom: 16, left: 6, right: 6, height: 0.5, background: tome.gilt, opacity: 0.55 }} />
      <div style={{ position: "absolute", top: 30, bottom: 30, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: tome.gilt, fontFamily: F.serifCn, fontSize: Math.max(10, 14 - Math.max(0, len - 5)), fontWeight: 500, letterSpacing: len > 5 ? 2 : 4, writingMode: "vertical-rl", textOrientation: "upright", overflow: "hidden" }}>{tome.title}</div>
      <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", fontFamily: isCn(tome.sigil) ? F.serifCn : F.serifEn, fontStyle: isCn(tome.sigil) ? "normal" : "italic", fontSize: 14, color: tome.gilt, opacity: 0.7 }}>{tome.sigil}</div>
      <div style={{ position: "absolute", top: 1, bottom: 1, left: "92%", width: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

function TomeCover({ tome, width = 160, height = 210, onClick }) {
  const titleFit = coverTitleStyle(tome.title, width);
  return (
    <div onClick={onClick} style={{
      width: width || "100%", height, position: "relative", cursor: "pointer",
      background: `linear-gradient(135deg, ${shade(tome.cover, 8)} 0%, ${tome.cover} 60%, ${shade(tome.cover, -12)} 100%)`,
      color: tome.gilt, borderRadius: "3px 6px 6px 3px",
      boxShadow: "0 18px 30px -14px rgba(40,30,20,0.45), inset 0 0 0 0.5px rgba(0,0,0,0.25)",
      display: "flex", flexDirection: "column", padding: "18px 16px",
      overflow: "hidden", flexShrink: 0, transition: "transform .3s cubic-bezier(.2,.7,.2,1)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) rotate(-0.4deg)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 6, background: "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0))" }} />
      <div style={{ position: "absolute", inset: 10, border: `0.5px solid ${tome.gilt}`, opacity: 0.45, borderRadius: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 14, border: `0.5px solid ${tome.gilt}`, opacity: 0.25, borderRadius: 1, pointerEvents: "none" }} />
      <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, letterSpacing: 3, opacity: 0.7, textTransform: "lowercase", textAlign: "center", marginTop: 4 }}>{tome.titleEn}</div>
      <GiltRule color={tome.gilt} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: F.serifCn, fontWeight: 500, color: tome.gilt, writingMode: "vertical-rl", textOrientation: "upright", ...titleFit }}>{tome.title}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontFamily: isCn(tome.sigil) ? F.serifCn : F.serifEn, fontStyle: isCn(tome.sigil) ? "normal" : "italic", fontSize: 20, opacity: 0.85 }}>{tome.sigil}</div>
      <GiltRule color={tome.gilt} />
      <div style={{ fontFamily: F.serifCn, fontSize: 9, opacity: 0.6, letterSpacing: 3, textAlign: "center" }}>{tome.kind} · {tome.count} 条</div>
    </div>
  );
}

function ViewSwitcher({ value, onChange }) {
  const opts = [
    { id: "gallery", cn: "画廊", glyph: "▤" },
    { id: "table",   cn: "表",   glyph: "☰" },
    { id: "board",   cn: "看板", glyph: "▥" },
  ];
  return (
    <div style={{ display: "inline-flex", padding: 2, gap: 1, background: C.paperDeep, borderRadius: 8, border: `0.5px solid ${C.rule}` }}>
      {opts.map((o) => {
        const on = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{ padding: "5px 10px", borderRadius: 6, border: "none", background: on ? C.cream : "transparent", color: on ? C.ink : C.inkFaint, fontFamily: F.serifCn, fontSize: 11, letterSpacing: "2px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", boxShadow: on ? "0 1px 3px rgba(40,30,20,0.1)" : "none" }}>
            <span style={{ fontSize: 11 }}>{o.glyph}</span>{o.cn}
          </button>
        );
      })}
    </div>
  );
}

const JOT_SNIPPETS = {
  "j-night": "如果灯不是为了照路，是为了给海里那个人回信——",
  "j-rain": "昨夜下雨。突然很想写点什么，但又不知道写什么。",
  "j-name": "想起一个设定，可以放进夜潮，也可以放进玻璃城…",
};

function EntryCard({ entry, density = "comfy", tomes, onClick }) {
  const T = TYPES[entry.type] || TYPES.character;
  const S = STATUS[entry.status] || STATUS.seed;
  const t = (tomes || SAMPLE_TOMES).find((x) => x.id === entry.tome);
  const compact = density === "compact";
  const coverH = compact ? 84 : 112;

  if (entry.type === "jot") {
    return (
      <div onClick={onClick} style={{ background: "#FCFAF5", borderRadius: 6, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 6px rgba(40,30,20,0.08), 0 0 0 0.5px rgba(120,90,70,0.12)", transition: "transform .25s, box-shadow .25s", display: "flex", flexDirection: "column", backgroundImage: "repeating-linear-gradient(0deg, transparent 0 19px, rgba(120,150,180,0.14) 19px 20px)", position: "relative" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 18px rgba(40,30,20,0.15), 0 0 0 0.5px rgba(120,90,70,0.15)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(40,30,20,0.08), 0 0 0 0.5px rgba(120,90,70,0.12)"; }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 10, width: 1, background: "rgba(184,74,62,0.22)" }} />
        <div style={{ padding: compact ? "8px 12px 8px 18px" : "12px 14px 12px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 9, color: T.color, letterSpacing: "2px" }}>{T.en}</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: F.handEn, fontSize: 12, color: "#7E94A8" }}>{entry.updated}</span>
          </div>
          <div style={{ fontFamily: F.serifCn, fontSize: compact ? 12 : 14, fontWeight: 600, color: C.ink, letterSpacing: "0.5px", lineHeight: 1.4 }}>{entry.title}</div>
          {!compact && <div style={{ fontFamily: F.body, fontSize: 10, color: C.inkSoft, lineHeight: "20px", letterSpacing: "0.3px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{JOT_SNIPPETS[entry.id] || entry.body || "（空白的一页）"}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <Sigil tome={entry.tome} tomes={tomes} size={14} />
            <span style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "1px" }}>{t?.title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick}
      style={{ background: C.cream, borderRadius: 6, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 6px rgba(40,30,20,0.08), 0 0 0 0.5px rgba(120,90,70,0.12)", transition: "transform .25s, box-shadow .25s", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 18px rgba(40,30,20,0.15), 0 0 0 0.5px rgba(120,90,70,0.15)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(40,30,20,0.08), 0 0 0 0.5px rgba(120,90,70,0.12)"; }}>
      <div style={{ height: coverH, background: entry.cover, color: entry.coverInk, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,.22) 3px 4px)" }} />
        <div style={{ fontFamily: isCn(entry.coverGlyph) ? F.serifCn : F.serifEn, fontSize: compact ? 30 : 42, fontWeight: 400, fontStyle: /[A-Za-z]/.test(entry.coverGlyph) ? "italic" : "normal", letterSpacing: 1, position: "relative", zIndex: 2 }}>{entry.coverGlyph}</div>
        <div style={{ position: "absolute", top: 6, left: 6, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 9, color: entry.coverInk, opacity: 0.85, letterSpacing: "2px" }}>{T.en}</div>
        <div style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", background: S.color, boxShadow: `0 0 0 2px ${entry.cover}` }} />
      </div>
      <div style={{ padding: compact ? "8px 10px 10px" : "10px 12px 12px", display: "flex", flexDirection: "column", gap: compact ? 3 : 5 }}>
        <div style={{ fontFamily: F.serifCn, fontSize: compact ? 12 : 14, fontWeight: 600, color: C.ink, letterSpacing: "0.5px", lineHeight: 1.3 }}>{entry.title}</div>
        {!compact && entry.sub && <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkSoft, lineHeight: 1.6, letterSpacing: "0.3px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{entry.sub}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: compact ? 2 : 4, paddingTop: compact ? 4 : 6, borderTop: `0.5px solid ${C.rule}` }}>
          <Sigil tome={entry.tome} tomes={tomes} size={14} />
          <span style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "1px" }}>{t?.title}</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 9, color: S.color, letterSpacing: "1px" }}>{S.en}</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Home screens  (= grimoire/homes.jsx)
// ═══════════════════════════════════════════════════════════════
function GrimoireHead({ subtitle, right }) {
  return (
    <div style={{ padding: "4px 20px 14px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
      <div>
        <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontWeight: 400, fontSize: 30, color: C.ink, letterSpacing: "0.5px", lineHeight: 1 }}>Grimoire</div>
        <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkSoft, letterSpacing: "5px", marginTop: 4 }}>魔 · 典 {subtitle && <span style={{ color: C.inkFaint, letterSpacing: "2px" }}>· {subtitle}</span>}</div>
      </div>
      {right}
    </div>
  );
}

function SearchBar() {
  return (
    <div style={{ margin: "0 20px 12px", padding: "8px 12px", background: C.paperDeep, borderRadius: 8, display: "flex", alignItems: "center", gap: 8, border: `0.5px solid ${C.rule}` }}>
      <span style={{ color: C.inkFaint, fontSize: 13 }}>⌕</span>
      <span style={{ fontFamily: F.serifCn, fontSize: 11, color: C.inkFaint, letterSpacing: "1px" }}>翻一翻所有典页…</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1px" }}>⌘K</span>
    </div>
  );
}

function RecentRow({ entry, tomes, onEntry }) {
  const t = (tomes || SAMPLE_TOMES).find((x) => x.id === entry.tome);
  const T = TYPES[entry.type] || TYPES.character;
  return (
    <div onClick={() => onEntry(entry.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: C.cream, borderRadius: 6, border: `0.5px solid ${C.rule}`, cursor: "pointer" }}>
      <div style={{ width: 32, height: 32, borderRadius: 4, background: entry.cover, color: entry.coverInk, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: isCn(entry.coverGlyph) ? F.serifCn : F.serifEn, fontSize: 16 }}>{entry.coverGlyph}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: F.serifCn, fontSize: 12, fontWeight: 600, color: C.ink, letterSpacing: "0.5px" }}>{entry.title}</div>
        <div style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "1.5px", marginTop: 1 }}>{t?.title} · {T.cn} · {entry.updated}</div>
      </div>
      <Sigil tome={entry.tome} tomes={tomes} size={18} />
    </div>
  );
}

// ── HomeBookshelf (书架) ──
function HomeBookshelf({ tomes, entries, onTome, onEntry, onCreateTome }) {
  const shelves = [{ tomes: tomes.slice(0, 3) }, { tomes: tomes.slice(3) }];
  const recentEntries = [...entries].slice(0, 3);
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, backgroundImage: "radial-gradient(ellipse 700px 400px at 30% 5%, rgba(255,238,220,0.4), transparent), repeating-linear-gradient(90deg, transparent 0 56px, rgba(160,120,85,0.025) 56px 57px)", overflow: "auto" }} className="phone-scroll">
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 20px 0" }}>
        <button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>
      </div>
      <GrimoireHead subtitle="书架" right={<button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>} />
      <div style={{ margin: "0 20px 12px", padding: "8px 12px", background: C.paperDeep, borderRadius: 8, display: "flex", alignItems: "center", gap: 8, border: `0.5px solid ${C.rule}` }}>
        <span style={{ color: C.inkFaint, fontSize: 13 }}>⌕</span>
        <span style={{ fontFamily: F.serifCn, fontSize: 11, color: C.inkFaint, letterSpacing: "1px" }}>翻一翻所有典页…</span>
        <div style={{ flex: 1 }} /><span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1px" }}>⌘K</span>
      </div>
      <div style={{ padding: "4px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>
        {shelves.map((shelf, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, padding: "0 8px", minHeight: 230 }}>
              {shelf.tomes.map((tm) => <TomeSpine key={tm.id} tome={tm} height={210 + (tm.id.length % 3) * 8} onClick={() => onTome(tm.id)} />)}
              {shelf.tomes.length < 3 && <div style={{ width: 56, height: 180, borderRadius: 3, border: `0.5px dashed ${C.inkFaint}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.inkFaint, fontSize: 18, fontFamily: F.serifEn, fontStyle: "italic", marginBottom: 1 }}>＋</div>}
            </div>
            <div style={{ height: 8, background: "linear-gradient(180deg, #C2A582 0%, #8B6B4A 60%, #5B4530 100%)", borderRadius: "0 0 2px 2px", boxShadow: "0 2px 6px rgba(40,30,20,0.18)", marginTop: -1 }} />
            <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "3px", textAlign: "right", padding: "6px 12px 0" }}>shelf · {String(i + 1).padStart(2, "0")}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "24px 20px 30px" }}>
        <div style={{ fontFamily: F.handEn, fontSize: 16, color: C.gold, marginBottom: 4 }}>recently held</div>
        <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "3px", marginBottom: 12 }}>· 最近翻过 ·</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recentEntries.map((e) => <RecentRow key={e.id} entry={e} tomes={tomes} onEntry={onEntry} />)}
        </div>
      </div>
    </div>
  );
}

// ── HomeIndex (索引目录) ──
function HomeIndex({ tomes, onTome, onCreateTome }) {
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 36px, rgba(160,120,85,0.04) 36px 37px)", overflow: "auto" }} className="phone-scroll">
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 20px 0" }}>
        <button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>
      </div>
      <GrimoireHead subtitle="索引" right={<button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>} />
      <div style={{ margin: "0 20px 6px", padding: "8px 0", borderTop: `1px solid ${C.ink}`, borderBottom: `0.5px solid ${C.rule}`, display: "grid", gridTemplateColumns: "24px 1fr 60px 36px", gap: 8, alignItems: "center", fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "2px" }}>
        <span></span><span>典名</span><span style={{ textAlign: "right" }}>页数</span><span style={{ textAlign: "right" }}>最近</span>
      </div>
      <div style={{ margin: "0 20px" }}>
        {tomes.map((tm) => (
          <div key={tm.id} onClick={() => onTome(tm.id)} style={{ display: "grid", gridTemplateColumns: "24px 1fr 60px 36px", gap: 8, alignItems: "center", padding: "14px 0", borderBottom: `0.5px solid ${C.rule}`, cursor: "pointer" }}>
            <Sigil tome={tm.id} tomes={tomes} size={22} />
            <div>
              <div style={{ fontFamily: F.serifCn, fontSize: 14, fontWeight: 600, color: C.ink, letterSpacing: "1.5px" }}>{tm.title}</div>
              <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1px", marginTop: 1 }}>{tm.titleEn} · <span style={{ fontStyle: "normal", fontFamily: F.serifCn }}>{tm.kind}</span></div>
              <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkSoft, marginTop: 4, letterSpacing: "0.3px" }}>{tm.sub}</div>
            </div>
            <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 18, color: C.ink, textAlign: "right" }}>{tm.count}</div>
            <div style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, textAlign: "right", letterSpacing: "0.5px" }}>{tm.lastEdited}</div>
          </div>
        ))}
        <div style={{ padding: "14px 0", display: "grid", gridTemplateColumns: "24px 1fr", gap: 8, alignItems: "center", color: C.inkFaint, cursor: "pointer" }}>
          <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 22, textAlign: "center" }}>＋</span>
          <span style={{ fontFamily: F.serifCn, fontSize: 12, letterSpacing: "2px" }}>新起一典</span>
        </div>
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

function HomeSpreads({ tomes, entries, onTome, onEntry, onCreateTome }) {
  const featured = tomes[0];
  const rest = tomes.slice(1);
  const recentEntries = [...entries].sort((a, b) => 0).slice(0, 3);
  if (!featured) return <div style={{ padding: 20, color: C.inkFaint, fontFamily: F.serifCn, fontSize: 12 }}>还没有典。新建一个开始吧。</div>;
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, backgroundImage: "radial-gradient(ellipse 700px 500px at 50% 0%, rgba(255,238,220,0.5), transparent)", overflow: "auto" }} className="phone-scroll">
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 20px 0" }}>
        <button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>
      </div>
      <GrimoireHead subtitle="封面墙" right={<button type="button" onClick={onCreateTome} style={miniBtn}>＋ 新典</button>} />
      {/* featured banner */}
      <div style={{ padding: "4px 20px 18px" }}>
        <div onClick={() => onTome(featured.id)} style={{ padding: 16, borderRadius: 10, background: `linear-gradient(135deg, ${featured.palette.bg} 0%, ${C.paper} 100%)`, border: `0.5px solid ${C.rule}`, display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
          <TomeCover tome={featured} width={104} height={140} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: F.handEn, fontSize: 16, color: featured.palette.accent, letterSpacing: "1px" }}>currently weaving</div>
            <div style={{ fontFamily: F.serifCn, fontSize: 18, fontWeight: 600, color: C.ink, marginTop: 2, letterSpacing: "1px" }}>{featured.title} <span style={{ color: C.inkFaint, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 13 }}>{featured.titleEn}</span></div>
            <div style={{ fontFamily: F.serifCn, fontSize: 11, color: C.inkSoft, marginTop: 6, lineHeight: 1.6, letterSpacing: "0.5px" }}>{featured.sub}</div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "1.5px" }}>
              <span>{entries.filter((e) => e.tome === featured.id).length} 条</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{featured.lastEdited}</span>
            </div>
          </div>
        </div>
      </div>
      {/* grid */}
      <div style={{ padding: "0 20px 6px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontFamily: F.serifCn, fontSize: 12, fontWeight: 600, color: C.ink, letterSpacing: "2px" }}>所有典</div>
          <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 11, color: C.inkFaint, letterSpacing: "1.5px" }}>{tomes.length} tomes · {entries.length} pages</div>
        </div>
      </div>
      <div style={{ padding: "0 20px 30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {rest.map((tm) => <TomeCover key={tm.id} tome={tm} width={undefined} height={200} onClick={() => onTome(tm.id)} />)}
        <div style={{ height: 200, borderRadius: 6, border: `0.5px dashed ${C.inkFaint}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: C.inkFaint, cursor: "pointer" }}>
          <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 32 }}>＋</span>
          <span style={{ fontFamily: F.serifCn, fontSize: 11, letterSpacing: "3px" }}>新一典</span>
        </div>
      </div>
      {/* recent */}
      {recentEntries.length > 0 && (
        <div style={{ padding: "8px 20px 30px" }}>
          <div style={{ fontFamily: F.handEn, fontSize: 16, color: C.gold, marginBottom: 4 }}>recently held</div>
          <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "3px", marginBottom: 12 }}>· 最近翻过 ·</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentEntries.map((e) => <RecentRow key={e.id} entry={e} tomes={tomes} onEntry={onEntry} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Tome screen  (= grimoire/tome.jsx)
// ═══════════════════════════════════════════════════════════════
function TomeHead({ tome, tomes, view, onView, onBack, onCreateEntry }) {
  return (
    <div style={{ padding: "4px 20px 14px", background: `linear-gradient(180deg, ${tome.palette.bg} 0%, ${C.paper} 100%)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 0, color: C.inkFaint, fontFamily: F.serifEn, fontStyle: "italic", letterSpacing: "1.5px" }}>
        <BackLink onClick={onBack}>grimoire</BackLink>
        <span onClick={onBack} style={{ cursor: "pointer" }}>← grimoire</span>
        <span style={{ opacity: 0.5, margin: "0 4px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.inkSoft }}>魔典</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
        <div>
          <div style={{ fontFamily: F.serifCn, fontWeight: 600, fontSize: 22, color: C.ink, letterSpacing: "2px" }}>{tome.title}</div>
          <div style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 12, color: tome.palette.accent, letterSpacing: "1.5px", marginTop: 2 }}>{tome.titleEn}</div>
          <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkSoft, marginTop: 6, letterSpacing: "0.3px" }}>{tome.sub}</div>
        </div>
        <Sigil tome={tome.id} tomes={tomes} size={38} />
      </div>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <ViewSwitcher value={view} onChange={onView} />
        <div style={{ display: "flex", gap: 6 }}>
          <button type="button" onClick={onCreateEntry} style={miniBtn}>＋ 新页</button>
          <button style={miniBtn}>⌕</button>
          <button type="button" onClick={onCreateEntry} style={miniBtn}>＋ 新页</button>
        </div>
      </div>
    </div>
  );
}

function GalleryView({ entries, density, tomes, onEntry }) {
  const cols = density === "compact" ? 3 : 2;
  return (
    <div style={{ padding: "12px 20px 30px", display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: density === "compact" ? 10 : 14 }}>
      {entries.map((e) => <EntryCard key={e.id} entry={e} density={density} tomes={tomes} onClick={() => onEntry(e.id)} />)}
    </div>
  );
}

function TableView({ entries, density, onEntry }) {
  const pad = density === "compact" ? "7px 8px" : "11px 8px";
  return (
    <div style={{ padding: "8px 20px 30px" }}>
      <div style={{ background: C.cream, borderRadius: 6, overflow: "hidden", border: `0.5px solid ${C.rule}`, boxShadow: "0 1px 3px rgba(40,30,20,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "20px 1.6fr 0.7fr 0.7fr 0.7fr", gap: 8, padding: pad, background: C.paperDeep, borderBottom: `0.5px solid ${C.rule}`, fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "2px" }}>
          <span></span><span>词条 entry</span><span>类型</span><span>状态</span><span style={{ textAlign: "right" }}>更新</span>
        </div>
        {entries.map((e, i) => {
          const T = TYPES[e.type] || TYPES.character;
          const S = STATUS[e.status] || STATUS.seed;
          return (
            <div key={e.id} onClick={() => onEntry(e.id)} style={{ display: "grid", gridTemplateColumns: "20px 1.6fr 0.7fr 0.7fr 0.7fr", gap: 8, padding: pad, alignItems: "center", borderBottom: i < entries.length - 1 ? `0.5px solid ${C.rule}` : "none", cursor: "pointer" }}>
              <div style={{ width: 18, height: 18, borderRadius: 3, background: e.cover, color: e.coverInk, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: isCn(e.coverGlyph) ? F.serifCn : F.serifEn, fontSize: 10 }}>{e.coverGlyph}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: F.serifCn, fontSize: density === "compact" ? 11 : 12, fontWeight: 600, color: C.ink, letterSpacing: "0.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.title}</div>
                {density !== "compact" && e.sub && <div style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "0.3px", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.sub}</div>}
              </div>
              <span style={{ fontFamily: F.serifCn, fontSize: 10, color: T.color, letterSpacing: "1px", padding: "2px 6px", borderRadius: 999, background: `${T.color}15`, justifySelf: "start" }}>{T.cn}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: F.serifCn, fontSize: 10, color: S.color, letterSpacing: "1px" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: S.color }} />{S.cn}</span>
              <span style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "0.5px", textAlign: "right" }}>{e.updated}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BoardCard({ entry, density, onEntry }) {
  const T = TYPES[entry.type] || TYPES.character;
  const compact = density === "compact";
  return (
    <div onClick={() => onEntry(entry.id)} style={{ background: C.cream, borderRadius: 6, padding: compact ? "8px 10px" : "10px 12px", border: `0.5px solid ${C.rule}`, boxShadow: "0 1px 3px rgba(40,30,20,0.06)", cursor: "pointer", display: "flex", flexDirection: "column", gap: compact ? 4 : 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: 3, flexShrink: 0, background: entry.cover, color: entry.coverInk, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: isCn(entry.coverGlyph) ? F.serifCn : F.serifEn, fontSize: 12 }}>{entry.coverGlyph}</div>
        <span style={{ fontFamily: F.serifCn, fontSize: compact ? 11 : 12, fontWeight: 600, color: C.ink, letterSpacing: "0.5px", lineHeight: 1.3, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.title}</span>
      </div>
      {!compact && entry.sub && <div style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkSoft, lineHeight: 1.5, letterSpacing: "0.3px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{entry.sub}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
        <span style={{ fontFamily: F.serifCn, fontSize: 9, color: T.color, letterSpacing: "1px", padding: "1px 6px", borderRadius: 999, background: `${T.color}15` }}>{T.cn}</span>
        {(entry.tags || []).slice(0, compact ? 1 : 2).map((tg) => <span key={tg} style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "0.5px" }}>· {tg}</span>)}
      </div>
    </div>
  );
}

function BoardView({ entries, density, onEntry }) {
  const grouped = {};
  BOARD_COLS.forEach((col) => { grouped[col.id] = []; });
  entries.forEach((e) => { if (grouped[e.status]) grouped[e.status].push(e); });
  return (
    <div style={{ padding: "10px 0 30px", display: "flex", gap: 12, overflowX: "auto", paddingLeft: 20 }} className="phone-scroll">
      {BOARD_COLS.map((col) => (
        <div key={col.id} style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ padding: "6px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `${col.color}12`, borderRadius: 6, border: `0.5px solid ${col.color}40` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: col.color }} />
              <span style={{ fontFamily: F.serifCn, fontSize: 11, color: C.ink, fontWeight: 600, letterSpacing: "1px" }}>{col.cn}</span>
              <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1px" }}>{col.en}</span>
            </div>
            <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 11, color: col.color, fontWeight: 500 }}>{grouped[col.id].length}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {grouped[col.id].map((e) => <BoardCard key={e.id} entry={e} density={density} onEntry={onEntry} />)}
            {grouped[col.id].length === 0 && <div style={{ padding: "14px 10px", borderRadius: 6, border: `0.5px dashed ${C.rule}`, fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "1px", textAlign: "center" }}>· 还没有 ·</div>}
          </div>
        </div>
      ))}
      <div style={{ width: 8, flexShrink: 0 }} />
    </div>
  );
}

function TomeScreen({ tome, entries, tomes, density = "comfy", onBack, onEntry, onCreateEntry }) {
  const [view, setView] = useState("gallery");
  const tomeEntries = entries.filter((e) => e.tome === tome.id);
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, overflow: "auto", display: "flex", flexDirection: "column" }} className="phone-scroll">
      <TomeHead tome={tome} tomes={tomes} view={view} onView={setView} onBack={onBack} onCreateEntry={onCreateEntry} />
      <div style={{ padding: "0 20px 4px", display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: F.handEn, fontSize: 14, color: tome.palette.accent }}>{tomeEntries.length} pages</span>
        <span style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "2px" }}>· 共 {tomeEntries.length} 条 · {tome.lastEdited}</span>
      </div>
      <div style={{ flex: 1, overflow: "auto" }} className="phone-scroll">
        {view === "gallery" && <GalleryView entries={tomeEntries} density={density} tomes={tomes} onEntry={onEntry} />}
        {view === "table" && <TableView entries={tomeEntries} density={density} onEntry={onEntry} />}
        {view === "board" && <BoardView entries={tomeEntries} density={density} onEntry={onEntry} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Entry detail screen  (= grimoire/entry.jsx)
// ═══════════════════════════════════════════════════════════════
const TYPE_LABELS = {
  character: { props: "设定 · properties", rel: "羁绊 · relations",  body: "正文 · body",    quote: "persona" },
  place:     { props: "地理 · properties", rel: "相关 · connections",body: "描述 · body",    quote: "sense" },
  lore:      { props: "设定 · rules",      rel: "相关 · references", body: "原文 · body",    quote: "kernel" },
  thing:     { props: "属性 · properties", rel: "相关 · connections",body: "来历 · origin",  quote: "kernel" },
  event:     { props: "时空 · properties", rel: "牵涉 · involved",   body: "经过 · account", quote: "moment" },
};

function Chip({ children, color, ghost }) {
  return (
    <span style={{ fontFamily: F.serifCn, fontSize: 10, color, letterSpacing: "1px", padding: "3px 8px", borderRadius: 999, background: ghost ? "transparent" : `${color}15`, border: ghost ? `0.5px solid ${color}55` : "none" }}>{children}</span>
  );
}
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "3px" }}>{children}</span>
      <div style={{ flex: 1, height: 0.5, background: C.rule }} />
    </div>
  );
}

function JotDetail({ e, tome, onBack, onEdit }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#FCFAF5", backgroundImage: "repeating-linear-gradient(0deg, transparent 0 31px, rgba(120,150,180,0.16) 31px 32px)", backgroundPosition: "0 56px", overflow: "auto", position: "relative" }} className="phone-scroll">
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 40, width: 1, background: "rgba(184,74,62,0.28)" }} />
      <div style={{ padding: "4px 20px 4px 56px", display: "flex", alignItems: "center", gap: 6, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1.2px" }}>
        <span onClick={onBack} style={{ cursor: "pointer" }}>← grimoire</span>
        <span style={{ opacity: 0.5, margin: "0 2px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.inkSoft }}>{tome?.title}</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", fontSize: 9, color: TYPES.jot.color, letterSpacing: "2px", padding: "2px 7px", borderRadius: 999, border: `0.5px dashed ${TYPES.jot.color}` }}>✎ 随笔</span>
      </div>
      <div style={{ padding: "10px 24px 0 56px", fontFamily: F.handEn, fontSize: 18, color: "#7E94A8", letterSpacing: "1px" }}>{e.updated}</div>
      <div style={{ padding: "2px 24px 0 56px", fontFamily: F.serifCn, fontSize: 22, fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1.5 }}>{e.title}</div>
      {e.tags && e.tags.length > 0 && (
        <div style={{ padding: "8px 24px 0 56px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {e.tags.map((tg) => <span key={tg} style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "0.5px", padding: "1px 8px", border: `0.5px solid ${C.inkFaint}`, borderRadius: 999 }}>#{tg}</span>)}
        </div>
      )}
      <div style={{ padding: "16px 24px 0 56px", fontFamily: F.body, fontSize: 15, color: C.ink, lineHeight: "32px", letterSpacing: "0.5px" }}>
        {e.body ? e.body.split("\n").map((line, i) => <span key={i}>{line}{i < e.body.split("\n").length - 1 && <br />}</span>) : <span style={{ color: C.inkFaint }}>（空白的一页，在等你随手写点什么）</span>}
        <span style={{ display: "inline-block", width: 1.5, height: 18, background: C.gold, marginLeft: 2, verticalAlign: -3, animation: "gBlink 1s infinite" }} />
        <style>{`@keyframes gBlink{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
      </div>
      <div style={{ height: 80 }} />
      <div style={{ position: "sticky", bottom: 0, padding: "14px 24px 24px 56px", background: "linear-gradient(180deg, transparent, #FCFAF5 35%)", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "1px" }}>记着记着就成了设定？</span>
        <div style={{ flex: 1 }} />
        <button style={{ padding: "8px 14px", borderRadius: 999, background: "transparent", border: `0.5px solid ${C.rule}`, fontFamily: F.serifCn, fontSize: 11, color: C.inkSoft, letterSpacing: "1.5px", cursor: "pointer" }}>↑ 升为词条</button>
      </div>
    </div>
  );
}

function EntryDetail({ entry, entries, tomes, onBack, onEdit, onRelationClick }) {
  const tome = tomes.find((x) => x.id === entry.tome);
  const T = TYPES[entry.type] || TYPES.character;
  const S = STATUS[entry.status] || STATUS.seed;
  const L = TYPE_LABELS[entry.type] || TYPE_LABELS.character;

  if (entry.type === "jot") return <JotDetail e={entry} tome={tome} onBack={onBack} onEdit={onEdit} />;

  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 28px, rgba(160,120,85,0.04) 28px 29px)", overflow: "auto" }} className="phone-scroll">
      <div style={{ padding: "4px 20px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 0, color: C.inkFaint, fontFamily: F.serifEn, fontStyle: "italic", letterSpacing: "1.2px" }}>
        <BackLink onClick={onBack}>grimoire</BackLink>
        <span onClick={onBack} style={{ cursor: "pointer" }}>← grimoire</span>
        <span style={{ opacity: 0.5, margin: "0 3px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.inkSoft }}>{tome?.title}</span>
        <span style={{ opacity: 0.5, margin: "0 3px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.ink }}>{entry.title}</span>
      </div>
      {/* big cover */}
      <div style={{ margin: "0 20px", height: 180, position: "relative", background: entry.cover, color: entry.coverInk, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 28px rgba(40,30,20,0.18)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.16, mixBlendMode: "overlay", backgroundImage: "repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,.22) 4px 5px)" }} />
        <div style={{ position: "absolute", inset: 10, border: `0.5px solid ${entry.coverInk}`, opacity: 0.35, borderRadius: 4 }} />
        <div style={{ fontFamily: isCn(entry.coverGlyph) ? F.serifCn : F.serifEn, fontStyle: /[A-Za-z]/.test(entry.coverGlyph) ? "italic" : "normal", fontSize: 86, fontWeight: 400, letterSpacing: 2, position: "relative", zIndex: 2 }}>{entry.coverGlyph}</div>
        <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 11, opacity: 0.8, letterSpacing: "2px" }}>{T.en}</div>
        <div style={{ position: "absolute", bottom: 10, right: 12, fontFamily: F.serifCn, fontSize: 10, opacity: 0.7, letterSpacing: "2px" }}>{tome?.title}</div>
      </div>
      {/* title */}
      <div style={{ padding: "18px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: F.serifCn, fontSize: 26, fontWeight: 600, color: C.ink, letterSpacing: "2px", lineHeight: 1.2 }}>{entry.title}</span>
          <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 16, color: C.inkFaint, letterSpacing: "1px" }}>{entry.titleEn}</span>
        </div>
        <div style={{ fontFamily: F.serifCn, fontSize: 12, color: C.inkSoft, marginTop: 4, lineHeight: 1.7, letterSpacing: "0.3px" }}>{entry.sub}</div>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <Chip color={T.color}>{T.cn} · {T.en}</Chip>
          <Chip color={S.color}>● {S.cn}</Chip>
          {(entry.tags || []).map((tg) => <Chip key={tg} color={C.inkFaint} ghost>#{tg}</Chip>)}
        </div>
      </div>
      {/* quote */}
      {entry.fields?.["一句话"] && (
        <div style={{ margin: "20px 24px 0", padding: "14px 18px", background: `linear-gradient(180deg, ${C.cream}, #FBF1E6)`, borderRadius: 6, position: "relative", border: `0.5px solid ${C.gold}40` }}>
          <span style={{ position: "absolute", top: -10, left: 10, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 30, color: C.gold, opacity: 0.7, background: C.paper, padding: "0 4px", lineHeight: 1 }}>"</span>
          <span style={{ position: "absolute", top: -8, right: 12, fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.gold, letterSpacing: "2px", background: C.paper, padding: "0 6px" }}>· {L.quote} ·</span>
          <div style={{ fontFamily: F.serifCn, fontSize: 14, color: C.ink, lineHeight: 1.8, letterSpacing: "0.5px", textAlign: "center", fontStyle: "italic" }}>{entry.fields["一句话"]}</div>
        </div>
      )}
      {/* fields */}
      {entry.fields && Object.keys(entry.fields).filter((k) => k !== "一句话").length > 0 && (
        <div style={{ margin: "18px 24px 0", padding: "4px 0" }}>
          <SectionLabel>{L.props}</SectionLabel>
          <div style={{ background: C.cream, borderRadius: 6, border: `0.5px solid ${C.rule}`, overflow: "hidden" }}>
            {Object.entries(entry.fields).filter(([k]) => k !== "一句话").map(([k, v], i, arr) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "80px 1fr", padding: "9px 14px", gap: 12, alignItems: "baseline", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.rule}` : "none" }}>
                <span style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "2px" }}>{k}</span>
                <span style={{ fontFamily: F.serifCn, fontSize: 12, color: C.ink, letterSpacing: "0.5px" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* relations */}
      {entry.relations && entry.relations.length > 0 && (
        <div style={{ margin: "18px 24px 0" }}>
          <SectionLabel>{L.rel}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {entry.relations.map((r) => {
              const other = entries.find((x) => x.id === r.id);
              if (!other) return null;
              return (
                <div key={r.id} onClick={() => onRelationClick(r.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: C.cream, border: `0.5px solid ${C.rule}`, borderRadius: 6, cursor: "pointer" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 4, background: other.cover, color: other.coverInk, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serifCn, fontSize: 14 }}>{other.coverGlyph}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.serifCn, fontSize: 12, fontWeight: 600, color: C.ink, letterSpacing: "0.5px" }}>{other.title}</div>
                    <div style={{ fontFamily: F.serifCn, fontSize: 9, color: C.inkFaint, letterSpacing: "0.5px", marginTop: 1 }}>{other.sub}</div>
                  </div>
                  <span style={{ fontFamily: F.serifCn, fontSize: 10, color: C.gold, letterSpacing: "2px", padding: "3px 8px", borderRadius: 999, border: `0.5px solid ${C.gold}55` }}>{r.type}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* body */}
      <div style={{ margin: "18px 24px 0" }}>
        <SectionLabel>{L.body}</SectionLabel>
        <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, lineHeight: 2.0, letterSpacing: "0.5px", textIndent: "2em" }}>
          {entry.body ? entry.body.split("\n").map((line, i) => <span key={i}>{line}{i < entry.body.split("\n").length - 1 && <br />}</span>) : "正文还在养。先把封皮做好。"}
        </div>
      </div>
      <div style={{ height: 80 }} />
      <div style={{ position: "sticky", bottom: 0, padding: "14px 20px 24px", background: `linear-gradient(180deg, transparent, ${C.paper} 30%)`, display: "flex", gap: 8 }}>
        <button onClick={onEdit} style={{ flex: 1, padding: 12, borderRadius: 999, background: C.ink, color: C.cream, border: "none", fontFamily: F.serifCn, fontSize: 13, letterSpacing: "3px", cursor: "pointer" }}>继续写 · edit</button>
        <button style={{ padding: "12px 16px", borderRadius: 999, background: "transparent", border: `0.5px solid ${C.rule}`, fontFamily: F.serifCn, fontSize: 12, color: C.inkSoft, letterSpacing: "1px", cursor: "pointer" }}>···</button>
      </div>
    </div>
  );
}

// ── EntryEdit helpers ──
function PropRow({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "78px 1fr", padding: "9px 14px", gap: 12, alignItems: "center", borderBottom: `0.5px solid ${C.rule}` }}>
      <span style={{ fontFamily: F.serifCn, fontSize: 10, color: C.inkFaint, letterSpacing: "2px" }}>{k}</span>
      <span style={{ fontFamily: F.serifCn, fontSize: 12, color: C.ink, letterSpacing: "0.5px" }}>{v}</span>
    </div>
  );
}

function SlashMenu() {
  const items = [
    { glyph: "¶", cn: "段落", en: "paragraph" },
    { glyph: "H", cn: "小标题", en: "heading" },
    { glyph: '"', cn: "引言", en: "quote" },
    { glyph: "◇", cn: "设定块", en: "property" },
    { glyph: "◧", cn: "图", en: "image" },
    { glyph: "＋", cn: "羁绊", en: "relation" },
  ];
  return (
    <div style={{ marginTop: 14, padding: "6px 0", background: C.cream, borderRadius: 6, border: `0.5px solid ${C.rule}`, boxShadow: "0 8px 20px rgba(40,30,20,0.12)", width: "100%" }}>
      <div style={{ padding: "4px 12px", fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1.5px" }}>/ — 唤起</div>
      {items.map((it) => (
        <div key={it.cn} style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span style={{ width: 22, height: 22, borderRadius: 4, background: C.paperDeep, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serifCn, fontSize: 12, color: C.inkSoft }}>{it.glyph}</span>
          <span style={{ fontFamily: F.serifCn, fontSize: 12, color: C.ink, letterSpacing: "1px" }}>{it.cn}</span>
          <span style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1px" }}>{it.en}</span>
        </div>
      ))}
    </div>
  );
}

function EntryEdit({ entry, entries, tomes, onBack, onSave, onUploadAttachment }) {
  const tome = tomes.find((x) => x.id === entry.tome);
  const T = TYPES[entry.type] || TYPES.character;
  const [draft, setDraft] = useState(() => ({
    title: entry.title || "",
    titleEn: entry.titleEn || "",
    sub: entry.sub || "",
    body: entry.body || "",
    fields: entry.fields || {},
  }));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const patchDraft = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const saveDraft = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave?.(entry.id, draft);
      onBack();
    } finally {
      setSaving(false);
    }
  };
  const uploadAttachment = async (file) => {
    if (!file || uploading) return;
    setUploading(true);
    try {
      const item = await onUploadAttachment?.(entry, file);
      if (item?.id) {
        const attachments = Array.isArray(draft.fields?.attachments) ? draft.fields.attachments : [];
        patchDraft("fields", { ...draft.fields, attachments: [...attachments, { id: item.id, title: item.title || file.name, type: item.type || "other" }] });
      }
    } finally {
      setUploading(false);
    }
  };
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:1}50%{opacity:.4}} @keyframes gBlink{0%,49%{opacity:1}50%,100%{opacity:0}} .grim-edit-top > span:first-of-type{display:none}`}</style>
      <div className="grim-edit-top" style={{ padding: "4px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
        <BackLink onClick={onBack}>close</BackLink>
        <span onClick={onBack} style={{ fontFamily: F.serifEn, fontStyle: "italic", fontSize: 12, color: C.inkFaint, letterSpacing: "1px", cursor: "pointer" }}>✕ 关</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: F.handEn, fontSize: 14, color: C.gold, letterSpacing: "1px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B7A6A", display: "inline-block", animation: "gPulse 1.4s infinite" }} />
          autosaved · just now
        </span>
      </div>
      <div style={{ padding: "0 20px 10px", fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1.5px" }}>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.inkSoft }}>{tome?.title}</span>
        <span style={{ opacity: 0.5, margin: "0 4px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.ink }}>{entry.title}</span>
        <span style={{ marginLeft: 8, opacity: 0.6 }}>· editing</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px" }} className="phone-scroll">
        <div style={{ padding: "6px 0 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(TYPES).map(([k, v]) => {
            const on = entry.type === k;
            return (
              <button key={k} style={{ fontFamily: F.serifCn, fontSize: 10, letterSpacing: "1px", padding: "4px 10px", borderRadius: 999, border: `0.5px solid ${on ? v.color : C.rule}`, background: on ? `${v.color}15` : "transparent", color: on ? v.color : C.inkFaint, cursor: "pointer" }}>{v.glyph} {v.cn}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, position: "relative", paddingBottom: 4 }}>
          <input
            value={draft.title}
            onChange={(event) => patchDraft("title", event.target.value)}
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: F.serifCn, fontSize: 28, fontWeight: 600, color: C.ink, letterSpacing: "2px", lineHeight: 1.3 }}
          />
          <span style={{ display: "inline-block", width: 2, height: 28, background: C.gold, marginLeft: 3, verticalAlign: -3, animation: "gBlink 1s infinite" }} />
        </div>
        <input value={draft.titleEn} onChange={(event) => patchDraft("titleEn", event.target.value)} style={{ marginTop: 6, border: "none", outline: "none", background: "transparent", fontFamily: F.serifEn, fontStyle: "italic", fontSize: 14, color: C.inkSoft, letterSpacing: "1px", width: "100%" }} />
        <input value={draft.sub} onChange={(event) => patchDraft("sub", event.target.value)} style={{ marginTop: 8, border: "none", outline: "none", background: "transparent", fontFamily: F.serifCn, fontSize: 12, color: C.inkSoft, letterSpacing: "0.5px", width: "100%" }} />
        <div style={{ marginTop: 18, border: `0.5px solid ${C.rule}`, borderRadius: 6, background: C.cream, overflow: "hidden" }}>
          {Object.entries(entry.fields || {}).filter(([k]) => k !== "一句话").slice(0, 4).map(([k, v]) => <PropRow key={k} k={k} v={v} />)}
          <div style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 6, color: C.inkFaint, cursor: "pointer", borderTop: `0.5px solid ${C.rule}`, fontFamily: F.serifCn, fontSize: 10, letterSpacing: "1.5px" }}>＋ 添字段</div>
        </div>
        <div style={{ marginTop: 18, padding: "10px 12px", background: C.paperDeep, borderRadius: 6, border: `0.5px dashed ${C.rule}`, fontFamily: F.serifCn, fontSize: 11, color: C.inkFaint, letterSpacing: "1px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ padding: "0 4px", border: `0.5px solid ${C.inkFaint}`, borderRadius: 2, fontFamily: F.serifEn, fontSize: 10 }}>/</span>
          唤一个段落 · 标题 · 引用 · 图…
        </div>
        <div style={{ marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.ink, lineHeight: 2.0, letterSpacing: "0.5px", textIndent: "2em" }}>
          {entry.body || "名字是弥拉给的。"}<span style={{ color: C.inkFaint, fontStyle: "italic" }}>|</span>
        </div>
        <SlashMenu />
        <div style={{ height: 200 }} />
      </div>
      <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 6, borderTop: `0.5px solid ${C.rule}`, background: C.paperDeep }}>
        {["B","I","U","S","¶","H1",'"',"◇","＋"].map((g) => (
          <button key={g} style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: C.inkSoft, fontFamily: g.length === 1 ? F.serifEn : F.serifCn, fontWeight: 600, fontSize: 13, fontStyle: g === "I" ? "italic" : "normal" }}>{g}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={onBack} style={{ padding: "7px 14px", borderRadius: 999, border: "none", background: C.ink, color: C.cream, fontFamily: F.serifCn, fontSize: 11, letterSpacing: "2px", cursor: "pointer" }}>完成</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Data normalization helpers
// ═══════════════════════════════════════════════════════════════
function EntryEditFixed({ entry, tomes, onBack, onSave, onUploadAttachment }) {
  const tome = tomes.find((x) => x.id === entry.tome);
  const [draft, setDraft] = useState(() => ({
    title: entry.title || "",
    titleEn: entry.titleEn || "",
    sub: entry.sub || "",
    body: entry.body || "",
    fields: entry.fields || {},
  }));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const setField = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave?.(entry.id, draft);
      onBack();
    } finally {
      setSaving(false);
    }
  };
  const upload = async (file) => {
    if (!file || uploading) return;
    setUploading(true);
    try {
      const item = await onUploadAttachment?.(entry, file);
      if (item?.id) {
        setDraft((current) => {
          const attachments = Array.isArray(current.fields?.attachments) ? current.fields.attachments : [];
          return {
            ...current,
            fields: {
              ...current.fields,
              attachments: [...attachments, { id: item.id, title: item.title || file.name, type: item.type || "other" }],
            },
          };
        });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "6px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
        <BackLink onClick={onBack}>close</BackLink>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: F.handEn, fontSize: 14, color: C.gold, letterSpacing: "1px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C8374", display: "inline-block" }} />
          autosaved / draft
        </span>
      </div>
      <div style={{ padding: "0 20px 10px", fontFamily: F.serifEn, fontStyle: "italic", fontSize: 10, color: C.inkFaint, letterSpacing: "1.5px" }}>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.inkSoft }}>{tome?.title}</span>
        <span style={{ opacity: 0.5, margin: "0 4px" }}>/</span>
        <span style={{ fontFamily: F.serifCn, fontStyle: "normal", color: C.ink }}>{draft.title || "新页"}</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px" }} className="phone-scroll">
        <input
          value={draft.title}
          onChange={(event) => setField("title", event.target.value)}
          placeholder="新页"
          style={{ marginTop: 8, width: "100%", border: "none", outline: "none", background: "transparent", fontFamily: F.serifCn, fontSize: 30, fontWeight: 600, color: C.ink, letterSpacing: "2px", lineHeight: 1.35 }}
        />
        <input
          value={draft.titleEn}
          onChange={(event) => setField("titleEn", event.target.value)}
          placeholder="new page"
          style={{ marginTop: 6, border: "none", outline: "none", background: "transparent", fontFamily: F.serifEn, fontStyle: "italic", fontSize: 14, color: C.inkSoft, letterSpacing: "1px", width: "100%" }}
        />
        <input
          value={draft.sub}
          onChange={(event) => setField("sub", event.target.value)}
          placeholder="小标题"
          style={{ marginTop: 8, border: "none", outline: "none", background: "transparent", fontFamily: F.serifCn, fontSize: 12, color: C.inkSoft, letterSpacing: "0.5px", width: "100%" }}
        />
        <div style={{ marginTop: 18, border: `0.5px solid ${C.rule}`, borderRadius: 6, background: C.cream, overflow: "hidden" }}>
          {Object.entries(draft.fields || {}).filter(([key]) => key !== "attachments").slice(0, 4).map(([key, value]) => <PropRow key={key} k={key} v={String(value)} />)}
        </div>
        <textarea
          value={draft.body}
          onChange={(event) => setField("body", event.target.value)}
          placeholder="正文还在养。"
          style={{ marginTop: 16, minHeight: 240, width: "100%", resize: "vertical", border: "none", outline: "none", background: "transparent", fontFamily: F.body, fontSize: 13, color: C.ink, lineHeight: 2, letterSpacing: "0.5px", textIndent: "2em" }}
        />
        <div style={{ height: 80 }} />
      </div>
      <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: `0.5px solid ${C.rule}`, background: C.paperDeep }}>
        <label style={{ padding: "8px 13px", borderRadius: 999, border: `0.5px solid ${C.rule}`, background: C.cream, color: C.inkSoft, fontFamily: F.serifCn, fontSize: 11, letterSpacing: "1px", cursor: uploading ? "default" : "pointer", opacity: uploading ? 0.6 : 1 }}>
          {uploading ? "上传中" : "上传附件"}
          <input type="file" style={{ display: "none" }} disabled={uploading} onChange={(event) => upload(event.target.files?.[0])} />
        </label>
        <div style={{ flex: 1 }} />
        <button type="button" onClick={save} disabled={saving} style={{ padding: "8px 16px", borderRadius: 999, border: "none", background: C.ink, color: C.cream, fontFamily: F.serifCn, fontSize: 11, letterSpacing: "2px", cursor: saving ? "default" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "保存中" : "完成"}</button>
      </div>
    </div>
  );
}

function normalizeTome(row) {
  const palette = typeof row.palette === "string" ? JSON.parse(row.palette || "{}") : (row.palette || {});
  return {
    id: String(row.id || ""),
    title: String(row.title || ""),
    titleEn: String(row.title_en || row.titleEn || ""),
    sub: String(row.sub || ""),
    spine: String(row.spine || "#2C3E5C"),
    cover: String(row.cover || "#3A4D6F"),
    gilt: String(row.gilt || "#C5A572"),
    sigil: String(row.sigil || "⊹"),
    sigilStyle: String(row.sigil_style || row.sigilStyle || "serifEn"),
    kind: String(row.kind || ""),
    count: Number(row.count || 0),
    lastEdited: String(row.last_edited || row.lastEdited || ""),
    palette: { bg: palette.bg || "#EEF1F4", accent: palette.accent || "#3A4D6F", tint: palette.tint || "#D8E0EA" },
  };
}

function normalizeEntry(row) {
  const tags = Array.isArray(row.tags) ? row.tags : JSON.parse(String(row.tags || "[]"));
  const fields = typeof row.fields === "object" && !Array.isArray(row.fields) ? row.fields : JSON.parse(String(row.fields || "{}"));
  const relations = Array.isArray(row.relations) ? row.relations : JSON.parse(String(row.relations || "[]"));
  return {
    id: String(row.id || ""),
    tome: String(row.tome_id || row.tome || ""),
    type: String(row.type || "character"),
    title: String(row.title || ""),
    titleEn: String(row.title_en || row.titleEn || ""),
    sub: String(row.sub || ""),
    cover: String(row.cover || "#3A4D6F"),
    coverInk: String(row.cover_ink || row.coverInk || "#F1E4BD"),
    coverGlyph: String(row.cover_glyph || row.coverGlyph || ""),
    status: String(row.status || "seed"),
    tags,
    fields,
    relations,
    body: String(row.body || ""),
    updated: String(row.updated || row.updated_at || ""),
  };
}

// ═══════════════════════════════════════════════════════════════
// Main App component
// ═══════════════════════════════════════════════════════════════
export default function GrimoireApp() {
  const [tomes, setTomes] = useState(SAMPLE_TOMES);
  const [entries, setEntries] = useState(SAMPLE_ENTRIES);
  const [loaded, setLoaded] = useState(false);
  const [nav, setNav] = useState({ screen: "home" }); // { screen: 'home'|'tome'|'entry'|'edit', tomeId, entryId }
  const [homeVariant, setHomeVariant] = useState("spreads"); // spreads | bookshelf | index
  const density = "comfy";

  // Load data from API
  useEffect(() => {
    async function load() {
      try {
        const [tomesData, entriesData] = await Promise.all([
          apiFetch("/api/grimoire/tomes"),
          apiFetch("/api/grimoire/entries"),
        ]);
        const apiTomes = Array.isArray(tomesData.tomes) ? tomesData.tomes.map(normalizeTome) : [];
        const apiEntries = Array.isArray(entriesData.entries) ? entriesData.entries.map(normalizeEntry) : [];
        if (apiTomes.length > 0) setTomes(apiTomes);
        if (apiEntries.length > 0) setEntries(apiEntries);
      } catch {
        // API unavailable — keep sample data
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  const currentTome = useMemo(() => tomes.find((t) => t.id === nav.tomeId), [tomes, nav.tomeId]);
  const currentEntry = useMemo(() => entries.find((e) => e.id === nav.entryId), [entries, nav.entryId]);

  const goHome = useCallback(() => setNav({ screen: "home" }), []);
  const goTome = useCallback((tomeId) => setNav({ screen: "tome", tomeId }), []);
  const goEntry = useCallback((entryId) => {
    const e = entries.find((x) => x.id === entryId);
    setNav({ screen: "entry", entryId, tomeId: e?.tome });
  }, [entries]);
  const goEdit = useCallback(() => {
    setNav((prev) => ({ ...prev, screen: "edit" }));
  }, []);
  const goBack = useCallback(() => {
    if (nav.screen === "edit") setNav((prev) => ({ ...prev, screen: "entry" }));
    else if (nav.screen === "entry" && nav.tomeId) setNav({ screen: "tome", tomeId: nav.tomeId });
    else goHome();
  }, [nav, goHome]);

  const createTome = useCallback(async () => {
    const seed = Date.now();
    const payload = {
      id: `tome-${seed}`,
      title: "新典",
      title_en: "new tome",
      sub: "未命名目录",
      spine: "#7A3D2F",
      cover: "#8B4A38",
      gilt: "#E2C28C",
      sigil: "✦",
      sigil_style: "serifEn",
      kind: "目录",
      palette: { bg: "#F6EFE6", accent: "#8B4A38", tint: "#E8D4C8" },
    };
    try {
      const data = await apiFetch("/api/grimoire/tomes", { method: "POST", body: JSON.stringify(payload) });
      const tome = normalizeTome(data.tome || payload);
      setTomes((current) => [tome, ...current.filter((item) => item.id !== tome.id)]);
      setNav({ screen: "tome", tomeId: tome.id });
    } catch {
      const tome = normalizeTome(payload);
      setTomes((current) => [tome, ...current]);
      setNav({ screen: "tome", tomeId: tome.id });
    }
  }, []);

  const createEntry = useCallback(async (tomeId) => {
    const seed = Date.now();
    const payload = {
      id: `entry-${seed}`,
      tome_id: tomeId,
      type: "lore",
      title: "新页",
      title_en: "new page",
      sub: "",
      cover: "#8B4A38",
      cover_ink: "#F1E4BD",
      cover_glyph: "页",
      status: "draft",
      tags: [],
      fields: {},
      relations: [],
      body: "",
    };
    try {
      const data = await apiFetch("/api/grimoire/entries", { method: "POST", body: JSON.stringify(payload) });
      const entry = normalizeEntry(data.entry || payload);
      setEntries((current) => [entry, ...current.filter((item) => item.id !== entry.id)]);
      setNav({ screen: "edit", entryId: entry.id, tomeId: entry.tome });
    } catch {
      const entry = normalizeEntry(payload);
      setEntries((current) => [entry, ...current]);
      setNav({ screen: "edit", entryId: entry.id, tomeId: entry.tome });
    }
  }, []);

  const saveEntry = useCallback(async (entryId, draft) => {
    const payload = {
      title: draft.title,
      title_en: draft.titleEn,
      sub: draft.sub,
      body: draft.body,
      fields: draft.fields,
      status: "draft",
    };
    const current = entries.find((item) => item.id === entryId);
    try {
      const data = await apiFetch(`/api/grimoire/entries/${entryId}`, { method: "PATCH", body: JSON.stringify(payload) });
      const entry = normalizeEntry(data.entry || { ...current, ...payload });
      setEntries((items) => items.map((item) => item.id === entryId ? entry : item));
    } catch {
      setEntries((items) => items.map((item) => item.id === entryId ? { ...item, title: draft.title, titleEn: draft.titleEn, sub: draft.sub, body: draft.body, fields: draft.fields, status: "draft" } : item));
    }
  }, [entries]);

  const uploadAttachment = useCallback(async (entry, file) => {
    return uploadMediaFile(file, {
      type: "other",
      owner_type: "user",
      title: file.name,
      metadata: { app: "grimoire", grimoire_entry_id: entry.id, tome_id: entry.tome },
    });
  }, []);

  return (
    <main style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", fontFamily: F.serifCn, color: C.ink, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        .phone-scroll, .phone-scroll * { scrollbar-width: none; -ms-overflow-style: none; }
        .phone-scroll::-webkit-scrollbar, .phone-scroll *::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      {/* Home — three variants switchable from a small tab strip */}
      {nav.screen === "home" && (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* home variant switcher */}
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 0", background: C.paper, gap: 2 }}>
            {[{id:"spreads",cn:"封面"},{id:"bookshelf",cn:"书架"},{id:"index",cn:"索引"}].map((v) => {
              const on = homeVariant === v.id;
              return (
                <button key={v.id} onClick={() => setHomeVariant(v.id)} style={{ padding: "4px 12px", borderRadius: 999, border: "none", background: on ? C.ink : "transparent", color: on ? C.cream : C.inkFaint, fontFamily: F.serifCn, fontSize: 10, letterSpacing: "1.5px", cursor: "pointer" }}>{v.cn}</button>
              );
            })}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {homeVariant === "spreads"    && <HomeSpreads   tomes={tomes} entries={entries} onTome={goTome} onEntry={goEntry} onCreateTome={createTome} />}
            {homeVariant === "bookshelf"  && <HomeBookshelf tomes={tomes} entries={entries} onTome={goTome} onEntry={goEntry} onCreateTome={createTome} />}
            {homeVariant === "index"      && <HomeIndex     tomes={tomes} onTome={goTome} onCreateTome={createTome} />}
          </div>
        </div>
      )}
      {nav.screen === "tome" && currentTome && (
        <TomeScreen tome={currentTome} entries={entries} tomes={tomes} density={density} onBack={goHome} onEntry={goEntry} onCreateEntry={() => createEntry(currentTome.id)} />
      )}
      {nav.screen === "entry" && currentEntry && (
        <EntryDetail entry={currentEntry} entries={entries} tomes={tomes} onBack={goBack} onEdit={goEdit} onRelationClick={goEntry} />
      )}
      {nav.screen === "edit" && currentEntry && (
        <EntryEditFixed entry={currentEntry} entries={entries} tomes={tomes} onBack={goBack} onSave={saveEntry} onUploadAttachment={uploadAttachment} />
      )}
      {/* Fallback if tome/entry not found */}
      {nav.screen === "tome" && !currentTome && (
        <div style={{ padding: 20, color: C.inkFaint, fontFamily: F.serifCn, fontSize: 12 }}>找不到这本典。<button onClick={goHome} style={{ marginLeft: 8, background: "none", border: "none", color: C.inkSoft, cursor: "pointer", fontFamily: F.serifCn, textDecoration: "underline" }}>回首页</button></div>
      )}
      {(nav.screen === "entry" || nav.screen === "edit") && !currentEntry && (
        <div style={{ padding: 20, color: C.inkFaint, fontFamily: F.serifCn, fontSize: 12 }}>找不到这个词条。<button onClick={goHome} style={{ marginLeft: 8, background: "none", border: "none", color: C.inkSoft, cursor: "pointer", fontFamily: F.serifCn, textDecoration: "underline" }}>回首页</button></div>
      )}
    </main>
  );
}
