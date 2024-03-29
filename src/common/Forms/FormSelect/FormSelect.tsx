import React, { FC, InputHTMLAttributes } from 'react';
import { Category } from '../../../config/interfaces/intefaces';
import './FormSelect.scss';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: Category[] | number[];
  name: string;
  label?: string;
}

const FormSelect: FC<SelectProps> = ({ options, name, label, ...otherProps }) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <select className="formSelect" {...otherProps} data-testid={name}>
        <option key={'deafult'} value={''}>
          {`${name.toLowerCase()} `}
        </option>
        {options.map((option) => {
          if (typeof option === 'number') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            const { uid, name } = option;
            return (
              <option key={uid} value={uid}>
                {name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default FormSelect;
