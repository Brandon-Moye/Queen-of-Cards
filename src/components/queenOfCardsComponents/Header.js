import "../queenOfCardsComponents/Header.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div className="headerContainer">
      <h1 className="pageTitle">QUEEN OF CARDS</h1>
      <div className="headerProfileInfoUpdateAndLogoutContainer">
        {error}
          <div className="usersCurrentEmail" title={currentUser.email}>{currentUser.email}</div>
        <Link to="/update-profile" className="updateProfileLink">
          <div className="updateProfileLinkText"> Update Profile</div>
          <div className="updateProfileIconContainer">
            <ion-icon
              name="person-circle-outline"
              className="updateProfileIcon"
            ></ion-icon>
          </div>
        </Link>
        <button className="logoutButton" type="link" onClick={handleLogout}>
          <div className="logoutButtonText">Logout</div>
          <div className="logoutButtonContainer">
            <ion-icon name="exit-outline" className="logoutIcon"></ion-icon>
          </div>
        </button>
      </div>
      {/* <a href="#" className="viewAllQueensButton">
        View All Queens
      </a> */}
    </div>
  );
}
