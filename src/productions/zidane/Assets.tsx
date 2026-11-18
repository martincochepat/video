import type {ReactNode} from 'react';
export const C={bg:'#080B0E',surface:'#171C21',lime:'#C8FF00',white:'#F6F7F8',muted:'#8D969E'};
export const T='StoryTitle',I='StoryInfo';
export const smooth=(v:number)=>{const u=Math.min(1,Math.max(0,v));return u*u*(3-2*u)};
export const step=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
export const mix=(t:number,a:number,b:number,x:number,y:number)=>x+(y-x)*step(t,a,b);
export const Svg=({children}:{children:ReactNode})=><svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0}}>{children}</svg>;
export const Stadium=({pan=0,light=1}:{pan?:number;light?:number})=><Svg>
 <defs>
  <linearGradient id="night" x2="0" y2="1"><stop stopColor={C.bg}/><stop offset=".5" stopColor="#111f27"/><stop offset="1" stopColor={C.bg}/></linearGradient>
  <radialGradient id="grass"><stop stopColor="#24453b"/><stop offset="1" stopColor="#0b1716"/></radialGradient>
  <linearGradient id="beam" x2="0" y2="1"><stop stopColor="#d5e5ee" stopOpacity=".12"/><stop offset="1" stopColor="#d5e5ee" stopOpacity="0"/></linearGradient>
  <radialGradient id="halo"><stop stopColor="#dae6e8" stopOpacity=".18"/><stop offset="1" stopColor="#dae6e8" stopOpacity="0"/></radialGradient>
  <linearGradient id="edge" x2="0" y2="1"><stop stopColor={C.bg}/><stop offset=".5" stopColor={C.bg} stopOpacity="0"/><stop offset="1" stopColor={C.bg}/></linearGradient>
  <pattern id="turf" width="67" height="91" patternUnits="userSpaceOnUse"><path d="M5 12l-2 13M31 39l3 9M58 75l-3 8" stroke="#aac0a5" strokeOpacity=".12" strokeWidth="1"/></pattern>
 </defs>
 <rect width="1080" height="1920" fill="url(#night)"/>
 <g transform={`translate(${pan} 0)`}>
  <ellipse cx="540" cy="1030" rx="950" ry="330" fill="#111b22" stroke="#34444e" strokeWidth="9"/>
  {Array.from({length:13},(_,i)=><ellipse key={i} cx="540" cy={925+i*13} rx={820+i*8} ry={177+i*9} fill="none" stroke={i%3===0?'#70808a':'#3f535b'} strokeWidth={i%3===0?3:6} strokeDasharray={i%3===0?undefined:'3 12'} opacity={i%3===0?.35:.55}/>)}
  <ellipse cx="540" cy="1030" rx="690" ry="198" fill="#0a1517" stroke="#52656a" strokeWidth="7"/>
  <ellipse cx="540" cy="874" rx="945" ry="210" fill="none" stroke="#2c3941" strokeWidth="50"/>
  <ellipse cx="540" cy="860" rx="945" ry="211" fill="none" stroke="#89999e" strokeWidth="4" opacity=".65"/>
  {Array.from({length:17},(_,i)=>{const x=-300+i*105;return <path key={i} d={`M${x} 810L${540+(x-540)*.76} 1040`} stroke="#7a8d93" strokeWidth="3" opacity=".28"/>})}
  <path d="M-300 1920L1400 1920L1100 1140L-30 1140Z" fill="url(#grass)"/>
  {Array.from({length:9},(_,i)=><path key={i} d={`M${-300+i*220} 1920L${-190+i*220} 1920L${40+i*137} 1140L${-30+i*137} 1140Z`} fill="#d5e9cc" opacity=".025"/>)}
  <path d="M-300 1920L1400 1920L1100 1140L-30 1140Z" fill="url(#turf)" opacity=".4"/>
  <g fill="none" stroke="#9cb9a9" strokeWidth="3" opacity=".4"><path d="M-110 1910L70 1160H1010L1190 1910M-50 1650H1130M540 1160V1920"/><ellipse cx="540" cy="1650" rx="270" ry="93"/><path d="M320 1160L270 1370H810L760 1160"/></g>
  <path d="M-45 830L-20 570M1125 830L1100 570" fill="none" stroke="#485e68" strokeWidth="19"/>
  {[[-20,585],[1100,585]].map(([x,y],i)=><g key={i}><ellipse cx={x} cy={y} rx="225" ry="180" fill="url(#halo)"/>{Array.from({length:5},(_,j)=><rect key={j} x={x-65+j*30} y={y-10} width="20" height="15" rx="3" fill="#edf4f2" opacity=".9"/>)}</g>)}
 </g>
 <g opacity={light}><path d="M-60 575L720 1580L80 1850Z" fill="url(#beam)"/><path d="M1140 575L350 1580L1020 1850Z" fill="url(#beam)"/></g>
 <rect width="1080" height="1920" fill="url(#edge)" opacity=".6"/>
