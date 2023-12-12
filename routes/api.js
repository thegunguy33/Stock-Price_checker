'use strict';
const { Stock } = require('./model'); // If both api.js and model.js are in the same directory

async function createStock(stock, like, ip) {
  const newStock = new Stock({
    symbol: stock,
    likes: like ? [ip] : [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}

async function findStock(stock) {
  return await Stock.findOne({ symbol: stock }).exec();
}

async function saveStock(stock, like, ip) {
  let saved = {};
  const foundStock = await findStock(stock);
  if (!foundStock) {
    const createsaved = await createStock(stock, like, ip);
    saved = createsaved;
    return saved;
  } else {
    if (like && foundStock.likes.indexOf(ip) === -1) {
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
}

async function getStockPrice(stock) {
  const response = await fetch(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const { latestPrice } = await response.json();
  return latestPrice || 0;
}

module.exports = function(app) {
  app.get('/api/stock-prices', async (req, res) => {
    const stockSymbols = req.query.stock;

    const likes = req.query.like === 'true' ? 1 : 0;

    const stockData = Array.isArray(stockSymbols)
      ? await Promise.all(stockSymbols.map(async (symbol) => {
        const price = Number(await getStockPrice(symbol)); 
        const savedStock = await saveStock(symbol, likes, req.ip);
        return {
          stock: symbol,
          price: isNaN(price) ? 0 : price,
          likes: Number(savedStock.likes.length), 
        };
      }))
      : {
        stock: stockSymbols,
        price: Number(await getStockPrice(stockSymbols)) || 0, 
        likes: Number((await saveStock(stockSymbols, likes, req.ip)).likes.length), 
      };

    if (Array.isArray(stockSymbols) && stockData.length === 2) {
      stockData[0].rel_likes = stockData[0].likes - stockData[1].likes;
      stockData[1].rel_likes = -stockData[0].rel_likes;
    }

    console.log({ "stockData":stockData });
    res.json( {"stockData":stockData} );
  });
};
