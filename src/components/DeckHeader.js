import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const DeckHeader = (props) => {
  return (
    <header>
      <span>{ props.data.title }&nbsp;
        <FontAwesomeIcon icon={faEdit} className="light-icon"/>  
      </span>
      <span>
        { props.data.cards[props.cardId].id + 1 }/{ props.data.cards.length }
      </span>
    </header>
  )
}

export default DeckHeader;