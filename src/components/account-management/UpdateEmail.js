/**
 * Displays the update email page.
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../Breadcrumb';
import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const UpdateEmail = ({
  handleChange,
  inputs,
  onSubmit,
  error,
  status
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error === null) {
      setErrorMessage("");
      return;
    }

    switch (error.code) {
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
        title="Update email."
        subtitle="Please enter your current password, and then an updated email address."
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
          labelText="Email"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          id="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="newemail@example.com"
        />
        {errorMessage !== "" && <p className="error">{errorMessage}</p>}
        <button className="btn btn-primary">
          {status === "loading" ? "Loading . . . " : status === "success" ? "Success!" : "Update Email"}
        </button>
      </form>
    </>
  );
}

export default UpdateEmail;