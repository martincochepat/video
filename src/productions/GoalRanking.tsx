import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {WorkshopShell,type Production} from '../WorkshopShell';
import {rankingState,smooth} from './goal-choreography';

const purple='#7853b3',ink='#292735';
const Avatar=({person}:{person:string})=><svg viewBox="0 0 90 90" width="76" height="76" aria-label={`Avatar illustré fictif ${person}`}>
  <defs><clipPath id={'avatar-'+person}><circle cx="45" cy="45" r="44"/></clipPath></defs>
  <g clipPath={`url(#avatar-${person})`}>
    <rect width="90" height="90" fill={person==='noe'?'#e6dcf2':person==='mila'?'#eadbce':'#dce6e3'}/>
    <path d="M11 94Q12 62 45 62Q78 62 79 94" fill={person==='noe'?purple:person==='mila'?'#c17f68':'#547e78'}/>
    <path d="M37 56V68Q45 77 53 68V56" fill={person==='sacha'?'#b97f60':'#d7a58b'}/>
    {person==='mila'&&<path d="M22 58V33Q21 7 45 7Q70 8 69 39V68H57L54 37H32V67H22Z" fill="#654737"/>}
    <ellipse cx="45" cy="38" rx="20" ry="25" fill={person==='sacha'?'#c28e6d':'#e4b498'}/>
    <path d={person==='noe'?'M24 36Q20 11 41 10Q66 7 67 35L58 27L36 30L30 23Z':person==='mila'?'M24 31Q24 8 46 10Q66 9 66 33Q50 29 44 20Q39 31 24 35Z':'M24 28Q23 10 43 10Q66 7 67 31L60 29L59 21L30 25L29 34L23 36Z'} fill={person==='sacha'?'#382d2e':'#654737'}/>
    <path d="M33 38H38M52 38H57" stroke="#433434" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="36" cy="42" r="1.8" fill="#433434"/><circle cx="54" cy="42" r="1.8" fill="#433434"/>
    <path d="M45 42L43 49H47M39 54Q45 58 51 54" stroke="#a56e59" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M31 72L45 80L59 72" fill="none" stroke="#ffffff" strokeOpacity=".6" strokeWidth="3"/>
  </g>
  <circle cx="45" cy="45" r="43" fill="none" stroke="#fff" strokeWidth="2"/>
</svg>;

const Phone=({rise,enter}:{rise:number;enter:number})=><svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,opacity:enter,translate:`0px ${rise}px`}} aria-label="Téléphone illustré avec cadre métallique et écran de classement fictif">
 <defs>
  <linearGradient id="frame" x1="0" y1="0" x2="1" y2=".3"><stop stopColor="#686675"/><stop offset=".25" stopColor="#242331"/><stop offset=".8" stopColor="#3e3a49"/><stop offset="1" stopColor="#98939e"/></linearGradient>
  <linearGradient id="screen" x2="0" y2="1"><stop stopColor="#fffefa"/><stop offset="1" stopColor="#eee9e3"/></linearGradient>
  <linearGradient id="glass"><stop stopColor="#fff" stopOpacity=".16"/><stop offset=".6" stopColor="#fff" stopOpacity="0"/></linearGradient>
  <filter id="phoneShadow" x="-.5" y="-.2" width="2" height="1.6"><feDropShadow dx="14" dy="27" stdDeviation="24" floodColor="#4b3f3b" floodOpacity=".2"/></filter>
 </defs>
 <ellipse cx="360" cy="1530" rx="245" ry="34" fill="#5c4961" opacity=".1"/>
 <rect x="105" y="695" width="6" height="90" rx="3" fill="#625e69"/><rect x="105" y="590" width="6" height="64" rx="3" fill="#625e69"/><rect x="610" y="675" width="6" height="122" rx="3" fill="#625e69"/>
 <rect x="110" y="510" width="500" height="1000" rx="67" fill="url(#frame)" filter="url(#phoneShadow)"/>
 <rect x="117" y="517" width="486" height="986" rx="61" fill="#181821" stroke="#b0a9b4" strokeWidth="1.5"/>
 <rect x="128" y="530" width="464" height="958" rx="50" fill="url(#screen)"/>
 <rect x="283" y="543" width="154" height="34" rx="17" fill="#1b1b24"/>
 <rect x="308" y="554" width="79" height="6" rx="3" fill="#333440"/><circle cx="409" cy="560" r="7" fill="#292c40"/><circle cx="411" cy="558" r="2.5" fill="#555d78"/>
 <text x="158" y="582" fontSize="21" fontWeight="700" fill={ink}>9:41</text>
 <g fill="none" stroke={ink} strokeWidth="2"><path d="M507 568Q516 560 525 568M511 573Q516 568 521 573"/><rect x="539" y="561" width="27" height="14" rx="3"/><path d="M569 566V571"/></g><rect x="542" y="564" width="20" height="8" rx="1" fill={ink}/>
 <text x="158" y="650" fontSize="44" fontWeight="800" fill={ink}>Entre amis</text>
 <circle cx="548" cy="635" r="22" fill="#f0e9f8"/><path d="M539 635H557M548 626V644" stroke={purple} strokeWidth="2.5"/>
 <rect x="158" y="686" width="210" height="46" rx="23" fill="#e8def3"/><text x="181" y="717" fontSize="22" fontWeight="700" fill="#65448c">CLASSEMENT</text>
 <text x="550" y="718" textAnchor="end" fontSize="23" fill="#8b8392">3 amis</text>
 <path d="M158 758H563" stroke="#d9d2d9" strokeWidth="2"/>
 <text x="158" y="1362" fontSize="24" fill="#99909d">Classement de démonstration</text>
 <rect x="158" y="1400" width="405" height="55" rx="20" fill="#e8e2eb"/><path d="M184 1439V1427L196 1419L208 1427V1439Z" fill="none" stroke={purple} strokeWidth="2.5"/><path d="M310 1420V1437M302 1428H318M429 1420H452M429 1428H452M429 1436H445" stroke="#a49aaa" strokeWidth="2.5" strokeLinecap="round"/>
 <rect x="295" y="1466" width="132" height="5" rx="2.5" fill="#2d2935"/>
 <path d="M132 582Q132 534 183 534H259L132 1230Z" fill="url(#glass)" pointerEvents="none"/>
