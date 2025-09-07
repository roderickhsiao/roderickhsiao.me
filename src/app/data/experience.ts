// Fully synced work experience and projects from original experience.js
export interface Smartlink {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string | { url: string; width?: number; height?: number };
  type?: string;
}

export interface Demo {
  thumbnail: { url: string; width?: number; height?: number };
  type: string;
  url: string;
  title: string;
}

export interface Project {
  name: string;
  time?: string;
  summary?: string;
  techStack?: string[];
  smartlink?: Smartlink;
  demos?: Demo[];
  url?: string;
}

export interface Company {
  name: string;
  logo?: string;
  time: string;
  title?: string;
  location?: string;
  projects: Project[];
}

const experience: { companies: Company[] } = {
  companies: [
    {
      name: 'Kindred',
      logo: '/kindred.png',
      time: 'Jan 2023 - present',
      title: 'Founding Engineer',
      location: 'Remote',
      projects: [
        {
          name: 'Kindred',
          time: 'Jan 2023 - present',
          techStack: ['NextJS', 'React', 'React Native', 'Tailwind CSS', 'TypeScript'],
          smartlink: {
            url: 'https://livekindred.com/',
            title: 'Kindred',
            description: 'Join our members-only home exchange community and unlock travel for a friction of the cost of traditional vacation rentals.',
            thumbnail: { url: '/kindred.svg', width: 200, height: 200 },
          },
        },
      ],
    },
    {
      name: 'Tinder Inc.',
      logo: '/tinderLogo.png',
      time: 'Feb 2017 - Jan 2023',
      title: 'Principal Software Engineer',
      location: 'Palo Alto, CA',
      projects: [
        {
          name: 'Tinder Online',
          time: 'Feb 2017 - Jan 2023',
          summary: 'Led technical architecture and development of Tinder’s flagship web platform at tinder.com. Architected scalable frontend solutions serving millions of daily active users worldwide.',
          techStack: ['NodeJS', 'React', 'Redux'],
          smartlink: {
            thumbnail: { url: '/tinder.jpeg', width: 200, height: 200 },
            title: 'Tinder',
            description: "With 55 billion matches to date, Tinder® is the world's most popular dating app, making it the place to meet new people.",
            url: 'https://tinder.com',
          },
          demos: [
            {
              thumbnail: { url: '/google-io-2017.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/aCMbSyngXB4?t=918',
              title: 'Production Progressive Web Apps With JavaScript Frameworks (Google I/O 2017)',
            },
            {
              thumbnail: { url: '/cds-2017.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/_srJ7eHS3IM?t=1732',
              title: 'Fast By Default: Modern Loading Best Practices (Chrome Dev Summit 2017)',
            },
            {
              thumbnail: { url: '/cds-2019.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/puUPpVrIRkc?t=1231',
              title: 'Adaptive Loading - Improving web performance on slow devices (Chrome Dev Summit 2019)',
            },
            {
              thumbnail: { url: '/cds-2020.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/cmRqQJBIp_A?t=1090',
              title: 'PWA patterns for window and service worker communication (Chrome Dev Summit 2020)',
            },
            {
              thumbnail: { url: '/cds-2020-2.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://youtu.be/sU4MpWYrGSI?t=429',
              title: 'SMS OTP form best practices (Chrome Dev Summit 2020)',
            },
          ],
        },
        {
          name: 'Tinder Swipe Life',
          time: 'Nov 2017',
          summary: 'Developed and launched Tinder’s lifestyle magazine platform, creating engaging content experiences for the dating community.',
          techStack: ['GatsbyJS', 'WordPress'],
        },
      ],
    },
    {
      name: 'Self Employed',
      time: 'March 2021 - present',
      title: 'Product Engineering Consultant',
      location: 'San Francisco, CA',
      projects: [
        {
          name: 'Alt Platform',
          time: 'March 2021 - December 2022',
          summary: 'Delivered comprehensive frontend architecture improvements, performance optimizations, advanced instrumentation, and search engine optimization strategies for alternative investment platform.',
          techStack: ['React'],
          smartlink: {
            thumbnail: { url: '/alt.jpg', width: 400, height: 400 },
            title: 'Alt',
            description: 'It’s time to invest in what you love. ALT gives you access to utility and liquidity like never before.',
            url: 'https://alt.xyz/',
          },
        },
        {
          name: 'Forethought',
          time: 'August 2021 - Nov 2021, Jan 2022 - July 2022',
          summary: 'Spearheaded feature development and design system infrastructure. Provided strategic technical guidance and architectural direction. Delivered state management solutions and executed comprehensive rebranding initiatives.',
          techStack: ['React'],
          smartlink: {
            thumbnail: { url: '/forethought.jpg', width: 400, height: 400 },
            title: 'Forethought',
            description: 'Improve your customer experience by using AI.',
            url: 'https://www.forethought.ai/',
          },
        },
        {
          name: 'Public Speaker',
          time: 'July 2020 - present',
          techStack: ['JavaScript', 'React'],
          summary: 'Delivered technical presentations on Progressive Web Applications, web performance optimization, and large-scale web application architecture at international conferences and industry events.',
          demos: [
            {
              thumbnail: { url: '/react-norway.jpeg', width: 800, height: 450 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=tSMmsEh7eAk',
              title: 'React Norway 2021 | Progressively Enhance Your Web Application',
            },
            {
              thumbnail: { url: '/js-camp-2021.jpeg', width: 640, height: 480 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=TCYI3SuQmw0',
              title: 'JSCAMP 2021 | Building Large-Scale Web Apps',
            },
            {
              thumbnail: { url: '/accento.jpeg', width: 800, height: 450 },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=H2KvgVSQ_pE',
              title: 'Accento 2020 | Progressively Enhance Your Web Application',
            },
            {
              thumbnail: { url: '/geekle.jpeg', width: 800, height: 800 },
              type: 'iframe',
              url: 'https://react.geekle.us/',
              title: 'Geekle 2020 | Building Large Scale Web App',
            },
          ],
        },
      ],
    },
    {
      name: 'Branch',
      logo: '/branch.png',
      time: 'July 2016 - Jan 2017',
      title: 'Software Engineer',
      location: 'Palo Alto, CA',
      projects: [
        {
          name: 'Branch Dashboard and Solutions',
          time: 'July 2016 - Jan 2017',
          summary: 'Architected frontend infrastructure, established engineering best practices, and implemented website performance optimizations for deep linking platform.',
          techStack: ['NodeJS', 'React', 'Redux'],
          smartlink: {
            thumbnail: { url: '/branch.jpg', width: 400, height: 400 },
            description: 'Number 1 in deep linking. Integrate robust, durable links into email, SEM, ads and other traditional marketing channels for improved app growth.',
            title: 'Branch',
            url: 'https://branch.io',
          },
        },
      ],
    },
    {
      name: 'Yahoo',
      logo: '/yahooLogo.png',
      time: 'Nov 2009 - July 2016',
      title: 'Senior Software Engineer',
      location: 'Sunnyvale, CA',
      projects: [
        {
          name: 'Yahoo Homepage',
          time: 'June 2014 - July 2016',
          summary: 'Engineered one of the world\'s most visited single-page applications, serving millions of users across desktop, tablet, and mobile platforms. Developed reusable UI components, utilities, and Node.js libraries.',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            title: 'Yahoo',
            description: "A new welcome to Yahoo. The new Yahoo experience makes it easier to discover the news and information that you care about most. It's the web ordered for you.",
            url: 'https://www.yahoo.com/',
          },
        },
        {
          name: 'Yahoo Weather',
          time: 'June 2014 - July 2016',
          summary: 'Enhanced Yahoo Weather platform using isomorphic React architecture, delivering seamless user experiences across all devices.',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          smartlink: {
            thumbnail: { url: '/yahooWeather.png', width: 200, height: 200 },
            title: 'Yahoo Weather',
            description: 'Prepare for your day with the most accurate hourly, 5-day, and 10-day forecasts. Stunning Flickr photos match your location, time of day, and current conditions.',
            url: 'https://www.yahoo.com/news/weather',
          },
        },
        {
          name: 'Yahoo News Digest',
          time: 'June 2014 - July 2016',
          summary: 'Developed web platform for Yahoo News Digest, enabling improved SEO performance and deep linking capabilities for the popular mobile application content.',
          techStack: ['Atomic CSS', 'ExpressJS', 'ReactJS (Fluxible)'],
          url: 'https://www.yahoo.com/digest',
          smartlink: {
            thumbnail: { url: '/yahooNewsDigest.png', width: 200, height: 200 },
            title: 'Yahoo News Digest',
            description: 'Yahoo News Digest provides a definitive summary of all the important, need-to-know news. Digests are delivered twice a day - once in the morning and once in the evening.',
            url: 'https://www.yahoo.com/digest',
          },
        },
        {
          name: 'Yahoo Mobile Homepage',
          time: 'Oct 2013 - June 2014',
          summary: 'Piloted innovative single-page application architecture for Yahoo mobile homepage, focusing on user-perceived performance enhancements and mobile optimization.',
          techStack: ['DustJS', 'ExpressJS', 'YUI'],
        },
      ],
    },
    {
      name: 'Yahoo',
      logo: '/yahooLogo.png',
      time: 'April 2013 - Oct 2013',
      title: 'Engineering Team Lead',
      location: 'Taipei, Taiwan',
      projects: [
        {
          name: 'Yahoo APAC Mobile Homepage (Taiwan and Hongkong)',
          time: 'April 2013 - Oct 2013',
          summary: 'Led a cross-functional team of 5 developers to architect and deliver comprehensive content consumption experiences for Asian Pacific markets.',
          techStack: ['CSS', 'DustJS', 'ExpressJS', 'YUI'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            title: 'Yahoo行動版',
            description: '提供最方便的網站搜尋、即時新聞、生活資訊和Yahoo奇摩服務入口。',
            url: 'https://tw.mobi.yahoo.com/',
          },
        },
      ],
    },
    {
      name: 'Yahoo',
      logo: '/yahooLogo.png',
      time: 'Nov 2009 - April 2013',
      title: 'Quality Engineering Lead / Software Engineer',
      location: 'Taipei, Taiwan',
      projects: [
        {
          name: 'Yahoo 2012 Presidential Election - Control Room',
          time: 'Sep 2012 - Dec 2012',
          summary: 'Architected and developed Control Room, a comprehensive tablet application providing real-time election coverage with curated content and original reporting from leading news sources.',
          techStack: ['CSS', 'PHP', 'YUI'],
          smartlink: {
            type: 'large',
            thumbnail: { url: '/controlRoom.jpg', width: 640, height: 511 },
            title: 'Yahoo 2012 Presidential Election',
            description: "Yahoo's Control Room has live streaming video, coverage and maps of all House, Senate and Gubernatorial races, as well as the Presidential race results down to the county level, live blogging and live polling and social sentiment analysis.",
            url: 'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false',
          },
        },
        {
          name: 'Yahoo 2012 Presidential Election - #Hashout',
          time: 'June 2012 - Sep 2012',
          summary: 'Developed #Hashout, an innovative online talk show platform designed to engage diverse perspectives and facilitate meaningful political conversations during the election cycle.',
          techStack: ['CSS', 'PHP', 'YUI'],
          smartlink: {
            type: 'large',
            thumbnail: { url: '/hashout.jpg', width: 630, height: 355 },
            title: 'Yahoo 2012 Presidential Election - #Hashout',
            description: 'Online talk show for Yahoo 2012 Presidential Election.',
            url: 'https://www.yahoo.com/news',
          },
        },
        {
          name: 'Yahoo Global News',
          time: 'Nov 2009 - June 2012',
          summary: 'Architected unified platform serving all Yahoo properties globally. Led frontend testing strategy, framework development, and test automation infrastructure.',
          techStack: ['Java', 'Selenium', 'WebDriverJS', 'YUI'],
          smartlink: {
            thumbnail: { url: '/yahoo.jpg', width: 200, height: 200 },
            title: 'Yahoo News',
            description: 'Browse latest news on Yahoo News.',
            url: 'https://www.yahoo.com/news',
          },
        },
      ],
    },
    {
      name: 'Ministry of National Defense',
      time: 'Oct 2008 - Nov 2009',
      title: 'Project Manager/Engineer Lead',
      location: 'Taiwan, R.O.C',
      projects: [
        {
          name: 'Equipment Simulator ',
          summary: 'Designed and developed two web-based training applications for military education purposes. Managed and mentored a team of 6 personnel in building educational simulator software solutions.',
          techStack: ['Adobe Flex', 'Adobe Flash', 'ASP.NET', 'SQL Server'],
        },
      ],
    },
  ],
};

export default experience;
