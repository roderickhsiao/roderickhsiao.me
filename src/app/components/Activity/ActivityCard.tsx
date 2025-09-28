import Image from 'next/image';

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
  const colorClasses = {
    blue: {
      border: hasLink ? 'hover:border-blue-300' : 'border-gray-200',
      text: hasLink ? 'group-hover:text-blue-700' : 'text-gray-900',
      icon: hasLink ? 'group-hover:text-blue-600' : 'text-gray-400'
    },
    green: {
      border: hasLink ? 'hover:border-green-300' : 'border-gray-200',
      text: hasLink ? 'group-hover:text-green-700' : 'text-gray-900',
      icon: hasLink ? 'group-hover:text-green-600' : 'text-gray-400'
    }
  };

  const classes = colorClasses[colorTheme];
  const Component = hasLink ? 'a' : 'div';
  const linkProps = hasLink ? {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <Component
      {...linkProps}
      className={`group block p-4 sm:p-3 bg-white rounded-lg border border-gray-200 ${classes.border} ${hasLink ? 'hover:shadow-sm cursor-pointer' : ''} transition-all`}
    >
      <div className="flex gap-4 sm:gap-3">
        {thumbnail && (
          <Image
            src={thumbnail.url}
            width={colorTheme === 'blue' ? 48 : 36}
            height={colorTheme === 'blue' ? 36 : 36}
            alt={title}
            className={`${colorTheme === 'blue' ? 'w-14 h-10 sm:w-12 sm:h-9' : 'w-10 h-10 sm:w-9 sm:h-9'} object-cover rounded border border-gray-200/50 flex-shrink-0`}
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 36px, 48px"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className={`text-base sm:text-sm ${classes.text} transition-colors leading-tight`}>
            {title}
          </div>
          <div className="text-sm sm:text-xs text-gray-500 mt-1">
            {subtitle}
          </div>
          {summary && (
            <div className="text-sm sm:text-xs text-gray-600 mt-1 leading-relaxed">
              {summary}
            </div>
          )}
        </div>
        {hasLink && (
          <svg className={`w-3 h-3 text-gray-400 ${classes.icon} flex-shrink-0 mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </div>
    </Component>
  );
}
