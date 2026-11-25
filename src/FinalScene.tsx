import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Ember, EMBER, IVORY, Kicker, LineReveal, MUTED, PALE_EMBER, ramp} from './design';

const FINAL_DUST = Array.from({length: 42}, (_, i) => ({
  a: random(`final-a-${i}`) * Math.PI * 2,
  r: 180 + random(`final-r-${i}`) * 540,
  size: 0.8 + random(`final-s-${i}`) * 2,
}));

export const FinalScene: React.FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const gather = ramp(frame, 0, 37);
  const push = ramp(frame, 0, 105);
  const underline = ramp(frame, 34, 67);
  return (
    <AbsoluteFill style={{opacity}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 67% 48%, rgba(130,75,38,.11), transparent 47%)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <g opacity={0.36 * (1 - gather * 0.55)}>
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={730} cy={850} rx={280 + i * 120} ry={80 + i * 34} transform={`rotate(${-24 + i * 17 + frame * 0.025} 730 850)`} fill="none" stroke={i === 1 ? EMBER : IVORY} strokeOpacity={0.18} strokeWidth={0.8} pathLength={1} strokeDasharray="0.8 0.04 0.12 0.04" />
          ))}
        </g>
        {FINAL_DUST.map((p, i) => {
          const r = p.r * (1 - gather * 0.78) + push * 18;
          const x = 730 + Math.cos(p.a + frame * 0.003) * r;
          const y = 850 + Math.sin(p.a + frame * 0.003) * r * 0.65;
          return <circle key={i} cx={x} cy={y} r={p.size} fill={i % 9 === 0 ? EMBER : IVORY} opacity={0.12 + (i % 5) * 0.05} />;
        })}
        <path d={`M 82 1260 C 330 ${1240 - underline * 18} 690 ${1280 + underline * 12} 998 1260`} fill="none" stroke={EMBER} strokeWidth={2} strokeOpacity={0.82} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - underline} filter="url(#softGlow)" />
        <Ember x={82 + 916 * underline} y={1260 + Math.sin(underline * Math.PI) * -12} size={56} opacity={underline} />
        <path d="M 82 1300 L 260 1300" stroke={IVORY} strokeOpacity={0.15} strokeWidth={1} />
      </svg>

      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + push * 0.018})`, transformOrigin: '54% 48%'}}>
        <Kicker style={{position: 'absolute', left: 82, top: 142, opacity: ramp(frame, 2, 18)}}>005 — The unchosen</Kicker>
        <div style={{position: 'absolute', left: 78, top: 390, right: 50}}>
          <LineReveal frame={frame} start={10} duration={20}>
            <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 112, lineHeight: 1, letterSpacing: 12, color: IVORY}}>MAKE</div>
          </LineReveal>
          <LineReveal frame={frame} start={20} duration={22}>
            <div style={{fontFamily: 'PlayfairDisplay, serif', fontStyle: 'italic', fontSize: 248, lineHeight: 1.08, letterSpacing: -10, color: PALE_EMBER, marginTop: 30, marginLeft: -6}}>ONE</div>
          </LineReveal>
          <LineReveal frame={frame} start={31} duration={21}>
            <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 150, lineHeight: 1, letterSpacing: -6, color: IVORY, marginTop: 34}}>REAL.</div>
          </LineReveal>
        </div>
        <div style={{position: 'absolute', left: 82, bottom: 158, opacity: ramp(frame, 51, 72)}}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 16, letterSpacing: 5.5, color: MUTED}}>EVERY FUTURE STARTS AS A GHOST.</div>
        </div>
        <div style={{position: 'absolute', right: 66, bottom: 158, opacity: ramp(frame, 58, 78)}}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 14, letterSpacing: 4, color: EMBER}}>001 / ∞</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
