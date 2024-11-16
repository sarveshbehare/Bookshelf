import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ContactSeller() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
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
        setBookData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div className="contact-seller-container">Loading...</div>;
  }

  return (
    <div className="contact-seller-container">
      <div className="contact-seller-card">
        <h2>Book and Seller Information</h2>
        {bookData ? (
          <>
            <div className="book-details">
              <h3>Book Details</h3>
              <p><strong>Title:</strong> {bookData.title}</p>
              <p><strong>Author:</strong> {bookData.author}</p>
              <p><strong>Price:</strong> ₹{bookData.price}</p>
              <p><strong>Condition:</strong> {bookData.book_condition}</p>
            </div>
            <div className="seller-details">
              <h3>Seller Details</h3>
              <p><strong>Name:</strong> {bookData.name}</p>
              <p><strong>Roll Number:</strong> {bookData.roll_number}</p>
              <p><strong>Contact Email:</strong> {bookData.email}</p>
            </div>
          </>
        ) : (
          <p>Information not available</p>
        )}
        <Link to="/" className="back-button">Back to Books</Link>
      </div>
    </div>
  );
}

export default ContactSeller;