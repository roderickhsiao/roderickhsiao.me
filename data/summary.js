module.exports = {
  profile: {
    name: 'Roderick Hsiao',
    email: 'roderickhsiao@gmail.com',
    title: 'Software Engineer',
    sector: 'Internet',
    location: 'San Francisco Bay Area | Internet',
    thumbnail: {
      url: 'https://i.imgsafe.org/dc4bc52.jpg',
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
          className: 'Fs(i) Mb(4px) C($c-black-2)',
          itemProp: 'addressLocality'
        }
      }
    ],
    summary: [
      'HTML, CSS, Javascript (Vanilla Javascript, ReactJS and YUI), NodeJS',
      'Web UI component and front-end infra',
      'High performance web development',
      'Mobile web developer',
      'Large scale website',
      'International development',
      'Agile development'
    ]
  }
};
