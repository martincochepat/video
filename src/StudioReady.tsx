import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const StudioReady = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#10131b', justifyContent: 'center', alignItems: 'center'}}>
      <Interactive.Div name="Titre du studio" style={{
        color: '#f5f4ef', fontFamily: 'Arial, sans-serif', fontSize: 84,
        fontWeight: 600, fontStyle: 'normal', textAlign: 'center', whiteSpace: 'nowrap',
        opacity: interpolate(frame, [0, fps], [0, 1], {
          easing: Easing.bezier(0.22, 1, 0.36, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        }),
      }}>Le studio est prêt</Interactive.Div>
    </AbsoluteFill>
  );
};
