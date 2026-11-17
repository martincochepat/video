import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,Easing,Img,Interactive,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../WorkshopShell';
import {forecastParts,forecastV2BallPose,forecastV2BallSpin} from './ForecastV2';
const {Pitch,Fabric,Sphere,Opening,Aerial,Lateral,CloseNet}=forecastParts;
const C={bg:'#080B0E',white:'#F6F7F8',lime:'#C8FF00',muted:'#8D969E'};
const T='ForecastV2Title',I='ForecastV2Info',base='productions/pronos-17-nov/';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const move=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],{...clamp,easing:Easing.bezier(.22,.8,.25,1)});
const games=[['PAYS DE GALLES – PORTUGAL','0–2'],['POLOGNE – SUÈDE','1–2'],['UKRAINE – GÉORGIE','1–0'],['DANEMARK – NORVÈGE','2–1']];
// L'horloge des quatre gestes validés est conservée : +1,2 s pour l'accroche.
export const forecastV3BallPose=(t:number)=>{
 if(t<1.15){const u=t/1.15;return {x:-170+1660*u*u,y:590-20*Math.sin(u*Math.PI),r:220};}
 if(t<2.65)return {x:move(t,1.15,2.65,1490,1180),y:move(t,1.15,2.65,590,1510),r:move(t,1.15,2.65,220,240)};
 if(t<3.4)return {...forecastV2BallPose(t-1.2),r:move(t,2.65,3.4,240,55)};
 if(t<26.5)return forecastV2BallPose(t-1.2);
 return {x:move(t,26.5,27.05,900,1060),y:move(t,26.5,27.05,1680,1710),r:move(t,26.5,27.05,60,140)};
};
export const forecastV3BallSpin=(time:number)=>time<2.65?time/2.65*forecastV2BallSpin(1.45):time<26.5?forecastV2BallSpin(time-1.2):forecastV2BallSpin(25.3)+(move(time,26.5,27.05,0,160)/100)*180/Math.PI;
const Intro=({t}:{t:number})=><>
 <Pitch/>
 <Interactive.Div data-qa-text name="Accroche générale" style={{position:'absolute',left:100,right:135,top:160,fontFamily:T,fontWeight:800,fontSize:140,lineHeight:1.25}}>4 MATCHS.</Interactive.Div>
 <div style={{position:'absolute',left:100,top:345,width:850,overflow:'hidden',clipPath:`inset(0 ${100-Math.min(100,Math.max(0,(forecastV3BallPose(t).x-100)/850*100))}% 0 0)`}}>
  <Interactive.Div data-qa-text name="Deuxième phrase de l’accroche" style={{fontFamily:T,fontWeight:800,fontSize:114,lineHeight:1.25}}>4 SCORES EXACTS.</Interactive.Div>
 </div>
 <Interactive.Div data-qa-text name="Prise de risque" style={{position:'absolute',left:100,right:135,top:690,fontFamily:T,fontWeight:800,fontSize:76,lineHeight:1.22,color:C.lime,opacity:move(t,1.2,1.45,0,1),translate:`0 ${move(t,1.2,1.6,18,0)}px`}}>JE PRENDS LE RISQUE !</Interactive.Div>
 <div data-qa-text style={{position:'absolute',left:102,top:850,fontFamily:I,fontSize:40,color:C.muted}}>MES PRONOS</div>
 {['gb-wls','pt','pl','se'].map((code,i)=><Fabric key={code} code={code} x={110+i*215} y={1090+(i%2)*85} w={175} angle={i%2?4:-4}/>)}
</>;
const Summary=({t}:{t:number})=><>
 <Pitch aerial opacity={.075}/>
 <Interactive.Div data-qa-text name="Synthèse" style={{position:'absolute',left:100,right:135,top:160,fontFamily:T,fontWeight:800,fontSize:92,lineHeight:1.16}}>ON FAIT LES<br/>COMPTES DEMAIN.</Interactive.Div>
 <div data-qa-text style={{position:'absolute',left:102,top:430,fontFamily:I,fontSize:40,color:C.muted}}>MES PRONOS</div>
 {games.map(([match,score],i)=><div key={match} style={{position:'absolute',left:100,top:555+i*174+move(t,21.24+i*.07,21.59+i*.07,20,0),width:830,height:150,opacity:move(t,21.24+i*.07,21.43+i*.07,0,1)}}>
  <div data-qa-text style={{position:'absolute',left:0,top:34,fontFamily:T,fontSize:51,fontWeight:800,lineHeight:1.22}}>{match}</div>
  <div data-qa-text style={{position:'absolute',right:0,top:4,fontFamily:T,fontSize:104,fontWeight:800,lineHeight:1.22,color:i===3?C.lime:C.white}}>{score}</div>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:1,background:'#435158'}}/>
 </div>)}
 <Interactive.Div data-qa-text name="Question aux commentaires" style={{position:'absolute',left:100,right:135,top:1320,fontFamily:T,fontWeight:800,fontSize:94,lineHeight:1.22,color:C.lime}}>TU CHANGES LEQUEL ?</Interactive.Div>
 <div data-qa-text style={{position:'absolute',left:100,right:135,top:1480,fontFamily:I,fontWeight:600,fontSize:44,lineHeight:1.35}}>DONNE TON SCORE<br/>EN COMMENTAIRE.</div>
