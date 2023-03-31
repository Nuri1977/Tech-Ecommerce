import React, { FC, AllHTMLAttributes } from 'react';
import './Card.scss';

interface CardProps extends AllHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <li {...props} className={`card ${className}`} data-testid="list-item">
      {children}
    </li>
  );
};

export default Card;
