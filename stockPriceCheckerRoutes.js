// stockPriceCheckerRoutes.js
const express = require('express');
const router = express.Router();
const stockPriceCheckerController = require('./stockPriceCheckerController');

router.get('/', stockPriceCheckerController.getStockPrice);

module.exports = router;
