import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Activity from '@/app/components/Activity/Activity';
import type { FieldNotesItem } from '@/app/components/shared/FieldNotes';
import EditorialPageShell from '@/app/components/shared/EditorialPageShell';
import { buildPageMetadata } from '@/app/utils/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return buildPageMetadata({
    t,
    pageKey: 'activity',
    path: '/activity',
    includeSocial: true,
    ogTheme: 'activity',
  });
}

export default async function ActivityPage() {
  const t = await getTranslations('activity');
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
      <Activity />
    </EditorialPageShell>
  );
}
