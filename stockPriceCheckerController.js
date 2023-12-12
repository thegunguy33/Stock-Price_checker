const axios = require('axios');
const { Stock } = require('./models');

exports.getStockPrice = async (req, res, next) => {
  try {
    const symbol = req.query.stock || 'msft'; // Use the symbol from the query parameter or default to 'msft'
    const apiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;

    const response = await axios.get(apiUrl);

    if (response.data === 'Unknown stock') {
      res.status(404).json({ error: 'Unknown stock symbol' });
    } else {
      const stock = await Stock.findOne({ symbol });

      if (!stock) {
        // Create a new stock document if not found
        const newStock = new Stock({ symbol });
        await newStock.save();
      }

      // Set the content type header to indicate JSON
      res.header('Content-Type', 'application/json');
      
      // Send the response as a JSON string
      res.send(JSON.stringify({ stock: symbol, price: response.data.latestPrice }));
    }
  } catch (error) {
    next(error);
  }
};