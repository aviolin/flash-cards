/**
 * Handles logic for getting the selected deck and cards.
 * Generates FlippableCards for each card to be shown, and 
 * renders them in a Carousel.
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

import { useParams } from 'react-router-dom';

import Carousel from '../Carousel';
import FlippableCard from './FlippableCard';
import Spinner from '../Spinner';

const Deck = ({ 
  shuffledCards,
  onClick,
}) => {
  const [cards, setCards] = useState([]);
  const [hashCards, setHashCards] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [canView, setCanView] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { hash } = useParams();

  /* Gets the deck and its based on the hash in the URL,
     and checks whether it is private or not. */
  useEffect(() => {
    setIsLoaded(false);
    setHashCards(null);
    setCards(null);

    if (hash === undefined) return;
    if (shuffledCards.length > 0) return;

    const db = firebase.firestore();

    db.collection('decks').doc(hash).get()
    .then(snapshot => {
      if (snapshot.data().private) {
        setCanView(false);
        setIsLoaded(true);
      }
    })
    .catch(error => {
      setIsLoaded(true);
      console.log("Error: ", error.message)
    })

    let ref = db.collection('cards');
    ref.where("deckId", "==", hash).get()
      .then(snapshot => {
        let arr = [];
        snapshot.forEach(card => arr.push(card.data()));
        setHashCards(arr);
      })
      .catch(error => console.log("Error: ", error.message))
  }, [hash]);

  /* Generates an array of FlippableCards for each card in the deck. */
  useEffect(() => {
    setIsLoaded(false);
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
            frontTitle="Front"
            backTitle="Back"
            frontText={ele.front}
            backText={ele.back}
            onClick={onClick}
            isFlipped={isCardFlipped}
            setIsFlipped={setIsCardFlipped}
          />
        )
      }));
      setIsLoaded(true);
    }

    }, [shuffledCards, isCardFlipped, onClick, hashCards]
  );

  if (!isLoaded) return (
    <main>
      <div className="container center">
        <Spinner />
      </div>
    </main>
  );

  if (!cards) return (
    <div className="container center">
      <p>We couldn't find this deck. :(</p>
    </div>
  )

  if (!canView || cards.length === 0) return (
      <div className="container center">
        <p>This deck is either private or has no cards! If you are the owner, you can view it and edit it from your dashboard.</p>
      </div>
  );

  const slideCallback = () => {
    setIsCardFlipped(false);
  }

  return (
    <Carousel 
      items={cards}
      leftButtonText={<FontAwesomeIcon icon={faAngleLeft} />}
      rightButtonText={<FontAwesomeIcon icon={faAngleRight} />}
      animTime={.3}
      previousCallback={slideCallback}
      nextCallback={slideCallback}
      showButtons={true}
    />
  );
}

export default Deck;