/**
 * Renders the login page and handles displaying login errors.
 */

import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../../provider/AuthProvider';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const { status, error, handleLogin} = useAuth(inputs.email, inputs.password);
  const { user } = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (user) {
      history.push("/app");
    }
  }, [user]);

  useEffect(() => {
    if (error === null) {
      setErrorMessage("");
      return;
    }

    switch (error.code) {
      case null:
        setErrorMessage("");
        return;
      case "auth/user-not-found":
        setErrorMessage("The email and password do not match.");
        return;
      case "auth/wrong-password":
        setErrorMessage("The email and password do not match.");
        return;
      case "auth/invalid-email":
        setErrorMessage("Please enter a valid email address.");
        return;
      default:
        setErrorMessage("Something went wrong. Please try again.");
        return;
    }

  }, [error]);

  return (
    <div className="login">
      <PageHeading 
        title="Hey there!"
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
        {errorMessage !== "" && <p className="error">{errorMessage}</p>}
        <button 
          className="btn btn-primary"
          disabled={inputs.password === "" || inputs.email === ""}        
        >
          {status === "loading" ? "Loading . . . " : status === "success" ? "Success!" : "Go!"}
        </button>
      </form>
      <p>Forgot your credentials? <Link to="/reset-password">Reset your password</Link>.</p>
      <p>No account? <Link to="/sign-up">Sign up</Link>.</p>
    </div>
  );
}

export default Login;