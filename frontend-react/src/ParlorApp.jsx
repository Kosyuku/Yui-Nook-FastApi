import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "./apiBase.js";

const T = {
  paper: "#FBF7F2",
  paperDeep: "#F3ECE2",
  cream: "#FFFBF4",
  ink: "#2B2420",
  inkSoft: "#6B5F58",
  inkFaint: "#A89C93",
  rule: "rgba(120,90,70,.12)",
  gold: "#B08458",
  ember: "#D8783C",
  rose: "#F5D6D1",
  sage: "#D9E0D0",
  mauve: "#E8D4DE",
  butter: "#F1E4BD",
};

const F = {
  cn: '"Noto Serif SC", "Source Han Serif CN", "Songti SC", serif',
  en: '"DM Serif Display", "Cormorant Garamond", Georgia, serif',
  display: '"Pinyon Script", "Allura", cursive',
  hand: '"Caveat", "Ma Shan Zheng", cursive',
};

function ParlorGlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Allura&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+SC:wght@400;500;600;700&family=Ma+Shan+Zheng&display=swap');
      @keyframes parlor-screen-in {
        from { opacity: 0; transform: translateY(10px) scale(.992); filter: blur(2px); }
        to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      @keyframes parlor-press {
        0% { transform: scale(1); }
        50% { transform: scale(.96); }
        100% { transform: scale(1); }
      }
      .parlor-screen-enter { animation: parlor-screen-in .32s cubic-bezier(.2,.7,.2,1) both; }
      .parlor-button-press:active { animation: parlor-press .18s ease-out; }
    `}</style>
  );
}

const ROLES = {
  azheng: { display: "沈筭", stamp: "筭", role: "暖意型 · 先共情后给意见", model: "claude-sonnet-4", provider: "anthropic", seal: "#B84A3E", tint: T.rose },
  zhansi: { display: "湛司", stamp: "湛", role: "理性型 · 先算清账", model: "gpt-4o", provider: "openai", seal: "#5B7A6A", tint: T.sage },
  ayan: { display: "阿砚", stamp: "砚", role: "诗意型 · 总能换一种说法", model: "gemini-2.0-flash", provider: "google", seal: "#8B6788", tint: T.mauve },
  asi: { display: "阿斯", stamp: "斯", role: "务实型 · 先去做再说", model: "deepseek-v3", provider: "deepseek", seal: "#B08458", tint: T.butter },
};

const fallbackAgentOptions = Object.entries(ROLES).map(([agent_id, role]) => ({
  agent_id,
  display_name: role.display,
  role: role.role,
  model: role.model,
  provider: role.provider,
  stamp: role.stamp,
  seal: role.seal,
  tint: role.tint,
  isFallback: true,
}));

const palette = [T.rose, T.sage, T.mauve, T.butter, "#DDD6E6", "#F4DCC4"];
const sealPalette = ["#B84A3E", "#5B7A6A", "#8B6788", "#B08458", "#7E6A9A", "#B86E4B"];

function normalizeAgentOption(agent, index = 0) {
  const fallback = fallbackAgentOptions[index % fallbackAgentOptions.length] || fallbackAgentOptions[0];
  const metadata = agent?.metadata && typeof agent.metadata === "object" ? agent.metadata : {};
  const agentId = String(agent?.agent_id || agent?.id || "").trim();
  const display = String(agent?.display_name || agent?.name || agentId || fallback.display_name).trim();
  return {
    agent_id: agentId || fallback.agent_id,
    display_name: display,
    role: String(agent?.description || agent?.persona || fallback.role || "").trim(),
    model: String(metadata.model || agent?.model || fallback.model || "").trim(),
    provider: String(metadata.provider || agent?.provider || agent?.source || fallback.provider || "").trim(),
    stamp: String(metadata.stamp || display.slice(0, 1) || fallback.stamp).trim(),
    seal: String(metadata.seal || metadata.sealColor || sealPalette[index % sealPalette.length] || fallback.seal).trim(),
    tint: String(metadata.tint || palette[index % palette.length] || fallback.tint).trim(),
    avatar: agent?.avatar || "",
    isFallback: false,
  };
}

const demoRound = {
  id: "demo",
  title: "我是不是该辞职去开一家小店",
  description: "上班第六年 · 今晚突然又冒出来这个念头",
  status: "active",
  mode: "free",
  auto_mode: "manual",
  created_at: "今晚 21:34",
  new_turns: 5,
  seats: Object.entries(ROLES).map(([agent_id, role], index) => ({
    id: `demo-${agent_id}`,
    agent_id,
    display_name: role.display,
    color: role.tint,
    seat_order: index,
  })),
  turns: [
    { id: "d0", turn_number: 0, agent_id: "user", content: "我想辞职。开个小店。卖什么都行。", is_user: true },
    { id: "d1", turn_number: 1, agent_id: "azheng", content: "你最近是不是又被堆叠的会议磨到了。这个念头不是凭空来的，先别急着否定它。", is_user: false },
    { id: "d2", turn_number: 2, agent_id: "zhansi", content: "冷静一下：开店头一年大概率不赚钱。你需要至少能撑十八个月的现金。", is_user: false },
    { id: "d3", turn_number: 3, agent_id: "ayan", content: "小店不一定是一家店。它可能是一个允许你慢下来的地方。先问这个，不是 SKU。", is_user: false },
    { id: "d4", turn_number: 4, agent_id: "asi", content: "别想了。这周末去摆一次集市。两小时之内你就会知道你是想开店，还是只想下班。", is_user: false },
  ],
  currentSpeaker: "ayan",
};

const demoEnded = {
  ...demoRound,
  id: "demo-ended",
  title: "冬至到底要不要吃饺子",
  description: "北方人和南方人的世纪和解",
  status: "ended",
  created_at: "12 · 21 晚",
  updated_at: "当晚 23:48",
  summary: {
    turns: 24,
    last_turn: "吃。但不一定是饺子。是特意为自己做点什么。",
    ended_at: "当晚 23:48",
  },
};

const demoPaused = {
  ...demoRound,
  id: "demo-paused",
  title: "深夜，要不要回那条迟到的消息",
  description: "前同事问我一个项目意见",
  status: "paused",
  created_at: "昨天 23:11",
  turns: demoRound.turns.slice(0, 3),
};

function normalizeSeat(seat, index = 0) {
  const agentId = seat?.agent_id || seat?.agent || "azheng";
  const role = ROLES[agentId] || ROLES.azheng;
  return {
    ...seat,
    id: seat?.id || `${agentId}-${index}`,
    agent_id: agentId,
    display_name: seat?.display_name || seat?.display || role.display,
    color: seat?.color || role.tint,
    seat_order: Number(seat?.seat_order ?? seat?.order ?? index),
  };
}

function normalizeTurn(turn, index = 0) {
  const agentId = turn?.agent_id || turn?.agent || "user";
  return {
    ...turn,
    id: turn?.id || `${agentId}-${index}`,
    turn_number: Number(turn?.turn_number ?? turn?.n ?? index),
    agent_id: agentId,
    content: turn?.content || turn?.text || "",
    is_user: Boolean(turn?.is_user ?? agentId === "user"),
  };
}

function normalizeRound(row) {
  const seats = (Array.isArray(row?.seats) && row.seats.length ? row.seats : demoRound.seats)
    .map(normalizeSeat)
    .sort((a, b) => a.seat_order - b.seat_order);
  const turns = (Array.isArray(row?.turns) ? row.turns : [])
    .map(normalizeTurn)
    .sort((a, b) => a.turn_number - b.turn_number);
  return {
    ...row,
    title: row?.title || "未命名围炉",
    description: row?.description || row?.desc || "",
    status: row?.status || "active",
    seats,
    turns,
    turns_count: Number(row?.turns_count ?? row?.turnsCount ?? turns.length),
    new_turns: Number(row?.new_turns ?? row?.newTurns ?? 0),
  };
}

function WaxSeal({ agentId, size = 30, option = null }) {
  const role = ROLES[agentId] || ROLES.azheng;
  const label = option?.display_name || role.display || agentId || "";
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: option?.seal || role.seal,
      color: T.cream,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: F.cn,
      fontSize: size * 0.42,
      fontWeight: 600,
      boxShadow: "inset 0 -1px 2px rgba(0,0,0,.28), 0 2px 5px rgba(40,30,20,.16)",
    }}>{option?.stamp || role.stamp || label.slice(0, 1)}</div>
  );
}

function Hearth({ size = 32, intense = true }) {
  const box = size + 16;
  return (
    <div style={{ width: box, height: size + 12, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`
        @keyframes parlor-ember{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.08);opacity:1}}
        @keyframes parlor-flicker{0%,100%{opacity:.85;filter:blur(2px)}50%{opacity:1;filter:blur(.5px)}}
        @keyframes parlor-flame{0%,100%{transform:scaleY(1) scaleX(1)}45%{transform:scaleY(.96) scaleX(1.04)}75%{transform:scaleY(1.04) scaleX(.98)}}
        @keyframes parlor-glow{0%,100%{box-shadow:0 0 0 0 rgba(216,120,60,.4)}55%{box-shadow:0 0 0 4px rgba(216,120,60,.18),0 0 22px 8px rgba(216,120,60,.35)}}
        @keyframes parlor-typing{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}
        @keyframes parlor-spark{0%{opacity:0;transform:translate(-50%,0) scale(.4)}30%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx,0px)),-20px) scale(1.4)}}
      `}</style>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 55%, rgba(216,120,60,.50) 0%, rgba(216,120,60,.18) 42%, transparent 72%)",
        borderRadius: "50%",
        animation: intense ? "parlor-flicker 2.4s ease-in-out infinite" : "none",
      }} />
      {intense && [-6, 5, -2, 8].map((dx, i) => (
        <div key={i} style={{
          position: "absolute",
          left: "50%",
          bottom: "55%",
          width: 2.4,
          height: 2.4,
          borderRadius: "50%",
          background: "#FFE9A6",
          boxShadow: "0 0 4px #FFCE7A",
          "--dx": `${dx}px`,
          animation: `parlor-spark 2.4s ${i * 0.55}s ease-out infinite`,
        }} />
      ))}
      <svg width={box - 4} height={size + 8} viewBox="0 0 48 44" style={{ position: "relative", zIndex: 2 }}>
        <line x1="6" y1="35" x2="42" y2="33" stroke="#3D1F0F" strokeWidth="4" strokeLinecap="round" />
        <line x1="6" y1="38" x2="42" y2="40" stroke="#5A2E18" strokeWidth="4" strokeLinecap="round" />
        <circle cx="14" cy="36" r="1.4" fill="#FF7A2E" />
        <circle cx="32" cy="36" r="1.3" fill="#FFA452" />
        <g style={{ transformOrigin: "24px 32px", animation: intense ? "parlor-flame 1.6s ease-in-out infinite" : "none" }}>
          <path d="M24 7 Q32 10 36 17 Q40 23 38 28 Q36 33 24 33 Q12 33 10 28 Q8 23 12 17 Q16 10 24 7Z" fill="#E89A3E" opacity=".88" />
          <path d="M24 13 Q29 15 32 20 Q34 25 32 29 Q30 32 24 32 Q18 32 16 29 Q14 25 16 20 Q19 15 24 13Z" fill="#FFB04A" />
          <ellipse cx="24" cy="26" rx="3.2" ry="4.2" fill="#FFE9A6" />
        </g>
      </svg>
    </div>
  );
}

function IconButton({ children, title, onClick }) {
  return (
    <button type="button" title={title} onClick={onClick} className="parlor-button-press" style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "none",
      background: "transparent",
      color: T.inkSoft,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    }}>{children}</button>
  );
}

function Chip({ label, emphasis, onClick }) {
  return (
    <button type="button" onClick={onClick} className="parlor-button-press" style={{
      fontFamily: F.cn,
      fontSize: 10,
      letterSpacing: 1.5,
      padding: "5px 11px",
      borderRadius: 999,
      background: emphasis ? `${T.ember}18` : T.cream,
      border: `0.5px solid ${emphasis ? `${T.ember}55` : T.rule}`,
      color: emphasis ? T.ember : T.inkSoft,
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

function TopicBar({ round, onBack, onSummary, onMore }) {
  const statusMap = {
    active: { color: T.ember, label: "进行中" },
    paused: { color: T.inkFaint, label: "暂停" },
    ended: { color: T.gold, label: "已散席" },
  };
  const status = statusMap[round.status] || statusMap.active;
  return (
    <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 8, borderBottom: `0.5px solid ${T.rule}` }}>
      <button type="button" onClick={onBack} style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "5px 9px 5px 7px",
        borderRadius: 999,
        background: "transparent",
        border: `0.5px solid ${T.rule}`,
        color: T.inkSoft,
        cursor: "pointer",
      }}>
        <svg width="11" height="11" viewBox="0 0 12 12"><path d="M8 2 L4 6 L8 10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span style={{ fontFamily: F.cn, fontSize: 11, letterSpacing: 1.5 }}>离开</span>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: F.cn, fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: .5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{round.title}</div>
        <div style={{ fontFamily: F.en, fontStyle: "italic", fontSize: 11, fontWeight: 600, color: status.color, letterSpacing: .5, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: status.color, animation: round.status === "active" ? "parlor-ember 1.6s infinite" : "none" }} />
          {status.label}
        </div>
      </div>
      <IconButton title="纪要" onClick={onSummary}>☰</IconButton>
      <IconButton title="更多" onClick={onMore}>···</IconButton>
    </div>
  );
}

function SeatRing({ seats, currentSpeaker, includeUser = true }) {
  const positions = [
    { x: -110, y: 0 },
    { x: -42, y: -16 },
    { x: 42, y: -16 },
    { x: 110, y: 0 },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: 130, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
      <svg width="280" height="80" style={{ position: "absolute", bottom: 6, opacity: .5 }}>
        <path d="M10 60 Q140 -10 270 60" stroke={T.gold} strokeWidth=".6" strokeDasharray="2 4" fill="none" />
      </svg>
      <div style={{ position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)" }}><Hearth /></div>
      {seats.slice(0, 4).map((seat, i) => {
        const p = positions[i] || positions[3];
        const active = currentSpeaker === seat.agent_id;
        return (
          <div key={seat.id || seat.agent_id} style={{
            position: "absolute",
            left: "50%",
            top: 36,
            transform: `translate(calc(-50% + ${p.x}px), ${p.y + (active ? -6 : 0)}px)`,
            transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
            zIndex: active ? 3 : 1,
          }}>
            <div style={{ borderRadius: "50%", animation: active ? "parlor-glow 2.4s ease-in-out infinite" : "none" }}>
              <WaxSeal agentId={seat.agent_id} size={active ? 38 : 32} />
            </div>
            <div style={{ fontFamily: F.cn, fontSize: 9, color: active ? T.ink : T.inkFaint, letterSpacing: 1.5, textAlign: "center", marginTop: 5, fontWeight: active ? 600 : 400 }}>{seat.display_name}</div>
            {active && <div style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 700, fontSize: 12, color: T.ember, textAlign: "center", marginTop: -2 }}>speaking</div>}
          </div>
        );
      })}
      {includeUser && (
        <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.ink, color: T.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.cn, fontSize: 11, border: `1.5px solid ${T.cream}`, boxShadow: "0 2px 6px rgba(40,30,20,.2)" }}>你</div>
        </div>
      )}
    </div>
  );
}

function Bubble({ turn, color, typing = false }) {
  if (turn.is_user || turn.agent_id === "user") {
    return (
      <div style={{ alignSelf: "flex-end", maxWidth: "76%" }}>
        <div style={{ padding: "9px 14px", borderRadius: "14px 14px 4px 14px", background: T.ink, color: T.cream, fontFamily: F.cn, fontSize: 12.5, lineHeight: 1.75, letterSpacing: .5, whiteSpace: "pre-line" }}>{turn.content}</div>
      </div>
    );
  }
  const role = ROLES[turn.agent_id] || ROLES.azheng;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, maxWidth: "88%" }}>
      <div style={{ paddingTop: 2 }}><WaxSeal agentId={turn.agent_id} size={22} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 2, paddingLeft: 2 }}>{role.display}</div>
        <div style={{ padding: "9px 13px", borderRadius: "4px 14px 14px 14px", background: color || role.tint, color: T.ink, border: `0.5px solid rgba(120,90,70,.18)`, fontFamily: F.cn, fontSize: 12.5, lineHeight: 1.75, letterSpacing: .4, whiteSpace: "pre-line", boxShadow: "0 1px 3px rgba(80,50,30,.06)" }}>
          {typing ? <div style={{ display: "flex", gap: 4, padding: "2px 0" }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: T.inkSoft, animation: `parlor-typing 1.2s ${i * .15}s infinite` }} />)}</div> : turn.content}
        </div>
      </div>
    </div>
  );
}

function RoundCard({ round, onClick }) {
  const active = round.status === "active";
  const paused = round.status === "paused";
  return (
    <div onClick={onClick} style={{ background: T.cream, borderRadius: 7, border: `0.5px solid ${T.rule}`, padding: "12px 14px 13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(80,50,30,.06)", position: "relative", overflow: "hidden" }}>
      {active && <div style={{ position: "absolute", top: 10, right: 12, display: "flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 999, background: `${T.ember}22`, color: T.ember, fontFamily: F.en, fontStyle: "italic", fontWeight: 700, fontSize: 11 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: T.ember, animation: "parlor-ember 1.6s infinite" }} />live</div>}
      {active && round.new_turns > 0 && <div style={{ position: "absolute", top: 32, right: 12, padding: "2px 8px", borderRadius: 999, background: T.ember, color: T.cream, fontFamily: F.cn, fontSize: 10, boxShadow: `0 4px 10px ${T.ember}55` }}>+{round.new_turns} 条新对话</div>}
      {paused && <div style={{ position: "absolute", top: 10, right: 12, padding: "2px 8px", borderRadius: 999, background: T.paperDeep, color: T.inkFaint, fontFamily: F.en, fontStyle: "italic", fontWeight: 700, fontSize: 11 }}>paused</div>}
      <div style={{ fontFamily: F.cn, fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: .5, lineHeight: 1.4, paddingRight: 56 }}>{round.title}</div>
      <div style={{ fontFamily: F.cn, fontSize: 10.5, color: T.inkSoft, marginTop: 5, lineHeight: 1.6, letterSpacing: .3 }}>{round.description}</div>
      <div style={{ marginTop: 10, paddingTop: 9, borderTop: `0.5px solid ${T.rule}`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", position: "relative" }}>
          {round.seats.slice(0, 4).map((seat, i) => <div key={seat.id || i} style={{ marginLeft: i === 0 ? 0 : -7, position: "relative", zIndex: round.seats.length - i, boxShadow: `0 0 0 1.5px ${T.cream}`, borderRadius: "50%" }}><WaxSeal agentId={seat.agent_id} size={18} /></div>)}
        </div>
        <span style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 12, color: T.inkFaint }}>{round.turns_count || round.turns.length} turns</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: F.cn, fontSize: 9.5, color: T.inkFaint, letterSpacing: 1.5 }}>{round.updated_at || round.created_at || ""}</span>
      </div>
      {round.summary && <div style={{ marginTop: 8, padding: "6px 9px", background: T.paperDeep, borderRadius: 4, fontFamily: F.cn, fontSize: 10.5, color: T.inkSoft, lineHeight: 1.65, borderLeft: `2px solid ${T.ember}88` }}><span style={{ fontFamily: F.hand, fontSize: 11, color: T.ember, marginRight: 4 }}>纪：</span>{summaryText(round)}</div>}
    </div>
  );
}

function SectionLabel({ cn, en }) {
  return (
    <div style={{ margin: "18px 0 10px", display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontFamily: F.cn, fontSize: 12, fontWeight: 600, color: T.ink, letterSpacing: 2 }}>{cn}</span>
      <span style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 11, color: T.inkFaint }}>· {en}</span>
    </div>
  );
}

function Label({ num, cn, en, hint }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "18px 0 8px" }}>
      <span style={{ fontFamily: F.cn, fontSize: 11, color: T.ember, letterSpacing: 2 }}>· {num} ·</span>
      <span style={{ fontFamily: F.cn, fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: 1 }}>{cn}</span>
      <span style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 11, color: T.inkFaint }}>{en}</span>
      <div style={{ flex: 1 }} />
      {hint && <span style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 1 }}>{hint}</span>}
    </div>
  );
}

function ModeCard({ active, title, en, sub, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ flex: 1, textAlign: "left", padding: "10px 12px", borderRadius: 6, background: active ? T.cream : "transparent", border: active ? `0.5px solid ${T.ember}66` : `0.5px solid ${T.rule}`, display: "flex", flexDirection: "column", gap: 4, position: "relative", cursor: "pointer" }}>
      {active && <div style={{ position: "absolute", top: -8, right: 8, fontFamily: F.hand, fontSize: 13, color: T.ember, background: T.paper, padding: "0 5px" }}>· 默认</div>}
      <div style={{ fontFamily: F.cn, fontSize: 12.5, fontWeight: 600, color: T.ink, letterSpacing: 1 }}>{title}</div>
      <div style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 10.5, color: T.inkFaint }}>{en}</div>
      <div style={{ fontFamily: F.cn, fontSize: 9.5, color: T.inkSoft, lineHeight: 1.6, marginTop: 2 }}>{sub}</div>
    </button>
  );
}

function ScreenShell({ children, tone = "paper" }) {
  return (
    <main className="phone-scroll parlor-screen-enter" style={{
      width: "100%",
      height: "100%",
      background: tone === "summary" ? "#F1E9D8" : T.paper,
      backgroundImage: tone === "summary"
        ? "radial-gradient(ellipse 700px 500px at 50% 10%, rgba(255,235,200,.5), transparent), repeating-linear-gradient(90deg, transparent 0 28px, rgba(160,120,85,.04) 28px 29px)"
        : "radial-gradient(ellipse 600px 400px at 50% -5%, rgba(255,210,170,.3), transparent)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>{children}</main>
  );
}

function EmptyParlorState({ onCreate }) {
  return (
    <div style={{
      marginTop: 28,
      padding: "26px 18px",
      borderRadius: 7,
      border: `0.5px dashed ${T.gold}88`,
      background: "rgba(255,251,244,.65)",
      textAlign: "center",
    }}>
      <Hearth size={24} intense={false} />
      <div style={{ fontFamily: F.cn, fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: 1, marginTop: 8 }}>还没有围炉</div>
      <div style={{ fontFamily: F.cn, fontSize: 11, color: T.inkSoft, lineHeight: 1.8, margin: "6px 0 14px" }}>真数据为空时不会塞假卡片。想开一场就请火。</div>
      <button type="button" onClick={onCreate} className="parlor-button-press" style={{ padding: "9px 16px", borderRadius: 999, background: T.ink, color: T.cream, border: "none", fontFamily: F.cn, fontSize: 12, letterSpacing: 2, cursor: "pointer" }}>+ 新围炉</button>
    </div>
  );
}

function ListScreen({ rounds, onOpen, onCreate, usingDemo }) {
  const all = rounds;
  const active = all.filter((round) => round.status === "active");
  const paused = all.filter((round) => round.status === "paused");
  const ended = all.filter((round) => round.status === "ended");
  return (
    <ScreenShell>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 64, color: "#A98968", lineHeight: .9 }}>Parlor</div>
          <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 5, marginTop: 4 }}>围 · 炉</div>
        </div>
        <button type="button" onClick={onCreate} className="parlor-button-press" style={{ padding: "8px 14px", borderRadius: 999, background: T.ink, color: T.cream, border: "none", fontFamily: F.cn, fontSize: 11, letterSpacing: 2, cursor: "pointer" }}>+ 新围炉</button>
      </div>
      <div className="phone-scroll" style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        {usingDemo && (
          <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 999, background: `${T.ember}14`, color: T.ember, fontFamily: F.cn, fontSize: 10, letterSpacing: 1.2 }}>
            后端没回话，下面是样稿，不会入库
          </div>
        )}
        {!all.length && <EmptyParlorState onCreate={onCreate} />}
        {active.length > 0 && <><SectionLabel cn="正在围着" en="round in session · 还没散" /><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{active.map((round) => <RoundCard key={round.id} round={round} onClick={() => onOpen(round.id)} />)}</div></>}
        {paused.length > 0 && <><SectionLabel cn="先放着" en="paused" /><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{paused.map((round) => <RoundCard key={round.id} round={round} onClick={() => onOpen(round.id)} />)}</div></>}
        {ended.length > 0 && <><SectionLabel cn="已散席" en="closed" /><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{ended.map((round) => <RoundCard key={round.id} round={round} onClick={() => onOpen(round.id)} />)}</div></>}
      </div>
    </ScreenShell>
  );
}

function CreateScreen({ onCancel, onCreated, setError, agentOptions, agentsAreFallback }) {
  const [topic, setTopic] = useState("我是不是该辞职去开一家小店");
  const [picked, setPicked] = useState(() => agentOptions.slice(0, 4).map((agent) => agent.agent_id));
  const [mode, setMode] = useState("free");
  const [autoMode, setAutoMode] = useState("manual");
  const [maxTurns, setMaxTurns] = useState(20);
  const all = agentOptions.length ? agentOptions : fallbackAgentOptions;
  useEffect(() => {
    setPicked((current) => {
      const valid = current.filter((id) => all.some((agent) => agent.agent_id === id));
      return valid.length ? valid : all.slice(0, 4).map((agent) => agent.agent_id);
    });
  }, [all]);

  async function createRound() {
    const title = topic.trim();
    if (!title || picked.length === 0) return;
    const seats = picked.map((agent_id, index) => {
      const agent = all.find((item) => item.agent_id === agent_id) || fallbackAgentOptions[index % fallbackAgentOptions.length];
      return {
      agent_id,
      display_name: agent.display_name,
      model: agent.model,
      provider: agent.provider,
      system_prompt: agent.role,
      color: agent.tint,
      seat_order: index,
      };
    });
    const response = await fetch(apiUrl("/api/parlor/rounds"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: title, seats, opening: title, mode, auto_mode: autoMode, max_turns_per_session: maxTurns }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    onCreated(normalizeRound(data.round));
  }

  return (
    <ScreenShell>
      <div style={{ padding: "14px 20px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 56, color: "#A98968", lineHeight: .9 }}>new parlor</div>
          <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 5, marginTop: 4 }}>围 · 一点</div>
        </div>
        <button type="button" onClick={onCancel} className="parlor-button-press" style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 14, color: T.inkSoft, padding: 0 }}>取消</button>
      </div>
      <div className="phone-scroll" style={{ flex: 1, overflow: "auto", padding: "10px 20px 14px" }}>
        <Label num="一" cn="今天聊点什么" en="topic" />
        <textarea value={topic} onChange={(event) => setTopic(event.target.value.slice(0, 120))} data-plain-input="true" style={{ width: "100%", minHeight: 72, resize: "none", outline: "none", background: T.cream, borderRadius: 6, padding: "12px 14px", border: `0.5px solid ${T.rule}`, fontFamily: F.cn, fontSize: 13.5, color: T.ink, lineHeight: 1.6 }} />
        <div style={{ marginTop: 6, fontFamily: F.cn, fontSize: 10, color: T.inkFaint, lineHeight: 1.7 }}>可以补一两句背景 · 让大家不那么虚地聊</div>

        <Label num="二" cn="请谁来围炉" en="seats" hint={agentsAreFallback ? "agent 接口没回话 · 暂用样稿" : `已选 ${picked.length} 位`} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {all.map((agent) => {
            const id = agent.agent_id;
            const on = picked.includes(id);
            return (
              <button key={id} type="button" onClick={() => setPicked((current) => on ? current.filter((item) => item !== id) : [...current, id])} className="parlor-button-press" style={{ textAlign: "left", background: on ? T.cream : "transparent", border: `0.5px solid ${on ? "#B0845888" : T.rule}`, borderRadius: 6, padding: "10px 11px", display: "flex", flexDirection: "column", gap: 5, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <WaxSeal agentId={id} option={agent} size={26} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontFamily: F.cn, fontSize: 12, fontWeight: 600, color: T.ink, letterSpacing: 1 }}>{agent.display_name}</div>
                    <div style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 10, color: T.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agent.model || agent.provider || agent.agent_id}</div>
                  </div>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: on ? "none" : `1px solid ${T.rule}`, background: on ? T.ink : "transparent", color: T.cream, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{on && "✓"}</div>
                </div>
                <div style={{ fontFamily: F.cn, fontSize: 9.5, color: T.inkSoft, lineHeight: 1.5 }}>{agent.role || "没有角色备注"}</div>
              </button>
            );
          })}
        </div>

        <Label num="三" cn="怎么轮" en="mode" />
        <div style={{ display: "flex", gap: 8 }}>
          <ModeCard active={mode === "free"} onClick={() => setMode("free")} title="自由" en="free routing" sub="轻量模型判断谁接话 · 像真实对话" />
          <ModeCard active={mode === "round-robin"} onClick={() => setMode("round-robin")} title="轮询" en="round-robin" sub="按顺序每个人都说一次" />
        </div>

        <Label num="四" cn="什么时候让他们继续" en="auto mode" />
        <div style={{ background: T.cream, borderRadius: 6, padding: "10px 12px", border: `0.5px solid ${T.rule}`, display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["manual", "我说继续才继续"],
            ["interval-2h", "每 2 小时让他们自己聊一会儿"],
            ["interval-6h", "每 6 小时让他们自己聊一会儿"],
          ].map(([id, label]) => (
            <button type="button" key={id} onClick={() => setAutoMode(id)} className="parlor-button-press" style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${autoMode === id ? T.ink : T.inkFaint}`, background: autoMode === id ? T.ink : "transparent", boxShadow: autoMode === id ? `inset 0 0 0 3px ${T.cream}` : "none" }} />
              <span style={{ fontFamily: F.cn, fontSize: 12, color: T.ink, letterSpacing: .5 }}>{label}</span>
            </button>
          ))}
          <div style={{ marginTop: 6, paddingTop: 10, borderTop: `0.5px dashed ${T.rule}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: F.cn, fontSize: 12, color: T.ink }}>每场最大</span>
            <button type="button" onClick={() => setMaxTurns((value) => Math.max(4, value - 1))} style={stepperBtn}>−</button>
            <span style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 700, fontSize: 15, color: "#A98968", minWidth: 32, textAlign: "center" }}>{maxTurns}</span>
            <button type="button" onClick={() => setMaxTurns((value) => Math.min(60, value + 1))} style={stepperBtn}>+</button>
            <span style={{ fontFamily: F.cn, fontSize: 12, color: T.ink }}>条</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 20px 18px", background: T.paperDeep, borderTop: `0.5px solid ${T.rule}`, display: "flex", alignItems: "center", gap: 10 }}>
        <Hearth size={20} intense={false} />
        <span style={{ fontFamily: F.hand, fontSize: 15, color: T.ember }}>请火</span>
        <div style={{ flex: 1 }} />
        <button type="button" onClick={() => createRound().catch((err) => setError(err.message))} className="parlor-button-press" style={{ padding: "11px 22px", borderRadius: 999, background: T.ink, color: T.cream, border: "none", fontFamily: F.cn, fontSize: 13, letterSpacing: 3, cursor: "pointer" }}>开始围炉</button>
      </div>
    </ScreenShell>
  );
}

const stepperBtn = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: `0.5px solid ${T.rule}`,
  background: T.paperDeep,
  color: T.inkSoft,
  fontSize: 14,
  cursor: "pointer",
};

function RoomScreen({ round, onBack, onSummary, onRefresh, setError }) {
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [callIndex, setCallIndex] = useState(0);
  const currentSpeaker = thinking ? round.seats?.[0]?.agent_id : round.currentSpeaker;

  async function post(path, body) {
    if (round.id === "demo" || round.id?.startsWith("demo-")) return;
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(round.id)}/${path}`), {
      method: "POST",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error(await response.text());
    await onRefresh(round.id);
  }

  async function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    await post("speak", { content: text });
  }

  async function next() {
    setThinking(true);
    try {
      await post("next", {});
    } finally {
      setThinking(false);
    }
  }

  async function callSeat() {
    const seats = round.seats || [];
    if (!seats.length) return;
    const seat = seats[callIndex % seats.length];
    setCallIndex((value) => value + 1);
    setThinking(true);
    try {
      await post("next", { force_seat_id: seat.id });
    } finally {
      setThinking(false);
    }
  }

  return (
    <ScreenShell>
      <TopicBar round={round} onBack={onBack} onSummary={onSummary} onMore={() => setError("更多设置会跟席位编辑一起接上。")} />
      <SeatRing seats={round.seats} currentSpeaker={currentSpeaker} />
      <div className="phone-scroll" style={{ flex: 1, padding: "14px 16px 12px", display: "flex", flexDirection: "column", gap: 12, overflow: "auto", borderTop: `0.5px dashed ${T.rule}`, background: "linear-gradient(180deg, transparent 0%, rgba(243,236,226,.4) 100%)", marginTop: 6 }}>
        {round.turns.slice(-80).map((turn) => <Bubble key={turn.id || turn.turn_number} turn={turn} color={round.seats.find((seat) => seat.agent_id === turn.agent_id)?.color} />)}
        {thinking && <Bubble turn={{ agent_id: round.seats?.[0]?.agent_id || "azheng", content: "" }} color={round.seats?.[0]?.color} typing />}
      </div>
      <div style={{ padding: "8px 12px 14px", background: T.paperDeep, borderTop: `0.5px solid ${T.rule}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 6, paddingLeft: 2 }}>
          <Chip label="醒醒" onClick={() => next().catch((err) => setError(err.message))} />
          <Chip label="点名 ▾" onClick={() => callSeat().catch((err) => setError(err.message))} />
          <Chip label={round.status === "paused" ? "继续" : "暂停"} onClick={() => post(round.status === "paused" ? "resume" : "pause").catch((err) => setError(err.message))} />
          <div style={{ flex: 1 }} />
          <Chip label="结束 · 出纪要" emphasis onClick={() => post("end").then(onSummary).catch((err) => setError(err.message))} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") send().catch((err) => setError(err.message)); }} placeholder="插一句...（直接打断当前讨论）" data-plain-input="true" style={{ flex: 1, padding: "10px 14px", borderRadius: 999, background: T.cream, border: `0.5px solid ${T.rule}`, fontFamily: F.cn, fontSize: 12, color: T.ink, outline: "none" }} />
          <button type="button" onClick={() => send().catch((err) => setError(err.message))} className="parlor-button-press" style={{ width: 38, height: 38, borderRadius: "50%", background: T.ink, color: T.cream, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20"><path d="M10 5 L10 16 M6 9 L10 5 L14 9" stroke={T.cream} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}

function ComeBackScreen({ round, onBack, onRoom }) {
  const lastSeen = Number(round.last_viewed_turn_n || Math.max(0, round.turns.length - 4));
  const tail = round.turns.filter((turn) => turn.turn_number >= lastSeen);
  return (
    <ScreenShell>
      <TopicBar round={round} onBack={onBack} onSummary={onRoom} onMore={() => onRoom()} />
      <SeatRing seats={round.seats} currentSpeaker={null} />
      <div className="phone-scroll" style={{ flex: 1, padding: "14px 16px 12px", display: "flex", flexDirection: "column", gap: 12, overflow: "auto", borderTop: `0.5px dashed ${T.rule}`, background: "linear-gradient(180deg, transparent 0%, rgba(243,236,226,.4) 100%)", marginTop: 6 }}>
        <div style={{ alignSelf: "center", padding: "5px 12px", borderRadius: 999, background: `${T.ember}18`, border: `0.5px solid ${T.ember}55`, display: "flex", alignItems: "center", gap: 6, animation: "parlor-glow 2.4s ease-in-out infinite" }}>
          <span style={{ fontFamily: F.hand, fontSize: 15, color: T.ember }}>welcome back</span>
          <span style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 2 }}>· 你不在的时候，他们自己聊了 {Math.max(0, tail.length - 1)} 条</span>
        </div>
        {tail.slice(0, 1).map((turn) => <div key={turn.id} style={{ opacity: .55 }}><Bubble turn={turn} color={round.seats.find((seat) => seat.agent_id === turn.agent_id)?.color} /></div>)}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 4px" }}>
          <div style={{ flex: 1, height: .5, background: `${T.ember}55` }} />
          <span style={{ fontFamily: F.en, fontStyle: "italic", fontSize: 11, color: T.ember }}>you left · 你不在的时候</span>
          <div style={{ flex: 1, height: .5, background: `${T.ember}55` }} />
        </div>
        {tail.slice(-4).map((turn) => <Bubble key={turn.id || turn.turn_number} turn={turn} color={round.seats.find((seat) => seat.agent_id === turn.agent_id)?.color} />)}
      </div>
      <div style={{ padding: "10px 12px 16px", background: T.paperDeep, borderTop: `0.5px solid ${T.rule}` }}>
        <button type="button" onClick={onRoom} className="parlor-button-press" style={{ width: "100%", padding: "11px", borderRadius: 999, background: T.ink, color: T.cream, border: "none", fontFamily: F.cn, fontSize: 13, letterSpacing: 2, cursor: "pointer" }}>回到围炉</button>
      </div>
    </ScreenShell>
  );
}

function summaryText(round) {
  if (!round?.summary) return "";
  if (typeof round.summary === "string") return round.summary;
  return round.summary.last_turn || round.summary.conclusion || `${round.summary.turns || round.turns_count || 0} 条发言`;
}

function SummaryScreen({ round, onBack, onNotice }) {
  const seats = round.seats || [];
  const bullets = seats.slice(0, 3).map((seat) => {
    const last = [...round.turns].reverse().find((turn) => turn.agent_id === seat.agent_id);
    return { agent_id: seat.agent_id, text: last?.content || "这一席没有留下长句，只在火边点了点头。" };
  });
  return (
    <ScreenShell tone="summary">
      <div style={{ padding: "12px 18px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: `0.5px solid ${T.rule}` }}>
        <IconButton title="返回" onClick={onBack}>‹</IconButton>
        <span style={{ fontFamily: F.display, fontSize: 26, color: "#A98968" }}>· minutes ·</span>
        <div style={{ flex: 1 }} />
        <IconButton title="分享" onClick={() => {
          const text = `${round.title}\n${summaryText(round) || ""}`;
          navigator.clipboard?.writeText(text).then(
            () => onNotice("纪要已复制。"),
            () => onNotice("当前环境不能写剪贴板。")
          );
        }}>↗</IconButton>
      </div>
      <div className="phone-scroll" style={{ flex: 1, overflow: "auto", padding: "22px 22px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: F.hand, fontSize: 18, color: T.ember }}>parlor minutes</div>
          <div style={{ fontFamily: F.cn, fontSize: 18, fontWeight: 600, color: T.ink, letterSpacing: 1.5, marginTop: 6, lineHeight: 1.5 }}>{round.title}</div>
          <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 2, marginTop: 6 }}>{round.created_at || ""} - {round.updated_at || ""} · 共 {round.turns_count || round.turns.length} 轮</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Hearth size={20} intense={false} /></div>
        <div style={{ padding: "14px 0", borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`, display: "flex", flexDirection: "column", gap: 14 }}>
          {bullets.map((item) => {
            const role = ROLES[item.agent_id] || ROLES.azheng;
            return (
              <div key={item.agent_id} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <WaxSeal agentId={item.agent_id} size={22} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.cn, fontSize: 10.5, color: T.inkSoft, letterSpacing: 2, marginBottom: 3 }}>{role.display} 说</div>
                  <div style={{ fontFamily: F.cn, fontSize: 12, color: T.ink, letterSpacing: .4, lineHeight: 1.8 }}>{item.text}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ margin: "20px 0 14px", padding: "14px 16px", background: "rgba(255,250,235,.7)", border: `0.5px dashed ${T.ember}66`, borderRadius: 4, position: "relative" }}>
          <div style={{ position: "absolute", top: -8, left: 14, fontFamily: F.hand, fontSize: 13, color: T.ember, background: "#F1E9D8", padding: "0 6px" }}>· 一句话 ·</div>
          <div style={{ fontFamily: F.cn, fontSize: 13, color: T.ink, letterSpacing: .5, lineHeight: 1.8 }}>{summaryText(round) || "这场围炉还没写下结论。"}</div>
        </div>
        <div style={{ marginTop: 26, paddingTop: 18, borderTop: `0.5px solid ${T.rule}` }}>
          <div style={{ fontFamily: F.hand, fontSize: 13, color: T.inkSoft, marginBottom: 10 }}>· 在座者签名 ·</div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
            {seats.map((seat) => {
              const role = ROLES[seat.agent_id] || ROLES.azheng;
              const spoke = round.turns.filter((turn) => turn.agent_id === seat.agent_id).length;
              return (
                <div key={seat.id || seat.agent_id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontFamily: F.hand, fontSize: 22, color: T.ink, transform: `rotate(${(seat.agent_id.charCodeAt(0) % 5 - 2) * 2}deg)` }}>{role.display}</div>
                  <WaxSeal agentId={seat.agent_id} size={20} />
                  <div style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 10, color: T.inkFaint }}>spoke {spoke}x</div>
                </div>
              );
            })}
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontFamily: F.hand, fontSize: 22, color: T.ink, transform: "rotate(-3deg)" }}>你</div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.ink, color: T.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.cn, fontSize: 10 }}>·</div>
              <div style={{ fontFamily: F.en, fontStyle: "italic", fontWeight: 600, fontSize: 10, color: T.inkFaint }}>host</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 18px 18px", display: "flex", gap: 8, borderTop: `0.5px solid ${T.rule}`, background: "rgba(241,233,216,.85)" }}>
        <button type="button" onClick={() => onNotice("Amber 写入接口还没开，我先保留入口，不假装成功。")} className="parlor-button-press" style={{ flex: 1, padding: 10, borderRadius: 999, background: T.ink, color: T.cream, border: "none", fontFamily: F.cn, fontSize: 12, letterSpacing: 2 }}>存入 Amber 记忆</button>
        <button type="button" onClick={onBack} className="parlor-button-press" style={{ padding: "10px 16px", borderRadius: 999, background: "transparent", color: T.inkSoft, border: `0.5px solid ${T.rule}`, fontFamily: F.cn, fontSize: 11, letterSpacing: 1.5 }}>下次再开</button>
      </div>
    </ScreenShell>
  );
}

