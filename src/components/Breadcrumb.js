/**
 * Displays a simple breadcrumb link.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = ({
  to,
  name
}) => {
  return (
    <Link 
      className="breadcrumb"
      to={to}
    >
      <FontAwesomeIcon icon={faAngleLeft} />&nbsp;&nbsp;&nbsp;{name}
    </Link>
  );
}

export default Breadcrumb;