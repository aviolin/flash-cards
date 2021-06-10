import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FlippableCard from './FlippableCard';
import Carousel from './Carousel';
import { Link, useParams } from 'react-router-dom';

import firebase from 'firebase';

const Deck = ({ 
  shuffledCards,
  onClick,
  isEditingCard,
  curSelectedDeck,
}) => {
  const [cards, setCards] = useState([]);
  const [hashCards, setHashCards] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [canView, setCanView] = useState(true);

  const { hash } = useParams();

  useEffect(() => {
    if (hash === undefined) return;
    if (shuffledCards.length > 0) return;

    const db = firebase.firestore();

    db.collection('decks').doc(hash).get()
    .then(snapshot => {
      if (snapshot.data().private) {
        setCanView(false);
      }
    })
    .catch(error => console.log("ERRORHERE: ", error.message))

    let ref = db.collection('cards');
    ref.where("deckId", "==", hash).get()
      .then(snapshot => {
        let arr = [];
        snapshot.forEach(card => arr.push(card.data()));
        setHashCards(arr);
      })
      .catch(error => console.log("???", error.message))

  }, [hash]);
  
  useEffect(() => {
    console.log("Changed");
  }, [hash])

  useEffect(() => {
    let frontTitle = "Front";
    let backTitle = "Back";

    let _cards = [];

    if (hashCards != null) {
      _cards = hashCards;
    } else {
      _cards = shuffledCards;
    }


    if (_cards.length > 0) {
      setCards(_cards.map((ele) => {
        return (
          <FlippableCard 
            key={ele.id}
            frontTitle={frontTitle}
            backTitle={backTitle}
            frontText={ele.front}
            backText={ele.back}
            onClick={onClick}
            isFlipped={isCardFlipped}
            setIsFlipped={setIsCardFlipped}
            isEditing={isEditingCard}
            cardId={ele.id}
            deckId={ele.deckId}
          />
        )
      }));
    }

    }, [shuffledCards, isCardFlipped, onClick, isEditingCard, curSelectedDeck, hashCards]
  );

  /*if (!canView) {
    return (
      <main>
        <div className="container center">
          <p>This deck is private. If you are the owner of this deck, you must log in to view it.</p>
        </div>
      </main>
    )
  }*/

  if (!canView || cards.length === 0) return (
    <main>
      <div className="container center">
        <p>This deck is either private or has no cards.</p>
      </div>
    </main>
  );

  const slideCallback = (index) => {
    setIsCardFlipped(false);
  }

  return (
    <>
      <Carousel 
        items={cards}
        leftButtonText={<FontAwesomeIcon icon={faAngleLeft} />}
        rightButtonText={<FontAwesomeIcon icon={faAngleRight} />}
        animTime={.3}
        previousCallback={slideCallback}
        nextCallback={slideCallback}
        showButtons={isEditingCard ? false : true}
      />
    </>
  )
}

export default Deck;