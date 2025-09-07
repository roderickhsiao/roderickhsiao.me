import activities from '../../data/activity';
import speaking from '../../data/speaking';
import ActivityCard from './ActivityCard';
import SummarySection from '../shared/SummarySection';

interface ActivityItem {
  name: string;
  org: string;
  year: string;
  summary: string;
  smartlink?: {
    url: string;
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface SpeakingItem {
  title: string;
  event: string;
  year: string;
  url: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

export default function Activity() {
  const summaryData = {
    title: "Community Impact & Social Responsibility",
    description: "Technology has the power to transform society, but with that power comes responsibility. I believe in using my platform and expertise to promote equity, inclusivity, and create positive change in our communities and society at large.",
    summaryItems: [
      {
        title: "Breaking Barriers",
        icon: (
          <svg
            className="w-4 h-4 mr-2 text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
              clipRule="evenodd"
            />
          </svg>
        ),
        items: [
          "Promoting equity and inclusion in all aspects of life.",
          "Advocating for underrepresented voices across communities.",
          "Supporting accessibility and universal design principles.",
          "Building bridges between different social groups."
        ]
      },
      {
        title: "Social Impact",
        icon: (
          <svg
            className="w-4 h-4 mr-2 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        items: [
          "Supporting open source initiatives for social good.",
          "Mentoring emerging talent from diverse backgrounds.",
          "Speaking out on ethics and social responsibility.",
          "Contributing to community-driven projects and causes."
        ]
      }
    ]
  };

  return (
    <main className="max-w-4xl mx-auto space-y-8">
      {/* Summary Section */}
      <SummarySection 
        title={summaryData.title}
        description={summaryData.description}
        summaryItems={summaryData.summaryItems}
      />

      {/* Activities Header */}
      <section className="space-y-6">
        <header>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Activities</h1>
          <p className="text-sm text-gray-600">Speaking engagements and community work</p>
        </header>

        {/* Speaking Section */}
        <section className="space-y-4">
          <header>
            <h2 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <svg 
                className="w-4 h-4 mr-2 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Speaking
            </h2>
          </header>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-3">
            {speaking.map((talk: SpeakingItem, index: number) => (
              <ActivityCard
                key={index}
                title={talk.title.split(' | ')[1] || talk.title}
                subtitle={`${talk.event} ${talk.year}`}
                thumbnail={talk.thumbnail}
                url={talk.url}
                colorTheme="blue"
              />
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section className="space-y-4">
          <header>
            <h2 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <svg 
                className="w-4 h-4 mr-2 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Community
            </h2>
          </header>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-3">
            {activities.map((item: ActivityItem, index: number) => (
              <ActivityCard
                key={index}
                title={item.name}
                subtitle={`${item.org} • ${item.year}`}
                summary={item.summary}
                thumbnail={item.smartlink?.thumbnail}
                url={item.smartlink?.url}
                colorTheme="green"
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
