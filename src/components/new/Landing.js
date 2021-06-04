import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import heroImage from '../../images/hero.jpg';

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
        <p>No account? No problem! Check out some of our public flash cards:</p>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="btn btn-tertiary">
          <span>Classical Composers</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="btn btn-tertiary">
          <span>Fun Facts #1</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="btn btn-tertiary">
          <span>Star Trek Discoveries</span> <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </section>
    </>
  )
}

export default Landing;