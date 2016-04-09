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
            }
        },
        regions: {
            header: [
                'HeaderComponent'
            ],
            main: [
                'MainCard',
                'Experience'
            ]
        }
    }
};
