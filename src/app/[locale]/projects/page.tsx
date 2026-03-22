import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Projects from '@/app/components/Projects/Projects';
import type { FieldNotesItem } from '@/app/components/shared/FieldNotes';
import EditorialPageShell from '@/app/components/shared/EditorialPageShell';
import { buildPageMetadata } from '@/app/utils/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return buildPageMetadata({
    t,
    pageKey: 'projects',
    path: '/projects',
  });
}

export default async function ProjectsPage() {
  const t = await getTranslations('projects');
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
      <Projects />
    </EditorialPageShell>
  );
}
