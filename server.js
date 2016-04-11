/* global setImmediate */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Debug from 'debug';

import {createElementWithContext as createElement} from 'fluxible-addons-react';
import {get} from 'lodash';
import {navigateAction} from 'fluxible-router';
import app from './app';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import fs from 'fs';
import favicon from 'serve-favicon';
import fetchAllStaticData from './actions/fetchAllStaticData';
import layout from './configs/layout';
import serialize from 'serialize-javascript';

import HtmlComponent from './components/Html';
import UAParser from 'ua-parser-js';

const debug = Debug('roderickhsiao.me');
const server = express();
const inlineScript = fs.readFileSync('./utils/asyncLoadCSS.js', 'utf-8');
const inlineStyle = fs.readFileSync('./build/css/critial.css', 'utf-8');

server.set('state namespace', 'App');
server.use('/public', express['static'](__dirname + '/build'));
server.use(favicon(__dirname + '/build/images/favicon.ico'));
server.use(bodyParser.json());
server.use(compression());
server.use(cookieParser());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('./services/fetchStaticData'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

function renderPage(req, res, context) {
    debug('Exposing context state');
    let customContext = {
        ua: new UAParser().setUA(req.headers['user-agent']).getResult()
    };
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    const html = ReactDOM.renderToStaticMarkup(
        React.createElement(HtmlComponent, {
            state: exposed,
            markup: ReactDOM.renderToString(createElement(context, customContext)),
            context: context.getComponentContext(),
            inlineScript: inlineScript,
            inlineStyle: inlineStyle
        }
    ));

    debug('Sending markup');
    res.send(html);
}

server.use((req, res, next) => {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(navigateAction, { url: req.url, type: 'pageload' }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        let routeStore = context.getStore('RouteStore');
        let {name} = routeStore.getCurrentRoute();
        let prefetch = get(layout, [name, 'prefetch']);

        if (!prefetch || !prefetch.length) {
            renderPage(req, res, context);
        } else {
            setImmediate(()=> {
                context.executeAction(fetchAllStaticData, {resources: prefetch}, () => {
                    renderPage(req, res, context);
                });
            });
        }
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
