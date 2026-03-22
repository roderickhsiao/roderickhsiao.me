import Image from 'next/image';
import type { ReactNode } from 'react';

type TimelineThumbnail = {
  url: string;
  width: number;
  height: number;
};

interface TimelineRowProps {
  period: string;
  meta: string;
  title: string;
  isLast: boolean;
  description?: string;
  href?: string;
  thumbnail?: TimelineThumbnail;
  children?: ReactNode;
}

export default function TimelineRow({
  period,
  meta,
  title,
  isLast,
  description,
  href,
  thumbnail,
  children,
}: TimelineRowProps) {
  const hasLink = !!href;
  const hasThumbnail = !!thumbnail;

  return (
    <article className="group relative grid grid-cols-[3.2rem_minmax(0,1fr)] gap-x-3 gap-y-3 pb-12 md:grid-cols-[minmax(18rem,26rem)_3.2rem_minmax(0,1fr)] md:gap-x-8 md:gap-y-0 md:pb-14 lg:grid-cols-[minmax(20rem,30rem)_3.2rem_minmax(0,1fr)] lg:gap-x-12">
      <div className="col-span-2 space-y-2 md:col-span-1 md:pt-1 md:pr-4 md:text-left">
        <p className="type-label text-ink/55 tabular-nums">{period}</p>
        <p className="type-caption wrap-break-word text-pretty leading-relaxed text-ink/58">{meta}</p>
      </div>

      <div className="relative z-10 flex items-start justify-center md:justify-center">
        <div className="relative aspect-square h-10 w-10 shrink-0 rounded-full border border-ink/16 bg-white transition-colors duration-200 group-hover:border-accent/44">
          {hasThumbnail ? (
            <div className="absolute left-1/2 top-1/2 h-9 w-9 shrink-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
              <Image
                src={thumbnail.url}
                alt=""
                fill
                className="rounded-full object-cover"
                sizes="36px"
                aria-hidden
              />
            </div>
          ) : (
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/75 transition-colors duration-200 group-hover:bg-accent" />
          )}
        </div>

        {!isLast && (
          <span className="absolute left-1/2 top-11 h-[calc(100%+2.2rem)] w-px -translate-x-1/2 bg-ink/10" aria-hidden />
        )}
      </div>

      <div className="space-y-3 pt-0.5 md:pt-0">
        {hasLink ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-2.5 text-ink transition-colors hover:text-accent-hover"
          >
            <h4 className="type-body text-current leading-snug">{title}</h4>
            <svg
              className="mt-1 h-3.5 w-3.5 shrink-0 text-current/58 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : (
          <h4 className="type-body text-ink leading-snug">{title}</h4>
        )}

        {children}

        {description && <p className="max-w-4xl type-body-sm leading-relaxed text-ink/72">{description}</p>}
      </div>
    </article>
  );
}