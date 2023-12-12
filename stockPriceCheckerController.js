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

      // Retrieve likes from the query parameter, default to 0 if not provided
      const likes = req.query.like === 'true' ? 1 : 0;

      // Update the likes count for the stock
      await Stock.findOneAndUpdate({ symbol }, { $inc: { likes } });

      // Set the content type header to indicate JSON
      res.header('Content-Type', 'application/json');

      // Construct the stockData object with the required properties
      const stockData = {
        stock: symbol,
        price: response.data.latestPrice,
        likes: stock ? stock.likes + likes : likes, // Total likes for the stock
      };

      // Send the response as a JSON string
      res.send(JSON.stringify({ stockData }));
    }
  } catch (error) {
    next(error);
  }
};