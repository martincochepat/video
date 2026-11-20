import {AbsoluteFill,Img,staticFile} from 'remotion';
import data from '../../../productions/effacer-legende/players.json';
import {C,Txt,Photo,Paper,Backdrop,p,lerp,useTime,B,BRAND} from './Design';
const cells=[[120,425],[545,425],[120,805],[545,805]];
const MemoryGrid=({t,appear=true,skip=-1}:{t:number;appear?:boolean;skip?:number})=><>{data.players.map((d,i)=>{if(i===skip)return null;const a=appear?p(t,.15+i*.12,.65+i*.12):1,[x,y]=cells[i];return <div key={d.id} style={{opacity:a}}><Paper src={d.hero} x={x} y={y+15*(1-a)} w={380} h={350} bottom={76} position={i===2?'50% 10%':'50% 23%'}/><Txt x={x+20} y={y+281+15*(1-a)} size={d.shortName==='RONALDINHO'?51:62} color={C.bg}>{d.shortName}</Txt></div>})}</>;
export const Hook=()=>{const t=useTime(),index=t<.88?0:t<1.76?1:t<2.64?2:3,pull=p(t,3.4,4.25);return <AbsoluteFill>
 {t<3.4?<><Photo src={data.players[index].hero} x={-35} y={-50} w={1150} h={1720} position={index===2?'50% 14%':'50% 20%'} style={{transform:`scale(${1+.03*p(t,index*.88,index*.88+.85)})`}}/><AbsoluteFill style={{background:'linear-gradient(#080B0E55 0%, transparent 45%,#080B0EF0 78%,#080B0E 93%)'}}/>
 <Txt y={925} size={112}>UN DOIT</Txt><Txt y={1040} size={112} color={C.lime}>DISPARAÎTRE.</Txt><Txt y={1245} size={82}>LEQUEL ?</Txt></>:<><Backdrop src={data.players[3].hero}/><MemoryGrid t={t-3.5} skip={3}/><Paper src={data.players[3].hero} x={lerp(-35,545,pull)} y={lerp(-50,805,pull)} w={lerp(1150,380,pull)} h={lerp(1720,350,pull)} bottom={lerp(10,76,pull)} position="50% 23%"/><Txt x={565} y={1086} size={51} color={C.bg} style={{opacity:p(t,4.05,4.3)}}>RONALDINHO</Txt><Txt y={180} size={90} style={{opacity:p(t,3.85,4.15)}}>UN DOIT DISPARAÎTRE.</Txt><Txt y={1240} size={100} color={C.lime}>LEQUEL ?</Txt></>}
 </AbsoluteFill>};
export const Choice=()=>{const t=useTime(),index=Math.floor(Math.min(7.9,t)/2)%4,[x,y]=cells[index],a=p(t,.8,1.3);return <AbsoluteFill>
 <Backdrop src="messi-portrait.jpg"/>
 <Txt y={180} size={82}>UN SEUL DOIT</Txt><Txt y={273} size={100} color={C.lime}>DISPARAÎTRE.</Txt>
 <MemoryGrid t={t}/>
 {t<8&&<div style={{position:'absolute',left:x-8,top:y-8,width:396,height:366,border:'3px solid #C8FF00',borderRadius:26,opacity:a}}/>}
 <Txt y={1220} size={72}>TON CHOIX ? <span style={{color:C.lime}}>POURQUOI ?</span></Txt>
 <Img data-qa-media src={staticFile('productions/cinq-scores-v4/logo-officiel.png')} style={{position:'absolute',left:120,top:1320,width:60,height:60}}/>
 <Txt x={200} y={1330} size={40} font={BRAND}>LIGUE ONZE</Txt><Txt x={655} y={1330} size={40} font={B}>ligueonze.fr</Txt>
 </AbsoluteFill>};
