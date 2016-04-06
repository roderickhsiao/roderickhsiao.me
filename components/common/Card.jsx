import React, {Component, PropTypes} from 'react';

class Card extends Component {
    render () {
        var {title, children, footer} = this.props;
        return (
            <div className='card Bxsh($shadow-2dp) P($card-padding)'>
                {children}
            </div>
        );
    }
}

export default Card;
