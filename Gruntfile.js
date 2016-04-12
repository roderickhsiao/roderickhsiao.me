var webpack = require('webpack');

function getWebpackConfig (opts) {
    var entry = opts.entry;
    var isDev = opts.isDev;

    var baseConfig = {
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        entry: entry,
        output: {
            path: './build/js',
            filename: 'client.js'
        },
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loader: require.resolve('babel-loader')
                }
            ]
        },
        node: {
            setImmidate: false
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDev ? 'development': 'production')
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin()
        ]
    };

    if (isDev) {
        baseConfig.stats = {
            colors: true
        };
        // baseConfig.devtool = 'souce-map';
        // baseConfig.watch = true;
        // baseConfig.keepalive = true;
        // baseConfig.failOnError = false;
    } else {
        // prod
        baseConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
        baseConfig.plugins.push(
            new webpack.optimize.DedupePlugin()
        );
    }
    return baseConfig;
}

function getPenthouseConfig () {
    var baseConfig = {
        outfile : './assets/css/critial.css',
        css : './build/css/rollup.css',
        url : 'http://localhost:3000'
    };
    // TODO, should we load for different devices?
    var baseConfig = Object.assign({}, baseConfig, {width: 1300,  height: 900});
    return baseConfig;
}

module.exports = function (grunt) {
    var config = {
        project: {
            app: './app',
            assets: 'assets',
            build: 'build',
            public: '/public'
        },
        atomizer: {
            app: {
                options: {
                    ie: true,
                    namespace: '#atomic',
                    configFile: 'configs/atomizer.js',
                    configOutput: '<%= project.build %>/atomizer.json'
                },
                src: [
                    'components/**/*.js',
                    'components/**/*.jsx',
                    'data/**.js',
                    'configs/**.js',
                    '!configs/atomizer.js'
                ],
                dest: '<%= project.build %>/css/atomic.css'
            }
        },
        copy: {
            css: {
                expand: true,
                src: 'css/*.css',
                dest: '<%= project.build %>',
                cwd: '<%= project.assets %>'
            },
            image: {
                expand: true,
                src: 'images/*',
                dest: '<%= project.build %>',
                cwd: '<%= project.assets %>'
            }
        },
        // concat all css for penthpuse
        concat: {
            css: {
                src: [
                    'build/css/atomic.css',
                    'build/css/normalize.css',
                    'build/css/theme.css'
                ],
                dest: 'build/css/rollup.css'
            }
        },

        cssmin: {
            app: {
                options: {
                    report: 'gzip',
                    compatibility: 'ie7',
                    sourceMap: false
                },
                files: [{
                    src: ['<%= project.build %>/css/theme.css'],
                    dest: '<%= project.build %>/css/theme.css'
                }, {
                    src: ['<%= project.build %>/css/normalize.css'],
                    dest: '<%= project.build %>/css/normalize.css'
                }, {
                    src: ['<%= project.build %>/css/atomic.css'],
                    dest: '<%= project.build %>/css/atomic.css'
                }]
            },
            critial: {
                options: {
                    report: 'gzip',
                    compatibility: 'ie7',
                    sourceMap: false
                },
                files: [{
                    src: ['<%= project.assets %>/css/critial.css'],
                    dest: '<%= project.assets %>/css/critial.css'
                }]
            }
        },
        postcss: {
            app: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: [
                                '> 1%',
                                'last 2 versions',
                                'Firefox ESR',
                                'Opera 12.1',
                                'iOS 5'
                            ]
                        })
                    ]
                },
                files: [{
                    src: ['<%= project.build %>/css/atomic.css'],
                    dest: '<%= project.build %>/css/atomic.css'
                },{
                    src: ['<%= project.build %>/css/theme.css'],
                    dest: '<%= project.build %>/css/theme.css'
                }]
            }
        },
        clean: ['./build'],
        penthouse: {
            extract: getPenthouseConfig()
        },
        concurrent: {
            dev: ['nodemon:dev', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        // nodemon to restart server if files change
        nodemon: {
            dev: {
                script: './start.js',
                options: {
                    args: ['--dev'],
                    env: {
                        PORT: '3000'
                    },
                    ext: 'jsx,js',
                    ignore: [
                        'node_modules/**',
                        '.rebooted',
                        'build/**',
                        'config/atomizer.js'
                    ],
                    watch: 'app',
                    delay: 1000,
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        webpack: {
            dev: getWebpackConfig({isDev: true, entry: './client.js'}),
            prod: getWebpackConfig({isDev: false, entry: './client.js'})
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-atomizer');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-penthouse');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'css', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'css', 'webpack:prod']);
    grunt.registerTask('css', ['atomizer:app', 'copy', 'cssmin', 'postcss:app']);
    // need to run after server up
    grunt.registerTask('penthouse-tasks', ['concat', 'penthouse', 'cssmin:critial']);
    grunt.registerTask('dev', ['default']);
};
