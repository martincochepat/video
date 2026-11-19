import { C, T, phase, useSceneTime } from './design';
export const Score = ({ value, at = .75, x = 120, y = 670, size = 330 }: {
    value: number[];
    at?: number;
    x?: number;
    y?: number;
    size?: number;
}) => { const t = useSceneTime(); return <div style={{ position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'center', gap: size * .07, fontFamily: T, fontWeight: 800, fontSize: size, lineHeight: 1, color: C.white, fontVariantNumeric: 'tabular-nums' }}>{[value[0], '–', value[1]].map((digit, i) => { const p = phase(t, at + i * .1, at + .4 + i * .1); return <div key={i} style={{ overflow: 'hidden', height: size * 1.05 }}><div data-qa-text style={{ paddingBottom: '.3em', opacity: p, transform: `translateY(${size * .65 * (1 - p)}px)`, color: i === 1 ? C.lime : C.white }}>{digit}</div></div>; })}</div>; };
