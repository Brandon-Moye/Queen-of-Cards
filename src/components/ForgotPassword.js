import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

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
    <div className="entireFormContainerForPasswordReset">
      {error}
      {message}
      <form onSubmit={handleSubmit} className="formContainerForPasswordReset">
        <h1 className="resetPasswordPageTitle">Password Reset</h1>
        <div className="emailLabelAndInputContainerForPasswordReset">
          <label htmlFor="emailInput" className="emailLabelForPasswordReset">
            email
          </label>

          <input
            className="emailInputForPasswordReset"
            ref={emailRef}
            placeholder="bob@thedragqueen.com"
          ></input>
        </div>
        <button
          className="resetPasswordButton"
          disabled={loading}
          type="submit"
        >
          Reset Password
        </button>
      </form>
      <div className="linksToOtherPageContainerForPasswordReset">
        <div className="signUpFromLoginPageLink">
          Need an account?{" "}
          <Link to="/signup" className="linksToOtherPageFromPasswordReset">
            Sign up
          </Link>{" "}
        </div>
        <div>
          Have an account?{" "}
          <Link to="/login" className="linksToOtherPageFromPasswordReset">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
