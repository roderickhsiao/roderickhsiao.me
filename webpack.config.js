const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?//localhost:3000',
    'webpack/hot/only-dev-server',
    './client.js'
  ],
  output: {
    path: path.resolve('./build/js'),
    filename: 'client.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: [
          require.resolve('react-hot-loader'),
          require.resolve('babel-loader')
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // Protects against multiple React installs when npm linking
    new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react'))
  ],
  devtool: 'eval'
};
