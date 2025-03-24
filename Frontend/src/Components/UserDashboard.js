import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BusinessForm from './BusinessForm';
import BusinessList from './BusinessList';

function SellerDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinesses();
  }, [userId]);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/business/seller/${userId}`);
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to fetch businesses');
    }
  };

  const handleCreate = async (businessData) => {
    try {
      await axios.post(`http://localhost:8080/api/business/create?userId=${userId}`, businessData, {
        withCredentials: true,
      });
      fetchBusinesses();
      setShowForm(false);
      toast.success('Business created successfully!');
    } catch (error) {
      console.error('Error creating business:', error);
      toast.error('Failed to create business: ' + (error.response?.data || error.message));
    }
  };

  const handleUpdate = async (sellerId, businessData) => {
    try {
      await axios.put(`http://localhost:8080/api/business/update/${sellerId}?userId=${userId}`, businessData);
      fetchBusinesses();
      setSelectedBusiness(null);
      toast.success('Business updated successfully!');
    } catch (error) {
      console.error('Error updating business:', error);
      toast.error('Failed to update business: ' + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (sellerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/business/delete/${sellerId}?userId=${userId}`);
      fetchBusinesses();
      setSelectedBusiness(null);
      toast.success('Business deleted successfully!');
    } catch (error) {
      console.error('Error deleting business:', error);
      toast.error('Failed to delete business: ' + (error.response?.data || error.message));
    }
  };

  const handleViewDetails = (business) => {
    setSelectedBusiness(business);
  };

  const handleLogoutClick = () => {
    navigate("/LoginPage");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">WeBuyBusinesses</div>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#listings">Browse Listings</a>
          <a href="#testimonials">Success Stories</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="auth-buttons">
          <button className="logout-btn" onClick={handleLogoutClick}>Log Out</button>
        </div>
      </nav>

      <div className="seller-dashboard">
        <h1>Seller Dashboard</h1>
        
        {!showForm && !selectedBusiness ? (
          <>
            <button 
              className="toggle-form-btn"
              onClick={() => setShowForm(true)}
            >
              Create New Business
            </button>
            <BusinessList 
              businesses={businesses}
              isSeller={true}
              onViewDetails={handleViewDetails}
            />
          </>
        ) : showForm ? (
          <div className="form-wrapper">
            <button 
              className="back-btn"
              onClick={() => setShowForm(false)}
            >
              Back to Dashboard
            </button>
            <BusinessForm 
              onSubmit={handleCreate}
            />
          </div>
        ) : (
          <div className="details-wrapper">
            <button 
              className="back-btn"
              onClick={() => setSelectedBusiness(null)}
            >
              Back to Dashboard
            </button>
            <BusinessDetails 
              business={selectedBusiness} 
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessDetails({ business, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); // New state for delete confirmation

  const handleSubmitUpdate = (businessData) => {
    onUpdate(business.id, businessData);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true); // Show confirmation inline
  };

  const confirmDelete = () => {
    onDelete(business.id);
    setIsConfirmingDelete(false); // Reset after deletion
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false); // Cancel confirmation
  };

  return (
    <div className="business-details-container">
      {isEditing ? (
        <BusinessForm 
          onSubmit={handleSubmitUpdate}
          initialData={business}
        />
      ) : (
        <>
          <h2>{business.businessName}</h2>
          <div className="business-details">
            <p><strong>Category:</strong> {business.category}</p>
            <p><strong>Price:</strong> R{Number(business.price).toLocaleString()}</p>
            <p><strong>Annual Revenue:</strong> R{Number(business.annualRevenue).toLocaleString()}</p>
            <p><strong>Location:</strong> {business.location}</p>
            <p><strong>Trend:</strong> {business.trend}</p>
            <p><strong>Status:</strong> {business.status}</p>
          </div>
          {business.status === 'AVAILABLE' && (
            <div className="business-actions">
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              {isConfirmingDelete ? (
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this business?</p>
                  <button 
                    className="confirm-delete-btn"
                    onClick={confirmDelete}
                  >
                    Yes
                  </button>
                  <button 
                    className="cancel-delete-btn"
                    onClick={cancelDelete}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button 
                  className="delete-btn"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SellerDashboard;