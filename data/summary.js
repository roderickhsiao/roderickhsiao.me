module.exports = {
    profile: {
        name: 'Roderick Hsiao',
        email: 'roderickhsiao@gmail.com',
        title: 'Software Engineer',
        sector: 'Internet',
        location: 'San Francisco Bay Area | Internet',
        thumbnail: {
            url: '//i.imgsafe.org/dc4bc52.jpg',
            width: 75,
            height: 75
        },
        list: [
            {
                field: 'name',
                props: {
                    className: 'Mb(4px) Mt(0) Fw(b) Fz(1.3em)'
                }
            },
            {
                field: 'title',
                props: {
                    className: 'Fz(1.1em) Mb(4px)'
                }
            },
            {
                field: 'location',
                props: {
                    className: 'Fs(i) Mb(4px) C($c-black-2)'
                }
            }
        ],
        summary: [
            'HTML, CSS, Javascript (Vanilla Javascript, ReactJS and YUI), NodeJS',
            'High performance web development',
            'Mobile web developer',
            'Large scale website',
            'International development',
            'Agile development'
        ]
    }
};
