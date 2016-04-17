import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';
import classNames from 'classnames';
import fetchStaticDataAction from '../actions/fetchStaticData';
import shallowCompare from 'react-addons-shallow-compare';

class Education extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            education: this.store.getData('education') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'education'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    renderEducation(data) {
        if (!data || !data.length) {
            return null;
        }
        let nodes = map(data, (edu, i) => {
            let {thumbnail} = edu || {};
            let height = thumbnail.height / thumbnail.width * 100;
            return (
                <li
                    key={i}
                    className={classNames('Py(10px) Cf', {
                        'Bdbw(1px) Bdbs(s) Bdbc($c-black-4)': i !== data.length - 1
                    })}
                >
                    <div className='D(ib) Va(m)'>
                        <h6 className='M(0)'>
                            {edu.name}
                        </h6>
                        <span className='Fz(.9em) Fs(i) C($c-black-3)'>
                            {edu.location} | {edu.time}
                        </span>
                        <div>
                            {edu.department}
                        </div>
                        <div>
                            {edu.college}
                        </div>
                        <div className='Fw(b)'>
                            {edu.degree}
                        </div>
                    </div>
                    {
                        thumbnail.url ? (
                            <Img
                                nodeName='div'
                                src={thumbnail.url}
                                className='Bgz(ct) Bgr(nr) Fl(end) W(100px) D(n)--xs'
                                style={{height: height}}
                            />
                        ): null
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

    render () {
        let {education} = this.state;
        if (!education) {
            return null;
        }
        return (
            <Card>
                <h5 className='My(10px) Mx(0) C($c-black-2) Fw(400)'>
                    Education
                </h5>
                {
                    this.renderEducation(education)
                }
            </Card>
        );
    }
}

Education.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Education = connectToStores(Education, [StaticContentStore], (context, props) => {
    return {
        education: context.getStore(StaticContentStore).getData('education')
    };
});

export default Education;
