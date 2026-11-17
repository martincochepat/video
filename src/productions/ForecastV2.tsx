import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,Easing,Img,Interactive,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../WorkshopShell';
const C={bg:'#080B0E',surface:'#171C21',lime:'#C8FF00',white:'#F6F7F8',muted:'#8D969E'};
const T='ForecastV2Title',I='ForecastV2Info',base='productions/pronos-17-nov/';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const move=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],{...clamp,easing:Easing.bezier(.22,.8,.25,1)});
const linear=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],clamp);
const games=[{a:'PAYS DE GALLES',b:'PORTUGAL',fa:'gb-wls',fb:'pt',score:'0–2'},{a:'POLOGNE',b:'SUÈDE',fa:'pl',fb:'se',score:'1–2'},{a:'UKRAINE',b:'GÉORGIE',fa:'ua',fb:'ge',score:'1–0'},{a:'DANEMARK',b:'NORVÈGE',fa:'dk',fb:'no',score:'2–1'}];
type P=Production&{logoSrc?:string|null};

const Header=({a,b,match,step}:{a:string;b:string;match?:string;step?:number})=><>
 <Interactive.Div data-qa-text name="Titre du plan" style={{position:'absolute',left:100,right:130,top:160,fontFamily:T,fontSize:104,fontWeight:800,lineHeight:1.22,color:C.white}}>{a}<br/>{b}</Interactive.Div>
 {match&&<div data-qa-text style={{position:'absolute',left:100,right:130,top:438,fontFamily:T,fontWeight:800,fontSize:56,lineHeight:1.25}}>{match}</div>}
 <div style={{position:'absolute',left:102,top:match?552:475,fontFamily:I,fontSize:36,fontWeight:600,color:C.lime,letterSpacing:2}}>MES PRONOS</div>
 {step&&<div style={{position:'absolute',right:135,top:match?552:475,fontFamily:I,fontSize:36,color:C.muted}}>{step}/4</div>}
</>;

// Le SVG national reste rectangulaire et exact ; coutures, œillets et tissu
// sont des couches séparées, identiques pour tous les pays.
const Fabric=({code,x,y,w=340,angle=0}:{code:string;x:number;y:number;w?:number;angle?:number})=>{
 const ratio=w/340;const cloth=code==='se'?'#154f80':code==='ua'?'#d5af20':code==='gb-wls'?'#205e44':'#902739';
 return <div style={{position:'absolute',left:x,top:y,width:w,height:460*ratio,rotate:`${angle}deg`,transformOrigin:'50% 0%'}}>
  <svg viewBox="0 0 340 460" style={{position:'absolute',inset:0,width:w,height:460*ratio,overflow:'visible'}}>
   <defs><linearGradient id={'cloth-'+code}><stop stopColor="#000" stopOpacity=".24"/><stop offset=".2" stopColor="#fff" stopOpacity=".04"/><stop offset=".52" stopColor="#000" stopOpacity=".02"/><stop offset=".8" stopColor="#000" stopOpacity=".2"/><stop offset="1" stopColor="#fff" stopOpacity=".08"/></linearGradient></defs>
   <path d="M-8 -42Q165 -12 350 -42" stroke="#96958d" strokeWidth="5" fill="none"/><path d="M10 10V-35M326 10V-35" stroke="#b3afa1" strokeWidth="4"/>
   <path d="M8 10L340 22L342 411L178 356L12 409Z" fill="#000" opacity=".3" transform="translate(12 15)"/>
   <path d="M0 0H340V402L170 350L0 402Z" fill={cloth}/>
   <path d="M8 286V389L170 338L332 389V286" stroke="#e8dfcc" strokeOpacity=".45" strokeWidth="2" strokeDasharray="4 5" fill="none"/>
   <path d="M3 402L169 350L338 402" stroke="#080B0E" strokeOpacity=".45" strokeWidth="5" fill="none"/>
  </svg>
  <Img data-qa-media src={staticFile(base+'flags/'+code+'.svg')} style={{position:'absolute',left:0,top:24*ratio,width:w,height:w*.75,objectFit:'contain'}}/>
  <svg viewBox="0 0 340 460" style={{position:'absolute',inset:0,width:w,height:460*ratio,overflow:'visible',pointerEvents:'none'}}>
   <path d="M0 0H340V402L170 350L0 402Z" fill={`url(#cloth-${code})`}/>
   <path d="M8 31H332V271H8Z" fill="none" stroke="#e9dfc9" strokeOpacity=".48" strokeWidth="1.8" strokeDasharray="4 5"/>
   <path d="M13 18H327" stroke="#edddbe" strokeOpacity=".55" strokeWidth="3"/>
   {[14,326].map(cx=><g key={cx}><circle cx={cx} cy="10" r="8" fill="#776d4c"/><circle cx={cx} cy="10" r="4.5" fill="#15191b" stroke="#c4b48d" strokeWidth="1.5"/></g>)}
  </svg>
 </div>;
};
const Pole=({x,y=620,height=1010}:{x:number;y?:number;height?:number})=><svg width="30" height={height+40} viewBox={`0 0 30 ${height+40}`} style={{position:'absolute',left:x,top:y}}><path d={`M12 0V${height}`} stroke="#435157" strokeWidth="13"/><path d={`M9 0V${height}`} stroke="#97a5a8" strokeWidth="3"/><circle cx="12" cy="5" r="9" fill="#859296"/><ellipse cx="15" cy={height+10} rx="15" ry="7" fill="#121a1d"/></svg>;

