import React, { useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  const { currentUser, userUpdatePassword, userUpdateEmail } = useAuth();
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
      promises.push(userUpdateEmail(emailRef.current.value));
      console.log(emailRef.current.value);
      //it can retrieve the new email, something is wrong with either the
      //update email function or the way I am pushing it into the function
    }
    if (passwordRef.current.value) {
      promises.push(userUpdatePassword(passwordRef.current.value));
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
      <form onSubmit={handleSubmit} className="formContainerUpdateProfile">
        <h1 className="updateProfilePageTitle">Update Profile</h1>
        <div className="emailLabelAndInputContainerUpdateProfile">
          <label htmlFor="emailInput" className="emailLabelUpdateProfile">
            email
          </label>
          <input
            className="emailInputUpdateProfile"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          ></input>
        </div>
        <div className="passwordLabelAndInputContainerUpdateProfile">
          <label htmlFor="passwordInput" className="passwordLabelUpdateProfile">
            password
          </label>
          <input
            className="passwordInputUpdateProfile"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          ></input>
        </div>
        <div className="passwordConfirmLabelAndInputContainer">
          <label
            htmlFor="passwordConfirmInput"
            className="passwordConfirmLabelUpdateProfile"
          >
            password confirm
          </label>
          <input
            className="passwordConfirmInputUpdateProfile"
            ref={passwordConfimRef}
            placeholder="Leave blank to keep the same"
          ></input>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="updateProfileButton"
        >
          Update
        </button>
      </form>
      <div className="returnToLoginPageCancelLinkContainer">
        <Link className="returnToLoginPageLink" to="/">
          Cancel
        </Link>
      </div>
    </div>
  );
}
