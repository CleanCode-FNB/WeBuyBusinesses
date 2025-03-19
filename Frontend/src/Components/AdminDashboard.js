import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch users and businesses data
        const usersResponse = await axios.get('http://localhost:8080/api/admin/users');
        const businessesResponse = await axios.get('http://localhost:8080/api/admin/businesses');
        
        setUsers(usersResponse.data || []);
        setBusinesses(businessesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Mock data for demonstration
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', createdAt: '2023-01-15', lastLogin: '2023-03-10' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', createdAt: '2023-02-20', lastLogin: '2023-03-15' },
          { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Admin', status: 'Active', createdAt: '2022-11-05', lastLogin: '2023-03-18' },
          { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Inactive', createdAt: '2023-01-28', lastLogin: '2023-02-14' },
          { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'User', status: 'Active', createdAt: '2022-12-10', lastLogin: '2023-03-17' }
        ]);
        
        setBusinesses([
          { id: 1, businessName: 'Tech Solutions Inc.', owner: 'John Doe', category: 'Technology', price: 450000, annualRevenue: 780000, status: 'Active', location: 'New York', trend: 'up', createdAt: '2023-01-20' },
          { id: 2, businessName: 'Healthy Eats Cafe', owner: 'Jane Smith', category: 'Food', price: 180000, annualRevenue: 320000, status: 'Pending', location: 'Los Angeles', trend: 'up', createdAt: '2023-02-15' },
          { id: 3, businessName: 'Fitness First Gym', owner: 'Robert Johnson', category: 'Health', price: 350000, annualRevenue: 540000, status: 'Active', location: 'Chicago', trend: 'down', createdAt: '2022-12-05' },
          { id: 4, businessName: 'Fashion Forward', owner: 'Emily Davis', category: 'Retail', price: 275000, annualRevenue: 490000, status: 'Sold', location: 'Miami', trend: 'up', createdAt: '2023-01-10' },
          { id: 5, businessName: 'Quick Delivery', owner: 'Michael Wilson', category: 'Logistics', price: 520000, annualRevenue: 870000, status: 'Active', location: 'Seattle', trend: 'up', createdAt: '2022-11-28' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    const newDirection = sortBy === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(key);
    setSortDirection(newDirection);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/LoginPage');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // await axios.delete(`http://localhost:8080/api/admin/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleDeleteBusiness = async (businessId) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        // await axios.delete(`http://localhost:8080/api/admin/businesses/${businessId}`);
        setBusinesses(businesses.filter(business => business.id !== businessId));
      } catch (error) {
        console.error("Error deleting business:", error);
      }
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  const handleEditBusiness = (businessId) => {
    navigate(`/admin/businesses/edit/${businessId}`);
  };

  const handleViewUser = (userId) => {
    navigate(`/admin/users/view/${userId}`);
  };

  const handleViewBusiness = (businessId) => {
    navigate(`/admin/businesses/view/${businessId}`);
  };

  const getSortedData = (data) => {
    const filtered = data.filter(item => {
      const searchFields = activeTab === 'users' 
        ? [item.name, item.email, item.role, item.status]
        : [item.businessName, item.owner, item.category, item.location, item.status];
      
      return searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    return filtered.sort((a, b) => {
      let valueA, valueB;
      
      if (activeTab === 'users') {
        valueA = a[sortBy];
        valueB = b[sortBy];
      } else {
        valueA = sortBy === 'name' ? a.businessName : a[sortBy];
        valueB = sortBy === 'name' ? b.businessName : b[sortBy];
      }
      
      if (typeof valueA === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  };

  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'status-badge status-active';
      case 'pending': return 'status-badge status-pending';
      case 'sold': return 'status-badge status-sold';
      case 'inactive': return 'status-badge status-inactive';
      default: return 'status-badge';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend && trend.toLowerCase().includes('up')) return '↗️';
    if (trend && trend.toLowerCase().includes('down')) return '↘️';
    return '→';
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <div className="sidebar-menu">
          <button 
            className={`sidebar-menu-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="menu-icon users-icon">👥</i>
            <span>Users</span>
          </button>
          <button 
            className={`sidebar-menu-item ${activeTab === 'businesses' ? 'active' : ''}`}
            onClick={() => setActiveTab('businesses')}
          >
            <i className="menu-icon business-icon">🏢</i>
            <span>Businesses</span>
          </button>
          <button 
            className="sidebar-menu-item logout"
            onClick={handleLogout}
          >
            <i className="menu-icon logout-icon">🚪</i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="admin-header">
          <h1>{activeTab === 'users' ? 'User Management' : 'Business Management'}</h1>
          <div className="admin-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <i className="search-icon">🔍</i>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : activeTab === 'users' ? (
          <div className="data-table-wrapper">
            <div className="data-summary">
              <div className="summary-card">
                <h4>Total Users</h4>
                <p className="summary-value">{users.length}</p>
              </div>
              <div className="summary-card">
                <h4>Active Users</h4>
                <p className="summary-value">
                  {users.filter(user => user.status === 'Active').length}
                </p>
              </div>
              <div className="summary-card">
                <h4>Admin Users</h4>
                <p className="summary-value">
                  {users.filter(user => user.role === 'Admin').length}
                </p>
              </div>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className="sortable-header">
                    Name {sortBy === 'name' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('email')} className="sortable-header">
                    Email {sortBy === 'email' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('role')} className="sortable-header">
                    Role {sortBy === 'role' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('status')} className="sortable-header">
                    Status {sortBy === 'status' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('createdAt')} className="sortable-header">
                    Registered {sortBy === 'createdAt' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('lastLogin')} className="sortable-header">
                    Last Login {sortBy === 'lastLogin' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getSortedData(users).map((user) => (
                  <tr key={user.id} className="data-row">
                    <td>
                      <div className="name-cell">
                        <div className="avatar">{user.name.charAt(0)}</div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td><span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span></td>
                    <td><span className={getStatusBadgeClass(user.status)}>{user.status}</span></td>
                    <td>{user.createdAt}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn" 
                          onClick={() => handleViewUser(user.id)}
                          title="View User"
                        >
                          👁️
                        </button>
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => handleEditUser(user.id)}
                          title="Edit User"
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <div className="data-summary">
              <div className="summary-card">
                <h4>Total Businesses</h4>
                <p className="summary-value">{businesses.length}</p>
              </div>
              <div className="summary-card">
                <h4>Total Value</h4>
                <p className="summary-value">
                  ${businesses.reduce((sum, business) => sum + business.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="summary-card">
                <h4>Average Revenue</h4>
                <p className="summary-value">
                  ${businesses.length > 0 ? (businesses.reduce((sum, business) => sum + business.annualRevenue, 0) / businesses.length).toLocaleString() : 0}
                </p>
              </div>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('businessName')} className="sortable-header">
                    Business Name {sortBy === 'businessName' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('owner')} className="sortable-header">
                    Owner {sortBy === 'owner' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('category')} className="sortable-header">
                    Category {sortBy === 'category' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('price')} className="sortable-header">
                    Price {sortBy === 'price' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('annualRevenue')} className="sortable-header">
                    Revenue {sortBy === 'annualRevenue' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('status')} className="sortable-header">
                    Status {sortBy === 'status' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th onClick={() => handleSort('location')} className="sortable-header">
                    Location {sortBy === 'location' && (sortDirection === 'asc' ? '↓' : '↑')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getSortedData(businesses).map((business) => (
                  <tr key={business.id} className="data-row">
                    <td>
                      <div className="business-name-cell">
                        <div className="business-avatar">{business.businessName.charAt(0)}</div>
                        <span>{business.businessName}</span>
                      </div>
                    </td>
                    <td>{business.owner}</td>
                    <td><span className="category-pill">{business.category}</span></td>
                    <td className="price-cell">${business.price.toLocaleString()}</td>
                    <td className="revenue-cell">
                      ${business.annualRevenue.toLocaleString()}
                      <span className="trend-indicator">{getTrendIcon(business.trend)}</span>
                    </td>
                    <td><span className={getStatusBadgeClass(business.status)}>{business.status}</span></td>
                    <td>{business.location}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn" 
                          onClick={() => handleViewBusiness(business.id)}
                          title="View Business"
                        >
                          👁️
                        </button>
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => handleEditBusiness(business.id)}
                          title="Edit Business"
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteBusiness(business.id)}
                          title="Delete Business"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;