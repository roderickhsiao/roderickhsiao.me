import React, { memo, Fragment } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import classNames from 'clsx';

import Img from './Img.jsx';

const Smartlink = memo(props => {
  const { smartlink } = props;

  if (!smartlink) {
    return null;
  }
  const { thumbnail } = smartlink || {};
  const ratio = `${thumbnail.width}/${thumbnail.height}`;
  const isLargeTemplate = smartlink.type === 'large';
  return (
    <a
      className="Bd My(10px) Bdc($c-black-4) Cf D(b) Cur(p) Td(n) Td(n):h Bxsh($shadow-2dp) Bxsh($shadow-4dp):h Trsdu($trsdu-fast)"
      href={smartlink.url}
      target="_black"
      rel="noopener noreferrer"
    >
      <Fragment>
        {isLargeTemplate ? (
          <AspectRatio ratio={ratio}>
            <Img src={thumbnail.url} alt="" />
          </AspectRatio>
        ) : (
          <Img
            nodeName="div"
            src={thumbnail.url}
            className="M(-1px) Bgz(ct) W(150px) H(150px) H(100px)!--xs W(100px)!--xs D(ib) Bgr(nr) Fl(start) Bgc(#fff)"
          />
        )}
        <div
          className={classNames('P(10px) C($c-black-1) P(6px)!--xs', {
            'Va(t) Mstart(160px) Mstart(100px)!--xs Bxz(bb)': !isLargeTemplate
          })}
        >
          <div className="Fz(1.4em) Fz(1.2em)!--xs My(10px) My(2px)!--xs">
            {smartlink.title}
          </div>
          <div className="C($c-black-2) My(10px) My(2px)!--xs LineClamp(3,84px)">
            {smartlink.description}
          </div>
        </div>
      </Fragment>
    </a>
  );
});

export default Smartlink;
