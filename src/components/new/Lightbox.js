import React from 'react';
import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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
  )
}

export default Lightbox;