</Svg>;

export const Trophy=({x=540,y=1250,h=760,opacity=1,blur=0}:{x?:number;y?:number;h?:number;opacity?:number;blur?:number})=><div style={{position:'absolute',left:x-h*500/800/2,top:y-h/2,width:h*500/800,height:h,opacity,filter:blur?`blur(${blur}px)`:undefined}}>
 <svg viewBox="0 0 500 800" width="100%" height="100%" aria-label="Interprétation sculpturale illustrée du trophée de la Coupe du monde">
  <defs><linearGradient id="gold"><stop stopColor="#513b20"/><stop offset=".2" stopColor="#c49d50"/><stop offset=".36" stopColor="#f3dc93"/><stop offset=".48" stopColor="#a17a35"/><stop offset=".67" stopColor="#e3bc67"/><stop offset=".83" stopColor="#8b5b25"/><stop offset="1" stopColor="#362b1c"/></linearGradient><radialGradient id="goldglobe" cx=".3" cy=".25"><stop stopColor="#f1dc9a"/><stop offset=".48" stopColor="#c7a153"/><stop offset="1" stopColor="#6c4f27"/></radialGradient><linearGradient id="stone"><stop stopColor="#172e27"/><stop offset=".4" stopColor="#507359"/><stop offset=".65" stopColor="#14291f"/><stop offset="1" stopColor="#31503a"/></linearGradient><clipPath id="globeClip"><circle cx="250" cy="162" r="128"/></clipPath></defs>
  <ellipse cx="250" cy="764" rx="196" ry="24" fill="#000" opacity=".55"/>
  <path d="M118 683L109 737Q250 791 391 737L382 683Z" fill="url(#gold)"/>
  <ellipse cx="250" cy="682" rx="132" ry="43" fill="#8c6b35" stroke="#e2c77d" strokeWidth="4"/>
  <path d="M115 700Q250 749 385 700L386 722Q250 771 114 722Z" fill="url(#stone)" stroke="#b39a54" strokeWidth="3"/>
  <path d="M182 658Q205 576 181 502Q142 413 113 345Q95 288 136 224L157 235Q143 290 163 318L206 373Q246 398 254 461Q259 524 292 552L327 655Q259 706 182 658Z" fill="url(#gold)" stroke="#9f7d3e" strokeWidth="3"/>
  <path d="M328 654Q281 582 278 506Q281 462 319 408Q376 344 381 296Q381 258 357 224L335 239Q352 282 332 310L285 360Q234 398 228 449Q211 515 220 562L178 654Q246 689 328 654Z" fill="url(#gold)" stroke="#b08d48" strokeWidth="3"/>
  <path d="M207 644Q245 560 239 484Q223 431 251 394M311 637Q277 563 299 482Q326 431 348 387M157 316Q172 377 207 397" fill="none" stroke="#f0cf7d" strokeOpacity=".64" strokeWidth="9"/>
  <path d="M176 650Q248 675 329 650M191 630Q243 649 317 633" fill="none" stroke="#684822" strokeWidth="4"/>
  <ellipse cx="188" cy="383" rx="25" ry="35" fill="url(#gold)" transform="rotate(-21 188 383)"/><ellipse cx="310" cy="370" rx="26" ry="35" fill="url(#gold)" transform="rotate(23 310 370)"/>
  <circle cx="250" cy="162" r="128" fill="url(#goldglobe)" stroke="#d0ae64" strokeWidth="5"/>
  <g clipPath="url(#globeClip)" fill="#9b793b" stroke="#efd38a" strokeWidth="2"><path d="M209 49L245 58L257 86L290 106L282 133L302 154L282 189L266 239L242 260L226 219L205 191L212 165L179 143L184 113L164 94L185 76Z"/><path d="M298 48L347 72L367 105L344 129L322 121L301 98L279 84Z"/><path d="M140 154L166 164L176 188L165 211L180 246L159 271L134 234L118 202Z"/><path d="M307 245L328 228L360 245L365 271L336 280Z"/></g>
  <path d="M164 106Q190 59 240 56" stroke="#fff3bf" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".65"/>
  <path d="M124 734Q250 781 377 734" fill="none" stroke="#f1d38a" strokeWidth="3"/>
  {Array.from({length:12},(_,i)=><path key={i} d={`M${153+i*17} 690l4 4`} stroke="#f4df9d" strokeWidth="2" opacity=".5"/>)}
 </svg>
