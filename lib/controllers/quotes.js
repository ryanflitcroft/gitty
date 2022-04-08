const { Router } = require('express');
const Quote = require('../models/Quote');
const QuoteService = require('../services/QuoteService');

module.exports = Router().get('/programming/:count', async (req, res, next) => {
  console.log('req', req.params.count);
  const quotes = await QuoteService.getProgramming(req.params.count);
  res.json(quotes);
});
