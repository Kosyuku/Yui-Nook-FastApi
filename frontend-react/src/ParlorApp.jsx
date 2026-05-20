import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "./apiBase.js";

const T = {
  paper: "#FBF7F2",
  paperDeep: "#F3ECE2",
  cream: "#FFFBF4",
  ink: "#2B2420",
  inkSoft: "#6B5F58",
  inkFaint: "#A89C93",
  rule: "rgba(120,90,70,.14)",
  gold: "#B08458",
  ember: "#D8783C",
};

const F = {
  cn: '"Noto Serif SC", "Source Han Serif CN", "Songti SC", serif',
  en: '"Cormorant Garamond", "DM Serif Display", Georgia, serif',
  hand: '"Caveat", "Pinyon Script", cursive',
};

const AGENTS = {
  azheng: { name: "沈筝", stamp: "筝", seal: "#B84A3E", tint: "#F5D6D1", model: "claude-sonnet-4", provider: "anthropic" },
  zhansi: { name: "湛司", stamp: "湛", seal: "#5B7A6A", tint: "#D9E0D0", model: "gpt-4o", provider: "openai" },
  ayan: { name: "阿砚", stamp: "砚", seal: "#8B6788", tint: "#E8D4DE", model: "gemini-2.0-flash", provider: "google" },
  asi: { name: "阿斯", stamp: "斯", seal: "#B08458", tint: "#F1E4BD", model: "deepseek-v3", provider: "deepseek" },
};

const fallbackRound = {
  id: "demo",
  title: "我是不是该辞职去开一家小店",
  description: "上班第六年，今晚又冒出来的念头",
  status: "active",
  seats: Object.entries(AGENTS).map(([agent_id, agent], index) => ({
    id: `demo-${agent_id}`,
    agent_id,
    display_name: agent.name,
    color: agent.tint,
    seat_order: index,
  })),
  turns: [
    { id: "d0", turn_number: 0, agent_id: "user", content: "我想辞职。开个小店。卖什么都行。", is_user: true },
    { id: "d1", turn_number: 1, agent_id: "azheng", content: "先别急着否定它。这个念头不是空穴来风，是你被会议和日程磨得太久了。", is_user: false },
    { id: "d2", turn_number: 2, agent_id: "zhansi", content: "冷静算账：第一年大概率不赚钱。你需要至少能撑十八个月的现金。", is_user: false },
    { id: "d3", turn_number: 3, agent_id: "ayan", content: "小店也许不是小店，是一个允许你慢下来的地方。先问这个。", is_user: false },
  ],
};

function normalizeRound(row) {
  const seats = Array.isArray(row?.seats) ? row.seats : [];
  const turns = Array.isArray(row?.turns) ? row.turns : [];
  return {
    ...row,
    description: row?.description || row?.desc || "",
    seats: seats.map((seat, index) => ({
      ...seat,
      agent_id: seat.agent_id || seat.agent || "azheng",
      display_name: seat.display_name || AGENTS[seat.agent_id]?.name || seat.agent_id,
      color: seat.color || AGENTS[seat.agent_id]?.tint || T.cream,
      seat_order: Number(seat.seat_order ?? seat.order ?? index),
    })).sort((a, b) => a.seat_order - b.seat_order),
    turns: turns.map((turn, index) => ({
      ...turn,
      turn_number: Number(turn.turn_number ?? turn.n ?? index),
      agent_id: turn.agent_id || turn.agent || "user",
      content: turn.content || turn.text || "",
      is_user: Boolean(turn.is_user ?? turn.agent_id === "user" ?? turn.agent === "user"),
    })).sort((a, b) => a.turn_number - b.turn_number),
  };
}

function WaxSeal({ agentId, size = 30 }) {
  const agent = AGENTS[agentId] || AGENTS.azheng;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: agent.seal, color: T.cream,
      display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.cn,
      fontSize: size * 0.42, fontWeight: 600, boxShadow: "inset 0 -1px 2px rgba(0,0,0,.28), 0 2px 5px rgba(40,30,20,.16)",
    }}>{agent.stamp}</div>
  );
}

