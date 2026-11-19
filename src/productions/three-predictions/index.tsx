import { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile, useVideoConfig } from 'remotion';
import { WorkshopShell, type Production } from '../../WorkshopShell';
import manifest from '../../../productions/trois-pronostics/manifest.json';
import { C } from './design';
import { PreviewNotice, Signature } from './Brand';
import { Hook, Match, Challenge } from './Scenes';
import { SceneMask } from './design';
export const ThreePredictions = ({ qa = false, cover = false }: {
    qa?: boolean;
    cover?: boolean;
}) => {
    const [handle] = useState(() => delayRender('Polices locales du reel')), [ready, setReady] = useState(false);
    const { fps } = useVideoConfig();
    useEffect(() => { let active = true; const load = async () => { const faces = [new FontFace('ThreeTitle', `url(${staticFile('productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf')})`, { weight: '800' }), new FontFace('ThreeBody', `url(${staticFile('productions/pronos-17-nov/fonts/Inter.ttf')})`, { weight: '100 900' })]; for (const face of faces) {
        document.fonts.add(face);
        await face.load();
    } if (active) {
        setReady(true);
    } }; load().catch(e => { console.error(e); continueRender(handle); }); return () => { active = false; }; }, [handle]);
    useEffect(() => { if (ready)
        continueRender(handle); }, [ready, handle]);
    const production = { ...manifest, qa: qa && ready } as Production;
    return <WorkshopShell production={production}><AbsoluteFill style={{ background: C.bg, color: C.white }}>
 {cover ? <Hook cover/> : <>
 <Sequence name="Accroche · règle" durationInFrames={Math.round(3.3 * fps)}><Hook /></Sequence>
 <Sequence name="01 · score horizontal" from={3 * fps} durationInFrames={Math.round(5.3 * fps)}><SceneMask kind={0}><Match index={0}/></SceneMask></Sequence>
 <Sequence name="02 · composition asymétrique" from={8 * fps} durationInFrames={Math.round(5.3 * fps)}><SceneMask kind={1}><Match index={1}/></SceneMask></Sequence>
 <Sequence name="03 · surface de but" from={13 * fps} durationInFrames={Math.round(5.3 * fps)}><SceneMask kind={0}><Match index={2}/></SceneMask></Sequence>
 <Sequence name="Récapitulatif · choix du spectateur" from={18 * fps} durationInFrames={Math.round(6.3 * fps)}><SceneMask kind={1}><Challenge /></SceneMask></Sequence>
 <Sequence name="Signature textuelle" from={24 * fps} durationInFrames={3 * fps}><SceneMask kind={0}><Signature /></SceneMask></Sequence>
 <Audio src={staticFile(manifest.audio.src)}/>
 </>}
 <PreviewNotice />
 {/* Zone y1350–1570 intentionnellement vide : futurs sous-titres. */}
 </AbsoluteFill></WorkshopShell>;
};
