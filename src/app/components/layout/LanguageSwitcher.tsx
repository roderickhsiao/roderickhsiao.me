'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { ChevronUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import clsx from 'clsx';
import { formatDisplayName } from '@/app/utils/getDisplayNames';

type AppLocale = (typeof routing.locales)[number];

function getLocaleRegion(code: string): string {
  try {
    const locale = new Intl.Locale(code).maximize();
    return locale.region?.toLowerCase() ?? '';
  } catch {
    return '';
  }
}

function buildLocaleMeta(code: AppLocale) {
  return {
    native: formatDisplayName(code, code, 'language'),
    countryCode: getLocaleRegion(code),
  };
}

function getFlagSrc(countryCode: string, width: 40 | 80 = 40): string {
  return `https://flagcdn.com/w${width}/${countryCode}.png`;
}

function FlagBadge({ countryCode, fallback, alt }: { countryCode: string; fallback: string; alt: string }) {
  if (!countryCode) {
    return <span>{fallback}</span>;
  }

  return (
    <Image
      src={getFlagSrc(countryCode)}
      alt={alt}
      width={20}
      height={15}
      className="h-[15px] w-5 rounded-[3px] object-cover"
    />
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations('footer.languageSwitcher');
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locales = routing.locales as readonly AppLocale[];

  const localeItems = useMemo(() => {
    return locales.map((code) => {
      return {
        code,
        ...buildLocaleMeta(code),
      };
    });
  }, [locales]);

  const active = localeItems.find((entry) => entry.code === locale) ?? localeItems[0];

  const handleSwitch = (next: AppLocale) => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative" aria-label={t('ariaLabel')}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center justify-between gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-footer-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-footer-text/75">
            <FlagBadge countryCode={active.countryCode} fallback={active.native.slice(0, 2)} alt={`${active.native} flag`} />
          </span>
          <span className="min-w-0 pe-0.5">
            <span className="block type-label text-footer-text/85 leading-none">{active.native}</span>
          </span>
        </span>
        <ChevronUp className={clsx('h-3 w-3 shrink-0 text-footer-text/52 transition-transform', !open && 'rotate-180')} aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-[calc(100%+0.7rem)] left-1/2 z-40 w-[min(22rem,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-footer-text/14 bg-footer-bg/95 p-1.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] backdrop-blur-sm"
        >
          <p className="px-2 pb-1 pt-1 text-[10px] uppercase tracking-[0.16em] text-footer-text/36">
            {t('menuLabel', { count: localeItems.length })}
          </p>
          <div className="max-h-64 overflow-y-auto pr-1">
            <div>
              {localeItems.map((entry) => {
                const isActive = entry.code === locale;
                return (
                  <button
                    key={entry.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => handleSwitch(entry.code)}
                    disabled={isPending || isActive}
                    className={clsx(
                      'flex w-full items-center gap-2.5 border-b border-footer-text/8 px-2 py-2 text-left transition-colors last:border-b-0',
                      isActive
                        ? 'text-accent'
                        : 'text-footer-text/75 hover:bg-footer-text/6 hover:text-footer-text',
                      isPending && !isActive && 'opacity-60',
                    )}
                  >
                    <span className="inline-flex h-5 min-w-5 items-center justify-center px-0.5 text-[10px] font-semibold tracking-[0.08em]">
                      <FlagBadge countryCode={entry.countryCode} fallback={entry.native.slice(0, 2)} alt={`${entry.native} flag`} />
                    </span>
                    <span className="min-w-0">
                      <span className={clsx('block type-label leading-none', isActive ? 'text-accent' : 'text-footer-text/82')}>
                        {entry.native}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
