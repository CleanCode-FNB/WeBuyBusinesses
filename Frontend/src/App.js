import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LandingPage from './Components/Landingpage';
import LoginPage from './Components/Login';
import RegistrationPage from './Components/Registration';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import ListingForm from "./Components/ListingForm";
import BuyerDashboard from "./Components/BuyerDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/seller/:userId" element={<UserDashboard />} />
        <Route path="/buyer/:userId" element={<BuyerDashboard/>}/>
        <Route path="/list-form" element={<ListingForm />} />
        

        
      </Routes>
    </Router>
  );
}

export default App;
