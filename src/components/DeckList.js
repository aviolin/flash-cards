import React from 'react';

const DeckList = (props) => {
  return (
    <>
      <label>Your decks:</label>
      <ul className="deck-list">
        {props.children}
      </ul>
    </>
  )
}

export default DeckList;