/**
 * Displays the upper navigation bar.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Navlinks from './Navlinks';

const Nav = ({
  onClick,
  isMenuOpen
}) => {
  const classes = "btn btn-hamburger small-screen-only " + (isMenuOpen && "open"); 

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Flash Cards
        </Link>
        <button 
          className={classes}
          name="toggle-menu"
          onClick={onClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="large-screen-only">
          <Navlinks closeMenu={() => null}/>
        </nav>
      </div>
    </header>
  );
}

export default Nav;