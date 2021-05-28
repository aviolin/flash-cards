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
            className="btn-tertiary"
            to="/log-out"
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
      <div className="sample-list">
        <p>Or, check out some sample decks: </p>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="link">Test Deck #1</Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="link">Test Deck #1</Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="link">Test Deck #1</Link>
      </div>

    </div>
  )
}

export default Landing;