</svg>;

const RankingRows=({t,rise}:{t:number;rise:number})=><div style={{opacity:smooth(t,.2,.7,0,1)}}>{rankingState(t).map(row=>{
 const active=row.id==='noe';const lift=active?(t<5.3?smooth(t,4.85,5.3,0,1):smooth(t,6.35,6.6,1,0)):0;
 return <div key={row.id} data-ranking-row={row.id} style={{position:'absolute',left:row.x,top:row.y+rise,width:410,height:145,borderRadius:22,background:active&&t>3.9?'#e9dff4':'#fffefa',border:`2px solid ${active&&t>3.9?'#ba9ed8':'#e7e0e4'}`,boxSizing:'border-box',boxShadow:`${lift*8}px ${5+lift*12}px ${10+lift*14}px rgba(65,47,79,${.05+lift*.14})`,zIndex:active?5:3}}>
  <div style={{position:'absolute',left:13,top:52,fontSize:29,color:active&&t>=6.4?purple:'#98909d',fontWeight:700}}>{row.rank}</div>
  <div style={{position:'absolute',left:45,top:30}}><Avatar person={row.id}/></div>
  <div data-qa-text style={{position:'absolute',left:139,top:35,fontSize:40,fontWeight:700,color:ink,lineHeight:1.4}}>{row.name}</div>
  <div data-qa-text style={{position:'absolute',right:20,top:31,fontSize:46,fontWeight:800,color:active&&t>=3.9?purple:ink,lineHeight:1.4}}>{row.points}</div>
  <div style={{position:'absolute',right:24,top:90,fontSize:22,color:'#9a8da4'}}>pts</div>
 </div>;
})}</div>;

