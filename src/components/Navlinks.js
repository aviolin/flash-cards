/**
 * Displays the main navigation links.
 */

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

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
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account" className="link" onClick={() => closeMenu()} activeClassName="active">
            My account
          </NavLink>
        </li>
        <li>
          <NavLink to="/log-out" className="link" onClick={() => closeMenu()} activeClassName="active">
            Log out
          </NavLink>
        </li>
      </>
      :
      <>
        <li>
          <NavLink to="/sign-up" className="link" onClick={() => closeMenu()} activeClassName="active">
            Sign up
          </NavLink>
          </li><li>
          <NavLink to="/log-in" className="link" onClick={() => closeMenu()} activeClassName="active">
            Log in
          </NavLink>
        </li>

      </>
      }
    </ul>
  )
}

export default Navlinks;