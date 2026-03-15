'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, X } from 'lucide-react';
import summary from '@/app/data/summary';
import contact from '@/app/data/contact';
import ContactForm from '@/app/components/Home/ContactForm';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/app/components/layout/LanguageSwitcher';

const SOURCE_REPO = 'https://github.com/roderickhsiao/roderickhsiao.me';
const BUY_COFFEE_URL = 'https://www.buymeacoffee.com/roderickhsiao';

/* Social icon SVG paths — keyed by contact.ts icon field */
const SOCIAL_ICONS: Record<
  string,
  { viewBox: string; fill: string; stroke: string; d: string }
> = {
  linkedin: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  github: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  twitter: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
};

export default function Footer() {
  const t = useTranslations('footer');
  const tProfile = useTranslations('profile');
  const locale = useLocale();
  const calendlyLocaleParam = locale === 'zh-Hant' ? '&locale=zh-TW' : '';
  const year = new Date().getFullYear();
  const { profile } = summary;
  const [showForm, setShowForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const socialLinks = contact.filter((c) => c.icon && SOCIAL_ICONS[c.icon]);
  const calendly = contact.find((c) =>
    c.name.toLowerCase().includes('calendly'),
  );

  function startTransition(cb: () => void) {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (
        document as Document & {
          startViewTransition: (cb: () => void) => unknown;
        }
      ).startViewTransition(cb);
    } else {
      cb();
    }
  }

  return (
    <footer className="relative bg-footer-bg text-footer-text overflow-hidden mt-32">
      {/* ── Wave top edge — canvas fill carves curved page→footer boundary ── */}
      <div
        className="absolute top-0 inset-s-0 w-full overflow-hidden pointer-events-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="block w-full h-[60px] md:h-12.5 fill-canvas"
        >
          <path d="M0,0 H1200 V45 C800,5 400,85 0,45 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12">
        {/* ── Atmosphere glow ──────────────────────────── */}
        <div
          className="absolute top-1/2 inset-s-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square bg-sky/5 blur-5xl rounded-full pointer-events-none"
          aria-hidden
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20 relative">
          {/* ── Column 1: Identity + contact ─────────── */}
          <div className="space-y-12">
            {/* Avatar + name + title badge */}
            <div className="space-y-8 text-left">
              <div className="flex items-center gap-6">
                <div className="relative group w-20 h-20 shrink-0">
                  <div
                    className="absolute inset-0 bg-footer-text/10 group-hover:bg-accent/20 transition-all duration-1000"
                    style={{
                      borderRadius: '55% 45% 70% 30% / 30% 60% 40% 70%',
                    }}
                    aria-hidden
                  />
                  <Image
                    src={profile.thumbnail.url}
                    width={80}
                    height={80}
                    alt={`${tProfile('name')} profile photo`}
                    className="relative w-full h-full object-cover border border-footer-text/10 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl"
                    style={{
                      borderRadius: '55% 45% 70% 30% / 30% 60% 40% 70%',
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="type-heading-md text-footer-text">
                    {tProfile('name')}
                  </h2>
                  <span className="type-label inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent">
                    {tProfile('title')}
                  </span>
                </div>
              </div>

              {/* Contact quote */}
              <div className="relative pl-8 max-w-xl">
                <svg
                  viewBox="0 0 10 40"
                  className="absolute inset-s-0 top-0 w-2 h-full fill-none stroke-footer-text/10"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M5,0 Q10,20 5,40" strokeWidth="1.5" />
                </svg>
                <q className="type-body text-footer-text/90 leading-relaxed font-medium italic block">
                  {t.rich('quote', {
                    highlight1: (chunks) => (
                      <span className="relative inline-block mx-1 not-italic">
                        {chunks}
                        <svg
                          className="absolute -bottom-2 inset-s-0 w-full h-2 text-accent/40"
                          preserveAspectRatio="none"
                          aria-hidden
                        >
                          <path
                            d="M0,5 Q20,0 40,5 T80,5"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    ),
                    highlight2: (chunks) => (
                      <span className="relative inline-block mx-1 not-italic">
                        {chunks}
                        <svg
                          className="absolute -bottom-2 inset-s-0 w-full h-2 text-sky/40"
                          preserveAspectRatio="none"
                          aria-hidden
                        >
                          <path
                            d="M0,5 Q15,10 30,5 T60,5"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    ),
                  })}
                </q>
              </div>
            </div>

            {/* Interest tags */}
            <div className="flex flex-wrap gap-2">
              {(tProfile.raw('interests') as string[]).map((interest) => (
                <span
                  key={interest}
                  className="type-label inline-block px-3 py-1 rounded-full border border-footer-text/10 bg-footer-text/5 text-footer-text/50"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Language tags + social links */}
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-2">
              <div className="flex items-center gap-6 type-label text-footer-text/30">
                {(tProfile.raw('languages') as { flag: string; label: string }[]).map(({ flag, label }, i, arr) => (
                  <span key={label} className="flex items-center gap-6">
                    <span className="text-footer-text/60">
                      {flag} {label}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        className="w-1 h-1 bg-footer-text/10 rounded-full"
                        aria-hidden
                      />
                    )}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-8">
                {socialLinks.slice(0, 3).map((item) => {
                  const icon = SOCIAL_ICONS[item.icon!];
                  if (!icon) return null;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.name}`}
                      className="text-footer-text/40 hover:text-footer-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
                    >
                      <svg
                        viewBox={icon.viewBox}
                        fill={icon.fill}
                        stroke={icon.stroke}
                        className="w-[18px] h-[18px]"
                        aria-hidden
                      >
                        <path d={icon.d} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Organic blob action buttons */}
            <div className="flex flex-wrap gap-5 justify-start">
              {/* Message */}
              <button
                onClick={() =>
                  startTransition(() => {
                    setShowForm((v) => !v);
                    setShowCalendly(false);
                  })
                }
                aria-expanded={showForm}
                aria-controls="footer-contact-form"
                className="group relative py-4 px-10 outline-none cursor-pointer"
              >
                <div
                  className={`absolute inset-0 border transition-all duration-700 shadow-xl ${
                    showForm
                      ? 'bg-accent/20 border-accent/30 scale-105'
                      : 'bg-footer-text/10 border-footer-text/5 group-hover:scale-105 group-hover:bg-accent/20'
                  }`}
                  style={{ borderRadius: '48% 52% 55% 45% / 42% 58% 40% 60%' }}
                  aria-hidden
                />
                <div className="relative flex items-center gap-3 type-label text-footer-text whitespace-nowrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 shrink-0 transition-colors ${showForm ? 'text-accent' : 'text-accent'}`}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{t('messageButton')}</span>
                  {showForm && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent ml-1"
                      aria-hidden
                    />
                  )}
                </div>
              </button>

              {/* Book a Call */}
              {calendly && (
                <button
                  onClick={() =>
                    startTransition(() => {
                      setShowCalendly((v) => !v);
                      setShowForm(false);
                    })
                  }
                  aria-expanded={showCalendly}
                  aria-controls="footer-calendly"
                  className="group relative py-4 px-10 outline-none cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 border transition-all duration-700 ${
                      showCalendly
                        ? 'bg-sky/20 border-sky/30 scale-105'
                        : 'bg-footer-text/5 border-footer-text/10 group-hover:scale-105 group-hover:bg-sky/20'
                    }`}
                    style={{
                      borderRadius: '55% 45% 42% 58% / 58% 42% 60% 40%',
                    }}
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-3 type-label text-footer-text whitespace-nowrap">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-sky shrink-0"
                      aria-hidden
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{t('bookCallButton')}</span>
                    {showCalendly && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-sky ml-1"
                        aria-hidden
                      />
                    )}
                  </div>
                </button>
              )}

              {/* Support */}
              <a
                href={BUY_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('supportAriaLabel')}
                className="group relative py-4 px-10 outline-none opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                style={{ borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%' }}
              >
                <div
                  className="absolute inset-0 bg-footer-text/5 border border-footer-text/10 group-hover:scale-105 transition-all duration-700"
                  style={{ borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%' }}
                  aria-hidden
                />
                <div className="relative flex items-center gap-3 type-label text-footer-text whitespace-nowrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-footer-text/40 shrink-0"
                    aria-hidden
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="m2 8 20 0" />
                    <path d="M5 8v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
                    <rect x="7" y="2" width="2" height="4" />
                    <rect x="11" y="2" width="2" height="4" />
                  </svg>
                  <span>{t('supportButton')}</span>
                </div>
              </a>
            </div>
          </div>

          {/* ── Column 2: Actions + notes ─────────────── */}
          <div className="relative flex flex-col space-y-10 items-start lg:pl-20">
            {/* Decorative parabolic line (desktop only) */}
            <svg
              viewBox="0 0 40 400"
              className="absolute inset-s-0 top-0 h-full w-10 hidden lg:block opacity-[0.05] pointer-events-none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M30,0 Q0,200 30,400"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>

            <div className="space-y-10 w-full">
              {/* Source link */}
              <div className="flex items-center gap-5 group cursor-pointer w-fit opacity-40 hover:opacity-100 transition-all duration-500">
                <svg
                  width="30"
                  height="2"
                  className="stroke-footer-text/50 group-hover:stroke-accent transition-colors duration-500"
                  aria-hidden
                >
                  <path d="M0,1 Q15,0 30,1" fill="none" strokeWidth="2" />
                </svg>
                <a
                  href={SOURCE_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label text-footer-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
                >
                  {t('sourceLink')}
                </a>
              </div>
            </div>

            {/* Site notes */}
            <div className="type-body-sm text-footer-text/50 space-y-4 not-italic">
              <p className="text-footer-text/80 leading-relaxed">
                {t('siteNote')}
              </p>
              <p
                className="type-label text-footer-text/40 cursor-help"
                title={t('devNoteTitle')}
              >
                {t('devNote')}
              </p>
              <p
                className="text-[9px] text-footer-text/[0.04] hover:text-footer-text/30 transition-opacity duration-700 select-none cursor-default leading-relaxed"
                aria-hidden
              >
                {t('easterEgg')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Floating chat widget — outer div always in DOM for view transitions ── */}
        <div
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:inset-e-6 sm:bottom-6 sm:w-96 pointer-events-none"
          style={{ viewTransitionName: 'footer-widget' } as React.CSSProperties}
          aria-live="polite"
        >
          {(showForm || (showCalendly && calendly)) && (
            <div
              className="pointer-events-auto flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-footer-text/20 bg-footer-bg"
              style={
                {
                  maxHeight: 'min(88vh, 680px)',
                  animation:
                    'footer-widget-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                } as React.CSSProperties
              }
              role="dialog"
              aria-modal="true"
              aria-label={
                showForm ? t('contactDialogLabel') : t('calendlyDialogLabel')
              }
            >
              {/* Widget header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-footer-text/10 shrink-0 bg-footer-bg">
                <span className="type-label text-footer-text/80">
                  {showForm ? t('widgetMessageTitle') : t('widgetCallTitle')}
                </span>
                <button
                  onClick={() =>
                    startTransition(() => {
                      setShowForm(false);
                      setShowCalendly(false);
                    })
                  }
                  aria-label={t('widgetClose')}
                  className="text-footer-text/40 hover:text-footer-text transition-colors rounded p-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Widget content */}
              <div className="overflow-y-auto flex-1">
                {showForm && (
                  <div
                    className="p-6"
                    style={
                      {
                        '--color-ink': 'var(--color-footer-text)',
                        '--color-ink-inverted': 'var(--color-footer-bg)',
                        '--color-surface':
                          'color-mix(in srgb, var(--color-footer-text) 12%, transparent)',
                        '--color-surface-muted':
                          'color-mix(in srgb, var(--color-footer-text) 8%, transparent)',
                      } as React.CSSProperties
                    }
                  >
                    <ContactForm />
                  </div>
                )}
                {showCalendly && calendly && (
                  <iframe
                    src={`${calendly.url}?hide_event_type_details=1&hide_gdpr_banner=1${calendlyLocaleParam}`}
                    width="100%"
                    height="580"
                    title="Book a call with Roderick Hsiao"
                    loading="lazy"
                    className="block"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom ledger bar ─────────────────────── */}
        <div className="relative pt-12 type-label text-footer-text/30">
          <svg
            viewBox="0 0 1200 20"
            className="absolute top-0 inset-s-0 w-full h-4 fill-none stroke-footer-text/5 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,15 C300,5 600,25 900,5 C1050,15 1200,5 1200,15"
              strokeWidth="1"
            />
          </svg>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
              <span className="text-footer-text/60 whitespace-nowrap">
                &copy; {year} {t('copyrightName')}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart
                    size={14}
                    className="text-sky/50 fill-sky/30"
                    aria-hidden
                  />
                  <span className="opacity-60">{t('heritage')}</span>
                </div>
                <span
                  className="w-1 h-1 bg-footer-text/10 rounded-full"
                  aria-hidden
                />
                <div className="flex items-center gap-2 text-footer-text/40 normal-case tracking-normal">
                  <Sparkles size={12} className="text-accent/60" aria-hidden />
                  <span>{t('crafted')}</span>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
            <div className="flex items-center gap-4 text-footer-text/20">
              {(t.raw('residencyLocations') as string[]).map((loc, i, arr) => (
                <span key={loc} className="flex items-center gap-4">
                  <span>* {loc}</span>
                  {i < arr.length - 1 && (
                    <span
                      className="w-1 h-1 bg-footer-text/10 rounded-full"
                      aria-hidden
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
