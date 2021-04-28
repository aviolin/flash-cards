import React from 'react';
import { Link } from 'react-router-dom';

const DeckThumbnail = (props) => {
  return (
    <Link to={"/deck/" + props.id} className="deck-thumbnail">
      <div>
        <h3>{props.title}</h3>
        <p>Subtitle</p>
      </div>
    </Link>
  )
}

export default DeckThumbnail;