const Pitch=({aerial=false,opacity=1,clearScore=false}:{aerial?:boolean;opacity?:number;clearScore?:boolean})=><svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,opacity}} aria-label={aerial?'Terrain presque aérien plein cadre':'Terrain de football environnant, profondeur et lignes de fuite'}>
 {aerial?<>
  <rect x="-100" y="540" width="1280" height="1500" fill="#142821"/>
  {Array.from({length:10},(_,i)=><rect key={i} x={-100+i*140} y="540" width="70" height="1500" fill="#ffffff" opacity=".022"/>)}
  <g fill="none" stroke="#839c91" strokeWidth="4" opacity=".68"><rect x="65" y="580" width="950" height="1450"/><path d="M65 1280H1015"/><circle cx="540" cy="1280" r="215" opacity=".3"/><path d="M265 580V800H815V580M390 580V690H690V580M265 2030V1730H815V2030"/><path d="M65 640Q125 640 125 580M955 580Q955 640 1015 640"/></g>
  <path d="M540 570V610M540 1950V2010" stroke={C.lime} strokeWidth="6"/>
 </>:<>
  <path d="M-480 1920L1500 1920L990 640L100 640Z" fill="#142621"/>
  {Array.from({length:10},(_,i)=><path key={i} d={`M${-480+i*198} 1920L${-381+i*198} 1920L${144+i*89} 640L${100+i*89} 640Z`} fill="#fff" opacity=".018"/>)}
  <g fill="none" stroke="#657f75" strokeWidth="4" opacity=".6"><path d={clearScore?"M100 650L-350 1920M990 650L1440 1920M100 650H990M540 650V1080M540 1500V1920":"M100 650L-350 1920M990 650L1440 1920M100 650H990M-160 1450H1250M540 650V1920"}/><ellipse cx="540" cy="1450" rx="330" ry="115" opacity={clearScore?0:1}/><path d="M260 650L170 900H850L790 650"/></g>
  <g stroke="#35474b" fill="none"><path d="M0 640H1080M0 625H1080" strokeWidth="6"/><path d="M0 610H1080" strokeWidth="2"/>{Array.from({length:16},(_,i)=><path key={i} d={`M${i*75} 615V650`} strokeWidth="3"/>)}</g>
 </>}
</svg>;

const Sphere=({x,y,r,spin=0,shadowY,shadow=true}:{x:number;y:number;r:number;spin?:number;shadowY?:number;shadow?:boolean})=><g>
 {shadow&&<ellipse cx={x+14} cy={shadowY??y+r*.72} rx={r*.7} ry={r*.16} fill="#000" opacity=".38"/>}
 <g transform={`translate(${x} ${y}) rotate(${spin})`}><circle r={r} fill="#e9ece6" stroke="#98a49f" strokeWidth={r*.027}/><path d={`M${-r*.13} ${-r*.44}L${r*.34} ${-r*.23}L${r*.24} ${r*.28}L${-r*.26} ${r*.4}L${-r*.48} 0Z`} fill="#202a2e"/><g fill="none" stroke="#283237" strokeWidth={r*.09}><path d={`M${-r*.5} ${-r*.78}L${-r*.7} ${-r*.41}M${r*.66} ${-r*.58}L${r*.84} ${-r*.08}M${r*.65} ${r*.61}L${r*.17} ${r*.87}M${-r*.8} ${r*.3}L${-r*.52} ${r*.74}`}/></g><path d={`M${-r*.69} ${-r*.32}Q${-r*.36} ${-r*.81} ${r*.09} ${-r*.81}`} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth={r*.045} strokeLinecap="round"/></g>
