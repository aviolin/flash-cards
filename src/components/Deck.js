import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from './Card';
import Editor from './Editor';
import Loader from './Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Deck = (props) => {
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    if (props.shuffledCards.length > 0) {
      setDeck({ cards: props.shuffledCards, title: "Shuffled Cards" })
      props.update();
    } else {
      setDeck(null)
    }

    }, [props.cache, props.shuffledCards]
  );


  if (deck == null && !props.isAddingCard) return <section className="landing"><p>Shuffle a deck to get started.</p></section>;

  return (
    <section>
      <div className={props.isAddingCard || props.isEditing ? "card-wrapper fill" : "card-wrapper"}>

      {/* <button 
          className="btn-change left"
          name="previous"
          onClick={props.handleButtons}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className="icon" />
        </button>
        <button 
          className="btn-change right"
          name="next"
          onClick={props.handleButtons}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2x" className="icon" />
        </button> */}
      {props.isEditing || props.isAddingCard ? 
      <Editor
        onClick={props.handleButtons}
        frontText={props.isAddingCard ? "" : deck.cards[props.cardId].front}
        backText={props.isAddingCard ? "" : deck.cards[props.cardId].back}
        deckId={props.isAddingCard ? props.curDeckId : deck.cards[props.cardId].deckId}
        cardId={props.isAddingCard ? "" : deck.cards[props.cardId]?.id}
        isAddingCard={props.isAddingCard}
        update={props.update}
        updateShuffled={props.updateShuffled}
      />
      :
      <Card 
        isShowingBack={props.isShowingBack}
        frontText={deck.cards[props.cardId].front}
        backText={deck.cards[props.cardId].back}
        title={deck.title}
        onClick={props.handleButtons}
      />
      }
      </div>
    </section>
  )
}

export default Deck;