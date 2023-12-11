"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const axios = require('axios');
require('./db-connection');

const app = express();

// Set NODE_ENV to test without quotes
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/test_database"); // Replace with your test MongoDB connection string
} else {
  // Connect to MongoDB Atlas using the provided connection string
  mongoose
    .connect(
      "mongodb+srv://jaredbennett33:W4rz0n3@cluster0.ibs8sxe.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB Atlas:", error.message);
    });
}

// Middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Content Security Policy Middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  return next();
});

// API routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing
