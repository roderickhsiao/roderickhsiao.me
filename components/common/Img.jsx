import { memo } from 'react';
import ImgixClient from '@imgix/js-core';

const imgixClient = new ImgixClient({
  domain: 'roderickhsiao.imgix.net',
});

const Img = (props) => {
  const {
    src,
    alt = '',
    width,
    height,
    className,
    loading = 'lazy',
    imgxParams = {},
    ...rest
  } = props;
  const proxyImageSrc = imgixClient.buildURL(src, {
    w: width,
    h: height,
    auto: 'compress,enhance,format',
    fit: 'crop',
    q: 80,
    ...imgxParams,
  });

  const srcset = imgixClient.buildSrcSet(src, {
    w: width,
    h: height,
    auto: 'compress,enhance,format',
    fit: 'crop',
    q: 80,
    ...imgxParams,
  });

  return (
    <img
      alt={alt}
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
