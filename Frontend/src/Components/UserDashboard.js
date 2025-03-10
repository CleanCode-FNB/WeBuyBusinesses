import React from 'react';
import './UserDashboard.css'; // Add some CSS to style the dashboard

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>WeBuyBusinesses</h2>
        <ul>
          <li>Home</li>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
          <button className="logout-btn">Logout</button>
        </header>
        
        <div className="content">
          <h2>Welcome to your Dashboard!</h2>
          <p>This is where you can manage your account, settings, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
