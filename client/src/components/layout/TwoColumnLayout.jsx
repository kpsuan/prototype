import React from 'react';
import './Layout.css';

const TwoColumnLayout = ({ children }) => {
  return (
    <div className="two-column-layout">
      {children}
    </div>
  );
};

export default TwoColumnLayout;
