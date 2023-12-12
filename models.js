// models.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    enum: ['MSFT', 'GOOG', 'AAPL', 'TSLA', /* add other allowed symbols */],
    required: true,
  },
  // Add other fields as needed
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock };