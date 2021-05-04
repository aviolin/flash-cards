import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from './Card';
import Editor from './Editor';
import Loader from './Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Deck = (props) => {
  let { deckId } = useParams();

  const [cardId, setCardId] = useState(0);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    for (let i = 0; i < props.cache.length; i++) {
      if (props.cache[i]._id == deckId) {
        setDeck(props.cache[i]);
        if (props.cache[i].cards.length == 0) {
          setIsAddingCard(true);
        }
        return;
      }
    }
    }, [props.cache, deckId]
  );

  const handleButtons = (event) => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "previous":
        setIsShowingBack(false);
        setCardId(cardId <= 0 ? deck.cards.length - 1 : cardId - 1);
        return;
      case "next":
        setIsShowingBack(false);
        setCardId(cardId >= deck.cards.length - 1 ? 0 : cardId + 1);
        return;
      case "edit":
        setIsEditing(true);
        return;
      case "cancel":
        setIsEditing(false);
        setIsAddingCard(deck.cards.length > 0 ? false : true );
        return;
      case "toggle":
        setIsShowingBack(!isShowingBack);
        return;
      case "add-card":
        setIsAddingCard(true);
        return;
      default: 
        return;
    }
  }

  const update = (data = null) => {
    if (data) 
      props.updateCache(data);

    setCardId(0); // hacky
    setIsEditing(false);
    setIsAddingCard(false);
  }

  if (deck == null) return <Loader />;

  return (
    <section>
      <button 
          className="btn-change left"
          name="previous"
          onClick={handleButtons}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className="icon" />
        </button>
        <button 
          className="btn-change right"
          name="next"
          onClick={handleButtons}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2x" className="icon" />
        </button>
      {isEditing || isAddingCard ? 
      <Editor
        onClick={handleButtons}
        frontText={isAddingCard ? "" : deck.cards[cardId].front}
        backText={isAddingCard ? "" : deck.cards[cardId].back}
        deckId={deckId}
        cardId={deck.cards[cardId]?.id}
        isAddingCard={isAddingCard}
        update={update}
      />
      :
      <Card 
        isShowingBack={isShowingBack}
        frontText={deck.cards[cardId].front}
        backText={deck.cards[cardId].back}
        title={deck.title}
        onClick={handleButtons}
      />
      }
      
    </section>
  )
}

export default Deck;