</g>;

const Score=({a,b,t,at,y=720,size=350}:{a:string;b:string;t:number;at:number;y?:number;size?:number})=>t<at?null:<div data-score={`${a}–${b}`} style={{position:'absolute',left:0,top:y,width:1080,height:size*1.4,opacity:move(t,at,at+.18,0,1),translate:`0px ${move(t,at,at+.35,22,0)}px`,textShadow:'0 8px 20px #080b0e88'}}>
 <div data-qa-text style={{position:'absolute',left:150,width:300,textAlign:'center',fontFamily:T,fontSize:size,fontWeight:800,lineHeight:1.22}}>{a}</div>
 <div data-qa-text style={{position:'absolute',left:640,width:300,textAlign:'center',fontFamily:T,fontSize:size,fontWeight:800,lineHeight:1.22}}>{b}</div>
 <div style={{position:'absolute',left:485,top:size*.29,width:120,textAlign:'center',fontFamily:T,fontSize:size*.45,lineHeight:1.22,color:C.muted}}>–</div>
</div>;

const Opening=({t,resolution=false}:{t:number;resolution?:boolean})=>{
 const open=resolution?move(t,14.65,15.25,0,1):0;
 const lag=resolution?0:move(t,.35,.65,0,6)-move(t,.65,.95,0,6);
 return <>
 <Pitch clearScore={resolution}/>
 <Header a={resolution?'MON CHOIX :':'JE VOIS LA'} b={resolution?'LE DANEMARK.':'NORVÈGE PERDRE.'} match="DANEMARK – NORVÈGE" step={resolution?4:undefined}/>
 <Pole x={96-open*130} y={615} height={1020}/><Pole x={995+open*130} y={615} height={1020}/>
 <Fabric code="dk" x={110-open*130} y={675+open*15+lag} w={340} angle={-3-open*3}/>
 <Fabric code="no" x={650+open*130} y={675+open*15-lag*.5} w={340} angle={3+open*3}/>
 {resolution&&<Score a="2" b="1" t={t} at={15.65} y={1090} size={330}/>}
 </>;
};
const Aerial=({t}:{t:number})=><>
 <Pitch aerial/>
 <Header a="PAYS DE GALLES" b="– PORTUGAL" step={1}/>
 <Score a="0" b="2" t={t} at={2.15}/>
 <div data-qa-text style={{position:'absolute',left:130,top:1150,width:340,textAlign:'center',fontFamily:T,fontSize:54,fontWeight:800,lineHeight:1.25}}>PAYS DE GALLES</div>
 <div data-qa-text style={{position:'absolute',left:620,top:1150,width:340,textAlign:'center',fontFamily:T,fontSize:54,fontWeight:800,lineHeight:1.25}}>PORTUGAL</div>
 <Fabric code="gb-wls" x={190} y={1260} w={220} angle={-4}/><Fabric code="pt" x={680} y={1260} w={220} angle={4}/>
</>;

