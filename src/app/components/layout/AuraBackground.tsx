'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

/** Time-of-day period inspired by Sagrada Família stained-glass light */
type Period = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk' | 'night';

/**
 * Colour palettes [orb-A sky, orb-B air, orb-C earth] — clear semantic distinction.
 * A = bright sky, B = warm transitional air, C = dark earthy ground
 *
 *  dawn      05–07  pink sky / amber air / deep purple earth
 *  morning   07–11  bright blue sky / golden air / warm brown earth
 *  midday    11–14  bright cyan sky / gold air / tan earth
 *  afternoon 14–17  warm orange sky / deep copper air / rust earth
 *  dusk      17–20  magenta sky / deep orange air / dark brown earth
 *  night     20–05  dark blue sky / dark purple air / black earth
 */
const PALETTES: Record<Period, [string, string, string]> = {
  dawn:      ['#d6b3c6', '#d78f70', '#3d3348'],
  morning:   ['#4db8ff', '#ffd700', '#8b5a2b'],
  midday:    ['#5ad9ff', '#ffc93c', '#c9a35f'],
  afternoon: ['#ff8844', '#cc6633', '#663300'],
  dusk:      ['#9f6c9f', '#d36f43', '#2c1f16'],
  night:     ['#1a3a5c', '#2f3444', '#0f0a14'],
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

  const [skyColor, midAirColor, groundColor] = colors;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-1 pointer-events-none overflow-hidden transition-opacity duration-2500 aura-scroll-responsive',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 aura-pulse"
        style={{
          background: `radial-gradient(ellipse var(--sky-ellipse, 120%) var(--sky-ellipse-y, 80%) at var(--sky-pos-x, 30%) var(--sky-pos-y, 20%), ${skyColor}2a, transparent 58%),
                       radial-gradient(ellipse var(--air-ellipse, 140%) var(--air-ellipse-y, 100%) at var(--air-pos-x, 50%) var(--air-pos-y, 50%), ${midAirColor}1a, transparent 66%),
                       radial-gradient(ellipse var(--ground-ellipse, 130%) var(--ground-ellipse-y, 90%) at var(--ground-pos-x, 70%) var(--ground-pos-y, 80%), ${groundColor}22, transparent 62%)`
        }}
      />
    </div>
  );
}
