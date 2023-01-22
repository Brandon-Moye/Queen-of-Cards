import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  const { signup } = useAuth();

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
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="signupFormComponentContainer">
      {error}
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>Signup</h1>
        <label htmlFor="emailInput" className="emailLabel">
          email
        </label>
        <input className="emailInput" ref={emailRef}></input>
        <label htmlFor="passwordInput" className="passwordLabel">
          password
        </label>
        <input className="passwordInput" ref={passwordRef}></input>
        <label htmlFor="passwordConfirmInput" className="passwordConfirmLabel">
          password confirm
        </label>
        <input className="passwordConfirmInput" ref={passwordConfimRef}></input>
        <button disabled={loading} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
