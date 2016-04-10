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
                <footer className='BdT Bdtc($c-black-4) Pt(10px)'>
                    <a className='C($c-black-2)' href='https://github.com/roderickhsiao/roderickhsiao.me'>
                        Source Code
                    </a>
                </footer>
            </Card>
        );
    }
}

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
