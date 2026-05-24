import React from 'react';
window.React = React;
// 恋爱组件 — 6 种真实样式的小组件渲染
// 每种组件都接受 props: { size, leftAvatar, rightAvatar, days, title, leftName, rightName, accent, onAvatarTap }
// size: 'S' | 'M' | 'L'

const { useState, useEffect, useRef } = React;

// 玻璃效果工具：g=100 完全不透明（原色）、g<100 渐进变透明并加 backdrop-blur
// baseSolid: 纯不透明时的背景；glassRGB: 半透时混入的 rgb 三元组（默认白色）
const glassMix = (g, baseSolid, glassRGB = '255,255,255', glassAlpha = 0.32) => {
  if (g >= 100) return { background: baseSolid };
  const a = g / 100;
  // 半透时铺一层 rgba，让 backdrop 透出来
  return {
    background: `linear-gradient(135deg, rgba(255,255,255,${0.18 + a * 0.16}), rgba(${glassRGB},${glassAlpha + a * 0.16}))`,
    backdropFilter: `blur(${34 - a * 8}px) saturate(180%) brightness(1.06)`,
    WebkitBackdropFilter: `blur(${34 - a * 8}px) saturate(180%) brightness(1.06)`,
  };
};

const glassAlpha = (glass, min = 0.34, max = 1) => {
  const value = Math.max(0, Math.min(100, Number(glass) || 0)) / 100;
  return min + (max - min) * value;
};

const glassCream = (glass, min = 0.42) => `rgba(245,239,232,${glassAlpha(glass, min, 1)})`;

const glassWhite = (glass, min = 0.32) => `rgba(255,255,255,${glassAlpha(glass, min, 1)})`;

