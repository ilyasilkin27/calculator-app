import React from 'react';

const Display = ({ value, history }) => (
  <div className="calculator-display">
    <div className="history">{history}</div>
    <div className="current-value">{value}</div>
  </div>
);

export default Display;
