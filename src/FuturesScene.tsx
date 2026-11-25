import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Ember, EMBER, IVORY, Kicker, LineReveal, MUTED, ramp} from './design';

const ORIGIN = {x: 540, y: 1320};
export const BRANCHES = Array.from({length: 72}, (_, i) => {
  const angle = -2.85 + (2.56 * i) / 71;
  const radius = 650 + random(`branch-radius-${i}`) * 230;
  const x = ORIGIN.x + Math.cos(angle) * radius;
  const y = ORIGIN.y + Math.sin(angle) * radius;
  const bend = (random(`branch-bend-${i}`) - 0.5) * 210;
  const c1x = ORIGIN.x + (x - ORIGIN.x) * 0.2 + bend;
  const c1y = 1160 - random(`branch-c1-${i}`) * 110;
  const c2x = ORIGIN.x + (x - ORIGIN.x) * 0.72 - bend * 0.35;
  const c2y = y + 150 + random(`branch-c2-${i}`) * 150;
  return {x, y, d: `M ${ORIGIN.x} ${ORIGIN.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${x} ${y}`};
});
const SELECTED = 43;

export const FuturesScene: React.FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const chosen = BRANCHES[SELECTED];
  const zoom = ramp(frame, 98, 145);
  const scale = 0.82 + 0.22 * ramp(frame, 0, 105) + 2.1 * zoom;
  const cx = 540 + (chosen.x - 540) * zoom;
  const cy = 920 + (chosen.y - 920) * zoom;
  const collapse = ramp(frame, 97, 133);
  return (
    <AbsoluteFill style={{opacity}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <g transform={`translate(540 960) scale(${scale}) translate(${-cx} ${-cy})`}>
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={120 + frame * 0.12} fill="none" stroke={IVORY} strokeOpacity={0.07} strokeWidth={1} />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={48 + frame * 0.06} fill="none" stroke={EMBER} strokeOpacity={0.14} strokeWidth={1} />
          {BRANCHES.map((b, i) => {
            const enter = ramp(frame, 5 + i * 0.34, 48 + i * 0.34);
            const selected = i === SELECTED;
            const death = selected ? 0 : collapse;
            return (
              <g key={i} opacity={enter * (1 - death * 0.94)}>
                <path
                  d={b.d}
                  fill="none"
                  stroke={selected ? EMBER : i % 3 === 0 ? '#91a0a7' : IVORY}
                  strokeWidth={selected ? 2.5 + collapse * 1.3 : 0.75 + (i % 5) * 0.12}
                  strokeOpacity={selected ? 0.95 : 0.16 + (i % 7) * 0.018}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={death > 0.04 ? `${0.025 * (1 - death)} ${0.02 + death * 0.08}` : '1'}
                  strokeDashoffset={selected ? 1 - enter : 1 - enter + death * 0.18}
                  filter={selected ? 'url(#softGlow)' : undefined}
                />
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={selected ? 4.5 : 1.5 + (i % 4) * 0.45}
                  fill={selected ? EMBER : IVORY}
                  opacity={selected ? 1 : 0.25 + 0.2 * Math.sin(frame * 0.09 + i)}
                />
              </g>
            );
          })}
          <Ember x={ORIGIN.x} y={ORIGIN.y} size={85} opacity={1 - collapse * 0.5} />
          <Ember x={chosen.x} y={chosen.y} size={75 + collapse * 100} opacity={ramp(frame, 75, 103)} />
          <path
            d={`M 540 1320 C 470 1120 710 760 ${chosen.x} ${chosen.y}`}
            fill="none"
            stroke={EMBER}
            strokeWidth={1.4}
            strokeOpacity={0.5 * ramp(frame, 86, 112)}
            filter="url(#softGlow)"
          />
        </g>
      </svg>

      <Kicker style={{position: 'absolute', left: 82, top: 142, opacity: ramp(frame, 0, 20) * (1 - collapse)}}>
        002 — Possibility field
      </Kicker>
      <div style={{position: 'absolute', left: 78, top: 244, right: 55}}>
        <LineReveal frame={frame} start={16} exit={92}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 58, lineHeight: 1.12, letterSpacing: -2, color: IVORY}}>
            A THOUSAND FUTURES.
          </div>
        </LineReveal>
        <LineReveal frame={frame} start={27} exit={97}>
          <div style={{fontFamily: 'PlayfairDisplay, serif', fontStyle: 'italic', fontSize: 120, lineHeight: 1.12, letterSpacing: -4, color: IVORY, marginTop: 12}}>
            one pulse.
          </div>
        </LineReveal>
      </div>
      <div style={{position: 'absolute', left: 82, bottom: 128, opacity: (1 - collapse) * ramp(frame, 28, 55)}}>
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 15, letterSpacing: 5, color: MUTED}}>72 VISIBLE / ∞ UNSEEN</div>
        <div style={{width: 190, height: 1, background: MUTED, opacity: 0.35, marginTop: 18}} />
      </div>
      <div style={{position: 'absolute', left: 82, bottom: 150, opacity: ramp(frame, 102, 119) * (1 - ramp(frame, 131, 143))}}>
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 21, letterSpacing: 7, color: EMBER}}>AND THEN — YOU MOVE.</div>
      </div>
    </AbsoluteFill>
  );
};
