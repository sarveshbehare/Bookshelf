import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyListings() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/books/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleUpdate = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/books/${bookId}`,
        {
          ...editingBook,
          seller_id: user.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEditingBook(null);
      fetchMyBooks();
      alert('Book updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update book');
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:5000/api/books/${bookId}?seller_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        fetchMyBooks();
        alert('Book deleted successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to delete book');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-listings-container">
      <h2>My Listed Books</h2>
      <div className="listings-grid">
        {books.map(book => (
          <div key={book.id} className="listing-card">
            {editingBook && editingBook.id === book.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                  placeholder="Author"
                />
                <input
                  type="number"
                  value={editingBook.price}
                  onChange={(e) => setEditingBook({...editingBook, price: e.target.value})}
                  placeholder="Price"
                />
                <select
                  value={editingBook.book_condition}
                  onChange={(e) => setEditingBook({...editingBook, book_condition: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                <div className="edit-buttons">
                  <button onClick={() => handleUpdate(book.id)}>Save</button>
                  <button onClick={() => setEditingBook(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p><strong>Condition:</strong> {book.book_condition}</p>
                <div className="listing-buttons">
                  <button onClick={() => setEditingBook(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;