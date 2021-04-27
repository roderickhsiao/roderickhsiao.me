module.exports = {
  profile: {
    name: 'Roderick Hsiao',
    email: 'roderickhsiao@gmail.com',
    title: 'Product Engineering Consultant',
    sector: 'Internet',
    location: 'San Francisco Bay Area | Internet',
    thumbnail: {
      url: '/taz.jpg',
      width: 75,
      height: 75
    },
    list: [
      {
        field: 'name',
        props: {
          className: 'Mb(4px) Mt(0) Fw(b) Fz(1.3em)',
          itemProp: 'name'
        }
      },
      {
        field: 'title',
        props: {
          className: 'Fz(1.1em) Mb(4px)',
          itemProp: 'jobTitle'
        }
      },
      {
        field: 'location',
        props: {
          className: 'Fs(i) Mb(4px)',
          itemProp: 'addressLocality'
        }
      }
    ],
    summary: [
      'Your friendly web friend 🕸',
      'Web technology consultant',
      'Progressive web app (PWA)',
      'Web UI component and front-end infra and architecture',
      'High performance web development',
      'Large scale and international web app',
      'SEO optimization'
    ]
  }
};
