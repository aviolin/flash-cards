import { db } from './firebaseIndex';
import firebase from 'firebase';
import DeckCreator from '../components/DeckCreator';

export const dbMethods = {

  // SEND TO DATABASE
  createDeck: (user, title) => {
    const newDeck = {
      title,
      owner: user.uid,
      cards: []
    }

    db.collection('decks').add(newDeck)
    .then(res => {
      console.log("Created new deck: ", res)

      db.collection('users').doc(user.uid).update({
        decks: firebase.firestore.FieldValue.arrayUnion(res.id)
      })
      .then(res => {
        console.log("Deck successfully added to user.");
      })
      .catch(err => {
        console.error("Something went wrong adding deck to user: ", err.message);
      });

    })
    .catch(err => {
      console.error("Error creating deck: ", err.message);
    });
  },

  deleteDeck: (user, id) => {
   db.collection('decks').doc(id).delete()
    .then((res) => {
      console.log("Deck successfully deleted.");

      // For security and performance, must manually 
      // purge 'cards' subcollections from deleted decks.
      
      db.collection('users').doc(user.uid).update({
        decks: firebase.firestore.FieldValue.arrayRemove(id)
      })
      .then(res => {
        console.log("User updated.");
      })
      .catch(err => {
        console.error("Something went wrong updating the user: ", err.message);
      })

    })
    .catch(err => {
      console.error("Error deleting deck: ", err.message);
    });
  },

  updateDeck: (deckId, title) => {
    const updatedDeck = {
      title
    }

    db.collection('decks').doc(deckId).update(updatedDeck)
    .then(res => {
      console.log("Updated deck with id: ", deckId)
    })
    .catch(err => {
      console.error("Error updating document: ", err.message);
    });

  },

  createCard: (deckId, front, back) => {
    const newCard = {
      front,
      back
    }

    db.collection('decks').doc(deckId).collection('cards').add(newCard)
    .then(res => {
      console.log("New card created with id: ", res.id);
    })
    .catch(err => {
      console.error("Error creating card: ", err.message);
    });
  },

  updateCard: (deckId, cardId, front, back) => {
    const updatedCard = {
      front,
      back
    }

    db.collection('decks').doc(deckId).collection('cards').doc(cardId).update(updatedCard)
    .then(res => {
      console.log("Updated card with id: ", cardId);
    })
    .catch(err => {
      console.log("Error updating card: ", err.message);
    })
  },

  deleteCard: (deckId, cardId) => {
    db.collection('decks').doc(deckId).collection('cards').doc(cardId).delete()
    .then(res => {
      console.log("Card successfully deleted.")
    })
    .catch(err => {
      console.error("Error deleting card: ", err.message);
    });
  },

  // GET FROM DATABASE
  getUserData: async (userId) => {
    return db.collection('users').doc(userId).get();
    /* .then(user => {
      if (user.exists) {
        //console.log("User data: ", user.data());
        //return user.data();
      } else {
        console.log("User does not exist.");
      }
    })
    .catch(err => {
      console.error("Error getting user: ", err.message);
    }); */
  },

  getDeck: (deckId) => {
    db.collection('decks').doc(deckId).get()
    .then(deck => {
      if (deck.exists) {
        console.log("Deck data: ", deck.data());
        return deck.data();
      } else {
        console.log("Deck does not exist.");
      }
    })
    .catch(err => {
      console.error("Error getting deck: ", err.message);
    })
  }
}