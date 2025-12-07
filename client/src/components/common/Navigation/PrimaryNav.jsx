import React from 'react';
import './Navigation.css';
import { ArrowLeftIcon } from '../Icons/Icons';

const PrimaryNav = ({ 
  onBack, 
  showBack = true,
  title,
  rightContent
}) => {
  return (
    <nav className="primary-nav">
      <div className="primary-nav__left">
        {showBack && (
          <button 
            className="primary-nav__back"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeftIcon size={20} />
          </button>
        )}
      </div>
      
      {title && (
        <div className="primary-nav__center">
          <span className="primary-nav__title">{title}</span>
        </div>
      )}
      
      <div className="primary-nav__right">
        {rightContent}
      </div>
    </nav>
  );
};

export default PrimaryNav;
