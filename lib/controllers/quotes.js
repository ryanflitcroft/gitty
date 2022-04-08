const { Router } = require('express');
const Quote = require('../models/Quote');
const QuoteService = require('../services/QuoteService');

module.exports = Router().get('/programming/:count', async (req, res, next) => {
  const quotes = await QuoteService.getProgramming(req.params.count);
  res.json(quotes);
});
