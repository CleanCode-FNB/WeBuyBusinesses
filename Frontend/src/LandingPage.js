import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    // Simulate fetching businesses from the backend
    const fetchBusinesses = async () => {
      // Example businesses
      const fetchedBusinesses = [
        { id: 1, name: "Business A", description: "A profitable business located downtown", price: "$100,000" },
        { id: 2, name: "Business B", description: "An established restaurant with loyal customers", price: "$200,000" },
        { id: 3, name: "Business C", description: "A tech startup with growth potential", price: "$500,000" },
      ];
      setBusinesses(fetchedBusinesses);
    };

    fetchBusinesses();
  }, []);

  return (
    <div>
      <h1>Businesses for Sale</h1>
      <div>
        {businesses.map((business) => (
          <div key={business.id} className="business-card">
            <h3>{business.name}</h3>
            <p>{business.description}</p>
            <p><strong>Price:</strong> {business.price}</p>
            <Link to={`/business/${business.id}`}>
              <button>More Information</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
