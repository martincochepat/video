import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {Workshop} from './Workshop';
import demo from '../productions/espace/manifest.json';
export const Root = () => <>
  <Composition id="StudioReady" component={StudioReady} durationInFrames={90} fps={30} width={1080} height={1920}/>
  <Composition id="Workshop" component={Workshop} durationInFrames={450} fps={30} width={1080} height={1920}
    defaultProps={{production:demo}}
    calculateMetadata={({props})=>({fps:props.production.fps,width:props.production.width,height:props.production.height,durationInFrames:Math.ceil(props.production.durationSeconds*props.production.fps)})}/>
</>;
