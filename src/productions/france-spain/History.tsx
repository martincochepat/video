import copy from '../../../productions/france-espagne-2027/texts.json';
import {C,Txt,Small,Flag,Stadium,Beat,p,useTime,B} from './Design';
import data from '../../../productions/france-espagne-2027/editorial.json';
const Timeline=({index,t}:{index:number;t:number})=><>
 <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920}}><path d="M180 1500H860" fill="none" stroke="#7A8D90" strokeWidth="3"/>{[180,520,860].map((x,i)=><g key={i}><circle cx={x} cy={1500} r={i===index?17:9} fill={i<=index?C.lime:'#6A7A7B'}/>{i===index&&<circle cx={x} cy={1500} r={34} fill="none" stroke={C.lime} opacity={p(t,0,.4)}/>}</g>)}</svg>
 {[2024,2025,2026].map((y,i)=><Txt key={y} x={130+i*340} y={1550} size={46} font={B} color={i===index?C.lime:C.muted}>{y}</Txt>)}
 </>;
export const History=()=>{const t=useTime();return <>
 {data.history.map((d,i)=>{const from=[0,4.1,8.2][i],to=[4.1,8.2,12.2][i];return <Beat key={d.year} from={from} to={to} kind={i}>
 <Stadium/><Small>{copy["RÉSULTATS OFFICIELS · DEMI-FINALES"]}</Small><Txt y={290} size={105} color={C.lime}>{d.competition}</Txt>
 <Flag code="FRA" x={225} y={525} w={150} h={100}/><Flag code="ESP" x={665} y={525} w={150} h={100}/>
 <Txt x={190} y={665} size={67}>{copy["FRANCE"]}</Txt><Txt x={630} y={665} size={67}>{copy["ESPAGNE"]}</Txt>
 <Txt x={230} y={790} size={250}>{d.franceGoals}</Txt><Txt x={490} y={865} size={100} color={C.muted}>{copy["–"]}</Txt><Txt x={670} y={790} size={250} color={C.lime}>{d.spainGoals}</Txt>
 <Txt y={1180} size={64}>{d.headline}</Txt><Small y={1335}>{d.date}</Small><Timeline index={i} t={t-from}/>
 </Beat>})}
 <Beat from={12.2} to={15} kind={1}><Stadium/><Small>{copy["2024 · 2025 · 2026"]}</Small><Txt y={420} size={210} color={C.lime}>{copy["3"]}</Txt><Txt x={335} y={540} size={78}>{copy["DEMI-FINALES."]}</Txt><Txt y={800} size={210}>{copy["3"]}</Txt><Txt x={335} y={920} size={78}>{copy["DÉFAITES."]}</Txt><Txt y={1260} size={67}>{copy["LE PASSIF EST LOURD."]}</Txt></Beat>
 </>};
