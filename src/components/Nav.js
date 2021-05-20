import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBolt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Flash <FontAwesomeIcon icon={faBolt} /> Cards
      </Link>
      <button 
        className="btn-icon"
        name="toggle-menu"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
    </header>
  )
}

export default Nav;