import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const ButtonLink = (props) => {
  let classes = 'btn-link';
  if (props.accent) {
    classes += ' accent';
  }

  return (
    <Link to={props.to} className={classes}>
      <div>
        <FontAwesomeIcon icon={faGraduationCap} className="icon" />&nbsp;
        {props.title}
      </div>
      <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  )
}

export default ButtonLink;