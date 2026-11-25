import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Ember, EMBER, IVORY, Kicker, LineReveal, MUTED, PALE_EMBER, ramp} from './design';

const FIBERS = Array.from({length: 176}, (_, i) => {
  const a = (i / 176) * Math.PI * 2;
  const inner = 72 + random(`iris-inner-${i}`) * 35;
  const outer = 235 + random(`iris-outer-${i}`) * 80;
  const curl = (random(`iris-curl-${i}`) - 0.5) * 0.18;
  const p = (r: number, angle: number) => ({x: 540 + Math.cos(angle) * r, y: 960 + Math.sin(angle) * r});
  const p0 = p(inner, a);
  const p1 = p(inner + (outer - inner) * 0.35, a + curl);
  const p2 = p(inner + (outer - inner) * 0.72, a - curl * 0.6);
  const p3 = p(outer, a + curl * 0.2);
  return {d: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`, warm: i % 11 === 0};
});

const ORBITS = Array.from({length: 7}, (_, i) => ({
  rx: 365 + i * 63,
  ry: 104 + i * 24,
  rotate: -28 + i * 11,
  delay: i * 3,
}));

export const WorldScene: React.FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const arrive = ramp(frame, 0, 37);
  const depart = ramp(frame, 112, 145);
  const scale = 3.1 - 2.16 * arrive + 0.12 * ramp(frame, 38, 105) + depart * 2.2;
  const rotation = -9 + frame * 0.055;
  const orbitAngle = frame * 0.047;
  const ox = Math.cos(orbitAngle) * 485;
  const oy = Math.sin(orbitAngle) * 152;
  const oa = (-18 * Math.PI) / 180;
  const emberX = 540 + ox * Math.cos(oa) - oy * Math.sin(oa);
  const emberY = 960 + ox * Math.sin(oa) + oy * Math.cos(oa);
  return (
    <AbsoluteFill style={{opacity}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <defs>
          <radialGradient id="worldPupil">
            <stop offset="0%" stopColor="#020305" />
            <stop offset="58%" stopColor="#05070a" />
            <stop offset="83%" stopColor="#38271d" />
            <stop offset="100%" stopColor={EMBER} stopOpacity="0.12" />
          </radialGradient>
        </defs>
        <g transform={`translate(540 960) scale(${scale}) translate(-540 -960)`}>
          <g transform={`rotate(${rotation} 540 960)`} opacity={arrive}>
            {FIBERS.map((fiber, i) => (
              <path
                key={i}
                d={fiber.d}
                fill="none"
                stroke={fiber.warm ? EMBER : IVORY}
                strokeOpacity={fiber.warm ? 0.48 : 0.1 + (i % 6) * 0.026}
                strokeWidth={fiber.warm ? 1.5 : 0.55 + (i % 4) * 0.18}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - ramp(frame, 3 + i * 0.025, 30 + i * 0.025)}
              />
            ))}
          </g>
          <circle cx={540} cy={960} r={310} fill="none" stroke={IVORY} strokeOpacity={0.16 * arrive} strokeWidth={1} />
          <circle cx={540} cy={960} r={100} fill="url(#worldPupil)" stroke={EMBER} strokeOpacity={0.32} strokeWidth={1.5} />
          <circle cx={540} cy={960} r={49} fill="#020305" />
          <g transform={`rotate(-11 540 960)`}>
            {ORBITS.map((o, i) => {
              const draw = ramp(frame, 19 + o.delay, 62 + o.delay);
              return (
                <ellipse
                  key={i}
                  cx={540}
                  cy={960}
                  rx={o.rx}
                  ry={o.ry}
                  transform={`rotate(${o.rotate} 540 960)`}
                  fill="none"
                  stroke={i === 2 ? EMBER : IVORY}
                  strokeOpacity={i === 2 ? 0.5 : 0.1 + i * 0.018}
                  strokeWidth={i === 2 ? 1.8 : 0.8}
                  pathLength={1}
                  strokeDasharray={i % 2 ? '0.74 0.025 0.18 0.025' : '1'}
                  strokeDashoffset={1 - draw}
                />
              );
            })}
          </g>
          <Ember x={emberX} y={emberY} size={66} opacity={ramp(frame, 35, 52)} />
          <Ember x={540} y={960} size={95} opacity={0.7 + 0.3 * Math.sin(frame * 0.11)} />
          <path d="M 540 960 C 700 870 820 1000 980 870" fill="none" stroke={PALE_EMBER} strokeOpacity={0.22 * arrive} strokeWidth={1} filter="url(#softGlow)" />
        </g>
      </svg>

      <Kicker style={{position: 'absolute', left: 82, top: 142, opacity: ramp(frame, 20, 40) * (1 - depart)}}>
        004 — First world
      </Kicker>
      <div style={{position: 'absolute', left: 78, top: 242, right: 50}}>
        <LineReveal frame={frame} start={34} exit={105}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 51, lineHeight: 1.12, letterSpacing: -1.8, color: IVORY}}>WHAT WAS POSSIBLE</div>
        </LineReveal>
        <LineReveal frame={frame} start={43} exit={109}>
          <div style={{fontFamily: 'PlayfairDisplay, serif', fontStyle: 'italic', fontSize: 103, lineHeight: 1.16, letterSpacing: -3.5, color: IVORY, marginTop: 12}}>is now a world.</div>
        </LineReveal>
      </div>
      <div style={{position: 'absolute', left: 82, bottom: 128, opacity: ramp(frame, 55, 80) * (1 - depart)}}>
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 14, letterSpacing: 5, color: MUTED}}>ORBIT 001 / MASS: ONE DECISION</div>
      </div>
    </AbsoluteFill>
  );
};
