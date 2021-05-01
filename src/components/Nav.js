import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <header className="navbar">
      <button className="btn-icon"><FontAwesomeIcon icon={faBars} /></button>
      <Link to="/" className="logo">flash <FontAwesomeIcon icon={faBolt} /> cards</Link>
      <button className="btn-icon"><FontAwesomeIcon icon={faUser} /></button>
    </header>
  )
}

export default Nav;