import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import SearchBar from './SearchBar';

// function Home() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async (searchQuery = '') => {
//     try {
//       const url = searchQuery
//         ? `http://localhost:5000/api/books/search?query=${searchQuery}`
//         : 'http://localhost:5000/api/books';
//       const res = await axios.get(url);
//       setBooks(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (searchQuery = '') => {
    try {
      const token = localStorage.getItem('token');
      const url = searchQuery
        ? `http://localhost:5000/api/books/search?query=${searchQuery}`
        : 'http://localhost:5000/api/books';
      
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <SearchBar onSearch={fetchBooks} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}

export default Home;