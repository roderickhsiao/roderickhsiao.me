import type { Metadata } from 'next';
import Activity from '@/app/components/Activity/Activity';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes from '@/app/components/shared/FieldNotes';

export const metadata: Metadata = {
  title: 'Activities & Speaking - Roderick Hsiao',
  description: 'Explore my speaking engagements, conference talks, workshops, and community activities. Learn about my contributions to the tech community.',
  keywords: ['Roderick Hsiao', 'Speaking', 'Conferences', 'Tech Talks', 'Workshops', 'Community', 'Activities'],
  openGraph: {
    title: 'Activities & Speaking - Roderick Hsiao',
    description: 'Explore my speaking engagements, conference talks, workshops, and community activities.',
    url: 'https://roderickhsiao.me/activity',
    siteName: 'Roderick Hsiao',
    images: [
      {
        url: '/api/og?title=Activities%20%26%20Speaking&subtitle=Conference%20Talks%20%26%20Community&description=Sharing%20knowledge%20and%20building%20tech%20communities&theme=activity',
        width: 1200,
        height: 630,
        alt: 'Activities & Speaking - Roderick Hsiao',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activities & Speaking - Roderick Hsiao',
    description: 'Explore my speaking engagements, conference talks, workshops, and community activities.',
    images: ['/api/og?title=Activities%20%26%20Speaking&subtitle=Conference%20Talks%20%26%20Community&description=Sharing%20knowledge%20and%20building%20tech%20communities&theme=activity'],
  },
};

export default function ActivityPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow="Speaking // Community"
        title={<>Activities &amp;<br />Speaking</>}
        description="Conference talks, workshops, and community involvement — sharing knowledge and building connections across the tech ecosystem."
        className="pb-20"
      />

      <FieldNotes
        label="TALK TRACK // SLIDES READY"
        heading={<>Activities &amp;<br />Speaking</>}
        items={[
          { num: '01', icon: '🎤', title: 'Speaking',  items: ['Conference talks and workshops.', 'JSConf and community tech events.'] },
          { num: '02', icon: '🤝', title: 'Community', items: ['Open source leadership and stewardship.', 'Mentoring emerging developers.'] },
          { num: '03', icon: '🌱', title: 'Equity',    items: ['Promoting inclusion and diversity in tech.', 'Advocating for underrepresented voices.'] },
          { num: '04', icon: '✨', title: 'Impact',    items: ['Technology for positive social change.', 'Building for communities that matter.'] },
        ]}
      />

      <div className="mt-16" />
      <Activity />
    </div>
  );
}
