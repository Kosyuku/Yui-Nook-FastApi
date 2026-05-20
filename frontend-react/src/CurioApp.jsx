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

const AGENTS = {
  azheng: { name: "阿征", stamp: "征", sealColor: "#B84A3E", tint: "#F5D6D1" },
  zhansi: { name: "湛思", stamp: "湛", sealColor: "#5B7A6A", tint: "#D9E0D0" },
  ayan: { name: "阿砚", stamp: "砚", sealColor: "#8B6788", tint: "#E8D4DE" },
};

const TYPE_LABEL = {
  html: { cn: "网页", en: "page" },
  page: { cn: "网页", en: "page" },
  game: { cn: "游戏", en: "game" },
  widget: { cn: "组件", en: "widget" },
};

const baseStyle = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;width:100%;overflow:hidden;font-family:"Noto Serif SC",serif;color:#2B2420}
  ::-webkit-scrollbar{display:none}
`;

const SAMPLE_ITEMS = [
  {
    id: "sample-starletter",
    title: "520 星空信",
    description: "5月20日给小酒的交互式星空信",
    type: "page",
    agent_id: "azheng",
    tags: ["520", "惊喜", "纪念日"],
    is_pinned: true,
    is_surprise: true,
    metadata: { cover_color: "#2C3E5C", cover_ink: "#F1E4BD", cover_glyph: "✦", pushed_at: "2025·5·20" },
    content: `<!doctype html><meta charset=utf-8><style>${baseStyle}
