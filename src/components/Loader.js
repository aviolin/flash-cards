import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} size="2x" className="loader-icon"/>
    </div>
  )
}

export default Loader;