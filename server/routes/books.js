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
    const [result] = await db.query(`
      SELECT books.*, users.name, users.roll_number, users.email 
      FROM books 
      INNER JOIN users ON users.id = books.seller_id 
      WHERE books.id = ?
    `, [req.params.bookId]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const [books] = await db.query(
      'SELECT * FROM books WHERE seller_id = ?',
      [req.params.userId]
    );
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:bookId', async (req, res) => {
  try {
    const { title, author, price, book_condition } = req.body;
    const [result] = await db.query(
      'UPDATE books SET title = ?, author = ?, price = ?, book_condition = ? WHERE id = ? AND seller_id = ?',
      [title, author, price, book_condition, req.params.bookId, req.body.seller_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Book not found or unauthorized' });
    }

    res.json({ msg: 'Book updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM books WHERE id = ? AND seller_id = ?',
      [req.params.bookId, req.query.seller_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Book not found or unauthorized' });
    }

    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;