import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellDashboard.css";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings when the component mounts
    axios
      .get("/api/listings")
      .then((response) => {
        setListings(response.data); // Update the state with fetched listings
      })
      .catch((error) => {
        console.error("There was an error fetching the listings!", error);
      });
  }, []);

  const handleAddListing = () => {
    navigate("/add-listing");
  };

  const openEditModal = (listing) => {
    navigate(`/edit-listing/${listing.id}`);
    setEditingListing(listing);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingListing(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update the listing here (e.g., call API)
    console.log("Updated Listing:", editingListing);
    closeModal(); // Close modal after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingListing((prevListing) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">WeBuyBusinesses</div>
        <div className="nav-links">
          <a href="/marketplace">Marketplace</a>
          <a href="/messages">Messages</a>
          <a href="/profile">Profile</a>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Seller Menu</h3>
          <ul>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/listings")}>My Listings</li>
            <li onClick={() => navigate("/transactions")}>Transactions</li>
            <li onClick={() => navigate("/settings")}>Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2>Seller Dashboard</h2>
          <button className="button add-new-listing" onClick={handleAddListing}>
            Add New Listing
          </button>

          {/* Listings as Cards */}
          <div className="listing-cards">
            {listings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <h3>{listing.businessName}</h3>
                <p>
                  <strong>Category:</strong> {listing.category}
                </p>
                <p>
                  <strong>Price:</strong> {listing.price}
                </p>
                <p>
                  <strong>Status:</strong> {listing.status}
                </p>
                <p>
                  <strong>Location:</strong> {listing.location}
                </p>
                <div className="card-actions">
                  <button
                    className="button edit-button"
                    onClick={() => openEditModal(listing)}
                  >
                    Edit
                  </button>
                  <button className="button delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal for Editing Listing */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Listing</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={editingListing.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={editingListing.category}
                  onChange={handleChange}
                  required
                >
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
                  value={editingListing.price}
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
                  value={editingListing.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={editingListing.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="button cancel-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="button save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
