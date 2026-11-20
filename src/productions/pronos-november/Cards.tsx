import {AbsoluteFill,Interactive,Easing,interpolate} from 'remotion';
import data from '../../../productions/pronos-21-nov/matches.json';
import {C,Txt,B,p,useTime} from '../erase-legend/Design';
const lerp=(t:number,ts:number[],vs:number[])=>interpolate(t,ts,vs,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.45,0,.2,1)});
const starts=[3.5,10.5,17.5],ends=[10.5,17.5,24.5];
const times=[0,3.15,3.75,10.15,10.45,10.85,17.15,17.45,17.85,24.15,24.45,24.95,35];
const states=[
 [[120,720,245,350],[120,720,245,350],[120,550,815,580],[120,550,815,580],[120,850,500,300],[120,1240,245,120],[120,1240,245,120],[120,1240,245,120],[120,1240,245,120],[120,1240,245,120],[120,650,815,190],[120,550,815,190],[120,550,815,190]],
 [[405,720,245,350],[405,720,245,350],[405,1240,245,120],[405,1240,245,120],[435,850,500,300],[120,550,815,580],[120,550,815,580],[120,850,500,300],[405,1240,245,120],[405,1240,245,120],[120,900,815,190],[120,770,815,190],[120,770,815,190]],
 [[690,720,245,350],[690,720,245,350],[690,1240,245,120],[690,1240,245,120],[690,1240,245,120],[690,1240,245,120],[690,1240,245,120],[435,850,500,300],[120,550,815,580],[120,550,815,580],[120,1140,815,190],[120,990,815,190],[120,990,815,190]],
];
const moving=(t:number)=>[[3.15,3.85],[10.15,10.95],[17.15,17.95],[24.15,25.05]].some(([a,b])=>t>=a&&t<b);
const alpha=(t:number,a:number,b:number)=>p(t,a,a+.22)*(1-p(t,b-.3,b-.05));
export const Stadium=()=> <AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 45%,#19342D 0%,#101A1B 35%,#080B0E 75%)'}}><svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
 <defs><pattern id="score-grain" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#F6F7F8" opacity=".07"/></pattern></defs><rect width="1080" height="1920" fill="url(#score-grain)"/>
 <g fill="none" stroke="#B4D4C2" strokeWidth="2" opacity=".11"><path d="M-150 1700L170 620H900L1230 1700ZM-40 1320H1110M540 620V1700M245 620L200 860H870L825 620"/><ellipse cx="540" cy="1320" rx="245" ry="93"/><path d="M-100 540Q540 180 1180 540M-100 575Q540 215 1180 575M-100 610Q540 250 1180 610"/></g>
 <rect y="1395" width="1080" height="525" fill="#080B0E" opacity=".6"/></svg></AbsoluteFill>;