const Boot=({x,y,scale=1,flip=false,blue=false}:{x:number;y:number;scale?:number;flip?:boolean;blue?:boolean})=><svg viewBox="0 0 530 300" style={{position:'absolute',left:x,top:y,width:530*scale,height:300*scale,scale:flip?'-1 1':'1 1',overflow:'visible'}} aria-label="Chaussure de football illustrée, lacets, coutures, œillets, semelle et crampons">
 <ellipse cx="260" cy="253" rx="235" ry="33" fill="#000" opacity=".45"/>
 <path d="M55 192L450 194L479 222Q473 243 440 243H92L46 223Z" fill="#0c1418" stroke="#59686b" strokeWidth="3"/>
 {[85,145,230,330,415].map((v,i)=><path key={v} d={`M${v} 236L${v+3} 262L${v+22} 262L${v+26} 236`} fill={i%2?'#8a9591':'#c0c7bd'} stroke="#192225" strokeWidth="3"/>)}
 <path d="M54 194Q47 137 62 56L130 39L205 90Q232 113 304 126L417 151Q474 165 480 204L451 219L88 219Z" fill={blue?'#154b72':'#a52f42'} stroke="#617078" strokeWidth="3"/>
 <path d="M64 60L130 40L166 67L142 135L80 139Z" fill={blue?'#1b2c3f':'#e1e5df'}/>
 <path d="M78 74L125 65L139 77L119 115L84 117Z" fill="#101b22"/>
 <path d="M171 80L274 122L249 169L146 123Z" fill={blue?'#bfa53e':'#cfd7cf'} stroke="#152028" strokeWidth="3"/>
 <path d="M75 170Q180 143 281 170Q355 193 451 190M308 140L283 178L423 199" fill="none" stroke={blue?'#e2c85a':'#e6e7d8'} strokeWidth="3" strokeDasharray="5 4"/>
 {[0,1,2,3,4].map(i=><g key={i}><circle cx={165+i*20} cy={98+i*9} r="5" fill="#29393f" stroke="#b7c0bb" strokeWidth="2"/><circle cx={155+i*20} cy={119+i*9} r="5" fill="#29393f" stroke="#b7c0bb" strokeWidth="2"/><path d={`M${165+i*20} ${98+i*9}L${155+i*20} ${119+i*9}`} stroke="#f1f1e8" strokeWidth="5" strokeLinecap="round"/></g>)}
 <path d="M68 205H452" stroke="#b0bcb5" strokeWidth="3"/><path d="M53 188L84 185L90 217" stroke="#71827e" strokeWidth="3" fill="none"/>
</svg>;
const Lateral=({t}:{t:number})=><>
 <Pitch clearScore/>
 <Header a="POLOGNE" b="– SUÈDE" step={2}/>
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M540 570V1000M540 1330V1800" stroke="#657d77" strokeWidth="4"/><path d="M529 570H551" stroke={C.lime} strokeWidth="4"/></svg>
 <Pole x={120} y={600} height={1000}/><Pole x={962} y={560} height={960}/>
 <Fabric code="pl" x={135-move(t,5.05,5.42,20,0)} y={650} w={235} angle={-4}/>
 <Fabric code="se" x={710+move(t,5.13,5.5,20,0)} y={595} w={235} angle={4}/>
 <Boot x={-100} y={1430} scale={1.08}/><Boot x={640} y={1320} scale={.9} flip blue/>
 <Score a="1" b="2" t={t} at={6.25} y={960} size={310}/>
</>;

const netImpulse=(t:number)=>{const d=t-10.8;return d>=0&&d<.6?Math.sin(d*22)*Math.exp(-d*9)*72:0};
export const forecastV2NetPoint=(u:number,v:number,t:number)=>{
 const weight=Math.exp(-((u-.64)**2/.025+(v-.3)**2/.025));const push=netImpulse(t);
 return [180+970*u+push*weight,1050+250*u+840*v-push*weight*.28];
};
const Mesh=({t,structure=false}:{t:number;structure?:boolean})=>{
 const point=(u:number,v:number)=>forecastV2NetPoint(u,v,t);
 const line=(fixed:number,vertical:boolean)=>Array.from({length:33},(_,i)=>{const [x,y]=point(vertical?fixed:i/32,vertical?i/32:fixed);return `${i?'L':'M'}${x} ${y}`}).join('');
 return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920}}>
 {structure?<>
  <path d="M180 1050L260 980L1230 1230L1150 1300M260 980V1820L180 1890M260 1820L1230 2070" fill="none" stroke="#3e555b" strokeWidth="14"/>
  <path d="M184 1050L264 980L1234 1230" fill="none" stroke="#91a3a6" strokeWidth="3"/>
 </>:<>
  <g fill="none" stroke="#a7bdc2" strokeWidth="2.7" opacity=".65">{Array.from({length:16},(_,i)=><path key={'v'+i} d={line(i/15,true)}/>)}{Array.from({length:15},(_,i)=><path key={'h'+i} d={line(i/14,false)}/>)}</g>
  <path d="M180 1890V1050L1150 1300V2140" fill="none" stroke="#e2eae8" strokeWidth="20" strokeLinejoin="round"/>
  <path d="M174 1890V1050L1144 1300" fill="none" stroke="#f6f7f8" strokeWidth="5"/>
  {Array.from({length:8},(_,i)=><g key={i}><circle cx={180+i*138.57} cy={1050+i*35.7} r="9" fill="#27383d" stroke="#95a8ac" strokeWidth="3"/><path d={`M${180+i*138.57} ${1050+i*35.7}l0 21`} stroke="#d7e0dc" strokeWidth="4"/></g>)}
 </>}
 </svg>;
};
const UkraineBall=({t}:{t:number})=>{const p=forecastV2BallPose(t);return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920}}><Sphere {...p} spin={forecastV2BallSpin(t)} shadow={t<10.3}/></svg>};
const CloseNet=({t}:{t:number})=><>
 <AbsoluteFill style={{background:C.bg}}/>
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M0 1920V1450L1080 1250V1920Z" fill="#13261f"/><path d="M0 1810L1080 1560M0 1780L1080 1530" fill="none" stroke="#61796e" strokeWidth="5" opacity=".45"/></svg>
 <Mesh t={t} structure/>
 {t>=10.8&&<UkraineBall t={t}/>}
 <Mesh t={t}/>
 {t>=9.56&&t<10.8&&<UkraineBall t={t}/>}
 <Header a="UKRAINE" b="– GÉORGIE" step={3}/>
 <Fabric code="ua" x={100} y={970} w={145} angle={-4}/><Fabric code="ge" x={805} y={1000} w={145} angle={4}/>
 <Score a="1" b="0" t={t} at={11.35} y={590} size={330}/>
