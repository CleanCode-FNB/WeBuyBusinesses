import React, { useState, useEffect } from 'react'; 
import './BuyerDashboard.css';
import { useNavigate } from "react-router-dom";

const BuyerPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleLoginClick = () => {
    navigate("/LoginPage"); // Navigate to Login page
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Navigate to Sign Up page
  };

  // Filters states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]); // default range: 0 to 10 million

  // Dummy data for businesses
  const dummyBusinesses = [
    { id: 1, name: 'Cafe Delight', category: 'Food & Drink', location: 'New York', price: 300000 },
    { id: 2, name: 'Tech Hub', category: 'Technology', location: 'San Francisco', price: 1000000 },
    { id: 3, name: 'Fitness Center', category: 'Health & Wellness', location: 'Los Angeles', price: 500000 },
    { id: 4, name: 'Fashion Boutique', category: 'Retail', location: 'New York', price: 250000 },
    { id: 5, name: 'Creative Studio', category: 'Art & Design', location: 'San Francisco', price: 750000 },
  ];

  useEffect(() => {
    // Set dummy data as businesses
    setBusinesses(dummyBusinesses);
    setFilteredBusinesses(dummyBusinesses); // Initially set filtered businesses to all businesses

    // Extract unique categories and locations from the data
    const categories = [...new Set(dummyBusinesses.map(business => business.category))];
    const locations = [...new Set(dummyBusinesses.map(business => business.location))];
    setCategories(categories);
    setLocations(locations);
  }, []);

  // Filter businesses based on selected filters
  useEffect(() => {
    let filtered = businesses;

  // Add search term filtering
  if (searchTerm) {
    filtered = filtered.filter(business => 
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter(business => business.category === selectedCategory);
  }

  if (selectedLocation) {
    filtered = filtered.filter(business => business.location === selectedLocation);
  }

  filtered = filtered.filter(
    (business) => business.price >= priceRange[0] && business.price <= priceRange[1]
  );

  setFilteredBusinesses(filtered);
}, [selectedCategory, selectedLocation, priceRange, businesses, searchTerm]); // Add searchTerm to dependencies
  // New function to handle "View Details" button click
  const handleViewBusinessClick = (businessId) => {
    // Make sure this URL matches the route path exactly
    navigate(`/business-details/${businessId}`); 
  };  

  return (
    <div className="buyer-dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">WeBuyBusinesses</div>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#listings">Browse Listings</a>
          <a href="#testimonials">Success Stories</a>
          <a href="#contact">Contact</a> 
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for businesses..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleLoginClick}>Log In</button>
          <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </nav>

      <div className="buy-content"> 
        <h1>Available Businesses for Sale</h1>
        
        {/* Filters Section */}
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="price-range">Price Range</label>
          <input
            type="range"
            id="price-range"
            min="0"
            max="10000000"
            step="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
          />
          <span>${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Business Listings */}
      <div className="business-list">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <div className="business-card" key={business.id}>
              <div className="business-name">{business.name}</div>
              <div className="business-price">${business.price.toLocaleString()}</div>
              <div className="business-location">{business.location}</div>
              {/* Updated button */}
              <button 
                className="view-details-btn" 
                onClick={() => handleViewBusinessClick(business.id)} 
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No businesses match your filters.</p>
        )}
      </div>

      <footer id="contact" className="footer">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">BizExchange</div>
            <p>
              The premier marketplace for buying and selling businesses of all
              sizes and industries.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon facebook"></a>
              <a href="#" className="social-icon twitter"></a>
              <a href="#" className="social-icon linkedin"></a>
              <a href="#" className="social-icon instagram"></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#listings">Browse Listings</a></li>
              <li><a href="#testimonials">Success Stories</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Business Valuation</a></li>
              <li><a href="#">Marketplace Insights</a></li>
              <li><a href="#">Due Diligence Checklist</a></li>
              <li><a href="#">Funding Options</a></li>
              <li><a href="#">Business Transfer Guide</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>19 AM Avenue<br />Braamfontein, Johannesburg 2001</p>
            <p>Email: info@webuybusinesses.com<br />Phone: (555) 123-4567</p>
            <button className="contact-btn">Send Message</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WeBuyBusinesses. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyerPage;
