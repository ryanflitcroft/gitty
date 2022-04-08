const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/', (req, res, next) => {
    QuoteService.getAll()
      .then((quotes) => res.json(quotes))
      .catch((error) => next(error));
  })
  .get('/programming/:count', (req, res, next) => {
    QuoteService.getProgramming(req.params.count)
      .then((quotes) => res.json(quotes))
      .catch((error) => next(error));
  })
  .get('/futurama/:count', (req, res, next) => {
    QuoteService.getFuturama(req.params.count)
      .then((quotes) => res.json(quotes))
      .catch((error) => next(error));
  })
  .get('/quotable/:count', (req, res, next) => {
    QuoteService.getQuotable(req.params.count)
      .then((quotes) => res.json(quotes))
      .catch((error) => next(error));
  });
