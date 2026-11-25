import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';

const frames = [20, 76, 130, 201, 267, 333, 342, 405, 447, 500];
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({
  serveUrl,
  id: 'TheUnchosen',
  chromiumOptions: {gl: 'swangle'},
});
for (const frame of frames) {
  await renderStill({
    composition,
    serveUrl,
    frame,
    output: `out/preview_${String(frame).padStart(3, '0')}.jpg`,
    imageFormat: 'jpeg',
    jpegQuality: 92,
    scale: 0.5,
    chromiumOptions: {gl: 'swangle'},
    timeoutInMilliseconds: 300000,
  });
  console.log(`Rendered preview frame ${frame}`);
}
