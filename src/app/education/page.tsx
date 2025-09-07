import type { Metadata } from 'next';
import Education from '@/app/components/Education/Education';

export const metadata: Metadata = {
  title: 'Education & Background - Roderick Hsiao',
  description: 'Learn about my educational background, academic achievements, and the foundation that shaped my career in technology and product development.',
  keywords: ['Roderick Hsiao', 'Education', 'Background', 'Academic', 'University', 'Learning', 'Career Foundation'],
};

export default function EducationPage() {
  return <Education />;
}
