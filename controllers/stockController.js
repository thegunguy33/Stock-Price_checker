const axios = require('axios');

exports.getStockPrice = async (req, res, next) => {
  try {
    const symbol = req.query.stock;
    const apiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;

    const response = await axios.get(apiUrl);

    if (response.data === 'Unknown stock') {
      res.status(404).json({ error: 'Unknown stock symbol' });
    } else {
      const stockPrice = response.data.latestPrice;
      res.json({ stock: symbol, price: stockPrice });
    }
  } catch (error) {
    next(error);
  }
};