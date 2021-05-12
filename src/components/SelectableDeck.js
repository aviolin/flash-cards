import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const SelectableDeck = ({
  title,
  toggleDeck,
  id,
  selectedDecks,
  handleButtons,
  length,
  update,
  setDeckToEdit
}) => {
  return (
    <li 
      className={selectedDecks.includes(id) ? "selected" : ""}
      onClick={(event) => toggleDeck(event, id)}
    >
      <div>
        <input 
          type="checkbox"
          id={id}
          checked={selectedDecks.includes(id)}
          onChange={(event) => toggleDeck(event, id)}
        />
        <label htmlFor={id}>
          <span></span>
          {title} ({length})
        </label>
      </div>
      <div className="buttons">
        <button 
          className="btn-icon"
          onClick={event => {
            event.stopPropagation();
            setDeckToEdit();
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button 
          className="btn-icon"
          name="add-card"
          value={id}
          onClick={event => {
            event.stopPropagation();
            handleButtons(event);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </li>
  )
}

export default SelectableDeck;