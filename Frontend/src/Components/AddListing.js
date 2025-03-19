import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddListing.css";

const AddListing = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    businessName: "",
    category: "",
    price: "",
    status: "Active",
    location: "",  // Added location field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prevListing) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
  .post("http://localhost:8080/api/listings", listing)

      .post("/api/listings", listing)
      .then(() => {
        navigate("/SellDashboard"); // Redirect after submitting the listing
      })
      .catch((error) => {
        console.error("There was an error submitting the listing!", error);
      });
  };

  return (
    <div className="add-listing-container">
      <h2>Add New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={listing.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={listing.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Retail">Retail</option>
            <option value="Technology">Technology</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Services">Services</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={listing.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={listing.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={listing.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        <button type="submit" className="button submit-button">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
