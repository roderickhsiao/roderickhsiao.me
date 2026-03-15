import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';

export type TravelStatus = 'BORN' | 'HOME' | 'STUDY' | 'TRAVEL';

export interface TravelStampProps {
  /** Display name in UPPERCASE e.g. "JAPAN" */
  name: string;
  /** 2-letter ISO 3166-1 alpha-2 country code */
  code: string;
  /** Flag emoji — resolved in parent (SSR-safe) */
  flagEmoji: string;
  /** Relationship status shown in the stamp header */
  status: TravelStatus;
  /** Hex color for the top band and accent elements */
  stampColor: string;
  /** Total number of cities/places visited */
  citiesCount: number;
  /** Grid index used to derive a subtle rotation */
  index: number;
  /** Whether this stamp is the currently expanded/selected card */
  isActive?: boolean;
  /** Toggle the city detail panel */
  onClick?: () => void;
  /** City name shown on the stamp for HOME countries (no expand panel) */
  cityLabel?: string;
}

/**
 * Philatelic stamp card — the perforated edge is achieved via CSS
 * `mask-image` combining a solid inner rect with repeating circular
 * cutouts along the perimeter.
 */
export default function TravelStamp({
  name,
  code,
  flagEmoji,
  status,
  stampColor,
  citiesCount,
  index,
  isActive = false,
  onClick,
  cityLabel,
}: TravelStampProps) {
  const t = useTranslations('travel');
  const rotation = isActive ? 0 : ((index % 3) - 1) * 1.5;

  const stampStyle: CSSProperties = {
    transform: `rotate(${rotation}deg)`,
    filter:
      'drop-shadow(0 4px 12px rgba(0,0,0,0.08)) drop-shadow(0 20px 40px rgba(0,0,0,0.12))',
    /* Gradient split: top band = stampColor, body = paper white */
    background: `linear-gradient(to bottom, ${stampColor} 0%, ${stampColor} 24%, #FAF8F2 24.1%, #FAF8F2 100%) no-repeat`,
    backgroundSize: '100% 100%',
    /* Perforated edge mask */
    WebkitMaskImage:
      'linear-gradient(black, black), radial-gradient(circle at 8px 8px, transparent 5.5px, black 6px)',
    WebkitMaskSize:
      'calc(100% - 16px) calc(100% - 16px), var(--stamp-dot, 16px) var(--stamp-dot, 16px)',
    WebkitMaskPosition: 'center, -8px -8px',
    WebkitMaskRepeat: 'no-repeat, repeat',
    maskImage:
      'linear-gradient(black, black), radial-gradient(circle at 8px 8px, transparent 5.5px, black 6px)',
    maskSize:
      'calc(100% - 16px) calc(100% - 16px), var(--stamp-dot, 16px) var(--stamp-dot, 16px)',
    maskPosition: 'center, -8px -8px',
    maskRepeat: 'no-repeat, repeat',
    contentVisibility: 'auto',
  };

  return (
    <div
      className={`relative group flex flex-col w-full max-w-[200px] aspect-[200/240] transition-all duration-700 ease-out [--stamp-dot:15px] sm:[--stamp-dot:20px] ${onClick ? 'cursor-pointer' : 'cursor-default'} ${isActive ? 'scale-[1.04] z-40' : 'hover:z-30 hover:-translate-y-2'}`}
      onClick={onClick}
      style={stampStyle}
      aria-label={t('stampAriaLabel', { name, count: citiesCount })}
    >
      {/* Hover: flag emoji glow bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="opacity-0 blur-2xl scale-125 transition-all duration-1000 group-hover:opacity-25 group-hover:scale-[2.2] group-hover:blur-2xl">
          <span className="text-[14rem] select-none leading-none">
            {flagEmoji}
          </span>
        </div>
      </div>

      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply z-45 pointer-events-none will-change-auto"
        style={{ filter: 'url(#stamp-ink-noise)', background: 'white' }}
        aria-hidden
      />

      {/* ── Top band ───────────────────────────────────── */}
      <div className="relative h-1/4 shrink-0 z-10 flex items-center justify-between px-4 pt-1">
        <span className="type-label text-white leading-none">{code}</span>
        <span className="type-label italic text-white/60">
          {t(`status${status}`)}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative bg-transparent pb-6 z-20">
        {/* Postmark watermark */}
        <div
          className="absolute -bottom-8 -inset-s-10 w-52 h-52 pointer-events-none opacity-20 mix-blend-multiply z-40 group-hover:rotate-6 transition-transform duration-1000"
          aria-hidden
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ color: stampColor }}
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M -10,35 Q 25,28 50,35 T 110,35"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.3"
            />
            <path
              d="M -10,45 Q 25,38 50,45 T 110,45"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Flag emoji */}
        <div className="relative mb-1 z-30">
          <div
            className="text-6xl sm:text-7xl relative z-30 transform transition-all duration-700 group-hover:scale-105 select-none"
            style={{
              filter: 'var(--emoji-filter, opacity(0.9) contrast(1.1))',
              WebkitFilter: 'var(--emoji-filter, opacity(0.9) contrast(1.1))',
            }}
          >
            <div className="group-hover:[--emoji-filter:opacity(1)] transition-all duration-700">
              {flagEmoji}
            </div>
          </div>
        </div>

        {/* Country name */}
        <div className="text-center relative z-30 pointer-events-none mt-0 max-w-full px-2">
          <h2
            className={`type-label text-ink leading-none ${
              name.length > 12 ? 'text-xs' : ''
            }`}
          >
            {name}
          </h2>
          <div
            className="w-8 h-0.75 mx-auto mt-1 rounded-full opacity-10 backdrop-blur-sm"
            style={{ backgroundColor: stampColor }}
          />
          {cityLabel && (
            <p className="type-label text-ink/35 mt-2 text-center tracking-wider truncate w-full px-1">
              {cityLabel}
            </p>
          )}
        </div>
      </div>

      {/* Cities count badge — hidden for HOME/BORN (incomplete lists) */}
      {(status === 'TRAVEL' || status === 'STUDY') && (
        <div className="absolute bottom-0 inset-s-0 inset-e-0 mb-2 flex flex-col items-center transition-all duration-700 z-5">
          <span className="type-label text-ink/40 block leading-none mb-0.5">
            {t('metroUnits')}
          </span>
          <div className="inline-block px-1.5 py-0.5 rounded backdrop-blur-sm">
            <span
              className="type-caption font-black! leading-none"
              style={{ color: stampColor }}
            >
              {String(citiesCount).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
