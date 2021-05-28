import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const CardEditor = ({
  card,
  user,
}) => {
  return (
    <form className="card-editor">
      <label>Front</label>
      <textarea

      />
      <label>Back</label>
      <textarea

      />
      <button className="btn"

      >Update</button>
      <button className="btn btn-warning-small"
      
      >
        <FontAwesomeIcon icon={faTrash} /> Delete card
      </button>
    
    </form>
  )
}

export default CardEditor;