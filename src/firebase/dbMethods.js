import { db } from './firebaseIndex';
import firebase from 'firebase';
import DeckCreator from '../components/DeckCreator';

export const dbMethods = {

  // SEND TO DATABASE
  createDeck: (user, title) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const document = db.collection('decks').doc();

    const newDeck = {
      id: document.id,
      title,
      owner: user.uid,
      public: false,
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

  updateDeck: (user, deckId, title) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    const updatedDeck = {
      title
    }

    db.collection('decks').doc(deckId).update(updatedDeck)
    .then(console.log("Updated deck with id: ", deckId))
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
    .then(console.log("New card created."))
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

  deleteCard: (user, cardId) => {
    if (!user) {
      console.log("No user selected.");
      return;
    }

    db.collection('cards').doc(cardId).delete()
    .then(console.log("Card successfully deleted."))
    .catch(err => {
      console.error("Error deleting card: ", err.message);
    });
  },
}