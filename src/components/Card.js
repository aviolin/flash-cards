import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus, faEdit, faQuestion, faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
  
  return (
      <div className="card">
        <header>
          {/* <h2>{props.title}</h2> */}
          
            <button
              className="btn-x"
              name="edit"
              onClick={ props.onClick }
            >
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </button>
            <button
              className="btn-x"
              name="exit"
              onClick={props.onClick}
            >
              <FontAwesomeIcon icon={faTimes} size="2x" className="icon" />
            </button>
          
        </header>
        <button 
          className="curl"
          name="toggle"
          onClick={ props.onClick }
        >    
          <FontAwesomeIcon icon={props.isShowingBack ? faArrowLeft : faQuestion} size="2x" className="icon" />
        </button>
        {/* <header>
          {props.title}
          <div>
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
            <button
              className="btn-x"
              name="exit"
              onClick={props.onClick}
            >
              <FontAwesomeIcon icon={faTimes} size="2x" className="icon" />
            </button>
          </div>
        </header> */}
        <p className="content">
          { props.isShowingBack ? props.backText : props.frontText }
        </p>
        <button 
          className="btn-change left"
          name="previous"
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className="icon" />
        </button>
        <button 
          className="btn-change right"
          name="next"
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2x" className="icon" />
        </button>
      </div>
  )
}

export default Card;