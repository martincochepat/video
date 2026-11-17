import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,Easing,Img,Interactive,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../WorkshopShell';

const C={bg:'#080B0E',surface:'#171C21',lime:'#C8FF00',white:'#F6F7F8',muted:'#8D969E'};
const title='ForecastTitle',info='ForecastInfo';
const assets='productions/pronos-17-nov/';
const ease={easing:Easing.bezier(.2,.8,.2,1),extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const m=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],ease);
const lin=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const fixtures=[{a:'PAYS DE GALLES',b:'PORTUGAL',fa:'gb-wls',fb:'pt',score:'0–2'},{a:'POLOGNE',b:'SUÈDE',fa:'pl',fb:'se',score:'1–2'},{a:'UKRAINE',b:'GÉORGIE',fa:'ua',fb:'ge',score:'1–0'},{a:'DANEMARK',b:'NORVÈGE',fa:'dk',fb:'no',score:'2–1'}];
type ForecastProduction=Production&{logoSrc?:string|null};
const Flag=({code,x,y,w=150}:{code:string;x:number;y:number;w?:number})=><div style={{position:'absolute',left:x,top:y,width:w,height:w*.75,background:'#30383e',padding:4,borderRadius:3,boxShadow:'6px 9px 0 #11171b, 0 20px 30px #0006'}}><Img data-qa-media src={staticFile(assets+'flags/'+code+'.svg')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>;
const Header=({first,second,match,step}:{first:string;second?:string;match?:string;step?:number})=><>
 <Interactive.Div data-qa-text name="Message sportif" style={{position:'absolute',left:100,right:130,top:170,fontFamily:title,fontSize:104,fontWeight:800,lineHeight:1.22,color:C.white}}>{first}{second&&<><br/>{second}</>}</Interactive.Div>
 {match&&<div data-qa-text style={{position:'absolute',left:100,right:130,top:438,fontFamily:title,fontSize:58,fontWeight:800,lineHeight:1.25,color:C.white}}>{match}</div>}
 <div style={{position:'absolute',left:102,top:540,fontFamily:info,fontSize:36,fontWeight:600,color:C.lime,letterSpacing:2}}>MES PRONOS</div>
 {step&&<div style={{position:'absolute',right:135,top:540,fontFamily:info,fontSize:36,color:C.muted}}>{step}/4</div>}
</>;

const Ball=({x,y,r=44,rotation=0,shadowY,opacity=1}:{x:number;y:number;r?:number;rotation?:number;shadowY?:number;opacity?:number})=><g opacity={opacity}>
 <ellipse cx={x+9} cy={shadowY??y+r*.7} rx={r*.8*Math.max(.35,1-Math.max(0,(shadowY??y+r*.7)-y-r*.7)/700)} ry={r*.2*Math.max(.35,1-Math.max(0,(shadowY??y+r*.7)-y-r*.7)/700)} fill="#000" opacity=".4"/>
 <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
  <circle r={r} fill="#e9ece6" stroke="#8c9694" strokeWidth={r*.035}/>
  <path d={`M${-r*.12} ${-r*.42}L${r*.35} ${-r*.22}L${r*.24} ${r*.27}L${-r*.25} ${r*.38}L${-r*.47} ${-r*.02}Z`} fill="#1b2428"/>
  <path d={`M${-r*.5} ${-r*.77}L${-r*.68} ${-r*.4}M${r*.66} ${-r*.58}L${r*.85} ${-r*.12}M${r*.66} ${r*.6}L${r*.2} ${r*.86}M${-r*.78} ${r*.3}L${-r*.53} ${r*.73}`} stroke="#273136" strokeWidth={r*.12} fill="none"/>
  <path d={`M${-r*.7} ${-r*.3}Q${-r*.38} ${-r*.82} ${r*.08} ${-r*.82}`} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth={r*.07} strokeLinecap="round"/>
 </g>
</g>;

const Goal=({x,y,scale=1,impact=-10,t}:{x:number;y:number;scale?:number;impact?:number;t:number})=>{
 const dt=t-impact;const flex=dt>=0&&dt<1?Math.sin(dt*20)*Math.exp(-dt*5)*20:0;
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
 <path d="M-8 192L226 254L275 220L35 155Z" fill="#000" opacity=".3"/>
 <g stroke="#536369" strokeWidth="7" fill="none" strokeLinejoin="round"><path d="M0 0L40 -30L260 30V230L220 260M40 -30V170L0 200M40 170L260 230"/></g>
 <g fill="none" stroke="#a8b7ba" strokeWidth="1.5" opacity=".58">{Array.from({length:12},(_,i)=><path key={'v'+i} d={`M${i*20} ${i*60/11}Q${i*20+flex} ${100+i*60/11} ${i*20} ${200+i*60/11}`}/>)}{Array.from({length:11},(_,i)=><path key={'h'+i} d={`M0 ${i*20}Q${110+flex} ${30+i*20} 220 ${60+i*20}`}/>)}<path d="M0 0L40 -30L260 30L220 60M10 -8L230 52M25 -18L245 42"/></g>
 <path d="M0 200V0L220 60V260" fill="none" stroke="#e8eeed" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
 <path d="M-8 200H10M210 260H230" stroke="#929fa4" strokeWidth="8" strokeLinecap="round"/>
 </g>;
};

const Stage=({t,close=false,summary=false}:{t:number;close?:boolean;summary?:boolean})=>{
 const closeProgress=close?m(t,9.5,10.1,0,1):0;
 return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,opacity:summary?.13:1}} aria-label="Terrain miniature illustré en volume, marquages, cage et accessoires">
  <defs><pattern id="fieldlines" width="150" height="200" patternUnits="userSpaceOnUse"><rect width="75" height="200" fill="#ffffff" opacity=".016"/></pattern></defs>
  <ellipse cx="555" cy="1540" rx="440" ry="70" fill="#000" opacity=".5"/>
  <g>
   <path d="M100 1285L700 1550L1010 1195V1227L700 1582L100 1317Z" fill="#101c20"/>
   <path d="M100 1285L700 1550L1010 1195L410 930Z" fill="#1c302e"/>
   <path d="M100 1285L700 1550L1010 1195L410 930Z" fill="url(#fieldlines)"/>
   <g stroke="#718880" strokeWidth="3" fill="none"><path d="M140 1275L691 1518L970 1206L419 963Z"/><path d="M406 1394L685 1082"/><ellipse cx="555" cy="1240" rx="100" ry="56" transform="rotate(23 555 1240)"/><path d="M740 1105L907 1179L823 1275L656 1201Z"/></g>
   <path d="M158 1262L191 1245L199 1256L166 1273Z" fill={C.lime}/>
   <path d="M731 1484L740 1469L748 1488Z" fill={C.lime}/><path d="M731 1484L748 1488L747 1494L730 1490Z" fill="#769a00"/>
   <Goal x={740-340*closeProgress} y={1000+50*closeProgress} scale={.82+.73*closeProgress} impact={close?10.8:15.55} t={t}/>
   <g transform="translate(300 1230)"><ellipse cy="89" rx="50" ry="15" fill="#000" opacity=".3"/><path d="M-31 64L-18 9L27 20L13 77Z" fill="#2e383d" stroke="#64716e" strokeWidth="3"/><path d="M-18 9L-11 -5L34 6L27 20Z" fill="#556167"/><path d="M-7 32L14 37M-11 46L10 51" stroke={C.lime} strokeWidth="4"/></g>
  </g>
 </svg>;
};

