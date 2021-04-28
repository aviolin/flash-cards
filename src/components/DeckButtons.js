import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const DeckButtons = (props) => {
  if (props.isEditing) {
    return null;

    return (
      <footer>
        <button 
          className="warning"
          name="cancel"
          onClick={ props.onClick }
        >
          <FontAwesomeIcon icon={faTimes} />&nbsp;
          Cancel
        </button>
        <button 
          className="secondary"
          name="save"
          onClick={ props.onClick }
        >Save &nbsp;
          <FontAwesomeIcon icon={faSave} />
        </button>
      </footer>
    )
  }

  return (
    <footer>
      <button 
        className="primary"
        name="previous"
        onClick={ props.onClick }
      >
        <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
        Previous
      </button>
      <button 
        className="primary"
        name="next"
        onClick={ props.onClick }
      >Next &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </footer>
  )
}

export default DeckButtons;