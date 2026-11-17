import {useEffect, useState, type ReactNode} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';

export type Segment = {text: string; startSeconds: number; endSeconds: number; sceneId: string};
export type Production = {
  id: string; component: string; profile: string; fps: number; width: number; height: number;
  durationSeconds: number; safeArea: {top:number;right:number;bottom:number;left:number};
  palette: {background:string;foreground:string;accent:string;muted:string};
  subtitles: {enabled:boolean;fontSize:number;maxChars:number};
  scenes: {id:string;startSeconds:number;endSeconds:number}[];
  voice: null | {src:string;durationSeconds:number;timingBasis:string};
  captions: Segment[]; qa?:boolean;
};

const Probe = ({production}: {production:Production}) => {
  const frame = useCurrentFrame();
  const {width,height} = useVideoConfig();
  const [handle] = useState(() => delayRender('Contrôles de mise en page'));
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(async () => {
      // Laisser le navigateur finaliser le layout après le chargement local.
      await new Promise<void>((resolve)=>requestAnimationFrame(()=>resolve()));
      if (!active) return;
      const errors:string[]=[];
      const safe=production.safeArea;
      const scale=document.querySelector('[data-workshop]')!.getBoundingClientRect().width/width;
      const origin=document.querySelector('[data-workshop]')!.getBoundingClientRect();
      const boxes = [...document.querySelectorAll<HTMLElement>('[data-qa-text]')].filter(e=>getComputedStyle(e).visibility!=='hidden' && Number(getComputedStyle(e).opacity)>0.05).map(e=>{
        const range=document.createRange();range.selectNodeContents(e);
        const b=range.getBoundingClientRect();
        const box={text:e.innerText,x:(b.left-origin.left)/scale,y:(b.top-origin.top)/scale,width:b.width/scale,height:b.height/scale};
        if(box.x<safe.left-2 || box.y<safe.top-2 || box.x+box.width>width-safe.right+2 || box.y+box.height>height-safe.bottom+2) errors.push(`Texte hors zone sûre: ${box.text}`);
        if(e.scrollWidth>e.clientWidth+2 || e.scrollHeight>e.clientHeight+2)errors.push(`Débordement: ${box.text}`);
        const size=parseFloat(getComputedStyle(e).fontSize);
        if(size<40)errors.push(`Texte trop petit: ${box.text}`);
        return box;
      });
      if(!document.fonts.check('600 48px StudioSans'))errors.push('Police locale absente');
      for(const e of document.querySelectorAll<HTMLImageElement>('img[data-qa-media]'))if(!e.complete || !e.naturalWidth)errors.push('Image manquante');
      console.log('WORKSHOP_QA:'+JSON.stringify({frame,boxes,errors,fontLoaded:document.fonts.check('600 48px StudioSans')}));
      continueRender(handle);
    }).catch(e=>{console.error(e);continueRender(handle)});
    return ()=>{active=false};
  },[frame,handle,width,height,production]);
  return null;
};

export const WorkshopShell = ({production,children}: {production:Production;children:ReactNode}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const caption=production.captions.find(c=>frame/fps>=c.startSeconds && frame/fps<c.endSeconds);
  return <AbsoluteFill data-workshop style={{background:production.palette.background,color:production.palette.foreground,fontFamily:'StudioSans',overflow:'hidden'}}>
    <style>{`@font-face{font-family:StudioSans;src:url('${staticFile('fonts/StudioSans.ttf')}')}@font-face{font-family:StudioSans;src:url('${staticFile('fonts/StudioSans-Bold.ttf')}');font-weight:600 900}`}</style>
    {children}
    {production.voice && <Audio name="Voix importée" src={staticFile(production.voice.src)} />}
    {production.subtitles.enabled && caption && <div data-qa-text style={{position:'absolute',left:production.safeArea.left,right:production.safeArea.right,bottom:production.safeArea.bottom,fontSize:production.subtitles.fontSize,textAlign:'center',padding:'12px 16px',background:'#101018',borderRadius:12,lineHeight:1.3}}>{caption.text}</div>}
    {production.qa && <Probe production={production}/>}
  </AbsoluteFill>;
};
