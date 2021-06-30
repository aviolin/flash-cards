/**
 * Displays a text or password input, dependinding on 
 * the type prop. The password input can toggle between
 * password and text types.
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

const TextInput = ({
  labelText,
  icon=null,
  type="text",
  id="",
  name="",
  placeholder="",
  value,
  onChange,
  autocomplete="on"
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = (event) => {
    event.preventDefault();
    setIsHidden(prev => !prev);
  }

  if (icon === null && type==="password")
    icon = <FontAwesomeIcon icon={faLock} />

  return (
    <div className="input-block">
      <label htmlFor={id}>{labelText}</label>
      <div className="input-row">
        {icon}
        <input 
          type={type === "password" ? isHidden ? "password" : "text" : type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          
          autoComplete={autocomplete}
        >
        </input>
        {type === "password" &&
          <button
            type="button"
            className="btn btn-icon"
            onClick={toggleHidden}
          >
            {isHidden ?
              <FontAwesomeIcon icon={faEye} />
            :
              <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
        }
      </div>
    </div>
  );
}

export default TextInput;