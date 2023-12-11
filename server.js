'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // Use helmet for security features
const cors = require('cors');

const app = express();

// Set NODE_ENV to test without quotes
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/test_database'); // Replace with your test MongoDB connection string
} else {
  mongoose.connect('mongodb://localhost/production_database'); // Replace with your production MongoDB connection string
}

// Middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing
