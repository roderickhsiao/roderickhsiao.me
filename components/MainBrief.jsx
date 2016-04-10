import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';

import {map} from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import summary from '../data/summary';

class MainBrief extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderThumbnail (data, name) {
        let {url, width, height} = data;
        return (
            <img
                src={url}
                width={width}
                height={height}
                className='Bdrs(100%) Mend(10px)'
                alt={name}
            />
        );
    }

    renderListItem (data) {
        let {list} = data;
        if (!list || !list.length) {
            return null;
        }

        let node = map(list, (item, i) => {
            let {className} = item.props || {};
            return (
                <li className={className} key={i}>
                    {
                        data[item.field]
                    }
                </li>
            );
        });
        return node;
    }

    renderSummary (data) {
        return (
            <div className='BdT Bdtc($c-black-4) Mt(10px)'>
                <h5 className='My(10px) Mx(0) C($c-black-2) Fw(400)'>
                    Summary
                </h5>
                <ol className='Mend(10px)'>
                    {
                        map(data, (item, i) => {
                            return (
                                <li key={i}>
                                    {
                                        item
                                    }
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        );
    }

    render () {
        let {profile} = summary;
        return (
            <Card>
                <div className='D(ib) Va(t)'>
                    {
                        this.renderThumbnail(profile.thumbnail, profile.name)
                    }
                </div>
                <div className='D(ib) Va(t)'>
                    <ul className='M(0) C($c-black-1)'>
                        {
                            this.renderListItem(profile)
                        }
                    </ul>
                </div>
                {
                    this.renderSummary(profile.summary)
                }
            </Card>
        );
    }
}

export default MainBrief;