export const Ticket=({index}:{index:number})=>{const t=useTime(),m=data.matches[index],s=states[index],v=[0,1,2,3].map(k=>lerp(t,times,s.map(x=>x[k]))),[x,y,w,h]=v;
 const active=t>=starts[index]&&t<ends[index],recap=t>=24.5,opening=t<3.5,wasShown=t>ends[index],isMoving=moving(t);
 const visible=!isMoving,a=opening?1-p(t,2.9,3.15):recap?p(t,25.05,25.35):active?alpha(t,starts[index]+.35,ends[index]-.3):1;
 const focus=recap&&t<31.5?Math.floor(Math.max(0,t-25.5)/1.5)%3:-1;
 const border=(active||focus===index)?C.lime:'#3F514B';
 return <Interactive.Div name={`Ticket ${index+1} · ${m.home}–${m.away}`} style={{position:'absolute',inset:0,zIndex:active?5:2+index}}>
 <div style={{position:'absolute',left:x+10,top:y+14,width:w,height:h,borderRadius:24,background:'#07100B',border:'2px solid #284139',boxShadow:'0 30px 50px #000A'}}/>
 <div style={{position:'absolute',left:x,top:y,width:w,height:h,borderRadius:24,background:active?'linear-gradient(135deg,#23352D,#111C19)':'linear-gradient(120deg,#1E2926,#101815)',border:`2px solid ${border}`,overflow:'hidden'}}><div style={{position:'absolute',inset:12,border:'1px solid #B4D4C215',borderRadius:16}}/><div style={{position:'absolute',top:0,left:0,width:8,height:'100%',background:active?C.lime:'#40564A'}}/>
 <svg width="100%" height="100%" style={{position:'absolute',inset:0,opacity:.08}}><path d={`M0 ${h*.65}H${w}M${w/2} 0V${h}`} stroke="white" strokeWidth="2"/><circle cx={w/2} cy={h*.65} r={Math.min(w,h)*.28} fill="none" stroke="white" strokeWidth="2"/></svg></div>
 {isMoving&&x>=110&&x+w<=945&&<Txt x={x+20} y={y+20} size={Math.max(40,Math.min(75,h*.35))} color={C.lime}>{index+1}</Txt>}
 {visible&&opening&&<><Txt x={x+30} y={y+25} size={72} style={{opacity:a}}>{index+1}</Txt><Txt x={x+83} y={y+137} size={135} color={C.lime} style={{opacity:a}}>?</Txt></>}
 {visible&&active&&<>
 <Txt x={x+25} y={y+38} size={70} style={{width:355,textAlign:'center',opacity:a}}>{m.home.toLocaleUpperCase('fr')}</Txt><Txt x={x+435} y={y+38} size={70} style={{width:355,textAlign:'center',opacity:a}}>{m.away.toLocaleUpperCase('fr')}</Txt>
 <div style={{position:'absolute',left:x+35,top:y+145,width:w-70,height:345,borderRadius:15,background:'#080F0C',border:'1px solid #52715E',boxShadow:'inset 0 10px 25px #0008'}}/>
 <ScoreDigit x={x+110} y={y+162} value={m.prediction[0]} at={starts[index]+1.1}/><Txt x={x+375} y={y+215} size={120} color="#7B8F83" style={{opacity:a}}>–</Txt><ScoreDigit x={x+550} y={y+162} value={m.prediction[1]} at={starts[index]+1.3}/>
 <Txt x={x+35} y={y+510} size={42} font={B} style={{opacity:a}}><span style={{color:C.lime}}>0{index+1}</span> / 03</Txt><Txt x={x+430} y={y+510} size={42} font={B} color={C.lime} style={{opacity:p(t,starts[index]+1.5,starts[index]+1.8)*a}}>SCORE PRÉDIT</Txt>
 </>}
 {visible&&!opening&&!active&&!recap&&<><Txt x={x+20} y={y+20} size={65} color={wasShown?C.lime:C.muted}>{index+1}</Txt><Txt x={x+85} y={y+34} size={wasShown?55:40} color={wasShown?C.paper:C.muted}>{wasShown?`${m.prediction[0]}–${m.prediction[1]}`:'À SUIVRE'}</Txt></>}
 {visible&&recap&&<><Txt x={x+24} y={y+50} size={72} color={C.lime} style={{opacity:a}}>{index+1}</Txt><Txt x={x+115} y={y+18} size={59} style={{opacity:a}}>{m.home.toLocaleUpperCase('fr')}</Txt><Txt x={x+115} y={y+94} size={59} style={{opacity:a}}>{m.away.toLocaleUpperCase('fr')}</Txt><Txt x={x+590} y={y+35} size={105} color={C.lime} style={{opacity:a}}>{m.prediction[0]}–{m.prediction[1]}</Txt></>}
 </Interactive.Div>;
};
const ScoreDigit=({x,y,value,at}:{x:number;y:number;value:number;at:number})=>{const t=useTime(),v=p(t,at,at+.35);return <><Txt x={x} y={y+65*(1-v)} size={300} color={C.lime} style={{opacity:v}}>{value}</Txt>{t<at+.35&&<div style={{position:'absolute',left:x-15,top:y+24,width:185,height:280,background:C.lime,opacity:1-v,clipPath:`inset(0 0 ${v*100}% 0)`}}/>}</>};
