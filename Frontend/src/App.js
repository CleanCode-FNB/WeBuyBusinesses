import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import here
import LandingPage from './Components/Landingpage';
import LoginPage from './Components/Login';
import RegistrationPage from './Components/Registration';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import ListingForm from "./Components/ListingForm";
import BuyerDashboard from "./Components/BuyerDashboard";
import InquiryForm from "./Components/InquiryForm";
import BusinessDetails from './Components/BusinessDetails'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/list-form" element={<ListingForm />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard/>}/>
        <Route path="/BusinessDetails/" element={<BusinessDetails/>}/>
        <Route path="/inquiry-form"element={<InquiryForm/>}/>
        <Route path="/business-details/:id" element={<BusinessDetails />} />
        <Route path="/BusinessDetails/:id" element={<BusinessDetails />} />
        
        

        
      </Routes>
    </Router>
  );
}

export default App;
