import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BusinessDetails.css";

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
    imageUrl: "./Images/techSol",
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

const BusinessDetails = () => {
  const [businesses] = useState(dummyBusinesses);
  const { id } = useParams();
  const navigate = useNavigate();
  const business = dummyBusinesses.find((biz) => biz.id === parseInt(id))

  const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("all");
  
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

  if (!business) return <div className="error-message">Business not found.</div>;

  return (

    <div className="business-details">

      <img src={business.imageUrl} alt={business.name} className="business-image-large" />
      <h2>{business.name}</h2>
      <p><strong>Description:</strong> {business.description}</p>
      <p><strong>Location:</strong> {business.location}</p>
      <p><strong>Price:</strong> R{business.price}</p>
      <p><strong>Type:</strong> {business.type}</p>
      <button 
        className="interested-button" 
        onClick={() => navigate(`/inquiry/${business.id}`)}
      >
        I'm Interested
      </button>
    </div>
  );
};

export default BusinessDetails;
