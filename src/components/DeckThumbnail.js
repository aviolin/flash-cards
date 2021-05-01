import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const DeckThumbnail = (props) => {
  return (
    <Link to={"/deck/" + props.id} className="deck-thumbnail">
      <div>
        <div><FontAwesomeIcon icon={faGraduationCap} className="icon" />
          <h3>{props.title}</h3>
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </Link>
  )
}

export default DeckThumbnail;