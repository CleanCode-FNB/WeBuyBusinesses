import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import BusinessList from './BusinessList';
import './BuyerDashboard.css';

function BuyerDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/business/available');
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to fetch businesses');
    }
  };

  const handleCardClick = (business) => {
    setSelectedBusiness(business);
  };

  const handleOfferSubmit = async (businessId, offeredPrice) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/business/buy?userId=${userId}`,
        { sellerId: businessId, offeredPrice: parseFloat(offeredPrice) },
        { withCredentials: true }
    );
 
    if (response.status === 202) {
        toast.info(response.data);
        return;
    }
 
    fetchBusinesses();
    setSelectedBusiness(null);
    toast.success('Business purchased successfully! It has been marked as SOLD.');
    } catch (error) {
      console.error('Error buying business:', error);
      toast.error('Failed to purchase business: ' + (error.response?.data || error.message));
    }
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

      <div className="buyer-dashboard">
        <h1>Buyer Dashboard</h1>
        {selectedBusiness ? (
          <OfferForm 
            business={selectedBusiness}
            onSubmit={handleOfferSubmit}
            onCancel={() => setSelectedBusiness(null)}
          />
        ) : (
          <BusinessList 
            businesses={businesses}
            onCardClick={handleCardClick}
            isSeller={false}
          />
        )}
      </div>
    </div>
  );
}

function OfferForm({ business, onSubmit, onCancel }) {
  const [offeredPrice, setOfferedPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(business.id, offeredPrice);
  };

  return (
    <div className="offer-form-container">
      <h2>Make an Offer for {business.businessName}</h2>
      <div className="business-details">
        <p><strong>Asking Price:</strong> R{Number(business.price).toLocaleString()}</p>
        <p><strong>Annual Revenue:</strong> R{Number(business.annualRevenue).toLocaleString()}</p>
        <p><strong>Location:</strong> {business.location}</p>
        <p><strong>Category:</strong> {business.category}</p>
      </div>
      <form onSubmit={handleSubmit} className="offer-form">
        <div className="form-group">
          <label htmlFor="offeredPrice">Your Offer (R)</label>
          <input
            type="number"
            id="offeredPrice"
            value={offeredPrice}
            onChange={(e) => setOfferedPrice(e.target.value)}
            placeholder="Enter your offer"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Offer</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default BuyerDashboard;