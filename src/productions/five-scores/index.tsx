import { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, delayRender, continueRender, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { WorkshopShell, type Production } from '../../WorkshopShell';
import manifest from '../../../productions/cinq-scores-v4/manifest.json';
import timing from '../../../productions/cinq-scores-v4/timings.json';
import { C, media, BODY } from './Design';
import { Hook, MatchScene, Outro } from './Scenes';
import { Wipe } from './Design';
const Captions = () => { const f = useCurrentFrame(), { fps } = useVideoConfig(), s = timing.segments.find(s => f / fps >= s.startSeconds && f / fps < s.endSeconds); return s ? <div data-qa-text style={{ position: 'absolute', left: 110, top: 1420, width: 820, fontFamily: BODY, fontSize: 52, fontWeight: 600, lineHeight: 1.22, color: C.white, textAlign: 'center', padding: '9px 12px 23px', boxSizing: 'border-box', borderRadius: 8, background: 'rgba(8,11,14,.88)', textShadow: '0 2px 8px #000' }}>{s.text}</div> : null; };
export const FiveScores = ({ qa = false, clean = false }: {
    qa?: boolean; clean?: boolean;
}) => {
    const [handle] = useState(() => delayRender('Polices V4')), [ready, setReady] = useState(false);
    const { fps } = useVideoConfig();
    useEffect(() => { let active = true; (async () => { const specs = [['V4Brand', media + 'brand-display.woff2', '600 800'], ['V4Body', media + 'brand-body.woff2', '100 900'], ['V4Condensed', 'productions/pronos-17-nov/fonts/BarlowCondensed-ExtraBold.ttf', '800']]; for (const [name, src, weight] of specs) {
        const face = new FontFace(name, `url(${staticFile(src)})`, { weight });
        document.fonts.add(face);
        await face.load();
    } if (active)
        setReady(true); })().catch(e => { console.error(e); continueRender(handle); }); return () => { active = false; }; }, [handle]);
    useEffect(() => { if (ready)
        continueRender(handle); }, [ready, handle]);
    const production = { ...manifest, voice: null, subtitles: { enabled: false, fontSize: 52, maxChars: 75 }, qa: qa && ready } as Production;
    return <WorkshopShell production={production}><AbsoluteFill style={{ background: C.bg }}>
 <Sequence name="Accroche photographique" durationInFrames={Math.round((timing.scenes[0].endSeconds + .28) * fps)}><Hook clean={clean}/></Sequence>
 {timing.scenes.slice(1, 6).map((s, i) => <Sequence key={s.id} name={`${i + 1} · ${s.id}`} from={Math.round(s.startSeconds * fps)} durationInFrames={Math.round((s.endSeconds - s.startSeconds + .28) * fps)}><Wipe variant={i}><MatchScene index={i} clean={clean}/></Wipe></Sequence>)}
 <Sequence name="Récapitulatif et question" from={Math.round(timing.scenes[6].startSeconds * fps)}><Wipe variant={5}><Outro clean={clean}/></Wipe></Sequence>
 <Audio src={staticFile(media + (clean ? 'audio/sfx.wav' : 'audio/mix.wav'))}/>
 {!clean && <Captions />}
 </AbsoluteFill></WorkshopShell>;
};

export const FiveScoresClean = ({qa=false}:{qa?:boolean}) => <FiveScores qa={qa} clean/>;
