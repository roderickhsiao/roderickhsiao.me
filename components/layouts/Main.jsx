import React, {Component, PropTypes} from 'react';

import {get} from 'lodash';
// TODO, this should come from PageStore
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import layout from  '../../configs/layout';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const muiTheme = getMuiTheme({
    userAgent: 'all',
});

function loadComponent (regions, components) {
    if (!regions || !regions.length) {
        return null;
    }

    let Components = [];

    regions.forEach(function eachComponent (path, idx) {
        var file = require('../' + components[path].path).default;
        var Component = file.hasOwnProperty('default') ? file.default : file;

        if (Component) {
            var props = components[path].props || {};
            Components.push(
                <Component {...props} key={idx} />
            );
        }
    });
    return Components;
}

class Main extends Component {
    render () {
        const {header, leftRail, main, rightRail, footer, route} = this.props;
        const config = layout[route.name];
        const regions = config.regions;
        const components = config.components;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <section className='main-layout'>
                    <header className='layout-head'>
                        {
                            loadComponent(regions.header, components)
                        }
                    </header>
                    <section className='layout-left-rail'>
                        {leftRail}
                    </section>
                    <section className='layout-main-section'>
                        {main}
                    </section>
                    <section className='layout-right-rail'>
                        {rightRail}
                    </section>
                    <footer>
                        {footer}
                    </footer>
                </section>
            </MuiThemeProvider>
        );
    }
}

export default Main;
