/**
 * Methods for accessing the firestore database:
 * 
 * createDeck
 * deleteDeck
 * updateDeck
 * createCard
 * updateCard
 * deleteCard
 */

import { db } from './firebaseIndex';
import firebase from 'firebase';

export const dbMethods = {

  createDeck: (user, title, isPublic) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const document = db.collection('decks').doc();

    const newDeck = {
      id: document.id,
      numCards: 0,
      title,
      owner: user.uid,
      private: !isPublic,
    }

    document.set(newDeck)
    .then(console.log("Created new deck."))
    .catch(err => {
      console.error("Error creating deck: ", err.message);
    });
  },

  deleteDeck: (user, deckId) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    db.collection('decks').doc(deckId).delete()
    .then(console.log("Deck successfully deleted."))
    .catch(err => {
      console.error("Error deleting deck: ", err.message);
    });
  },

  updateDeck: (user, deckId, title, isPrivate) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const updatedDeck = {
      title,
      private: isPrivate
    }

    return db.collection('decks').doc(deckId).update(updatedDeck)
    .then(() => {
      console.log("Updated deck with id: ", deckId);
      
    })
    .catch(err => {
      console.error("Error updating document: ", err.message);
      
    });
  },

  createCard: (user, deckId, front, back) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const document = db.collection('cards').doc();

    const newCard = {
      id: document.id,
      deckId,
      owner: user.uid,
      front,
      back,
    }

    document.set(newCard)
    .then(res => {
      console.log("New card created.")
      db.collection('decks').doc(deckId).update({
        numCards: firebase.firestore.FieldValue.increment(1)
      })
      .catch(err => {
        console.error("Error increasing card count.");
      })
    })
    .catch(err => {
      console.error("Error creating card: ", err.message);
    });
  },

  updateCard: (user, cardId, front, back) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const updatedCard = {
      front,
      back
    }
    console.log("CardId: ", cardId);

    db.collection('cards').doc(cardId).update(updatedCard)
    .then(res => {
      console.log("Updated card with id: ", cardId);
    })
    .catch(err => {
      console.error("Error updating card: ", err.message);
    })
  },

  deleteCard: (user, deckId, cardId) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    db.collection('cards').doc(cardId).delete()
    .then(res => {
      console.log("Card successfully deleted.")
      db.collection('decks').doc(deckId).update({
        numCards: firebase.firestore.FieldValue.increment(-1)
      })
      .catch(err => {
        console.error("Error decreasing card count.");
      })
    })
    
    .catch(err => {
      console.error("Error deleting card: ", err.message);
    });
  },
}