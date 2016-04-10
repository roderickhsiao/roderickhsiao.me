module.exports = {
    home: {
        prefetch: 'about,contact,summary,experience,menu',
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
    },
    education: {
        prefetch: 'about,contact,summary,education,menu',
        regions: {
            header: [
                'HeaderComponent'
            ],
            main: [
                'Education'
            ],
            right: [
                'MainCard',
                'Contact',
                'About'
            ]
        }
    },
    activity: {
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
