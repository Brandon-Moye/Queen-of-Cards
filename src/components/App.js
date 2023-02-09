import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Header from "./queenOfCardsComponents/Header";
import Search from "./queenOfCardsComponents/Search";
import CardDisplay from "./queenOfCardsComponents/CardDisplay";
import ViewAllQueens from "./queenOfCardsComponents/ViewAllQueens";
import { AuthProvider } from "../components/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";

/*commented out CardDisplay due to all the functions and
mapping calls */

function App() {
  return (
    <div className="signupComponentContainer">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Header />
                  {/* <CardDisplay /> */}
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
