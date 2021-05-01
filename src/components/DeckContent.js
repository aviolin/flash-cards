import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeckContent = (props) => {
  const [frontText, setFrontText] = useState(props.frontText)
  const [backText, setBackText] = useState(props.backText)

  const form = useRef();

  useEffect(() => {
    setFrontText(props.frontText);
    setBackText(props.backText);
  }, [props.frontText, props.backText]) 

  const handleInput = (event) => {
    switch (event.target.name) {
      case "front":
        setFrontText(event.target.value);
        return;
      case "back":
        setBackText(event.target.value);
        return;
      default:
        return;
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
    props.update();
  }

   const deleteCard = async (event) => {
    const URI = 'http://localhost:5000/decks/' + props.deckId + '/delete/' + props.cardId;
    let response = await fetch(URI, {
      method: 'PATCH',
    })
    props.update(); 
  }

  if (props.isEditing || props.isAddingCard) {
    return(
      <>
        <form ref={form} onSubmit={saveCard} >
          
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
          
          
            <button
              className=""
              name="save"
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          
        </form>
        <form className="">
        { props.isAddingCard ? null : 
          <div>
            <button
              className="secondary"
              onClick={deleteCard}
              name="delete-card"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete Card
            </button>
          </div>
        }
        </form>
      </>
    )
  }

  return (
    <div className="card">
      <header>
        { props.isShowingBack ? "back" : "front" }
      </header>
      <p className="content">
        { props.isShowingBack ? props.backText : props.frontText }
      </p>
    </div>
  )
}

export default DeckContent;