// 占位头像（用 SVG，因为这是真实的应用元素）
const AvatarPlaceholder = ({ tone = 'lilac', size = 40, label = '', src = '', side = '' }) => {
  const T = window.SET_TOKENS;
  const tones = {
    lilac: [T.lilacSoft, T.lilac],
    blush: [T.blushSoft, T.blush],
    butter: [T.butterSoft, T.butter],
    sage: [T.sageSoft, T.sage],
  };
  const [a, b] = tones[tone] || tones.lilac;
  const common = {
    width: size, height: size, borderRadius: '50%',
    flexShrink: 0,
    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 4px 12px rgba(80,60,90,0.14)',
  };
  if (src) {
    return <img data-love-avatar={side} src={src} alt="" style={{ ...common, objectFit: 'cover', display: 'block' }} />;
  }
  return (
    <div data-love-avatar={side} style={{
      ...common,
      background: `linear-gradient(135deg, ${a}, ${b})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.85)', fontSize: size * 0.36, fontFamily: window.SET_FONTS.serifCn,
    }}>{label}</div>
  );
};

// ====== 1. 心跳线 Heartline ======
// 中间是心电图波形，两边头像
const WidgetHeartline = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, title = '私たちの永遠の幸福', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 36 : 56;

  const path = "M0,30 L20,30 L28,18 L36,42 L44,8 L52,52 L60,30 L80,30 L88,20 L96,40 L104,10 L112,50 L120,30 L320,30";

  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      ...glassMix(glass, `linear-gradient(160deg, #FFFFFF 0%, ${T.lilacWash} 100%)`),
      padding: size === 'S' ? 14 : 20,
      boxShadow: '0 8px 24px -16px rgba(110,100,140,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
      fontFamily: F.sansCn,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 320 60" width="100%" height={size === 'S' ? 28 : 40} preserveAspectRatio="none">
            <path d={path} stroke={T.lilacDeep} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
      </div>
      <div style={{ textAlign: 'center', display: size === 'S' ? 'none' : 'block' }}>
        <div style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 44 : 32, color: T.lilacDeep, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>{days}</div>
        <div style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.3em', color: T.inkSoft, marginTop: 4 }}>DAYS TOGETHER</div>
        {size === 'L' && <div style={{ fontFamily: F.serifCn, fontSize: 14, color: T.ink, marginTop: 16, letterSpacing: '0.05em' }}>{title}</div>}
      </div>
    </div>
  );
};

// ====== 2. 羽翼 Wings ======
// 头像两侧有发光羽翼线条，光晕从中间扩散
const WidgetWings = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, title = '私たちの永遠の幸福', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 38 : 60;

  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      ...glassMix(glass, `radial-gradient(ellipse at center, ${T.lilacWash} 0%, #FFFFFF 70%)`),
      padding: size === 'S' ? 14 : 22,
      boxShadow: '0 8px 24px -16px rgba(110,100,140,0.4), inset 0 0 0 1px rgba(183,163,217,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden', gap: 12,
      fontFamily: F.sansCn,
    }}>
      {/* 光晕 */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '70%', height: '70%', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(232,181,181,0.35) 0%, transparent 60%)`,
        filter: 'blur(8px)',
      }} />
      {/* 左羽翼 */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <svg width={size === 'S' ? 20 : 36} height={av} viewBox="0 0 36 60" style={{ position: 'absolute', left: -av * 0.4, opacity: 0.7 }}>
          <path d="M30,30 Q15,10 2,18 M30,30 Q12,22 0,30 M30,30 Q15,38 2,42" stroke={T.lilac} strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 56 : (size === 'S' ? 22 : 38), color: T.lilacDeep, fontWeight: 400, fontStyle: 'italic', lineHeight: 1 }}>{days}</div>
        {size !== 'S' && <div style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.3em', color: T.inkSoft, marginTop: 6 }}>DAYS</div>}
        {size === 'L' && <div style={{ fontFamily: F.serifCn, fontSize: 13, color: T.ink, marginTop: 18, opacity: 0.8 }}>{title}</div>}
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
        <svg width={size === 'S' ? 20 : 36} height={av} viewBox="0 0 36 60" style={{ position: 'absolute', right: -av * 0.4, opacity: 0.7, transform: 'scaleX(-1)' }}>
          <path d="M30,30 Q15,10 2,18 M30,30 Q12,22 0,30 M30,30 Q15,38 2,42" stroke={T.lilac} strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

// ====== 3. 气泡框 Bubble ======
// AI 头像旁有一个对话气泡，写着"今天也想对你说的话"
const WidgetBubble = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, message = '今天也想见你', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 36 : 54;

  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      ...glassMix(glass, `linear-gradient(135deg, #FFFFFF 0%, ${T.blushSoft}80 100%)`),
      padding: size === 'S' ? 14 : 20,
      boxShadow: '0 8px 24px -16px rgba(110,100,140,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: F.sansCn,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />

        {/* 气泡 */}
        <div style={{
          flex: 1, position: 'relative',
          background: glassCream(glass, 0.46),
          backdropFilter: glass < 100 ? 'blur(14px) saturate(140%)' : 'none',
          WebkitBackdropFilter: glass < 100 ? 'blur(14px) saturate(140%)' : 'none',
          border: `1px solid ${T.rule}`,
          borderRadius: '4px 16px 16px 16px',
          padding: size === 'S' ? '8px 10px' : '12px 14px',
          fontFamily: F.serifCn,
          fontSize: size === 'L' ? 16 : (size === 'S' ? 11 : 13),
          color: T.ink,
          lineHeight: 1.5,
        }}>
          {message}
          {/* 气泡尖角 */}
          <div style={{
            position: 'absolute', left: -6, top: 8,
            width: 8, height: 8, background: glassCream(glass, 0.46),
            borderLeft: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`,
            transform: 'rotate(45deg)',
          }} />
        </div>

        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
      </div>

      {size !== 'S' && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: size === 'L' ? 24 : 14, color: T.inkSoft }}>
          <span style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 28 : 20, color: T.lilacDeep }}>{days}</span>
          <span style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.3em' }}>DAYS</span>
        </div>
      )}
    </div>
  );
};

// ====== 4. 双月 Twin Moon ======
// 两个头像像两轮月亮，中间有月相变化
const WidgetTwinMoon = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 44 : (size === 'L' ? 90 : 64);

  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      ...glassMix(glass, `linear-gradient(180deg, #2A2530 0%, #4A3F5A 100%)`, '42,37,48', 0.4),
      padding: size === 'S' ? 14 : 20,
      boxShadow: '0 8px 24px -16px rgba(60,50,80,0.6)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
      position: 'relative', overflow: 'hidden',
      fontFamily: F.sansCn,
      color: '#F5EFE8',
    }}>
      {/* 星点 */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 37) % 100}%`, top: `${(i * 23) % 90}%`,
          width: 2, height: 2, borderRadius: '50%',
          background: '#F5EFE8', opacity: 0.4 + (i % 3) * 0.2,
        }} />
      ))}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {/* 左月（亏） */}
        <div style={{ position: 'relative', width: av, height: av }}>
          <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: av * 0.45, height: av,
            background: 'linear-gradient(90deg, transparent 0%, rgba(42,37,48,0.7) 100%)',
            borderRadius: '0 50% 50% 0 / 0 50% 50% 0',
          }} />
        </div>

        {size !== 'S' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 64 : 38, fontWeight: 300, fontStyle: 'italic', lineHeight: 1 }}>{days}</div>
            <div style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.4em', color: '#C8BFD0', marginTop: 6 }}>DAYS</div>
          </div>
        )}

        {/* 右月（盈） */}
        <div style={{ position: 'relative', width: av, height: av }}>
          <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
          <div style={{
            position: 'absolute', top: 0, left: 0, width: av * 0.45, height: av,
            background: 'linear-gradient(-90deg, transparent 0%, rgba(42,37,48,0.7) 100%)',
            borderRadius: '50% 0 0 50% / 50% 0 0 50%',
          }} />
        </div>
      </div>

      {size === 'L' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16, opacity: 0.6 }}>
          {['?', '?', '●', '?', '?'].map((m, i) => (
            <span key={i} style={{ fontSize: 14, color: i === 2 ? '#F5EFE8' : '#A89FB0' }}>{m}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// ====== 5. 信笺 Letter ======
// 像一张折好的信，左右印章，中间封口
const WidgetLetter = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, title = '私たちの永遠の幸福', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 32 : 44;
  const a = glass / 100;
  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 12,
      background: glassCream(glass, 0.42),
      backdropFilter: glass < 100 ? 'blur(20px) saturate(140%)' : 'none',
      WebkitBackdropFilter: glass < 100 ? 'blur(20px) saturate(140%)' : 'none',
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${size === 'L' ? 28 : 18}px, rgba(214,204,198,${glassAlpha(glass, 0.28, 1)}) ${size === 'L' ? 28 : 18}px, rgba(214,204,198,${glassAlpha(glass, 0.28, 1)}) ${size === 'L' ? 29 : 19}px)`,
      padding: size === 'S' ? 12 : 18,
      boxShadow: '0 8px 24px -16px rgba(110,100,140,0.4), inset 0 0 0 1px rgba(110,100,120,0.1)',
      position: 'relative', overflow: 'hidden',
      fontFamily: F.serifCn,
    }}>
      {/* 红色印章 */}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        width: size === 'S' ? 22 : 30, height: size === 'S' ? 22 : 30,
        border: `1.5px solid #B84A3E`, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#B84A3E', fontSize: size === 'S' ? 8 : 11, fontFamily: F.serifCn,
        transform: 'rotate(-8deg)', opacity: 0.85,
      }}>愛</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
        <span style={{ color: T.inkSoft, fontFamily: F.serifEn, fontSize: 13, fontStyle: 'italic' }}>&amp;</span>
        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
      </div>

      <div style={{ position: 'absolute', bottom: size === 'S' ? 10 : 16, left: size === 'S' ? 12 : 18, right: size === 'S' ? 12 : 18 }}>
        <div style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 32 : (size === 'S' ? 16 : 22), color: T.lilacDeep, fontStyle: 'italic', lineHeight: 1 }}>
          Day {days}
        </div>
        {size !== 'S' && (
          <div style={{ fontFamily: F.serifCn, fontSize: size === 'L' ? 14 : 11, color: T.inkSoft, marginTop: 4, letterSpacing: '0.05em' }}>{title}</div>
        )}
      </div>
    </div>
  );
};

