import React, { useState, useEffect } from 'react';
import SelectableDeck from './SelectableDeck';

const DeckList = ({
  decks,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
  setDeckToEdit,
}) => {
  const [deckList, setDeckList] = useState([]);

  const toggleDeck = (event, deckId) => {
    setSelectedDecks(decks => {
      if (decks.includes(deckId)) {
        return decks.filter(ele => ele !== deckId)
      } else {
        return [...decks, deckId];
      }
    })
  }

  useEffect(() => {
    setDeckList(decks.map(deck => {
        return (
          <SelectableDeck 
            key={deck.id}
            title={deck.title}
            toggleDeck={toggleDeck}
            id={deck.id}
            selectedDecks={selectedDecks}
            handleButtons={handleButtons}
            length={/* deck.cards.length */ 1}
            setDeckToEdit={() => {
              setDeckToEdit({ id: deck.id, title: deck.title });
            }}
          />
        )
      }
    ))
  }, [decks, selectedDecks, handleButtons])

  return (
    <>
      <label>Your decks:</label>
      <ul className="deck-list">
        {deckList}
      </ul>
    </>
  )
}

export default DeckList;