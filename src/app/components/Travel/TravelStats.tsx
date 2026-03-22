interface TravelStatsProps {
  totalCountries: number;
  totalCities: number;
  totalContinents: number;
  totalHomePlaces: number;
  isLoading?: boolean;
}

interface LedgerEntryProps {
  label: string;
  value: number;
  unit: string;
}
import { useTranslations, useFormatter } from 'next-intl';

function LedgerEntry({ label, value, unit }: LedgerEntryProps) {
  return (
    <div className="flex flex-col py-2 group min-w-25">
      <span className="type-label-wide mb-3 text-ink/60">
        {label}
      </span>
      <div className="flex items-baseline gap-3 border-s-2 border-ink/10 ps-6 transition-all duration-700 group-hover:border-ink">
        <span className="text-5xl sm:text-6xl font-black italic tracking-tighter text-ink leading-none group-hover:translate-x-1 transition-transform duration-500 origin-left">
          {value}
        </span>
        <span className="type-label text-ink/60">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function TravelStats({
  totalCountries,
  totalCities,
  totalContinents,
  totalHomePlaces,
  isLoading = false,
}: TravelStatsProps) {
  const t = useTranslations('travel');
  const format = useFormatter();
  if (isLoading) {
    return <div className="h-40 rounded-2xl animate-pulse bg-ink/5" />;
  }

  return (
    <section className="pt-16 border-t-2 border-ink/10 mt-8 mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-6 mb-12">
        <h2 className="type-heading-lg text-ink whitespace-pre-line">
          {t('statsHeading')}
        </h2>
        <span className="type-label-wide text-ink/60">{t('metricsLabel', { year: format.dateTime(new Date(), { year: 'numeric' }) })}</span>
      </div>
      <div className="flex flex-wrap gap-12 sm:gap-20">
        <LedgerEntry label={t('territories')} value={totalCountries} unit={t('logged')} />
        <LedgerEntry label={t('metroCenters')} value={totalCities} unit={t('units')} />
        <LedgerEntry label={t('spheres')} value={totalContinents} unit={t('continents')} />
        <LedgerEntry label={t('residency')} value={totalHomePlaces} unit={t('base')} />
      </div>
    </section>
  );
}
