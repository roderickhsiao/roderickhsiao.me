import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/app/components/shared/PageHero';
import ChronicleSection from '@/app/components/Home/ChronicleSection';
import FieldNotes, {
  type FieldNotesItem,
} from '@/app/components/shared/FieldNotes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return {
    title: t('home.title'),
    description: t('home.description'),
    keywords: t.raw('home.keywords') as string[],
    alternates: {
      canonical: 'https://roderickhsiao.me',
      languages: {
        en: 'https://roderickhsiao.me',
        'zh-Hant': 'https://roderickhsiao.me/zh-Hant',
        'x-default': 'https://roderickhsiao.me',
      },
    },
  };
}

export default async function Home() {
  const t = await getTranslations('home');
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.titleLine1')}
            <br />
            <span className="text-accent ms-[6vw] sm:ms-[9vw]">
              {t('hero.titleLine2')}
            </span>
          </>
        }
        description={t('hero.description')}
        className="pb-12 sm:pb-20"
      />

      <FieldNotes
        label={t('fieldNotes.label')}
        heading={t('fieldNotes.heading')}
        items={t.raw('fieldNotes.items') as FieldNotesItem[]}
      />

      <div className="mt-10 sm:mt-16" />
      <ChronicleSection />
    </div>
  );
}
