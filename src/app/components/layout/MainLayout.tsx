import { ViewTransition } from 'react';
import Header from './Header';
import { navigationConfig } from '@/app/data/navigation';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

/**
 * MainLayout — full-width single-column shell.
 *
 * Slots:
 *   main    — primary page content (required)
 *   footer  — site footer (optional)
 *
 * Each page controls its own internal layout rhythm.
 * The header is fixed at the top; pages should pad their
 * own content with pt-20 sm:pt-24 to clear the nav bar.
 */
export default async function MainLayout({
  main,
  footer,
}: {
  main: ReactNode;
  footer?: ReactNode;
}) {
  const tNav = await getTranslations('nav');
  const tProfile = await getTranslations('profile');
  const links = navigationConfig.links.map((link) => ({
    href: link.href,
    label: tNav(link.key),
  }));

  return (
    <div className="relative min-h-screen flex flex-col text-ink">
      {/* ── Fixed decorative background lines ────────────── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden" aria-hidden>
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <path d="M0,1000 Q500,0 1000,1000" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0,800 Q500,-200 1000,800" fill="none" stroke="currentColor" strokeWidth="1" className="hidden sm:block" />
          <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="0.5" className="hidden lg:block" />
        </svg>
      </div>

      {/* ── Fixed navigation bar ─────────────────────────── */}
      <div className="fixed inset-s-0 inset-e-0 z-50 top-0 mt-4 px-4 sm:px-6">
        <Header
          brandName={tProfile('name')}
          brandSubtitle={tNav('brandSubtitle')}
          links={links}
        />
      </div>

      {/* ── Page content ─────────────────────────────────── */}
      <main className="flex-1 w-full">
        <ViewTransition>
          {main}
        </ViewTransition>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      {footer && <div className="w-full">{footer}</div>}
    </div>
  );
}
