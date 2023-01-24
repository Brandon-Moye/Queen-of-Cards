import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(); //prevent from refreshing

    if (passwordRef.current.value !== passwordConfimRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      // promises.push(updateEmail(emailRef.current.value));
      //it can retrieve the new email, something is wrong with either the
      //update email function or the way I am pushing it into the function
      console.log(emailRef.current.value);
    }
    if (passwordRef.current.value) {
      // promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => setError("Failed to update account"))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="signupFormComponentContainer">
      {error}
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>Update Profile</h1>
        <label htmlFor="emailInput" className="emailLabel">
          email
        </label>
        <input
          className="emailInput"
          ref={emailRef}
          required
          defaultValue={currentUser.email}
        ></input>
        <label htmlFor="passwordInput" className="passwordLabel">
          password
        </label>
        <input
          className="passwordInput"
          ref={passwordRef}
          placeholder="Leave blank to keep the same"
        ></input>
        <label htmlFor="passwordConfirmInput" className="passwordConfirmLabel">
          password confirm
        </label>
        <input
          className="passwordConfirmInput"
          ref={passwordConfimRef}
          placeholder="Leave blank to keep the same"
        ></input>
        <button disabled={loading} type="submit">
          Update
        </button>
        <div className="loginFromSignupPage">
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
