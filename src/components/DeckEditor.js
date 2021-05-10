import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const DeckEditor = (props) => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <Button 
        type="cancel"
        onClick={event => {
          event.stopPropagation();
          props.setIsEditing(null);
        }}
        view={<FontAwesomeIcon icon={faArrowLeft} size="2x" />}
      />
      <form className="mini">
        <label htmlFor="title">Editing deck:</label>
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