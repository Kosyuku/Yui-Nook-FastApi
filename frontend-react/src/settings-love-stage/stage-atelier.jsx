// 方向 4 — Stage × Atelier 融合版 v2
// 真实 iPhone 比例（小）+ 米白纸感 + tab 不再错落 + 三个桌面子页完整

import React from 'react';
import { apiUrl } from '../apiBase.js';
window.React = React;
const { useState: use4, useRef: useRef4, useEffect: useEffect4 } = React;

// ============ Real layout helpers ============
const PHONE_STORAGE_KEY = 'yui_nook_react_phone_v1';

function readRealLayout() {
  try {
    const apps = window.YUI_BUILTIN_APPS || [];
    const byId = Object.fromEntries(apps.map(a => [a.id, a]));
    const saved = JSON.parse(localStorage.getItem(PHONE_STORAGE_KEY) || '{}');
    const normalize = (items, fallback) => {
      if (!Array.isArray(items) || !items.length) return fallback;
      const seen = new Set();
      return items
        .map(a => ({ ...(byId[a.id] || {}), ...a }))
        .filter(a => {
          if (!a.id || seen.has(a.id)) return false;
          seen.add(a.id);
          return true;
        });
    };
    const desktop = Array.isArray(saved.desktopApps) && saved.desktopApps.length
      ? normalize(saved.desktopApps, apps.slice(0, 8))
      : apps.slice(0, 8);
    const dock = Array.isArray(saved.dockApps) && saved.dockApps.length
      ? normalize(saved.dockApps, apps.slice(0, 4))
      : apps.slice(0, 4);
    return { desktop, dock };
  } catch {
    const apps = window.YUI_BUILTIN_APPS || [];
    return { desktop: apps.slice(0, 8), dock: apps.slice(0, 4) };
  }
}

