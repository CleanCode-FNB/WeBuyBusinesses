import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

// Dashboard Component
const Dashboard = () => {
  const [businessListings, setBusinessListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('businessName');
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  // Retrieve user info from local storage
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => 
  {
    const fetchListings = async () => {
      try {
        
        const response = await axios.get('http://localhost:8080/api/sellers/user', {
          headers: {
            Authorization: `Bearer ${token}`
           
          }
        });
        console.log(response);
  
        // Assuming the response contains the list of business listings
        setBusinessListings(response.data);
        setIsLoading(false); // Set loading state to false after the data is fetched
      } catch (error) {
        console.error('Error fetching listings:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };
   

    if (token) {
      fetchListings();
    } else {
      navigate('/LoginPage');
    }
  }, [token, navigate]);

  const handleAddListingClick = () => {
    navigate('/list-form');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/listing/${id}`);
  };

  const handleSort = (key) => {
    const newDirection = sortBy === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(key);
    setSortDirection(newDirection);
  };

  const getSortedListings = () => {
    const filtered = businessListings.filter(listing => 
      listing.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      
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
      default: return 'status-badge';
    }
  };

  const getTrendIcon = (trend) => {
    if (!trend) return '→';
    if (trend.toLowerCase().includes('up')) return '↗️';
    if (trend.toLowerCase().includes('down')) return '↘️';
    return '→';
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/LoginPage');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">WeBuyBusinesses</div>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#listings">Browse Listings</a>
          <a href="#testimonials">Success Stories</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="auth-buttons">
          <span className="user-email">{userEmail}</span>
          <button className="signup-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Business Portfolio</h1>
          <p className="dashboard-subtitle">Manage and monitor your business listings</p>
        </div>
        
        <div className="dashboard-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>
          
          <button onClick={handleAddListingClick} className="add-listing-btn">
            <span className="btn-icon">+</span>
            <span>New Listing</span>
          </button>
        </div>
        
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading listings...</p>
          </div>
        ) : businessListings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No Business Listings Yet</h3>
            <p>Start by adding your first business listing to showcase in the marketplace.</p>
            <button onClick={handleAddListingClick} className="empty-state-btn">
              Create Your First Listing
            </button>
          </div>
        ) : (
          <>
            <div className="listings-summary">
              <div className="summary-card">
                <h4>Total Listings</h4>
                <p className="summary-value">{businessListings.length}</p>
              </div>
              <div className="summary-card">
                <h4>Total Value</h4>
                <p className="summary-value">
                  ${businessListings.reduce((sum, listing) => sum + listing.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="summary-card">
                <h4>Average Revenue</h4>
                <p className="summary-value">
                  ${(businessListings.reduce((sum, listing) => sum + listing.annualRevenue, 0) / businessListings.length || 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="listings-table-wrapper">
              <table className="listings-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('businessName')} className="sortable-header">
                      Business Name {sortBy === 'businessName' && (sortDirection === 'asc' ? '↓' : '↑')}
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
                  {getSortedListings().map((listing) => (
                    <tr key={listing.id} className="listing-row">
                      <td>
                        <div className="business-name-cell">
                          <div className="business-avatar">{listing.businessName.charAt(0)}</div>
                          <span>{listing.businessName}</span>
                        </div>
                      </td>
                      <td><span className="category-pill">{listing.category}</span></td>
                      <td className="price-cell">${listing.price.toLocaleString()}</td>
                      <td className="revenue-cell">
                        ${listing.annualRevenue.toLocaleString()}
                        <span className="trend-indicator">{getTrendIcon(listing.trend)}</span>
                      </td>
                      <td><span className={getStatusBadgeClass(listing.status)}>{listing.status}</span></td>
                      <td>{listing.location}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn" 
                            onClick={() => handleEditClick(listing.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn view-btn"
                            onClick={() => handleViewClick(listing.id)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;