import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
        const { token, role } = response.data;
        console.log("Full Response:", response);

      
    console.log("Token:", token);  // Check if the token is received
    console.log("Role:", role);    // Check if the role is received

    // Save token and role in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);


        // Redirect based on role
        if (role === "ADMIN") {
            navigate("/admin-dashboard"); 
        } else if (role === "USER") {
            navigate("/user-dashboard"); 
        }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid username or password");
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-navbar">
        <div className="logo" onClick={() => navigate("/")}>WeBuyBusinesses</div>
        <div className="auth-options">
          <span>New to WeBuyBusinesses?</span>
          <button className="signup-btn" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>
      </div>

      <div className="login-content">
        <div className="login-container">
          <div className="login-card">
            <h1>Welcome Back</h1>
            <p className="login-subtitle">Log in to access your WeBuyBusinesses account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="/forgot-password" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
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
            <h2>Find Your Perfect Business Match</h2>
            <p>
              Log in to access thousands of business listings and connect with serious buyers and sellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
