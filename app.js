import React from 'react';
import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import App from './components/App';

let app = new Fluxible({
    component: App
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.registerStore(require('./stores/RouteStore'));

export default app;
