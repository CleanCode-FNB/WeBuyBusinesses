import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Registration.css'


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    surname: "",
    role: "USER"
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(  "http://localhost:8080/api/auth/register",
        formData,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      setSuccessMessage(response.data || "Registration successful! You can now log in.");
      // Optional: Automatically redirect to login page after successful registration
      setTimeout(() => navigate("/LoginPage"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred during registration. Please try again.");
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-navbar">
        <div className="logo" onClick={() => navigate("/")}>WeBuyBusinesses</div>
        <div className="auth-options">
          <span>Already have an account?</span>
          <button className="signup-btn" onClick={() => navigate("/LoginPage")}>Log In</button>
        </div>
      </div>

      <div className="login-content">
        <div className="login-container">
          <div className="login-card">
            <h1>Create Account</h1>
            <p className="login-subtitle">Sign up to access business listings and connect with buyers and sellers</p>
            
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="name">First Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="First name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="surname">Last Name</label>
                  <input
                    type="text"
                    id="surname"
                    placeholder="Last name"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Account Type</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="USER">Business Buyer/Seller</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">I agree to the Terms & Privacy Policy</label>
                </div>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            
            <div className="login-divider">
              <span>or sign up with</span>
            </div>
            
            <div className="social-login">
              <button className="social-btn google">
                <div className="social-icon google-icon"></div>
                Google
              </button>
              <button className="social-btn linkedin">
                <div className="social-icon linkedin-icon"></div>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
        
        <div className="login-image">
          <div className="login-overlay">
            <h2>Join Our Business Marketplace</h2>
            <p>Create an account to discover business opportunities and connect with a community of serious entrepreneurs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;