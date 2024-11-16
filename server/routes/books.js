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
    const { title, author, price, condition, seller_id } = req.body;
    await db.query(
    'INSERT INTO books (title, author, price, book_condition, seller_id) VALUES (?, ?, ?, ?, ?)',
    [title, author, price, condition, seller_id]
    );
    res.status(201).json({ msg: 'Book added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;