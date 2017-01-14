/** global setImmediate **/
import React, {PureComponent, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {forEach} from 'lodash';
import {get} from 'lodash';
import {subscribe} from  'subscribe-ui-event';

let DOC_BODY;
let DOC_EL;
let DOC;
let WIN;

if (typeof window !== 'undefined') {
    DOC = document;
    DOC_BODY = DOC.body;
    DOC_EL = DOC.documentElement;
    WIN = window;
}
function detectViewport (ComponentToRender) {
    return class extends PureComponent {
        static defaultProps = {
            boundary: {
                top: 50,
                bottom: 50
            }
        }
        constructor (props, context) {
            super(props, context);
            this._viewport = {};
            this.state = {
                isInViewport: false
            };
        }

        componentDidMount () {
            // TODO, currently auto subscibe, but probably should be done on
            // sub-component's life cycle
            this.subscribe();
        }

        getPageScrollTop () {
            return DOC_BODY.scrollTop + DOC_EL.scrollTop;
        }

        getElementBoundingClientRect = (e, payload) => {
            let element = ReactDOM.findDOMNode(this);
            let containerBoundingClientReact;
            let {container} = this.props;

            if (!element) {
                return;
            }
            let rect = element.getBoundingClientRect();
            // from subscribe-ui-event
            let pageScrollTop = get(payload, ['scroll', 'top'], this.getPageScrollTop());

            this._viewport.clientHeight = WIN.innerHeight;

            this._viewport.boundingClientReact = {
                top: rect.top + pageScrollTop,
                bottom: rect.bottom + pageScrollTop
            }

            return this._viewport.boundingClientReact;
        }

        subscribe = () => {
            if (!this._viewport.subscriptions) {
                let self = this;
                let options = {
                    enableResizeInfo: true,
                    enableScrollInfo: true
                }
                self._viewport.subscriptions = [
                    subscribe('scroll', self.handleScroll, options),
                    subscribe('scrollStart', self.handleScrollStart, options),
                ];

                setImmediate(() => {
                    self.getElementBoundingClientRect();
                    self.checkViewport();
                })
            }
        }

        handleScroll = (e, payload) => {
            let scrollTop = get(payload, ['scroll', 'top'], this.getPageScrollTop());
            this.checkViewport(scrollTop);
        }

        handleScrollStart = (e, payload) => {
            this.getElementBoundingClientRect.apply(this, arguments);
        }

        unsubscribe = () => {
            if (this._viewport.subscriptions) {
                forEach(this._viewport.subscriptions, (subscription) => {
                    subscription.unsubscribe();
                });
                this._viewport.subscriptions = null;
            }
        }

        componentWillUnmount () {
            this.unsubscribe();
        }

        checkViewport (scrollTop) {
            let rect = get(this, ['_viewport', 'boundingClientReact'], this.getElementBoundingClientRect());
            let pageScrollTop = scrollTop || this.getPageScrollTop();
            let clientHeight = this._viewport.clientHeight;
            let scrollBottom = pageScrollTop + clientHeight;
            let {boundary} = this.props;

            if (
                (rect.top <= scrollBottom + boundary.top) &&
                (rect.bottom >= pageScrollTop + boundary.bottom)
            ) {
                this.setState({isInViewport: true});
                this.unsubscribe();
            } else {
                this.setState({isInViewport: false});
            }
        }
        render () {
            return <ComponentToRender {...this.props} isInViewport={this.state.isInViewport} />;
        }
    }
}
detectViewport.displayName = 'detectViewport';

export default detectViewport;
