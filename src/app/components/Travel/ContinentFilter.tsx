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
    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const btnClass = (active: boolean) =>
    clsx(
      'relative px-3 sm:px-2 py-4 sm:py-3 type-label transition-colors duration-200 cursor-pointer',
      'text-start border-0 bg-transparent whitespace-nowrap',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
      active ? 'text-ink' : 'text-ink/65 hover:text-ink',
    );

  return (
    <div className="mb-8 -mx-6 sm:mx-0">
      <nav
        className={clsx(
          "relative flex gap-0 border-b border-ink/8 overflow-x-auto scroll-smooth",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "px-6 sm:px-0",
          "after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-accent",
          "after:transition-all after:duration-300 after:ease-out",
          "after:start-(--indicator-left) after:w-(--indicator-width)",
        )}
        aria-label="Continent filter"
        style={{ '--indicator-left': '0px', '--indicator-width': '0px' } as React.CSSProperties & Record<string, string>}
      >
        <button
          ref={(el) => { if (el && selectedContinent === '') updateIndicatorPosition(el); }}
          className={btnClass(selectedContinent === '')}
          onClick={(e) => handleContinentClick('', e)}
          type="button"
        >
          <span className="hidden sm:inline">All Continents</span>
          <span className="sm:hidden">All</span>
        </button>

        {continents.map((continent) => (
          <button
            key={continent}
            ref={(el) => { if (el && selectedContinent === continent) updateIndicatorPosition(el); }}
            className={btnClass(selectedContinent === continent)}
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
