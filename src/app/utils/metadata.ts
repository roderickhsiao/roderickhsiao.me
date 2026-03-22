import type { Metadata } from 'next';

const SITE_URL = 'https://roderickhsiao.me';

type Translator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

type MetaPageKey = 'home' | 'activity' | 'education' | 'travel' | 'projects';
type OgTheme = 'activity' | 'education' | 'travel';

type BuildPageMetadataOptions = {
  t: Translator;
  pageKey: MetaPageKey;
  path: '' | `/${string}`;
  includeSocial?: boolean;
  ogTheme?: OgTheme;
};

function buildCanonicalUrl(path: '' | `/${string}`): string {
  return `${SITE_URL}${path}`;
}

function buildPageAlternates(path: '' | `/${string}`): Metadata['alternates'] {
  const canonical = buildCanonicalUrl(path);
  return {
    canonical,
    languages: {
      en: canonical,
      'zh-Hant': buildCanonicalUrl(`/zh-Hant${path}`),
      'x-default': canonical,
    },
  };
}

function buildOgImageUrl(params: {
  title: string;
  subtitle: string;
  description: string;
  theme: OgTheme;
}): string {
  const ogParams = new URLSearchParams(params);
  return `/api/og?${ogParams.toString()}`;
}

export function buildPageMetadata({
  t,
  pageKey,
  path,
  includeSocial = false,
  ogTheme,
}: BuildPageMetadataOptions): Metadata {
  const metadata: Metadata = {
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    keywords: t.raw(`${pageKey}.keywords`) as string[],
    alternates: buildPageAlternates(path),
  };

  if (!includeSocial) {
    return metadata;
  }

  const canonical = buildCanonicalUrl(path);
  const ogImageUrl = ogTheme
    ? buildOgImageUrl({
      title: t(`${pageKey}.ogImageTitle`),
      subtitle: t(`${pageKey}.ogImageSubtitle`),
      description: t(`${pageKey}.ogImageDescription`),
      theme: ogTheme,
    })
    : '/api/og';

  metadata.openGraph = {
    title: t(`${pageKey}.ogTitle`),
    description: t(`${pageKey}.ogDescription`),
    url: canonical,
    siteName: t('siteName'),
    images: [{
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: t(`${pageKey}.ogAlt`),
    }],
    locale: 'en_US',
    type: 'website',
  };

  metadata.twitter = {
    card: 'summary_large_image',
    title: t(`${pageKey}.ogTitle`),
    description: t(`${pageKey}.ogDescription`),
    images: [ogImageUrl],
  };

  return metadata;
}
