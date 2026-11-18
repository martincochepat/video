import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,Img,Interactive,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../../WorkshopShell';
import {Ball,C,Clock,I,mix,Net,Player,Stadium,step,Svg,T,Trophy,Tunnel} from './Assets';
type StoryProduction=Production&{logoSrc?:string|null;storyAlignment?:{audioSeconds:number;storySeconds:number}[]};
const origin='productions/pronos-17-nov/fonts/';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const editorial=[['opening',0,5],['panenka',5,15],['equalizer',15,24],['red-card',24,35],['legacy',35,45]] as const;
export const storyTime=(seconds:number,p:StoryProduction)=>{
 const points=p.storyAlignment;
 if(points&&points.length>1)return interpolate(seconds,points.map(x=>x.audioSeconds),points.map(x=>x.storySeconds),clamp);
 const s=p.scenes.find(s=>seconds>=s.startSeconds&&seconds<s.endSeconds);const e=editorial.find(x=>x[0]===s?.id);
 return s&&e?interpolate(seconds,[s.startSeconds,s.endSeconds],[e[1],e[2]],clamp):seconds;
};
export const ballPose=(t:number)=>{
 if(t<7.9)return {x:540,y:mix(t,7.4,7.9,1720,1740),r:88};
 if(t<8.6){const u=step(t,7.9,8.6);return {x:540,y:1740-652*Math.sin(u*Math.PI/2),r:88-55*u};}
 if(t<8.95)return {x:mix(t,8.6,8.95,540,550),y:mix(t,8.6,8.95,1088,1380),r:33};
 if(t<13.4)return {x:550,y:1380,r:33};
 if(t<14.8)return {x:mix(t,13.4,14.8,550,540),y:mix(t,13.4,14.8,1380,1270),r:mix(t,13.4,14.8,33,1250)};
 if(t<15.7)return {x:mix(t,14.8,15.7,540,1020),y:mix(t,14.8,15.7,1270,1550),r:mix(t,14.8,15.7,1250,80)};
 if(t<17.1){const u=step(t,15.9,17.1);return {x:1020-320*u,y:1550-370*Math.sin(u*Math.PI/2),r:80-42*u};}
 if(t<17.9)return {x:mix(t,17.1,17.9,700,220),y:mix(t,17.1,17.9,1180,1400),r:mix(t,17.1,17.9,38,31)};
 if(t<20.8)return {x:220,y:1400,r:31};
 return {x:mix(t,20.8,21.4,220,-100),y:1400,r:31};
};
const spins=[0];for(let n=1;n<=2700;n++){const a=ballPose((n-1)/60),b=ballPose(n/60);spins.push(spins[n-1]+Math.hypot(b.x-a.x,b.y-a.y)/((a.r+b.r)/2)*180/Math.PI)}
export const ballSpin=(t:number)=>{const k=Math.min(2700,Math.max(0,t*60));const i=Math.floor(k);return spins[i]+(spins[Math.min(2700,i+1)]-spins[i])*(k-i)};
export const rewindClockPose=(t:number)=>({minute:t<5.1?110:mix(t,5.1,6.4,110,7),x:mix(t,4.7,5.4,820,540),y:mix(t,4.7,5.4,710,1220),r:mix(t,4.7,5.4,115,150)});
const cardAperture=(t:number)=>t<29.5?`inset(${mix(t,28.8,29.5,49,0)}% ${mix(t,28.8,29.5,20,0)}% ${mix(t,28.8,29.5,37,0)}% ${mix(t,28.8,29.5,64,0)}% round ${mix(t,28.8,29.5,12,0)}px)`:'none';
const Score=({left,right,t,at}:{left:string;right:string;t:number;at:number})=>t<at?null:<div style={{position:'absolute',inset:0,opacity:step(t,at,at+.35)}}>
 <div data-qa-text style={{position:'absolute',left:145,top:575,width:300,textAlign:'center',fontFamily:T,fontSize:250,fontWeight:800,lineHeight:1.25}}>{left}</div>
 <div data-qa-text style={{position:'absolute',left:635,top:575,width:300,textAlign:'center',fontFamily:T,fontSize:250,fontWeight:800,lineHeight:1.25}}>{right}</div>
 <div style={{position:'absolute',left:500,top:675,width:80,textAlign:'center',fontFamily:T,fontSize:100,fontWeight:800,color:C.muted}}>–</div>
 {['FRANCE','ITALIE'].map((s,i)=><div key={s} data-qa-text style={{position:'absolute',left:i?635:145,top:885,width:300,textAlign:'center',fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3}}>{s}</div>)}
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>{[['#315675','#eceee8','#993b43'],['#3c694f','#eceee8','#993b43']].map((colors,i)=><g key={i}>{colors.map((fill,j)=><rect key={j} x={245+i*490+j*34} y="960" width="34" height="6" fill={fill}/>)}</g>)}</svg>
</div>;
const Foot=({text='RECONSTITUTION GRAPHIQUE'}:{text?:string})=><div data-qa-text style={{position:'absolute',left:100,right:130,top:1690,fontFamily:I,fontSize:40,lineHeight:1.35,color:C.muted}}>{text}</div>;
const Title=({t}:{t:number})=>{
 let lines=['IL LUI RESTAIT','10 MINUTES.'],size=110,kicker='FOOTBALL STORIES · BERLIN 2006';
 if(t>=5.05&&t<14.9){lines=['7e MINUTE.','ZIDANE.'];}
 else if(t>=14.9&&t<21.25){lines=['19e MINUTE.','MATERAZZI.'];}
 else if(t>=21.25&&t<24.05){lines=['LE MATCH','S’ÉTIRE.'];}
 else if(t>=24.05&&t<29.1){lines=['110e MINUTE.','LE CARTON ROUGE.'];size=96;}
 else if(t>=29.1&&t<35.1){lines=['IL QUITTE','LA FINALE.'];}
 else if(t>=35.1&&t<39.5){lines=['ITALIE.','CHAMPIONNE','DU MONDE.'];size=95;}
 else if(t>=39.5){lines=['CE GESTE CHANGE-T-IL','TON REGARD','SUR ZIDANE ?'];size=82;kicker='FOOTBALL STORIES · LA QUESTION';}
 return <>
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:150,fontFamily:I,fontSize:40,fontWeight:600,lineHeight:1.3,color:C.muted}}>{kicker}</div>
 <div style={{position:'absolute',left:100,top:213,width:90,height:5,background:C.lime}}/>
 <Interactive.Div data-qa-text name="Titre narratif" style={{position:'absolute',left:100,right:130,top:244,fontFamily:T,fontSize:size,fontWeight:800,lineHeight:1.22,color:C.white}}>{lines.map((line,i)=><span key={line}>{i>0&&<br/>}<span style={{color:t<5.05&&i===1?C.lime:C.white}}>{line}</span></span>)}</Interactive.Div>
 </>;
};
const Plinth=()=> <Svg><defs><linearGradient id="plinth" x2="0" y2="1"><stop stopColor="#2b363c"/><stop offset="1" stopColor="#0b1115"/></linearGradient></defs><ellipse cx="540" cy="1640" rx="355" ry="50" fill="#000" opacity=".6"/><path d="M245 1510L835 1510L825 1620Q540 1670 255 1620Z" fill="url(#plinth)"/><ellipse cx="540" cy="1510" rx="295" ry="48" fill="#2b363c" stroke="#56626a" strokeWidth="2"/><path d="M265 1570Q540 1612 815 1570" fill="none" stroke="#67757c" strokeWidth="1" opacity=".5"/></Svg>;
const Penalty=({t}:{t:number})=>{
 const p=ballPose(t);const dive=step(t,8.05,8.65);
 return <><Stadium pan={mix(t,5.1,6.4,45,0)} light={.8}/>
 <Svg>
  <ellipse cx="540" cy="1745" rx="155" ry="30" fill="#000" opacity=".25"/>
  <path d="M352 1746Q540 1670 728 1746" fill="none" stroke="#9fb8aa" strokeWidth="3" opacity=".4"/>
  <g transform={`translate(${dive*250} ${dive*95}) rotate(${dive*65} 540 1410)`}><Player x={540} y={1500} h={260} number="1" blue/></g>
  <Net x={190} y={1050} w={700} h={470} impact={8.95} t={t} hitV={.70} frameOnly/>
  {t>=8.95&&t<13.4&&<Ball {...p} spin={ballSpin(t)} shadow={false}/>}
  <Net x={190} y={1050} w={700} h={470} impact={8.95} t={t} hitV={.70}/>
  {t<8.95&&<Ball {...p} spin={ballSpin(t)}/>}
  {t>=7.5&&t<8.3&&<g opacity={step(t,7.5,7.7)*(1-step(t,8.05,8.3))} transform={`translate(${mix(t,7.5,8.0,-180,0)} ${mix(t,7.5,8.0,0,-5)})`}><path d="M280 1790L395 1760L455 1710L502 1730L498 1788L440 1813H290Z" fill="#293941" stroke="#8c9fa3" strokeWidth="3"/><path d="M313 1800H476M432 1743L463 1768M421 1754L453 1776" fill="none" stroke="#cbd7d6" strokeWidth="4"/></g>}
 </Svg>
 <Score left="1" right="0" t={t} at={9.15}/>
 {t>=6.4&&t<7.7&&<div data-qa-text style={{position:'absolute',left:100,right:130,top:625,fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3,color:C.muted}}>UNE PANENKA EN FINALE.</div>}
 </>;
};
const Equalizer=({t}:{t:number})=>{
 const p=ballPose(t);const jump=Math.sin(step(t,16.6,17.8)*Math.PI)*45;
 return <><Stadium pan={mix(t,15.3,16.4,-70,-20)} light={.8}/>
 <Svg>
  <path d="M-90 1820L1040 1540L850 1190L-110 1340" fill="none" stroke="#a2b8aa" strokeWidth="4" opacity=".5"/>
  <Net x={-100} y={1180} w={620} h={410} impact={17.9} t={t} hitV={.54} frameOnly/>
  <Player x={700} y={1540-jump} h={320} number="23" blue/>
  {t>=17.9&&t<20.8&&<Ball {...p} spin={ballSpin(t)} shadow={false}/>}
  <Net x={-100} y={1180} w={620} h={410} impact={17.9} t={t} hitV={.54}/>
  {t>=15.7&&t<17.9&&<Ball {...p} spin={ballSpin(t)} shadow={false}/>}
  {t>=20.8&&<Ball {...p} spin={ballSpin(t)}/>}
 </Svg>
 <Score left="1" right="1" t={t} at={18.25}/>
 {t>=21.25&&<div data-qa-text style={{position:'absolute',left:100,top:1450,fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3,color:C.muted}}>PROLONGATION.</div>}
 </>;
};
const RedCard=({t}:{t:number})=><><Stadium pan={mix(t,24,25.1,0,30)} light={.35}/>
 <Svg><Player x={mix(t,27.5,29.2,540,500)} y={mix(t,27.5,29.2,1650,1550)} h={mix(t,27.5,29.2,400,350)} walk={t>=27.5?Math.sin((t-27.5)*8)*step(t,27.5,28):0}/>
 <g transform={`translate(770 ${mix(t,25.7,26.35,1580,1070)})`} opacity={step(t,25.7,25.92)}><rect x="-82" y="-132" width="180" height="275" rx="14" fill="#000" opacity=".35" transform="translate(16 17)"/><path d="M-82-132H88V133H-82Z" fill="#70272d"/><rect x="-82" y="-132" width="170" height="265" rx="12" fill="#b43d43"/><path d="M-70 117V-118H75" stroke="#eb8582" strokeWidth="3" fill="none" opacity=".6"/><path d="M-62 128H78V-120" stroke="#5e1f27" strokeWidth="5" fill="none"/></g>
 </Svg>
 </>;
