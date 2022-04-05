import React, { memo, useEffect, useMemo } from 'react';
import { useFluxible } from 'fluxible-addons-react';

import Card from './common/Card.jsx';
import Smartlink from './common/Smartlink.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import { connectToStores } from 'fluxible-addons-react';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Activity = (props) => {
  const { executeAction } = useFluxible();
  const { activity } = props;

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'activity',
    });
  }, []);

  const activities = useMemo(() => {
    if (!activity?.length) {
      return null;
    }
    let nodes = activity.map((activity, i) => {
      return (
        <li
          key={i}
          className="Pstart(20px) Pstart(10px)!--xs Py(10px) Mb(20px) Mb(10px)!--xs BdB Bdbc($c-black-4)"
        >
          <div>
            <div className="Fw(500) Fz(1.2em)">{activity.name}</div>
            <span className="Fs(i) Fl(end) C($c-black-3) Fz(.9em)">
              {activity.year}
            </span>
            <div className="My(6px) Fz(.9em)">{activity.org}</div>
            <p className="Fs(i) Fz(.9em)">{activity.summary}</p>
            <Smartlink smartlink={activity.smartlink} />
          </div>
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }, [activity]);

  if (!activity) {
    return null;
  }

  return (
    <Card>
      <h5 className="M(0)">Extracurricular Activities</h5>
      {activities}
    </Card>
  );
};

export default connectToStores(
  memo(Activity),
  [StaticContentStore],
  (context, props) => {
    return {
      activity: context.getStore(StaticContentStore).getData('activity'),
    };
  }
);
