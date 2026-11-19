import type { CSSProperties, ReactNode } from 'react';
import { Easing, interpolate, Interactive, useCurrentFrame, useVideoConfig } from 'remotion';
export const C = { bg: '#080B0E', white: '#F6F7F8', lime: '#C8FF00', grey: '#9AA5AB', line: '#273239' };
export const T = 'ThreeTitle';
export const B = 'ThreeBody';
export const ease = Easing.bezier(.18, .8, .22, 1);
export const phase = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
export const useSceneTime = () => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); return f / fps; };
export const Text = ({ children, x = 120, y, size = 64, color = C.white, body = false, style = {} }: {
    children: ReactNode;
    x?: number;
    y: number;
    size?: number;
    color?: string;
    body?: boolean;
    style?: CSSProperties;
}) => <Interactive.Div name={typeof children === 'string' ? children : 'Texte'} data-qa-text style={{ position: 'absolute', left: x, top: y, fontFamily: body ? B : T, fontWeight: body ? 500 : 800, fontSize: size, lineHeight: 1.04, paddingBottom: '.3em', color, whiteSpace: 'nowrap', ...style }}>{children}</Interactive.Div>;
export const Reveal = ({ at, children, travel = 28 }: {
    at: number;
    children: ReactNode;
    travel?: number;
}) => { const t = useSceneTime(), p = phase(t, at, at + .38); return <div style={{ position: 'absolute', inset: 0, opacity: p, transform: `translateY(${travel * (1 - p)}px)` }}>{children}</div>; };
export const NumberTrack = ({ active = -1, at = 0 }: {
    active?: number;
    at?: number;
}) => { const t = useSceneTime(); return <div style={{ position: 'absolute', left: 120, top: 264, display: 'flex', gap: 20 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 250, position: 'relative', paddingTop: 20, opacity: .35 + .65 * phase(t, at + i * .07, at + .3 + i * .07) }}><div style={{ position: 'absolute', inset: '0 0 auto', height: 4, background: i <= active ? C.lime : C.line }}/><span data-qa-text style={{ fontFamily: B, fontSize: 42, fontWeight: 600, color: i === active ? C.lime : C.grey }}>{`0${i + 1}`}</span></div>)}</div>; };
export const SceneMask = ({ kind, children }: {
    kind: number;
    children: ReactNode;
}) => { const t = useSceneTime(), p = phase(t, 0, .3); const clip = kind === 1 ? `inset(0 ${(1 - p) * 50}% 0 ${(1 - p) * 50}%)` : `inset(${(1 - p) * 100}% 0 0 0)`; return <div style={{ position: 'absolute', inset: 0, clipPath: t < .3 ? clip : 'none', background: C.bg }}>{children}</div>; };
export const Pitch = ({ variant = 0 }: {
    variant?: number;
}) => {
    const t = useSceneTime(), p = phase(t, .1, .9), shot = phase(t, .35, .95);
    return <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: 1080, height: 1920 }} aria-label="Graphisme de terrain original">
 <defs><linearGradient id={`pitch-${variant}`} x2="0" y2="1"><stop stopColor={C.lime} stopOpacity=".06"/><stop offset="1" stopColor={C.lime} stopOpacity="0"/></linearGradient></defs>
 <g transform={variant === 2 ? 'translate(0 615) scale(1 .5)' : undefined}>
 {variant === 0 ? <g fill="none" stroke={C.line} strokeWidth="3" opacity={p}><path d="M-50 1100H1130M-50 1300H1130M540 1040V1330"/><ellipse cx="540" cy="1200" rx="190" ry="70"/><path d="M120 1125H275V1275H120M935 1125H780V1275H935"/></g> : variant === 1 ? <g fill="none" stroke={C.line} strokeWidth="3" opacity={p}><path d="M105 1080V1250H930V1080M105 1120H930"/><path d="M330 1250V1150H710V1250"/><path d="M420 1150Q520 1070 620 1150"/><circle cx="520" cy="1190" r="7" fill={C.line}/></g> : <g fill="none" stroke={C.line} strokeWidth="3" opacity={p}><path d="M170 1260V1060H860V1260M170 1060L250 1010H780L860 1060M250 1010V1210H780V1010"/>{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${190 + i * 58} 1060V1260`}/>)}{[1100, 1140, 1180, 1220].map(y => <path key={y} d={`M170 ${y}H860`}/>)}<path d="M170 1260H860"/></g>}
 <path d={variant === 0 ? 'M150 1220C290 1220 310 1090 490 1120S720 1240 900 1140' : variant === 1 ? 'M160 1225C310 1200 350 1080 510 1090S730 1220 900 1130' : 'M180 1240Q600 1210 720 1090'} pathLength="1" stroke={C.lime} strokeWidth="5" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - shot} fill="none" opacity=".75"/>
 </g></svg>;
};