const Football=({t}:{t:number})=>{
 const entry=smooth(t,.6,1.3,1,0);const mute=smooth(t,4.85,5.25,1,.16);
 const shot= t<2.35?0:smooth(t,2.35,2.95,0,1);
 const ballX=t<2.35?smooth(t,2,2.35,718,705):705+(925-705)*shot;
 const ballY=t<2.35?1110:1110-200*shot+110*shot*shot;
 const impact=Math.max(0,t-2.95);const net=t>=2.95&&t<3.75?Math.sin(impact*19)*Math.exp(-impact*6)*16:0;
 const kick=t<2.35?smooth(t,2,2.35,0,-32):t<2.55?smooth(t,2.35,2.55,-32,34):smooth(t,2.55,2.95,34,0);
 return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,opacity:mute*smooth(t,.6,1.3,0,1),translate:`${entry*65}px ${entry*28}px`}} aria-label="Tireur illustré, terrain miniature, ballon et cage avec filet réactif">
  <defs><linearGradient id="grassGoal" x2=".7" y2="1"><stop stopColor="#a9b8a1"/><stop offset="1" stopColor="#7c9580"/></linearGradient><filter id="fieldShadow" x="-.3" y="-.3" width="1.8" height="1.8"><feDropShadow dx="7" dy="20" stdDeviation="15" floodColor="#5b4d41" floodOpacity=".13"/></filter><radialGradient id="ballShade" cx=".3" cy=".2"><stop stopColor="#fffefa"/><stop offset="1" stopColor="#d2c9bd"/></radialGradient></defs>
  <g filter="url(#fieldShadow)"><path d="M614 1140L864 1265L1035 1015V1039L864 1289L614 1164Z" fill="#657f6c"/><path d="M614 1140L864 1265L1035 1015L785 890Z" fill="url(#grassGoal)"/></g>
  <g stroke="#eef1df" strokeWidth="3" fill="none" opacity=".75"><path d="M646 1133L859 1240L1004 1025L791 918Z"/><path d="M825 944L963 1013L902 1105L764 1035Z"/><path d="M678 1150L821 939"/><path d="M727 1086Q805 1063 826 1136"/></g>
  <g stroke="#a6a29a" strokeWidth="5" fill="none" strokeLinejoin="round"><path d="M850 1050L878 1020L1028 1065L1000 1100M850 900L878 870L1028 915V1065M1000 945L1028 915M878 870V1020"/></g>
  <g stroke="#fffdf5" strokeWidth="1.6" opacity=".8" fill="none">{Array.from({length:8},(_,i)=>{const x=850+i*150/7;return <path key={'v'+i} d={`M${x} ${900+i*45/7}Q${x+net} ${975+i*45/7} ${x} ${1050+i*45/7}`}/>})}{Array.from({length:9},(_,i)=><path key={'h'+i} d={`M850 ${900+i*150/8}Q${925+net} ${922.5+i*150/8} 1000 ${945+i*150/8}`}/>)}<path d="M850 900L878 870L1028 915L1000 945M861 889L1011 934M872 878L1022 923"/></g>
  <path d="M850 1050V900L1000 945V1100" stroke="#faf8ee" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M847 1050H858M995 1100H1006" stroke="#d6d1c4" strokeWidth="7" strokeLinecap="round"/>
  <ellipse cx="697" cy="1150" rx="52" ry="17" fill="#304c3b" opacity=".17"/>
  <g transform="translate(692 1041)">
    <path d="M-13 45L-25 88L-43 109" fill="none" stroke="#c89377" strokeWidth="17" strokeLinecap="round"/>
    <path d="M-24 88L-33 100" stroke="#e9e5ef" strokeWidth="18"/><path d="M-47 106L-29 112L-22 119L-55 119Q-62 111 -47 106" fill="#302c3c"/>
    <g transform={`rotate(${kick} 10 44)`}><path d="M10 44L19 77L43 97" stroke="#d6a084" strokeWidth="18" strokeLinecap="round" fill="none"/><path d="M27 84L39 95" stroke="#f5f0f5" strokeWidth="18"/><path d="M40 92L57 96Q66 102 60 109L32 106Z" fill="#332f41"/><path d="M40 108H61" stroke="#8c7b9c" strokeWidth="2"/></g>
    <path d="M-29 25L-20 55L1 58L7 47L19 55L30 28Z" fill="#40324f"/><path d="M-22 -25L-44 -9L-31 6L-20 0L-25 31Q0 41 29 30L24 -1L35 8L46 -7L25 -24Z" fill={purple}/><path d="M-12 -26L0 -15L13 -26" stroke="#f0e6fa" strokeWidth="5" fill="none"/><path d="M-23 22L25 22" stroke="#baa1d6" strokeWidth="3"/>
    <path d="M-39 -1L-51 14L-43 28M40 1L52 18L63 17" stroke="#d6a084" strokeWidth="11" strokeLinecap="round" fill="none"/>
    <path d="M-5 -36V-23Q2 -17 9 -25V-39" fill="#c68c71"/>
    <ellipse cx="2" cy="-56" rx="22" ry="27" fill="#dba88b"/><path d="M-19 -55Q-27 -82 -1 -85Q25 -86 25 -57L16 -63L9 -74L-11 -66L-13 -53Z" fill="#473731"/><circle cx="12" cy="-56" r="2" fill="#473731"/><path d="M9 -43L17 -44" stroke="#9f6c56" strokeWidth="2"/>
    <path d="M-1 -2V15M-7 1H3" stroke="#e9ddf4" strokeWidth="3" strokeLinecap="round"/>
  </g>
  <ellipse cx={ballX} cy="1120" rx={18-shot*6} ry="7" fill="#36503e" opacity={.16*(1-shot)}/>
  <g transform={`translate(${ballX} ${ballY}) rotate(${shot*270})`}><circle r="17" fill="url(#ballShade)" stroke="#ece7da" strokeWidth="1.5"/><path d="M-2 -8L6 -5L5 4L-3 7L-9 0Z" fill="#393440"/><path d="M-8 -14L-13 -7M12 -9L15 -1M10 11L2 15M-14 6L-9 12" stroke="#4b4351" strokeWidth="3"/></g>
 </svg>;
};

