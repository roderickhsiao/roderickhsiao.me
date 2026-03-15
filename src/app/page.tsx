import type { Metadata } from 'next';
import PageHero from '@/app/components/shared/PageHero';
import ChronicleSection from '@/app/components/Home/ChronicleSection';
import FieldNotes from '@/app/components/shared/FieldNotes';

export const metadata: Metadata = {
  title: 'Roderick Hsiao - Software Architect & Community Leader',
  description:
    'Personal website of Roderick Hsiao — frontend architect, community leader, and open web advocate with 16+ years of industry impact.',
  keywords: [
    'Roderick Hsiao',
    'Software Architect',
    'Community Leader',
    'Frontend',
    'React',
    'Next.js',
    'TypeScript',
    'Experience',
  ],
};

export default function Home() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow="Product Engineering // Frontend Architecture"
        title={
          <>
            Roderick
            <br />
            <span className="text-accent ms-[6vw] sm:ms-[9vw]">Hsiao</span>
          </>
        }
        description="Product engineering consultant specializing in frontend infrastructure, design systems, and large-scale application development for global startups and Fortune 500 companies."
        className="pb-20"
      />

      <FieldNotes
        label="CAREER LOG // STILL SHIPPING"
        heading={<>Career &amp;<br />Highlights</>}
        items={[
          { num: '01', icon: '💼', title: 'Experience', items: ['16+ years in product engineering.', 'Startup to Fortune 500 range.'] },
          { num: '02', icon: '🚀', title: 'Leadership', items: ['Frontend infra & design systems.', 'Team technical mentorship.'] },
          { num: '03', icon: '📈', title: 'Impact',     items: ['Serving millions of users.', 'Architecting for extreme scale.'] },
          { num: '04', icon: '📣', title: 'Community',  items: ['International tech speaker.', 'Open web & OSS advocate.'] },
        ]}
      />

      <div className="mt-16" />
      <ChronicleSection />
    </div>
  );
}
