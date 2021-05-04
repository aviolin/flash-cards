import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus, faEdit, faQuestion, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
  
  return (
    <div className="card">
      <header>
        {props.title}
        <div>
          <button
            className="btn-icon"
            name="add-card"
            onClick={ props.onClick }
          >        
            <FontAwesomeIcon icon={faPlus} /> New  
          </button>      
          <button
            className="btn-icon"
            name="edit"
            onClick={ props.onClick }
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button 
            className="curl"
            name="toggle"
            onClick={ props.onClick }
          >    
            <FontAwesomeIcon icon={props.isShowingBack ? faArrowLeft : faQuestion} size="2x" className="icon" />
          </button>
          
        </div>
      </header>
      <p className="content">
        { props.isShowingBack ? props.backText : props.frontText }
      </p>
    </div>
  )
}

export default Card;