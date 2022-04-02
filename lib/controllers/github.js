const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubService = require('../services/GithubService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res, next) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await GithubService.create(req.query.code);

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', async (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME).send({
      success: true,
      message: 'Signed out successfully!',
    });
  });
