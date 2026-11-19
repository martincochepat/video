import data from '../../../productions/trois-pronostics/matches.json';
import { C, T, B, Text, Reveal, Pitch, NumberTrack, phase, useSceneTime } from './design';
import { Score } from './Score';
export const Hook = ({ cover = false }: {
    cover?: boolean;
}) => {
    const t = useSceneTime(), p = cover ? 1 : .2 + .8 * phase(t, 0, .32);
    return <>
 <NumberTrack at={-.15}/>
 <div style={{ position: 'absolute', left: 90, top: 350, width: 850, height: 650, background: 'radial-gradient(ellipse at 25% 40%, #17200A 0%, transparent 65%)' }}/>
 <Text y={350} size={cover ? 110 : 330} color={C.lime} style={{ opacity: p, transform: `translateY(${45 * (1 - p)}px)` }}>{cover ? '3 PRONOSTICS.' : '3'}</Text>
 {cover ? <><Text y={510} size={108}>1 SEUL</Text><Text y={625} size={108}>CHANGEMENT.</Text></> : <><Reveal at={.12}><Text x={330} y={422} size={108}>SCORES</Text><Text x={330} y={540} size={108}>EXACTS.</Text></Reveal></>}
 <Reveal at={cover ? -1 : .7}><Text y={cover ? 850 : 820} size={82}>TU N’EN CHANGES</Text><Text y={cover ? 945 : 915} size={110} color={C.lime}>QU’UN.</Text></Reveal>
 <Reveal at={cover ? -1 : 1.2}><Text y={1175} size={43} body color={C.grey}>01, 02 OU 03 : À TOI DE CHOISIR.</Text></Reveal>
 </>;
};
export const Match = ({ index }: {
    index: number;
}) => {
    const m = data.matches[index], t = useSceneTime();
    return <>
 <Pitch variant={index}/><NumberTrack active={index}/>
 <Text y={375} size={44} color={C.grey} body>RENCONTRE À CONFIRMER</Text>
 {index === 1 ? <><Reveal at={.18}><Text y={520} size={90}>{m.home}</Text><Text y={635} size={52} color={C.grey}>CONTRE</Text><Text y={725} size={90}>{m.away}</Text></Reveal><Score value={m.previewScore} x={565} y={590} size={225}/><Reveal at={1.2}><Text x={570} y={850} size={40} body color={C.lime}>EXEMPLE</Text></Reveal></> : <>
 <Reveal at={.12}><Text y={510} size={87}>{m.home}</Text><Text x={560} y={510} size={87}>{m.away}</Text></Reveal>
 <Reveal at={.27}><Text x={470} y={527} size={42} color={C.grey}>VS</Text></Reveal>
 <Score value={m.previewScore} x={180} y={650} size={index === 2 ? 355 : 345}/>
 <Reveal at={1.2}><Text y={1040} size={44} color={C.lime} body>EXEMPLE DE SCORE</Text></Reveal>
 </>}
 <Reveal at={1.3} travel={0}><Text y={1280} size={40} color={C.grey} body>AFFICHES ET PRONOSTICS NON VALIDÉS</Text></Reveal>
 {t < .35 && <div style={{ position: 'absolute', left: 120, top: 455, width: 800 * phase(t, 0, .3), height: 3, background: C.lime }}/>}
 </>;
};
export const Challenge = () => {
    const t = useSceneTime();
    return <>
 <NumberTrack active={2}/><Reveal at={.08}><Text y={368} size={90}>TU CHANGES</Text><Text y={466} size={110} color={C.lime}>LEQUEL ?</Text></Reveal>
 {data.matches.map((m, i) => {
            const p = phase(t, .18 + i * .13, .6 + i * .13);
            return <div key={m.id} style={{ position: 'absolute', left: 120, top: 675 + i * 175, width: 800, height: 145, opacity: p, transform: `translateX(${-15 * (1 - p)}px)`, borderBottom: `1px solid ${C.line}` }}>
 <span data-qa-text style={{ position: 'absolute', left: 0, top: 18, fontFamily: T, fontSize: 72, color: C.lime }}>{m.id}</span>
 <span data-qa-text style={{ position: 'absolute', left: 115, top: 17, fontFamily: B, fontWeight: 500, fontSize: 40, color: C.white, lineHeight: 1.24 }}>{m.home}<br />{m.away}</span>
 <span data-qa-text style={{ position: 'absolute', right: 5, top: 6, fontFamily: T, fontWeight: 800, fontSize: 112, color: C.white, lineHeight: 1.08, paddingBottom: '.3em' }}>{m.previewScore.join('–')}</span>
 </div>;
        })}
 <Reveal at={3}><Text y={1235} size={51} color={C.lime}>ET TU METS QUEL SCORE ?</Text></Reveal>
 </>;
};
