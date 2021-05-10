import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Button = ({ type, onClick, view, classes }) => {

  classes === undefined ? classes="btn " : classes += " btn ";
  let _view = null;

  switch (type) {
    case "cancel":
      classes+="btn-x";
      _view = <FontAwesomeIcon icon={faArrowLeft} size="2x"/>;
      break;
    case "exit":
      classes+="btn-x";
      _view = <FontAwesomeIcon icon={ faTimes } size="2x" />;
      break;
    case "edit":
      classes+="btn-x";
      _view = <FontAwesomeIcon icon={ faEdit } size="2x" />;
      break;
    default:
      break;
  }

  return (
    <button
      id={type}
      name={type}
      onClick={onClick}
      className={classes}
    >
      {view ? view : _view}
    </button>
  )
}

export default Button;