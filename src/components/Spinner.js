/**
 * A simple loading icon.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({
  size="1x"
}) => {
  return <FontAwesomeIcon icon={faSpinner} size={size} className="spinner"/>
}

export default Spinner;