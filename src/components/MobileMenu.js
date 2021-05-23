import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

import Navlinks from './Navlinks';

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
      <Navlinks closeMenu={closeMenu} />
      {/* <ul>
        <li>
          <Link to="/" className="link" onClick={() => closeMenu()}>
            Home
          </Link>
        </li>
        {user ? 
        <>
          
          <li>
            <Link to="/app" className="link" onClick={() => closeMenu()}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/my-account" className="link" onClick={() => closeMenu()}>
              My account
            </Link>
          </li>
          <li>
            <Link to="/log-out" className="link" onClick={() => closeMenu()}>
              Log out
            </Link>
          </li>
        </>
        :
        <>
          <li>
            <Link to="/sign-up" className="link" onClick={() => closeMenu()}>
              Sign up
            </Link>
          </li>
          <li>
            <Link to="/log-in" className="link" onClick={() => closeMenu()}>
              Log in
            </Link>
          </li>
        </>
        }
      </ul> */}
    </div>
  )
}

export default MobileMenu;