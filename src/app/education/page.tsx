import type { Metadata } from 'next';
import Education from '@/app/components/Education/Education';

export const metadata: Metadata = {
  title: 'Education & Background - Roderick Hsiao',
  description: 'Learn about my educational background, academic achievements, and the foundation that shaped my career in technology and product development.',
  keywords: ['Roderick Hsiao', 'Education', 'Background', 'Academic', 'University', 'Learning', 'Career Foundation'],
  openGraph: {
    title: 'Education & Background - Roderick Hsiao',
    description: 'Learn about my educational background and the foundation that shaped my career.',
    url: 'https://roderickhsiao.me/education',
    siteName: 'Roderick Hsiao',
    images: [
      {
        url: '/api/og?title=Education%20%26%20Background&subtitle=Academic%20Foundation&description=Building%20the%20foundation%20for%20a%20career%20in%20technology&theme=education',
        width: 1200,
        height: 630,
        alt: 'Education & Background - Roderick Hsiao',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education & Background - Roderick Hsiao',
    description: 'Learn about my educational background and the foundation that shaped my career.',
    images: ['/api/og?title=Education%20%26%20Background&subtitle=Academic%20Foundation&description=Building%20the%20foundation%20for%20a%20career%20in%20technology&theme=education'],
  },
};

export default function EducationPage() {
  return <Education />;
}
