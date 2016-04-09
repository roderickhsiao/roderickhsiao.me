import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';

import {map} from 'lodash';
import experience from '../data/experience';

class Experience extends Component {
    renderProject () {

    }

    renderCompanies () {
        let self = this;
        let nodes = map(companies, function eachCompany (company, i) {
            return (
                <div key={i}>
                    <div>
                        <div
                            className='Bgc(cv) W(200px) H(100px)'
                            style={{
                                backgroundImage: company.url
                            }}
                        />
                        {
                            company.name
                        }
                    </div>
                </div>
            );
        });

        return nodes;
    }

    render () {
        let {companies} = experience;
        return (
            <Card>
                <h5 className='My(10px) Mx(0)'>
                    Experiences
                </h5>
                {
                    this.renderCompanies(companies)
                }
            </Card>
        );
    }
}

export default Experience;
