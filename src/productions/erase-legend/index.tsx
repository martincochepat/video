import {useEffect,useState} from 'react';
import {AbsoluteFill,Audio,Sequence,continueRender,delayRender,staticFile,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../../WorkshopShell';
import manifest from '../../../productions/effacer-legende/manifest.json';
import {C,PageTurn,TextLifetimeContext} from './Design';
import {Hook,Choice} from './Bookends';
import {LegendChapter} from './Chapters';
export const EraseLegend=({qa=false}:{qa?:boolean})=>{
 const[handle]=useState(()=>delayRender('Polices Football Stories')),[ready,setReady]=useState(false);const{fps}=useVideoConfig();
 useEffect(()=>{let active=true;(async()=>{for(const[name,src,weight]of [['LegendTitle','productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf','800'],['LegendBody','productions/cinq-scores-v4/brand-body.woff2','100 900'],['LegendBrand','productions/cinq-scores-v4/brand-display.woff2','600 800']]){const f=new FontFace(name,`url(${staticFile(src)})`,{weight});document.fonts.add(f);await f.load()}if(active)setReady(true)})().catch(e=>{console.error(e);continueRender(handle)});return()=>{active=false}},[handle]);
 useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 return <WorkshopShell production={{...manifest,qa:qa&&ready} as Production}><AbsoluteFill style={{background:C.bg}}>
 <Sequence name="Accroche · quatre souvenirs" durationInFrames={Math.round(5.55*fps)}><TextLifetimeContext.Provider value={5}><Hook/></TextLifetimeContext.Provider></Sequence>
 <Sequence name="Messi · génie, vision, 2022" from={5*fps} durationInFrames={Math.round(18.55*fps)}><PageTurn kind={0}><TextLifetimeContext.Provider value={18}><LegendChapter index={0}/></TextLifetimeContext.Provider></PageTurn></Sequence>
 <Sequence name="Ronaldo · cinq sommets, Portugal" from={23*fps} durationInFrames={Math.round(18.55*fps)}><PageTurn kind={1}><TextLifetimeContext.Provider value={18}><LegendChapter index={1}/></TextLifetimeContext.Provider></PageTurn></Sequence>
 <Sequence name="Zidane · 1998, 2000, Glasgow" from={41*fps} durationInFrames={Math.round(18.55*fps)}><PageTurn kind={2}><TextLifetimeContext.Provider value={18}><LegendChapter index={2}/></TextLifetimeContext.Provider></PageTurn></Sequence>
 <Sequence name="Ronaldinho · le jeu et trois titres" from={59*fps} durationInFrames={Math.round(18.55*fps)}><PageTurn kind={0}><TextLifetimeContext.Provider value={18}><LegendChapter index={3}/></TextLifetimeContext.Provider></PageTurn></Sequence>
 <Sequence name="Le choix impossible" from={77*fps} durationInFrames={11*fps}><PageTurn kind={1}><Choice/></PageTurn></Sequence>
 <Audio src={staticFile('productions/effacer-legende/music-and-sfx.wav')}/>
 </AbsoluteFill></WorkshopShell>;
};
