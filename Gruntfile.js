const { GenerateSW } = require('workbox-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');
const webpack = require('webpack');

function getWebpackConfig(opts) {
  var entry = opts.entry;
  var isDev = opts.isDev;

  var baseConfig = {
    resolve: {
      extensions: ['.js', '.jsx', '*', '.json']
    },
    entry: entry,
    output: {
      path: path.resolve(__dirname, 'build/js'),
      filename: 'client.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader']
        }
      ]
    },
    node: {
      setImmidate: false
    },
    mode: isDev ? 'development' : 'production',
    plugins: [
      new GenerateSW({
        cacheId: 'roderickhsiao',
        swDest: 'sw.js',
        include: [/\.html$/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/],
        globDirectory: 'build',
        globPatterns: ['**/*.{js,css,png,jpg}'],
        runtimeCaching: [
          {
            urlPattern: '*',
            handler: 'networkFirst'
          },
          {
            urlPattern: new RegExp('https://www\.googletagmanager\.com/'),
            handler: 'staleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: new RegExp('https://fonts\.googleapis\.com'),
            handler: 'staleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        navigateFallback: '/'
      })
    ]
  };
  return baseConfig;
}

function getPenthouseConfig() {
  var baseConfig = {
    outfile: './assets/css/critial.css',
    css: './build/css/rollup.css',
    url: 'http://localhost:3000',
    debug: true
  };
  // TODO, should we load for different devices?
  var baseConfig = Object.assign({}, baseConfig, { width: 1300, height: 900 });
  return baseConfig;
}

module.exports = function(grunt) {
  var config = {
    project: {
      app: './app',
      assets: 'assets',
      build: 'build',
      public: '/'
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
      },
      manifest: {
        expand: true,
        src: '*.json',
        dest: '<%= project.build %>',
        cwd: '<%= project.assets %>'
      }
    },
    // concat all css for penthhouse
    concat: {
      css: {
        src: [
          'node_modules/react-aspect-ratio/aspect-ratio.css',
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
          compatibility: 'ie8',
          sourceMap: false
        },
        files: [
          {
            src: [
              '<%= project.build %>/css/theme.css',
              'node_modules/react-aspect-ratio/aspect-ratio.css'
            ],
            dest: '<%= project.build %>/css/theme.css'
          },
          {
            src: ['<%= project.build %>/css/normalize.css'],
            dest: '<%= project.build %>/css/normalize.css'
          },
          {
            src: ['<%= project.build %>/css/atomic.css'],
            dest: '<%= project.build %>/css/atomic.css'
          },
          {
            src: ['<%= project.build %>/css/transition.css'],
            dest: '<%= project.build %>/css/transition.css'
          }
        ]
      },
      critial: {
        options: {
          report: 'gzip',
          compatibility: 'ie8',
          sourceMap: false
        },
        files: [
          {
            src: ['<%= project.assets %>/css/critial.css'],
            dest: '<%= project.assets %>/css/critial.css'
          }
        ]
      }
    },
    postcss: {
      app: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: ['> 1%', 'last 2 versions']
            })
          ]
        },
        files: [
          {
            src: ['<%= project.build %>/css/atomic.css'],
            dest: '<%= project.build %>/css/atomic.css'
          },
          {
            src: ['<%= project.build %>/css/theme.css'],
            dest: '<%= project.build %>/css/theme.css'
          },
          {
            src: ['<%= project.build %>/css/critial.css'],
            dest: '<%= project.build %>/css/critial.css'
          },
          {
            src: ['<%= project.build %>/css/transition.css'],
            dest: '<%= project.build %>/css/transition.css'
          }
        ]
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
      dev: getWebpackConfig({ isDev: true, entry: './client.js' }),
      prod: getWebpackConfig({ isDev: false, entry: './client.js' })
    },
    hash: {
      options: {
        mapping: '<%= project.build %>/assets.json', //mapping file so your server can serve the right files
        srcBasePath: '<%= project.build %>/', // the base Path you want to remove from the `key` string in the mapping file
        destBasePath: '<%= project.build %>/'
      },
      js: {
        src: '<%= project.build %>/js/*.js',
        dest: '<%= project.build %>/js/'
      },
      css: {
        src: '<%= project.build %>/css/*.css',
        dest: '<%= project.build %>/css/'
      }
    },
    modernizr: {
      dist: {
        dest: '<%= project.build %>/js/modernizr.js',
        tests: ['csstransforms3d'],
        options: ['prefixed', 'setClasses'],
        uglify: true,
        crawl: false
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-atomizer');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-penthouse');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', [
    'clean',
    'css',
    'modernizr:dist',
    'hash',
    'concurrent:dev'
  ]);
  grunt.registerTask('build', [
    'clean',
    'modernizr:dist',
    'css',
    'hash:css',
    'webpack:prod',
    'hash:js'
  ]);
  grunt.registerTask('css', ['atomizer:app', 'copy', 'cssmin', 'postcss:app']);
  // need to run after server up
  grunt.registerTask('penthouse-tasks', [
    'concat',
    'penthouse',
    'cssmin:critial'
  ]);
  grunt.registerTask('dev', ['default']);
};
