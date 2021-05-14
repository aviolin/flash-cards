import React, { useState, useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { authMethods } from '../firebase/authMethods';
import { dbMethods } from '../firebase/dbMethods';

const Signup = (props) => {
  const [tos, setTos] = useState(false);

  const {handleSignup, handleSignout, inputs, setInputs, errors, setErrors, user} = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  }
  
  const handleLogout = (e) => {
    e.preventDefault();
    authMethods.signout();
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  const test = e => {
    //dbMethods.createDeck(user, "test!");
    //dbMethods.updateDeck("cePY1qt9uyy3YMVOHHpF", "oooooooooh");
    //dbMethods.deleteDeck(user, "sHMEvZtYcVk7yj7G3aZK");
    //dbMethods.createCard("mXoERZf5Qyhwelnj3Mc2", "Front", "Back!");
    //dbMethods.deleteCard("sHMEvZtYcVk7yj7G3aZK", "CYQxYP9HGIhmuIb7eOEc")
    dbMethods.updateCard("mXoERZf5Qyhwelnj3Mc2", "PcTCfZLnO1QpSRDqytnr", "New front", "baaaaaack");
  }

  return (
    <div className="login">
      <header className="hero">
        <FontAwesomeIcon icon={faBolt} size="5x" />
        <h1>Flash Cards</h1>
      </header>
      <button onClick={test}>Test</button>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
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
        <div className="form-row">
          <input
            id="tos"
            name="tos"
            type="checkbox"
            checked={tos ? true : false}
            onChange={() => setTos(!tos)}
          />
          <label htmlFor="tos">I agree to the Terms of Service</label>
        </div>
        <button className="btn-primary">Sign up</button>
        {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p>) : null}
      </form>
      <button className="btn-secondary">Login</button>
      <button className="btn-secondary" onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Signup;