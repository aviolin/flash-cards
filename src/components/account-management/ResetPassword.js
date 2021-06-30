/**
 * Handles rendering the reset password page.
 */

import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseIndex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../Breadcrumb';
import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email).then(() => {
      console.log("Password reset email sent");
      setSuccess(true);
    })
    .catch(error => {
      console.log(error.message);
    });
  }
  
  return (
    <div className="reset-password">
      <Breadcrumb 
        to="/log-in"
        name="Log in"
      />
      <PageHeading
        title="Reset password."
        subtitle="Please enter the email address you signed up with."
      />
      <form onSubmit={onSubmit}>
        <TextInput 
          labelText="Email"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="youremail@example.com"
        />
        <button className="btn btn-primary">
          {success ? "Password reset email sent!" : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;