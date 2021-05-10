import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import CardEditor from './CardEditor';

const Deck = ({ 
  cache,
  update,
  shuffledCards,
  onClick,
  isAddingCard,
  isShowingBack,
  isEditing,
  cardId,
  curDeckId,
  updateShuffled
}) => {
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    if (shuffledCards.length > 0) {
      setDeck({ cards: shuffledCards, title: "Shuffled Cards" })
      update();
    } else {
      setDeck(null)
    }

    }, [cache, shuffledCards] // adding update ruins it
  );

  if (deck == null && !isAddingCard) return (
    <section className="landing">
        <p>Shuffle a deck to get started.</p>
      </section>
  );

  return (
    <>
      <Card 
        isShowingBack={isShowingBack}
        onClick={onClick}
        frontText={isAddingCard ? "" : deck.cards[cardId].front}
        backText={isAddingCard ? "" : deck.cards[cardId].back}
        deckId={isAddingCard ? curDeckId : deck.cards[cardId].deckId}
        cardId={isAddingCard ? "" : deck.cards[cardId]?.id}
        isAddingCard={isAddingCard}
        isEditing={isEditing}
        update={update}
        updateShuffled={updateShuffled}
      />
      <button 
        className="btn-change left"
        name="previous"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" className="icon" />
      </button>
      <button 
        className="btn-change right"
        name="next"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowRight} size="2x" className="icon" />
      </button>
    </>
  )
}

export default Deck;