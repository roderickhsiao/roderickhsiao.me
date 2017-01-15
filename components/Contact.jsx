import React, {PureComponent, PropTypes} from 'react';

import Card from './common/Card.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import {connectToStores} from 'fluxible-addons-react';
import {map} from 'lodash';
import fetchStaticDataAction from '../actions/fetchStaticData';

class Contact extends PureComponent {
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

    renderContact (contact) {
        if (!contact || !contact.length) {
            return null;
        }
        let nodes = map(contact, (contact, i) => {
            let {icon} = contact;
            return (
                <li className='My(20px) W(1/4) D(ib) W(1/3)--xs' key={i}>
                    <a className='Fz(1.1em) Va(m)' href={contact.value} target='_blank' rel='noopener'>
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
Contact.displayName = 'Contact';

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
