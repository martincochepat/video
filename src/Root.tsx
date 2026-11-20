import {FranceSpainNews} from './productions/france-spain';
import {NovemberPredictions} from './productions/pronos-november';
import {EraseLegend} from './productions/erase-legend';
import {FiveScores,FiveScoresClean} from './productions/five-scores';
import fiveScores from '../productions/cinq-scores-v4/manifest.json';
import {ThreePredictions} from './productions/three-predictions';
import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {Workshop} from './Workshop';
import demo from '../productions/espace/manifest.json';
import zidane from '../productions/zidane-2006/manifest.json';
export const Root = () => <>
  <Composition id="FranceSpainNews" component={FranceSpainNews} durationInFrames={2700} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>
  <Composition id="NovemberPredictions" component={NovemberPredictions} durationInFrames={1050} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>
  <Composition id="EraseLegend" component={EraseLegend} durationInFrames={2640} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>
  <Composition id="FiveScoresClean" component={FiveScoresClean} durationInFrames={Math.round(fiveScores.durationSeconds*30)} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>
  <Composition id="FiveScores" component={FiveScores} durationInFrames={Math.round(fiveScores.durationSeconds*30)} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>
  <Composition id="ThreePredictions" component={ThreePredictions} durationInFrames={810} fps={30} width={1080} height={1920} defaultProps={{qa:false,cover:false}}/>
  <Composition id="Zidane2006" component={Workshop} durationInFrames={2700} fps={60} width={1080} height={1920}
    defaultProps={{production:zidane}} calculateMetadata={({props})=>({fps:props.production.fps,width:props.production.width,height:props.production.height,durationInFrames:Math.ceil(props.production.durationSeconds*props.production.fps)})}/>
  <Composition id="StudioReady" component={StudioReady} durationInFrames={90} fps={30} width={1080} height={1920}/>
  <Composition id="Workshop" component={Workshop} durationInFrames={450} fps={30} width={1080} height={1920}
    defaultProps={{production:demo}}
    calculateMetadata={({props})=>({fps:props.production.fps,width:props.production.width,height:props.production.height,durationInFrames:Math.ceil(props.production.durationSeconds*props.production.fps)})}/>
</>;
