import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import PageHeading from './PageHeading';
import TextInput from '../TextInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Test = () => {
  const [inputs, setInputs] = useState({ email: "", password: "", newPassword: "" })
  const { userData, loading, error, handleSignup, handleLogin, handleLogout, handleChangeEmail, handleChangePassword } = useAuth(inputs.email, inputs.password, inputs.newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
    console.log("Signed up!");
  }

  const hLogin = (e) => {
    e.preventDefault();
    handleLogin();
    console.log("Signed in!")
  }

  const hLogout = (e) => {
    e.preventDefault();
    handleLogout();
    console.log("Signed out!")
  }

  const hChangeEmail = (e) => {
    e.preventDefault();
    handleChangeEmail();
    console.log("Changed email!")
  }

  const hChangePass = (e) => {
    e.preventDefault();
    handleChangePassword();
    console.log("Changed pass!")
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    console.log("Loading: ", loading);
  }, [loading])

  useEffect(() => {
    console.log("Error: ", error);
  }, [error])

  useEffect(() => {
    console.log("Userdata: ", userData);
  }, [userData])

  return (
    <main>
    <div className="login">
      <PageHeading 
        title="TEST"
        subtitle="Log in with your credentials."
      />
      <form onSubmit={handleSubmit}>
        <TextInput 
          labelText="Email"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          id="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="youremail@example.com"
        />
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
          labelText="New password"
          icon={<FontAwesomeIcon icon={faLock} />}
          type="password"
          id="new-password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
        />
        {error === null ? null : <p>{error.message}</p>}
        <button 
          className="btn btn-primary"
        >
          {loading === false ? "Sign up" : "Loading" }
        </button>
      </form>
      <button className="btn btn-primary"
        onClick={hLogin}
      >
        Log in
      </button>
      <button className="btn btn-primary"
        onClick={hLogout}
      >
        Log out
      </button>
      <button className="btn btn-primary"
        onClick={hChangeEmail}
      >
        Change Email
      </button>
      <button className="btn btn-primary"
        onClick={hChangePass}
      >
        Change Password
      </button>
    </div>
    </main>
  )
}

export default Test;