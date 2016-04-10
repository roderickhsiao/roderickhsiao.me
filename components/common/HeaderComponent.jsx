import React, {Component, PropTypes} from 'react';

import NavLink from 'fluxible-router/lib/NavLink';

import {get, map} from 'lodash';
import menuConfig from '../../data/menu';

class Menu extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let {menuConfig} = this.props;
        let {order} = menuConfig;
        let node = map(order, function eachConfig (menu, i) {
            let config = menuConfig[menu];
            return (
                <li className='D(ib) Mx(20px) Fz(1.2em) Tt(u)' key={i}>
                    <NavLink href={config.path} className='Pb(10px) C(#fff.83) C(#fff):h Td(n) Td(n):h D(b) Bdbc(#fff.0) Bdbw(2px) Bdbc(#fff):h Trsdu($trsdu-fast) Bdbs(s)' activeClass='C(#fff) Bdbc(#fff)!'>
                        {
                            config.name
                        }
                    </NavLink>
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
        let menuItems = get(menuConfig, [route.name], {});
        return (
            <div className='Bxz(bb) W(100%) Bgc($c-green-500) C(#fff) Pb(30px) Px(20px) Bxsh($header-box-shadow)'>
                <div className='Fz(56px) Lh(1.5) D(ib) Mt($top-header-height) Tt(c)'>
                    {
                        menuItems.name
                    }
                </div>
                <div className='top-header Pos(f) T(0) End(0) Start(0) Bgc($c-green-500) H($top-header-height) Z(10)'>
                    <div className='name D(tb) Pos(a) Start(0) H(100%)'>
                        <h5 className='D(tbc) Va(m) C(#fff) Px(20px) Mx(20px)'>
                            Roderick Hsiao
                        </h5>
                    </div>
                    <menu className='D(tb) Pos(a) End(0) H(100%) M(0)'>
                        <Menu menuConfig={menuConfig} />
                    </menu>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
