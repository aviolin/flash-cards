import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBolt } from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
  return (
    <header className="navbar">
      <a href="/" className="logo">
        Flash <FontAwesomeIcon icon={faBolt} /> Cards
      </a>
      <button 
        className="btn-icon"
        name="toggle-sidebar"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
    </header>
  )
}

export default Nav;