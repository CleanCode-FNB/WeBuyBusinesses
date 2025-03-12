import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching user dashboard:", error);
        navigate("/login"); // Redirect if unauthorized
      }
    };
    
    fetchUserDashboard();
  }, [navigate]);

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default UserDashboard;
