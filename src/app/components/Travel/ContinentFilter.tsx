import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface ContinentFilterProps {
  continents: string[];
  selectedContinent: string;
  onContinentChange: (continent: string) => void;
}

export default function ContinentFilter({
  continents,
  selectedContinent,
  onContinentChange,
}: ContinentFilterProps) {
  const t = useTranslations('travel');

  const continentLabel = (continent: string): string => {
    const map: Record<string, string> = {
      'Asia':          t('continentAsia'),
      'Europe':        t('continentEurope'),
      'North America': t('continentNorthAmerica'),
      'South America': t('continentSouthAmerica'),
      'Oceania':       t('continentOceania'),
      'Africa':        t('continentAfrica'),
    };
    return map[continent] ?? continent;
  };

  const btnClass = (active: boolean) =>
    clsx(
      'px-3 py-1.5 rounded-full type-label transition-all duration-200 cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
      active
        ? 'bg-ink text-ink-inverted'
        : 'border border-ink/15 text-ink/55 bg-transparent hover:text-ink hover:border-ink/35',
    );

  return (
    <div className="mb-8" role="group" aria-label="Filter by continent">
      <div className="flex flex-wrap gap-2">
        <button
          className={btnClass(selectedContinent === '')}
          onClick={() => onContinentChange('')}
          type="button"
        >
          {t('filterAll')}
        </button>

        {continents.map((continent) => (
          <button
            key={continent}
            className={btnClass(selectedContinent === continent)}
            onClick={() => onContinentChange(continent)}
            type="button"
          >
            {continentLabel(continent)}
          </button>
        ))}
      </div>
    </div>
  );
}
