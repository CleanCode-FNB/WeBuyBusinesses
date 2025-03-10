import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import here
import LandingPage from './Components/Landingpage';
import LoginPage from './Components/Login';
import RegistrationPage from './Components/Registration';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
