// Speaking engagements and presentations.
// Display fields are stored explicitly so the UI does not infer structure from strings.
export interface SpeakingItem {
  id: string;
  event: string;
  year: string;
  title: string;
  sourceUrl: string;
  sourceLabel: string;
  embedUrl?: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

const speaking: SpeakingItem[] = [
  {
    id: 'react-norway-2021',
    event: 'React Norway',
    year: '2021',
    title: 'Progressively Enhance Your Web Application',
    sourceUrl: 'https://www.youtube.com/watch?v=tSMmsEh7eAk',
    sourceLabel: 'Watch on YouTube',
    embedUrl: 'https://www.youtube.com/embed/tSMmsEh7eAk?autoplay=1&rel=0',
    thumbnail: {
      url: '/react-norway.jpeg',
      width: 800,
      height: 450
    }
  },
  {
    id: 'jscamp-2021',
    event: 'JS Camp',
    year: '2021',
    title: 'Building Large-Scale Web Apps',
    sourceUrl: 'https://www.youtube.com/watch?v=TCYI3SuQmw0',
    sourceLabel: 'Watch on YouTube',
    embedUrl: 'https://www.youtube.com/embed/TCYI3SuQmw0?autoplay=1&rel=0',
    thumbnail: {
      url: '/js-camp-2021.jpeg',
      width: 640,
      height: 480
    }
  },
  {
    id: 'accento-2020',
    event: 'Accento',
    year: '2020',
    title: 'Progressively Enhance Your Web Application',
    sourceUrl: 'https://www.youtube.com/watch?v=H2KvgVSQ_pE',
    sourceLabel: 'Watch on YouTube',
    embedUrl: 'https://www.youtube.com/embed/H2KvgVSQ_pE?autoplay=1&rel=0',
    thumbnail: {
      url: '/accento.jpeg',
      width: 800,
      height: 450
    }
  },
  {
    id: 'geekle-2020',
    event: 'Geekle',
    year: '2020',
    title: 'Building Large Scale Web App',
    sourceUrl: 'https://app.geekle.us/',
    sourceLabel: 'Visit website',
    thumbnail: {
      url: '/geekle.jpeg',
      width: 800,
      height: 800
    }
  }
];

export default speaking;
