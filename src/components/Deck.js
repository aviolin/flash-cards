import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DeckButtons from './DeckButtons';
import DeckHeader from './DeckHeader';

import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { data } from '../data';

const Deck = () => {
  const [cardId, setCardId] = useState(0);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef(null);
  const editSize = useRef(0);

  useEffect(() => {
    if (isEditing) return;

    console.log(editRef.current.clientHeight);
    editSize.current = editRef.current.clientHeight;
  })

  const handleButtons = (event) => {
    switch (event.target.name) {
      case "previous":
        setIsShowingBack(false);
        setCardId(cardId <= 0 ? data.cards.length - 1 : cardId - 1);
        return;
      case "next":
        setIsShowingBack(false);
        setCardId(cardId >= data.cards.length - 1 ? 0 : cardId + 1);
        return;
      case "edit":
        setIsEditing(true);
        return;
      case "cancel":
        setIsEditing(false);
        return;
      case "save":
        return;
      default: 
        return;
    }
  }

  let frontContent = (
    <p className="content" ref={editRef}>
      { data.cards[cardId].front }
      &nbsp;
      <button
        className="light-icon"
        name="edit"
        onClick={ handleButtons }
      >
        <FontAwesomeIcon 
          icon={faEdit} 
          className="no-events"
        />  
      </button>
      
    </p>
  );

  if (isEditing) {
    frontContent = (
      <textarea className="content" 
        style={ { height: editSize.current + 50 } }
        value={ data.cards[cardId].front }
      /> 
    );
  }

  return (
    <>
      <section>
        <DeckHeader 
          cardId={cardId}
          data={data}
        />
        
        { frontContent }
        { isShowingBack ? 
            <>
              <button 
                className="light-icon"
                onClick={() => setIsShowingBack(false)}
              ><FontAwesomeIcon icon={faTimes} /> Hide back
              </button>
              <p className="content">
                { data.cards[cardId].back }
                &nbsp;<FontAwesomeIcon icon={faEdit} className="light-icon"/>  
              </p>
              
              
            </>
            :
            <button 
              className="light-icon"
              onClick={() => setIsShowingBack(true)}
            ><FontAwesomeIcon icon={faQuestion} /> Show back         
            </button> 
        }
      </section>
      <DeckButtons 
        isEditing={ isEditing }
        onClick={ handleButtons } />
    </>
  )
}

export default Deck;