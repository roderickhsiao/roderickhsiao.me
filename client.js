/* global App, document, window, location */

import React from 'react';
import ReactDOM from 'react-dom';

import Debug from 'debug';
import RouteStore from './stores/RouteStore';

import {createElementWithContext as createElement} from 'fluxible-addons-react';
import {navigateAction} from 'fluxible-router';
import app from './app';

var debug = Debug('roderickhsiao.me');
var dehydratedState = window.App || {}; // Sent from the server

const WIN = window;

debug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    WIN.debug = debug; // Allow control over debug logging
    WIN.context = context; // For accessing from browser console

    debug('React Rendering');
    var mountNode = document.getElementById('app');

    ReactDOM.render(createElement(context), mountNode, function reactRender () {
        debug('React Rendered');
    });

    // If server did not load data, fire off the navigateAction
    if (!context.getStore(RouteStore).getCurrentRoute()) {
        setTimeout(function () {
            context.executeAction(navigateAction, {
                url: WIN.location.pathname + WIN.location.search,
                type: 'pageload'
            }, function (err) {
                throw err;
            });
        }, 1000);
    }
});
