import React from 'react';
import App from './components/App';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Fluxible from 'fluxible';
import RouteStore from './stores/RouteStore';

let app = new Fluxible({
    component: App,
    stores: [
        RouteStore
    ]
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

export default app;
