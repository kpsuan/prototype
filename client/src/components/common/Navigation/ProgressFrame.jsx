import React from 'react';
import './Navigation.css';

const ProgressFrame = ({ 
  current = 1, 
  total = 4,
  showLabel = true 
}) => {
  return (
    <div className="progress-frame">
      <div className="progress-frame__segments">
        {Array.from({ length: total }).map((_, index) => (
          <div 
            key={index}
            className={`progress-frame__segment ${index < current ? 'progress-frame__segment--active' : ''}`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="progress-frame__label">
          {current}/{total}
        </span>
      )}
    </div>
  );
};

export default ProgressFrame;
