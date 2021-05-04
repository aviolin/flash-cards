import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ButtonLink = (props) => {
  return (
    <li>
      <button 
        className="btn-link"
        onClick={props.toggleDeck(props.id)}
      >
      {/* <Link to={props.to} className="btn-link"> */}
        <div>
          <input type="checkbox"></input>&nbsp;
          {props.title}
        </div>
        {/* <button class="btn-icon">
          <FontAwesomeIcon icon={faEdit} />
        </button> */}
      </button>
    </li>
  )
}

export default ButtonLink;