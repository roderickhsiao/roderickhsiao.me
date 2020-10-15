import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';

import StaticContentStore from '../stores/StaticContentStore';

import { connectToStores } from 'fluxible-addons-react';
import fetchStaticDataAction from '../actions/fetchStaticData';

class Contact extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contact !== prevState.contact) {
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
    contact: this.props.contact
  };

  componentDidMount() {
    this.context.executeAction(fetchStaticDataAction, {
      resource: 'contact'
    });
  }

  renderContact(contact) {
    if (!contact || !contact.length) {
      return null;
    }
    const nodes = contact.map((contact, i) => {
      const { icon, name, value } = contact;
      return (
        <li className="My(20px) W(1/5) D(ib) W(1/3)--xs" key={i}>
          <a
            className="Fz(1.1em) Va(m) Op(.38) Op(1):h Trsdu($trsdu-fast)"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt={name}
              className="W(32px) H(32px)"
              src={icon}
              loading="lazy"
            />
            <span className="Hidden">{name}</span>
          </a>
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }
  render() {
    let { contact } = this.state;
    if (!contact) {
      return null;
    }

    return (
      <Card>
        <h5 className="M(0)">Contact</h5>
        <div className="My(10px) Fs(i) C($c-black-3)">Mandarin/English</div>
        <p>Hey, thanks for visiting!
        Drop me a message if you want to discuss interesting web ideas, questions, or potentially fun project to work together :)
        </p>
        {this.renderContact(contact)}
      </Card>
    );
  }
}

export default connectToStores(
  Contact,
  [StaticContentStore],
  (context, props) => {
    return {
      contact: context.getStore(StaticContentStore).getData('contact')
    };
  }
);
