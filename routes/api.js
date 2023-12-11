'use strict';

const StockModel = require('../models/stockModel');
const express = require('express');
const fetch = require('node-fetch');

async function createStock(stock, like, ip) {
  const newStock = new StockModel({
    symbol: stock,
    likes: like ? [ip] : [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}

async function findStock(stock) {
  return await StockModel.findOne({ symbol: stock }).exec();
}

async function saveStock(stock, like, ip) {
  let saved = {};
  const foundStock = await findStock(stock);
  if (!foundStock) {
    saved = await createStock(stock, like, ip);
  } else {
    if (like && foundStock.likes.indexOf(ip) === -1) {
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
  }
  return saved;
}

async function getStock(symbol) {
  const response = await fetch(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`
  );
  const { symbol: stock, latestPrice } = await response.json();
  return { stock, latestPrice };
}

module.exports = function (app) {
  app.route('/api/stock-prices').get(async function (req, res) {
    const { stock, like } = req.query;

    if (Array.isArray(stock) && stock.length === 2) {
      const [symbol1, symbol2] = stock;
      const { stock: stock1, latestPrice: latestPrice1 } = await getStock(symbol1);
      const { stock: stock2, latestPrice: latestPrice2 } = await getStock(symbol2);

      const firstStock = await saveStock(stock1, like, req.ip);
      const secondStock = await saveStock(stock2, like, req.ip);

      let stockData = [];
      if (!stock1 || !stock2) {
        stockData.push({
          rel_likes: firstStock.likes.length - secondStock.likes.length,
        });
      } else {
        stockData.push({
          stock: stock1,
          price: latestPrice1,
          rel_likes: firstStock.likes.length - secondStock.likes.length,
        });
        stockData.push({
          stock: stock2,
          price: latestPrice2,
          rel_likes: secondStock.likes.length - firstStock.likes.length,
        });
      }

      res.json({
        stockData,
      });
    } else if (typeof stock === 'string') {
      const { stock, latestPrice } = await getStock(stock);
      if (!stock) {
        res.json({ stockData: { likes: like ? 1 : 0 } });
      } else {
        const oneStockData = await saveStock(stock, like, req.ip);
        console.log('One Stock Data', oneStockData);

        res.json({
          stockData: {
            stock,
            price: latestPrice,
            likes: oneStockData.likes.length,
          },
        });
      }
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });
};