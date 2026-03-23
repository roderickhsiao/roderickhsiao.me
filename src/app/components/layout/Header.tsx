'use client';
import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import type { ComponentProps, ReactElement } from 'react';

interface NavigationLink {
  href: string;
  label: string;
  isButton?: boolean;
}

interface HeaderProps {
  brandName: string;
  brandSubtitle: string;
  links: NavigationLink[];
}

const NAV_TRANSITION_TYPES = ['site-nav'];

type LinkPropsWithTransitionTypes = ComponentProps<typeof Link> & {
  transitionTypes?: string[];
};

const RoutedLink = Link as unknown as (props: LinkPropsWithTransitionTypes) => ReactElement;

export default function Header({ brandName, brandSubtitle, links }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavPendingRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const isNewPath = prevPathnameRef.current !== pathname;
    if (isNewPath && mobileNavPendingRef.current) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });

      mobileNavPendingRef.current = false;
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  const handleMobileNavClick = () => {
    mobileNavPendingRef.current = true;
    setMobileOpen(false);
  };

  return (
    <div className="relative">
      {/* ── Main bar ──────────────────────────────────────── */}
      <header className="glass-nav relative rounded-full z-50 overflow-visible">
        <nav
          className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <RoutedLink
              href="/"
              transitionTypes={NAV_TRANSITION_TYPES}
              className="type-nav-brand text-ink hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 rounded"
              aria-current={isActive('/') ? 'page' : undefined}
            >
              {brandName}
            </RoutedLink>
            <span className="hidden sm:block w-px h-4 bg-ink/15" aria-hidden />
            <span className="hidden sm:block type-label text-ink/70 max-w-[14rem] wrap-anywhere hyphens-auto">
              {brandSubtitle}
            </span>
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <RoutedLink
                    href={link.href}
                    transitionTypes={NAV_TRANSITION_TYPES}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(
                      'relative inline-flex items-center type-label px-4 py-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
                      active ? 'text-ink-inverted' : 'text-ink/70 hover:text-ink hover:bg-ink/5',
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        // shared view-transition-name so the browser slides the pill between routes
                        style={{ viewTransitionName: 'nav-pill' }}
                        className="absolute inset-0 rounded-full bg-ink shadow-sm"
                      />
                    )}
                    <span
                      className="relative z-10"
                      // unique name per link — browser captures old/new color state and cross-fades
                      style={{ viewTransitionName: `nav-label-${link.href.replace(/\//g, '') || 'home'}` }}
                    >
                      {link.label}
                    </span>
                  </RoutedLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-full text-ink/70 hover:text-ink hover:bg-ink/5 touch-manipulation transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            type="button"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Mobile dropdown ───────────────────────────────── */}
      {mobileOpen && (
        <div className="glass-nav md:hidden absolute top-full inset-s-0 inset-e-0 mt-2 rounded-2xl z-50 overflow-hidden">
          <ul className="px-3 py-3 space-y-1" role="list">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <RoutedLink
                    href={link.href}
                    transitionTypes={NAV_TRANSITION_TYPES}
                    scroll={false}
                    aria-current={active ? 'page' : undefined}
                    onClick={handleMobileNavClick}
                    className={clsx(
                      'type-label block px-4 py-3 rounded-xl touch-manipulation transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
                      active
                        ? 'bg-ink text-ink-inverted'
                        : 'text-ink/70 hover:text-ink hover:bg-ink/5',
                    )}
                  >
                    {link.label}
                  </RoutedLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
