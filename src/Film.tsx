import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CLAMP, Dust, Ember, EMBER, Exposure, FilmFinish, NIGHT, ramp, SvgDefs, visibility} from './design';
import {ProfileScene} from './ProfileScene';
import {BRANCHES, FuturesScene} from './FuturesScene';
import {HeartScene} from './HeartScene';
import {WorldScene} from './WorldScene';
import {FinalScene} from './FinalScene';

const chosen = BRANCHES[43];
const THREAD = [
  {f: 0, p: [-120, 1500, 180, 1460, 440, 1490, 530, 1405]},
  {f: 72, p: [-120, 1500, 180, 1460, 440, 1490, 530, 1405]},
  {f: 105, p: [540, 1320, 450, 1100, 700, 700, chosen.x, chosen.y]},
  {f: 190, p: [540, 1320, 450, 1100, 700, 700, chosen.x, chosen.y]},
  {f: 225, p: [540, 700, 400, 850, 650, 950, 540, 1040]},
  {f: 318, p: [540, 700, 400, 850, 650, 950, 540, 1040]},
  {f: 355, p: [540, 960, 710, 835, 820, 1090, 540, 960]},
  {f: 430, p: [540, 960, 710, 835, 820, 1090, 540, 960]},
  {f: 475, p: [82, 1260, 330, 1222, 690, 1292, 998, 1260]},
  {f: 540, p: [82, 1260, 330, 1222, 690, 1292, 998, 1260]},
];

const ContinuousThread: React.FC<{frame: number}> = ({frame}) => {
  const times = THREAD.map((k) => k.f);
  const values = THREAD[0].p.map((_, i) => interpolate(frame, times, THREAD.map((k) => k.p[i]), CLAMP));
  const [x0, y0, x1, y1, x2, y2, x3, y3] = values;
  const opacity = interpolate(frame, [0, 55, 95, 190, 315, 430, 475, 540], [0.6, 0.2, 0.72, 0.58, 0.36, 0.2, 0.88, 0.88], CLAMP);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}>
      <path
        d={`M ${x0} ${y0} C ${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`}
        fill="none"
        stroke={EMBER}
        strokeWidth={1.65}
        strokeOpacity={opacity}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - ramp(frame, 0, 48)}
        filter="url(#softGlow)"
      />
      <Ember x={x3} y={y3} size={38} opacity={opacity * ramp(frame, 5, 25)} />
    </svg>
  );
};

export const TheUnchosen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NIGHT, overflow: 'hidden'}}>
      <style>{`
        @font-face { font-family: 'PlayfairDisplay'; src: url('${staticFile('fonts/PlayfairDisplay-Italic-latin.woff2')}') format('woff2'); font-style: italic; font-weight: 400 900; font-display: block; }
        @font-face { font-family: 'SpaceGrotesk'; src: url('${staticFile('fonts/SpaceGrotesk-latin.woff2')}') format('woff2'); font-style: normal; font-weight: 300 700; font-display: block; }
      `}</style>
      <SvgDefs />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 52% 58%, #101318 0%, #080a0d 45%, #05070a 100%)'}} />
      <Dust frame={frame} energy={0.82} />

      {frame <= 108 ? <ProfileScene frame={frame} opacity={1 - ramp(frame, 73, 103)} /> : null}
      {frame >= 70 && frame <= 232 ? <FuturesScene frame={frame - 75} opacity={visibility(frame, 70, 91, 207, 231)} /> : null}
      {frame >= 192 && frame <= 352 ? <HeartScene frame={frame - 200} opacity={visibility(frame, 192, 214, 327, 351)} /> : null}
      {frame >= 315 && frame <= 468 ? <WorldScene frame={frame - 325} opacity={visibility(frame, 315, 337, 442, 467)} /> : null}
      {frame >= 432 ? <FinalScene frame={frame - 440} opacity={ramp(frame, 432, 456)} /> : null}

      <ContinuousThread frame={frame} />
      <Exposure frame={frame} at={91} />
      <Exposure frame={frame} at={211} />
      <Exposure frame={frame} at={335} />
      <Exposure frame={frame} at={447} />
      <FilmFinish frame={frame} />
      <div style={{position: 'absolute', inset: 0, background: '#030405', opacity: 1 - ramp(frame, 0, 9), pointerEvents: 'none'}} />
      <div style={{position: 'absolute', inset: 0, background: '#030405', opacity: ramp(frame, 535, 540), pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
