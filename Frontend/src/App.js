import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyerPage from "./Components/BuyerPage";
import BusinessDetails from "./Components/BusinessDetails";
import InquiryForm from "./Components/InquiryForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/inquiry/:id" element={<InquiryForm />} />
      </Routes>
    </Router>
  );
}

export default App;

