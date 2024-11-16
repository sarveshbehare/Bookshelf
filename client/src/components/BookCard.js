import React from 'react';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ₹{book.price}</p>
      <p>Condition: {book.book_condition}</p>
      <button className="contact-btn">Contact Seller</button>
    </div>
  );
}

export default BookCard;