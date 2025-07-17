import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Onboarding from "./pages/Onboarding/Onboarding";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />        {/* Landing page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />      {/* Single SignUp route */}
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
