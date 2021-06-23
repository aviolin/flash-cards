/**
 * Displays the main navigation links.
 */

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faSignInAlt, faTable, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navlinks = ({
  closeMenu
}) => {
  const { user } = useContext(firebaseAuth);

  return (
    <ul>
      {user ? 
      <>
        <li>
          <NavLink to="/app" className="link" onClick={() => closeMenu()} activeClassName="active">
            <FontAwesomeIcon icon={faTable} />&nbsp;&nbsp;&nbsp;Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account" className="link" onClick={() => closeMenu()} activeClassName="active">
            <FontAwesomeIcon icon={faUserCircle} />&nbsp;&nbsp;&nbsp;My account
          </NavLink>
        </li>
        <li>
          <NavLink to="/log-out" className="link" onClick={() => closeMenu()} activeClassName="active">
            <FontAwesomeIcon icon={faSignOutAlt} />&nbsp;&nbsp;&nbsp;Log out
          </NavLink>
        </li>
      </>
      :
      <>
        <li>
          <NavLink to="/sign-up" className="link" onClick={() => closeMenu()} activeClassName="active">
            <FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;&nbsp;Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to="/log-in" className="link" onClick={() => closeMenu()} activeClassName="active">
            <FontAwesomeIcon icon={faSignInAlt} />&nbsp;&nbsp;&nbsp;Log in
          </NavLink>
        </li>
      </>
      }
    </ul>
  )
}

export default Navlinks;