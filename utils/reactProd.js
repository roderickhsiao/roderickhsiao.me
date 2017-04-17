// server minified version of react on server side
var fs = require('fs');
var resolve = require('resolve');
var resolveOpts = {
  basedir: process.cwd()
};

var reactPath = {
  react: fs.realpathSync(resolve.sync('react', resolveOpts)),
  reactDom: fs.realpathSync(resolve.sync('react-dom/server', resolveOpts)),
  reactDist: fs.realpathSync(resolve.sync('react/dist/react.min', resolveOpts)),
  reactDistDom: fs.realpathSync(resolve.sync('react-dom/dist/react-dom-server.min', resolveOpts))
};

require(reactPath.reactDist);
require.cache[reactPath.react] = require.cache[reactPath.reactDist];

// react dom reuiqre react
require(reactPath.reactDistDom);
require.cache[reactPath.reactDom] = require.cache[reactPath.reactDistDom];
