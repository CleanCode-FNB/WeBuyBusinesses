import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./InquiryForm.css";

const InquiryForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/inquiries", { ...formData, business: { id } })
      .then(() => setSubmitted(true))
      .catch(error => console.error("Error submitting inquiry:", error));
  };

  if (submitted) return <div className="success-message">Inquiry submitted successfully!</div>;

  return (
    <div className="form-container">
      <h3>Express Interest</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input type="text" name="surname" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" required onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
