import React, {Component, PropTypes} from 'react';

import Card from './common/Card.jsx';

class MainBrief extends Component {
    render () {
        return (
            <Card>
                <div className='profile D(ib)'>
                    <img
                        src='https://c2.staticflickr.com/2/1443/25886145665_513240793e_q.jpg'
                        width='75'
                        height='75'
                        className='Bdrs(100%) Mend(10px)'
                        alt='Roderick Hsiao Thumbnail'
                    />
                </div>
                <div className='D(ib) Va(t)'>
                    <ul className='M(0)'>
                        <li><h6 className='Mb(4px) Mt(0)'>Roderick Hsiao</h6></li>
                        <li className='C($c-black-3)'>San Francisco Bay Area | Internet Industry</li>
                    </ul>
                </div>
            </Card>
        );
    }
}

export default MainBrief;
