/**
 * Displays the update password page.
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../Breadcrumb';
import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const ChangePassword = ({
  handleChange,
  inputs,
  error,
  onSubmit,
  status
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error === null) {
      setErrorMessage("");
      return;
    }

    switch (error) {
      case null:
        setErrorMessage("");
        return;
      case "auth/wrong-password":
        setErrorMessage("Incorrect password.");
        return;
      default:
        setErrorMessage("Something went wrong. Please try again.");
        return;
    }
  }, [error]);
  
  return (
    <>
      <Breadcrumb 
        to="/my-account"
        name="My account"
      />
      <PageHeading
        title="Change password."
        subtitle="Please enter your current password, and then a new password."
      />
      <form onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
        <TextInput 
          labelText="Current password"
          icon={<FontAwesomeIcon icon={faLock} />}
          type="password"
          id="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <TextInput 
          labelText="New password"
          icon={<FontAwesomeIcon icon={faLock} />}
          type="password"
          id="new-password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
        />
        {errorMessage !== "" && <p className="error">{errorMessage}</p>}
        <button className="btn btn-primary">
          {status === "loading" ? "Loading . . . " : status === "success" ? "Success!" : "Change Password"}
        </button>
      </form>
    </>
  );
}

export default ChangePassword;