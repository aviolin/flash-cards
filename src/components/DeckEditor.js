import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import Header from './Header';

const DeckEditor = (props) => {
  const [title, setTitle] = useState(props.deckToEdit.title);

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <Header title="Editing Deck">
        <Button 
          type="cancel"
          onClick={event => {
            event.stopPropagation();
            props.setDeckToEdit(null);
          }}
          view={<FontAwesomeIcon icon={faArrowLeft} size="2x" />}
        />
      </Header>
      <form className="mini">
        <label htmlFor="title">Title:</label>
        <input
          className="edit-title"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoComplete="off"
        />
        <button 
          className="btn-primary"
          onClick={props.updateDeck}
        >
          Update
        </button>
        <button 
          className="btn-secondary"
          onClick={props.deleteDeck}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </form>
    </div>
  )
}

export default DeckEditor;