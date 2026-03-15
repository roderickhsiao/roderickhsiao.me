// Work experience — structural/non-translatable fields only.
// All display text (company title, project names, summaries, smartlink
// titles/descriptions, demo titles) lives in en.json under 'experience.companies'.
export interface Smartlink {
  url: string;
  thumbnail?: string | { url: string; width?: number; height?: number };
  type?: string;
}

export interface Demo {
  thumbnail: { url: string; width?: number; height?: number };
  type: string;
  url: string;
}

export interface Project {
  key: string;
  /** ISO year-month, e.g. '2023-01' */
  startDate?: string;
  /** ISO year-month, or null meaning "present". Omit if same as startDate. */
  endDate?: string | null;
  techStack?: string[];
  smartlink?: Smartlink;
  demos?: Demo[];
}

export interface Company {
  key: string;
  name: string;
  logo?: string;
  /** ISO year-month, e.g. '2023-01' */
  startDate: string;
  /** ISO year-month, or null meaning "present" */
  endDate?: string | null;
  projects: Project[];
}

const experience: { companies: Company[] } = {
  companies: [
    {
      key: 'kindred',
      name: 'Kindred',
      logo: '/kindredLogo.svg',
      startDate: '2023-01',
      endDate: null,
      projects: [
        {
          key: 'main',
          startDate: '2023-01',
          endDate: null,
          techStack: ['NextJS', 'React', 'React Native', 'Tailwind CSS', 'TypeScript'],
          smartlink: {
            url: 'https://livekindred.com/',
            thumbnail: { url: '/kindred.svg', width: 200, height: 200 },
          },
        },
      ],
    },
    {
      key: 'selfEmployed',
      name: 'Self Employed',
      startDate: '2021-03',
      endDate: null,
      projects: [
        {
          key: 'alt',
          startDate: '2021-03',
          endDate: '2022-12',
          techStack: ['React'],
          smartlink: {
            thumbnail: { url: '/alt.jpg', width: 400, height: 400 },
            url: 'https://alt.xyz/',
          },
        },
        {
          key: 'forethought',
          startDate: '2021-08',
          endDate: '2022-07',
          techStack: ['React'],
          smartlink: {
            thumbnail: { url: '/forethought.jpg', width: 400, height: 400 },
            url: 'https://www.forethought.ai/',
          },
        },
        {
          key: 'publicSpeaker',
          startDate: '2020-07',
          endDate: null,
          techStack: ['JavaScript', 'React'],
          demos: [
            {
              thumbnail: { url: '/react-norway.jpeg', width: 800, height: 450 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=tSMmsEh7eAk',
            },
            {
              thumbnail: { url: '/js-camp-2021.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=TCYI3SuQmw0',
            },
            {
              thumbnail: { url: '/accento.jpeg', width: 800, height: 450 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=H2KvgVSQ_pE',
            },
            {
              thumbnail: { url: '/geekle.jpeg', width: 800, height: 800 },
              type: 'iframe',
              url: 'https://react.geekle.us/',
            },
          ],
        },
      ],
    },
    {
      key: 'tinder',
      name: 'Tinder',
      logo: '/tinderLogo.svg',
      startDate: '2017-02',
      endDate: '2023-01',
      projects: [
        {
          key: 'tinderOnline',
          startDate: '2017-02',
          endDate: '2023-01',
          techStack: ['NodeJS', 'React', 'Redux'],
          smartlink: {
            thumbnail: { url: '/tinder.jpeg', width: 200, height: 200 },
            url: 'https://tinder.com',
          },
          demos: [
            {
              thumbnail: { url: '/google-io-2017.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/aCMbSyngXB4?t=918',
            },
            {
              thumbnail: { url: '/cds-2017.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/_srJ7eHS3IM?t=1732',
            },
            {
              thumbnail: { url: '/cds-2019.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/puUPpVrIRkc?t=1231',
            },
            {
              thumbnail: { url: '/cds-2020.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/cmRqQJBIp_A?t=1090',
            },
            {
              thumbnail: { url: '/cds-2020-2.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/sU4MpWYrGSI?t=429',
            },
          ],
        },
        {
          key: 'swipeLife',
          startDate: '2017-11',
          techStack: ['GatsbyJS', 'WordPress'],
        },
      ],
    },
    {
      key: 'branch',
      name: 'Branch',
      logo: '/branchLogo.svg',
      startDate: '2016-07',
      endDate: '2017-01',
      projects: [
        {
          key: 'dashboard',
          startDate: '2016-07',
          endDate: '2017-01',
          techStack: ['NodeJS', 'React', 'Redux'],
          smartlink: {
            thumbnail: { url: '/branch.jpg', width: 400, height: 400 },
            url: 'https://branch.io',
          },
        },
      ],
    },
    {
      key: 'yahooSenior',
      name: 'Yahoo',
      logo: '/yahooLogo.svg',
      startDate: '2009-11',
      endDate: '2016-07',
      projects: [
        {
          key: 'homepage',
          startDate: '2014-06',
          endDate: '2016-07',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            url: 'https://www.yahoo.com/',
          },
        },
        {
          key: 'weather',
          startDate: '2014-06',
          endDate: '2016-07',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          smartlink: {
            thumbnail: { url: '/yahooWeather.png', width: 200, height: 200 },
            url: 'https://www.yahoo.com/news/weather',
          },
        },
        {
          key: 'newsDigest',
          startDate: '2014-06',
          endDate: '2016-07',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          smartlink: {
            thumbnail: { url: '/yahooNewsDigest.png', width: 200, height: 200 },
            url: 'https://www.yahoo.com/digest',
          },
        },
        {
          key: 'mobileHomepage',
          startDate: '2013-10',
          endDate: '2014-06',
          techStack: ['DustJS', 'ExpressJS', 'YUI'],
        },
      ],
    },
    {
      key: 'yahooLead',
      name: 'Yahoo',
      logo: '/yahooLogo.svg',
      startDate: '2013-04',
      endDate: '2013-10',
      projects: [
        {
          key: 'apacMobile',
          startDate: '2013-04',
          endDate: '2013-10',
          techStack: ['CSS', 'DustJS', 'ExpressJS', 'YUI'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            url: 'https://tw.mobi.yahoo.com/',
          },
        },
      ],
    },
    {
      key: 'yahooQe',
      name: 'Yahoo',
      logo: '/yahooLogo.svg',
      startDate: '2009-11',
      endDate: '2013-04',
      projects: [
        {
          key: 'controlRoom',
          startDate: '2012-09',
          endDate: '2012-12',
          techStack: ['CSS', 'PHP', 'YUI'],
          smartlink: {
            type: 'large',
            thumbnail: { url: '/controlRoom.jpg', width: 640, height: 511 },
            url: 'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false',
          },
        },
        {
          key: 'hashout',
          startDate: '2012-06',
          endDate: '2012-09',
          techStack: ['CSS', 'PHP', 'YUI'],
          smartlink: {
            type: 'large',
            thumbnail: { url: '/hashout.jpg', width: 630, height: 355 },
            url: 'https://www.yahoo.com/news',
          },
        },
        {
          key: 'globalNews',
          startDate: '2009-11',
          endDate: '2012-06',
          techStack: ['Java', 'Selenium', 'WebDriverJS', 'YUI'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            url: 'https://www.yahoo.com/news',
          },
        },
      ],
    },
    {
      key: 'army',
      name: 'Taiwan Army',
      startDate: '2008-10',
      endDate: '2009-11',
      projects: [
        {
          key: 'equipmentSimulator',
          techStack: ['Adobe Flex', 'Adobe Flash', 'ASP.NET', 'SQL Server'],
        },
      ],
    },
  ],
};

export default experience;
