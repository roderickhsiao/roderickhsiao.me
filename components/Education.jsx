import React, { memo, useEffect, useMemo } from 'react';
import { useFluxible, connectToStores } from 'fluxible-addons-react';
import classNames from 'clsx';
import { AspectRatio } from 'react-aspect-ratio';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Education = (props) => {
  const { executeAction } = useFluxible();
  const { education } = props;

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'education',
    });
  }, []);

  const educationNodes = useMemo(() => {
    if (!education?.length) {
      return null;
    }
    let nodes = education.map((edu, i) => {
      let { thumbnail } = edu || {};
      let height = (thumbnail.height / thumbnail.width) * 100;
      return (
        <li
          key={i}
          className={classNames('Py(10px) Cf', {
            'Bdbw(1px) Bdbs(s) Bdbc($c-black-4)': i !== education.length - 1,
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
            <AspectRatio
              className="D(n)--xs Fl(end)"
              style={{ width: '100px' }}
            >
              <Img src={thumbnail.url} height={height} width={100} />
            </AspectRatio>
          ) : null}
        </li>
      );
    });
    return <ul>{nodes}</ul>;
  }, [education]);

  if (!education || !Object.keys(education).length) {
    return null;
  }

  return (
    <Card>
      <h5 className="My(10px) Mx(0) C($c-black-2) Fw(400)">Education</h5>
      {educationNodes}
    </Card>
  );
};

export default connectToStores(
  memo(Education),
  [StaticContentStore],
  (context, props) => {
    return {
      education: context.getStore(StaticContentStore).getData('education'),
    };
  }
);
