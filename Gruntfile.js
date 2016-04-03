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
                    exclude: /node_modules/,
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
        baseConfig.devtool = 'souce-map';
        baseConfig.watch = true;
        baseConfig.keepalive = true;
        baseConfig.failOnError = false;
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

module.exports = function (grunt) {
    var target = grunt.option('target') || 'dev';
    var isDev = target === 'dev';
    var config = {
        clean: ['./build'],
        concurrent: {
            dev: ['nodemon:dev', 'webpack:' + target],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon: {
            dev: {
                script: './start.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
        webpack: {
            dev: getWebpackConfig({isDev: isDev, entry: './client.js'}),
            prod: getWebpackConfig({isDev: isDev, entry: './client.js'})
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'concurrent:dev']);
    grunt.registerTask('dev', ['default']);
};
