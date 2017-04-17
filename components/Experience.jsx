import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import Smartlink from './common/Smartlink.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';
import classNames from 'classnames';
import fetchStaticDataAction from '../actions/fetchStaticData';

class Experience extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            experience: this.store.getData('experience') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'experience'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    renderProject (projects) {
        if (!projects || !projects.length) {
            return null;
        }
        let nodes = map(projects, (project, i) => {
            let {smartlink} = project;
            return (
                <li className='Pstart(20px) Pstart(10px)!--xs Py(10px) Mb(20px) Mb(10px)!--xs BdStart Bdstartc($c-black-4)' key={i}>
                    <div className='Fz(1.2em) Mb(6px)'>
                        {project.name}
                    </div>
                    <div className='Fs(i) Mb(6px) Fz(.9em) C($c-black-3)'>
                        {project.time}
                    </div>
                    <div className='Mb(6px)'>
                        {project.summary}
                    </div>
                    <div className='C($c-black-3)'>
                        Tech stack: {project.techStack}
                    </div>
                    <Smartlink smartlink={smartlink} />
                </li>
            );
        });
        return (
            <ul>
                {nodes}
            </ul>
        );
    }

    renderCompanies (companies) {
        if (!companies || !companies.length) {
            return null;
        }
        let nodes = map(companies, (company, i) => {
            let {projects} = company;
            return (
                <div key={i}
                    className={classNames('Py(10px)', {
                        'Bdbw(2px) Bdbs(s) Bdbc($c-black-4)': i !== companies.length - 1
                    })}
                >
                    <div className='Cf Mt(10px)'>
                        {
                            company.logo ? (
                                <Img
                                    nodeName='div'
                                    src={company.logo}
                                    className='Bgz(ct) W(100px) H(30px) Bgr(nr) Fl(end)'
                                />
                            ) : null
                        }
                        <h4 className='M(0)'>
                            {
                                company.name
                            }
                        </h4>
                    </div>
                    <div>
                        <h5>
                            {
                                company.title
                            }
                        </h5>
                        <div className='C($c-black-3)'>
                            {
                                company.time
                            }
                            {' '}
                            |
                            {' '}
                            {
                                company.location
                            }
                        </div>
                    </div>
                    <div>
                        {
                            this.renderProject(projects)
                        }
                    </div>
                </div>
            );
        });

        return nodes;
    }

    render () {
        let {experience} = this.state;
        if (!experience || !Object.keys(experience).length) {
            return null;
        }
        let {companies} = experience;
        return (
            <Card>
                <h5 className='My(10px) Mx(0) C($c-black-2) Fw(400)'>
                    Experiences
                </h5>
                {
                    this.renderCompanies(companies)
                }
            </Card>
        );
    }
}
Experience.displayName = 'Experience';

Experience.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Experience = connectToStores(Experience, [StaticContentStore], (context, props) => {
    return {
        experience: context.getStore(StaticContentStore).getData('experience')
    };
});

export default Experience;
