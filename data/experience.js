const Duration = require('duration');

function getWorkTime(duration) {
  const { years, month } = duration;
  const workDuration = [];
  if (years) {
    workDuration.push(`${years} years`);
  }

  if (month) {
    workDuration.push(`${month} months`);
  }

  return workDuration.join(', ');
}
export default {
  companies: [
    {
      name: 'Self Employed',
      time: 'March 2021 - present',
      title: 'Product Engineering Consultant',
      location: 'San Francisco, CA',
      projects: [
        {
          name: 'Alt Platform',
          time: 'March 2021 - present',
          summary:
            'Frontend architecture improvements, performance enhancements, instrumentations, and search engine optimizations.',
          techStack: 'React',
          smartlink: {
            thumbnail: {
              url: '/alt.jpg',
              width: 400,
              height: 400,
            },
            title: 'Alt',
            description:
              'It’s time to invest in what you love. ALT gives you access to utility and liquidity like never before.',
            url: 'https://alt.xyz/',
          },
        },
        {
          name: 'Forethought',
          time: 'August 2021 - Nov 2021, Jan 2022 - present',
          summary:
            'Focus on feature development and design system infrastructure. Provided technical guildline and directions. Deliever state persistant stragetgy and major rebranding.',
          techStack: 'React',
          smartlink: {
            thumbnail: {
              url: '/forethought.jpg',
              width: 400,
              height: 400,
            },
            title: 'Forethought',
            description: 'Improve your customer experience by using AI.',
            url: 'https://www.forethought.ai/',
          },
        },
        {
          name: 'Public Speaker',
          time: 'July 2020 - present',
          techStack: 'React, Javascript',
          summary: 'Give tach talks about PWA, web performance, large scale web app architecture',
          demos: [
            {
              thumbnail: {
                url: '/react-norway.jpeg',
                width: 800,
                height: 450,
              },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=tSMmsEh7eAk',
              title:
                'React Norway 2021 | Progressively Enhance Your Web Application',
            },
            {
              thumbnail: {
                url: '/js-camp-2021.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=TCYI3SuQmw0',
              title:
                'JSCAMP 2021 | Building Large-Scale Web Apps',
            },
            {
              thumbnail: {
                url: '/accento.jpeg',
                width: 800,
                height: 450,
              },
              type: 'iframe',
              url: 'https://www.youtube.com/watch?v=H2KvgVSQ_pE',
              title:
                'Accento 2020 | Progressively Enhance Your Web Application',
            },
            {
              thumbnail: {
                url: '/geekle.jpeg',
                width: 800,
                height: 800,
              },
              type: 'iframe',
              url: 'https://react.geekle.us/',
              title:
                'Geekle 2020 | Building Large Scale Web App',
            },
          ]
        }
      ],
    },
    {
      name: 'Tinder Inc.',
      logo: '/tinderLogo.png',
      time: `Feb 2017 - present (${getWorkTime(
        new Duration(new Date(2017, 1, 8))
      )})`,
      title: 'Staff Engineer',
      location: 'Palo Alto, CA',
      projects: [
        {
          name: 'Tinder Online',
          time: 'Feb 2017 - present',
          summary: 'Tech lead for https://tinder.com',
          techStack: 'NodeJS, React and Redux',
          smartlink: {
            thumbnail: {
              url: '/tinder.jpeg',
              width: 200,
              height: 200,
            },
            title: 'Tinder',
            description:
              "With 55 billion matches to date, Tinder® is the world's most popular dating app, making it the place to meet new people.",
            url: 'https://tinder.com',
          },
          demos: [
            {
              thumbnail: {
                url: '/google-io-2017.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://youtu.be/aCMbSyngXB4?t=918',
              title:
                'Production Progressive Web Apps With JavaScript Frameworks (Google I/O 2017)',
            },
            {
              thumbnail: {
                url: '/cds-2017.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://youtu.be/_srJ7eHS3IM?t=1732',
              title:
                'Fast By Default: Modern Loading Best Practices (Chrome Dev Summit 2017)',
            },
            {
              thumbnail: {
                url: '/cds-2019.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://youtu.be/puUPpVrIRkc?t=1231',
              title:
                'Adaptive Loading - Improving web performance on slow devices (Chrome Dev Summit 2019)',
            },
            {
              thumbnail: {
                url: '/cds-2020.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://youtu.be/cmRqQJBIp_A?t=1090',
              title:
                'PWA patterns for window and service worker communication (Chrome Dev Summit 2020)',
            },
            {
              thumbnail: {
                url: '/cds-2020-2.jpeg',
                width: 640,
                height: 480,
              },
              type: 'iframe',
              url: 'https://youtu.be/sU4MpWYrGSI?t=429',
              title: 'SMS OTP form best practices (Chrome Dev Summit 2020)',
            },
          ],
        },
        {
          name: 'Tinder Swipe Life',
          time: 'Nov 2017',
          summary: 'Tinder Magazine',
          techStack: 'GatsbyJS, Wordpress',
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
          summary:
            'Building frontend infrastructure, Engineering practice and website optimizations.',
          techStack: 'NodeJS, React and Redux',
          smartlink: {
            thumbnail: {
              url: '/branch.jpg',
              width: 400,
              height: 400,
            },
            description:
              'Number 1 in deep linking. Integrate robust, durable links into email, SEM, ads and other traditional marketing channels for improved app growth.',
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
          summary:
            'Building one of the most visited single web application of the world accross three screens. Building common UI components, utilities and NodeJS library.',
          techStack: 'ExpressJS, ReactJS (Fluxible), and Atomic CSS',
          smartlink: {
            thumbnail: {
              url: '/yahoo.jpg',
              width: 200,
              height: 200,
            },
            title: 'Yahoo',
            description:
              "A new welcome to Yahoo. The new Yahoo experience makes it easier to discover the news and information that you care about most. It's the web ordered for you.",
            url: 'https://www.yahoo.com/',
          },
        },
        {
          name: 'Yahoo Weather',
          time: 'June 2014 - July 2016',
          summary: 'Polish Yahoo Weather using isomorphic React',
          techStack: 'ExpressJS, ReactJS (Fluxible), and Atomic CSS',
          smartlink: {
            thumbnail: {
              url: '/yahooWeather.png',
              width: 200,
              height: 200,
            },
            title: 'Yahoo Weather',
            description:
              'Prepare for your day with the most accurate hourly, 5-day, and 10-day forecasts. Stunning Flickr photos match your location, time of day, and current conditions.',
            url: 'https://www.yahoo.com/news/weather',
          },
        },
        {
          name: 'Yahoo News Digest',
          time: 'June 2014 - July 2016',
          summary:
            'Power our popular native app content - Yahoo News Digest on web for better SEO and deeplinking experience',
          techStack: 'ExpressJS, ReactJS (Fluxible), and Atomic CSS',
          url: 'https://www.yahoo.com/digest',
          smartlink: {
            thumbnail: {
              url: '/yahooNewsDigest.png',
              width: 200,
              height: 200,
            },
            title: 'Yahoo News Digest',
            description:
              'Yahoo News Digest provides a definitive summary of all the important, need-to-know news. Digests are delivered twice a day - once in the morning and once in the evening.',
            url: 'https://www.yahoo.com/digest',
          },
        },
        {
          name: 'Yahoo Mobile Homepage',
          time: 'Oct 2013 - June 2014',
          summary:
            'Pilot single web application on Yahoo mobile homepage, targeted user perceive performance enhancement.',
          techStack: 'ExpressJS, DustJS, and YUI',
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
          summary:
            'Lead a team of 5 developers to build content consumption experience.',
          techStack: 'ExpressJS, DustJS, CSS, and YUI',
          smartlink: {
            thumbnail: {
              url: '/yahoo.jpg',
              width: 200,
              height: 200,
            },
            title: 'Yahoo行動版',
            description:
              '提供最方便的網站搜尋、即時新聞、生活資訊和Yahoo奇摩服務入口。',
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
          summary:
            'Control Room is a comprehensive coverage tablet app with a human touch, where the news is an experience with original content and curated stories from leading sources.',
          techStack: 'CSS, PHP and YUI',
          smartlink: {
            type: 'large',
            thumbnail: {
              url: '/controlRoom.jpg',
              width: 640,
              height: 511,
            },
            title: 'Yahoo 2012 Presidential Election',
            description:
              "Yahoo's Control Room has live streaming video, coverage and maps of all House, Senate and Gubernatorial races, as well as the Presidential race results down to the county level, live blogging and live polling and social sentiment analysis.",
            url: 'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false',
          },
        },
        {
          name: 'Yahoo 2012 Presidential Election - #Hashout',
          time: 'June 2012 - Sep 2012',
          summary:
            '#Hashout is an online talk show that engages perspectives to spark a conversation',
          techStack: 'CSS, PHP and YUI',
          smartlink: {
            type: 'large',
            thumbnail: {
              url: '/hashout.jpg',
              width: 630,
              height: 355,
            },
            title: 'Yahoo 2012 Presidential Election',
            description:
              "Yahoo's Control Room has live streaming video, coverage and maps of all House, Senate and Gubernatorial races, as well as the Presidential race results down to the county level, live blogging and live polling and social sentiment analysis.",
            url: 'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false',
          },
        },
        {
          name: 'Yahoo Global News',
          time: 'Nov 2009 - June 2012',
          summary:
            'Build a single platform to serve all Yahoo properties around thw world. In charge of front end testing strategy, framework and automation.',
          techStack: 'Java, Selenium, WebdriverJS and YUI',
          smartlink: {
            thumbnail: {
              url: '/yahoo.jpg',
              width: 200,
              height: 200,
            },
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
          summary:
            'Developed two web-based applications for military training purpose.Managed/Trained 6 soldiers to develop educational simulator software.',
          techStack: 'Adobe Flex, Adobe Flash, ASP.NET, and SQL Server',
        },
      ],
    },
  ],
};
