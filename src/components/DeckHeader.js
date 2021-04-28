import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DeckHeader = (props) => {
  return (
    <header>
      <span className="title" >
        { props.title + " - " + props.cardIndex }
      </span>
      <div>
        { props.isEditing ? 
          <button
            className="light-icon small"
            name="cancel"
            onClick={ props.onClick }
          >        
            <FontAwesomeIcon icon={faTimes} className="no-events" /> Cancel  
          </button>      
          : 
          <button
            className="light-icon small"
            name="edit"
            onClick={ props.onClick }
          >
            <FontAwesomeIcon icon={faEdit} className="no-events" /> Edit
          </button>
        }
        
      </div>
    </header>
  )
}

export default DeckHeader;