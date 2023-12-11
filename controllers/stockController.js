const axios = require('axios');
const Stock = require('../models/stock');

const StockController = {
  getStockPrices: async (req, res, next) => {
    try {
      const { stock, like, ip } = req.query;

      // Call the external API to get stock prices
      const externalApiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`;
      const externalApiResponse = await axios.get(externalApiUrl);
      const { symbol, latestPrice } = externalApiResponse.data;

      // Save or update the stock data in your database
      const stockData = {
        symbol,
        price: latestPrice,
      };

      const filter = { symbol: stockData.symbol };
      const update = { price: stockData.price };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const savedStock = await Stock.findOneAndUpdate(filter, update, options);

      // Handle likes
      let likes = 0;
      if (like === 'true') {
        // Assuming you have a separate Likes model
        // You need to implement this logic based on your data model
        // Example: Likes.create({ ip, stock: savedStock._id });
        likes = 1; // For testing purposes, increment likes by 1
      }

      // Respond with the stock data
      res.json({
        stockData: {
          stock: savedStock.symbol,
          price: savedStock.price,
          likes,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = StockController;
