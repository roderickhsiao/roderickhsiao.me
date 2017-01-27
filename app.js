import React from 'react';

import App from './components/App';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Fluxible from 'fluxible';
import RouteStore from './stores/RouteStore';
import StaticContentStore from './stores/StaticContentStore';

let app = new Fluxible({
    component: App,
    stores: [
        RouteStore,
        StaticContentStore
    ]
});
app.plug(batchedUpdatePlugin());
app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

export default app;