// ====== 6. 极简 Minimal ======
// 大数字主导，头像缩小放在角落
const WidgetMinimal = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, leftName = '小酒', rightName = '夏彦', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];

  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      ...glassMix(glass, '#FFFFFF'),
      padding: size === 'S' ? 14 : 22,
      boxShadow: '0 8px 24px -16px rgba(110,100,140,0.4), inset 0 0 0 1px rgba(110,100,120,0.06)',
      position: 'relative', overflow: 'hidden',
      fontFamily: F.sansCn,
    }}>
      <div style={{
        fontFamily: F.serifEn, fontStyle: 'italic',
        fontSize: size === 'L' ? 200 : (size === 'S' ? 80 : 130),
        color: T.lilacSoft,
        position: 'absolute', right: size === 'S' ? -8 : -12, top: size === 'S' ? -28 : -40,
        lineHeight: 1, fontWeight: 300,
      }}>{days}</div>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <AvatarPlaceholder tone={leftTone} size={size === 'S' ? 20 : 28} label={leftLabel} src={leftAvatar} side="left" />
          <AvatarPlaceholder tone={rightTone} size={size === 'S' ? 20 : 28} label={rightLabel} src={rightAvatar} side="right" />
        </div>

        <div>
          <div style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.3em', color: T.inkSoft, textTransform: 'uppercase' }}>Days together</div>
          {size !== 'S' && (
            <div style={{ fontFamily: F.serifCn, fontSize: size === 'L' ? 16 : 13, color: T.ink, marginTop: 6, letterSpacing: '0.08em' }}>
              {leftName} <span style={{ color: T.inkFaint, margin: '0 6px' }}>·</span> {rightName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ====== 7. 拍立得 Polaroid ======
const WidgetPolaroid = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, leftName = '小酒', rightName = '夏彦', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 36 : (size === 'L' ? 92 : 56);
  const a = glass / 100;
  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 18,
      background: `rgba(255,255,255,${0.92 * a + (1 - a) * 0.35})`,
      backdropFilter: a < 1 ? 'blur(18px)' : 'none', WebkitBackdropFilter: a < 1 ? 'blur(18px)' : 'none',
      padding: size === 'S' ? 12 : 16,
      boxShadow: '0 10px 26px -16px rgba(110,100,140,0.4), inset 0 0 0 1px rgba(255,255,255,0.5)',
      position: 'relative', overflow: 'hidden', fontFamily: F.sansCn,
      transform: 'rotate(-1.2deg)',
    }}>
      <div style={{ background: `linear-gradient(135deg, rgba(232,222,245,${glassAlpha(glass, 0.34, 1)}), rgba(245,222,222,${glassAlpha(glass, 0.34, 1)}))`, backdropFilter: glass < 100 ? 'blur(12px) saturate(135%)' : 'none', WebkitBackdropFilter: glass < 100 ? 'blur(12px) saturate(135%)' : 'none', borderRadius: 4, padding: size === 'S' ? 8 : 14, height: size === 'S' ? '64%' : '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: size === 'S' ? 6 : 14, position: 'relative' }}>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
        <span style={{ position: 'absolute', top: 6, right: 8, fontFamily: F.mono, fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em' }}>D-{days}</span>
      </div>
      <div style={{ paddingTop: size === 'S' ? 4 : 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: F.hand, fontSize: size === 'L' ? 18 : 13, color: T.ink }}>{leftName} & {rightName}</span>
        {size !== 'S' && <span style={{ fontFamily: F.serifEn, fontStyle: 'italic', fontSize: 10, color: T.inkSoft, letterSpacing: '0.15em' }}>day {days}</span>}
      </div>
    </div>
  );
};

// ====== 8. 星座连线 Constellation ======
const WidgetConstellation = ({ size = 'M', leftLabel = '酒', rightLabel = '彦', days = 67, title = '私たちの永遠の幸福', leftTone = 'butter', rightTone = 'lilac', glass = 100, leftAvatar = '', rightAvatar = '' }) => {
  const T = window.SET_TOKENS;
  const F = window.SET_FONTS;
  const dims = { S: { w: 160, h: 160 }, M: { w: 340, h: 160 }, L: { w: 340, h: 340 } }[size];
  const av = size === 'S' ? 36 : (size === 'L' ? 78 : 52);
  const a = glass / 100;
  return (
    <div style={{
      width: dims.w, height: dims.h, borderRadius: 24,
      background: `linear-gradient(140deg, rgba(42,30,70,${0.88*a+(1-a)*0.35}) 0%, rgba(110,80,140,${0.85*a+(1-a)*0.35}) 100%)`,
      backdropFilter: a < 1 ? 'blur(20px)' : 'none', WebkitBackdropFilter: a < 1 ? 'blur(20px)' : 'none',
      padding: size === 'S' ? 14 : 20, color: '#F5EFE8',
      boxShadow: '0 8px 24px -16px rgba(60,50,80,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden', fontFamily: F.sansCn,
    }}>
      {[...Array(20)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${(i*47)%100}%`, top: `${(i*29)%95}%`, width: i%4===0?3:1.5, height: i%4===0?3:1.5, borderRadius: '50%', background: '#F5EFE8', opacity: 0.3 + (i%4)*0.2, boxShadow: i%4===0?'0 0 4px #F5EFE8':'none' }} />))}
      <svg viewBox="0 0 320 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.45 }}>
        <line x1="40" y1="50" x2="110" y2="30" stroke="#F5EFE8" strokeWidth="0.6" strokeDasharray="2 3" />
        <line x1="110" y1="30" x2="175" y2="55" stroke="#F5EFE8" strokeWidth="0.6" strokeDasharray="2 3" />
        <line x1="175" y1="55" x2="230" y2="38" stroke="#F5EFE8" strokeWidth="0.6" strokeDasharray="2 3" />
        <line x1="230" y1="38" x2="280" y2="60" stroke="#F5EFE8" strokeWidth="0.6" strokeDasharray="2 3" />
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <AvatarPlaceholder tone={leftTone} size={av} label={leftLabel} src={leftAvatar} side="left" />
        {size !== 'S' && (<div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: F.serifEn, fontSize: size === 'L' ? 56 : 32, fontStyle: 'italic', fontWeight: 300, lineHeight: 1 }}>{days}</div>
          <div style={{ fontFamily: F.serifEn, fontSize: 9, letterSpacing: '0.35em', color: '#C8BFD0', marginTop: 4 }}>NIGHTS</div>
        </div>)}
        <AvatarPlaceholder tone={rightTone} size={av} label={rightLabel} src={rightAvatar} side="right" />
      </div>
      {size === 'L' && <div style={{ fontFamily: F.serifCn, fontSize: 12, color: '#C8BFD0', textAlign: 'center', letterSpacing: '0.15em', position: 'relative', zIndex: 1 }}>{title}</div>}
    </div>
  );
};

// 注册到 window
const WIDGET_RENDERERS = {
  heartline: WidgetHeartline,
  wings: WidgetWings,
  bubble: WidgetBubble,
  twinmoon: WidgetTwinMoon,
  letter: WidgetLetter,
  minimal: WidgetMinimal,
  polaroid: WidgetPolaroid,
  constellation: WidgetConstellation,
};

const WIDGET_META = [
  { id: 'heartline', name: '心跳线', tagline: '我们的小主屏', sizes: ['M', 'L'] },
  { id: 'wings', name: '羽翼', tagline: '在你身边慢慢发光', sizes: ['M', 'L'] },
  { id: 'bubble', name: '气泡框', tagline: '今天也有想对你说的话', sizes: ['M', 'L'] },
  { id: 'twinmoon', name: '双月', tagline: '一盈一亏一相思', sizes: ['S', 'M', 'L'] },
  { id: 'letter', name: '信笺', tagline: '从信里取出今天', sizes: ['M', 'L'] },
  { id: 'minimal', name: '极简', tagline: '只剩数字与你', sizes: ['S', 'M', 'L'] },
  { id: 'polaroid', name: '拍立得', tagline: '冻住这一天', sizes: ['M', 'L'] },
  { id: 'constellation', name: '星座', tagline: '两颗互相吸引的星', sizes: ['M', 'L'] },
];

window.AvatarPlaceholder = AvatarPlaceholder;
window.WIDGET_RENDERERS = WIDGET_RENDERERS;
window.WIDGET_META = WIDGET_META;

