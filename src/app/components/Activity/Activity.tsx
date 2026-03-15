import Image from 'next/image';
import activities from '../../data/activity';
import speaking from '../../data/speaking';

interface SpeakingItem {
  title: string;
  event: string;
  year: string;
  url: string;
  thumbnail: { url: string; width: number; height: number };
}

interface ActivityItem {
  name: string;
  org: string;
  year: string;
  summary: string;
  smartlink?: {
    url: string;
    thumbnail?: { url: string; width: number; height: number };
    title?: string;
    description?: string;
  };
}

export default function Activity() {
  return (
    <section className="space-y-20">

      {/* ── Speaking ────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-6 mb-10">
          <p className="type-label-wide text-ink/40 shrink-0">SPEAKING</p>
          <div className="h-px flex-1 bg-ink/8" aria-hidden />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(speaking as SpeakingItem[]).map((talk, i) => {
            const label = talk.title.split(' | ')[1] || talk.title;
            const context = talk.title.split(' | ')[0] || '';
            return (
              <a
                key={i}
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {/* Thumbnail */}
                <div className="relative shrink-0 w-20 h-12 rounded-lg overflow-hidden bg-ink/5 border border-ink/8">
                  <Image
                    src={talk.thumbnail.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/20 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all">
                      <svg className="w-2.5 h-2.5 text-transparent group-hover:text-ink/60 transition-colors translate-x-px" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  {context && (
                    <p className="type-label text-ink/40 mb-0.5">{context} · {talk.year}</p>
                  )}
                  <p className="type-caption text-ink/80 group-hover:text-ink transition-colors leading-snug line-clamp-2">{label}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Community ───────────────────────────────── */}
      <div>
        <div className="flex items-center gap-6 mb-10">
          <p className="type-label-wide text-ink/40 shrink-0">COMMUNITY</p>
          <div className="h-px flex-1 bg-ink/8" aria-hidden />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(activities as ActivityItem[]).map((item, i) => {
            const hasLink = !!item.smartlink?.url;
            const Wrapper = hasLink ? 'a' : 'div';
            const wrapperProps = hasLink
              ? ({ href: item.smartlink!.url, target: '_blank', rel: 'noopener noreferrer' } as React.AnchorHTMLAttributes<HTMLAnchorElement>)
              : {};

            return (
              <Wrapper
                key={i}
                {...(wrapperProps as Record<string, unknown>)}
                className={`group flex items-start gap-4 p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-sm transition-all duration-200 ${hasLink ? 'hover:shadow-md hover:bg-white/60 cursor-pointer' : ''}`}
              >
                {/* Thumbnail */}
                {item.smartlink?.thumbnail && (
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-ink/8 bg-ink/5 relative z-10">
                    <Image
                      src={item.smartlink.thumbnail.url}
                      alt=""
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      aria-hidden
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Text */}
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className={`type-caption text-ink leading-tight ${hasLink ? 'group-hover:text-(--gaudi-terracotta) transition-colors' : ''}`}>{item.name}</h4>
                    <span className="type-label text-ink/30 shrink-0 mt-0.5">{item.year}</span>
                  </div>
                  <p className="type-label text-ink/50 mb-2">{item.org}</p>
                  <p className="type-body-sm text-ink/50 leading-relaxed">{item.summary}</p>
                </div>

                {/* Arrow */}
                {hasLink && (
                  <svg className="w-3.5 h-3.5 text-ink/20 group-hover:text-ink/50 shrink-0 mt-1 transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
