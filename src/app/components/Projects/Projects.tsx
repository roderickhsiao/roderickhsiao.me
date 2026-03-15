'use client';
import Image from 'next/image';
import projects, { type Project } from '@/app/data/projects';
import { useTranslations } from 'next-intl';

// Gradient per status
const STATUS_STYLE: Record<Project['status'], { dot: string; label: string }> = {
  Active:     { dot: 'bg-success',  label: 'text-success' },
  Maintained: { dot: 'bg-sky',      label: 'text-sky' },
  Archived:   { dot: 'bg-ink/25',   label: 'text-ink/40' },
};


function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('projects');
  const projectText = t.raw(`items.${project.key}`) as {
    name: string;
    description: string;
    location?: string;
    highlights?: string[];
  };
  const status = STATUS_STYLE[project.status];

  return (
    <article className="flex flex-col p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} aria-hidden />
          <h3 className="font-bold text-(--gaudi-ink) text-base sm:text-lg tracking-tight font-mono">{projectText.name}</h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`type-label ${status.label}`}>{t(`status${project.status}`)}</span>
          <span className="type-label text-ink/30">{project.year.replace('Present', t('yearPresent'))}</span>
          {projectText.location && (
            <span className="hidden sm:inline type-label text-ink/20">{projectText.location}</span>
          )}
        </div>
      </div>

      {/* Stats row */}
      {(project.stars || project.downloads) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.stars && (
            <span className="flex items-center gap-1 type-label px-2.5 py-1 rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.7)]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {project.stars} {t('stars')}
            </span>
          )}
          {project.downloads && (
            <span className="flex items-center gap-1 type-label px-2.5 py-1 rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.7)]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
              {project.downloads}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <p className="type-body-sm text-ink/70 leading-relaxed mb-4">{projectText.description}</p>

      {/* Highlights */}
      {projectText.highlights && projectText.highlights.length > 0 && (
        <ul className="space-y-1 mb-4">
          {projectText.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" aria-hidden />
              <span className="type-body-sm text-ink/50 leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack */}
      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className="type-label px-2 py-0.5 rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.8)]">{tech}</span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-ink/8">
        {project.github && (
          <a
            href={project.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 type-label px-3 py-1.5 rounded-full bg-ink/5 hover:bg-ink/10 text-ink/60 hover:text-ink transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t('github')}
          </a>
        )}
        {project.npm && (
          <a
            href={project.npm.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 type-label px-3 py-1.5 rounded-full bg-ink/5 hover:bg-ink/10 text-ink/60 hover:text-ink transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
            </svg>
            {t('npm')}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 type-label px-3 py-1.5 rounded-full bg-accent/8 hover:bg-accent/15 text-(--gaudi-terracotta) transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {t('demo')}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useTranslations('projects');
  return (
    <section>
      <div className="mb-6 mt-8">
        <h3 className="text-xl sm:text-2xl font-bold text-(--gaudi-ink) tracking-[-0.02em] mb-1">{t('sectionHeading')}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </section>
  );
}

