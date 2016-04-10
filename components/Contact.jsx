import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';
import EmailIcon from 'react-material-icons/icons/communication/email';
import SocialPersonOutline from 'react-material-icons/icons/social/person-outline';

import {map} from 'lodash';
import contact from '../data/contact';
import shallowCompare from 'react-addons-shallow-compare';

const ICON_MAP = {
    email: EmailIcon,
    'person-outline': SocialPersonOutline
}
class Contact extends Component {
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
        return (
            <Card>
                <h5 className='M(0)'>
                    Contact
                </h5>
                {
                    this.renderContact(contact)
                }
            </Card>
        )
    };
}

export default Contact
