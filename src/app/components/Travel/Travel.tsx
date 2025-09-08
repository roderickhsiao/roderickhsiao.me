'use client';
import { useState, unstable_ViewTransition as ViewTransition } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import countryData from '../../data/country';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import SummarySection from '../shared/SummarySection';
import TravelStats from './TravelStats';
import ContinentFilter from './ContinentFilter';

polyfillCountryFlagEmojis();

// Only lazy load the CountriesGrid component that causes SSR issues
const CountriesGrid = dynamic(() => import('./CountriesGrid'), {
  ssr: false,
  loading: () => (
    <div className={clsx('grid grid-cols-1 md:grid-cols-2 gap-4')}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse'
          )}
        >
          <div className={clsx('flex items-start gap-3')}>
            <div
              className={clsx('w-12 h-12 bg-gray-200 rounded flex-shrink-0')}
            />
            <div className={clsx('flex-1 min-w-0')}>
              <div className={clsx('h-5 bg-gray-200 rounded mb-2 w-3/4')} />
              <div className={clsx('h-3 bg-gray-200 rounded mb-3 w-16')} />
              <div className={clsx('flex flex-wrap gap-1')}>
                <div className={clsx('h-6 bg-gray-200 rounded w-20')} />
                <div className={clsx('h-6 bg-gray-200 rounded w-16')} />
                <div className={clsx('h-6 bg-gray-200 rounded w-24')} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
});

interface CountryInfo {
  cities: string[];
  continent: string;
  color: string;
  highlight: string;
}