</>;

const End=({t,logo}:{t:number;logo?:string|null})=><>
 <Pitch aerial opacity={.075}/>
 <Interactive.Div data-qa-text name="Question finale" style={{position:'absolute',left:100,right:130,top:160,fontFamily:T,fontSize:110,fontWeight:800,lineHeight:1.22}}>LEQUEL TU<br/><span style={{color:C.lime}}>CHANGES ?</span></Interactive.Div>
 <div style={{position:'absolute',left:102,top:475,fontFamily:I,fontSize:36,color:C.muted}}>MES PRONOS</div>
 {games.map((g,i)=><div key={g.fa} style={{position:'absolute',left:100,top:600+i*174+move(t,20.04+i*.07,20.39+i*.07,20,0),width:850,height:150,opacity:move(t,20.04+i*.07,20.23+i*.07,0,1)}}>
  <div data-qa-text style={{position:'absolute',left:0,top:34,fontFamily:T,fontSize:52,fontWeight:800,lineHeight:1.22}}>{g.a} – {g.b}</div>
  <div data-qa-text style={{position:'absolute',right:10,top:4,fontFamily:T,fontSize:104,fontWeight:800,lineHeight:1.22,color:i===3?C.lime:C.white}}>{g.score}</div>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:1,background:'#435158'}}/>
 </div>)}
 <div data-qa-text style={{position:'absolute',left:100,right:130,top:1390,fontFamily:I,fontSize:48,fontWeight:600,lineHeight:1.35,color:C.white}}>LE MATCH + TON SCORE<br/>EN COMMENTAIRE</div>
 {logo&&<Img data-qa-media src={staticFile(logo)} style={{position:'absolute',left:100,top:1580,width:120,height:120,objectFit:'contain'}}/>}
</>;

export const forecastV2BallPose=(t:number)=>{
 let x=0,y=0,r=55;
 if(t<1.45){const u=t/1.45;x=110+1450*u*u;y=1720-260*Math.sin(Math.PI*u*.75);r=330+90*Math.sin(Math.PI*u);}
 else if(t<5){x=t<2.2?move(t,1.45,2.2,1180,800):t<4.4?move(t,2.8,3.55,800,570):move(t,4.4,5,570,540);y=t<2.2?move(t,1.45,2.2,1510,1460):move(t,3,4.5,1460,1540);}
 else if(t<9.5){x=540;y=t<6.25?move(t,5,6.25,1540,1390):t<8.9?1390:move(t,8.9,9.5,1390,1660);r=55;}
 else if(t<14){const u=linear(t,10.2,10.8,0,1);x=t<10.2?move(t,9.5,10.2,540,80):t<13.4?80+710*u*u+netImpulse(t)*.45:move(t,13.4,14,790,-230);y=t<10.2?1660:t<13.4?1660-390*u+210*u*u-netImpulse(t)*.1:move(t,13.4,14,1480,1760);r=t<10.2?move(t,9.5,10.2,55,180):t<13.4?move(t,10.2,10.8,180,85):move(t,13.4,14,85,180);}
 else if(t<20){x=t<14.55?move(t,14,14.55,-230,130):t<15.05?move(t,14.65,15.05,130,85):move(t,15.05,15.6,85,1360);y=t<15.05?move(t,14.65,15.05,1760,1780):move(t,15.05,15.6,1780,1550);r=move(t,15.05,15.6,180,260);}
 else{x=move(t,20,20.7,1360,900);y=move(t,20,20.7,1550,1680);r=move(t,20,20.7,260,60);}
 return {x,y,r};
};
const spins=[0];for(let i=1;i<=1440;i++){const a=forecastV2BallPose((i-1)/60),b=forecastV2BallPose(i/60);spins.push(spins[i-1]+Math.hypot(b.x-a.x,b.y-a.y)/((a.r+b.r)/2)*180/Math.PI)}
export const forecastV2BallSpin=(t:number)=>{const at=Math.min(1440,Math.max(0,t*60)),n=Math.floor(at);return spins[n]+(spins[Math.min(n+1,1440)]-spins[n])*(at-n)};

