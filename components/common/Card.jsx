import React, { memo } from "react";

const Card = ({ title, children, footer, ...restProps }) => (
  <div
    {...restProps}
    className="card Bxsh($shadow-card) Bdrs(8px) P($card-padding) Bxsh($shadow-2dp):h Trsdu($trsdu-fast) Bgc(#fff) Mb(20px)"
  >
    {children}
  </div>
);

export default memo(Card);
