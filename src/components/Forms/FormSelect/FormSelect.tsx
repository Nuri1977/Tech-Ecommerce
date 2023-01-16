import React, { FC, InputHTMLAttributes } from 'react';
import './FormSelect.scss';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  defaultValue: string;
  label?: string;
}

const FormSelect: FC<SelectProps> = ({ options, defaultValue, onChange, label, ...otherProps }) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <select className="formSelect" value={defaultValue} onChange={onChange} {...otherProps}>
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
