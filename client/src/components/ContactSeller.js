import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ContactSeller() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/books/${bookId}/seller`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setSeller(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [bookId]);

  if (loading) {
    return <div className="contact-seller-container">Loading...</div>;
  }

  return (
    <div className="contact-seller-container">
      <div className="contact-seller-card">
        <h2>Seller Information</h2>
        {seller ? (
          <div className="seller-details">
            <p><strong>Name:</strong> {seller.name}</p>
            <p><strong>Roll Number:</strong> {seller.roll_number}</p>
            <p><strong>Contact Email:</strong> {seller.email}</p>
          </div>
        ) : (
          <p>Seller information not available</p>
        )}
        <Link to="/" className="back-button">Back to Books</Link>
      </div>
    </div>
  );
}

export default ContactSeller;