import { MetadataRoute } from 'next'

// Revalidate sitemap every 24 hours instead of on every request
export const revalidate = 86400; // 24 hours in seconds

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://roderickhsiao.me'
  const currentDate = new Date().toISOString()

  const pages = [
    { path: '',        changeFrequency: 'daily'  as const, priority: 1.0 },
    { path: '/activity',  changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/education', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/projects',  changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/travel',    changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        'zh-Hant': `${baseUrl}/zh-Hant${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
  }))
}
