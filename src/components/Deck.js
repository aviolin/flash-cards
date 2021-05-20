import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FlippableCard from './FlippableCard';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const Deck = ({ 
  shuffledCards,
  onClick,
  isAddingCard,
  isEditingCard,
  curSelectedDeck,
}) => {
  const [cards, setCards] = useState([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    console.log(isCardFlipped);
  }, [isCardFlipped])

  useEffect(() => {
    let frontTitle = "Front:";
    let backTitle = "Back:";

    if (isAddingCard) {
      frontTitle = "New card, front:";
      backTitle = "New card, back:";
    }
    if (isEditingCard) {
      frontTitle = "Editing front:";
      backTitle = "Editing back:";
    }

    if (shuffledCards.length > 0 && !isAddingCard) {
      setCards(shuffledCards.map((ele) => {
        return (
          <FlippableCard 
            key={ele.id}
            frontTitle={frontTitle}
            backTitle={backTitle}
            frontText={isAddingCard ? "" : ele.front}
            backText={isAddingCard ? "" : ele.back}
            onClick={onClick}
            isFlipped={isCardFlipped}
            setIsFlipped={setIsCardFlipped}
            isEditing={isEditingCard}
            cardId={isAddingCard ? "" : ele.id}
            deckId={isAddingCard ? curSelectedDeck : ele.deckId}
            isAddingCard={isAddingCard}
          />
        )
      }));
    } else {
      if (isAddingCard) {
        setCards([
          <FlippableCard 
            frontTitle={frontTitle}
            backTitle={backTitle}
            frontText={""}
            backText={""}
            onClick={onClick}
            isFlipped={isCardFlipped}
            setIsFlipped={setIsCardFlipped}
            isEditing={true}
            cardId={""}
            deckId={curSelectedDeck}
            isAddingCard={true}
          />
        ])
      }
    }

    }, [shuffledCards, isCardFlipped, onClick, isEditingCard, isAddingCard, curSelectedDeck]
  );

  if (shuffledCards.length === 0 && !isAddingCard) return (
    <div className="landing">
      This deck has no cards. Add a new card in the dashboard!
      <Link to="/app">Dashboard</Link>
    </div>
  );

  const slideCallback = (index) => {
    setIsCardFlipped(false);
  }

  return (
    <>
      <Carousel 
        items={cards}
        leftButtonText={<FontAwesomeIcon icon={faArrowLeft} />}
        rightButtonText={<FontAwesomeIcon icon={faArrowRight} />}
        animTime={.3}
        previousCallback={slideCallback}
        nextCallback={slideCallback}
        showButtons={isEditingCard || isAddingCard ? false : true}
      />
    </>
  )
}

export default Deck;