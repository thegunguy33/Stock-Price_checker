'use strict';

const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

// Routes for the Stock API
router.route('/stock-prices')
  .get(StockController.getStockPrices);

//https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote

module.exports = router;