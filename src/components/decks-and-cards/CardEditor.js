/**
 * Handles displaying each card editor.
 */

import React, { useState, useEffect, useContext } from 'react';
import { dbMethods } from '../../firebase/dbMethods';
import { firebaseAuth } from '../../provider/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CardEditor = ({
  card,
  onSubmit
}) => {
  const { user } = useContext(firebaseAuth);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    setFront(card.front);
    setBack(card.back);
  }, [card])

  const handleInput = (event) => {
    if (event.target.name === "front") {
      setFront(event.target.value);
    } else if (event.target.name === "back") {
      setBack(event.target.value);
    }
  }

  const updateCard = (event) => {
    event.preventDefault();
    console.log("Card to update: ", card.id);
    dbMethods.updateCard(user, card.id, front, back)
    onSubmit();
  }

  const deleteCard = (event) => {
    event.preventDefault();
    dbMethods.deleteCard(user, card.deckId, card.id);
  }

  return (
    <form className="card-editor" onSubmit={updateCard}>
      <div className="input-block">
        <textarea
          name="front"
          id={card.id + "-front"}
          value={front}
          onChange={handleInput}
        />
        <label htmlFor={card.id + "-front"}>Front</label>
      </div>
      <div className="input-block">
        <textarea
          name="back"
          id={card.id + "-back"}
          value={back}
          onChange={handleInput}
        />
        <label htmlFor={card.id + "-back"}>Back</label>
      </div>
      <button className="btn">Update</button>
      <button className="btn btn-warning"
        onClick={deleteCard}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete card
      </button>
    </form>
  );
}

export default CardEditor;