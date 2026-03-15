import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Projects from '@/app/components/Projects/Projects';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes, { type FieldNotesItem } from '@/app/components/shared/FieldNotes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return {
    title: t('projects.title'),
    description: t('projects.description'),
    keywords: t.raw('projects.keywords') as string[],
    alternates: {
      canonical: 'https://roderickhsiao.me/projects',
      languages: {
        en: 'https://roderickhsiao.me/projects',
        'zh-Hant': 'https://roderickhsiao.me/zh-Hant/projects',
        'x-default': 'https://roderickhsiao.me/projects',
      },
    },
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations('projects');
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
      <Projects />
    </div>
  );
}
