import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faShare, faClone } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const SelectableDeck = ({
  title,
  toggleDeck,
  id,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
  length,
  setDeckToEdit
}) => {
  const history = useHistory();
  const [shareIsOpen, setShareIsOpen] = useState(false);

  return (
    <li 
      className={selectedDecks.includes(id) ? "selected" : ""}
      onClick={(event) => toggleDeck(event, id)}
    >
      <div>
        <input
            name={id}
            type="checkbox"
            checked={selectedDecks.includes(id)}
            onChange={(event) => {
              console.log(event.target);
              toggleDeck(event, id)
            }}
          />
          <label htmlFor="checkbox" className="truncate">
            <span></span>
            <strong >{title}</strong> ({length} {length === 1 ? "card" : "cards"})
          </label>
      </div>
      <div className="button-row">
        <button 
          className="btn btn-icon"
          onClick={event => {
            event.stopPropagation();
            setDeckToEdit();
            setSelectedDecks([id]);
            history.push("/app/edit");
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit & add cards
        </button>
        <button 
          className="btn btn-icon"
          name="share-deck"
          value={id}
          onClick={event => {
            event.stopPropagation();
            setShareIsOpen(prev => !prev);
          }}
        >
          <FontAwesomeIcon icon={faShare} /> Share
        </button>
      </div>

      {shareIsOpen ?
        <button 
          className="btn btn-share"
          onClick={() => {
            const copyText = "localhost:3000/app/d/" + id;
            navigator.clipboard.writeText(copyText);
          }}
        >
          &nbsp;<span className="wrap">localhost:3000/app/d/{id}</span><br/>
          <div><FontAwesomeIcon icon={faClone} /> Copy to clipboard</div>
        </button>
        :
        null
      }
    </li>
  )
}

export default SelectableDeck;