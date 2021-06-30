/**
 * Handles rendering the signup page and displaying signup errors.
 */

import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../../provider/AuthProvider';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import PageHeading from '../PageHeading';
import TextInput from '../TextInput';

const Signup = () => {
  const [tos, setTos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const history = useHistory();

  const { status, error, handleSignup} = useAuth(inputs.email, inputs.password);
  const { user } = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  }

  useEffect(() => {
    if (error === null) return;
    console.log(error.message);
  }, [error])

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
  }, [error]);

  return (
    <div className="signup">
      <PageHeading 
        title="Welcome!"
        subtitle="Create an account."
      />
      <form onSubmit={handleSubmit}>
        <TextInput 
          labelText="Email"
          id="email"
          name="email"
          placeholder="youremail@example.com"
          value={inputs.email}
          onChange={handleChange}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <TextInput 
          labelText="Password"
          id="password"
          name="password"
          type="password"
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
            I agree to the Terms of Service.
          </label>
        </div>
        {errorMessage !== "" && <p className="error">{errorMessage}</p>}
        <button 
          className="btn btn-primary"
          disabled={!tos || inputs.password === "" || inputs.email === ""}
        >
          {status === "loading" ? "Loading . . . " : status === "success" ? "Success!" : "Sign Up"}
        </button>
      </form>
      <p>Already have an account? <Link to="/log-in">Log in here</Link>.</p>
    </div>
  );
}

export default Signup;