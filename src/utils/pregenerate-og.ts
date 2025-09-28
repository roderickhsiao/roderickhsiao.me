// Pre-generate common OG images to reduce ISR costs
// Add this to your build process

const commonOGImages = [
  {
    params: new URLSearchParams({
      title: 'Roderick Hsiao',
      subtitle: 'Software Architect & Community Leader',
      description: 'Building great products with modern technology.',
      theme: 'default'
    })
  },
  {
    params: new URLSearchParams({
      title: 'Travel Adventures',
      subtitle: 'Exploring the World', 
      description: 'Discovering cultures and drawing inspiration from global experiences',
      theme: 'travel'
    })
  },
  {
    params: new URLSearchParams({
      title: 'Activities & Speaking',
      subtitle: 'Conference Talks & Community',
      description: 'Sharing knowledge and building tech communities',
      theme: 'activity'
    })
  },
  {
    params: new URLSearchParams({
      title: 'Education & Background',
      subtitle: 'Academic Foundation',
      description: 'Building the foundation for a career in technology',
      theme: 'education'
    })
  }
];

export { commonOGImages };