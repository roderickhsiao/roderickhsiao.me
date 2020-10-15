import React, { PureComponent } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import classNames from 'clsx';
import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';


import fetchStaticDataAction from '../actions/fetchStaticData';

class Education extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.education !== prevState.education) {
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
    education: this.props.education
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'education'
    });
  }

  renderEducation(data) {
    if (!data || !data.length) {
      return null;
    }
    let nodes = data.map((edu, i) => {
      let { thumbnail } = edu || {};
      let height = thumbnail.height / thumbnail.width * 100;
      return (
        <li
          key={i}
          className={classNames('Py(10px) Cf', {
            'Bdbw(1px) Bdbs(s) Bdbc($c-black-4)': i !== data.length - 1
          })}
        >
          <div className="D(ib) Va(m)">
            <h6 className="M(0)">{edu.name}</h6>
            <span className="Fz(.9em) Fs(i) C($c-black-3)">
              {edu.location} | {edu.time}
            </span>
            <div>{edu.department}</div>
            <div>{edu.college}</div>
            <div className="Fw(b)">{edu.degree}</div>
          </div>
          {thumbnail.url ? (
            <Img
              nodeName="div"
              src={thumbnail.url}
              className="Bgz(ct) Bgr(nr) Fl(end) W(100px) D(n)--xs"
              style={{ height: height }}
            />
          ) : null}
        </li>
      );
    });
    return <ul>{nodes}</ul>;
  }

  render() {
    let { education } = this.state;
    if (!education) {
      return null;
    }
    return (
      <Card>
        <h5 className="My(10px) Mx(0) C($c-black-2) Fw(400)">Education</h5>
        {this.renderEducation(education)}
      </Card>
    );
  }
}

export default connectToStores(
  Education,
  [StaticContentStore],
  (context, props) => {
    return {
      education: context.getStore(StaticContentStore).getData('education')
    };
  }
);
