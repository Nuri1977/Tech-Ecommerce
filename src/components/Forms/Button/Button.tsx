import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, disabled = false, ...otherProps }) => {
  return (
    <button className={`btn ${disabled && 'disabled'}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
