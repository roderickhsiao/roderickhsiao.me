/**
 * Static metadata per country code — flag-derived stamp colour, continent,
 * and Tailwind gradient classes for the card UI.
 * Keep in sync with the city data in country.ts.
 */
export interface CountryMeta {
  continent: string;
  color: string;
  highlight: string;
  stampHex: string;
}

export const COUNTRY_META: Record<string, CountryMeta> = {
  AU: { continent: 'Oceania',       color: 'from-green-500 to-yellow-500', highlight: 'text-success', stampHex: '#006341' },
  AT: { continent: 'Europe',        color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#ED2939' },
  BE: { continent: 'Europe',        color: 'from-black to-yellow-400',     highlight: 'text-sun',     stampHex: '#1A1A1A' },
  KH: { continent: 'Asia',          color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#032EA1' },
  CA: { continent: 'North America', color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#D52B1E' },
  CN: { continent: 'Asia',          color: 'from-red-600 to-yellow-400',   highlight: 'text-error',   stampHex: '#DE2910' },
  HR: { continent: 'Europe',        color: 'from-red-600 to-blue-600',     highlight: 'text-error',   stampHex: '#FF0000' },
  CZ: { continent: 'Europe',        color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#D7141A' },
  GB: { continent: 'Europe',        color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#012169' },
  FI: { continent: 'Europe',        color: 'from-blue-600 to-white',       highlight: 'text-sky',     stampHex: '#003580' },
  FR: { continent: 'Europe',        color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#002395' },
  DE: { continent: 'Europe',        color: 'from-black to-red-600',        highlight: 'text-ink',     stampHex: '#1A1A1A' },
  KY: { continent: 'North America', color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#003DA5' },
  GR: { continent: 'Europe',        color: 'from-blue-600 to-white',       highlight: 'text-sky',     stampHex: '#0D5EAF' },
  HK: { continent: 'Asia',          color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#DE2910' },
  HU: { continent: 'Europe',        color: 'from-red-600 to-green-600',    highlight: 'text-error',   stampHex: '#CE2939' },
  IN: { continent: 'Asia',          color: 'from-orange-500 to-green-600', highlight: 'text-sun',     stampHex: '#FF9933' },
  IL: { continent: 'Asia',          color: 'from-blue-600 to-white',       highlight: 'text-sky',     stampHex: '#009BDE' },
  IT: { continent: 'Europe',        color: 'from-green-600 to-red-600',    highlight: 'text-success', stampHex: '#009246' },
  JP: { continent: 'Asia',          color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#BC002D' },
  JO: { continent: 'Asia',          color: 'from-black to-red-600',        highlight: 'text-ink',     stampHex: '#007A3D' },
  KR: { continent: 'Asia',          color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#C60C30' },
  MV: { continent: 'Asia',          color: 'from-red-600 to-green-600',    highlight: 'text-error',   stampHex: '#D21034' },
  MX: { continent: 'North America', color: 'from-green-600 to-red-600',    highlight: 'text-success', stampHex: '#006847' },
  MM: { continent: 'Asia',          color: 'from-yellow-400 to-red-600',   highlight: 'text-sun',     stampHex: '#2D8A27' },
  NZ: { continent: 'Oceania',       color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#00247D' },
  NL: { continent: 'Europe',        color: 'from-red-600 to-blue-600',     highlight: 'text-error',   stampHex: '#AE1C28' },
  PW: { continent: 'Oceania',       color: 'from-blue-600 to-yellow-400',  highlight: 'text-sky',     stampHex: '#4AADD6' },
  PH: { continent: 'Asia',          color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#0038A8' },
  PL: { continent: 'Europe',        color: 'from-white to-red-600',        highlight: 'text-error',   stampHex: '#DC143C' },
  PT: { continent: 'Europe',        color: 'from-green-600 to-red-600',    highlight: 'text-success', stampHex: '#006600' },
  SA: { continent: 'Asia',          color: 'from-green-600 to-white',      highlight: 'text-success', stampHex: '#006C35' },
  SG: { continent: 'Asia',          color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#EF3340' },
  SI: { continent: 'Europe',        color: 'from-white to-red-600',        highlight: 'text-error',   stampHex: '#003DA5' },
  ES: { continent: 'Europe',        color: 'from-red-600 to-yellow-400',   highlight: 'text-error',   stampHex: '#C60B1E' },
  CH: { continent: 'Europe',        color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#D52B1E' },
  TH: { continent: 'Asia',          color: 'from-red-600 to-blue-600',     highlight: 'text-error',   stampHex: '#A51931' },
  TW: { continent: 'Asia',          color: 'from-blue-600 to-red-600',     highlight: 'text-sky',     stampHex: '#CF0000' },
  TR: { continent: 'Europe',        color: 'from-red-600 to-white',        highlight: 'text-error',   stampHex: '#E30A17' },
  US: { continent: 'North America', color: 'from-blue-500 to-red-500',     highlight: 'text-sky',     stampHex: '#3C3B6E' },
  VA: { continent: 'Europe',        color: 'from-yellow-400 to-white',     highlight: 'text-sun',     stampHex: '#8B6914' },
};
