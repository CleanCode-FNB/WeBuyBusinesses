import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessDetails.css';

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    // dummy data for demo purpose
    const dummyBusinessesDetails = {
      1: {
        id: 1,
        name: 'Cafe Delight',
        category: 'Food & Drink',
        location: 'New York',
        price: 300000,
        description: 'A charming cafe located in the heart of downtown New York. Established 5 years ago with a loyal customer base and growing revenue.',
        revenue: 450000,
        profit: 120000,
        employees: 8,
        yearEstablished: 2020,
        reasonForSelling: 'Owner relocating to another state',
        images: ['cafe1.jpg', 'cafe2.jpg', 'cafe3.jpg'],
        amenities: ['Outdoor seating', 'Full kitchen', 'Liquor license', 'Recently renovated'],
        businessHours: 'Monday to Friday: 7am - 7pm, Weekends: 8am - 5pm',
        leaseDetails: '5-year lease with option to renew, $4,500/month',
        sellerFinancing: 'Available for qualified buyers (up to 30%)',
        contactPerson: 'Sarah Johnson',
        contactEmail: 'sarah@cafedeight.com',
        contactPhone: '(555) 123-4567'
      },
      2: {
        id: 2,
        name: 'Tech Hub',
        category: 'Technology',
        location: 'San Francisco',
        price: 1000000,
        description: 'Established IT services company specializing in cloud solutions and managed services for small to medium businesses in the Bay Area.',
        revenue: 1800000,
        profit: 350000,
        employees: 15,
        yearEstablished: 2015,
        reasonForSelling: 'Owner pursuing new ventures',
        images: ['techhub1.jpg', 'techhub2.jpg'],
        amenities: ['Modern office space', 'State-of-the-art equipment', 'Long-term client contracts'],
        businessHours: 'Monday to Friday: 9am - 6pm',
        leaseDetails: '3-year lease with option to renew, $8,500/month',
        sellerFinancing: 'Not available',
        contactPerson: 'Michael Chen',
        contactEmail: 'michael@techhub.com',
        contactPhone: '(555) 987-6543'
      },
      3: {
        id: 3,
        name: 'Fitness Center',
        category: 'Health & Wellness',
        location: 'Los Angeles',
        price: 500000,
        description: 'Fully equipped fitness center with over 500 active members. Located in a high-traffic shopping center with excellent visibility.',
        revenue: 750000,
        profit: 180000,
        employees: 12,
        yearEstablished: 2018,
        reasonForSelling: 'Owner retiring',
        images: ['fitness1.jpg', 'fitness2.jpg', 'fitness3.jpg', 'fitness4.jpg'],
        amenities: ['Group fitness studio', 'Personal training area', 'Locker rooms with showers', 'Juice bar'],
        businessHours: 'Monday to Sunday: 5am - 10pm',
        leaseDetails: '7-year lease with option to renew, $6,200/month',
        sellerFinancing: 'Available for qualified buyers (up to 40%)',
        contactPerson: 'Robert Williams',
        contactEmail: 'robert@lafitness.com',
        contactPhone: '(555) 789-0123'
      },
      4: {
        id: 4,
        name: 'Fashion Boutique',
        category: 'Retail',
        location: 'New York',
        price: 250000,
        description: 'Upscale women\'s clothing boutique in trendy SoHo district. Features curated selection of designer and local brands with strong online presence.',
        revenue: 600000,
        profit: 120000,
        employees: 5,
        yearEstablished: 2019,
        reasonForSelling: 'Owner focusing on wholesale business',
        images: ['boutique1.jpg', 'boutique2.jpg'],
        amenities: ['Prime retail location', 'Custom fixtures included', 'Established social media following'],
        businessHours: 'Monday to Saturday: 10am - 8pm, Sunday: 12pm - 6pm',
        leaseDetails: '4-year lease with option to renew, $7,800/month',
        sellerFinancing: 'Negotiable',
        contactPerson: 'Emma Thompson',
        contactEmail: 'emma@fashionboutique.com',
        contactPhone: '(555) 456-7890'
      },
      5: {
        id: 5,
        name: 'Creative Studio',
        category: 'Art & Design',
        location: 'San Francisco',
        price: 750000,
        description: 'Award-winning design studio with focus on branding and digital marketing. Impressive client roster including several Fortune 500 companies.',
        revenue: 1200000,
        profit: 280000,
        employees: 10,
        yearEstablished: 2016,
        reasonForSelling: 'Partners pursuing separate business interests',
        images: ['studio1.jpg', 'studio2.jpg', 'studio3.jpg'],
        amenities: ['Modern loft workspace', 'High-end equipment included', 'Ongoing client contracts'],
        businessHours: 'Monday to Friday: 9am - 6pm',
        leaseDetails: '5-year lease with option to renew, $5,200/month',
        sellerFinancing: 'Available for qualified buyers (up to 20%)',
        contactPerson: 'David Garcia',
        contactEmail: 'david@creativestudio.com',
        contactPhone: '(555) 234-5678'
      }
    };

    // Simulate API call delay
    setTimeout(() => {
      const businessData = dummyBusinessesDetails[id];
      if (businessData) {
        setBusiness(businessData);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleContactSellerClick = () => {
    alert("Contact form would appear here. In a real app, this would open a contact form or messaging system.");
  };

  if (loading) {
    return <div className="loading">Loading business details...</div>;
  }

  if (!business) {
    return (
      <div className="business-not-found">
        <h2>Business Not Found</h2>
        <p>Sorry, we couldn't find the business you're looking for.</p>
        <button onClick={handleBackClick}>Back to Listings</button>
      </div>
    );
  }

  return (
    <div className="business-details-container">
      <div className="business-details-header">
        <button className="back-button" onClick={handleBackClick}>← Back to Listings</button>
        <h1>{business.name}</h1>
        <div className="business-meta">
          <span className="business-location">{business.location}</span>
          <span className="business-category">{business.category}</span>
          <span className="business-price">${business.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="business-details-grid">
        <div className="business-details-main">
          <div className="business-gallery">
            {/* In a real app, you would display actual images */}
            <div className="business-image-placeholder">
              <div className="image-text">Primary Image</div>
            </div>
            <div className="business-thumbnails">
              {business.images.map((img, index) => (
                <div key={index} className="thumbnail-placeholder">
                  <div className="image-text">Image {index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="business-description">
            <h2>Business Overview</h2>
            <p>{business.description}</p>

            <h2>Key Features</h2>
            <ul className="amenities-list">
              {business.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>

            <h2>Business Hours</h2>
            <p>{business.businessHours}</p>

            <h2>Lease Details</h2>
            <p>{business.leaseDetails}</p>

            <h2>Reason for Selling</h2>
            <p>{business.reasonForSelling}</p>
          </div>
        </div>

        <div className="business-details-sidebar">
          <div className="business-financials">
            <h2>Financial Information</h2>
            <div className="financial-item">
              <span className="label">Asking Price:</span>
              <span className="value">${business.price.toLocaleString()}</span>
            </div>
            <div className="financial-item">
              <span className="label">Annual Revenue:</span>
              <span className="value">${business.revenue.toLocaleString()}</span>
            </div>
            <div className="financial-item">
              <span className="label">Annual Profit:</span>
              <span className="value">${business.profit.toLocaleString()}</span>
            </div>
            <div className="financial-item">
              <span className="label">Established:</span>
              <span className="value">{business.yearEstablished}</span>
            </div>
            <div className="financial-item">
              <span className="label">Employees:</span>
              <span className="value">{business.employees}</span>
            </div>
            <div className="financial-item">
              <span className="label">Seller Financing:</span>
              <span className="value">{business.sellerFinancing}</span>
            </div>
          </div>

          <div className="contact-seller">
            <h2>Contact Seller</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="label">Contact Person:</span>
                <span className="value">{business.contactPerson}</span>
              </div>
              <div className="contact-item">
                <span className="label">Email:</span>
                <span className="value">{business.contactEmail}</span>
              </div>
              <div className="contact-item">
                <span className="label">Phone:</span>
                <span className="value">{business.contactPhone}</span>
              </div>
            </div>
            <button className="contact-button" onClick={handleContactSellerClick}>
              Contact Seller
            </button>
            <div className="schedule-viewing">
              <button className="schedule-button">Schedule Viewing</button>
            </div>
          </div>

          <div className="similar-businesses">
            <h2>Similar Businesses</h2>
            <div className="similar-business-card">
              <div className="similar-business-name">Similar Business 1</div>
              <div className="similar-business-price">$425,000</div>
              <button className="view-button">View</button>
            </div>
            <div className="similar-business-card">
              <div className="similar-business-name">Similar Business 2</div>
              <div className="similar-business-price">$380,000</div>
              <button className="view-button">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;