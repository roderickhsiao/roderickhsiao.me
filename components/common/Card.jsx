import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

export default class Card extends PureComponent {
  render() {
    const { title, children, footer } = this.props;
    return (
      <div
        {...this.props}
        className="card Bxsh($shadow-card) Bdrs(8px) P($card-padding) Bxsh($shadow-2dp):h Trsdu($trsdu-fast) Bgc(#fff) Mb(20px)"
      >
        {children}
      </div>
    );
  }
}
