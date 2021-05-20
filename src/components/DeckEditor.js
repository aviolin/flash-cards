import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import { dbMethods } from '../firebase/dbMethods';
import { firebaseAuth } from '../provider/AuthProvider';

import Button from './Button';
import Header from './Header';

const DeckEditor = (props) => {
  const { user } = useContext(firebaseAuth);
  const [title, setTitle] = useState(props.deckToEdit.title);
  const [isPrivate, setIsPrivate] = useState(props.deckToEdit.private);

  const handleCheckbox = (event) => {

  }

  const updateDeck = (event) => {
    event.preventDefault();
    dbMethods.updateDeck(user, props.deckToEdit.id, title, isPrivate)
    props.setDeckToEdit(null);
  }

  const deleteDeck = (event) => {
    event.preventDefault();
    dbMethods.deleteDeck(user, props.deckToEdit.id);
    props.setDeckToEdit(null);
  }

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
        <input 
          type="checkbox"
          id="private"
          checked={isPrivate ? true : false}
          onChange={(event) => setIsPrivate(!isPrivate)}
        />
        <label htmlFor="private">
          <span></span>
          Private
        </label>
        <button 
          className="btn-primary"
          onClick={updateDeck}
        >
          Update
        </button>
        <button 
          className="btn-secondary"
          onClick={deleteDeck}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </form>
    </div>
  )
}

export default DeckEditor;