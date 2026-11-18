import {ZidaneStory} from './productions/zidane/Story';
import {ForecastV3} from './productions/ForecastV3';
import type {Production} from './WorkshopShell';
import {ForecastV2} from './productions/ForecastV2';
import {Forecast} from './productions/Forecast';
import {Space} from './productions/Space';
import {GoalRanking} from './productions/GoalRanking';
export const Workshop=({production}:{production:Production})=>{
  if(production.component==='zidane-story')return <ZidaneStory production={production}/>;
  if(production.component==='forecast-v3')return <ForecastV3 production={production}/>;
  if(production.component==='forecast-v2')return <ForecastV2 production={production}/>;
  if(production.component==='forecast')return <Forecast production={production}/>;
  if(production.component==='goal-ranking')return <GoalRanking production={production}/>;
  if(production.component==='space')return <Space production={production}/>;
  throw new Error(`Composition sur mesure absente : ${production.component}`);
};
