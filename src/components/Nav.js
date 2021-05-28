import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navlinks from './Navlinks';

const Nav = (props) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Flash Cards
        </Link>
        <button 
          className="btn btn-icon small-screen-only"
          name="toggle-menu"
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        <nav className="large-screen-only">
          <Navlinks closeMenu={() => null}/>
        </nav>
      </div>
    </header>
  )
}

export default Nav;