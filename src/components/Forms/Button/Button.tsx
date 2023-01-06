import React from 'react';
import './Button.scss';

const Button = ({ children, ...otherProps }: { children: React.ReactNode }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
