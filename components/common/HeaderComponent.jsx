import React, {Component, PropTypes} from 'react';

import EmailIcon from 'react-material-icons/icons/communication/email';
import SocialPersonOutline from 'react-material-icons/icons/social/person-outline';

class HeaderComponent extends Component {
    render () {
        return (
            <div className='Bxz(bb) W(100%) Bgc($c-indigo-500) C(#fff) Pb(30px) Px(20px) Bxsh($header-box-shadow)'>
                <div className='Fz(56px) Lh(1.5) D(ib) Mt($top-header-height)'>
                    Roderick Hsiao
                </div>
                <div className='top-header Pos(f) T(0) End(0) Start(0) Bgc($c-indigo-500) H($top-header-height)'>
                    <div className='connect D(tb) Pos(a) End(0) H(100%)'>
                        <a className='D(tbc) Va(m)' href='mailto:roderickhsiao@gmail.com' title='email'>
                            <EmailIcon
                                className='Fill(#fff)!:h Mx(20px)'
                                color='rgba(255,255,255,.54)'
                                style={{width:30, height:30}}
                            />
                        </a>
                        <a
                            className='D(tbc) Va(m)'
                            download href='https://docs.google.com/uc?authuser=0&id=0B6if6pP4EgBiWTFaLV9PNVZnc0E&export=download' title='resume'>
                            <SocialPersonOutline
                                className='Fill(#fff)!:h Mx(20px)'
                                color='rgba(255,255,255,.54)'
                                style={{width:30, height:30}}
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
