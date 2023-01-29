import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { auth } from "../Firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [mySelectedQueen, setMySelectedQueen] = useState("");
  const [mySelectedQueens, setMySelectedQueens] = useState([]);
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

  //---------------------

  //READ
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
          setMySelectedQueens([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((mySelectedQueen) => {
              return setMySelectedQueens((prevQueens) => [
                ...prevQueens,
                mySelectedQueen,
              ]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  //WRITE
  const writeToDatabase = () => {
    const uidVariable = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidVariable}`), {
      mySelectedQueen: mySelectedQueen,
      uidVariable: uidVariable,
    });
    setMySelectedQueen("");
  };

  //DELETE
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    console.log(auth.currentUser.uid);
  };

  return (
    <div className="dashboardContainer">
      <div>Profile</div>
      {error}
      <strong>Email:</strong>
      {currentUser.email}
      <Link to="/update-profile" className="updateProfileButton">
        Update Profile
      </Link>
      <button type="link" onClick={handleLogout}>
        Logout
      </button>
      <input
        id="testInputField"
        className="testInputField"
        type="text"
        value={mySelectedQueen}
        onChange={(e) => setMySelectedQueen(e.target.value)}
      ></input>

      <button onClick={writeToDatabase} className="testButton">
        Test Button
      </button>
      {/* <div className="testDbContainer">{testDb}</div> */}
      {mySelectedQueens.map((mySelectedQueen) => (
        <div>
          <h1>{mySelectedQueen.mySelectedQueen}</h1>
          <button onClick={() => handleDelete(mySelectedQueen.uidVariable)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
