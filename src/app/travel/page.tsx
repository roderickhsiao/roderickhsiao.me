import type { Metadata } from 'next';
import Travel from '../components/Travel/Travel';

export const metadata: Metadata = {
  title: 'Travel Adventures - Roderick Hsiao',
  description: 'Follow my travel adventures around the world. Discover the places I\'ve visited, experiences I\'ve had, and the inspiration I draw from exploring different cultures.',
  keywords: ['Roderick Hsiao', 'Travel', 'Adventures', 'World Travel', 'Culture', 'Exploration', 'Photography'],
  openGraph: {
    title: 'Travel Adventures - Roderick Hsiao',
    description: 'Follow my travel adventures around the world and discover different cultures.',
    url: 'https://roderickhsiao.me/travel',
    siteName: 'Roderick Hsiao',
    images: [
      {
        url: '/api/og?title=Travel%20Adventures&subtitle=Exploring%20the%20World&description=Discovering%20cultures%20and%20drawing%20inspiration%20from%20global%20experiences&theme=travel',
        width: 1200,
        height: 630,
        alt: 'Travel Adventures - Roderick Hsiao',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Adventures - Roderick Hsiao',
    description: 'Follow my travel adventures around the world and discover different cultures.',
    images: ['/api/og?title=Travel%20Adventures&subtitle=Exploring%20the%20World&description=Discovering%20cultures%20and%20drawing%20inspiration%20from%20global%20experiences&theme=travel'],
  },
};

export default function TravelPage() {
  return <Travel />;
}
