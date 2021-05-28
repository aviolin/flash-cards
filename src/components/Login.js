import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { authMethods } from '../firebase/authMethods';
import { Link, useHistory } from 'react-router-dom';

import PageHeading from '../components/new/PageHeading';
import TextInput from '../components/TextInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const {user, handleSignin, inputs, setInputs, errors, setErrors} = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin()
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
    switch (errors) {
      case null:
        return;
      case "auth/user-not-found":
        setErrorMessage("The email and password do not match.");
        return;
      case "auth/wrong-password":
        setErrorMessage("The email and password do not match.");
        return;
      case "auth/invalid-email":
        setErrorMessage("Please enter a valid email address.");
      default:
        setErrorMessage("Something went wrong. Please try again.");
        return;
    }

  }, [errors]);

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
        {errorMessage === "" ? null :
          <p className="error">{errors}: {errorMessage}</p> 
        }
        <button 
          className="btn btn-primary"
          disabled={inputs.password === "" || inputs.email === ""}        
        >Go!</button>
      </form>
      <p>Forgot your credentials? <Link to="/forgot">Reset your password</Link>.</p>
      
      <p>No account? <Link to="/sign-up">Sign up</Link>.</p>
    </div>
  )
}

export default Login;