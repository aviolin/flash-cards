import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

const Navlinks = ({
  closeMenu
}) => {
  const { user } = useContext(firebaseAuth);

  return (
    <ul>
      {/* <li>
        <Link to="/" className="link" onClick={() => closeMenu()}>
          Home
        </Link>
      </li> */}
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
    </ul>
  )
}

export default Navlinks;