import React, { memo, useEffect, useMemo } from 'react';
import { useFluxible } from 'fluxible-addons-react';
import { connectToStores } from 'fluxible-addons-react';
import { AspectRatio } from 'react-aspect-ratio';

import Img from './common/Img.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import fetchStaticDataAction from '../actions/fetchStaticData';

const MainBrief = (props) => {
  const { summary } = props;
  const { executeAction } = useFluxible();
  const { profile } = summary || {};

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'summary',
    });
  }, []);

  const thumbnail = useMemo(() => {
    let { url, width, height } = profile.thumbnail || {};
    if (!url) {
      return null;
    }
    return (
      <AspectRatio style={{ width }}>
        <Img
          src={url}
          width={width}
          height={height}
          className="Bdrs(100%) Mend(10px)"
          alt=""
          itemProp="image"
        />
      </AspectRatio>
    );
  }, [profile.thumbnail]);

  const listItem = useMemo(() => {
    let { list } = profile || {};
    if (!list || !list.length) {
      return null;
    }

    let node = list.map((item, i) => {
      return (
        <li {...item.props} key={i}>
          {profile[item.field]}
        </li>
      );
    });
    return node;
  }, [profile]);

  const summaryNodes = useMemo(() => {
    return (
      <div className="Px($card-padding)">
        <ol className="M(0)">
          {profile &&
            profile.summary.map((item, i) => {
              return (
                <li className="C(#fff)" key={i}>
                  {item}
                </li>
              );
            })}
        </ol>
      </div>
    );
  }, [[profile.summary]]);

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
        <AspectRatio style={{ width: '400px' }} ratio="4/3">
          <Img
            src="/profile.jpg"
            width={400}
            height={300}
            itemProp="image"
            htmlAttributes={{ loading: 'eager' }}
            alt="Taz"
          />
        </AspectRatio>

        <div
          className="Pos(a) T(0) Bds(s)"
          style={{
            borderWidth: '300px 0 0 100px',
            borderColor: 'transparent transparent transparent #212121',
          }}
        />
      </div>
      <div className="Bgc(#212121)">
        <div className="D(ib)--xs Va(t) D(n) Pt($card-padding) Pstart($card-padding)">
          {thumbnail}
        </div>
        <div className="D(ib) Va(t) P($card-padding)">
          <ul className="M(0) C(#fff)">{listItem}</ul>
        </div>
        {summaryNodes}
      </div>
    </div>
  );
};

export default connectToStores(
  memo(MainBrief),
  [StaticContentStore],
  (context) => {
    return {
      summary: context.getStore(StaticContentStore).getData('summary'),
    };
  }
);
