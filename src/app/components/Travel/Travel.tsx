'use client';
import { useState, Suspense } from 'react';
import countryData from '../../data/country';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import SummarySection from '../shared/SummarySection';
import CountriesGrid from './CountriesGrid';

polyfillCountryFlagEmojis();

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
    <div className="max-w-6xl mx-auto">
      {/* Enhanced Dashboard Header */}
      <div className="mb-8">
        <SummarySection
          title="World Travel & Cultural Exploration"
          description="Travel opens our minds to the incredible diversity of human culture, history, and traditions. Each journey offers unique perspectives and helps us appreciate the rich tapestry of our interconnected world."
          summaryItems={[
            {
              title: 'Cultural Diversity',
              icon: <span className="text-purple-600">🌍</span>,
              items: [
                'Experience different traditions and customs.',
                'Discover diverse cuisines and architectural styles.',
              ],
            },
            {
              title: 'Global Understanding',
              icon: <span className="text-blue-600">🤝</span>,
              items: [
                'Build bridges across different communities.',
                'Learn about historical contexts and modern perspectives.',
              ],
            },
            {
              title: 'Personal Growth',
              icon: <span className="text-green-600">✨</span>,
              items: [
                'Develop adaptability and problem-solving skills.',
                'Gain confidence through new experiences.',
              ],
            },
            {
              title: 'Memorable Adventures',
              icon: <span className="text-orange-600">🗺️</span>,
              items: [
                'Create lasting memories across continents.',
                'Discover hidden gems and iconic landmarks.',
              ],
            },
          ]}
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 mt-8">
          Travel Journey
        </h1>
        <p className="text-base text-gray-600 mb-8">
          Places I’ve been fortunate to visit and explore around the world
        </p>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">
              {totalCountries}
            </div>
            <div className="text-sm text-blue-600 font-medium">Countries</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
            <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
              {totalCities}
            </div>
            <div className="text-sm text-green-600 font-medium">Cities</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
            <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">
              {continents.length}
            </div>
            <div className="text-sm text-purple-600 font-medium">
              Continents
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200">
            <div className="text-2xl sm:text-3xl font-bold text-orange-700 mb-1">
              {
                validCountries.filter(
                  (code) => isBirthCountry(code) || hasLivedInCountry(code)
                ).length
              }
            </div>
            <div className="text-sm text-orange-600 font-medium">
              Called Home
            </div>
          </div>
        </div>

        {/* Continent Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedContinent('')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedContinent === ''
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Continents
          </button>
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedContinent === continent
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {continent}
            </button>
          ))}
        </div>
      </div>

      {/* Countries Grid with Suspense for better performance */}
      <Suspense 
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3 w-20"></div>
                    <div className="space-y-1">
                      <div className="h-6 bg-gray-200 rounded w-16 inline-block mr-1"></div>
                      <div className="h-6 bg-gray-200 rounded w-20 inline-block mr-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <CountriesGrid
          filteredCountries={filteredCountries}
          countryInfo={countryInfo}
          isBirthCountry={isBirthCountry}
          hasLivedInCountry={hasLivedInCountry}
        />
      </Suspense>
    </div>
  );
}
