import education from '@/app/data/education';
import TimelineRow from '@/app/components/shared/TimelineRow';
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
      <div>
        {education.map((edu, idx) => {
          const text = t.raw(`items.${edu.key}`) as {
            name: string;
            degree: string;
            department?: string;
            college?: string;
            location: string;
          };

          return (
            <TimelineRow
              key={edu.key}
              period={formatPeriod(edu.startDate, edu.endDate)}
              meta={text.location}
              title={text.name}
              thumbnail={edu.thumbnail}
              isLast={idx === education.length - 1}
            >
              <p className="type-body-sm text-ink/72">{text.degree}</p>
              {text.department && <p className="type-label text-ink/56">{text.department}</p>}
              {text.college && <p className="type-label text-ink/56">{text.college}</p>}
            </TimelineRow>
          );
        })}
      </div>
    </section>
  );
}

