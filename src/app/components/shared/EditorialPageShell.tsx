import type { ReactNode } from 'react';
import clsx from 'clsx';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes, { type FieldNotesItem } from '@/app/components/shared/FieldNotes';

interface EditorialPageShellProps {
  hero: {
    eyebrow: string;
    title: ReactNode;
    description: string;
  };
  fieldNotes?: {
    label: string;
    heading?: ReactNode;
    items: FieldNotesItem[];
  };
  children: ReactNode;
  className?: string;
}

export default function EditorialPageShell({
  hero,
  fieldNotes,
  children,
  className = '',
}: EditorialPageShellProps) {
  return (
    <div className={clsx('editorial-shell relative overflow-hidden pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto', className)}>
      <section id="home-hero" className="relative z-10">
        <PageHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          className="pb-12 sm:pb-20"
        />
      </section>

      {fieldNotes && (
        <section id="home-field-notes" className="relative z-10">
          <FieldNotes
            label={fieldNotes.label}
            heading={fieldNotes.heading}
            items={fieldNotes.items}
          />
        </section>
      )}

      <div className="mt-10 sm:mt-16" />
      <section id="home-chronicle" className="relative z-10">
        {children}
      </section>
    </div>
  );
}
