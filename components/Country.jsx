import { memo, useEffect, useMemo } from 'react';
import { useFluxible, connectToStores } from 'fluxible-addons-react';
import { countryCodeEmoji } from 'country-code-emoji';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Country = (props) => {
  const { executeAction } = useFluxible();
  const { country } = props;
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
  const formatter = new Intl.ListFormat('en', { style: 'narrow', type: 'conjunction' });

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'country',
    });
  }, []);

  const countriesNodes = useMemo(() => {
    var names = Object.keys(country).sort();
    var nodes = names.map((name, i) => (
      <li className="My(10px)" key={i}>
          <div className="Fz(1.1em) BdB Bdbc($c-black-4) W(100%) Pt(10px)">
            <span className="Mend(4px)" role="img" alt="">{countryCodeEmoji(name)}</span>
            {regionNamesInEnglish.of(name)}
          </div>
          <p className="Mx(10px) Mx(0)--xs C($c-black-2)">
            {formatter.format(country[name].sort())}
          </p>
        </li>
    )
  );

    return <ul>{nodes}</ul>;
  }, [country]);

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
  (context) => {
    return {
      country: context.getStore(StaticContentStore).getData('country'),
    };
  }
);
