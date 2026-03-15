import Image from 'next/image';
import clsx from 'clsx';

interface CardProps {
  title: string;
  subtitle: string;
  summary?: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  url?: string;
  colorTheme: 'blue' | 'green';
}

export default function ActivityCard({ title, subtitle, summary, thumbnail, url, colorTheme }: CardProps) {
  const hasLink = url && url !== '#';
  const hoverBorder = colorTheme === 'blue' ? 'hover:border-sky/40' : 'hover:border-accent/40';
  const hoverText  = colorTheme === 'blue' ? 'group-hover:text-sky'  : 'group-hover:text-accent';
  const hoverIcon  = colorTheme === 'blue' ? 'group-hover:text-sky'  : 'group-hover:text-accent';

  const Component = hasLink ? 'a' : 'div';
  const linkProps = hasLink ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      {...linkProps}
      className={clsx(
        'group block p-4 sm:p-3 bg-surface/70 backdrop-blur-sm rounded-xl border border-ink/8 transition-all duration-200',
        hasLink && [hoverBorder, 'hover:shadow-md cursor-pointer'],
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
      )}
    >
      <div className="flex gap-4 sm:gap-3">
        {thumbnail && (
          <Image
            src={thumbnail.url}
            width={colorTheme === 'blue' ? 48 : 36}
            height={colorTheme === 'blue' ? 36 : 36}
            alt=""
            aria-hidden
            className={clsx(
              'object-cover rounded border border-ink/8 shrink-0',
              colorTheme === 'blue' ? 'w-14 h-10 sm:w-12 sm:h-9' : 'w-10 h-10 sm:w-9 sm:h-9',
            )}
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 36px, 48px"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className={clsx('type-caption text-ink transition-colors leading-tight', hasLink && hoverText)}>
            {title}
          </p>
          <p className="type-label text-ink/70 mt-1">{subtitle}</p>
          {summary && (
            <p className="type-body-sm mt-1 leading-relaxed">{summary}</p>
          )}
        </div>
        {hasLink && (
          <svg
            className={clsx('w-3 h-3 text-ink/30 shrink-0 mt-1 transition-colors', hoverIcon)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </div>
    </Component>
  );
}
