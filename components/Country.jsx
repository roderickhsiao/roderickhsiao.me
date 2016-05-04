import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';

import shallowCompare from 'react-addons-shallow-compare';
import fetchStaticDataAction from '../actions/fetchStaticData';

class Country extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            country: this.store.getData('country') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'country'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderCountries (countries) {
        var names = Object.keys(countries).sort();
        var nodes = map(names, (country, i) => {
            return (
                <li className='My(10px)' key={i}>
                    <div className='Fz(1.1em) BdB Bdbc($c-black-4) W(100%) Pt(10px)'>
                        {
                            country
                        }
                    </div>
                    <p className='Mx(10px) Mx(0)--xs C($c-black-2)'>
                        {
                            countries[country].sort().join(', ')
                        }
                    </p>
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
        return (
            <Card>
                <h5 className='M(0)'>
                    Countries and Cities Visited
                </h5>
                {
                    this.renderCountries(this.state.country)
                }
            </Card>
        );
    }
}
Country.displayName = 'Country';

Country.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Country = connectToStores(Country, [StaticContentStore], (context, props) => {
    return {
        country: context.getStore(StaticContentStore).getData('country')
    };
});

export default Country;