body{background:radial-gradient(ellipse at 30% 20%, #2C3E5C 0%, #14182A 70%);position:relative;color:#F1E4BD;font-family:'Cormorant Garamond',serif}
.stars{position:absolute;inset:0}.s{position:absolute;width:2px;height:2px;background:#FFFBE0;border-radius:50%;animation:tw 3s infinite}.s.b{width:3px;height:3px;box-shadow:0 0 6px #FFFBE0}
@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}.letter{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);width:78%;padding:24px 22px;background:rgba(255,247,224,.08);border:.5px solid rgba(255,247,224,.35);backdrop-filter:blur(4px);border-radius:4px;text-align:center}
.h{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:26px;letter-spacing:1px}.cn{font-family:"Noto Serif SC",serif;font-size:13px;line-height:2;margin-top:14px;color:#FFFBE0;opacity:.88}.sig{font-family:'Caveat',cursive;font-size:20px;margin-top:14px;color:#D9A5A0}
</style><div class=stars id=sky></div><div class=letter><div class=h>To, my dear</div><div class=cn>愿星星替我说<br/>那些我说不出口的话<br/>愿你今夜<br/>梦里有海，醒来有光</div><div class=sig>— 阿征 · 5.20</div></div><script>
const sky=document.getElementById('sky');for(let i=0;i<60;i++){const d=document.createElement('div');d.className='s'+(Math.random()>.7?' b':'');d.style.left=Math.random()*100+'%';d.style.top=Math.random()*100+'%';d.style.animationDelay=(Math.random()*3)+'s';sky.appendChild(d)}
</script>`,
  },
  {
    id: "sample-memory",
    title: "记忆方块",
    description: "四色西蒙游戏，比一比谁的等级高",
    type: "game",
    agent_id: "zhansi",
    tags: ["小游戏", "发呆时刻"],
    metadata: { cover_color: "#F3ECE2", cover_ink: "#5B7A6A", cover_glyph: "✿" },
    content: `<!doctype html><meta charset=utf-8><style>${baseStyle}
body{background:#FBF7F2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px}h1{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:22px;color:#2B2420}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%;max-width:280px;aspect-ratio:1}.c{background:#F3ECE2;border-radius:10px;cursor:pointer;transition:.3s;display:flex;align-items:center;justify-content:center;font-size:20px;color:transparent}.c.on{transform:scale(1.05)}.c.on.r{background:#F5D6D1;color:#B84A3E}.c.on.g{background:#D9E0D0;color:#5B7A6A}.c.on.b{background:#DDD6E6;color:#5B5A7A}.c.on.y{background:#F1E4BD;color:#B08458}.score{font-family:"Noto Serif SC",serif;font-size:12px;color:#6B5F58;letter-spacing:3px}
</style><h1>memory · 记忆方块</h1><div class=grid id=g></div><div class=score>等级 <span id=lv>1</span> · 跟着亮的次序点</div><script>
const g=document.getElementById('g');const colors=['r','g','b','y'];const glyphs=['♡','✿','✦','✧'];const cells=[];for(let i=0;i<16;i++){const d=document.createElement('div');d.className='c';const c=colors[i%4];d.dataset.c=c;d.textContent=glyphs[i%4];g.appendChild(d);cells.push(d)}let seq=[],pos=0,lvl=1;function flash(c){c.classList.add('on',c.dataset.c);setTimeout(()=>c.classList.remove('on',c.dataset.c),400)}function play(){pos=0;seq.push(cells[Math.floor(Math.random()*16)]);seq.forEach((c,i)=>setTimeout(()=>flash(c),i*500+300))}cells.forEach(c=>c.onclick=()=>{flash(c);if(seq[pos]===c){pos++;if(pos===seq.length){lvl++;document.getElementById('lv').textContent=lvl;setTimeout(play,800)}}else{seq=[];lvl=1;document.getElementById('lv').textContent=1;setTimeout(play,600)}});play();
</script>`,
  },
  {
    id: "sample-mood",
    title: "今日心情温度计",
    description: "一根小小的水银柱，量今天的情绪",
    type: "widget",
    agent_id: "ayan",
    tags: ["每日", "心情"],
    metadata: { cover_color: "#FFFBF4", cover_ink: "#B84A3E", cover_glyph: "°" },
    content: `<!doctype html><meta charset=utf-8><style>${baseStyle}
body{background:linear-gradient(180deg,#FFFBF4 0%,#F3ECE2 100%);padding:24px;display:flex;flex-direction:column;align-items:center;gap:16px}.t{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:#6B5F58}.thermo{width:64px;height:240px;background:#F3ECE2;border-radius:32px;position:relative;border:1px solid rgba(120,90,70,.15);overflow:hidden}.mercury{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(180deg,#D9A5A0 0%,#B84A3E 100%);border-radius:0 0 32px 32px;transition:height 1s ease}.bulb{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);width:80px;height:80px;background:#B84A3E;border-radius:50%}.label{font-family:"Noto Serif SC",serif;font-size:14px;color:#2B2420;text-align:center;line-height:1.8}.label b{font-size:24px;color:#B84A3E}button{font-family:"Noto Serif SC",serif;font-size:11px;background:#FFFBF4;border:.5px solid rgba(120,90,70,.3);padding:6px 14px;border-radius:999px;color:#6B5F58;cursor:pointer;letter-spacing:2px}
</style><div class=t>今日心情 · mood</div><div class=thermo><div class=mercury id=m style="height:62%"></div><div class=bulb></div></div><div class=label><b>72°</b><br/>今天像被太阳晒过的棉被</div><button onclick="document.getElementById('m').style.height=(Math.random()*70+20)+'%'">再测一次</button>`,
  },
];

function shade(hex, amt) {
  const n = parseInt(String(hex || "#000000").slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function normalizeItem(row) {
  const metadata = row.metadata && typeof row.metadata === "object" ? row.metadata : {};
  return {
    ...row,
    description: row.description || row.desc || "",
    agent_id: row.agent_id || row.agent || "azheng",
    tags: Array.isArray(row.tags) ? row.tags : [],
    is_pinned: Boolean(row.is_pinned ?? row.pinned),
    is_surprise: Boolean(row.is_surprise ?? row.surprise),
    coverColor: metadata.cover_color || row.coverColor || "#FBF7F2",
    coverInk: metadata.cover_ink || row.coverInk || "#B84A3E",
    coverGlyph: metadata.cover_glyph || row.coverGlyph || (TYPE_LABEL[row.type]?.cn || "页").slice(0, 1),
    pushedAt: metadata.pushed_at || row.pushedAt || "",
    srcUrl: row.src_url || row.url || "",
    srcdoc: row.storage_mode === "r2" ? "" : (row.content || row.srcdoc || ""),
  };
}

function WaxSeal({ agent, size = 28 }) {
  const a = AGENTS[agent] || AGENTS.azheng;
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 30%, ${a.sealColor}EE 0%, ${a.sealColor} 55%, ${shade(a.sealColor, -20)} 100%)`,
      color: "#FFFBF4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONTS.serifCn,
      fontWeight: 600,
      fontSize: size * 0.42,
      boxShadow: "inset 0 -1px 2px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.25)",
      position: "relative",
    }}>
      {a.stamp}
      <svg width={size + 4} height={size + 4} style={{ position: "absolute", inset: -2, pointerEvents: "none" }}>
        <circle cx={(size + 4) / 2} cy={(size + 4) / 2} r={size / 2 + 0.5} fill="none" stroke={shade(a.sealColor, -30)} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
      </svg>
    </div>
  );
}

function CurioCard({ item, onOpen }) {
  const [hover, setHover] = useState(false);
  const agent = AGENTS[item.agent_id] || AGENTS.azheng;
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
      {item.is_pinned && <div style={{ position: "absolute", top: -2, right: 16, width: 14, height: 30, background: agent.sealColor, zIndex: 5, clipPath: "polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)" }} />}
      {item.is_surprise && <div style={{ position: "absolute", top: 8, left: 8, zIndex: 4, fontFamily: FONTS.handEn, fontSize: 14, color: TOKENS.stamp, transform: "rotate(-8deg)" }}>✦ surprise</div>}
      <div style={{
        width: "100%",
        height: 100,
        background: item.coverColor,
        color: item.coverInk,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: "6px 6px 0 0",
        transition: "transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
        transform: hover ? "perspective(400px) rotateX(-22deg) translateY(-3px)" : "none",
        transformOrigin: "top center",
        boxShadow: hover ? "0 14px 18px -10px rgba(60,40,30,.4)" : "inset 0 -1px 0 rgba(0,0,0,.05)",
        overflow: "hidden",
        zIndex: 2,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18, mixBlendMode: "overlay", backgroundImage: "repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,.18) 3px 4px)" }} />
        <div style={{ fontFamily: /[\u4e00-\u9fff]/.test(item.coverGlyph) ? FONTS.serifCn : FONTS.serifEn, fontSize: 40, fontStyle: /[A-Za-z]/.test(item.coverGlyph) ? "italic" : "normal", fontWeight: 400, letterSpacing: 1, position: "relative", zIndex: 2 }}>
          {item.coverGlyph}
        </div>
        <div style={{ position: "absolute", bottom: 6, right: 8, fontFamily: FONTS.serifEn, fontStyle: "italic", fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>{TYPE_LABEL[item.type]?.en || item.type}</div>
      </div>
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 6, background: TOKENS.cream, borderRadius: "0 0 6px 6px", position: "relative", borderTop: `1px dashed ${TOKENS.rule}` }}>
        <div style={{ position: "absolute", top: -1, left: 12, right: 12, height: 1, backgroundImage: `repeating-linear-gradient(90deg, ${agent.tint} 0 4px, transparent 4px 8px)` }} />
        <div style={{ fontFamily: FONTS.serifCn, fontSize: 13, fontWeight: 600, color: TOKENS.ink, lineHeight: 1.4, letterSpacing: 0.3, marginTop: 2 }}>{item.title}</div>
        <div style={{ fontFamily: FONTS.serifCn, fontSize: 10, color: TOKENS.inkSoft, lineHeight: 1.6, letterSpacing: 0.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.description}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, paddingTop: 6, borderTop: `0.5px solid ${TOKENS.rule}` }}>
          <WaxSeal agent={item.agent_id} size={18} />
          <span style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkFaint, letterSpacing: 1 }}>{agent.name}</span>
          <div style={{ flex: 1 }} />
          {item.tags.slice(0, 1).map((tag) => (
            <span key={tag} style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkSoft, letterSpacing: 1, padding: "2px 6px", borderRadius: 999, background: agent.tint, opacity: 0.7 }}>{tag}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function PreviewModal({ item, onClose, onTogglePin, onToggleSurprise }) {
  if (!item) return null;
  const agent = AGENTS[item.agent_id] || AGENTS.azheng;
  const isR2 = item.storage_mode === "r2";
  const srcdoc = item.srcdoc || `<!doctype html><meta charset=utf-8><body style="font-family:serif;padding:24px;color:#2B2420;background:#FBF7F2">正在打开 R2 artifact...</body>`;
  const openPreview = () => {
    if (isR2 && item.srcUrl) {
      window.open(item.srcUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.open(`data:text/html;charset=utf-8,${encodeURIComponent(srcdoc)}`, "_blank");
  };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(40,30,20,.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} style={{ width: "100%", maxHeight: "92%", background: TOKENS.cream, borderRadius: 8, overflow: "hidden", boxShadow: "0 30px 60px rgba(40,30,20,.4)", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ padding: "12px 14px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: `0.5px solid ${TOKENS.rule}`, background: TOKENS.paperDeep }}>
          <WaxSeal agent={item.agent_id} size={26} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.serifCn, fontSize: 13, fontWeight: 600, color: TOKENS.ink, letterSpacing: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
            <div style={{ fontFamily: FONTS.serifCn, fontSize: 9, color: TOKENS.inkFaint, letterSpacing: 2, marginTop: 1 }}>{agent.name} · {item.tags.join(" · ")}</div>
          </div>
          <button style={iconBtn} title="全屏" onClick={openPreview}>⤢</button>
          <button onClick={onClose} style={iconBtn} title="关闭">×</button>
        </div>
        <div style={{ padding: 10, background: TOKENS.paperDeep, display: "flex" }}>
          <iframe sandbox="allow-scripts allow-forms allow-popups" src={isR2 ? item.srcUrl : undefined} srcDoc={isR2 ? undefined : srcdoc} style={{ width: "100%", height: 460, border: "none", borderRadius: 4, background: "#fff", boxShadow: "0 4px 14px rgba(40,30,20,.12)", display: "block" }} />
        </div>
        <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: `0.5px solid ${TOKENS.rule}`, background: TOKENS.cream }}>
          <button type="button" style={pillBtn(item.is_pinned ? TOKENS.stamp : null)} onClick={() => onTogglePin(item)}>{item.is_pinned ? "★ 已置顶" : "☆ 置顶"}</button>
          <button type="button" style={pillBtn(item.is_surprise ? TOKENS.gold : null)} onClick={() => onToggleSurprise(item)}>{item.is_surprise ? "✦ 惊喜页" : "设为惊喜页"}</button>
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

export default function CurioApp() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [agent, setAgent] = useState("all");
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function loadItems() {
    setError("");
    try {
      const response = await fetch(apiUrl("/api/curio/items?limit=120"));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const rows = Array.isArray(data.items) && data.items.length ? data.items : SAMPLE_ITEMS;
      setItems(rows.map(normalizeItem));
    } catch (err) {
      setItems(SAMPLE_ITEMS.map(normalizeItem));
      setError("Curio 后端没回话，先给你看样稿。别慌。");
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => { loadItems(); }, []);

  const tabs = useMemo(() => [
    { id: "all", cn: "全部", count: items.length },
    { id: "page", cn: "网页", count: items.filter((item) => item.type === "page" || item.type === "html").length },
    { id: "game", cn: "游戏", count: items.filter((item) => item.type === "game").length },
    { id: "surprise", cn: "惊喜", count: items.filter((item) => item.is_surprise).length },
    { id: "widget", cn: "组件", count: items.filter((item) => item.type === "widget").length },
  ], [items]);

  const filtered = useMemo(() => {
    return items
      .filter((item) => {
        if (filter === "surprise" && !item.is_surprise) return false;
        if (filter === "page" && !["page", "html"].includes(item.type)) return false;
        if (!["all", "page", "surprise"].includes(filter) && item.type !== filter) return false;
        if (agent !== "all" && item.agent_id !== agent) return false;
        return true;
      })
      .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned));
  }, [agent, filter, items]);

  const columns = [filtered.filter((_, index) => index % 2 === 0), filtered.filter((_, index) => index % 2 === 1)];
  const agentIds = ["all", ...Object.keys(AGENTS)];

  async function openItem(item) {
    const normalized = normalizeItem(item);
    setActive(normalized);
    if (normalized.storage_mode !== "r2" || normalized.srcUrl || normalized.id.startsWith("sample-")) return;
    try {
      const response = await fetch(apiUrl(`/api/curio/items/${encodeURIComponent(normalized.id)}/url`));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const withUrl = normalizeItem({ ...normalized, src_url: data.url || "" });
      setActive(withUrl);
      setItems((current) => current.map((entry) => entry.id === normalized.id ? withUrl : entry));
    } catch (err) {
      setError(`R2 预览链接拿不到：${err.message}`);
    }
  }

  async function patchItem(id, body) {
    if (id.startsWith("sample-")) {
      setItems((current) => current.map((item) => item.id === id ? normalizeItem({ ...item, ...body }) : item));
      setActive((current) => current?.id === id ? normalizeItem({ ...current, ...body }) : current);
      return;
    }
    const response = await fetch(apiUrl(`/api/curio/items/${encodeURIComponent(id)}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await response.text());
    await loadItems();
    setActive((current) => current ? normalizeItem({ ...current, ...body }) : current);
  }

  function togglePin(item) {
    patchItem(item.id, { is_pinned: !item.is_pinned }).catch((err) => setError(`置顶失败：${err.message}`));
  }

  function toggleSurprise(item) {
    patchItem(item.id, { is_surprise: !item.is_surprise }).catch((err) => setError(`惊喜页保存失败：${err.message}`));
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
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {agentIds.map((id) => {
            const activeAgent = agent === id;
            if (id === "all") {
              return <button key={id} type="button" onClick={() => setAgent(id)} style={{ width: 26, height: 26, borderRadius: "50%", border: activeAgent ? `1px solid ${TOKENS.ink}` : `0.5px dashed ${TOKENS.inkFaint}`, background: activeAgent ? TOKENS.ink : "transparent", color: activeAgent ? TOKENS.cream : TOKENS.inkSoft, fontFamily: FONTS.serifEn, fontStyle: "italic", fontSize: 11, cursor: "pointer", padding: 0 }}>all</button>;
            }
            return <button key={id} type="button" onClick={() => setAgent(id)} style={{ opacity: activeAgent ? 1 : 0.55, transform: activeAgent ? "scale(1.05)" : "none", transition: "transform .2s", cursor: "pointer", border: 0, background: "transparent", padding: 0 }}><WaxSeal agent={id} size={26} /></button>;
          })}
        </div>
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

      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: FONTS.handEn, fontSize: 16, color: TOKENS.gold }}>{filtered.length} kept</span>
        <span style={{ fontFamily: FONTS.serifCn, fontSize: 10, color: TOKENS.inkFaint, letterSpacing: 3 }}>· 已收 {filtered.length} 件 · 装满了不会溢出</span>
      </div>

      {error && <div style={{ margin: "10px 20px 0", padding: "8px 10px", border: `0.5px solid ${TOKENS.rule}`, borderRadius: 6, background: TOKENS.cream, color: TOKENS.inkSoft, fontFamily: FONTS.serifCn, fontSize: 11 }}>{error}</div>}
      {!loaded && <div style={{ padding: 20, color: TOKENS.inkFaint, fontFamily: FONTS.serifCn, fontSize: 12 }}>翻匣子中...</div>}

      <div style={{ padding: "16px 20px 64px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        {columns.map((column, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1, marginTop: index ? 22 : 0 }}>
            {column.map((item) => <CurioCard key={item.id} item={item} onOpen={openItem} />)}
          </div>
        ))}
      </div>

      <PreviewModal item={active} onClose={() => setActive(null)} onTogglePin={togglePin} onToggleSurprise={toggleSurprise} />
    </main>
  );
}
