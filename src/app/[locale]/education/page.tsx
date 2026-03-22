import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Education from '@/app/components/Education/Education';
import type { FieldNotesItem } from '@/app/components/shared/FieldNotes';
import EditorialPageShell from '@/app/components/shared/EditorialPageShell';
import { buildPageMetadata } from '@/app/utils/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return buildPageMetadata({
    t,
    pageKey: 'education',
    path: '/education',
    includeSocial: true,
    ogTheme: 'education',
  });
}

export default async function EducationPage() {
  const t = await getTranslations('education');
  return (
    <EditorialPageShell
      hero={{
        eyebrow: t('hero.eyebrow'),
        title: t('hero.title'),
        description: t('hero.description'),
      }}
      fieldNotes={{
        label: t('fieldNotes.label'),
        heading: t('fieldNotes.heading'),
        items: t.raw('fieldNotes.items') as FieldNotesItem[],
      }}
    >
      <Education />
    </EditorialPageShell>
  );
}
