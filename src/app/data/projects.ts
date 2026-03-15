// Open source projects — structural/non-translatable fields only.
// All display text (name, description, highlights, link titles/descriptions)
// lives in en.json under 'projects.items'.
export interface ProjectLink {
  url: string;
  thumbnail?: string;
}

export interface Project {
  key: string;
  techStack: string[];
  category: 'Open Source' | 'Personal' | 'Tool' | 'Library';
  status: 'Active' | 'Maintained' | 'Archived';
  year: string;
  github?: ProjectLink;
  demo?: ProjectLink;
  npm?: ProjectLink;
  stars?: number;
  downloads?: string;
}

const projects: Project[] = [
  {
    key: 'reactInViewport',
    techStack: ['React', 'TypeScript', 'Intersection Observer API', 'Jest', 'Rollup'],
    category: 'Open Source',
    status: 'Active',
    year: '2017 - Present',
    github: { url: 'https://github.com/roderickhsiao/react-in-viewport', thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4' },
    demo: { url: 'https://roderickhsiao.github.io/react-in-viewport/' },
    npm: { url: 'https://npmjs.com/package/react-in-viewport' },
    stars: 350,
    downloads: '46k/week'
  },
  {
    key: 'reactAspectRatio',
    techStack: ['React', 'TypeScript', 'CSS', 'Jest'],
    category: 'Open Source',
    status: 'Active',
    year: '2017 - Present',
    github: { url: 'https://github.com/roderickhsiao/react-aspect-ratio', thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4' },
    npm: { url: 'https://npmjs.com/package/react-aspect-ratio' },
    stars: 104,
    downloads: '12k/week'
  },
  {
    key: 'idleTracker',
    techStack: ['JavaScript', 'Browser APIs', 'Event Listeners'],
    category: 'Open Source',
    status: 'Maintained',
    year: '2019 - Present',
    github: { url: 'https://github.com/roderickhsiao/idle-tracker', thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4' },
    npm: { url: 'https://npmjs.com/package/idle-tracker' },
    stars: 21,
    downloads: '2k/week'
  },
  {
    key: 'reactI13n',
    techStack: ['React', 'JavaScript', 'Analytics', 'Instrumentation'],
    category: 'Open Source',
    status: 'Active',
    year: '2015 - Present',
    github: { url: 'https://github.com/yahoo/react-i13n', thumbnail: 'https://avatars.githubusercontent.com/u/16574?v=4' },
    npm: { url: 'https://npmjs.com/package/react-i13n' },
    stars: 384
  },
  {
    key: 'subscribeUiEvent',
    techStack: ['JavaScript', 'Browser APIs', 'Event Management', 'Performance'],
    category: 'Open Source',
    status: 'Maintained',
    year: '2015 - Present',
    github: { url: 'https://github.com/yahoo/subscribe-ui-event', thumbnail: 'https://avatars.githubusercontent.com/u/16574?v=4' },
    npm: { url: 'https://npmjs.com/package/subscribe-ui-event' },
    stars: 110
  }
];

export const projectCategories = [
  'All',
  'Open Source',
  'Personal',
  'Tool',
  'Library'
] as const;

export type ProjectCategory = typeof projectCategories[number];

export default projects;