const Board=({x=140,y=650,w=800,h=420,reveal,t,score}:{x?:number;y?:number;w?:number;h?:number;reveal:number;t:number;score:string})=><div style={{position:'absolute',left:x,top:y,width:w,height:h}}>
 <div style={{position:'absolute',left:25,top:h-5,width:20,height:180,background:'#273238',boxShadow:'10px 0 #11191d'}}/><div style={{position:'absolute',right:25,top:h-5,width:20,height:180,background:'#273238',boxShadow:'10px 0 #11191d'}}/>
 <div style={{position:'absolute',inset:0,borderRadius:16,background:C.surface,border:'3px solid #39464d',boxShadow:'12px 15px 0 #0c1217, 0 35px 40px #0008',overflow:'hidden'}}>
  <div style={{position:'absolute',left:25,right:25,top:20,height:4,background:C.lime}}/>
  {[30,w-40].map(xx=><div key={xx} style={{position:'absolute',left:xx,top:h-30,width:8,height:8,borderRadius:'50%',background:'#626e75',boxShadow:'1px 2px 0 #070b0f'}}/>)}
  <div style={{position:'absolute',left:40,right:40,top:40,height:h-80,overflow:'hidden',display:'flex',alignItems:'center'}}>
   {t>=reveal&&<div data-qa-text style={{textAlign:'center',fontFamily:title,fontWeight:800,width:'100%',fontSize:h<=300?166:h<=340?180:190,lineHeight:1.22,color:C.white,translate:`0px ${m(t,reveal,reveal+.4,22,0)}px`,opacity:m(t,reveal,reveal+.2,0,1)}}>{score}</div>}
  </div>
 </div>
