import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Education from '@/app/components/Education/Education';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes, { type FieldNotesItem } from '@/app/components/shared/FieldNotes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  const ogParams = new URLSearchParams({
    title: t('education.ogImageTitle'),
    subtitle: t('education.ogImageSubtitle'),
    description: t('education.ogImageDescription'),
    theme: 'education',
  });
  const ogImageUrl = `/api/og?${ogParams.toString()}`;
  return {
    title: t('education.title'),
    description: t('education.description'),
    keywords: t.raw('education.keywords') as string[],
    openGraph: {
      title: t('education.ogTitle'),
      description: t('education.ogDescription'),
      url: 'https://roderickhsiao.me/education',
      siteName: t('siteName'),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t('education.ogAlt') }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('education.ogTitle'),
      description: t('education.ogDescription'),
      images: [ogImageUrl],
    },
  };
}

export default async function EducationPage() {
  const t = await getTranslations('education');
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
        heading={t('hero.title')}
        items={t.raw('fieldNotes.items') as FieldNotesItem[]}
      />

      <div className="mt-10 sm:mt-16" />
      <Education />
    </div>
  );
}
