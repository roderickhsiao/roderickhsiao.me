import type { Metadata } from 'next';
import Travel from '../components/Travel/Travel';

export const metadata: Metadata = {
  title: 'Travel Adventures - Roderick Hsiao',
  description: 'Follow my travel adventures around the world. Discover the places I\'ve visited, experiences I\'ve had, and the inspiration I draw from exploring different cultures.',
  keywords: ['Roderick Hsiao', 'Travel', 'Adventures', 'World Travel', 'Culture', 'Exploration', 'Photography'],
};

export default function TravelPage() {
  return <Travel />;
}
