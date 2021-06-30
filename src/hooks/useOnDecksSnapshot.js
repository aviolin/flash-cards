/**
 * Hook grabbing the current user's owned decks from firestore.
 */

import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useOnDecksSnapshot = (user) => {
  const db = firebase.firestore();
  const [decks, setDecks] = useState([]);

  // Get decks from collection where owner is the current user.
  useEffect(() => {
    if (!user) {
      setDecks([]);
      return;
    }

    let ref = db.collection('decks');
    let unsubscribe = ref.where("owner", "==", user.uid).onSnapshot((snapshot) => {
      let arr = [];
      snapshot.forEach(deck => arr.push(deck.data()));
      setDecks(arr);
      /* console.log("Deck data updated: ", arr); */
    }, error => console.log("Error: ", error.message))

    return () => unsubscribe();
  }, [user]);

  return { decks };
}

export default useOnDecksSnapshot;