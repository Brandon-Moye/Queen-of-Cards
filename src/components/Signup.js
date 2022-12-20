import React, { useRef } from "react";
import { useAuth } from "../components/context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();

  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    signup(emailRef.current.value, passwordRef.current.value);
  }
  return (
    <div className="signupFormComponentContainer">
      <form className="formContainer">
        <h1>Signup</h1>
        <label for="emailInput" className="emailLabel">
          email
        </label>
        <input className="emailInput" ref={emailRef}></input>
        <label for="passwordInput" className="passwordLabel">
          password
        </label>
        <input className="passwordInput" ref={passwordRef}></input>
        <label for="passwordConfirmInput" className="passwordConfirmLabel">
          email
        </label>
        <input className="passwordConfirmInput" ref={passwordConfimRef}></input>
        <button>Signup</button>
      </form>
    </div>
  );
}
