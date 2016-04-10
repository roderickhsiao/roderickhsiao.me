import React, {Component, PropTypes} from 'react';

import Layout from './layouts/Main.jsx';

import {forEach} from 'lodash';
import {handleHistory} from 'fluxible-router';
import {provideContext} from 'fluxible-addons-react';
import {subscribe} from 'subscribe-ui-event';
import shallowCompare from 'react-addons-shallow-compare';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.routeStore = this.context.getStore('RouteStore');
        this.scrollHandler = this.scrollHandler.bind(this);
        this.subscription = [];
    }

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    scrollHandler (e, payload) {
        if (payload.scroll.top > 0) {
            this.DOC.classList.add('hasScrolled');
        } else {
            this.DOC.classList.remove('hasScrolled');
        }

        if (payload.scroll.top > 154) {
            this.DOC.classList.add('uhHide');
        } else {
            this.DOC.classList.remove('uhHide');
        }

    }

    componentDidMount () {
        this.DOC = document.documentElement;
        this.subscription = [
            subscribe('scroll', this.scrollHandler, {enableScrollInfo: true})
        ];
    }

    componentWillUnmount () {
        forEach(this.subscription, function unsubscribe (sub) {
            sub.unsubscribe();
        });
    }

    render () {
        //render content
        let route = this.routeStore.getCurrentRoute() || {name: 'home'};
        let {ua} = this.props;
        return (
            <main className='main-app'>
                <Layout route={route} ua={ua}/>
            </main>
        );
    }
}
App.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func,
    ua: PropTypes.object
};
App = provideContext(App);
App = handleHistory(App);

export default App;
