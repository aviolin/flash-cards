/**
 * Handles displaying the landing page.
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faReply } from '@fortawesome/free-solid-svg-icons';

import heroImage from '../images/hero.jpg';

const Landing = () => {
  const { user } = useContext(firebaseAuth);
  return (
    <>
      <header className="hero">
        <div className="curve">
          <svg id="wave" viewBox="0 0 1440 310" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0"><stop stopColor="#fff" offset="0%"></stop><stop stopColor="#fff" offset="100%"></stop></linearGradient></defs>
            <path fill="url(#sw-gradient-1)" d="M0,62L30,67.2C60,72,120,83,180,113.7C240,145,300,196,360,217C420,238,480,227,540,211.8C600,196,660,176,720,155C780,134,840,114,900,113.7C960,114,1020,134,1080,155C1140,176,1200,196,1260,175.7C1320,155,1380,93,1440,93C1500,93,1560,155,1620,191.2C1680,227,1740,238,1800,201.5C1860,165,1920,83,1980,82.7C2040,83,2100,165,2160,175.7C2220,186,2280,124,2340,87.8C2400,52,2460,41,2520,67.2C2580,93,2640,155,2700,196.3C2760,238,2820,258,2880,263.5C2940,269,3000,258,3060,227.3C3120,196,3180,145,3240,129.2C3300,114,3360,134,3420,155C3480,176,3540,196,3600,211.8C3660,227,3720,238,3780,227.3C3840,217,3900,186,3960,186C4020,186,4080,217,4140,217C4200,217,4260,186,4290,170.5L4320,155L4320,310L4290,310C4260,310,4200,310,4140,310C4080,310,4020,310,3960,310C3900,310,3840,310,3780,310C3720,310,3660,310,3600,310C3540,310,3480,310,3420,310C3360,310,3300,310,3240,310C3180,310,3120,310,3060,310C3000,310,2940,310,2880,310C2820,310,2760,310,2700,310C2640,310,2580,310,2520,310C2460,310,2400,310,2340,310C2280,310,2220,310,2160,310C2100,310,2040,310,1980,310C1920,310,1860,310,1800,310C1740,310,1680,310,1620,310C1560,310,1500,310,1440,310C1380,310,1320,310,1260,310C1200,310,1140,310,1080,310C1020,310,960,310,900,310C840,310,780,310,720,310C660,310,600,310,540,310C480,310,420,310,360,310C300,310,240,310,180,310C120,310,60,310,30,310L0,310Z"></path>
          </svg>
        </div>
        <section>
        <div className="hero-content">
          <h1>Easily create, study and share flash cards.</h1>
          <p>Join for free, or flip through some of our public flash cards.</p>
          <div className="buttons">
          {user ? 
            <>
              <Link
                className="btn"
                to="/app"
              >
                Dashboard
              </Link>
              {/* <Link
                className="btn btn-secondary"
                to="/my-account"
              >
                My Account
              </Link> */}
            </>
          :
            <>
              <Link
                className="btn"
                to="/sign-up"
              >
                Get started
              </Link>
              {/* <Link
                className="btn btn-secondary"
                to="/log-in"
              >
                Log In
              </Link> */}
            </>
          }
          </div>
        </div>
        <div className="hero-content"></div>
        </section>
        <div className="card-design">
          <div>
            <span></span>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span><FontAwesomeIcon icon={faReply} /></span>
          </div>
          <div>
            <span></span>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span><FontAwesomeIcon icon={faReply} /></span>
          </div>
          <div>
            <span></span>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span><FontAwesomeIcon icon={faReply} /></span>
          </div>
        </div>
      </header>
      
      <section className="public-decks">
        <h2>Public Flash Cards</h2><p>No account? No problem. Public flash cards are free for everyone to use!</p>
        <Link to="/app/d/WOJrC5Mp87qzKcka2haX" className="btn btn-tertiary">
          <span>Classical Music Composers</span> <FontAwesomeIcon icon={faAngleRight} className="icon"/>
        </Link>
        <Link to="/app/d/cYddMteaU6ZSYhyq5AHg" className="btn btn-tertiary">
          <span>Star Trek Facts & Trivia</span> <FontAwesomeIcon icon={faAngleRight} className="icon"/>
        </Link>
        <Link to="/app/d/Fd73VQwvnOoNHFrqQHW2" className="btn btn-tertiary">
          <span>Miscellaneous Trivia</span> <FontAwesomeIcon icon={faAngleRight} className="icon"/>
        </Link>
      </section>
    </>
  );
}

export default Landing;