import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <header>
      <Link to="/" className="logo">Flash Decks</Link>
      <button className="small"><FontAwesomeIcon icon={faPlus} /> &nbsp;New Deck</button>
    </header>
  )
}

export default Nav;