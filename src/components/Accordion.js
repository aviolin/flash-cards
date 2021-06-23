/**
 * Generates and displays all the toggleable card editor boxes
 * in an accordion.
 */

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import CardEditor from './decks-and-cards/CardEditor';

const Accordion = ({
  cards
}) => {
  const [card, setCard] = useState("");
  const [cardEditorElements, setCardEditorElements] = useState([]);

  const handleClick = (event) => {
    setCard(prev => prev === event.target.value ? "" : event.target.value);
  }

  useEffect(() => {
    const elements = cards.map(ele => {
      let classes = ele.id === card ? "btn btn-tertiary highlighted" : "btn btn-tertiary";
      return (
        <React.Fragment key={ele.id} >
          <button 
            className={classes}
            value={ele.id}
            onClick={handleClick}
          >
            <span className="truncate">"{ele.front}"</span> 
            {card === ele.id ?
              <FontAwesomeIcon icon={faAngleUp} />
            :
              <FontAwesomeIcon icon={faAngleDown} />
            }
          </button>
          {card === ele.id && 
            <CardEditor
              card={ele}
              onSubmit={() => setCard("")}
            />
          }
        </React.Fragment>
      )
    })

    setCardEditorElements(elements);
  }, [card, cards]);

  return (
    <>
      {cardEditorElements}
    </>
  );
}

export default Accordion;