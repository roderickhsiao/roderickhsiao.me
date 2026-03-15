import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Travel from '@/app/components/Travel/Travel';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  const ogParams = new URLSearchParams({
    title: t('travel.ogImageTitle'),
    subtitle: t('travel.ogImageSubtitle'),
    description: t('travel.ogImageDescription'),
    theme: 'travel',
  });
  const ogImageUrl = `/api/og?${ogParams.toString()}`;
  return {
    title: t('travel.title'),
    description: t('travel.description'),
    keywords: t.raw('travel.keywords') as string[],
    openGraph: {
      title: t('travel.ogTitle'),
      description: t('travel.ogDescription'),
      url: 'https://roderickhsiao.me/travel',
      siteName: t('siteName'),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t('travel.ogAlt') }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('travel.ogTitle'),
      description: t('travel.ogDescription'),
      images: [ogImageUrl],
    },
    alternates: {
      canonical: 'https://roderickhsiao.me/travel',
      languages: {
        en: 'https://roderickhsiao.me/travel',
        'zh-Hant': 'https://roderickhsiao.me/zh-Hant/travel',
        'x-default': 'https://roderickhsiao.me/travel',
      },
    },
  };
}

export default function TravelPage() {
  return (
    <div className="pt-28 sm:pt-32 overflow-x-hidden">
      <Travel />
    </div>
  );
}
