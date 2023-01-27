import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { auth } from "../Firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
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
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              return setTodos((oldArray) => [...oldArray, todo]);
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
      todo: todo,
      uidVariable: uidVariable,
    });
    setTodo("");
  };

  //DELETE
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    console.log(auth.currentUser.uid);
    // console.log(uidVariable);
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
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      ></input>

      <button onClick={writeToDatabase} className="testButton">
        Test Button
      </button>
      {/* <div className="testDbContainer">{testDb}</div> */}
      {todos.map((todo) => (
        <div>
          <h1>{todo.todo}</h1>
          <button onClick={() => handleDelete(todo.uidVariable)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