export default function ParlorApp() {
  const [rounds, setRounds] = useState([]);
  const [usingDemo, setUsingDemo] = useState(false);
  const [agentOptions, setAgentOptions] = useState(fallbackAgentOptions);
  const [agentsAreFallback, setAgentsAreFallback] = useState(true);
  const [view, setView] = useState("list");
  const [activeId, setActiveId] = useState("");
  const [error, setError] = useState("");

  const active = useMemo(() => normalizeRound(rounds.find((round) => round.id === activeId) || rounds[0] || demoRound), [rounds, activeId]);

  async function refreshActive(id = activeId) {
    if (!id || id.startsWith("demo")) return;
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(id)}`));
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    const round = normalizeRound(data.round);
    setRounds((current) => current.map((item) => item.id === id ? round : item));
  }

  async function loadRounds() {
    setError("");
    try {
      const response = await fetch(apiUrl("/api/parlor/rounds?limit=50"));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const rows = Array.isArray(data.items) ? data.items : Array.isArray(data.rounds) ? data.rounds : [];
      const next = rows.map(normalizeRound);
      setRounds(next);
      setUsingDemo(false);
      setActiveId((current) => current || next[0]?.id || "");
    } catch (err) {
      setRounds([demoRound, demoPaused, demoEnded].map(normalizeRound));
      setUsingDemo(true);
      setError(`Parlor 后端没回话，先给你看样稿：${err.message}`);
    }
  }

  async function loadAgents() {
    try {
      const response = await fetch(apiUrl("/api/agents?include_inactive=false"));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const rows = Array.isArray(data.agents) ? data.agents : [];
      const next = rows.map(normalizeAgentOption).filter((agent) => agent.agent_id);
      if (next.length) {
        setAgentOptions(next);
        setAgentsAreFallback(false);
      } else {
        setAgentOptions(fallbackAgentOptions);
        setAgentsAreFallback(true);
      }
    } catch (err) {
      setAgentOptions(fallbackAgentOptions);
      setAgentsAreFallback(true);
      setError(`Agent 列表没拉到，邀请页暂用样稿：${err.message}`);
    }
  }

  useEffect(() => {
    loadRounds();
    loadAgents();
  }, []);

  function openRound(id) {
    setActiveId(id);
    const round = rounds.find((item) => item.id === id);
    setView(round?.left_at && round.new_turns > 0 ? "comeback" : "room");
    refreshActive(id).catch((err) => setError(err.message));
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ParlorGlobalStyle />
      {view === "create" ? (
        <CreateScreen
          onCancel={() => setView("list")}
          agentOptions={agentOptions}
          agentsAreFallback={agentsAreFallback}
          setError={setError}
          onCreated={(round) => {
            setRounds((current) => [round, ...current.filter((item) => !item.id.startsWith("demo"))]);
            setActiveId(round.id);
            setView("room");
          }}
        />
      ) : view === "summary" ? (
        <SummaryScreen round={active} onBack={() => setView(active.status === "ended" ? "list" : "room")} onNotice={setError} />
      ) : view === "comeback" ? (
        <ComeBackScreen round={active} onBack={() => setView("list")} onRoom={() => setView("room")} />
      ) : view === "room" ? (
        <RoomScreen round={active} onBack={() => setView("list")} onSummary={() => setView("summary")} onRefresh={refreshActive} setError={setError} />
      ) : (
        <ListScreen rounds={rounds} usingDemo={usingDemo} onOpen={openRound} onCreate={() => setView("create")} />
      )}
      {error && (
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 18, padding: "8px 11px", borderRadius: 10, background: T.cream, border: `0.5px solid ${T.rule}`, color: T.inkSoft, fontFamily: F.cn, fontSize: 11, boxShadow: "0 8px 24px rgba(80,50,30,.12)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
