import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    book_condition: 'New'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      // Log the data being sent for debugging
      console.log('Sending book data:', {
        ...formData,
        seller_id: user.id,
        price: parseFloat(formData.price)
      });

      const response = await axios.post(
        'http://localhost:5000/api/books',
        {
          ...formData,
          seller_id: user.id,
          price: parseFloat(formData.price)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Server response:', response.data);
      alert('Book listed successfully!');
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      alert(`Failed to list book: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <div className="sell-book-container">
      <div className="sell-book-form">
        <h2>Sell Your Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
            min="0"
            step="0.01"
          />
          <select
            value={formData.book_condition}
            onChange={(e) => setFormData({...formData, book_condition: e.target.value})}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <button type="submit">List Book</button>
        </form>
      </div>
    </div>
  );
}

export default SellBook;