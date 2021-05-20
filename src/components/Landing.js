import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <h1>Easily create, study and share flashcards.</h1>
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
    </div>
  )
}

export default Landing;