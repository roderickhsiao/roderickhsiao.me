import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';

interface CityStampProps {
  city: string;
  countryCode: string;
  stampColor: string;
  index: number;
}

/** Strip leading emoji and parenthetical suffix: '🏡 Taipei (台北)' → 'Taipei' */
function cleanCityKey(raw: string): string {
  return raw.replace(/^[^\w(]+/, '').replace(/\s*\([^)]*\)/, '').trim();
}

/** Strip leading emoji only: '🏡 Taipei (台北)' → 'Taipei (台北)' */
function cleanCityName(raw: string): string {
  return raw.replace(/^[^\w(]+/, '').trim();
}

/**
 * Passport-stamp style city card. Faithful to the original boarding-pass
 * design: thick border, clock-dot country badge, dashed divider, arrow icon.
 */
export default function CityStamp({ city, countryCode, stampColor, index }: CityStampProps) {
  const t = useTranslations('travel');
  const cityNames = t.raw('cityNames') as Record<string, string>;
  const isHome = countryCode === 'US' || countryCode === 'TW';
  const cityKey = cleanCityKey(city);
  const displayCity = cityNames[cityKey] ?? cleanCityName(city);
  const rotation = (index % 3 - 1) * 2.5;

  return (
    <div
      className="relative w-full p-2 sm:p-3 rounded-2xl flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.05] hover:z-50 opacity-90 hover:opacity-100 bg-[#FAF8F2] shadow-sm"
      style={{
        color: stampColor,
        aspectRatio: '72/44',
        transform: `rotate(${rotation}deg)`,
        border: '2.5px solid currentColor',
      } as CSSProperties}
    >
      {/* ── Header: code circle + DEPARTURE + plane ── */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
        {/* Clock-dot country badge */}
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full stroke-current fill-none"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          >
            <circle cx="50" cy="50" r="40" />
            <g className="fill-current stroke-none">
              {Array.from({ length: 12 }, (_, i) => (
                <circle
                  key={i}
                  cx={50 + 38 * Math.cos((i * 30 * Math.PI) / 180)}
                  cy={50 + 38 * Math.sin((i * 30 * Math.PI) / 180)}
                  r="2"
                />
              ))}
            </g>
          </svg>
          <span className="font-sans font-black text-[10px] sm:text-xs uppercase leading-none">{countryCode}</span>
        </div>

        <span className="flex-1 font-sans font-extrabold text-[9px] sm:text-[11px] uppercase tracking-wider truncate">
          {isHome ? t('arrival') : t('departure')}
        </span>

        {/* Plane icon — up (departing) or down (arriving) */}
        <div className="border-[1.5px] border-current rounded-sm px-1 py-0.5 flex items-center justify-center shrink-0">
          <svg
            width="18"
            height="10"
            viewBox="0 0 24 24"
            className="fill-current"
            style={{ transform: isHome ? 'rotate(270deg)' : 'rotate(90deg)' }}
          >
            <path d="M21,16L21,14L13,9L13,3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5L10,9L2,14L2,16L10,13.5L10,19L8,20.5L8,22L11.5,21L15,22L15,20.5L13,19L13,13.5Z" />
          </svg>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-y border-dashed border-current my-1 py-1 flex items-center justify-center">
        <span className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase opacity-80">
          {isHome ? t('exploring') : t('explored')}
        </span>
      </div>

      {/* ── Footer: arrow + city name ── */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="border-[1.5px] border-current rounded-sm w-6 h-6 sm:w-8 sm:h-7 flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="fill-current"
            style={isHome ? { transform: 'scaleX(-1)' } : undefined}
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </div>
        <span className="flex-1 text-right font-mono font-black text-base sm:text-xl uppercase tracking-tighter leading-none truncate">
          {displayCity}
        </span>
      </div>
    </div>
  );
}

