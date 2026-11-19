import { AbsoluteFill } from 'remotion';
import matches from '../../../productions/cinq-scores-v4/matches.json';
import times from '../../../productions/cinq-scores-v4/timings.json';
import { C, Txt, Photo, Enter, Grade, BODY, BRAND, phase, useTime } from './Design';
import { Score } from './Score';
const photos = ['psg-player.png', 'lille-player.jpg', 'lens-player.jpg', 'monaco-player.png', 'marseille-player.png'];
const backdrops = ['psg-player.png', 'lille-stadium.jpg', 'lens-stadium.jpg', 'monaco-stadium.jpg', 'marseille-stadium.jpg'];
export const Hook = ({clean=false}:{clean?:boolean}) => {
    const t = useTime(), stage = t < .72 ? 2 : t < 1.4 ? 1 : 4;
    return <AbsoluteFill>
 <Photo src={photos[stage]} x={-20} y={-90} w={1140} h={1650} position="center 15%" scale={1.02 + phase(t, 0, 2.7) * .035}/>
 <Grade />
 <Txt y={160} size={40} font={BODY}>PRONOSTICS · LIGUE 1</Txt>
 <Enter><Txt y={340} size={156}>5 SCORES</Txt><Txt y={505} size={156} color={C.lime}>EXACTS.</Txt></Enter>
 <Enter at={1.05}><Txt y={920} size={105}>JE LES ASSUME.</Txt></Enter>
 <div style={{ position: 'absolute', left: 120, top: 1090, width: 800 * phase(t, .9, 1.55), height: 5, background: C.lime }}/>
 </AbsoluteFill>;
};
export const MatchScene = ({ index, clean=false }: {
    index: number; clean?:boolean;
}) => {
    const t = useTime(), m = matches.matches[index], scene = times.scenes[index + 1], intro = times.segments.find(s => s.sceneId === scene.id)!, scoreAt = Math.max(.55, intro.endSeconds - scene.startSeconds - .65), p = phase(t, 0, .55), detail = phase(t, 3.1, 4.1);
    const bgPan = (index % 2 ? 1 : -1) * phase(t, 0, scene.endSeconds - scene.startSeconds) * 28;
    return <AbsoluteFill>
 <Photo src={backdrops[index]} x={-45 + bgPan} y={0} w={1170} h={1750} scale={1.02 + phase(t, 0, 8) * .045} style={{ filter: index === 0 ? 'blur(18px) brightness(.38)' : 'brightness(.6) saturate(.85)' }}/>
 {index === 0 ? <><Photo src="nice-player.png" x={-55 + 20 * p - 110 * detail} y={420} w={650} h={880} position="center top" style={{ maskImage: 'linear-gradient(black 60%,transparent 100%)' }}/><Photo src="psg-player.png" x={510 - 25 * p - 100 * detail} y={400 - 30 * detail} w={610 + 100 * detail} h={910 + 100 * detail} position="center top" style={{ maskImage: 'linear-gradient(black 60%,transparent 100%)' }}/></> : index === 1 ? <Photo src={photos[index]} x={320 - 160 * detail} y={410 - 20 * detail} w={730 + 45 * detail} h={1140} position="center top" style={{ maskImage: 'linear-gradient(black 55%,transparent 95%)' }}/> : index === 2 ? <><div style={{ position: 'absolute', left: 0, top: 440, width: 1080, height: 600, background: '#650B0B', mixBlendMode: 'soft-light' }}/><Photo src={photos[index]} x={-65 + 30 * p - 65 * detail} y={415 - 35 * detail} w={760} h={1150} position="center top" style={{ maskImage: 'linear-gradient(black 60%,transparent 98%)' }}/></> : index === 3 ? <><Photo src={photos[index]} x={135 - 45 * detail} y={435 - 25 * detail} w={500} h={890} position="center top" style={{ maskImage: 'linear-gradient(black 63%,transparent 100%)' }}/><div style={{ position: 'absolute', left: 580, top: 460, width: 4, height: 470 * phase(t, .3, .8), background: C.lime, opacity: .65 }}/></> : <Photo src={photos[index]} x={415 - 30 * p - 60 * detail} y={450 - 25 * detail} w={700} h={810} position="center top" style={{ maskImage: 'linear-gradient(black 60%,transparent 100%)' }}/>}
 <Grade />
 {!clean && <Txt y={165} size={40} font={BODY}>ARCHIVES · PRONOSTICS</Txt>}
 <Txt y={237} size={40} font={BODY} color={C.muted}>{index === 4 ? 'DIM. 22 NOV. · 20H45' : 'SAM. 21 NOV. · ' + (index === 0 ? '17H15' : '20H45')}</Txt>
 <Enter at={.06}><Txt y={302} size={index === 4 ? 91 : 106}>{m.home.toUpperCase()} <span style={{ color: C.lime }}>–</span> {m.away.toUpperCase()}</Txt></Enter>
 <Txt x={850} y={160} size={68} color={C.lime}>{`0${index + 1}`}</Txt>
 <Score values={m.prediction} at={scoreAt} x={index === 2 ? 480 : index === 3 ? 495 : 120} y={index === 1 ? 815 : 850} size={index === 2 ? 260 : index === 3 ? 240 : 330}/>
 <Enter at={3.5}>
 {index === 0 ? <><Txt y={1210} size={52} color={C.lime}>PARIS : 5 VICTOIRES DE SUITE</Txt><div style={{ position: 'absolute', left: 120, top: 1310, display: 'flex', gap: 12 }}>{[0, 1, 2, 3, 4].map(i => <div key={i} style={{ height: 7, width: 105 * phase(t, 3.5 + i * .1, 3.8 + i * .1), background: C.lime }}/>)}</div></> : index === 1 ? <><Txt y={1190} size={54} color={C.lime}>LYON À L’EXTÉRIEUR</Txt><Txt y={1260} size={44} font={BODY}>3 DÉFAITES CONSÉCUTIVES</Txt></> : index === 2 ? <><Txt y={1190} size={58} color={C.lime}>{t < 5.8 ? "LENS : 3 VICTOIRES SUR 5" : "LE PARI : ZÉRO ENCAISSÉ"}</Txt><Txt y={1265} size={40} font={BODY}>{t < 5.8 ? "CINQ DERNIÈRES JOURNÉES" : "UN ZÉRO ENCORE INÉDIT CETTE SAISON"}</Txt></> : index === 3 ? <><Txt y={1180} size={54} color={C.lime}>18 BUTS ENCAISSÉS</Txt><Txt y={1250} size={40} font={BODY}>AUXERRE · 5 DÉPLACEMENTS</Txt></> : <><Txt y={1200} size={65} color={C.lime}>L’OM ENCHAÎNE.</Txt><Txt y={1280} size={40} font={BODY}>5 JOURNÉES · 5 VICTOIRES</Txt></>}
 </Enter>
 </AbsoluteFill>;
};
export const Outro = ({clean=false}:{clean?:boolean}) => {
    const t = useTime();
    return <AbsoluteFill>
 <Photo src="marseille-stadium.jpg" x={-80} w={1240} h={1920} style={{ filter: 'brightness(.18) blur(3px)' }}/>
 <Txt y={160} size={40} font={BODY}>MES 5 PRONOS · À TOI DE JOUER</Txt>
 <Enter><Txt y={260} size={105}>LEQUEL EST</Txt><Txt y={375} size={110} color={C.lime}>À CÔTÉ ?</Txt></Enter>
 {matches.matches.map((m, i) => {
            const p = phase(t, .15 + i * .1, .5 + i * .1);
            return <div key={m.id} style={{ position: 'absolute', left: 120, top: 550 + i * 140, width: 800, height: 120, opacity: p, transform: `translateY(${12 * (1 - p)}px)`, borderBottom: '1px solid #424A4D' }}>
 <div style={{ position: 'absolute', left: 0, top: 0, width: 800, height: 112, overflow: 'hidden', opacity: .15 }}><Photo src={photos[i]} y={-160} w={800} h={1100}/></div>
 <Txt x={0} y={25} size={48} color={C.lime}>{`0${i + 1}`}</Txt>
 <Txt x={90} y={25} size={m.home === 'Marseille' ? 52 : 60}>{m.home.toUpperCase()}</Txt>
 <Txt x={405} y={12} size={82} color={C.lime}>{m.prediction.join('–')}</Txt>
 <Txt x={600} y={25} size={56}>{m.away.toUpperCase()}</Txt>
 </div>;
        })}
 <Photo src="logo-officiel.png" x={120} y={1280} w={75} h={75}/>
 <Txt x={220} y={1282} size={40} font={BRAND}>LIGUE ONZE</Txt>
 <Txt x={220} y={1334} size={40} font={BODY} color={C.muted}>Les pronos entre potes.</Txt>
 <Txt x={655} y={1287} size={40} font={BODY}>ligueonze.fr</Txt>
 </AbsoluteFill>;
};
