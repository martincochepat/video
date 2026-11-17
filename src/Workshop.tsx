import type {Production} from './WorkshopShell';
import {Forecast} from './productions/Forecast';
import {Space} from './productions/Space';
import {GoalRanking} from './productions/GoalRanking';
export const Workshop=({production}:{production:Production})=>{
  if(production.component==='forecast')return <Forecast production={production}/>;
  if(production.component==='goal-ranking')return <GoalRanking production={production}/>;
  if(production.component==='space')return <Space production={production}/>;
  throw new Error(`Composition sur mesure absente : ${production.component}`);
};
