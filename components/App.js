import React from 'react';
import { handleHistory } from 'fluxible-router';
import { provideContext } from 'fluxible-addons-react';
import { subscribe } from 'subscribe-ui-event';

import Layout from './layouts/Main.jsx';



class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.subscription = [];
  }

  scrollHandler = (e, payload) => {
    let { top } = payload.scroll;
    if (top > 0) {
      this.DOC.classList.add('hasScrolled');
    }
    if (top === 0) {
      this.DOC.classList.remove('hasScrolled');
    }

    if (top >= 154) {
      this.DOC.classList.add('uhHide');
    } else {
      this.DOC.classList.remove('uhHide');
    }
  };

  componentDidMount() {
    this.DOC = document.documentElement;
    this.subscription = [
      subscribe('scroll', this.scrollHandler, {
        enableScrollInfo: true,
        useRAF: true,
        eventOptions: {
          passive: true
        }
      })
    ];
  }

  componentWillUnmount() {
    this.subscription.forEach(function unsubscribe(sub) {
      sub.unsubscribe();
    });
  }

  render() {
    //render content
    let route = this.props.currentRoute || { name: 'home' };
    let { ua } = this.props;
    return (
      <main className="main-app">
        <Layout route={route} ua={ua} />
      </main>
    );
  }
}
App.displayName = 'App';

App = provideContext(App);
App = handleHistory(App);

export default App;
