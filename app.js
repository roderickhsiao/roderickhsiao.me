import React from 'react';

import { batchedUpdatePlugin } from 'fluxible-addons-react';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Fluxible from 'fluxible';
import App from './components/App';
import RouteStore from './stores/RouteStore';
import StaticContentStore from './stores/StaticContentStore';

const app = new Fluxible({
  component: App,
  stores: [RouteStore, StaticContentStore]
});
app.plug(batchedUpdatePlugin());
app.plug(
  fetchrPlugin({
    xhrPath: '/api'
  })
);

export default app;
