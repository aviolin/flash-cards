import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DeckButtons from './DeckButtons';
import DeckContent from './DeckContent';
import DeckHeader from './DeckHeader';

//import { data } from '../data';

const Deck = () => {
  let { deckId } = useParams();

  const [data, setData] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {

    if (isFetched) return;

    fetch('http://localhost:5000/decks/' + deckId)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res);
        setIsFetched(true);
      });

    }, [isFetched])

  const [cardId, setCardId] = useState(0);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleButtons = (event) => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "previous":
        setIsShowingBack(false);
        setCardId(cardId <= 0 ? data.cards.length - 1 : cardId - 1);
        return;
      case "next":
        setIsShowingBack(false);
        setCardId(cardId >= data.cards.length - 1 ? 0 : cardId + 1);
        return;
      case "edit":
        setIsEditing(true);
        return;
      case "cancel":
        setIsEditing(false);
        return;
      case "toggle-back":
        setIsShowingBack(!isShowingBack);
        return;
      case "save":
        return;
      default: 
        return;
    }
  }

  const updateDeck = () => {
    setIsFetched(false);
    setIsEditing(false);
  }

  if (!isFetched) return null;

  return (
    <>
      <section>
        <DeckHeader 
          cardId={cardId}
          title={data.title}
          cardIndex={(data.cards[cardId].id + 1) + "/" + data.cards.length}
          onClick={handleButtons}
          isEditing={isEditing}
        />
        
        <DeckContent 
          frontText={data.cards[cardId].front}
          backText={data.cards[cardId].back}
          onClick={handleButtons}
          isEditing={isEditing}
          isShowingBack={isShowingBack}
          data={data}
          cardId={cardId}
          update={updateDeck}
          deckId={deckId}
        />
      </section>
      <DeckButtons 
        isEditing={ isEditing }
        onClick={ handleButtons } />
    </>
  )
}

export default Deck;