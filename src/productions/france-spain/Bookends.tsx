import copy from '../../../productions/france-espagne-2027/texts.json';
import {AbsoluteFill} from 'remotion';
import {C,Txt,Small,Flag,Pic,FullPhoto,Beat,Signature,p,useTime} from './Design';
const FaceSplit=({t}:{t:number})=><>
 <Pic id="mbappe-semi.jpg" w={540} position="55% 35%" style={{translate:`${-18*(1-p(t,0,.65))}px 0`,filter:'saturate(.8)'}}/>
 <div style={{position:'absolute',left:540,top:0,width:540,height:1920,overflow:'hidden'}}><Pic id="yamal.jpg" w={540} position="72% 20%" style={{scale:2.05,transformOrigin:'50% 28%',translate:`${18*(1-p(t,0,.65))}px 0`,filter:'saturate(.9)'}}/></div>
 <AbsoluteFill style={{background:'linear-gradient(#080B0E88,#080B0E12 30%,#080B0E40 45%,#080B0EF5 79%,#080B0E 95%)'}}/><div style={{position:'absolute',left:538,top:0,width:4,height:1500,background:'linear-gradient(transparent,#C8FF00AA,transparent)'}}/>
 </>;
export const Hook=()=>{const t=useTime();return <>
 <Beat to={2.4}><FullPhoto id="mbappe-semi.jpg" position="63% 30%" travel={28*p(t,0,2.3)} shade={.4}/><Txt y={1110} size={135}>{copy["NON…"]}</Txt><Txt y={1280} size={102} color={C.lime} style={{opacity:p(t,.45,.75)}}>{copy["ENCORE EUX ?"]}</Txt><Small y={1495}>{copy["LE TIRAGE EST TOMBÉ."]}</Small><Small y={1610}>{copy["PHOTOGRAPHIES D’ILLUSTRATION"]}</Small></Beat>
 <Beat from={2.4} to={4.5} kind={0}><FullPhoto id="yamal.jpg" position="50% 24%" travel={-22*p(t,2.4,4.4)} shade={.3}/><Flag code="ESP" x={120} y={1110} w={140} h={95}/><Txt y={1240} size={155}>{copy["L’ESPAGNE."]}</Txt></Beat>
 <Beat from={4.5} to={7} kind={2}><FaceSplit t={t-4.5}/><Small>{copy["LIGUE DES NATIONS 2026–27"]}</Small><Flag code="FRA" x={120} y={1040}/><Txt x={245} y={1015} size={130}>{copy["FRANCE"]}</Txt><Flag code="ESP" x={120} y={1200}/><Txt x={245} y={1175} size={130}>{copy["ESPAGNE"]}</Txt><Small y={1430} color={C.lime}>{copy["QUARTS DE FINALE"]}</Small></Beat>
 </>};
export const Debate=()=>{const t=useTime();return <>
 <Beat to={4.8}><FaceSplit t={t}/><Small>{copy["FRANCE · ESPAGNE"]}</Small><Txt y={1110} size={100}>{copy["LA BÊTE NOIRE"]}</Txt><Txt y={1230} size={100} color={C.lime}>{copy["DES BLEUS ?"]}</Txt></Beat>
 <Beat from={4.8} to={8.7} kind={0}><FaceSplit t={t}/><Small>{copy["UN AUTRE GROUPE. UN AUTRE DÉFI."]}</Small><Txt y={1080} size={88}>{copy["OU UN NOUVEAU"]}</Txt><Txt y={1190} size={88}>{copy["CHAPITRE"]}</Txt><Txt y={1300} size={88} color={C.lime}>{copy["À ÉCRIRE ?"]}</Txt></Beat>
 <Beat from={8.7} kind={1}><FaceSplit t={t}/><Txt y={1140} size={92}>{copy["TU EN PENSES"]}</Txt><Txt y={1250} size={92} color={C.lime}>{copy["QUOI ?"]}</Txt><Txt y={1400} size={53}>{copy["DIS-LE EN COMMENTAIRE."]}</Txt><Signature/></Beat>
 </>};
