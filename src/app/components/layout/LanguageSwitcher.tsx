'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'zh-Hant', label: '中文' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (next: 'en' | 'zh-Hant') => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-2 type-label" role="group" aria-label="Language">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-2">
          <button
            onClick={() => handleSwitch(code)}
            disabled={isPending}
            aria-pressed={locale === code}
            className={[
              'cursor-pointer outline-none transition-colors duration-200',
              locale === code
                ? 'text-footer-text/60'
                : 'text-footer-text/20 hover:text-footer-text/40',
              isPending && locale !== code ? 'opacity-50' : '',
            ].join(' ')}
          >
            {label}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="text-footer-text/15 select-none" aria-hidden>
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