function Hearth({ active }) {
  return (
    <div style={{ width: 58, height: 52, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`
        @keyframes parlor-flicker{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.08);opacity:1}}
        @keyframes parlor-spark{0%{opacity:0;transform:translateY(0)}35%{opacity:1}100%{opacity:0;transform:translateY(-22px)}}
      `}</style>
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 70%, rgba(216,120,60,.45), rgba(216,120,60,.12) 45%, transparent 72%)",
        animation: active ? "parlor-flicker 2.2s infinite" : "none",
      }} />
      {active && [0, 1, 2].map((i) => <span key={i} style={{
        position: "absolute", bottom: 25, left: 20 + i * 8, width: 3, height: 3, borderRadius: "50%",
        background: "#FFE9A6", animation: `parlor-spark 2s ${i * .35}s infinite`,
      }} />)}
      <svg width="48" height="44" viewBox="0 0 48 44" style={{ position: "relative" }}>
        <line x1="7" y1="36" x2="41" y2="33" stroke="#4B2612" strokeWidth="4" strokeLinecap="round" />
        <line x1="8" y1="39" x2="40" y2="40" stroke="#6A351B" strokeWidth="4" strokeLinecap="round" />
        <path d="M24 7 Q38 15 37 27 Q36 35 24 35 Q12 35 11 27 Q10 15 24 7Z" fill="#E89A3E" />
        <path d="M24 14 Q32 20 31 29 Q30 34 24 34 Q18 34 17 29 Q16 20 24 14Z" fill="#FFB04A" />
        <ellipse cx="24" cy="27" rx="3.4" ry="5" fill="#FFE9A6" />
      </svg>
    </div>
  );
}

function SeatRing({ round, speaking }) {
  const seats = round.seats || [];
  const positions = [-120, -44, 44, 120];
  return (
    <div style={{ height: 130, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
      <svg width="292" height="82" style={{ position: "absolute", bottom: 6, opacity: .55 }}>
        <path d="M10 60 Q146 -10 282 60" stroke={T.gold} strokeWidth=".6" strokeDasharray="2 4" fill="none" />
      </svg>
      <div style={{ position: "absolute", top: 28 }}><Hearth active={round.status === "active" && speaking} /></div>
      {seats.map((seat, index) => {
        const id = seat.agent_id;
        const active = speaking === id;
        return (
          <div key={seat.id || id} style={{
            position: "absolute", left: "50%", top: 38,
            transform: `translate(calc(-50% + ${positions[index] ?? 0}px), ${active ? -8 : 0}px)`,
            transition: "transform .35s cubic-bezier(.2,.7,.2,1)", textAlign: "center",
          }}>
            <WaxSeal agentId={id} size={active ? 38 : 32} />
            <div style={{ marginTop: 5, fontFamily: F.cn, fontSize: 9, letterSpacing: 1.5, color: active ? T.ink : T.inkFaint, fontWeight: active ? 600 : 400 }}>{seat.display_name}</div>
            {active && <div style={{ fontFamily: F.en, fontStyle: "italic", fontSize: 12, color: T.ember }}>speaking</div>}
          </div>
        );
      })}
      <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.ink, color: T.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.cn, fontSize: 11 }}>你</div>
      </div>
    </div>
  );
}

function Bubble({ turn, color }) {
  if (turn.is_user || turn.agent_id === "user") {
    return <div style={{ alignSelf: "flex-end", maxWidth: "76%", padding: "9px 14px", borderRadius: "14px 14px 4px 14px", background: T.ink, color: T.cream, fontFamily: F.cn, fontSize: 12.5, lineHeight: 1.75, whiteSpace: "pre-line" }}>{turn.content}</div>;
  }
  const agent = AGENTS[turn.agent_id] || AGENTS.azheng;
  return (
    <div style={{ display: "flex", gap: 7, maxWidth: "88%" }}>
      <WaxSeal agentId={turn.agent_id} size={22} />
      <div>
        <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkSoft, letterSpacing: 2, marginBottom: 3 }}>{agent.name}</div>
        <div style={{ padding: "9px 13px", borderRadius: "4px 14px 14px 14px", background: color || agent.tint, border: `0.5px solid ${T.rule}`, fontFamily: F.cn, fontSize: 12.5, lineHeight: 1.75, whiteSpace: "pre-line", boxShadow: "0 1px 3px rgba(80,50,30,.06)" }}>{turn.content}</div>
      </div>
    </div>
  );
}

