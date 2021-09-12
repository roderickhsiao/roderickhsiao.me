import React, { PureComponent } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';


import fetchStaticDataAction from '../actions/fetchStaticData';

class Country extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.country !== prevState.country) {
      return nextProps;
    }

    return null;
  }

  static contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
  };

  store = this.context.getStore(StaticContentStore);
  state = {
    country: this.props.country
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'country'
    });
  }

  renderCountries(countries) {
    var names = Object.keys(countries).sort();
    var nodes = names.map((country, i) => {
      return (
        <li className="My(10px)" key={i}>
          <div className="Fz(1.1em) BdB Bdbc($c-black-4) W(100%) Pt(10px)">
            {country}
          </div>
          <p className="Mx(10px) Mx(0)--xs C($c-black-2)">
            {countries[country].sort().join(', ')}
          </p>
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }

  render() {
    const { country } = this.state;
    if (!country || !Object.keys(country)?.length) {
      return null;
    }
    return (
      <Card>
        <h5 className="M(0)">Countries and Cities Visited</h5>
        {this.renderCountries(country)}
      </Card>
    );
  }
}

export default connectToStores(
  Country,
  [StaticContentStore],
  (context, props) => {
    return {
      country: context.getStore(StaticContentStore).getData('country')
    };
  }
);
