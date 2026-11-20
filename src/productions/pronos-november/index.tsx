import {useEffect,useState} from 'react';
import {AbsoluteFill,Audio,Img,staticFile,delayRender,continueRender} from 'remotion';
import {WorkshopShell,type Production} from '../../WorkshopShell';
import manifest from '../../../productions/pronos-21-nov/manifest.json';
import matches from '../../../productions/pronos-21-nov/matches.json';
import {C,Txt,B,BRAND,p,useTime} from '../erase-legend/Design';
import {Ticket,Stadium} from './Cards';
const Header=()=>{const t=useTime(),i=t<10.5?0:t<17.5?1:2,start=[3.5,10.5,17.5][i],end=[10.5,17.5,24.5][i],m=matches.matches[i],a=p(t,start+.05,start+.4)*(1-p(t,end-.55,end-.35));return <>
 <div style={{position:'absolute',left:120,top:160,display:'flex',gap:16}}>{[0,1,2].map(n=><div key={n} style={{width:260,height:5,background:t>=[3.5,10.5,17.5][n]?C.lime:C.edge}}/>)}</div>
 {t<3.5?<><Txt y={225} size={142} style={{opacity:1-p(t,2.95,3.2)}}>3 PRONOS.</Txt><Txt y={410} size={102} color={C.lime} style={{opacity:1-p(t,2.95,3.2)}}>1 SEUL</Txt><Txt y={530} size={102} style={{opacity:1-p(t,2.95,3.2)}}>CHANGEMENT.</Txt></>:t<24.5?<><Txt y={220} size={110} style={{opacity:a}}>MON PRONO.</Txt><Txt y={402} size={43} color={C.lime} font={B} style={{opacity:a}}>{m.competition}</Txt><Txt y={469} size={44} font={B} style={{opacity:a}}>{m.dateLabel} · {m.timeLabel} · PARIS</Txt><Txt y={1160} size={45} color={C.paper} style={{opacity:a*p(t,start+1.7,start+2)}}>{m.angle}</Txt></>:<><Txt y={225} size={108} style={{opacity:p(t,24.9,25.2)}}>TU MODIFIES</Txt><Txt y={353} size={130} color={C.lime} style={{opacity:p(t,25,25.3)}}>LEQUEL ?</Txt><Txt y={490} size={40} font={B} style={{opacity:p(t,25.05,25.35)}}>MES PRONOS · MATCHS DU 21 NOV.</Txt><Txt y={1240} size={70} style={{opacity:p(t,28.3,28.6)}}>DONNE TON SCORE.</Txt></>}
 {t>=30&&<div style={{opacity:p(t,30,30.4)}}><Img data-qa-media src={staticFile('productions/cinq-scores-v4/logo-officiel.png')} style={{position:'absolute',left:120,top:1340,width:50,height:50}}/><Txt x={190} y={1344} size={40} font={BRAND}>LIGUE ONZE</Txt><Txt x={650} y={1344} size={40} font={B}>ligueonze.fr</Txt></div>}
 </>};
export const NovemberPredictions=({qa=false}:{qa?:boolean})=>{const[handle]=useState(()=>delayRender('Polices pronostics')),[ready,setReady]=useState(false);
 useEffect(()=>{let active=true;(async()=>{for(const[name,src,weight]of [['LegendTitle','productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf','800'],['LegendBody','productions/cinq-scores-v4/brand-body.woff2','100 900'],['LegendBrand','productions/cinq-scores-v4/brand-display.woff2','600 800']]){const f=new FontFace(name,`url(${staticFile(src)})`,{weight});document.fonts.add(f);await f.load()}if(active)setReady(true)})().catch(e=>{console.error(e);continueRender(handle)});return()=>{active=false}},[handle]);useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 return <WorkshopShell production={{...manifest,qa:qa&&ready} as Production}><AbsoluteFill><Stadium/><Ticket index={0}/><Ticket index={1}/><Ticket index={2}/><Header/><Audio src={staticFile('productions/pronos-21-nov/music-and-sfx.wav')}/></AbsoluteFill></WorkshopShell>;
};
