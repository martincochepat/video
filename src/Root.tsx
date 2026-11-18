import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {Workshop} from './Workshop';
import demo from '../productions/espace/manifest.json';
import zidane from '../productions/zidane-2006/manifest.json';
export const Root = () => <>
  <Composition id="Zidane2006" component={Workshop} durationInFrames={2700} fps={60} width={1080} height={1920}
    defaultProps={{production:zidane}} calculateMetadata={({props})=>({fps:props.production.fps,width:props.production.width,height:props.production.height,durationInFrames:Math.ceil(props.production.durationSeconds*props.production.fps)})}/>
  <Composition id="StudioReady" component={StudioReady} durationInFrames={90} fps={30} width={1080} height={1920}/>
  <Composition id="Workshop" component={Workshop} durationInFrames={450} fps={30} width={1080} height={1920}
    defaultProps={{production:demo}}
    calculateMetadata={({props})=>({fps:props.production.fps,width:props.production.width,height:props.production.height,durationInFrames:Math.ceil(props.production.durationSeconds*props.production.fps)})}/>
</>;
