const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  proxy: {
    '*': { target: 'http://localhost:3001' }
  }
}).listen(3000, function () {
  console.log('Webpack Dev Server listening on port 3000');
});
