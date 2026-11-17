import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
export const Root = () => (
  <Composition id="StudioReady" component={StudioReady} durationInFrames={90} fps={30} width={1080} height={1920} />
);
