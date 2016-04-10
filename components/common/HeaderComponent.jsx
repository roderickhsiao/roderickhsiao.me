import React, {Component, PropTypes} from 'react';

import EmailIcon from 'react-material-icons/icons/communication/email';
import SocialPersonOutline from 'react-material-icons/icons/social/person-outline';

import {get, map} from 'lodash';
import menuConfig from '../../configs/menu';

class Menu extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let node = map(this.props.menuConfig, function eachConfig (menu, i) {
            return (
                <li className='' key={i}>
                    {
                        menu.name
                    }
                </li>
            );
        });
        return (
            <ul>
                {node}
            </ul>
        );
    }
}

class HeaderComponent extends Component {
    render () {
        let {route} = this.props.context;
        let menuItems = get(menuConfig, ['menu', 'items', route.name], {});

        return (
            <div className='Bxz(bb) W(100%) Bgc($c-indigo-500) C(#fff) Pb(30px) Px(20px) Bxsh($header-box-shadow)'>
                <div className='Fz(56px) Lh(1.5) D(ib) Mt($top-header-height) Tt(c)'>
                    {
                        menuItems.name
                    }
                </div>
                <div className='top-header Pos(f) T(0) End(0) Start(0) Bgc($c-indigo-500) H($top-header-height) Z(10)'>
                    <div className='name D(tb) Pos(a) Start(0) H(100%)'>
                        <h5 className='D(tbc) Va(m) C(#fff) Px(20px) Mx(20px)'>
                            Roderick Hsiao
                        </h5>
                    </div>
                    <menu className='D(tb) Pos(a) End(0) H(100%) M(0)'>
                        <Menu menuConfig={menuConfig} />
                        <a className='D(tbc) Va(m)' href='mailto:roderickhsiao@gmail.com' title='email'>
                            <EmailIcon
                                className='Fill(#fff)!:h Mx(20px)'
                                color='rgba(255,255,255,.54)'
                                style={{width:30, height:30}}
                            />
                        </a>
                        <a
                            className='D(tbc) Va(m)'
                            href='https://drive.google.com/file/d/0B6if6pP4EgBiWTFaLV9PNVZnc0E/view'
                            title='resume'
                        >
                            <SocialPersonOutline
                                className='Fill(#fff)!:h Mx(20px)'
                                color='rgba(255,255,255,.54)'
                                style={{width:30, height:30}}
                            />
                        </a>
                    </menu>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