export default function Travel() {
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  const validCountries = Object.keys(countryData).filter(
    (code) => countryData[code as keyof typeof countryData]?.length > 0
  );

  const countryInfo: Record<string, CountryInfo> = {
    AU: {
      cities: countryData.AU,
      continent: 'Oceania',
      color: 'from-green-500 to-yellow-500',
      highlight: 'text-green-600',
    },
    AT: {
      cities: countryData.AT,
      continent: 'Europe',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    BE: {
      cities: countryData.BE,
      continent: 'Europe',
      color: 'from-black to-yellow-400',
      highlight: 'text-yellow-600',
    },
    KH: {
      cities: countryData.KH,
      continent: 'Asia',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    CA: {
      cities: countryData.CA,
      continent: 'North America',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    CN: {
      cities: countryData.CN,
      continent: 'Asia',
      color: 'from-red-600 to-yellow-400',
      highlight: 'text-red-600',
    },
    HR: {
      cities: countryData.HR,
      continent: 'Europe',
      color: 'from-red-600 to-blue-600',
      highlight: 'text-red-600',
    },
    CZ: {
      cities: countryData.CZ,
      continent: 'Europe',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    GB: {
      cities: countryData.GB,
      continent: 'Europe',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    FI: {
      cities: countryData.FI,
      continent: 'Europe',
      color: 'from-blue-600 to-white',
      highlight: 'text-blue-600',
    },
    FR: {
      cities: countryData.FR,
      continent: 'Europe',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    DE: {
      cities: countryData.DE,
      continent: 'Europe',
      color: 'from-black to-red-600',
      highlight: 'text-black',
    },
    KY: {
      cities: countryData.KY,
      continent: 'North America',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    GR: {
      cities: countryData.GR,
      continent: 'Europe',
      color: 'from-blue-600 to-white',
      highlight: 'text-blue-600',
    },
    HK: {
      cities: countryData.HK,
      continent: 'Asia',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    HU: {
      cities: countryData.HU,
      continent: 'Europe',
      color: 'from-red-600 to-green-600',
      highlight: 'text-red-600',
    },
    IN: {
      cities: countryData.IN,
      continent: 'Asia',
      color: 'from-orange-500 to-green-600',
      highlight: 'text-orange-600',
    },
    IL: {
      cities: countryData.IL,
      continent: 'Asia',
      color: 'from-blue-600 to-white',
      highlight: 'text-blue-600',
    },
    IT: {
      cities: countryData.IT,
      continent: 'Europe',
      color: 'from-green-600 to-red-600',
      highlight: 'text-green-600',
    },
    JP: {
      cities: countryData.JP,
      continent: 'Asia',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    JO: {
      cities: countryData.JO,
      continent: 'Asia',
      color: 'from-black to-red-600',
      highlight: 'text-black',
    },
    KR: {
      cities: countryData.KR,
      continent: 'Asia',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    MV: {
      cities: countryData.MV,
      continent: 'Asia',
      color: 'from-red-600 to-green-600',
      highlight: 'text-red-600',
    },
    MX: {
      cities: countryData.MX,
      continent: 'North America',
      color: 'from-green-600 to-red-600',
      highlight: 'text-green-600',
    },
    MM: {
      cities: countryData.MM,
      continent: 'Asia',
      color: 'from-yellow-400 to-red-600',
      highlight: 'text-yellow-600',
    },
    NZ: {
      cities: countryData.NZ,
      continent: 'Oceania',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    NL: {
      cities: countryData.NL,
      continent: 'Europe',
      color: 'from-red-600 to-blue-600',
      highlight: 'text-red-600',
    },
    PW: {
      cities: countryData.PW,
      continent: 'Oceania',
      color: 'from-blue-600 to-yellow-400',
      highlight: 'text-blue-600',
    },
    PH: {
      cities: countryData.PH,
      continent: 'Asia',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    PL: {
      cities: countryData.PL,
      continent: 'Europe',
      color: 'from-white to-red-600',
      highlight: 'text-red-600',
    },
    PT: {
      cities: countryData.PT,
      continent: 'Europe',
      color: 'from-green-600 to-red-600',
      highlight: 'text-green-600',
    },
    SA: {
      cities: countryData.SA,
      continent: 'Asia',
      color: 'from-green-600 to-white',
      highlight: 'text-green-600',
    },
    SG: {
      cities: countryData.SG,
      continent: 'Asia',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    SI: {
      cities: countryData.SI,
      continent: 'Europe',
      color: 'from-white to-red-600',
      highlight: 'text-red-600',
    },
    ES: {
      cities: countryData.ES,
      continent: 'Europe',
      color: 'from-red-600 to-yellow-400',
      highlight: 'text-red-600',
    },
    CH: {
      cities: countryData.CH,
      continent: 'Europe',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    TH: {
      cities: countryData.TH,
      continent: 'Asia',
      color: 'from-red-600 to-blue-600',
      highlight: 'text-red-600',
    },
    TW: {
      cities: countryData.TW,
      continent: 'Asia',
      color: 'from-blue-600 to-red-600',
      highlight: 'text-blue-600',
    },
    TR: {
      cities: countryData.TR,
      continent: 'Europe',
      color: 'from-red-600 to-white',
      highlight: 'text-red-600',
    },
    US: {
      cities: countryData.US,
      continent: 'North America',
      color: 'from-blue-500 to-red-500',
      highlight: 'text-blue-600',
    },
    VA: {
      cities: countryData.VA,
      continent: 'Europe',
      color: 'from-yellow-400 to-white',
      highlight: 'text-yellow-600',
    },
  };

  // Helper function to check if a country has any cities where user was born (marked with 🍼)
  const isBirthCountry = (countryCode: string) => {
    const cities = countryData[countryCode as keyof typeof countryData];
    return cities?.some((city) => city.includes('🍼')) || false;
  };

  // Helper function to check if a country has any cities where user has lived (marked with 🏡)
  const hasLivedInCountry = (countryCode: string) => {
    const cities = countryData[countryCode as keyof typeof countryData];
    return cities?.some((city) => city.includes('🏡')) || false;
  };

  // Sort countries to prioritize: birthplace first, then lived-in places, then visited places
  const sortCountriesBySignificance = (countries: string[]) => {
    return countries.sort((a, b) => {
      const aIsBirth = isBirthCountry(a);
      const bIsBirth = isBirthCountry(b);
      const aHasHome = hasLivedInCountry(a);
      const bHasHome = hasLivedInCountry(b);

      // Birthplace comes first
      if (aIsBirth && !bIsBirth) return -1;
      if (!aIsBirth && bIsBirth) return 1;

      // If both or neither are birthplace, then sort by lived-in status
      if (aIsBirth === bIsBirth) {
        if (aHasHome && !bHasHome) return -1;
        if (!aHasHome && bHasHome) return 1;
      }

      // Maintain original order if same significance
      return 0;
    });
  };

  const totalCountries = validCountries.length;
  const totalCities = validCountries.reduce(
    (sum, code) =>
      sum + (countryData[code as keyof typeof countryData]?.length || 0),
    0
  );

  const continents = Array.from(
    new Set(validCountries.map((code) => countryInfo[code].continent))
  );

  const filteredCountries = selectedContinent
    ? sortCountriesBySignificance(
        validCountries.filter(
          (code) => countryInfo[code].continent === selectedContinent
        )
      )
    : sortCountriesBySignificance([...validCountries]);

  return (
    <div className={clsx('max-w-6xl mx-auto')}>
      {/* Enhanced Dashboard Header */}
      <div className={clsx('mb-8')}>
        <SummarySection
          title="World Travel & Cultural Exploration"
          description="Travel opens our minds to the incredible diversity of human culture, history, and traditions. Each journey offers unique perspectives and helps us appreciate the rich tapestry of our interconnected world."
          summaryItems={[
            {
              title: 'Cultural Diversity',
              icon: <span className={clsx('text-purple-600')}>🌍</span>,
              items: [
                'Experience different traditions and customs.',
                'Discover diverse cuisines and architectural styles.',
              ],
            },
            {
              title: 'Global Understanding',
              icon: <span className={clsx('text-blue-600')}>🤝</span>,
              items: [
                'Build bridges across different communities.',
                'Learn about historical contexts and modern perspectives.',
              ],
            },
            {
              title: 'Personal Growth',
              icon: <span className={clsx('text-green-600')}>✨</span>,
              items: [
                'Develop adaptability and problem-solving skills.',
                'Gain confidence through new experiences.',
              ],
            },
            {
              title: 'Memorable Adventures',
              icon: <span className={clsx('text-orange-600')}>🗺️</span>,
              items: [
                'Create lasting memories across continents.',
                'Discover hidden gems and iconic landmarks.',
              ],
            },
          ]}
        />

        <h1
          className={clsx(
            'text-2xl sm:text-3xl font-bold text-gray-900 mb-2 mt-8'
          )}
        >
          Travel Journey
        </h1>
        <p className={clsx('text-base text-gray-600 mb-8')}>
          Places I’ve been fortunate to visit and explore around the world
        </p>

        {/* Enhanced Stats Dashboard */}
        <TravelStats
          totalCountries={totalCountries}
          totalCities={totalCities}
          totalContinents={continents.length}
          totalHomePlaces={
            validCountries.filter(
              (code) => isBirthCountry(code) || hasLivedInCountry(code)
            ).length
          }
        />

        {/* Continent Filter */}
        <ContinentFilter
          continents={continents}
          selectedContinent={selectedContinent}
          onContinentChange={setSelectedContinent}
        />
      </div>

      <CountriesGrid
        filteredCountries={filteredCountries}
        countryInfo={countryInfo}
        isBirthCountry={isBirthCountry}
        hasLivedInCountry={hasLivedInCountry}
      />
    </div>
  );
}
