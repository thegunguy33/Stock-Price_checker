// server.js
"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const runner = require("./test-runner");
const db = require("./db-connection");
const { Stock } = require('./models'); // Import the Stock model from models.js

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.jquery.com/jquery-2.2.1.min.js"],
      styleSrc: ["'self'"],
    },
  })
);

// API routes
app.use('/api/stock-prices', require('./stockPriceCheckerRoutes'));

// Root path
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server for stock-price-checker');
});

// Handle specific route for FreeCodeCamp
app.get('/v1/stock/:symbol/quote', async (req, res, next) => {
  // ... (same as previous code)
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Serve static files
app.use('/public', express.static(process.cwd() + '/public'));

// Start our server and tests!
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 3500);
  }
});

module.exports = server; // Export the server for testing
