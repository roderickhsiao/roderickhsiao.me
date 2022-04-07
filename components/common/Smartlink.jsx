import React, { memo, Fragment } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import classNames from 'clsx';

import Img from './Img.jsx';

const Smartlink = memo((props) => {
  const { smartlink } = props;

  if (!smartlink) {
    return null;
  }
  const { thumbnail } = smartlink || {};
  const ratio = `${thumbnail.width}/${thumbnail.height}`;
  const isLargeTemplate = smartlink.type === 'large';
  return (
    <a
      className={classNames(
        'D(f) Jc(c) Bd My(10px) Bdc($c-black-4) Cf D(b) Cur(p) Td(n) Td(n):h Bxsh($shadow-2dp) Bxsh($shadow-4dp):h Trsdu($trsdu-fast)',
        {
          'Fxd(c)': isLargeTemplate,
        }
      )}
      href={smartlink.url}
      target="_black"
      rel="noopener noreferrer"
    >
      <Fragment>
        {isLargeTemplate ? (
          <AspectRatio ratio={ratio} style={{ width: '100%' }}>
            <Img src={thumbnail.url} alt="" width={670} />
          </AspectRatio>
        ) : (
          <AspectRatio
            className="W(100px)--xs Fxs(0)"
            style={{ width: '150px' }}
          >
            <Img
              src={thumbnail.url}
              width={150}
              height={150}
              className="D(ib) Bgc(#fff) Objf(ct)"
            />
          </AspectRatio>
        )}
        <div
          className={classNames('P(10px) C($c-black-1) P(6px)!--xs Fxg(1)', {
            'Va(t)': !isLargeTemplate,
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
