import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ChronicleSection from '@/app/components/Home/ChronicleSection';
import type { FieldNotesItem } from '@/app/components/shared/FieldNotes';
import EditorialPageShell from '@/app/components/shared/EditorialPageShell';
import { buildPageMetadata } from '@/app/utils/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return buildPageMetadata({
    t,
    pageKey: 'home',
    path: '',
  });
}

export default async function Home() {
  const t = await getTranslations('home');
  return (
    <EditorialPageShell
      hero={{
        eyebrow: t('hero.eyebrow'),
        title: (
          <>
            {t('hero.titleLine1')}
            <br />
            <span className="text-accent ms-[6vw] sm:ms-[9vw]">
              {t('hero.titleLine2')}
            </span>
          </>
        ),
        description: t('hero.description'),
      }}
      fieldNotes={{
        label: t('fieldNotes.label'),
        heading: t('fieldNotes.heading'),
        items: t.raw('fieldNotes.items') as FieldNotesItem[],
      }}
    >
      <ChronicleSection />
    </EditorialPageShell>
  );
}
