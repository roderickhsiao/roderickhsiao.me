require('babel-register');

if ('production' === process.env.NODE_ENV) {
  require('./utils/reactProd');
}

module.exports = require('./server');
