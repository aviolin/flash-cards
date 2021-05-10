import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const Footer = (props) => {
  return (
    <footer>
      <button 
        className="curl"
        name="toggle"
        onClick={ props.onClick }
      >    
        <FontAwesomeIcon icon={faReply} size="2x" className="icon" />
      </button>
    </footer>
  )
}

export default Footer;