import type { Metadata } from 'next';
import Projects from '@/app/components/Projects/Projects';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes from '@/app/components/shared/FieldNotes';

export const metadata: Metadata = {
  title: 'Projects - Roderick Hsiao',
  description: 'Explore my open source projects, personal tools, and contributions to the developer community. From React libraries to developer tools, discover projects built with passion for solving real-world problems.',
  keywords: ['Roderick Hsiao', 'Projects', 'Open Source', 'GitHub', 'React', 'TypeScript', 'Developer Tools', 'Libraries'],
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow="Open Source // Developer Tools"
        title={<>Open<br />Source</>}
        description="From React libraries to developer tools — a collection of projects built to solve real-world problems, shared openly with the community."
        className="pb-20"
      />

      <FieldNotes
        label="BUILD LOG // PUBLIC REPO"
        heading={<>Open Source &amp;<br />Developer<br />Tools</>}
        items={[
          { num: '01', icon: '🔧', title: 'Open Source',   items: ['Active contributor to open source.', 'Building tools that developers love.'] },
          { num: '02', icon: '⚡', title: 'Performance',   items: ['Accessibility and performance focused.', 'Community-driven development.'] },
          { num: '03', icon: '📦', title: 'Libraries',     items: ['Published npm packages for the ecosystem.', 'TypeScript-first, type-safe APIs.'] },
          { num: '04', icon: '🤝', title: 'Collaboration', items: ['Open to contributions and feedback.', 'Building solutions with the community.'] },
        ]}
      />

      <div className="mt-16" />
      <Projects />
    </div>
  );
}
