const express = require('express');
const router = express.Router();
const stockPriceCheckerController = require('./stockPriceCheckerController');

router.get('/stock', stockPriceCheckerController.getStockPrice);

module.exports = router;