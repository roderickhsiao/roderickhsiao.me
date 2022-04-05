import React, { memo, useEffect, useMemo } from 'react';
import { useFluxible } from 'fluxible-addons-react';
import { connectToStores } from 'fluxible-addons-react';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Country = (props) => {
  const { executeAction } = useFluxible();
  const { country } = props;

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'country',
    });
  }, []);

  const countriesNodes = useMemo(() => {
    var names = Object.keys(country).sort();
    var nodes = names.map((name, i) => {
      return (
        <li className="My(10px)" key={i}>
          <div className="Fz(1.1em) BdB Bdbc($c-black-4) W(100%) Pt(10px)">
            {name}
          </div>
          <p className="Mx(10px) Mx(0)--xs C($c-black-2)">
            {country[name].sort().join(', ')}
          </p>
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }, []);

  if (!country || !Object.keys(country).length) {
    return null;
  }
  return (
    <Card>
      <h5 className="M(0)">Countries and Cities Visited</h5>
      {countriesNodes}
    </Card>
  );
};

export default connectToStores(
  memo(Country),
  [StaticContentStore],
  (context, props) => {
    return {
      country: context.getStore(StaticContentStore).getData('country'),
    };
  }
);
