import React from 'react';
import {Composition} from 'remotion';
import {TheUnchosen} from './Film';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TheUnchosen"
    component={TheUnchosen}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
  />
);
