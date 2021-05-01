import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const DeckButtons = (props) => {
  if (props.isEditing || props.isAddingCard) {
    return null;
  }

  return (
    <div className="slider-buttons">
      <button 
        className="light"
        name="previous"
        onClick={ props.onClick }
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button 
        className=""
        name="toggle-back"
        onClick={ props.onClick }
      >Flip 
      </button>
      <button 
        className="light"
        name="next"
        onClick={ props.onClick }
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default DeckButtons;