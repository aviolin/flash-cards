import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faTable } from '@fortawesome/free-solid-svg-icons';

const Navlinks = ({
  closeMenu
}) => {
  const { user } = useContext(firebaseAuth);

  return (
    <ul>
      {user ? 
      <>
        <li>
          <Link to="/app" className="link" onClick={() => closeMenu()}>
            <FontAwesomeIcon icon={faTable} />&nbsp;&nbsp;&nbsp;Dashboard
          </Link>
        </li>
        <li>
          <Link to="/my-account" className="link" onClick={() => closeMenu()}>
            <FontAwesomeIcon icon={faUserCircle} />&nbsp;&nbsp;&nbsp;My account
          </Link>
        </li>
        <li>
          <Link to="/log-out" className="link" onClick={() => closeMenu()}>
            <FontAwesomeIcon icon={faSignOutAlt} />&nbsp;&nbsp;&nbsp;Log out
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
    </ul>
  )
}

export default Navlinks;