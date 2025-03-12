import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
        navigate("/login"); // Redirect if unauthorized
      }
    };
    
    fetchAdminDashboard();
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
