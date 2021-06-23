/**
 * Handles displaying the landing page.
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import heroImage from '../images/hero.jpg';

const Landing = () => {
  const { user } = useContext(firebaseAuth);
  return (
    <>
      <header className="hero">
        <img src={heroImage} />
        <h1>Easily create, study and share flashcards.</h1>
      </header>
      <div className="buttons">
      {user ? 
        <>
          <Link
            className="btn"
            to="/app"
          >
            Dashboard
          </Link>
          <Link
            className="btn btn-secondary"
            to="/my-account"
          >
            My Account
          </Link>
        </>
      :
        <>
          <Link
            className="btn"
            to="/sign-up"
          >
            Sign up
          </Link>
          <Link
            className="btn btn-secondary"
            to="/log-in"
          >
            Log In
          </Link>
        </>
      }
      </div>
      <section className="public-decks">
        <h2>No account? No problem!</h2><p>Check out some of our public flash cards:</p>
        <Link to="/app/d/WOJrC5Mp87qzKcka2haX" className="btn btn-tertiary">
          <span>Classical Music Composers</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="btn btn-tertiary">
          <span>Star Trek Facts & Trivia</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
        <Link to="/app/d/Fd73VQwvnOoNHFrqQHW2" className="btn btn-tertiary">
          <span>Miscellaneous Trivia</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </section>
    </>
  )
}

export default Landing;