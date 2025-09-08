/**
 * Utility function to generate OG image URLs
 */

interface OGImageParams {
  title?: string;
  subtitle?: string;
  description?: string;
  theme?: 'default' | 'activity' | 'education' | 'travel';
}

export function generateOGImageUrl(params: OGImageParams = {}): string {
  const baseUrl = '/api/og';
  const searchParams = new URLSearchParams();

  if (params.title) {
    searchParams.set('title', params.title);
  }
  
  if (params.subtitle) {
    searchParams.set('subtitle', params.subtitle);
  }
  
  if (params.description) {
    searchParams.set('description', params.description);
  }
  
  if (params.theme && params.theme !== 'default') {
    searchParams.set('theme', params.theme);
  }

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Pre-configured OG image generators for common pages
 */
export const ogImagePresets = {
  home: () => generateOGImageUrl({
    title: 'Roderick Hsiao',
    subtitle: 'Software Architect & Community Leader',
    description: 'Building great products with modern technology',
    theme: 'default'
  }),
  
  activity: () => generateOGImageUrl({
    title: 'Activities & Speaking',
    subtitle: 'Conference Talks & Community',
    description: 'Sharing knowledge and building tech communities',
    theme: 'activity'
  }),
  
  education: () => generateOGImageUrl({
    title: 'Education & Background',
    subtitle: 'Academic Foundation',
    description: 'Building the foundation for a career in technology',
    theme: 'education'
  }),
  
  travel: () => generateOGImageUrl({
    title: 'Travel Adventures',
    subtitle: 'Exploring the World',
    description: 'Discovering cultures and drawing inspiration from global experiences',
    theme: 'travel'
  })
};
