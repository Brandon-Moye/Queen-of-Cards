import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); //prevent from refreshing

    if (passwordRef.current.value !== passwordConfimRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="signupFormComponentContainer">
      {error}
      <form onSubmit={handleSubmit} className="formContainerForSignup">
        <h1 className="signupPageTitle">Signup</h1>
        <div className="emailLabelAndInputContainerForSignup">
          <label htmlFor="emailInput" className="emailLabelForSignup">
            email
          </label>
          <input
            className="emailInputForSignup"
            ref={emailRef}
            placeholder="ru@paul.com"
          ></input>
        </div>
        <div className="passwordLabelAndInputContainerForSignup">
          <label htmlFor="passwordInput" className="passwordLabelForSignup">
            password
          </label>
          <input
            className="passwordInputForSignup"
            ref={passwordRef}
            type="password"
          ></input>
        </div>
        <div className="passwordConfirmLabelAndInputContainerForSignup">
          <label
            htmlFor="passwordConfirmInput"
            className="passwordConfirmLabelForSignup"
          >
            confirm password
          </label>
          <input
            className="passwordConfirmInputForSignup"
            ref={passwordConfimRef}
            type="password"
          ></input>
        </div>
        <button disabled={loading} type="submit" className="signupButton">
          Signup
        </button>
      </form>
      <div className="linksToOtherPagesContainerForSignup">
        Already have an account?{" "}
        <Link to="/login" className="linkToOtherPage">
          Login
        </Link>
      </div>
    </div>
  );
}
