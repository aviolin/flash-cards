import React, { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link, useHistory } from 'react-router-dom';
import PageHeading from '../components/new/PageHeading';
import TextInput from '../components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';

import useAuth from '../hooks/useAuth';

const Signup = () => {
  const [tos, setTos] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const history = useHistory();

  const { userData, status, error, handleSignup} = useAuth(inputs.email, inputs.password);
  const { user } = useContext(firebaseAuth);

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
    if (error === null) {
      setErrorMessage("");
      return;
    }

    switch (error.code) {
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

  }, [error])

  return (
    <>
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
            I agree to the <Link to="/tos">Terms of Service</Link>.
          </label>
        </div>
        {errorMessage === "" ? null :
          <p className="error">{errorMessage}</p> 
        }
        <button 
          className="btn btn-primary"
          disabled={!tos || inputs.password === "" || inputs.email === ""}
        >
          {status === "loading" ? "Loading . . . " : status === "success" ? "Success!" : "Sign Up"}
        </button>
        
      </form>
      <p>Already have an account? <Link to="/log-in">Log in here</Link>.</p>
    </>
  )
}

export default Signup;