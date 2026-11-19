import { C, Text, Reveal, phase, useSceneTime } from './design';
export const PreviewNotice = () => <><div style={{ position: 'absolute', left: 120, top: 160, width: 815, height: 63, border: '1px solid #536116', background: '#151B0C', borderRadius: 6 }}/><Text x={140} y={171} size={40} color={C.lime} body>MAQUETTE · DONNÉES PROVISOIRES</Text></>;
export const Signature = () => {
    const t = useSceneTime(), p = phase(t, 0, .55);
    return <>
 <Text y={360} size={48} color={C.grey} body>LE FOOT. LES POTES. LES PRONOS.</Text>
 <Reveal at={.12}><Text y={505} size={190}>LIGUE</Text><Text y={680} size={190} color={C.lime}>ONZE</Text></Reveal>
 <div style={{ position: 'absolute', left: 120, top: 923, height: 4, width: 800 * p, background: C.lime }}/>
 <Reveal at={.4}><Text y={990} size={58}>Les pronos se jouent</Text><Text y={1053} size={58}>entre potes.</Text></Reveal>
 <Reveal at={.65}><Text y={1210} size={44} color={C.grey} body>ligueonze.fr</Text></Reveal>
 </>;
};
