const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  // Define your stock schema fields here
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
