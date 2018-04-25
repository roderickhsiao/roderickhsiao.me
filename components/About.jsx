import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import { connectToStores } from 'fluxible-addons-react';
import { map } from 'lodash';

import fetchStaticDataAction from '../actions/fetchStaticData';

class About extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.about !== prevState.about) {
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
    about: this.props.about
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'about'
    });
  }

  renderLink(sites) {
    let nodes = map(sites, (site, i) => {
      return (
        <li key={i} className="D(ib) W(1/4) Va(t) W(1/3)--xs">
          <a
            className="D(b) My(6px)"
            href={site.url}
            target="_blank"
            rel="noopener"
          >
            {site.name}
          </a>
        </li>
      );
    });
    return <ul>{nodes}</ul>;
  }

  render() {
    let { about } = this.state;
    if (!about) {
      return null;
    }
    return (
      <Card>
        <h5 className="M(0)">About this site</h5>
        <div className="My(10px)">
          This website is build on
          {this.renderLink(about)}
        </div>
        <div className="My(10px) Py(10px) BdT Bdtc($c-black-4)">
          This is a high performance website
          <ul className="List(d) Lisp(i)">
            <li className="My(6px)">
              PageSpeed Test Score:
              <a
                className="Mstart(6px) P(6px) D(ib) Fw(b) C(#009a2d)"
                target="_blank"
                rel="noopener"
                href="https://developers.google.com/speed/pagespeed/insights/?url=https://www.roderickhsiao.me"
              >
                100 / 100
              </a>
            </li>
            <li className="My(6px)">
              Web Page Test:
              <a
                className="Mstart(4px) P(6px) D(ib) Fw(b)"
                target="_blank"
                rel="noopener"
                href="http://www.webpagetest.org/result/170115_D8_DW9/"
              >
                Speed Index: 825
              </a>
            </li>
            <li className="My(6px)">
              Optimize mobile device by implementing
              <a
                className="Mstart(4px) P(6px) D(ib) Fw(b)"
                target="_blank"
                rel="noopener"
                href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en"
              >
                Critial Rendering Path
              </a>
            </li>
            <li className="My(6px)">
              Lighthouse progressive web app score:
              <a
                className="Mstart(4px) P(6px) D(ib) Fw(b) C(#009a2d)"
                target="_blank"
                rel="noopener"
                href="https://googlechrome.github.io/lighthouse/viewer/?gist=0effeeb873509db8af6f9b5c63326c95"
              >
                100 / 100
              </a>
            </li>
          </ul>
        </div>
        <footer className="BdT Bdtc($c-black-4) Pt(10px)">
          <a
            className="C($c-black-2)"
            href="https://github.com/roderickhsiao/roderickhsiao.me"
          >
            Source Code
          </a>
        </footer>
      </Card>
    );
  }
}

export default connectToStores(
  About,
  [StaticContentStore],
  (context, props) => {
    return {
      about: context.getStore(StaticContentStore).getData('about')
    };
  }
);
