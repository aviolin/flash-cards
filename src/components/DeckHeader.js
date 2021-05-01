import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const DeckHeader = (props) => {
  return (
    <header>
      <h2>
        <span className="title" >
          { props.title }
        </span>
      </h2>
      <div className="buttons">
      { props.isEditing || props.isAddingCard ? 
        props.showCancel ? 
        <button
          className="btn-icon"
          name="cancel"
          onClick={ props.onClick }
        >        
          <FontAwesomeIcon icon={faTimes} /> Cancel  
        </button> : null 
        : 
        <>
          <button
            className="btn-icon"
            name="add-card"
            onClick={ props.onClick }
          >        
            <FontAwesomeIcon icon={faPlus} /> New Card  
          </button>      
          <button
            className="btn-icon"
            name="edit"
            onClick={ props.onClick }
          >
            <FontAwesomeIcon icon={faEdit} /> Edit Card
          </button>
          <Link to={"/deck/" + props.deckId + "/update"}
            className="btn-icon"
          >
            <FontAwesomeIcon icon={faEdit} /> Edit Deck
          </Link>
          
        </>
      }
      </div>
    </header>
  )
}

export default DeckHeader;