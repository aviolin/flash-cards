import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { authMethods } from '../firebase/authMethods';


const Login = (props) => {
  const [tos, setTos] = useState(false);

  const {handleSignin, inputs, setInputs, errors, setErrors} = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin();
  }

  const handleLogout = (e) => {
    e.preventDefault();
    authMethods.signout();
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login">
      <header className="hero">
        <FontAwesomeIcon icon={faBolt} size="5x" />
        <h1>Flash Cards</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
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
        <button className="btn-primary">Log in</button>
      </form>
      <button className="btn-secondary">Sign up</button>
      <button className="btn-secondary">Forgot?</button>
      <button className="btn-secondary" onClick={handleLogout}>Log out</button>

    </div>
  )
}

export default Login;