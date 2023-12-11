const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
  // Define your stock schema
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;