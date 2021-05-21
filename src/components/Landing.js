import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

const Landing = () => {
  const { user } = useContext(firebaseAuth);
  return (
    <div className="landing">
      <h1>Easily create, study and share flashcards.</h1>
      {user ? 
        <>
          <Link
            className="btn-primary"
            to="/app"
          >
            Dashboard
          </Link>
          <Link
            className="btn-secondary"
            to="/"
          >
            Log Out
          </Link>
        </>
      :
        <>
          <Link
            className="btn-primary"
            to="/sign-up"
          >
            Sign up
          </Link>
          <Link
            className="btn-secondary"
            to="/log-in"
          >
            Log In
          </Link>
        </>
      }
      <p>Or, check out some sample decks: </p>
      <Link to="/app/cYddMteaU6ZSYhyq5AHg">Test Deck #1</Link>
    </div>
  )
}

export default Landing;