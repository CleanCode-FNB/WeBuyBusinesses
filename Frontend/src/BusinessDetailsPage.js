import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BusinessDetailsPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    // Simulate fetching detailed information for the selected business
    const fetchBusinessDetails = async () => {
      const businessDetails = {
        1: { name: "Business A", description: "A profitable business located downtown", price: "$100,000", details: "Additional business details about Business A." },
        2: { name: "Business B", description: "An established restaurant with loyal customers", price: "$200,000", details: "Additional business details about Business B." },
        3: { name: "Business C", description: "A tech startup with growth potential", price: "$500,000", details: "Additional business details about Business C." },
      };
      setBusiness(businessDetails[id]);
    };

    fetchBusinessDetails();
  }, [id]);

  return (
    <div>
      {business ? (
        <div>
          <h1>{business.name}</h1>
          <p>{business.description}</p>
          <p><strong>Price:</strong> {business.price}</p>
          <p><strong>Details:</strong> {business.details}</p>
          <Link to={`/contact/${id}`}>
            <button>I'm Interested! Contact Seller</button>
          </Link>
        </div>
      ) : (
        <p>Loading business details...</p>
      )}
    </div>
  );
};

export default BusinessDetailsPage;
