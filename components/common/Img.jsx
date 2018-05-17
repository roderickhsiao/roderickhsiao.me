import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

// From google
const DUMMY_IMAGE_SRC = 'https://www.gstatic.com/psa/static/1.gif';

const IMAGE_STATUS_INIT = 0;
const IMAGE_STATUS_LOADING = 1;
const IMAGE_STATUS_LOADED = 2;

import { forEach } from 'lodash';
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import raf from 'raf';

/**
 * An image lazyload component, probably can also be used for other blocking assets like iframe
 */
class Img extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      status: nextProps.inViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
    };
  }

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired
  };

  image = null;
  state = {
    status: this.props.inViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
  };

  loadImage = () => {
    console.log('!!! load image');
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
    const { nodeName = 'img' } = this.props;
    const isImage = nodeName === 'img';
    let props = {
      className: classNames(
        {
          'Op(0)': this.state.status === IMAGE_STATUS_INIT,
          'JsEnabled_Op(1)!': this.state.status === IMAGE_STATUS_LOADING,
          'JsEnabled_Op(1)!': this.state.status === IMAGE_STATUS_LOADED,
          // background image
          'JsEnabled_Bg(n)!': this.state.status === IMAGE_STATUS_INIT,
          'JsEnabled_Bg(n)!': isImage,
          'NoJs_Bgz(cv) NoJs_Op(1)': this.state.status === IMAGE_STATUS_INIT
        },
        'JsEnabled_Trsdu(.3s)',
        this.props.className
      ),
      width: this.props.width,
      height: this.props.height,
      style: Object.assign(
        {
          backgroundImage: `url("${this.props.src}")`
        },
        this.props.style
      )
    };
    if (isImage) {
      props.src = this.state.status ? this.props.src : DUMMY_IMAGE_SRC;
    }
    if (!this.image && this.state.status === IMAGE_STATUS_LOADING) {
      console.log('!!! load image in render');
      this.loadImage();
    }
    return React.createElement(nodeName, props);
  }
}

export default handleViewport(Img);
