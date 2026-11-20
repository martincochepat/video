import {useEffect,useState} from 'react';
import {AbsoluteFill,Sequence,continueRender,delayRender,staticFile,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../../WorkshopShell';
import manifest from '../../../productions/france-espagne-2027/manifest.json';
import {C,TextLifetimeContext} from './Design';
import {PageTurn} from '../erase-legend/Design';
import {Hook,Debate} from './Bookends';
import {History} from './History';
import {Spain,France} from './Teams';
import {Calendar,Draw} from './Draw';
export const FranceSpainNews=({qa=false}:{qa?:boolean})=>{
 const[handle]=useState(()=>delayRender('Polices France–Espagne')),[ready,setReady]=useState(false);const{fps}=useVideoConfig();
 useEffect(()=>{let active=true;(async()=>{for(const[name,src,weight]of [['LegendTitle','productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf','800'],['LegendBody','productions/cinq-scores-v4/brand-body.woff2','100 900'],['LegendBrand','productions/cinq-scores-v4/brand-display.woff2','600 800']]){const f=new FontFace(name,`url(${staticFile(src)})`,{weight});document.fonts.add(f);await f.load()}if(active)setReady(true)})().catch(e=>{console.error(e);continueRender(handle)});return()=>{active=false}},[handle]);useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 return <WorkshopShell production={{...manifest,qa:qa&&ready} as Production}><AbsoluteFill style={{background:C.bg}}>
 <Sequence name="Le choc du tirage" durationInFrames={Math.round(7.55*fps)}><Hook/></Sequence>
 <Sequence name="Trois précédents officiels" from={7*fps} durationInFrames={Math.round(15.55*fps)}><TextLifetimeContext.Provider value={15}><PageTurn kind={0}><History/></PageTurn></TextLifetimeContext.Provider></Sequence>
 <Sequence name="L’Espagne : portraits et buts" from={22*fps} durationInFrames={Math.round(15.55*fps)}><TextLifetimeContext.Provider value={15}><PageTurn kind={1}><Spain/></PageTurn></TextLifetimeContext.Provider></Sequence>
 <Sequence name="Les arguments des Bleus" from={37*fps} durationInFrames={Math.round(15.55*fps)}><TextLifetimeContext.Provider value={15}><PageTurn kind={2}><France/></PageTurn></TextLifetimeContext.Provider></Sequence>
 <Sequence name="Deux matchs pour une place" from={52*fps} durationInFrames={Math.round(12.55*fps)}><TextLifetimeContext.Provider value={12}><PageTurn kind={0}><Calendar/></PageTurn></TextLifetimeContext.Provider></Sequence>
 <Sequence name="Le tableau complet" from={64*fps} durationInFrames={Math.round(12.55*fps)}><TextLifetimeContext.Provider value={12}><PageTurn kind={1}><Draw/></PageTurn></TextLifetimeContext.Provider></Sequence>
 <Sequence name="Le débat et la signature" from={76*fps} durationInFrames={14*fps}><PageTurn kind={2}><Debate/></PageTurn></Sequence>
 </AbsoluteFill></WorkshopShell>;
};
