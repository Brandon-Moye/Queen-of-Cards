import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { auth } from "../Firebase";
import { uid } from "uid";
import {
  getDatabase,
  set,
  ref,
  onValue,
  DataSnapshot,
} from "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [testDb, setTestDb] = useState([]);
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

  function testAddToDb() {
    let testObjectInputValue = document.getElementById("testInputField").value;
    const testObject = testObjectInputValue;

    setTestDb((prevTest) => [...prevTest, testObject]);
    return console.log(testDb);
    // const inputTestValue = document.getElementById("testInputField").value;
    // console.log(testAddToDb);

    // return testDb.push([inputTestValue]);
    // --------------
    // const reactDbTest = getDatabase();
    // set(ref(db, "users/" + userId), {
    //   testDb,
    // });
  }
  //---------------------
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  //read
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uidVariable = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidVariable}`), {
      todo: todo,
      uid: uidVariable,
    });
    setTodo("");
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
        onChange={handleTodoChange}
      ></input>

      <button onClick={writeToDatabase} className="testButton">
        Test Button
      </button>
      {/* <div className="testDbContainer">{testDb}</div> */}
      {todos.map((todo) => (
        <div>
          <h1>{todo.todo}</h1>
        </div>
      ))}
    </div>
  );
}
