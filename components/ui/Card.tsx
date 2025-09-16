import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-sm border border-border ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
