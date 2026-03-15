'use client';

import { useEffect, useState } from 'react';

/** Time-of-day period inspired by Sagrada Família stained-glass light */
type Period = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk' | 'night';

/**
 * Colour palettes [orb-A, orb-B, orb-C] — each loosely picking the dominant
 * light character of the Sagrada Família nave at that hour:
 *
 *  dawn      05–07  East rose windows: pink / gold / lavender
 *  morning   07–11  Nave floods with amber-gold stained glass
 *  midday    11–14  Apse blues and cool daylight, with pale-gold accents
 *  afternoon 14–17  Ochre warmth + terracotta as western windows warm up
 *  dusk      17–20  Dramatic violet-orange transition through rose windows
 *  night     20–05  Cool indigo / midnight violet
 */
const PALETTES: Record<Period, [string, string, string]> = {
  dawn:      ['#c4a0b0', '#d8c090', '#aca8c8'],
  morning:   ['#c0a038', '#d8c888', '#b07828'],
  midday:    ['#60a0b8', '#c8b870', '#4888a0'],
  afternoon: ['#b07028', '#984038', '#b8a050'],
  dusk:      ['#a85838', '#6c4090', '#9c3c60'],
  night:     ['#303e78', '#202860', '#484080'],
};

function getPeriod(hour: number): Period {
  if (hour >= 5  && hour < 7)  return 'dawn';
  if (hour >= 7  && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'midday';
  if (hour >= 14 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'night';
}

export default function AuraBackground() {
  const [colors, setColors] = useState<[string, string, string]>(PALETTES.morning);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setColors(PALETTES[getPeriod(new Date().getHours())]);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const [colorA, colorB, colorC] = colors;

  return (
    <div
      className={`fixed inset-0 z-1 pointer-events-none overflow-hidden transition-opacity duration-2500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden
    >
      <div className="aura-orb aura-orb-a" style={{ background: colorA, opacity: 0.09 }} />
      <div className="aura-orb aura-orb-b" style={{ background: colorB, opacity: 0.07 }} />
      <div className="aura-orb aura-orb-c" style={{ background: colorC, opacity: 0.08 }} />
    </div>
  );
}
