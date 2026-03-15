'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import summary from '@/app/data/summary';
import contact from '@/app/data/contact';
import ContactForm from './ContactForm';

/* ── Sub-components ───────────────────────────────────── */

function Tag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx('type-label inline-block px-4 py-1.5 rounded-full', className)}>
      {children}
    </span>
  );
}

/* Social icon paths */
const SOCIAL_ICONS: Record<string, { viewBox: string; fill: string; stroke: string; d: string }> = {
  linkedin: {
    viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'none',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  github: {
    viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'none',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  twitter: {
    viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'none',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
};

/* ── Main export ──────────────────────────────────────── */

export default function HeroSection() {
  const [showForm, setShowForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const { profile } = summary;

  const socialLinks = contact.filter((c) => !c.name.toLowerCase().includes('calendly'));
  const calendly = contact.find((c) => c.name.toLowerCase().includes('calendly'));

  return (
    <div className="pb-16 sm:pb-24 space-y-8">

      {/* Avatar + role tag */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-2 border-surface shadow-2xl -rotate-3 hover:rotate-0 transition-all duration-700 shrink-0">
          <Image
            src={profile.thumbnail.url}
            width={80}
            height={80}
            alt={`${profile.name} profile photo`}
            className="w-full h-full object-cover"
            priority
            quality={90}
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>
        <Tag className="bg-accent/8 text-accent border border-accent/15">
          {profile.title}
        </Tag>
      </div>

      {/* ── Contact / CTA ────────────────────────────────── */}
      <div className="space-y-8">

          {/* Quote */}
          <p className="type-body-lg max-w-2xl text-ink">
            "Drop me a message to chat about{' '}
            <span className="text-accent underline decoration-wavy decoration-accent/25 underline-offset-8">
              web ideas
            </span>
            , cool projects, or even{' '}
            <span className="text-sky underline decoration-wavy decoration-sky/25 underline-offset-8">
              house music
            </span>
            ."
          </p>

          {/* Lang tags + social */}
          <div className="flex flex-wrap items-center gap-3">
            <Tag className="bg-ink/5 text-ink/70">🇺🇸 English</Tag>
            <Tag className="bg-ink/5 text-ink/70">🇹🇼 Mandarin</Tag>

            <div className="flex items-center gap-4 ms-4 border-s border-ink/10 ps-6">
              {socialLinks.slice(0, 3).map((item) => {
                const icon = SOCIAL_ICONS[item.icon];
                if (!icon) return null;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${item.name}`}
                    className="text-ink/50 hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 rounded"
                  >
                    <svg viewBox={icon.viewBox} fill={icon.fill} stroke={icon.stroke} className="w-5 h-5" aria-hidden>
                      <path d={icon.d} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA buttons — always side by side */}
          <div className="flex flex-row gap-3 flex-wrap">
            <button
              onClick={() => { setShowForm((v) => !v); setShowCalendly(false); }}
              aria-expanded={showForm}
              aria-controls="contact-form-panel"
              className="type-label bg-ink text-ink-inverted py-4 px-6 rounded-full hover:bg-accent transition-colors duration-200 shadow-lg flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {showForm ? 'Close' : 'Message'}
            </button>

            {calendly && (
              <button
                onClick={() => { setShowCalendly((v) => !v); setShowForm(false); }}
                aria-expanded={showCalendly}
                aria-controls="calendly-panel"
                className="type-label bg-surface border border-ink/10 text-ink py-4 px-6 rounded-full hover:border-accent transition-colors duration-200 shadow-sm flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {showCalendly ? 'Close' : 'Book a call'}
              </button>
            )}
          </div>

          {/* Expandable contact form */}
          {showForm && (
            <div
              id="contact-form-panel"
              className="animate-expand bg-surface/70 backdrop-blur-2xl border border-ink/6 rounded-3xl p-6 sm:p-10 max-w-xl shadow-xl"
            >
              <ContactForm />
            </div>
          )}

          {/* Inline Calendly embed */}
          {showCalendly && calendly && (
            <div
              id="calendly-panel"
              className="animate-expand bg-surface/70 backdrop-blur-2xl border border-ink/6 rounded-3xl overflow-hidden shadow-xl max-w-xl"
            >
              <iframe
                src={`${calendly.url}?hide_event_type_details=1&hide_gdpr_banner=1`}
                width="100%"
                height="600"
                title="Book a call with Roderick Hsiao"
                loading="lazy"
                className="block"
              />
            </div>
          )}
      </div>
    </div>
  );
}
