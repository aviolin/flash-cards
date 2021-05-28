import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSignOutAlt, faLock, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';

import PageHeading from './new/PageHeading';
import TextInput from './TextInput';
import Breadcrumb from './new/Breadcrumb';

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
      <Switch>
        <Route exact path="/my-account">
          <PageHeading
            title="Your account."
            subtitle="Update your email and password or delete your account."
          />
          <div className="account-data">
            <p><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;{user.email} </p>
              <Link to="/my-account/change-email" className="btn btn-tertiary">
                <span>Update your email</span><FontAwesomeIcon icon={faAngleRight} />
              </Link>
          </div>
          <div className="account-data">
          <p><FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;&nbsp;******************** </p>
            <Link to="/my-account/change-password" className="btn btn-tertiary">
              <span>Change your password</span><FontAwesomeIcon icon={faAngleRight} />
            </Link>
          
          </div>
          <div className="account-data">
            <Link to="/log-out" className="btn btn-tertiary">
              <span>Log out</span><FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </div>
          <div className="account-data">
            <Link to="/" className="btn btn-warning-small"><FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp;&nbsp;Delete Account</Link>
          </div>
        </Route>
        <Route exact path="/my-account/change-email">
          <Breadcrumb 
            to="/my-account"
            name="My account"
          />
          <PageHeading
            title="Update email."
            subtitle="Enter your current password and an updated email address."
          />
          <form onSubmit={(event) => {
            event.preventDefault();
            handleChangeEmail()
          }}>
            <TextInput 
              labelText="Password"
              icon={<FontAwesomeIcon icon={faLock} />}
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <TextInput 
              labelText="Email"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              id="new-email"
              name="newEmail"
              value={inputs.email}
              onChange={handleChange}
              placeholder="newemail@example.com"
            />
            {/* <label htmlFor="new-email">New email:</label>
            <input 
              id="new-email"
              type="text"
              name="newEmail"
              onChange={handleChange}
            /> */}
            <button className="btn btn-primary">Update Email</button>
          </form>
        </Route>
        <Route exact path="/my-account/change-password">
          <Breadcrumb 
            to="/my-account"
            name="My account"
          />
          <PageHeading
            title="Change password."
            subtitle="Please confirm your current password, and enter a new password."
          />
          <form onSubmit={(event) => {
            event.preventDefault();
            handleChangePassword();
          }}>
            {/* <label htmlFor="new-password">New password:</label>
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
            /> */}
            <TextInput 
              labelText="Current password"
              icon={<FontAwesomeIcon icon={faLock} />}
              type="password"
              id="confirm-password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <TextInput 
              labelText="Password"
              icon={<FontAwesomeIcon icon={faLock} />}
              type="password"
              id="new-password"
              name="newPassword"
              value={inputs.newPassword}
              onChange={handleChange}
            />
            <button className="btn btn-primary">Change Password</button>
          </form>
        </Route>
      </Switch>
    </div>

  )
}

export default MyAccount;