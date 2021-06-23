/**
 * Handles the creation of new decks.
 */

import React, { useState, useContext } from 'react';
import { dbMethods } from '../../firebase/dbMethods';
import { firebaseAuth } from '../../provider/AuthProvider';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/free-solid-svg-icons';

import TextInput from '../TextInput';

const DeckCreator = () => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { user } = useContext(firebaseAuth);
  const history = useHistory();

  const createDeck = (event) => {
    event.preventDefault();
    dbMethods.createDeck(user, title, isPublic);
    history.push("/app");
  }

  return (
    <form 
      id="new-deck" 
      onSubmit={createDeck}
    >
      <TextInput 
        labelText="Title"
        icon={<FontAwesomeIcon icon={faHeading} />}
        id="title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New Deck"
        autocomplete="off"
      />
      <input
        id="public"
        name="public"
        type="checkbox"
        checked={isPublic ? true : false}
        onChange={() => setIsPublic(!isPublic)}
      />
      <label htmlFor="public">
        <span></span>
        Is this deck public and shareable?
      </label>
      <button
        className="btn btn-primary"
      >
        Create!
      </button>
    </form>
  );
}

export default DeckCreator;