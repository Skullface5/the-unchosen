import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ember, EMBER, IVORY, Kicker, LineReveal, PALE_EMBER, ramp} from './design';

const HEART = 'M 548 1340 C 480 1260 384 1180 355 1060 C 320 920 365 825 448 835 C 493 840 510 890 535 912 C 555 855 610 800 670 825 C 760 865 755 990 710 1090 C 665 1190 600 1280 548 1340 Z';
const AORTA = 'M 473 852 C 447 790 442 720 466 660 C 487 609 540 612 548 670 L 552 786 M 555 692 C 598 639 661 647 674 700 C 685 745 654 780 616 806 M 442 914 C 405 853 364 813 330 777 M 681 864 C 724 825 748 785 752 735';

export const HeartScene: React.FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const draw = ramp(frame, 3, 61);
  const dive = ramp(frame, 105, 145);
  const scale = 0.92 + 0.08 * ramp(frame, 0, 85) + dive * 4.6;
  const beat1 = Math.max(0, 1 - Math.abs(frame - 76) / 7);
  const beat2 = Math.max(0, 1 - Math.abs(frame - 96) / 6);
  const beat = beat1 + beat2 * 0.7;
  return (
    <AbsoluteFill style={{opacity}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <defs><clipPath id="heartClip"><path d={HEART} /></clipPath></defs>
        <g transform={`translate(540 1000) scale(${scale}) translate(-540 -1000)`}>
          {[0, 1].map((n) => {
            const p = ramp(frame, 72 + n * 21, 111 + n * 21);
            return <circle key={n} cx={540} cy={1040} r={150 + p * 490} fill="none" stroke={EMBER} strokeWidth={2 - p} strokeOpacity={(1 - p) * 0.35} />;
          })}
          <g opacity={1 - ramp(frame, 103, 128)} transform={`translate(540 1040) scale(${1 + beat * 0.035}) translate(-540 -1040)`}>
            <path d={HEART} fill={EMBER} fillOpacity={0.018 + beat * 0.045} stroke="none" />
            <g clipPath="url(#heartClip)" opacity={0.34 * draw}>
              {Array.from({length: 18}, (_, i) => {
                const y = 840 + i * 31;
                return (
                  <path
                    key={i}
                    d={`M 290 ${y} C 400 ${y - 60 + i * 2} 470 ${y + 65} 555 ${y - 8} C 630 ${y - 66} 720 ${y + 20} 790 ${y - 30}`}
                    fill="none"
                    stroke={i % 4 === 0 ? EMBER : IVORY}
                    strokeOpacity={i % 4 === 0 ? 0.45 : 0.2}
                    strokeWidth={i % 4 === 0 ? 1.25 : 0.65}
                  />
                );
              })}
            </g>
            <path d={HEART} fill="none" stroke={IVORY} strokeWidth={2.4} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} filter="url(#softGlow)" />
            <path d={AORTA} fill="none" stroke="url(#ghostInk)" strokeWidth={2} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - ramp(frame, 13, 69)} />
            <path d="M 534 914 C 512 1010 566 1060 532 1150 C 515 1197 527 1250 548 1334 M 535 1060 C 480 1040 443 1060 400 1104 M 535 1150 C 592 1120 641 1128 675 1080" fill="none" stroke={EMBER} strokeOpacity={0.48 * draw} strokeWidth={1.3} />
            <path d="M 367 1045 L 409 1045 L 431 1008 L 466 1100 L 501 1025 L 525 1045 L 584 1045 L 610 1008 L 642 1064 L 672 1045 L 716 1045" fill="none" stroke={PALE_EMBER} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - ramp(frame, 48, 75)} filter="url(#softGlow)" />
          </g>
          <Ember x={540} y={1040} size={90 + beat * 65 + dive * 240} opacity={ramp(frame, 38, 64)} />
        </g>
      </svg>

      <Kicker style={{position: 'absolute', left: 82, top: 142, opacity: ramp(frame, 5, 22) * (1 - dive)}}>
        003 — The selection
      </Kicker>
      <div style={{position: 'absolute', left: 78, top: 244, right: 55}}>
        <LineReveal frame={frame} start={16} exit={102}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 72, lineHeight: 1.08, letterSpacing: -3, color: IVORY}}>GIVE ONE</div>
        </LineReveal>
        <LineReveal frame={frame} start={25} exit={106}>
          <div style={{fontFamily: 'PlayfairDisplay, serif', fontStyle: 'italic', fontSize: 112, lineHeight: 1.14, letterSpacing: -4, color: IVORY, marginTop: 12}}>a heartbeat.</div>
        </LineReveal>
      </div>
      <div style={{position: 'absolute', right: 65, bottom: 128, textAlign: 'right', opacity: ramp(frame, 65, 90) * (1 - dive)}}>
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 14, letterSpacing: 5, color: EMBER}}>SIGNAL / 001</div>
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 13, letterSpacing: 3, color: IVORY, opacity: 0.4, marginTop: 12}}>NO LONGER A GHOST</div>
      </div>
    </AbsoluteFill>
  );
};
