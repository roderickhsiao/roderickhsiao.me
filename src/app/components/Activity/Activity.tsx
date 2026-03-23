'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import activities, { type ActivityItem } from '../../data/activity';
import speaking, { type SpeakingItem } from '../../data/speaking';
import TimelineRow from '../shared/TimelineRow';
import { useTranslations } from 'next-intl';

type ViewTransitionCapableDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => { finished?: Promise<void> };
};

type CommunityText = {
  name: string;
  org: string;
  summary: string;
};

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-6">
      <p className="type-label-wide shrink-0 text-ink/40">{label}</p>
      <div className="h-px flex-1 bg-ink/8" aria-hidden />
    </div>
  );
}

function TalkCard({
  talk,
  isActive,
  onOpen,
  showSourceSnapshot,
}: {
  talk: SpeakingItem;
  isActive: boolean;
  onOpen: (talkId: string) => void;
  showSourceSnapshot: (talkId: string) => boolean;
}) {
  const t = useTranslations('activity.ui');
  const hasVideo = !!talk.embedUrl;
  const isYouTubeSource = /youtube\.com|youtu\.be/i.test(talk.sourceUrl)
    || /watch on youtube/i.test(talk.sourceLabel);

  return (
    <article
      className={clsx(
        'rounded-[26px] transition-colors duration-200',
        isActive
          ? 'bg-white/94 shadow-[0_10px_30px_-20px_rgba(3,10,22,0.5)]'
          : 'bg-white/74 hover:bg-white/88'
      )}
      style={{ viewTransitionName: hasVideo && showSourceSnapshot(talk.id) ? 'talk-card' : undefined }}
    >
      {hasVideo ? (
        <button
          type="button"
          onClick={() => onOpen(talk.id)}
          className="group flex h-full w-full flex-col gap-3 rounded-[26px] p-2.5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          aria-expanded={isActive}
          aria-label={t('playVideo', { title: talk.title })}
        >
          <div
            className="relative aspect-video overflow-hidden rounded-[18px] bg-surface-muted/70"
            style={{ viewTransitionName: showSourceSnapshot(talk.id) ? 'talk-media' : undefined }}
          >
            <Image
              src={talk.thumbnail.url}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              aria-hidden
            />
            <span className="pointer-events-none absolute inline-end-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-footer-bg/48 text-ink-inverted/86 backdrop-blur-sm">
              <svg className="h-2.5 w-2.5 translate-x-px" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>

          <div className="min-w-0 space-y-2 px-1 pb-1">
            <p
              className="type-label text-accent/80"
              style={{ viewTransitionName: showSourceSnapshot(talk.id) ? 'talk-meta' : undefined }}
            >
              {talk.event} · {talk.year}
            </p>
            <h3
              className="type-heading-sm text-ink transition-colors group-hover:text-accent-hover"
              style={{ viewTransitionName: showSourceSnapshot(talk.id) ? 'talk-title' : undefined }}
            >
              {talk.title}
            </h3>
            {!isYouTubeSource && <p className="type-caption text-ink/60">{talk.sourceLabel}</p>}
          </div>
        </button>
      ) : (
        <a
          href={talk.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full w-full flex-col gap-3 rounded-[26px] p-2.5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          aria-label={t('openSource', { title: talk.title })}
        >
          <div className="relative aspect-video overflow-hidden rounded-[18px] bg-surface-muted/70">
            <Image
              src={talk.thumbnail.url}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              aria-hidden
            />
          </div>

          <div className="min-w-0 space-y-2 px-1 pb-1">
            <p className="type-label text-accent/80">{talk.event} · {talk.year}</p>
            <h3 className="type-heading-sm text-ink transition-colors group-hover:text-accent-hover">{talk.title}</h3>
            {!isYouTubeSource && <p className="type-caption text-ink/60">{talk.sourceLabel}</p>}
          </div>
        </a>
      )}
    </article>
  );
}

function PlaylistItem({
  talk,
  index,
  isActive,
  onSelect,
}: {
  talk: SpeakingItem;
  index: number;
  isActive: boolean;
  onSelect: (talkId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(talk.id)}
      className={clsx(
        'group flex w-full items-start gap-3 rounded-2xl border px-2.5 py-2.5 text-start transition-colors',
        isActive
          ? 'border-accent/40 bg-accent/14 shadow-[0_8px_22px_-16px_rgba(230,126,34,0.85)]'
          : 'border-ink-inverted/10 bg-transparent hover:border-ink-inverted/18 hover:bg-ink-inverted/7'
      )}
      aria-current={isActive ? 'true' : undefined}
    >
      <div
        className={clsx(
          'relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border',
          isActive ? 'border-accent/36' : 'border-ink-inverted/12'
        )}
      >
        <Image
          src={talk.thumbnail.url}
          alt=""
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="96px"
          aria-hidden
        />
        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-footer-bg/44 via-transparent to-transparent" />
        {isActive && (
          <span className="pointer-events-none absolute bottom-1.5 inset-s-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-accent/40 bg-footer-bg/74 text-accent">
            <svg className="h-2.5 w-2.5 translate-x-px" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </div>

      <span className={clsx('type-label mt-0.5 shrink-0', isActive ? 'text-accent' : 'text-ink-inverted/40')}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="min-w-0">
        <span className={clsx('type-label block', isActive ? 'text-accent' : 'text-ink-inverted/50')}>
          {talk.event} · {talk.year}
        </span>
        <span className={clsx('type-caption mt-1 block leading-snug', isActive ? 'text-ink-inverted' : 'text-ink-inverted/78')}>
          {talk.title}
        </span>
      </span>

      <span className="ms-auto mt-1.5 text-ink-inverted/30 transition-colors group-hover:text-ink-inverted/58" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

function TalkStage({
  talk,
  videoItems,
  videoReady,
  showTargetSnapshot,
  onClose,
  onSelect,
  onVideoReady,
}: {
  talk: SpeakingItem;
  videoItems: SpeakingItem[];
  videoReady: boolean;
  showTargetSnapshot: (talkId: string) => boolean;
  onClose: () => void;
  onSelect: (talkId: string) => void;
  onVideoReady: () => void;
}) {
  const t = useTranslations('activity.ui');
  const isYouTubeSource = /youtube\.com|youtu\.be/i.test(talk.sourceUrl);

  return (
    <>
      <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute start-0 top-0 h-72 w-72 -translate-x-1/3 translate-y-8 rounded-full bg-accent/14 blur-3xl motion-safe:animate-soft-float" />
        <div className="absolute end-0 bottom-0 h-72 w-72 translate-x-1/4 -translate-y-8 rounded-full bg-sky/16 blur-3xl motion-safe:animate-soft-float [animation-delay:1.3s]" />
      </div>

      <button
        type="button"
        aria-label={t('closeActiveTalk')}
        onClick={onClose}
        className="fixed inset-0 z-30 bg-footer-bg/72 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="fixed inset-0 z-40 px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28 lg:px-10 lg:pb-10 pointer-events-none">
        <div
          className="pointer-events-auto relative isolate mx-auto flex max-h-full w-full max-w-7xl flex-col overflow-y-auto rounded-2xl border border-ink-inverted/10 bg-footer-bg/94 shadow-2xl lg:h-full lg:overflow-hidden"
          style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-card' : undefined }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_32%,transparent_68%,rgba(255,255,255,0.06))]" />
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 0.6px, transparent 0.6px)',
                backgroundSize: '3px 3px',
              }}
            />
          </div>

          <div className="flex items-start justify-between gap-6 border-b border-ink-inverted/10 px-4 py-4 sm:px-6 sm:py-5">
            <div key={`stage-heading-${talk.id}`} className="min-w-0 motion-safe:animate-talk-stage-fade">
              <p className="type-label-wide text-ink-inverted/45">{talk.event} · {talk.year}</p>
              <h3
                className="type-heading-sm mt-2 text-ink-inverted"
                style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-title' : undefined }}
              >
                {talk.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-inverted/16 bg-ink-inverted/8 text-ink-inverted transition-colors hover:bg-ink-inverted/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-inverted/35"
              aria-label={t('closeVideo')}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_34rem] xl:grid-cols-[minmax(0,1fr)_38rem]">
            <div className="flex flex-col border-b border-ink-inverted/10 lg:min-h-0 lg:border-b-0 lg:border-e lg:border-ink-inverted/10">
              <div key={`stage-media-${talk.id}`} className="motion-safe:animate-talk-stage-fade px-4 pt-4 sm:px-6 sm:pt-6">
                {talk.embedUrl ? (
                  <div
                    className={clsx(
                      'relative h-[min(56.25vw,42dvh)] w-full overflow-hidden rounded-[22px] border border-ink-inverted/14 bg-black/30 shadow-[0_22px_44px_-26px_rgba(0,0,0,0.9)] transition-opacity duration-300 sm:h-[min(56.25vw,48dvh)] lg:h-auto lg:aspect-video',
                      videoReady ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-media' : undefined }}
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-ink-inverted/12 to-transparent" aria-hidden />
                    <iframe
                      src={talk.embedUrl}
                      title={talk.title}
                      className="h-full w-full bg-black"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      onLoad={onVideoReady}
                    />
                  </div>
                ) : (
                  <div
                    className="relative h-[min(56.25vw,42dvh)] w-full overflow-hidden rounded-[22px] border border-ink-inverted/14 bg-black/30 shadow-[0_22px_44px_-26px_rgba(0,0,0,0.9)] sm:h-[min(56.25vw,48dvh)] lg:h-auto lg:aspect-video"
                    style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-media' : undefined }}
                  >
                    <Image
                      src={talk.thumbnail.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 860px, (min-width: 1024px) 62vw, 100vw"
                      aria-hidden
                    />
                  </div>
                )}
              </div>

              {!isYouTubeSource && (
                <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
                  <div key={`stage-action-${talk.id}`} className="motion-safe:animate-talk-stage-fade">
                    <a
                      href={talk.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 type-label text-accent transition-colors hover:bg-accent/16"
                    >
                      {talk.sourceLabel}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <aside className="flex min-h-0 flex-col bg-ink-inverted/4">
              <div className="border-b border-ink-inverted/10 px-4 py-4 sm:px-5 sm:py-5">
                <p className="type-label-wide text-ink-inverted/45">{t('playlist')}</p>
                <p className="type-caption mt-2 text-ink-inverted/70">
                  {t('playlistHint')}
                </p>
              </div>

              <div className="min-h-0 overflow-y-auto p-3 sm:p-4">
                <div className="space-y-2">
                  {videoItems.map((entry, index) => (
                    <PlaylistItem
                      key={entry.id}
                      talk={entry}
                      index={index}
                      isActive={entry.id === talk.id}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Activity() {
  const t = useTranslations('activity');
  const [activeTalkId, setActiveTalkId] = useState<string | null>(null);
  const [transitionTalkId, setTransitionTalkId] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const speakingItems = speaking as SpeakingItem[];
  const videoSpeakingItems = speakingItems.filter((talk) => !!talk.embedUrl);
  const activeTalk = activeTalkId ? videoSpeakingItems.find((talk) => talk.id === activeTalkId) ?? null : null;

  const setActiveTalkWithTransition = useCallback((nextId: string | null) => {
    const transitionId = nextId ?? activeTalkId;

    const transitionDocument = document as ViewTransitionCapableDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (transitionDocument.startViewTransition && !reduceMotion) {
      flushSync(() => {
        setTransitionTalkId(transitionId);
      });

      const transition = transitionDocument.startViewTransition(() => {
        flushSync(() => {
          setActiveTalkId(nextId);
        });
      });

      Promise.resolve(transition.finished)
        .catch(() => undefined)
        .finally(() => {
          setTransitionTalkId(null);
        });

      return;
    }

    setTransitionTalkId(transitionId);
    setActiveTalkId(nextId);
    setTransitionTalkId(null);
  }, [activeTalkId]);

  useEffect(() => {
    setVideoReady(false);
  }, [activeTalkId]);

  useEffect(() => {
    if (activeTalkId === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeTalkId]);

  useEffect(() => {
    if (activeTalkId === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveTalkWithTransition(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeTalkId, setActiveTalkWithTransition]);

  const showSourceSnapshot = (talkId: string) => transitionTalkId === talkId && activeTalkId !== talkId;
  const showTargetSnapshot = (talkId: string) => transitionTalkId === talkId && activeTalkId === talkId;
  const selectTalkInStage = useCallback((nextId: string) => {
    if (nextId === activeTalkId) return;
    setTransitionTalkId(null);
    setVideoReady(false);
    setActiveTalkId(nextId);
  }, [activeTalkId]);

  return (
    <section className="relative">
      {activeTalk && (
        <TalkStage
          talk={activeTalk}
          videoItems={videoSpeakingItems}
          videoReady={videoReady}
          showTargetSnapshot={showTargetSnapshot}
          onClose={() => setActiveTalkWithTransition(null)}
          onSelect={selectTalkInStage}
          onVideoReady={() => setVideoReady(true)}
        />
      )}

      <div className="space-y-20">
        <div>
          <SectionHeader label={t('speaking')} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {speakingItems.map((talk) => (
              <TalkCard
                key={talk.id}
                talk={talk}
                isActive={activeTalkId === talk.id}
                onOpen={setActiveTalkWithTransition}
                showSourceSnapshot={showSourceSnapshot}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader label={t('community')} />

          <div>
            {activities.map((item, index) => {
              const text = t.raw(`items.${item.key}`) as CommunityText;

              return (
                <TimelineRow
                  key={`${item.key}-${index}`}
                  period={item.year.replace(/^\s*-\s*/, '').trim()}
                  meta={text.org}
                  title={text.name}
                  description={text.summary}
                  href={item.smartlink?.url}
                  thumbnail={item.smartlink?.thumbnail ?? item.thumbnail}
                  isLast={index === activities.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
