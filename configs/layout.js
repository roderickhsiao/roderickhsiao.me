module.exports = {
    home: {
        components: {
            HeaderComponent: {
                path: 'common/HeaderComponent',
                props: {}
            },
            MainCard: {
                path: 'MainBrief'
            },
            Experience: {
                path: 'Experience'
            },
            Contact: {
                path: 'Contact'
            },
            About: {
                path: 'About'
            }
        },
        regions: {
            header: [
                'HeaderComponent'
            ],
            main: [
                'MainCard',
                'Experience'
            ],
            right: [
                'Contact',
                'About'
            ]
        }
    }
};
