import React, { PureComponent } from 'react';

// From google
const DUMMY_IMAGE_SRC = 'https://www.gstatic.com/psa/static/1.gif';

const IMAGE_STATUS_INIT = 0;
const IMAGE_STATUS_LOADING = 1;
const IMAGE_STATUS_LOADED = 2;

import { forEach } from 'lodash';
import { handleViewport } from 'react-in-viewport';
import classNames from 'clsx';
import raf from 'raf';

/**
 * An image lazyload component, probably can also be used for other blocking assets like iframe
 */
class Img extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.status === IMAGE_STATUS_LOADED) {
      return null;
    }
    return {
      status: nextProps.inViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
    };
  }

  image = null;
  state = {
    status: this.props.inViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
  };

  loadImage = () => {
    this.image = new Image();

    this.image.onload = this.handleOnLoad;
    this.image.onerror = this.handleOnError;
    raf(() => {
      this.image.src = this.props.src;
    });
  };

  handleOnLoad = () => {
    this.setState({ status: IMAGE_STATUS_LOADED });
  };

  handleOnError = () => {};

  render() {
    const { nodeName = 'img', src, forwardedRef } = this.props;
    const isImage = nodeName === 'img';
    const { status } = this.state;
    const loaded = status === IMAGE_STATUS_LOADED;

    let props = {
      className: classNames(
        {
          'Op(0)': !loaded,
          'JsEnabled_Op(1)': loaded,
          // background image
          'JsEnabled_Bg(n)!': isImage || (!isImage && !loaded),
          'NoJs_Bgz(cv) NoJs_Op(1)': status === IMAGE_STATUS_INIT
        },
        'JsEnabled_Trsdu(.3s)',
        this.props.className
      ),
      width: this.props.width,
      height: this.props.height,
      style: Object.assign(
        {
          backgroundImage: `url("${src}")`
        },
        this.props.style
      ),
      ref: forwardedRef
    };
    if (isImage) {
      props.src =
        status === IMAGE_STATUS_LOADED ? this.props.src : DUMMY_IMAGE_SRC;
      props.loading = 'lazy';
    }
    if (!this.image && this.state.status === IMAGE_STATUS_LOADING) {
      this.loadImage();
    }
    return React.createElement(nodeName, props);
  }
}

export default handleViewport(Img, { threshold: 0.25 }, { disconnectOnLeave: true });
