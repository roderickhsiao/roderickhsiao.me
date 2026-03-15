import type { CSSProperties } from 'react';

interface CityStampProps {
  city: string;
  countryCode: string;
  stampColor: string;
  index: number;
}

/** Strip leading emoji / symbol prefixes from raw city strings.
 *  e.g. "🏡 Taipei (台北)" → "Taipei (台北)", "🍼 Jeddah (جدة)" → "Jeddah (جدة)"
 */
function cleanCityName(raw: string): string {
  return raw.replace(/^[^\w(]+/, '').trim();
}

/**
 * Passport-stamp style city card. Faithful to the original boarding-pass
 * design: thick border, clock-dot country badge, dashed divider, arrow icon.
 */
export default function CityStamp({ city, countryCode, stampColor, index }: CityStampProps) {
  const rotation = (index % 3 - 1) * 2.5;

  return (
    <div
      className="relative w-full aspect-72/44 p-3 rounded-2xl flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.08] hover:z-50 opacity-90 hover:opacity-100 bg-[#FAF8F2] shadow-sm"
      style={{
        color: stampColor,
        transform: `rotate(${rotation}deg)`,
        border: '3px solid currentColor',
      } as CSSProperties}
    >
      {/* ── Header: code circle + DEPARTURE + plane ── */}
      <div className="flex items-center h-10 gap-2">
        {/* Clock-dot country badge */}
        <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
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
          <span className="font-sans font-black text-sm uppercase leading-none">{countryCode}</span>
        </div>

        <span className="flex-1 font-sans font-extrabold text-[13px] uppercase tracking-wider">
          DEPARTURE
        </span>

        {/* Plane icon — pointing upward (departing) */}
        <div className="border-[1.5px] border-current rounded-sm px-1.5 py-0.5 flex items-center justify-center shrink-0">
          <svg
            width="28"
            height="12"
            viewBox="0 0 24 24"
            className="fill-current"
            style={{ transform: 'rotate(90deg)' }}
          >
            <path d="M21,16L21,14L13,9L13,3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5L10,9L2,14L2,16L10,13.5L10,19L8,20.5L8,22L11.5,21L15,22L15,20.5L13,19L13,13.5Z" />
          </svg>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-y border-dashed border-current my-1 py-1 flex items-center justify-center">
        <span className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase opacity-80">
          EXPLORED
        </span>
      </div>

      {/* ── Footer: arrow + city name ── */}
      <div className="flex items-center gap-2">
        <div className="border-[1.5px] border-current rounded-sm w-8 h-7 flex items-center justify-center shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </div>
        <span className="flex-1 text-right font-mono font-black text-2xl uppercase tracking-tighter leading-none truncate">
          {cleanCityName(city)}
        </span>
      </div>
    </div>
  );
}

