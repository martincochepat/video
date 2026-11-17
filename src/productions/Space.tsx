import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {WorkshopShell, type Production} from '../WorkshopShell';

const curve={easing:Easing.bezier(0.65,0,0.35,1),extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const move=(t:number,a:number,b:number,x:number,y:number)=>interpolate(t,[a,b],[x,y],curve);

const Pitch = ({t,accent}:{t:number;accent:string}) => {
  // Les trajectoires font partie de l'illustration tactique, pilotée par le code.
  const ballX=t<5?310:t<8.5?move(t,5,6.1,310,740):move(t,9.6,11.6,740,810);
  const ballY=t<5?1050:t<8.5?move(t,5,6.1,1050,950):move(t,9.6,11.6,950,530);
  const space=interpolate(t,[2.2,3.2,12.2,13],[0,0.8,0.8,0],curve);
  return <svg aria-label="Schéma tactique pédagogique : déplacement du ballon et ouverture du couloir droit" viewBox={`${move(t,8,9.2,0,270)} ${move(t,8,9.2,0,200)} ${move(t,8,9.2,1080,780)} ${move(t,8,9.2,1500,1100)}`} style={{position:'absolute',top:460,left:60,width:960,height:950,overflow:'hidden'}}>
    <defs><pattern id="grass" width="1080" height="180" patternUnits="userSpaceOnUse"><rect width="1080" height="90" fill="#ffffff" opacity=".025"/></pattern><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke={accent} strokeWidth="1.4"/></marker></defs>
    <rect x="60" y="40" width="960" height="1380" rx="26" fill="#242033"/>
    <rect x="60" y="40" width="960" height="1380" fill="url(#grass)"/>
    <g fill="none" stroke="#d4c8e4" strokeOpacity=".45" strokeWidth="4"><rect x="85" y="65" width="910" height="1330"/><path d="M85 730H995"/><circle cx="540" cy="730" r="135"/><path d="M290 65V330H790V65M420 65V175H660V65M290 1395V1130H790V1395"/><path d="M455 65V25H625V65"/></g>
    <rect x="690" y="370" width="250" height="640" rx="80" fill={accent} opacity={space*.16}/>
    <path d="M805 1000L805 450" fill="none" stroke={accent} strokeWidth="8" strokeDasharray="16 18" opacity={space} markerEnd="url(#arrow)"/>
    <path d="M310 1050L740 950" stroke="#fbf5ff" strokeWidth="5" strokeDasharray="10 16" opacity={t>4.6&&t<8.7?.65:0}/>
    <path d="M740 950L810 530" stroke="#fbf5ff" strokeWidth="5" strokeDasharray="10 16" opacity={t>9&&t<12.5?.65:0}/>
    <g fill="#f5edff" stroke="#151020" strokeWidth="6">
      <circle cx="310" cy="1050" r="32"/>
      <circle cx="740" cy="950" r="32"/>
      <circle cx={move(t,9,11.6,805,810)} cy={t<9?move(t,8.3,8.6,1060,1080):move(t,9,11.6,1080,530)} r="32"/>
    </g>
    <g fill="#81778f" stroke="#151020" strokeWidth="6">
      <circle cx={move(t,.5,2.4,530,370)} cy={move(t,.5,2.4,790,910)} r="34"/>
      <circle cx={move(t,.7,2.8,700,570)} cy={move(t,.7,2.8,620,710)} r="34"/>
      <circle cx="430" cy="460" r="34"/>
    </g>
    <circle cx={ballX} cy={ballY} r="19" fill="#fffaf2" stroke="#151020" strokeWidth="5"/>
    <circle cx={ballX-4} cy={ballY-3} r="4" fill="#151020"/>
  </svg>;
};

const Opening=()=> <><Interactive.Div data-qa-text name="Accroche" style={{position:'absolute',top:230,left:100,right:100,fontSize:92,fontWeight:800,lineHeight:1.22}}>Le danger vient<br/>de l’espace.</Interactive.Div><div data-qa-text style={{position:'absolute',top:1440,left:100,right:100,fontSize:44,lineHeight:1.35}}>Attirer la défense d’un côté.</div></>;
const Switch=()=> <><Interactive.Div data-qa-text name="Décaler" style={{position:'absolute',top:230,left:100,right:100,fontSize:84,fontWeight:800,lineHeight:1.22}}>Le ballon change<br/>de côté.</Interactive.Div><div data-qa-text style={{position:'absolute',top:1440,left:100,right:100,fontSize:44,lineHeight:1.35}}>Le couloir opposé s’ouvre.</div></>;
const Run=()=> <><Interactive.Div data-qa-text name="Accélérer" style={{position:'absolute',top:230,left:100,right:100,fontSize:84,fontWeight:800,lineHeight:1.22}}>Le joueur attaque<br/>l’espace libre.</Interactive.Div><div data-qa-text style={{position:'absolute',top:1440,left:100,right:100,fontSize:44,lineHeight:1.35}}>La passe trouve sa course.</div></>;
const Conclusion=({accent}:{accent:string}) => <>
  <Interactive.Div name="Conclusion" style={{position:'absolute',left:0,top:0,width:1080,height:1920,background:'#151020'}}>
    <div data-qa-text style={{position:'absolute',top:270,left:100,right:100,fontSize:84,fontWeight:800,lineHeight:1.25}}>Déplacer le ballon.<br/>Libérer la course.</div>
    <svg viewBox="0 0 880 500" style={{position:'absolute',left:100,top:720,width:880,height:500}} aria-label="Synthèse : passe latérale puis course vers l’avant">
      <path d="M100 360L680 360L680 70" fill="none" stroke={accent} strokeWidth="10" strokeLinejoin="round"/>
      <path d="M650 115L680 65L710 115" fill="none" stroke={accent} strokeWidth="10"/>
      <circle cx="100" cy="360" r="40" fill="#faf6ff"/><circle cx="680" cy="360" r="40" fill={accent}/>
      <circle cx="680" cy="70" r="38" fill="#151020" stroke={accent} strokeWidth="8"/>
    </svg>
    <div data-qa-text style={{position:'absolute',top:1390,left:100,right:100,fontSize:48,lineHeight:1.4}}>Le mouvement crée la solution.</div>
  </Interactive.Div>
</>;

export const Space = ({production}: {production:Production}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const seconds=frame/fps;
  const index=Math.max(0,production.scenes.findIndex(s=>seconds>=s.startSeconds&&seconds<s.endSeconds));
  const scene=production.scenes[index];
  const canonical=[0,4,8,12,15];
  const t=canonical[index]+(seconds-scene.startSeconds)/(scene.endSeconds-scene.startSeconds)*(canonical[index+1]-canonical[index]);
  return <WorkshopShell production={production}>
    <div data-qa-text style={{position:'absolute',left:100,top:155,fontSize:40,color:production.palette.accent}}>FOOTBALL / LE JEU SANS BALLON</div>
    <Pitch t={t} accent={production.palette.accent}/>
    {index===0&&<Opening/>}{index===1&&<Switch/>}{index===2&&<Run/>}
    {index===3&&<Conclusion accent={production.palette.accent}/>}
    {!production.subtitles.enabled&&<div data-qa-text style={{position:'absolute',top:1585,left:100,right:100,fontSize:40,color:production.palette.muted}}>BLANC : ATTAQUE • GRIS : DÉFENSE</div>}
    <div style={{position:'absolute',left:100,top:1670,height:6,width:880,background:'#51435f'}}><div style={{height:'100%',width:`${100*seconds/production.durationSeconds}%`,background:production.palette.accent}}/></div>
  </WorkshopShell>;
};
