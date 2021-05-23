import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const MyAccount = ({
  
}) => {
  const { user, inputs, setInputs, handleChangeEmail, handleChangePassword } = useContext(firebaseAuth);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  if (!user) {
    return (
      <div className="dashboard">
        <p>You are not logged in. To view your dashboard, log in or sign up here:</p>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
    <div className="landing">
      <h1>Your Account</h1>

      <Switch>
        <Route exact path="/my-account">
          <h2>Account Info</h2>
          <p>Your email: {user.email} 
            <Link to="/my-account/change-email">
              &nbsp;<FontAwesomeIcon icon={faEdit} />
            </Link>
          </p>
          
          <p>Your password: ******************** 
            <Link to="/my-account/change-password">
              &nbsp;<FontAwesomeIcon icon={faEdit} /> 
            </Link>
          </p>
          
          <Link to="/" className="btn-tertiary">Delete Account</Link>
          <Link to="/log-out" className="btn-tertiary">Log Out</Link>
        </Route>
        <Route exact path="/my-account/change-email">
          <h2>Change your email</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
            handleChangeEmail()
          }}>
            <label htmlFor="new-email">New email:</label>
            <input 
              id="new-email"
              type="text"
              name="newEmail"
              onChange={handleChange}
            />
            <button className="btn-primary">Change Email</button>
          </form>
        </Route>
        <Route exact path="/my-account/change-password">
          <h2>Change your password</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
            handleChangePassword();
          }}>
            <label htmlFor="new-password">New password:</label>
            <input 
              id="new-password"
              type="password"
              name="newPassword"
            />
            <label htmlFor="confirm-password">Confirm password:</label>
            <input 
              name="confirmPassword"
              id="confirm-password"
              type="password"
            />
            <button className="btn-primary">Change Password</button>
          </form>
        </Route>
      </Switch>
    </div>

  )
}

export default MyAccount;