function Chip({ children, onClick, active }) {
  return <button type="button" onClick={onClick} style={{ border: `0.5px solid ${active ? T.ember : T.rule}`, background: active ? `${T.ember}18` : T.cream, color: active ? T.ember : T.inkSoft, borderRadius: 999, padding: "5px 9px", fontFamily: F.cn, fontSize: 10, letterSpacing: 1.3, cursor: "pointer" }}>{children}</button>;
}

export default function ParlorApp() {
  const [rounds, setRounds] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [draft, setDraft] = useState("");
  const [creating, setCreating] = useState(false);
  const [topic, setTopic] = useState("");
  const [speaking, setSpeaking] = useState("");
  const [error, setError] = useState("");

  const active = useMemo(() => normalizeRound(rounds.find((round) => round.id === activeId) || rounds[0] || fallbackRound), [rounds, activeId]);

  async function loadRounds() {
    setError("");
    try {
      const response = await fetch(apiUrl("/api/parlor/rounds?limit=50"));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const rows = Array.isArray(data.rounds) && data.rounds.length ? data.rounds : [fallbackRound];
      setRounds(rows.map(normalizeRound));
      setActiveId((current) => current || rows[0]?.id || "");
    } catch (err) {
      setRounds([normalizeRound(fallbackRound)]);
      setError(`Parlor 后端没回话，先给你看样稿：${err.message}`);
    }
  }

  useEffect(() => { loadRounds(); }, []);

  async function createRound() {
    const title = topic.trim();
    if (!title) return;
    const seats = Object.entries(AGENTS).map(([agent_id, agent], index) => ({
      agent_id, display_name: agent.name, model: agent.model, provider: agent.provider, color: agent.tint, seat_order: index,
    }));
    const response = await fetch(apiUrl("/api/parlor/rounds"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, seats, opening: title }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    const round = normalizeRound(data.round);
    setRounds((current) => [round, ...current.filter((item) => item.id !== "demo")]);
    setActiveId(round.id);
    setCreating(false);
    setTopic("");
  }

  async function sendUser() {
    const text = draft.trim();
    if (!text || active.id === "demo") return;
    setDraft("");
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(active.id)}/speak`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    if (!response.ok) throw new Error(await response.text());
    await refreshActive(active.id);
  }

  async function refreshActive(id = active.id) {
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(id)}`));
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    const round = normalizeRound(data.round);
    setRounds((current) => current.map((item) => item.id === id ? round : item));
  }

  async function nextTurn() {
    if (active.id === "demo") return;
    setSpeaking("thinking");
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(active.id)}/next`), { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    if (!response.ok) throw new Error(await response.text());
    setSpeaking("");
    await refreshActive(active.id);
  }

  async function setStatus(status) {
    if (active.id === "demo") return;
    const path = status === "paused" ? "pause" : status === "active" ? "resume" : "end";
    const response = await fetch(apiUrl(`/api/parlor/rounds/${encodeURIComponent(active.id)}/${path}`), { method: "POST" });
    if (!response.ok) throw new Error(await response.text());
    await refreshActive(active.id);
  }

  const currentSpeaker = speaking === "thinking" ? active.seats?.[0]?.agent_id : "";
  return (
    <main className="phone-scroll" style={{ width: "100%", height: "100%", background: T.paper, overflow: "hidden", display: "flex", flexDirection: "column", backgroundImage: "radial-gradient(ellipse 500px 300px at 50% 18%, rgba(255,210,170,.35), transparent), radial-gradient(ellipse 600px 400px at 30% 95%, rgba(243,236,226,.6), transparent)" }}>
      <header style={{ padding: "12px 16px", borderBottom: `0.5px solid ${T.rule}`, display: "flex", alignItems: "center", gap: 10 }}>
        <button type="button" onClick={() => setCreating((value) => !value)} style={{ border: `0.5px solid ${T.rule}`, background: "transparent", borderRadius: 999, padding: "6px 10px", color: T.inkSoft, fontFamily: F.cn, fontSize: 11, letterSpacing: 1.5 }}>开炉</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: F.en, fontStyle: "italic", fontSize: 30, color: T.ink, lineHeight: 1 }}>Parlor</div>
          <div style={{ fontFamily: F.cn, fontSize: 10, color: T.inkFaint, letterSpacing: 4 }}>围炉 · 多人圆桌</div>
        </div>
        <Chip active={active.status === "active"}>{active.status === "ended" ? "已散席" : active.status === "paused" ? "暂停" : "进行中"}</Chip>
      </header>

      {creating && (
        <section style={{ padding: 14, background: T.paperDeep, borderBottom: `0.5px solid ${T.rule}` }}>
          <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="把今晚要围炉聊的话题写下" data-plain-input="true" style={{ width: "100%", border: `0.5px solid ${T.rule}`, borderRadius: 999, padding: "10px 14px", background: T.cream, fontFamily: F.cn, color: T.ink, outline: "none" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {Object.keys(AGENTS).map((id) => <WaxSeal key={id} agentId={id} size={24} />)}
            <div style={{ flex: 1 }} />
            <Chip onClick={() => createRound().catch((err) => setError(err.message))} active>开始</Chip>
          </div>
        </section>
      )}

      <SeatRing round={active} speaking={currentSpeaker} />

      <section style={{ flex: 1, overflow: "hidden", borderTop: `0.5px dashed ${T.rule}`, padding: "14px 16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        {error && <div style={{ padding: "7px 10px", borderRadius: 8, background: T.cream, border: `0.5px solid ${T.rule}`, color: T.inkSoft, fontFamily: F.cn, fontSize: 11 }}>{error}</div>}
        <div className="phone-scroll" style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {active.turns.slice(-80).map((turn) => <Bubble key={turn.id || turn.turn_number} turn={turn} color={active.seats.find((seat) => seat.agent_id === turn.agent_id)?.color} />)}
          {speaking && <Bubble turn={{ agent_id: active.seats?.[0]?.agent_id || "azheng", content: "…" }} color={active.seats?.[0]?.color} />}
        </div>
      </section>

      <footer style={{ padding: "8px 12px 14px", background: T.paperDeep, borderTop: `0.5px solid ${T.rule}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <Chip onClick={() => nextTurn().catch((err) => { setSpeaking(""); setError(err.message); })}>醒醒</Chip>
          <Chip onClick={() => setStatus(active.status === "paused" ? "active" : "paused").catch((err) => setError(err.message))}>{active.status === "paused" ? "继续" : "暂停"}</Chip>
          <div style={{ flex: 1 }} />
          <Chip onClick={() => setStatus("ended").catch((err) => setError(err.message))} active>结束 · 出摘要</Chip>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendUser().catch((err) => setError(err.message)); }} placeholder="插一句……直接打断当前讨论" data-plain-input="true" style={{ flex: 1, border: `0.5px solid ${T.rule}`, borderRadius: 999, background: T.cream, padding: "10px 14px", fontFamily: F.cn, fontSize: 12, color: T.ink, outline: "none" }} />
          <button type="button" onClick={() => sendUser().catch((err) => setError(err.message))} style={{ width: 38, height: 38, borderRadius: "50%", border: 0, background: T.ink, color: T.cream, cursor: "pointer" }}>↑</button>
        </div>
      </footer>
    </main>
  );
}
