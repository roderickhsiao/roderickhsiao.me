import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import Smartlink from './common/Smartlink.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import { connectToStores } from 'fluxible-addons-react';
import { map } from 'lodash';

import fetchStaticDataAction from '../actions/fetchStaticData';

class Activity extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activity !== prevState.activity) {
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
    activity: this.props.activity
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'activity'
    });
  }

  renderActivities(activities) {
    if (!activities || !activities.length) {
      return null;
    }
    let nodes = map(activities, (activity, i) => {
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
  }
  render() {
    let { activity } = this.state;
    return (
      <Card>
        <h5 className="M(0)">Extracurricular Activities</h5>
        {this.renderActivities(activity)}
      </Card>
    );
  }
}

export default connectToStores(
  Activity,
  [StaticContentStore],
  (context, props) => {
    return {
      activity: context.getStore(StaticContentStore).getData('activity')
    };
  }
);