</>;
const Signature=({t,logo}:{t:number;logo?:string|null})=><>
 <AbsoluteFill style={{background:C.bg}}/>
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M-200 1780L1000 1560L1300 1740" fill="none" stroke="#41564e" strokeWidth="4" opacity=".4"/></svg>
 {logo&&<Img data-qa-media src={staticFile(logo)} style={{position:'absolute',left:370,top:390,width:300,height:300,objectFit:'contain',opacity:move(t,26.5,26.7,0,1)}}/>}
 <Interactive.Div data-qa-text name="Promesse Ligue Onze" style={{position:'absolute',left:100,right:135,top:800,fontFamily:T,fontSize:78,fontWeight:800,lineHeight:1.22,textAlign:'center',opacity:move(t,26.62,26.82,0,1)}}>Le jeu des pronos<br/>entre potes</Interactive.Div>
 <Interactive.Div data-qa-text name="Adresse Ligue Onze" style={{position:'absolute',left:100,right:135,top:1100,fontFamily:I,fontSize:88,fontWeight:600,lineHeight:1.3,textAlign:'center',opacity:move(t,26.76,26.96,0,1)}}>ligueonze.fr</Interactive.Div>
 <div style={{position:'absolute',left:245,top:1240,width:555,height:7,background:C.lime,scale:`${move(t,26.76,27.05,0,1)} 1`,transformOrigin:'0 50%'}}/>
</>;
export const ForecastV3=({production}:{production:Production&{logoSrc?:string|null}})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),time=frame/fps,t=time-1.2;
 const [handle]=useState(()=>delayRender('Polices — reprise V3'));const [ready,setReady]=useState(false);
 useEffect(()=>{let cancelled=false;const faces=[new FontFace(T,`url("${staticFile(base+'fonts/BarlowCondensed-ExtraBold.ttf')}")`,{weight:'800'}),new FontFace(I,`url("${staticFile(base+'fonts/Inter.ttf')}")`,{weight:'100 900'})];faces.forEach(f=>document.fonts.add(f));Promise.all(faces.map(f=>f.load())).then(()=>{if(!cancelled)setReady(true)}).catch(e=>{if(!cancelled)cancelRender(e)});return()=>{cancelled=true;faces.forEach(f=>document.fonts.delete(f))}},[handle]);
 useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 const headerTransition=[[2.65,3.25],[6.2,6.75],[10.7,11.25],[15.2,15.75],[21.2,21.8]].find(([start,end])=>time>=start&&time<end);
 const headerState=headerTransition?(time<(headerTransition[0]+headerTransition[1])/2?headerTransition[0]-.01:headerTransition[1]+.01):null;
 const p=forecastV3BallPose(time);const spin=forecastV3BallSpin(time);
 return <WorkshopShell production={{...production,qa:Boolean(production.qa&&ready)}}><AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:I}}>
 {time<3.25&&<Intro t={time}/>}
 {time>=2.65&&time<6.75&&<AbsoluteFill style={{background:C.bg,clipPath:time<3.25?`circle(${move(time,2.65,3.25,0,2600)}px at 1080px 1530px)`:'none'}}><Aerial t={t}/></AbsoluteFill>}
 {time>=6.2&&time<11.25&&<AbsoluteFill style={{background:C.bg,clipPath:time<6.75?`inset(0 ${(100-move(time,6.2,6.75,0,100))/2}% 0 ${(100-move(time,6.2,6.75,0,100))/2}%)`:'none'}}><Lateral t={t}/></AbsoluteFill>}
 {time>=10.7&&time<15.75&&<AbsoluteFill style={{background:C.bg,clipPath:time<11.25?`circle(${move(time,10.7,11.25,0,2500)}px at 540px 1660px)`:'none'}}><CloseNet t={t}/></AbsoluteFill>}
 {time>=15.2&&time<21.8&&<AbsoluteFill style={{background:C.bg,clipPath:time<15.75?`inset(0 0 0 ${100-move(time,15.2,15.75,0,100)}%)`:'none'}}><Opening t={t} resolution harmonized/></AbsoluteFill>}
 {time>=21.2&&time<26.5&&<AbsoluteFill style={{background:C.bg,clipPath:time<21.8?`inset(${100-move(time,21.2,21.8,0,100)}% 0 0 0)`:'none'}}><Summary t={time}/></AbsoluteFill>}
 {time>=26.5&&<Signature t={time} logo={production.logoSrc}/>}
 {time>=6.2&&time<6.75&&<svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d={`M${move(time,6.2,6.75,65,540)} ${move(time,6.2,6.75,1280,570)}L${move(time,6.2,6.75,1015,540)} ${move(time,6.2,6.75,1280,1800)}`} stroke="#9bb4a7" strokeWidth="5" fill="none"/></svg>}
 {time>=15.2&&time<15.75&&<svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d={`M${move(time,15.2,15.75,1080,0)} 620V1920`} stroke="#8ca3a5" strokeWidth="5"/></svg>}
 {/* Les titres changent d'un bloc au milieu du raccord ; le masque reste limité au décor. */}
 {headerState!==null&&<AbsoluteFill style={{background:C.bg,height:540,overflow:'hidden',pointerEvents:'none'}}>
  {headerState<2.65?<Intro t={time}/>:headerState<6.2?<Aerial t={t}/>:headerState<10.7?<Lateral t={t}/>:headerState<15.2?<CloseNet t={t}/>:headerState<21.2?<Opening t={t} resolution harmonized/>:<Summary t={time}/>}
 </AbsoluteFill>}
 {(time<10.76||time>=15.2)&&<svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,pointerEvents:'none'}}><Sphere {...p} spin={spin}/></svg>}
 </AbsoluteFill></WorkshopShell>;
};
