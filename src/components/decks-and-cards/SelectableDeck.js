/**
 * Displays each deck list item which contains a checkbox,
 * edit and share buttons.
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faShare, faClone } from '@fortawesome/free-solid-svg-icons';

import Lightbox from '../Lightbox';

const SelectableDeck = ({
  title,
  toggleDeck,
  id,
  isPrivate,
  selectedDecks,
  setSelectedDecks,
  length,
  setDeckToEdit
}) => {
  const history = useHistory();
  const [shareIsOpen, setShareIsOpen] = useState(false);

  return (
    <li 
      className={selectedDecks.includes(id) ? "selected" : ""}
      onClick={(event) => {
        event.stopPropagation();
        toggleDeck(id);
      }}
      role="checkbox"
      aria-checked={selectedDecks.includes(id) ? "true" : "false"}
    >
      <div>
        <input
          name={id}
          type="checkbox"
          checked={selectedDecks.includes(id)}
          onChange={() => null}
        />
        <label htmlFor="checkbox" className="truncate">
          <span></span>
          <strong>{title}</strong> ({length} {length === 1 ? "card" : "cards"})
          
        </label>
      </div>
      <div className="button-row">
        <button 
          className="btn btn-icon"
          onClick={(event) => {
            event.stopPropagation();
            setDeckToEdit();
            setSelectedDecks([id]);
            history.push("/app/edit");
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
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

      <Lightbox 
        title="Share deck"
        isOpen={shareIsOpen}
        onClose={() => setShareIsOpen(false)}
      >
        {isPrivate ? 
          <p className="warning">This deck is <b>private</b>. Update the deck to be <b>public</b> in order to share it with others.</p>
          :
          <>
            <p>This deck is <b>public</b> and can be shared via this link: <b><br/><br/><span className="wrap">https://arlocodes.com/flash-cards/#/app/d/{id}</span></b></p><br/>
            <button 
              className="btn btn-share"
              onClick={() => {
                const copyText = "https://arlocodes.com/flash-cards/#/app/d/" + id;
                navigator.clipboard.writeText(copyText);
              }}
            >
              <div><FontAwesomeIcon icon={faClone} /> Copy to clipboard</div>
            </button>
          </>
        }
      </Lightbox>
    </li>
  );
}

export default SelectableDeck;