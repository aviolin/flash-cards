import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const DeckCreator = (props) => {
  const [title, setTitle] = useState("");

  return (
    <form 
      id="new-deck" 
      onSubmit={props.createDeck}
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