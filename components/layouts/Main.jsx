import React, {Component, PropTypes} from 'react';

import {get} from 'lodash';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import shallowCompare from 'react-addons-shallow-compare';

// TODO, this should come from PageStore
import components from '../../configs/components';
import layout from  '../../configs/layout';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

function loadComponent (regions, components, context) {
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
                <Component {...props} key={idx} context={context}/>
            );
        }
    });
    return Components;
}

class Main extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    render () {
        const {header, leftRail, main, rightRail, footer, route, ua} = this.props;

        const config = layout[route.name];
        const regions = config.regions;
        const context = {
            route: route
        };
        const muiTheme = getMuiTheme({}, {
            userAgent: ua && ua.ua
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <section className='main-layout'>
                    <header className='layout-head Bgc($c-green-500) Mih($top-header-heigh)'>
                        {
                            loadComponent(regions.header, components, context)
                        }
                    </header>
                    <section className='main-canvas My(20px) Mx(a) Maw(1240px) Miw(320px) Mx(10px)--xs'>
                        <section className='layout-lead-section'>
                            {
                                loadComponent(regions.lead, components, context)
                            }
                        </section>
                        <section className='layout-main-section W(60%) Bxz(bb) Pend(20px) W(100%)--xs Pend(0)--xs D(ib)'>
                            {
                                loadComponent(regions.main, components, context)
                            }
                        </section>
                        <section className='layout-right-rail W(40%) Bxz(bb) W(100%)--xs D(ib) Va(t)'>
                            {
                                loadComponent(regions.right, components, context)
                            }
                        </section>
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
