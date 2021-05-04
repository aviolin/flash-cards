import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => {
  return (
    <header className="navbar">
      <Link to="/" className="logo"><FontAwesomeIcon icon={faBolt} /> flashcards</Link>
      {/* <button className="btn-icon"><FontAwesomeIcon icon={faUser} /></button> */}
    </header>
  )
}

export default Nav;