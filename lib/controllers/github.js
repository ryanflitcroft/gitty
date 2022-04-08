const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubService = require('../services/GithubService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res, next) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', (req, res, next) => {
    GithubService.create(req.query.code)
      .then((user) =>
        jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: '1 day',
        })
      )
      .then((payload) =>
        res
          .cookie(process.env.COOKIE_NAME, payload, {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
          })
          .redirect('/api/v1/posts')
      )
      .catch((error) => next(error));
  })

  .delete('/', (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME).send({
      success: true,
      message: 'Signed out successfully!',
    });
  });
