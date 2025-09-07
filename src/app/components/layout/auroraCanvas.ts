// Aurora Canvas Animation for Header
// Usage: import and call auroraCanvas() in a Client Component (e.g., useEffect)

export function auroraCanvas(canvasId: string = 'wave-canvas') {
  if (typeof window === 'undefined') return;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Get device pixel ratio for high DPI displays
  const dpr = window.devicePixelRatio || 1;
  
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  
  // Set actual canvas size with device pixel ratio
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  
  // Scale the canvas back down using CSS
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  
  // Scale the drawing context to match device pixel ratio
  ctx.scale(dpr, dpr);

  // Aurora color stops
  const colors = [
    'rgba(255,255,255,0.32)', // white smoke
    'rgba(255,255,255,0.22)', // lighter smoke
    'rgba(255,255,255,0.18)', // softest smoke
    'rgba(220,220,220,0.14)', // hint of mist
    'rgba(200,210,200,0.10)', // pale mist
  ];

  // Adjust wave parameters for mobile performance
  const isMobile = window.innerWidth < 768;
  const waves = [
    { amp: 60, freq: 0.0007, speed: 0.8, color: colors[0], blur: isMobile ? 16 : 32 },
    { amp: 44, freq: 0.001, speed: 0.6, color: colors[1], blur: isMobile ? 20 : 40 },
    { amp: 32, freq: 0.0013, speed: 0.7, color: colors[2], blur: isMobile ? 24 : 48 },
    { amp: 24, freq: 0.0017, speed: 0.9, color: colors[3], blur: isMobile ? 28 : 56 },
    { amp: 20, freq: 0.002, speed: 1.1, color: colors[4], blur: isMobile ? 32 : 64 },
  ];

  function drawAurora(t: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    waves.forEach((wave, i) => {
      if (!ctx) return;
      ctx.save();
      ctx.filter = `blur(${wave.blur}px)`;
      ctx.beginPath();
      
      // Adjust step size for mobile performance
      const step = isMobile ? 5 : 3;
      for (let x = 0; x <= width; x += step) {
        // Add randomness for wispy smoke/fog (reduce on mobile)
        const jitterAmount = isMobile ? 4 : 8;
        const jitter = (Math.random() - 0.5) * jitterAmount;
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

  // If user prefers reduced motion, just draw a static version
  if (prefersReducedMotion) {
    drawAurora(0);
    return () => {}; // Return empty cleanup function
  }

  let running = true;
  let lastTime = 0;
  const targetFPS = isMobile ? 30 : 60; // Reduce FPS on mobile for better performance
  const frameInterval = 1000 / targetFPS;
  
  function animate(currentTime: number = performance.now()) {
    if (!running) return;
    
    if (currentTime - lastTime >= frameInterval) {
      drawAurora(currentTime / 1000);
      lastTime = currentTime;
    }
    
    requestAnimationFrame(animate);
  }
  animate();

  // Responsive resize
  function handleResize() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    
    // Set actual canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Scale the canvas back down using CSS
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => {
    running = false;
    window.removeEventListener('resize', handleResize);
  };
}