export const ForecastV2=({production}:{production:P})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const [handle]=useState(()=>delayRender('Polices V2'));const [ready,setReady]=useState(false);
 useEffect(()=>{let cancelled=false;const faces=[new FontFace(T,`url("${staticFile(base+'fonts/BarlowCondensed-ExtraBold.ttf')}")`,{weight:'800'}),new FontFace(I,`url("${staticFile(base+'fonts/Inter.ttf')}")`,{weight:'100 900'})];faces.forEach(f=>document.fonts.add(f));Promise.all(faces.map(f=>f.load())).then(()=>{if(!cancelled)setReady(true)}).catch(e=>{if(!cancelled)cancelRender(e)});return()=>{cancelled=true;faces.forEach(f=>document.fonts.delete(f))}},[handle]);
 useEffect(()=>{if(ready)continueRender(handle)},[ready,handle]);
 const p=forecastV2BallPose(t);
 return <WorkshopShell production={{...production,qa:Boolean(production.qa&&ready)}}><AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:I}}>
  {t<2.05&&<Opening t={t}/>}
  {t>=1.45&&t<5.55&&<AbsoluteFill style={{background:C.bg,clipPath:t<2.05?`circle(${move(t,1.45,2.05,0,2600)}px at 1080px 1530px)`:'none'}}><Aerial t={t}/></AbsoluteFill>}
  {t>=5&&t<10.05&&<AbsoluteFill style={{background:C.bg,clipPath:t<5.55?`inset(0 ${(100-move(t,5,5.55,0,100))/2}% 0 ${(100-move(t,5,5.55,0,100))/2}%)`:'none'}}><Lateral t={t}/></AbsoluteFill>}
  {t>=9.5&&t<14.55&&<AbsoluteFill style={{background:C.bg,clipPath:t<10.05?`circle(${move(t,9.5,10.05,0,2500)}px at 540px 1660px)`:'none'}}><CloseNet t={t}/></AbsoluteFill>}
  {t>=14&&t<20.6&&<AbsoluteFill style={{background:C.bg,clipPath:t<14.55?`inset(0 0 0 ${100-move(t,14,14.55,0,100)}%)`:'none'}}><Opening t={t} resolution/></AbsoluteFill>}
  {t>=20&&<AbsoluteFill style={{background:C.bg,clipPath:t<20.6?`inset(${100-move(t,20,20.6,0,100)}% 0 0 0)`:'none'}}><End t={t} logo={production.logoSrc}/></AbsoluteFill>}
  {t>=5&&t<5.55&&<svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={`M${move(t,5,5.55,65,540)} ${move(t,5,5.55,1280,570)}L${move(t,5,5.55,1015,540)} ${move(t,5,5.55,1280,1800)}`} stroke="#9bb4a7" strokeWidth="5" fill="none"/></svg>}
  {t>=14&&t<14.55&&<svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={`M${move(t,14,14.55,1080,0)} 620V1920`} stroke="#8ca3a5" strokeWidth="5"/></svg>}
  {(t<9.56||t>=14)&&<svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,pointerEvents:'none'}}><Sphere {...p} spin={forecastV2BallSpin(t)}/></svg>}
 </AbsoluteFill></WorkshopShell>;
};
