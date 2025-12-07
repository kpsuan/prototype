import React from 'react';
import './Button.css';

const PrimaryButton = ({ 
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
      className={`btn btn-primary btn-${size} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
