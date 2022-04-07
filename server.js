/* global setImmediate */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Debug from 'debug';

import { createElementWithContext as createElement } from 'fluxible-addons-react';
import { navigateAction } from 'fluxible-router';
import app from './app';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import favicon from 'serve-favicon';
import fetchAllStaticData from './actions/fetchAllStaticData';
import fs from 'fs';
import helmet from 'helmet';
import layout from './configs/layout';
import robots from 'robots.txt';
import routes from './configs/routes';
import serialize from 'serialize-javascript';
import sitemap from 'sitemap';
import spdy from 'spdy';
import fetchAction from './services/fetchStaticData';

import HtmlComponent, { headerStringEnd, headerStringStart, htmlStringStart, htmlStringEnd } from './components/Html';
import UAParser from 'ua-parser-js';

import { HTTPS } from 'express-sslify';

const debug = Debug('roderickhsiao.me');
const server = express();
const inlineStyle = fs.readFileSync('./build/css/critial.css', 'utf-8');

const ONE_YEAR = 31556952000;
const IS_PROD = 'production' === process.env.NODE_ENV;
if (IS_PROD) {
  server.use(
    HTTPS({
      trustProtoHeader: true,
      trustXForwardedHostHeader: true
    })
  );
}
server.use(favicon(__dirname + '/build/images/favicon.ico'));
server.use(bodyParser.json());
server.use(
  compression({
    threshold: '100b'
  })
);
server.use(cookieParser());
server.use(csrf({ cookie: true }));
server.use(helmet({
  frameguard: false
}));
server.use(helmet.dnsPrefetchControl({ allow: true }));

server.set('state namespace', 'App');
server.use(
  '/sw.js',
  express.static(__dirname + '/build/js/sw.js', { maxAge: 0 })
);

server.use('/', express.static(__dirname + '/build', { maxAge: ONE_YEAR }));
server.use(
  '/',
  express.static(__dirname + '/build/images', { maxAge: ONE_YEAR })
);
server.use(
  '/',
  express.static(__dirname + '/build/js', { maxAge: ONE_YEAR })
);
server.use(
  '/',
  express.static(__dirname + '/build/css', { maxAge: ONE_YEAR })
);

server.use(robots(__dirname + '/robots.txt'));

// Get access to the fetchr plugin instance
let fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(fetchAction);

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// sitemap
let routeConfig = Object.entries(routes).map(([,route]) => {
  return { url: route.path };
});
let sm = sitemap.createSitemap({
  hostname: 'https://www.roderickhsiao.me',
  cacheTime: 600000,
  urls: routeConfig
});

server.get('/sitemap.xml', (req, res) => {
  sm.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
});

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
      inlineStyle: inlineStyle
    })
  );

  debug('Sending markup');
  res.send(`<!DOCTYPE html>${htmlStringStart}${headerStringStart}<style>${inlineStyle}</style>${headerStringEnd}${html}${htmlStringEnd}`);
}

server.use((req, res, next) => {
  var context = app.createContext({
    req: req, // The fetchr plugin depends on this
    xhrContext: {
      _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
    }
  });

  context.executeAction(
    navigateAction,
    { url: req.url, type: 'pageload' },
    err => {
      if (err) {
        if (err.statusCode && err.statusCode === 404) {
          next();
        } else {
          next(err);
        }
        return;
      }
      res.setHeader('Cache-Control', 'must_revalidate, public, max-age=3600');
      // cors
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      let routeStore = context.getStore('RouteStore');
      let { name } = routeStore.getCurrentRoute();
      let { prefetch } = layout && layout[name];

      if (!prefetch?.length) {
        renderPage(req, res, context);
      } else {
        setImmediate(() => {
          context.executeAction(
            fetchAllStaticData,
            { resources: prefetch },
            () => {
              renderPage(req, res, context);
            }
          );
        });
      }
    }
  );
});

var port = process.env.PORT || 3000;
var expressApp = server;

if (IS_PROD) {
  spdy.createServer(
    {
      key: fs.readFileSync(__dirname + '/server.key'),
      cert: fs.readFileSync(__dirname + '/server.crt')
    },
    server
  );
}
expressApp.listen(port, err => {
  if (err) {
    console.error(error);
    return process.exit(1);
  }
  console.log('Listening on port', port);
});
