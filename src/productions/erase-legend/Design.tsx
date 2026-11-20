import {createContext,useContext} from 'react';
import type {CSSProperties,ReactNode} from 'react';
import {AbsoluteFill,Easing,Img,Interactive,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
export const C={bg:'#080B0E',paper:'#F6F7F8',lime:'#C8FF00',muted:'#AAB6BE',edge:'#2E3941'};
export const TextLifetimeContext=createContext(Number.POSITIVE_INFINITY);
export const T='LegendTitle',B='LegendBody',BRAND='LegendBrand';
export const media='productions/effacer-legende/';
export const useTime=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();return f/fps};
export const ease=Easing.bezier(.2,.82,.22,1);
export const p=(t:number,a:number,b:number)=>interpolate(t,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const lerp=(a:number,b:number,v:number)=>a+(b-a)*v;
export const Txt=({children,x=120,y,size=70,color=C.paper,font=T,style={}}:{children:ReactNode;x?:number;y:number;size?:number;color?:string;font?:string;style?:CSSProperties})=>{const t=useTime(),end=useContext(TextLifetimeContext),fade=Number.isFinite(end)?1-p(t,end-.28,end-.01):1;return <Interactive.Div name={typeof children==='string'?children:'Texte'} data-qa-text style={{position:'absolute',left:x,top:y,fontFamily:font,fontWeight:font===T?800:600,fontSize:size,lineHeight:1.08,paddingBottom:'.3em',color,whiteSpace:'nowrap',...style,opacity:fade*(typeof style.opacity==='number'?style.opacity:1)}}>{children}</Interactive.Div>};
export const Photo=({src,x=0,y=0,w=1080,h=1920,position='center',style={}}:{src:string;x?:number;y?:number;w?:number;h?:number;position?:string;style?:CSSProperties})=><Img data-qa-media src={staticFile(media+src)} style={{position:'absolute',left:x,top:y,width:w,height:h,objectFit:'cover',objectPosition:position,...style}}/>;
export const Paper=({src,x,y,w,h,tilt=0,position='center',bottom=10,fit='cover',style={}}:{src:string;x:number;y:number;w:number;h:number;tilt?:number;position?:string;bottom?:number;fit?:'cover'|'contain';style?:CSSProperties})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,padding:10,paddingBottom:bottom,boxSizing:'border-box',borderRadius:19,background:C.paper,boxShadow:'0 22px 38px #0009, 0 2px 3px #FFFFFF18',transform:`rotate(${tilt}deg)`,...style}}><div style={{position:'relative',width:'100%',height:'100%',overflow:'hidden',borderRadius:10,background:'#14202A'}}><Photo src={src} w={w-20} h={h-10-bottom} position={position} style={{objectFit:fit}}/><div style={{position:'absolute',inset:0,boxShadow:'inset 0 0 0 1px #0004'}}/></div></div>;
export const Backdrop=({src,pan=0}:{src:string;pan?:number})=><><Photo src={src} x={-55+pan} y={-20} w={1190} h={1850} style={{filter:'brightness(.23) saturate(.7)',opacity:.78}}/><AbsoluteFill style={{background:'linear-gradient(#080B0E 3%, #080B0ECC 18%,#080B0E30 45%,#080B0EF0 74%,#080B0E 91%)'}}/></>;
export const Reveal=({at=0,children}:{at?:number;children:ReactNode})=>{const t=useTime(),v=p(t,at,at+.35);return <div style={{position:'absolute',inset:0,opacity:v,transform:`translateY(${14*(1-v)}px)`}}>{children}</div>};
export const PageTurn=({from=0,kind=0,children}:{from?:number;kind?:number;children:ReactNode})=>{const t=useTime(),v=p(t,from,from+.48);const clip=kind%3===0?`inset(0 ${100*(1-v)}% 0 0)`:kind%3===1?`inset(${100*(1-v)}% 0 0 0)`:`circle(${v*2400}px at 850px 1000px)`;return <AbsoluteFill style={{background:C.bg,clipPath:t<from+.48?clip:'none'}}>{children}</AbsoluteFill>};
export const ChapterHeader=({name,theme,index}:{name:string;theme:string;index:number})=><>
 <div style={{position:'absolute',left:120,top:160,display:'flex',gap:16}}>{[0,1,2,3].map(i=><div key={i} style={{width:185,height:5,background:i<=index?C.lime:C.edge}}/>)}</div>
 <Txt y={220} size={name==='RONALDINHO'?120:140}>{name}</Txt>
 <Txt y={382} size={43} font={B} color={C.lime}>{theme}</Txt>
</>;
export const svgStyle={position:'absolute' as const,inset:0,width:1080,height:1920,pointerEvents:'none' as const};
