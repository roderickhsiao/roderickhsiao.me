'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import activities, { type ActivityItem } from '../../data/activity';
import speaking, { type SpeakingItem } from '../../data/speaking';
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
  return (
    <article
      className={clsx(
        'rounded-2xl border bg-surface/74 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300',
        isActive
          ? 'border-accent/25 bg-surface/88'
          : 'border-ink/8 hover:border-ink/12 hover:bg-surface'
      )}
      style={{ viewTransitionName: showSourceSnapshot(talk.id) ? 'talk-card' : undefined }}
    >
      <button
        type="button"
        onClick={() => onOpen(talk.id)}
        className="group flex w-full flex-col gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        aria-expanded={isActive}
        aria-label={`Play video: ${talk.title}`}
      >
        <div
          className="relative aspect-video overflow-hidden rounded-xl border border-ink/8 bg-surface-muted"
          style={{ viewTransitionName: showSourceSnapshot(talk.id) ? 'talk-media' : undefined }}
        >
          <Image
            src={talk.thumbnail.url}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center bg-footer-bg/0 transition-colors group-hover:bg-footer-bg/18">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-inverted/18 bg-footer-bg/58 text-ink-inverted transition-transform duration-300 group-hover:scale-105">
              <svg className="h-4 w-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
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
          <p className="type-caption text-ink/60">{talk.sourceLabel}</p>
        </div>
      </button>
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
        'group flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors',
        isActive
          ? 'border-accent/40 bg-accent/12'
          : 'border-ink-inverted/10 bg-transparent hover:border-ink-inverted/18 hover:bg-ink-inverted/7'
      )}
      aria-current={isActive ? 'true' : undefined}
    >
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
    </button>
  );
}

function TalkStage({
  talk,
  speakingItems,
  videoReady,
  showTargetSnapshot,
  onClose,
  onSelect,
  onVideoReady,
}: {
  talk: SpeakingItem;
  speakingItems: SpeakingItem[];
  videoReady: boolean;
  showTargetSnapshot: (talkId: string) => boolean;
  onClose: () => void;
  onSelect: (talkId: string) => void;
  onVideoReady: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close active talk"
        onClick={onClose}
        className="fixed inset-0 z-30 bg-footer-bg/76 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="fixed inset-0 z-40 px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28 lg:px-10 lg:pb-10 pointer-events-none">
        <div
          className="pointer-events-auto mx-auto flex max-h-full w-full max-w-7xl flex-col overflow-y-auto rounded-2xl border border-ink-inverted/10 bg-footer-bg/94 shadow-2xl lg:h-full lg:overflow-hidden"
          style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-card' : undefined }}
        >
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
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_34rem] xl:grid-cols-[minmax(0,1fr)_38rem]">
            <div className="flex flex-col border-b border-ink-inverted/10 lg:min-h-0 lg:border-b-0 lg:border-r lg:border-ink-inverted/10">
              <div key={`stage-media-${talk.id}`} className="motion-safe:animate-talk-stage-fade px-4 pt-4 sm:px-6 sm:pt-6">
                {talk.embedUrl ? (
                  <div
                    className={clsx(
                      'h-[min(56.25vw,42dvh)] w-full overflow-hidden rounded-2xl border border-ink-inverted/10 bg-footer-bg transition-opacity duration-300 sm:h-[min(56.25vw,48dvh)] lg:h-auto lg:aspect-video',
                      videoReady ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{ viewTransitionName: showTargetSnapshot(talk.id) ? 'talk-media' : undefined }}
                  >
                    <iframe
                      src={talk.embedUrl}
                      title={talk.title}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      onLoad={onVideoReady}
                    />
                  </div>
                ) : (
                  <div
                    className="relative h-[min(56.25vw,42dvh)] w-full overflow-hidden rounded-2xl border border-ink-inverted/10 bg-footer-bg sm:h-[min(56.25vw,48dvh)] lg:h-auto lg:aspect-video"
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
            </div>

            <aside className="flex min-h-0 flex-col bg-ink-inverted/4">
              <div className="border-b border-ink-inverted/10 px-4 py-4 sm:px-5 sm:py-5">
                <p className="type-label-wide text-ink-inverted/45">Playlist</p>
                <p className="type-caption mt-2 text-ink-inverted/70">
                  Select another talk without replaying the full stage morph.
                </p>
              </div>

              <div className="min-h-0 overflow-y-auto p-3 sm:p-4">
                <div className="space-y-2">
                  {speakingItems.map((entry, index) => (
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

function CommunityCard({ item, text }: { item: ActivityItem; text: CommunityText }) {
  const hasLink = !!item.smartlink?.url;
  const Wrapper = hasLink ? 'a' : 'div';
  const wrapperProps = hasLink
    ? ({ href: item.smartlink!.url, target: '_blank', rel: 'noopener noreferrer' } as React.AnchorHTMLAttributes<HTMLAnchorElement>)
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, unknown>)}
      className={clsx(
        'group flex items-start gap-4 rounded-xl border border-ink/8 bg-surface/72 p-5 shadow-sm backdrop-blur-sm transition-colors duration-200',
        hasLink && 'cursor-pointer hover:border-ink/12 hover:bg-surface'
      )}
    >
      {item.smartlink?.thumbnail && (
        <div className="relative z-10 h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink/8 bg-surface-muted sm:h-14 sm:w-14">
          <Image
            src={item.smartlink.thumbnail.url}
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
            aria-hidden
            loading="lazy"
          />
        </div>
      )}

      <div className="relative z-10 min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h4 className={clsx('type-caption leading-tight text-ink', hasLink && 'transition-colors group-hover:text-accent-hover')}>{text.name}</h4>
          <span className="type-label mt-0.5 shrink-0 text-ink/30">{item.year}</span>
        </div>
        <p className="type-label mb-2 text-ink/50">{text.org}</p>
        <p className="type-body-sm text-ink/60 leading-relaxed">{text.summary}</p>
      </div>

      {hasLink && (
        <svg className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 text-ink/20 transition-colors group-hover:text-accent-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Wrapper>
  );
}

export default function Activity() {
  const t = useTranslations('activity');
  const [activeTalkId, setActiveTalkId] = useState<string | null>(null);
  const [transitionTalkId, setTransitionTalkId] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const speakingItems = speaking as SpeakingItem[];
  const activeTalk = activeTalkId ? speakingItems.find((talk) => talk.id === activeTalkId) ?? null : null;

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
          speakingItems={speakingItems}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activities.map((item, index) => (
              <CommunityCard
                key={`${item.key}-${index}`}
                item={item}
                text={t.raw(`items.${item.key}`) as CommunityText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
