import clsx from 'clsx';

interface TravelStatsProps {
  totalCountries: number;
  totalCities: number;
  totalContinents: number;
  totalHomePlaces: number;
  isLoading?: boolean;
}

export default function TravelStats({
  totalCountries,
  totalCities,
  totalContinents,
  totalHomePlaces,
  isLoading = false,
}: TravelStatsProps) {
  return (
    <div className={clsx('grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8')}>
      <div className={clsx('bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200')}>
        <div className={clsx('text-2xl sm:text-3xl font-bold text-blue-700 mb-1')}>
          {isLoading ? (
            <div className={clsx('h-8 bg-blue-200 rounded mx-auto w-12 animate-pulse')} />
          ) : (
            totalCountries
          )}
        </div>
        <div className={clsx('text-sm text-blue-600 font-medium')}>Countries</div>
      </div>

      <div className={clsx('bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200')}>
        <div className={clsx('text-2xl sm:text-3xl font-bold text-green-700 mb-1')}>
          {isLoading ? (
            <div className={clsx('h-8 bg-green-200 rounded mx-auto w-12 animate-pulse')} />
          ) : (
            totalCities
          )}
        </div>
        <div className={clsx('text-sm text-green-600 font-medium')}>Cities</div>
      </div>

      <div className={clsx('bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200')}>
        <div className={clsx('text-2xl sm:text-3xl font-bold text-purple-700 mb-1')}>
          {isLoading ? (
            <div className={clsx('h-8 bg-purple-200 rounded mx-auto w-8 animate-pulse')} />
          ) : (
            totalContinents
          )}
        </div>
        <div className={clsx('text-sm text-purple-600 font-medium')}>Continents</div>
      </div>

      <div className={clsx('bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200')}>
        <div className={clsx('text-2xl sm:text-3xl font-bold text-orange-700 mb-1')}>
          {isLoading ? (
            <div className={clsx('h-8 bg-orange-200 rounded mx-auto w-8 animate-pulse')} />
          ) : (
            totalHomePlaces
          )}
        </div>
        <div className={clsx('text-sm text-orange-600 font-medium')}>Called Home</div>
      </div>
    </div>
  );
}
