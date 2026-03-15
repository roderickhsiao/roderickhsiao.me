import Image from 'next/image';
import education from '@/app/data/education';

export default function Education() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.map((edu, idx) => (
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
                  alt={`${edu.name} logo`}
                  className="rounded-lg object-cover border border-ink/8"
                  loading="lazy"
                  quality={85}
                  sizes="48px"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="type-caption text-ink mb-0.5">{edu.name}</h3>
              <p className="type-body-sm text-ink/70 mb-0.5">{edu.degree}</p>
              {edu.department && <p className="type-label text-ink/50">{edu.department}</p>}
              {edu.college && <p className="type-label text-ink/50">{edu.college}</p>}

              <div className="flex flex-wrap items-center gap-3 mt-2 type-label text-ink/40">
                <span>{edu.location}</span>
                <span aria-hidden>·</span>
                <time>{edu.time}</time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