</div>;

const FaceOff=({t,opening=false}:{t:number;opening?:boolean})=>{
 const sway=opening?m(t,.35,.7,0,8)-m(t,.7,1.1,0,8):0;
 return <>
 <div style={{position:'absolute',left:160,top:675,translate:`0px ${sway}px`,width:250,height:320,background:'#1b2227',border:'2px solid #35414a',borderRadius:10,boxShadow:'10px 14px 0 #0c1115,0 30px 40px #0007'}}><div style={{position:'absolute',left:33,top:220,width:185,height:5,background:C.lime}}/></div>
 <div style={{position:'absolute',left:660,top:675,translate:`0px ${-sway*.6}px`,width:250,height:320,background:'#1b2227',border:'2px solid #35414a',borderRadius:10,boxShadow:'10px 14px 0 #0c1115,0 30px 40px #0007'}}><div style={{position:'absolute',left:33,top:220,width:185,height:5,background:'#72818a'}}/></div>
 <Flag code="dk" x={192} y={720+sway} w={180}/><Flag code="no" x={692} y={720-sway*.6} w={180}/>
 <div style={{position:'absolute',left:475,top:780,fontFamily:title,fontSize:68,fontWeight:800,color:C.muted}}>VS</div>
 </>;
};

const Opening=({t}:{t:number})=><>
 <Header first="JE VOIS LA" second="NORVÈGE PERDRE." match="DANEMARK – NORVÈGE"/>
 <FaceOff t={t} opening/>
</>;
const Wales=({t}:{t:number})=><>
 <Header first="PAYS DE GALLES" second="– PORTUGAL" match="MON PRONO" step={1}/>
 <Board t={t} y={675} reveal={2.15} score="0–2"/>
 <Flag code="gb-wls" x={155} y={1190} w={135}/><Flag code="pt" x={775} y={1390} w={135}/>
</>;
const Poland=({t}:{t:number})=><>
 <Header first="POLOGNE" second="– SUÈDE" match="MON PRONO" step={2}/>
 {[{x:140,flag:'pl',name:'POLOGNE',score:'1',delay:5.12},{x:600,flag:'se',name:'SUÈDE',score:'2',delay:5.2}].map(p=><div key={p.flag} style={{position:'absolute',left:p.x,top:675+ m(t,p.delay,p.delay+.35,22,0),width:330,height:450,background:C.surface,border:'3px solid #39464d',borderRadius:12,boxShadow:'12px 15px 0 #0c1217, 0 35px 40px #0008'}}>
 <Flag code={p.flag} x={97} y={35} w={130}/><div data-qa-text style={{position:'absolute',top:178,width:'100%',fontSize:54,fontFamily:title,fontWeight:800,textAlign:'center'}}>{p.name}</div>
 {t>=6.25&&<div data-qa-text style={{position:'absolute',top:205,width:'100%',fontSize:190,fontFamily:title,fontWeight:800,textAlign:'center',lineHeight:1.22,opacity:m(t,6.25,6.45,0,1),translate:`0px ${m(t,6.25,6.65,20,0)}px`}}>{p.score}</div>}
 </div>)}
 <svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M540 660V1240" stroke="#35464d" strokeWidth="3"/><circle cx="540" cy="1240" r="12" stroke="#536970" strokeWidth="2" fill="#080B0E"/></svg>
 <div style={{position:'absolute',left:510,top:930,fontFamily:title,fontSize:92,color:C.muted}}>–</div>
</>;
const Ukraine=({t}:{t:number})=><>
 <Header first="UKRAINE" second="– GÉORGIE" match="MON PRONO" step={3}/>
 <Board t={t} x={210} y={610} w={660} h={340} reveal={11} score="1–0"/>
 <Flag code="ua" x={115} y={1090} w={125}/><Flag code="ge" x={790} y={1410} w={125}/>
