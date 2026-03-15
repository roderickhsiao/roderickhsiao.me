import type { Metadata } from 'next';
import Education from '@/app/components/Education/Education';
import PageHero from '@/app/components/shared/PageHero';
import FieldNotes from '@/app/components/shared/FieldNotes';

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
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <PageHero
        eyebrow="Academic Foundation // Continuous Learning"
        title={<>Education &amp;<br />Background</>}
        description="The academic and learning foundation that shaped my approach to engineering, product thinking, and building things that matter."
        className="pb-20"
      />

      <FieldNotes
        label="STUDY LOG // MOSTLY SURVIVED"
        heading={<>Education &amp;<br />Background</>}
        items={[
          { num: '01', icon: '🎓', title: 'Academic',    items: ['Strong computer science foundations.', 'Research and theory-backed approaches.'] },
          { num: '02', icon: '🔬', title: 'Curiosity',   items: ['Continuous self-directed learning.', 'Always exploring emerging technologies.'] },
          { num: '03', icon: '🏫', title: 'Teaching',    items: ['Knowledge sharing through mentorship.', 'Speaking at tech conferences and workshops.'] },
          { num: '04', icon: '💡', title: 'Application', items: ['Bridging theory into practice.', 'Solving real-world engineering problems.'] },
        ]}
      />

      <div className="mt-16" />
      <Education />
    </div>
  );
}
