import React from 'react';
import {Easing, interpolate, random, staticFile} from 'remotion';

export const IVORY = '#eee9df';
export const MUTED = '#9a9b96';
export const EMBER = '#f2aa68';
export const PALE_EMBER = '#ffd8aa';
export const NIGHT = '#07090c';
export const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const ramp = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
) => interpolate(frame, [start, end], [from, to], {
  ...CLAMP,
  easing: Easing.inOut(Easing.cubic),
});

export const linear = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
) => interpolate(frame, [start, end], [from, to], CLAMP);

export const visibility = (
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) => ramp(frame, enterStart, enterEnd) * (1 - ramp(frame, exitStart, exitEnd));

export const LineReveal: React.FC<{
  frame: number;
  start: number;
  exit?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  duration?: number;
}> = ({frame, start, exit, children, style, duration = 18}) => {
  const enter = ramp(frame, start, start + duration);
  const leave = exit === undefined ? 0 : ramp(frame, exit, exit + 12);
  return (
    <div style={{overflow: 'hidden', ...style}}>
      <div
        style={{
          opacity: enter * (1 - leave),
          transform: `translateY(${112 * (1 - enter) - 22 * leave}%)`,
          filter: `blur(${7 * (1 - enter) + 5 * leave}px)`,
          willChange: 'transform, filter, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      fontFamily: 'SpaceGrotesk, sans-serif',
      fontSize: 19,
      fontWeight: 400,
      letterSpacing: 7,
      textTransform: 'uppercase',
      color: MUTED,
      ...style,
    }}
  >
    {children}
  </div>
);

const MOTES = Array.from({length: 105}, (_, i) => ({
  x: random(`mote-x-${i}`) * 1240 - 80,
  y: random(`mote-y-${i}`) * 2100 - 90,
  r: 0.6 + random(`mote-r-${i}`) * 2.2,
  depth: random(`mote-d-${i}`),
  phase: random(`mote-p-${i}`) * Math.PI * 2,
}));

export const Dust: React.FC<{frame: number; energy?: number}> = ({frame, energy = 1}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    {MOTES.map((m, i) => {
      const drift = (12 + m.depth * 36) * energy;
      const x = m.x + Math.sin(frame * 0.008 + m.phase) * drift;
      const y = m.y - frame * (0.06 + m.depth * 0.16) * energy;
      const wrappedY = ((y + 120) % 2160 + 2160) % 2160 - 120;
      return (
        <circle
          key={i}
          cx={x}
          cy={wrappedY}
          r={m.r * (0.75 + 0.25 * Math.sin(frame * 0.025 + m.phase))}
          fill={i % 13 === 0 ? EMBER : IVORY}
          opacity={(0.055 + m.depth * 0.19) * energy}
          filter={m.depth > 0.78 ? 'url(#farBlur)' : undefined}
        />
      );
    })}
  </svg>
);

export const FilmFinish: React.FC<{frame: number}> = ({frame}) => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 47%, transparent 35%, rgba(2,4,6,.26) 68%, rgba(1,2,4,.82) 112%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: -260,
        pointerEvents: 'none',
        backgroundImage: `url(${staticFile('grain.png')})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        opacity: 0.085,
        mixBlendMode: 'soft-light',
        transform: `translate(${(frame * 17) % 251}px, ${(frame * 29) % 247}px)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.055,
        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,.08) 4px)',
      }}
    />
  </>
);

export const SvgDefs: React.FC = () => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <defs>
      <filter id="farBlur" x="-200%" y="-200%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="2.8" />
      </filter>
      <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="hotGlow" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="13" result="wide" />
        <feGaussianBlur stdDeviation="3" result="near" />
        <feMerge><feMergeNode in="wide" /><feMergeNode in="near" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <radialGradient id="emberCore">
        <stop offset="0%" stopColor="#fff9e9" />
        <stop offset="24%" stopColor={PALE_EMBER} />
        <stop offset="58%" stopColor={EMBER} stopOpacity={0.5} />
        <stop offset="100%" stopColor={EMBER} stopOpacity={0} />
      </radialGradient>
      <linearGradient id="ghostInk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#81919a" />
        <stop offset="50%" stopColor={IVORY} />
        <stop offset="100%" stopColor="#56636a" />
      </linearGradient>
    </defs>
  </svg>
);

export const Ember: React.FC<{x: number; y: number; size?: number; opacity?: number}> = ({x, y, size = 70, opacity = 1}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} filter="url(#hotGlow)">
    <circle r={size} fill="url(#emberCore)" opacity={0.38} />
    <circle r={size * 0.115} fill={PALE_EMBER} />
    <circle r={size * 0.035} fill="#fffdf4" />
  </g>
);

export const Exposure: React.FC<{frame: number; at: number; color?: string}> = ({frame, at, color = PALE_EMBER}) => {
  const d = Math.abs(frame - at);
  const opacity = interpolate(d, [0, 5, 13], [0.24, 0.07, 0], CLAMP);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
};
