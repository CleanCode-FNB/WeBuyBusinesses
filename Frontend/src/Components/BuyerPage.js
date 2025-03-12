import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerPage.css";

const dummyBusinesses = [
  {
    id: 1,
    name: "Cafe Delight",
    location: "KwaZulu-Natal, KZN",
    type: "Restaurant",
    price: 50000,
    imageUrl: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Tech Solutions",
    location: "Western Cape, WC",
    type: "IT Services",
    price: 120000,
    imageUrl: "./Images/techSol.png",
  },
  {
    id: 3,
    name: "Green Grocers",
    location: "Johannesburg, JHB",
    type: "Grocery Store",
    price: 75000,
    imageUrl: "https://via.placeholder.com/300"
  }
];

const BuyerPage = () => {
  const [businesses] = useState(dummyBusinesses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationFilter = (e) => {
    setSelectedLocation(e.target.value);
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === "all" || business.location.includes(selectedLocation))
  );

  return (
    <div className="main-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>←</button>

      <nav className="navbar">
        <h1 className="logo">WeBuyBusinesses</h1>
        <div className="nav-links">
          <input 
            type="text" 
            placeholder="Search businesses..." 
            className="search-bar" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <select className="category-select">
            <option value="all">All Categories</option>
            <option value="restaurant">Restaurant</option>
            <option value="it-services">IT Services</option>
            <option value="retail">Retail</option>
          </select>
          <select className="location-select" onChange={handleLocationFilter}>
            <option value="all">All Locations</option>
            <option value="KwaZulu-Natal, KZN">KwaZulu-Natal, KZN</option>
            <option value="Western Cape, WC">Western Cape, WC</option>
            <option value="Johannesburg, JHB">Johannesburg, JHB</option>
          </select>
        </div>
      </nav>
      
      <header>
        <h1>Explore Businesses for Sale</h1>
      </header>
      
      <div className="business-listing">
        {filteredBusinesses.map(business => (
          <div key={business.id} className="business-card">
            <img src={business.imageUrl} alt={business.name} className="business-image" />
            <div className="business-content">
              <h2 className="business-name">{business.name}</h2>
              <p className="business-info"><strong>Location:</strong> {business.location}</p>
              <p className="business-info"><strong>Type:</strong> {business.type}</p>
              <p className="business-price">R{business.price}</p>
              <button 
                className="more-info-button" 
                onClick={() => navigate(`/business/${business.id}`)}
              >
                More Info
              </button>
              <button className="interested-button">I'm Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;

