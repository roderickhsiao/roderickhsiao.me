import type { ReactNode } from 'react';

export interface PageHeroProps {
  /** Small uppercase label rendered above the title */
  eyebrow?: string;
  /** Primary headline — pass a string or JSX for line breaks */
  title: ReactNode;
  /** Pull quote / descriptor rendered in the right column */
  description?: string;
  /**
   * CSS color value (hex, var(), etc.) used for the accent bar and
   * ambient background orb. Defaults to the site's accent variable.
   */
  accentColor?: string;
  className?: string;
}

/**
 * Abstract two-column hero layout for section landing pages.
 *
 * Left  — optional eyebrow label + large italic display headline
 * Right — optional description / pull quote
 *
 * Designed to be reused across different page sections by swapping
 * `title`, `description`, and `accentColor`.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  accentColor = 'var(--color-accent)',
  className = '',
}: PageHeroProps) {
  return (
    <header className={`relative ${className}`} style={{ viewTransitionName: 'page-hero' }}>
      {/* ── Accent bar + eyebrow — full width, above both columns ── */}
      <div
        className="w-16 h-[3px] mb-8 sm:mb-10 rounded-full"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />

      {eyebrow && (
        <p className="type-label-wide text-ink/50 mb-4">{eyebrow}</p>
      )}

      {/* ── Two-column row: h1 | description ────────────────────── */}
      {/* Both columns start at the same y so the quote border always  */}
      {/* aligns with the top of the h1 regardless of eyebrow length. */}
      <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-12 md:gap-20">
        <div className="relative z-10 flex-1">
          <h1 className="type-display text-ink whitespace-pre-line">{title}</h1>
        </div>

        {description && (
          <div className="flex-1">
            <p className="type-body-lg text-ink/50 border-s-2 border-ink/8 ps-6 sm:ps-10 py-4">
              {description}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
