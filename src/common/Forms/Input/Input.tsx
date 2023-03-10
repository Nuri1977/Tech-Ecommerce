import React, { FC, InputHTMLAttributes } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="formRow">
      {label && <label htmlFor={name}>{label}</label>}
      <input className="formInput" id={name} name={name} {...rest}></input>
    </div>
  );
};

export default Input;
