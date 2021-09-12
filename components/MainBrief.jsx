import React, { PureComponent } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

class MainBrief extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.summary !== prevState.summary) {
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
    summary: this.props.summary
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'summary'
    });
  }

  renderThumbnail(data, name) {
    let { url, width, height } = data;
    if (!url) {
      return null;
    }
    return (
      <Img
        src={url}
        width={width}
        height={height}
        className="Bdrs(100%) Mend(10px)"
        alt={name}
        itemProp="image"
      />
    );
  }

  renderListItem(data) {
    let { list } = data;
    if (!list || !list.length) {
      return null;
    }

    let node = list.map((item, i) => {
      return (
        <li {...item.props} key={i}>
          {data[item.field]}
        </li>
      );
    });
    return node;
  }

  renderSummary(data) {
    return (
      <div className="Px($card-padding)">
        <ol className="M(0)">
          {data.map((item, i) => {
            return (
              <li className="C(#fff)" key={i}>
                {item}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  render() {
    let { profile } = this.state.summary;
    if (!profile || !Object.keys(profile).length) {
      return null;
    }
    return (
      <div
        className="H(300px) Mb(20px) Pos(r) Bgc(#212121) Ov(h) mainBrief Bxsh($shadow-card) Bdrs(8px) Bxsh($shadow-2dp):h Trsdu($trsdu-fast)"
        itemScope=""
        itemType="http://schema.org/Person"
      >
        <div className="Pos(a) End(-180px) D(n) D(b)--md">
          <Img src={'/profile.jpg'} width={400} height={300} itemProp="image" />
          <div
            className="Pos(a) T(0) Bds(s)"
            style={{
              borderWidth: '300px 0 0 100px',
              borderColor: 'transparent transparent transparent #212121'
            }}
          />
        </div>
        <div className="Bgc(#212121)">
          <div className="D(ib)--xs Va(t) D(n) Pt($card-padding) Pstart($card-padding)">
            {this.renderThumbnail(profile.thumbnail, profile.name)}
          </div>
          <div className="D(ib) Va(t) P($card-padding)">
            <ul className="M(0) C(#fff)">{this.renderListItem(profile)}</ul>
          </div>
          {this.renderSummary(profile.summary)}
        </div>
      </div>
    );
  }
}

export default connectToStores(
  MainBrief,
  [StaticContentStore],
  (context, props) => {
    return {
      summary: context.getStore(StaticContentStore).getData('summary')
    };
  }
);
