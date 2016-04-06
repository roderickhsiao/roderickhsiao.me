import React, {Component, PropTypes} from 'react';

import Layout from './layouts/Main.jsx';

import {provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';

class App extends Component {
    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func,
        ua: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.routeStore = this.context.getStore('RouteStore');
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
App = provideContext(App);
App = handleHistory(App);

export default App;