const GoalSignal=({t}:{t:number})=>{
 const u=smooth(t,3.2,3.9,0,1);const fade=t<4.7?1:smooth(t,4.7,4.9,1,0);
 const x=(1-u)**3*925+3*(1-u)**2*u*1020+3*(1-u)*u*u*750+u**3*540;
 const y=(1-u)**3*1020+3*(1-u)**2*u*1260+3*(1-u)*u*u*1400+u**3*1210;
 return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,opacity:t<3.2?0:fade,pointerEvents:'none'}}>
  <path d="M925 1020C1020 1260 750 1400 540 1210" pathLength="1" fill="none" stroke={purple} strokeWidth="4" strokeDasharray="1" strokeDashoffset={1-u} opacity=".45"/>
  <circle cx={x} cy={y} r="9" fill={purple}/><circle cx={x} cy={y} r="16" fill={purple} opacity=".12"/>
 </svg>;
};

export const GoalRanking=({production}:{production:Production})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const rise=smooth(t,.2,.95,380,0);const titleY=smooth(t,0,.45,14,0);
 return <WorkshopShell production={production}>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}} aria-hidden="true"><defs><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="17" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><radialGradient id="ambient"><stop stopColor="#fffdf3"/><stop offset="1" stopColor="#e9e1d4"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#ambient)"/><rect width="1080" height="1920" filter="url(#paper)" opacity=".035"/></svg>
  <Interactive.Div data-qa-text name="Titre" style={{position:'absolute',left:100,top:178,fontSize:96,fontWeight:800,color:ink,translate:`0px ${titleY}px`,lineHeight:1.3}}>Un seul but.</Interactive.Div>
  <Interactive.Div data-qa-text name="Conséquence" style={{position:'absolute',left:100,top:310,fontSize:64,fontWeight:700,color:ink,lineHeight:1.3}}>Le classement <span style={{color:purple}}>bascule.</span></Interactive.Div>
  <div style={{position:'absolute',left:102,top:425,width:74,height:5,borderRadius:3,background:purple}}/>
  <Phone rise={rise} enter={smooth(t,.2,.7,0,1)}/>
  <Football t={t}/>
  <GoalSignal t={t}/>
  {t>=2.95&&t<4.85&&<div data-qa-text style={{position:'absolute',left:727,top:730,fontSize:54,fontWeight:800,color:purple,rotate:'0deg',scale:smooth(t,2.95,3.2,.94,1),padding:'12px 25px',borderRadius:20,background:'#fffdf7',boxShadow:'0 12px 30px #5c43651a'}}>BUT !</div>}
  {t>=3.9&&t<5.25&&<div data-qa-text style={{position:'absolute',left:675,top:1320,fontSize:48,fontWeight:800,color:purple,translate:`0px ${smooth(t,3.9,4.2,12,0)}px`}}>+5 points</div>}
  <RankingRows t={t} rise={rise}/>
  {t>=6.6&&<div style={{position:'absolute',left:670,top:650,width:310,color:ink}}><div data-qa-text style={{fontSize:45,fontWeight:700,lineHeight:1.4}}>Noé passe</div><div data-qa-text style={{fontSize:64,color:purple,fontWeight:800,lineHeight:1.3}}>en tête.</div><svg width="130" height="70" viewBox="0 0 130 70"><path d="M110 20H25M44 2L24 20L44 38" stroke={purple} strokeWidth="4" fill="none" strokeLinecap="round"/></svg></div>}
  <div data-qa-text style={{position:'absolute',left:100,right:100,top:1600,fontSize:40,lineHeight:1.4,color:'#706677'}}>Noms, points et règles fictifs.<br/>Aucune interface officielle reproduite.</div>
 </WorkshopShell>;
};
