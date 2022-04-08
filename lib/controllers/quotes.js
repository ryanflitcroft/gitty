const { Router } = require('express');
const Quote = require('../models/Quote');
const QuoteService = require('../services/QuoteService');

module.exports = Router().get('/programming', async (req, res, next) => {
  const quotes = await QuoteService.getProgramming();
  res.json(quotes);
});
