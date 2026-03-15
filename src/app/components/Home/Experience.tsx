import experience from '@/app/data/experience';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import SummarySection from '../shared/SummarySection';
import type { Demo, Smartlink } from '@/app/data/experience';
import { getTranslations, getFormatter } from 'next-intl/server';

// SmartLink Card Component
interface SmartLinkCardProps {
  smartlink: Smartlink;
  title: string;
  description?: string;
}

function SmartLinkCard({ smartlink, title, description }: SmartLinkCardProps) {
  return (
    <a
      href={smartlink.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 sm:p-4 transition-all duration-300 group relative z-10 border-(--ds-border-card) [background:var(--gaudi-card-bg)] [box-shadow:var(--ds-shadow-card)] rounded-(--ds-radius-card) hover:-translate-y-0.75 hover:-rotate-[0.15deg] hover:[box-shadow:var(--ds-shadow-card-hover)] hover:border-[rgb(197_87_45/0.45)]"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {smartlink.thumbnail && (
          <div className="shrink-0">
            <Image
              src={
                typeof smartlink.thumbnail === 'string'
                  ? smartlink.thumbnail
                  : smartlink.thumbnail.url
              }
              alt={title}
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
              loading="lazy"
              quality={85}
              sizes="(max-width: 640px) 40px, 48px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
            <h5 className="font-medium text-(--gaudi-ink) group-hover:text-(--gaudi-terracotta) transition-colors text-sm sm:text-base">
              {title}
            </h5>
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-(--color-muted) group-hover:text-(--gaudi-terracotta) transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-(--color-muted) line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

// Demo Card Component
interface DemoCardProps {
  demo: Demo;
  title: string;
  getImageThemeGradient: (imageSrc: string) => string;
}

function DemoCard({ demo, title, getImageThemeGradient }: DemoCardProps) {
  const demoGradient = getImageThemeGradient(demo.thumbnail.url);

  return (
    <a
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group shrink-0 w-48 sm:w-56 overflow-hidden block transition-all duration-300 border-(--ds-border-card) [background:var(--gaudi-card-bg)] [box-shadow:var(--ds-shadow-card)] rounded-(--ds-radius-card) hover:-translate-y-0.75 hover:-rotate-[0.15deg] hover:[box-shadow:var(--ds-shadow-card-hover)] hover:border-[rgb(197_87_45/0.45)]"
    >
      <div className="relative">
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-t ${demoGradient} opacity-20`}
        ></div>
        <Image
          src={demo.thumbnail.url}
          alt={title}
          width={demo.thumbnail.width || 320}
          height={demo.thumbnail.height || 180}
          className="w-full h-24 sm:h-28 object-cover"
        />
        {/* YouTube icon */}
        <div className="absolute top-2 inset-e-2">
          <svg
            className="w-5 h-5 text-red-500 drop-shadow-sm"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <h6 className="text-xs sm:text-sm font-medium text-(--gaudi-ink) group-hover:text-(--gaudi-terracotta) transition-colors line-clamp-2 leading-tight">
          {title}
        </h6>
      </div>
    </a>
  );
}

// Function to generate gradient colors based on image theme
function getImageThemeGradient(imageSrc: string): string {
  // Analyze actual project images and assign appropriate gradients based on their real colors
  const imageThemes: Record<string, string> = {
    '/kindred.svg': 'from-stone-100 via-neutral-50 to-gray-50',
    '/kindred.png': 'from-stone-100 via-neutral-50 to-gray-50',

    // Tinder - iconic flame gradient (orange to pink)
    '/tinder.jpeg': 'from-orange-200 via-pink-200 to-red-200',

    // Yahoo - classic purple brand colors
    '/yahoo.jpg': 'from-purple-200 via-purple-300 to-indigo-200',
    '/yahooLogo.png': 'from-purple-200 via-purple-300 to-indigo-200',
    '/yahooNewsDigest.png': 'from-purple-200 via-purple-300 to-indigo-200',
    '/yahooWeather.png': 'from-purple-200 via-purple-300 to-indigo-200',

    // Alt - dark purple/violet fintech branding
    '/alt.jpg': 'from-purple-200 via-violet-200 to-indigo-200',

    // Forethought - AI company, usually blue/tech colors
    '/forethought.jpg': 'from-blue-200 via-indigo-200 to-purple-200',

    // Branch - green brand color for deep linking
    '/branch.jpg': 'from-green-200 via-emerald-200 to-teal-200',
    '/branch.png': 'from-green-200 via-emerald-200 to-teal-200',

    // Control Room - dark news/election theme
    '/controlRoom.jpg': 'from-gray-200 via-slate-200 to-blue-200',

    // Hashout - brown/orange talk show theme (you corrected this)
    '/hashout.jpg': 'from-amber-200 via-orange-200 to-yellow-200',

    // Conference/speaking - based on actual event branding
    '/google-io-2017.jpeg': 'from-blue-200 via-green-200 to-yellow-200', // Google's multicolor
    '/cds-2017.jpeg': 'from-blue-200 via-cyan-200 to-teal-200', // Chrome blue
    '/cds-2019.jpeg': 'from-red-200 via-orange-200 to-yellow-200', // Chrome warm
    '/cds-2020.jpeg': 'from-blue-200 via-purple-200 to-pink-200', // Modern Chrome
    '/cds-2020-2.jpeg': 'from-green-200 via-blue-200 to-purple-200', // Chrome dev
    '/react-norway.jpeg': 'from-cyan-200 via-blue-200 to-indigo-200', // React blue
    '/js-camp-2021.jpeg': 'from-yellow-200 via-orange-200 to-red-200', // JS yellow/orange
    '/accento.jpeg': 'from-purple-200 via-pink-200 to-red-200', // Conference purple
    '/geekle.jpeg': 'from-green-200 via-teal-200 to-blue-200', // Tech green

    // Default fallback
    default: 'from-blue-200 via-purple-200 to-pink-200',
  };

  return imageThemes[imageSrc] || imageThemes.default;
}

function formatPeriod(
  startDate: string,
  endDate: string | null | undefined,
  format: Awaited<ReturnType<typeof getFormatter>>,
  present: string,
): string {
  const parseDate = (iso: string) => {
    const [y, m] = iso.split('-').map(Number);
    return new Date(y, (m ?? 1) - 1, 1);
  };
  const opts = { month: 'short', year: 'numeric' } as const;
  const start = format.dateTime(parseDate(startDate), opts);
  if (endDate === null) return `${start} – ${present}`;
  if (!endDate) return start;
  return `${start} – ${format.dateTime(parseDate(endDate), opts)}`;
}

export default async function Experience() {
  const t = await getTranslations('experience');
  const format = await getFormatter();
  return (
    <section className="relative">
      <div className="gaudi-blob-a top-10 -inset-s-20"></div>
      <div className="gaudi-blob-c top-52 -inset-e-14"></div>
      <SummarySection
        title={t('sectionTitle')}
        description={t('sectionDescription')}
        summaryItems={(
          t.raw('summaryItems') as Array<{ title: string; items: string[] }>
        ).map((item, i) => ({
          title: item.title,
          icon: (
            <span
              className={[
                'text-(--gaudi-sea)',
                'text-(--gaudi-moss)',
                'text-(--gaudi-ochre)',
                'text-(--gaudi-terracotta)',
              ][i]}
            >
              {['💼', '🚀', '📈', '🎤'][i]}
            </span>
          ),
          items: item.items,
        }))}
      />

      <div className="mb-4 mt-8 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-(--gaudi-ink) tracking-[-0.02em] text-balance mb-1">
          {t('experiencesHeading')}
        </h3>
      </div>
      {experience.companies.map((company, idx) => {
        const companyTitle = t(`companies.${company.key}.title`);
        return (
        <div
          key={idx}
          className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-(--color-border)/45 last:border-b-0 relative z-10"
        >
          {/* Company Header */}
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-4">
            {company.logo && (
              <div className="shrink-0 mt-0.5">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-bold text-(--gaudi-ink) text-sm sm:text-base">
                  {company.name}
                </span>
                <span className="text-xs px-1.5 py-0.5 sm:px-2 rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.92)] shrink-0">
                  {formatPeriod(company.startDate, company.endDate, format, t('present'))}
                </span>
              </div>
              <div className="flex items-start flex-wrap gap-x-1 gap-y-0.5 text-xs sm:text-sm text-(--color-muted)">
                <span className="shrink-0">{companyTitle}</span>
                {t(`companies.${company.key}.location`) && (
                  <span className="flex items-center gap-0.5 shrink-0">
                    <span className="opacity-40">•</span>
                    <MapPin size={11} className="shrink-0 opacity-50" />
                    <span>{t(`companies.${company.key}.location`)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2 sm:space-y-4">
            {company.projects.map((project, pidx) => {
              const projectText = t.raw(`companies.${company.key}.projects.${project.key}`) as {
                name: string;
                summary?: string;
                smartlinkTitle?: string;
                smartlinkDescription?: string;
                demoTitles?: string[];
              };
              // Get gradient based on project thumbnail
              const thumbnailSrc = project.smartlink?.thumbnail
                ? typeof project.smartlink.thumbnail === 'string'
                  ? project.smartlink.thumbnail
                  : project.smartlink.thumbnail.url
                : '';
              const gradientClass = thumbnailSrc
                ? getImageThemeGradient(thumbnailSrc)
                : 'from-gray-50 to-gray-50';

              return (
                <div
                  key={pidx}
                  className="p-2 sm:p-3 relative overflow-hidden transition-all duration-300 border-(--ds-border-card) [background:var(--gaudi-card-bg)] [box-shadow:var(--ds-shadow-card)] rounded-(--ds-radius-card) hover:-translate-y-0.75 hover:-rotate-[0.15deg] hover:[box-shadow:var(--ds-shadow-card-hover)] hover:border-[rgb(197_87_45/0.45)]"
                >
                  {/* Visible corner gradient accent */}
                  <div
                    className={`absolute top-0 inset-e-0 w-48 h-48 bg-linear-to-bl ${gradientClass} opacity-40 blur-3xl rounded-full -translate-y-16 translate-x-16`}
                  ></div>

                  <div className="mb-2 relative z-10">
                    <h4 className="font-semibold text-(--gaudi-ink) mb-1 text-sm sm:text-base">
                      {projectText.name}
                    </h4>
                    {project.techStack && (
                      <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                        {project.techStack.map((tech, tidx) => (
                          <span
                            key={tidx}
                            className="inline-block px-1.5 py-0.5 sm:px-2 text-xs font-medium rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.92)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {projectText.summary && (
                      <p className="text-xs sm:text-sm text-(--color-muted) mb-2">
                        {projectText.summary}
                      </p>
                    )}
                  </div>

                  {/* Enhanced Smartlink */}
                  {project.smartlink && (
                    <SmartLinkCard
                      smartlink={project.smartlink}
                      title={projectText.smartlinkTitle ?? ''}
                      description={projectText.smartlinkDescription}
                    />
                  )}

                  {/* Demo Carousel for YouTube videos */}
                  {project.demos && project.demos.length > 0 && (
                    <div className="mt-3 relative z-10">
                      <h5 className="text-sm font-medium text-(--color-muted) mb-2">
                        {t('featuredTalksDemos')}
                      </h5>
                      <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide scroll-smooth">
                          <ul className="flex gap-3 pb-2 snap-x snap-mandatory">
                            {project.demos.map((demo, didx) => (
                              <li key={didx} className="snap-start">
                                <DemoCard
                                  demo={demo}
                                  title={projectText.demoTitles?.[didx] ?? ''}
                                  getImageThemeGradient={getImageThemeGradient}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        );
      })}
    </section>
  );
}
