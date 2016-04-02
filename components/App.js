import React, {Component, PropTypes} from 'react';

import {provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';

class App extends Component {
    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    render () {
        //render content
        return (
            <div className='main-app'>
                Hey, this is Roderick.
            </div>
        );
    }
}
App = provideContext(App);
App = handleHistory(App);

export default App;
