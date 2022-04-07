import React, { memo } from 'react';

const imgixClient = new ImgixClient({
  domain: 'roderickhsiao.imgix.net',
});

const Img = (props) => {
  const {
    src,
    alt,
    width,
    height,
    className,
    loading = 'lazy',
    ...rest
  } = props;
  const proxyImageSrc = imgixClient.buildURL(src, {
    w: width,
    h: height,
    auto: 'compress,enhance,format',
    q: 80
  });

  const srcset = imgixClient.buildSrcSet(src, {
    w: width,
    h: height,
    auto: 'compress,enhance,format',
    q: 80
  });

  return (
    <img
      src={proxyImageSrc}
      srcSet={srcset}
      className={className}
      width={width}
      height={height}
      loading={loading}
      {...rest}
    />
  );
};
export default memo(Img);
