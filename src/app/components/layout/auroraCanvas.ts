// Aurora Canvas Animation for Header
// Usage: import and call auroraCanvas() in a Client Component (e.g., useEffect)

export function auroraCanvas(canvasId: string = 'wave-canvas') {
  if (typeof window === 'undefined') return;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  // Aurora color stops
  const colors = [
    'rgba(255,255,255,0.32)', // white smoke
    'rgba(255,255,255,0.22)', // lighter smoke
    'rgba(255,255,255,0.18)', // softest smoke
    'rgba(220,220,220,0.14)', // hint of mist
    'rgba(200,210,200,0.10)', // pale mist
  ];

  // Wave parameters
  const waves = [
    { amp: 60, freq: 0.0007, speed: 0.8, color: colors[0], blur: 32 },
    { amp: 44, freq: 0.001, speed: 0.6, color: colors[1], blur: 40 },
    { amp: 32, freq: 0.0013, speed: 0.7, color: colors[2], blur: 48 },
    { amp: 24, freq: 0.0017, speed: 0.9, color: colors[3], blur: 56 },
    { amp: 20, freq: 0.002, speed: 1.1, color: colors[4], blur: 64 },
  ];

  function drawAurora(t: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    waves.forEach((wave, i) => {
      if (!ctx) return;
      ctx.save();
      ctx.filter = `blur(${wave.blur}px)`;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        // Add randomness for wispy smoke/fog
        const jitter = (Math.random() - 0.5) * 8;
        const y = height/2 + Math.sin(x * wave.freq + t * wave.speed + i * 2.2) * wave.amp + Math.cos(t * 0.7 + i) * 24 + i * 28 + jitter;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
      ctx.restore();
    });
  }

  let running = true;
  function animate() {
    if (!running) return;
    drawAurora(performance.now() / 1000);
    requestAnimationFrame(animate);
  }
  animate();

  // Responsive resize
  function handleResize() {
    if (!canvas) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => {
    running = false;
    window.removeEventListener('resize', handleResize);
  };
}
