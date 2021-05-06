import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const SelectableDeck = (props) => {
  return (
    <li 
      className={props.selectedDecks.includes(props.id) ? "selected" : ""}
      onClick={(event) => props.toggleDeck(event, props.id)}
    >
      <div>
          
          <input 
            type="checkbox"
            id={props.id}
            checked={props.selectedDecks.includes(props.id)}
          /><label htmlFor={props.id}>
          <span></span>{props.title} ({props.length})</label>
          
      </div>
      <div>
        {/* <button 
          class="btn-icon"
          onClick={event => event.stopPropagation()}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button> */}
        <button 
          class="btn-icon"
          name="add-card"
          value={props.id}
          onClick={event => {
            event.stopPropagation();
            props.handleButtons(event);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </li>
  )
}

export default SelectableDeck;