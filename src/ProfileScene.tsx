import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ember, IVORY, Kicker, LineReveal, MUTED, ramp} from './design';

const PROFILE = 'M 340 1640 C 290 1500 290 1360 330 1220 C 360 1110 355 970 410 850 C 470 715 600 690 690 760 C 738 798 752 852 748 908 C 745 955 766 978 800 1010 C 818 1028 807 1044 774 1050 C 760 1053 757 1065 766 1080 C 780 1105 764 1122 742 1118 C 756 1155 735 1175 704 1163 C 716 1212 685 1260 631 1275 C 582 1288 565 1322 565 1385 L 565 1510 C 620 1550 710 1580 790 1640';

export const ProfileScene: React.FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const draw = ramp(frame, 3, 61);
  const camera = 1.075 - 0.075 * ramp(frame, 0, 80);
  const ghostSpread = ramp(frame, 45, 90);
  return (
    <AbsoluteFill style={{opacity}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <g transform={`translate(540 1090) scale(${camera}) translate(-540 -1090)`}>
          <path d="M 80 1690 C 320 1580 760 1580 1000 1690" fill="none" stroke={IVORY} strokeOpacity={0.07} strokeWidth={1} />
          {[7, 6, 5, 4, 3, 2, 1].map((n) => (
            <path
              key={n}
              d={PROFILE}
              transform={`translate(${-n * (12 + ghostSpread * 15)} ${-n * 3})`}
              fill="none"
              stroke={n % 2 ? '#71818a' : IVORY}
              strokeWidth={n === 1 ? 1.5 : 1}
              strokeOpacity={(0.035 + ghostSpread * 0.055) * (8 - n)}
              filter={n > 3 ? 'url(#farBlur)' : undefined}
            />
          ))}
          <path
            d={PROFILE}
            fill="none"
            stroke="url(#ghostInk)"
            strokeWidth={2.2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - draw}
            filter="url(#softGlow)"
          />
          <path
            d="M 677 921 Q 708 906 733 924 M 721 1109 Q 740 1115 757 1107 M 560 1382 Q 540 1402 541 1450"
            fill="none"
            stroke={IVORY}
            strokeOpacity={0.36 * draw}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <path
            d="M 535 1368 C 486 1300 407 1410 476 1452 C 524 1481 583 1433 535 1368 Z"
            fill="none"
            stroke="#f2aa68"
            strokeWidth={1.3}
            strokeOpacity={0.52 * ramp(frame, 40, 67)}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - ramp(frame, 40, 67)}
          />
          <Ember x={530} y={1405} size={66} opacity={ramp(frame, 48, 64)} />
        </g>
      </svg>

      <Kicker style={{position: 'absolute', left: 82, top: 142, opacity: ramp(frame, 4, 22)}}>
        001 — The unchosen
      </Kicker>
      <div style={{position: 'absolute', left: 78, top: 245, right: 64}}>
        <LineReveal frame={frame} start={8} exit={69}>
          <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 72, lineHeight: 1.08, letterSpacing: -3, color: IVORY}}>
            EVERY CHOICE
          </div>
        </LineReveal>
        <LineReveal frame={frame} start={15} exit={72}>
          <div style={{fontFamily: 'PlayfairDisplay, serif', fontStyle: 'italic', fontSize: 105, lineHeight: 1.18, letterSpacing: -3.5, color: IVORY, marginTop: 12}}>
            leaves a ghost.
          </div>
        </LineReveal>
      </div>
      <div style={{position: 'absolute', right: 65, top: 530, opacity: 0.42 * ramp(frame, 30, 55)}}>
        <div style={{width: 1, height: 190, background: `linear-gradient(${MUTED}, transparent)`, marginLeft: 'auto'}} />
        <div style={{fontFamily: 'SpaceGrotesk, sans-serif', fontSize: 14, letterSpacing: 5, color: MUTED, writingMode: 'vertical-rl', marginTop: 24}}>
          WHAT COULD HAVE BEEN
        </div>
      </div>
    </AbsoluteFill>
  );
};
