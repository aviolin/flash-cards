import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useOnUserSnapshot = (user) => {
  const db = firebase.firestore();
  const [userData, setUserData] = useState(null);
  const [decks, setDecks] = useState([]);

  // get data from current user document in users collection
  useEffect(() => {
    if (!user) return;

    let ref = db.collection('users').doc(user.uid);
    let unsubscribe = ref.onSnapshot((snapshot) => {
      let uData = snapshot.data();
      setUserData(uData);
      console.log("User data updated: ", uData);
    });

    return () => unsubscribe();
  }, [user]);

  // get data from decks sub collection of current user document
  useEffect(() => {
    if (!user) return;

    let ref = db.collection('decks');
    let unsubscribe = ref.where("owner", "==", user.uid).onSnapshot((snapshot) => {
      let arr = [];
      snapshot.forEach(deck => arr.push(deck.data()));
      setDecks(arr);
      console.log("Deck data updated: ", arr);
    })

    return () => unsubscribe();
  }, [user]);

  return { userData, decks };
}

export default useOnUserSnapshot;