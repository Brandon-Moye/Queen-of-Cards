import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); //prevent from refreshing

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="signupFormComponentContainer">
      {error}
      <form onSubmit={handleSubmit} className="formContainer">
        <h1 className="loginPageTitle">Login</h1>
        <div className="emailLabelAndInputContainer">
          <label htmlFor="emailLabel" className="emailLabel">
            email
          </label>
          <input
            className="emailInput"
            ref={emailRef}
            placeholder="bimini@bonboulash.com"
          ></input>
        </div>
        <div className="passwordLabelAndInputContainer">
          <label htmlFor="passwordLabel" className="passwordLabel">
            password
          </label>
          <input
            className="passwordInput"
            ref={passwordRef}
            type="password"
            placeholder="Alyssa's Secret"
          ></input>
        </div>
        <button disabled={loading} type="submit" className="logInButton">
          Login
        </button>
      </form>
      <div className="linksToOtherPagesContainer">
        <div className="signUpFromLoginPage">
          Need an account? Signup here <Link to="/signup">Sign up</Link>{" "}
        </div>
        <div className="forgotPassword">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
