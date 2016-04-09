import React, {Component, PropTypes} from 'react';

class Card extends Component {
    render () {
        var {title, children, footer} = this.props;
        return (
            <div className='card Bxsh($shadow-1dp) P($card-padding) Bxsh($shadow-3dp):h Trsdu($trsdu-fast) Bgc(#fff) Mb(20px)'>
                {children}
            </div>
        );
    }
}

export default Card;
