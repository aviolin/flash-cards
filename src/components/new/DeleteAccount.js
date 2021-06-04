import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import PageHeading from './PageHeading';
import TextInput from '../TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const DeleteAccount = ({
  handleChange,
  inputs,
  error,
  onSubmit
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    switch (error) {
      case null:
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
        title="Delete account."
        subtitle="Please confirm your current password."
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
        {errorMessage === "" ? null :
          <p className="error">{errorMessage}</p> 
        }
        <button className="btn btn-warning">Permanently Delete Account</button>
      </form>
    </>
  )
}

export default DeleteAccount;