import clsx from 'clsx';

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
  const updateIndicatorPosition = (element: HTMLButtonElement) => {
    const nav = element.closest('nav')!;
    nav.style.setProperty('--indicator-left', `${element.offsetLeft}px`);
    nav.style.setProperty('--indicator-width', `${element.offsetWidth}px`);
  };

  const handleContinentClick = (continent: string, event: React.MouseEvent<HTMLButtonElement>) => {
    onContinentChange(continent);
    
    // Scroll the clicked button into view
    const button = event.currentTarget;
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return (
    <div className={clsx('mb-8')}>
      <nav 
        className={clsx(
          "relative flex gap-8 border-b border-gray-200 overflow-x-auto scrollbar-hide",
          "after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-gray-900",
          "after:transition-all after:duration-300 after:ease-out",
          "after:left-[var(--indicator-left)] after:w-[var(--indicator-width)]"
        )}
        aria-label="Continent filter"
        style={{
          '--indicator-left': '0px',
          '--indicator-width': '0px',
        } as React.CSSProperties & { [key: string]: string }}
      >
        <button
          ref={(el) => {
            if (el && selectedContinent === '') {
              updateIndicatorPosition(el);
            }
          }}
          className={clsx(
            'relative px-1 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer',
            'text-left border-0 bg-transparent hover:text-gray-900 focus:outline-none whitespace-nowrap',
            {
              'text-gray-900': selectedContinent === '',
              'text-gray-500 hover:text-gray-700': selectedContinent !== '',
            }
          )}
          onClick={(e) => handleContinentClick('', e)}
          type="button"
        >
          All Continents
        </button>

        {continents.map((continent) => (
          <button
            key={continent}
            ref={(el) => {
              if (el && selectedContinent === continent) {
                updateIndicatorPosition(el);
              }
            }}
            className={clsx(
              'relative px-1 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer',
              'text-left border-0 bg-transparent hover:text-gray-900 focus:outline-none whitespace-nowrap',
              {
                'text-gray-900': selectedContinent === continent,
                'text-gray-500 hover:text-gray-700': selectedContinent !== continent,
              }
            )}
            onClick={(e) => handleContinentClick(continent, e)}
            type="button"
          >
            {continent}
          </button>
        ))}
      </nav>
    </div>
  );
}
