import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh-Hant',
    'de',
    'en-GB',
    'es',
    'fr',
    'it',
    'ja',
    'nb',
    'nl',
    'pt',
    'sv',
  ],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const { Link, usePathname, useRouter } =
  createNavigation(routing);
