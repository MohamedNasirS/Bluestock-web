import React from 'react';
import './ipo_homestyle.css';

const ipo_home: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/Bluestock.logo.jpg" alt="Bluestock Logo" className="logo" />
          <h1 className="brand-name">BLUESTOCK</h1>
        </div>

        <ul className="navbar-center">
          <li><a href="#">PRODUCTS</a></li>
          <li><a href="#">PRICING</a></li>
          <li><a href="#">COMMUNITY</a></li>
          <li>
            <a href="#">
              MEDIA <i className="fa-solid fa-caret-down"></i>
            </a>
          </li>
          <li>
            <a href="#">
              SUPPORT <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </li>
        </ul>

        <div className="navbar-right">
          <a href="#" className="signin border">Sign In</a>
          <button className="signup-btn border">Sign Up Now</button>
          <div className="menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-msg">
        <h5>Bluestock &gt; IPO &gt; Upcoming IPO</h5>
        <br />
        <h1>Upcoming IPO</h1>
        <p>
          Companies that have filed for an IPO with SEBI. Few details might be
          disclosed by the companies later.
        </p>
      </div>
    </div>
  );
};

