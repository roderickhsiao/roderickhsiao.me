import experience from "@/app/data/experience";
import Image from "next/image";
import SummarySection from "../shared/SummarySection";
import type { Demo, Smartlink } from "@/app/data/experience";

// SmartLink Card Component
interface SmartLinkCardProps {
  smartlink: Smartlink;
}

function SmartLinkCard({ smartlink }: SmartLinkCardProps) {
  return (
    <a 
      href={smartlink.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group relative z-10"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {smartlink.thumbnail && (
          <div className="shrink-0">
            <Image
              src={typeof smartlink.thumbnail === 'string' ? smartlink.thumbnail : smartlink.thumbnail.url}
              alt={smartlink.title}
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
            <h5 className="font-medium text-gray-900 group-hover:text-primary transition-colors text-sm sm:text-base">
              {smartlink.title}
            </h5>
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          {smartlink.description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {smartlink.description}
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
  getImageThemeGradient: (imageSrc: string) => string;
}

function DemoCard({ demo, getImageThemeGradient }: DemoCardProps) {
  const demoGradient = getImageThemeGradient(demo.thumbnail.url);
  
  return (
    <a
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group shrink-0 w-48 sm:w-56 bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 block"
    >
      <div className="relative">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${demoGradient} opacity-20`}></div>
        <Image
          src={demo.thumbnail.url}
          alt={demo.title}
          width={demo.thumbnail.width || 320}
          height={demo.thumbnail.height || 180}
          className="w-full h-24 sm:h-28 object-cover"
        />
        {/* YouTube icon */}
        <div className="absolute top-2 right-2">
          <svg className="w-5 h-5 text-red-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <h6 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {demo.title}
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
    default: 'from-blue-200 via-purple-200 to-pink-200'
  };
  
  return imageThemes[imageSrc] || imageThemes.default;
}

export default function Experience() {
  return (
    <section>
      <SummarySection
        title="Professional Experience & Industry Impact"
        description="Over 16 years in product engineering with extensive experience across startups to Fortune 500 companies. Specialized in frontend architecture, team leadership, and large-scale application development."
        summaryItems={[
          {
            title: 'Industry Experience',
            icon: <span className="text-blue-600">💼</span>,
            items: [
              '16+ years in product engineering.',
              'Startup to Fortune 500 company experience.',
            ],
          },
          {
            title: 'Technical Leadership',
            icon: <span className="text-green-600">🚀</span>,
            items: [
              'Frontend architecture and infrastructure.',
              'Team mentorship and technical guidance.',
            ],
          },
          {
            title: 'Impact & Scale',
            icon: <span className="text-purple-600">📈</span>,
            items: [
              'Large-scale applications serving millions.',
              'Design systems and developer tooling.',
            ],
          },
          {
            title: 'Community & Speaking',
            icon: <span className="text-orange-600">🎤</span>,
            items: [
              'International conference speaker.',
              'Open source contributor and advocate.',
            ],
          },
        ]}
      />

      <div className="mb-4 mt-8">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Experiences</h3>
      </div>
      {experience.companies.map((company, idx) => (
        <div key={idx} className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200 last:border-b-0">
          {/* Company Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            {company.logo && (
              <div className="shrink-0">
                <Image 
                  src={company.logo} 
                  alt={company.name} 
                  width={48} 
                  height={48} 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
                />
              </div>
            )}
            <div className="flex-1 space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-bold text-gray-900 text-sm sm:text-base">{company.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 sm:px-2 rounded-full">{company.time}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {company.title} • {company.location}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2 sm:space-y-4">
            {company.projects.map((project, pidx) => {
              // Get gradient based on project thumbnail
              const thumbnailSrc = project.smartlink?.thumbnail 
                ? (typeof project.smartlink.thumbnail === 'string' 
                   ? project.smartlink.thumbnail 
                   : project.smartlink.thumbnail.url)
                : '';
              const gradientClass = thumbnailSrc ? getImageThemeGradient(thumbnailSrc) : 'from-gray-50 to-gray-50';
              
              return (
                <div key={pidx} className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 shadow-sm relative overflow-hidden">
                  {/* Visible corner gradient accent */}
                  <div className={`absolute top-0 end-0 w-48 h-48 bg-gradient-to-bl ${gradientClass} opacity-40 blur-3xl rounded-full -translate-y-16 translate-x-16`}></div>
                  
                  <div className="mb-2 relative z-10">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{project.name}</h4>
                    {project.techStack && (
                      <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                        {project.techStack.map((tech, tidx) => (
                          <span 
                            key={tidx}
                            className="inline-block px-1.5 py-0.5 sm:px-2 bg-slate-100/80 border border-slate-200/40 text-slate-800 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.summary && (
                      <p className="text-xs sm:text-sm text-gray-700 mb-2">{project.summary}</p>
                    )}
                  </div>

                {/* Enhanced Smartlink */}
                {project.smartlink && (
                  <SmartLinkCard smartlink={project.smartlink} />
                )}

                {/* Demo Carousel for YouTube videos */}
                {project.demos && project.demos.length > 0 && (
                  <div className="mt-3 relative z-10">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Featured Talks & Demos</h5>
                    <div className="relative">
                      <div className="overflow-x-auto scrollbar-hide scroll-smooth">
                        <ul className="flex gap-3 pb-2 snap-x snap-mandatory">
                          {project.demos.map((demo, didx) => (
                            <li key={didx} className="snap-start">
                              <DemoCard 
                                demo={demo}
                                getImageThemeGradient={getImageThemeGradient}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Scroll indicators for mobile */}
                      {project.demos.length > 1 && (
                        <div className="flex justify-center gap-1 mt-2 sm:hidden">
                          {project.demos.map((_, index) => (
                            <div key={index} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
