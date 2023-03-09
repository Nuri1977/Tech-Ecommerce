import React, { FC, AllHTMLAttributes } from 'react';
import './Card.scss';

interface CardProps extends AllHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
