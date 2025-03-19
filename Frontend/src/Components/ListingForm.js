import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css'

const Listing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    price: '',
    annualRevenue: '',
    status: 'Active',
    location: '',
    trend: 'Stable',
    description: ''
  });

  const createListing = async (listingData) => {
    const userId = localStorage.getItem("userId");
    
    console.log(userId); 
    
    const response = await fetch(`http://localhost:8080/api/sellers/create/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingData),
    });
    const data = await response.json();
    console.log(data);
};

const fetchUserListings = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:8080/api/sellers/user/${userId}`);
    const data = await response.json();
    console.log(data);
};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const categoryOptions = [
    'Retail', 'Food & Beverage', 'Technology', 'Service', 
    'Manufacturing', 'Healthcare', 'Education', 'Entertainment', 'Other'
  ];
  
  const statusOptions = ['Active', 'Pending', 'Sold', 'Under Review'];
  const trendOptions = ['Up', 'Stable', 'Down'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) 
      newErrors.price = 'Price must be a positive number';
    
    if (!formData.annualRevenue) newErrors.annualRevenue = 'Annual revenue is required';
    else if (isNaN(formData.annualRevenue) || parseFloat(formData.annualRevenue) < 0) 
      newErrors.annualRevenue = 'Annual revenue must be a non-negative number';
    
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    const submission = {
      ...formData,
      price: parseFloat(formData.price),
      annualRevenue: parseFloat(formData.annualRevenue),
    };
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to create a listing.");
      setIsSubmitting(false);
      return;
    }

    axios.post(`http://localhost:8080/api/sellers/create/${userId}`, submission)
      .then((response) => {
        setIsSubmitting(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('There was an error creating the listing!', error);
        setIsSubmitting(false);
        setErrors({ submit: 'Failed to create listing. Please try again.' });
      });
  };

  const nextStep = () => {
    if (step === 1) {
      const validationErrors = validateFirstStep();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const validateFirstStep = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    return newErrors;
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
      <div className="step-line"></div>
      <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
      <div className="step-line"></div>
      <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
    </div>
  );

  const renderStepOne = () => (
    <div className="form-step">
      <h3>Basic Information</h3>
      <div className="form-group">
        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          className={errors.businessName ? 'input-error' : ''}
        />
        {errors.businessName && <p className="error-message">{errors.businessName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={errors.category ? 'input-error' : ''}
        >
          <option value="">Select a category</option>
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.category && <p className="error-message">{errors.category}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className={errors.location ? 'input-error' : ''}
        />
        {errors.location && <p className="error-message">{errors.location}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Business Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="form-step">
      <h3>Financial Details</h3>
      <div className="form-group">
        <label htmlFor="price">Asking Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={errors.price ? 'input-error' : ''}
          min="0"
          step="1000"
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="annualRevenue">Annual Revenue ($)</label>
        <input
          type="number"
          id="annualRevenue"
          name="annualRevenue"
          value={formData.annualRevenue}
          onChange={handleInputChange}
          className={errors.annualRevenue ? 'input-error' : ''}
          min="0"
          step="1000"
        />
        {errors.annualRevenue && <p className="error-message">{errors.annualRevenue}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="trend">Revenue Trend</label>
        <div className="trend-options">
          {trendOptions.map(option => (
            <div key={option} className="trend-option">
              <input
                type="radio"
                id={`trend-${option}`}
                name="trend"
                value={option}
                checked={formData.trend === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`trend-${option}`} className={`trend-label trend-${option.toLowerCase()}`}>
                {option === 'Up' && '↗️'} 
                {option === 'Stable' && '→'} 
                {option === 'Down' && '↘️'} 
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="form-step">
      <h3>Status & Review</h3>
      <div className="form-group">
        <label htmlFor="status">Listing Status</label>
        <div className="status-options">
          {statusOptions.map(option => (
            <div key={option} className="status-option">
              <input
                type="radio"
                id={`status-${option}`}
                name="status"
                value={option}
                checked={formData.status === option}
                onChange={handleInputChange}
              />
              <label 
                htmlFor={`status-${option}`} 
                className={`status-label status-${option.toLowerCase().replace(' ', '-')}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="review-summary">
        <h4>Review Your Listing</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Business Name:</span>
            <span className="review-value">{formData.businessName}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Category:</span>
            <span className="review-value">{formData.category}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Location:</span>
            <span className="review-value">{formData.location}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Price:</span>
            <span className="review-value">${parseFloat(formData.price).toLocaleString()}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Annual Revenue:</span>
            <span className="review-value">${parseFloat(formData.annualRevenue).toLocaleString()}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Revenue Trend:</span>
            <span className="review-value">{formData.trend}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Status:</span>
            <span className="review-value">{formData.status}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="listing-page-container">
      <div className="listing-form-container">
        <div className="listing-form-header">
          <h2>Create a Business Listing</h2>
          <p>Complete the form below to add your business to our marketplace</p>
          {renderStepIndicator()}
        </div>

        <form onSubmit={handleSubmit} className="multi-step-form">
          {step === 1 && renderStepOne()}
          {step === 2 && renderStepTwo()}
          {step === 3 && renderStepThree()}

          {errors.submit && <p className="submit-error">{errors.submit}</p>}

          <div className="form-navigation">
            {step > 1 && (
              <button 
                type="button" 
                onClick={previousStep}
                className="back-btn"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="next-btn"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Listing'}
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="listing-form-sidebar">
        <div className="form-tips">
          <h3>Tips for a Great Listing</h3>
          <ul>
            <li>Be accurate with financial details</li>
            <li>Provide a detailed description</li>
            <li>Choose the right category</li>
            <li>Set a competitive asking price</li>
            <li>Keep your listing updated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Listing;