</>;
const Denmark=({t}:{t:number})=><>
 <Header first="MON CHOIX :" second="LE DANEMARK." match="DANEMARK – NORVÈGE" step={4}/>
 <FaceOff t={t}/>
 <Board t={t} x={220} y={1090} w={640} h={300} reveal={15.65} score="2–1"/>
 {t>=15.65&&t<16.25&&<div style={{position:'absolute',left:216,top:1086,width:648,height:308,borderRadius:18,border:`4px solid ${C.lime}`,opacity:lin(t,15.65,16.25,1,0),pointerEvents:'none'}}/>}
</>;
const Summary=({t,logo}:{t:number;logo?:string|null})=><>
 <Interactive.Div data-qa-text name="Question finale" style={{position:'absolute',left:100,right:130,top:170,fontFamily:title,fontSize:110,fontWeight:800,lineHeight:1.22}}>LEQUEL TU<br/><span style={{color:C.lime}}>CHANGES ?</span></Interactive.Div>
 <div style={{position:'absolute',left:102,top:465,fontSize:36,fontFamily:info,color:C.muted}}>MES PRONOS</div>
 {fixtures.map((f,i)=><div key={f.fa} style={{position:'absolute',left:100+m(t,20.08+i*.07,20.48+i*.07,-22,0),top:600+i*175,width:850,height:145,background:C.surface,border:'2px solid #354149',borderRadius:10,boxShadow:'8px 10px 0 #030608',opacity:m(t,20.08+i*.07,20.25+i*.07,0,1)}}>
  <div style={{position:'absolute',left:20,top:20,width:5,height:105,background:i===3?C.lime:'#52616a'}}/>
  <div data-qa-text style={{position:'absolute',left:42,top:42,fontFamily:title,fontSize:52,fontWeight:800,lineHeight:1.2,color:C.white}}>{f.a} – {f.b}</div>
  <div data-qa-text style={{position:'absolute',right:24,top:16,fontFamily:title,fontSize:88,fontWeight:800,lineHeight:1.2,color:i===3?C.lime:C.white}}>{f.score}</div>
 </div>)}
 <div style={{position:'absolute',left:100,right:130,top:1390,fontFamily:info,fontWeight:600,fontSize:36,lineHeight:1.4,color:C.white}}>Le match + ton score<br/>en commentaire.</div>
 {logo&&<Img data-qa-media src={staticFile(logo)} style={{position:'absolute',left:100,top:1570,width:120,height:120,objectFit:'contain'}}/>}
</>;

export const forecastBallPose=(t:number)=>{
 let x=0,y=0,r=42,shadow:number|undefined=undefined;
 if(t<1.45){const u=lin(t,-.12,1.45,0,1);x=850-1250*u*u;y=1030+750*u;r=80+145*Math.sin(Math.min(1,u)*Math.PI*.7);shadow=1590;}
 else if(t<5){x=t<2.3?m(t,1.45,2.3,-180,470):t<4.5?m(t,2.8,3.45,470,680):m(t,4.5,5,680,540);y=t<2.3?m(t,1.45,2.3,1800,1370):m(t,2.8,3.45,1370,1310);}
 else if(t<9.5){x=540;y=t<6.25?m(t,5,6.25,1310,1215):t<8.8?1215:m(t,8.8,9.5,1215,1370);}
 else if(t<14){const u=lin(t,10.2,10.8,0,1);x=t<10.2?m(t,9.5,10.2,540,340):t<13.4?340+310*u*u:m(t,13.4,14,650,680);y=t<10.2?m(t,9.5,10.2,1370,1490):t<13.4?1490-330*u+140*u*u:m(t,13.4,14,1300,1460);r=m(t,9.5,9.75,42,40);shadow=t<10.2?y+36:t<13.4?1530-170*u:y+36;}
 else if(t<20){x=t<15.05?m(t,14.65,15.05,680,650):m(t,15.05,15.55,650,865);y=t<15.05?1460:m(t,15.05,15.55,1460,1180);r=t<14.4?m(t,14,14.4,40,46):m(t,14.95,15.55,46,32);}
 else{x=m(t,20,20.7,865,825);y=m(t,20,20.7,1180,1615);r=m(t,20,20.7,32,50);}
 return {x,y,r,shadowY:shadow};
};
// Distance parcourue, et non horloge : la rotation s’arrête pendant la lecture.
const rotationByFrame=[0];
for(let i=1;i<=1440;i++){
 const a=forecastBallPose((i-1)/60),b=forecastBallPose(i/60);
 rotationByFrame.push(rotationByFrame[i-1]+Math.hypot(b.x-a.x,b.y-a.y)/((a.r+b.r)/2)*180/Math.PI);
}
const MovingBall=({t}:{t:number})=>{
 const pose=forecastBallPose(t);const at=Math.max(0,Math.min(1440,t*60));const lo=Math.floor(at),hi=Math.min(1440,lo+1);
 const rotation=rotationByFrame[lo]+(rotationByFrame[hi]-rotationByFrame[lo])*(at-lo);
 return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,pointerEvents:'none'}}><Ball {...pose} rotation={rotation}/></svg>;
};

