// components/BusinessList.js
import React from 'react';
import BusinessForm from './BusinessForm';
import './UserDashboard.css'



function BusinessList({ businesses, isSeller, onViewDetails, onCardClick }) {
  const handleViewDetails = (business) => {
    if (onViewDetails) {
      onViewDetails(business);
    }
  };

  return (
    <div className="business-list">
      <h2>{isSeller ? 'Your Listings' : 'Available Businesses'}</h2>
      <div className="listings-grid">
        {businesses.map(business => (
          <div 
            key={business.id} 
            className="listing-card"
            onClick={() => !isSeller && onCardClick && onCardClick(business)} // Card click for buyers
          >
            {business.status === 'Hot' && (
              <div className="listing-badge">{business.status}</div>
            )}
            <div className={`listing-image ${business.category.toLowerCase().replace(' & ', '-')}`}></div>
            <div className="listing-content">
              <h3>{business.businessName}</h3>
              <p className="listing-location">{business.location}</p>
              <p className="listing-price">${Number(business.price).toLocaleString()}</p>
              <p className="listing-revenue">Annual Revenue: ${Number(business.annualRevenue).toLocaleString()}</p>
              {isSeller && (
                <button 
                  className="view-listing-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    handleViewDetails(business);
                  }}
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessList;