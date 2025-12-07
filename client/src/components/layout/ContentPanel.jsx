import React from 'react';
import './Layout.css';

const ContentPanel = ({ children }) => {
  return (
    <div className="content-panel">
      {children}
    </div>
  );
};

export default ContentPanel;
