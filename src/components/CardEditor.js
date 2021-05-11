import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import APIClass from '../API';
const API = new APIClass();

const CardEditor = ({
  onClick,
  frontText,
  backText,
  deckId,
  cardId,
  isAddingCard,
  update,
  updateShuffled,
  isBack
}) => {

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

  const saveCardWrapper = async (event) => {
    const submitData = { front, back, id: cardId }
    console.log(submitData);
    const res = await API.saveCard(event, deckId, cardId, submitData);

    if (res.data !== undefined && !isAddingCard) {
      updateShuffled({ id: cardId, front, back, deckId: deckId})
    }
    update(res.data);
  }

  const deleteCardWrapper = async (event) => {
    const res = await API.deleteCard(event, deckId, cardId);

    if (res.data !== undefined) {
      updateShuffled({ id: cardId, front, back, deckId: deckId}, true)
    }
    update(res.data);
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
          className="btn-save"
          name="save"
          onClick={saveCardWrapper}
        >    
          <FontAwesomeIcon icon={faCheck} size="1x" className="icon" /> Save
        </button>
        <button
          className="btn-secondary"
          name="delete"
          onClick={deleteCardWrapper}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Card
        </button>
      </div>
    </form>
  )
}

export default CardEditor;