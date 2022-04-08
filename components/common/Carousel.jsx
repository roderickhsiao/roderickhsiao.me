import React, { memo } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

const Carousel = ({ nodes, aspectRatio = '16/9' }) => {
  if (!nodes.length) {
    return null;
  }

  return (
    <ul className="M(0) P(0) D(f) List(n) W(100%) Ovx(s)">
      {nodes.map((node, i) => {
        return (
          <li
            key={i}
            className="P(0) Mend(8px) Mend(0):lc"
          >
            <AspectRatio className="W(240px)" ratio={aspectRatio}>
              {node}
            </AspectRatio>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Carousel);
