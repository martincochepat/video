import type { ReactNode, CSSProperties } from 'react';
import { Img, Interactive, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
export const C = { bg: '#080B0E', white: '#F6F7F8', lime: '#C8FF00', muted: '#C1C7CB' };
export const TITLE = 'V4Condensed', BODY = 'V4Body', BRAND = 'V4Brand';
export const media = 'productions/cinq-scores-v4/';
export const useTime = () => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); return f / fps; };
export const phase = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { easing: Easing.bezier(.19, .85, .23, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
export const Txt = ({ children, x = 120, y, size = 72, color = C.white, font = TITLE, style = {} }: {
    children: ReactNode;
    x?: number;
    y: number;
    size?: number;
    color?: string;
    font?: string;
    style?: CSSProperties;
}) => <Interactive.Div name={typeof children === 'string' ? children : 'Texte'} data-qa-text style={{ position: 'absolute', left: x, top: y, color, fontSize: size, fontFamily: font, fontWeight: font === TITLE ? 800 : 600, lineHeight: 1.08, paddingBottom: '.3em', whiteSpace: 'nowrap', ...style }}>{children}</Interactive.Div>;
export const Photo = ({ src, x = 0, y = 0, w = 1080, h = 1920, scale = 1, position = 'center', style = {} }: {
    src: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    scale?: number;
    position?: string;
    style?: CSSProperties;
}) => <Img data-qa-media src={staticFile(media + src)} style={{ position: 'absolute', left: x, top: y, width: w, height: h, objectFit: 'cover', objectPosition: position, transform: `scale(${scale})`, ...style, ...(style.maskImage ? { maskImage: style.maskImage + ', linear-gradient(90deg, transparent 0%, black 10%, black 88%, transparent 100%), linear-gradient(180deg, transparent 0%, black 3%, black 100%)', maskComposite: 'intersect' } : {}) }}/>;
export const Enter = ({ at = 0, children }: {
    at?: number;
    children: ReactNode;
}) => { const t = useTime(), p = phase(t, at, at + .32); return <div style={{ position: 'absolute', inset: 0, opacity: p, transform: `translateY(${18 * (1 - p)}px)` }}>{children}</div>; };
export const Wipe = ({ variant, children }: {
    variant: number;
    children: ReactNode;
}) => { const t = useTime(), p = phase(t, 0, .28), clip = variant % 3 === 0 ? `inset(0 ${100 * (1 - p)}% 0 0)` : variant % 3 === 1 ? `inset(${100 * (1 - p)}% 0 0 0)` : `inset(0 ${50 * (1 - p)}% 0 ${50 * (1 - p)}%)`; return <div style={{ position: 'absolute', inset: 0, background: C.bg, clipPath: t < .28 ? clip : 'none', overflow: 'hidden' }}>{children}</div>; };
export const Grade = () => <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,11,14,.65) 0%,rgba(8,11,14,.10) 35%,rgba(8,11,14,.25) 55%,rgba(8,11,14,.86) 69%,#080B0E 88%)' }}/>;
