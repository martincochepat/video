import copy from '../../../productions/france-espagne-2027/texts.json';
import type {CSSProperties,ReactNode} from 'react';
import {AbsoluteFill,Img,staticFile} from 'remotion';
import {C,Txt,B,BRAND,p,useTime,TextLifetimeContext,PageTurn} from '../erase-legend/Design';
export {C,Txt,B,BRAND,p,useTime,TextLifetimeContext};
export const dir='productions/france-espagne-2027/';
export const Pic=({id,x=0,y=0,w=1080,h=1920,position='center',style={}}:{id:string;x?:number;y?:number;w?:number;h?:number;position?:string;style?:CSSProperties})=><Img data-qa-media src={staticFile(dir+id)} style={{position:'absolute',left:x,top:y,width:w,height:h,objectFit:'cover',objectPosition:position,...style}}/>;
export const FullPhoto=({id,position='center',travel=0,shade=.4}:{id:string;position?:string;travel?:number;shade?:number})=><><Pic id={id} x={-30+travel} y={-25} w={1140} h={1970} position={position}/><AbsoluteFill style={{background:`linear-gradient(#080B0E${Math.round(shade*255).toString(16).padStart(2,'0')} 0%,#080B0E08 35%,#080B0E35 50%,#080B0EEA 80%,#080B0E 100%)`}}/></>;
export const Flag=({code,x,y,w=90,h=62}:{code:string;x:number;y:number;w?:number;h?:number})=><Img data-qa-media src={staticFile(dir+code+'.svg')} style={{position:'absolute',left:x,top:y,width:w,height:h,objectFit:'contain',filter:'drop-shadow(0 5px 10px #0008)'}}/>;
export const Small=({children,y=155,x=120,color=C.paper}:{children:ReactNode;y?:number;x?:number;color?:string})=><Txt x={x} y={y} size={42} font={B} color={color}>{children}</Txt>;
export const Beat=({from=0,to=99,kind=0,children}:{from?:number;to?:number;kind?:number;children:ReactNode})=>{const t=useTime();if(t<from||t>=to+.5)return null;return <TextLifetimeContext.Provider value={to}>{from===0?<AbsoluteFill style={{background:C.bg}}>{children}</AbsoluteFill>:<PageTurn from={from} kind={kind}>{children}</PageTurn>}</TextLifetimeContext.Provider>};
export const BoxPhoto=({id,x,y,w,h,position='center',style={}}:{id:string;x:number;y:number;w:number;h:number;position?:string;style?:CSSProperties})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,overflow:'hidden',boxShadow:'0 25px 60px #0009',border:'2px solid #DDE9E855',...style}}><Pic id={id} w={w} h={h} position={position}/></div>;
export const AccentRule=({y=230}:{y?:number})=><div style={{position:'absolute',left:120,top:y,width:815,height:3,background:C.lime}}/>;
export const Stadium=()=> <AbsoluteFill style={{background:'radial-gradient(ellipse at 65% 38%,#334A52,#15222D 45%,#080B0E 85%)'}}><svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0}}>
 <defs><pattern id="news-dot" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="white" opacity=".12"/></pattern><linearGradient id="news-grass" x2="0" y2="1"><stop stopColor="#294D40"/><stop offset="1" stopColor="#0A1813"/></linearGradient></defs>
 <path d="M-200 1050Q540 420 1280 1050V1400H-200Z" fill="#31414B"/>
 {Array.from({length:12},(_,i)=><path key={i} d={`M-200 ${1060+i*24}Q540 ${440+i*41} 1280 ${1060+i*24}`} stroke="#9EB0B9" strokeWidth="3" opacity=".19" fill="none"/>)}
 <path d="M-200 1920L120 1110H960L1280 1920Z" fill="url(#news-grass)"/>
 <g fill="none" stroke="#B7D3C4" opacity=".4" strokeWidth="3"><path d="M-100 1800L160 1140H920L1180 1800ZM-35 1600H1120M540 1140V1800M340 1140L290 1320H790L740 1140"/><ellipse cx="540" cy="1600" rx="250" ry="80"/></g>
 <rect width="1080" height="1920" fill="url(#news-dot)"/><rect width="1080" height="1920" fill="#080B0E" opacity=".26"/>
 </svg></AbsoluteFill>;
export const Signature=()=> <><Img data-qa-media src={staticFile('productions/cinq-scores-v4/logo-officiel.png')} style={{position:'absolute',left:120,top:1515,width:65,height:65}}/><Txt x={210} y={1528} size={43} font={BRAND}>{copy["LIGUE ONZE"]}</Txt><Txt x={655} y={1528} size={43} font={B}>{copy["ligueonze.fr"]}</Txt><Txt y={1610} size={44} font={B} color={C.muted}>{copy["Les pronos entre potes"]}</Txt></>;
