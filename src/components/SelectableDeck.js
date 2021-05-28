import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const SelectableDeck = ({
  title,
  toggleDeck,
  id,
  selectedDecks,
  setSelectedDecks,
  handleButtons,
  length,
  //setDeckToEdit
}) => {
  const history = useHistory();

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
          <label htmlFor="checkbox">
            <span></span>
            <strong>{title}</strong> ({length} {length === 1 ? "card" : "cards"})
          </label>
      </div>
      <div className="button-row">
        <button 
          className="btn btn-icon"
          onClick={event => {
            event.stopPropagation();
            //setDeckToEdit();
            console.log("ID:", id)
            setSelectedDecks([id]);
            history.push("/app/edit");
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button 
          className="btn btn-icon"
          name="add-card"
          value={id}
          onClick={event => {
            event.stopPropagation();
            handleButtons(event);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add card
        </button>
        <button 
          className="btn btn-icon"
          name="share-deck"
          value={id}
          onClick={event => {
            event.stopPropagation();
            handleButtons(event);
          }}
        >
          <FontAwesomeIcon icon={faShare} /> Share
        </button>
      </div>
    </li>
  )
}

export default SelectableDeck;