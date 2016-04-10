import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';

import {map} from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import sites from '../data/about';

class About extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderLink () {
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
        return (
            <Card>
                <h5 className='M(0)'>
                    About this site
                </h5>
                <div className='My(10px)'>
                    This website is build on
                    {
                        this.renderLink()
                    }
                </div>
                <footer className='BdT Bdtc($c-black-4) Pt(10px)'>
                    <a className='C($c-black-2)' href='//github.com/roderickhsiao/roderickhsiao.me'>
                        Source Code
                    </a>
                </footer>
            </Card>
        );
    }
}

export default About;
