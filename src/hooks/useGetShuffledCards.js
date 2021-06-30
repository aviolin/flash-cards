/**
 * Hook which subscribes to the collection of cards in the 
 * firestore database.
 */

import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useGetShuffledCards = (user, deckIds) => {
  const db = firebase.firestore();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!user) {
      setCards([]);
      return;
    }

    if (deckIds.length === 0) {
      setCards([]);
      return;
    }

    let ref = db.collection('cards');
    let unsubscribe = ref.where("deckId", "in", deckIds).onSnapshot((snapshot) => {
      let arr = [];
      snapshot.forEach(card => arr.push(card.data()));
      setCards(arr);
      /* console.log("Cards updated: ", arr) */
    }, (error) => {
      console.log("Error: ", error.message)
    })
    return () => unsubscribe();
  }, [user, deckIds])

  return { cards };
}

export default useGetShuffledCards;