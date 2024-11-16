// server/server.js
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection
const testConnection = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

// Call the test connection
testConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

