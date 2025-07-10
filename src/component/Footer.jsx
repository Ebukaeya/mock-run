import React from "react";
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import "../styles/Footer.css"; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Main Footer Content */}
        <div className='footer-content'>
          {/* Company Info */}
          <div className='footer-section'>
            <div className='footer-logo'>
              {/* <Shield size={32} color='#37b4c5' />
              <span className='logo-text'>StockScout</span> */}
              <img
                className='myLogo'
                src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
                alt='StockScout Logo'
              />
            </div>
            <p className='footer-description'>Protecting your business from inventory theft with advanced monitoring and real-time analytics.</p>
            <div className='social-links'>
              <a href='#' className='social-link'>
                <Facebook size={20} />
              </a>
              <a href='#' className='social-link'>
                <Twitter size={20} />
              </a>
              <a href='#' className='social-link'>
                <Linkedin size={20} />
              </a>
              <a href='#' className='social-link'>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='footer-section'>
            <h3 className='footer-title'>Quick Links</h3>
            <ul className='footer-links'>
              <li>
                <a href='#home'>Home</a>
              </li>
              <li>
                <a href='#heroSections'>Features</a>
              </li>
              <li>
                <a href='/services'>Services</a>
              </li>
              <li>
                <a href='#about'>About Us</a>
              </li>
              <li>
                <a href='#about'>Pricing</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className='footer-section'>
            <h3 className='footer-title'>Solutions</h3>
            <ul className='footer-links'>
              <li>
                <a href='#retail'>Retail Stores</a>
              </li>
              <li>
                <a href='#warehouse'>Warehouse Integration</a>
              </li>
              <li>
                <a href='#restaurants'>Inventory management</a>
              </li>
              <li>
                <a href='#pos'>POS Systems</a>
              </li>
              <li>
                <a href='#analytics'>Analytics</a>
              </li>
              <li>
                <a href='#analytics'>E commerce</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='footer-section'>
            <h3 className='footer-title'>Contact Info</h3>
            <div className='contact-info'>
              <div className='contact-item'>
                <Mail size={16} />
                <span>storelense@pragmasolutions.co</span>
              </div>
              <div className='contact-item'>
                <Phone size={16} />
                <span>+234 81 59273522</span>
              </div>
              <div className='contact-item'>
                <MapPin size={16} />
                <span>Spera in Deo park, block 38, Abakaliki Ebonyi state</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='footer-bottom'>
          <div className='footer-bottom-content'>
            <p className='copyright'>© 2025 Pragma Solutions. All rights reserved.</p>
            <div className='footer-bottom-links'>
              <a href='#privacy'>Privacy Policy</a>
              <a href='#terms'>Terms of Service</a>
              <a href='#cookies'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
