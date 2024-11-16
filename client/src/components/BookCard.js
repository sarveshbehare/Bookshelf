import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const navigate = useNavigate();

  const handleContactSeller = () => {
    navigate(`/contact-seller/${book.id}`);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ₹{book.price}</p>
      <p>Condition: {book.book_condition}</p>
      <button className="contact-btn" onClick={handleContactSeller}>
        Contact Seller
      </button>
    </div>
  );
}

export default BookCard;