const Hall=({t}:{t:number})=><><Tunnel track={step(t,33,35.4)}/><Svg><Player x={mix(t,29.2,33.8,500,540)} y={mix(t,29.2,33.8,1550,1500)} h={mix(t,29.2,33.8,350,185)} opacity={1-step(t,33.7,34.4)} walk={Math.sin((t-29.2)*8)*step(t,29.2,29.6)*(1-step(t,33.5,34.1))}/></Svg></>;
const Legacy=({t}:{t:number})=><><Stadium light={.25}/><Plinth/>
 {t>=35.4&&t<39.5&&<>
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:640,fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3,color:C.muted}}>1–1 APRÈS PROLONGATION.</div>
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:1560,fontFamily:T,fontSize:68,fontWeight:800,lineHeight:1.25,color:C.lime}}>ITALIE 5–3 FRANCE</div>
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:1650,fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3,color:C.muted}}>AUX TIRS AU BUT.</div>
 </>}
 </>;
const Signature=({t,logo}:{t:number;logo?:string|null})=><><AbsoluteFill style={{background:C.bg}}/><Svg><path d="M-200 1750L1080 1480M540 1700Q300 1600 0 1670" stroke="#4b625b" strokeWidth="3" fill="none" opacity=".3"/></Svg>
 {logo&&<Img data-qa-media src={staticFile(logo)} style={{position:'absolute',left:370,top:430,width:300,height:300,objectFit:'contain',opacity:step(t,42.5,42.72)}}/>}
 <Interactive.Div data-qa-text name="Signature Ligue Onze" style={{position:'absolute',left:100,right:130,top:880,textAlign:'center',fontFamily:T,fontSize:82,fontWeight:800,lineHeight:1.25,opacity:step(t,42.64,42.86)}}>Le jeu des pronos<br/>entre potes</Interactive.Div>
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:1160,textAlign:'center',fontFamily:I,fontSize:86,fontWeight:600,lineHeight:1.3,opacity:step(t,42.76,42.98)}}>ligueonze.fr</div>
 <div style={{position:'absolute',left:245,top:1300,width:560,height:6,background:C.lime,scale:`${step(t,42.8,43.15)} 1`,transformOrigin:'0 50%'}}/>
 </>;
