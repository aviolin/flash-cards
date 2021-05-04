import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const Editor = (props) => {

  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const form = useRef(null);

  useEffect(() => {
    if (props.isAddingCard) return;

    setFrontText(props.frontText);
    setBackText(props.backText);
  }, [props.frontText, props.backText])

  const handleInput = (event) => {
    if (event.target.name === "front") {
      setFrontText(event.target.value);
    } else if (event.target.name === "back") {
      setBackText(event.target.value);
    }
  }

  const saveCard = async (event) => {
    event.preventDefault();
    let URI = 'http://localhost:5000/decks/' + props.deckId + "/card/" + props.cardId;

    if (props.isAddingCard) {
      URI = 'http://localhost:5000/decks/' + props.deckId + "/add";
    }
    
    const json = JSON.stringify(Object.fromEntries(new FormData(form.current)));
    let response = await fetch(URI, {
      method: 'PATCH',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let res = await response.json();
    props.update(res.data)
  }

  const deleteCard = async (event) => {
    const URI = 'http://localhost:5000/decks/' + props.deckId + '/delete/' + props.cardId;
    let response = await fetch(URI, {
      method: 'PATCH',
    })
    let res = await response.json();
    props.update(res.data)
  }

  return (
    <div className="editor">
      <header>
        {props.isAddingCard ? "Create Card" : "Card Editor"}
        <div>    
          <button
            className="btn-icon"
            name="cancel"
            onClick={ props.onClick }
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {props.children}
        </div>
      </header>
      <form ref={form} onSubmit={saveCard}>
        <label htmlFor="front">Front text:</label>
        <textarea 
          id="front"
          name="front"
          value={frontText}
          onChange={handleInput}
        />
        <label htmlFor="back">Back text:</label>
        <textarea 
          id="back"
          name="back"
          value={backText}
          onChange={handleInput}
        />
        <button>Save Changes</button>
      </form>
      <button
        className="btn-secondary"
        name="delete"
        onClick={deleteCard}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Card
      </button>
    </div>
  )
}

export default Editor;