import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import LazyLoad from 'react-lazyload';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';
import classNames from 'classnames';
import fetchStaticDataAction from '../actions/fetchStaticData';
import shallowCompare from 'react-addons-shallow-compare';

class Experience extends Component {
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
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderSmartlink (smartlink) {
        if (!smartlink) {
            return null;
        }
        let {thumbnail} = smartlink || {};
        let ratio = thumbnail.height / thumbnail.width * 100;
        const isLargeTemplate = smartlink.type === 'large';
        return (
            <LazyLoad once={true}>
                <a
                    className='Bd My(10px) Bdc($c-black-4) Cf D(b) Cur(p) Td(n) Td(n):h Bxsh($shadow-2dp) Bxsh($shadow-4dp):h Trsdu($trsdu-fast)'
                    href={smartlink.url}
                    target='_black'
                >
                    <div>
                        {
                            isLargeTemplate ? (
                                <div className='H(0) Pos(r) W(100%)' style={{paddingBottom: ratio + '%'}}>
                                    <img src={thumbnail.url} className='StretchedBox H(100%) W(100%)' />
                                </div>
                            ) : (
                                <div
                                    className='M(-1px) Bgz(ct) W(150px) H(150px) H(100px)!--xs W(100px)!--xs D(ib) Bgr(nr) Fl(start) Bgc(#400090)'
                                    style={{
                                        backgroundImage: `url(${thumbnail.url})`
                                    }}
                                />
                            )
                        }
                        <div className={
                                classNames(
                                    'P(10px) C($c-black-1) P(6px)!--xs', {
                                    'Va(t) Mstart(160px) Mstart(100px)!--xs Bxz(bb)': !isLargeTemplate
                                })
                            }
                        >
                            <div className='Fz(1.4em) Fz(1.2em)!--xs My(10px) My(2px)!--xs'>
                                {
                                    smartlink.title
                                }
                            </div>
                            <div className='C($c-black-2) My(10px) My(2px)!--xs LineClamp(3,84px)'>
                                {
                                    smartlink.description
                                }
                            </div>
                        </div>
                    </div>
                </a>
            </LazyLoad>
        );
    }

    renderProject (projects) {
        let self = this;
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
                    <div clasName='Mb(6px)'>
                        {project.summary}
                    </div>
                    <div className='C($c-black-3)'>
                        Tech stack: {project.techStack}
                    </div>
                    {
                        smartlink ? self.renderSmartlink(smartlink) : null
                    }
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
        let self = this;
        if (!companies || !companies.length) {
            return null;
        }
        let nodes = map(companies, function eachCompany (company, i) {
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
                                <div
                                    className='Bgz(ct) W(100px) H(30px) Bgr(nr) Fl(end)'
                                    style={{
                                        backgroundImage: `url(${company.logo})`
                                    }}
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
                            self.renderProject(projects)
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
