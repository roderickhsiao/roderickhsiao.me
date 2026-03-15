import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Plus_Jakarta_Sans, Crimson_Pro } from 'next/font/google';
import '../globals.css';

import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import MainLayout from '@/app/components/layout/MainLayout';
import Footer from '@/app/components/layout/Footer';
import DevToolsMessage from '@/app/components/shared/DevToolsMessage';
import { routing } from '@/i18n/routing';

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pageMeta');
  return {
    metadataBase: new URL('https://roderickhsiao.me'),
    title: t('home.title'),
    description: t('home.description'),
    keywords: t.raw('home.keywords') as string[],
    authors: [{ name: t('authorName') }],
    openGraph: {
      title: t('home.ogTitle'),
      description: t('home.ogDescription'),
      url: 'https://roderickhsiao.me',
      siteName: t('siteName'),
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: t('home.ogAlt'),
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: 'https://roderickhsiao.me',
      languages: {
        en: 'https://roderickhsiao.me',
        'zh-Hant': 'https://roderickhsiao.me/zh-Hant',
        'x-default': 'https://roderickhsiao.me',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.ogTitle'),
      description: t('home.ogDescription'),
      images: ['/api/og'],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${jakarta.variable} ${crimson.variable} font-sans antialiased bg-canvas text-ink`}
      >
        <NextIntlClientProvider messages={messages}>
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
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="displacementMap"
              />
              <feGaussianBlur
                stdDeviation="3 3"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="displacementMap"
                edgeMode="none"
                result="blur"
              />
            </filter>
          </svg>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
