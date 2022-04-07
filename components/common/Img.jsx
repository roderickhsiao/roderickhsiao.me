import React, { memo } from 'react';
import Imgix from 'react-imgix';

const Img = (props) => {
  const { src, alt, width, height, className, ...rest } = props;
  return (
    <Imgix
      src={src}
      className={className}
      width={width}
      height={height}
      {...rest}
    />
  );
};
export default memo(Img);
