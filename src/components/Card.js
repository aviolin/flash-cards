import React from 'react';
import Button from './Button';
import CardContent from './CardContent';
import CardEditor from './CardEditor';
import Footer from './Footer';
import Header from './Header';

const Card = (props) => {

  const header = props.isEditing ? (
    <Header>
      <Button 
        type="cancel" 
        onClick={props.onClick}
      />
    </Header>
  ) : (
    <Header>
      <Button 
        type="edit" 
        onClick={props.onClick}
      />
      <Button 
        type="exit" 
        onClick={props.onClick}
      />
    </Header>
  )

  const content = props.isEditing ? (
    <CardEditor 
      onClick={props.onClick}
      frontText={props.frontText}
      backText={props.backText}
      deckId={props.deckId}
      cardId={props.cardId}
      isAddingCard={props.isAddingCard}
      update={props.update}
      updateShuffled={props.updateShuffled}
      isShowingBack={props.isShowingBack}
    />
  ) : (
    <CardContent 
      text={props.isShowingBack ? props.backText : props.frontText}
      onClick={props.onClick}
    />
  )
  
  return (
    <div className="card-wrapper">
      <div className="card">
        {header}
        {content}
        <Footer 
          onClick={props.onClick}
        />
      </div>
    </div>
  )
}

export default Card;