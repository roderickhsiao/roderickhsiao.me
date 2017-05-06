import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import NavLink from 'fluxible-router/lib/NavLink';

import { get, map } from 'lodash';
import menuConfig from '../../data/menu';

class Menu extends PureComponent {
  render() {
    const { menuConfig } = this.props;
    const { order } = menuConfig;
    const node = map(order, (menu, i) => {
      let config = menuConfig[menu];
      return (
        <li className="D(ib) Mx(20px) Fz(1.2em) Tt(u)" key={i}>
          <NavLink
            activeElement="a"
            href={config.path}
            className="Pb(10px) C(#fff.83) C(#fff):h Td(n) Td(n):h D(b) Bdbc(#fff.0) Bdbw(2px) Bdbc(#fff):h Trsdu($trsdu-fast) Bdbs(s)"
            activeClass="C(#fff) Bdbc(#fff)!"
          >
            {config.name}
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

class HeaderComponent extends PureComponent {
  render() {
    const { route } = this.props.context;
    const menuItems = get(menuConfig, [route.name], {});
    return (
      <div className="Bxz(bb) W(100%) Bgc($c-green-500) C(#fff) Pb(30px) Px(20px) Bxsh($header-box-shadow) Mih($top-header-heigh) Bxsh(n)--xs">
        <div className="Fz(56px) Mx(20px) Lh(1.5) D(ib) Mt($top-header-height) Tt(c) Op(1) Trsdu($trsdu-fast) hasScrolled_Op(0)">
          {menuItems.name}
        </div>
        <div
          id="fix-header"
          className="top-header Pos(f) T(0) End(0) Start(0) Bgc($c-green-500) H($top-header-height) Z(10) uhHide_Bxsh($header-box-shadow)"
        >
          <div className="name D(tb) Pos(a) Start(0) H(100%) Op(0) Trsdu($trsdu-fast) hasScrolled_Op(1) D(n)--xs">
            <h5
              className="D(tbc) Va(m) C(#fff) Px(20px) Mx(20px)"
              itemProp="name"
            >
              Roderick Hsiao
            </h5>
          </div>
          <menu className="D(tb) Pos(a) End(0) H(100%) M(0) P(0) Start(0)--xs">
            <Menu menuConfig={menuConfig} />
          </menu>
        </div>
      </div>
    );
  }
}
HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
