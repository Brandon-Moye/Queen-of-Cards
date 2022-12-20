import React from "react";
import Signup from "./Signup";
import AuthProvider from "../components/context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className="signupComponentContainer">
        <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
