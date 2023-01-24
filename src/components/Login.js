import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
        <h1>Login</h1>
        <label htmlFor="emailInput" className="emailLabel">
          email
        </label>
        <input className="emailInput" ref={emailRef}></input>
        <label htmlFor="passwordInput" className="passwordLabel">
          password
        </label>
        <input className="passwordInput" ref={passwordRef}></input>
        <button disabled={loading} type="submit">
          Login
        </button>
        <div className="signUpFromLoginPage">
          Need an account? Signup here <Link to="/signup">Sign up</Link>{" "}
        </div>
      </form>
    </div>
  );
}
