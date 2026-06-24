/* import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import "../styles/Navbar.css";
import DiscountBanner from "./ui/DiscountCOmp";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
        <DiscountBanner endDate='2025-12-31T23:59:59' /> 
      <div className='nav-container'>
      
        <div className='nav-logo'>
       
          <img className='myLogo' src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png' />
        </div>

        <div className='nav-links'>
          <a href='#home' className='nav-link'>
            Home
          </a>
          <a href='#heroSections' className='nav-link'>
            Features
          </a>
          <a href='/services' className='nav-link'>
            Services
          </a>
          <a href='#pricing' className='nav-link'>
            Pricing
          </a>

          <a href='/contact' className='nav-link'>
            Contact
          </a>
        </div>

       
        <div className='nav-cta'>
          <button
            onClick={() => {
              navigate("/portals");
            }}
            className='cta-button gtaBtn'
          >
            Get Started
          </button>
        </div>

       
        <button className='mobile-menu-btn' onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <a href='#home' className='mobile-nav-link' onClick={toggleMenu}>
          Home
        </a>
        <a href='#heroSections' className='mobile-nav-link' onClick={toggleMenu}>
          Features
        </a>
        <a href='/services' className='mobile-nav-link' onClick={toggleMenu}>
          Services
        </a>
        <a href='#pricing' className='mobile-nav-link' onClick={toggleMenu}>
          Pricing
        </a>
        <a href='/contact' className='mobile-nav-link' onClick={toggleMenu}>
          Contact
        </a>
        <button
          onClick={() => {
            navigate("/portals");
          }}
          className='mobile-cta-button'
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, ShoppingBag, Warehouse, Package, BarChart3, Globe } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const SOLUTIONS = [
  {
    icon: ShoppingBag,
    label: "Retail Stores",
    desc: "POS terminal built for Nigerian retail",
    path: "/solutions/retail-stores",
    color: "#2563EB",
    bg: "rgba(37,99,235,.09)",
  },
  {
    icon: Warehouse,
    label: "Warehouse Integration",
    desc: "Connect every location to one stock pool",
    path: "/solutions/warehouse-integration",
    color: "#37B4C5",
    bg: "rgba(55,180,197,.09)",
  },
  {
    icon: Package,
    label: "Inventory Management",
    desc: "Real-time stock counts with every sale",
    path: "/solutions/inventory-management",
    color: "#16A34A",
    bg: "rgba(22,163,74,.09)",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    desc: "Sales trends, margins and peak hours",
    path: "/solutions/analytics",
    color: "#F5A623",
    bg: "rgba(245,166,35,.09)",
  },
  {
    icon: Globe,
    label: "E-Commerce",
    desc: "Sell online via Shurplug in minutes",
    path: "/solutions/ecommerce",
    color: "#37B4C5",
    bg: "rgba(55,180,197,.09)",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolOpen, setIsSolOpen] = useState(false);
  const [isMobileSolOpen, setIsMobileSolOpen] = useState(false);

  const solRef = useRef(null);
  const hoverTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // close dropdown on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSolOpen(false);
    setIsMobileSolOpen(false);
  }, [location.pathname]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (solRef.current && !solRef.current.contains(e.target)) {
        setIsSolOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // slight delay before hiding so cursor can reach the dropdown
  const handleSolEnter = () => {
    clearTimeout(hoverTimer.current);
    setIsSolOpen(true);
  };
  const handleSolLeave = () => {
    hoverTimer.current = setTimeout(() => setIsSolOpen(false), 120);
  };

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
    if (isMenuOpen) setIsMobileSolOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        {/* ── Logo ─────────────────────────────────── */}
        <Link to='/' className='nav-logo'>
          <img className='myLogo' src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png' alt='StoreLense' />
        </Link>

        {/* ── Desktop links ────────────────────────── */}
        <div className='nav-links'>
          {/* Solutions mega-link with dropdown */}
          <div className='nav-solutions' ref={solRef} onMouseEnter={handleSolEnter} onMouseLeave={handleSolLeave}>
            <button
              className={`nav-link nav-solutions-btn${isSolOpen ? " nav-link--active" : ""}`}
              onClick={() => setIsSolOpen((v) => !v)}
              aria-expanded={isSolOpen}
              aria-haspopup='true'
            >
              Solutions
              <ChevronDown size={15} className={`nav-chevron${isSolOpen ? " nav-chevron--open" : ""}`} />
            </button>

            {/* Dropdown panel */}
            <div className={`sol-dropdown${isSolOpen ? " sol-dropdown--open" : ""}`} role='menu'>
              <div className='sol-dropdown-inner'>
                <p className='sol-dropdown-title'>Our Solutions</p>
                <div className='sol-grid'>
                  {SOLUTIONS.map(({ icon: Icon, label, desc, path, color, bg }) => (
                    <Link key={path} to={path} className='sol-item' role='menuitem' onClick={() => setIsSolOpen(false)}>
                      <span className='sol-item-ic' style={{ background: bg }}>
                        <Icon size={18} color={color} strokeWidth={2} />
                      </span>
                      <span className='sol-item-text'>
                        <span className='sol-item-label'>{label}</span>
                        <span className='sol-item-desc'>{desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a href='#heroSections' className='nav-link'>
            Features
          </a>
          <a href='/services' className='nav-link'>
            Services
          </a>
          <a href='#pricing' className='nav-link'>
            Pricing
          </a>
          <a href='/contact' className='nav-link'>
            Contact
          </a>
        </div>

        {/* ── Desktop CTA ──────────────────────────── */}
        <div className='nav-cta'>
          <button className='cta-button gtaBtn' onClick={() => navigate("/portals")}>
            Get Started
          </button>
        </div>

        {/* ── Mobile hamburger ─────────────────────── */}
        <button className='mobile-menu-btn' onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────── */}
      <div className={`mobile-menu${isMenuOpen ? " mobile-menu-open" : ""}`} aria-hidden={!isMenuOpen}>
        {/* Solutions accordion */}
        <button className='mobile-nav-link mobile-sol-toggle' onClick={() => setIsMobileSolOpen((v) => !v)} aria-expanded={isMobileSolOpen}>
          <span>Solutions</span>
          <ChevronDown size={16} className={`nav-chevron${isMobileSolOpen ? " nav-chevron--open" : ""}`} />
        </button>

        <div className={`mobile-sol-list${isMobileSolOpen ? " mobile-sol-list--open" : ""}`}>
          {SOLUTIONS.map(({ icon: Icon, label, desc, path, color, bg }) => (
            <Link key={path} to={path} className='mobile-sol-item' onClick={toggleMenu}>
              <span className='mobile-sol-ic' style={{ background: bg }}>
                <Icon size={16} color={color} strokeWidth={2} />
              </span>
              <span className='mobile-sol-label'>{label}</span>
            </Link>
          ))}
        </div>

        <a href='#heroSections' className='mobile-nav-link' onClick={toggleMenu}>
          Features
        </a>
        <a href='/services' className='mobile-nav-link' onClick={toggleMenu}>
          Services
        </a>
        <a href='#pricing' className='mobile-nav-link' onClick={toggleMenu}>
          Pricing
        </a>
        <a href='/contact' className='mobile-nav-link' onClick={toggleMenu}>
          Contact
        </a>

        <button
          className='mobile-cta-button'
          onClick={() => {
            navigate("/portals");
            toggleMenu();
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
