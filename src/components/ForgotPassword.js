import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); //prevent from refreshing

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="signupFormComponentContainer">
      {error}
      {message}
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>Password Reset</h1>
        <label htmlFor="emailInput" className="emailLabel">
          email
        </label>
        <input className="emailInput" ref={emailRef}></input>
        <button disabled={loading} type="submit">
          Reset Password
        </button>
      </form>
      <div className="signUpFromLoginPage">
        Need an account? Signup here <Link to="/signup">Sign up</Link>{" "}
      </div>
      <div className="forgotPassword">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
