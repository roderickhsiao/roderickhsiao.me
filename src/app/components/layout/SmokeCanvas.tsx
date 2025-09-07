export default function SmokeCanvas() {
  return (
    <canvas
      id="wave-canvas"
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        maskImage:
          'linear-gradient(to bottom, white 70%, rgba(255,255,255,0.3) 90%, transparent 100%)',
        maskSize: '100% 100%',
      }}
    />
  );
}
