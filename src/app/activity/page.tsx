import type { Metadata } from 'next';
import Activity from '@/app/components/Activity/Activity';

// Force static generation for activity page
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours

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
  return <Activity />;
}
