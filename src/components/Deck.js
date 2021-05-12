import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FlippableCard from './FlippableCard';
import Carousel from './Carousel';

const Deck = ({ 
  cache,
  update,
  shuffledCards,
  onClick,
  isAddingCard,
  isShowingBack,
  isEditing,
  curDeckId,
  updateShuffled,
  slideCallback
}) => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let frontTitle = "Front:";
    let backTitle = "Back:";
    if (isAddingCard) {
      frontTitle = "New card, front:";
      backTitle = "New card, back:";
    }
    if (isEditing) {
      frontTitle = "Editing front:";
      backTitle = "Editing back:";
    }

    if (shuffledCards.length > 0 && !isAddingCard) {
      setDeck({ cards: shuffledCards, title: "Shuffled Cards" })


      setCards(shuffledCards.map((ele) => {
        return (
          <FlippableCard 
            key={ele.id}
            frontTitle={frontTitle}
            backTitle={backTitle}
            frontText={isAddingCard ? "" : ele.front}
            backText={isAddingCard ? "" : ele.back}
            onClick={onClick}
            isFlipped={isShowingBack}
            isEditing={isEditing}
            cardId={isAddingCard ? "" : ele.id}
            deckId={isAddingCard ? curDeckId : ele.deckId}

            isAddingCard={isAddingCard}
            update={update}
            updateShuffled={updateShuffled}
          />
        )
      }));

      //update();
    } else {
      setDeck(null)
      if (isAddingCard) {
        setCards([
          <FlippableCard 
            frontTitle={frontTitle}
            backTitle={backTitle}
            frontText={""}
            backText={""}
            onClick={onClick}
            isFlipped={isShowingBack}
            isEditing={true}
            cardId={""}
            deckId={curDeckId}
            isAddingCard={true}
            update={update}
            updateShuffled={updateShuffled}
          />
        ])
      }
    }

    }, [cache, shuffledCards, isShowingBack, update, onClick, isEditing, isAddingCard, curDeckId]
  );

  if (deck == null && !isAddingCard) return (
    <section className="landing">
      <p>Shuffle a deck to get started.</p>
    </section>
  );

  return (
    <>
      <Carousel 
        items={cards}
        onClick={onClick}
        leftButtonText={<FontAwesomeIcon icon={faArrowLeft} />}
        rightButtonText={<FontAwesomeIcon icon={faArrowRight} />}
        animTime={.3}
        previousCallback={slideCallback}
        nextCallback={slideCallback}
        showButtons={isEditing || isAddingCard ? false : true}
      />
    </>
  )
}

export default Deck;