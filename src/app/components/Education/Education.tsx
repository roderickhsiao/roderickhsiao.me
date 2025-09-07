import Image from 'next/image';
import education from '@/app/data/education';
import SummarySection from '../shared/SummarySection';

export default function Education() {
  const summaryData = {
    title: "Knowledge Sharing & Mentorship",
    description: "As an experienced professional, I believe in giving back to the tech community through knowledge sharing, mentorship, and contributing to open source projects. My approach combines practical AI implementation with collaborative development to help others grow in their technical journey.",
    summaryItems: [
      {
        title: "Teaching & Sharing",
        icon: (
          <svg
            className="w-4 h-4 mr-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ),
        items: [
          "Mentoring developers on AI integration.",
          "Leading open source projects and contributions.",
          "Speaking at conferences and workshops.",
          "Building communities around emerging tech."
        ]
      },
      {
        title: "Expertise Areas",
        icon: (
          <svg
            className="w-4 h-4 mr-2 text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
              clipRule="evenodd"
            />
          </svg>
        ),
        items: [
          "AI-powered development workflows.",
          "Modern web architecture & scalability.",
          "Open source project leadership.",
          "Team mentorship & technical guidance."
        ]
      }
    ]
  };

  return (
    <main className="space-y-8">
      {/* Summary Section */}
      <SummarySection 
        title={summaryData.title}
        description={summaryData.description}
        summaryItems={summaryData.summaryItems}
      />

      {/* Education Section */}
      <section className="space-y-6">
        <header>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Education
          </h1>
          <p className="text-gray-600 text-sm">
            Academic background and continuous learning journey
          </p>
        </header>

        <div className="space-y-4">
          {education.map((edu, idx) => (
            <article
              key={idx}
              className="group bg-white/70 rounded-lg border border-gray-200/60 p-4 hover:bg-white/90 hover:border-gray-300/60 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                {/* School Logo */}
                {edu.thumbnail && (
                  <div className="flex-shrink-0">
                    <Image
                      src={edu.thumbnail.url}
                      width={64}
                      height={64}
                      alt={`${edu.name} logo`}
                      className="rounded-lg object-cover border border-gray-200/50"
                    />
                  </div>
                )}

                {/* Education Details */}
                <div className="flex-1 min-w-0">
                  <header className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {edu.name}
                    </h2>

                    <h3 className="text-base font-semibold text-gray-700 mb-1">
                      {edu.degree}
                    </h3>

                    {edu.department && (
                      <p className="text-sm text-gray-600">{edu.department}</p>
                    )}

                    {edu.college && (
                      <p className="text-sm text-gray-500">{edu.college}</p>
                    )}
                  </header>

                  {/* Location and Time */}
                  <footer className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 616 0z"
                        />
                      </svg>
                      <span>{edu.location}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                        />
                      </svg>
                      <time>{edu.time}</time>
                    </div>
                  </footer>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
