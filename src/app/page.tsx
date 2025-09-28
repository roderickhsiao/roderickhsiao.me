import type { Metadata } from 'next';
import Experience from '@/app/components/Home/Experience';

// Force static generation - this page doesn't change frequently
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours

export const metadata: Metadata = {
  title: 'Roderick Hsiao - Software Architect & Community Leader',
  description: 'Welcome to my personal website. I’m a Software Architect and Community Leader passionate about building great products and leading high-performing teams.',
  keywords: ['Roderick Hsiao', 'Software Architect', 'Community Leader', 'Frontend', 'React', 'Next.js', 'TypeScript', 'Experience'],
};

export default function Home() {
  return <Experience />;
}
