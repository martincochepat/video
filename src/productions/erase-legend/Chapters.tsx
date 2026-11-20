import {AbsoluteFill} from 'remotion';
import playersData from '../../../productions/effacer-legende/players.json';
import {C,Txt,Paper,Backdrop,ChapterHeader,PageTurn,Reveal,useTime,p,lerp,B,svgStyle} from './Design';
import {VisionPitch,PowerArc,VolleyStage,JoyPath} from './Diagrams';
const yearsMessi=[2009,2010,2011,2012,2015,2019,2021,2023];
const yearsCristiano=[2008,2014,2016,2017,2018];
const Floor=()=> <div style={{position:'absolute',left:95,top:1290,width:870,height:120,background:'radial-gradient(ellipse,#0009,transparent 68%)'}}/>;
const Count=({value,label,t,at=1}:{value:number;label:string;t:number;at?:number})=>{const q=p(t,at,at+1.2);return <><Txt y={1080} size={190} color={C.lime}>{Math.max(1,Math.round(q*value))}</Txt><Txt x={330} y={1200} size={58}>{label}</Txt></>};
const TrophyPhoto=({kind,x,y,w=260,h=360,tilt=0}:{kind:'world-cup'|'golden-ball'|'champions-cup';x:number;y:number;w?:number;h?:number;tilt?:number})=><Paper src={kind+(kind==='champions-cup'?'.png':'.jpg')} x={x} y={y} w={w} h={h} tilt={tilt} position="center"/>;
export const Messi=()=>{const t=useTime(),a=p(t,.15,.85),world=p(t,11.4,12.2);return <>
 <Backdrop src="messi-portrait.jpg" pan={p(t,0,18)*18}/><Floor/>
 {t<5.85&&<><Paper src="messi-portrait.jpg" x={lerp(120,135,a)} y={lerp(425,445,a)} w={lerp(380,740,a)} h={lerp(350,760,a)} bottom={lerp(76,10,a)} tilt={lerp(-3,-1,a)} position="50% 22%"/><div style={{opacity:p(t,.8,1.5)}}><TrophyPhoto kind="golden-ball" x={660} y={805} w={240} h={325} tilt={5}/></div><Count value={8} label="BALLONS D’OR" t={t}/>
 <div style={{position:'absolute',left:120,top:1310,display:'flex',gap:12}}>{yearsMessi.map((year,i)=><div key={year} style={{height:8,width:78*p(t,1+i*.1,1.3+i*.1),background:C.lime}}/>)}</div></>}
 {t>=5.3&&t<11.95&&<PageTurn from={5.3} kind={1}><Backdrop src="messi-barca.jpg"/><Paper src={t<8.4?'messi-barca.jpg':'messi-action.jpg'} x={120} y={455} w={815} h={410} tilt={0} fit={t<8.4?'contain':'cover'}/><VisionPitch t={t-5.3}/><Txt y={1295} size={48} color={C.lime}>CRÉER UN PASSAGE.</Txt></PageTurn>}
 {t>=11.4&&<PageTurn from={11.4} kind={2}><Backdrop src="messi-world.jpg"/><Paper src="messi-world.jpg" x={lerp(120,145,world)} y={460} w={610} h={745} tilt={lerp(-4,-1,world)} position="center 28%"/><TrophyPhoto kind="world-cup" x={615} y={700} w={290} h={410} tilt={lerp(6,2,world)}/><Txt y={1140} size={155} color={C.lime}>2022</Txt><Txt x={480} y={1240} size={48}>CHAMPION DU MONDE</Txt></PageTurn>}
 <ChapterHeader name="MESSI" theme={t<5.3?'LE GÉNIE':t<11.4?'LA VISION':'L’ABOUTISSEMENT'} index={0}/>
 </>};
export const Cristiano=()=>{const t=useTime(),q=p(t,.1,.65),v=p(t,11.4,12.2);return <>
 <Backdrop src="ronaldo-portrait.jpg" pan={-p(t,0,18)*22}/><Floor/>
 {t<5.8&&<><Paper src="ronaldo-united.jpg" x={120} y={445} w={565} h={760} tilt={lerp(-4,-1,q)} position="56% center"/><Paper src="ronaldo-award.jpg" x={lerp(680,550,q)} y={670} w={355} h={455} tilt={lerp(7,3,q)} position="100% center"/><Count value={5} label="BALLONS D’OR" t={t}/></>}
 {t>=5.3&&t<11.95&&<PageTurn from={5.3} kind={0}><Backdrop src="ronaldo-shot.jpg"/><Paper src="ronaldo-shot.jpg" x={120} y={450} w={815} h={410}/><PowerArc t={t-5.3}/>
 {yearsCristiano.map((year,i)=>{const a=p(t,7.4+i*.18,7.9+i*.18);return <div key={year} style={{opacity:a}}><TrophyPhoto kind="champions-cup" x={120+i*164} y={1040+20*(1-a)} w={145} h={205}/><Txt x={125+i*164} y={975} size={46} color={C.lime}>{year}</Txt></div>})}<Txt y={1295} size={49}>5 LIGUES DES CHAMPIONS</Txt></PageTurn>}
 {t>=11.4&&<PageTurn from={11.4} kind={1}><Backdrop src="ronaldo-portugal.jpg"/><Paper src="ronaldo-portugal.jpg" x={120} y={450} w={815} h={570} tilt={lerp(1,0,v)} position="30% center"/>
 <div style={{position:'absolute',left:120,top:1070,width:815,height:220,borderTop:'3px solid #C8FF00',background:'linear-gradient(#C8FF0010,transparent)'}}/>
 <Txt y={1095} size={170} color={C.lime}>2016</Txt><Txt x={500} y={1190} size={76}>EURO</Txt><Txt x={500} y={1280} size={42} font={B}>PORTUGAL</Txt></PageTurn>}
 <ChapterHeader name="RONALDO" theme={t<5.3?'LA MACHINE':t<11.4?'CINQ FOIS AU SOMMET':'LA SÉLECTION AUSSI'} index={1}/>
 </>};
