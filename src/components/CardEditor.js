import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

import { dbMethods } from '../firebase/dbMethods';
import { firebaseAuth } from '../provider/AuthProvider';

const CardEditor = ({
  frontText,
  backText,
  cardId,
  deckId,
  isAddingCard,
  isBack,
  onClick
}) => {
  const { user } = useContext(firebaseAuth);

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (isAddingCard) return;
    setFront(frontText);
    setBack(backText);
  }, [frontText, backText, isAddingCard])

  const handleInput = (event) => {
    if (event.target.name === "front") {
      setFront(event.target.value);
    } else if (event.target.name === "back") {
      setBack(event.target.value);
    }
  }

  const updateCard = (event) => {
    event.preventDefault();
    if (!isAddingCard) {
      console.log("Card to update: ", cardId);
      dbMethods.updateCard(user, cardId, front, back)
    } else {
      console.log("Creating new card.");
      console.log(deckId);
      dbMethods.createCard(user, deckId, front, back)
    }

    onClick(event);
  }

  const deleteCard = (event) => {
    event.preventDefault();
    dbMethods.deleteCard(user, deckId, cardId);

    onClick(event);
  }

  return (
    <form>
      {isBack ?
        <>
          <textarea 
            name="back"
            value={back}
            onChange={handleInput}
          />
        </>
      :
        <>
          <textarea
            name="front"
            value={front}
            onChange={handleInput}
          />
        </>
      }
      <div className="buttons">
        <button 
          className="btn-secondary"
          name="update-card"
          onClick={updateCard}
        >    
          <FontAwesomeIcon icon={faCheck} size="1x" className="icon" /> Save
        </button>
        {isAddingCard ? null : 
          <button
            className="btn-warning"
            name="delete-card"
            onClick={deleteCard}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Card
          </button>
        }
      </div>
    </form>
  )
}

export default CardEditor;