import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { authMethods } from '../firebase/authMethods';
import { Link, useHistory } from 'react-router-dom';


const Login = (props) => {
  const [tos, setTos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const {user, handleSignin, inputs, setInputs, errors, setErrors} = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin()
  }

  const handleLogout = (e) => {
    e.preventDefault();
    authMethods.signout();
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
      <button className="btn-secondary">Forgot?</button>
      <Link 
        className="btn-secondary"
        to="/sign-up"
      >
        No account? Sign up!
      </Link>
      {/* <button className="btn-secondary" onClick={handleLogout}>Log out</button> */}

    </div>
  )
}

export default Login;