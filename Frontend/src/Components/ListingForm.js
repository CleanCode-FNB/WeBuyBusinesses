import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const Listing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    price: '',
    annualRevenue: '',
    status: '',
    location: '',
    trend: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Service', label: 'Service' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: '', label: 'Select a status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Sold', label: 'Sold' },
    { value: 'Under Review', label: 'Under Review' }
  ];

  const trendOptions = [
    { value: '', label: 'Select a trend' },
    { value: 'Up', label: 'Up' },
    { value: 'Stable', label: 'Stable' },
    { value: 'Down', label: 'Down' }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/LoginPage');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Additional validation
    if (parseFloat(formData.price) <= 0 || parseFloat(formData.annualRevenue) <= 0) {
      setError('Price and Annual Revenue must be positive numbers.');
      setIsSubmitting(false);
      return;
    }

    const submission = {
      ...formData,
      price: parseFloat(formData.price),
      annualRevenue: parseFloat(formData.annualRevenue),
      userId: localStorage.getItem("userId")
    };

    const token = localStorage.getItem("token");
    console.log("Submitting data:", submission);
    console.log("Token being sent:", token);

    axios.post('http://localhost:8080/api/sellers/create', submission, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        console.log("Response:", response.data);
        setIsSubmitting(false);
        // Reset form after successful submission
        setFormData({
          businessName: '',
          category: '',
          price: '',
          annualRevenue: '',
          status: '',
          location: '',
          trend: ''
        });
        navigate('/user-dashboard');
      })
      .catch((error) => {
        console.error('Error:', error.response?.data || error.message);
        setError('Failed to create listing: ' + (error.response?.data || error.message));
        setIsSubmitting(false);
      });
  };

  return (
    <div className="listing-page-container">
      <div className="listing-form-container">
        <div className="listing-form-header">
          <h2>Create Business Listing</h2>
          <p>Fill out the details below to list your business</p>
        </div>
        <form onSubmit={handleSubmit} className="multi-step-form">
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="annualRevenue">Annual Revenue ($)</label>
            <input
              type="number"
              id="annualRevenue"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="trend">Trend</label>
            <select
              id="trend"
              name="trend"
              value={formData.trend}
              onChange={handleInputChange}
              required
            >
              {trendOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-navigation">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Listing;
