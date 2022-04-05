const { RouteStore } = require('fluxible-router');
const routes = require('../configs/routes').default;

module.exports = RouteStore.withStaticRoutes(routes);
