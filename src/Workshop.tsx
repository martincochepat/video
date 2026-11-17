import type {Production} from './WorkshopShell';
import {Space} from './productions/Space';
export const Workshop=({production}:{production:Production})=>{
  if(production.component==='space')return <Space production={production}/>;
  throw new Error(`Composition sur mesure absente : ${production.component}`);
};
