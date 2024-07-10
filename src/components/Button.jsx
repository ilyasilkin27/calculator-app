import React from 'react';

const Button = ({ onClick, children }) => (
  <button className="calculator-button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
