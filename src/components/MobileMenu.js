import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import { authMethods } from '../firebase/authMethods';

const MobileMenu = ({
  isOpen,
  setIsOpen
}) => {
  const { user } = useContext(firebaseAuth);
  const history = useHistory();

  const closeMenu = (event) => {
    setIsOpen(false);
  }

  return (
    <div className={isOpen ? "mobile-menu open" : "mobile-menu"}>
      <ul>
        <li>
          <Link to="/" onClick={() => closeMenu()}>
            Home
          </Link>
        </li>
        {user ? 
        <>
          
          <li>
            <Link to="/app" onClick={() => closeMenu()}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/my-account" onClick={() => closeMenu()}>
              My account
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => {
              authMethods.signout();
              history.push("/app");
              closeMenu()
            }}>
              Log out
            </Link>
          </li>
        </>
        :
        <>
          <li>
            <Link to="/sign-up" onClick={() => closeMenu()}>
              Sign up
            </Link>
          </li>
          <li>
            <Link to="/log-in" onClick={() => closeMenu()}>
              Log in
            </Link>
          </li>
        </>
        }
      </ul>
    </div>
  )
}

export default MobileMenu;