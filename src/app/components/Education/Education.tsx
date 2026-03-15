import Image from 'next/image';
import education from '@/app/data/education';
import { getTranslations, getFormatter } from 'next-intl/server';

export default async function Education() {
  const t = await getTranslations('education');
  const format = await getFormatter();

  function formatPeriod(startDate: string, endDate?: string): string {
    const parseDate = (iso: string) => {
      const [y, m] = iso.split('-').map(Number);
      return new Date(y, (m ?? 1) - 1, 1);
    };
    const opts = { month: 'short', year: 'numeric' } as const;
    const start = format.dateTime(parseDate(startDate), opts);
    if (!endDate) return start;
    return `${start} – ${format.dateTime(parseDate(endDate), opts)}`;
  }
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.map((edu, idx) => {
          const text = t.raw(`items.${edu.key}`) as {
            name: string;
            degree: string;
            department?: string;
            college?: string;
            location: string;
          };
          return (
          <article
            key={idx}
            className="flex gap-4 p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-200"
          >
            {edu.thumbnail && (
              <div className="shrink-0">
                <Image
                  src={edu.thumbnail.url}
                  width={48}
                  height={48}
                  alt={`${text.name} logo`}
                  className="rounded-lg object-cover border border-ink/8"
                  loading="lazy"
                  quality={85}
                  sizes="48px"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="type-caption text-ink mb-0.5">{text.name}</h3>
              <p className="type-body-sm text-ink/70 mb-0.5">{text.degree}</p>
              {text.department && <p className="type-label text-ink/50">{text.department}</p>}
              {text.college && <p className="type-label text-ink/50">{text.college}</p>}

              <div className="flex flex-wrap items-center gap-3 mt-2 type-label text-ink/40">
                <span>{text.location}</span>
                <span aria-hidden>·</span>
                <time>{formatPeriod(edu.startDate, edu.endDate)}</time>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

