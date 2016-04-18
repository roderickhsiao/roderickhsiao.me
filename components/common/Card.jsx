import React, {Component, PropTypes} from 'react';

import shallowCompare from 'react-addons-shallow-compare';

class Card extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render () {
        var {title, children, footer} = this.props;
        return (
            <div {...this.props} className='card Bxsh($shadow-1dp) P($card-padding) Bxsh($shadow-3dp):h Trsdu($trsdu-fast) Bgc(#fff) Mb(20px)'>
                {children}
            </div>
        );
    }
}

export default Card;
