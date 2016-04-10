import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import {map} from 'lodash';

import sites from '../data/about';

class About extends Component {
    renderLink () {
        let nodes = map(sites, function eachSite (site, i) {
            return (
                <li key={i} className='D(ib) W(1/4)'>
                    <a className='D(b) My(6px)' href={site.url} target='_blank'>
                        {site.name}
                    </a>
                </li>
            );
        });
        return (
            <ul classNam=''>
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
                <footer className='BdT Bdtc($c-black-4) Py(10px)'>
                    <a className='C($c-black-2)' href='https://github.com/roderickhsiao/roderickhsiao.me'>
                        Source Code
                    </a>
                </footer>
            </Card>
        );
    }
}

export default About;
