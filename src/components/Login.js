import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { authMethods } from '../firebase/authMethods';
import { Link, useHistory } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          type="text" 
          name="email"
          value={inputs.email}
          onChange={handleChange}
        
        />
        <label htmlFor="password">Password:</label>
        <input 
          id="password"
          type="password" 
          name="password"
          value={inputs.password}
          onChange={handleChange}

        />
        {errorMessage === "" ? null :
          <p className="error">{errors}: {errorMessage}</p> 
        }
        <button className="btn-primary">Log in</button>
      </form>
      <p>Forgot your credentials? <Link to="/forgot">Reset your password.</Link></p>
      
      <p>No account? <Link to="/sign-up">Sign up here!</Link></p>
    </div>
  )
}

export default Login;