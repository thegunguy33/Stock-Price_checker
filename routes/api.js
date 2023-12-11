'use strict';

const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

// Routes for the Stock API
router.route('/stock-prices')
  .get(StockController.getStockPrices);

module.exports = router;