</div>;

const PHI=(1+Math.sqrt(5))/2;
const centres=[[0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],[1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],[PHI,0,1],[-PHI,0,1],[PHI,0,-1],[-PHI,0,-1]].map(v=>{const n=Math.hypot(...v);return v.map(x=>x/n)});
const cross=(a:number[],b:number[])=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const Ball=({x,y,r,spin=0,shadow=true}:{x:number;y:number;r:number;spin?:number;shadow?:boolean})=>{
 const angle=spin*Math.PI/180;
 const project=(v:number[])=>{const xx=v[0]*Math.cos(angle)+v[2]*Math.sin(angle),z=-v[0]*Math.sin(angle)+v[2]*Math.cos(angle);return [xx,v[1]*.94-z*.342,v[1]*.342+z*.94]};
 return <g transform={`translate(${x} ${y})`}>
  <defs><radialGradient id="ballShade" cx=".29" cy=".23"><stop stopColor="#fff"/><stop offset=".54" stopColor="#e6e9e4"/><stop offset=".83" stopColor="#9eaaa9"/><stop offset="1" stopColor="#45565c"/></radialGradient><radialGradient id="ballLight" cx=".3" cy=".25"><stop stopColor="#fff" stopOpacity=".3"/><stop offset=".6" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".3"/></radialGradient><clipPath id="ballCircle"><circle r={r}/></clipPath></defs>
  {shadow&&<ellipse cx="12" cy={r*.93} rx={r*.78} ry={r*.17} fill="#000" opacity=".38"/>}
  <circle r={r} fill="url(#ballShade)" stroke="#a7b5b5" strokeWidth={Math.max(1,r*.009)}/>
  <g clipPath="url(#ballCircle)">
   {[-.64,-.24,.22,.62].map(v=><path key={v} d={`M${-r} ${v*r}Q0 ${v*r-r*.26*Math.cos(angle)} ${r} ${v*r}`} fill="none" stroke="#526268" strokeWidth={Math.max(.65,r*.008)} opacity=".32"/>)}
   {centres.map((v,i)=>{const c=project(v);if(c[2]<-.2)return null;let a=cross(v,[0,1,.01]);const n=Math.hypot(...a);a=a.map(x=>x/n);const b=cross(v,a);const vertices=Array.from({length:5},(_,j)=>{const k=j*Math.PI*2/5+.2;const vv=v.map((x,z)=>x*Math.cos(.36)+(a[z]*Math.cos(k)+b[z]*Math.sin(k))*Math.sin(.36));const p=project(vv);return `${p[0]*r},${p[1]*r}`});return <polygon key={i} points={vertices.join(' ')} fill="#1c2b31" stroke="#47575b" strokeWidth={r*.012} strokeLinejoin="round"/>})}
   <circle r={r} fill="url(#ballLight)"/>
   <path d={`M${-r*.68} ${-r*.32}Q${-r*.43} ${-r*.78} ${r*.05} ${-r*.82}`} fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth={r*.026} strokeLinecap="round"/>
  </g>
 </g>;
};
export const netDisplacement=(t:number,impact:number)=>{const d=t-impact;return d>0&&d<1.1?Math.sin(d*18)*Math.exp(-d*5.2)*49:0};
export const Net=({x,y,w,h,impact,t,frameOnly=false,hitV=.67}:{x:number;y:number;w:number;h:number;impact:number;t:number;frameOnly?:boolean;hitV?:number})=>{
 const push=netDisplacement(t,impact);const point=(u:number,v:number)=>{const k=Math.exp(-((u-.51)**2+(v-hitV)**2)/.045);return [x+u*w+push*k,y+v*h+push*k*.3]};
 const line=(fixed:number,vertical:boolean)=>Array.from({length:25},(_,i)=>{const p=point(vertical?fixed:i/24,vertical?i/24:fixed);return `${i?'L':'M'}${p[0]} ${p[1]}`}).join('');
 return <g>
  {!frameOnly&&<><path d={`M${x} ${y}l60 -50h${w*.82}l${w*.18-60} 50M${x+60} ${y-50}v${h}l-60 50`} fill="none" stroke="#455b60" strokeWidth="8"/>
  <g fill="none" stroke="#bbcdd0" strokeWidth="1.5" opacity=".5">{Array.from({length:18},(_,i)=><path key={'v'+i} d={line(i/17,true)}/>)}{Array.from({length:14},(_,i)=><path key={'h'+i} d={line(i/13,false)}/>)}</g></>}
  <path d={`M${x} ${y+h}V${y}H${x+w}V${y+h}`} fill="none" stroke="#dce7e7" strokeWidth="14" strokeLinejoin="round"/>
  <path d={`M${x-3} ${y+h}V${y-3}H${x+w}`} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3"/>
  {Array.from({length:10},(_,i)=><path key={i} d={`M${x+i*w/9} ${y}v13`} stroke="#52676b" strokeWidth="3"/>)}
 </g>;
};
export const Player=({x,y,h=380,number='10',blue=false,walk=0,opacity=1}:{x:number;y:number;h?:number;number?:string;blue?:boolean;walk?:number;opacity?:number})=><g transform={`translate(${x-h*.2} ${y-h}) scale(${h/400})`} opacity={opacity} aria-label="Silhouette symbolique anonyme vue de dos, sans portrait">
 <ellipse cx="80" cy="395" rx="75" ry="12" fill="#000" opacity=".4"/>
 <circle cx="80" cy="40" r="29" fill="#27383e"/><path d="M65 60V86H95V60" fill="#27383e"/>
 <path d="M46 82L18 104L0 176L21 185L45 128L43 231Q79 246 119 231L116 127L143 184L162 173L141 103L112 82Z" fill={blue?'#24496c':'#e4e9e7'} stroke="#596d73" strokeWidth="2"/>
 <path d="M52 87Q80 109 107 87M47 213H117" fill="none" stroke={blue?'#b9cbd5':'#273f60'} strokeWidth="4"/>
 <path d="M45 234L40 285L76 286L82 249L91 286L128 283L117 234Z" fill={blue?'#e4e8e3':'#253e59'}/>
 <path d={`M56 280L${57-walk*15} 351L${52-walk*20} 379M109 280L${108+walk*15} 351L${112+walk*20} 379`} fill="none" stroke="#b5c0bd" strokeWidth="24"/>
 <path d={`M${43-walk*20} 381h34M${100+walk*20} 381h34`} stroke="#172229" strokeWidth="18" strokeLinecap="round"/>
 <text x="80" y="191" textAnchor="middle" fontFamily={T} fontSize="88" fontWeight="800" fill={blue?'#f1f4ed':'#273e58'}>{number}</text>
 <path d="M25 100L18 140M134 100L141 140" stroke={blue?'#63859e':'#a1b0b7'} strokeWidth="7"/>
