'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowLeftRight, Home, Sun, CloudSun, Zap, Globe, Smartphone, Shield, ExternalLink, MapPin } from 'lucide-react';
import clsx from 'clsx';
import experience from '@/app/data/experience';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Card visual config — design intent, not content
   hex stores a CSS variable reference, not a raw hex string
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const VISUAL: Record<string, { color: string; hex: string; animation: 'swap' | 'swipe' | 'weather' | 'strategy' | 'deeplink' | 'army' }> = {
  'Kindred':                      { color: 'bg-kindred',      hex: 'var(--color-kindred)',      animation: 'swap' },
  'Tinder':                       { color: 'bg-tinder-brand', hex: 'var(--color-tinder-brand)', animation: 'swipe' },
  'Self Employed':                 { color: 'bg-self',         hex: 'var(--color-self)',          animation: 'strategy' },
  'Branch':                       { color: 'bg-branch-brand', hex: 'var(--color-branch-brand)', animation: 'deeplink' },
  'Yahoo':                        { color: 'bg-yahoo-brand',  hex: 'var(--color-yahoo-brand)',  animation: 'weather' },
  'Taiwan Army':                   { color: 'bg-defense',      hex: 'var(--color-defense)',      animation: 'army' },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Mini animations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SwapAnimation() {
  return (
    <div className="relative flex items-center justify-center gap-5 sm:gap-7 h-28 sm:h-32">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/10 border border-white/10 animate-kindred-box-1 flex items-center justify-center">
        <Home className="text-ink-inverted" size={24} aria-hidden />
      </div>
      <div className="opacity-20">
        <ArrowLeftRight className="text-ink-inverted" size={20} aria-hidden />
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/10 border border-white/10 animate-kindred-box-2 flex items-center justify-center">
        <Home className="text-ink-inverted" size={24} aria-hidden />
      </div>
    </div>
  );
}

function TinderAnimation() {
  return (
    <div className="flex items-center justify-center h-28 sm:h-32">
      <div className="absolute w-16 h-24 sm:w-20 sm:h-28 bg-ink-inverted/5 rounded-xl border border-ink-inverted/10 rotate-3 translate-y-2" aria-hidden />
      <div className="relative w-16 h-24 sm:w-20 sm:h-28 animate-tinder-exit">
        <div className="w-full h-full bg-ink-inverted/20 rounded-xl border border-ink-inverted/40 flex items-center justify-center shadow-xl">
          <svg width="32" height="38" viewBox="0 0 30.72 35.643" aria-hidden fill="none">
            <path
              d="M9.205 14.2587a.097.097 0 01-.108-.03c-1.194-1.581-1.494-4.299-1.567-5.343-.015-.201-.241-.314-.422-.213-3.687 2.071-7.108 6.97-7.108 11.7 0 8.126 5.644 14.943 15.36 14.943 9.103 0 15.36-7.026 15.36-14.942 0-10.358-7.402-17.24-13.995-20.351a.237.237 0 00-.336.246c.849 5.582-.324 11.653-7.184 13.99z"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute top-2 inset-e-2 type-label text-positive border border-positive px-1.5 rounded rotate-12 animate-like-stamp bg-ink-inverted/10" aria-hidden>
          LIKE
        </div>
      </div>
    </div>
  );
}

function WeatherAnimation() {
  return (
    <div className="flex items-center justify-center gap-8 h-28 sm:h-32">
      <Sun className="text-sun animate-slow-spin" size={56} aria-hidden />
      <CloudSun className="text-ink-inverted/50 animate-soft-float" size={64} aria-hidden />
    </div>
  );
}

function StrategyAnimation() {
  return (
    <div className="relative flex items-center justify-center h-28">
      <div className="grid grid-cols-2 gap-2 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={clsx('w-9 h-9 rounded-lg', i % 2 === 0 ? 'bg-ink-inverted/40' : 'bg-ink-inverted/20')} />
        ))}
      </div>
      <Zap className="absolute text-ink-inverted animate-ping opacity-20" size={52} aria-hidden />
    </div>
  );
}

