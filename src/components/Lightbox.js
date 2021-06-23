/**
 * A modular lightbox.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';

const Lightbox = ({
  onClose,
  title,
  isOpen,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="lightbox">
      <div className="lightbox-inner">
        <Header
          title={title}
        >
          <button 
            className="btn btn-icon-small"
            name="exit"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />&nbsp;Close
          </button>
        </Header>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Lightbox;