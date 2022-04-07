import React, { memo } from 'react';

// TODO, this should come from PageStore
import components from '../../configs/components';
import layout from '../../configs/layout';

function loadComponent(regions, components, context) {
  if (!regions?.length) {
    return null;
  }

  let Components = [];

  regions.forEach((path, idx) => {
    var file = require(`../${components[path].path}`).default;
    var Component = file.hasOwnProperty('default') ? file.default : file;

    if (Component) {
      var props = components[path].props || {};
      Components.push(<Component {...props} key={idx} context={context} />);
    }
  });
  return Components;
}

const Main = memo(props => {
  const { header, leftRail, main, rightRail, footer, route } = props;

  const config = layout[route.name];
  const regions = config.regions;
  const context = {
    route: route
  };

  return (
    <section className="main-layout">
      <header className="layout-head Bgc($c-green-500) Mih($top-header-height)">
        {loadComponent(regions.header, components, context)}
      </header>
      <section
        className="main-canvas My(20px) Mx(a) Maw(1240px) Miw(320px) Mx(10px)--xs"
        key={route.name}
      >
        <section className="layout-lead-section">
          {loadComponent(regions.lead, components, context)}
        </section>
        <section
          id="main"
          className="layout-main-section W(60%) Bxz(bb) Pend(20px) W(100%)--xs Pend(0)--xs D(ib)"
        >
          {loadComponent(regions.main, components, context)}
        </section>
        <section className="layout-right-rail W(40%) Bxz(bb) W(100%)--xs D(ib) Va(t) Pos(st) T($top-header-height)">
          {loadComponent(regions.right, components, context)}
        </section>
      </section>
      <footer>{footer}</footer>
    </section>
  );
});

export default Main;
