import React from 'react';
import Carousel from './Carousel';

const Container = ({ 
  cache,
  update,
  shuffledCards,
  onClick,
  isAddingCard,
  isShowingBack,
  isEditing,
  cardId,
  curDeckId,
  updateShuffled,
 }) => {

  return (
    <Carousel 
      shuffledCards={shuffledCards}
      updateShuffled={updateShuffled}
      onClick={onClick}
    />
  )

  //return <div className="container">{children}</div>;
}

export default Container;