</g>;
export const Clock=({minute,x=830,y=750,r=160}:{minute:number;x?:number;y?:number;r?:number})=><Svg><g transform={`translate(${x} ${y})`}>
 <circle r={r+15} fill="#0e181e" stroke="#485c66" strokeWidth="3"/><circle r={r} fill="#101c23" stroke="#9eb0b7" strokeWidth="2"/>
 {Array.from({length:60},(_,i)=>{const a=i*Math.PI/30;return <path key={i} d={`M${Math.sin(a)*(r-12)} ${-Math.cos(a)*(r-12)}L${Math.sin(a)*(r-(i%5?20:32))} ${-Math.cos(a)*(r-(i%5?20:32))}`} stroke={i%5?'#556c76':'#b9c9cd'} strokeWidth={i%5?2:4}/>})}
 <path d={`M0 0L${Math.sin(minute/120*Math.PI*2)*(r-42)} ${-Math.cos(minute/120*Math.PI*2)*(r-42)}`} stroke={C.lime} strokeWidth="5"/><circle r="7" fill={C.lime}/>
 <rect x={-r*.7} y={r*.04} width={r*1.4} height={r*.5} fill="#101c23"/>
 <text x="0" y={r*.43} textAnchor="middle" fontFamily={T} fontSize={r*.61} fontWeight="800" fill={C.white}>{Math.round(minute)}′</text>
