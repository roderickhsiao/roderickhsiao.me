import type { Metadata } from 'next';
import MainBrief from '@/app/components/Home/MainBrief';
import Experience from '@/app/components/Home/Experience';

export const metadata: Metadata = {
  title: 'Roderick Hsiao - Software Engineer & Product Leader',
  description: 'Welcome to my personal website. I\'m a Software Engineer and Product Leader passionate about building great products and leading high-performing teams.',
  keywords: ['Roderick Hsiao', 'Software Engineer', 'Product Leader', 'Frontend', 'React', 'Next.js', 'TypeScript', 'Experience'],
};

export default function Home() {
  return <Experience />;
}

export { MainBrief };
