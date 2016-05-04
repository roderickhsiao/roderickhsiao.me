import React, {Component, PropTypes} from 'react';

// From google
const DUMMY_IMAGE_SRC = '//www.gstatic.com/psa/static/1.gif';

const IMAGE_STATUS_INIT = 0;
const IMAGE_STATUS_LOADING = 1;
const IMAGE_STATUS_LOADED = 2;

import {forEach} from 'lodash';
import classNames from 'classnames';
import detectViewport from './Viewport.jsx';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * An image lazyload component, probably can also be used for other blocking assets like iframe
 */
class Img extends Component {
    constructor (props, context) {
        super(props, context);
        this.image = null;
        this.loadImage = this.loadImage.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnError = this.handleOnError.bind(this);

        this.state = {
            status: this.props.isInViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
        };
    }

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            status: newProps.isInViewport ? IMAGE_STATUS_LOADING : IMAGE_STATUS_INIT
        });
    }

    loadImage () {
        this.image = new Image();

        this.image.onload = this.handleOnLoad;
        this.image.onerror = this.handleOnError;
        this.image.src = this.props.src;
    }

    handleOnLoad () {
        this.setState({status: IMAGE_STATUS_LOADED});
    }

    handleOnError () {

    }

    render () {
        let {nodeName = 'img'} = this.props;
        const isImage = nodeName === 'img';
        let props = {
            className: classNames({
                'Op(0)': this.state.status === IMAGE_STATUS_INIT,
                'JsEnabled_Op(1)!': this.state.status === IMAGE_STATUS_LOADING,
                'JsEnabled_Op(1)!': this.state.status === IMAGE_STATUS_LOADED,
                // background image
                'JsEnabled_Bg(n)!': this.state.status === IMAGE_STATUS_INIT,
                'JsEnabled_Bg(n)!': isImage,
                'NoJs_Bgz(cv) NoJs_Op(1)': this.state.status === IMAGE_STATUS_INIT
            }, 'JsEnabled_Trsdu(.3s)', this.props.className),
            width: this.props.width,
            height: this.props.height,
            style: Object.assign({
                backgroundImage: `url("${this.props.src}")`
            }, this.props.style)
        };
        if (isImage) {
            props.src = this.state.status ? this.props.src : DUMMY_IMAGE_SRC;
        }
        if (!this.image && this.state.status === IMAGE_STATUS_LOADING) {
            this.loadImage();
        }
        return (
            React.createElement(nodeName, props)
        );
    }
}
Img.displayName = 'Img';

Img.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired
}

export default detectViewport(Img);
