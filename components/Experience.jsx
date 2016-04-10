import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';

import {map} from 'lodash';
import classNames from 'classnames';
import experience from '../data/experience';

class Experience extends Component {
    renderSmartlink (smartlink) {
        if (!smartlink) {
            return null;
        }
        let {thumbnail} = smartlink || {};
        let ratio = thumbnail.height / thumbnail.width * 100;
        const isLargeTemplate = smartlink.type === 'large';

        return (
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
                                className='Bgz(ct) W(150px) H(150px) D(ib) Bgr(nr) Fl(start) Bgc(#400090)'
                                style={{
                                    backgroundImage: `url(${thumbnail.url})`
                                }}
                            />
                        )
                    }
                    <div className={
                            classNames(
                                'P(10px) C($c-black-1)', {
                                'Va(t)  Mstart(160px) Bxz(bb)': !isLargeTemplate
                            })
                        }
                    >
                        <div className='Fz(1.4em) My(10px)'>
                            {
                                smartlink.title
                            }
                        </div>
                        <div className='C($c-black-2) My(10px)'>
                            {
                                smartlink.description
                            }
                        </div>
                    </div>
                </div>
            </a>
        );
    }

    renderProject (projects) {
        let self = this;
        if (!projects || !projects.length) {
            return null;
        }
        let nodes = map(projects, function eachProject (project, i) {
            let {smartlink} = project;
            return (
                <li className='Px(20px) Py(10px) Mb(20px) BdStart Bdstartc($c-black-4)' key={i}>
                    <div className='Fz(1.2em) Mb(6px)'>
                        {project.name}
                    </div>
                    <div className='Fs(i) Mb(6px)'>
                        {project.time}
                    </div>
                    <div clasName='Mb(6px)'>
                        {project.summary}
                    </div>
                    <div className='C($c-black-3)'>
                        Tech stack: {project.techStack}
                    </div>
                    {
                        self.renderSmartlink(smartlink)
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
                        'Bdbw(2px) Bdbs(s) Bdbc($c-black-4)': i === companies.length
                    })}
                >
                    <div className='Cf Mt(10px)'>
                        <div
                            className='Bgz(ct) W(100px) H(30px) Bgr(nr) Fl(end)'
                            style={{
                                backgroundImage: `url(${company.logo})`
                            }}
                        />
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

export default Experience;
