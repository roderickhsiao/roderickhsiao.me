import type { Metadata, Viewport } from 'next';

import { Roboto } from 'next/font/google';
import './globals.css';

import { ReactNode } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import Footer from '@/app/components/layout/Footer';
import Contact from '@/app/components/Home/Contact';
import About from '@/app/components/Home/About';
import MainBrief from '@/app/components/Home/MainBrief';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Roderick Hsiao - Software Engineer & Product Leader',
  description: 'Personal website of Roderick Hsiao - Software Engineer, Product Leader, and technology enthusiast. Explore my journey, projects, and thoughts on building great products.',
  keywords: ['Roderick Hsiao', 'Software Engineer', 'Product Leader', 'Frontend', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Roderick Hsiao' }],
  openGraph: {
    title: 'Roderick Hsiao - Software Engineer & Product Leader',
    description: 'Personal website of Roderick Hsiao - Software Engineer, Product Leader, and technology enthusiast.',
    url: 'https://roderickhsiao.me',
    siteName: 'Roderick Hsiao',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Roderick Hsiao - Software Engineer & Product Leader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roderick Hsiao - Software Engineer & Product Leader',
    description: 'Personal website of Roderick Hsiao - Software Engineer, Product Leader, and technology enthusiast.',
    images: ['/api/og'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <MainLayout
          hero={<MainBrief />}
          main={children}
          rightRail={
            <>
              <Contact />
              <About />
            </>
          }
          footer={<Footer />}
        />
      </body>
    </html>
  );
}
