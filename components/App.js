import React, { useRef, useEffect, useCallback } from 'react';
import { handleHistory } from 'fluxible-router';
import { provideContext } from 'fluxible-addons-react';
import { subscribe } from 'subscribe-ui-event';

import Layout from './layouts/Main';

let App = (props) => {
  const { currentRoute } = props;
  const subscriptionRef = useRef();
  const route = currentRoute || { name: 'home' };

  const scrollHandler = useCallback((e, payload) => {
    const doc = document.documentElement;
    const { top } = payload.scroll;
    if (top > 0) {
      doc.classList.add('hasScrolled');
    }
    if (top === 0) {
      doc.classList.remove('hasScrolled');
    }

    if (top >= 154) {
      doc.classList.add('uhHide');
    } else {
      doc.classList.remove('uhHide');
    }
  }, []);

  useEffect(() => {
    const subscriptions = subscriptionRef.current;
    subscriptionRef.current = [
      subscribe('scroll', scrollHandler, {
        enableScrollInfo: true,
        useRAF: true,
        eventOptions: {
          passive: true,
        },
      }),
    ];

    return () => {
      subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
    };
  }, []);

  useEffect(() => {
    if (route?.name) {
      window.dataLayer?.push({
        event: 'Pageview'
      });
    }
  }, [route?.name])
  return (
    <main className="main-app">
      <Layout route={route} />
    </main>
  );
};

App.displayName = 'App';

App = provideContext(App);
App = handleHistory(App);

export default App;
