import React from 'react';
import './Button.css';

const SecondaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  size = 'md'
}) => {
  return (
    <button
      type={type}
      className={`btn btn-secondary btn-${size} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
