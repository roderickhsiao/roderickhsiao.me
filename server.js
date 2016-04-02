import React from 'react';
import ReactDOM from 'react-dom/server';
import Debug from 'debug';

import {createElementWithContext as createElement} from 'fluxible-addons-react';
import {navigateAction} from 'fluxible-router';

import app from './app';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';

import HtmlComponent from './components/Html';

const debug = Debug('roderickhsiao.me');
const server = express();

server.set('state namespace', 'App');
server.use('/public', express['static'](__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

function renderPage(req, res, context) {
    debug('Exposing context state');
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    const html = ReactDOM.renderToStaticMarkup(
        React.createElement(HtmlComponent, {
            state: exposed,
            markup: ReactDOM.renderToString(createElement(context)),
            context: context.getComponentContext()
        }
    ));

    debug('Sending markup');
    res.send(html);
}

server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(navigateAction, { url: req.url, type: 'pageload' }, function (err) {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        renderPage(req, res, context);
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
