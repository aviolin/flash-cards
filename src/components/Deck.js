import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DeckButtons from './DeckButtons';
import DeckContent from './DeckContent';
import DeckHeader from './DeckHeader';

const Deck = () => {
  let { deckId } = useParams();

  const [data, setData] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [cardId, setCardId] = useState(0);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  
  useEffect(() => {

    if (isFetched) return;

    console.log("fetching...");

    fetch('http://localhost:5000/decks/' + deckId)
      .then(res => res.json())
      .then(res => {
        setData(res);
        console.log("Length", res.cards.length);
        if (res.cards.length == 0) {
          setIsAddingCard(true);
        }
        setIsFetched(true);
        console.log("fetched")
      });

    }, [isFetched]
  );

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
        setIsAddingCard(data.cards.length > 0 ? false : true );
        return;
      case "toggle-back":
        setIsShowingBack(!isShowingBack);
        return;
      case "add-card":
        setIsAddingCard(true);
        return;
      default: 
        return;
    }
  }

  const updateDeck = () => {

    setCardId(0); // hacky

    setIsFetched(false);
    setIsEditing(false);
    setIsAddingCard(false);
  }

  if (!isFetched) return null;

  return (
    <>
      <section>
        <DeckHeader 
          title={isEditing ? "Editing Card" : isAddingCard ? "Creating Card" : data.title + " - " + (cardId+1 + "/" + data.cards.length)}
          onClick={handleButtons}
          isEditing={isEditing}
          isAddingCard={isAddingCard}
          showCancel={data.cards.length > 0 ? true : false}
          deckId={deckId}
        />
        
        <DeckContent 
          frontText={isAddingCard ? "" : data.cards[cardId].front}
          backText={isAddingCard ? "" : data.cards[cardId].back}
          onClick={handleButtons}
          isEditing={isEditing}
          isAddingCard={isAddingCard}
          isShowingBack={isShowingBack}
          data={data}
          update={updateDeck}
          deckId={deckId}
          cardId={data.cards[cardId]?.id}
        />
        
      </section>
      {<DeckButtons 
        isEditing={ isEditing }
        isAddingCard={isAddingCard}
        onClick={ handleButtons } />}
    </>
  )
}

export default Deck;