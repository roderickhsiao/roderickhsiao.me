import type { Metadata } from 'next';
import Projects from '@/app/components/Projects/Projects';

export const metadata: Metadata = {
  title: 'Projects - Roderick Hsiao',
  description: 'Explore my open source projects, personal tools, and contributions to the developer community. From React libraries to developer tools, discover projects built with passion for solving real-world problems.',
  keywords: ['Roderick Hsiao', 'Projects', 'Open Source', 'GitHub', 'React', 'TypeScript', 'Developer Tools', 'Libraries'],
};

export default function ProjectsPage() {
  return <Projects />;
}
