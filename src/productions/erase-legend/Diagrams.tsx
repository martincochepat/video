import {Ball,Net} from '../zidane/Assets';
import {C,svgStyle,p,lerp} from './Design';
export const VisionPitch=({t}:{t:number})=>{const v=p(t,.4,3.9),x=lerp(165,875,v),y=1100-65*Math.sin(v*Math.PI*4);return <svg viewBox="0 0 1080 1920" style={svgStyle}>
 <rect x="120" y="910" width="815" height="360" rx="22" fill="#14231F" stroke="#456158" strokeWidth="3"/>
 <g stroke="#809B8B" strokeWidth="2" fill="none" opacity=".6"><rect x="145" y="935" width="765" height="310" rx="4"/><path d="M527 935V1245"/><ellipse cx="527" cy="1090" rx="88" ry="77"/><path d="M145 995H250V1185H145M910 995H805V1185H910"/></g>
 {[[250,1010],[365,1160],[505,1010],[650,1180],[770,1030]].map(([xx,yy],i)=><g key={i}><ellipse cx={xx+6} cy={yy+12} rx="25" ry="11" fill="#0008"/><circle cx={xx} cy={yy} r="24" fill="#71847E" stroke="#CCD9D0" strokeWidth="3"/></g>)}
 <path d={Array.from({length:101},(_,i)=>`${i?'L':'M'}${165+710*i/100} ${1100-65*Math.sin(i/100*Math.PI*4)}`).join(' ')} pathLength="1" fill="none" stroke={C.lime} strokeWidth="6" strokeDasharray="1" strokeDashoffset={1-v}/>
 <Ball x={x} y={y} r={25} spin={v*500}/>
 </svg>};
export const PowerArc=({t}:{t:number})=>{const v=p(t,.5,2.6),x=(1-v)**2*160+2*(1-v)*v*540+v*v*890,y=(1-v)**2*980+2*(1-v)*v*540+v*v*980;return <svg viewBox="0 0 1080 1920" style={svgStyle}><path d="M160 980Q540 540 890 980" pathLength="1" fill="none" stroke={C.lime} strokeWidth="5" strokeDasharray="1" strokeDashoffset={1-v}/><path d="M855 945L892 980L903 935" fill="none" stroke={C.lime} strokeWidth="5"/><Ball x={x} y={y} r={28} spin={v*650}/></svg>};
export const VolleyStage=({t}:{t:number})=>{const cross=p(t,.35,2.2),shot=p(t,2.35,3.15),x=t<2.35?lerp(170,585,cross):(1-shot)**2*585+2*(1-shot)*shot*730+shot**2*840,y=t<2.35?lerp(600,850,cross)-110*Math.sin(cross*Math.PI):(1-shot)**2*850+2*(1-shot)*shot*600+shot**2*805,kick=p(t,1.8,2.35)-p(t,2.55,3.1)*.6;
 return <svg viewBox="0 0 1080 1920" style={svgStyle}>
 <defs><linearGradient id="legend-field" x2="0" y2="1"><stop stopColor="#1D2A2E"/><stop offset="1" stopColor="#0B1317"/></linearGradient></defs>
 <rect x="120" y="465" width="815" height="680" rx="26" fill="url(#legend-field)" stroke="#42545B" strokeWidth="3"/>
 <path d="M150 1110L270 670H875L910 1110M320 1110L365 820H870M150 1010H900" fill="none" stroke="#7F9593" strokeWidth="3" opacity=".6"/>
 <Net x={720} y={670} w={160} h={330} impact={3.15} t={t} hitV={.4}/>
 <g transform="translate(425 1000)" fill="none" stroke="#F6F7F8" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="-172" r="27" fill="#F6F7F8" stroke="none"/><path d="M0-134L-22-45L-5 5L-40 93M-6-112L-90-70M-6-112L75-155"/><path d={`M-22-45L${lerp(60,100,kick)} ${lerp(55,-110,kick)}L${lerp(95,160,kick)} ${lerp(110,-150,kick)}`} stroke={C.lime}/></g>
 {t>=2.35&&<path d="M585 850Q730 600 840 805" pathLength="1" fill="none" stroke={C.lime} strokeWidth="5" strokeDasharray="1" strokeDashoffset={1-shot}/>}
 <Ball x={x} y={y} r={30} spin={(cross+shot)*620}/>
 </svg>};
export const JoyPath=({t}:{t:number})=>{const v=p(t,.3,3.4),x=lerp(160,890,v),y=1010-85*Math.sin(v*Math.PI*3);return <svg viewBox="0 0 1080 1920" style={svgStyle}>
 <path d={Array.from({length:101},(_,i)=>`${i?'L':'M'}${160+730*i/100} ${1010-85*Math.sin(i/100*Math.PI*3)}`).join(' ')} pathLength="1" fill="none" stroke={C.lime} strokeWidth="6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1-v}/>
 {[[240,1050],[520,1070],[790,1055]].map(([xx,yy],i)=><g key={i} opacity={p(t,.7+i*.7,1.1+i*.7)}><circle cx={xx} cy={yy} r="16" fill="#F6F7F8"/><circle cx={xx} cy={yy} r="31" fill="none" stroke="#B9C2C5" strokeWidth="2"/></g>)}
 <Ball x={x} y={y} r={26} spin={v*720}/>
 </svg>};
