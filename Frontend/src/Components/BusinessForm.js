import React, { useState } from 'react';
import './BusinessForm.css';


function BusinessForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    businessName: initialData.businessName || '',
    category: initialData.category || '',
    price: initialData.price || '',
    annualRevenue: initialData.annualRevenue || '',
    location: initialData.location || '',
    trend: initialData.trend || ''
  });

  const businessCategories = [
    'Technology',
    'Retail',
    'Food & Beverage',
    'Healthcare',
    'Manufacturing',
    'Services',
    'Construction',
    'Education',
    'Entertainment',
    'Other'
  ];

  const revenueTrends = [
    { label: 'Going Up 📈', value: 'up' },
    { label: 'Stable ➡️', value: 'stable' },
    { label: 'Going Down 📉', value: 'down' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      trend: formData.trend
    };
    onSubmit(submitData);
  };

  const handleClear = () => {
    setFormData({
      businessName: '',
      category: '',
      price: '',
      annualRevenue: '',
      location: '',
      trend: ''
    });
  };

  return (
    <div className="business-form-container">
      <h2>Create New Business Listing</h2>
      <form onSubmit={handleSubmit} className="business-form">
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            name="businessName"
            id="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {businessCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            name="price"
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter asking price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="annualRevenue">Annual Revenue ($)</label>
          <input
            name="annualRevenue"
            id="annualRevenue"
            type="number"
            value={formData.annualRevenue}
            onChange={handleChange}
            placeholder="Enter annual revenue"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trend">Revenue Trend</label>
          <select
            name="trend"
            id="trend"
            value={formData.trend}
            onChange={handleChange}
            required
          >
            <option value="">Select a trend</option>
            {revenueTrends.map((trend) => (
              <option key={trend.value} value={trend.value}>
                {trend.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button 
            type="button" 
            className="submit-btn" // Using same class as submit
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default BusinessForm;
