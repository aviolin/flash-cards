import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { dbMethods } from '../firebase/dbMethods';
import { firebaseAuth } from '../provider/AuthProvider';

import Button from './Button';

const DeckCreator = () => {
  const [title, setTitle] = useState("");
  const { user } = useContext(firebaseAuth);

  const createDeck = (event) => {
    event.preventDefault();
    dbMethods.createDeck(user, title);
  }

  return (
    <form 
      id="new-deck" 
      onSubmit={createDeck}
    >
      <label htmlFor="title">Create a new deck:</label>
      <div>
        <input 
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New Deck TItle"
          autoComplete="off"
        />
        <Button 
          view={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>
    </form>
  )
}

export default DeckCreator;