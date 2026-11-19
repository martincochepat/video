import { C, Txt, phase, useTime } from './Design';
export const Score = ({ values, at, x, y, size }: {
    values: number[];
    at: number;
    x: number;
    y: number;
    size: number;
}) => { const t = useTime(); return <>{[values[0], '–', values[1]].map((v, i) => { const p = phase(t, at + i * .07, at + .3 + i * .07); return <div key={i} style={{ position: 'absolute', left: x + i * size * .48, top: y, width: size * .48, height: size * 1.3, overflow: 'hidden' }}><Txt x={0} y={0} size={size} color={i === 1 ? C.lime : C.white} style={{ opacity: p, transform: `translateY(${70 * (1 - p)}px)`, textShadow: '0 5px 25px #000' }}>{v}</Txt></div>; })}</>; };
