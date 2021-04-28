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
    
    console.log("Patching...");
    const json = JSON.stringify(Object.fromEntries(new FormData(form.current)));

    let response = await fetch('http://localhost:5000/decks/' + props.deckId, {
      method: 'PATCH',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log("Patched!");
    props.update();
  }

  if (props.isEditing) {
    return(
      <form ref={form} onSubmit={saveCard} >
        <input type="hidden" name="cardId" value={props.cardId}/>
        <div>
          <label htmlFor="front">Front:</label>
          <textarea 
            className="content"
            id="front"
            name="front"
            value={frontText}
            onChange={handleInput}
          />
        </div><div>
          <label htmlFor="back">Back:</label>
          <textarea 
            id="back"
            name="back"
            className="content"
            value={backText}
            onChange={handleInput}
          />
        </div>
        <div className="editor-buttons">
          <button
            className="primary"
            onClick={saveCard}
            name="save"
          >
            <FontAwesomeIcon icon={faSave} className="no-events" /> Save Changes
          </button>
          <button
            className="tertiary"
            //onClick={props.onClick}
            name="delete-card"
          >
            <FontAwesomeIcon icon={faTrash} className="no-events" /> Delete Card
          </button>
        </div>
      </form>
    )
  }

  return (
    <>
      <p className="content">
        { props.frontText }
      </p>
      { props.isShowingBack ? 
        <>
          <button 
            className="light-icon"
            name="toggle-back"
            onClick={props.onClick}
          ><FontAwesomeIcon icon={faTimes} /> Hide back
          </button>
          <p className="content">
            { props.backText }
          </p>
          
          
        </>
        :
        <button 
          className="light-icon"
          name="toggle-back"
          onClick={props.onClick}
        ><FontAwesomeIcon icon={faQuestion} /> Show back         
        </button> 
      }
    </>
  )
}

export default DeckContent;