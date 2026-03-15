import type { Metadata, Viewport } from 'next';

import { Plus_Jakarta_Sans, Crimson_Pro } from 'next/font/google';
import './globals.css';

import type { ReactNode } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import Footer from '@/app/components/layout/Footer';
import DevToolsMessage from '@/app/components/shared/DevToolsMessage';

/**
 * Plus Jakarta Sans — primary display & body sans-serif
 * Registered as --font-jakarta, consumed by --font-sans in globals.css
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

/**
 * Crimson Pro — editorial italic serif
 * Registered as --font-crimson, consumed by --font-serif in globals.css
 */
const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  style: ['normal', 'italic'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://roderickhsiao.me'),
  title: 'Roderick Hsiao - Software Architect & Community Leader',
  description:
    'Personal website of Roderick Hsiao - Software Architect, Community Leader, and technology enthusiast. Explore my journey, projects, and thoughts on building great products.',
  keywords: [
    'Roderick Hsiao',
    'Software Architect',
    'Community Leader',
    'Frontend',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Roderick Hsiao' }],
  openGraph: {
    title: 'Roderick Hsiao - Software Architect & Community Leader',
    description:
      'Personal website of Roderick Hsiao - Software Architect, Community Leader, and technology enthusiast.',
    url: 'https://roderickhsiao.me',
    siteName: 'Roderick Hsiao',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Roderick Hsiao - Software Architect & Community Leader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roderick Hsiao - Software Architect & Community Leader',
    description:
      'Personal website of Roderick Hsiao - Software Architect, Community Leader, and technology enthusiast.',
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
      <body
        className={`${jakarta.variable} ${crimson.variable} font-sans antialiased bg-canvas text-ink`}
      >
        <DevToolsMessage />
        <MainLayout main={children} footer={<Footer />} />
        {/* SVG filter for glass-morphism effects */}
        <svg style={{ display: 'none' }} aria-hidden="true" focusable="false">
          <filter
            id="glass-filter"
            colorInterpolationFilters="linearRGB"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
          >
            <feDisplacementMap
              in="SourceGraphic"
              in2="SourceGraphic"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="B"
              x="0%" y="0%" width="100%" height="100%"
              result="displacementMap"
            />
            <feGaussianBlur
              stdDeviation="3 3"
              x="0%" y="0%" width="100%" height="100%"
              in="displacementMap"
              edgeMode="none"
              result="blur"
            />
          </filter>
        </svg>
      </body>
    </html>
  );
}
