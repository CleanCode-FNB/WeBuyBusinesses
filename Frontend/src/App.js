import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import BusinessDetailsPage from './BusinessDetailsPage';
import ContactForm from './ContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/business/:id" element={<BusinessDetailsPage />} />
        <Route path="/contact/:businessId" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
