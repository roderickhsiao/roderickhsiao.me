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
module.exports = {
  companies: [
    {
      name: 'Self Employed',
      time: `March 2021 - present (${getWorkTime(
        new Duration(new Date(2021, 0, 29))
      )})`,
      title: 'Product Engineering Consultant',
      location: 'San Francisco, CA',
      projects: [
        {
          name: 'Forethought',
          time: 'August 2021 - present',
          summary: 'PWA feature development',
          techStack: 'React',
          smartlink: {
            thumbnail: {
              url: '/forethought.png',
              width: 512,
              height: 512
            },
            title: 'AI for Customer Support Teams | Forethought',
            description: 'Improve your customer experience by using AI.',
            url: 'https://www.forethought.ai/'
          }
        },
        {
          name: 'Alt',
          time: 'March 2021 - present',
          summary: 'Frontend architecture improvements, performance enhancements, and search engine optimizations.',
          techStack: 'React',
          smartlink: {
            thumbnail: {
              url: 'data:image/png;base64,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',
              width: 60,
              height: 60
            },
            title: 'Invest in sports cards just like stocks | Alt',
            description: 'Alt is increasing the transparency and liquidity of alternative assets',
            url: 'https://www.onlyalt.com/'
          }
        }
      ]
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
              height: 200
            },
            title: 'Dating, Make Friends & Meet New People',
            description: 'With 55 billion matches to date, Tinder® is the world\'s most popular dating app, making it the place to meet new people.',
            url: 'https://tinder.com'
          }
          // demos: [
          //   {
          //     type: 'iframe',
          //     url: 'https://www.youtube.com/embed/aCMbSyngXB4?start=918',
          //     title: 'Production Progressive Web Apps With JavaScript Frameworks (Google I/O 2017)'
          //   },
          //   {
          //     type: 'iframe',
          //     url: 'https://www.youtube.com/embed/_srJ7eHS3IM?t=1747',
          //     title: 'Fast By Default: Modern Loading Best Practices (Chrome Dev Summit 2017)'
          //   },
          //   {
          //     type: 'iframe',
          //     url: 'https://www.youtube.com/embed/puUPpVrIRkc?t=1231',
          //     title: 'Adaptive Loading - Improving web performance on slow devices (Chrome Dev Summit 2019)'
          //   },
          //   {
          //     type: 'iframe',
          //     url: 'https://www.youtube.com/embed/cmRqQJBIp_A?t=1090',
          //     title: 'PWA patterns for window and service worker communication (Chrome Dev Summit 2020)'
          //   },
          //   {
          //     type: 'iframe',
          //     url: 'https://www.youtube.com/embed/sU4MpWYrGSI?t=429',
          //     title: 'SMS OTP form best practices (Chrome Dev Summit 2020)'
          //   }
          // ]
        },
        {
          name: 'Tinder Swipe Life',
          time: 'Nov 2017 - present',
          summary: 'Tinder Magazine',
          techStack: 'GatsbyJS, Wordpress'
        }
      ]
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
              url: '/branchSquare.jpg',
              width: 200,
              height: 200
            },
            description:
              'Number 1 in deep linking. Integrate robust, durable links into email, SEM, ads and other traditional marketing channels for improved app growth.',
            title: 'Branch',
            url: 'https://branch.io'
          }
        }
      ]
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
              height: 200
            },
            title: 'Yahoo',
            description:
              'A new welcome to Yahoo. The new Yahoo experience makes it easier to discover the news and information that you care about most. It\'s the web ordered for you.',
            url: 'https://www.yahoo.com/'
          }
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
              height: 200
            },
            title: 'Yahoo Weather',
            description:
              'Prepare for your day with the most accurate hourly, 5-day, and 10-day forecasts. Stunning Flickr photos match your location, time of day, and current conditions.',
            url: 'https://www.yahoo.com/news/weather'
          }
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
              height: 200
            },
            title: 'Yahoo News Digest',
            description:
              'Yahoo News Digest provides a definitive summary of all the important, need-to-know news. Digests are delivered twice a day - once in the morning and once in the evening.',
            url: 'https://www.yahoo.com/digest'
          }
        },
        {
          name: 'Yahoo Mobile Homepage',
          time: 'Oct 2013 - June 2014',
          summary:
            'Pilot single web application on Yahoo mobile homepage, targeted user perceive performance enhancement.',
          techStack: 'ExpressJS, DustJS, and YUI'
        }
      ]
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
              height: 200
            },
            title: 'Yahoo行動版',
            description:
              '提供最方便的網站搜尋、即時新聞、生活資訊和Yahoo奇摩服務入口。',
            url: 'https://tw.mobi.yahoo.com/'
          }
        }
      ]
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
              height: 511
            },
            title: 'Yahoo 2012 Presidential Election',
            description:
              'Yahoo\'s Control Room has live streaming video, coverage and maps of all House, Senate and Gubernatorial races, as well as the Presidential race results down to the county level, live blogging and live polling and social sentiment analysis.',
            url:
              'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false'
          }
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
              height: 355
            },
            title: 'Yahoo 2012 Presidential Election',
            description:
              'Yahoo\'s Control Room has live streaming video, coverage and maps of all House, Senate and Gubernatorial races, as well as the Presidential race results down to the county level, live blogging and live polling and social sentiment analysis.',
            url:
              'https://books.google.com/books?id=JW6rBQAAQBAJ&lpg=PA54&ots=tD7mwr3vEp&dq=yahoo%20election%20control%20room&pg=PA54#v=onepage&q&f=false'
          }
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
              height: 200
            },
            title: 'Yahoo News',
            description: 'Browse latest news on Yahoo News.',
            url: 'https://www.yahoo.com/news'
          }
        }
      ]
    },
    {
      name: 'Ministry of National Defense',
      time: 'Oct 2008 - Nov 2009',
      title: 'Project Manager/Engineer Lead',
      location: 'Taiwan, R.O.C',
      projects: [
        {
          name: 'Equipment Simulator ',
          time: 'June 2014 - present',
          summary:
            'Developed two web-based applications for military training purpose.Managed/Trained 6 soldiers to develop educational simulator software.',
          techStack: 'Adobe Flex, Adobe Flash, ASP.NET, and SQL Server'
        }
      ]
    }
  ]
};
