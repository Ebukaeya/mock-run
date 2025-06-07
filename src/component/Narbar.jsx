import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import "../styles/Navbar.css";
/* import "../styles/navBarCss.css"; */

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        {/* Logo */}
        <div className='nav-logo'>
          {/* <Shield size={32} color='#37b4c5' />
          <span className='logo-text'>StockScout</span> */}
          <img className='myLogo' src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png' />
        </div>

        {/* Desktop Navigation */}
        <div className='nav-links'>
          <a href='#home' className='nav-link'>
            Home
          </a>
          <a href='#features' className='nav-link'>
            Features
          </a>
          <a href='#services' className='nav-link'>
            Services
          </a>

          <a href='#contact' className='nav-link'>
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <div className='nav-cta'>
          <button className='cta-button'>Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button className='mobile-menu-btn' onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <a href='#home' className='mobile-nav-link' onClick={toggleMenu}>
          Home
        </a>
        <a href='#features' className='mobile-nav-link' onClick={toggleMenu}>
          Features
        </a>
        <a href='#services' className='mobile-nav-link' onClick={toggleMenu}>
          Services
        </a>
        <a href='#about' className='mobile-nav-link' onClick={toggleMenu}>
          About
        </a>
        <a href='#contact' className='mobile-nav-link' onClick={toggleMenu}>
          Contact
        </a>
        <button className='mobile-cta-button'>Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
