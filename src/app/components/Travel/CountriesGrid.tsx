'use client';
import { flag } from 'country-emoji';

// Function to get country display name using Intl.DisplayNames
const getCountryDisplayName = (code: string): string => {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code) || code;
  } catch {
    // Fallback mapping for special cases
    const fallbackNames: Record<string, string> = {
      HK: 'Hong Kong SAR China',
      TW: 'Taiwan',
      VA: 'Vatican City',
    };
    return fallbackNames[code] || code;
  }
};

interface CountryInfo {
  cities: string[];
  continent: string;
  color: string;
  highlight: string;
}

interface CountriesGridProps {
  filteredCountries: string[];
  countryInfo: Record<string, CountryInfo>;
  isBirthCountry: (code: string) => boolean;
  hasLivedInCountry: (code: string) => boolean;
}

export default function CountriesGrid({
  filteredCountries,
  countryInfo,
  isBirthCountry,
  hasLivedInCountry,
}: CountriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredCountries.map((code) => {
        const info = countryInfo[code];
        const isBirth = isBirthCountry(code);
        const hasLived = hasLivedInCountry(code);
        return (
          <div
            key={code}
            className={`group relative bg-white rounded-xl border p-4 hover:shadow-lg transition-all duration-300 hover:border-gray-300 overflow-hidden ${
              isBirth
                ? 'border-pink-200 ring-1 ring-pink-100'
                : hasLived
                ? 'border-blue-200 ring-1 ring-blue-100'
                : 'border-gray-200'
            }`}
          >
            {/* Blurred flag emoji as background */}
            <div className="absolute top-0 start-0 text-7xl blur-3xl pointer-events-none select-none">
              {flag(code)}
            </div>

            {/* Content */}

            <div className="flex items-start gap-3 relative">
              <div className="flex-shrink-0">
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                  {flag(code)}
                </span>
              </div>
              <div className="flex-1 min-w-0 pr-16">
                <h3 className="font-bold text-gray-900 text-base sm:text-xl group-hover:text-gray-700 transition-colors leading-tight mb-1">
                  {getCountryDisplayName(code)}
                </h3>
                <p className="text-sm text-gray-500 mb-3 capitalize">
                  {info.continent}
                </p>

                {/* Cities with simple styling */}
                <div className="space-y-1">
                  {info.cities.map((city, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 rounded-md text-xs font-medium mr-1 mb-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {city}
                    </span>
                  ))}
                  {hasLived && (
                    <span className="inline-block px-2 py-1 rounded-md text-xs font-medium mr-1 mb-1 bg-blue-50 text-blue-600 border border-blue-200">
                      + many more cities
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Top-right badge (placed after content to avoid explicit z-index) */}
            {(isBirth || hasLived) && (
              <div className="absolute top-3 right-3">
                {isBirth && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 shadow-sm">
                    🍼 Born Here
                  </span>
                )}
                {hasLived && !isBirth && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
                    🏡 Lived Here
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
