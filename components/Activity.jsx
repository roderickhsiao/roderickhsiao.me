import React, {PureComponent, PropTypes} from 'react';

import Card from './common/Card.jsx';
import Smartlink from './common/Smartlink.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';

import fetchStaticDataAction from '../actions/fetchStaticData';

class Activity extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            activity: this.store.getData('activity') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'activity'
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    renderActivities (activities) {
        if (!activities || !activities.length) {
            return null;
        }
        let nodes = map(activities, (activity, i) => {
            return (
                <li key={i} className='Pstart(20px) Pstart(10px)!--xs Py(10px) Mb(20px) Mb(10px)!--xs BdB Bdbc($c-black-4)'>
                    <div>
                        <div className='Fw(500) Fz(1.2em)'>
                            {activity.name}
                        </div>
                        <span className='Fs(i) Fl(end) C($c-black-3) Fz(.9em)'>{activity.year}</span>
                        <div className='My(6px) Fz(.9em)'>
                            {activity.org}
                        </div>
                        <p className='Fs(i) Fz(.9em)'>
                            {activity.summary}
                        </p>
                        <Smartlink smartlink={activity.smartlink} />
                    </div>
                </li>
            );
        });

        return (
            <ul>
                {
                    nodes
                }
            </ul>
        );
    }
    render () {
        let {activity} = this.state;
        return (
            <Card>
                <h5 className='M(0)'>
                    Extracurricular Activities
                </h5>
                {
                    this.renderActivities(activity)
                }
            </Card>
        );
    }
}
Activity.displayName = 'Activity';

Activity.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Activity = connectToStores(Activity, [StaticContentStore], (context, props) => {
    return {
        activity: context.getStore(StaticContentStore).getData('activity')
    };
});

export default Activity;
