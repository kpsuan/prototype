import React from 'react';
import './TopNavbar.css';
import logo from '../../../styles/logo.png';

const TopNavbar = ({ onMenuClick }) => {
  return (
    <nav className="top-navbar">
      <div className="top-navbar__left">
        <button 
          className="top-navbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>
      
      <div className="top-navbar__center">
        <span className="top-navbar__title">A Whole Family Matter</span>
      </div>
      
      <div className="top-navbar__right">
        <div className="top-navbar__avatar">
          <img src={logo} alt="Logo" className="top-navbar__logo" />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
