import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';
  const locale = raw === 'zh-Hant' ? 'zh-Hant' : 'en';

  const messages =
    locale === 'zh-Hant'
      ? (await import('../messages/zh-Hant.json')).default
      : (await import('../messages/en.json')).default;

  return { locale, messages };
});
