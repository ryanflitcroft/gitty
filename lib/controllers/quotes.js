const { Router } = require('express');
const Quote = require('../models/Quote');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/', async (req, res, next) => {
    const quotes = await QuoteService.getAll();
    res.json(quotes);
  })
  .get('/programming/:count', async (req, res, next) => {
    try {
      const quotes = await QuoteService.getProgramming(req.params.count);
      res.json(quotes);
    } catch (error) {
      next(error);
    }
  })
  .get('/futurama/:count', async (req, res, next) => {
    try {
      const quotes = await QuoteService.getFuturama(req.params.count);
      res.json(quotes);
    } catch (error) {
      next(error);
    }
  })
  .get('/quotable/:count', async (req, res, next) => {
    try {
      const quotes = await QuoteService.getQuotable(req.params.count);
      res.json(quotes);
    } catch (error) {
      next(error);
    }
  });
