import { hydrate } from 'react-dom';

import Debug from 'debug';

import {
  createElementWithContext as createElement
} from 'fluxible-addons-react';
import app from './app';

(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
          console.log('Service Worker Registered', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed', err);
        });
    });
  }
}());

const debug = Debug('roderickhsiao.me');
const WIN = window;
const dehydratedState = WIN.App || {}; // Sent from the server

debug('rehydrating app');
app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  WIN.debug = debug; // Allow control over debug logging
  WIN.context = context; // For accessing from browser console

  debug('React Rendering');
  const mountNode = document.getElementById('app');

  hydrate(createElement(context), mountNode, () => {
    debug('React Rendered');
  });
});
