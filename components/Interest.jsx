import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';

import shallowCompare from 'react-addons-shallow-compare';
import fetchStaticDataAction from '../actions/fetchStaticData'

class Interest extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            interest: this.store.getData('interest') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'interest'
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    renderInterest (interest) {
        if (!interest || !interest.length) {
            return null;
        }
        let nodes = map(interest, (item, i) => {
            let {thumbnail} = item;
            let ratio = thumbnail.height / thumbnail.width * 100;
            return (
                <li className='D(ib) W(100%)--xs W(1/2) Bxz(bb) Va(t)' key={i}>
                    <div className='M(10px) BdB--xs Bdbc($c-black-4)--xs'>
                        <Img
                            nodeName='div'
                            src={thumbnail.url}
                            className='H(150px) H(250px)!--xs W(100%) Bxz(bb) Bgz(ct) Bgr(nr) Bgp(50%)'
                        />
                        <div className='Fw(500) Fz(1.1em) My(6px)'>
                            {
                                item.name
                            }
                        </div>
                        <p className='Fs(i) Fz(.9em)'>
                            {
                                item.summary
                            }
                        </p>
                    </div>

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
        let {interest} = this.state;
        return (
            <Card>
                <h5 className='M(0)'>
                    Interest
                </h5>
                {
                    this.renderInterest(interest)
                }
            </Card>
        );
    }
}
Interest.displayName = 'Interest';

Interest.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Interest = connectToStores(Interest, [StaticContentStore], (context, props) => {
    return {
        interest: context.getStore(StaticContentStore).getData('interest')
    };
});

export default Interest;
