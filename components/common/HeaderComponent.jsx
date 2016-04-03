import React, {Component, PropTypes} from 'react';

import EmailIcon from 'react-material-icons/icons/communication/email';

class HeaderComponent extends Component {
    render () {
        return (
            <div className='Bxz(bb) W(100%) Bgc($c-indigo-500) C(#fff) Py(30px) Px(20px) Bxsh($header-box-shadow)'>
                <div className='Fz(56px) Lh(1.5) D(ib)'>Roderick Hsiao</div>
                <div className='connect Fl(end) M(20px)'>
                    <a href='mailto:roderickhsiao@gmail.com' title='email'>
                        <EmailIcon
                            className='Fill(#fff)!:h'
                            color='rgba(255,255,255,.54)'
                            style={{width:30, height:30}}
                        />
                    </a>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
