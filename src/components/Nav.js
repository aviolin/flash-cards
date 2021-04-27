import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <header>
      <span>Flash Decks</span>
      <button><FontAwesomeIcon icon={faPlus} /> &nbsp;New Deck</button>
    </header>
  )
}

export default Nav;