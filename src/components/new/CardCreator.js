import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { firebaseAuth } from '../../provider/AuthProvider';
import { dbMethods } from '../../firebase/dbMethods';

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
    <button className="btn btn-tertiary highlighted"
      onClick={() => setIsOpen(true)}
    >
      Add card <FontAwesomeIcon icon={faPlus} />
    </button>
  )

  return (
    <>
      <button id="add" className="btn btn-tertiary highlighted"
        onClick={() => setIsOpen(false)}
      >
        Add card <FontAwesomeIcon icon={faMinus} />
      </button>
      <form className="card-editor" onSubmit={createCard}>
        <label>Front</label>
        <textarea
          name="front"
          value={front}
          onChange={handleInput}

        />
        <label>Back</label>
        <textarea
          name="back"
          value={back}
          onChange={handleInput}
        />
        <button className="btn">Create</button>
      </form>
    </>
  )
}

export default CardCreator;