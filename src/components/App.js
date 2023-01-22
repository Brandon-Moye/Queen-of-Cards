import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { AuthProvider } from "../components/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="signupComponentContainer">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {/* <Signup /> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
