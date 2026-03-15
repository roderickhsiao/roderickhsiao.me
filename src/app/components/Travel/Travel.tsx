'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import countryData from '../../data/country';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import PageHero from '@/app/components/shared/PageHero';
import TravelStats from './TravelStats';
import ContinentFilter from './ContinentFilter';
import { COUNTRY_META } from '../../data/travelMeta';
import FieldNotes from '@/app/components/shared/FieldNotes';

polyfillCountryFlagEmojis();

// CountriesGrid uses `flag()` from country-emoji which breaks SSR
const CountriesGrid = dynamic(() => import('./CountriesGrid'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-12 gap-x-4 sm:gap-x-6 mb-32">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-31.25 h-[210px] sm:h-[230px] rounded-lg animate-pulse bg-ink/8 mx-auto"
        />
      ))}
    </div>
  ),
});

// ── Static data (computed once at module load) ──────────────────────────────

type CountryCode = keyof typeof countryData;

function isBirthCountry(code: string) {
  return (countryData as Record<string, string[]>)[code]?.some((c) => c.includes('🍼')) ?? false;
}

function hasLivedInCountry(code: string) {
  return (countryData as Record<string, string[]>)[code]?.some((c) => c.includes('🏡')) ?? false;
}

function hasStudiedInCountry(code: string) {
  return (countryData as Record<string, string[]>)[code]?.some((c) => c.includes('🎓')) ?? false;
}

function sortBySignificance(countries: string[]) {
  return [...countries].sort((a, b) => {
    const [aB, bB] = [isBirthCountry(a), isBirthCountry(b)];
    const [aH, bH] = [hasLivedInCountry(a), hasLivedInCountry(b)];
    if (aB !== bB) return aB ? -1 : 1;
    if (aH !== bH) return aH ? -1 : 1;
    return 0;
  });
}

interface CountryInfo {
  cities: string[];
  continent: string;
  color: string;
  highlight: string;
  stampHex: string;
}

const validCountries = (Object.keys(countryData) as CountryCode[]).filter(
  (code) => countryData[code]?.length > 0
) as string[];

const countryInfo: Record<string, CountryInfo> = Object.fromEntries(
  validCountries.map((code) => [
    code,
    { ...COUNTRY_META[code], cities: (countryData as Record<string, string[]>)[code] ?? [] },
  ])
);

const totalCountries = validCountries.length;
const totalCities = validCountries.reduce(
  (sum, code) => sum + ((countryData as Record<string, string[]>)[code]?.length ?? 0),
  0
);
const continents = Array.from(
  new Set(validCountries.map((code) => countryInfo[code]?.continent).filter(Boolean))
) as string[];

const EDITORIAL_ITEMS: readonly { num: string; icon: string; title: string; items: readonly string[] }[] = [
  {
    num: '01',
    icon: '🌍',
    title: 'Cultural Diversity',
    items: [
      'Experience different traditions and customs.',
      'Discover diverse cuisines and architectural styles.',
    ],
  },
  {
    num: '02',
    icon: '🤝',
    title: 'Global Understanding',
    items: [
      'Build bridges across different communities.',
      'Learn about historical contexts and modern perspectives.',
    ],
  },
  {
    num: '03',
    icon: '✨',
    title: 'Personal Growth',
    items: [
      'Develop adaptability and problem-solving skills.',
      'Gain confidence through new experiences.',
    ],
  },
  {
    num: '04',
    icon: '🗺️',
    title: 'Memorable Adventures',
    items: [
      'Create lasting memories across continents.',
      'Discover hidden gems and iconic landmarks.',
    ],
  },
] as const;

/**
 * Hidden SVG filter for the paper-grain texture on stamp cards.
 * Must live in the same document as the stamps that reference it.
 */
function InkTextureFilter() {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0 }}
      aria-hidden
      focusable="false"
    >
      <filter id="stamp-ink-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 1" />
          <feFuncG type="discrete" tableValues="0 1" />
          <feFuncB type="discrete" tableValues="0 1" />
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceAlpha" />
      </filter>
    </svg>
  );
}

export default function Travel() {
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [search, setSearch] = useState('');

  const filteredCountries = sortBySignificance(
    validCountries.filter((code) => {
      if (!countryInfo[code]) return false;
      const matchesContinent =
        !selectedContinent || countryInfo[code].continent === selectedContinent;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        code.toLowerCase().includes(q) ||
        countryInfo[code].continent.toLowerCase().includes(q);
      return matchesContinent && matchesSearch;
    })
  );

  return (
    <div className="relative overflow-x-hidden">
      <InkTextureFilter />

      <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">

        {/* ── Hero ─────────────────────────────────────── */}
        <PageHero
          eyebrow="Spatial Log // Field Archive"
          title={<>Travel<br />Journey</>}
          description="Travel opens our minds to the incredible diversity of human culture, history, and traditions. Each journey offers unique perspectives and helps us appreciate the rich tapestry of our interconnected world."
          className="pb-20"
        />

        <FieldNotes
          label="FLIGHT LOG // WINDOW SEAT"
          heading={<>World Travel &amp;<br />Cultural Exploration</>}
          items={EDITORIAL_ITEMS}
        />

        {/* ── Stats ledger ─────────────────────────────── */}
        {/* spacer between summary cards and ledger */}
        <div className="mt-16" />
        <TravelStats
          totalCountries={totalCountries}
          totalCities={totalCities}
          totalContinents={continents.length}
          totalHomePlaces={
            validCountries.filter(
              (code) => isBirthCountry(code) || hasLivedInCountry(code) || hasStudiedInCountry(code)
            ).length
          }
        />

        {/* ── Filter + Search ───────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-6">
          <ContinentFilter
            continents={continents}
            selectedContinent={selectedContinent}
            onContinentChange={setSelectedContinent}
          />

          {/* Search */}
          <div className="relative w-full max-w-xs group shrink-0 mb-8">
            <Search
              className="absolute inset-s-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 group-focus-within:text-accent transition-colors"
              aria-hidden
            />
            <input
              type="text"
              placeholder="Search countries…"
              aria-label="Search countries"
              className="w-full pl-7 py-3 bg-transparent border-b-2 border-ink/10 focus:border-ink transition-all text-[11px] font-black tracking-[0.3em] uppercase placeholder:text-ink/20 focus:outline-none text-ink"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Stamp grid ───────────────────────────────── */}
        <CountriesGrid
          filteredCountries={filteredCountries}
          countryInfo={countryInfo}
          isBirthCountry={isBirthCountry}
          hasLivedInCountry={hasLivedInCountry}
          hasStudiedInCountry={hasStudiedInCountry}
        />

      </div>
    </div>
  );
}
