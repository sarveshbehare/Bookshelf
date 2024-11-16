const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [books] = await db.query('SELECT * FROM books');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Search books
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const [books] = await db.query(
      'SELECT * FROM books WHERE title LIKE ?',
      [`%${query}%`]
    );
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price, book_condition, seller_id } = req.body;
    
    // Log the received data for debugging
    console.log('Received book data:', {
      title,
      author,
      price,
      book_condition,
      seller_id
    });

    const [result] = await db.query(
      'INSERT INTO books (title, author, price, book_condition, seller_id) VALUES (?, ?, ?, ?, ?)',
      [title, author, price, book_condition, seller_id]
    );

    res.status(201).json({ 
      msg: 'Book added successfully',
      bookId: result.insertId 
    });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.get('/:bookId/seller', async (req, res) => {
  try {
    const [sellers] = await db.query(`
      SELECT users.name, users.roll_number, users.email 
      FROM users 
      INNER JOIN books ON users.id = books.seller_id 
      WHERE books.id = ?
    `, [req.params.bookId]);

    if (sellers.length === 0) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    res.json(sellers[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;