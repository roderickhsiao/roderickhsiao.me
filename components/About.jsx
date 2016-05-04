import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';

import shallowCompare from 'react-addons-shallow-compare';
import fetchStaticDataAction from '../actions/fetchStaticData';

class About extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            about: this.store.getData('about') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'about'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderLink (sites) {
        let nodes = map(sites, (site, i) => {
            return (
                <li key={i} className='D(ib) W(1/4) Va(t) W(1/3)--xs'>
                    <a className='D(b) My(6px)' href={site.url} target='_blank'>
                        {site.name}
                    </a>
                </li>
            );
        });
        return (
            <ul>
                {nodes}
            </ul>
        )
    }

    render () {
        let {about} = this.state;
        if (!about) {
            return null;
        }
        return (
            <Card>
                <h5 className='M(0)'>
                    About this site
                </h5>
                <div className='My(10px)'>
                    This website is build on
                    {
                        this.renderLink(about)
                    }
                </div>
                <div className='My(10px) Py(10px) BdT Bdtc($c-black-4)'>
                    This is a high performance website
                    <ul className='List(d) Lisp(i)'>
                        <li className='My(6px)'>
                        PageSpeed Test Score:
                            <a
                                className='Mstart(6px) P(6px) D(ib)'
                                target='_blank'
                                href='https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Froderickhsiao.me'
                            >
                                100 / 100
                            </a>
                        </li>
                        <li className='My(6px)' >
                        Web Page Test:
                            <a
                                className='Mstart(4px) P(6px) D(ib)'
                                target='_blank'
                                href='http://www.webpagetest.org/result/160416_WD_122G/'
                            >
                                Speed Index: 713
                            </a>
                        </li>
                        <li className='My(6px)'>
                            Optimize mobile device by implementing
                            <a
                                className='Mstart(4px) P(6px) D(ib)'
                                target='_blank'
                                href='https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en'
                            >
                                Critial Rendering Path
                            </a>
                        </li>
                    </ul>
                </div>
                <footer className='BdT Bdtc($c-black-4) Pt(10px)'>
                    <a className='C($c-black-2)' href='https://github.com/roderickhsiao/roderickhsiao.me'>
                        Source Code
                    </a>
                </footer>
            </Card>
        );
    }
}
About.displayName = 'About';

About.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

About = connectToStores(About, [StaticContentStore], (context, props) => {
    return {
        about: context.getStore(StaticContentStore).getData('about')
    };
});

export default About;