export const Forecast=({production}:{production:ForecastProduction})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const [fontHandle]=useState(()=>delayRender('Polices sportives locales'));
 const [fontsReady,setFontsReady]=useState(false);
 useEffect(()=>{
  let cancelled=false;
  const faces=[
   new FontFace('ForecastTitle',`url("${staticFile(assets+'fonts/BarlowCondensed-ExtraBold.ttf')}")`,{weight:'800'}),
   new FontFace('ForecastInfo',`url("${staticFile(assets+'fonts/Inter.ttf')}")`,{weight:'100 900'}),
  ];
  faces.forEach(face=>document.fonts.add(face));
  Promise.all(faces.map(face=>face.load())).then(()=>{
   if(cancelled)return;
   if(!document.fonts.check('800 104px ForecastTitle')||!document.fonts.check('600 40px ForecastInfo'))throw new Error('Polices sportives non disponibles');
   setFontsReady(true);
  }).catch(error=>{if(!cancelled)cancelRender(error)});
  return ()=>{cancelled=true;faces.forEach(face=>document.fonts.delete(face))};
 },[fontHandle]);
 useEffect(()=>{if(fontsReady)continueRender(fontHandle)},[fontsReady,fontHandle]);
 const section=t<5?0:t<9.5?1:t<14?2:t<20?3:4;
 return <WorkshopShell production={{...production,qa:Boolean(production.qa&&fontsReady)}}>
 <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:info}}>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M65 600V1660H990" stroke="#1c242a" strokeWidth="2" fill="none"/><path d="M65 1680H990M65 1700H990" stroke="#12191e" strokeWidth="1"/><path d="M950 125H1010V185" stroke={C.lime} strokeWidth="3" fill="none"/></svg>
  <Stage t={t} summary={t>=20}/>
  {t<2.05&&<Opening t={t}/>}
  {t>=1.45&&t<5.55&&<AbsoluteFill style={{clipPath:t<2.05?`circle(${m(t,1.45,2.05,0,2500)}px at 0px 1750px)`:'none',background:C.bg}}><Stage t={t}/><Wales t={t}/></AbsoluteFill>}
  {t>=5&&t<10.05&&<AbsoluteFill style={{clipPath:t<5.55?`inset(0 ${100-m(t,5,5.55,0,100)}% 0 0)`:'none',background:C.bg}}><Stage t={t}/><Poland t={t}/></AbsoluteFill>}
  {t>=9.5&&t<14.55&&<AbsoluteFill style={{clipPath:t<10.05?`circle(${m(t,9.5,10.05,0,2200)}px at 650px 1300px)`:'none',background:C.bg}}><Stage t={t} close/><Ukraine t={t}/></AbsoluteFill>}
  {t>=14&&t<20.6&&<AbsoluteFill style={{clipPath:t<14.55?`circle(${m(t,14,14.55,0,2300)}px at 680px 1460px)`:'none',background:C.bg}}><Stage t={t}/><Denmark t={t}/></AbsoluteFill>}
  {t>=20&&<AbsoluteFill style={{clipPath:t<20.6?`inset(${100-m(t,20,20.6,0,100)}% 0 0 0)`:'none',background:C.bg}}><Stage t={t} summary/><Summary t={t} logo={production.logoSrc}/></AbsoluteFill>}
  <MovingBall t={t}/>
 </AbsoluteFill>
 </WorkshopShell>;
};
