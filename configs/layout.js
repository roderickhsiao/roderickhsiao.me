module.exports = {
    home: {
        components: {
            HeaderComponent: {
                path: 'common/HeaderComponent',
                props: {}
            },
            MainCard: {
                path: 'MainBrief'
            }
        },
        regions: {
            header: [
                'HeaderComponent'
            ],
            main: [
                'MainCard'
            ]
        }
    }
};
