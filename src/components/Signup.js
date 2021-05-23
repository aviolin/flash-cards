import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link, useHistory } from 'react-router-dom';

const Signup = (props) => {
  const [tos, setTos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const {handleSignup, inputs, setInputs, errors, user} = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
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
      case "auth/weak-password":
        setErrorMessage("Your password must be at least 6 characters long");
        return;
      case "auth/email-already-in-use":
        setErrorMessage("This email is already registered.");
        return;
      case "auth/invalid-email":
        setErrorMessage("Please enter a valid email address.");
        return;
      default:
        setErrorMessage("Something went wrong. Please try again.");
        return;
    }

  }, [errors])

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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
          <label htmlFor="tos">
            <span></span>
            I agree to the Terms of Service
          </label>
        </div>
        {errorMessage === "" ? null :
          <p className="error">{errors}: {errorMessage}</p> 
        }
        <button 
          className="btn-primary"
          disabled={!tos || inputs.password === "" || inputs.email === ""}
        >
          Sign up
        </button>
        
      </form>
      <p>Already have an account? <Link to="/log-in">Log in here.</Link></p>
    </div>
  )
}

export default Signup;