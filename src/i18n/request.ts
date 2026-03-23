import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (
    await {
      en: import('../messages/en.json'),
      'zh-Hant': import('../messages/zh-Hant.json'),
      'en-GB': import('../messages/en-GB.json'),
      de: import('../messages/de.json'),
      es: import('../messages/es.json'),
      fr: import('../messages/fr.json'),
      it: import('../messages/it.json'),
      ja: import('../messages/ja.json'),
      nb: import('../messages/nb.json'),
      nl: import('../messages/nl.json'),
      pt: import('../messages/pt.json'),
      sv: import('../messages/sv.json'),
    }[locale]
  ).default;

  return { locale, messages };
});
