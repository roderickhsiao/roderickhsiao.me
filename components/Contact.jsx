import React, { memo, useEffect, useMemo } from 'react';
import { useFluxible } from 'fluxible-addons-react';
import { AspectRatio } from 'react-aspect-ratio';

import { connectToStores } from 'fluxible-addons-react';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';

import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Contact = (props) => {
  const { executeAction } = useFluxible();
  const { contact } = props;

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'contact',
    });
  }, []);

  const contactNodes = useMemo(() => {
    if (!contact?.length) {
      return null;
    }
    const nodes = contact.map((contact, i) => {
      const { icon, name, value, download } = contact;
      return (
        <li className="My(20px) W(1/6) D(ib) W(1/3)--xs" key={i}>
          <a
            className="Fz(1.1em) Va(m) Op(.38) Op(1):h Trsdu($trsdu-fast)"
            href={value}
            target={!download ? '_blank' : undefined}
            download={download}
            rel="noopener noreferrer"
          >
            <AspectRatio ratio="1/1" style={{ width: '32px' }}>
              <Img alt="" src={icon} width={32} height={32} />
            </AspectRatio>

            <span className="Hidden">{name}</span>
          </a>
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }, [contact]);

  if (!contact) {
    return null;
  }

  return (
    <Card>
      <h5 className="M(0)">Contact</h5>
      <div className="My(10px) Fs(i) C($c-black-3)">Mandarin/English</div>
      <p>
        Hey, thanks for visiting! Drop me a message if you want to discuss interesting web ideas, questions, or a potentially fun project to work together :)
      </p>
      <p>
        Open for tech talks invitations, project architecture consulting (web
        performance, large scale web app, team mentoring and more). Book your
        free discussion session with me at{' '}
        <a href="https://calendly.com/roderickhsiao/30-mins">Calendly</a>.
      </p>
      {contactNodes}
    </Card>
  );
};

export default connectToStores(
  memo(Contact),
  [StaticContentStore],
  (context, props) => {
    return {
      contact: context.getStore(StaticContentStore).getData('contact'),
    };
  }
);
