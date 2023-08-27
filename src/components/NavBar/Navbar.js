import React, { useState, useEffect } from 'react';
import css from "./nav.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  useEffect(() => {
    const toggleButton = document.querySelector(".toggle-menu");
    const navbarLinks = document.querySelector(".navbar-links");

    toggleButton.addEventListener("click", toggleNavbar);

    return () => {
      toggleButton.removeEventListener("click", toggleNavbar);
    };
  }, []);

  return (
        
      <nav className='navbar'>
        <div className="brand-title">FarMarket</div>
        <a className='toggle-menu' href="#">
          {/* <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span> */}
        </a>
        <div className={`navbar-links ${navbarActive ? 'active' : ''}`}>
          {/* <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Meals</a></li>
            <li><a href="#">Contact us</a></li>
          </ul> */}
        </div>
      </nav>
    
  );
};