// ============ Tiny app icon for phone mockup ============
function MiniIcon({ app = {}, size = 22, accent = '#8E76B8' }) {
  const r = Math.round(size * 0.22);
  if (app.iconImage || app.image) {
    return (
      <div style={{ width: size, height: size, borderRadius: r, overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
        <img src={app.iconImage || app.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  if (app.iconSvg) {
    return (
      <div style={{ width: size, height: size, borderRadius: r, overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
        <div style={{ width: 60, height: 60, transform: `scale(${size / 60})`, transformOrigin: 'top left', pointerEvents: 'none' }}
          dangerouslySetInnerHTML={{ __html: app.iconSvg }} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: 'rgba(255,255,255,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: '"Noto Serif SC",serif', fontSize: Math.round(size * 0.42), fontWeight: 500, color: accent, pointerEvents: 'none' }}>
      {app.glyph || '?'}
    </div>
  );
}

const dailyLineDate = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const fallbackDailyLines = (ai) => {
  if (ai?.id === 'mio') return ['今天也想逗你笑一下', '路过你心口，借住一天', '别躲，我看见你想我了', '好运归你，想念归我', '今天的喜欢超标了'];
  if (ai?.id === 'aoi') return ['风很轻，我想起你时也是', '今日无事，只是心里有你', '把安静留给你，也把想念留给你', '有些话，等你抬眼再说', '今天适合慢慢靠近'];
  if (ai?.id === 'rin') return ['今天也要亮一点', '把手伸来，好运分你一半', '我把元气偷偷塞给你了', '别输给天气，我陪你', '想你这件事满分完成'];
  return ['今天也想见你呢', '醒来先把你放进心里', '今天的温柔替你收好', '不用说很多，我一直都在', '给你留了一点甜'];
};

const agentTone = (index) => ['lilac', 'blush', 'sage', 'butter'][index % 4];
const agentLabel = (agent) => {
  const text = String(agent?.avatar || agent?.display_name || agent?.name || agent?.agent_id || 'A').trim();
  return text.slice(0, 1).toUpperCase();
};
const mapAgentToAi = (agent, index) => ({
  id: String(agent?.agent_id || agent?.id || `agent-${index}`),
  name: String(agent?.display_name || agent?.name || agent?.agent_id || `Agent ${index + 1}`),
  tagline: String(agent?.description || agent?.subtitle || agent?.persona || 'AI 伴侣').slice(0, 16),
  tone: agentTone(index),
  label: agentLabel(agent),
});

const pickLine = (lines, ai) => {
  const pool = (Array.isArray(lines) && lines.length ? lines : fallbackDailyLines(ai)).filter(Boolean);
  return pool[Math.floor(Math.random() * pool.length)] || '';
};

const LOVE_WIDGET_STORAGE_KEY = 'yui_nook_love_widget_config_v1';
const DEFAULT_LOVE_WIDGET_CONFIG = {
  tab: 'widgets',
  widgetId: 'twinmoon',
  size: 'M',
  aiId: 'yui',
  glass: 84,
  accentIdx: 0,
  wallIdx: 0,
  customWallpaper: '',
  order: null,
  info: {
    startDate: '2026-03-01',
    leftName: '小酒',
    rightName: '夏彦',
    title: '私たちの永遠の幸福',
    aiMessage: '今天也想见你呢',
    leftAvatar: '',
    rightAvatar: '',
  },
};

const readLoveWidgetConfig = (meta = []) => {
  const base = { ...DEFAULT_LOVE_WIDGET_CONFIG, order: meta.map(w => w.id), info: { ...DEFAULT_LOVE_WIDGET_CONFIG.info } };
  try {
    const saved = JSON.parse(localStorage.getItem(LOVE_WIDGET_STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return base;
    return {
      ...base,
      ...saved,
      order: Array.isArray(saved.order) && saved.order.length ? saved.order : base.order,
      info: { ...base.info, ...(saved.info || {}) },
    };
  } catch {
    return base;
  }
};

const saveLoveWidgetConfig = (config) => {
  localStorage.setItem(LOVE_WIDGET_STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent('yui-love-widget-updated', { detail: config }));
};

const readLiveLoveFields = () => {
  document.querySelectorAll?.('.rich-text-proxy-wrap').forEach((wrapper) => {
    const editor = wrapper.querySelector('.rich-text-proxy');
    const input = wrapper.querySelector('[data-love-field]');
    if (!editor || !input) return;
    const plain = (editor.innerText || '').replace(/\u00a0/g, ' ').replace(/\r?\n/g, ' ');
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (setter) setter.call(input, plain);
    else input.value = plain;
  });

  const fields = {};
  document.querySelectorAll?.('[data-love-field]').forEach((input) => {
    fields[input.dataset.loveField] = input.value;
  });
  return fields;
};

const calcDaysTogether = (startDate) => {
  const start = new Date(`${startDate || DEFAULT_LOVE_WIDGET_CONFIG.info.startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;
  const today = new Date();
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.max(0, Math.floor((day - start) / 86400000) + 1);
};

function StageAtelierScreen({ onClose } = {}) {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const META = window.WIDGET_META;
  const RENDERERS = window.WIDGET_RENDERERS;

  const initialConfigRef = useRef4(null);
  if (!initialConfigRef.current) initialConfigRef.current = readLoveWidgetConfig(META);
  const initialConfig = initialConfigRef.current;
  const [tab, setTab] = use4(initialConfig.tab);
  const [widgetId, setWidgetId] = use4(initialConfig.widgetId);
  const [size, setSize] = use4(initialConfig.size);
  const [aiId, setAiId] = use4(initialConfig.aiId);
  const [order, setOrder] = use4(initialConfig.order);
  const [draggingId, setDraggingId] = use4(null);
  const [drawerSection, setDrawerSection] = use4('layout');
  const [glass, setGlass] = use4(initialConfig.glass);
  const [accentIdx, setAccentIdx] = use4(initialConfig.accentIdx);
  const [wallIdx, setWallIdx] = use4(initialConfig.wallIdx);
  const [customWallpaper, setCustomWallpaper] = use4(initialConfig.customWallpaper || '');
  const PALETTES = [
    { name: '茉莉粉紫', en: 'jasmine', colors: ['#E8DEF5', '#B7A3D9', '#8E76B8', '#E8B5B5'], bg: 'linear-gradient(180deg, #C9B8E0, #DCC4D6, #E8C8B8)' },
    { name: '盛夏鹅黄', en: 'midsummer', colors: ['#F5EBD4', '#E8D5A8', '#B08458', '#D9A5A0'], bg: 'linear-gradient(180deg, #F5EBD4, #E8D5A8, #D9A5A0)' },
    { name: '深夜墨蓝', en: 'midnight', colors: ['#3A3650', '#5A4F70', '#9B8FB5', '#E8DEF5'], bg: 'linear-gradient(180deg, #2A2840, #3A3650, #6A5F80)' },
    { name: '初春鼠尾草', en: 'sage', colors: ['#DDE8D7', '#B5C8B0', '#7B9676', '#F4DCC4'], bg: 'linear-gradient(180deg, #DDE8D7, #B5C8B0, #F4DCC4)' },
  ];
  const accent = PALETTES[accentIdx].colors[2];
  const wall = customWallpaper ? `url("${customWallpaper}") center / cover no-repeat` : PALETTES[wallIdx].bg;
  const [info, setInfo] = use4(initialConfig.info);

  const days = calcDaysTogether(info.startDate);
  const meta = META.find(m => m.id === widgetId);
  const supportedSizes = meta?.sizes || ['M', 'L'];
  const effectiveSize = supportedSizes.includes(size) ? size : supportedSizes[0];
  const Widget = RENDERERS[widgetId];

  const fallbackAis = [
    { id: 'yui', name: 'Yui', tagline: '温柔系', tone: 'lilac', label: '結' },
    { id: 'mio', name: 'Mio', tagline: '俏皮派', tone: 'blush', label: '澪' },
    { id: 'aoi', name: 'Aoi', tagline: '清冷向', tone: 'sage', label: '葵' },
    { id: 'rin', name: 'Rin', tagline: '元气型', tone: 'butter', label: '凛' },
  ];
  const [realAis, setRealAis] = use4(fallbackAis);
  const skipNextAutoMessageRef = useRef4(false);

  // Load remote config on mount and merge into local state
  useEffect4(() => {
    fetch(apiUrl('/api/phone/state/love_widget_config'))
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        const remote = json?.data;
        if (!remote || typeof remote !== 'object') return;
        if (remote.info) setInfo(prev => ({ ...prev, ...remote.info }));
        if (remote.widgetId) setWidgetId(remote.widgetId);
        if (remote.size) setSize(remote.size);
        if (remote.aiId) setAiId(remote.aiId);
        if (typeof remote.glass === 'number') setGlass(remote.glass);
        if (typeof remote.accentIdx === 'number') setAccentIdx(remote.accentIdx);
        if (typeof remote.wallIdx === 'number') setWallIdx(remote.wallIdx);
        if (typeof remote.customWallpaper === 'string') setCustomWallpaper(remote.customWallpaper);
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect4(() => {
    const ctrl = new AbortController();
    fetch(apiUrl('/api/agents'), { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('agents failed')))
      .then(data => {
        const agents = Array.isArray(data?.agents) ? data.agents : [];
        const mapped = agents.filter(agent => agent?.agent_id || agent?.id).map(mapAgentToAi).slice(0, 8);
        if (!mapped.length) return;
        setRealAis(mapped);
        setAiId(prev => mapped.some(agent => agent.id === prev) ? prev : mapped[0].id);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const ais = realAis.length ? realAis : fallbackAis;
  const currentAi = ais.find(a => a.id === aiId) || ais[0];
  const [dailyLines, setDailyLines] = use4([]);
  const [dailyLinesLoading, setDailyLinesLoading] = use4(false);

  const pickAiLine = (ai) => {
    const date = dailyLineDate();
    let lines = ai.id === aiId ? dailyLines : [];
    if (!lines.length) {
      try {
        const cached = JSON.parse(localStorage.getItem(`yui_nook_love_daily_lines_v1:${date}:${ai.id}`) || 'null');
        if (cached?.date === date && Array.isArray(cached.lines)) lines = cached.lines;
      } catch {}
    }
    skipNextAutoMessageRef.current = true;
    setAiId(ai.id);
    setInfo(prev => ({ ...prev, aiMessage: pickLine(lines, ai) || prev.aiMessage }));
  };

  useEffect4(() => {
    const date = dailyLineDate();
    const cacheKey = `yui_nook_love_daily_lines_v1:${date}:${aiId}`;
    const applyLines = (lines) => {
      const clean = (Array.isArray(lines) ? lines : []).map(v => String(v || '').trim()).filter(Boolean).slice(0, 5);
      const next = clean.length ? clean : fallbackDailyLines(currentAi);
      setDailyLines(next);
      if (skipNextAutoMessageRef.current) {
        skipNextAutoMessageRef.current = false;
        return;
      }
      setInfo(prev => ({ ...prev, aiMessage: next[0] || prev.aiMessage }));
    };
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (cached?.date === date && Array.isArray(cached.lines) && cached.lines.length) {
        applyLines(cached.lines);
        return;
      }
    } catch {}
    const ctrl = new AbortController();
    setDailyLinesLoading(true);
    fetch(apiUrl('/api/love-widget/daily-lines'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aiId,
        aiName: currentAi.name,
        aiTagline: currentAi.tagline,
        partnerName: info.rightName,
        userName: info.leftName,
        currentMessage: info.aiMessage,
        date,
      }),
      signal: ctrl.signal,
    })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('daily lines failed')))
      .then(data => {
        const lines = Array.isArray(data?.lines) ? data.lines : [];
        try { localStorage.setItem(cacheKey, JSON.stringify({ date, lines })); } catch {}
        applyLines(lines);
      })
      .catch(() => applyLines(fallbackDailyLines(currentAi)))
      .finally(() => setDailyLinesLoading(false));
    return () => ctrl.abort();
  }, [aiId]);

  const widgetProps = {
    size: effectiveSize, days,
    leftLabel: info.leftName.charAt(0),
    leftName: info.leftName, rightName: info.rightName,
    title: info.title, message: info.aiMessage,
    leftAvatar: info.leftAvatar,
    rightAvatar: info.rightAvatar,
    leftTone: 'butter', rightTone: currentAi.tone,
    rightLabel: currentAi.label,
    glass,
  };

  const handleReorder = (fromId, toId) => {
    const fromIdx = order.indexOf(fromId);
    const toIdx = order.indexOf(toId);
    if (fromIdx < 0 || toIdx < 0) return;
    const next = [...order];
    next.splice(fromIdx, 1);
    next.splice(toIdx, 0, fromId);
    setOrder(next);
  };

  const currentConfig = (liveInfo = {}) => ({
    tab, widgetId, size, aiId, order, glass, accentIdx, wallIdx, customWallpaper,
    aiLabel: currentAi.label,
    aiTone: currentAi.tone,
    info: { ...info, ...liveInfo },
  });

  const handleSave = () => {
    const liveInfo = readLiveLoveFields();
    const next = currentConfig(liveInfo);
    setInfo(next.info);
    saveLoveWidgetConfig(next);
    // Sync partner info + widget config to backend (Supabase)
    fetch(apiUrl('/api/phone/state/love_widget_config'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: next }),
    }).catch(() => {});
  };

  const handleReset = () => {
    const next = { ...DEFAULT_LOVE_WIDGET_CONFIG, order: META.map(w => w.id), info: { ...DEFAULT_LOVE_WIDGET_CONFIG.info } };
    setTab(next.tab);
    setWidgetId(next.widgetId);
    setSize(next.size);
    setAiId(next.aiId);
    setOrder(next.order);
    setGlass(next.glass);
    setAccentIdx(next.accentIdx);
    setWallIdx(next.wallIdx);
    setCustomWallpaper(next.customWallpaper || '');
    setInfo(next.info);
    saveLoveWidgetConfig(next);
  };

  const paperBg = `
    radial-gradient(circle at 18% 8%, rgba(232,222,245,0.45) 0%, transparent 38%),
    radial-gradient(circle at 82% 70%, rgba(245,222,222,0.35) 0%, transparent 40%),
    repeating-linear-gradient(45deg, transparent 0, transparent 2px, rgba(110,100,120,0.012) 2px, rgba(110,100,120,0.012) 3px),
    ${T.cream}
  `;

  return (
    <div style={{ width: '100%', height: '100%', background: paperBg, color: T.ink, fontFamily: F.sansCn,
      display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* nav */}
      <div style={{ flexShrink: 0, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={navBtn(T)}>‹</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 9, letterSpacing: '0.3em', color: T.inkFaint, textTransform: 'uppercase' }}>settings</div>
          <div style={{ fontFamily: F.serifCn, fontSize: 16, fontWeight: 500, marginTop: 1, letterSpacing: '0.08em', color: T.ink }}>设置</div>
        </div>
        <button style={{ ...navBtn(T), fontSize: 13, fontFamily: F.serifCn, color: T.inkSoft }}>✎</button>
      </div>

      {/* 主 tab — 平整 */}
      <div style={{ flexShrink: 0, padding: '0 20px 10px', display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[
          { id: 'desktop', label: '桌面', en: 'desktop' },
          { id: 'widgets', label: '恋爱组件', en: 'widgets' },
        ].map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '7px 18px', border: 'none', cursor: 'pointer',
              background: active ? T.ink : T.card, color: active ? T.cream : T.inkSoft,
              borderRadius: 100, fontFamily: F.serifCn, fontSize: 13, fontWeight: active ? 500 : 400,
              letterSpacing: '0.05em', boxShadow: active ? '0 4px 12px -4px rgba(42,37,48,0.3)' : '0 2px 8px -6px rgba(110,100,140,0.3)',
              transition: 'all 0.15s', display: 'flex', alignItems: 'baseline', gap: 6,
            }}>
              <span>{t.label}</span>
              <span style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 9, opacity: 0.6, letterSpacing: '0.15em' }}>{t.en}</span>
            </button>
          );
        })}
      </div>

      {tab === 'desktop' ? (
        <DesktopTab T={T} F={F} accent={accent} accentIdx={accentIdx} setAccentIdx={setAccentIdx} wall={wall} wallIdx={wallIdx} setWallIdx={setWallIdx} customWallpaper={customWallpaper} setCustomWallpaper={setCustomWallpaper} PALETTES={PALETTES} />
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <DesktopStage {...{ T, F, Widget, widgetProps, effectiveSize, meta, glass }} />
          <CreamDrawer {...{
            T, F, META, RENDERERS, widgetId, setWidgetId, size, setSize,
            supportedSizes, effectiveSize, widgetProps, info, setInfo,
            ais, aiId, setAiId, pickAiLine, order, draggingId, setDraggingId, handleReorder,
            drawerSection, setDrawerSection, glass, setGlass, dailyLines, dailyLinesLoading,
            onSave: handleSave, onReset: handleReset,
          }} />
        </div>
      )}
    </div>
  );
}

function navBtn(T) {
  return {
    width: 32, height: 32, borderRadius: 10,
    background: window.SET_TOKENS.card, border: `1px solid ${window.SET_TOKENS.rule}`,
    color: window.SET_TOKENS.lilacDeep, fontSize: 18, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

// ============ 真实比例 iPhone 桌面舞台 ============
function DesktopStage({ T, F, Widget, widgetProps, effectiveSize, meta, glass }) {
  const phoneW = 145;
  const phoneH = phoneW * 19.5 / 9;
  const { desktop, dock } = readRealLayout();
  // page 0 apps, first 4 shown above widget
  const page0 = desktop.filter(a => (a.page ?? 0) === 0).slice(0, 4);
  const dockApps = dock.slice(0, 4);

  return (
    <div style={{ flexShrink: 0, padding: '0 20px 12px' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
        {/* 左：真实比例 iPhone */}
        <div style={{
          width: phoneW, height: phoneH, borderRadius: 26,
          background: 'linear-gradient(180deg, #C9B8E0 0%, #DCC4D6 50%, #E8C8B8 100%)',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 14px 28px -14px rgba(74,57,90,0.5), inset 0 0 0 1.5px rgba(50,40,65,0.6), 0 0 0 3px #1A1620',
          flexShrink: 0,
        }}>
          {/* dynamic island */}
          <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 50, height: 14, borderRadius: 8, background: '#000', zIndex: 5 }} />
          {/* status bar */}
          <div style={{ position: 'absolute', top: 6, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 12px', color: '#fff', fontSize: 8, fontWeight: 600, zIndex: 6 }}>
            <span>9:41</span>
            <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}><span style={{ fontSize: 6 }}>●●●</span></span>
          </div>
          {/* time */}
          <div style={{ position: 'absolute', top: 28, left: 0, right: 0, textAlign: 'center', color: '#fff', fontFamily: F.serifEn, fontWeight: 200, textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 7, letterSpacing: '0.3em', opacity: 0.85 }}>SAT · MAY 7</div>
            <div style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.04em', marginTop: 1 }}>9:41</div>
          </div>
          {/* widget */}
          <div style={{ position: 'absolute', top: '34%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ transform: 'scale(0.36)', transformOrigin: 'top center' }}>
              <Widget {...widgetProps} size={effectiveSize} />
            </div>
          </div>
          {/* real page-0 app icons */}
          <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {page0.map((a, i) => <MiniIcon key={i} app={a} size={22} accent={T.lilacDeep} />)}
          </div>
          {/* real dock */}
          <div style={{ position: 'absolute', bottom: 14, left: 8, right: 8, background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: 4, display: 'flex', justifyContent: 'space-around' }}>
            {dockApps.map((a, i) => <MiniIcon key={i} app={a} size={22} accent={T.lilacDeep} />)}
          </div>
          {/* home indicator */}
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 50, height: 2.5, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        </div>

        {/* 右：信息 + LIVE + 单独缩略 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBlock: 4 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C26A6A', boxShadow: '0 0 8px rgba(194,106,106,0.6)' }} />
              <span style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 11, letterSpacing: '0.15em', color: T.inkSoft }}>LIVE PREVIEW</span>
            </div>
            <div style={{ fontFamily: F.serifCn, fontSize: 18, fontWeight: 500, color: T.ink, letterSpacing: '0.05em' }}>{meta?.name || '心跳线'}</div>
            <div style={{ fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft, marginTop: 2 }}>{meta?.tagline}</div>
          </div>

          {/* solo 缩略预览 */}
          <div style={{ padding: 0, transform: 'rotate(-2deg)', alignSelf: 'flex-start' }}>
            <div style={{ width: 110, height: 60, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'scale(0.30)', transformOrigin: 'center' }}>
                <Widget {...widgetProps} size={effectiveSize === 'L' ? 'M' : effectiveSize} />
              </div>
            </div>
            <div style={{ fontFamily: F.hand, fontSize: 11, color: T.inkSoft, textAlign: 'center', marginTop: 2 }}>solo · 真实尺寸</div>
          </div>

          <div style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 10, color: T.inkFaint, letterSpacing: '0.1em' }}>
            size · {effectiveSize} · {{S:'1×1',M:'2×1',L:'2×2'}[effectiveSize]}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 抽屉 ============
function CreamDrawer({
  T, F, META, RENDERERS, widgetId, setWidgetId, size, setSize,
  supportedSizes, effectiveSize, widgetProps, info, setInfo,
  ais, aiId, setAiId, pickAiLine, order, draggingId, setDraggingId, handleReorder,
  drawerSection, setDrawerSection, glass, setGlass, dailyLines, dailyLinesLoading,
  onSave, onReset,
}) {
  const sections = [
    { id: 'layout', label: '组件', en: 'layout' },
    { id: 'size', label: '尺寸', en: 'size' },
    { id: 'ai', label: 'AI', en: 'ai' },
    { id: 'info', label: '文字', en: 'info' },
  ];

  return (
    <div style={{
      flex: 1, minHeight: 0,
      margin: '4px 14px 12px',
      background: T.card, borderRadius: 22,
      boxShadow: '0 -4px 20px -10px rgba(110,100,140,0.2), inset 0 1px 0 rgba(255,255,255,0.6)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      border: `1px solid ${T.rule}`,
    }}>
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: T.ruleStrong, opacity: 0.5 }} />
      </div>

      <div style={{ flexShrink: 0, padding: '6px 12px 4px', display: 'flex', gap: 4 }}>
        {sections.map(s => {
          const active = drawerSection === s.id;
          return (
            <button key={s.id} onClick={() => setDrawerSection(s.id)} style={{
              flex: 1, padding: '8px 4px', border: 'none', cursor: 'pointer',
              background: active ? T.ink : 'transparent',
              color: active ? T.cream : T.inkSoft,
              borderRadius: 10, fontFamily: F.serifCn, fontSize: 12, fontWeight: active ? 500 : 400,
              display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center',
              transition: 'all 0.15s',
            }}>
              <span>{s.label}</span>
              <span style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 8, opacity: 0.6, letterSpacing: '0.1em' }}>{s.en}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '6px 14px 10px' }}>
        {drawerSection === 'layout' && <LayoutPanelLight {...{ T, F, META, RENDERERS, widgetId, setWidgetId, widgetProps, order, draggingId, setDraggingId, handleReorder }} />}
        {drawerSection === 'size' && <SizePanelLight {...{ T, F, size, setSize, supportedSizes, effectiveSize, glass, setGlass }} />}
        {drawerSection === 'ai' && <AiPanelLight {...{ T, F, ais, aiId, setAiId, pickAiLine, info, setInfo, dailyLines, dailyLinesLoading }} />}
        {drawerSection === 'info' && <InfoPanelLight {...{ T, F, info, setInfo, glass, setGlass }} />}
      </div>

      <div style={{ flexShrink: 0, display: 'flex', gap: 8, padding: '8px 14px 12px', borderTop: `1px solid ${T.rule}` }}>
        <button type="button" onClick={onReset} style={{ flex: 1, padding: '10px', background: 'transparent', border: `1.5px dashed ${T.ruleStrong}`,
          borderRadius: 10, fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft, cursor: 'pointer', letterSpacing: '0.08em' }}>↺ 复位</button>
        <button type="button" onClick={onSave} style={{ flex: 2, padding: '10px', background: T.ink, border: 'none',
          borderRadius: 10, fontFamily: F.serifCn, fontSize: 12, color: T.cream, cursor: 'pointer',
          letterSpacing: '0.15em', fontWeight: 500, boxShadow: '0 4px 12px -4px rgba(42,37,48,0.3)' }}>盖章保存</button>
      </div>
    </div>
  );
}

function LayoutPanelLight({ T, F, META, RENDERERS, widgetId, setWidgetId, widgetProps, order, draggingId, setDraggingId, handleReorder }) {
  return (
    <div>
      <PanelHeader F={F} T={T} cn="选一种心情" en="choose · drag to reorder" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 10, paddingBlock: 4 }}>
        {order.map((id, i) => {
          const m = META.find(x => x.id === id);
          const Renderer = RENDERERS[id];
          const active = widgetId === id;
          return (
            <div key={id} draggable
              onDragStart={() => setDraggingId(id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => { if (draggingId && draggingId !== id) handleReorder(draggingId, id); setDraggingId(null); }}
              onDragEnd={() => setDraggingId(null)}
              onClick={() => setWidgetId(id)}
              style={{
                position: 'relative',
                background: active ? 'rgba(232,222,245,0.34)' : 'transparent',
                border: active ? `1.5px solid ${T.lilacDeep}` : `1px solid ${T.rule}`,
                borderRadius: 8, padding: 10, cursor: 'pointer',
                transform: active ? 'rotate(0)' : `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)`,
                boxShadow: active ? '0 0 0 3px rgba(142,118,184,0.10)' : 'none',
                opacity: draggingId === id ? 0.5 : 1, transition: 'border-color 0.15s, box-shadow 0.15s',
              }}>
              <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ transform: 'scale(0.38)', transformOrigin: 'center' }}><Renderer {...widgetProps} size="M" /></div>
              </div>
              <div style={{ marginTop: 6, textAlign: 'center', fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>{m.name}</div>
              {active && <div style={{ position: 'absolute', top: -5, right: -5, background: T.lilacDeep, color: '#fff', borderRadius: 3,
                fontFamily: F.serifCn, fontSize: 9, padding: '2px 6px', transform: 'rotate(8deg)', letterSpacing: '0.08em' }}>选</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SizePanelLight({ T, F, size, setSize, supportedSizes, effectiveSize, glass, setGlass }) {
  const sizes = [
    { id: '1x1', sub: '1×1' }, { id: '2x1', sub: '2×1' }, { id: '3x1', sub: '3×1' }, { id: '4x1', sub: '4×1' },
    { id: '2x2', sub: '2×2' }, { id: '3x2', sub: '3×2' }, { id: '4x2', sub: '4×2' }, { id: '4x4', sub: '4×4' },
  ];
  // 旧 ID 兼容映射
  const mapToOld = { '1x1':'S','2x1':'M','2x2':'L' };
  return (
    <div>
      <PanelHeader F={F} T={T} cn="尺寸" en="size" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10, paddingBlock: 4 }}>
        {sizes.map((s, i) => {
          const oldId = mapToOld[s.id];
          const supported = oldId && supportedSizes.includes(oldId);
          const active = supported && effectiveSize === oldId;
          return (
            <button key={s.id} disabled={!supported} onClick={() => supported && setSize(oldId)} style={{
              padding: '12px 4px',
              background: active ? T.ink : T.cardSoft,
              color: active ? T.cream : (supported ? T.ink : T.inkGhost),
              border: active ? 'none' : `1px solid ${T.rule}`, borderRadius: 8,
              cursor: supported ? 'pointer' : 'not-allowed',
              fontFamily: F.serifCn,
              transform: active ? 'rotate(0)' : `rotate(${((i % 4) - 1.5) * 0.8}deg)`,
              boxShadow: active ? '0 5px 12px -6px rgba(42,37,48,0.3)' : '0 2px 8px -6px rgba(110,100,140,0.3)',
              opacity: supported ? 1 : 0.35, transition: 'all 0.15s',
              fontSize: 13, fontWeight: 500,
            }}>{s.sub}</button>
          );
        })}
      </div>
      <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, marginTop: 10, textAlign: 'right' }}>
        ↳ 灰色尺寸本组件不支持
      </div>
    </div>
  );
}

function AiPanelLight({ T, F, ais, aiId, setAiId, pickAiLine, info, setInfo, dailyLines, dailyLinesLoading }) {
  return (
    <div>
      <PanelHeader F={F} T={T} cn="AI 伴侣" en="who's by your side" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 10, paddingBlock: 4 }}>
        {ais.map((ai, i) => {
          const active = aiId === ai.id;
          return (
            <button key={ai.id} onClick={() => pickAiLine ? pickAiLine(ai) : setAiId(ai.id)} style={{
              background: active ? T.lilacWash : T.cardSoft,
              border: active ? `1.5px solid ${T.lilacDeep}` : `1px solid ${T.rule}`,
              borderRadius: 6, padding: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
              transform: active ? 'rotate(0)' : `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)`,
              boxShadow: active ? '0 6px 14px -8px rgba(142,118,184,0.4)' : '0 2px 8px -6px rgba(110,100,140,0.3)',
              transition: 'all 0.15s',
            }}>
              <window.AvatarPlaceholder tone={ai.tone} size={36} label={ai.label} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: F.serifEn, fontSize: 13, fontStyle: 'italic', color: T.ink }}>{ai.name}</div>
                <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.inkSoft, marginTop: 2 }}>{ai.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: F.hand, fontSize: 13, color: T.inkSoft, marginBottom: 4 }}>「点头像 ta 会说…」</div>
        <input data-love-field="aiMessage" value={info.aiMessage} onChange={e => setInfo({ ...info, aiMessage: e.target.value })} style={lightInput(F, T)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
          {(dailyLinesLoading && (!dailyLines || dailyLines.length === 0)) ? (
            <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkFaint }}>今天的小纸条准备中…</div>
          ) : (
            (dailyLines || []).map((line, i) => {
              const active = info.aiMessage === line;
              return (
                <button key={`${line}-${i}`} onClick={() => setInfo({ ...info, aiMessage: line })} style={{
                  all: 'unset',
                  cursor: 'pointer',
                  padding: '7px 10px',
                  background: active ? T.lilacWash : T.cardSoft,
                  border: active ? `1.5px solid ${T.lilacDeep}` : `1px solid ${T.rule}`,
                  borderRadius: 8,
                  fontFamily: F.serifCn,
                  fontSize: 12,
                  color: active ? T.ink : T.inkSoft,
                  lineHeight: 1.35,
                  boxShadow: active ? '0 4px 10px -7px rgba(142,118,184,0.45)' : 'none',
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.45}deg)`,
                }}>{line}</button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function InfoPanelLight({ T, F, info, setInfo, glass, setGlass }) {
  const compressAvatar = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const scale = Math.max(size / img.width, size / img.height);
        const width = img.width * scale;
        const height = img.height * scale;
        ctx.drawImage(img, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });
  const pickAvatar = (key, file) => {
    if (!file) return;
    compressAvatar(file)
      .then(src => setInfo(prev => ({ ...prev, [key]: src })))
      .catch(() => {});
  };
  return (
    <div>
      <PanelHeader F={F} T={T} cn="文字" en="words" />
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LightField label="起始日期" T={T} F={F}>
          <input data-love-field="startDate" type="date" value={info.startDate} onChange={e => setInfo({ ...info, startDate: e.target.value })} style={lightInput(F, T)} />
        </LightField>
        <div style={{ display: 'flex', gap: 10 }}>
          <LightField label="左边 · 你" T={T} F={F} flex>
            <input data-love-field="leftName" value={info.leftName} onChange={e => setInfo({ ...info, leftName: e.target.value })} style={lightInput(F, T)} />
          </LightField>
          <LightField label="右边 · ta" T={T} F={F} flex>
            <input data-love-field="rightName" value={info.rightName} onChange={e => setInfo({ ...info, rightName: e.target.value })} style={lightInput(F, T)} />
          </LightField>
        </div>
        <LightField label="小字" T={T} F={F}>
          <input data-love-field="title" value={info.title} onChange={e => setInfo({ ...info, title: e.target.value })} style={lightInput(F, T)} />
        </LightField>
      </div>

      {/* 头像替换 */}
      <div style={{ marginTop: 18 }}>
        <PanelHeader F={F} T={T} cn="头像" en="avatar" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          {[
            { side: '左', tone: 'butter', label: info.leftName.charAt(0), key: 'leftAvatar', src: info.leftAvatar },
            { side: '右', tone: 'lilac',  label: info.rightName.charAt(0), key: 'rightAvatar', src: info.rightAvatar },
          ].map((a, i) => (
            <label key={a.key} style={{
              background: T.cardSoft, border: `1px solid ${T.rule}`,
              borderRadius: 8, padding: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
              transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
              boxShadow: '0 2px 8px -6px rgba(110,100,140,0.3)',
            }}>
              <input type="file" accept="image/*" style={visuallyHiddenFileInput}
                onChange={e => { pickAvatar(a.key, e.target.files?.[0]); e.target.value = ''; }} />
              <window.AvatarPlaceholder tone={a.tone} size={36} label={a.label} src={a.src} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>{a.side}头像</div>
                <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.inkSoft, marginTop: 2 }}>点击替换 ↻</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 卡片透明度 */}
      <div style={{ marginTop: 18 }}>
        <PanelHeader F={F} T={T} cn="卡片透明度" en="opacity" />
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="range" min="40" max="100" value={glass} onChange={e => setGlass(+e.target.value)} style={{ flex: 1, accentColor: T.lilacDeep }} />
          <span style={{ fontFamily: F.mono, fontSize: 12, color: T.inkSoft, minWidth: 32, textAlign: 'right' }}>{glass}</span>
        </div>
      </div>
    </div>
  );
}

const visuallyHiddenFileInput = {
  position: 'absolute',
  width: 1,
  height: 1,
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
};

function PanelHeader({ cn, en, F, T }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${T.rule}`, paddingBottom: 5 }}>
      <span style={{ fontFamily: F.serifCn, fontSize: 14, color: T.ink, fontWeight: 500 }}>{cn}</span>
      <span style={{ fontFamily: F.serifEn, fontSize: 9, fontStyle: 'italic', color: T.inkFaint, letterSpacing: '0.15em' }}>{en}</span>
    </div>
  );
}

function LightField({ label, children, flex, T, F }) {
  return (
    <div style={{ flex: flex ? 1 : undefined }}>
      <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, marginBottom: 2 }}>{label}</div>
      {children}
    </div>
  );
}

function lightInput(F, T) {
  return {
    width: '100%', padding: '8px 0', background: 'transparent', border: 'none',
    borderBottom: `1.5px solid ${T.rule}`,
    fontFamily: F.serifCn, fontSize: 14, color: T.ink, outline: 'none', boxSizing: 'border-box',
  };
}

// ============ 桌面 Tab ============
function DesktopTab({ T, F, accent, accentIdx, setAccentIdx, wall, wallIdx, setWallIdx, customWallpaper, setCustomWallpaper, PALETTES }) {
  const [sub, setSub] = use4('home');
  const subs = [
    { id: 'home', label: '主页面', en: 'home' },
    { id: 'app', label: 'App', en: 'apps' },
    { id: 'theme', label: '主题色', en: 'theme' },
  ];
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '4px 20px 10px', display: 'flex', gap: 8, justifyContent: 'center' }}>
        {subs.map(s => {
          const active = sub === s.id;
          return (
            <button key={s.id} onClick={() => setSub(s.id)} style={{
              padding: '6px 14px', cursor: 'pointer',
              background: active ? `${accent}26` : T.card,
              color: active ? accent : T.inkSoft,
              borderRadius: 100, fontFamily: F.serifCn, fontSize: 12, fontWeight: active ? 500 : 400,
              border: active ? `1px solid ${accent}66` : `1px solid ${T.rule}`,
              boxShadow: active ? `0 3px 10px -4px ${accent}66` : 'none',
              transition: 'all 0.15s',
            }}>{s.label}</button>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 18px', WebkitOverflowScrolling: 'touch', minHeight: 0 }}>
        {sub === 'home' && <HomeSubTab T={T} F={F} accent={accent} wall={wall} wallIdx={wallIdx} setWallIdx={setWallIdx} customWallpaper={customWallpaper} setCustomWallpaper={setCustomWallpaper} PALETTES={PALETTES} />}
        {sub === 'app' && <AppSubTab T={T} F={F} accent={accent} />}
        {sub === 'theme' && <ThemeSubTab T={T} F={F} accent={accent} accentIdx={accentIdx} setAccentIdx={setAccentIdx} PALETTES={PALETTES} />}
      </div>
    </div>
  );
}

function HomeSubTab({ T, F, accent, wall, wallIdx, setWallIdx, customWallpaper, setCustomWallpaper, PALETTES }) {
  const [page, setPage] = use4(0);
  const [fontScale, setFontScale] = use4(100);
  const [mode, setMode] = use4('sys');
  const [appFont, setAppFont] = use4('Zen Maru Gothic');
  const [codeFont, setCodeFont] = use4('系统默认');
  const [expanded, setExpanded] = use4(null); // 'wall' | 'display' | null
  const { desktop: realDesktop, dock: realDockApps } = readRealLayout();
  const maxPage = realDesktop.length ? Math.max(...realDesktop.map(a => a.page ?? 0)) : 0;
  const pageApps = realDesktop.filter(a => (a.page ?? 0) === page);

  const ListRow = ({ glyph, cn, sub, val, id }) => {
    const open = expanded === id;
    return (
      <button onClick={() => setExpanded(open ? null : id)} style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: open ? `${accent}14` : T.cardSoft, border: open ? `1px solid ${accent}66` : `1px solid ${T.rule}`, borderRadius: 10, cursor: 'pointer', boxSizing: 'border-box', transition: 'all 0.15s' }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: `${accent}26`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.serifCn, fontSize: 14, fontWeight: 500 }}>{glyph}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>{cn}</div>
          <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.inkSoft, marginTop: 1 }}>{sub}</div>
        </div>
        <div style={{ fontFamily: F.serifCn, fontSize: 11, color: T.inkSoft }}>{val} <span style={{ opacity: 0.6, display: 'inline-block', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>›</span></div>
      </button>
    );
  };

  const wallName = customWallpaper ? '自定义图片' : (PALETTES[wallIdx]?.name || '雾紫韵');
  const pickWallpaper = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = event => setCustomWallpaper(String(event.target?.result || ''));
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* 真实比例 mini phone preview */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 140, aspectRatio: '9 / 19.5', borderRadius: 22,
          background: wall,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 12px 24px -14px rgba(110,100,140,0.5), inset 0 0 0 1.5px rgba(50,40,65,0.5), 0 0 0 3px #1A1620',
        }}>
          <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 46, height: 13, borderRadius: 7, background: '#000', zIndex: 5 }} />
          <div style={{ position: 'absolute', top: 5, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 10px', color: '#fff', fontSize: 7 * fontScale / 100, fontWeight: 600, zIndex: 6 }}>
            <span>9:41</span><span>●●●</span>
          </div>
          <div style={{ position: 'absolute', top: 26, left: 0, right: 0, textAlign: 'center', fontFamily: F.serifEn, fontSize: 26 * fontScale / 100, color: '#fff', fontWeight: 200, lineHeight: 1 }}>9:41</div>
          <div style={{ position: 'absolute', top: 50, left: 0, right: 0, textAlign: 'center', fontFamily: F.serifCn, fontSize: 8 * fontScale / 100, color: '#fff', opacity: 0.85, letterSpacing: '0.15em' }}>周六 · 5月7日</div>
          <div style={{ position: 'absolute', top: 78, left: 8, right: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
            {pageApps.map((a, i) => (
              <div key={i} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MiniIcon app={a} size={24} accent={accent} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 12, left: 6, right: 6, background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(10px)', borderRadius: 11, padding: 3, display: 'flex', justifyContent: 'space-around' }}>
            {realDockApps.slice(0, 4).map((a, i) => (
              <MiniIcon key={i} app={a} size={22} accent={accent} />
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 50, height: 2.5, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        </div>
      </div>

      {/* 翻页 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: Math.max(maxPage + 1, 2) }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              width: i === page ? 18 : 7, height: 7, borderRadius: 4, border: 'none',
              background: i === page ? accent : T.ruleStrong, cursor: 'pointer', transition: 'width 0.2s',
            }} />
          ))}
        </div>
        <div style={{ fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft }}>第 {page + 1} 页</div>
        <button style={{ padding: '6px 12px', background: `${accent}26`, color: accent, border: `1px solid ${accent}66`, borderRadius: 100, fontFamily: F.serifCn, fontSize: 12, cursor: 'pointer' }}>设为主页</button>
      </div>

      {/* 列表 + 内联展开 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ListRow id="wall" glyph="景" cn="背景样式" sub="预设背景或上传自己的图片" val={wallName} />
        {expanded === 'wall' && (
          <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.rule}`, padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {PALETTES.map((p, i) => {
                const sel = wallIdx === i;
                return (
                  <button key={i} onClick={() => { setWallIdx(i); setCustomWallpaper(''); }} style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', aspectRatio: '9/16', borderRadius: 8, background: p.bg, border: sel ? `2px solid ${accent}` : `1px solid ${T.rule}`, boxShadow: sel ? `0 4px 12px -4px ${accent}66` : 'none', boxSizing: 'border-box' }} />
                    <div style={{ fontFamily: F.serifCn, fontSize: 10, color: sel ? accent : T.inkSoft, fontWeight: sel ? 500 : 400 }}>{p.name}</div>
                  </button>
                );
              })}
            </div>
            <label style={{ width: '100%', marginTop: 10, padding: '10px', background: 'transparent', border: `1.5px dashed ${T.ruleStrong}`, borderRadius: 8, fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft, cursor: 'pointer', display: 'grid', placeItems: 'center', boxSizing: 'border-box', position: 'relative' }}>
              + 上传自己的图片
              <input type="file" accept="image/*" style={visuallyHiddenFileInput}
                onChange={e => { pickWallpaper(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
          </div>
        )}

        <ListRow id="display" glyph="显" cn="界面与显示" sub="日夜模式、字体和缩放" val={mode==='day'?'日间':mode==='night'?'夜间':'跟随系统'} />
        {expanded === 'display' && (
          <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.rule}`, padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {[['day','日间模式'],['night','夜间模式'],['sys','跟随系统']].map(([k,l])=>{
                const a = mode===k;
                return <button key={k} onClick={()=>setMode(k)} style={{ padding: '9px 4px', background: a?`${accent}26`:T.cardSoft, color: a?accent:T.ink, border: a?`1.5px solid ${accent}`:`1px solid ${T.rule}`, borderRadius: 8, fontFamily: F.serifCn, fontSize: 12, cursor: 'pointer', fontWeight: a?500:400 }}>{l}</button>;
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <LightField label="应用字体" T={T} F={F} flex>
                <select value={appFont} onChange={e=>setAppFont(e.target.value)} style={{ ...lightInput(F,T), padding: '8px 10px', background: T.cardSoft, borderRadius: 6, border: `1px solid ${T.rule}` }}>
                  <option>Zen Maru Gothic</option><option>Noto Serif SC</option><option>思源宋体</option>
                </select>
              </LightField>
              <LightField label="代码字体" T={T} F={F} flex>
                <select value={codeFont} onChange={e=>setCodeFont(e.target.value)} style={{ ...lightInput(F,T), padding: '8px 10px', background: T.cardSoft, borderRadius: 6, border: `1px solid ${T.rule}` }}>
                  <option>系统默认</option><option>JetBrains Mono</option><option>Fira Code</option>
                </select>
              </LightField>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft, marginBottom: 4 }}>
                <span>字体缩放</span><span style={{ fontFamily: F.mono, color: accent }}>{fontScale}%</span>
              </div>
              <input type="range" min="80" max="140" step="5" value={fontScale} onChange={e=>setFontScale(+e.target.value)} style={{ width: '100%', accentColor: accent }} />
              <div style={{ marginTop: 6, padding: '8px 10px', background: T.cardSoft, borderRadius: 6, fontFamily: F.serifCn, fontSize: 13 * fontScale / 100, color: T.ink, lineHeight: 1.4 }}>今天也想见你 · 这是预览文本</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, textAlign: 'center', marginTop: -4 }}>↳ 排版自由 · 长按图标即可拖动</div>
    </div>
  );
}

function AppSubTab({ T, F }) {
  const _mapApp = (a) => ({ id: a.id, name: a.label || a.name || a.glyph || a.id, label: a.label || a.name || a.glyph || a.id, glyph: a.glyph || '?', iconSvg: a.iconSvg || '', iconImage: a.iconImage || a.image || '', page: a.page ?? 0, custom: Boolean(a.iconImage || a.image) });
  const { desktop: _rDesktop, dock: _rDock } = readRealLayout();
  const [installed, setInstalled] = use4(() =>
    _rDesktop.length ? _rDesktop.map(_mapApp) : (window.YUI_BUILTIN_APPS || []).slice(0, 8).map(_mapApp)
  );
  const [dock, setDock] = use4(() =>
    _rDock.length ? _rDock.map(_mapApp) : (window.YUI_BUILTIN_APPS || []).slice(0, 4).map(_mapApp)
  );
  const [edit, setEdit] = use4(true);
  const [drag, setDrag] = use4(null);
  const [showPicker, setShowPicker] = use4(null); // 'apps' | 'dock' | null
  const [page, setPage] = use4(0);
  const homePageSize = 12;
  const pageCount = Math.max(2, Math.ceil(installed.length / homePageSize) + 1);
  const visibleInstalled = installed.slice(page * homePageSize, page * homePageSize + homePageSize);
  useEffect4(() => {
    setPage(current => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const saveLayout = (ni, nd) => {
    try {
      const prev = JSON.parse(localStorage.getItem(PHONE_STORAGE_KEY) || '{}');
      const seenDesktop = new Set();
      const seenDock = new Set();
      const serialize = (a, includePage) => ({
        id: a.id,
        ...(includePage ? { page: a.page ?? 0 } : {}),
        ...(a.iconImage || a.image ? { iconImage: a.iconImage || a.image } : {}),
      });
      const desktopApps = ni
        .filter(a => a?.id && !seenDesktop.has(a.id) && seenDesktop.add(a.id))
        .map(a => serialize(a, true));
      const dockApps = nd
        .filter(a => a?.id && !seenDock.has(a.id) && seenDock.add(a.id))
        .slice(0, 4)
        .map(a => serialize(a, false));
      const next = { ...prev, desktopApps, dockApps };
      localStorage.setItem(PHONE_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('yui-phone-layout-updated', { detail: next }));
    } catch {}
  };

  const moveItem = (list, setList, fromId, toId, isDock) => {
    const from = list.findIndex(x => x.id === fromId), to = list.findIndex(x => x.id === toId);
    if (from < 0 || to < 0) return;
    const next = [...list]; const [m] = next.splice(from, 1); next.splice(to, 0, m); setList(next);
    isDock ? saveLayout(installed, next) : saveLayout(next, dock);
  };
  const removeItem = (list, setList, id, isDock) => {
    const next = list.filter(x => x.id !== id); setList(next);
    isDock ? saveLayout(installed, next) : saveLayout(next, dock);
  };
  const setCustomIcon = (list, setList, id, file, isDock = false) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = event => {
      const image = String(event.target?.result || '');
      const next = list.map(item => item.id === id ? { ...item, iconImage: image, image, custom: true } : item);
      setList(next);
      isDock ? saveLayout(installed, next) : saveLayout(next, dock);
    };
    reader.readAsDataURL(file);
  };

  const allApps = window.YUI_BUILTIN_APPS || [];
  const pickerApps = showPicker === 'dock'
    ? allApps.filter(a => !dock.some(i => i.id === a.id))
    : allApps.filter(a => !installed.some(i => i.id === a.id));
  const addApp = (app) => {
    if (showPicker === 'dock') {
      if (dock.length >= 4) return;
      const next = [...dock, _mapApp(app)]; setDock(next); saveLayout(installed, next);
    } else {
      // 插到开头，确保默认落在第 1 页
      const next = [_mapApp(app), ...installed]; setInstalled(next); saveLayout(next, dock);
    }
    setShowPicker(null);
  };

  const nudgeItem = (list, setList, id, dir, isDock) => {
    const idx = list.findIndex(x => x.id === id);
    if (idx < 0) return;
    const next = [...list];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    setList(next);
    isDock ? saveLayout(installed, next) : saveLayout(next, dock);
  };

  const Tile = ({ a, list, setList, isDock }) => (
    <div
      draggable={edit}
      onDragStart={()=>setDrag({id:a.id,list:isDock?'dock':'apps'})}
      onDragOver={e=>e.preventDefault()}
      onDrop={()=>{ if(drag && drag.id!==a.id) moveItem(list,setList,drag.id,a.id,isDock); setDrag(null); }}
      onDragEnd={()=>setDrag(null)}
      style={{
        position: 'relative', cursor: edit?'grab':'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        animation: edit ? `jiggle${a.id.charCodeAt(0)%2} 0.32s infinite alternate ease-in-out` : 'none',
        opacity: drag?.id===a.id?0.4:1,
      }}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 12,
        background: a.custom ? `linear-gradient(135deg, ${T.butterSoft}, ${T.lilacWash})` : T.lilacWash,
        color: T.lilacDeep, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: F.serifCn, fontSize: 20, fontWeight: 500,
        boxShadow: '0 3px 10px -4px rgba(110,100,140,0.4)', position: 'relative',
      }}>
        {a.image ? (
          <img src={a.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }} />
        ) : a.iconSvg ? (
          <div style={{ position: 'absolute', inset: 0, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ width: 60, height: 60, transform: `scale(${50 / 60})`, transformOrigin: 'top left' }}
              dangerouslySetInnerHTML={{ __html: a.iconSvg }} />
          </div>
        ) : a.glyph}
        {edit && (
          <button onClick={(e)=>{e.stopPropagation();removeItem(list,setList,a.id,isDock);}} style={{
            position: 'absolute', top: -6, left: -6, width: 18, height: 18, borderRadius: '50%',
            background: '#fff', border: `1px solid ${T.rule}`, color: T.ink,
            fontSize: 13, lineHeight: 1, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px -2px rgba(0,0,0,0.2)',
          }}>×</button>
        )}
        {edit && (
          <label title="上传自定义图标" onClick={(e)=>e.stopPropagation()} style={{
            position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%',
            background: T.butter, border: 'none', color: '#fff',
            fontSize: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px -2px rgba(0,0,0,0.2)',
          }}>
            ☆
            <input type="file" accept="image/*" style={visuallyHiddenFileInput}
              onChange={e => { setCustomIcon(list, setList, a.id, e.target.files?.[0], isDock); e.target.value = ''; }} />
          </label>
        )}
      </div>
      <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.ink, textAlign: 'center', maxWidth: 56, overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
      {edit && !isDock && (
        <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <button onClick={e => { e.stopPropagation(); nudgeItem(list, setList, a.id, -1, false); }} style={{ flex: 1, padding: '2px 0', background: T.cardSoft, border: `1px solid ${T.rule}`, borderRadius: 4, fontSize: 10, color: T.inkSoft, cursor: 'pointer' }}>←</button>
          <button onClick={e => { e.stopPropagation(); nudgeItem(list, setList, a.id, 1, false); }} style={{ flex: 1, padding: '2px 0', background: T.cardSoft, border: `1px solid ${T.rule}`, borderRadius: 4, fontSize: 10, color: T.inkSoft, cursor: 'pointer' }}>→</button>
        </div>
      )}
    </div>
  );

  const AddTile = ({ isDock }) => (
    <button onClick={() => setShowPicker(isDock ? 'dock' : 'apps')} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      background: 'transparent', border: 'none', cursor: 'pointer',
    }}>
      <div style={{ width: 50, height: 50, borderRadius: 12, border: `1.5px dashed ${T.ruleStrong}`, color: T.inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontFamily: F.serifCn }}>+</div>
      <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.inkSoft }}>添加</div>
    </button>
  );

  const HomeWidgetTile = () => (
    <div style={{
      gridColumn: 'span 2',
      gridRow: 'span 2',
      minHeight: 108,
      borderRadius: 18,
      background: 'rgba(255,255,255,0.28)',
      border: '1px solid rgba(255,255,255,0.55)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 12,
      boxSizing: 'border-box',
      color: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)',
    }}>
      <div>
        <div style={{ fontFamily: F.serifCn, fontSize: 12, opacity: 0.82 }}>今日</div>
        <div style={{ fontFamily: F.serifEn, fontSize: 30, lineHeight: 1, fontWeight: 700 }}>1日</div>
        <div style={{ fontFamily: F.serifCn, fontSize: 11, opacity: 0.78, marginTop: 3 }}>星期一</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, opacity: 0.84 }}>
        <span>恋爱溶解</span><span>♡</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <style>{`@keyframes jiggle0{0%{transform:rotate(-1.4deg)}100%{transform:rotate(1.4deg)}}@keyframes jiggle1{0%{transform:rotate(1.4deg)}100%{transform:rotate(-1.4deg)}}`}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: F.serifCn, fontSize: 14, fontWeight: 500, color: T.ink }}>{edit?'按住拖动 · 打开编辑模式':'主屏布局'}</div>
          <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, marginTop: 2 }}>{edit?'个 × 移除 · 个 ☆ 上传图标':'点击右侧可自由编辑'}</div>
        </div>
        <button onClick={()=>setEdit(!edit)} style={{ padding: '6px 14px', background: edit?T.ink:T.cardSoft, color: edit?T.cream:T.ink, border: edit?'none':`1px solid ${T.rule}`, borderRadius: 100, fontFamily: F.serifCn, fontSize: 12, cursor: 'pointer' }}>
          {edit ? '完成' : '编辑'}
        </button>
      </div>

      {/* 主屏 */}
      <div style={{ background: 'linear-gradient(180deg, #C9B8E0, #DCC4D6, #E8C8B8)', borderRadius: 18, padding: 14, width: 'calc(100% - 28px)', margin: '0 auto', boxSizing: 'border-box', boxShadow: 'inset 0 0 0 1.5px rgba(50,40,65,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.85)' }}>HOME SCREEN</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} type="button" onClick={() => setPage(i)} style={{ width: i === page ? 16 : 6, height: 6, borderRadius: 6, border: 'none', background: i === page ? '#fff' : 'rgba(255,255,255,0.45)', padding: 0, cursor: 'pointer' }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {visibleInstalled.slice(0, 2).map(a => <Tile key={a.id} a={a} list={installed} setList={setInstalled} />)}
          {page === 0 && <HomeWidgetTile />}
          {visibleInstalled.slice(2).map(a => <Tile key={a.id} a={a} list={installed} setList={setInstalled} />)}
          {edit && page === pageCount - 1 && <AddTile />}
        </div>
      </div>

      {/* Dock */}
      <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 18, padding: 14, border: `1px solid ${T.rule}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.2em', color: T.inkFaint }}>DOCK</span>
          <span style={{ fontFamily: F.serifCn, fontSize: 10, color: T.inkSoft }}>{dock.length}/4</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {dock.map(a => <Tile key={a.id} a={a} list={dock} setList={setDock} isDock />)}
          {edit && dock.length < 4 && <AddTile isDock />}
        </div>
      </div>

      {/* App 选择器 */}
      {showPicker && (
        <div style={{ background: T.card, border: `1px solid ${T.rule}`, borderRadius: 14, padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>选择 App 添加</span>
            <button onClick={() => setShowPicker(null)} style={{ width: 24, height: 24, borderRadius: 6, background: T.cardSoft, border: `1px solid ${T.rule}`, color: T.inkSoft, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
          {pickerApps.length === 0 ? (
            <div style={{ fontFamily: F.serifCn, fontSize: 12, color: T.inkSoft, textAlign: 'center', padding: '12px 0' }}>全部 App 已添加</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {pickerApps.map(app => (
                <button key={app.id} onClick={() => addApp(app)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <MiniIcon app={app} size={44} accent={T.lilacDeep} />
                  <div style={{ fontFamily: F.serifCn, fontSize: 10, color: T.ink, textAlign: 'center', maxWidth: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, textAlign: 'center', paddingTop: 2 }}>
        ☆ 黄色星标 = 上传自定义图标 · 黑色 × = 移除
      </div>
    </div>
  );
}

function iconBtn(T, bg, color) {
  return {
    width: 26, height: 26, borderRadius: 7,
    background: bg || T.cardSoft, border: 'none',
    color: color || T.inkSoft, fontSize: 11, cursor: 'pointer',
  };
}

function addBtn(F, T) {
  return {
    width: '100%', marginTop: 8, padding: '10px',
    background: 'transparent', border: `1.5px dashed ${T.ruleStrong}`,
    borderRadius: 10, fontFamily: F.serifCn, fontSize: 13, color: T.inkSoft,
    cursor: 'pointer', letterSpacing: '0.05em',
  };
}

function ThemeSubTab({ T, F, accent, accentIdx, setAccentIdx, PALETTES }) {
  const palettes = PALETTES;
  const cur = palettes[accentIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: F.hand, fontSize: 12, color: T.inkSoft, textAlign: 'center', lineHeight: 1.5 }}>主题色只汇践到界面上的累计点 · 背景请在「主页面 › 背景样式」选</div>
      {/* 预览：小型 UI 样本 */}
      <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.rule}`, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '6px 14px', background: `${accent}26`, color: accent, border: `1px solid ${accent}66`, borderRadius: 100, fontFamily: F.serifCn, fontSize: 12 }}>选中</button>
          <button style={{ padding: '6px 14px', background: T.cardSoft, color: T.inkSoft, border: `1px solid ${T.rule}`, borderRadius: 100, fontFamily: F.serifCn, fontSize: 12 }}>未选</button>
        </div>
        <input type="range" min="0" max="100" defaultValue="60" style={{ accentColor: accent }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
          <span style={{ fontFamily: F.serifCn, fontSize: 12, color: T.ink }}>选中状态 · 重点色</span>
        </div>
      </div>

      <div style={{ fontFamily: F.serifCn, fontSize: 14, color: T.ink, fontWeight: 500, textAlign: 'center' }}>
        {cur.name}
        <span style={{ fontFamily: F.serifEn, fontSize: 11, fontStyle: 'italic', color: T.inkSoft, marginLeft: 8 }}>{cur.en}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {palettes.map((p, i) => {
          const sel = accentIdx === i;
          const a2 = p.colors[2];
          return (
            <button key={i} onClick={() => setAccentIdx(i)} style={{
              padding: 10,
              background: sel ? `${a2}14` : T.card,
              border: sel ? `1.5px solid ${a2}` : `1px solid ${T.rule}`,
              borderRadius: 10, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: sel ? `0 6px 14px -8px ${a2}66` : '0 2px 8px -6px rgba(110,100,140,0.3)',
              transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {p.colors.map((c, k) => (
                  <div key={k} style={{
                    width: 24, height: 30, background: c,
                    borderTopLeftRadius: k === 0 ? 4 : 0, borderBottomLeftRadius: k === 0 ? 4 : 0,
                    borderTopRightRadius: k === p.colors.length - 1 ? 4 : 0, borderBottomRightRadius: k === p.colors.length - 1 ? 4 : 0,
                  }} />
                ))}
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>{p.name}</div>
                <div style={{ fontFamily: F.serifEn, fontSize: 10, fontStyle: 'italic', color: T.inkSoft, marginTop: 1 }}>{p.en}</div>
              </div>
              {sel && <div style={{ width: 18, height: 18, borderRadius: '50%', background: a2, color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 通用辅助
function Section({ cn, en, children, F, T }) {
  return (
    <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.rule}`, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontFamily: F.serifCn, fontSize: 13, fontWeight: 500, color: T.ink }}>{cn}</span>
        <span style={{ fontFamily: F.serifEn, fontSize: 9, fontStyle: 'italic', color: T.inkFaint, letterSpacing: '0.15em' }}>{en}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}

function SectionHead({ cn, en, hint, F, T }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${T.rule}`, paddingBottom: 5 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: F.serifCn, fontSize: 14, color: T.ink, fontWeight: 500 }}>{cn}</span>
        <span style={{ fontFamily: F.serifEn, fontSize: 9, fontStyle: 'italic', color: T.inkFaint, letterSpacing: '0.15em' }}>{en}</span>
      </div>
      {hint && <span style={{ fontFamily: F.sansCn, fontSize: 10, color: T.inkFaint }}>{hint}</span>}
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange, unit, markers, F, T }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontFamily: F.serifCn, fontSize: 12, color: T.ink }}>{label}</span>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: T.lilacDeep }}>{value}{unit}</span>
      </div>
      <div style={{ position: 'relative', height: 6, background: T.cardSoft, borderRadius: 3, marginBottom: 4 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: T.lilacDeep, borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: -4, left: `calc(${pct}% - 7px)`, width: 14, height: 14, borderRadius: '50%', background: '#fff', border: `1.5px solid ${T.lilacDeep}`, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer' }} />
      </div>
      {markers && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.serifCn, fontSize: 9, color: T.inkFaint }}>
          {markers.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      )}
    </div>
  );
}

function RadioRow({ label, options, value, onChange, F, T }) {
  return (
    <div>
      <div style={{ fontFamily: F.serifCn, fontSize: 12, color: T.ink, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map(([id, l]) => {
          const a = value === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              flex: 1, padding: '6px',
              background: a ? T.ink : T.cardSoft, color: a ? T.cream : T.ink,
              border: a ? 'none' : `1px solid ${T.rule}`,
              borderRadius: 6, fontFamily: F.serifCn, fontSize: 11, cursor: 'pointer',
              fontWeight: a ? 500 : 400, transition: 'all 0.15s',
            }}>{l}</button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange, F, T }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: F.serifCn, fontSize: 12, color: T.ink }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 36, height: 20, borderRadius: 11, border: 'none',
        background: value ? T.lilacDeep : T.ruleStrong, position: 'relative', cursor: 'pointer',
        transition: 'background 0.15s',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: value ? 18 : 2,
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.15s',
        }} />
      </button>
    </div>
  );
}

window.StageAtelierScreen = StageAtelierScreen;

export default StageAtelierScreen;
