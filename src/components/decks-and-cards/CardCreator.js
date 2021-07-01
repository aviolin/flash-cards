/**
 * Renders the toggleable card creator box.
 */

import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../../provider/AuthProvider';
import { dbMethods } from '../../firebase/dbMethods';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CardCreator = ({
  deckId
}) => {
  const { user } = useContext(firebaseAuth);
  const [isOpen, setIsOpen] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleInput = (event) => {
    if (event.target.name === "front") {
      setFront(event.target.value);
    } else if (event.target.name === "back") {
      setBack(event.target.value);
    }
  }

  const createCard = (event) => {
    event.preventDefault();
    console.log("Creating new card.");
    dbMethods.createCard(user, deckId, front, back);
    setFront("");
    setBack("");
    setIsOpen(false);
  }

  if (!isOpen) return (
    <button className="btn btn-tertiary"
      onClick={() => setIsOpen(true)}
    >
      Add card <FontAwesomeIcon icon={faPlus} className="icon" />
    </button>
  );

  return (
    <>
      <button id="add" className="btn btn-tertiary highlighted"
        onClick={() => setIsOpen(false)}
      >
        Add card <FontAwesomeIcon icon={faMinus} className="icon"/>
      </button>
      <form className="card-editor" onSubmit={createCard}>
        <div className="input-block">
          <textarea
            name="front"
            id="new-front"
            value={front}
            onChange={handleInput}
          />
          <label htmlFor="new-front">Front</label>
        </div>
        <div className="input-block">
          <textarea
            name="back"
            id="new-back"
            value={back}
            onChange={handleInput}
          />        
          <label htmlFor="new-back">Back</label>
        </div>
        <button className="btn">Create</button>
      </form>
    </>
  );
}

export default CardCreator;