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
        <strong>{currentUser.email}</strong>

        <Link to="/update-profile" className="updateProfileLink">
          Update Profile
        </Link>
        <button className="logoutButton" type="link" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <a href="#" className="viewAllQueensButton">
        View All Queens
      </a>
    </div>
  );
}
