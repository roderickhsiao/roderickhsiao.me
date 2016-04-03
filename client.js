/* global App, document, window, location */

import React from 'react';
import {render} from 'react-dom';

import Debug from 'debug';
import RouteStore from './stores/RouteStore';

import {createElementWithContext as createElement} from 'fluxible-addons-react';
import {navigateAction} from 'fluxible-router';
import app from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';

const debug = Debug('roderickhsiao.me');
const WIN = window;
const dehydratedState = WIN.App || {}; // Sent from the server

debug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    WIN.debug = debug; // Allow control over debug logging
    WIN.context = context; // For accessing from browser console

    debug('React Rendering');
    var mountNode = document.getElementById('app');

    render(createElement(context), mountNode, () => {
        debug('React Rendered');
        injectTapEventPlugin();
    });
});
