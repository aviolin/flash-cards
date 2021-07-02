/**
 * Generates and displays a list of SelectableDecks.
 */

import React, { useState, useEffect } from 'react';
import SelectableDeck from './SelectableDeck';

const DeckList = ({
  decks,
  selectedDecks,
  setSelectedDecks,
  setDeckToEdit,
}) => {
  const [deckList, setDeckList] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  const toggleDeck = (deckId) => {
    setSelectedDecks(decks => {
      if (decks.includes(deckId)) {
        return decks.filter(ele => ele !== deckId)
      } else {
        return [...decks, deckId];
      }
    });
  }

  useEffect(() => {
    setDeckList(decks.map(deck => {
      return (
        <SelectableDeck 
          key={deck.id}
          title={deck.title}
          toggleDeck={toggleDeck}
          id={deck.id}
          isPrivate={deck.private}
          selectedDecks={selectedDecks}
          length={deck.numCards}
          setSelectedDecks={setSelectedDecks}
          setDeckToEdit={() => {
            setDeckToEdit({ id: deck.id, title: deck.title, private: deck.private });
          }}
        />
      );}
    ));
  }, [decks, selectedDecks]);

  useEffect(() => {
    if (!decks) return;
    let _totalCards = decks.reduce((total, cur) => {
      return total + cur.numCards;
    }, 0)
    setTotalCards(_totalCards);
  }, [decks])

  return (
    <div className="deck-list">
      <p>You have <b>{deckList.length}</b> {deckList.length === 1 ? "deck" : "decks"} and <b>{totalCards}</b> {totalCards === 1 ? "card" : "cards"}:</p>
      <ul>
        {deckList.length > 0 ? 
          deckList
        :
          <p>You have no decks. Create one to start!</p>
        }
      </ul>
    </div>
  );
}

export default DeckList;