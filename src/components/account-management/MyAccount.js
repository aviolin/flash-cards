/**
 * Shows the My Account page and sets up the useAuth
 * hook to be used on ChangePassword, UpdateEmail and
 * DeleteAccount components.
 */

import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../../provider/AuthProvider';
import { Link, Switch, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSignOutAlt, faLock, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../Breadcrumb';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import PageHeading from '../PageHeading';
import UpdateEmail from './UpdateEmail';

const MyAccount = () => {
  const [inputs, setInputs] = useState({ email: "", password: "", newPassword: "" });

  const { 
    loading, 
    error, 
    status, 
    handleChangeEmail, 
    handleChangePassword, 
    handleDeleteAccount 
  } = useAuth(inputs.email, inputs.password, inputs.newPassword);

  const { user } = useContext(firebaseAuth);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  if (!user) {
    return (
      <div className="dashboard">
        <PageHeading
          title=":( Not logged in."
          subtitle="You are not logged in. To view your dashboard, log in or sign up."
        />
        <br/><br/><br/><br/><br/><br/>
      </div>
    );
  }

  return (
    <div className="my-account">
      <div className="my-account-inner">
        <Switch>
          <Route exact path="/my-account">
            <Breadcrumb
              to="/"
              name="Home"
            />
            <PageHeading
              title="Your account."
              subtitle="Update your email and password or delete your account."
            />
            <div className="account-data">
              <p><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;{user.email} </p>
                <Link to="/my-account/change-email" className="btn btn-tertiary">
                  <span>Update your email</span><FontAwesomeIcon icon={faAngleRight} className="icon" />
                </Link>
            </div>
            <div className="account-data">
            <p><FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;&nbsp;******************** </p>
              <Link to="/my-account/change-password" className="btn btn-tertiary">
                <span>Change your password</span><FontAwesomeIcon icon={faAngleRight} className="icon" />
              </Link>
            
            </div>
            <div className="account-data">
              <Link to="/log-out" className="btn btn-tertiary">
                <span>Log out</span><FontAwesomeIcon icon={faAngleRight} className="icon" />
              </Link>
            </div>
            <div className="account-data">
              <Link to="/my-account/delete-account" className="btn btn-warning">
                <FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp;&nbsp;Delete Account
              </Link>
            </div>
          </Route>

          <Route exact path="/my-account/change-email">
            <UpdateEmail 
              handleChange={handleChange}
              inputs={inputs}
              loading={loading}
              onSubmit={handleChangeEmail}
              error={error}
              status={status}
            />
          </Route>

          <Route exact path="/my-account/change-password">
            <ChangePassword 
              handleChange={handleChange}
              loading={loading}
              inputs={inputs}
              onSubmit={handleChangePassword}
              error={error}
              status={status}
            />
          </Route>
          
          <Route exact path="/my-account/delete-account">
            <DeleteAccount 
              handleChange={handleChange}
              inputs={inputs}
              onSubmit={handleDeleteAccount}
              error={error}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MyAccount;