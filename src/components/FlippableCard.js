import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Button from './Button';
import CardEditor from './CardEditor';
import CardContent from './CardContent';

const FlippableCard = ({
  onClick,
  frontTitle,
  backTitle,
  frontText,
  backText,
  isEditing,
  isFlipped,
  setIsFlipped,
  deckId,
  cardId,
  isAddingCard,
  update,
  updateShuffled
}) => {
  const header = isEditing ? (
    <Header title={frontTitle}>
      <Button 
        type="cancel" 
        onClick={onClick}
      />
    </Header>
  ) : (
    <Header title={frontTitle}>
      <Button 
        type="edit" 
        onClick={onClick}
      />
      <Button 
        type="exit" 
        onClick={onClick}
      />
    </Header>
  )

  const backHeader = React.cloneElement(header, { title: backTitle });

  const editor = (
    <CardEditor 
      frontText={frontText}
      backText={backText}
      deckId={deckId}
      cardId={cardId}
      isAddingCard={isAddingCard}
      update={update}
      updateShuffled={updateShuffled}
      isShowingBack={isFlipped}
    />
  )

  const backEditor = React.cloneElement(editor, { isBack: true });

  const footer = (
    <>
      {!isEditing && !isAddingCard ? 
        <footer>
          <button 
            className="curl"
            name="toggle"
            onClick={ () => setIsFlipped(prev => !prev) }
          >    
            <FontAwesomeIcon icon={faReply} size="2x" className="icon" />
          </button>
        </footer>
      :
        null
      }
    </>
  );
 
  return (
    <div className={isFlipped ? "flippable flipped" : "flippable"}>
      <div className="flippable__inner">
        <div className="flippable__content front">
          {header}
          {isEditing || isAddingCard ? 
            editor
          :
            <CardContent text={frontText} />
          }
          {footer}
        </div>
        <div className="flippable__content back">
          {backHeader}
          {isEditing || isAddingCard ? 
            backEditor
          :
            <CardContent text={backText} />
          }
          {footer}
        </div>
      </div>
    </div>
  )
}

export default FlippableCard;