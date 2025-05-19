import React, { type JSX } from 'react';

interface RowStatisticProps {
  title: string | JSX.Element;
  children: JSX.Element[];
}

const RowStatisticComponent: React.FC<RowStatisticProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
    </div>
  );
};

export default RowStatisticComponent;
