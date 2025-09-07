import type { Metadata } from 'next';
import Activity from '@/app/components/Activity/Activity';

export const metadata: Metadata = {
  title: 'Activities & Speaking - Roderick Hsiao',
  description: 'Explore my speaking engagements, conference talks, workshops, and community activities. Learn about my contributions to the tech community.',
  keywords: ['Roderick Hsiao', 'Speaking', 'Conferences', 'Tech Talks', 'Workshops', 'Community', 'Activities'],
};

export default function ActivityPage() {
  return <Activity />;
}