export const Zidane=()=>{const t=useTime(),a=p(t,.2,1.1),history=p(t,1.8,2.6);return <>
 <Backdrop src="zidane-portrait.jpg" pan={p(t,0,18)*10}/><Floor/>
 {t<7.5&&<><Paper src="zidane-face.jpg" x={120} y={455} w={510} h={770} tilt={lerp(-2,0,a)} position="50% 26%"/>
 <div style={{opacity:history}}><TrophyPhoto kind="world-cup" x={660} y={560} w={245} h={345}/><Txt x={650} y={980} size={100} color={C.lime}>1998</Txt><Txt x={650} y={1100} size={43}>DEUX BUTS</Txt><Txt x={650} y={1155} size={43}>EN FINALE</Txt></div>
 <Txt y={1285} size={46}>MONDIAL 1998 <span style={{color:C.lime}}>→</span> EURO 2000</Txt></>}
 {t>=7&&<PageTurn from={7} kind={2}><Backdrop src="zidane-field.jpg"/><div style={{position:'absolute',inset:0,transformOrigin:'0 0',transform:`translate(${45*p(t,13.4,14.2)}px,${240*p(t,13.4,14.2)}px) scale(${1-.38*p(t,13.4,14.2)})`}}><VolleyStage t={t-7}/></div><div style={{opacity:p(t,13.7,14.3)}}><Paper src="zidane-portrait.jpg" x={660} y={560} w={275} h={540} position="50% 20%"/></div><Txt y={1170} size={92} color={C.lime}>GLASGOW 2002</Txt><Txt y={1290} size={42}>UNE VOLÉE. UNE FINALE.</Txt></PageTurn>}
 <ChapterHeader name="ZIDANE" theme={t<7?'L’ÉLÉGANCE':'LE GESTE QUI RESTE'} index={2}/>
 </>};
export const Ronaldinho=()=>{const t=useTime(),a=p(t,.1,.8);return <>
 <Backdrop src="ronaldinho-portrait.jpg" pan={p(t,0,18)*18}/><Floor/>
 {t<5.8&&<><Paper src="ronaldinho-portrait.jpg" x={lerp(120,140,a)} y={445} w={610} h={770} tilt={lerp(-4,-1,a)} position="center 25%"/><Paper src="ronaldinho-freekick.jpg" x={lerp(700,575,a)} y={840} w={330} h={260} tilt={lerp(7,3,a)}/><Txt y={1250} size={70} color={C.lime}>LE PLAISIR DE TENTER.</Txt></>}
 {t>=5.3&&t<11.95&&<PageTurn from={5.3} kind={2}><Backdrop src="ronaldinho-penalty.jpg"/><Paper src="ronaldinho-penalty.jpg" x={120} y={455} w={815} h={490} tilt={-1}/><JoyPath t={t-5.3}/><Txt y={1230} size={80} color={C.lime}>LE JEU EN LIBERTÉ.</Txt></PageTurn>}
 {t>=11.4&&<PageTurn from={11.4} kind={0}><Backdrop src="ronaldinho-portrait.jpg"/>
 <Paper src="ronaldinho-portrait.jpg" x={120} y={455} w={815} h={420} position="center 22%"/>
 {(['world-cup','golden-ball','champions-cup'] as const).map((kind,i)=>{const a=p(t,11.7+i*.16,12.2+i*.16);return <div key={kind} style={{opacity:a}}><TrophyPhoto kind={kind} x={120+i*280} y={950+20*(1-a)} w={255} h={300} tilt={i===0?-2:i===2?2:0}/><Txt x={145+i*280} y={1290} size={65} color={C.lime}>{[2002,2005,2006][i]}</Txt></div>})}
 </PageTurn>}
 <ChapterHeader name="RONALDINHO" theme={t<5.3?'LA MAGIE':t<11.4?'UN JEU LIBRE':'TROIS SOMMETS'} index={3}/>
 </>};
export const LegendChapter=({index}:{index:number})=>index===0?<Messi/>:index===1?<Cristiano/>:index===2?<Zidane/>:<Ronaldinho/>;
