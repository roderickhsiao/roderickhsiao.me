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

function LedgerEntry({ label, value, unit }: LedgerEntryProps) {
  return (
    <div className="flex flex-col py-2 group min-w-25">
      <span className="text-[9px] font-black font-sans uppercase tracking-[0.3em] text-ink/40 mb-3">
        {label}
      </span>
      <div className="flex items-baseline gap-3 border-s-2 border-ink/10 ps-6 transition-all duration-700 group-hover:border-ink">
        <span className="text-5xl sm:text-6xl font-black italic tracking-tighter text-ink leading-none group-hover:translate-x-1 transition-transform duration-500 origin-left">
          {value}
        </span>
        <span className="text-[9px] font-black text-ink/40 uppercase tracking-widest">
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
  if (isLoading) {
    return <div className="h-40 rounded-2xl animate-pulse bg-ink/5" />;
  }

  return (
    <section className="pt-16 border-t-2 border-ink/10 mt-8 mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-6 mb-12">
        <h2 className="type-heading-lg text-ink">
          Archival <br />Summary
        </h2>
        <span className="type-label-wide text-ink/30">Consolidated_Metrics_{new Date().getFullYear()}</span>
      </div>
      <div className="flex flex-wrap gap-12 sm:gap-20">
        <LedgerEntry label="Territories" value={totalCountries} unit="Logged" />
        <LedgerEntry label="Metro Centers" value={totalCities} unit="Units" />
        <LedgerEntry label="Spheres" value={totalContinents} unit="Continents" />
        <LedgerEntry label="Residency" value={totalHomePlaces} unit="Base" />
      </div>
    </section>
  );
}