function ArmyAnimation() {
  return (
    <div className="relative flex items-center justify-center h-28 sm:h-32">
      {/* Radar ring */}
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10" aria-hidden />
      <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-white/5" aria-hidden />
      {/* Radar sweep */}
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 animate-army-radar origin-center" aria-hidden>
        <div
          className="absolute top-1/2 start-1/2 w-10 sm:w-12 h-px origin-left"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.6), transparent)' }}
        />
      </div>
      {/* Shield center */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <Shield className="text-ink-inverted/80" size={28} aria-hidden />
        {/* Rank pips */}
        <div className="flex gap-1.5" aria-hidden>
          {[0, 0.4, 0.8].map((delay, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60 animate-army-pip"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DeeplinkAnimation() {
  return (
    <div className="flex items-center justify-center h-28 sm:h-32">
      {/* Web box */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center animate-deeplink-web">
        <Globe className="text-ink-inverted" size={22} aria-hidden />
      </div>
      {/* Bridge with traveling dot */}
      <div className="relative flex items-center mx-3 sm:mx-4 w-12 sm:w-14">
        <div className="w-full h-px bg-white/25" />
        <div className="absolute start-0 w-2 h-2 rounded-full bg-white/80 blur-[1px] animate-deeplink-travel" />
      </div>
      {/* App box */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center animate-deeplink-app">
        <Smartphone className="text-ink-inverted" size={20} aria-hidden />
      </div>
    </div>
  );
}

const Animations = { swap: SwapAnimation, swipe: TinderAnimation, weather: WeatherAnimation, strategy: StrategyAnimation, deeplink: DeeplinkAnimation, army: ArmyAnimation };

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   JobCard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface CardData {
  id: string;
  company: string;
  role: string;
  period: string;
  locations: string[];
  logo?: string;
  desc: string;
  highlights: string[];
  projects: { name: string; desc: string; tags: string[]; smartlink?: { url: string; title: string; description?: string; thumbnail?: { url: string } | string } }[];
  stack: string[];
  talks: { title: string; url: string; thumbnail?: string }[];
  color: string;
  hex: string;
  animation: 'swap' | 'swipe' | 'weather' | 'strategy' | 'deeplink' | 'army';
}

function JobCard({
  card,
  index,
  isExpanded,
  onToggle,
}: {
  card: CardData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Animation = Animations[card.animation];
  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col gap-12">

      {/* ── MAIN ROW: blob visual | text column ─────────── */}
      <div className={clsx(
        'flex flex-col md:flex-row gap-10 sm:gap-20 items-start',
        !isEven && 'md:flex-row-reverse',
      )}>
        {/* Organic blob visual */}
        <div className="w-full md:w-1/2 group md:sticky md:top-20 md:self-start">
          <div
            className={clsx(card.color, 'aspect-square shadow-2xl p-8 sm:p-12 flex flex-col justify-center items-center overflow-hidden border border-ink-inverted/10')}
            style={{
              borderRadius: isEven
                ? '60% 35% 45% 65% / 50% 65% 35% 55%'
                : '40% 65% 55% 45% / 60% 45% 65% 50%',
            }}
          >
            <div className="w-full flex items-center justify-center"><Animation /></div>
            <div className="flex flex-col items-center justify-center gap-5 mt-2">
              {card.logo ? (
                <Image
                  src={card.logo}
                  alt={card.company}
                  width={480}
                  height={200}
                  quality={95}
                  unoptimized={card.logo.endsWith('.svg')}
                  className="h-10 sm:h-14 w-auto object-contain filter brightness-0 invert group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 200px, 320px"
                />
              ) : (
                <span className="type-heading-lg text-ink-inverted uppercase text-center opacity-85 group-hover:scale-105 transition-transform duration-500">
                  {card.company}
                </span>
              )}
              <span className="type-label-wide text-ink-inverted/70">{card.period}</span>
              {card.locations.length > 0 && (
                <span className="type-label text-ink-inverted/60 flex items-center gap-1">
                  <MapPin size={10} aria-hidden />
                  {card.locations.join(' · ')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Text column — title lives here, on the side */}
        <div className="w-full md:w-1/2 space-y-8 px-2 sm:px-4">
          <div className="space-y-4">
            <h3
              className="text-ink"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                fontStyle: 'italic',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                fontSize: 'clamp(3.6rem, 5.5vw, 7.2rem)',
              }}
            >
              {card.role}
            </h3>
            <div className="h-0.5 w-14 rounded-full" style={{ backgroundColor: card.hex }} />
          </div>

          <p className="type-body-lg border-s-2 border-ink/8 ps-6">{card.desc}</p>

          <button
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Close project details' : 'Open project details'}
            className="group/toggle flex items-center gap-2 type-label text-ink/40 hover:text-ink/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded cursor-pointer"
          >
            <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={13} aria-hidden />
            </span>
            {isExpanded ? 'collapse' : 'details'}
          </button>

          {/* ── INLINE BLOOM REVEAL ── */}
          <div className={`grid transition-all duration-1000 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
            <div className="overflow-hidden">
              <div className="space-y-14 border-t border-ink/8 pt-12 mt-4">
                {/* Projects — full width */}
                <div className="space-y-12">
                  {card.projects.map((item, i) => (
                    <div key={item.name}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="type-label text-ink/40">SECTION {String(i + 1).padStart(2, '0')}</span>
                        <div className="h-px flex-1 bg-ink/8" aria-hidden />
                      </div>
                      <h4 className="type-heading-sm text-ink mb-3">{item.name}</h4>
                      <p className="type-body-sm mb-5">{item.desc}</p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="type-label px-3 py-1 bg-ink/5 text-ink/70 rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                      {item.smartlink && (
                        <a
                          href={item.smartlink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/sm mt-5 flex items-center gap-3 p-3 rounded-xl bg-ink/3 border border-ink/8 hover:border-ink/20 hover:bg-ink/5 transition-all"
                        >
                          {item.smartlink.thumbnail && (
                            <div className="shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-ink/5">
                              <Image
                                src={typeof item.smartlink.thumbnail === 'string' ? item.smartlink.thumbnail : item.smartlink.thumbnail.url}
                                alt=""
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                                aria-hidden
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="type-label text-ink/60 group-hover/sm:text-ink transition-colors truncate">{item.smartlink.title}</span>
                              <ExternalLink size={10} className="text-ink/30 group-hover/sm:text-ink/50 shrink-0 transition-colors" aria-hidden />
                            </div>
                            {item.smartlink.description && (
                              <p className="type-caption text-ink/35 line-clamp-1 mt-0.5">{item.smartlink.description}</p>
                            )}
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Talks & Demos — subtle list */}
                {card.talks.length > 0 && (
                  <section className="space-y-5">
                    <h4 className="type-label-wide text-ink/40">Talks & Demos</h4>
                    <ul className="space-y-0 divide-y divide-ink/6">
                      {card.talks.map((talk, i) => (
                        <li key={i}>
                          <a
                            href={talk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/talk flex items-center gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
                          >
                            {/* Small thumbnail */}
                            <div className="relative shrink-0 w-16 h-10 rounded-lg overflow-hidden bg-ink/5">
                              {talk.thumbnail ? (
                                <Image src={talk.thumbnail} alt="" fill className="object-cover" sizes="64px" aria-hidden />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center" aria-hidden>
                                  <svg className="w-4 h-4 text-ink/20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                              )}
                            </div>
                            {/* Title */}
                            <span className="type-caption text-ink/50 group-hover/talk:text-ink/80 transition-colors leading-snug line-clamp-2 flex-1">{talk.title}</span>
                            {/* Arrow */}
                            <svg className="w-3.5 h-3.5 text-ink/20 group-hover/talk:text-ink/50 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Build card data from experience.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildCards(): CardData[] {
  const indexMap = new Map<string, number>();
  const result: CardData[] = [];

  experience.companies.forEach((company, rawIndex) => {
    const toProjects = (entries: typeof company.projects) =>
      entries.filter((p) => p.summary).map((p) => ({
        name: p.name,
        desc: p.summary ?? '',
        tags: p.techStack ?? [],
        smartlink: p.smartlink,
      }));

    const toTalks = (entries: typeof company.projects) =>
      entries.flatMap((p) => (p.demos ?? []).map((d) => ({ title: d.title, url: d.url, thumbnail: d.thumbnail?.url })));

    const toStack = (entries: typeof company.projects): string[] => {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const p of entries) {
        for (const t of p.techStack ?? []) {
          if (!seen.has(t)) { seen.add(t); out.push(t); }
        }
      }
      return out;
    };

    if (indexMap.has(company.name)) {
      // Merge into existing card
      const card = result[indexMap.get(company.name)!];
      card.highlights.push(...company.projects.map((p) => p.name));
      card.projects.push(...toProjects(company.projects));
      card.talks.push(...toTalks(company.projects));
      const existingStack = new Set(card.stack);
      for (const t of toStack(company.projects)) {
        if (!existingStack.has(t)) { card.stack.push(t); existingStack.add(t); }
      }
      if (company.location && !card.locations.includes(company.location)) {
        card.locations.unshift(company.location);
      }
    } else {
      indexMap.set(company.name, result.length);
      const visual = VISUAL[company.name] ?? { color: 'bg-ink', hex: 'var(--color-ink)', animation: 'strategy' as const };
      result.push({
        id: `${company.name}-${rawIndex}`,
        company: company.name,
        role: company.title ?? company.name,
        period: company.time,
        locations: company.location ? [company.location] : [],
        logo: company.logo,
        desc: company.projects[0]?.summary ?? '',
        highlights: company.projects.map((p) => p.name),
        projects: toProjects(company.projects),
        stack: toStack(company.projects),
        talks: toTalks(company.projects),
        ...visual,
      });
    }
  });

  return result;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ChronicleSection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ChronicleSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cards = buildCards();

  return (
    <section
      className="px-6 sm:px-10 lg:px-16 pb-24 sm:pb-40 max-w-7xl mx-auto"
      aria-labelledby="chronicle-heading"
    >
      {/* Heading */}
      <div className="mb-14 sm:mb-24">
        <h2
          id="chronicle-heading"
          className="type-heading-xl text-accent uppercase"
        >
          The Chronicle
        </h2>
      </div>

      {/* Cards */}
      <div className="space-y-24 sm:space-y-48">
        {cards.map((card, idx) => (
          <JobCard
            key={card.id}
            card={card}
            index={idx}
            isExpanded={expandedId === card.id}
            onToggle={() => setExpandedId((prev) => (prev === card.id ? null : card.id))}
          />
        ))}
      </div>
    </section>
  );
}
