'use client';
import { useState, useRef, useLayoutEffect, useEffect, Fragment } from 'react';
import { flag } from 'country-emoji';
import { X } from 'lucide-react';
import TravelStamp from './TravelStamp';
import type { TravelStatus } from './TravelStamp';
import CityStamp from './CityStamp';

const getCountryDisplayName = (code: string): string => {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code) || code;
  } catch {
    const fallbackNames: Record<string, string> = {
      HK: 'Hong Kong',
      TW: 'Taiwan',
      VA: 'Vatican City',
    };
    return fallbackNames[code] || code;
  }
};

/** Strip emoji prefix + parenthetical suffix: '🏡 Taipei (台北)' → 'Taipei' */
function cleanLabel(raw: string): string {
  return raw.replace(/^[^\w(]+/, '').replace(/\s*\([^)]*\)/, '').trim();
}

interface CountryInfo {
  cities: string[];
  continent: string;
  color: string;
  highlight: string;
  stampHex: string;
}

interface CountriesGridProps {
  filteredCountries: string[];
  countryInfo: Record<string, CountryInfo>;
  isBirthCountry: (code: string) => boolean;
  hasLivedInCountry: (code: string) => boolean;
  hasStudiedInCountry: (code: string) => boolean;
}

export default function CountriesGrid({
  filteredCountries,
  countryInfo,
  isBirthCountry,
  hasLivedInCountry,
  hasStudiedInCountry,
}: CountriesGridProps) {
  // selectedCode: drives open/close (panelHeight)
  // displayedCode: drives which row shows the expander + what content renders
  //   — stays set past selectedCode=null so the close animation can play
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [displayedCode, setDisplayedCode] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const [colCount, setColCount] = useState(2);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      setColCount(cols);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll into view after opening
  useEffect(() => {
    if (!selectedCode || !panelRef.current) return;
    setTimeout(() => panelRef.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
  }, [selectedCode]);

  const toggleCode = (code: string) => {
    if (selectedCode === code) {
      // Start close — keep displayedCode until transition ends
      setSelectedCode(null);
    } else {
      // Mount content first with height: 0, then trigger transition next frame
      setDisplayedCode(code);
      requestAnimationFrame(() => setSelectedCode(code));
    }
  };

  // Row position uses displayedCode so expander stays in DOM during close
  const displayedIndex = displayedCode ? filteredCountries.indexOf(displayedCode) : -1;
  const rowEndIndex =
    displayedIndex === -1
      ? -1
      : Math.min(
          Math.ceil((displayedIndex + 1) / colCount) * colCount - 1,
          filteredCountries.length - 1,
        );

  const displayedInfo = displayedCode ? countryInfo[displayedCode] : null;
  const displayedFlagEmoji = displayedCode ? flag(displayedCode) || '🌐' : null;
  const displayedName = displayedCode
    ? getCountryDisplayName(displayedCode)
    : null;

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 sm:gap-x-8 mb-32"
    >
      {filteredCountries.map((code, index) => {
        const info = countryInfo[code];
        const flagEmoji = flag(code) || '🌐';
        const displayName = getCountryDisplayName(code);
        const isBirth = isBirthCountry(code);
        const hasLived = hasLivedInCountry(code);
        const isStudy = hasStudiedInCountry(code);
        const status: TravelStatus = isBirth ? 'BORN' : hasLived ? 'HOME' : isStudy ? 'STUDY' : 'TRAVEL';
        // HOME/BORN stamps show a city label on the stamp itself; no expand panel
        const canExpand = status === 'TRAVEL' || status === 'STUDY';
        const cityLabel =
          (status === 'HOME' || status === 'BORN') && info.cities.length === 1
            ? cleanLabel(info.cities[0])
            : undefined;

        return (
          <Fragment key={code}>
            <div className="flex justify-center pb-16">
              <TravelStamp
                name={displayName}
                code={code}
                flagEmoji={flagEmoji}
                status={status}
                stampColor={info.stampHex}
                citiesCount={info.cities.length}
                index={index}
                isActive={selectedCode === code}
                onClick={canExpand ? () => toggleCode(code) : undefined}
                cityLabel={cityLabel}
              />
            </div>

            {/* Inline expander — spans the full row, only at the row's last stamp */}
            {rowEndIndex === index && (
              <div
                className="overflow-hidden transition-[height,opacity] duration-700 ease-in-out"
                style={{
                  gridColumn: '1 / -1',
                  height: selectedCode ? 'auto' : 0,
                  opacity: selectedCode ? 1 : 0,
                }}
                onTransitionEnd={(e) => {
                  if (e.propertyName === 'height' && !selectedCode) {
                    setDisplayedCode(null);
                  }
                }}
              >
                <div ref={panelRef} className="pt-12 pb-20 sm:px-4">
                  {displayedInfo && (
                    <div>
                      {/* Panel header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 border-b border-ink/8 pb-8 relative">
                        <div
                          className="absolute -top-6 start-1/2 -translate-x-1/2 w-px h-6 bg-linear-to-b from-transparent to-ink/15"
                          aria-hidden
                        />
                        <div className="flex items-center gap-5">
                          <span className="text-6xl sm:text-7xl leading-none select-none">
                            {displayedFlagEmoji}
                          </span>
                          <div>
                            <h3 className="type-heading-lg text-ink leading-none uppercase">
                              {displayedName}
                            </h3>
                            <span className="type-label text-ink/30 mt-2 block">
                              ARCHIVE EXTRACT // SPATIAL LOGS
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCode(displayedCode!)}
                          className="group flex items-center gap-2 type-label text-ink/40 hover:text-ink transition-colors"
                        >
                          <X
                            size={14}
                            className="group-hover:rotate-90 transition-transform duration-300"
                          />
                          DISMISS RECORD
                        </button>
                      </div>

                      {/* City stamps grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
                        {displayedInfo.cities.map((city, idx) => (
                          <CityStamp
                            key={city}
                            city={city}
                            countryCode={displayedCode!}
                            stampColor={displayedInfo.stampHex}
                            index={idx}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
