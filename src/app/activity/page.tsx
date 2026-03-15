import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Activity from '@/app/components/Activity/Activity';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes, { type FieldNotesItem } from '@/app/components/shared/FieldNotes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  const ogParams = new URLSearchParams({
    title: t('activity.ogImageTitle'),
    subtitle: t('activity.ogImageSubtitle'),
    description: t('activity.ogImageDescription'),
    theme: 'activity',
  });
  const ogImageUrl = `/api/og?${ogParams.toString()}`;
  return {
    title: t('activity.title'),
    description: t('activity.description'),
    keywords: t.raw('activity.keywords') as string[],
    openGraph: {
      title: t('activity.ogTitle'),
      description: t('activity.ogDescription'),
      url: 'https://roderickhsiao.me/activity',
      siteName: t('siteName'),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t('activity.ogAlt') }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('activity.ogTitle'),
      description: t('activity.ogDescription'),
      images: [ogImageUrl],
    },
  };
}

export default async function ActivityPage() {
  const t = await getTranslations('activity');
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
        className="pb-12 sm:pb-20"
      />

      <FieldNotes
        label={t('fieldNotes.label')}
        heading={t('fieldNotes.heading')}
        items={t.raw('fieldNotes.items') as FieldNotesItem[]}
      />

      <div className="mt-10 sm:mt-16" />
      <Activity />
    </div>
  );
}
