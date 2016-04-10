import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import EmailIcon from 'react-material-icons/icons/communication/email';
import SocialPersonOutline from 'react-material-icons/icons/social/person-outline';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';
import fetchStaticDataAction from '../actions/fetchStaticData';
import shallowCompare from 'react-addons-shallow-compare';

const ICON_MAP = {
    email: EmailIcon,
    'person-outline': SocialPersonOutline
}
class Contact extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.getStore(StaticContentStore);
        this.state = {
            contact: this.store.getData('contact') || {}
        }
    }

    componentWillMount () {
        this.context.executeAction(fetchStaticDataAction, {
            resource: 'contact'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderContact (contact) {
        if (!contact || !contact.length) {
            return null;
        }
        let nodes = map(contact, (contact, i) => {
            let {icon} = contact;
            let Icon;

            if (icon.indexOf('//') > -1) {
                // URL
                Icon = (
                    <img className='W(30px) H(30px) Mend(10px) Bd(n) Va(m)' src={icon} />
                );
            } else {
                // material design icon
                Icon = ICON_MAP[icon]
                Icon = (
                    <Icon
                        className='W(30px) H(30px) Mend(10px) Va(m)'
                        color='rgba(0,0,0,.54)'
                        style={{width:30, height:30}}
                    />
                );
            }

            return (
                <li className='My(20px) W(1/3) D(ib) W(1/2)--xs' key={i}>
                    {Icon}
                    <a className='Fz(1.1em) C($c-black-2) Va(m)' href={contact.value} target='_blank'>
                        {
                            contact.name
                        }
                    </a>
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
        let {contact} = this.state;
        if (!contact) {
            return null;
        }

        return (
            <Card>
                <h5 className='M(0)'>
                    Contact
                </h5>
                <div className='My(10px) Fs(i) C($c-black-3)'>
                    Mandarin/English
                </div>
                {
                    this.renderContact(contact)
                }
            </Card>
        )
    };
}

Contact.contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
};

Contact = connectToStores(Contact, [StaticContentStore], (context, props) => {
    return {
        contact: context.getStore(StaticContentStore).getData('contact')
    };
});


export default Contact
