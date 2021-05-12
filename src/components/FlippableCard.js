import React from 'react';

import Header from './Header';
import Footer from './Footer';
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
      onClick={onClick}
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
          {!isEditing && !isAddingCard ? 
            <Footer 
              onClick={onClick}
            />
          :
            null
          }
        </div>
        <div className="flippable__content back">
          {backHeader}
          {isEditing || isAddingCard ? 
            backEditor
          :
            <CardContent text={backText} />
          }
          {!isEditing && !isAddingCard ? 
            <Footer 
              onClick={onClick}
            />
          :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default FlippableCard;