</g></Svg>;
export const Tunnel=({track=0}:{track?:number})=><Svg>
 <defs><linearGradient id="hall" x2="0" y2="1"><stop stopColor="#14212a"/><stop offset="1" stopColor="#080b0e"/></linearGradient><linearGradient id="doorGlow"><stop stopColor="#b6c5c3" stopOpacity=".02"/><stop offset=".5" stopColor="#e3e9e5" stopOpacity=".18"/><stop offset="1" stopColor="#b6c5c3" stopOpacity=".02"/></linearGradient></defs>
 <rect width="1080" height="1920" fill={C.bg}/>
 <g transform={`translate(${-track*80} 0)`}>
  <path d="M-300 570L430 1010V1510L-300 2030Z" fill="#17242c"/>
  <path d="M1380 570L650 1010V1510L1380 2030Z" fill="#142027"/>
  <path d="M-300 570H1380L650 1010H430Z" fill="#0e171d"/>
  <path d="M-300 2030H1380L650 1510H430Z" fill="url(#hall)"/>
  <rect x="430" y="1010" width="220" height="500" fill="#080c0f" stroke="#3c4c52" strokeWidth="18"/>
  <rect x="449" y="1023" width="183" height="486" fill="url(#doorGlow)"/>
  {Array.from({length:7},(_,i)=>{const k=i/7;return <g key={i} stroke="#596d75" fill="none" opacity=".3"><path d={`M${-240+k*670} ${620+k*390}V${1990-k*480}M${1320-k*670} ${620+k*390}V${1990-k*480}`}/><path d={`M${-240+k*670} ${1990-k*480}H${1320-k*670}`}/></g>})}
  {[0,.25,.5,.75].map(k=><g key={k}><path d={`M${80+440*k} ${640+360*k}H${1000-440*k}`} stroke="#92a7ad" strokeWidth={9-6*k} opacity=".5"/><path d={`M${-100+500*k} ${1120+130*k}L430 1330M${1180-500*k} ${1120+130*k}L650 1330`} stroke="#5d7582" strokeWidth="4" opacity=".35"/></g>)}
  <path d="M-100 1780L455 1430M1180 1780L625 1430" stroke="#6e858d" strokeWidth="2" opacity=".4"/>
 </g>
</Svg>;
