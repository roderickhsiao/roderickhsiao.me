// Open source projects and personal projects
export interface ProjectLink {
  url: string;
  title: string;
  description?: string;
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  } | string;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  category: 'Open Source' | 'Personal' | 'Tool' | 'Library';
  status: 'Active' | 'Maintained' | 'Archived';
  year: string;
  github?: ProjectLink;
  demo?: ProjectLink;
  npm?: ProjectLink;
  highlights?: string[];
  stars?: number;
  downloads?: string;
}

const projects: Project[] = [
  {
    name: 'react-in-viewport',
    description: 'A React library to detect whether or not a component is in the viewport using the Intersection Observer API. Provides both Higher Order Component and hooks interfaces for detecting viewport visibility with excellent performance.',
    techStack: ['React', 'TypeScript', 'Intersection Observer API', 'Jest', 'Rollup'],
    category: 'Open Source',
    status: 'Active',
    year: '2017 - Present',
    github: {
      url: 'https://github.com/roderickhsiao/react-in-viewport',
      title: 'View on GitHub',
      description: 'Source code, documentation, and examples',
      thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4'
    },
    demo: {
      url: 'https://roderickhsiao.github.io/react-in-viewport/',
      title: 'Live Demo',
      description: 'Try the interactive examples'
    },
    npm: {
      url: 'https://npmjs.com/package/react-in-viewport',
      title: 'NPM Package',
      description: 'Install via npm or yarn'
    },
    highlights: [
      '350+ GitHub stars',
      '46k+ weekly downloads',
      'Used by Tinder and other major companies',
      'TypeScript support with built-in declarations'
    ],
    stars: 350,
    downloads: '46k/week'
  },
  {
    name: 'react-aspect-ratio',
    description: 'A React component to preserve space for your element and prevent browser reflow (layout shift). Helps maintain responsive layouts and improves Core Web Vitals by preventing Cumulative Layout Shift.',
    techStack: ['React', 'TypeScript', 'CSS', 'Jest'],
    category: 'Open Source',
    status: 'Active',
    year: '2017 - Present',
    github: {
      url: 'https://github.com/roderickhsiao/react-aspect-ratio',
      title: 'View on GitHub',
      description: 'Source code and documentation',
      thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4'
    },
    npm: {
      url: 'https://npmjs.com/package/react-aspect-ratio',
      title: 'NPM Package',
      description: 'Install via npm or yarn'
    },
    highlights: [
      '104+ GitHub stars',
      'Prevents browser reflow and layout shift',
      'Improves Core Web Vitals scores',
      'TypeScript support'
    ],
    stars: 104,
    downloads: '12k/week'
  },
  {
    name: 'idle-tracker',
    description: 'A lightweight JavaScript library to track browser inactivity and user idle state. Useful for implementing auto-logout features, pausing animations during inactivity, or tracking user engagement.',
    techStack: ['JavaScript', 'Browser APIs', 'Event Listeners'],
    category: 'Open Source',
    status: 'Maintained',
    year: '2019 - Present',
    github: {
      url: 'https://github.com/roderickhsiao/idle-tracker',
      title: 'View on GitHub',
      description: 'Source code and examples',
      thumbnail: 'https://avatars.githubusercontent.com/u/3906130?v=4'
    },
    npm: {
      url: 'https://npmjs.com/package/idle-tracker',
      title: 'NPM Package',
      description: 'Install via npm or yarn'
    },
    highlights: [
      '21+ GitHub stars',
      'Zero dependencies',
      'Cross-browser compatible',
      'Lightweight and performant'
    ],
    stars: 21,
    downloads: '2k/week'
  },
  {
    name: 'react-i13n',
    description: 'A performant, scalable and pluggable approach to instrumenting your React application. Provides a comprehensive instrumentation framework for tracking user interactions and analytics in React apps.',
    techStack: ['React', 'JavaScript', 'Analytics', 'Instrumentation'],
    category: 'Open Source',
    status: 'Active',
    year: '2015 - Present',
    github: {
      url: 'https://github.com/yahoo/react-i13n',
      title: 'View on GitHub',
      description: 'Yahoo open source project - Core contributor',
      thumbnail: 'https://avatars.githubusercontent.com/u/16574?v=4'
    },
    npm: {
      url: 'https://npmjs.com/package/react-i13n',
      title: 'NPM Package',
      description: 'Install via npm or yarn'
    },
    highlights: [
      '384+ GitHub stars',
      'Yahoo open source project',
      'Core contributor and maintainer',
      'Production-ready at scale'
    ],
    stars: 384
  },
  {
    name: 'subscribe-ui-event',
    description: 'Subscribe-ui-event provides a cross-browser and performant way to subscribe to browser UI Events. Optimizes event handling performance by using throttling and debouncing techniques.',
    techStack: ['JavaScript', 'Browser APIs', 'Event Management', 'Performance'],
    category: 'Open Source',
    status: 'Maintained',
    year: '2015 - Present',
    github: {
      url: 'https://github.com/yahoo/subscribe-ui-event',
      title: 'View on GitHub',
      description: 'Yahoo open source project - Core contributor',
      thumbnail: 'https://avatars.githubusercontent.com/u/16574?v=4'
    },
    npm: {
      url: 'https://npmjs.com/package/subscribe-ui-event',
      title: 'NPM Package',
      description: 'Install via npm or yarn'
    },
    highlights: [
      '110+ GitHub stars',
      'Yahoo open source project',
      'Core contributor and maintainer',
      'Cross-browser compatibility'
    ],
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
