import React, { useState, useEffect, useRef } from 'react';
import logoImg from './assets/logo fore.png';

function Navbar() {
  // State for mobile menu and language dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Refs for click outside detection
  const langDropdownRef = useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Toggle functions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleLangDropdown = (e) => {
    e.preventDefault();
    setLangDropdownOpen(!langDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImg} alt="Fore Coffee" />
      </div>
      
      {/* Hamburger Menu for Mobile */}
      <div
        className={`navbar-hamburger ${mobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      {/* Navigation Links */}
      <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
        <li><a href="#" className="nav-link">About</a></li>
        <li><a href="#" className="nav-link">Menu</a></li>
        <li><a href="#" className="nav-link">Store</a></li>
        <li><a href="#" className="nav-link">Investors</a></li>
        <li><a href="#" className="nav-link">GCG</a></li>
        <li><a href="#" className="nav-link">Collaboration</a></li>
        <li><a href="#" className="nav-link">News</a></li>
        <li><a href="#" className="nav-link">Career</a></li>
        <li><a href="#" className="nav-link">Contact Us</a></li>
      </ul>
      
      {/* Language Selector */}
      <div className="navbar-right">
        <div className="lang-selector dropdown" ref={langDropdownRef}>
          <a href="#" className="lang-toggle" onClick={toggleLangDropdown}>
            <span className="active-lang">ID</span>
            <span className="dropdown-arrow">{langDropdownOpen ? '▲' : '▼'}</span>
          </a>
          <ul className={`lang-dropdown ${langDropdownOpen ? 'open' : ''}`}>
            <li><a href="#" className="lang-option">EN</a></li>
            <li><a href="#" className="lang-option active">ID</a></li>
          </ul>
        </div>
        
        {/* Download App Button */}
        <a href="#" className="download-app-btn">Download App</a>
      </div>
      
      {/* CSS Styles */}
      <style>{`
        /* Base Navbar Styles */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 2rem;
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 70px;
          width: 100%;
        }
        
        /* Logo Styles */
        .navbar-logo {
          display: flex;
          align-items: center;
        }
        
        .navbar-logo img {
          height: 35px;
        }
        
        /* Right side container for language and download button */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        /* Navigation Links */
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .nav-link {
          color: #333;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s;
          padding: 0.5rem 0;
          position: relative;
        }
        
        .nav-link:hover {
          color: #006241;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #006241;
          transition: width 0.3s;
        }
        
        .nav-link:hover:after {
          width: 100%;
        }
        
        /* Language Selector */
        .lang-selector {
          position: relative;
        }
        
        .lang-toggle {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .active-lang {
          color: #006241;
          font-weight: 600;
        }
        
        .dropdown-arrow {
          font-size: 0.7rem;
          color: #666;
        }
        
        .lang-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          min-width: 80px;
          list-style: none;
          padding: 0.5rem 0;
          margin: 0;
          display: none;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s, transform 0.3s;
          border-radius: 4px;
        }
        
        .lang-dropdown.open {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }
        
        .lang-dropdown li {
          padding: 0;
        }
        
        .lang-option {
          display: block;
          padding: 0.5rem 1rem;
          color: #555;
          text-decoration: none;
          transition: background-color 0.3s, color 0.3s;
          text-align: center;
        }
        
        .lang-option:hover {
          background-color: #f5f5f5;
          color: #006241;
        }
        
        .lang-option.active {
          color: #006241;
          font-weight: 600;
        }
        
        /* Download App Button */
        .download-app-btn {
          background-color: #006241;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background-color 0.3s;
          white-space: nowrap;
        }
        
        .download-app-btn:hover {
          background-color: #004d33;
        }
        
        /* Hamburger Menu */
        .navbar-hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
          width: 30px;
          height: 25px;
          z-index: 20;
        }
        
        .bar {
          height: 3px;
          width: 100%;
          background: #333;
          border-radius: 2px;
          display: block;
          transition: all 0.3s;
        }
        
        .navbar-hamburger.active .bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        
        .navbar-hamburger.active .bar:nth-child(2) {
          opacity: 0;
        }
        
        .navbar-hamburger.active .bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        
        /* Mobile Styles */
        @media (max-width: 1024px) {
          .navbar {
            padding: 0.5rem 1rem;
          }
          
          .navbar-links {
            gap: 1rem;
          }
          
          .nav-link {
            font-size: 0.85rem;
          }
          
          .download-app-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 768px) {
          .navbar-hamburger {
            display: flex;
            order: 3;
          }
          
          .navbar-links {
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #fff;
            width: 100%;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .navbar-links.open {
            max-height: 500px;
          }
          
          .navbar-links li {
            width: 100%;
          }
          
          .navbar-links li a {
            display: block;
            padding: 1rem 2rem;
            border-bottom: 1px solid #eee;
          }
          
          .navbar-right {
            gap: 1rem;
          }
          
          .download-app-btn {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;