export const ZidaneStory=({production}:{production:StoryProduction})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=storyTime(frame/fps,production);
 const [handle]=useState(()=>delayRender('Polices Football Stories'));const [ready,setReady]=useState(false);
 useEffect(()=>{let active=true;const fonts=[new FontFace(T,`url("${staticFile(origin+'BarlowCondensed-ExtraBold.ttf')}")`,{weight:'800'}),new FontFace(I,`url("${staticFile(origin+'Inter.ttf')}")`,{weight:'100 900'})];fonts.forEach(f=>document.fonts.add(f));Promise.all(fonts.map(f=>f.load())).then(()=>{if(active)setReady(true)}).catch(e=>{if(active)cancelRender(e)});return()=>{active=false;fonts.forEach(f=>document.fonts.delete(f))}},[handle]);useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 const p=ballPose(t),clock=t<5.1?110:t<7.3?mix(t,5.1,6.4,110,7):mix(t,21.5,23.6,19,110);
 return <WorkshopShell production={{...production,qa:Boolean(production.qa&&ready)}}><AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:I}}>
 {t<5.4&&<><Stadium light={.45}/><Plinth/></>}
 {t>=4.7&&t<15.7&&<AbsoluteFill style={{background:C.bg,clipPath:t<5.4?`ellipse(${mix(t,4.7,5.4,0,2500)}px ${mix(t,4.7,5.4,0,3000)}px at 540px 1000px)`:'none'}}><Penalty t={t}/></AbsoluteFill>}
 {t>=14.8&&t<24.4&&<AbsoluteFill style={{background:C.bg,clipPath:t<15.7?`circle(${mix(t,14.8,15.7,100,2500)}px at 540px 1270px)`:'none'}}><Equalizer t={t}/></AbsoluteFill>}
 {t>=23.7&&t<29.5&&<AbsoluteFill style={{background:C.bg,clipPath:t<24.4?`inset(0 ${mix(t,23.7,24.4,100,0)}% 0 0)`:'none'}}><RedCard t={t}/></AbsoluteFill>}
 {t>=28.8&&t<35.4&&<AbsoluteFill style={{background:C.bg,clipPath:cardAperture(t)}}><Hall t={t}/></AbsoluteFill>}
 {t>=34.7&&t<42.5&&<AbsoluteFill style={{background:C.bg,clipPath:t<35.4?`ellipse(${mix(t,34.7,35.4,0,2300)}px ${mix(t,34.7,35.4,0,2800)}px at 540px 1230px)`:'none'}}><Legacy t={t}/></AbsoluteFill>}
 {t>=5.4&&t<7.3&&<div style={{opacity:1-step(t,6.7,7.3)}}><Clock {...rewindClockPose(t)}/></div>}
 {t>=21.25&&t<25.5&&<div style={{opacity:step(t,21.25,21.65)*(1-step(t,24.7,25.5))}}><Clock minute={clock} x={830} y={1250} r={155}/></div>}
 {t<5.4&&<><Clock {...rewindClockPose(t)}/><div style={{position:'absolute',inset:0,translate:`${mix(t,4.7,5.4,0,-1600)}px 0px`,scale:mix(t,4.7,5.4,1,3.5),transformOrigin:'540px 1000px'}}><Trophy x={540} y={mix(t,0,1.7,1230,1200)} h={mix(t,0,1.7,700,760)}/></div></>}
 {t>=13.4&&t<15.7&&<Svg><Ball {...p} spin={ballSpin(t)} shadow={false}/></Svg>}
 {t>=28.8&&t<42.5&&<AbsoluteFill style={{clipPath:cardAperture(t)}}><Trophy x={mix(t,33,35.4,870,540)} y={mix(t,33,35.4,1450,1160)+mix(t,39.5,40.3,0,75)} h={mix(t,33,35.4,500,720)-mix(t,39.5,40.3,0,150)} blur={mix(t,33,35.4,2,0)}/></AbsoluteFill>}
 {t<42.5&&<><AbsoluteFill style={{height:560,background:C.bg}}/><Title t={t}/></>}
 {t<4.7&&<div data-qa-text style={{position:'absolute',left:100,right:130,top:1560,fontFamily:I,fontSize:44,fontWeight:600,lineHeight:1.3}}>9 JUILLET 2006 · BERLIN</div>}
 {(t<4.7||(t>=21.5&&t<35.1))&&<Foot/>}
 {t>=39.5&&t<42.5&&<Foot text="FOOTBALL STORIES · LIGUE ONZE"/>}
 {t>=42.5&&<Signature t={t} logo={production.logoSrc}/>}
 </AbsoluteFill></WorkshopShell>;
};
