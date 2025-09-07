import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://roderickhsiao.me'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
      ],
      crawlDelay: 1,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
