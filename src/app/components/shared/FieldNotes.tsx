import type { ReactNode } from 'react';
import clsx from 'clsx';

export interface FieldNotesItem {
  num: string;
  icon?: string;
  title: string;
  items: readonly string[];
}

interface FieldNotesProps {
  /** Eyebrow label. Defaults to "FIELD NOTES // 001" */
  label?: string;
  heading?: ReactNode;
  items: readonly FieldNotesItem[];
  className?: string;
}

export default function FieldNotes({
  label = 'FIELD NOTES // 001',
  heading,
  items,
  className = '',
}: FieldNotesProps) {
  return (
    <>
      {/* ── Divider ──────────────────────────────────── */}
      <div className="flex items-center gap-8 mb-16 overflow-hidden" aria-hidden>
        <div className="h-px flex-1 bg-ink/8" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full border border-ink/15" />
        ))}
        <div className="h-px flex-1 bg-ink/8" />
      </div>

      {/* ── Editorial block ──────────────────────────── */}
      <div className={clsx('flex flex-col md:flex-row gap-16 md:gap-32 py-20', className)}>
        <div className="md:w-80 shrink-0">
          <p className="type-label-wide text-ink/60 mb-8">{label}</p>
          {heading && (
            <h2 className="type-heading-lg text-ink leading-none whitespace-pre-line">{heading}</h2>
          )}
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14">
          {items.map(({ num, title, items: bullets }) => (
            <div key={num}>
              <div className="flex items-center gap-2 mb-2">
                <span className="type-label text-ink/55">{num}</span>
                <h3 className="type-label text-ink">{title}</h3>
              </div>
              <ul className="space-y-1.5 ps-1">
                {bullets.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" aria-hidden />
                    <span className="type-body-sm text-ink/72 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
